import React, { useState } from 'react';
import {
  Folder,
  Share2,
  Copy,
  Plus,
  Search,
  Globe,
  Users,
  Check,
  Film,
  Music,
  BookOpen,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';
import { useMedia } from '../../state/MediaContext';
import { GoogleDriveMediaType, MediaCollection } from '../../types/media';
import { UniversalMediaCard } from './UniversalMediaCard';

export const SharedLibrariesView: React.FC = () => {
  const { collections, mediaItems, openAddMediaModal, showToast } = useMedia();
  const [selectedCollection, setSelectedCollection] = useState<MediaCollection | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categoryIcons: Record<GoogleDriveMediaType | 'mixed', React.ElementType> = {
    movie: Film,
    music: Music,
    book: BookOpen,
    document: FileText,
    image: ImageIcon,
    mixed: Folder,
  };

  const handleCopyCollectionLink = (col: MediaCollection, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/#collection=${col.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(col.id);
      showToast(`Share link for "${col.title}" copied!`);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const collectionMedia = selectedCollection
    ? mediaItems.filter((m) => m.collectionId === selectedCollection.id)
    : [];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[var(--bg-app)] p-4 md:p-8 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
                <Folder size={22} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Shared Libraries & Collections</h1>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Curated public collections of Google Drive media organized into watchlists, playlists, and reading hubs.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddMediaModal}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white shadow-lg shadow-amber-600/30 flex items-center gap-2 active:scale-95 transition-all"
          >
            <Plus size={16} />
            <span>Add to Collection</span>
          </button>
        </div>

        {/* Selected Collection Inspector Modal / View */}
        {selectedCollection ? (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedCollection(null)}
                className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1.5"
              >
                <span>← Back to All Collections</span>
              </button>

              <button
                type="button"
                onClick={(e) => handleCopyCollectionLink(selectedCollection, e)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white flex items-center gap-1.5 transition-colors"
              >
                {copiedId === selectedCollection.id ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
                <span>Share Collection Link</span>
              </button>
            </div>

            {/* Collection Hero */}
            <div className="p-6 rounded-[28px] glass-panel border border-white/10 bg-gradient-to-r from-amber-900/20 via-black/40 to-transparent flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <img
                src={selectedCollection.coverImage}
                alt={selectedCollection.title}
                className="w-24 h-24 rounded-2xl object-cover bg-black flex-shrink-0 border border-white/10"
              />
              <div className="space-y-1 min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                  {selectedCollection.category} Collection
                </span>
                <h2 className="text-xl font-bold text-white">{selectedCollection.title}</h2>
                <p className="text-xs text-[var(--text-secondary)]">{selectedCollection.description}</p>
                <div className="text-[11px] text-white/50 pt-1">
                  Curated by {selectedCollection.ownerName} • {collectionMedia.length} item{collectionMedia.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>

            {/* Media Items in this Collection */}
            {collectionMedia.length === 0 ? (
              <div className="py-12 text-center text-xs text-white/50">
                No items in this collection yet. Click "+ Add to Collection" to add Google Drive links.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {collectionMedia.map((m) => (
                  <UniversalMediaCard key={m.id} media={m} layout="grid" />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Collections Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {collections.map((col) => {
              const Icon = categoryIcons[col.category] || Folder;
              const isCopied = copiedId === col.id;

              return (
                <div
                  key={col.id}
                  onClick={() => setSelectedCollection(col)}
                  className="rounded-[24px] overflow-hidden bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-amber-500/50 cursor-pointer transition-all duration-300 flex flex-col justify-between group shadow-xl select-none"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-black/60">
                    <img
                      src={col.coverImage}
                      alt={col.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-white uppercase flex items-center gap-1.5">
                      <Icon size={12} className="text-amber-400" />
                      <span>{col.category}</span>
                    </div>

                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-white/80 flex items-center gap-1">
                      {col.isPublic ? <Globe size={11} className="text-emerald-400" /> : <Users size={11} className="text-blue-400" />}
                      <span className="capitalize">{col.visibility}</span>
                    </div>

                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-white/90">
                      {col.itemCount} items
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                        {col.title}
                      </h3>
                      <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 mt-1">
                        {col.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                      <span>By {col.ownerName}</span>
                      <button
                        type="button"
                        onClick={(e) => handleCopyCollectionLink(col, e)}
                        className="hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1 text-[10px]"
                        title="Copy Collection Share Link"
                      >
                        {isCopied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
