import React, { useState } from 'react';
import {
  X,
  Shield,
  Clock,
  Bell,
  Image,
  FileText,
  Link,
  CheckSquare,
  StickyNote,
  UserX,
  AlertTriangle,
  QrCode,
  Download,
} from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { useMedia } from '../../state/MediaContext';
import { Film, Plus } from 'lucide-react';

export const DetailSidebar: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    conversations,
    activeConversationId,
    contacts,
    user,
    messages,
    tasks,
    setActiveModal,
    sendMessage,
  } = useApp();

  const { mediaItems, openEmbedPicker, openBookReader, openImageLightbox } = useMedia();

  const [activeTab, setActiveTab] = useState<'media' | 'files' | 'tasks' | 'notes'>('media');

  const activeConv = conversations.find((c) => c.id === activeConversationId);
  const peerContact = !activeConv?.isGroup
    ? contacts.find((c) => c.id === activeConv?.participantIds.find((p) => p !== user.id))
    : null;

  const convMessages = messages.filter((m) => m.conversationId === activeConversationId);
  const convTasks = tasks.filter((t) => t.conversationId === activeConversationId);

  if (!activeConv) return null;

  return (
    <div className="w-80 lg:w-96 h-full flex flex-col border-l border-[var(--border-subtle)] bg-[var(--bg-sidebar)] backdrop-blur-[32px] select-none z-20 animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">Conversation Details</h3>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] hover:text-white transition-colors"
        >
          <X size={17} />
        </button>
      </div>

      {/* Body Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Profile Card */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--border-subtle)] mb-2.5 shadow-lg">
            <img src={activeConv.avatar} alt={activeConv.name} className="w-full h-full object-cover" />
          </div>
          <h4 className="text-base font-bold text-[var(--text-primary)]">{activeConv.name}</h4>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            {peerContact?.username ? `@${peerContact.username}` : activeConv.description || 'Aether Private Chat'}
          </p>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => setActiveModal('safety_numbers')}
              className="glass-btn text-xs py-1.5 px-3 flex items-center gap-1.5 text-emerald-400"
            >
              <Shield size={14} />
              <span>Verify E2EE</span>
            </button>
            <button
              onClick={() => setActiveModal('my_qr')}
              className="glass-btn text-xs py-1.5 px-3 flex items-center gap-1.5"
            >
              <QrCode size={14} />
              <span>QR Card</span>
            </button>
          </div>
        </div>

        {/* Security & Disappearing Messages */}
        <div className="space-y-3 p-3.5 rounded-[14px] bg-[var(--bg-card)] border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]">
              <Clock size={15} className="text-amber-400" />
              <span>Disappearing Messages</span>
            </div>
            <select
              className="glass-input text-[11px] py-1 px-2 cursor-pointer"
              defaultValue="off"
            >
              <option value="off">Off</option>
              <option value="5s">5 seconds</option>
              <option value="1m">1 minute</option>
              <option value="1h">1 hour</option>
              <option value="24h">24 hours</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]">
              <Bell size={15} className="text-blue-400" />
              <span>Notifications</span>
            </div>
            <select
              className="glass-input text-[11px] py-1 px-2 cursor-pointer"
              defaultValue="all"
            >
              <option value="all">All Messages</option>
              <option value="mentions">Mentions Only</option>
              <option value="muted">Muted</option>
            </select>
          </div>
        </div>

        {/* Shared Content Tabs */}
        <div>
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-input)] border border-[var(--border-subtle)] mb-3 text-xs font-medium">
            <button
              onClick={() => setActiveTab('media')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                activeTab === 'media' ? 'bg-[var(--accent-primary)] text-white shadow' : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              Media
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                activeTab === 'files' ? 'bg-[var(--accent-primary)] text-white shadow' : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              Files
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                activeTab === 'tasks' ? 'bg-[var(--accent-primary)] text-white shadow' : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              Tasks
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                activeTab === 'notes' ? 'bg-[var(--accent-primary)] text-white shadow' : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              Notes
            </button>
          </div>

          {/* Media Grid */}
          {activeTab === 'media' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white/80">Google Drive Media</span>
                <button
                  type="button"
                  onClick={() => {
                    openEmbedPicker((item) => {
                      sendMessage(`Shared Google Drive ${item.category}: ${item.title}`, {
                        mediaType: 'google_drive',
                        mediaData: item,
                      });
                    });
                  }}
                  className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
                >
                  <Plus size={12} />
                  <span>Embed Media</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {mediaItems.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (item.category === 'book' || item.category === 'document') {
                        openBookReader(item);
                      } else if (item.category === 'image') {
                        openImageLightbox(item);
                      } else {
                        sendMessage(`Shared Google Drive ${item.category}: ${item.title}`, {
                          mediaType: 'google_drive',
                          mediaData: item,
                        });
                      }
                    }}
                    className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-white/10 group cursor-pointer"
                  >
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-1.5 flex flex-col justify-end">
                      <span className="text-[10px] font-bold text-white truncate">{item.title}</span>
                      <span className="text-[9px] text-blue-300 capitalize">{item.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Files List */}
          {activeTab === 'files' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs">
                <div className="flex items-center gap-2 truncate">
                  <FileText size={16} className="text-rose-400 flex-shrink-0" />
                  <span className="truncate">Architectural_Permit_Paris.pdf</span>
                </div>
                <button className="text-[var(--text-secondary)] hover:text-white p-1">
                  <Download size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Tasks Checklist */}
          {activeTab === 'tasks' && (
            <div className="space-y-1.5">
              {convTasks.length === 0 ? (
                <p className="text-xs text-[var(--text-secondary)] italic">No tasks assigned.</p>
              ) : (
                convTasks.map((t) => (
                  <div key={t.id} className="flex items-center gap-2 text-xs p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                    <input type="checkbox" defaultChecked={t.completed} className="rounded" />
                    <span className={t.completed ? 'line-through text-[var(--text-secondary)]' : ''}>{t.title}</span>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Sticky Notes Pad */}
          {activeTab === 'notes' && (
            <div className="p-3 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold">
                <StickyNote size={14} />
                <span>Shared Pinboard</span>
              </div>
              <p>Remember to finalize the acoustic Biquad filter test recordings before Thursday sprint review.</p>
            </div>
          )}
        </div>

        {/* Destructive Actions */}
        <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
          <button
            onClick={() => alert('Contact blocked.')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-amber-400 hover:bg-amber-500/10 transition-colors"
          >
            <UserX size={15} />
            <span>Block Contact</span>
          </button>
          <button
            onClick={() => alert('Report submitted.')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <AlertTriangle size={15} />
            <span>Report Spam or Abuse</span>
          </button>
        </div>
      </div>
    </div>
  );
};
