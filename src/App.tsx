import React, { useState, useEffect } from 'react';
import { useApp } from './state/AppContext';
import { useMedia } from './state/MediaContext';
import { NavigationSidebar } from './components/layout/NavigationSidebar';
import { ConversationList } from './components/layout/ConversationList';
import { ChatView } from './components/chat/ChatView';
import { DetailSidebar } from './components/layout/DetailSidebar';
import { ActiveCallModal } from './components/calls/ActiveCallModal';
import { ScreenEffects } from './components/chat/ScreenEffects';
import { FeatureMatrixModal } from './components/inspector/FeatureMatrixModal';
import { AetherPayView } from './components/finance/AetherPayView';
import { LiveLocationView } from './components/location/LiveLocationView';
import { SocialFeedView } from './components/social/SocialFeedView';
import { SettingsView } from './components/settings/SettingsView';
import { StickerDrawerModal } from './components/modals/StickerDrawerModal';
import { HandwritingModal } from './components/modals/HandwritingModal';
import { PasscodeLockScreen } from './components/modals/PasscodeLockScreen';
import {
  BillSplitterModal,
  TipCalculatorModal,
  DigitalReceiptModal,
  PaymentQRModal,
} from './components/modals/FinanceModals';
import {
  CreatePollModal,
  UniversalSearchModal,
  SavedPlacesModal,
} from './components/modals/AuxiliaryModals';

// Sitewide Google Drive Manager Views & Modals
import { WatchLibraryView } from './components/media/WatchLibraryView';
import { MusicLibraryView } from './components/media/MusicLibraryView';
import { ReadingLibraryView } from './components/media/ReadingLibraryView';
import { DocumentLibraryView } from './components/media/DocumentLibraryView';
import { GalleryView } from './components/media/GalleryView';
import { SharedLibrariesView } from './components/media/SharedLibrariesView';
import { AddMediaModal } from './components/media/AddMediaModal';
import { EmbedMediaPickerModal } from './components/media/EmbedMediaPickerModal';
import { WatchRoomModal } from './components/media/WatchRoomModal';
import { BookReaderModal } from './components/media/BookReaderModal';
import { ImageLightboxModal } from './components/media/ImageLightboxModal';
import { ShareMediaModal } from './components/media/ShareMediaModal';
import { PersistentAudioPlayerBar } from './components/media/PersistentAudioPlayerBar';

import { Layers } from 'lucide-react';

export const AppContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    activeModal,
    setActiveModal,
    activeScreenEffect,
    setActiveScreenEffect,
    privacyShield,
    setIsLocked,
  } = useApp();

  const { activeMediaModal, toastMessage } = useMedia();

  const [showDetailSidebar, setShowDetailSidebar] = useState(false);

  // Global Keyboard Shortcuts (Cmd+K search, Cmd+L lock)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setActiveModal('universal_search');
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'l') {
        e.preventDefault();
        setIsLocked(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveModal, setIsLocked]);

  return (
    <div
      className={`flex h-screen w-screen overflow-hidden bg-[var(--bg-app)] text-[var(--text-primary)] transition-all ${
        privacyShield ? 'filter blur-xl pointer-events-none' : ''
      }`}
    >
      {/* 1. Leftmost Navigation Strip with Persistent "+" Add Media Button */}
      <NavigationSidebar />

      {/* 2. Main Tab View Dispatcher */}
      <main className="flex-1 h-full flex overflow-hidden relative">
        {/* Messages Tab (Triple Column: Nav | List | Chat + Detail) */}
        {activeTab === 'messages' && (
          <div className="flex-1 h-full flex overflow-hidden">
            <ConversationList />
            <ChatView onToggleDetail={() => setShowDetailSidebar(!showDetailSidebar)} />
            {showDetailSidebar && (
              <DetailSidebar onClose={() => setShowDetailSidebar(false)} />
            )}
          </div>
        )}

        {/* Sitewide Google Drive Libraries */}
        {activeTab === 'watch' && <WatchLibraryView />}
        {activeTab === 'music' && <MusicLibraryView />}
        {activeTab === 'reading' && <ReadingLibraryView />}
        {activeTab === 'documents' && <DocumentLibraryView />}
        {activeTab === 'gallery' && <GalleryView />}
        {activeTab === 'shared_media' && <SharedLibrariesView />}

        {/* Calls Tab */}
        {activeTab === 'calls' && (
          <div className="flex-1 h-full flex flex-col p-6 md:p-10 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full space-y-6">
              <div>
                <h1 className="text-2xl font-bold">FaceTime & Voice Calls</h1>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  WebRTC peer audio and video calling with Canvas background blur.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  onClick={() => useApp().startCall('video')}
                  className="p-6 rounded-[24px] glass-panel border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] cursor-pointer transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">📹</span>
                  </div>
                  <h3 className="text-base font-bold">Start FaceTime Video Call</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Connect with HD 1080p video, screen share, and virtual backgrounds.
                  </p>
                </div>

                <div
                  onClick={() => useApp().startCall('voice')}
                  className="p-6 rounded-[24px] glass-panel border border-[var(--border-subtle)] hover:border-emerald-500 cursor-pointer transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">📞</span>
                  </div>
                  <h3 className="text-base font-bold">Start Voice Call</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Web Audio noise cancellation filter with spatial Opus audio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="flex-1 h-full p-6 md:p-10 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full space-y-6">
              <h1 className="text-2xl font-bold">Contacts & Address Book</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {useApp().contacts.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-[20px] glass-panel border border-[var(--border-subtle)] flex items-center gap-3"
                  >
                    <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <h4 className="text-sm font-bold">{c.name}</h4>
                      <p className="text-xs text-[var(--text-secondary)]">@{c.username}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Location Tab */}
        {activeTab === 'location' && <LiveLocationView />}

        {/* Aether Pay Tab */}
        {activeTab === 'finance' && <AetherPayView />}

        {/* Social Stories Tab */}
        {activeTab === 'social' && <SocialFeedView />}

        {/* Settings Tab */}
        {activeTab === 'settings' && <SettingsView />}

        {/* Feature Matrix Tab */}
        {activeTab === 'matrix' && (
          <FeatureMatrixModal onClose={() => setActiveTab('messages')} />
        )}
      </main>

      {/* Persistent Sitewide Audio Player Bar */}
      <PersistentAudioPlayerBar />

      {/* Toast Notification Pill */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-blue-600/95 text-white text-xs font-bold shadow-2xl backdrop-blur-xl border border-white/20 animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-none">
          {toastMessage}
        </div>
      )}

      {/* Floating System Feature Matrix Trigger Pill (Persistent) */}
      <button
        onClick={() => setActiveTab('matrix')}
        className="fixed bottom-4 right-4 z-30 px-3.5 py-2 rounded-full bg-indigo-600/90 hover:bg-indigo-600 text-white shadow-2xl backdrop-blur-xl border border-white/20 flex items-center gap-2 text-xs font-bold transition-transform hover:scale-105 active:scale-95"
        title="Open Feature Matrix & Inspector (290/290 Features)"
      >
        <Layers size={15} />
        <span>Feature Matrix (290/290)</span>
      </button>

      {/* FaceTime Video & Voice Call Modal */}
      <ActiveCallModal />

      {/* Screen Effects Particle Overlay (Confetti, Lasers, Fireworks) */}
      <ScreenEffects
        effect={activeScreenEffect}
        onComplete={() => setActiveScreenEffect('none')}
      />

      {/* Passcode Lock Screen */}
      <PasscodeLockScreen />

      {/* Sitewide Google Drive Modals */}
      {activeMediaModal === 'add_media' && <AddMediaModal />}
      {activeMediaModal === 'embed_picker' && <EmbedMediaPickerModal />}
      {activeMediaModal === 'watch_room' && <WatchRoomModal />}
      {activeMediaModal === 'book_reader' && <BookReaderModal />}
      {activeMediaModal === 'image_lightbox' && <ImageLightboxModal />}
      {activeMediaModal === 'share_media' && <ShareMediaModal />}

      {/* Auxiliary Modals */}
      {activeModal === 'sticker_picker' && (
        <StickerDrawerModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'handwriting' && (
        <HandwritingModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'bill_splitter' && (
        <BillSplitterModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'tip_calculator' && (
        <TipCalculatorModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'digital_receipt' && (
        <DigitalReceiptModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'payment_qr' && (
        <PaymentQRModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'create_poll' && (
        <CreatePollModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'universal_search' && (
        <UniversalSearchModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'saved_places' && (
        <SavedPlacesModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'my_qr' && (
        <PaymentQRModal onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
