import React, { useState } from 'react';
import {
  Check,
  CheckCheck,
  Clock,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Smile,
  AlertCircle,
  HelpCircle,
  Pin,
  Star,
  CornerUpLeft,
  Edit2,
  Trash2,
  Share2,
  Play,
  Pause,
  MapPin,
  CreditCard,
  Sparkles,
  BarChart2,
} from 'lucide-react';
import { Message } from '../../types';
import { useApp } from '../../state/AppContext';
import { UniversalMediaCard } from '../media/UniversalMediaCard';
import { GoogleDriveService } from '../../services/googleDriveService';

export const MessageBubble: React.FC<{ message: Message; isMine: boolean }> = ({ message, isMine }) => {
  const {
    addReaction,
    togglePinMessage,
    toggleStarMessage,
    unsendMessage,
    deleteMessage,
    votePoll,
    setActiveModal,
  } = useApp();

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<'1x' | '1.5x' | '2x'>('1x');
  const [showTapbackMenu, setShowTapbackMenu] = useState(false);
  const [revealedInvisibleInk, setRevealedInvisibleInk] = useState(false);

  const tapbacks = [
    { emoji: '❤️', icon: Heart },
    { emoji: '👍', icon: ThumbsUp },
    { emoji: '👎', icon: ThumbsDown },
    { emoji: '😂', icon: Smile },
    { emoji: '❗️', icon: AlertCircle },
    { emoji: '❓', icon: HelpCircle },
  ];

  const handleTapback = (emoji: string) => {
    addReaction(message.id, emoji);
    setShowTapbackMenu(false);
  };

  const bubbleClasses = isMine
    ? message.protocol === 'sms'
      ? 'bubble-sent-emerald'
      : 'bubble-sent-azure'
    : 'bubble-received';

  return (
    <div
      className={`relative group flex flex-col mb-3 select-text ${
        isMine ? 'items-end' : 'items-start'
      }`}
    >
      {/* Quoted Reply Preview */}
      {message.replyToMessageId && (
        <div className="mb-1 text-[11px] text-[var(--text-secondary)] flex items-center gap-1.5 opacity-80 px-2">
          <CornerUpLeft size={11} />
          <span>Replying to message</span>
        </div>
      )}

      {/* Main Bubble Container with Tapback Trigger */}
      <div className="relative max-w-[85%] md:max-w-[70%]">
        {/* Floating Tapback Pill Bar on Hover or Long Press */}
        {showTapbackMenu && (
          <div
            className={`absolute -top-11 z-30 flex items-center gap-1.5 p-1.5 rounded-full bg-[var(--bg-card)] backdrop-blur-xl border border-[var(--border-subtle)] shadow-xl animate-in fade-in zoom-in-95 duration-150 ${
              isMine ? 'right-0' : 'left-0'
            }`}
          >
            {tapbacks.map(({ emoji }) => (
              <button
                key={emoji}
                onClick={() => handleTapback(emoji)}
                className="w-7 h-7 flex items-center justify-center text-sm rounded-full hover:scale-125 hover:bg-white/10 transition-transform"
                title={`React ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {/* Message Bubble Body */}
        <div
          onDoubleClick={() => setShowTapbackMenu((prev) => !prev)}
          className={`relative px-4 py-2.5 text-[14px] leading-relaxed transition-all ${bubbleClasses} ${
            message.effect === 'slam'
              ? 'effect-slam'
              : message.effect === 'loud'
              ? 'effect-loud'
              : message.effect === 'gentle'
              ? 'effect-gentle'
              : ''
          }`}
        >
          {/* Invisible Ink Scratch-to-Reveal Overlay */}
          {message.effect === 'invisible_ink' && !revealedInvisibleInk && (
            <div
              onClick={() => setRevealedInvisibleInk(true)}
              className="invisible-ink-overlay flex items-center justify-center text-xs font-semibold text-black/70 gap-1"
              title="Click or scratch to reveal message"
            >
              <Sparkles size={14} className="animate-spin text-amber-500" />
              <span>Invisible Ink — Click to Reveal</span>
            </div>
          )}

          {/* Text Content */}
          {message.text && (
            <p className="whitespace-pre-wrap break-words">{message.text}</p>
          )}

          {/* Google Drive Media Embed Card */}
          {message.mediaData ? (
            <UniversalMediaCard media={message.mediaData} layout="chat_inline" />
          ) : message.text && message.text.includes('google.com') ? (() => {
            const detected = GoogleDriveService.detectDriveLinksInText(message.text)[0];
            if (!detected) return null;
            return (
              <UniversalMediaCard
                media={{
                  id: 'msg_media_' + message.id,
                  driveId: detected.driveId,
                  originalUrl: detected.originalUrl,
                  previewUrl: detected.previewUrl,
                  downloadUrl: detected.downloadUrl,
                  thumbnailUrl: detected.thumbnailUrl,
                  title: detected.inferredTitle,
                  description: 'Google Drive media recognized in message',
                  category: detected.detectedType,
                  visibility: 'public',
                  addedBy: {
                    id: message.senderId,
                    name: isMine ? 'You' : 'Sender',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
                  },
                  createdAt: message.timestamp,
                  updatedAt: message.timestamp,
                  permissionStatus: detected.permissionStatus,
                  tags: [detected.detectedType.toUpperCase()],
                  playCount: 1,
                  likes: 0,
                }}
                layout="chat_inline"
              />
            );
          })() : null}

          {/* Voice Note Player */}
          {message.mediaType === 'voice_note' && (
            <div className="flex items-center gap-3 py-1 min-w-[220px]">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center flex-shrink-0 transition-transform active:scale-95"
              >
                {isPlayingAudio ? <Pause size={17} /> : <Play size={17} className="ml-0.5" />}
              </button>

              {/* Dynamic Waveform Visualizer */}
              <div className="flex-1 flex items-center gap-[3px] h-8">
                {(message.waveformData || [20, 45, 80, 60, 95, 40, 70, 85, 30, 65, 90, 50]).map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${Math.max(15, h)}%` }}
                    className={`waveform-bar ${
                      isPlayingAudio && i % 3 === 0 ? 'bg-cyan-300 animate-pulse' : 'bg-white/80'
                    }`}
                  />
                ))}
              </div>

              {/* Speed Controller */}
              <button
                onClick={() =>
                  setPlaybackSpeed((prev) => (prev === '1x' ? '1.5x' : prev === '1.5x' ? '2x' : '1x'))
                }
                className="px-2 py-0.5 rounded-full bg-white/20 hover:bg-white/30 text-[11px] font-bold"
              >
                {playbackSpeed}
              </button>
            </div>
          )}

          {/* Interactive Poll Card */}
          {message.poll && (
            <div className="mt-2 p-3 rounded-[12px] bg-black/20 border border-white/10 space-y-2 min-w-[240px]">
              <div className="flex items-center gap-1.5 font-semibold text-sm">
                <BarChart2 size={16} />
                <span>{message.poll.question}</span>
              </div>
              <div className="space-y-1.5">
                {message.poll.options.map((opt) => {
                  const totalVotes = message.poll!.options.reduce((sum, o) => sum + o.votes.length, 0);
                  const percentage = totalVotes > 0 ? Math.round((opt.votes.length / totalVotes) * 100) : 0;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => votePoll(message.poll!.id, opt.id)}
                      className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer overflow-hidden transition-all text-xs flex items-center justify-between"
                    >
                      <div
                        style={{ width: `${percentage}%` }}
                        className="absolute inset-y-0 left-0 bg-[var(--accent-primary)]/40 -z-0 transition-all duration-300"
                      />
                      <span className="relative z-10 font-medium">{opt.text}</span>
                      <span className="relative z-10 font-bold ml-2">{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Location Map Card */}
          {message.locationData && (
            <div className="mt-2 p-2.5 rounded-[12px] bg-black/25 border border-white/15 space-y-2 min-w-[240px]">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <MapPin size={16} className="text-emerald-400" />
                <span className="truncate">{message.locationData.address}</span>
              </div>
              {/* Mini Map Canvas Simulation */}
              <div className="w-full h-28 rounded-lg bg-[#191a24] border border-white/10 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(#3a3d52_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />
                <div className="relative flex flex-col items-center">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full animate-ping opacity-75" />
                  <MapPin size={22} className="text-emerald-400 -mt-3 drop-shadow-md" />
                  <span className="text-[10px] font-bold bg-black/60 px-1.5 py-0.5 rounded text-white mt-1">
                    ETA: {message.locationData.etaMinutes || 18}m
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Aether Pay Payment Card */}
          {message.paymentData && (
            <div className="mt-1.5 p-3 rounded-[12px] bg-gradient-to-br from-emerald-600/30 to-teal-800/30 border border-emerald-400/30 space-y-1.5 min-w-[220px]">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
                <div className="flex items-center gap-1.5">
                  <CreditCard size={15} />
                  <span>Aether Pay Transfer</span>
                </div>
                <span className="uppercase text-[9px] bg-emerald-500/30 px-1.5 py-0.5 rounded font-bold">
                  {message.paymentData.status}
                </span>
              </div>
              <div className="text-2xl font-bold tracking-tight text-white">
                ${message.paymentData.amount.toFixed(2)}
              </div>
              {message.paymentData.note && (
                <div className="text-[11px] text-white/80">{message.paymentData.note}</div>
              )}
            </div>
          )}

          {/* Bottom Timestamp & Delivery Ticks */}
          <div
            className={`flex items-center gap-1 mt-1 text-[10px] ${
              isMine ? 'justify-end text-white/70' : 'justify-start text-[var(--text-secondary)]'
            }`}
          >
            {message.edited && <span className="italic mr-1">Edited</span>}
            <span>
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {isMine && (
              <span className="ml-1">
                {message.status === 'read' ? (
                  <CheckCheck size={13} className="text-cyan-300 inline" />
                ) : message.status === 'delivered' ? (
                  <CheckCheck size={13} className="inline opacity-90" />
                ) : message.status === 'sent' ? (
                  <Check size={13} className="inline opacity-80" />
                ) : (
                  <Clock size={12} className="inline opacity-70" />
                )}
              </span>
            )}
          </div>
        </div>

        {/* Reaction Badges on Corner */}
        {Object.keys(message.reactions).length > 0 && (
          <div
            className={`absolute -bottom-2 flex items-center gap-1 z-10 ${
              isMine ? 'right-2' : 'left-2'
            }`}
          >
            {Object.entries(message.reactions).map(([emoji, userIds]) => (
              <span
                key={emoji}
                onClick={() => addReaction(message.id, emoji)}
                className="px-1.5 py-0.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[11px] font-bold shadow-md cursor-pointer hover:scale-110 transition-transform flex items-center gap-0.5"
                title={`${userIds.length} reaction(s)`}
              >
                <span>{emoji}</span>
                {userIds.length > 1 && <span className="text-[9px] text-[var(--text-secondary)]">{userIds.length}</span>}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hover Action Strip */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 mt-1 px-1 text-[var(--text-secondary)]">
        <button
          onClick={() => setShowTapbackMenu((p) => !p)}
          className="hover:text-[var(--text-primary)] p-0.5"
          title="React"
        >
          <Smile size={13} />
        </button>
        <button
          onClick={() => toggleStarMessage(message.id)}
          className={`hover:text-amber-400 p-0.5 ${message.isStarred ? 'text-amber-400' : ''}`}
          title="Star"
        >
          <Star size={13} />
        </button>
        <button
          onClick={() => togglePinMessage(message.id)}
          className={`hover:text-[var(--accent-primary)] p-0.5 ${message.isPinned ? 'text-[var(--accent-primary)]' : ''}`}
          title="Pin"
        >
          <Pin size={13} />
        </button>
        {isMine && (
          <button
            onClick={() => unsendMessage(message.id)}
            className="hover:text-rose-400 p-0.5"
            title="Unsend"
          >
            <Trash2 size={13} />
          </button>
        )}
      </div>
    </div>
  );
};
