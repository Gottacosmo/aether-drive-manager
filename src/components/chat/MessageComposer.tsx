import React, { useState, useRef } from 'react';
import {
  Plus,
  Smile,
  Mic,
  ArrowUp,
  Sparkles,
  MapPin,
  CreditCard,
  BarChart2,
  PenTool,
  Paperclip,
  Camera,
  Layers,
  StopCircle,
  Film,
  Music,
} from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { useMedia } from '../../state/MediaContext';
import { MessageEffect } from '../../types';
import { GoogleDriveService } from '../../services/googleDriveService';
import { UniversalMediaRecognition } from '../media/UniversalMediaRecognition';
import { DriveUrlParseResult } from '../../types/media';

export const MessageComposer: React.FC = () => {
  const {
    sendMessage,
    smsMode,
    setSmsMode,
    setActiveModal,
  } = useApp();

  const { openEmbedPicker, addMediaItems, showToast } = useMedia();

  const [text, setText] = useState('');
  const [selectedEffect, setSelectedEffect] = useState<MessageEffect>('none');
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showEffectsMenu, setShowEffectsMenu] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [dismissedUrls, setDismissedUrls] = useState<Set<string>>(new Set());
  const timerRef = useRef<number | null>(null);

  // Detect Google Drive Links in typed/pasted text
  const detectedDriveLinks = GoogleDriveService.detectDriveLinksInText(text).filter(
    (l) => !dismissedUrls.has(l.originalUrl)
  );
  const activeDetectedLink = detectedDriveLinks[0] || null;

  const handleSend = () => {
    if (!text.trim() && !isRecordingVoice) return;

    if (isRecordingVoice) {
      stopVoiceRecording(true);
      return;
    }

    // Check if text is solely a Google Drive link
    const detected = GoogleDriveService.detectDriveLinksInText(text);
    if (detected.length > 0 && text.trim().startsWith('http')) {
      const item = detected[0];
      const savedItems = addMediaItems([
        {
          driveId: item.driveId,
          originalUrl: item.originalUrl,
          previewUrl: item.previewUrl,
          downloadUrl: item.downloadUrl,
          thumbnailUrl: item.thumbnailUrl,
          title: item.inferredTitle,
          category: item.detectedType,
          visibility: 'public',
        },
      ]);

      sendMessage(text, {
        effect: selectedEffect,
        mediaType: 'google_drive',
        mediaData: savedItems[0],
      });
    } else {
      sendMessage(text, {
        effect: selectedEffect,
      });
    }

    setText('');
    setSelectedEffect('none');
    setShowEffectsMenu(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmbedDetectedLink = (linkResult: DriveUrlParseResult) => {
    const saved = addMediaItems([
      {
        driveId: linkResult.driveId,
        originalUrl: linkResult.originalUrl,
        previewUrl: linkResult.previewUrl,
        downloadUrl: linkResult.downloadUrl,
        thumbnailUrl: linkResult.thumbnailUrl,
        title: linkResult.inferredTitle,
        category: linkResult.detectedType,
        visibility: 'public',
      },
    ]);

    sendMessage(`Embedded Google Drive ${linkResult.detectedType}: ${linkResult.inferredTitle}`, {
      mediaType: 'google_drive',
      mediaData: saved[0],
    });

    setText('');
    showToast(`Embedded ${linkResult.inferredTitle} into conversation!`);
  };

  const handleSaveDetectedToLibrary = (linkResult: DriveUrlParseResult) => {
    addMediaItems([
      {
        driveId: linkResult.driveId,
        originalUrl: linkResult.originalUrl,
        previewUrl: linkResult.previewUrl,
        downloadUrl: linkResult.downloadUrl,
        thumbnailUrl: linkResult.thumbnailUrl,
        title: linkResult.inferredTitle,
        category: linkResult.detectedType,
        visibility: 'public',
      },
    ]);
    setDismissedUrls((prev) => new Set(prev).add(linkResult.originalUrl));
  };

  const startVoiceRecording = () => {
    setIsRecordingVoice(true);
    setRecordingSeconds(0);
    timerRef.current = window.setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopVoiceRecording = (shouldSend: boolean) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecordingVoice(false);

    if (shouldSend) {
      sendMessage('', {
        mediaType: 'voice_note',
        audioDuration: Math.max(2, recordingSeconds),
        waveformData: [25, 45, 75, 90, 60, 40, 80, 95, 70, 50, 85, 30],
      });
    }
    setRecordingSeconds(0);
  };

  return (
    <div className="relative p-3 md:p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-sidebar)] backdrop-blur-[28px] select-none">
      {/* Universal Media Recognition Floating Pill Bar */}
      {activeDetectedLink && (
        <div className="mb-2 max-w-5xl mx-auto">
          <UniversalMediaRecognition
            detectedItem={activeDetectedLink}
            onEmbed={handleEmbedDetectedLink}
            onSaveToLibrary={handleSaveDetectedToLibrary}
            onDismiss={() =>
              setDismissedUrls((prev) => new Set(prev).add(activeDetectedLink.originalUrl))
            }
          />
        </div>
      )}

      {/* Plus Actions Popup Menu */}
      {showPlusMenu && (
        <div className="absolute bottom-20 left-4 z-40 w-64 rounded-[20px] glass-modal p-2 shadow-2xl border border-[var(--border-subtle)] animate-in fade-in zoom-in-95 duration-150 bg-[#161826]">
          <div className="text-[11px] font-semibold text-[var(--text-secondary)] px-3 py-1 uppercase tracking-wider">
            Google Drive & Aether Tools
          </div>

          {/* Embed Google Drive Media */}
          <button
            onClick={() => {
              openEmbedPicker((item) => {
                sendMessage(`Embedded Google Drive ${item.category}: ${item.title}`, {
                  mediaType: 'google_drive',
                  mediaData: item,
                });
              });
              setShowPlusMenu(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-[12px] text-xs font-semibold bg-blue-600/15 text-blue-300 hover:bg-blue-600 hover:text-white transition-all text-left mb-1"
          >
            <Film size={16} className="text-blue-400" />
            <span>Embed Saved Media Library</span>
          </button>

          <button
            onClick={() => { setActiveModal('send_payment'); setShowPlusMenu(false); }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-[10px] text-xs font-medium hover:bg-emerald-500/15 hover:text-emerald-400 transition-colors text-left"
          >
            <CreditCard size={16} className="text-emerald-400" />
            <span>Aether Pay Transfer</span>
          </button>

          <button
            onClick={() => { setActiveModal('live_map'); setShowPlusMenu(false); }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-[10px] text-xs font-medium hover:bg-blue-500/15 hover:text-blue-400 transition-colors text-left"
          >
            <MapPin size={16} className="text-blue-400" />
            <span>Share Location Pin</span>
          </button>

          <button
            onClick={() => { setActiveModal('create_poll'); setShowPlusMenu(false); }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-[10px] text-xs font-medium hover:bg-purple-500/15 hover:text-purple-400 transition-colors text-left"
          >
            <BarChart2 size={16} className="text-purple-400" />
            <span>Create Poll</span>
          </button>

          <button
            onClick={() => { setActiveModal('handwriting'); setShowPlusMenu(false); }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-[10px] text-xs font-medium hover:bg-amber-500/15 hover:text-amber-400 transition-colors text-left"
          >
            <PenTool size={16} className="text-amber-400" />
            <span>Handwritten Message</span>
          </button>
        </div>
      )}

      {/* Voice Recording Active Bar */}
      {isRecordingVoice ? (
        <div className="flex items-center justify-between p-3 rounded-[18px] bg-red-500/20 border border-red-500/40 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-sm font-bold text-red-300">
              Recording Voice Note: {recordingSeconds}s
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => stopVoiceRecording(false)}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white"
            >
              Discard
            </button>
            <button
              onClick={() => stopVoiceRecording(true)}
              className="px-3.5 py-1 rounded-full bg-red-500 hover:bg-red-600 text-xs font-bold text-white flex items-center gap-1.5"
            >
              <StopCircle size={14} />
              <span>Send Audio</span>
            </button>
          </div>
        </div>
      ) : (
        /* Standard Composer Input Strip */
        <div className="flex items-end gap-2 max-w-5xl mx-auto">
          {/* Plus Addon Menu Button */}
          <button
            onClick={() => setShowPlusMenu(!showPlusMenu)}
            className="w-9 h-9 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-card-hover)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white transition-all flex-shrink-0 mb-0.5"
            title="Aether & Google Drive Addons"
          >
            <Plus size={18} />
          </button>

          {/* Quick Embed Media Picker Button */}
          <button
            type="button"
            onClick={() => {
              openEmbedPicker((item) => {
                sendMessage(`Embedded Google Drive ${item.category}: ${item.title}`, {
                  mediaType: 'google_drive',
                  mediaData: item,
                });
              });
            }}
            className="w-9 h-9 rounded-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 flex items-center justify-center transition-all flex-shrink-0 mb-0.5 border border-blue-500/30"
            title="Embed Saved Google Drive Media"
          >
            <Film size={16} />
          </button>

          {/* SMS Mode Protocol Switcher */}
          <button
            onClick={() => setSmsMode((prev) => !prev)}
            className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex-shrink-0 mb-1 transition-all ${
              smsMode
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] border border-[var(--accent-primary)]/40'
            }`}
            title="Toggle between Internet Azure Blue and SMS Emerald Green"
          >
            {smsMode ? 'SMS' : 'iMessage'}
          </button>

          {/* Input Textarea Wrapper */}
          <div className="flex-1 relative flex items-center rounded-[20px] bg-[var(--bg-input)] border border-[var(--border-subtle)] focus-within:border-[var(--accent-primary)] focus-within:ring-2 focus-within:ring-[var(--accent-primary)]/20 transition-all">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message or paste any Google Drive link to embed sitewide..."
              rows={1}
              className="w-full bg-transparent px-4 py-2.5 text-[14px] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none resize-none max-h-32 min-h-[40px] leading-relaxed"
            />
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1 mb-0.5 flex-shrink-0">
            {text.trim() ? (
              <button
                onClick={handleSend}
                className="w-9 h-9 rounded-full bg-[var(--accent-primary)] hover:brightness-110 flex items-center justify-center text-white transition-transform active:scale-90 shadow-md shadow-[var(--accent-primary)]/40"
                title="Send Message"
              >
                <ArrowUp size={18} strokeWidth={2.5} />
              </button>
            ) : (
              <button
                onClick={startVoiceRecording}
                className="w-9 h-9 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-card-hover)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white transition-all"
                title="Record Audio Note"
              >
                <Mic size={18} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
