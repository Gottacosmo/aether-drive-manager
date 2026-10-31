import React from 'react';
import {
  MessageSquare,
  PhoneCall,
  Users,
  MapPin,
  CreditCard,
  Sparkles,
  Settings,
  Layers,
  Lock,
  Sun,
  Moon,
  Wifi,
  Plus,
  Film,
  Music,
  BookOpen,
  FileText,
  Image as ImageIcon,
  Folder,
} from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { useMedia } from '../../state/MediaContext';

export const NavigationSidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    conversations,
    user,
    updateUser,
    setIsLocked,
  } = useApp();

  const { openAddMediaModal, mediaItems } = useMedia();

  const totalUnread = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  const navItems = [
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: totalUnread > 0 ? totalUnread : null },
    { id: 'watch', label: 'Watch 4K Cinema', icon: Film, badge: null },
    { id: 'music', label: 'Music & Audio', icon: Music, badge: null },
    { id: 'reading', label: 'Reading Books', icon: BookOpen, badge: null },
    { id: 'documents', label: 'Documents', icon: FileText, badge: null },
    { id: 'gallery', label: 'Galleries', icon: ImageIcon, badge: null },
    { id: 'shared_media', label: 'Shared Collections', icon: Folder, badge: null },
    { id: 'social', label: 'Stories & Feed', icon: Sparkles, badge: null },
    { id: 'calls', label: 'FaceTime Calls', icon: PhoneCall, badge: null },
    { id: 'contacts', label: 'Contacts', icon: Users, badge: null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
  ] as const;

  const toggleTheme = () => {
    updateUser({ theme: user.theme === 'dark' ? 'light' : 'dark' });
  };

  return (
    <aside className="w-[74px] md:w-[80px] h-full flex flex-col items-center justify-between py-3.5 border-r border-[var(--border-subtle)] bg-[var(--bg-sidebar)] backdrop-blur-[32px] select-none z-30 transition-all overflow-y-auto no-scrollbar">
      {/* Brand Monogram & Persistent Add Media "+" Button */}
      <div className="flex flex-col items-center gap-2.5 w-full px-2">
        <div
          className="flex flex-col items-center gap-1 group cursor-pointer"
          onClick={() => setActiveTab('messages')}
        >
          <div className="w-11 h-11 rounded-[14px] bg-gradient-to-tr from-[#007aff] to-[#5856d6] flex items-center justify-center shadow-lg shadow-[#007aff]/30 group-hover:scale-105 transition-transform duration-200">
            <span className="text-white font-bold text-lg tracking-wider">Æ</span>
          </div>
          <span className="text-[10px] font-semibold text-[var(--text-secondary)] tracking-tight">AETHER</span>
        </div>

        {/* Global Persistent Add Media "+" Button */}
        <button
          type="button"
          onClick={openAddMediaModal}
          className="w-12 h-12 rounded-[15px] bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/40 hover:scale-110 active:scale-95 transition-all duration-200 group relative border border-white/20 mt-1"
          title="Add Media (+) — Google Drive Link Manager"
          aria-label="Add Media"
        >
          <Plus size={23} strokeWidth={2.6} className="group-hover:rotate-90 transition-transform duration-300" />

          {/* Floating Tooltip */}
          <span className="absolute left-[84px] bg-[#1a1b24] text-white text-xs px-2.5 py-1 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 shadow-xl border border-white/10 whitespace-nowrap z-50">
            Add Media (+) — Google Drive Link Manager
          </span>
        </button>
      </div>

      {/* Primary Navigation Icons */}
      <nav className="flex flex-col items-center gap-1.5 my-3 w-full px-2" aria-label="Main Navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative w-11 h-11 rounded-[13px] flex items-center justify-center transition-all duration-200 group ${
                isActive
                  ? 'bg-[var(--accent-primary)] text-white shadow-md shadow-[var(--accent-primary)]/40 scale-105'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
              }`}
              title={item.label}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={19} strokeWidth={isActive ? 2.4 : 1.9} />

              {/* Dynamic Badge */}
              {item.badge && (
                <span
                  className={`absolute -top-1 -right-1 px-1.5 py-0.5 text-[9px] font-bold rounded-full border border-[var(--bg-app)] ${
                    isActive ? 'bg-white text-[var(--accent-primary)]' : 'bg-[#ff2d55] text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {/* Floating Tooltip */}
              <span className="absolute left-[84px] bg-[#1a1b24] text-white text-xs px-2.5 py-1 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 shadow-xl border border-white/10 whitespace-nowrap z-50">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Utility Controls */}
      <div className="flex flex-col items-center gap-2 w-full px-2">
        {/* Connection Indicator */}
        <div
          className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[9.5px] font-medium"
          title="Aether Drive Sync Bus Online"
        >
          <Wifi size={10} />
          <span className="hidden md:inline">Online</span>
        </div>

        {/* Lock Screen Trigger */}
        <button
          onClick={() => setIsLocked(true)}
          className="w-9 h-9 rounded-[11px] flex items-center justify-center text-[var(--text-secondary)] hover:text-amber-400 hover:bg-[var(--bg-card-hover)] transition-all"
          title="Lock App with PIN"
          aria-label="Lock App"
        >
          <Lock size={16} />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-[11px] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-all"
          title="Toggle Light / Dark Mode"
          aria-label="Toggle Theme"
        >
          {user.theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* User Profile Avatar */}
        <button
          onClick={() => setActiveTab('settings')}
          className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--border-subtle)] hover:border-[var(--accent-primary)] transition-all hover:scale-105"
          title={`Signed in as ${user.name}`}
          aria-label="User Profile"
        >
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[var(--bg-app)]" />
        </button>
      </div>
    </aside>
  );
};
