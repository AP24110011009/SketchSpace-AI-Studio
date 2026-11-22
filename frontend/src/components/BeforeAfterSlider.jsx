import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, Edit3, MoveHorizontal } from 'lucide-react';

export default function BeforeAfterSlider({
  sketchImage,
  renderImage,
  sketchLabel = "Hand-Drawn Sketch",
  renderLabel = "Photorealistic AI Render",
  aspectRatio = "aspect-square",
  className = "",
  initialPosition = 50,
}) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className={`relative select-none ${className}`}>
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-2xl md:rounded-3xl border border-[#DDD0BF] shadow-md bg-[#FAF9F6] ${aspectRatio} cursor-ew-resize`}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Rendered Realistic Interior (Background / Right Side) */}
        <img
          src={renderImage}
          alt={renderLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Hand-Drawn Sketch (Clipped using CSS clip-path for 100% pixel-perfect responsive alignment) */}
        <img
          src={sketchImage}
          alt={sketchLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        />

        {/* Vertical Split Line Divider */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.6)] z-20 pointer-events-none transform -translate-x-1/2"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Draggable Circular Knob */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-[#633C17] shadow-xl border-2 border-[#8C5D33] flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
            <MoveHorizontal className="w-4 h-4 text-[#8C5D33]" />
          </div>
        </div>

        {/* Left Side Label (Sketch) */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-[11px] font-semibold shadow-md">
            <Edit3 className="w-3 h-3 text-amber-300" />
            <span>{sketchLabel}</span>
          </div>
        </div>

        {/* Right Side Label (Render) */}
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#2D2622] text-[11px] font-semibold shadow-md border border-white/50">
            <Sparkles className="w-3 h-3 text-[#8C5D33]" />
            <span>{renderLabel}</span>
          </div>
        </div>

        {/* Instruction Hint at bottom */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-85">
          <span className="px-3 py-0.5 rounded-full bg-black/55 backdrop-blur-sm text-[10px] font-medium text-white tracking-wide">
            Drag divider left or right to compare
          </span>
        </div>
      </div>
    </div>
  );
}
