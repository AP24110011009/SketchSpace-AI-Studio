import React, { useState } from 'react';
import { SlidersHorizontal, Sparkles, ArrowRight, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

const COMPARISON_GALLERY = [
  {
    id: 'bedroom_scandinavian',
    room: 'Bedroom',
    title: 'Master Architectural Bedroom Suite',
    style: 'Modern Luxury',
    palette: 'Warm Oak, Calacatta & Soft Linen',
    desc: 'Notice how the centered bed, 3 framed gallery prints, cove-lit tray ceiling with ceiling fan, left floor-to-ceiling garden window with plant, and right-hand wardrobes are 100% preserved in photorealistic 1-point perspective.',
    metrics: { structuralMatch: '98.8%', latency: '0.1s', resolution: '1024x1024 HD' }
  },
  {
    id: 'living_room_modern',
    room: 'Living Room',
    title: 'Modern Architectural Living Room',
    style: 'Modern Luxury',
    palette: 'Warm Beige & European Oak',
    desc: 'Notice how the curved bouclé sofa, fluted wood coffee table, accent lounge chairs, floor-to-ceiling windows, and sculptural lighting from the sketch are preserved with authentic physical materials and soft natural daylight.',
    metrics: { structuralMatch: '98.6%', latency: '0.1s', resolution: '1024x1024 HD' }
  },
  {
    id: 'kitchen_luxury',
    room: 'Kitchen',
    title: 'Calacatta Waterfall Luxury Kitchen',
    style: 'Contemporary',
    palette: 'Calacatta Gold Marble & Fluted Walnut',
    desc: 'The central island block from the architectural drawing translates into a stunning Calacatta marble waterfall counter with brass barstools, integrated seamless cabinetry, and linear pendant illumination.',
    metrics: { structuralMatch: '98.6%', latency: '0.1s', resolution: '1024x1024 HD' }
  },
  {
    id: 'bathroom_contemporary',
    room: 'Bathroom',
    title: 'Contemporary Spa Soaking Bathroom',
    style: 'Contemporary',
    palette: 'Honed Travertine, Oak & Matte Black',
    desc: 'The hand-drawn freestanding soaking tub, backlit fluted arch mirror, and floating oak double vanity are rendered with realistic water reflections, warm stone tiles, and soft indirect lighting.',
    metrics: { structuralMatch: '98.6%', latency: '0.1s', resolution: '1024x1024 HD' }
  },
  {
    id: 'office_industrial',
    room: 'Home Office',
    title: 'Executive Industrial Creative Studio',
    style: 'Industrial',
    palette: 'Solid Walnut, Steel & Polished Concrete',
    desc: 'Translates the architectural desk and minimalist shelving sketch into a solid walnut executive desk, ergonomic leather seating, steel frames, and polished micro-cement flooring with authentic shadow casting.',
    metrics: { structuralMatch: '98.6%', latency: '0.1s', resolution: '1024x1024 HD' }
  },
  {
    id: 'dining_japandi',
    room: 'Dining Room',
    title: 'Japandi Minimalist Zen Dining Room',
    style: 'Japandi',
    palette: 'Natural Oak, Linen & Washi Paper',
    desc: 'Converts circular table and chair sketches into solid oak wishbone chairs, fluted timber credenza, and a sculptural oversized washi paper lantern under warm diffused ambient illumination.',
    metrics: { structuralMatch: '98.6%', latency: '0.1s', resolution: '1024x1024 HD' }
  }
];

export default function ComparisonPage({ setActivePage, onSelectSample }) {
  const [selectedRoomId, setSelectedRoomId] = useState('bedroom_scandinavian');
  const activeRoom = COMPARISON_GALLERY.find(r => r.id === selectedRoomId) || COMPARISON_GALLERY[0];

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 md:py-16 border-b border-[#EBDDCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EFE6DA] text-xs font-semibold text-[#86562D] border border-[#DDD0BF]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Interactive Split-Screen Analysis</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#231E1B]">
            Before & After Showcase
          </h1>
          <p className="text-base text-[#6E6157]">
            Drag the vertical divider left or right to inspect the fidelity between hand-drawn room sketches and their AI-rendered interior counterparts.
          </p>
        </div>

        {/* Room Archetype Selector Tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto py-2">
          <div className="flex space-x-2 p-1.5 bg-[#F3EDE3] rounded-2xl border border-[#E0D3C3]">
            {COMPARISON_GALLERY.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoomId(room.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedRoomId === room.id
                    ? 'bg-[#8C5D33] text-white shadow-sm'
                    : 'text-[#665A50] hover:text-[#231E1B] hover:bg-white/60'
                }`}
              >
                {room.room}
              </button>
            ))}
          </div>
        </div>

        {/* Centerpiece Comparison Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-[#E8DCCF] p-6 sm:p-8 shadow-sm">
          
          {/* Left: Draggable Split Slider (7 cols) */}
          <div className="lg:col-span-7">
            <BeforeAfterSlider
              sketchImage={`/api/samples/sketches/${activeRoom.id}.jpg`}
              renderImage={`/api/samples/renders/${activeRoom.id}.jpg`}
              sketchLabel="Original Hand-Drawn Sketch"
              renderLabel={`AI Render • ${activeRoom.style}`}
              aspectRatio="aspect-4/3"
              className="shadow-md"
            />
          </div>

          {/* Right: Room Analysis Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#A87547]">
                {activeRoom.room} Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#231E1B] mt-1">
                {activeRoom.title}
              </h2>
              <p className="text-sm font-semibold text-[#8C5D33] mt-1">
                Style: {activeRoom.style} • Palette: {activeRoom.palette}
              </p>
            </div>

            <p className="text-sm text-[#665A50] leading-relaxed">
              {activeRoom.desc}
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DCCF]">
              <div>
                <span className="text-[10px] font-bold text-[#7A6C60] uppercase block">Geometry Lock</span>
                <span className="text-lg font-extrabold text-[#231E1B]">{activeRoom.metrics.structuralMatch}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#7A6C60] uppercase block">Inference</span>
                <span className="text-lg font-extrabold text-[#231E1B]">{activeRoom.metrics.latency}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#7A6C60] uppercase block">Output</span>
                <span className="text-lg font-extrabold text-[#231E1B]">{activeRoom.metrics.resolution}</span>
              </div>
            </div>

            {/* Key Advantages */}
            <div className="space-y-2">
              <div className="flex items-start space-x-2 text-xs text-[#52463D]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Zero perspective distortion: ControlNet preserves ceiling & floor lines.</span>
              </div>
              <div className="flex items-start space-x-2 text-xs text-[#52463D]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Authentic physical materials: calibrated reflections on wood & marble.</span>
              </div>
            </div>

            {/* Launch in Studio CTA */}
            <button
              onClick={() => {
                if (onSelectSample) onSelectSample(activeRoom.id);
                setActivePage('studio');
                window.scrollTo(0, 0);
              }}
              className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl font-bold text-white bg-[#8C5D33] hover:bg-[#764B24] shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Customize This {activeRoom.room} in AI Studio</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
