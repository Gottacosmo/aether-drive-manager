import React, { useState } from 'react';
import {
  X,
  BookOpen,
  ZoomIn,
  ZoomOut,
  Maximize,
  Download,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useMedia } from '../../state/MediaContext';

export const BookReaderModal: React.FC = () => {
  const { modalTargetItem, closeMediaModal, openShareModal, showToast } = useMedia();
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!modalTargetItem) return null;

  const handleToggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
    showToast(isBookmarked ? 'Bookmark removed.' : 'Page bookmarked in your reading collection!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-5xl h-[94vh] flex flex-col rounded-[26px] glass-modal border border-white/15 shadow-2xl overflow-hidden bg-[#10111a]">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <BookOpen size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white truncate max-w-md">
                {modalTargetItem.title}
              </h2>
              <p className="text-[11px] text-[var(--text-secondary)]">
                {modalTargetItem.pageCount ? `${modalTargetItem.pageCount} pages • ` : ''}
                Google Drive Embedded Reader
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-white/[0.05] p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
                className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut size={15} />
              </button>
              <span className="text-[11px] font-mono text-white/90 px-1">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
                className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn size={15} />
              </button>
            </div>

            {/* Bookmark */}
            <button
              onClick={handleToggleBookmark}
              className={`p-2 rounded-xl border transition-colors ${
                isBookmarked
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-white/[0.05] border-white/10 text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title="Bookmark Page"
            >
              <Bookmark size={16} />
            </button>

            {/* Share */}
            <button
              onClick={() => openShareModal(modalTargetItem)}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              title="Share Book"
            >
              <Share2 size={16} />
            </button>

            {/* Open Original */}
            <a
              href={modalTargetItem.originalUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              title="Open in Google Drive"
            >
              <ExternalLink size={16} />
            </a>

            {/* Close */}
            <button
              onClick={closeMediaModal}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Reader Canvas Area */}
        <div className="flex-1 w-full bg-[#1e1f2b] overflow-hidden flex items-center justify-center p-2">
          <div
            style={{ width: `${zoomLevel}%`, height: `${zoomLevel}%` }}
            className="w-full h-full transition-all duration-200 rounded-xl overflow-hidden shadow-2xl bg-black"
          >
            <iframe
              src={modalTargetItem.previewUrl}
              title={modalTargetItem.title}
              className="w-full h-full border-0"
              allow="autoplay"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
