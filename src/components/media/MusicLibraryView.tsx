import React, { useState } from 'react';
import {
  Music,
  Play,
  Pause,
  Plus,
  Search,
  Share2,
  Clock,
  Radio,
  ListMusic,
  ExternalLink,
} from 'lucide-react';
import { useMedia } from '../../state/MediaContext';
import { GoogleDriveService } from '../../services/googleDriveService';
import { UniversalMediaCard } from './UniversalMediaCard';

export const MusicLibraryView: React.FC = () => {
  const {
    mediaItems,
    collections,
    playAudioTrack,
    activeAudioTrack,
    isPlayingAudio,
    toggleAudio,
    openAddMediaModal,
    openShareModal,
  } = useMedia();

  const [search, setSearch] = useState('');

  const musicTracks = mediaItems.filter(
    (m) =>
      m.category === 'music' &&
      (m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.description.toLowerCase().includes(search.toLowerCase()))
  );

  const handlePlayAll = () => {
    if (musicTracks.length > 0) {
      playAudioTrack(musicTracks[0]);
    }
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[var(--bg-app)] p-4 md:p-8 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                <Music size={22} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Music Library</h1>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Hi-Fi studio masters, spatial audio, and Google Drive audio streams with background playback.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {musicTracks.length > 0 && (
              <button
                type="button"
                onClick={handlePlayAll}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 flex items-center gap-2 active:scale-95 transition-all"
              >
                <Play size={15} className="fill-white" />
                <span>Play All Tracks</span>
              </button>
            )}

            <button
              type="button"
              onClick={openAddMediaModal}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white flex items-center gap-2 transition-all"
            >
              <Plus size={16} />
              <span>Add Song Link</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search songs, albums, and podcasts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <span className="text-xs text-[var(--text-secondary)] font-mono">
            {musicTracks.length} Track{musicTracks.length !== 1 ? 's' : ''} in Library
          </span>
        </div>

        {/* Tracks Table */}
        <div className="rounded-[24px] glass-panel border border-white/10 overflow-hidden shadow-xl">
          <div className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-white/10 text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] bg-white/[0.02]">
            <span className="col-span-1 text-center">#</span>
            <span className="col-span-6 sm:col-span-5">Title</span>
            <span className="hidden sm:block sm:col-span-3">Collection</span>
            <span className="col-span-3 sm:col-span-2 text-right">Duration</span>
            <span className="col-span-2 sm:col-span-1 text-right">Action</span>
          </div>

          {musicTracks.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <Music size={36} className="mx-auto text-white/20" />
              <h3 className="text-sm font-bold text-white">No songs found</h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Click "+ Add Song Link" to paste Google Drive audio and music sharing links.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {musicTracks.map((track, idx) => {
                const isCurrent = activeAudioTrack?.id === track.id;
                const isPlaying = isCurrent && isPlayingAudio;

                return (
                  <div
                    key={track.id}
                    className={`grid grid-cols-12 gap-3 px-5 py-3.5 items-center hover:bg-white/[0.04] transition-colors group cursor-pointer ${
                      isCurrent ? 'bg-indigo-600/10' : ''
                    }`}
                    onClick={() => (isCurrent ? toggleAudio() : playAudioTrack(track))}
                  >
                    {/* Index / Play Button */}
                    <div className="col-span-1 flex items-center justify-center">
                      <button
                        type="button"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-indigo-600 transition-all"
                      >
                        {isPlaying ? (
                          <Pause size={15} className="text-cyan-400" />
                        ) : (
                          <Play size={15} className="ml-0.5 group-hover:fill-white" />
                        )}
                      </button>
                    </div>

                    {/* Track Info */}
                    <div className="col-span-6 sm:col-span-5 flex items-center gap-3 min-w-0">
                      <img
                        src={track.thumbnailUrl}
                        alt={track.title}
                        className="w-10 h-10 rounded-xl object-cover bg-black flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h4
                          className={`text-xs font-bold truncate ${
                            isCurrent ? 'text-indigo-400' : 'text-white'
                          }`}
                        >
                          {track.title}
                        </h4>
                        <p className="text-[11px] text-[var(--text-secondary)] truncate">
                          {track.addedBy.name} • Google Drive Audio
                        </p>
                      </div>
                    </div>

                    {/* Collection */}
                    <div className="hidden sm:block sm:col-span-3 min-w-0">
                      <span className="text-xs text-white/70 truncate block">
                        {track.collectionName ? `📁 ${track.collectionName}` : 'Singles'}
                      </span>
                    </div>

                    {/* Duration */}
                    <div className="col-span-3 sm:col-span-2 text-right">
                      <span className="text-xs font-mono text-white/70">
                        {track.duration ? GoogleDriveService.formatDuration(track.duration) : '--:--'}
                      </span>
                    </div>

                    {/* Quick Share */}
                    <div className="col-span-2 sm:col-span-1 flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openShareModal(track);
                        }}
                        className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                        title="Share Song"
                      >
                        <Share2 size={14} />
                      </button>
                    </div>
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
