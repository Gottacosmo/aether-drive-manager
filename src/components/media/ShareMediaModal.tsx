import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Globe,
  Users,
  Lock,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  QrCode,
  Send,
} from 'lucide-react';
import { useMedia } from '../../state/MediaContext';
import { useApp } from '../../state/AppContext';
import { GoogleDriveService } from '../../services/googleDriveService';
import { MediaVisibility } from '../../types/media';

export const ShareMediaModal: React.FC = () => {
  const { modalTargetItem, closeMediaModal, updateMediaItem, showToast } = useMedia();
  const { sendMessage, activeConversationId } = useApp();

  const [copiedInternal, setCopiedInternal] = useState(false);
  const [copiedDrive, setCopiedDrive] = useState(false);
  const [selectedVisibility, setSelectedVisibility] = useState<MediaVisibility>(
    modalTargetItem?.visibility || 'public'
  );

  if (!modalTargetItem) return null;

  const internalUrl = GoogleDriveService.generateInternalShareUrl(modalTargetItem.id);

  const handleCopyInternal = () => {
    navigator.clipboard.writeText(internalUrl).then(() => {
      setCopiedInternal(true);
      showToast('Internal shareable link copied!');
      setTimeout(() => setCopiedInternal(false), 2000);
    });
  };

  const handleCopyDrive = () => {
    navigator.clipboard.writeText(modalTargetItem.originalUrl).then(() => {
      setCopiedDrive(true);
      showToast('Google Drive link copied!');
      setTimeout(() => setCopiedDrive(false), 2000);
    });
  };

  const handleVisibilityChange = (v: MediaVisibility) => {
    setSelectedVisibility(v);
    updateMediaItem(modalTargetItem.id, { visibility: v });
  };

  const handleShareToActiveChat = () => {
    sendMessage(`Shared Google Drive Media: ${modalTargetItem.title}\n${internalUrl}`, {
      mediaType: 'google_drive',
      mediaData: modalTargetItem,
    });
    showToast('Shared directly into active chat conversation!');
    closeMediaModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-lg rounded-[26px] glass-modal border border-white/15 shadow-2xl overflow-hidden bg-[#131420]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Share2 size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Share & Permissions</h2>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Internal share links and Google Drive security policy
              </p>
            </div>
          </div>

          <button
            onClick={closeMediaModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Media Info Summary */}
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
            <img
              src={modalTargetItem.thumbnailUrl}
              alt={modalTargetItem.title}
              className="w-14 h-14 rounded-xl object-cover bg-black flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-white truncate">{modalTargetItem.title}</h4>
              <p className="text-[11px] text-[var(--text-secondary)] capitalize">
                {modalTargetItem.category} • Added by {modalTargetItem.addedBy.name}
              </p>
            </div>
          </div>

          {/* Visibility Controls */}
          <div>
            <label className="text-xs font-bold text-white block mb-2">Visibility Level</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleVisibilityChange('public')}
                className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1.5 transition-all ${
                  selectedVisibility === 'public'
                    ? 'bg-blue-600/20 border-blue-500 text-white'
                    : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.06]'
                }`}
              >
                <Globe size={18} className="text-emerald-400" />
                <span className="text-xs font-bold">Public</span>
                <span className="text-[10px] text-white/50">Entire site</span>
              </button>

              <button
                type="button"
                onClick={() => handleVisibilityChange('friends')}
                className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1.5 transition-all ${
                  selectedVisibility === 'friends'
                    ? 'bg-blue-600/20 border-blue-500 text-white'
                    : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.06]'
                }`}
              >
                <Users size={18} className="text-blue-400" />
                <span className="text-xs font-bold">Friends</span>
                <span className="text-[10px] text-white/50">Contacts only</span>
              </button>

              <button
                type="button"
                onClick={() => handleVisibilityChange('private')}
                className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1.5 transition-all ${
                  selectedVisibility === 'private'
                    ? 'bg-blue-600/20 border-blue-500 text-white'
                    : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.06]'
                }`}
              >
                <Lock size={18} className="text-amber-400" />
                <span className="text-xs font-bold">Private</span>
                <span className="text-[10px] text-white/50">Me only</span>
              </button>
            </div>
          </div>

          {/* Internal Share Link */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/80">Internal Shareable Link</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={internalUrl}
                className="flex-1 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white/90 font-mono focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopyInternal}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white flex items-center gap-1 shadow-md shadow-blue-600/20 transition-all active:scale-95"
              >
                {copiedInternal ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedInternal ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Original Google Drive URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/80">Original Google Drive URL</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={modalTargetItem.originalUrl}
                className="flex-1 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white/90 font-mono truncate focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopyDrive}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white flex items-center gap-1 transition-colors"
              >
                {copiedDrive ? <Check size={14} /> : <Copy size={14} />}
              </button>
              <a
                href={modalTargetItem.originalUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
                title="Open in Google Drive"
              >
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {/* Share Directly into Active Chat */}
          <button
            type="button"
            onClick={handleShareToActiveChat}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Send size={14} />
            <span>Post Directly into Active Chat Conversation</span>
          </button>

          {/* Google Drive Permission Guarantee Policy */}
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5 text-xs text-emerald-300">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldCheck size={15} className="text-emerald-400" />
              <span>Permission Guarantee & Privacy Policy</span>
            </div>
            <p className="text-[11px] text-emerald-200/80 leading-relaxed">
              This platform never bypasses Google Drive access restrictions. If other viewers cannot access this media, open the file in Google Drive, click <strong>Share</strong>, and set General Access to <strong>"Anyone with the link can view"</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
