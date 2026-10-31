import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Volume2,
  Share2,
  Circle,
  Sparkles,
  Hand,
  PhoneOff,
  MessageSquare,
  Maximize2,
  Sliders,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '../../state/AppContext';

export const ActiveCallModal: React.FC = () => {
  const {
    callState,
    endCall,
    toggleMute,
    toggleVideo,
    toggleSpeaker,
    toggleScreenShare,
    toggleBackgroundBlur,
    toggleRecording,
    toggleHold,
  } = useApp();

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: number; emoji: string; left: number }[]>([]);
  const [showCaptions, setShowCaptions] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);

  // Trigger floating emoji reaction
  const triggerEmoji = (emoji: string) => {
    const id = Date.now() + Math.random();
    const left = Math.random() * 80 + 10;
    setFloatingEmojis((prev) => [...prev, { id, emoji, left }]);
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((e) => e.id !== id));
    }, 2500);
  };

  // Format call duration MM:SS
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (callState.status === 'idle') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-[40px] select-none p-4 md:p-8 animate-in fade-in duration-200">
      {/* Incoming Call Screen */}
      {callState.status === 'incoming' && (
        <div className="w-full max-w-sm rounded-[28px] glass-modal p-6 flex flex-col items-center text-center space-y-6 shadow-2xl border border-white/20">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-400 shadow-xl">
              <img
                src={callState.peerAvatar || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150'}
                alt={callState.peerName}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center text-white text-xs">
              <Video size={13} />
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">{callState.peerName || 'Incoming Caller'}</h3>
            <p className="text-xs text-white/70 mt-1">Aether FaceTime HD Video Call</p>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <button
              onClick={endCall}
              className="w-16 h-16 rounded-full bg-rose-500 hover:bg-rose-600 flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
              title="Decline Call"
            >
              <PhoneOff size={26} />
            </button>
            <button
              onClick={() => useApp().answerCall()}
              className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-all animate-pulse"
              title="Accept FaceTime Call"
            >
              <Video size={26} />
            </button>
          </div>
        </div>
      )}

      {/* Outgoing Call Screen */}
      {callState.status === 'outgoing' && (
        <div className="w-full max-w-sm rounded-[28px] glass-modal p-6 flex flex-col items-center text-center space-y-6 shadow-2xl border border-white/20">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--accent-primary)] shadow-xl animate-pulse">
            <img
              src={callState.peerAvatar || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150'}
              alt={callState.peerName}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">{callState.peerName}</h3>
            <p className="text-xs text-[var(--accent-primary)] mt-1 animate-pulse">Dialing HD Audio & Video...</p>
          </div>

          <button
            onClick={endCall}
            className="w-14 h-14 rounded-full bg-rose-500 hover:bg-rose-600 flex items-center justify-center text-white shadow-xl transition-transform active:scale-95"
            title="Cancel Call"
          >
            <PhoneOff size={22} />
          </button>
        </div>
      )}

      {/* Active Connected Call Screen */}
      {(callState.status === 'connected' || callState.status === 'on_hold') && (
        <div className="w-full max-w-6xl h-full max-h-[85vh] rounded-[32px] glass-modal overflow-hidden flex flex-col relative border border-white/15 shadow-2xl">
          {/* Top In-Call Header Bar */}
          <div className="h-14 px-6 flex items-center justify-between bg-black/40 backdrop-blur-md border-b border-white/10 z-20">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-sm font-semibold text-white">{callState.peerName || 'Conference Call'}</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/90">
                {formatDuration(callState.durationSeconds)}
              </span>
              {callState.isRecording && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded-full animate-pulse">
                  <Circle size={10} className="fill-rose-400" />
                  REC
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCaptions(!showCaptions)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                  showCaptions ? 'bg-white/20 border-white/40 text-white' : 'border-white/10 text-white/60'
                }`}
              >
                Captions
              </button>
              <button
                onClick={toggleHold}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                  callState.status === 'on_hold' ? 'bg-amber-500 text-white font-bold' : 'border-white/10 text-white/60'
                }`}
              >
                {callState.status === 'on_hold' ? 'Resume' : 'Hold'}
              </button>
            </div>
          </div>

          {/* Main Video Stage */}
          <div className="flex-1 relative bg-gradient-to-br from-[#12141f] to-[#0a0a0f] flex items-center justify-center overflow-hidden p-4">
            {/* Remote Peer Video or Simulated Persona */}
            <div className="w-full h-full rounded-[24px] overflow-hidden bg-[#181a26] border border-white/10 relative flex items-center justify-center">
              <img
                src={callState.peerAvatar || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200'}
                alt="Remote Video Stream"
                className="w-full h-full object-cover"
              />

              {/* Remote Participant Label */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10 flex items-center gap-1.5">
                <CheckCircle size={13} className="text-emerald-400" />
                <span>{callState.peerName} (1080p HD)</span>
              </div>
            </div>

            {/* Local User Picture-in-Picture Video Thumbnail */}
            <div
              className={`absolute top-6 right-6 w-44 md:w-56 h-32 md:h-40 rounded-[20px] overflow-hidden border-2 border-white/30 shadow-2xl bg-black transition-all ${
                callState.isBlurEnabled ? 'filter blur-[1px]' : ''
              }`}
            >
              <div className="w-full h-full relative flex items-center justify-center bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400"
                  alt="You"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] text-white">
                  You {callState.isMuted && '(Muted)'}
                </div>
              </div>
            </div>

            {/* Floating Live Reaction Particles */}
            {floatingEmojis.map((e) => (
              <div
                key={e.id}
                style={{ left: `${e.left}%` }}
                className="absolute bottom-16 text-3xl pointer-events-none animate-bounce"
              >
                {e.emoji}
              </div>
            ))}

            {/* Non-AI Live Speech Captions Bar */}
            {showCaptions && (
              <div className="absolute bottom-6 max-w-lg px-4 py-2 rounded-[14px] bg-black/70 backdrop-blur-lg border border-white/15 text-center text-xs font-medium text-white shadow-xl animate-in fade-in duration-150">
                <span className="text-emerald-400 font-bold mr-1.5">{callState.peerName}:</span>
                <span>The lighting through the curved facade renders without any optical distortion.</span>
              </div>
            )}
          </div>

          {/* Bottom Calling Glass Controls Toolbar */}
          <div className="h-20 px-6 flex items-center justify-between bg-black/50 backdrop-blur-xl border-t border-white/10 z-20">
            {/* Left Utility: Live Reactions */}
            <div className="flex items-center gap-1">
              {['👏', '❤️', '🔥', '🎉'].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => triggerEmoji(emoji)}
                  className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center text-lg hover:scale-125 transition-transform"
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Center Primary Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Mute Button */}
              <button
                onClick={toggleMute}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  callState.isMuted
                    ? 'bg-red-500 text-white'
                    : 'bg-white/15 hover:bg-white/25 text-white'
                }`}
                title={callState.isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
              >
                {callState.isMuted ? <MicOff size={20} /> : <Mic size={20} />}
              </button>

              {/* Camera Privacy Shutter */}
              <button
                onClick={toggleVideo}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  !callState.isVideoEnabled
                    ? 'bg-red-500 text-white'
                    : 'bg-white/15 hover:bg-white/25 text-white'
                }`}
                title={callState.isVideoEnabled ? 'Turn Off Video' : 'Turn On Video'}
              >
                {!callState.isVideoEnabled ? <VideoOff size={20} /> : <Video size={20} />}
              </button>

              {/* Background Blur Toggle */}
              <button
                onClick={toggleBackgroundBlur}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  callState.isBlurEnabled
                    ? 'bg-[var(--accent-primary)] text-white shadow-lg'
                    : 'bg-white/15 hover:bg-white/25 text-white'
                }`}
                title="Canvas 2D Background Blur"
              >
                <Sparkles size={19} />
              </button>

              {/* Screen Share */}
              <button
                onClick={toggleScreenShare}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  callState.isScreenSharing
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white/15 hover:bg-white/25 text-white'
                }`}
                title="Share Screen"
              >
                <Share2 size={19} />
              </button>

              {/* Hand Raising */}
              <button
                onClick={() => setIsHandRaised(!isHandRaised)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isHandRaised ? 'bg-amber-500 text-white' : 'bg-white/15 hover:bg-white/25 text-white'
                }`}
                title="Raise Hand"
              >
                <Hand size={19} />
              </button>

              {/* Local Recorder */}
              <button
                onClick={toggleRecording}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  callState.isRecording
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-white/15 hover:bg-white/25 text-white'
                }`}
                title="Record Call Locally (WebM)"
              >
                <Circle size={19} className={callState.isRecording ? 'fill-white' : ''} />
              </button>

              {/* Red Hangup Pill */}
              <button
                onClick={endCall}
                className="w-14 h-12 rounded-[22px] bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-xl active:scale-95 transition-transform ml-2"
                title="End Call"
              >
                <PhoneOff size={22} />
              </button>
            </div>

            {/* Right: Speaker Booster */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSpeaker}
                className={`p-2.5 rounded-full hover:bg-white/10 ${
                  callState.isSpeaker ? 'text-emerald-400' : 'text-white/70'
                }`}
                title="Speaker Booster (+6dB)"
              >
                <Volume2 size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
