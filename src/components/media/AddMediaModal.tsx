import React, { useState } from 'react';
import {
  X,
  Plus,
  Link,
  Film,
  Music,
  BookOpen,
  FileText,
  Image,
  CheckCircle2,
  AlertCircle,
  FolderPlus,
  Globe,
  Users,
  Lock,
  Eye,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { useMedia } from '../../state/MediaContext';
import { GoogleDriveService } from '../../services/googleDriveService';
import { GoogleDriveMediaType, MediaVisibility, DriveUrlParseResult } from '../../types/media';

export const AddMediaModal: React.FC = () => {
  const {
    closeMediaModal,
    addMediaItems,
    collections,
    createCollection,
    showToast,
  } = useMedia();

  const [rawInput, setRawInput] = useState('');
  const [parsedLinks, setParsedLinks] = useState<
    (DriveUrlParseResult & {
      title: string;
      description: string;
      category: GoogleDriveMediaType;
      collectionId: string;
      visibility: MediaVisibility;
      customThumbnail: string;
    })[]
  >([]);

  const [previewingIndex, setPreviewingIndex] = useState<number | null>(null);
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);
  const [newColTitle, setNewColTitle] = useState('');
  const [newColCat, setNewColCat] = useState<GoogleDriveMediaType>('movie');

  // Sample Google Drive Links for quick testing
  const SAMPLE_LINKS = [
    'https://drive.google.com/file/d/1vO8B0WbLg89H4L2xK4q3M_cinema_4k/view?usp=sharing',
    'https://drive.google.com/file/d/1aB2cD3eF4gH5iJ6kL7m_chillhop_audio/view?usp=sharing',
    'https://drive.google.com/file/d/1rS2tU3vW4xY5zA6bC7d_distributed_systems_pdf/view?usp=sharing',
    'https://docs.google.com/document/d/1qR2sT3uV4wX5yZ6aB7c_campus_architecture/edit?usp=sharing',
    'https://drive.google.com/file/d/1uV2wX3yZ4aB5cD6eF7g_brutalist_facade_image/view?usp=sharing',
  ];

  // Parse links whenever rawInput changes or Parse is clicked
  const handleParse = (textToParse?: string) => {
    const text = textToParse !== undefined ? textToParse : rawInput;
    if (!text.trim()) {
      setParsedLinks([]);
      return;
    }

    const detected = GoogleDriveService.parseMultipleUrls(text);
    if (detected.length === 0) {
      showToast('No valid Google Drive links recognized. Please paste a valid drive.google.com or docs.google.com link.');
      return;
    }

    const enhanced = detected.map((d) => ({
      ...d,
      title: d.inferredTitle,
      description: `Imported via Sitewide Google Drive Manager (${d.detectedType})`,
      category: d.detectedType,
      collectionId: collections.find((c) => c.category === d.detectedType)?.id || '',
      visibility: 'public' as MediaVisibility,
      customThumbnail: d.thumbnailUrl,
    }));

    setParsedLinks(enhanced);
    showToast(`Detected ${enhanced.length} Google Drive media link${enhanced.length > 1 ? 's' : ''}!`);
  };

  const handleInsertSamples = () => {
    const joined = SAMPLE_LINKS.join('\n');
    setRawInput(joined);
    handleParse(joined);
  };

  const handleUpdateLink = (index: number, updates: Partial<(typeof parsedLinks)[0]>) => {
    setParsedLinks((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, ...updates } : item))
    );
  };

  const handleRemoveLink = (index: number) => {
    setParsedLinks((prev) => prev.filter((_, idx) => idx !== index));
    if (previewingIndex === index) setPreviewingIndex(null);
  };

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColTitle.trim()) return;
    const col = createCollection(newColTitle.trim(), 'Custom user collection', newColCat, 'public');
    setIsCreatingCollection(false);
    setNewColTitle('');
    // Auto assign to first parsed item if any
    if (parsedLinks.length > 0) {
      handleUpdateLink(0, { collectionId: col.id });
    }
  };

  const handleSaveAll = () => {
    if (parsedLinks.length === 0) return;

    const itemsToSave = parsedLinks.map((item) => ({
      driveId: item.driveId,
      originalUrl: item.originalUrl,
      previewUrl: item.previewUrl,
      downloadUrl: item.downloadUrl,
      thumbnailUrl: item.customThumbnail || item.thumbnailUrl,
      title: item.title,
      description: item.description,
      category: item.category,
      collectionId: item.collectionId || undefined,
      collectionName: collections.find((c) => c.id === item.collectionId)?.title || undefined,
      visibility: item.visibility,
      permissionStatus: item.permissionStatus,
      tags: [item.category.toUpperCase(), 'Google Drive', item.visibility],
    }));

    addMediaItems(itemsToSave);
    closeMediaModal();
  };

  const categoryIcons: Record<GoogleDriveMediaType, React.ElementType> = {
    movie: Film,
    music: Music,
    book: BookOpen,
    document: FileText,
    image: Image,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-[28px] glass-modal border border-white/15 shadow-2xl overflow-hidden bg-[#12131c]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Plus size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Add Media</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Sitewide Google Drive Manager
                </span>
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Paste Google Drive links (movies, music, books, PDFs, documents, images) to embed sitewide.
              </p>
            </div>
          </div>

          <button
            onClick={closeMediaModal}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Input Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-white/90 flex items-center gap-1.5">
                <Link size={14} className="text-blue-400" />
                <span>Paste Google Drive Sharing Links (One or Multiple)</span>
              </label>

              <button
                type="button"
                onClick={handleInsertSamples}
                className="text-[11px] font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
              >
                <Sparkles size={12} />
                <span>Load Sample Links</span>
              </button>
            </div>

            <div className="relative">
              <textarea
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                placeholder="Paste one or multiple Google Drive links here...&#10;https://drive.google.com/file/d/1vO8B0Wb.../view?usp=sharing&#10;https://drive.google.com/file/d/1aB2cD3e.../view?usp=sharing"
                className="w-full h-24 p-3.5 rounded-[16px] bg-white/[0.05] border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-blue-500 font-mono resize-none transition-colors"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-[var(--text-secondary)]">
                Supports video/movies, audio tracks, PDF books, Google Docs/Sheets, and high-res images.
              </span>
              <button
                type="button"
                onClick={() => handleParse()}
                disabled={!rawInput.trim()}
                className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-xs font-bold text-white transition-all shadow-md shadow-blue-600/30 active:scale-95"
              >
                Detect & Auto-Categorize
              </button>
            </div>
          </div>

          {/* Quick Collection Creation Inline */}
          {isCreatingCollection ? (
            <form onSubmit={handleCreateCollection} className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-wrap items-center gap-2.5">
              <input
                type="text"
                placeholder="Collection name (e.g. Cyberpunk Film Night)"
                value={newColTitle}
                onChange={(e) => setNewColTitle(e.target.value)}
                className="flex-1 min-w-[200px] px-3 py-1.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
                autoFocus
              />
              <select
                value={newColCat}
                onChange={(e) => setNewColCat(e.target.value as GoogleDriveMediaType)}
                className="px-2.5 py-1.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none"
              >
                <option value="movie">Movies</option>
                <option value="music">Music</option>
                <option value="book">Books</option>
                <option value="document">Documents</option>
                <option value="image">Images</option>
              </select>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setIsCreatingCollection(false)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white"
              >
                Cancel
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-between text-xs text-white/70">
              <span>Organize uploads into existing collections:</span>
              <button
                type="button"
                onClick={() => setIsCreatingCollection(true)}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
              >
                <FolderPlus size={14} />
                <span>+ New Collection</span>
              </button>
            </div>
          )}

          {/* Detected Items List */}
          {parsedLinks.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  Detected Media Items ({parsedLinks.length}) — Configure Before Saving
                </h3>
                <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  <span>Verified Google Drive IDs</span>
                </span>
              </div>

              <div className="space-y-3">
                {parsedLinks.map((item, idx) => {
                  const CategoryIcon = categoryIcons[item.category] || FileText;
                  const isPreviewing = previewingIndex === idx;

                  return (
                    <div
                      key={item.driveId + idx}
                      className="p-4 rounded-[20px] bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all space-y-3"
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Thumbnail / Category Badge */}
                        <div className="relative w-full md:w-36 h-28 rounded-xl overflow-hidden bg-black/60 border border-white/10 flex-shrink-0 group">
                          <img
                            src={item.customThumbnail}
                            alt={item.title}
                            onError={(e) => {
                              // Fallback if google thumbnail returns error
                              (e.target as HTMLImageElement).src =
                                item.category === 'movie'
                                  ? 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400'
                                  : item.category === 'music'
                                  ? 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400'
                                  : item.category === 'book'
                                  ? 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400'
                                  : 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400';
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-bold text-white uppercase flex items-center gap-1">
                            <CategoryIcon size={11} className="text-blue-400" />
                            <span>{item.category}</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setPreviewingIndex(isPreviewing ? null : idx)}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-semibold text-white transition-opacity gap-1"
                          >
                            <Eye size={14} />
                            <span>{isPreviewing ? 'Close' : 'Preview'}</span>
                          </button>
                        </div>

                        {/* Metadata Inputs */}
                        <div className="flex-1 space-y-2.5">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => handleUpdateLink(idx, { title: e.target.value })}
                              placeholder="Media Title"
                              className="flex-1 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-blue-500"
                            />

                            <button
                              type="button"
                              onClick={() => handleRemoveLink(idx)}
                              className="p-1.5 rounded-lg text-white/50 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                              title="Remove link"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {/* Category Dropdown */}
                            <div>
                              <label className="text-[10px] text-white/60 uppercase font-semibold block mb-0.5">
                                Category
                              </label>
                              <select
                                value={item.category}
                                onChange={(e) =>
                                  handleUpdateLink(idx, {
                                    category: e.target.value as GoogleDriveMediaType,
                                  })
                                }
                                className="w-full px-2.5 py-1.5 rounded-xl bg-white/[0.06] border border-white/10 text-xs text-white focus:outline-none"
                              >
                                <option value="movie">Movie / Video</option>
                                <option value="music">Music / Audio</option>
                                <option value="book">Book / Novel</option>
                                <option value="document">Document / Sheet</option>
                                <option value="image">Image Gallery</option>
                              </select>
                            </div>

                            {/* Collection Assignment */}
                            <div>
                              <label className="text-[10px] text-white/60 uppercase font-semibold block mb-0.5">
                                Collection
                              </label>
                              <select
                                value={item.collectionId}
                                onChange={(e) => handleUpdateLink(idx, { collectionId: e.target.value })}
                                className="w-full px-2.5 py-1.5 rounded-xl bg-white/[0.06] border border-white/10 text-xs text-white focus:outline-none"
                              >
                                <option value="">No Collection</option>
                                {collections.map((col) => (
                                  <option key={col.id} value={col.id}>
                                    {col.title} ({col.category})
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Visibility Selector */}
                            <div>
                              <label className="text-[10px] text-white/60 uppercase font-semibold block mb-0.5">
                                Visibility
                              </label>
                              <select
                                value={item.visibility}
                                onChange={(e) =>
                                  handleUpdateLink(idx, {
                                    visibility: e.target.value as MediaVisibility,
                                  })
                                }
                                className="w-full px-2.5 py-1.5 rounded-xl bg-white/[0.06] border border-white/10 text-xs text-white focus:outline-none"
                              >
                                <option value="public">🌐 Public (All Users)</option>
                                <option value="friends">👥 Friends Only</option>
                                <option value="private">🔒 Private (Me Only)</option>
                              </select>
                            </div>
                          </div>

                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => handleUpdateLink(idx, { description: e.target.value })}
                            placeholder="Add brief description or notes..."
                            className="w-full px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-white/80 placeholder-white/30 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      {/* Interactive In-Modal Preview Player */}
                      {isPreviewing && (
                        <div className="p-3 rounded-xl bg-black/60 border border-white/15 animate-in fade-in duration-150">
                          <div className="flex items-center justify-between text-xs font-semibold text-white/90 mb-2">
                            <span>Live Google Drive Preview Test</span>
                            <span className="text-[11px] text-blue-400">ID: {item.driveId}</span>
                          </div>
                          {item.category === 'movie' ? (
                            <div className="w-full aspect-video rounded-lg overflow-hidden bg-black">
                              <iframe
                                src={item.previewUrl}
                                title={item.title}
                                className="w-full h-full border-0"
                                allow="autoplay; fullscreen"
                              />
                            </div>
                          ) : item.category === 'music' ? (
                            <audio controls src={item.downloadUrl} className="w-full" />
                          ) : item.category === 'image' ? (
                            <img src={item.previewUrl} alt={item.title} className="w-full max-h-64 object-contain rounded-lg" />
                          ) : (
                            <div className="w-full h-64 rounded-lg overflow-hidden bg-black">
                              <iframe src={item.previewUrl} title={item.title} className="w-full h-full border-0" />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Google Drive Permission Guarantee */}
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-300">
                        <AlertCircle size={14} className="flex-shrink-0 text-blue-400" />
                        <span>
                          <strong>Google Drive Access:</strong> We strictly respect Google Drive access controls. Ensure file sharing is set to "Anyone with the link can view" for public playback.
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-white/[0.02]">
          <button
            type="button"
            onClick={closeMediaModal}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={parsedLinks.length === 0}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 text-xs font-bold text-white shadow-lg shadow-blue-500/30 flex items-center gap-2 active:scale-95 transition-all"
          >
            <CheckCircle2 size={16} />
            <span>Save {parsedLinks.length} Item{parsedLinks.length !== 1 ? 's' : ''} to Sitewide Library</span>
          </button>
        </div>
      </div>
    </div>
  );
};
