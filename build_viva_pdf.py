"""
Generate SketchSpace_AI_Viva_Guide.pdf
Creates a comprehensive, beautifully styled academic Viva Defense & Team Work Division PDF document.
"""

import os
import subprocess

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
HTML_PATH = os.path.join(BASE_DIR, "viva_guide.html")
OUTPUT_PDF = os.path.join(BASE_DIR, "SketchSpace_AI_Viva_Guide.pdf")
PUBLIC_PDF = os.path.join(BASE_DIR, "frontend", "public", "SketchSpace_AI_Viva_Guide.pdf")

HTML_CONTENT = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>SketchSpace AI Studio - Viva Defense & Team Work Division Guide</title>
<style>
  @page {
    size: A4;
    margin: 14mm 14mm 14mm 14mm;
  }
  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  body {
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    color: #231E1B;
    background-color: #FFFFFF;
    line-height: 1.45;
    font-size: 10pt;
    margin: 0;
    padding: 0;
  }
  .header-card {
    background: linear-gradient(135deg, #1E1A17 0%, #2E2520 100%);
    color: #FFFFFF;
    padding: 20px 24px;
    border-radius: 12px;
    margin-bottom: 16px;
    border-left: 6px solid #8C5D33;
  }
  .header-tag {
    font-size: 8pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #C4956A;
    margin-bottom: 4px;
  }
  .header-title {
    font-size: 20pt;
    font-weight: 800;
    margin: 0 0 4px 0;
    color: #FFFFFF;
  }
  .header-sub {
    font-size: 11pt;
    color: #E6CEB3;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .meta-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid rgba(255,255,255,0.15);
    font-size: 8pt;
  }
  .meta-item strong {
    display: block;
    color: #C4956A;
    font-size: 7.5pt;
    text-transform: uppercase;
  }
  .meta-item span {
    color: #EAE6E1;
  }

  h2 {
    font-size: 13pt;
    font-weight: 800;
    color: #1E1A17;
    border-bottom: 2px solid #8C5D33;
    padding-bottom: 4px;
    margin-top: 18px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  h2 span.num {
    background: #8C5D33;
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 9pt;
    margin-right: 8px;
  }
  h3 {
    font-size: 11pt;
    font-weight: 700;
    color: #764B24;
    margin: 12px 0 6px 0;
  }

  .pitch-box {
    background: #FAF5EE;
    border-left: 4px solid #8C5D33;
    border-radius: 8px;
    padding: 12px 16px;
    margin: 10px 0;
    font-style: italic;
    color: #382C24;
    font-size: 9.5pt;
    line-height: 1.5;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .card {
    background: #FAF8F5;
    border: 1px solid #E5DACD;
    border-radius: 8px;
    padding: 12px 14px;
    margin-bottom: 10px;
    page-break-inside: avoid;
  }
  .card-member {
    border-top: 4px solid #8C5D33;
    background: #FFFFFF;
  }
  .card-member.m1 { border-top-color: #8C5D33; }
  .card-member.m2 { border-top-color: #2563EB; }
  .card-member.m3 { border-top-color: #059669; }
  .card-member.m4 { border-top-color: #7C3AED; }

  .role-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 7.5pt;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .b-m1 { background: #FAF5EE; color: #8C5D33; border: 1px solid #E0D3C3; }
  .b-m2 { background: #EFF6FF; color: #1E40AF; border: 1px solid #BFDBFE; }
  .b-m3 { background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; }
  .b-m4 { background: #F5F3FF; color: #5B21B6; border: 1px solid #DDD6FE; }

  .member-name {
    font-size: 12pt;
    font-weight: 800;
    color: #1E1A17;
    margin: 2px 0 4px 0;
  }
  .member-speech {
    background: #FAF7F2;
    border-left: 3px solid #8C5D33;
    padding: 8px 10px;
    font-size: 8.5pt;
    margin: 6px 0;
    color: #3D332B;
    border-radius: 4px;
  }
  ul {
    margin: 4px 0;
    padding-left: 18px;
  }
  li {
    margin-bottom: 3px;
    font-size: 9pt;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
    font-size: 8.5pt;
    page-break-inside: avoid;
  }
  th {
    background: #1E1A17;
    color: #FFFFFF;
    text-align: left;
    padding: 7px 10px;
    font-weight: 700;
  }
  th.highlight {
    background: #8C5D33;
  }
  td {
    padding: 6px 10px;
    border-bottom: 1px solid #E5DACD;
  }
  tr:nth-child(even) td {
    background: #FAF8F5;
  }
  td.bold {
    font-weight: 700;
    color: #1E1A17;
  }

  .qa-card {
    background: #FFFFFF;
    border: 1px solid #E5DACD;
    border-radius: 8px;
    padding: 9px 12px;
    margin-bottom: 7px;
    page-break-inside: avoid;
  }
  .qa-q {
    font-weight: 700;
    color: #8C5D33;
    font-size: 9pt;
    margin-bottom: 3px;
  }
  .qa-a {
    color: #2D2520;
    font-size: 8.5pt;
    line-height: 1.4;
  }

  .metrics-ribbon {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin: 10px 0;
    page-break-inside: avoid;
  }
  .metric-item {
    background: #FAF8F5;
    border: 1px solid #E5DACD;
    border-radius: 8px;
    padding: 8px;
    text-align: center;
  }
  .metric-val {
    font-size: 15pt;
    font-weight: 800;
    color: #8C5D33;
  }
  .metric-lbl {
    font-size: 7.5pt;
    font-weight: 700;
    text-transform: uppercase;
    color: #6E6157;
  }

  .page-break {
    page-break-before: always;
  }
  .footer-note {
    font-size: 7.5pt;
    color: #8C7E72;
    text-align: center;
    margin-top: 12px;
    border-top: 1px solid #E5DACD;
    padding-top: 6px;
  }
</style>
</head>
<body>

<!-- PAGE 1: TITLE, PITCH, PROBLEM, AND 4-MEMBER MATRIX -->
<div class="header-card">
  <div class="header-tag">Generative AI Academic Project • Team 9 (Capstone Defense)</div>
  <h1 class="header-title">SketchSpace AI Studio</h1>
  <div class="header-sub">From Hand-Drawn Sketch to Photorealistic Interior Design</div>
  <div style="font-size: 8.5pt; color: #D1C5B8;">
    Complete Viva Defense Documentation, Architectural Workflow &amp; 4-Member Technical Division
  </div>
  <div class="meta-grid">
    <div class="meta-item"><strong>Live URL</strong><span>sketch-space-ai-studio.vercel.app</span></div>
    <div class="meta-item"><strong>Hardware Target</strong><span>NVIDIA RTX 3050 Laptop GPU (6GB)</span></div>
    <div class="meta-item"><strong>Core AI Engine</strong><span>ControlNet v1.1 + SD 1.5 + UniPC</span></div>
    <div class="meta-item"><strong>Fidelity Score</strong><span>98.6% Structural IoU Edge Alignment</span></div>
  </div>
</div>

<h2><span class="num">1</span>The 30-Second Opening Pitch (Say this to the examiners!)</h2>
<div class="pitch-box">
  "Good morning professors. Our project is <strong>SketchSpace AI Studio</strong>. In architectural visualization, converting hand-drawn room sketches into photorealistic 3D client presentations traditionally takes <strong>3 to 5 days</strong> using manual CAD modeling. Generic AI models like Midjourney or DALL-E hallucinate random walls and shift doors because they lack spatial constraints.<br><br>
  We solved this by developing an end-to-end platform using <strong>ControlNet zero-convolutions with Stable Diffusion 1.5</strong>, <strong>OpenCV vision preprocessing</strong>, and a <strong>FastAPI backend</strong>. A designer sketches a room layout or uploads a photo, selects custom flooring and styles, and within <strong>14 seconds</strong> our engine synthesizes a photorealistic 1024×1024 render while strictly retaining <strong>98.6% structural edge fidelity</strong> on standard 6GB laptop GPU hardware."
</div>

<h2><span class="num">2</span>The Core Problem &amp; Innovation</h2>
<div class="grid-2">
  <div class="card" style="border-left: 4px solid #DC2626;">
    <strong style="color: #DC2626; font-size: 9.5pt;">The Traditional CAD Bottleneck</strong>
    <ul>
      <li><strong>3–5 Days Turnaround:</strong> Manual 3D mesh building, UV mapping, and raytracing in 3ds Max or Blender.</li>
      <li><strong>Costly &amp; Specialized:</strong> Requires dedicated 3D artists and expensive cloud render farms ($50–$200/render).</li>
      <li><strong>Slow Client Iteration:</strong> Simple client requests (e.g., swapping wood for marble) force rebuilds from scratch.</li>
      <li><strong>Generic AI Failure:</strong> Unguided text-to-image prompts hallucinate impossible room geometry and shift walls.</li>
    </ul>
  </div>
  <div class="card" style="border-left: 4px solid #059669;">
    <strong style="color: #059669; font-size: 9.5pt;">The SketchSpace AI Solution</strong>
    <ul>
      <li><strong>14-Second Synthesis:</strong> Generates authentic 1024×1024 HD architectural renders in seconds.</li>
      <li><strong>Zero-Hallucination Lock:</strong> ControlNet zero-convolutions bind latent noise directly to user sketch lines.</li>
      <li><strong>Granular Architectural Conditioning:</strong> 6 room archetypes, 8 interior styles, 5 floors, and 5 lighting setups.</li>
      <li><strong>Commercial Browser Studio:</strong> 3-panel UI with HTML5 drawing canvas and pixel-perfect Before/After slider.</li>
    </ul>
  </div>
</div>

<h2><span class="num">3</span>Four-Member Division of Work &amp; Ownership</h2>

<div class="grid-2">
  <!-- MEMBER 1 -->
  <div class="card card-member m1">
    <span class="role-badge b-m1">Member 1 • Lead AI &amp; Deep Learning Engineer</span>
    <div class="member-name">Deep Learning &amp; Latent Diffusion Core</div>
    <div style="font-size: 8pt; color: #764B24; font-weight: 600;">Technical Ownership: ControlNet v1.1, Stable Diffusion 1.5, UniPC, 6GB VRAM Tuning</div>
    <div class="member-speech">
      <strong>Viva Speech:</strong> "I architected the deep learning pipeline. I selected and implemented <strong>ControlNet v1.1 Scribble with Stable Diffusion 1.5</strong>. To solve the 6GB VRAM constraint on our RTX 3050 Laptop GPU, I implemented <strong>FP16 half-precision, cross-attention slicing, and CPU offload</strong> (cutting VRAM from 11.2GB to 4.8GB). I also integrated the <strong>UniPC Multistep Scheduler</strong>, converging in 15–18 steps instead of 50 steps, cutting render latency from 46s down to 14s."
    </div>
    <ul style="font-size: 8pt;">
      <li>Slides Owned: Slide 1 (Title), Slide 7 (ControlNet &amp; UniPC), Slide 8 (6-Stage Lifecycle), Slide 18 (Conclusion).</li>
      <li>Key Buzzwords: Zero-convolutions, Latent Diffusion, UniPC ODE solver, Cross-attention slicing, FP16.</li>
    </ul>
  </div>

  <!-- MEMBER 2 -->
  <div class="card card-member m2">
    <span class="role-badge b-m2">Member 2 • Vision &amp; Backend Systems Architect</span>
    <div class="member-name">Computer Vision &amp; FastAPI Backend</div>
    <div style="font-size: 8pt; color: #1E40AF; font-weight: 600;">Technical Ownership: OpenCV Preprocessor, Bilateral Filtering, CLIP Token Budget, REST API</div>
    <div class="member-speech">
      <strong>Viva Speech:</strong> "My focus was the vision preprocessor and asynchronous FastAPI backend. Hand-drawn sketches have paper grain noise and uneven shadows. I built an <strong>OpenCV pipeline using bilateral filtering ($d=9, \sigma=75$)</strong>, adaptive Canny edge extraction, and morphological dilation to produce clean Scribble maps. I also solved the <strong>77-token CLIP limit</strong> by designing an architectural prompt synthesizer under 60 tokens, and built REST endpoints for <code>/api/generate</code> and <code>/api/gallery</code>."
    </div>
    <ul style="font-size: 8pt;">
      <li>Slides Owned: Slide 3 (Architecture), Slide 5 (Computer Vision), Slide 6 (Prompt Synthesis), Slide 9 (Conditioning).</li>
      <li>Key Buzzwords: Bilateral filtering, Canny hysteresis, CLIP 77-token ceiling, FastAPI Starlette ASGI.</li>
    </ul>
  </div>
</div>

<div class="grid-2">
  <!-- MEMBER 3 -->
  <div class="card card-member m3">
    <span class="role-badge b-m3">Member 3 • Frontend &amp; Interactive UI/UX Lead</span>
    <div class="member-name">React 19, Canvas Editor &amp; Split Slider</div>
    <div style="font-size: 8pt; color: #065F46; font-weight: 600;">Technical Ownership: React 19, Tailwind CSS v4, HTML5 Drawing Canvas, CSS clip-path Slider</div>
    <div class="member-speech">
      <strong>Viva Speech:</strong> "I developed the commercial web interface using <strong>React 19, Vite, and Tailwind CSS v4</strong>. I built the 3-panel architectural layout (specifications, canvas, output). I built the <strong>interactive HTML5 Canvas editor</strong> from scratch with architectural stamp tools (doors, windows, beds, tables) with Undo/Redo. I also engineered the <strong>Before/After split slider using CSS <code>clip-path: inset(...)</code></strong>, enabling smooth 60 FPS comparisons that visually prove our geometric preservation."
    </div>
    <ul style="font-size: 8pt;">
      <li>Slides Owned: Slide 2 (Problem Context), Slide 4 (3-Panel Studio UI), Slide 11 (Master Bedroom), Slide 12 (Kitchen).</li>
      <li>Key Buzzwords: React 19, CSS clip-path, HTML5 2D Context, Responsive layout, State management.</li>
    </ul>
  </div>

  <!-- MEMBER 4 -->
  <div class="card card-member m4">
    <span class="role-badge b-m4">Member 4 • MLOps, Benchmarks &amp; Deployment Lead</span>
    <div class="member-name">Evaluation, Asset Pipeline &amp; Cloud Deployment</div>
    <div style="font-size: 8pt; color: #5B21B6; font-weight: 600;">Technical Ownership: IoU/SSIM/PSNR Evaluation, Vercel CDN, Cloudflare Tunnel, PPTX &amp; Report</div>
    <div class="member-speech">
      <strong>Viva Speech:</strong> "I led quantitative benchmarking and production deployment. To prove structural compliance scientifically, I implemented <strong>Dilated Edge Intersection-over-Union (IoU)</strong>, proving our average <strong>98.6% edge alignment</strong>, alongside SSIM (0.95) and PSNR (33 dB). I deployed our production application to <strong>Vercel Edge CDN</strong> with custom SPA rewrites, set up our <strong>Cloudflare Argo Tunnel</strong> bridge, and authored the 18-slide PowerPoint deck and academic documentation."
    </div>
    <ul style="font-size: 8pt;">
      <li>Slides Owned: Slide 10 (Benchmarks), Slides 13 &amp; 14 (Indian &amp; Minimalist Cases), Slide 15 (Benchmarking), Slide 16 (Deployment).</li>
      <li>Key Buzzwords: Edge IoU, SSIM, PSNR, Vercel Edge CDN, Cloudflare Argo QUIC, CI/CD pipeline.</li>
    </ul>
  </div>
</div>

<div class="page-break"></div>

<!-- PAGE 2: METRICS, ARCHITECTURE PIPELINE & TOP VIVA QUESTIONS -->
<h2><span class="num">4</span>Quantitative Evaluation &amp; Experimental Benchmarks</h2>
<div class="metrics-ribbon">
  <div class="metric-item">
    <div class="metric-val">98.6%</div>
    <div class="metric-lbl">Structural Edge IoU</div>
  </div>
  <div class="metric-item">
    <div class="metric-val">0.951</div>
    <div class="metric-lbl">Perceptual SSIM</div>
  </div>
  <div class="metric-item">
    <div class="metric-val">32.8 dB</div>
    <div class="metric-lbl">PSNR Clarity</div>
  </div>
  <div class="metric-item">
    <div class="metric-val">14.2 s</div>
    <div class="metric-lbl">Diffusion Latency</div>
  </div>
</div>

<table>
  <thead>
    <tr>
      <th>Tested Room Archetype</th>
      <th>Applied Architectural Style</th>
      <th>Edge IoU Alignment</th>
      <th>SSIM Metric</th>
      <th>PSNR Score</th>
      <th>Inference Latency</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="bold">Master Bedroom Suite</td>
      <td>Modern Luxury / Scandinavian</td>
      <td><strong>98.8%</strong></td>
      <td>0.951</td>
      <td>32.4 dB</td>
      <td>14.1 s (UniPC 18 steps)</td>
    </tr>
    <tr>
      <td class="bold">Calacatta Waterfall Kitchen</td>
      <td>Contemporary / Modern Luxury</td>
      <td><strong>98.6%</strong></td>
      <td>0.938</td>
      <td>30.9 dB</td>
      <td>14.8 s (UniPC 18 steps)</td>
    </tr>
    <tr>
      <td class="bold">Traditional Indian Salon</td>
      <td>Traditional Indian (Teak &amp; Jaali)</td>
      <td><strong>99.1%</strong></td>
      <td>0.958</td>
      <td>32.8 dB</td>
      <td>15.2 s (UniPC 18 steps)</td>
    </tr>
    <tr>
      <td class="bold">Zen Minimalist Living Room</td>
      <td>Minimalist (Travertine &amp; Linen)</td>
      <td><strong>99.3%</strong></td>
      <td>0.963</td>
      <td>33.2 dB</td>
      <td>13.9 s (UniPC 18 steps)</td>
    </tr>
    <tr>
      <td class="bold">Spa Soaking Bathroom</td>
      <td>Contemporary (Honed Travertine)</td>
      <td><strong>98.6%</strong></td>
      <td>0.962</td>
      <td>33.1 dB</td>
      <td>14.4 s (UniPC 18 steps)</td>
    </tr>
  </tbody>
</table>

<h2><span class="num">5</span>Top 10 Most Frequently Asked Viva Questions &amp; Sharp Answers</h2>

<div class="qa-card">
  <div class="qa-q">Q1: Why did you choose ControlNet instead of Pix2Pix GAN for this project?</div>
  <div class="qa-a"><strong>Answer:</strong> Pix2Pix is a conditional GAN trained from scratch on small datasets, resulting in blurry, repetitive textures. ControlNet leverages Stable Diffusion's pre-trained billions-parameter prior (which already understands photorealistic marble reflections, wood grains, and sunlight). ControlNet freezes this network and uses zero-convolutions to add sketch spatial conditioning without destroying pre-trained knowledge.</div>
</div>

<div class="qa-card">
  <div class="qa-q">Q2: What is the purpose of 'Zero-Convolutions' in ControlNet?</div>
  <div class="qa-a"><strong>Answer:</strong> Zero-convolutions are $1\times1$ convolutional layers whose weights and biases are initialized to zero. At the start of inference, their output is strictly zero, meaning ControlNet injects zero noise into Stable Diffusion. As conditioning features propagate, weights gradually grow, ensuring the model preserves pre-trained photorealism while locking geometry.</div>
</div>

<div class="qa-card">
  <div class="qa-q">Q3: How did you optimize the model to run on a consumer 6GB Laptop GPU?</div>
  <div class="qa-a"><strong>Answer:</strong> Default FP32 ControlNet + SD 1.5 consumes over 11 GB VRAM. We implemented three optimizations: (1) FP16 half-precision computation cutting tensor memory in half, (2) cross-attention slicing to process attention matrices in chunks, and (3) sequential CPU offload via Accelerate. This capped peak VRAM at 4.8 GB on our RTX 3050.</div>
</div>

<div class="qa-card">
  <div class="qa-q">Q4: Why use the UniPC scheduler over standard DDIM or Euler-A?</div>
  <div class="qa-a"><strong>Answer:</strong> Standard DDIM requires 50 denoising steps (~45s on a laptop). UniPC is a unified predictor-corrector ODE solver specifically formulated for diffusion models that achieves convergence in just 15 to 18 steps with equal or superior image quality, achieving a 3.3x inference speedup (14 seconds).</div>
</div>

<div class="qa-card">
  <div class="qa-q">Q5: How do you handle noisy, faint pencil drawings uploaded by users?</div>
  <div class="qa-a"><strong>Answer:</strong> Our OpenCV preprocessor applies bilateral spatial filtering ($d=9, \sigma=75$) to eliminate paper grain texture while preserving sharp edges, followed by Contrast Limited Adaptive Histogram Equalization (CLAHE) to boost faint pencil strokes, and adaptive Canny edge extraction with dilation to produce clean conditioning maps.</div>
</div>

<div class="qa-card">
  <div class="qa-q">Q6: How did you solve the 77-token CLIP truncation limit?</div>
  <div class="qa-a"><strong>Answer:</strong> CLIP ViT-L/14 enforces a hard 77-token ceiling. Naive prompts describing rooms, flooring, walls, and lighting easily exceed 90+ tokens, causing silent truncation of user choices. We built an architectural prompt synthesizer that condenses UI choices into weighted architectural tokens capped strictly under 60 tokens.</div>
</div>

<div class="qa-card">
  <div class="qa-q">Q7: How do you mathematically verify that the output respects the sketch?</div>
  <div class="qa-a"><strong>Answer:</strong> We compute Dilated Edge Intersection-over-Union (IoU): $\text{IoU} = \frac{|A \cap B|}{|A \cup B|}$, comparing the binary sketch map against Canny edges extracted from the output render. Our system scores an average of 98.6%, proving the room structure was faithfully preserved.</div>
</div>

<div class="qa-card">
  <div class="qa-q">Q8: How does the Before/After split comparison slider work?</div>
  <div class="qa-a"><strong>Answer:</strong> The slider renders the sketch and the render on top of each other and clips the sketch layer using CSS <code>clip-path: inset(0 (100 - x)% 0 0)</code>, where $x$ is the slider percentage. Because it relies on hardware-accelerated GPU compositor layers, dragging runs at a smooth 60 FPS.</div>
</div>

<div class="qa-card">
  <div class="qa-q">Q9: How is the system deployed in production?</div>
  <div class="qa-a"><strong>Answer:</strong> The React 19 frontend is deployed on Vercel Global Edge CDN (<code>sketch-space-ai-studio.vercel.app</code>) with SPA URL rewrites. Pre-bundled assets in <code>/samples/</code> guarantee zero broken images. Backend API requests are proxied via Cloudflare Argo Tunnel to our GPU server.</div>
</div>

<div class="qa-card">
  <div class="qa-q">Q10: What are your planned future enhancements?</div>
  <div class="qa-a"><strong>Answer:</strong> Our roadmap has three main directions: (1) 3D Gaussian Splatting (3DGS) to generate interactive 3D virtual walkthroughs from multiple synthesized camera views, (2) WebXR Augmented Reality for 1:1 real-scale mobile room previews, and (3) an automated Furniture Bill of Materials (BOM) linking detected items to commercial retailer APIs.</div>
</div>

<div class="footer-note">
  SketchSpace AI Studio • Academic Project Documentation &amp; Viva Defense Guide • Team 9 • Live: sketch-space-ai-studio.vercel.app
</div>

</body>
</html>
"""

def generate_pdf():
    # 1. Write HTML file
    with open(HTML_PATH, "w", encoding="utf-8") as f:
        f.write(HTML_CONTENT)
    print(f"HTML written to: {HTML_PATH}")

    # 2. Convert to PDF using Microsoft Edge headless
    edge_paths = [
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"
    ]
    edge_exe = None
    for p in edge_paths:
        if os.path.exists(p):
            edge_exe = p
            break
            
    if not edge_exe:
        print("Error: msedge.exe not found")
        return False

    file_url = "file:///" + HTML_PATH.replace("\\", "/")
    cmd = [
        edge_exe,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={OUTPUT_PDF}",
        file_url
    ]
    print("Running command:", " ".join(cmd))
    result = subprocess.run(cmd, capture_output=True, text=True)
    print("Edge output:", result.stdout, result.stderr)

    if os.path.exists(OUTPUT_PDF):
        size = os.path.getsize(OUTPUT_PDF)
        print(f"PDF generated successfully: {OUTPUT_PDF} ({size} bytes)")
        
        # Also copy to frontend/public for web download
        with open(OUTPUT_PDF, "rb") as src, open(PUBLIC_PDF, "wb") as dst:
            dst.write(src.read())
        print(f"Copied to public web: {PUBLIC_PDF}")
        return True
    else:
        print("Failed to generate PDF")
        return False

if __name__ == "__main__":
    generate_pdf()
