// Complete Type Definitions for Aether Super-App

import { GoogleDriveMediaItem } from './media';
export * from './media';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
  avatar: string;
  statusMessage: string;
  statusEmoji: string;
  statusExpiresAt?: number;
  isVerified: boolean;
  bio: string;
  theme: 'dark' | 'light' | 'system';
  contrast: 'normal' | 'high';
  accentColor: 'azure' | 'emerald' | 'violet' | 'coral' | 'amber' | 'cyan';
  fontSize: 'small' | 'default' | 'medium' | 'large' | 'xl';
  bubbleStyle: 'classic' | 'squircle' | 'compact';
  reducedMotion: boolean;
  pinLockEnabled: boolean;
  pinCode?: string;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  passkeyEnabled: boolean;
  recoveryKeyWords: string[];
  balance: number; // Aether Cash
  e2eeFingerprint: string;
  quietHoursEnabled: boolean;
  quietHoursStart: string; // "22:00"
  quietHoursEnd: string; // "07:00"
  doNotDisturb: boolean;
  focusMode: 'none' | 'work' | 'personal' | 'sleep' | 'fitness';
  notificationSound: string;
  readReceiptsEnabled: boolean;
  typingIndicatorsEnabled: boolean;
  disappearingTimerDefault: number;
}

export interface Contact {
  id: string;
  name: string;
  username: string;
  phone: string;
  avatar: string;
  statusMessage?: string;
  isOnline: boolean;
  lastSeen?: number;
  isFavorite: boolean;
  isBlocked: boolean;
  isVerified: boolean;
  notes?: string;
  customSound?: string;
  customTheme?: string;
  birthday?: string; // "MM-DD"
  safetyNumber: string;
  currentLocation?: { lat: number; lng: number; address: string; sharingUntil?: number };
}

export type MessageEffect = 'none' | 'slam' | 'loud' | 'gentle' | 'invisible_ink' | 'confetti' | 'lasers' | 'balloons' | 'fireworks' | 'hearts';

export interface PollOption {
  id: string;
  text: string;
  votes: string[]; // user IDs
}

export interface PollData {
  id: string;
  question: string;
  options: PollOption[];
  closed?: boolean;
}

export interface SurveyData {
  id: string;
  title: string;
  rating: number;
  responses: Record<string, number>;
}

export interface PaymentPayload {
  transactionId: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'declined';
  note?: string;
  isSplit?: boolean;
}

export interface LocationPayload {
  lat: number;
  lng: number;
  address: string;
  isLive?: boolean;
  expiresAt?: number;
  etaMinutes?: number;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: number;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  protocol: 'internet' | 'sms';
  edited?: boolean;
  editHistory?: { text: string; timestamp: number }[];
  unsent?: boolean;
  deletedForMe?: boolean;
  deletedForEveryone?: boolean;
  replyToMessageId?: string;
  forwardedFrom?: string;
  isPinned?: boolean;
  isStarred?: boolean;
  disappearsInSeconds?: number;
  disappearsAt?: number;
  reactions: Record<string, string[]>; // emoji -> [userIds]
  threadCount?: number;
  isDraft?: boolean;
  poll?: PollData;
  survey?: SurveyData;
  isAnnouncement?: boolean;
  reminderAt?: number;
  effect?: MessageEffect;
  mediaType?: 'image' | 'video' | 'audio' | 'voice_note' | 'file' | 'sticker' | 'gif' | 'payment' | 'location' | 'handwriting' | 'live_photo' | 'google_drive';
  mediaUrl?: string;
  mediaData?: GoogleDriveMediaItem;
  fileName?: string;
  fileSize?: number;
  audioDuration?: number;
  waveformData?: number[];
  paymentData?: PaymentPayload;
  locationData?: LocationPayload;
  isEncrypted?: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  isGroup: boolean;
  participantIds: string[];
  unreadCount: number;
  lastMessage?: Message;
  isPinned: boolean;
  isArchived: boolean;
  folder?: string;
  tags?: string[];
  avatar?: string;
  theme?: string;
  wallpaper?: string;
  disappearingTimer?: number;
  mutedUntil?: number;
  draftText?: string;
  e2eeVerified?: boolean;
  typingUsers?: string[];
  adminIds?: string[];
  inviteCode?: string;
  description?: string;
}

export interface CallParticipant {
  id: string;
  name: string;
  avatar: string;
  isMuted: boolean;
  isVideoEnabled: boolean;
  isHandRaised: boolean;
  isSpeaking: boolean;
  stream?: MediaStream;
}

export interface CallState {
  status: 'idle' | 'outgoing' | 'incoming' | 'connected' | 'on_hold' | 'ended';
  callType: 'voice' | 'video';
  conversationId?: string;
  peerId?: string;
  peerName?: string;
  peerAvatar?: string;
  startedAt?: number;
  durationSeconds: number;
  isMuted: boolean;
  isVideoEnabled: boolean;
  isSpeaker: boolean;
  isScreenSharing: boolean;
  isRecording: boolean;
  isBlurEnabled: boolean;
  activeVirtualBg?: string;
  participants: CallParticipant[];
  audioNoiseCancellation: boolean;
  echoCancellation: boolean;
  audioBitrate: 'hd' | 'balanced' | 'saver';
}

export interface CallHistoryItem {
  id: string;
  contactId: string;
  contactName: string;
  contactAvatar: string;
  type: 'voice' | 'video';
  direction: 'incoming' | 'outgoing' | 'missed';
  timestamp: number;
  durationSeconds: number;
  callLink?: string;
  recordingUrl?: string;
}

export interface Transaction {
  id: string;
  type: 'send' | 'request' | 'bill_split' | 'refund' | 'top_up' | 'cash_out';
  otherPartyId: string;
  otherPartyName: string;
  amount: number;
  currency: string;
  description: string;
  timestamp: number;
  status: 'completed' | 'pending' | 'declined' | 'refunded';
  category: 'dining' | 'groceries' | 'entertainment' | 'travel' | 'bills' | 'shopping' | 'transfer';
  receiptCode: string;
}

export interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  imageUrl?: string;
  caption?: string;
  timestamp: number;
  expiresAt: number;
  views: number;
  likes: number;
}

export interface SharedTask {
  id: string;
  conversationId: string;
  title: string;
  completed: boolean;
  assignedTo?: string;
  dueDate?: string;
}

export interface FeatureItem {
  id: string;
  category: string;
  name: string;
  description: string;
  status: 'Operational' | 'Hardware/Permission Dependent' | 'Simulated Integration';
  platformNotes: string;
  actionKey: string;
}
