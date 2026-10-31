import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  Tv,
  Users,
  Send,
  MessageSquare,
  Sparkles,
  Volume2,
  Maximize2,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { useMedia } from '../../state/MediaContext';
import { useApp } from '../../state/AppContext';
import { GoogleDriveService } from '../../services/googleDriveService';

export const WatchRoomModal: React.FC = () => {
  const { activeWatchRoom, leaveWatchRoom, syncWatchRoom, sendWatchRoomMessage } = useMedia();
  const { user } = useApp();

  const [chatInput, setChatInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(activeWatchRoom?.isPlaying ?? true);
  const [currentTime, setCurrentTime] = useState(activeWatchRoom?.currentTime ?? 0);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeWatchRoom?.messages]);

  if (!activeWatchRoom) return null;

  const handleTogglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    syncWatchRoom(currentTime, nextState);
  };

  const handleSeek = (seconds: number) => {
    setCurrentTime(seconds);
    syncWatchRoom(seconds, isPlaying);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendWatchRoomMessage(chatInput);
    setChatInput('');
  };

  const media = activeWatchRoom.mediaItem;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-6xl h-[92vh] flex flex-col rounded-[28px] glass-modal border border-white/15 shadow-2xl overflow-hidden bg-[#0c0d14]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Tv size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white truncate max-w-md">
                  {activeWatchRoom.title}
                </h2>
                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync (WebSocket)
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Host: {activeWatchRoom.hostName} • Google Drive 4K Cinema Stream
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Participants Counter */}
            <div className="flex items-center -space-x-2">
              {activeWatchRoom.participants.map((p) => (
                <img
                  key={p.id}
                  src={p.avatar}
                  alt={p.name}
                  className="w-7 h-7 rounded-full border-2 border-[#0c0d14] object-cover"
                  title={`${p.name} ${p.isHost ? '(Host)' : ''}`}
                />
              ))}
              <div className="w-7 h-7 rounded-full bg-blue-600/30 text-blue-300 text-[10px] font-bold flex items-center justify-center border-2 border-[#0c0d14]">
                +{activeWatchRoom.participants.length}
              </div>
            </div>

            <button
              onClick={leaveWatchRoom}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Center Workspace (Video Stage + Synchronized Chat Sidebar) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Main Video Cinema Area */}
          <div className="flex-1 flex flex-col bg-black relative">
            <div className="flex-1 w-full h-full relative overflow-hidden flex items-center justify-center">
              <iframe
                src={media.previewUrl}
                title={media.title}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen"
              />
            </div>

            {/* Synchronized HUD Controls Bar */}
            <div className="px-5 py-3 bg-[#12131e] border-t border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 transition-transform active:scale-95"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5 fill-white" />}
                </button>

                <div className="text-xs font-mono text-white/80">
                  <span>{GoogleDriveService.formatDuration(currentTime)}</span>
                  <span className="text-white/40"> / </span>
                  <span>{media.duration ? GoogleDriveService.formatDuration(media.duration) : 'Live'}</span>
                </div>
              </div>

              {/* Quick Seek Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSeek(Math.max(0, currentTime - 10))}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white/80 transition-colors"
                >
                  -10s
                </button>
                <button
                  type="button"
                  onClick={() => handleSeek(currentTime + 10)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white/80 transition-colors"
                >
                  +10s
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-white/60">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span className="hidden sm:inline">Permission verified</span>
              </div>
            </div>
          </div>

          {/* Real-time Watch Room Chat & Presence Sidebar */}
          <div className="w-full lg:w-80 h-64 lg:h-full border-t lg:border-t-0 lg:border-l border-white/10 bg-[#10111a] flex flex-col">
            {/* Sidebar Header */}
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <MessageSquare size={14} className="text-blue-400" />
                <span>Room Live Chat</span>
              </div>
              <span className="text-[10px] text-white/50">{activeWatchRoom.messages.length} messages</span>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeWatchRoom.messages.map((msg) => {
                const isMe = msg.senderId === user.id;
                return (
                  <div key={msg.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <img
                        src={msg.senderAvatar}
                        alt={msg.senderName}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-[11px] font-bold text-white/90">{msg.senderName}</span>
                      <span className="text-[9px] text-white/40">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="pl-7 text-xs text-white/80 leading-relaxed bg-white/[0.03] p-2 rounded-xl border border-white/5">
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="p-3 border-t border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Chat with watch party..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white transition-all shadow-md shadow-blue-600/30"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
