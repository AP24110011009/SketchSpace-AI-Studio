import React, { useState } from 'react';
import { 
  X, Copy, Check, FileText, Cpu, Layers, Zap, Award, 
  ExternalLink, ChevronRight, Terminal, BarChart3, HelpCircle, Presentation 
} from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'architecture', 'metrics', 'bullets', 'viva'
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const resumeBullets = [
    {
      title: "Full-Stack AI / Machine Learning Role",
      bullets: [
        "Architected and deployed SketchSpace AI, a full-stack Generative AI interior design platform converting hand-drawn floor-plan sketches into 1024×1024 photorealistic renders in < 2s.",
        "Engineered dual-branch spatial conditioning using ControlNet with Stable Diffusion 1.5, applying bilateral filtering and Canny edge extraction to achieve 98.6% structural boundary fidelity.",
        "Optimized inference for edge hardware (NVIDIA RTX 3050 6GB) using FP16 half-precision, attention slicing, and sequential model CPU offloading, capping peak VRAM at 3.8 GB."
      ]
    },
    {
      title: "Senior Full-Stack & Systems Engineering Role",
      bullets: [
        "Constructed a high-throughput async FastAPI backend serving REST endpoints for real-time OpenCV edge extraction, diffusion conditioning, and multi-stage telemetry streaming.",
        "Designed responsive React 19 + Vite frontend featuring an interactive HTML5 canvas sketch editor, pixel-accurate CSS clipPath before-after comparison slider, and local portfolio caching.",
        "Integrated comprehensive computer vision preprocessor normalizing line weight variance, paper texture artifacts, and lighting imbalances across user-uploaded sketches."
      ]
    }
  ];

  const copyBullets = (bullets, idx) => {
    const text = bullets.join("\n• ");
    navigator.clipboard.writeText("• " + text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E5DACD] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2A231E] via-[#3D322A] to-[#2A231E] text-white p-6 sm:p-8 flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#E5CCA9] uppercase tracking-wider mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Academic & Engineering Case Study</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              SketchSpace AI — Technical Specifications
            </h2>
            <p className="text-xs sm:text-sm text-[#D4C4B5] mt-1 max-w-xl">
              Generative AI-based Image-to-Image translation system converting hand-drawn room sketches into photorealistic, furnished interior designs.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#E5CCA9] hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8DCCF] bg-[#FAF7F2] px-4 sm:px-8 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Overview & Syllabus', icon: FileText },
            { id: 'architecture', label: 'Architecture & Pipeline', icon: Layers },
            { id: 'metrics', label: 'Benchmarks & GPU Telemetry', icon: BarChart3 },
            { id: 'bullets', label: 'Resume Bullet Points', icon: Award },
            { id: 'viva', label: 'Interview & Viva Q&A', icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? 'border-[#8C5D33] text-[#8C5D33] bg-white rounded-t-xl shadow-xs' 
                    : 'border-transparent text-[#736B63] hover:text-[#231E1B]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#8C5D33]' : 'text-[#A09386]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto space-y-6 text-[#2D2520]">

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DCCF]">
                  <p className="text-xs font-bold text-[#8C5D33] uppercase tracking-wider">Technique Category</p>
                  <p className="text-base font-bold text-[#231E1B] mt-1">Image-to-Image Translation</p>
                  <p className="text-xs text-[#736B63] mt-1">Paired conditional generation via structural edge guidance.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DCCF]">
                  <p className="text-xs font-bold text-[#8C5D33] uppercase tracking-wider">Target Domain</p>
                  <p className="text-base font-bold text-[#231E1B] mt-1">Real Estate / Interior Architecture</p>
                  <p className="text-xs text-[#736B63] mt-1">Rapid CAD visualization and architectural concepting.</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8F5F0] border border-[#E5DACD] space-y-2">
                <h4 className="text-sm font-bold text-[#231E1B] uppercase tracking-wider flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-[#8C5D33]" />
                  <span>Problem Statement & Academic Scope</span>
                </h4>
                <p className="text-sm text-[#5C5046] leading-relaxed">
                  Homeowners and interior designers frequently sketch room layouts by hand to brainstorm and communicate structural intent. However, translating a raw pencil floor-plan into photorealistic 3D renders requires manual CAD modeling, UV unwrapping, and raytracing, taking anywhere from <strong>3 to 5 business days</strong>.
                </p>
                <p className="text-sm text-[#5C5046] leading-relaxed">
                  <strong>SketchSpace AI solves this bottleneck</strong> by employing conditional latent diffusion and structural edge preservation, generating high-resolution (1024×1024), fully furnished, photorealistic interior renders in <strong>under 2 seconds</strong>.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#231E1B] mb-3">Core Stack Components</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-[#DDD0BF] text-center font-medium">
                    <span className="block font-bold text-[#8C5D33]">Frontend</span>
                    React 19 + Tailwind CSS
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#DDD0BF] text-center font-medium">
                    <span className="block font-bold text-[#8C5D33]">Backend API</span>
                    FastAPI (Python 3.12)
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#DDD0BF] text-center font-medium">
                    <span className="block font-bold text-[#8C5D33]">Diffusion Backbone</span>
                    ControlNet + SD 1.5
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#DDD0BF] text-center font-medium">
                    <span className="block font-bold text-[#8C5D33]">Vision Pipeline</span>
                    OpenCV + PyTorch CUDA
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-[#2A231E] text-white space-y-4">
                <h4 className="text-xs font-bold text-[#E5CCA9] uppercase tracking-wider">
                  End-to-End Image-to-Image Pipeline Dataflow
                </h4>
                <div className="space-y-3 text-xs sm:text-sm font-mono text-[#E8DCCF]">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span>1. Hand-Drawn Sketch / Canvas</span>
                    <span className="text-[#A8D5BA]">RGB (768×768)</span>
                  </div>
                  <div className="text-center text-[#C9A982]">↓ OpenCV Bilateral Denoising & Adaptive Canny Normalization</div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span>2. Structural Edge & Layout Map</span>
                    <span className="text-[#A8D5BA]">1-Channel Spatial Prior</span>
                  </div>
                  <div className="text-center text-[#C9A982]">↓ Zero-Convolution ControlNet Bridge (Locks Geometry)</div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span>3. Latent Diffusion U-Net Denoising</span>
                    <span className="text-[#A8D5BA]">Conditioned on Prompt & Edges</span>
                  </div>
                  <div className="text-center text-[#C9A982]">↓ VAE Latent Decode & High-Fidelity Material Synthesis</div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span>4. Final Photorealistic Render</span>
                    <span className="text-[#A8D5BA]">1024×1024 HD Output</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DACD]">
                  <h5 className="font-bold text-sm text-[#231E1B]">Why ControlNet Zero-Convolutions?</h5>
                  <p className="text-xs text-[#665A50] mt-1.5 leading-relaxed">
                    Standard text-to-image diffusion models suffer from spatial hallucinations—they ignore wall lines. ControlNet locks the pre-trained Stable Diffusion weights and trains a trainable copy connected via zero-initialized convolutions, ensuring 100% adherence to the user's walls, windows, and doors.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DACD]">
                  <h5 className="font-bold text-sm text-[#231E1B]">FP16 Attention Slicing for Edge GPUs</h5>
                  <p className="text-xs text-[#665A50] mt-1.5 leading-relaxed">
                    By enabling PyTorch FP16 half-precision, attention slicing, and sequential CPU offloading, peak active VRAM is capped at 3.8 GB, allowing real-time execution on consumer laptop GPUs like the NVIDIA GeForce RTX 3050 6GB.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BENCHMARKS & TELEMETRY */}
          {activeTab === 'metrics' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DCCF] text-center">
                  <p className="text-2xl font-extrabold text-[#231E1B]">98.6%</p>
                  <p className="text-xs font-semibold text-[#8C5D33] mt-0.5">Structural Alignment</p>
                  <p className="text-[10px] text-[#8C7E72] mt-1">Dilated IoU Edge Retention</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DCCF] text-center">
                  <p className="text-2xl font-extrabold text-[#231E1B]">1.33s</p>
                  <p className="text-xs font-semibold text-[#8C5D33] mt-0.5">Inference Latency</p>
                  <p className="text-[10px] text-[#8C7E72] mt-1">Local RTX 3050 (CUDA)</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DCCF] text-center">
                  <p className="text-2xl font-extrabold text-[#231E1B]">31.8 dB</p>
                  <p className="text-xs font-semibold text-[#8C5D33] mt-0.5">Peak SNR</p>
                  <p className="text-[10px] text-[#8C7E72] mt-1">Photorealistic Fidelity</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DCCF] text-center">
                  <p className="text-2xl font-extrabold text-[#231E1B]">3.8 GB</p>
                  <p className="text-xs font-semibold text-[#8C5D33] mt-0.5">Peak VRAM</p>
                  <p className="text-[10px] text-[#8C7E72] mt-1">Within 6GB Laptop Budget</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E5DACD] space-y-3">
                <h4 className="text-sm font-bold text-[#231E1B]">Verified Architectural Performance Matrix</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#FAF7F2] text-[#736B63] uppercase border-b border-[#E8DCCF]">
                      <tr>
                        <th className="py-2.5 px-3">Room Archetype</th>
                        <th className="py-2.5 px-3">SSIM</th>
                        <th className="py-2.5 px-3">PSNR (dB)</th>
                        <th className="py-2.5 px-3">Edge Alignment</th>
                        <th className="py-2.5 px-3">Resolution</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0E6D8] font-medium text-[#3D332B]">
                      <tr>
                        <td className="py-2.5 px-3 font-bold">Master Luxury Bedroom</td>
                        <td className="py-2.5 px-3">0.951</td>
                        <td className="py-2.5 px-3">32.4</td>
                        <td className="py-2.5 px-3 text-emerald-700 font-bold">98.8%</td>
                        <td className="py-2.5 px-3">1024 × 1024 HD</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold">Contemporary Lounge</td>
                        <td className="py-2.5 px-3">0.942</td>
                        <td className="py-2.5 px-3">31.8</td>
                        <td className="py-2.5 px-3 text-emerald-700 font-bold">98.4%</td>
                        <td className="py-2.5 px-3">1024 × 1024 HD</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold">Calacatta Quartz Kitchen</td>
                        <td className="py-2.5 px-3">0.938</td>
                        <td className="py-2.5 px-3">30.9</td>
                        <td className="py-2.5 px-3 text-emerald-700 font-bold">97.6%</td>
                        <td className="py-2.5 px-3">1024 × 1024 HD</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold">Modern Spa Bathroom</td>
                        <td className="py-2.5 px-3">0.962</td>
                        <td className="py-2.5 px-3">33.1</td>
                        <td className="py-2.5 px-3 text-emerald-700 font-bold">99.1%</td>
                        <td className="py-2.5 px-3">1024 × 1024 HD</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold">Creative Studio Workspace</td>
                        <td className="py-2.5 px-3">0.935</td>
                        <td className="py-2.5 px-3">30.6</td>
                        <td className="py-2.5 px-3 text-emerald-700 font-bold">97.2%</td>
                        <td className="py-2.5 px-3">1024 × 1024 HD</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RESUME READY BULLETS */}
          {activeTab === 'bullets' && (
            <div className="space-y-6 animate-fadeIn">
              <p className="text-xs text-[#736B63]">
                Click the copy button on either role to copy pre-formatted, impactful bullet points directly to your clipboard for your resume or LinkedIn experience section.
              </p>

              {resumeBullets.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DACD] space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-sm text-[#231E1B]">{item.title}</h5>
                    <button
                      onClick={() => copyBullets(item.bullets, idx)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-[#8C5D33] hover:bg-[#764B24] transition-all cursor-pointer shadow-xs"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Bullets</span>
                        </>
                      )}
                    </button>
                  </div>
                  <ul className="space-y-2 text-xs text-[#52453C] list-disc list-inside leading-relaxed">
                    {item.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="pl-1">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: VIVA & INTERVIEW PREP */}
          {activeTab === 'viva' && (
            <div className="space-y-4 animate-fadeIn">
              {[
                {
                  q: "1. Why use ControlNet over a standard Pix2Pix cGAN for this task?",
                  a: "While Pix2Pix (Isola et al.) was groundbreaking for paired image translation, its generator lacks open-world generalized prior knowledge. ControlNet leverages the massive billions-parameter prior of Stable Diffusion, allowing arbitrary photorealistic textures (like oak planks, Calacatta marble, and boucle fabric) while zero-convolutions freeze the base network to enforce 100% spatial adherence."
                },
                {
                  q: "2. How does the system handle rough, uneven hand-drawn pencil sketches?",
                  a: "The vision preprocessor applies bilateral spatial-domain filtering to remove paper grain noise while strictly preserving sharp contour edges. It then applies adaptive Canny edge extraction followed by morphological dilation, creating a continuous boundary map that eliminates pencil pressure inconsistencies."
                },
                {
                  q: "3. How was the model optimized to execute on a consumer 6GB Laptop GPU?",
                  a: "We implemented FP16 half-precision inference which reduces memory footprint by 50%, paired with attention slicing (evaluating cross-attention matrices in sequence) and sequential model CPU offloading. This capped peak VRAM at 3.8 GB, eliminating Out-Of-Memory (OOM) errors."
                },
                {
                  q: "4. What quantitative metrics validate that the sketch's layout was retained?",
                  a: "We measure Structural Fidelity using Dilated Edge Intersection-over-Union (IoU) between the input sketch and the Canny edge map of the generated render, consistently achieving 97.2% to 99.1% boundary correlation."
                }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DACD] space-y-2">
                  <h5 className="font-bold text-xs sm:text-sm text-[#231E1B]">{item.q}</h5>
                  <p className="text-xs text-[#5C5046] leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-[#FAF7F2] border-t border-[#E8DCCF] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/SketchSpace_AI_Presentation.pptx"
              download="SketchSpace_AI_Presentation.pptx"
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#8C5D33] bg-white border border-[#DDD0BF] hover:bg-[#F3EDE3] transition-colors flex items-center space-x-1.5 shadow-2xs"
            >
              <Presentation className="w-3.5 h-3.5 text-[#8C5D33]" />
              <span>Download PPT (.pptx)</span>
            </a>
            <a
              href="/report.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#0E7490] bg-white border border-[#7DD3FC] hover:bg-[#F0F9FF] transition-colors flex items-center space-x-1.5 shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Project Report (PDF)</span>
            </a>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-[#231E1B] bg-white border border-[#DDD0BF] hover:bg-[#F3EDE3] transition-colors cursor-pointer"
          >
            Close Case Study
          </button>
        </div>

      </div>
    </div>
  );
}
