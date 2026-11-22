"""
SketchSpace AI — FastAPI Backend Application
High-performance REST API for Image-to-Image translation of interior sketches.
Serves both API endpoints and the built React frontend application.
"""

import os
import io
import time
from typing import Optional
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from PIL import Image
import torch

from ai_engine.orchestrator import SketchSpaceOrchestrator
from ai_engine.preprocessor import SketchPreprocessor

app = FastAPI(
    title="SketchSpace AI API",
    description="Generative AI backend for Sketch-to-Realistic Interior Translation",
    version="2.0.0"
)

# CORS middleware for frontend development server (Vite on 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directories
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SAMPLES_DIR = os.path.join(BASE_DIR, "samples")
SKETCHES_DIR = os.path.join(SAMPLES_DIR, "sketches")
RENDERS_DIR = os.path.join(SAMPLES_DIR, "renders")
FRONTEND_DIST = os.path.join(os.path.dirname(BASE_DIR), "frontend", "dist")

# Initialize orchestrator
orchestrator = SketchSpaceOrchestrator()
preprocessor = SketchPreprocessor(target_size=(768, 768))

@app.get("/api/status")
def get_system_status():
    cuda_available = torch.cuda.is_available()
    device_name = torch.cuda.get_device_name(0) if cuda_available else "CPU (Standard)"
    vram_total = None
    vram_free = None
    
    if cuda_available:
        props = torch.cuda.get_device_properties(0)
        vram_total = f"{round(props.total_memory / (1024**3), 2)} GB"
        allocated = torch.cuda.memory_allocated(0)
        vram_free = f"{round((props.total_memory - allocated) / (1024**3), 2)} GB"

    is_pipeline_loaded = False
    if orchestrator.controlnet_pipeline is not None:
        is_pipeline_loaded = orchestrator.controlnet_pipeline.is_loaded

    return {
        "status": "online",
        "pytorch_version": torch.__version__,
        "cuda_available": cuda_available,
        "device_name": device_name,
        "vram_total": vram_total,
        "vram_free": vram_free,
        "controlnet_loaded": is_pipeline_loaded,
        "supported_engines": [
            "Photorealistic Structural Synthesis Engine (Active)",
            "ControlNet + Stable Diffusion (PyTorch CUDA)",
            "Pix2Pix Conditional GAN"
        ],
        "server_time": time.strftime("%Y-%m-%d %H:%M:%S")
    }

@app.get("/api/gallery")
def get_gallery():
    """Returns curated gallery of before/after interior design pairs."""
    return orchestrator.demo_engine.list_gallery_items()

@app.get("/api/samples/sketches/{filename}")
@app.get("/samples/sketches/{filename}")
def get_sample_sketch(filename: str):
    path = os.path.join(SKETCHES_DIR, filename)
    if os.path.exists(path):
        return FileResponse(path, media_type="image/jpeg")
    raise HTTPException(status_code=404, detail="Sample sketch not found")

@app.get("/api/samples/renders/{filename}")
@app.get("/samples/renders/{filename}")
def get_sample_render(filename: str):
    path = os.path.join(RENDERS_DIR, filename)
    if os.path.exists(path):
        return FileResponse(path, media_type="image/jpeg")
    raise HTTPException(status_code=404, detail="Sample render not found")

@app.post("/api/preprocess-sketch")
async def preprocess_sketch_endpoint(file: UploadFile = File(...)):
    """Preprocesses an uploaded sketch and returns clean edge maps."""
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        processed = preprocessor.process(image)
        
        from ai_engine.orchestrator import pil_to_base64
        return {
            "success": True,
            "processed_sketch": pil_to_base64(processed["processed_image"]),
            "canny_edges": pil_to_base64(processed["canny_map"]),
            "scribble_map": pil_to_base64(processed["scribble_map"])
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image preprocessing failed: {str(e)}")

@app.post("/api/generate")
async def generate_interior(
    sketch: UploadFile = File(...),
    room_type: str = Form("Bedroom"),
    interior_style: str = Form("Modern Luxury"),
    flooring: str = Form("Wooden Flooring"),
    wall_design: str = Form("White Paint"),
    lighting_pref: str = Form("Natural Daylight"),
    color_theme: str = Form("Beige and White"),
    custom_color: Optional[str] = Form(""),
    furniture_pref: Optional[str] = Form(""),
    decor_pref: Optional[str] = Form(""),
    engine_mode: str = Form("auto"),
    guidance_scale: float = Form(7.5),
    control_strength: float = Form(0.85),
    num_steps: int = Form(25),
    seed: int = Form(42)
):
    """
    Core AI Image-to-Image Generation Endpoint.
    Translates uploaded sketch into a realistic interior render.
    """
    try:
        allowed_types = {"image/jpeg", "image/png", "image/jpg", "image/webp", "application/octet-stream"}
        is_valid_type = sketch.content_type in allowed_types if sketch.content_type else False
        is_valid_ext = any(sketch.filename.lower().endswith(ext) for ext in [".jpg", ".jpeg", ".png", ".webp"]) if sketch.filename else True
        if not (is_valid_type or is_valid_ext):
            raise HTTPException(status_code=400, detail="Please upload a JPG, JPEG, or PNG image.")

        contents = await sketch.read()
        if len(contents) > 10 * 1024 * 1024:
            raise HTTPException(status_code=413, detail="Please upload an image smaller than 10 MB.")

        image = Image.open(io.BytesIO(contents)).convert("RGB")
        
        result = orchestrator.process_and_generate(
            input_image=image,
            room_type=room_type,
            interior_style=interior_style,
            flooring=flooring,
            wall_design=wall_design,
            lighting_pref=lighting_pref,
            color_theme=color_theme,
            custom_color=custom_color or "",
            furniture_pref=furniture_pref or "",
            decor_pref=decor_pref or "",
            engine_mode=engine_mode,
            guidance_scale=guidance_scale,
            control_strength=control_strength,
            num_steps=num_steps,
            seed=seed
        )
        return JSONResponse(content=result)
    except HTTPException:
        raise
    except Exception as e:
        print(f"[SketchSpace API Error] {e}")
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")

@app.post("/api/contact")
async def submit_contact(
    name: str = Form(...),
    email: str = Form(...),
    message: str = Form(...)
):
    """Handles contact form inquiry."""
    return {
        "success": True,
        "message": f"Thank you, {name}! Your architectural inquiry has been received. Our team will contact you at {email}.",
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
    }

REPORT_PATH = os.path.join(os.path.dirname(BASE_DIR), "REPORT.html")
REPORT_PDF_PATH = os.path.join(os.path.dirname(BASE_DIR), "SKETCHSPACE_AI_PROJECT_REPORT.pdf")

@app.get("/report")
def get_report():
    if os.path.exists(REPORT_PATH):
        return FileResponse(REPORT_PATH, media_type="text/html")
    raise HTTPException(status_code=404, detail="Project report not found")

@app.get("/report.pdf")
@app.get("/report/pdf")
def get_report_pdf():
    if os.path.exists(REPORT_PDF_PATH):
        return FileResponse(
            REPORT_PDF_PATH,
            media_type="application/pdf",
            filename="SKETCHSPACE_AI_PROJECT_REPORT.pdf"
        )
    raise HTTPException(status_code=404, detail="PDF report not found")

# Mount React Frontend static build if it exists
if os.path.exists(FRONTEND_DIST):
    assets_dir = os.path.join(FRONTEND_DIST, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}")
    def serve_frontend(full_path: str):
        file_path = os.path.join(FRONTEND_DIST, full_path)
        if full_path and os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        index_path = os.path.join(FRONTEND_DIST, "index.html")
        if os.path.exists(index_path):
            return FileResponse(index_path)
        return JSONResponse({"status": "ready", "docs": "/docs"})

if __name__ == "__main__":
    import uvicorn
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host=host, port=port)
