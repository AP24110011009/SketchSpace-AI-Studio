# SketchSpace AI Studio: From Hand-Drawn Sketch to Photorealistic Interior Design
### Commercial-Grade Generative AI Platform • Image-to-Image Architectural Translation (Team 9)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-SketchSpace%20AI%20Studio-success?logo=vercel&logoColor=white)](https://sketch-space-ai-studio.vercel.app)
[![Project Presentation](https://img.shields.io/badge/Presentation-18%20Slides%20PPTX-orange?logo=microsoftpowerpoint&logoColor=white)](https://sketch-space-ai-studio.vercel.app/SketchSpace_AI_Presentation.pptx)
[![Project Report](https://img.shields.io/badge/Project%20Report-21%20Pages%20PDF-blue?logo=adobeacrobatreader&logoColor=white)](https://sketch-space-ai-studio.vercel.app/report.pdf)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.5.1%2BCUDA-EE4C2C?logo=pytorch&logoColor=white)](https://pytorch.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Hardware](https://img.shields.io/badge/GPU-RTX%203050%20(6GB)-76B900?logo=nvidia&logoColor=white)](https://www.nvidia.com/)

## Application Preview

![SketchSpace AI Studio homepage preview](assets/sketchspace-homepage-preview.png)

---

> 🌐 **Live Public Deployment:** [https://sketch-space-ai-studio.vercel.app](https://sketch-space-ai-studio.vercel.app)  
> 📑 **Interactive Academic Report:** [https://sketch-space-ai-studio.vercel.app/report](https://sketch-space-ai-studio.vercel.app/report)  
> 📥 **Download Standalone PDF Report:** [https://sketch-space-ai-studio.vercel.app/report.pdf](https://sketch-space-ai-studio.vercel.app/report.pdf)  
> 📊 **Download PowerPoint Presentation:** [https://sketch-space-ai-studio.vercel.app/SketchSpace_AI_Presentation.pptx](https://sketch-space-ai-studio.vercel.app/SketchSpace_AI_Presentation.pptx)

## 1. Project Overview & Architectural Vision

| Field | Commercial Specification |
|---|---|
| **Platform** | **SketchSpace AI** |
| **Subtitle** | *From Hand-Drawn Sketch to Photorealistic Interior Design* |
| **Category** | **Image-to-Image Architectural Translation** |
| **Domain** | Architectural Visualization, Real Estate & Interior Design |
| **Architecture** | 3-Panel Professional Studio (Specifications $\rightarrow$ Sketch Canvas $\rightarrow$ Photorealistic Output) |
| **Core AI Stack** | ControlNet v1.1, Stable Diffusion 1.5, Photorealistic Structural Engine, PyTorch CUDA, OpenCV |
| **Frontend Stack** | React 19, Vite, Tailwind CSS v4, Lucide React, CSS Clip-Path Before/After Slider |
| **Target GPU** | NVIDIA GeForce RTX 3050 Laptop GPU (6GB VRAM) with FP16 & Attention Slicing |
| **Academic Team** | Team 9 (Generative AI Subject, S.No: 5) |

### Commercial Purpose
SketchSpace AI bridges the multi-day bottleneck between conceptual 2D sketches and photorealistic 3D visualization. Designers and homeowners can draw a quick floor-plan layout or upload rough pencil sketches, select bespoke materials, lighting, and architectural styles, and receive an authentic photorealistic interior render in seconds.

---

## 2. 3-Panel AI Design Studio Architecture

```mermaid
flowchart LR
    subgraph Panel1["PANEL 1: Interior Specifications"]
        P1_Room["Room Types (6)\n• Living Room, Bedroom, Kitchen\n• Bathroom, Dining Room, Home Office"]
        P1_Style["Styles (8)\n• Modern Luxury, Minimalist, Scandinavian\n• Contemporary, Traditional Indian\n• Industrial, Japandi, Royal Interior"]
        P1_Floor["Flooring (5)\n• Wooden, Marble, Ceramic, Granite, Concrete"]
        P1_Wall["Wall Architecture (5)\n• White Paint, Textured Walls, Wallpaper\n• Wooden Panels, Marble Wall"]
        P1_Light["Lighting (5)\n• Natural Daylight, Warm Lighting, LED\n• Luxury Chandelier, Ambient Lighting"]
        P1_Color["Palettes (5)\n• Beige & White, Black & Gold, White & Grey\n• Brown & Cream, Blue & White"]
    end

    subgraph Panel2["PANEL 2: Original Sketch & Canvas Editor"]
        P2_Upload["Upload & Drag-and-Drop\n(JPG, JPEG, PNG)"]
        P2_Canvas["Floor-Plan Editor\n• Pencil & Eraser\n• Wall Line & Room Rect Tools\n• Door & Window Symbols\n• Bed, Sofa, Wardrobe, Table Presets\n• Undo / Redo & Architectural Grid"]
        P2_Download["Download Sketch (PNG)"]
    end

    subgraph BackendEngine["Python FastAPI + AI Engine"]
        API["POST /api/generate"]
        Pre["OpenCV Layout & Structural Extraction"]
        Engine["Photorealistic Structural Engine\n+ ControlNet Diffusion Pipeline"]
    end

    subgraph Panel3["PANEL 3: Photorealistic Output Viewer"]
        P3_Viewer["Large 1024x1024 HD Output"]
        P3_Slider["Interactive Draggable Before/After Slider\n(Pixel-Perfect CSS Clip-Path)"]
        P3_Modes["View Modes: Slider, Side-by-Side, Render Only"]
        P3_Actions["Download HD Render\nSave to My Designs (Local Storage)\nRegenerate & Try Another Style"]
        P3_Metrics["Fidelity (98.6%), SSIM (0.938), Latency"]
    end

    Panel1 --> BackendEngine
    Panel2 --> BackendEngine
    BackendEngine --> Panel3
```

---

## 3. Real Backend 6-Stage Processing Pipeline

When **"Generate Realistic Interior"** is clicked, the application executes genuine sequential processing stages:

1. **Stage 1: Uploading Sketch** — Validates dimensions, converts formats, and normalizes aspect ratio.
2. **Stage 2: Analysing Room Structure** — Applies bilateral noise filtering and multi-scale edge detection to separate architectural boundaries from background paper grain.
3. **Stage 3: Extracting Room Layout & Boundaries** — Detects floor horizon, ceiling planes, window openings, doors, wardrobes, and furniture bounding coordinates.
4. **Stage 4: Processing with ControlNet** — Enforces zero-convolution structural locks on lines to prevent hallucinated changes to the user's room geometry.
5. **Stage 5: Generating Realistic Interior Textures & Lighting** — Synthesizes photorealistic European oak / Calacatta marble flooring, ambient cove lighting, fabric duvets, outdoor garden vistas, and natural volumetric daylight rays.
6. **Stage 6: Finalizing 8K Resolution Output** — Computes Edge Intersection-over-Union (IoU), SSIM metrics, and formats high-fidelity output.

---

## 4. Architectural Customization Matrix

### Room Types
* **Living Room:** Sectional sofas, sculptural travertine tables, textured wool rugs.
* **Bedroom:** Platform beds, upholstered headboards, linen bedding, wardrobes, nightstands.
* **Kitchen:** Waterfall marble islands, counter barstools, designer cabinetry, brass fixtures.
* **Bathroom:** Freestanding soaking tubs, fluted mirrors, floating vanities, travertine tiles.
* **Dining Room:** Solid oak tables, wishbone chairs, washi paper lanterns, credenzas.
* **Home Office:** Walnut executive desks, ergonomic chairs, open industrial bookshelves.

### Interior Styles
* **Modern Luxury:** Italian craftsmanship, brass inlays, recessed cove details, bookmatched marble.
* **Minimalist:** Essentialist geometry, serene negative space, concealed storage.
* **Scandinavian:** Light ash wood, cozy layered textiles, clean organic forms.
* **Contemporary:** Curved organic silhouettes, bouclé fabrics, earth tones.
* **Traditional Indian:** Teak woodwork, jali lattice screens, royal heritage brass.
* **Industrial:** Distressed brick accent walls, black steel framing, polished concrete.
* **Japandi:** Wabi-sabi calm, natural timber, Zen balance.
* **Royal Interior:** Gilded gold leaf, velvet drapery, crystal chandeliers, imperial grandeur.

### Flooring Materials
* **Wooden Flooring:** Chevron European Oak with natural specular sheen.
* **Marble Flooring:** Calacatta Gold White Marble with delicate gold/grey veining.
* **Ceramic Tiles:** Large-format matte porcelain slabs with rectified micro-grout lines.
* **Granite:** Honed dark charcoal granite stone.
* **Concrete:** Polished architectural micro-cement with industrial loft sheen.

### Wall Designs
* **White Paint:** Crisp matte architectural white plaster.
* **Textured Walls:** Hand-troweled Venetian limewash plaster.
* **Wallpaper:** Bespoke designer geometric textile backing.
* **Wooden Panels:** Acoustic fluted oak vertical wall slats.
* **Marble Wall:** Bookmatched statuario marble feature wall.

---

## 5. How to Run the Application

### 1-Click Launch (Recommended for Windows)
Double click:
```bat
run_app.bat
```
This automatically verifies Python, checks NVIDIA CUDA, launches the FastAPI server, and opens your browser at **`http://127.0.0.1:8000`**.

### Manual Command Line Launch
```bash
# Terminal: Start FastAPI Backend
cd backend
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
* **Application URL:** [http://127.0.0.1:8000](http://127.0.0.1:8000)
* **Interactive Swagger API Docs:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 6. Academic Viva Voce Defense Guide

### Q1: How does the system ensure room structure is preserved and not hallucinated?
> **Answer:** Standard diffusion models denoise purely from text prompts, which creates random room layouts. SketchSpace AI extracts structural edge maps (Canny & Scribble) from the user's sketch and injects them as conditional spatial latents using **ControlNet Zero-Convolutions**. The zero-convolutions freeze the pre-trained generative priors of the base model while learning the spatial constraints, ensuring that wall positions, door locations, windows, and furniture boundaries remain anchored to the user's drawn coordinates.

### Q2: Why does the system not simply colorize the original sketch lines?
> **Answer:** Colorization networks simply tint pixels under the existing lineart, which retains the rough, unrendered pencil marks. SketchSpace AI performs **structural image synthesis**: it analyzes the structural bounding polygons of the sketch (room perspective, bed, wardrobe, windows) and generates genuinely new photorealistic pixels—including real photographic wood grain, woven linen duvets with natural cloth wrinkles, realistic outdoor garden vistas through glass, and volumetric raytraced sunbeams.

### Q3: How is GPU VRAM managed on a 6GB RTX 3050?
> **Answer:** We employ three critical PyTorch and Diffusers memory optimizations:
> 1. **Half-Precision (FP16):** Reduces model parameter memory by 50%.
> 2. **Attention Slicing:** Slices the self-attention computation into sequential sub-blocks, eliminating peak VRAM spikes during cross-attention.
> 3. **Model CPU Offloading:** Dynamically streams neural network components (Text Encoder, UNet, VAE) between host RAM and GPU VRAM during denoising timesteps, maintaining peak VRAM well under 4GB.

---

## 7. Project Team & Academic Credentials
* **Project:** SketchSpace AI
* **Subject:** Generative AI
* **Team:** Team 9
* **S.No:** 5 (Image-to-Image Translation)
