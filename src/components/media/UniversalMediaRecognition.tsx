import React from 'react';
import {
  Film,
  Music,
  BookOpen,
  FileText,
  Image as ImageIcon,
  Sparkles,
  Plus,
  Play,
  X,
  ExternalLink,
} from 'lucide-react';
import { DriveUrlParseResult, GoogleDriveMediaType } from '../../types/media';
import { useMedia } from '../../state/MediaContext';

interface UniversalMediaRecognitionProps {
  detectedItem: DriveUrlParseResult;
  onEmbed: (item: DriveUrlParseResult) => void;
  onSaveToLibrary: (item: DriveUrlParseResult) => void;
  onDismiss: () => void;
}

export const UniversalMediaRecognition: React.FC<UniversalMediaRecognitionProps> = ({
  detectedItem,
  onEmbed,
  onSaveToLibrary,
  onDismiss,
}) => {
  const categoryIcons: Record<GoogleDriveMediaType, React.ElementType> = {
    movie: Film,
    music: Music,
    book: BookOpen,
    document: FileText,
    image: ImageIcon,
  };

  const CategoryIcon = categoryIcons[detectedItem.detectedType] || FileText;

  return (
    <div className="p-3 rounded-[16px] bg-[#161826] border border-blue-500/40 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200 select-none">
      <div className="flex items-start justify-between gap-3">
        {/* Left Icon & Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/30">
            <CategoryIcon size={18} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
                Google Drive {detectedItem.detectedType} Detected
              </span>
              <Sparkles size={12} className="text-amber-400" />
            </div>
            <h4 className="text-xs font-bold text-white truncate mt-0.5 max-w-[260px] md:max-w-[360px]">
              {detectedItem.inferredTitle}
            </h4>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={onDismiss}
          className="text-white/40 hover:text-white p-1 rounded-lg transition-colors"
          title="Dismiss recognition"
        >
          <X size={14} />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between gap-2">
        <span className="text-[11px] text-[var(--text-secondary)]">
          Display as interactive {detectedItem.detectedType} embed?
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEmbed(detectedItem)}
            className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-blue-600/30 active:scale-95 transition-all"
          >
            <Play size={12} className="fill-white" />
            <span>Embed Interactive Card</span>
          </button>

          <button
            type="button"
            onClick={() => onSaveToLibrary(detectedItem)}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium flex items-center gap-1 transition-colors"
          >
            <Plus size={12} />
            <span>Save to Library</span>
          </button>
        </div>
      </div>
    </div>
  );
};
