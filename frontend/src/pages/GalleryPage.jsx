import React, { useState, useEffect } from 'react';
import { Sparkles, Eye, Download, ArrowRight, Filter, X, Maximize2 } from 'lucide-react';
import { GALLERY_DATA, CATEGORIES } from '../data/galleryData';

export default function GalleryPage({ setActivePage, onSelectSample }) {
  const [items, setItems] = useState(GALLERY_DATA);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedModalItem, setSelectedModalItem] = useState(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => {
        if (!res.ok) throw new Error("API offline or static deployment");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Merge API data with verified local paths if needed
          setItems(data);
        }
      })
      .catch(err => {
        console.log("Using local verified gallery dataset:", err.message);
        setItems(GALLERY_DATA);
      });
  }, []);

  const filteredItems = items.filter(item => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Living Rooms') return item.room_type === 'Living Room';
    if (selectedCategory === 'Bedrooms') return item.room_type === 'Bedroom';
    if (selectedCategory === 'Kitchens') return item.room_type === 'Kitchen';
    if (selectedCategory === 'Bathrooms') return item.room_type === 'Bathroom';
    if (selectedCategory === 'Dining Rooms') return item.room_type === 'Dining Room';
    if (selectedCategory === 'Home Offices' || selectedCategory === 'Offices') return item.room_type === 'Home Office' || item.room_type === 'Office';
    if (selectedCategory === 'Luxury Spaces') return (item.style && (item.style.includes('Luxury') || item.style.includes('Royal'))) || item.room_type === 'Kitchen';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 md:py-16 border-b border-[#EBDDCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EFE6DA] text-xs font-semibold text-[#86562D] border border-[#DDD0BF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Interior Transformations</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#231E1B]">
            AI Design Gallery
          </h1>
          <p className="text-base text-[#6E6157]">
            Browse our collection of verified architectural designs converted from hand sketches into photorealistic renders.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex justify-center mb-10 overflow-x-auto py-2">
          <div className="flex space-x-2 p-1.5 bg-[#F3EDE3] rounded-2xl border border-[#E0D3C3]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#8C5D33] text-white shadow-sm'
                    : 'text-[#665A50] hover:text-[#231E1B] hover:bg-white/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E8DCCF] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Container with Hover Overlay */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#FAF7F2]">
                <img
                  src={item.render_url}
                  alt={item.title || item.alt || `${item.room_type} render`}
                  loading="lazy"
                  onError={(e) => {
                    const fallbackPath = `./samples/renders/${item.id}.jpg`;
                    if (e.target.src !== fallbackPath && !e.target.dataset.tried) {
                      e.target.dataset.tried = '1';
                      e.target.src = fallbackPath;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Floating Room Type Tag */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-[#231E1B] shadow-sm">
                  {item.room_type}
                </div>

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity flex items-center justify-center space-x-3">
                  <button
                    onClick={() => setSelectedModalItem(item)}
                    className="p-3 rounded-full bg-white text-[#231E1B] hover:bg-[#FAF7F2] shadow-lg transition-transform hover:scale-110"
                    title="View Full Size & Sketch"
                  >
                    <Maximize2 className="w-5 h-5 text-[#8C5D33]" />
                  </button>
                  <button
                    onClick={() => {
                      if (onSelectSample) onSelectSample(item.id);
                      setActivePage('studio');
                      window.scrollTo(0, 0);
                    }}
                    className="px-4 py-2.5 rounded-full bg-[#8C5D33] text-white text-xs font-bold hover:bg-[#764B24] shadow-lg transition-transform hover:scale-105"
                  >
                    Open in Studio
                  </button>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#231E1B]">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#8C5D33] mt-0.5">
                    Style: {item.style} • Palette: {item.palette}
                  </p>
                  <p className="text-xs text-[#706359] mt-2 line-clamp-2 leading-relaxed">
                    {item.features}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#EFE7DC] flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#8C6036] bg-[#F7F2EB] px-2.5 py-1 rounded-lg border border-[#E8DCCF]">
                    Structure Match: {item.metrics?.edge_alignment || '95%'}
                  </span>
                  <button
                    onClick={() => {
                      if (onSelectSample) onSelectSample(item.id);
                      setActivePage('studio');
                      window.scrollTo(0, 0);
                    }}
                    className="text-xs font-bold text-[#8C5D33] hover:text-[#68401C] flex items-center space-x-1"
                  >
                    <span>Use Sketch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Full Size Inspection */}
        {selectedModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#DDD0BF]">
              
              {/* Modal Header */}
              <div className="p-5 border-b border-[#EBDDCF] flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#231E1B]">
                    {selectedModalItem.title}
                  </h3>
                  <p className="text-xs text-[#7A6C60]">
                    {selectedModalItem.room_type} • {selectedModalItem.style}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedModalItem(null)}
                  className="p-2 rounded-xl text-[#7A6C60] hover:bg-[#FAF7F2]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body: Before & After View */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAF7F2]">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase text-[#7A6C60]">
                    Original Hand-Drawn Sketch
                  </span>
                  <div className="rounded-2xl overflow-hidden border border-[#DDD0BF] aspect-square bg-[#FAF8F5]">
                    <img
                      src={selectedModalItem.sketch_url}
                      alt={`Hand-drawn sketch of ${selectedModalItem.title}`}
                      onError={(e) => {
                        const fb = `./samples/sketches/${selectedModalItem.id}.jpg`;
                        if (!e.target.dataset.tried) {
                          e.target.dataset.tried = '1';
                          e.target.src = fb;
                        }
                      }}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase text-[#8C5D33]">
                    AI Rendered Interior
                  </span>
                  <div className="rounded-2xl overflow-hidden border border-[#DDD0BF] aspect-square">
                    <img
                      src={selectedModalItem.render_url}
                      alt={`Photorealistic interior render of ${selectedModalItem.title}`}
                      onError={(e) => {
                        const fb = `./samples/renders/${selectedModalItem.id}.jpg`;
                        if (!e.target.dataset.tried) {
                          e.target.dataset.tried = '1';
                          e.target.src = fb;
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-5 border-t border-[#EBDDCF] flex flex-wrap items-center justify-between gap-3 bg-white">
                <div className="text-xs text-[#7A6C60]">
                  <span>Fidelity: <strong>{selectedModalItem.metrics?.edge_alignment}</strong></span>
                  <span className="mx-2">•</span>
                  <span>SSIM: <strong>{selectedModalItem.metrics?.ssim}</strong></span>
                </div>

                <div className="flex space-x-3">
                  <a
                    href={selectedModalItem.render_url}
                    download={`sketchspace_${selectedModalItem.id}.jpg`}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FAF7F2] text-[#3D332B] border border-[#DDD0BF] hover:bg-[#F3ECE0] flex items-center space-x-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Image</span>
                  </a>

                  <button
                    onClick={() => {
                      if (onSelectSample) onSelectSample(selectedModalItem.id);
                      setSelectedModalItem(null);
                      setActivePage('studio');
                      window.scrollTo(0, 0);
                    }}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-[#8C5D33] text-white hover:bg-[#764B24] flex items-center space-x-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Open in AI Studio</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
