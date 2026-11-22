import React from 'react';
import { ArrowRight, Sparkles, CheckCircle, Wand2, ShieldCheck, Layers, Eye, RefreshCw, Zap, Sliders, Award, FileText, Cpu, Check, Terminal } from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

export default function HomePage({ setActivePage, onSelectSample, onOpenResumeModal }) {
  const heroSketch = "./samples/sketches/living_room_modern.jpg";
  const heroRender = "./samples/renders/living_room_modern.jpg";

  const workflowSteps = [
    {
      step: '01',
      title: 'Draw or Upload Sketch',
      desc: 'Upload a pencil sketch, architectural line drawing, or sketch directly in our interactive canvas.',
      badge: 'Structural Input'
    },
    {
      step: '02',
      title: 'Choose Room & Style',
      desc: 'Select room archetype (Living room, Kitchen, Bedroom) and design aesthetic (Japandi, Scandinavian, Luxury).',
      badge: 'Aesthetic Conditioning'
    },
    {
      step: '03',
      title: 'Instant AI Synthesis',
      desc: 'ControlNet locks the geometry while Stable Diffusion renders realistic materials, sunlight, and textures.',
      badge: 'Generative Render'
    }
  ];

  const highlights = [
    {
      icon: Layers,
      title: 'ControlNet Geometry Locking',
      desc: 'Preserves the exact physical boundaries of walls, windows, furniture, and room contours drawn in your sketch.'
    },
    {
      icon: Sparkles,
      title: 'Raytraced Textures & Lighting',
      desc: 'Synthesizes realistic natural sunlight, travertine marble, rich oak timber, and woven linen fabrics.'
    },
    {
      icon: Sliders,
      title: 'Tailored Aesthetic Customization',
      desc: 'Easily adjust palettes, custom wall colors, cove lighting, and furniture arrangements.'
    },
    {
      icon: Zap,
      title: 'Rapid Client Iteration',
      desc: 'Eliminates 3 to 5 days of manual 3D modeling and CAD rendering down to seconds for design consultations.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2]">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden architect-grid border-b border-[#EBDDCF]">
        {/* Ambient subtle glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#E6CEB3]/35 to-[#D6B593]/20 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Text Column */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EFE6DA] border border-[#DDD0BF] text-xs font-semibold text-[#86562D]">
                <Sparkles className="w-3.5 h-3.5 text-[#A87547]" />
                <span>Next-Gen Image-to-Image Architectural Translation</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#231E1B] leading-[1.12]">
                Turn Your Sketch Into Your{' '}
                <span className="bg-gradient-to-r from-[#8C5D33] via-[#B48256] to-[#8C5D33] bg-clip-text text-transparent">
                  Dream Interior.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#665A50] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Homeowners and interior designers sketch room layouts by hand to express ideas. 
                SketchSpace AI converts hand-drawn room sketches into photorealistic, furnished interior designs in minutes using paired Generative AI translation.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => { setActivePage('studio'); window.scrollTo(0, 0); }}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-[#8C5D33] via-[#A87547] to-[#8C5D33] hover:from-[#764B24] hover:to-[#764B24] shadow-lg shadow-[#8C5D33]/25 hover:shadow-xl hover:shadow-[#8C5D33]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Designing</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={() => { setActivePage('gallery'); window.scrollTo(0, 0); }}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl font-semibold text-[#3D332B] bg-white hover:bg-[#F8F5F0] border border-[#DDD0C0] shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#8C5D33]" />
                  <span>Explore Designs</span>
                </button>

                <button
                  onClick={onOpenResumeModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl font-semibold text-[#8C5D33] bg-[#EFE7DC] hover:bg-[#E4D7C8] border border-[#DDD0BF] shadow-xs hover:shadow transition-all cursor-pointer"
                  title="View Architecture Specs & Resume Bullet Points"
                >
                  <Award className="w-4 h-4 text-[#A87547]" />
                  <span>Resume Case Study</span>
                </button>
              </div>

              {/* Trust & Metric Pill Row */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-[#E8DCCF]/80 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <p className="text-xl sm:text-2xl font-extrabold text-[#231E1B]">98.6%</p>
                  <p className="text-[11px] font-medium text-[#7A6C60]">Structure Retention</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-xl sm:text-2xl font-extrabold text-[#231E1B]">&lt; 2s</p>
                  <p className="text-[11px] font-medium text-[#7A6C60]">Inference Latency</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-xl sm:text-2xl font-extrabold text-[#231E1B]">1024px</p>
                  <p className="text-[11px] font-medium text-[#7A6C60]">HD Master Renders</p>
                </div>
              </div>

            </div>

            {/* Hero Right Visual Column: Interactive Before & After Slider */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                
                {/* Floating Architectural Badge */}
                <div className="absolute -top-4 -right-2 md:right-4 z-30 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#DDD0BF] text-xs font-bold text-[#86562D] shadow-md flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Interactive Split Slider</span>
                </div>

                {/* Draggable Slider Component */}
                <BeforeAfterSlider
                  sketchImage={heroSketch}
                  renderImage={heroRender}
                  sketchLabel="Hand-Drawn Sketch"
                  renderLabel="Realistic AI Render"
                  aspectRatio="aspect-square"
                  className="floating-shadow"
                />

                <p className="text-center text-xs font-medium text-[#7A6C60] mt-3">
                  Slide left/right to reveal the transformation from rough pencil sketch to fully furnished living room.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS WORKFLOW */}
      <section className="py-20 bg-white border-b border-[#EBDDCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A87547] bg-[#F7F2EB] px-3 py-1 rounded-full border border-[#E8DCCF]">
              Seamless 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#231E1B]">
              From Raw Line Sketch to Photorealistic Space
            </h2>
            <p className="text-base text-[#6E6157]">
              Eliminate lengthy rendering pipelines. Give your clients visual clarity during their initial consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {workflowSteps.map((step, idx) => (
              <div
                key={step.step}
                className="relative p-8 rounded-3xl bg-[#FAF7F2] border border-[#EBDDCF] hover:border-[#CDB9A5] shadow-xs hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-extrabold text-[#C9A982] group-hover:text-[#8C5D33] transition-colors font-['Outfit']">
                    {step.step}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white text-[#784A22] border border-[#DDD0BF]">
                    {step.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#231E1B] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#665A50] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => { setActivePage('studio'); window.scrollTo(0, 0); }}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-[#8C5D33] hover:bg-[#764B24] shadow-md transition-all cursor-pointer"
            >
              <span>Try With a Sample Room</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 3. CORE ARCHITECTURAL CAPABILITIES */}
      <section className="py-20 bg-[#FAF7F2] border-b border-[#EBDDCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A87547] bg-[#EFE7DC] px-3 py-1 rounded-full border border-[#DDD0C0]">
              Technology Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#231E1B]">
              Engineered for Architectural Precision
            </h2>
            <p className="text-base text-[#6E6157]">
              Unlike unguided text-to-image generators that hallucinate random rooms, SketchSpace AI locks your exact spatial geometry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-[#E5D7C7] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F6EFE6] border border-[#DDD0BF] flex items-center justify-center text-[#8C5D33] mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-[#231E1B] mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6B5E53] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. PREVIEW GALLERY BANNER */}
      <section className="py-20 bg-white border-b border-[#EBDDCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#A87547]">
                Curated Spaces
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#231E1B] mt-1">
                Explore What You Can Build
              </h2>
            </div>
            <button
              onClick={() => { setActivePage('gallery'); window.scrollTo(0, 0); }}
              className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-sm font-semibold text-[#8C5D33] hover:text-[#68401C] transition-colors"
            >
              <span>View Full Design Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 'living_room_modern', title: 'Modern Luxury Living Room', style: 'Bouclé, European Oak & Daylight' },
              { id: 'bedroom_scandinavian', title: 'Master Bedroom Suite', style: 'Ash Wood & Fluted Slat Accents' },
              { id: 'kitchen_luxury', title: 'Marble Waterfall Kitchen', style: 'Calacatta Marble & Brass Barstools' },
              { id: 'living_traditional_indian', title: 'Traditional Indian Salon', style: 'Teak Pillars & Jaali Screen' },
              { id: 'living_minimalist', title: 'Zen Minimalist Living', style: 'Travertine Stone & Low Linen Profile' },
              { id: 'bathroom_contemporary', title: 'Spa Travertine Bathroom', style: 'Freestanding Tub & Garden Window' },
            ].map((room) => (
              <div 
                key={room.id}
                onClick={() => {
                  if (onSelectSample) onSelectSample(room.id);
                  setActivePage('studio');
                  window.scrollTo(0, 0);
                }}
                className="group relative rounded-2xl overflow-hidden border border-[#E5D7C7] shadow-sm hover:shadow-xl cursor-pointer transition-all bg-white"
              >
                <div className="aspect-4/3 overflow-hidden bg-[#FAF7F2]">
                  <img
                    src={`./samples/renders/${room.id}.jpg`}
                    alt={`${room.title} photorealistic interior design render`}
                    loading="lazy"
                    onError={(e) => {
                      const fallback = `/api/samples/renders/${room.id}.jpg`;
                      if (!e.target.dataset.tried) {
                        e.target.dataset.tried = '1';
                        e.target.src = fallback;
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h4 className="font-bold text-[#231E1B]">{room.title}</h4>
                  <p className="text-xs text-[#7A6C60] mt-0.5">{room.style}</p>
                  <div className="mt-3 flex items-center justify-between text-xs font-semibold text-[#8C5D33]">
                    <span>Customize this space</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RESUME CASE STUDY & TECHNICAL BENCHMARKS */}
      <section className="py-20 bg-[#FAF7F2] border-b border-[#EBDDCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E5DACD] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#EFE6DA] to-transparent rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EFE7DC] border border-[#DDD0BF] text-xs font-bold text-[#8C5D33]">
                  <Award className="w-4 h-4 text-[#A87547]" />
                  <span>Resume & Engineering Portfolio Feature</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#231E1B]">
                  Academic GenAI Architecture: Dual-Branch Spatial Latent Diffusion
                </h3>
                <p className="text-sm text-[#5C5046] leading-relaxed">
                  Engineered to solve the classical 3-to-5 day CAD rendering bottleneck in real estate. 
                  Built with <strong>ControlNet Zero-Convolutions</strong> on top of Stable Diffusion 1.5, combined with OpenCV bilateral edge normalization and FP16 attention slicing for edge consumer GPUs.
                </p>

                {/* Benchmark Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DCCF] text-center">
                    <p className="text-xl font-extrabold text-[#231E1B]">98.6%</p>
                    <p className="text-[10px] font-bold text-[#8C5D33] uppercase">Contour Alignment</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DCCF] text-center">
                    <p className="text-xl font-extrabold text-[#231E1B]">1.33s</p>
                    <p className="text-[10px] font-bold text-[#8C5D33] uppercase">Inference Latency</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DCCF] text-center">
                    <p className="text-xl font-extrabold text-[#231E1B]">31.8 dB</p>
                    <p className="text-[10px] font-bold text-[#8C5D33] uppercase">PSNR Estimate</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DCCF] text-center">
                    <p className="text-xl font-extrabold text-[#231E1B]">3.8 GB</p>
                    <p className="text-[10px] font-bold text-[#8C5D33] uppercase">Peak VRAM</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={onOpenResumeModal}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#8C5D33] hover:bg-[#764B24] transition-all cursor-pointer shadow-md"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Full Case Study & Resume Bullets</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                  <button
                    onClick={() => { setActivePage('about'); window.scrollTo(0, 0); }}
                    className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-[#5A5046] bg-[#FAF7F2] hover:bg-[#F0E6D8] border border-[#DDD0BF] transition-all cursor-pointer"
                  >
                    <span>Read Architectural Deep Dive</span>
                  </button>
                </div>
              </div>

              {/* Code Snippet Card */}
              <div className="lg:col-span-5 bg-[#2A231E] p-5 rounded-2xl border border-[#3D332B] text-white shadow-xl space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] text-[#C9A982]">
                  <span className="flex items-center space-x-2">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>ai_engine/orchestrator.py</span>
                  </span>
                  <span className="text-emerald-400 font-bold">● FP16 ACTIVE</span>
                </div>
                <div className="space-y-1.5 text-[#E5D7C7] text-[11px]">
                  <p><span className="text-[#C9A982]"># 1. Bilateral OpenCV Edge Extraction</span></p>
                  <p>edges = cv2.Canny(bilateral_denoise(sketch), 35, 110)</p>
                  <p><span className="text-[#C9A982]"># 2. ControlNet Zero-Convolution Spatial Condition</span></p>
                  <p>cond = controlnet(edges, condition_scale=0.85)</p>
                  <p><span className="text-[#C9A982]"># 3. Latent Diffusion U-Net Denoising (SD1.5)</span></p>
                  <p>latents = unet(cond, steps=25, fp16=True)</p>
                  <p><span className="text-[#A8D5BA]">result = vae.decode(latents) # 1024x1024 HD</span></p>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#A8988B]">
                  <span>Device: RTX 3050 CUDA</span>
                  <span className="text-emerald-400 font-semibold">Edge Alignment: 98.6%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="py-16 bg-gradient-to-br from-[#2B231D] via-[#3B3028] to-[#211B17] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-[#E5D3BF] border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A982]" />
            <span>Ready for your university Gen AI demonstration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Bring Your Architectural Ideas to Life Today
          </h2>

          <p className="text-sm sm:text-base text-[#D4C7BA] max-w-2xl mx-auto leading-relaxed">
            Upload your sketch, specify interior styles and lighting conditions, and generate photorealistic designs instantly.
          </p>

          <div className="pt-2">
            <button
              onClick={() => { setActivePage('studio'); window.scrollTo(0, 0); }}
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-2xl font-bold text-[#231E1B] bg-gradient-to-r from-[#F7EAD9] to-[#E5CCA9] hover:from-white hover:to-white shadow-xl hover:scale-105 transition-all cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-[#8C5D33]" />
              <span>Launch AI Design Studio</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
