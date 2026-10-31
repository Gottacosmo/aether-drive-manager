import React, { useState } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  Download,
  Share2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Info,
} from 'lucide-react';
import { useMedia } from '../../state/MediaContext';

export const ImageLightboxModal: React.FC = () => {
  const { modalTargetItem, closeMediaModal, openShareModal, mediaItems } = useMedia();
  const [isZoomed, setIsZoomed] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  if (!modalTargetItem) return null;

  const imageItems = mediaItems.filter((m) => m.category === 'image');
  const currentIndex = imageItems.findIndex((m) => m.id === modalTargetItem.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200 select-none">
      {/* Top Floating Control Bar */}
      <div className="absolute top-4 inset-x-4 md:inset-x-8 z-20 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold truncate max-w-xs md:max-w-md">
            {modalTargetItem.title}
          </span>
          <span className="text-[10px] text-white/50 hidden sm:inline">
            • Google Drive 4K Visual
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsZoomed((z) => !z)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            title={isZoomed ? 'Reset Zoom' : 'Zoom 100%'}
          >
            {isZoomed ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          <button
            onClick={() => setShowInfo((i) => !i)}
            className={`p-2 rounded-xl transition-colors ${
              showInfo ? 'bg-blue-600 text-white' : 'bg-white/10 hover:bg-white/20'
            }`}
            title="Image Info"
          >
            <Info size={16} />
          </button>

          <button
            onClick={() => openShareModal(modalTargetItem)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            title="Share Image"
          >
            <Share2 size={16} />
          </button>

          <a
            href={modalTargetItem.originalUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            title="Open in Google Drive"
          >
            <ExternalLink size={16} />
          </a>

          <button
            onClick={closeMediaModal}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors ml-2"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div
        className="w-full h-full flex items-center justify-center p-4 md:p-12 overflow-auto cursor-zoom-in"
        onClick={() => setIsZoomed((z) => !z)}
      >
        <img
          src={modalTargetItem.previewUrl || modalTargetItem.thumbnailUrl}
          alt={modalTargetItem.title}
          className={`max-w-full max-h-full object-contain rounded-lg transition-transform duration-300 shadow-2xl ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100'
          }`}
        />
      </div>

      {/* Info Flyout */}
      {showInfo && (
        <div className="absolute bottom-6 left-6 z-20 p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/15 max-w-sm space-y-2 text-xs text-white">
          <h4 className="font-bold text-sm">{modalTargetItem.title}</h4>
          <p className="text-[11px] text-white/70">{modalTargetItem.description}</p>
          <div className="pt-2 border-t border-white/10 text-[10px] text-white/50 space-y-1 font-mono">
            <div>Uploaded by: {modalTargetItem.addedBy.name}</div>
            <div>Visibility: {modalTargetItem.visibility}</div>
            {modalTargetItem.dimensions && (
              <div>Resolution: {modalTargetItem.dimensions.width} x {modalTargetItem.dimensions.height}</div>
            )}
            <div>Drive ID: {modalTargetItem.driveId}</div>
          </div>
        </div>
      )}
    </div>
  );
};
