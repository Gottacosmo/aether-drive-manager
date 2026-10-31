import React, { useState } from 'react';
import {
  Film,
  Tv,
  Plus,
  Play,
  Users,
  Search,
  Filter,
  Sparkles,
} from 'lucide-react';
import { useMedia } from '../../state/MediaContext';
import { UniversalMediaCard } from './UniversalMediaCard';

export const WatchLibraryView: React.FC = () => {
  const { mediaItems, watchRooms, openWatchRoom, openAddMediaModal } = useMedia();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'rooms'>('all');

  const movieItems = mediaItems.filter(
    (m) =>
      m.category === 'movie' &&
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
              <div className="w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <Film size={22} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Watch Library</h1>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Google Drive 4K cinema feature films, trailers, and synchronized watch parties.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddMediaModal}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-600/30 flex items-center gap-2 active:scale-95 transition-all"
          >
            <Plus size={16} />
            <span>Add Movie Link</span>
          </button>
        </div>

        {/* Active Watch Rooms Section */}
        {watchRooms.length > 0 && (
          <div className="p-5 rounded-[24px] glass-panel border border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-indigo-900/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Live Watch Party Rooms
                </h3>
              </div>
              <span className="text-xs text-blue-300 font-medium">Real-Time Sync Ready</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {watchRooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => openWatchRoom(room)}
                  className="p-4 rounded-2xl bg-black/40 hover:bg-black/60 border border-white/10 hover:border-blue-500/50 cursor-pointer transition-all flex items-center justify-between group shadow-lg"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={room.mediaItem.thumbnailUrl}
                      alt={room.title}
                      className="w-16 h-12 rounded-xl object-cover bg-black flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors truncate">
                        {room.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-white/60 mt-0.5">
                        <Users size={12} className="text-emerald-400" />
                        <span>{room.participants.length} watching with {room.hostName}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-xl bg-blue-600 group-hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all flex-shrink-0"
                  >
                    <Play size={12} className="fill-white" />
                    <span>Join</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search & Filter Toolbar */}
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search movies, films, and video links..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
            />
          </div>

          <span className="text-xs text-[var(--text-secondary)] font-mono">
            {movieItems.length} Title{movieItems.length !== 1 ? 's' : ''} Available
          </span>
        </div>

        {/* Movies Grid */}
        {movieItems.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <Film size={40} className="mx-auto text-white/20" />
            <h3 className="text-sm font-bold text-white">No movies found</h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Click "+ Add Movie Link" to add Google Drive video and movie sharing links.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {movieItems.map((movie) => (
              <UniversalMediaCard key={movie.id} media={movie} layout="grid" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
