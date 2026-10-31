import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Search,
  Maximize2,
  Share2,
  ExternalLink,
} from 'lucide-react';
import { useMedia } from '../../state/MediaContext';

export const GalleryView: React.FC = () => {
  const { mediaItems, openAddMediaModal, openImageLightbox } = useMedia();
  const [search, setSearch] = useState('');

  const images = mediaItems.filter(
    (m) =>
      m.category === 'image' &&
      (m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[var(--bg-app)] p-4 md:p-8 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                <ImageIcon size={22} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Image Galleries</h1>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Google Drive 4K editorial photography, architectural captures, and wallpapers.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddMediaModal}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-lg shadow-purple-600/30 flex items-center gap-2 active:scale-95 transition-all"
          >
            <Plus size={16} />
            <span>Add Image Link</span>
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search images, photos, and wallpapers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
            />
          </div>

          <span className="text-xs text-[var(--text-secondary)] font-mono">
            {images.length} High-Res Visual{images.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Masonry / Grid Gallery */}
        {images.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <ImageIcon size={36} className="mx-auto text-white/20" />
            <h3 className="text-sm font-bold text-white">No images in gallery</h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Click "+ Add Image Link" to paste Google Drive image sharing links.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {images.map((img) => (
              <div
                key={img.id}
                onClick={() => openImageLightbox(img)}
                className="group relative rounded-[22px] overflow-hidden bg-black/40 border border-white/10 hover:border-purple-500/50 cursor-pointer transition-all duration-300 shadow-xl"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={img.previewUrl || img.thumbnailUrl}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                  <h4 className="text-xs font-bold truncate">{img.title}</h4>
                  <p className="text-[11px] text-white/70 line-clamp-1 mt-0.5">{img.description}</p>
                  <div className="flex items-center justify-between text-[10px] text-white/50 mt-2 pt-2 border-t border-white/15">
                    <span>By {img.addedBy.name}</span>
                    <span className="flex items-center gap-1 text-purple-300 font-semibold">
                      <Maximize2 size={11} />
                      <span>Expand Lightbox</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
