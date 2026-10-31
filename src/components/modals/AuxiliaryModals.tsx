import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  BarChart2,
  Search,
  MapPin,
  Home,
  Briefcase,
  Coffee,
  Dumbbell,
  Users,
  Check,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../state/AppContext';

// Create Poll Modal
export const CreatePollModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { sendMessage } = useApp();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['Option A', 'Option B']);

  const addOption = () => {
    if (options.length < 5) setOptions([...options, `Option ${String.fromCharCode(65 + options.length)}`]);
  };

  const removeOption = (idx: number) => {
    if (options.length > 2) setOptions(options.filter((_, i) => i !== idx));
  };

  const handleSendPoll = () => {
    if (!question.trim()) return;
    sendMessage(question, {
      poll: {
        id: 'poll_' + Date.now(),
        question,
        options: options.map((opt, i) => ({
          id: `opt_${i}`,
          text: opt,
          votes: [],
        })),
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-[24px] p-4 select-none animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-[26px] glass-modal overflow-hidden border border-white/15 p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <div className="flex items-center gap-2">
            <BarChart2 size={18} className="text-purple-400" />
            <h3 className="text-base font-bold text-[var(--text-primary)]">Create Poll</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-[var(--text-secondary)]">
            <X size={17} />
          </button>
        </div>

        <div>
          <label className="text-xs text-[var(--text-secondary)] block mb-1">Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question..."
            className="glass-input w-full text-xs font-semibold"
          />
        </div>

        <div>
          <label className="text-xs text-[var(--text-secondary)] block mb-1.5">Poll Options</label>
          <div className="space-y-2">
            {options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => {
                    const copy = [...options];
                    copy[i] = e.target.value;
                    setOptions(copy);
                  }}
                  className="glass-input flex-1 text-xs"
                />
                {options.length > 2 && (
                  <button onClick={() => removeOption(i)} className="text-rose-400 p-1 hover:bg-white/5 rounded">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {options.length < 5 && (
            <button
              onClick={addOption}
              className="mt-2 text-xs text-[var(--accent-primary)] font-bold flex items-center gap-1 hover:underline"
            >
              <Plus size={14} />
              <span>Add Option</span>
            </button>
          )}
        </div>

        <button
          onClick={handleSendPoll}
          className="glass-btn glass-btn-primary w-full py-2.5 text-xs font-bold"
        >
          Publish Poll
        </button>
      </div>
    </div>
  );
};

// Universal Search Spotlight Modal (Cmd+K)
export const UniversalSearchModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { messages, contacts, setActiveConversationId, setSearchQuery } = useApp();
  const [query, setQuery] = useState('');

  const matchingMessages = query.trim()
    ? messages.filter((m) => m.text.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  const matchingContacts = query.trim()
    ? contacts.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 4)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/80 backdrop-blur-[28px] p-4 select-none animate-in fade-in duration-150">
      <div className="w-full max-w-xl rounded-[26px] glass-modal overflow-hidden border border-white/20 shadow-2xl flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[var(--border-subtle)] flex items-center gap-3">
          <Search size={18} className="text-[var(--accent-primary)]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Universal Search across messages, contacts, files, locations..."
            className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none"
          />
          <button onClick={onClose} className="p-1 text-[var(--text-secondary)] hover:text-white">
            <X size={17} />
          </button>
        </div>

        {/* Search Results */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-4 text-xs">
          {query.trim() === '' ? (
            <p className="text-[var(--text-secondary)] text-center py-6">
              Type to search across all conversations, contacts, receipts, and media.
            </p>
          ) : (
            <>
              {matchingContacts.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                    Contacts ({matchingContacts.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchingContacts.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          onClose();
                        }}
                        className="p-2 rounded-xl bg-[var(--bg-input)] hover:bg-[var(--bg-card-hover)] flex items-center gap-2.5 cursor-pointer"
                      >
                        <img src={c.avatar} alt={c.name} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <span className="font-bold text-[var(--text-primary)]">{c.name}</span>
                          <span className="text-[10px] text-[var(--text-secondary)] ml-2">@{c.username}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchingMessages.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                    Messages ({matchingMessages.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchingMessages.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          setActiveConversationId(m.conversationId);
                          onClose();
                        }}
                        className="p-2 rounded-xl bg-[var(--bg-input)] hover:bg-[var(--bg-card-hover)] cursor-pointer flex flex-col gap-0.5"
                      >
                        <p className="text-[var(--text-primary)] font-medium truncate">{m.text}</p>
                        <span className="text-[9px] text-[var(--text-secondary)]">
                          {new Date(m.timestamp).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Saved Places Modal
export const SavedPlacesModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const places = [
    { name: 'Cupertino Campus', icon: Briefcase, address: '1 Apple Park Way, Cupertino, CA', color: 'text-blue-400' },
    { name: 'Home Residence', icon: Home, address: 'Pacific Heights, San Francisco, CA', color: 'text-emerald-400' },
    { name: 'Blue Bottle Cafe', icon: Coffee, address: 'Mint Plaza, San Francisco, CA', color: 'text-amber-400' },
    { name: 'Equinox Gym', icon: Dumbbell, address: 'Market St, San Francisco, CA', color: 'text-rose-400' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-[24px] p-4 select-none animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-[26px] glass-modal overflow-hidden border border-white/15 p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <div className="flex items-center gap-2">
            <Home size={18} className="text-emerald-400" />
            <h3 className="text-base font-bold text-[var(--text-primary)]">Saved Places</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-[var(--text-secondary)]">
            <X size={17} />
          </button>
        </div>

        <div className="space-y-2">
          {places.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="p-3 rounded-[16px] bg-[var(--bg-input)] hover:bg-[var(--bg-card-hover)] flex items-center gap-3 cursor-pointer transition-colors"
              >
                <div className={`w-9 h-9 rounded-full bg-white/10 flex items-center justify-center ${p.color}`}>
                  <Icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-[var(--text-primary)]">{p.name}</h4>
                  <p className="text-[11px] text-[var(--text-secondary)] truncate">{p.address}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="glass-btn glass-btn-primary w-full py-2.5 text-xs font-bold"
        >
          Done
        </button>
      </div>
    </div>
  );
};
