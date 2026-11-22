import React, { useState, useEffect } from 'react';
import { Home, Sparkles, SlidersHorizontal, Image as ImageIcon, Info, Mail, Cpu, Menu, X, ArrowRight, Award, FileText } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenResumeModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [systemStatus, setSystemStatus] = useState({ online: false, gpu: 'Connecting...', cuda: false });

  useEffect(() => {
    fetch('/api/status')
      .then(res => res.json())
      .then(data => {
        setSystemStatus({
          online: data.status === 'online',
          gpu: data.device_name || 'CPU',
          cuda: data.cuda_available || false
        });
      })
      .catch(() => {
        setSystemStatus({ online: false, gpu: 'Offline', cuda: false });
      });
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'studio', label: 'AI Designer', icon: Sparkles, badge: 'Core' },
    { id: 'comparison', label: 'Before & After', icon: SlidersHorizontal },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EBDDCF] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#B48256] via-[#946338] to-[#68401C] flex items-center justify-center text-white shadow-md shadow-[#B48256]/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-[#FBF6EE]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-2xl font-bold tracking-tight text-[#231E1B] font-['Outfit']">
                  SketchSpace AI
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#C9A982]/20 text-[#8C6036] border border-[#C9A982]/40">
                  Studio
                </span>
              </div>
              <p className="text-[11px] font-medium text-[#7D7065] tracking-wide -mt-0.5">
                Hand-Drawn Sketch to Photorealistic Interior
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-[#EFE7DC] text-[#231E1B] font-semibold shadow-xs' 
                      : 'text-[#6D6258] hover:text-[#231E1B] hover:bg-[#F3EDE3]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#966336]' : 'text-[#8C7E72]'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#966336] text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action & GPU Status */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Project Report Button */}
            <a
              href="/report"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#0E7490] bg-[#E0F2FE] hover:bg-[#BAE6FD] border border-[#7DD3FC] transition-all cursor-pointer shadow-xs"
              title="View SmartBridge Project Report & Technical Documentation"
            >
              <FileText className="w-4 h-4 text-[#0284C7]" />
              <span>Project Report</span>
            </a>

            {/* Resume / Case Study Button */}
            <button
              onClick={onOpenResumeModal}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#8C5D33] bg-[#EFE7DC] hover:bg-[#E4D7C8] border border-[#DDD0BF] transition-all cursor-pointer shadow-xs"
              title="View Architecture Specs & Resume Bullet Points"
            >
              <Award className="w-4 h-4 text-[#A87547]" />
              <span>Resume Case Study</span>
            </button>

            {/* GPU Badge */}
            <div 
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium bg-[#EFE8DC] border border-[#DDD0C0] text-[#5A5046]"
              title={`GPU Acceleration: ${systemStatus.gpu} (CUDA: ${systemStatus.cuda ? 'Active' : 'No'})`}
            >
              <span className={`w-2 h-2 rounded-full ${systemStatus.online ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <Cpu className="w-3.5 h-3.5 text-[#86562D]" />
              <span className="truncate max-w-[120px]">
                {systemStatus.cuda ? 'RTX 3050 CUDA' : (systemStatus.online ? 'AI Ready' : 'Connecting')}
              </span>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => handleNavClick('studio')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#8C5D33] via-[#A87547] to-[#8C5D33] hover:from-[#764B24] hover:to-[#764B24] shadow-md shadow-[#8C5D33]/25 hover:shadow-lg hover:shadow-[#8C5D33]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <span>Start Designing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#5A5046] hover:bg-[#EFE7DC] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8DCCF] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive ? 'bg-[#ECE2D4] text-[#231E1B] font-semibold' : 'text-[#6D6258] hover:bg-[#F3EDE3]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-[#966336]" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#966336] text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          
          <div className="pt-2 space-y-2">
            <button
              onClick={() => { onOpenResumeModal(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl text-[#8C5D33] font-bold bg-[#EFE7DC] border border-[#DDD0BF]"
            >
              <Award className="w-4 h-4 text-[#A87547]" />
              <span>Resume Case Study</span>
            </button>
            <button
              onClick={() => handleNavClick('studio')}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl text-white font-semibold bg-[#8C5D33] shadow-md"
            >
              <span>Start Designing Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
