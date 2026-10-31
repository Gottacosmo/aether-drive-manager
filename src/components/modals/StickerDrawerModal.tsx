import React, { useState } from 'react';
import { X, Search, Sparkles, Smile, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../../state/AppContext';

export const StickerDrawerModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { sendMessage } = useApp();
  const [activeTab, setActiveTab] = useState<'stickers' | 'gifs' | 'emojis'>('stickers');
  const [search, setSearch] = useState('');

  // Curated Sticker Collections (SVG animated / vector representations)
  const stickers = [
    { id: 'cat_happy', emoji: '😸', name: 'Joyful Cat', bg: 'bg-amber-500/20' },
    { id: 'cat_love', emoji: '😻', name: 'Heart Eyes Cat', bg: 'bg-rose-500/20' },
    { id: 'rocket', emoji: '🚀', name: 'Launch Space', bg: 'bg-blue-500/20' },
    { id: 'fire', emoji: '🔥', name: 'Super Lit', bg: 'bg-orange-500/20' },
    { id: 'gem', emoji: '💎', name: 'Crystal Gem', bg: 'bg-cyan-500/20' },
    { id: 'sparkles', emoji: '✨', name: 'Sparkles Star', bg: 'bg-yellow-500/20' },
    { id: 'cool', emoji: '😎', name: 'Cupertino Cool', bg: 'bg-purple-500/20' },
    { id: 'party', emoji: '🥳', name: 'Celebration', bg: 'bg-emerald-500/20' },
  ];

  // Curated High-Fidelity GIFs repository
  const gifs = [
    { id: 'g1', title: 'Cheers Celebration', url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400' },
    { id: 'g2', title: 'Thumbs Up Approval', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400' },
    { id: 'g3', title: 'Mind Blown Laser', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400' },
    { id: 'g4', title: 'Dancing Neon Wave', url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400' },
  ];

  // Unicode Emoji Catalog
  const emojiCategories = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '🥹', '😊',
    '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙',
    '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🫢', '🤫',
    '🤔', '🫡', '🤐', '🤨', '😐', '😑', '😶', '🫥', '😏', '😒',
    '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒',
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
    '🔥', '✨', '⚡️', '🌟', '💫', '⭐️', '🌈', '☀️', '☕️', '🥂',
  ];

  const handleSendSticker = (sticker: typeof stickers[0]) => {
    sendMessage(sticker.emoji, {
      mediaType: 'sticker',
    });
    onClose();
  };

  const handleSendGif = (gif: typeof gifs[0]) => {
    sendMessage(`[GIF: ${gif.title}]`, {
      mediaType: 'gif',
      mediaUrl: gif.url,
    });
    onClose();
  };

  const handleSendEmoji = (emoji: string) => {
    sendMessage(emoji);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-[24px] p-4 select-none animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-[26px] glass-modal overflow-hidden border border-white/15 shadow-2xl flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-input)] text-xs font-semibold">
            <button
              onClick={() => setActiveTab('stickers')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === 'stickers' ? 'bg-[var(--accent-primary)] text-white shadow' : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              Stickers
            </button>
            <button
              onClick={() => setActiveTab('gifs')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === 'gifs' ? 'bg-[var(--accent-primary)] text-white shadow' : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              GIFs
            </button>
            <button
              onClick={() => setActiveTab('emojis')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === 'emojis' ? 'bg-[var(--accent-primary)] text-white shadow' : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              Emojis
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] hover:text-white"
          >
            <X size={17} />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-[var(--border-subtle)]">
          <div className="relative flex items-center">
            <Search size={14} className="absolute left-3 text-[var(--text-secondary)] pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${activeTab}...`}
              className="glass-input w-full pl-8 py-1.5 text-xs"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 flex-1 overflow-y-auto">
          {/* Stickers Grid */}
          {activeTab === 'stickers' && (
            <div className="grid grid-cols-4 gap-3">
              {stickers.map((s) => (
                <div
                  key={s.id}
                  onClick={() => handleSendSticker(s)}
                  className={`h-24 rounded-[18px] ${s.bg} border border-white/10 hover:border-white/30 flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95`}
                >
                  <span className="text-3xl drop-shadow-md">{s.emoji}</span>
                  <span className="text-[10px] font-semibold text-white/80 mt-1">{s.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* GIFs Grid */}
          {activeTab === 'gifs' && (
            <div className="grid grid-cols-2 gap-3">
              {gifs.map((g) => (
                <div
                  key={g.id}
                  onClick={() => handleSendGif(g)}
                  className="relative h-28 rounded-[16px] overflow-hidden border border-white/10 cursor-pointer group hover:scale-[1.03] transition-transform"
                >
                  <img src={g.url} alt={g.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 p-2 flex items-end text-[11px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {g.title}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Emoji Grid */}
          {activeTab === 'emojis' && (
            <div className="grid grid-cols-8 gap-2 text-center text-xl">
              {emojiCategories.map((emoji, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendEmoji(emoji)}
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:scale-125 transition-transform"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
