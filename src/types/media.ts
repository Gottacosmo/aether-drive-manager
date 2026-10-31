// Complete TypeScript interfaces for Sitewide Google Drive Link Manager

export type GoogleDriveMediaType = 'movie' | 'music' | 'book' | 'document' | 'image';
export type MediaVisibility = 'private' | 'friends' | 'public';
export type PermissionStatus = 'public' | 'domain_restricted' | 'private_request_needed' | 'verified';

export interface GoogleDriveMediaItem {
  id: string;
  driveId: string; // The extracted file ID from drive.google.com
  originalUrl: string;
  previewUrl: string; // Google Drive iframe preview URL
  downloadUrl?: string; // Direct download / stream URL
  thumbnailUrl: string;
  title: string;
  description: string;
  category: GoogleDriveMediaType;
  mimeType?: string;
  fileSizeFormatted?: string;
  collectionId?: string;
  collectionName?: string;
  visibility: MediaVisibility;
  addedBy: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: number;
  updatedAt: number;
  duration?: number; // In seconds for movies/music
  pageCount?: number; // For books/documents
  dimensions?: { width: number; height: number }; // For images
  permissionStatus: PermissionStatus;
  tags: string[];
  playCount: number;
  likes: number;
}

export interface MediaCollection {
  id: string;
  title: string;
  description: string;
  category: GoogleDriveMediaType | 'mixed';
  coverImage?: string;
  itemCount: number;
  isPublic: boolean;
  visibility: MediaVisibility;
  ownerId: string;
  ownerName: string;
  createdAt: number;
  updatedAt: number;
}

export interface WatchRoomParticipant {
  id: string;
  name: string;
  avatar: string;
  isHost: boolean;
}

export interface WatchRoomMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: number;
}

export interface WatchRoom {
  id: string;
  title: string;
  mediaItem: GoogleDriveMediaItem;
  hostId: string;
  hostName: string;
  hostAvatar: string;
  currentTime: number;
  isPlaying: boolean;
  participants: WatchRoomParticipant[];
  messages: WatchRoomMessage[];
  updatedAt: number;
}

export interface MusicPlaylist {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  trackIds: string[];
  ownerId: string;
  ownerName: string;
  isPublic: boolean;
  createdAt: number;
}

export interface DriveUrlParseResult {
  isValid: boolean;
  driveId: string;
  originalUrl: string;
  previewUrl: string;
  downloadUrl: string;
  thumbnailUrl: string;
  detectedType: GoogleDriveMediaType;
  inferredTitle: string;
  permissionStatus: PermissionStatus;
  isFolder: boolean;
}
