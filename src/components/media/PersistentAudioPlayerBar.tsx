import React from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Music,
  ExternalLink,
  Share2,
} from 'lucide-react';
import { useMedia } from '../../state/MediaContext';
import { GoogleDriveService } from '../../services/googleDriveService';

export const PersistentAudioPlayerBar: React.FC = () => {
  const {
    activeAudioTrack,
    isPlayingAudio,
    toggleAudio,
    audioProgress,
    audioDuration,
    seekAudio,
    audioVolume,
    setAudioVolume,
    pauseAudio,
    openShareModal,
  } = useMedia();

  if (!activeAudioTrack) return null;

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seekAudio(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAudioVolume(Number(e.target.value));
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#131422]/95 backdrop-blur-2xl border-t border-white/15 px-4 py-2.5 shadow-2xl flex items-center justify-between gap-4 select-none animate-in slide-in-from-bottom duration-300">
      {/* Left: Track Information */}
      <div className="flex items-center gap-3 min-w-0 max-w-[280px] md:max-w-sm">
        <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-white/10 group">
          <img
            src={activeAudioTrack.thumbnailUrl}
            alt={activeAudioTrack.title}
            className="w-full h-full object-cover"
          />
          {isPlayingAudio && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h4 className="text-xs font-bold text-white truncate">{activeAudioTrack.title}</h4>
          <p className="text-[11px] text-white/60 truncate flex items-center gap-1.5 mt-0.5">
            <Music size={11} className="text-blue-400" />
            <span>Google Drive Audio Master</span>
          </p>
        </div>
      </div>

      {/* Center: Controls & Scrubber */}
      <div className="flex-1 max-w-xl flex flex-col items-center gap-1">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleAudio}
            className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 transition-transform active:scale-95"
          >
            {isPlayingAudio ? <Pause size={17} /> : <Play size={17} className="ml-0.5 fill-white" />}
          </button>
        </div>

        <div className="w-full flex items-center gap-2.5 text-[10px] font-mono text-white/70">
          <span>{GoogleDriveService.formatDuration(audioProgress)}</span>
          <input
            type="range"
            min={0}
            max={audioDuration || 100}
            value={audioProgress}
            onChange={handleScrubberChange}
            className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <span>{GoogleDriveService.formatDuration(audioDuration || 0)}</span>
        </div>
      </div>

      {/* Right: Volume & Actions */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 text-white/70">
          {audioVolume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={audioVolume}
            onChange={handleVolumeChange}
            className="w-18 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <button
          type="button"
          onClick={() => openShareModal(activeAudioTrack)}
          className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          title="Share Track"
        >
          <Share2 size={15} />
        </button>

        <a
          href={activeAudioTrack.originalUrl}
          target="_blank"
          rel="noreferrer"
          className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          title="Open in Google Drive"
        >
          <ExternalLink size={15} />
        </a>

        <button
          type="button"
          onClick={pauseAudio}
          className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          title="Dismiss player"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
};
