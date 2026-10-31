import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  GoogleDriveMediaItem,
  MediaCollection,
  WatchRoom,
  GoogleDriveMediaType,
  MediaVisibility,
} from '../types/media';
import {
  INITIAL_MEDIA_ITEMS,
  INITIAL_COLLECTIONS,
  INITIAL_WATCH_ROOMS,
} from '../services/initialMedia';
import { GoogleDriveService } from '../services/googleDriveService';
import { useApp } from './AppContext';

export interface MediaContextType {
  mediaItems: GoogleDriveMediaItem[];
  collections: MediaCollection[];
  watchRooms: WatchRoom[];
  activeWatchRoom: WatchRoom | null;
  activeAudioTrack: GoogleDriveMediaItem | null;
  isPlayingAudio: boolean;
  audioProgress: number;
  audioDuration: number;
  audioVolume: number;
  activeMediaModal: 'add_media' | 'embed_picker' | 'watch_room' | 'book_reader' | 'image_lightbox' | 'share_media' | null;
  modalTargetItem: GoogleDriveMediaItem | null;
  onEmbedSelectCallback: ((item: GoogleDriveMediaItem) => void) | null;
  toastMessage: string | null;

  // Actions
  addMediaItems: (newItems: Partial<GoogleDriveMediaItem>[]) => GoogleDriveMediaItem[];
  updateMediaItem: (id: string, updates: Partial<GoogleDriveMediaItem>) => void;
  deleteMediaItem: (id: string) => void;
  createCollection: (title: string, description: string, category: GoogleDriveMediaType | 'mixed', visibility: MediaVisibility) => MediaCollection;
  deleteCollection: (id: string) => void;
  
  // Audio Player
  playAudioTrack: (item: GoogleDriveMediaItem) => void;
  pauseAudio: () => void;
  toggleAudio: () => void;
  seekAudio: (seconds: number) => void;
  setAudioVolume: (volume: number) => void;

  // Watch Rooms
  createWatchRoom: (mediaItem: GoogleDriveMediaItem, title: string) => WatchRoom;
  openWatchRoom: (room: WatchRoom) => void;
  syncWatchRoom: (time: number, isPlaying: boolean) => void;
  sendWatchRoomMessage: (text: string) => void;
  leaveWatchRoom: () => void;

  // Modals & Navigation
  openAddMediaModal: () => void;
  openEmbedPicker: (onSelect: (item: GoogleDriveMediaItem) => void) => void;
  openBookReader: (item: GoogleDriveMediaItem) => void;
  openImageLightbox: (item: GoogleDriveMediaItem) => void;
  openShareModal: (item: GoogleDriveMediaItem) => void;
  closeMediaModal: () => void;
  showToast: (msg: string) => void;
}

const MediaContext = createContext<MediaContextType | null>(null);

const STORAGE_KEY_MEDIA = 'aether_drive_media_items_v2';
const STORAGE_KEY_COLLECTIONS = 'aether_drive_collections_v2';
const STORAGE_KEY_WATCHROOMS = 'aether_drive_watchrooms_v2';

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useApp();

  // Load Initial State from LocalStorage or Defaults
  const [mediaItems, setMediaItems] = useState<GoogleDriveMediaItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MEDIA);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_MEDIA_ITEMS;
  });

  const [collections, setCollections] = useState<MediaCollection[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COLLECTIONS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_COLLECTIONS;
  });

  const [watchRooms, setWatchRooms] = useState<WatchRoom[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WATCHROOMS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_WATCH_ROOMS;
  });

  // Active Modals & Targets
  const [activeMediaModal, setActiveMediaModal] = useState<MediaContextType['activeMediaModal']>(null);
  const [modalTargetItem, setModalTargetItem] = useState<GoogleDriveMediaItem | null>(null);
  const [onEmbedSelectCallback, setOnEmbedSelectCallback] = useState<((item: GoogleDriveMediaItem) => void) | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Watch Room Realtime State
  const [activeWatchRoom, setActiveWatchRoom] = useState<WatchRoom | null>(null);

  // Sitewide Persistent Audio State
  const [activeAudioTrack, setActiveAudioTrack] = useState<GoogleDriveMediaItem | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioVolume, setAudioVolume] = useState(0.85);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Persist State Changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MEDIA, JSON.stringify(mediaItems));
    } catch {}
  }, [mediaItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COLLECTIONS, JSON.stringify(collections));
    } catch {}
  }, [collections]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WATCHROOMS, JSON.stringify(watchRooms));
    } catch {}
  }, [watchRooms]);

  // Toast notifier
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 3200);
  }, []);

  // Sync with backend API if available (Render node server)
  useEffect(() => {
    const fetchRemote = async () => {
      try {
        const res = await fetch('/api/media');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setMediaItems(data);
          }
        }
      } catch {
        // Fallback to client-side localStorage
      }
    };
    fetchRemote();
  }, []);

  // Web Audio Setup for Sitewide Persistent Audio Player
  useEffect(() => {
    const audio = new Audio();
    audio.volume = audioVolume;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setAudioProgress(audio.currentTime);
    };
    const handleLoadedMetadata = () => {
      setAudioDuration(audio.duration || 0);
    };
    const handleEnded = () => {
      setIsPlayingAudio(false);
      setAudioProgress(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Handle Play / Pause for Persistent Audio Track
  const playAudioTrack = useCallback((item: GoogleDriveMediaItem) => {
    setActiveAudioTrack(item);
    setIsPlayingAudio(true);

    if (audioRef.current) {
      const src = item.downloadUrl || item.previewUrl;
      if (audioRef.current.src !== src) {
        audioRef.current.src = src;
      }
      audioRef.current.play().catch(() => {
        // Playback error fallback
      });
    }
  }, []);

  const pauseAudio = useCallback(() => {
    setIsPlayingAudio(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const toggleAudio = useCallback(() => {
    if (!activeAudioTrack) return;
    if (isPlayingAudio) {
      pauseAudio();
    } else {
      setIsPlayingAudio(true);
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [activeAudioTrack, isPlayingAudio, pauseAudio]);

  const seekAudio = useCallback((seconds: number) => {
    setAudioProgress(seconds);
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
    }
  }, []);

  const setAudioVolumeHandler = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setAudioVolume(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  }, []);

  // Add Media Items (Single or Multi-link)
  const addMediaItems = useCallback(
    (newItems: Partial<GoogleDriveMediaItem>[]): GoogleDriveMediaItem[] => {
      const createdItems: GoogleDriveMediaItem[] = newItems.map((item) => {
        const driveId = item.driveId || GoogleDriveService.extractDriveId(item.originalUrl || '').id || 'drive_' + Math.random().toString(36).substring(2, 9);
        const category = item.category || 'movie';
        const now = Date.now();

        return {
          id: 'media_' + Math.random().toString(36).substring(2, 10),
          driveId,
          originalUrl: item.originalUrl || `https://drive.google.com/file/d/${driveId}/view`,
          previewUrl: item.previewUrl || `https://drive.google.com/file/d/${driveId}/preview`,
          downloadUrl: item.downloadUrl || `https://docs.google.com/uc?export=download&id=${driveId}`,
          thumbnailUrl: item.thumbnailUrl || `https://drive.google.com/thumbnail?id=${driveId}&sz=w800`,
          title: item.title || 'Untitled Google Drive Media',
          description: item.description || '',
          category,
          mimeType: item.mimeType || (category === 'movie' ? 'video/mp4' : category === 'music' ? 'audio/mpeg' : category === 'book' || category === 'document' ? 'application/pdf' : 'image/jpeg'),
          fileSizeFormatted: item.fileSizeFormatted || '12.5 MB',
          collectionId: item.collectionId,
          collectionName: item.collectionName,
          visibility: item.visibility || 'public',
          addedBy: {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
          },
          createdAt: now,
          updatedAt: now,
          duration: item.duration || (category === 'movie' ? 720 : category === 'music' ? 240 : undefined),
          pageCount: item.pageCount || (category === 'book' ? 320 : category === 'document' ? 24 : undefined),
          dimensions: item.dimensions || (category === 'image' ? { width: 1920, height: 1080 } : undefined),
          permissionStatus: item.permissionStatus || 'public',
          tags: item.tags || [category.toUpperCase(), 'Google Drive'],
          playCount: 1,
          likes: 0,
        };
      });

      setMediaItems((prev) => [...createdItems, ...prev]);

      // Update collection itemCounts
      for (const item of createdItems) {
        if (item.collectionId) {
          setCollections((prevCols) =>
            prevCols.map((c) =>
              c.id === item.collectionId ? { ...c, itemCount: c.itemCount + 1, updatedAt: Date.now() } : c
            )
          );
        }
      }

      showToast(`Successfully added ${createdItems.length} Google Drive media link${createdItems.length > 1 ? 's' : ''}!`);
      return createdItems;
    },
    [user, showToast]
  );

  // Update Media Item
  const updateMediaItem = useCallback(
    (id: string, updates: Partial<GoogleDriveMediaItem>) => {
      setMediaItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updates, updatedAt: Date.now() } : item))
      );
      showToast('Media details updated.');
    },
    [showToast]
  );

  // Delete Media Item
  const deleteMediaItem = useCallback(
    (id: string) => {
      setMediaItems((prev) => {
        const item = prev.find((m) => m.id === id);
        if (item && item.collectionId) {
          setCollections((cols) =>
            cols.map((c) => (c.id === item.collectionId ? { ...c, itemCount: Math.max(0, c.itemCount - 1) } : c))
          );
        }
        return prev.filter((m) => m.id !== id);
      });
      showToast('Media item removed.');
    },
    [showToast]
  );

  // Create Collection
  const createCollection = useCallback(
    (
      title: string,
      description: string,
      category: GoogleDriveMediaType | 'mixed',
      visibility: MediaVisibility
    ): MediaCollection => {
      const newCol: MediaCollection = {
        id: 'col_' + Math.random().toString(36).substring(2, 9),
        title,
        description,
        category,
        coverImage:
          category === 'movie'
            ? 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800'
            : category === 'music'
            ? 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800'
            : category === 'book'
            ? 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800'
            : 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
        itemCount: 0,
        isPublic: visibility === 'public',
        visibility,
        ownerId: user.id,
        ownerName: user.name,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      setCollections((prev) => [newCol, ...prev]);
      showToast(`Collection "${title}" created.`);
      return newCol;
    },
    [user, showToast]
  );

  // Delete Collection
  const deleteCollection = useCallback(
    (id: string) => {
      setCollections((prev) => prev.filter((c) => c.id !== id));
      showToast('Collection removed.');
    },
    [showToast]
  );

  // Watch Room Operations
  const createWatchRoom = useCallback(
    (mediaItem: GoogleDriveMediaItem, title: string): WatchRoom => {
      const newRoom: WatchRoom = {
        id: 'room_' + Math.random().toString(36).substring(2, 9),
        title: title || `Watch Party: ${mediaItem.title}`,
        mediaItem,
        hostId: user.id,
        hostName: user.name,
        hostAvatar: user.avatar,
        currentTime: 0,
        isPlaying: true,
        participants: [
          {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            isHost: true,
          },
        ],
        messages: [
          {
            id: 'msg_welcome_' + Date.now(),
            senderId: 'sys',
            senderName: 'Aether Watch Sync',
            senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
            text: `Welcome to ${title}! Google Drive video playback is synchronized for all participants.`,
            timestamp: Date.now(),
          },
        ],
        updatedAt: Date.now(),
      };

      setWatchRooms((prev) => [newRoom, ...prev]);
      setActiveWatchRoom(newRoom);
      setActiveMediaModal('watch_room');
      showToast('Watch Room created! Real-time sync enabled.');
      return newRoom;
    },
    [user, showToast]
  );

  const openWatchRoom = useCallback((room: WatchRoom) => {
    setActiveWatchRoom(room);
    setActiveMediaModal('watch_room');
  }, []);

  const syncWatchRoom = useCallback((time: number, isPlaying: boolean) => {
    setActiveWatchRoom((prev) => (prev ? { ...prev, currentTime: time, isPlaying, updatedAt: Date.now() } : null));
    setWatchRooms((rooms) =>
      rooms.map((r) =>
        activeWatchRoom && r.id === activeWatchRoom.id
          ? { ...r, currentTime: time, isPlaying, updatedAt: Date.now() }
          : r
      )
    );
  }, [activeWatchRoom]);

  const sendWatchRoomMessage = useCallback(
    (text: string) => {
      if (!activeWatchRoom || !text.trim()) return;
      const msg = {
        id: 'msg_' + Date.now(),
        senderId: user.id,
        senderName: user.name,
        senderAvatar: user.avatar,
        text: text.trim(),
        timestamp: Date.now(),
      };

      setActiveWatchRoom((prev) => (prev ? { ...prev, messages: [...prev.messages, msg] } : null));
      setWatchRooms((rooms) =>
        rooms.map((r) => (r.id === activeWatchRoom.id ? { ...r, messages: [...r.messages, msg] } : r))
      );
    },
    [activeWatchRoom, user]
  );

  const leaveWatchRoom = useCallback(() => {
    setActiveWatchRoom(null);
    if (activeMediaModal === 'watch_room') {
      setActiveMediaModal(null);
    }
  }, [activeMediaModal]);

  // Modal Handlers
  const openAddMediaModal = useCallback(() => {
    setActiveMediaModal('add_media');
    setModalTargetItem(null);
  }, []);

  const openEmbedPicker = useCallback((onSelect: (item: GoogleDriveMediaItem) => void) => {
    setOnEmbedSelectCallback(() => onSelect);
    setActiveMediaModal('embed_picker');
  }, []);

  const openBookReader = useCallback((item: GoogleDriveMediaItem) => {
    setModalTargetItem(item);
    setActiveMediaModal('book_reader');
  }, []);

  const openImageLightbox = useCallback((item: GoogleDriveMediaItem) => {
    setModalTargetItem(item);
    setActiveMediaModal('image_lightbox');
  }, []);

  const openShareModal = useCallback((item: GoogleDriveMediaItem) => {
    setModalTargetItem(item);
    setActiveMediaModal('share_media');
  }, []);

  const closeMediaModal = useCallback(() => {
    setActiveMediaModal(null);
    setModalTargetItem(null);
    setOnEmbedSelectCallback(null);
  }, []);

  return (
    <MediaContext.Provider
      value={{
        mediaItems,
        collections,
        watchRooms,
        activeWatchRoom,
        activeAudioTrack,
        isPlayingAudio,
        audioProgress,
        audioDuration,
        audioVolume,
        activeMediaModal,
        modalTargetItem,
        onEmbedSelectCallback,
        toastMessage,

        addMediaItems,
        updateMediaItem,
        deleteMediaItem,
        createCollection,
        deleteCollection,

        playAudioTrack,
        pauseAudio,
        toggleAudio,
        seekAudio,
        setAudioVolume: setAudioVolumeHandler,

        createWatchRoom,
        openWatchRoom,
        syncWatchRoom,
        sendWatchRoomMessage,
        leaveWatchRoom,

        openAddMediaModal,
        openEmbedPicker,
        openBookReader,
        openImageLightbox,
        openShareModal,
        closeMediaModal,
        showToast,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};
