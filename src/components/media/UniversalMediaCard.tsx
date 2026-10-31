import React, { useState } from 'react';
import {
  Play,
  Pause,
  Film,
  Music,
  BookOpen,
  FileText,
  Image as ImageIcon,
  Share2,
  Copy,
  ExternalLink,
  Users,
  Tv,
  Eye,
  Trash2,
  Check,
  Maximize2,
  Lock,
  Globe,
  Sparkles,
} from 'lucide-react';
import { GoogleDriveMediaItem, GoogleDriveMediaType } from '../../types/media';
import { useMedia } from '../../state/MediaContext';
import { GoogleDriveService } from '../../services/googleDriveService';

interface UniversalMediaCardProps {
  media: GoogleDriveMediaItem;
  layout?: 'grid' | 'compact' | 'chat_inline' | 'cinema';
  onDelete?: () => void;
  showActions?: boolean;
}

export const UniversalMediaCard: React.FC<UniversalMediaCardProps> = ({
  media,
  layout = 'grid',
  onDelete,
  showActions = true,
}) => {
  const {
    playAudioTrack,
    activeAudioTrack,
    isPlayingAudio,
    toggleAudio,
    createWatchRoom,
    openBookReader,
    openImageLightbox,
    openShareModal,
    deleteMediaItem,
    showToast,
  } = useMedia();

  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const isCurrentAudio = activeAudioTrack?.id === media.id;
  const isAudioPlaying = isCurrentAudio && isPlayingAudio;

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = GoogleDriveService.generateInternalShareUrl(media.id);
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true);
      showToast('Internal share link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const handleStartWatchParty = (e: React.MouseEvent) => {
    e.stopPropagation();
    createWatchRoom(media, `Watch Party: ${media.title}`);
  };

  const handleCardClick = () => {
    if (media.category === 'movie') {
      setIsPlayingVideo((prev) => !prev);
    } else if (media.category === 'music') {
      if (isCurrentAudio) {
        toggleAudio();
      } else {
        playAudioTrack(media);
      }
    } else if (media.category === 'book' || media.category === 'document') {
      openBookReader(media);
    } else if (media.category === 'image') {
      openImageLightbox(media);
    }
  };

  const categoryIcons: Record<GoogleDriveMediaType, React.ElementType> = {
    movie: Film,
    music: Music,
    book: BookOpen,
    document: FileText,
    image: ImageIcon,
  };

  const CategoryIcon = categoryIcons[media.category] || FileText;

  // 1. Chat Inline Layout (Renders seamlessly inside chat bubbles)
  if (layout === 'chat_inline') {
    return (
      <div className="w-full rounded-[16px] overflow-hidden bg-black/40 border border-white/15 my-2 select-none shadow-lg">
        {media.category === 'movie' ? (
          <div className="relative aspect-video bg-black">
            {isPlayingVideo ? (
              <iframe
                src={media.previewUrl}
                title={media.title}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen"
              />
            ) : (
              <div
                onClick={handleCardClick}
                className="relative w-full h-full cursor-pointer group overflow-hidden"
              >
                <img
                  src={media.thumbnailUrl}
                  alt={media.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play size={22} className="ml-0.5 fill-white" />
                  </div>
                </div>
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-blue-300 flex items-center gap-1">
                  <Film size={11} />
                  <span>Google Drive Movie</span>
                </div>
              </div>
            )}
          </div>
        ) : media.category === 'music' ? (
          <div className="p-3 flex items-center gap-3">
            <button
              onClick={handleCardClick}
              className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center flex-shrink-0 shadow-md transition-transform active:scale-95"
            >
              {isAudioPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            </button>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-white truncate">{media.title}</h4>
              <p className="text-[11px] text-white/60 truncate">Google Drive Studio Audio</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/80">
              {media.duration ? GoogleDriveService.formatDuration(media.duration) : 'Audio'}
            </span>
          </div>
        ) : media.category === 'image' ? (
          <div
            onClick={handleCardClick}
            className="cursor-pointer group relative overflow-hidden max-h-60"
          >
            <img
              src={media.previewUrl || media.thumbnailUrl}
              alt={media.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white">
              {media.title}
            </div>
          </div>
        ) : (
          <div
            onClick={handleCardClick}
            className="p-3 flex items-center justify-between cursor-pointer hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                <CategoryIcon size={18} />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white truncate">{media.title}</h4>
                <p className="text-[10px] text-white/60">
                  {media.pageCount ? `${media.pageCount} pages • ` : ''}Google Drive {media.category}
                </p>
              </div>
            </div>
            <button className="px-2.5 py-1 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white text-[11px] font-bold flex items-center gap-1">
              <Eye size={12} />
              <span>Read</span>
            </button>
          </div>
        )}

        {/* Card Footer Strip with Actions */}
        <div className="px-3 py-1.5 bg-black/30 border-t border-white/10 flex items-center justify-between text-[11px] text-white/70">
          <span className="truncate max-w-[150px]">{media.title}</span>
          <div className="flex items-center gap-2">
            {media.category === 'movie' && (
              <button
                onClick={handleStartWatchParty}
                className="hover:text-blue-400 flex items-center gap-1 font-semibold text-[10px]"
                title="Start Watch Room party with friends"
              >
                <Tv size={12} />
                <span>Watch Room</span>
              </button>
            )}
            <button onClick={handleCopyLink} className="hover:text-white" title="Copy internal link">
              {copiedLink ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Standard Grid / Cinema Layout
  return (
    <div className="group rounded-[22px] overflow-hidden bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col shadow-xl select-none">
      {/* Media Preview Container */}
      <div className="relative aspect-video w-full bg-black/60 overflow-hidden">
        {media.category === 'movie' && isPlayingVideo ? (
          <iframe
            src={media.previewUrl}
            title={media.title}
            className="w-full h-full border-0"
            allow="autoplay; fullscreen"
          />
        ) : (
          <div onClick={handleCardClick} className="w-full h-full cursor-pointer relative">
            <img
              src={media.thumbnailUrl}
              alt={media.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800';
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
              {media.category === 'movie' ? (
                <div className="w-13 h-13 rounded-full bg-blue-600/90 group-hover:bg-blue-500 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play size={24} className="ml-1 fill-white" />
                </div>
              ) : media.category === 'music' ? (
                <div className="w-13 h-13 rounded-full bg-indigo-600/90 group-hover:bg-indigo-500 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  {isAudioPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1 fill-white" />}
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Eye size={20} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Category Pill Top Left */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase flex items-center gap-1.5 shadow-lg">
          <CategoryIcon size={12} className="text-blue-400" />
          <span>{media.category}</span>
        </div>

        {/* Visibility Pill Top Right */}
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white/80 flex items-center gap-1 shadow-lg">
          {media.visibility === 'public' ? (
            <Globe size={11} className="text-emerald-400" />
          ) : media.visibility === 'friends' ? (
            <Users size={11} className="text-blue-400" />
          ) : (
            <Lock size={11} className="text-amber-400" />
          )}
          <span className="capitalize">{media.visibility}</span>
        </div>

        {/* Duration / Page Badge Bottom Right */}
        {(media.duration || media.pageCount) && (
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-white/90">
            {media.duration
              ? GoogleDriveService.formatDuration(media.duration)
              : `${media.pageCount} pages`}
          </div>
        )}
      </div>

      {/* Card Info & Actions */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3
              onClick={handleCardClick}
              className="text-sm font-bold text-white hover:text-blue-400 transition-colors cursor-pointer line-clamp-1"
              title={media.title}
            >
              {media.title}
            </h3>
          </div>

          <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 mt-1">
            {media.description || 'Google Drive verified media available sitewide.'}
          </p>

          {media.collectionName && (
            <div className="mt-2 text-[10px] text-blue-300 font-medium inline-block bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
              📁 {media.collectionName}
            </div>
          )}
        </div>

        {/* Action Button Row */}
        {showActions && (
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {media.category === 'movie' && (
                <button
                  type="button"
                  onClick={handleStartWatchParty}
                  className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-[11px] font-bold flex items-center gap-1 transition-all"
                  title="Create Synchronized Watch Room"
                >
                  <Tv size={13} />
                  <span>Watch Party</span>
                </button>
              )}

              {media.category === 'music' && (
                <button
                  type="button"
                  onClick={handleCardClick}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white text-[11px] font-bold flex items-center gap-1 transition-all"
                >
                  {isAudioPlaying ? <Pause size={13} /> : <Play size={13} />}
                  <span>{isAudioPlaying ? 'Pause' : 'Play Track'}</span>
                </button>
              )}

              {(media.category === 'book' || media.category === 'document') && (
                <button
                  type="button"
                  onClick={handleCardClick}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white text-[11px] font-bold flex items-center gap-1 transition-all"
                >
                  <Eye size={13} />
                  <span>Read Book</span>
                </button>
              )}

              {media.category === 'image' && (
                <button
                  type="button"
                  onClick={handleCardClick}
                  className="px-2.5 py-1 rounded-lg bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white text-[11px] font-bold flex items-center gap-1 transition-all"
                >
                  <Maximize2 size={13} />
                  <span>Lightbox</span>
                </button>
              )}
            </div>

            {/* Sharing & External Actions */}
            <div className="flex items-center gap-1 text-white/60">
              <button
                type="button"
                onClick={handleCopyLink}
                className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                title="Copy Internal Share Link"
              >
                {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>

              <button
                type="button"
                onClick={() => openShareModal(media)}
                className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                title="Share & Permissions"
              >
                <Share2 size={14} />
              </button>

              <a
                href={media.originalUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                title="Open directly in Google Drive"
              >
                <ExternalLink size={14} />
              </a>

              <button
                type="button"
                onClick={() => {
                  if (confirm(`Remove "${media.title}" from library?`)) {
                    deleteMediaItem(media.id);
                    if (onDelete) onDelete();
                  }
                }}
                className="p-1.5 rounded-lg hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Remove Media"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
