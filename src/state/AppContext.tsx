import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  UserProfile,
  Contact,
  Conversation,
  Message,
  Transaction,
  Story,
  SharedTask,
  CallState,
  MessageEffect,
} from '../types';
import { StorageService, INITIAL_USER } from '../services/storage';
import { audioSynth } from '../services/audioSynthesizer';
import { webrtcService } from '../services/webrtcService';
import { syncBus } from '../services/syncBus';
import { CryptoService } from '../services/cryptoService';

export interface AppContextType {
  user: UserProfile;
  contacts: Contact[];
  conversations: Conversation[];
  messages: Message[];
  transactions: Transaction[];
  stories: Story[];
  tasks: SharedTask[];
  activeConversationId: string;
  activeTab: 'messages' | 'calls' | 'contacts' | 'location' | 'finance' | 'social' | 'settings' | 'matrix' | 'watch' | 'music' | 'reading' | 'documents' | 'gallery' | 'shared_media';
  callState: CallState;
  isLocked: boolean;
  privacyShield: boolean;
  activeModal: string | null;
  searchQuery: string;
  smsMode: boolean;
  activeScreenEffect: MessageEffect;
  
  // Setters & Navigators
  setActiveTab: (tab: 'messages' | 'calls' | 'contacts' | 'location' | 'finance' | 'social' | 'settings' | 'matrix' | 'watch' | 'music' | 'reading' | 'documents' | 'gallery' | 'shared_media') => void;
  setActiveConversationId: (id: string) => void;
  setActiveModal: (modal: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSmsMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  setIsLocked: (locked: boolean) => void;
  setPrivacyShield: (shield: boolean) => void;
  setActiveScreenEffect: (effect: MessageEffect) => void;

  // Messaging Actions
  sendMessage: (text: string, options?: Partial<Message>) => Promise<void>;
  editMessage: (messageId: string, newText: string) => void;
  unsendMessage: (messageId: string) => void;
  deleteMessage: (messageId: string, forEveryone: boolean) => void;
  addReaction: (messageId: string, emoji: string) => void;
  togglePinMessage: (messageId: string) => void;
  toggleStarMessage: (messageId: string) => void;
  votePoll: (pollId: string, optionId: string) => void;

  // Calling Actions
  startCall: (type: 'voice' | 'video', contactId?: string) => Promise<void>;
  answerCall: () => void;
  declineCall: () => void;
  endCall: () => void;
  toggleMute: () => void;
  toggleVideo: () => void;
  toggleSpeaker: () => void;
  toggleScreenShare: () => Promise<void>;
  toggleBackgroundBlur: () => void;
  toggleRecording: () => void;
  toggleHold: () => void;

  // Finance Actions
  sendPayment: (contactId: string, amount: number, note: string) => void;
  requestPayment: (contactId: string, amount: number, note: string) => void;
  splitBill: (title: string, amount: number, tipPct: number, participantIds: string[]) => void;
  topUpBalance: (amount: number) => void;

  // Feature Matrix Action Handler
  executeFeatureAction: (actionKey: string) => void;

  // Settings & System
  updateUser: (updates: Partial<UserProfile>) => void;
  exportDatabaseJSON: () => void;
  clearCache: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState = StorageService.loadState();

  const [user, setUser] = useState<UserProfile>(initialState.user || INITIAL_USER);
  const [contacts, setContacts] = useState<Contact[]>(initialState.contacts || []);
  const [conversations, setConversations] = useState<Conversation[]>(initialState.conversations || []);
  const [messages, setMessages] = useState<Message[]>(initialState.messages || []);
  const [transactions, setTransactions] = useState<Transaction[]>(initialState.transactions || []);
  const [stories, setStories] = useState<Story[]>(initialState.stories || []);
  const [tasks, setTasks] = useState<SharedTask[]>(initialState.tasks || []);

  const [activeConversationId, setActiveConversationId] = useState<string>('conv_elena');
  const [activeTab, setActiveTab] = useState<'messages' | 'calls' | 'contacts' | 'location' | 'finance' | 'social' | 'settings' | 'matrix' | 'watch' | 'music' | 'reading' | 'documents' | 'gallery' | 'shared_media'>('messages');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [smsMode, setSmsMode] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [privacyShield, setPrivacyShield] = useState<boolean>(false);
  const [activeScreenEffect, setActiveScreenEffect] = useState<MessageEffect>('none');

  const [callState, setCallState] = useState<CallState>({
    status: 'idle',
    callType: 'voice',
    durationSeconds: 0,
    isMuted: false,
    isVideoEnabled: false,
    isSpeaker: false,
    isScreenSharing: false,
    isRecording: false,
    isBlurEnabled: false,
    participants: [],
    audioNoiseCancellation: true,
    echoCancellation: true,
    audioBitrate: 'hd',
  });

  // Save to LocalStorage whenever critical data changes
  useEffect(() => {
    StorageService.saveState({
      user,
      contacts,
      conversations,
      messages,
      transactions,
      stories,
      tasks,
    });
  }, [user, contacts, conversations, messages, transactions, stories, tasks]);

  // Apply Theme and Font Settings to root document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', user.theme);
    document.documentElement.setAttribute('data-contrast', user.contrast);
    document.documentElement.setAttribute('data-accent', user.accentColor);
    document.documentElement.setAttribute('data-bubble', user.bubbleStyle);
    if (user.reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [user.theme, user.contrast, user.accentColor, user.bubbleStyle, user.reducedMotion]);

  // Window Focus / Privacy Shield detection
  useEffect(() => {
    const handleBlur = () => {
      if (user.pinLockEnabled) {
        setPrivacyShield(true);
      }
    };
    const handleFocus = () => {
      setPrivacyShield(false);
    };
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [user.pinLockEnabled]);

  // Call Duration Timer
  useEffect(() => {
    let interval: number | null = null;
    if (callState.status === 'connected') {
      interval = window.setInterval(() => {
        setCallState((prev) => ({ ...prev, durationSeconds: prev.durationSeconds + 1 }));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callState.status]);

  // Subscribe to BroadcastChannel sync events
  useEffect(() => {
    const unsubMessage = syncBus.subscribe('NEW_MESSAGE', (evt) => {
      const msg = evt.data as Message;
      setMessages((prev) => [...prev, msg]);
      audioSynth.playChime(user.notificationSound);
    });

    const unsubTyping = syncBus.subscribe('TYPING_STATUS', (evt) => {
      const { convId, userName } = evt.data as { convId: string; userName: string };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId
            ? { ...c, typingUsers: Array.from(new Set([...(c.typingUsers || []), userName])) }
            : c
        )
      );
      setTimeout(() => {
        setConversations((prev) =>
          prev.map((c) =>
            c.id === convId
              ? { ...c, typingUsers: (c.typingUsers || []).filter((u) => u !== userName) }
              : c
          )
        );
      }, 3500);
    });

    const unsubCall = syncBus.subscribe('CALL_INITIATED', (evt) => {
      const { callerName, type } = evt.data as { callerName: string; type: 'voice' | 'video' };
      audioSynth.startIncomingRingtone();
      setCallState((prev) => ({
        ...prev,
        status: 'incoming',
        callType: type,
        peerName: callerName,
        durationSeconds: 0,
      }));
    });

    return () => {
      unsubMessage();
      unsubTyping();
      unsubCall();
    };
  }, [user.notificationSound]);

  // Send Message
  const sendMessage = useCallback(
    async (text: string, options: Partial<Message> = {}) => {
      if (!text.trim() && !options.mediaUrl && !options.mediaType && !options.poll && !options.paymentData) {
        return;
      }

      const activeConv = conversations.find((c) => c.id === activeConversationId);
      const isSms = smsMode;

      const newMsg: Message = {
        id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        conversationId: activeConversationId,
        senderId: user.id,
        text,
        timestamp: Date.now(),
        status: 'sending',
        protocol: isSms ? 'sms' : 'internet',
        reactions: {},
        isEncrypted: !isSms,
        ...options,
      };

      // Add to messages list
      setMessages((prev) => [...prev, newMsg]);

      // Trigger effects if specified
      if (options.effect && options.effect !== 'none') {
        setActiveScreenEffect(options.effect);
        if (options.effect === 'slam') audioSynth.playSlam();
        else if (options.effect === 'lasers') audioSynth.playLaser();
        else if (options.effect === 'confetti' || options.effect === 'balloons' || options.effect === 'fireworks') audioSynth.playConfetti();
        setTimeout(() => setActiveScreenEffect('none'), 3500);
      } else {
        audioSynth.playChime(user.notificationSound);
      }

      // Sync bus publish
      syncBus.publish('NEW_MESSAGE', newMsg);

      // Transition delivery status: sending -> sent -> delivered
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) => (m.id === newMsg.id ? { ...m, status: 'sent' } : m))
        );
      }, 350);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) => (m.id === newMsg.id ? { ...m, status: 'delivered' } : m))
        );
      }, 900);

      // If chatting with a contact, simulate realistic read receipt & reply
      if (activeConv && !activeConv.isGroup && activeConv.id !== 'conv_note_to_self') {
        const contact = contacts.find((c) => c.id === activeConv.participantIds.find((p) => p !== user.id));
        if (contact && contact.isOnline) {
          setTimeout(() => {
            setMessages((prev) =>
              prev.map((m) => (m.id === newMsg.id ? { ...m, status: 'read' } : m))
            );
          }, 2000);

          // Simulated intelligent peer response (pure deterministic script, strictly NO AI)
          setTimeout(() => {
            const peerReplies = [
              'Got it! Reviewing right now.',
              'Received on my Mac. Looks crystal clear!',
              'Agreed, that aligns perfectly with our plan.',
              'Super crisp. Love the Cupertino glass aesthetic!',
              'Saved. Let’s jump on a FaceTime call soon.',
            ];
            const chosen = peerReplies[Math.floor(Math.random() * peerReplies.length)];

            const replyMsg: Message = {
              id: 'msg_reply_' + Date.now(),
              conversationId: activeConversationId,
              senderId: contact.id,
              text: chosen,
              timestamp: Date.now(),
              status: 'delivered',
              protocol: isSms ? 'sms' : 'internet',
              reactions: {},
              isEncrypted: !isSms,
            };

            setMessages((prev) => [...prev, replyMsg]);
            audioSynth.playChime(contact.customSound || user.notificationSound);
          }, 4500);
        }
      }
    },
    [activeConversationId, conversations, smsMode, user, contacts]
  );

  // Edit Message
  const editMessage = useCallback((messageId: string, newText: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId
          ? {
              ...m,
              text: newText,
              edited: true,
              editHistory: [...(m.editHistory || []), { text: m.text, timestamp: Date.now() }],
            }
          : m
      )
    );
  }, []);

  // Unsend Message
  const unsendMessage = useCallback((messageId: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId
          ? { ...m, unsent: true, text: 'You unsent a message' }
          : m
      )
    );
  }, []);

  // Delete Message
  const deleteMessage = useCallback((messageId: string, forEveryone: boolean) => {
    if (forEveryone) {
      setMessages((prev) => prev.filter((m) => m.id !== messageId));
    } else {
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, deletedForMe: true } : m))
      );
    }
  }, []);

  // Add Tapback Reaction
  const addReaction = useCallback((messageId: string, emoji: string) => {
    audioSynth.playTapback();
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== messageId) return m;
        const current = m.reactions[emoji] || [];
        const hasReacted = current.includes(user.id);
        const updated = hasReacted ? current.filter((id) => id !== user.id) : [...current, user.id];
        const newReactions = { ...m.reactions, [emoji]: updated };
        if (updated.length === 0) delete newReactions[emoji];
        return { ...m, reactions: newReactions };
      })
    );
  }, [user.id]);

  // Toggle Pin
  const togglePinMessage = useCallback((messageId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, isPinned: !m.isPinned } : m))
    );
  }, []);

  // Toggle Star
  const toggleStarMessage = useCallback((messageId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, isStarred: !m.isStarred } : m))
    );
  }, []);

  // Poll Voting
  const votePoll = useCallback((pollId: string, optionId: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (!m.poll || m.poll.id !== pollId) return m;
        const updatedOptions = m.poll.options.map((opt) => {
          if (opt.id === optionId) {
            const hasVoted = opt.votes.includes(user.id);
            return {
              ...opt,
              votes: hasVoted ? opt.votes.filter((u) => u !== user.id) : [...opt.votes, user.id],
            };
          }
          return {
            ...opt,
            votes: opt.votes.filter((u) => u !== user.id), // Single choice
          };
        });
        return { ...m, poll: { ...m.poll, options: updatedOptions } };
      })
    );
  }, [user.id]);

  // Calling Actions
  const startCall = useCallback(
    async (type: 'voice' | 'video', contactId?: string) => {
      const targetContact = contactId ? contacts.find((c) => c.id === contactId) : contacts[0];
      const peerName = targetContact ? targetContact.name : 'Elena Rostova';
      const peerAvatar = targetContact ? targetContact.avatar : '';

      audioSynth.startOutgoingRingtone();
      setCallState({
        status: 'outgoing',
        callType: type,
        peerId: targetContact?.id,
        peerName,
        peerAvatar,
        durationSeconds: 0,
        isMuted: false,
        isVideoEnabled: type === 'video',
        isSpeaker: false,
        isScreenSharing: false,
        isRecording: false,
        isBlurEnabled: false,
        participants: [
          {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            isMuted: false,
            isVideoEnabled: type === 'video',
            isHandRaised: false,
            isSpeaking: false,
          },
        ],
        audioNoiseCancellation: true,
        echoCancellation: true,
        audioBitrate: 'hd',
      });

      // Request media
      await webrtcService.getLocalMedia(type === 'video', true, true);

      // Auto connect after 2.5s simulated ringing
      setTimeout(() => {
        audioSynth.stopRingtone();
        setCallState((prev) => ({
          ...prev,
          status: 'connected',
          startedAt: Date.now(),
          participants: [
            ...prev.participants,
            {
              id: targetContact?.id || 'contact_peer',
              name: peerName,
              avatar: peerAvatar,
              isMuted: false,
              isVideoEnabled: type === 'video',
              isHandRaised: false,
              isSpeaking: true,
            },
          ],
        }));
      }, 2500);
    },
    [contacts, user]
  );

  const answerCall = useCallback(() => {
    audioSynth.stopRingtone();
    setCallState((prev) => ({
      ...prev,
      status: 'connected',
      startedAt: Date.now(),
      participants: [
        {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          isMuted: false,
          isVideoEnabled: prev.callType === 'video',
          isHandRaised: false,
          isSpeaking: false,
        },
        {
          id: 'contact_caller',
          name: prev.peerName || 'Incoming Caller',
          avatar: prev.peerAvatar || '',
          isMuted: false,
          isVideoEnabled: prev.callType === 'video',
          isHandRaised: false,
          isSpeaking: true,
        },
      ],
    }));
  }, [user]);

  const declineCall = useCallback(() => {
    audioSynth.stopRingtone();
    setCallState((prev) => ({ ...prev, status: 'idle' }));
  }, []);

  const endCall = useCallback(() => {
    audioSynth.stopRingtone();
    webrtcService.stopAll();
    setCallState((prev) => ({ ...prev, status: 'idle', durationSeconds: 0 }));
  }, []);

  const toggleMute = useCallback(() => {
    audioSynth.playTapback();
    setCallState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  }, []);

  const toggleVideo = useCallback(() => {
    audioSynth.playTapback();
    setCallState((prev) => ({ ...prev, isVideoEnabled: !prev.isVideoEnabled }));
  }, []);

  const toggleSpeaker = useCallback(() => {
    audioSynth.playTapback();
    setCallState((prev) => ({ ...prev, isSpeaker: !prev.isSpeaker }));
  }, []);

  const toggleScreenShare = useCallback(async () => {
    audioSynth.playTapback();
    if (!callState.isScreenSharing) {
      const stream = await webrtcService.getScreenShare();
      if (stream) {
        setCallState((prev) => ({ ...prev, isScreenSharing: true }));
      }
    } else {
      setCallState((prev) => ({ ...prev, isScreenSharing: false }));
    }
  }, [callState.isScreenSharing]);

  const toggleBackgroundBlur = useCallback(() => {
    audioSynth.playTapback();
    setCallState((prev) => ({ ...prev, isBlurEnabled: !prev.isBlurEnabled }));
  }, []);

  const toggleRecording = useCallback(() => {
    audioSynth.playTapback();
    setCallState((prev) => {
      const willRecord = !prev.isRecording;
      if (!willRecord) {
        webrtcService.stopRecording();
      }
      return { ...prev, isRecording: willRecord };
    });
  }, []);

  const toggleHold = useCallback(() => {
    audioSynth.playTapback();
    setCallState((prev) => ({
      ...prev,
      status: prev.status === 'on_hold' ? 'connected' : 'on_hold',
    }));
  }, []);

  // Finance Actions
  const sendPayment = useCallback(
    (contactId: string, amount: number, note: string) => {
      const contact = contacts.find((c) => c.id === contactId);
      const recipientName = contact ? contact.name : 'Recipient';
      const receiptCode = 'AETH-RCPT-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000);

      const tx: Transaction = {
        id: 'tx_' + Date.now(),
        type: 'send',
        otherPartyId: contactId,
        otherPartyName: recipientName,
        amount,
        currency: 'USD',
        description: note || 'Aether Cash Transfer',
        timestamp: Date.now(),
        status: 'completed',
        category: 'transfer',
        receiptCode,
      };

      // Deduct balance
      setUser((prev) => ({ ...prev, balance: prev.balance - amount }));
      setTransactions((prev) => [tx, ...prev]);

      // Insert transaction card message into active chat
      sendMessage('', {
        paymentData: {
          transactionId: tx.id,
          amount,
          currency: 'USD',
          status: 'completed',
          note: tx.description,
        },
      });

      audioSynth.playChime('pulse');
    },
    [contacts, sendMessage]
  );

  const requestPayment = useCallback(
    (contactId: string, amount: number, note: string) => {
      const contact = contacts.find((c) => c.id === contactId);
      const recipientName = contact ? contact.name : 'Contact';
      const receiptCode = 'AETH-INVOICE-' + Math.floor(1000 + Math.random() * 9000);

      const tx: Transaction = {
        id: 'tx_req_' + Date.now(),
        type: 'request',
        otherPartyId: contactId,
        otherPartyName: recipientName,
        amount,
        currency: 'USD',
        description: note || 'Payment Request',
        timestamp: Date.now(),
        status: 'pending',
        category: 'transfer',
        receiptCode,
      };

      setTransactions((prev) => [tx, ...prev]);

      sendMessage('', {
        paymentData: {
          transactionId: tx.id,
          amount,
          currency: 'USD',
          status: 'pending',
          note: `Requested $${amount.toFixed(2)}: ${note}`,
        },
      });
    },
    [contacts, sendMessage]
  );

  const splitBill = useCallback(
    (title: string, amount: number, tipPct: number, participantIds: string[]) => {
      const total = amount * (1 + tipPct / 100);
      const perPerson = total / (participantIds.length + 1); // User + participants

      participantIds.forEach((pid) => {
        requestPayment(pid, perPerson, `${title} (Split bill share)`);
      });

      setActiveModal(null);
    },
    [requestPayment]
  );

  const topUpBalance = useCallback((amount: number) => {
    setUser((prev) => ({ ...prev, balance: prev.balance + amount }));
    const tx: Transaction = {
      id: 'tx_topup_' + Date.now(),
      type: 'top_up',
      otherPartyId: 'bank_account',
      otherPartyName: 'Verified Bank',
      amount,
      currency: 'USD',
      description: 'Aether Cash Deposit',
      timestamp: Date.now(),
      status: 'completed',
      category: 'transfer',
      receiptCode: 'AETH-DEP-' + Math.floor(1000 + Math.random() * 9000),
    };
    setTransactions((prev) => [tx, ...prev]);
  }, []);

  // Universal Action Dispatcher for all 290 cataloged features
  const executeFeatureAction = useCallback(
    (actionKey: string) => {
      switch (actionKey) {
        // Messaging
        case 'open_chat':
          setActiveTab('messages');
          break;
        case 'toggle_sms_mode':
          setSmsMode((prev) => !prev);
          break;
        case 'toggle_read_receipts':
          setUser((prev) => ({ ...prev, readReceiptsEnabled: !prev.readReceiptsEnabled }));
          break;
        case 'simulate_typing':
          syncBus.publish('TYPING_STATUS', { convId: activeConversationId, userName: 'Elena Rostova' });
          break;
        case 'open_schedule_modal':
          setActiveModal('schedule_message');
          break;
        case 'set_disappearing_timer':
          setActiveModal('disappearing_timer');
          break;
        case 'open_chat_search':
          setActiveModal('chat_search');
          break;
        case 'filter_unread':
          setSearchQuery('unread:true');
          break;
        case 'create_poll':
          setActiveModal('create_poll');
          break;
        case 'create_survey':
          setActiveModal('create_survey');
          break;
        case 'send_announcement':
          sendMessage('📢 **Priority Announcement**: Cupertino Design Summit commences at 14:00 UTC.', { isAnnouncement: true });
          break;

        // Stickers & Effects
        case 'open_gif_picker':
          setActiveModal('gif_picker');
          break;
        case 'open_trending_gifs':
          setActiveModal('trending_gifs');
          break;
        case 'open_stickers':
          setActiveModal('sticker_picker');
          break;
        case 'open_emoji_picker':
          setActiveModal('emoji_picker');
          break;
        case 'open_avatar_builder':
        case 'open_avatar_studio':
          setActiveModal('avatar_builder');
          break;
        case 'open_handwriting':
          setActiveModal('handwriting');
          break;
        case 'open_doodle':
          setActiveModal('doodle');
          break;
        case 'trigger_screen_effect':
          setActiveModal('screen_effects');
          break;

        // Calling
        case 'start_voice_call':
          startCall('voice');
          break;
        case 'start_video_call':
          startCall('video');
          break;
        case 'simulate_incoming_call':
          syncBus.publish('CALL_INITIATED', { callerName: 'Elena Rostova', type: 'video' });
          break;
        case 'open_call_history':
          setActiveTab('calls');
          break;
        case 'open_voicemail':
          setActiveTab('calls');
          setActiveModal('voicemail');
          break;
        case 'generate_call_link':
          navigator.clipboard?.writeText('https://aether.call/room/' + Math.random().toString(36).substring(2, 8));
          alert('Aether Call link copied to clipboard!');
          break;

        // Location
        case 'start_live_location':
        case 'drop_location_pin':
        case 'view_map_card':
        case 'open_radar_map':
          setActiveTab('location');
          break;
        case 'manage_saved_places':
          setActiveTab('location');
          setActiveModal('saved_places');
          break;
        case 'trigger_emergency_sos':
          sendMessage('🚨 **EMERGENCY SOS BROADCAST**: Immediate GPS beacon sent from Place de la Concorde (48.8566, 2.3522).');
          break;
        case 'stop_all_location_sharing':
          setContacts((prev) => prev.map((c) => ({ ...c, currentLocation: undefined })));
          alert('All active location sessions terminated.');
          break;

        // Finance
        case 'send_payment':
          setActiveTab('finance');
          setActiveModal('send_payment');
          break;
        case 'open_bill_splitter':
          setActiveTab('finance');
          setActiveModal('bill_splitter');
          break;
        case 'open_tip_calculator':
          setActiveTab('finance');
          setActiveModal('tip_calculator');
          break;
        case 'open_transactions':
          setActiveTab('finance');
          break;
        case 'generate_receipt':
          setActiveTab('finance');
          setActiveModal('digital_receipt');
          break;
        case 'show_payment_qr':
          setActiveTab('finance');
          setActiveModal('payment_qr');
          break;
        case 'top_up_balance':
          topUpBalance(250.0);
          alert('Deposited $250.00 into Aether Cash.');
          break;

        // Groups & Social
        case 'create_group':
          setActiveModal('new_group');
          break;
        case 'add_contact':
          setActiveTab('contacts');
          setActiveModal('new_contact');
          break;
        case 'show_my_qr':
          setActiveModal('my_qr');
          break;
        case 'create_story':
        case 'view_stories':
          setActiveTab('social');
          setActiveModal('stories');
          break;
        case 'open_shared_tasks':
          setActiveModal('shared_tasks');
          break;
        case 'open_sticky_notes':
          setActiveModal('sticky_notes');
          break;

        // Security & App
        case 'lock_app_now':
          setIsLocked(true);
          break;
        case 'test_e2ee_encryption':
          CryptoService.encryptPayload('Hello Aether E2EE!').then((res) => {
            alert(`Encrypted with Web Crypto AES-GCM 256:\nCiphertext: ${res.ciphertext.slice(0, 32)}...\nIV: ${res.iv}`);
          });
          break;
        case 'show_recovery_key':
          setActiveTab('settings');
          setActiveModal('recovery_key');
          break;
        case 'toggle_theme':
          setUser((prev) => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
          break;
        case 'toggle_high_contrast':
          setUser((prev) => ({ ...prev, contrast: prev.contrast === 'high' ? 'normal' : 'high' }));
          break;
        case 'open_feature_matrix':
          setActiveTab('matrix');
          break;
        case 'open_universal_search':
          setActiveModal('universal_search');
          break;
        case 'open_keyboard_shortcuts':
          setActiveModal('shortcuts');
          break;
        case 'open_account_settings':
          setActiveTab('settings');
          break;
        default:
          console.log(`Action triggered for ${actionKey}`);
          break;
      }
    },
    [activeConversationId, sendMessage, startCall, topUpBalance]
  );

  // Update User Profile
  const updateUser = useCallback((updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  }, []);

  // Export JSON Database
  const exportDatabaseJSON = useCallback(() => {
    const data = {
      user,
      contacts,
      conversations,
      messages,
      transactions,
      stories,
      tasks,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aether_Database_Export_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [user, contacts, conversations, messages, transactions, stories, tasks]);

  // Clear Cache
  const clearCache = useCallback(() => {
    StorageService.clearAll();
    window.location.reload();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        contacts,
        conversations,
        messages,
        transactions,
        stories,
        tasks,
        activeConversationId,
        activeTab,
        callState,
        isLocked,
        privacyShield,
        activeModal,
        searchQuery,
        smsMode,
        activeScreenEffect,
        setActiveTab,
        setActiveConversationId,
        setActiveModal,
        setSearchQuery,
        setSmsMode,
        setIsLocked,
        setPrivacyShield,
        setActiveScreenEffect,
        sendMessage,
        editMessage,
        unsendMessage,
        deleteMessage,
        addReaction,
        togglePinMessage,
        toggleStarMessage,
        votePoll,
        startCall,
        answerCall,
        declineCall,
        endCall,
        toggleMute,
        toggleVideo,
        toggleSpeaker,
        toggleScreenShare,
        toggleBackgroundBlur,
        toggleRecording,
        toggleHold,
        sendPayment,
        requestPayment,
        splitBill,
        topUpBalance,
        executeFeatureAction,
        updateUser,
        exportDatabaseJSON,
        clearCache,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
