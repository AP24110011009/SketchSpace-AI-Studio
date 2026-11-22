"""
Deploy and synchronize high-resolution photorealistic architectural imagery
across SketchSpace AI Studio (frontend public, backend samples, and gallery manifest).
"""

import os
import shutil
import cv2
import numpy as np
from PIL import Image

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ARTIFACT_DIR = r"C:\Users\gudib\.gemini\antigravity\brain\31d1d55a-1a47-476f-ae13-4c4a0275f201"

BACKEND_SAMPLES_RENDERS = os.path.join(BASE_DIR, "backend", "samples", "renders")
BACKEND_SAMPLES_SKETCHES = os.path.join(BASE_DIR, "backend", "samples", "sketches")
FRONTEND_PUBLIC_RENDERS = os.path.join(BASE_DIR, "frontend", "public", "samples", "renders")
FRONTEND_PUBLIC_SKETCHES = os.path.join(BASE_DIR, "frontend", "public", "samples", "sketches")

for d in [BACKEND_SAMPLES_RENDERS, BACKEND_SAMPLES_SKETCHES, FRONTEND_PUBLIC_RENDERS, FRONTEND_PUBLIC_SKETCHES]:
    os.makedirs(d, exist_ok=True)

def generate_pencil_sketch(image_path, output_sketch_path):
    """Generates an architectural hand-drawn pencil sketch from an interior render."""
    img = cv2.imread(image_path)
    if img is None:
        return False
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    inv = 255 - gray
    blurred = cv2.GaussianBlur(inv, (21, 21), 0)
    sketch = cv2.divide(gray, 255 - blurred, scale=256)
    
    # Add subtle hand-drawn texture
    edges = cv2.Canny(gray, 50, 150)
    edges_inv = 255 - edges
    combined = cv2.multiply(sketch, edges_inv, scale=1.0/255.0)
    
    # Warm architectural paper tint
    h, w = combined.shape
    tinted = np.zeros((h, w, 3), dtype=np.uint8)
    tinted[:, :, 0] = np.clip(combined.astype(np.float32) * 0.94, 0, 255).astype(np.uint8) # B
    tinted[:, :, 1] = np.clip(combined.astype(np.float32) * 0.97, 0, 255).astype(np.uint8) # G
    tinted[:, :, 2] = np.clip(combined.astype(np.float32) * 0.99, 0, 255).astype(np.uint8) # R
    
    cv2.imwrite(output_sketch_path, tinted, [cv2.IMWRITE_JPEG_QUALITY, 95])
    return True

# Map verified high-res photorealistic source images from artifact directory
IMAGE_MAP = {
    # Key: (Source Render in Artifacts, Source Sketch in Artifacts or None for auto-sketch)
    "living_room_modern": (
        os.path.join(ARTIFACT_DIR, "living_room_modern_1795277571923.jpg"),
        os.path.join(ARTIFACT_DIR, "clean_living_sketch.jpg")
    ),
    "bedroom_scandinavian": (
        os.path.join(ARTIFACT_DIR, "luxury_master_bedroom_render_1795276297493.jpg"),
        os.path.join(ARTIFACT_DIR, "clean_user_sketch_1024.jpg")
    ),
    "kitchen_luxury": (
        os.path.join(ARTIFACT_DIR, "kitchen_luxury_1795277590956.jpg"),
        os.path.join(ARTIFACT_DIR, "clean_kitchen_sketch.jpg")
    ),
    "bathroom_contemporary": (
        os.path.join(ARTIFACT_DIR, "bathroom_contemporary_1795277610126.jpg"),
        os.path.join(ARTIFACT_DIR, "clean_bathroom_sketch.jpg")
    ),
    "dining_japandi": (
        os.path.join(ARTIFACT_DIR, "dining_japandi_1795277631674.jpg"),
        os.path.join(ARTIFACT_DIR, "clean_dining_sketch.jpg")
    ),
    "office_industrial": (
        os.path.join(ARTIFACT_DIR, "office_industrial_1795277653305.jpg"),
        os.path.join(ARTIFACT_DIR, "clean_office_sketch.jpg")
    ),
    "user_bathroom_freestanding": (
        os.path.join(ARTIFACT_DIR, "user_bathroom_1_render_1795278717155.jpg"),
        os.path.join(ARTIFACT_DIR, "user_sketch_bathroom_tub_window.jpg")
    ),
    "user_bathroom_circular": (
        os.path.join(ARTIFACT_DIR, "user_bathroom_2_render_1795278722163.jpg"),
        os.path.join(ARTIFACT_DIR, "user_sketch_bathroom_circle_mirror.jpg")
    ),
    "user_bedroom_desk": (
        os.path.join(ARTIFACT_DIR, "user_bedroom_3_render_png_1795278733979.jpg"),
        os.path.join(ARTIFACT_DIR, "user_sketch_bedroom_desk_window.jpg")
    ),
    "living_traditional_indian": (
        os.path.join(ARTIFACT_DIR, "traditional_indian_living_1795310881271.jpg"),
        None
    ),
    "living_minimalist": (
        os.path.join(ARTIFACT_DIR, "minimalist_living_1795310900244.jpg"),
        None
    ),
    "living_royal_luxury": (
        os.path.join(ARTIFACT_DIR, "royal_luxury_living_1795310921278.jpg"),
        None
    ),
}

print("Deploying high-resolution photorealistic images...")
for key, (render_src, sketch_src) in IMAGE_MAP.items():
    if not os.path.exists(render_src):
        print(f"Warning: Render source not found: {render_src}")
        continue
    
    # 1. Copy render to backend and frontend public
    target_render_backend = os.path.join(BACKEND_SAMPLES_RENDERS, f"{key}.jpg")
    target_render_frontend = os.path.join(FRONTEND_PUBLIC_RENDERS, f"{key}.jpg")
    shutil.copy2(render_src, target_render_backend)
    shutil.copy2(render_src, target_render_frontend)
    print(f"  [RENDER] {key}.jpg -> backend & frontend/public")

    # 2. Copy or generate sketch
    target_sketch_backend = os.path.join(BACKEND_SAMPLES_SKETCHES, f"{key}.jpg")
    target_sketch_frontend = os.path.join(FRONTEND_PUBLIC_SKETCHES, f"{key}.jpg")
    
    if sketch_src and os.path.exists(sketch_src):
        shutil.copy2(sketch_src, target_sketch_backend)
        shutil.copy2(sketch_src, target_sketch_frontend)
        print(f"  [SKETCH] {key}.jpg (from source) -> backend & frontend/public")
    else:
        # Generate clean architectural sketch from render
        generate_pencil_sketch(render_src, target_sketch_backend)
        shutil.copy2(target_sketch_backend, target_sketch_frontend)
        print(f"  [SKETCH] {key}.jpg (synthesized) -> backend & frontend/public")

print("\nAll photorealistic assets successfully deployed to both backend and frontend!")
