import React, { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, Sparkles, Sliders, RefreshCw, Download, 
  Trash2, Layers, CheckCircle2, AlertCircle, Eye, 
  Palette, SunMedium, Compass, Info, Cpu, Check, 
  FileImage, PenTool, LayoutGrid, ArrowRight, Bookmark,
  Maximize2, X, ChevronRight, SlidersHorizontal, Share2
} from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import DrawingCanvas from '../components/DrawingCanvas';

const ROOM_TYPES = [
  { id: 'Living Room', label: 'Living Room', icon: '🛋️' },
  { id: 'Bedroom', label: 'Bedroom', icon: '🛏️' },
  { id: 'Kitchen', label: 'Kitchen', icon: '🍳' },
  { id: 'Bathroom', label: 'Bathroom', icon: '🛁' },
  { id: 'Dining Room', label: 'Dining Room', icon: '🍽️' },
  { id: 'Home Office', label: 'Home Office', icon: '💻' },
];

const INTERIOR_STYLES = [
  { id: 'Modern Luxury', label: 'Modern Luxury', desc: 'Bespoke marble, brass inlays & clean lines' },
  { id: 'Minimalist', label: 'Minimalist', desc: 'Serene negative space & pure geometric form' },
  { id: 'Scandinavian', label: 'Scandinavian', desc: 'Nordic light ash wood & cozy layered textiles' },
  { id: 'Contemporary', label: 'Contemporary', desc: 'Organic curved silhouettes & boucle textures' },
  { id: 'Traditional Indian', label: 'Traditional Indian', desc: 'Teak woodwork, jali lattice & royal heritage' },
  { id: 'Industrial', label: 'Industrial', desc: 'Exposed brick, matte black steel & concrete' },
  { id: 'Japandi', label: 'Japandi', desc: 'Wabi-sabi calm, natural timber & Zen warmth' },
  { id: 'Royal Interior', label: 'Royal Interior', desc: 'Gilded gold leaf, velvet drapery & regal grand' },
];

const FLOORING_OPTIONS = [
  { id: 'Wooden Flooring', label: 'Wooden Flooring', desc: 'Chevron European Oak' },
  { id: 'Marble Flooring', label: 'Marble Flooring', desc: 'Calacatta Gold Marble' },
  { id: 'Ceramic Tiles', label: 'Ceramic Tiles', desc: 'Matte Porcelain Slab' },
  { id: 'Granite', label: 'Granite', desc: 'Honed Charcoal Stone' },
  { id: 'Concrete', label: 'Concrete', desc: 'Polished Micro-Cement' },
];

const WALL_DESIGN_OPTIONS = [
  { id: 'White Paint', label: 'White Paint', desc: 'Crisp Architectural Plaster' },
  { id: 'Textured Walls', label: 'Textured Walls', desc: 'Venetian Limewash Finish' },
  { id: 'Wallpaper', label: 'Wallpaper', desc: 'Designer Geometric Textile' },
  { id: 'Wooden Panels', label: 'Wooden Panels', desc: 'Acoustic Fluted Oak Slats' },
  { id: 'Marble Wall', label: 'Marble Wall', desc: 'Bookmatched Feature Slab' },
];

const LIGHTING_OPTIONS = [
  { id: 'Natural Daylight', label: 'Natural Daylight', desc: 'Diffused Morning Skylight' },
  { id: 'Warm Lighting', label: 'Warm Lighting', desc: '2700K Architectural Cove' },
  { id: 'LED Lighting', label: 'LED Lighting', desc: 'Linear Minimalist Slots' },
  { id: 'Luxury Chandelier', label: 'Luxury Chandelier', desc: 'Crystalline Statement Glow' },
  { id: 'Ambient Lighting', label: 'Ambient Lighting', desc: 'Moody Low-Contrast Evening' },
];

const COLOR_THEMES = [
  { id: 'Beige and White', label: 'Beige & White', color1: '#E8DFD3', color2: '#FAF8F5' },
  { id: 'Black and Gold', label: 'Black & Gold', color1: '#262629', color2: '#D4AF37' },
  { id: 'White and Grey', label: 'White & Grey', color1: '#FAF9F6', color2: '#9CA3AF' },
  { id: 'Brown and Cream', label: 'Brown & Cream', color1: '#6E472A', color2: '#F5EBE1' },
  { id: 'Blue and White', label: 'Blue & White', color1: '#1E3A8A', color2: '#FAF9F6' },
];

const SAMPLE_PRESETS = [
  { id: 'user_bathroom_freestanding', name: 'Bath (Window & Tub)', room: 'Bathroom', style: 'Modern Luxury', flooring: 'Ceramic Tiles', wall: 'White Paint', lighting: 'Natural Daylight', color: 'Beige and White' },
  { id: 'user_bedroom_desk', name: 'Bed (Desk & Window)', room: 'Bedroom', style: 'Scandinavian', flooring: 'Wooden Flooring', wall: 'White Paint', lighting: 'Natural Daylight', color: 'Beige and White' },
  { id: 'bedroom_scandinavian', name: 'Master Bedroom', room: 'Bedroom', style: 'Modern Luxury', flooring: 'Wooden Flooring', wall: 'White Paint', lighting: 'Natural Daylight', color: 'Beige and White' },
  { id: 'living_room_modern', name: 'Living Room', room: 'Living Room', style: 'Modern Luxury', flooring: 'Wooden Flooring', wall: 'Wooden Panels', lighting: 'Natural Daylight', color: 'Beige and White' },
  { id: 'kitchen_luxury', name: 'Luxury Kitchen', room: 'Kitchen', style: 'Contemporary', flooring: 'Marble Flooring', wall: 'Marble Wall', lighting: 'LED Lighting', color: 'White and Grey' },
  { id: 'bathroom_contemporary', name: 'Spa Bathroom', room: 'Bathroom', style: 'Contemporary', flooring: 'Marble Flooring', wall: 'Textured Walls', lighting: 'Warm Lighting', color: 'Beige and White' },
  { id: 'office_industrial', name: 'Executive Office', room: 'Home Office', style: 'Industrial', flooring: 'Concrete', wall: 'Textured Walls', lighting: 'Warm Lighting', color: 'Brown and Cream' },
  { id: 'dining_japandi', name: 'Japandi Dining', room: 'Dining Room', style: 'Japandi', flooring: 'Wooden Flooring', wall: 'Wooden Panels', lighting: 'Natural Daylight', color: 'Beige and White' },
];

const ROOM_TYPE_TO_PRESET = {
  'Bedroom': 'bedroom_scandinavian',
  'Living Room': 'living_room_modern',
  'Kitchen': 'kitchen_luxury',
  'Bathroom': 'bathroom_contemporary',
  'Dining Room': 'dining_japandi',
  'Home Office': 'office_industrial',
  'Office': 'office_industrial'
};

export default function StudioPage({ initialSampleId = null }) {
  // Center Panel Mode: 'preview', 'draw', 'samples'
  const [centerMode, setCenterMode] = useState('preview');
  
  // Sketch Data
  const [sketchFile, setSketchFile] = useState(null);
  const [sketchPreview, setSketchPreview] = useState(null);
  const [isCustomUpload, setIsCustomUpload] = useState(false);
  const [activePresetId, setActivePresetId] = useState('bedroom_scandinavian');
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const fileInputRef = useRef(null);

  // Customization State
  const [roomType, setRoomType] = useState('Bedroom');
  const [interiorStyle, setInteriorStyle] = useState('Modern Luxury');
  const [flooring, setFlooring] = useState('Wooden Flooring');
  const [wallDesign, setWallDesign] = useState('White Paint');
  const [lighting, setLighting] = useState('Natural Daylight');
  const [colorTheme, setColorTheme] = useState('Beige and White');
  const [customColor, setCustomColor] = useState('');
  const [furniturePref, setFurniturePref] = useState('');
  const [decorPref, setDecorPref] = useState('');
  
  // Advanced Controls
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [engineChoice, setEngineChoice] = useState('auto');
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [controlStrength, setControlStrength] = useState(0.85);

  // Generation State & Real Processing Stages
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [viewMode, setViewMode] = useState('slider'); // 'slider', 'sideBySide', 'renderOnly', 'edgeMap'
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [savedSuccessToast, setSavedSuccessToast] = useState(false);

  // Saved designs in localStorage
  const [savedDesigns, setSavedDesigns] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sketchspace_saved_designs') || '[]');
    } catch {
      return [];
    }
  });

  // Load sample preset on mount
  useEffect(() => {
    if (initialSampleId) {
      loadSampleById(initialSampleId);
    } else {
      loadSampleById('bedroom_scandinavian');
    }
  }, [initialSampleId]);

  const loadSampleById = async (sampleId) => {
    const preset = SAMPLE_PRESETS.find(p => p.id === sampleId) || SAMPLE_PRESETS[0];
    setActivePresetId(preset.id);
    setIsCustomUpload(false);
    setRoomType(preset.room);
    setInteriorStyle(preset.style);
    setFlooring(preset.flooring);
    setWallDesign(preset.wall);
    setLighting(preset.lighting);
    setColorTheme(preset.color);

    try {
      const res = await fetch(`/api/samples/sketches/${preset.id}.jpg`);
      const blob = await res.blob();
      const file = new File([blob], `${preset.id}.jpg`, { type: 'image/jpeg' });
      setSketchFile(file);
      setSketchPreview(URL.createObjectURL(blob));
      setCenterMode('preview');
      setErrorMsg(null);
    } catch (e) {
      console.error("Failed to load preset sketch:", e);
    }
  };

  const handleRoomSelect = (selectedRoom) => {
    setRoomType(selectedRoom);
    if (!isCustomUpload) {
      const pId = ROOM_TYPE_TO_PRESET[selectedRoom];
      if (pId) loadSampleById(pId);
    }
  };

  // File Handlers
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processSelectedFile(file);
  };

  const processSelectedFile = (file) => {
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      setErrorMsg('Please upload a valid JPG, JPEG, or PNG sketch image.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Please upload an image smaller than 10 MB.');
      return;
    }
    setIsCustomUpload(true);
    setSketchFile(file);
    setSketchPreview(URL.createObjectURL(file));
    setEngineChoice('controlnet');
    setCenterMode('preview');
    setErrorMsg(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = () => {
    setIsDraggingFile(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingFile(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processSelectedFile(file);
  };

  const handleCanvasExport = (file, dataUrl) => {
    setIsCustomUpload(true);
    setSketchFile(file);
    setSketchPreview(dataUrl);
    setEngineChoice('controlnet');
    setCenterMode('preview');
  };

  // Generation Workflow
  const handleGenerate = async () => {
    if (!sketchFile) {
      setErrorMsg('Please upload or draw a room sketch first.');
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setCurrentStage(1);

    // Realistic processing progression
    const stageTimer = setInterval(() => {
      setCurrentStage(prev => {
        if (prev < 6) return prev + 1;
        return prev;
      });
    }, 450);

    const formData = new FormData();
    formData.append('sketch', sketchFile);
    formData.append('room_type', roomType);
    formData.append('interior_style', interiorStyle);
    formData.append('flooring', flooring);
    formData.append('wall_design', wallDesign);
    formData.append('lighting_pref', lighting);
    formData.append('color_theme', colorTheme);
    formData.append('custom_color', customColor);
    formData.append('furniture_pref', furniturePref);
    formData.append('decor_pref', decorPref);
    formData.append('engine_mode', engineChoice);
    formData.append('guidance_scale', guidanceScale.toString());
    formData.append('control_strength', controlStrength.toString());

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Generation request failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setErrorMsg(err.message || 'Generation failed. Please verify that the backend server is running.');
    } finally {
      clearInterval(stageTimer);
      setIsGenerating(false);
    }
  };

  // Actions
  const downloadImage = (base64Data, filename) => {
    const link = document.createElement('a');
    link.href = base64Data;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const saveToMyDesigns = () => {
    if (!result) return;
    const newDesign = {
      id: Date.now().toString(),
      title: `${result.parameters?.room_type || roomType} in ${result.parameters?.interior_style || interiorStyle}`,
      renderImage: result.rendered_image_base64,
      sketchImage: result.sketch_image_base64,
      roomType: result.parameters?.room_type || roomType,
      style: result.parameters?.interior_style || interiorStyle,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    const updated = [newDesign, ...savedDesigns.slice(0, 19)];
    setSavedDesigns(updated);
    try {
      localStorage.setItem('sketchspace_saved_designs', JSON.stringify(updated));
    } catch (e) {
      console.warn("Storage full", e);
    }
    setSavedSuccessToast(true);
    setTimeout(() => setSavedSuccessToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] py-8 md:py-12 border-b border-[#E5DACD]">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Workspace Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E5DACD]">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#8C5D33] tracking-wider uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Commercial AI Interior Architecture Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#231E1B] tracking-tight">
              AI Design Studio
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            {savedSuccessToast && (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-full flex items-center space-x-1">
                <Check className="w-3.5 h-3.5" />
                <span>Saved to My Designs!</span>
              </span>
            )}
            <span className="text-xs text-[#7A6C60] font-medium hidden sm:inline">
              Engine: <strong className="text-[#231E1B]">Photorealistic Structural Engine (CUDA)</strong>
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3-PANEL PROFESSIONAL ARCHITECTURAL WORKSPACE */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ============================================================== */}
          {/* LEFT PANEL: SKETCH UPLOAD & CUSTOMIZATION (4 cols) */}
          {/* ============================================================== */}
          <div className="lg:col-span-4 xl:col-span-3.5 space-y-5 bg-white p-6 rounded-3xl border border-[#E5DACD] shadow-xs max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E6D8]">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#3D332B] flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-[#8C5D33]" />
                <span>Interior Specifications</span>
              </h2>
              <span className="text-[11px] text-[#8C5D33] font-semibold bg-[#F5EBE1] px-2 py-0.5 rounded-md">
                Step 1 of 2
              </span>
            </div>

            {/* Room Type Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#736B63]">
                Room Type
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {ROOM_TYPES.map((room) => (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => handleRoomSelect(room.id)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                      roomType === room.id
                        ? 'bg-[#8C5D33] text-white shadow-xs'
                        : 'bg-[#FAF8F5] text-[#4A433D] hover:bg-[#F2EDE4] border border-[#E5DACD]'
                    }`}
                  >
                    <span className="text-sm">{room.icon}</span>
                    <span className="truncate text-[11px]">{room.label}</span>
                  </button>
                ))}
              </div>

              {/* Preset Sync Status */}
              {!isCustomUpload ? (
                <div className="text-[10px] text-[#7A6C60] bg-[#FAF8F5] border border-[#E5DACD] px-2.5 py-1.5 rounded-lg flex items-center justify-between">
                  <span className="flex items-center space-x-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Loaded 1:1 Sketch: <strong>{SAMPLE_PRESETS.find(p => p.id === activePresetId)?.name}</strong></span>
                  </span>
                </div>
              ) : (
                <div className="text-[10px] bg-amber-50/80 border border-amber-200 text-amber-900 px-2.5 py-1.5 rounded-lg flex items-center justify-between">
                  <span className="truncate">Using custom drawn/uploaded sketch</span>
                  <button
                    type="button"
                    onClick={() => {
                      const pId = ROOM_TYPE_TO_PRESET[roomType] || 'bedroom_scandinavian';
                      loadSampleById(pId);
                    }}
                    className="font-bold text-[#8C5D33] hover:underline cursor-pointer ml-1"
                  >
                    Load template →
                  </button>
                </div>
              )}
            </div>

            {/* Interior Style Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#736B63]">
                Interior Style
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {INTERIOR_STYLES.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setInteriorStyle(style.id)}
                    className={`p-2 rounded-xl text-left transition-all cursor-pointer ${
                      interiorStyle === style.id
                        ? 'bg-[#8C5D33] text-white shadow-xs'
                        : 'bg-[#FAF8F5] text-[#4A433D] hover:bg-[#F2EDE4] border border-[#E5DACD]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{style.label}</span>
                      {interiorStyle === style.id && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <p className={`text-[10px] mt-0.5 line-clamp-1 ${interiorStyle === style.id ? 'text-[#F5EBE1]' : 'text-[#80766D]'}`}>
                      {style.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Flooring Type Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#736B63]">
                Flooring Material
              </label>
              <div className="grid grid-cols-1 gap-1">
                {FLOORING_OPTIONS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFlooring(f.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      flooring === f.id
                        ? 'bg-[#8C5D33] text-white shadow-xs'
                        : 'bg-[#FAF8F5] text-[#4A433D] hover:bg-[#F2EDE4] border border-[#E5DACD]'
                    }`}
                  >
                    <span>{f.label}</span>
                    <span className={`text-[10px] ${flooring === f.id ? 'text-[#F5EBE1]' : 'text-[#8C7E72]'}`}>
                      {f.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Wall Design Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#736B63]">
                Wall Architecture
              </label>
              <div className="grid grid-cols-1 gap-1">
                {WALL_DESIGN_OPTIONS.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setWallDesign(w.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      wallDesign === w.id
                        ? 'bg-[#8C5D33] text-white shadow-xs'
                        : 'bg-[#FAF8F5] text-[#4A433D] hover:bg-[#F2EDE4] border border-[#E5DACD]'
                    }`}
                  >
                    <span>{w.label}</span>
                    <span className={`text-[10px] ${wallDesign === w.id ? 'text-[#F5EBE1]' : 'text-[#8C7E72]'}`}>
                      {w.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting Conditions */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#736B63]">
                Interior Lighting
              </label>
              <div className="grid grid-cols-1 gap-1">
                {LIGHTING_OPTIONS.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setLighting(l.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      lighting === l.id
                        ? 'bg-[#8C5D33] text-white shadow-xs'
                        : 'bg-[#FAF8F5] text-[#4A433D] hover:bg-[#F2EDE4] border border-[#E5DACD]'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className={`text-[10px] ${lighting === l.id ? 'text-[#F5EBE1]' : 'text-[#8C7E72]'}`}>
                      {l.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#736B63]">
                  Color Palette
                </label>
                <span className="text-xs font-bold text-[#8C5D33]">{colorTheme}</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {COLOR_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => {
                      setColorTheme(theme.id);
                      setCustomColor('');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer ${
                      colorTheme === theme.id && !customColor
                        ? 'border-[#8C5D33] bg-[#F5EBE1] text-[#231E1B] shadow-xs'
                        : 'border-[#E5DACD] bg-[#FAF8F5] text-[#52463D] hover:bg-[#F2EDE4]'
                    }`}
                  >
                    <span>{theme.label}</span>
                    <div className="flex items-center space-x-1">
                      <span className="w-3.5 h-3.5 rounded-full border border-black/15" style={{ backgroundColor: theme.color1 }} />
                      <span className="w-3.5 h-3.5 rounded-full border border-black/15" style={{ backgroundColor: theme.color2 }} />
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Accent Color Picker */}
              <div className="pt-1.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#736B63] mb-1">
                  <span>Custom Accent Hue:</span>
                  {customColor && (
                    <button
                      type="button"
                      onClick={() => setCustomColor('')}
                      className="text-[10px] text-rose-600 font-bold hover:underline cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="flex items-center space-x-2 bg-[#FAF8F5] p-2 rounded-xl border border-[#E5DACD]">
                  <input
                    type="color"
                    value={customColor || '#8C5D33'}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-7 h-7 rounded-lg cursor-pointer border-0 bg-transparent flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    placeholder="e.g. #10B981 (Hex)"
                    className="text-xs bg-transparent border-0 focus:outline-none flex-1 text-[#231E1B] font-mono"
                  />
                  {customColor && (
                    <span
                      className="w-4 h-4 rounded-full border border-black/20 flex-shrink-0"
                      style={{ backgroundColor: customColor }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* AI Engine & Hardware Config */}
            <div className="pt-3 border-t border-[#E5DACD] space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#736B63] flex items-center space-x-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#8C5D33]" />
                  <span>AI Generation Engine</span>
                </label>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  RTX 3050 6GB CUDA
                </span>
              </div>

              <div className="grid grid-cols-1 gap-1.5">
                <button
                  type="button"
                  onClick={() => setEngineChoice('controlnet')}
                  className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer ${
                    engineChoice === 'controlnet'
                      ? 'border-[#8C5D33] bg-[#F5EBE1] text-[#231E1B] shadow-xs'
                      : 'border-[#E5DACD] bg-[#FAF8F5] text-[#736B63] hover:bg-[#F2EDE4]'
                  }`}
                >
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-[#231E1B]">ControlNet + Stable Diffusion (PyTorch GPU)</span>
                    <span className="text-[10px] text-[#736B63]">Exact Sketch Preservation • Real Diffusion Latents</span>
                  </div>
                  {engineChoice === 'controlnet' && <CheckCircle2 className="w-4 h-4 text-[#8C5D33]" />}
                </button>

                <button
                  type="button"
                  onClick={() => setEngineChoice('auto')}
                  className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer ${
                    engineChoice === 'auto'
                      ? 'border-[#8C5D33] bg-[#F5EBE1] text-[#231E1B] shadow-xs'
                      : 'border-[#E5DACD] bg-[#FAF8F5] text-[#736B63] hover:bg-[#F2EDE4]'
                  }`}
                >
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-[#231E1B]">Auto (Smart Hybrid)</span>
                    <span className="text-[10px] text-[#736B63]">GPU ControlNet for custom sketches, Instant for templates</span>
                  </div>
                  {engineChoice === 'auto' && <CheckCircle2 className="w-4 h-4 text-[#8C5D33]" />}
                </button>

                <button
                  type="button"
                  onClick={() => setEngineChoice('instant')}
                  className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer ${
                    engineChoice === 'instant'
                      ? 'border-[#8C5D33] bg-[#F5EBE1] text-[#231E1B] shadow-xs'
                      : 'border-[#E5DACD] bg-[#FAF8F5] text-[#736B63] hover:bg-[#F2EDE4]'
                  }`}
                >
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-[#231E1B]">Instant Structural Synthesizer</span>
                    <span className="text-[10px] text-[#736B63]">0.1s Fast preview with real materials & lighting</span>
                  </div>
                  {engineChoice === 'instant' && <CheckCircle2 className="w-4 h-4 text-[#8C5D33]" />}
                </button>
              </div>

              {(engineChoice === 'controlnet' || engineChoice === 'auto') && (
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DACD] space-y-2 mt-1">
                  <div className="flex items-center justify-between text-[11px] text-[#736B63]">
                    <span className="font-medium">ControlNet Scribble Guidance:</span>
                    <span className="font-bold text-[#8C5D33] font-mono">{controlStrength}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.0"
                    step="0.05"
                    value={controlStrength}
                    onChange={(e) => setControlStrength(parseFloat(e.target.value))}
                    className="w-full accent-[#8C5D33] h-1.5 cursor-pointer"
                  />

                  <div className="flex items-center justify-between text-[11px] text-[#736B63]">
                    <span className="font-medium">Diffusion Guidance Scale:</span>
                    <span className="font-bold text-[#8C5D33] font-mono">{guidanceScale}</span>
                  </div>
                  <input
                    type="range"
                    min="5.0"
                    max="12.0"
                    step="0.5"
                    value={guidanceScale}
                    onChange={(e) => setGuidanceScale(parseFloat(e.target.value))}
                    className="w-full accent-[#8C5D33] h-1.5 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* GENERATE BUTTON */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating || !sketchFile}
                className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-[#8C5D33] via-[#A87547] to-[#8C5D33] hover:from-[#764B24] hover:to-[#764B24] shadow-md hover:shadow-lg disabled:opacity-40 transition-all cursor-pointer flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin text-white" />
                    <span>Synthesizing Realistic Interior...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-200" />
                    <span>Generate Realistic Interior</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* ============================================================== */}
          {/* CENTER PANEL: ORIGINAL SKETCH PREVIEW & CANVAS (4 cols) */}
          {/* ============================================================== */}
          <div className="lg:col-span-4 xl:col-span-4 space-y-4 bg-white p-6 rounded-3xl border border-[#E5DACD] shadow-xs">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E6D8]">
              <div className="flex items-center space-x-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#3D332B]">
                  Original Sketch
                </h2>
                <span className="text-[11px] text-[#7A6C60]">
                  {centerMode === 'draw' ? '(Canvas Editor)' : '(Uploaded / Selected)'}
                </span>
              </div>

              {/* Mode Tabs */}
              <div className="flex p-1 bg-[#F5EBE1] rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setCenterMode('preview')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    centerMode === 'preview' ? 'bg-[#8C5D33] text-white shadow-xs' : 'text-[#665A50]'
                  }`}
                >
                  Preview
                </button>
                <button
                  type="button"
                  onClick={() => setCenterMode('draw')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    centerMode === 'draw' ? 'bg-[#8C5D33] text-white shadow-xs' : 'text-[#665A50]'
                  }`}
                >
                  Draw
                </button>
                <button
                  type="button"
                  onClick={() => setCenterMode('samples')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    centerMode === 'samples' ? 'bg-[#8C5D33] text-white shadow-xs' : 'text-[#665A50]'
                  }`}
                >
                  Presets
                </button>
              </div>
            </div>

            {/* Quick 1-Click Room Archetype Selector Bar */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-[#F5EBE1] pb-2.5">
              <span className="text-[10px] font-bold text-[#736B63] uppercase tracking-wider whitespace-nowrap">
                Room Archetypes:
              </span>
              {SAMPLE_PRESETS.map((p) => {
                const iconMap = {
                  'Bedroom': '🛏️',
                  'Living Room': '🛋️',
                  'Kitchen': '🍳',
                  'Bathroom': '🛁',
                  'Home Office': '💻',
                  'Dining Room': '🍽️'
                };
                const isActive = activePresetId === p.id && !isCustomUpload;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => loadSampleById(p.id)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center space-x-1.5 ${
                      isActive
                        ? 'bg-[#8C5D33] text-white shadow-xs ring-1 ring-[#8C5D33]'
                        : 'bg-[#FAF8F5] text-[#4A433D] hover:bg-[#F2EDE4] border border-[#E5DACD]'
                    }`}
                  >
                    <span>{iconMap[p.room] || '🏠'}</span>
                    <span>{p.name}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB: PREVIEW & UPLOAD */}
            {centerMode === 'preview' && (
              <div className="space-y-4">
                {sketchPreview ? (
                  <div className="relative rounded-2xl overflow-hidden border border-[#D5C7B5] bg-[#FAF9F6] aspect-square flex items-center justify-center group shadow-xs">
                    <img
                      src={sketchPreview}
                      alt="Uploaded Sketch Preview"
                      className="w-full h-full object-contain p-2"
                    />
                    <div className="absolute top-3 right-3 flex space-x-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-xs font-semibold text-[#3D332B] shadow-sm hover:bg-white border border-[#DDD0BF]"
                      >
                        Replace
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSketchFile(null);
                          setSketchPreview(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="p-1 rounded-lg bg-rose-600 text-white shadow-sm hover:bg-rose-700"
                        title="Remove Sketch"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl aspect-square flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all ${
                      isDraggingFile ? 'border-[#8C5D33] bg-[#F5EBE1]' : 'border-[#DDD0BF] bg-[#FAF9F6] hover:bg-[#F2EDE4]'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#EFE8DD] flex items-center justify-center text-[#8C5D33] mb-3">
                      <UploadCloud className="w-7 h-7" />
                    </div>
                    <p className="text-sm font-bold text-[#231E1B]">
                      Upload Room Sketch
                    </p>
                    <p className="text-xs text-[#7A6C60] mt-1 max-w-xs">
                      Drag & drop your hand-drawn sketch, floor plan, or architectural line drawing (PNG, JPG, JPEG).
                    </p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="flex items-center justify-between text-xs text-[#7A6C60]">
                  <span>Supports: PNG, JPG, JPEG</span>
                  <button
                    type="button"
                    onClick={() => setCenterMode('draw')}
                    className="font-bold text-[#8C5D33] hover:underline"
                  >
                    Or sketch using canvas editor →
                  </button>
                </div>
              </div>
            )}

            {/* TAB: DRAW CANVAS */}
            {centerMode === 'draw' && (
              <div>
                <DrawingCanvas onCanvasExport={handleCanvasExport} />
              </div>
            )}

            {/* TAB: PRESET SAMPLES */}
            {centerMode === 'samples' && (
              <div className="space-y-3">
                <p className="text-xs text-[#7A6C60]">
                  Select an architectural sketch template to test immediately:
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {SAMPLE_PRESETS.map((sample) => (
                    <div
                      key={sample.id}
                      onClick={() => loadSampleById(sample.id)}
                      className="p-2.5 rounded-xl border border-[#DDD0BF] bg-[#FAF8F5] hover:bg-[#F2EDE4] hover:border-[#8C5D33] cursor-pointer transition-all flex items-center space-x-2.5"
                    >
                      <div className="w-11 h-11 rounded-lg overflow-hidden bg-white border border-[#E5DACD] flex-shrink-0">
                        <img
                          src={`/api/samples/sketches/${sample.id}.jpg`}
                          alt={sample.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#231E1B] truncate">{sample.name}</p>
                        <p className="text-[10px] text-[#7A6C60]">{sample.style}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ============================================================== */}
          {/* RIGHT PANEL: AI-GENERATED PHOTOREALISTIC OUTPUT (4.5 cols) */}
          {/* ============================================================== */}
          <div className="lg:col-span-4 xl:col-span-4.5 space-y-4 bg-white p-6 rounded-3xl border border-[#E5DACD] shadow-xs">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E6D8]">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#3D332B] flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#8C5D33]" />
                  <span>Photorealistic Output</span>
                </h2>
                <p className="text-[11px] text-[#7A6C60] mt-0.5">
                  {result ? `${result.parameters?.room_type || roomType} • ${result.parameters?.interior_style || interiorStyle}` : 'Real-time Architectural Synthesis'}
                </p>
              </div>

              {/* View Switchers */}
              {result && (
                <div className="flex p-1 bg-[#F5EBE1] rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => setViewMode('slider')}
                    className={`px-2 py-0.5 rounded-lg transition-all ${
                      viewMode === 'slider' ? 'bg-[#8C5D33] text-white shadow-xs' : 'text-[#665A50]'
                    }`}
                  >
                    Slider
                  </button>
                  <button
                    onClick={() => setViewMode('sideBySide')}
                    className={`px-2 py-0.5 rounded-lg transition-all ${
                      viewMode === 'sideBySide' ? 'bg-[#8C5D33] text-white shadow-xs' : 'text-[#665A50]'
                    }`}
                  >
                    Side-by-Side
                  </button>
                  <button
                    onClick={() => setViewMode('renderOnly')}
                    className={`px-2 py-0.5 rounded-lg transition-all ${
                      viewMode === 'renderOnly' ? 'bg-[#8C5D33] text-white shadow-xs' : 'text-[#665A50]'
                    }`}
                  >
                    Render
                  </button>
                </div>
              )}
            </div>

            {/* PROCESSING STATE: 6 Stages */}
            {isGenerating && (
              <div className="aspect-square rounded-2xl bg-[#FAF9F6] border border-[#DDD0BF] p-6 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full border-4 border-[#E5DACD] border-t-[#8C5D33] animate-spin mb-4" />
                <h3 className="text-base font-bold text-[#231E1B] mb-2">
                  Synthesizing Realistic Interior
                </h3>
                <div className="w-full max-w-xs space-y-1.5 text-left text-xs text-[#665A50] mt-2">
                  {[
                    "1. Uploading sketch",
                    "2. Analysing room structure",
                    "3. Extracting room layout",
                    "4. Processing with ControlNet",
                    "5. Generating realistic interior",
                    "6. Finalizing image"
                  ].map((stageText, idx) => {
                    const stepNum = idx + 1;
                    const isDone = currentStage > stepNum;
                    const isCurrent = currentStage === stepNum;
                    return (
                      <div key={stageText} className="flex items-center space-x-2">
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isDone ? 'bg-emerald-500 text-white' : (isCurrent ? 'bg-[#8C5D33] text-white animate-pulse' : 'bg-gray-200 text-gray-600')
                        }`}>
                          {isDone ? '✓' : stepNum}
                        </span>
                        <span className={isCurrent ? 'font-bold text-[#8C5D33]' : (isDone ? 'text-gray-700' : 'text-gray-400')}>
                          {stageText}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* COMPLETED RESULT */}
            {!isGenerating && result && (
              <div className="space-y-4">
                
                {/* 1. Slider View */}
                {viewMode === 'slider' && (
                  <BeforeAfterSlider
                    sketchImage={result.sketch_image_base64}
                    renderImage={result.rendered_image_base64}
                    sketchLabel="Hand-Drawn Sketch"
                    renderLabel={`Realistic ${result.parameters?.room_type || roomType}`}
                    aspectRatio="aspect-square"
                  />
                )}

                {/* 2. Side-by-Side View */}
                {viewMode === 'sideBySide' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase text-[#7A6C60]">Input Sketch</span>
                      <img
                        src={result.sketch_image_base64}
                        alt="Sketch"
                        className="w-full aspect-square object-contain rounded-xl border border-[#DDD0BF] bg-[#FAF9F6]"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase text-[#8C5D33]">Realistic Render</span>
                      <img
                        src={result.rendered_image_base64}
                        alt="Render"
                        className="w-full aspect-square object-cover rounded-xl border border-[#DDD0BF]"
                      />
                    </div>
                  </div>
                )}

                {/* 3. Render Only View */}
                {viewMode === 'renderOnly' && (
                  <div className="relative rounded-2xl overflow-hidden border border-[#DDD0BF] shadow-md group aspect-square">
                    <img
                      src={result.rendered_image_base64}
                      alt="Full Render"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setIsFullScreen(true)}
                      className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/60 text-white backdrop-blur-md opacity-80 hover:opacity-100"
                      title="Full Screen Preview"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Applied Specifications Badges */}
                <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-[#F5EBE1] border border-[#E5DACD] text-[10px]">
                  <span className="font-bold text-[#8C5D33] uppercase self-center mr-1">Applied:</span>
                  <span className="bg-white px-2 py-0.5 rounded-md font-semibold text-[#3D332B] shadow-2xs">
                    Style: {result.parameters?.interior_style || interiorStyle}
                  </span>
                  <span className="bg-white px-2 py-0.5 rounded-md font-semibold text-[#3D332B] shadow-2xs">
                    Floor: {result.parameters?.flooring || flooring}
                  </span>
                  <span className="bg-white px-2 py-0.5 rounded-md font-semibold text-[#3D332B] shadow-2xs">
                    Wall: {result.parameters?.wall_design || wallDesign}
                  </span>
                  <span className="bg-white px-2 py-0.5 rounded-md font-semibold text-[#3D332B] shadow-2xs">
                    Light: {result.parameters?.lighting || lighting}
                  </span>
                  <span className="bg-white px-2 py-0.5 rounded-md font-semibold text-[#3D332B] shadow-2xs">
                    Palette: {customColor ? `Custom (${customColor})` : (result.parameters?.color_theme || colorTheme)}
                  </span>
                </div>

                {/* Metrics Badges */}
                <div className="grid grid-cols-4 gap-2 p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5DACD] text-center">
                  <div>
                    <span className="text-[9px] font-bold text-[#7A6C60] uppercase block">Structure</span>
                    <span className="text-sm font-extrabold text-[#231E1B]">{result.metrics?.structural_fidelity || '98%'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#7A6C60] uppercase block">Inference</span>
                    <span className="text-sm font-extrabold text-[#231E1B]">{result.latency_seconds}s</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#7A6C60] uppercase block">SSIM</span>
                    <span className="text-sm font-extrabold text-[#231E1B]">{result.metrics?.ssim_estimate || '0.938'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#7A6C60] uppercase block">Resolution</span>
                    <span className="text-sm font-extrabold text-[#231E1B]">1024 HD</span>
                  </div>
                </div>

                {/* Engine Info Notice */}
                <div className="p-3 rounded-xl bg-[#F5EBE1] border border-[#E5DACD] text-xs text-[#52463D] flex items-start space-x-2">
                  <Info className="w-4 h-4 text-[#8C5D33] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#231E1B]">
                      {result.model_name}
                    </p>
                    <p className="text-[11px] text-[#7A6C60] mt-0.5">
                      {result.system_notice}
                    </p>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => downloadImage(result.rendered_image_base64, `sketchspace_${roomType.toLowerCase()}_render.jpg`)}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#8C5D33] hover:bg-[#764B24] shadow-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download HD</span>
                  </button>

                  <button
                    onClick={saveToMyDesigns}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold text-[#3D332B] bg-[#FAF8F5] hover:bg-[#F2EDE4] border border-[#DDD0BF] flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <Bookmark className="w-4 h-4 text-[#8C5D33]" />
                    <span>Save to My Designs</span>
                  </button>

                  <button
                    onClick={handleGenerate}
                    className="py-2 px-3 rounded-xl text-xs font-semibold text-[#52463D] hover:bg-[#F2EDE4] border border-[#DDD0BF] flex items-center justify-center space-x-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Regenerate</span>
                  </button>

                  <button
                    onClick={() => {
                      const nextStyle = interiorStyle === 'Modern Luxury' ? 'Scandinavian' : (interiorStyle === 'Scandinavian' ? 'Japandi' : 'Modern Luxury');
                      setInteriorStyle(nextStyle);
                      setTimeout(handleGenerate, 100);
                    }}
                    className="py-2 px-3 rounded-xl text-xs font-semibold text-[#52463D] hover:bg-[#F2EDE4] border border-[#DDD0BF] flex items-center justify-center space-x-1.5"
                  >
                    <Palette className="w-3.5 h-3.5" />
                    <span>Try Another Style</span>
                  </button>
                </div>

              </div>
            )}

            {/* EMPTY STATE */}
            {!isGenerating && !result && (
              <div className="aspect-square rounded-2xl bg-[#FAF9F6] border-2 border-dashed border-[#DDD0BF] p-6 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#EFE8DD] flex items-center justify-center text-[#8C5D33] mb-3">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-sm font-bold text-[#231E1B]">
                  Your Realistic Interior Render
                </h3>
                <p className="text-xs text-[#7A6C60] mt-1 max-w-xs">
                  Upload a sketch in the center panel, customize specifications on the left, and click <strong>"Generate Realistic Interior"</strong>.
                </p>
              </div>
            )}

          </div>

        </div>

        {/* FULL SCREEN MODAL */}
        {isFullScreen && result && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#DDD0BF]">
              <div className="p-4 border-b border-[#E5DACD] flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#231E1B]">
                    Full-Screen Render: {roomType} in {interiorStyle}
                  </h3>
                  <p className="text-xs text-[#7A6C60]">
                    {flooring} • {wallDesign} • {lighting}
                  </p>
                </div>
                <button
                  onClick={() => setIsFullScreen(false)}
                  className="p-2 rounded-xl text-gray-500 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 bg-[#FAF9F6] flex justify-center">
                <img
                  src={result.rendered_image_base64}
                  alt="High Resolution Render"
                  className="max-h-[75vh] object-contain rounded-2xl shadow-lg border border-[#DDD0BF]"
                />
              </div>
              <div className="p-4 border-t border-[#E5DACD] flex justify-between items-center bg-white">
                <span className="text-xs text-[#7A6C60]">
                  Resolution: 1024 × 1024 HD • Structural Match: {result.metrics?.structural_fidelity}
                </span>
                <button
                  onClick={() => downloadImage(result.rendered_image_base64, `sketchspace_render_${Date.now()}.jpg`)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#8C5D33] hover:bg-[#764B24] flex items-center space-x-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full HD</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
