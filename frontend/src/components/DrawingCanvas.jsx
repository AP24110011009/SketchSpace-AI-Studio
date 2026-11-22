import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  PenTool, Eraser, Minus, Square, DoorOpen, AppWindow, 
  RotateCcw, RotateCw, Trash2, Download, CheckCircle2, 
  Grid, Armchair, Bed, BedDouble, Table, Palette, Sliders
} from 'lucide-react';

export default function DrawingCanvas({ onCanvasExport }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [snapshot, setSnapshot] = useState(null);
  
  // Tools: 'pencil', 'line', 'rect', 'door', 'window', 'eraser', 'bed', 'sofa', 'wardrobe', 'table'
  const [tool, setTool] = useState('pencil');
  const [brushSize, setBrushSize] = useState(4);
  const [brushColor, setBrushColor] = useState('#221F1D');
  const [showGrid, setShowGrid] = useState(true);
  
  // Undo / Redo history
  const [history, setHistory] = useState([]);
  const [redoList, setRedoList] = useState([]);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = 640;
    canvas.height = 640;

    // Fill white paper background
    ctx.fillStyle = '#FAF9F6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGrid(ctx);
    saveState();
  }, []);

  const drawGrid = (ctx) => {
    if (!showGrid) return;
    const canvas = canvasRef.current;
    ctx.save();
    ctx.strokeStyle = 'rgba(215, 205, 195, 0.45)';
    ctx.lineWidth = 1;
    const gridSize = 32;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    ctx.restore();
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setHistory(prev => [...prev.slice(-15), canvas.toDataURL()]);
    setRedoList([]);
  };

  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = e.clientX;
    let clientY = e.clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  // Start Drawing / Placing
  const startDrawing = (e) => {
    const coords = getCanvasCoords(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    setIsDrawing(true);
    setHasDrawn(true);
    setStartPos(coords);

    // Take snapshot for shape dragging preview
    setSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));

    if (tool === 'pencil') {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
    }
  };

  // Draw Movement
  const draw = (e) => {
    if (!isDrawing) return;
    const coords = getCanvasCoords(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'pencil') {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else if (tool === 'eraser') {
      ctx.strokeStyle = '#FAF9F6';
      ctx.lineWidth = brushSize * 5;
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else {
      // Shape dragging preview: restore snapshot first
      if (snapshot) {
        ctx.putImageData(snapshot, 0, 0);
      }

      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;

      const sx = startPos.x;
      const sy = startPos.y;
      const ex = coords.x;
      const ey = coords.y;
      const width = ex - sx;
      const height = ey - sy;

      if (tool === 'line') {
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      } else if (tool === 'rect') {
        ctx.strokeRect(sx, sy, width, height);
      } else if (tool === 'door') {
        // Architectural Door: Frame with swing arc
        ctx.strokeRect(sx, sy, width, height);
        ctx.beginPath();
        ctx.arc(sx, sy + height, Math.abs(width), 1.5 * Math.PI, 2 * Math.PI);
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (tool === 'window') {
        // Architectural Window: Double line with center sill
        ctx.strokeRect(sx, sy, width, height);
        ctx.beginPath();
        ctx.moveTo(sx, sy + height / 2);
        ctx.lineTo(sx + width, sy + height / 2);
        ctx.moveTo(sx + width / 2, sy);
        ctx.lineTo(sx + width / 2, sy + height);
        ctx.stroke();
      } else if (tool === 'bed') {
        // Bed Symbol: Frame, headboard, two pillows
        ctx.strokeRect(sx, sy, width, height);
        // Headboard
        const hbHeight = height * 0.22;
        ctx.fillStyle = 'rgba(210, 195, 175, 0.4)';
        ctx.fillRect(sx, sy, width, hbHeight);
        ctx.strokeRect(sx, sy, width, hbHeight);
        // Pillows
        const pw = Math.abs(width) * 0.35;
        const ph = Math.abs(hbHeight) * 0.7;
        ctx.strokeRect(sx + 8, sy + hbHeight + 6, pw, ph);
        ctx.strokeRect(ex - pw - 8, sy + hbHeight + 6, pw, ph);
      } else if (tool === 'sofa') {
        // Sofa Symbol: Backrest, armrests, cushion split
        ctx.strokeRect(sx, sy, width, height);
        const armW = width * 0.16;
        ctx.strokeRect(sx, sy, armW, height);
        ctx.strokeRect(ex - armW, sy, armW, height);
        ctx.strokeRect(sx + armW, sy, width - 2 * armW, height * 0.3);
      } else if (tool === 'wardrobe') {
        // Wardrobe Symbol: Rect with diagonal X or split doors
        ctx.strokeRect(sx, sy, width, height);
        ctx.beginPath();
        ctx.moveTo(sx + width / 2, sy);
        ctx.lineTo(sx + width / 2, ey);
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      } else if (tool === 'table') {
        // Table Symbol: Oval or rounded rectangle
        ctx.beginPath();
        ctx.ellipse(sx + width / 2, sy + height / 2, Math.abs(width / 2), Math.abs(height / 2), 0, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setSnapshot(null);
    saveState();
  };

  const undo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const currentState = history[history.length - 1];
    setRedoList(prev => [...prev, currentState]);

    const newHistory = [...history];
    newHistory.pop();
    const previousState = newHistory[newHistory.length - 1];

    const img = new Image();
    img.src = previousState;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      setHistory(newHistory);
    };
  };

  const redo = () => {
    if (redoList.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const nextState = redoList[redoList.length - 1];
    const newRedo = [...redoList];
    newRedo.pop();

    const img = new Image();
    img.src = nextState;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      setHistory(prev => [...prev, nextState]);
      setRedoList(newRedo);
    };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FAF9F6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx);
    setHasDrawn(false);
    saveState();
  };

  const downloadSketch = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `room_sketch_${Date.now()}.png`;
    link.click();
  };

  const handleUseSketch = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "architectural_room_sketch.png", { type: "image/png" });
        onCanvasExport(file, canvas.toDataURL());
      }
    }, "image/png");
  };

  return (
    <div className="flex flex-col space-y-3">
      
      {/* Top Architectural Toolbar */}
      <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#E5DACD] flex flex-wrap items-center justify-between gap-2 shadow-xs">
        
        {/* Drawing Tools */}
        <div className="flex flex-wrap items-center gap-1">
          {[
            { id: 'pencil', label: 'Pencil', icon: PenTool },
            { id: 'line', label: 'Wall (Line)', icon: Minus },
            { id: 'rect', label: 'Room (Rect)', icon: Square },
            { id: 'door', label: 'Door', icon: DoorOpen },
            { id: 'window', label: 'Window', icon: AppWindow },
            { id: 'bed', label: 'Bed', icon: BedDouble },
            { id: 'sofa', label: 'Sofa', icon: Armchair },
            { id: 'wardrobe', label: 'Wardrobe', icon: Square },
            { id: 'table', label: 'Table', icon: Table },
            { id: 'eraser', label: 'Eraser', icon: Eraser },
          ].map((t) => {
            const Icon = t.icon;
            const active = tool === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTool(t.id)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                  active 
                    ? 'bg-[#8C5D33] text-white shadow-xs' 
                    : 'bg-white text-[#52463D] hover:bg-[#F2EDE4] border border-[#DDD0BF]'
                }`}
                title={t.label}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Brush Size & Stroke Width */}
        <div className="flex items-center space-x-2 px-3 py-1 bg-white rounded-xl border border-[#DDD0BF]">
          <span className="text-[11px] font-medium text-[#7A6C60]">Width:</span>
          <input
            type="range"
            min="2"
            max="16"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-16 accent-[#8C5D33] cursor-pointer"
          />
          <span className="text-xs font-bold text-[#3D332B] w-3">{brushSize}</span>
        </div>

        {/* Actions: Undo, Redo, Download, Clear */}
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={undo}
            disabled={history.length <= 1}
            className="p-1.5 rounded-lg text-[#52463D] hover:bg-white disabled:opacity-30 transition-colors"
            title="Undo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={redo}
            disabled={redoList.length === 0}
            className="p-1.5 rounded-lg text-[#52463D] hover:bg-white disabled:opacity-30 transition-colors"
            title="Redo"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={downloadSketch}
            className="p-1.5 rounded-lg text-[#52463D] hover:bg-white transition-colors"
            title="Download Sketch"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={clearCanvas}
            className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-50 transition-colors"
            title="Clear Canvas"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Canvas Drawing Surface */}
      <div className="relative rounded-2xl overflow-hidden border border-[#D5C7B5] shadow-sm bg-[#FAF9F6] aspect-square flex items-center justify-center">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full touch-none cursor-crosshair"
        />

        {!hasDrawn && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center p-6 bg-white/40 backdrop-blur-[1px]">
            <div className="w-12 h-12 rounded-2xl bg-[#EFE8DD] flex items-center justify-center mb-3 text-[#8C5D33] shadow-xs">
              <PenTool className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-[#231E1B]">
              Draw Your Room Layout & Furniture
            </p>
            <p className="text-xs text-[#7A6C60] mt-1 max-w-sm">
              Use tools above to sketch walls, windows, doors, and furniture (bed, sofa, wardrobe, table).
            </p>
          </div>
        )}
      </div>

      {/* Confirm & Send Button */}
      <div className="flex items-center space-x-2 pt-1">
        <button
          type="button"
          onClick={handleUseSketch}
          disabled={!hasDrawn}
          className="flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 bg-[#8C5D33] hover:bg-[#764B24] text-white shadow-md disabled:opacity-40 transition-all cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Apply Drawn Sketch to AI Studio</span>
        </button>

        <button
          type="button"
          onClick={downloadSketch}
          className="px-3.5 py-3 rounded-xl font-semibold text-xs border border-[#DDD0BF] bg-white hover:bg-[#FAF8F5] text-[#3D332B] flex items-center space-x-1.5 transition-colors"
          title="Download PNG Sketch"
        >
          <Download className="w-4 h-4 text-[#8C5D33]" />
          <span className="hidden sm:inline">Save</span>
        </button>
      </div>

    </div>
  );
}
