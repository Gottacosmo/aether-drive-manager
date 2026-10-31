import React, { useState } from 'react';
import {
  X,
  Search,
  Film,
  Music,
  BookOpen,
  FileText,
  Image as ImageIcon,
  Check,
  Plus,
  Play,
  Globe,
  Lock,
} from 'lucide-react';
import { useMedia } from '../../state/MediaContext';
import { GoogleDriveMediaType, GoogleDriveMediaItem } from '../../types/media';

export const EmbedMediaPickerModal: React.FC = () => {
  const {
    mediaItems,
    collections,
    closeMediaModal,
    onEmbedSelectCallback,
    openAddMediaModal,
    showToast,
  } = useMedia();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GoogleDriveMediaType | 'all'>('all');
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>('all');

  const filteredItems = mediaItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesCollection =
      selectedCollectionId === 'all' || item.collectionId === selectedCollectionId;

    return matchesSearch && matchesCategory && matchesCollection;
  });

  const handleSelect = (item: GoogleDriveMediaItem) => {
    if (onEmbedSelectCallback) {
      onEmbedSelectCallback(item);
    }
    showToast(`Embedded "${item.title}"!`);
    closeMediaModal();
  };

  const categoryIcons: Record<GoogleDriveMediaType, React.ElementType> = {
    movie: Film,
    music: Music,
    book: BookOpen,
    document: FileText,
    image: ImageIcon,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-3xl max-h-[88vh] flex flex-col rounded-[26px] glass-modal border border-white/15 shadow-2xl overflow-hidden bg-[#12131d]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div>
            <h2 className="text-base font-bold text-white">Embed Saved Google Drive Media</h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Select any media from your library to embed into this message, post, or room.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                closeMediaModal();
                openAddMediaModal();
              }}
              className="px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Plus size={14} />
              <span>Add New Link</span>
            </button>

            <button
              onClick={closeMediaModal}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 border-b border-white/10 space-y-3 bg-white/[0.01]">
          {/* Search Input */}
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search saved movies, music, books, documents, or images..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white/[0.05] text-white/70 hover:bg-white/10'
              }`}
            >
              All Media ({mediaItems.length})
            </button>

            {(['movie', 'music', 'book', 'document', 'image'] as GoogleDriveMediaType[]).map((cat) => {
              const Icon = categoryIcons[cat];
              const count = mediaItems.filter((m) => m.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white/[0.05] text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Icon size={13} />
                  <span className="capitalize">{cat}s</span>
                  <span className="text-[10px] opacity-75 font-mono">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Media Item Grid */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {filteredItems.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <Film size={36} className="text-white/20 mb-2" />
              <h4 className="text-sm font-semibold text-white">No media found</h4>
              <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-sm">
                Try a different search query or click "Add New Link" above to paste Google Drive links.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {filteredItems.map((item) => {
                const Icon = categoryIcons[item.category] || FileText;

                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-blue-500/50 cursor-pointer transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-white/10">
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-bold text-white uppercase flex items-center gap-1">
                          <Icon size={11} className="text-blue-400" />
                          <span>{item.category}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1 mt-0.5">
                          {item.collectionName ? `📁 ${item.collectionName}` : 'Google Drive Item'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="mt-3 w-full py-1.5 rounded-xl bg-blue-600/30 group-hover:bg-blue-600 text-blue-300 group-hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-md"
                    >
                      <Plus size={13} />
                      <span>Select & Embed</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
