import React from 'react';
import { Sparkles, Heart, Shield, Cpu, ExternalLink } from 'lucide-react';

export default function Footer({ setActivePage, onOpenResumeModal }) {
  return (
    <footer className="bg-[#211C19] text-[#E0D7CE] pt-16 pb-12 border-t border-[#38312C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#362F29]">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B48256] to-[#764B24] flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-['Outfit']">
                SketchSpace AI Studio
              </span>
            </div>
            <p className="text-sm text-[#A89C91] leading-relaxed">
              Transforming hand-drawn architectural concepts and room layouts into photorealistic, furnished interior designs in minutes using paired image translation.
            </p>
            <div className="pt-2 flex flex-col space-y-2">
              <span className="inline-flex items-center space-x-2 text-xs px-3 py-1 rounded-full bg-[#332A24] text-[#C9A982] border border-[#483B32] w-fit">
                <Cpu className="w-3.5 h-3.5" />
                <span>NVIDIA RTX 3050 CUDA Powered</span>
              </span>
              {onOpenResumeModal && (
                <button
                  onClick={onOpenResumeModal}
                  className="inline-flex items-center space-x-2 text-xs font-bold text-[#E5CCA9] hover:text-white transition-colors cursor-pointer w-fit"
                >
                  <span>📄 View Resume Case Study & Tech Specs</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A982]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#BDB2A7]">
              <li>
                <button onClick={() => { setActivePage('home'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">
                  Home Landing
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('studio'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">
                  AI Design Studio
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('comparison'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">
                  Before & After Slider
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('gallery'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">
                  Interior Design Gallery
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('about'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">
                  About & Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A982]">
              Gen AI Tech Stack
            </h4>
            <ul className="space-y-2 text-sm text-[#BDB2A7]">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B48256]" />
                <span>ControlNet v1.1 (Scribble/Lineart)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B48256]" />
                <span>Stable Diffusion 1.5 (Latent Diffusion)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B48256]" />
                <span>Pix2Pix Conditional GAN (PyTorch)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B48256]" />
                <span>Hugging Face Diffusers & Accelerate</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B48256]" />
                <span>FastAPI + React 19 + Tailwind CSS</span>
              </li>
            </ul>
          </div>

          {/* Project Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A982]">
              Academic Project Info
            </h4>
            <div className="p-4 rounded-xl bg-[#2A231F] border border-[#3D332B] text-xs text-[#B5A89B] space-y-2">
              <p><strong className="text-white">Domain:</strong> Real Estate & Interior Design</p>
              <p><strong className="text-white">Category:</strong> Image-to-Image Translation</p>
              <p><strong className="text-white">Team:</strong> Team 9</p>
              <p><strong className="text-white">Subject:</strong> Generative AI (Gen AI)</p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A7D71] space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} SketchSpace AI. All rights reserved.</p>
          <p className="flex items-center space-x-1.5">
            <span>Built for Generative AI Subject</span>
            <span>•</span>
            <span className="text-[#C9A982]">Academic Demonstration</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
