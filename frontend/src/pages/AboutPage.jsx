import React from 'react';
import { Layers, Sparkles, Cpu, BookOpen, Compass, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AboutPage({ setActivePage }) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 md:py-20 border-b border-[#EBDDCF]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EFE6DA] text-xs font-semibold text-[#86562D] border border-[#DDD0BF]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Generative AI Subject • Academic Documentation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#231E1B] tracking-tight">
            About SketchSpace AI
          </h1>
          <p className="text-base sm:text-lg text-[#6E6157] max-w-2xl mx-auto leading-relaxed">
            Exploring the mathematics, architecture, and engineering behind deep structural Image-to-Image translation in architecture.
          </p>
        </div>

        {/* 1. Project Synopsis & Problem Statement */}
        <div className="p-8 rounded-3xl bg-white border border-[#E8DCCF] shadow-sm space-y-4">
          <div className="flex items-center space-x-3 text-[#8C5D33]">
            <Compass className="w-6 h-6" />
            <h2 className="text-2xl font-bold text-[#231E1B]">The Architectural Problem</h2>
          </div>
          <p className="text-sm sm:text-base text-[#60544B] leading-relaxed">
            Homeowners and interior designers naturally sketch room layouts by hand to brainstorm room arrangements, furniture placement, and spatial balance. However, translating a conceptual pencil sketch into a photorealistic 3D render conventionally requires days of manual CAD modeling, UV material mapping, polygonal lighting setups, and computationally heavy raytracing.
          </p>
          <p className="text-sm sm:text-base text-[#60544B] leading-relaxed">
            <strong>SketchSpace AI</strong> bridges this gap by employing paired Image-to-Image translation. Using structural conditioning, our system converts 2D line sketches into photorealistic, furnished interior designs in seconds while strictly honoring user-drawn room geometry.
          </p>
        </div>

        {/* 2. Core Generative AI Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Pillar 1: ControlNet Structural Preservation */}
          <div className="p-8 rounded-3xl bg-white border border-[#E8DCCF] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F6EFE6] flex items-center justify-center text-[#8C5D33] border border-[#E0D3C3]">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#231E1B]">
              1. ControlNet Zero-Convolution Guidance
            </h3>
            <p className="text-sm text-[#665A50] leading-relaxed">
              Standard diffusion models hallucinate geometry from random noise based solely on text prompts. <strong>ControlNet (Zhang & Agrawala, ICCV 2023)</strong> locks the spatial layout by cloning the trainable weights of the U-Net and adding <em>Zero Convolutions</em> ($1\times1$ convs initialized to zero).
            </p>
            <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DCCF] text-xs text-[#52463D] font-mono">
              y = F(x; Θ) + Z(F(x + Z(c; Θ_z1); Θ_c); Θ_z2)
            </div>
            <p className="text-xs text-[#7A6C60] leading-relaxed">
              This guarantees that walls, windows, ceiling lines, and furniture silhouettes drawn by the designer are strictly preserved during diffusion denoising steps.
            </p>
          </div>

          {/* Pillar 2: Latent Diffusion & Stable Diffusion */}
          <div className="p-8 rounded-3xl bg-white border border-[#E8DCCF] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F6EFE6] flex items-center justify-center text-[#8C5D33] border border-[#E0D3C3]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#231E1B]">
              2. Stable Diffusion Photorealism
            </h3>
            <p className="text-sm text-[#665A50] leading-relaxed">
              <strong>Stable Diffusion (Rombach et al., CVPR 2022)</strong> operates in a lower-dimensional latent space via an autoencoder (VAE). Through reverse score-based diffusion, it gradually removes Gaussian noise conditioned on cross-attention text embeddings.
            </p>
            <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DCCF] text-xs text-[#52463D] font-mono">
              L_LDM = E[ || ε - ε_θ(z_t, t, τ_θ(y), c_sketch) ||^2 ]
            </div>
            <p className="text-xs text-[#7A6C60] leading-relaxed">
              It synthesizes physical illumination, realistic shadows, travertine marble reflections, wood grains, and woven fabrics conforming to the sketch contour.
            </p>
          </div>

        </div>

        {/* 3. Pix2Pix Conditional GAN Comparison */}
        <div className="p-8 rounded-3xl bg-white border border-[#E8DCCF] shadow-sm space-y-6">
          <div className="flex items-center space-x-3 text-[#8C5D33]">
            <Cpu className="w-6 h-6" />
            <h2 className="text-2xl font-bold text-[#231E1B]">
              Comparative Architecture: Pix2Pix vs. ControlNet
            </h2>
          </div>
          <p className="text-sm text-[#665A50] leading-relaxed">
            In Generative AI curricula, <strong>Pix2Pix (Isola et al., CVPR 2017)</strong> represents the classic adversarial paired translation framework, while <strong>ControlNet</strong> represents the modern state-of-the-art conditional latent diffusion framework.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E0D3C3] bg-[#F7F2EA] text-[#4F443B]">
                  <th className="p-3 font-bold">Feature</th>
                  <th className="p-3 font-bold">Pix2Pix (cGAN)</th>
                  <th className="p-3 font-bold text-[#8C5D33]">ControlNet + Stable Diffusion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBDDCF] text-[#60544B]">
                <tr>
                  <td className="p-3 font-bold text-[#231E1B]">Core Architecture</td>
                  <td className="p-3">U-Net Generator + 70x70 PatchGAN</td>
                  <td className="p-3 font-semibold text-[#8C5D33]">Latent U-Net + Zero-Conv Branched Encoder</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#231E1B]">Training Loss</td>
                  <td className="p-3">Adversarial Minimax + L1 Reconstruction</td>
                  <td className="p-3 font-semibold text-[#8C5D33]">Score Matching Mean Squared Error (MSE)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#231E1B]">Prompt Conditioning</td>
                  <td className="p-3">Fixed paired domain mapping</td>
                  <td className="p-3 font-semibold text-[#8C5D33]">Flexible Cross-Attention Text + Edge Conditioning</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#231E1B]">Texture Realism</td>
                  <td className="p-3">Can exhibit slight blur / artifacts</td>
                  <td className="p-3 font-semibold text-[#8C5D33]">Photorealistic 8K raytraced materials</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Practical Industry Benefits */}
        <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E0D3C3] space-y-6">
          <h3 className="text-xl font-bold text-[#231E1B]">
            Real-World Impact for Homeowners & Interior Designers
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 p-4 rounded-2xl bg-white border border-[#E8DCCF]">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#231E1B]">Instant Client Alignment</h4>
                <p className="text-xs text-[#6B5E53] mt-1">Designers can sketch in real time during consultations and show clients their vision in minutes rather than days.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-2xl bg-white border border-[#E8DCCF]">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#231E1B]">Rapid Style Exploration</h4>
                <p className="text-xs text-[#6B5E53] mt-1">Easily toggle between Japandi, Scandinavian, Modern, and Luxury aesthetics on the same room layout.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-2xl bg-white border border-[#E8DCCF]">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#231E1B]">Cost & Overhead Reduction</h4>
                <p className="text-xs text-[#6B5E53] mt-1">Avoid costly 3D modeling revisions before finalizing the core architectural direction.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-2xl bg-white border border-[#E8DCCF]">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#231E1B]">Hardware Optimized (RTX 3050)</h4>
                <p className="text-xs text-[#6B5E53] mt-1">Implemented with FP16 precision, attention slicing, and sequential CPU offloading to run locally on 6GB VRAM.</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => { setActivePage('studio'); window.scrollTo(0, 0); }}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#8C5D33] hover:bg-[#764B24] shadow-md transition-all cursor-pointer"
            >
              <span>Test the Models in AI Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
