import React, { useState } from 'react';
import {
  Search,
  Plus,
  Pin,
  CheckCheck,
  Check,
  Clock,
  Sparkles,
  Users2,
  Lock,
} from 'lucide-react';
import { useApp } from '../../state/AppContext';

export const ConversationList: React.FC = () => {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    messages,
    stories,
    contacts,
    searchQuery,
    setSearchQuery,
    setActiveModal,
  } = useApp();

  const [activeFolder, setActiveFolder] = useState<string>('All');

  // Filter conversations by search and folder
  const filteredConversations = conversations.filter((conv) => {
    // Search filter
    if (searchQuery.trim()) {
      if (searchQuery.startsWith('unread:true')) {
        if ((conv.unreadCount || 0) === 0) return false;
      } else {
        const query = searchQuery.toLowerCase();
        const matchesName = conv.name.toLowerCase().includes(query);
        const lastMsg = messages.filter((m) => m.conversationId === conv.id).slice(-1)[0];
        const matchesMsg = lastMsg && lastMsg.text.toLowerCase().includes(query);
        if (!matchesName && !matchesMsg) return false;
      }
    }

    // Folder filter
    if (activeFolder === 'Unread') return (conv.unreadCount || 0) > 0;
    if (activeFolder !== 'All' && conv.folder !== activeFolder) return false;

    return !conv.isArchived;
  });

  // Pinned conversations
  const pinnedConversations = conversations.filter((c) => c.isPinned);

  return (
    <div className="w-full md:w-[320px] lg:w-[360px] h-full flex flex-col border-r border-[var(--border-subtle)] bg-[var(--bg-sidebar)] backdrop-blur-[28px] select-none">
      {/* Header with Title and Action Buttons */}
      <div className="p-4 pb-2 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">Messages</h1>
          <p className="text-[11px] font-medium text-[var(--text-secondary)]">290 Features • Strictly Zero AI</p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveModal('new_chat')}
            className="w-8 h-8 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-card-hover)] flex items-center justify-center text-[var(--text-primary)] transition-all"
            title="New Conversation"
          >
            <Plus size={17} />
          </button>
          <button
            onClick={() => setActiveModal('new_group')}
            className="w-8 h-8 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-card-hover)] flex items-center justify-center text-[var(--text-primary)] transition-all"
            title="Create New Group"
          >
            <Users2 size={16} />
          </button>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="px-4 py-2">
        <div className="relative flex items-center w-full">
          <Search size={15} className="absolute left-3 text-[var(--text-secondary)] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages, contacts, files (Cmd+K)"
            className="glass-input w-full pl-9 pr-7 py-1.5 text-xs placeholder:text-[var(--text-secondary)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 text-xs text-[var(--text-secondary)] hover:text-white"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* 24-Hour Ephemeral Stories Strip */}
      <div className="px-4 py-2 border-b border-[var(--border-subtle)] overflow-x-auto no-scrollbar flex items-center gap-3">
        {/* Add Story Button */}
        <div
          className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0 group"
          onClick={() => setActiveModal('create_story')}
        >
          <div className="relative w-12 h-12 rounded-full border-2 border-dashed border-[var(--accent-primary)]/60 flex items-center justify-center group-hover:scale-105 transition-transform bg-[var(--bg-card)]">
            <Plus size={18} className="text-[var(--accent-primary)]" />
          </div>
          <span className="text-[10px] text-[var(--text-secondary)]">Your Story</span>
        </div>

        {/* Stories list */}
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0 group"
            onClick={() => setActiveModal('stories')}
          >
            <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-[#007aff] via-[#af52de] to-[#ff2d55] group-hover:scale-105 transition-transform">
              <img
                src={story.userAvatar}
                alt={story.userName}
                className="w-full h-full object-cover rounded-full border-2 border-[var(--bg-app)]"
              />
            </div>
            <span className="text-[10px] text-[var(--text-secondary)] max-w-[48px] truncate">
              {story.userName.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>

      {/* Pinned Contacts Carousel */}
      {pinnedConversations.length > 0 && !searchQuery && (
        <div className="px-4 py-2.5 border-b border-[var(--border-subtle)] flex items-center gap-3 overflow-x-auto no-scrollbar">
          {pinnedConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveConversationId(conv.id)}
              className="flex flex-col items-center gap-1 cursor-pointer group flex-shrink-0"
            >
              <div
                className={`relative w-11 h-11 rounded-full overflow-hidden transition-all duration-200 group-hover:scale-105 ${
                  activeConversationId === conv.id
                    ? 'ring-2 ring-[var(--accent-primary)] ring-offset-2 ring-offset-[var(--bg-app)]'
                    : 'border border-[var(--border-subtle)]'
                }`}
              >
                <img src={conv.avatar} alt={conv.name} className="w-full h-full object-cover" />
                <span className="absolute top-0 right-0 p-0.5 bg-[var(--accent-primary)] rounded-full text-white">
                  <Pin size={8} />
                </span>
              </div>
              <span className="text-[10px] font-medium text-[var(--text-primary)] max-w-[50px] truncate">
                {conv.name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Folder Tabs */}
      <div className="px-3 py-2 flex items-center gap-1 border-b border-[var(--border-subtle)] overflow-x-auto no-scrollbar">
        {['All', 'VIP', 'Work', 'Personal', 'Unread'].map((folder) => (
          <button
            key={folder}
            onClick={() => setActiveFolder(folder)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all whitespace-nowrap ${
              activeFolder === folder
                ? 'bg-[var(--accent-primary)] text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
            }`}
          >
            {folder}
          </button>
        ))}
      </div>

      {/* Conversation Items List */}
      <div className="flex-1 overflow-y-auto px-2 py-1.5 space-y-1">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center px-4 text-[var(--text-secondary)]">
            <Sparkles size={24} className="mb-2 opacity-50" />
            <p className="text-xs">No conversations matched your filter.</p>
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const isSelected = activeConversationId === conv.id;
            const convMessages = messages.filter((m) => m.conversationId === conv.id);
            const lastMessage = convMessages[convMessages.length - 1];
            const isTyping = conv.typingUsers && conv.typingUsers.length > 0;

            return (
              <div
                key={conv.id}
                onClick={() => setActiveConversationId(conv.id)}
                className={`relative flex items-center gap-3 p-2.5 rounded-[14px] cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? 'bg-[var(--accent-primary)] text-white shadow-sm'
                    : 'hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)]'
                }`}
              >
                {/* Avatar with Status */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-[var(--border-subtle)]">
                  <img src={conv.avatar} alt={conv.name} className="w-full h-full object-cover" />
                  {conv.e2eeVerified && (
                    <span className="absolute bottom-0 right-0 p-0.5 bg-emerald-500 rounded-full text-white text-[8px]" title="E2EE Verified">
                      <Lock size={8} />
                    </span>
                  )}
                </div>

                {/* Info and Preview */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-[13.5px] font-semibold truncate">{conv.name}</span>
                      {conv.isGroup && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-white/10 uppercase font-bold tracking-wider">
                          Group
                        </span>
                      )}
                    </div>
                    {lastMessage && (
                      <span
                        className={`text-[10px] flex-shrink-0 ${
                          isSelected ? 'text-white/80' : 'text-[var(--text-secondary)]'
                        }`}
                      >
                        {new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>

                  {/* Message Snippet or Typing Indicator */}
                  <div className="flex items-center justify-between gap-1">
                    <div
                      className={`text-xs truncate flex items-center gap-1 ${
                        isSelected ? 'text-white/90' : 'text-[var(--text-secondary)]'
                      }`}
                    >
                      {isTyping ? (
                        <span className="text-emerald-400 font-medium italic animate-pulse">
                          {conv.typingUsers![0]} is typing...
                        </span>
                      ) : lastMessage ? (
                        <>
                          {lastMessage.senderId === 'user_alex' && (
                            <span className="flex-shrink-0 opacity-75">
                              {lastMessage.status === 'read' ? (
                                <CheckCheck size={12} className="text-cyan-300 inline" />
                              ) : lastMessage.status === 'delivered' ? (
                                <CheckCheck size={12} className="inline" />
                              ) : lastMessage.status === 'sent' ? (
                                <Check size={12} className="inline" />
                              ) : (
                                <Clock size={12} className="inline" />
                              )}
                            </span>
                          )}
                          <span className="truncate">
                            {lastMessage.poll
                              ? `📊 Poll: ${lastMessage.poll.question}`
                              : lastMessage.paymentData
                              ? `💳 Aether Pay: $${lastMessage.paymentData.amount.toFixed(2)}`
                              : lastMessage.locationData
                              ? `📍 Live Location: ${lastMessage.locationData.address}`
                              : lastMessage.mediaType === 'voice_note'
                              ? `🎙️ Voice Note (${lastMessage.audioDuration}s)`
                              : lastMessage.text}
                          </span>
                        </>
                      ) : (
                        <span className="italic opacity-60">No messages yet</span>
                      )}
                    </div>

                    {/* Unread Counter Pill */}
                    {(conv.unreadCount || 0) > 0 && !isSelected && (
                      <span className="flex-shrink-0 px-1.5 py-0.5 rounded-full bg-[var(--accent-primary)] text-white text-[10px] font-bold">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
