import React, { useRef, useState, useEffect } from 'react';
import { X, Send, RotateCcw } from 'lucide-react';
import { useApp } from '../../state/AppContext';

export const HandwritingModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { sendMessage } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#007aff');
  const [strokeWidth, setStrokeWidth] = useState(4);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.strokeStyle = color;
    ctx.lineWidth = strokeWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSend = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    sendMessage('✍️ Handwritten Note', {
      mediaType: 'handwriting',
      mediaUrl: dataUrl,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-[24px] p-4 select-none animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-[26px] glass-modal overflow-hidden border border-white/15 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <h3 className="text-sm font-bold text-[var(--text-primary)]">Handwritten Note Canvas</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] hover:text-white"
          >
            <X size={17} />
          </button>
        </div>

        {/* Canvas Pad */}
        <div className="p-4 bg-[#0a0b10] flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={480}
            height={260}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-64 bg-[#141622] rounded-[18px] border border-white/10 cursor-crosshair touch-none shadow-inner"
          />
        </div>

        {/* Controls Toolbar */}
        <div className="p-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
          {/* Colors */}
          <div className="flex items-center gap-2">
            {['#007aff', '#34c759', '#ff9500', '#ff2d55', '#ffffff'].map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{ backgroundColor: c }}
                className={`w-6 h-6 rounded-full border border-white/20 transition-transform ${
                  color === c ? 'scale-125 ring-2 ring-white/60' : ''
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearCanvas}
              className="glass-btn text-xs py-1.5 px-3 flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-white"
            >
              <RotateCcw size={14} />
              <span>Clear</span>
            </button>

            <button
              onClick={handleSend}
              className="glass-btn glass-btn-primary text-xs py-1.5 px-4 flex items-center gap-1.5"
            >
              <Send size={14} />
              <span>Send Note</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
