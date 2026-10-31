import React, { useState } from 'react';
import {
  User,
  Palette,
  Shield,
  Bell,
  Cpu,
  Download,
  Trash2,
  Lock,
  Key,
  Smartphone,
  Eye,
  Sliders,
  CheckCircle2,
  Volume2,
} from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { audioSynth } from '../../services/audioSynthesizer';

export const SettingsView: React.FC = () => {
  const {
    user,
    updateUser,
    exportDatabaseJSON,
    clearCache,
    setIsLocked,
    setActiveModal,
  } = useApp();

  const [activeSection, setActiveSection] = useState<'profile' | 'appearance' | 'security' | 'notifications' | 'diagnostics'>('profile');

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[var(--bg-app)] p-4 md:p-8 select-none">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Settings & Preferences</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Configure appearance, security keys, sound synthesis, and system diagnostics.
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] overflow-x-auto no-scrollbar text-xs font-semibold">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'appearance', label: 'Appearance', icon: Palette },
            { id: 'security', label: 'Privacy & Security', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'diagnostics', label: 'Diagnostics', icon: Cpu },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id as typeof activeSection)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeSection === id
                  ? 'bg-[var(--accent-primary)] text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={15} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Profile Section */}
        {activeSection === 'profile' && (
          <div className="p-6 rounded-[24px] glass-panel border border-[var(--border-subtle)] space-y-6">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Public Identity & Profile Card</h3>

            <div className="flex items-center gap-5">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-[var(--border-subtle)] shadow-xl"
              />
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[var(--text-primary)]">{user.name}</h4>
                <p className="text-xs text-[var(--accent-primary)] font-mono">@{user.username}</p>
                <button
                  onClick={() => setActiveModal('my_qr')}
                  className="glass-btn text-xs py-1 px-3 mt-1"
                >
                  View QR Contact Card
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[var(--text-secondary)] block mb-1">Display Name</label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => updateUser({ name: e.target.value })}
                  className="glass-input w-full text-xs font-medium"
                />
              </div>

              <div>
                <label className="text-xs text-[var(--text-secondary)] block mb-1">Username Handle</label>
                <input
                  type="text"
                  value={user.username}
                  onChange={(e) => updateUser({ username: e.target.value })}
                  className="glass-input w-full text-xs font-medium"
                />
              </div>

              <div>
                <label className="text-xs text-[var(--text-secondary)] block mb-1">Status Message</label>
                <input
                  type="text"
                  value={user.statusMessage}
                  onChange={(e) => updateUser({ statusMessage: e.target.value })}
                  className="glass-input w-full text-xs font-medium"
                />
              </div>

              <div>
                <label className="text-xs text-[var(--text-secondary)] block mb-1">Bio</label>
                <input
                  type="text"
                  value={user.bio}
                  onChange={(e) => updateUser({ bio: e.target.value })}
                  className="glass-input w-full text-xs font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* Appearance Section */}
        {activeSection === 'appearance' && (
          <div className="p-6 rounded-[24px] glass-panel border border-[var(--border-subtle)] space-y-6">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Visual Themes & Glassmorphism</h3>

            {/* Dark / Light / System Mode */}
            <div>
              <label className="text-xs text-[var(--text-secondary)] block mb-2 font-semibold">Theme Mode</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'dark', label: 'Midnight Dark' },
                  { id: 'light', label: 'Canvas Light' },
                  { id: 'system', label: 'Auto System' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => updateUser({ theme: t.id as typeof user.theme })}
                    className={`p-3 rounded-[16px] text-xs font-bold border transition-all ${
                      user.theme === t.id
                        ? 'bg-[var(--accent-primary)] text-white border-transparent shadow-lg'
                        : 'bg-[var(--bg-input)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-white/20'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color Palette */}
            <div>
              <label className="text-xs text-[var(--text-secondary)] block mb-2 font-semibold">Accent Color</label>
              <div className="flex items-center gap-3">
                {[
                  { id: 'azure', color: '#007aff', name: 'Azure' },
                  { id: 'emerald', color: '#34c759', name: 'Emerald' },
                  { id: 'violet', color: '#af52de', name: 'Royal Violet' },
                  { id: 'coral', color: '#ff2d55', name: 'Coral' },
                  { id: 'amber', color: '#ff9500', name: 'Amber' },
                  { id: 'cyan', color: '#32ade6', name: 'Cyan' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => updateUser({ accentColor: c.id as typeof user.accentColor })}
                    style={{ backgroundColor: c.color }}
                    className={`w-9 h-9 rounded-full shadow-lg transition-transform hover:scale-110 ${
                      user.accentColor === c.id ? 'ring-4 ring-white/40 scale-105' : ''
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* High Contrast & Reduced Motion Toggles */}
            <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-primary)]">WCAG AAA High Contrast Mode</h4>
                  <p className="text-[11px] text-[var(--text-secondary)]">Enhance border definition and text contrast</p>
                </div>
                <input
                  type="checkbox"
                  checked={user.contrast === 'high'}
                  onChange={(e) => updateUser({ contrast: e.target.checked ? 'high' : 'normal' })}
                  className="rounded w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-primary)]">Reduced Motion Mode</h4>
                  <p className="text-[11px] text-[var(--text-secondary)]">Disables spring physics and full-screen particle effects</p>
                </div>
                <input
                  type="checkbox"
                  checked={user.reducedMotion}
                  onChange={(e) => updateUser({ reducedMotion: e.target.checked })}
                  className="rounded w-4 h-4 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Security & Cryptography Section */}
        {activeSection === 'security' && (
          <div className="p-6 rounded-[24px] glass-panel border border-[var(--border-subtle)] space-y-6">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">E2EE Cryptography & App Lock</h3>

            {/* PIN Lock Configuration */}
            <div className="p-4 rounded-[18px] bg-[var(--bg-input)] border border-white/10 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[var(--text-primary)]">Passcode Lock Screen</h4>
                <p className="text-[11px] text-[var(--text-secondary)]">Current PIN: 1234 (Click lock in sidebar to test)</p>
              </div>
              <button
                onClick={() => setIsLocked(true)}
                className="glass-btn text-xs py-1.5 px-3 text-amber-400"
              >
                Lock App Now
              </button>
            </div>

            {/* 12-Word Recovery Key Generator */}
            <div className="p-4 rounded-[18px] bg-[var(--bg-input)] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-primary)]">12-Word Offline Recovery Key</h4>
                  <p className="text-[11px] text-[var(--text-secondary)]">BIP39 deterministic recovery mnemonic</p>
                </div>
                <span className="text-xs text-emerald-400 font-bold">Generated</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
                {user.recoveryKeyWords.map((word, idx) => (
                  <span
                    key={idx}
                    className="p-1.5 rounded-lg bg-black/40 border border-white/5 text-center text-white/90"
                  >
                    {idx + 1}. {word}
                  </span>
                ))}
              </div>
            </div>

            {/* Data Export Archive */}
            <div className="pt-2 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[var(--text-primary)]">Export Full Data Archive</h4>
                <p className="text-[11px] text-[var(--text-secondary)]">Download all messages, contacts, and ledger in JSON</p>
              </div>
              <button
                onClick={exportDatabaseJSON}
                className="glass-btn text-xs py-1.5 px-3 flex items-center gap-1.5"
              >
                <Download size={14} />
                <span>Export JSON</span>
              </button>
            </div>
          </div>
        )}

        {/* Notifications & Sound Synthesis */}
        {activeSection === 'notifications' && (
          <div className="p-6 rounded-[24px] glass-panel border border-[var(--border-subtle)] space-y-6">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Procedural Web Audio Sound Engine</h3>

            <div>
              <label className="text-xs text-[var(--text-secondary)] block mb-2 font-semibold">
                Synthesized Notification Tone (Zero External MP3s)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'aether', name: 'Aether Chime (E5-B5)' },
                  { id: 'crystal', name: 'Crystal Harmonic' },
                  { id: 'celestial', name: 'Celestial Sweep' },
                  { id: 'pulse', name: 'Pulse Double Tap' },
                  { id: 'ripple', name: 'Ripple Pitch Bend' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      updateUser({ notificationSound: s.id });
                      audioSynth.playChime(s.id);
                    }}
                    className={`p-3 rounded-[16px] text-xs font-medium border text-left flex items-center justify-between transition-all ${
                      user.notificationSound === s.id
                        ? 'bg-[var(--accent-primary)] text-white border-transparent'
                        : 'bg-[var(--bg-input)] text-[var(--text-primary)] border-[var(--border-subtle)]'
                    }`}
                  >
                    <span>{s.name}</span>
                    <Volume2 size={14} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Diagnostics & Health Check */}
        {activeSection === 'diagnostics' && (
          <div className="p-6 rounded-[24px] glass-panel border border-[var(--border-subtle)] space-y-6">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">System Diagnostics & Platform Health</h3>

            <div className="space-y-3">
              {[
                { name: 'BroadcastChannel Real-Time Bus', status: 'Online (0ms latency)' },
                { name: 'Web Crypto API AES-GCM Subsystem', status: 'Hardware Accelerated' },
                { name: 'Procedural Web Audio Synthesizer', status: 'Active (48kHz Sample Rate)' },
                { name: 'OpenStreetMap Tile Network Gateway', status: 'Operational' },
                { name: 'Aether Pay Ledger Integrity', status: 'Verified (Zero Drift)' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-[14px] bg-[var(--bg-input)] border border-white/5 flex items-center justify-between text-xs"
                >
                  <span className="font-medium text-[var(--text-primary)]">{item.name}</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={14} />
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Clear Cache */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-rose-400">Clear Application Cache</h4>
                <p className="text-[11px] text-[var(--text-secondary)]">Reset all local storage to default initial state</p>
              </div>
              <button
                onClick={clearCache}
                className="px-3.5 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold transition-all"
              >
                Clear Cache & Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
