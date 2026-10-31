import React, { useRef, useEffect } from 'react';
import {
  Phone,
  Video,
  Info,
  Lock,
  Pin,
  ChevronLeft,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { MessageBubble } from './MessageBubble';
import { MessageComposer } from './MessageComposer';

export const ChatView: React.FC<{ onToggleDetail: () => void }> = ({ onToggleDetail }) => {
  const {
    conversations,
    activeConversationId,
    messages,
    user,
    contacts,
    startCall,
    setActiveConversationId,
  } = useApp();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find((c) => c.id === activeConversationId);
  const convMessages = messages.filter((m) => m.conversationId === activeConversationId);
  const pinnedMessages = convMessages.filter((m) => m.isPinned);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [convMessages.length]);

  if (!activeConv) {
    return (
      <div className="flex-1 h-full flex flex-col items-center justify-center p-6 text-[var(--text-secondary)] select-none">
        <div className="w-16 h-16 rounded-full bg-[var(--bg-card)] flex items-center justify-center mb-3">
          <Lock size={28} className="opacity-40" />
        </div>
        <h2 className="text-base font-semibold text-[var(--text-primary)] mb-1">Select a Conversation</h2>
        <p className="text-xs max-w-sm text-center">
          Choose a contact or group from the left to start messaging with end-to-end encryption.
        </p>
      </div>
    );
  }

  // Get active peer contact if 1:1
  const peerContact = !activeConv.isGroup
    ? contacts.find((c) => c.id === activeConv.participantIds.find((p) => p !== user.id))
    : null;

  return (
    <div className="flex-1 h-full flex flex-col bg-[var(--bg-app)] relative overflow-hidden">
      {/* Top Glass Header */}
      <div className="h-16 px-4 md:px-6 flex items-center justify-between glass-header z-20 select-none">
        {/* Contact/Group Info */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveConversationId('')}
            className="md:hidden p-1 text-[var(--text-secondary)] hover:text-white"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--border-subtle)] flex-shrink-0">
            <img src={activeConv.avatar} alt={activeConv.name} className="w-full h-full object-cover" />
            {peerContact?.isOnline && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[var(--bg-app)]" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm md:text-base font-semibold tracking-tight text-[var(--text-primary)] truncate">
                {activeConv.name}
              </h2>
              {activeConv.e2eeVerified && (
                <span title="E2EE AES-GCM 256 Verified">
                  <ShieldCheck size={14} className="text-emerald-400" />
                </span>
              )}
            </div>

            <p className="text-[11px] text-[var(--text-secondary)] truncate">
              {activeConv.isGroup
                ? `${activeConv.participantIds.length} members`
                : peerContact?.statusMessage || (peerContact?.isOnline ? 'Online now' : 'Offline')}
            </p>
          </div>
        </div>

        {/* Top Calling & Inspector Actions */}
        <div className="flex items-center gap-1.5 md:gap-2">
          <button
            onClick={() => startCall('voice', peerContact?.id)}
            className="w-9 h-9 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-card-hover)] flex items-center justify-center text-[var(--text-primary)] hover:text-emerald-400 transition-all active:scale-95"
            title="Start Voice Call"
          >
            <Phone size={17} />
          </button>

          <button
            onClick={() => startCall('video', peerContact?.id)}
            className="w-9 h-9 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-card-hover)] flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-all active:scale-95"
            title="Start FaceTime Video Call"
          >
            <Video size={18} />
          </button>

          <button
            onClick={onToggleDetail}
            className="w-9 h-9 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-card-hover)] flex items-center justify-center text-[var(--text-primary)] hover:text-white transition-all active:scale-95"
            title="Conversation Details & Media"
          >
            <Info size={18} />
          </button>
        </div>
      </div>

      {/* Persistent Pinned Message Banner */}
      {pinnedMessages.length > 0 && (
        <div className="px-4 py-2 bg-[var(--bg-card)] border-b border-[var(--border-subtle)] flex items-center justify-between text-xs z-10">
          <div className="flex items-center gap-2 truncate">
            <Pin size={13} className="text-[var(--accent-primary)] flex-shrink-0" />
            <span className="font-semibold text-[var(--text-secondary)]">Pinned:</span>
            <span className="truncate text-[var(--text-primary)]">{pinnedMessages[0].text}</span>
          </div>
          <span className="text-[10px] text-[var(--text-secondary)] ml-2">1 of {pinnedMessages.length}</span>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-1">
        {/* End-to-End Encryption Notice Badge */}
        <div className="flex items-center justify-center mb-6 select-none">
          <div className="px-3 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)]">
            <Lock size={12} className="text-emerald-400" />
            <span>Messages are end-to-end encrypted with Web Crypto AES-GCM 256</span>
          </div>
        </div>

        {/* Message Bubble Stream */}
        {convMessages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isMine={msg.senderId === user.id}
          />
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Message Composer */}
      <MessageComposer />
    </div>
  );
};
