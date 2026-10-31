import type { FeatureItem } from '../types/index.ts';

export const ALL_FEATURES: FeatureItem[] = [
  // --- 1. Text Messaging (25 Features) ---
  {
    id: 'FEAT-001',
    category: '1. Text Messaging',
    name: 'Real-Time Internet Messaging',
    description: 'Instant end-to-end messaging via real-time bus and reactive state with Azure blue bubbles.',
    status: 'Operational',
    platformNotes: 'BroadcastChannel + LocalStorage multi-window sync',
    actionKey: 'open_chat'
  },
  {
    id: 'FEAT-002',
    category: '1. Text Messaging',
    name: 'SMS/MMS Protocol Simulation',
    description: 'Toggle between internet Azure blue bubbles and Emerald green carrier SMS bubbles.',
    status: 'Operational',
    platformNotes: 'Protocol switcher with distinct green typography and carrier badge',
    actionKey: 'toggle_sms_mode'
  },
  {
    id: 'FEAT-003',
    category: '1. Text Messaging',
    name: 'Real-Time Delivery Status Badges',
    description: 'Granular status indicators showing Sending, Sent, Delivered, and Read with subtle checkmarks.',
    status: 'Operational',
    platformNotes: 'Deterministic lifecycle transitions',
    actionKey: 'view_message_status'
  },
  {
    id: 'FEAT-004',
    category: '1. Text Messaging',
    name: 'Read Receipts System',
    description: 'Timestamped read receipts with user toggle to enable or disable per profile.',
    status: 'Operational',
    platformNotes: 'Configurable in Settings > Privacy',
    actionKey: 'toggle_read_receipts'
  },
  {
    id: 'FEAT-005',
    category: '1. Text Messaging',
    name: 'Live Typing Indicators',
    description: 'Animated 3-dot bouncing bubble showing real-time participant typing activity.',
    status: 'Operational',
    platformNotes: 'Debounced typing event publisher with auto-expiry',
    actionKey: 'simulate_typing'
  },
  {
    id: 'FEAT-006',
    category: '1. Text Messaging',
    name: 'Message Editing with History',
    description: 'Edit sent messages within grace period with audit history and "Edited" marker.',
    status: 'Operational',
    platformNotes: 'Click edit on sent message with version history modal',
    actionKey: 'edit_message'
  },
  {
    id: 'FEAT-007',
    category: '1. Text Messaging',
    name: 'Message Unsending / Retract',
    description: 'Unsend a sent message within 15 minutes, removing it with a retract notice.',
    status: 'Operational',
    platformNotes: 'Cryptographic unsend broadcast with tombstone flag',
    actionKey: 'unsend_message'
  },
  {
    id: 'FEAT-008',
    category: '1. Text Messaging',
    name: 'Delete For Me vs Delete For Everyone',
    description: 'Granular message deletion with local removal or peer-wide removal options.',
    status: 'Operational',
    platformNotes: 'Permission-checked tombstone',
    actionKey: 'delete_message'
  },
  {
    id: 'FEAT-009',
    category: '1. Text Messaging',
    name: 'Inline Message Quoting & Reply',
    description: 'Swipe or click reply to quote a specific message with preview pill.',
    status: 'Operational',
    platformNotes: 'Quoted context preview above composer',
    actionKey: 'reply_message'
  },
  {
    id: 'FEAT-010',
    category: '1. Text Messaging',
    name: 'Message Forwarding',
    description: 'Forward existing messages, media, or polls to any contact or group conversation.',
    status: 'Operational',
    platformNotes: 'Forward dialog with conversation selector',
    actionKey: 'forward_message'
  },
  {
    id: 'FEAT-011',
    category: '1. Text Messaging',
    name: 'Conversation Message Pinning',
    description: 'Pin priority messages to the top header banner of any conversation.',
    status: 'Operational',
    platformNotes: 'Pinned bar with jump-to-source click action',
    actionKey: 'pin_message'
  },
  {
    id: 'FEAT-012',
    category: '1. Text Messaging',
    name: 'Starred / Bookmarked Messages',
    description: 'Star important messages for quick retrieval in the Starred Messages drawer.',
    status: 'Operational',
    platformNotes: 'Global bookmarked index accessible from Search bar',
    actionKey: 'star_message'
  },
  {
    id: 'FEAT-013',
    category: '1. Text Messaging',
    name: 'Scheduled Messages Queue',
    description: 'Schedule messages for future auto-dispatch with date and time picker.',
    status: 'Operational',
    platformNotes: 'Client-side scheduled queue manager with dispatch timers',
    actionKey: 'open_schedule_modal'
  },
  {
    id: 'FEAT-014',
    category: '1. Text Messaging',
    name: 'Disappearing Messages Countdown',
    description: 'Self-destructing messages with selectable lifespans (5s, 30s, 1m, 1h, 24h).',
    status: 'Operational',
    platformNotes: 'Active countdown timers with burning fuse visual indicator',
    actionKey: 'set_disappearing_timer'
  },
  {
    id: 'FEAT-015',
    category: '1. Text Messaging',
    name: 'Tapback Quick Reactions',
    description: 'Apple-style tapback popup: Heart, Thumbs Up, Thumbs Down, Haha, Exclamation, Question.',
    status: 'Operational',
    platformNotes: 'Tactile sound synthesis and reaction badges on bubble corners',
    actionKey: 'open_tapback'
  },
  {
    id: 'FEAT-016',
    category: '1. Text Messaging',
    name: 'Threaded Discussion Replies',
    description: 'View sub-threads for any message in a dedicated side panel.',
    status: 'Operational',
    platformNotes: 'Thread counter and slide-out thread conversation',
    actionKey: 'open_thread'
  },
  {
    id: 'FEAT-017',
    category: '1. Text Messaging',
    name: 'Persistent Conversation Drafts',
    description: 'Auto-saves unsent text per conversation with draft badges in the chat list.',
    status: 'Operational',
    platformNotes: 'LocalStorage backed per-conversation draft keys',
    actionKey: 'check_drafts'
  },
  {
    id: 'FEAT-018',
    category: '1. Text Messaging',
    name: 'In-Chat Keyword Search & Highlight',
    description: 'Search messages within current conversation with instant match highlighting.',
    status: 'Operational',
    platformNotes: 'Deterministic regex match highlighting in DOM',
    actionKey: 'open_chat_search'
  },
  {
    id: 'FEAT-019',
    category: '1. Text Messaging',
    name: 'Unread Messages Filter',
    description: 'One-click filter in conversation list to isolate unread conversations.',
    status: 'Operational',
    platformNotes: 'Filter toggle above conversation list',
    actionKey: 'filter_unread'
  },
  {
    id: 'FEAT-020',
    category: '1. Text Messaging',
    name: 'Absolute & Relative Timestamps',
    description: 'Hover or swipe on bubbles to reveal exact timestamps down to the second.',
    status: 'Operational',
    platformNotes: 'Microsecond timestamp tooltips on all bubbles',
    actionKey: 'show_timestamps'
  },
  {
    id: 'FEAT-021',
    category: '1. Text Messaging',
    name: 'Markdown Text Formatting',
    description: 'Support bold (**bold**), italic (*italic*), code (`code`), and strikethrough (~strike~).',
    status: 'Operational',
    platformNotes: 'Safe non-eval AST parser',
    actionKey: 'insert_markdown'
  },
  {
    id: 'FEAT-022',
    category: '1. Text Messaging',
    name: 'Interactive Chat Polls',
    description: 'Create multi-option polls with live vote tallies, percentage bars, and retract voting.',
    status: 'Operational',
    platformNotes: 'Interactive card component within message stream',
    actionKey: 'create_poll'
  },
  {
    id: 'FEAT-023',
    category: '1. Text Messaging',
    name: 'In-Chat Survey Cards',
    description: 'Publish 5-star rating surveys inside conversations with aggregate rating stats.',
    status: 'Operational',
    platformNotes: 'Interactive star rating card',
    actionKey: 'create_survey'
  },
  {
    id: 'FEAT-024',
    category: '1. Text Messaging',
    name: 'Channel Announcements',
    description: 'Special high-visibility announcement banners for group chats with megaphone badge.',
    status: 'Operational',
    platformNotes: 'Admin-exclusive message type',
    actionKey: 'send_announcement'
  },
  {
    id: 'FEAT-025',
    category: '1. Text Messaging',
    name: 'Message Reminder / Snooze',
    description: 'Set a snooze timer on any message to trigger an alert in 1h, tomorrow, or custom time.',
    status: 'Operational',
    platformNotes: 'Integrated with notification engine',
    actionKey: 'snooze_message'
  },

  // --- 2. GIFs, Stickers, and Emojis (17 Features) ---
  {
    id: 'FEAT-026',
    category: '2. GIFs, Stickers, and Emojis',
    name: 'GIF Search Directory',
    description: 'Categorized directory of GIFs with instant search by keyword.',
    status: 'Operational',
    platformNotes: 'Curated high-performance animated GIF repository',
    actionKey: 'open_gif_picker'
  },
  {
    id: 'FEAT-027',
    category: '2. GIFs, Stickers, and Emojis',
    name: 'Trending GIFs Feed',
    description: 'Curated feed of trending reaction GIFs with one-tap insertion into composer.',
    status: 'Operational',
    platformNotes: 'Direct thumbnail preview and send',
    actionKey: 'open_trending_gifs'
  },
  {
    id: 'FEAT-028',
    category: '2. GIFs, Stickers, and Emojis',
    name: 'Animated Stickers Library',
    description: '4 curated animated sticker packs: Expressive Cats, Tech Neon, Retro Pixel, Cute Kawaii.',
    status: 'Operational',
    platformNotes: 'Vector SVG and WebP animated sprites',
    actionKey: 'open_stickers'
  },
  {
    id: 'FEAT-029',
    category: '2. GIFs, Stickers, and Emojis',
    name: 'Emoji Picker with Categories & Recents',
    description: 'Searchable emoji picker with category tabs (Smileys, Animals, Food, Objects) and recents.',
    status: 'Operational',
    platformNotes: 'Unicode 15.0 emoji catalog with skin tone selector',
    actionKey: 'open_emoji_picker'
  },
  {
    id: 'FEAT-030',
    category: '2. GIFs, Stickers, and Emojis',
    name: 'Custom Emoji Importer',
    description: 'Import custom emoji graphics with custom shortcodes (:aether_star:, :rocket_blue:).',
    status: 'Operational',
    platformNotes: 'Client storage backed custom emoji registry',
    actionKey: 'add_custom_emoji'
  },
  {
    id: 'FEAT-031',
    category: '2. GIFs, Stickers, and Emojis',
    name: 'Avatar Sticker Generator',
    description: 'Mix-and-match facial features, hairstyles, glasses, and expressions to generate avatar stickers.',
    status: 'Operational',
    platformNotes: 'Procedural SVG face synthesizer',
    actionKey: 'open_avatar_builder'
  },
  {
    id: 'FEAT-032',
    category: '2. GIFs, Stickers, and Emojis',
    name: 'In-App Sticker Creator',
    description: 'Upload any image or draw a sticker with automatic white border outline effect.',
    status: 'Operational',
    platformNotes: 'Canvas 2D stroke composition',
    actionKey: 'create_sticker'
  },
  {
    id: 'FEAT-033',
    category: '2. GIFs, Stickers, and Emojis',
    name: 'Sticker Pack Manager',
    description: 'Browse, enable, disable, and reorder installed sticker collections.',
    status: 'Operational',
    platformNotes: 'Sticker management panel',
    actionKey: 'manage_sticker_packs'
  },
  {
    id: 'FEAT-034',
    category: '2. GIFs, Stickers, and Emojis',
    name: 'Photo Sticker Converter',
    description: 'Convert captured camera photos into peelable stickers with drop-shadow.',
    status: 'Operational',
    platformNotes: 'Canvas cutout filter',
    actionKey: 'photo_to_sticker'
  },
  {
    id: 'FEAT-035',
    category: '2. GIFs, Stickers, and Emojis',
    name: 'Calligraphy Text Sticker Maker',
    description: 'Generate stylish typographic badge stickers with custom fonts and gradient fills.',
    status: 'Operational',
    platformNotes: 'SVG typography renderer',
    actionKey: 'make_text_sticker'
  },
  {
    id: 'FEAT-036',
    category: '2. GIFs, Stickers, and Emojis',
    name: 'GIF Favorites Collection',
    description: 'Star GIFs into a personal Favorites drawer for instant 1-click sharing.',
    status: 'Operational',
    platformNotes: 'LocalStorage GIF bookmarks',
    actionKey: 'open_favorite_gifs'
  },
  {
    id: 'FEAT-037',
    category: '2. GIFs, Stickers, and Emojis',
    name: 'Reaction Peel-and-Place Stickers',
    description: 'Peel stickers and position them directly on top of specific message bubbles.',
    status: 'Operational',
    platformNotes: 'Coordinate overlay positioning on message bubbles',
    actionKey: 'place_reaction_sticker'
  },
  {
    id: 'FEAT-038',
    category: '2. GIFs, Stickers, and Emojis',
    name: 'Custom Profile Avatar Studio',
    description: 'Personalize user avatar with accessories, colors, and gradients.',
    status: 'Operational',
    platformNotes: 'Vector graphic generator',
    actionKey: 'open_avatar_studio'
  },
  {
    id: 'FEAT-039',
    category: '2. GIFs, Stickers, and Emojis',
    name: 'Emoji Reaction Counters',
    description: 'Aggregated emoji reaction counts on messages with hover tooltips showing user names.',
    status: 'Operational',
    platformNotes: 'Reactive counter pills on bubbles',
    actionKey: 'inspect_reactions'
  },
  {
    id: 'FEAT-040',
    category: '2. GIFs, Stickers, and Emojis',
    name: 'Handwritten Messages Canvas',
    description: 'Draw handwritten notes on a digital notepad with smooth bezier curve interpolation.',
    status: 'Operational',
    platformNotes: 'HTML5 Canvas with pointer event velocity smoothing',
    actionKey: 'open_handwriting'
  },
  {
    id: 'FEAT-041',
    category: '2. GIFs, Stickers, and Emojis',
    name: 'Neon Doodle Brush Tool',
    description: 'Drawing pad with neon glow, adjustable brush size, eraser, and color palette.',
    status: 'Operational',
    platformNotes: 'Canvas shadowBlur and stroke color engine',
    actionKey: 'open_doodle'
  },
  {
    id: 'FEAT-042',
    category: '2. GIFs, Stickers, and Emojis',
    name: 'Animated Screen & Bubble Effects',
    description: 'Slam, Loud, Gentle, Invisible Ink, Confetti, Lasers, Balloons, Fireworks, Heart shower.',
    status: 'Operational',
    platformNotes: 'Physics particle engine in HTML5 Canvas + CSS animations',
    actionKey: 'trigger_screen_effect'
  },

  // --- 3. Voice Calling (19 Features) ---
  {
    id: 'FEAT-043',
    category: '3. Voice Calling',
    name: 'One-to-One Voice Calls',
    description: 'Crystal-clear peer audio calling with live duration counter and status indicator.',
    status: 'Operational',
    platformNotes: 'Web Audio API + WebRTC audio pipeline',
    actionKey: 'start_voice_call'
  },
  {
    id: 'FEAT-044',
    category: '3. Voice Calling',
    name: 'Group Audio Conference Calling',
    description: 'Multi-party voice calls with active speaker highlighting and participant tiles.',
    status: 'Operational',
    platformNotes: 'Conference audio mixer with active speaker detection',
    actionKey: 'start_group_voice'
  },
  {
    id: 'FEAT-045',
    category: '3. Voice Calling',
    name: 'Incoming Call Screen',
    description: 'Fullscreen glassmorphism incoming call screen with Accept, Decline, and Quick Reply.',
    status: 'Operational',
    platformNotes: 'Simulated incoming call trigger in diagnostics',
    actionKey: 'simulate_incoming_call'
  },
  {
    id: 'FEAT-046',
    category: '3. Voice Calling',
    name: 'Outgoing Call Screen',
    description: 'Outgoing dialing interface with procedural ringback tone and contact profile glow.',
    status: 'Operational',
    platformNotes: 'Procedural Web Audio ringback synthesizer',
    actionKey: 'show_outgoing_screen'
  },
  {
    id: 'FEAT-047',
    category: '3. Voice Calling',
    name: 'Call Waiting & Secondary Incoming Alert',
    description: 'Notifies caller of a second incoming call with swap or end-and-accept options.',
    status: 'Operational',
    platformNotes: 'Multi-line call management state',
    actionKey: 'simulate_call_waiting'
  },
  {
    id: 'FEAT-048',
    category: '3. Voice Calling',
    name: 'Call Hold with Ambient Chime',
    description: 'Pause active call audio with pleasant synthesized ambient hold tone.',
    status: 'Operational',
    platformNotes: 'Web Audio low-frequency oscillator chime',
    actionKey: 'toggle_call_hold'
  },
  {
    id: 'FEAT-049',
    category: '3. Voice Calling',
    name: 'Microphone Mute & Unmute Toggle',
    description: 'Instant microphone mute with visual indicator and audible feedback click.',
    status: 'Operational',
    platformNotes: 'MediaStreamTrack.enabled toggling',
    actionKey: 'toggle_mic_mute'
  },
  {
    id: 'FEAT-050',
    category: '3. Voice Calling',
    name: 'Speakerphone Output Booster',
    description: 'Boost audio output gain via Web Audio GainNode (+6dB amplification).',
    status: 'Operational',
    platformNotes: 'Web Audio GainNode booster',
    actionKey: 'toggle_speakerphone'
  },
  {
    id: 'FEAT-051',
    category: '3. Voice Calling',
    name: 'Audio Output Device Selector',
    description: 'Enumerate and choose between available speakers, headphones, or display audio.',
    status: 'Hardware/Permission Dependent',
    platformNotes: 'navigator.mediaDevices.enumerateDevices()',
    actionKey: 'select_audio_device'
  },
  {
    id: 'FEAT-052',
    category: '3. Voice Calling',
    name: 'Bluetooth Headset Routing Simulator',
    description: 'Configure external headset profiles (A2DP High Fidelity vs HFP Voice).',
    status: 'Operational',
    platformNotes: 'Audio profile presets manager',
    actionKey: 'select_bluetooth_profile'
  },
  {
    id: 'FEAT-053',
    category: '3. Voice Calling',
    name: 'Comprehensive Call History Log',
    description: 'Log of All, Missed, Incoming, and Outgoing calls with timestamps and durations.',
    status: 'Operational',
    platformNotes: 'Call history tab with one-tap redial',
    actionKey: 'open_call_history'
  },
  {
    id: 'FEAT-054',
    category: '3. Voice Calling',
    name: 'Missed Call Alert Badges',
    description: 'Notification banner and sidebar badge for missed calls with one-tap call back.',
    status: 'Operational',
    platformNotes: 'Unread missed call counter badge',
    actionKey: 'view_missed_calls'
  },
  {
    id: 'FEAT-055',
    category: '3. Voice Calling',
    name: 'Voicemail Inbox & Audio Player',
    description: 'Record and play voicemails with interactive scrub bar and speed adjustment.',
    status: 'Operational',
    platformNotes: 'Voicemail tab in Calls section',
    actionKey: 'open_voicemail'
  },
  {
    id: 'FEAT-056',
    category: '3. Voice Calling',
    name: 'Call Forwarding Rules Manager',
    description: 'Configure rules to forward calls when busy, unanswered, or permanently.',
    status: 'Operational',
    platformNotes: 'Settings > Calls configuration',
    actionKey: 'configure_call_forwarding'
  },
  {
    id: 'FEAT-057',
    category: '3. Voice Calling',
    name: 'Caller ID & Safety Verification',
    description: 'Verified contact card badge during calls displaying trust rating.',
    status: 'Operational',
    platformNotes: 'Identity verification badge',
    actionKey: 'view_caller_id'
  },
  {
    id: 'FEAT-058',
    category: '3. Voice Calling',
    name: 'Web Audio Noise Suppression Filter',
    description: 'Real-time Biquad high-pass filter cutting low-frequency rumble and background hum.',
    status: 'Operational',
    platformNotes: 'Web Audio BiquadFilterNode (highpass at 180Hz)',
    actionKey: 'toggle_noise_filter'
  },
  {
    id: 'FEAT-059',
    category: '3. Voice Calling',
    name: 'Acoustic Echo Cancellation Toggle',
    description: 'Hardware/software echo cancellation toggle in media constraints.',
    status: 'Operational',
    platformNotes: 'getUserMedia({ audio: { echoCancellation: true } })',
    actionKey: 'toggle_echo_cancellation'
  },
  {
    id: 'FEAT-060',
    category: '3. Voice Calling',
    name: 'Shareable Call Links (Aether Links)',
    description: 'Generate instant links (e.g., aether.call/join?room=xyz) for one-click calling.',
    status: 'Operational',
    platformNotes: 'Shareable room URL generator',
    actionKey: 'generate_call_link'
  },
  {
    id: 'FEAT-061',
    category: '3. Voice Calling',
    name: 'Adaptive Audio Bitrate Profiles',
    description: 'Choose between Opus HD Voice (128kbps), Balanced (64kbps), and Data Saver (24kbps).',
    status: 'Operational',
    platformNotes: 'Audio constraint bandwidth profile manager',
    actionKey: 'select_audio_bitrate'
  },

  // --- 4. Video Calling (20 Features) ---
  {
    id: 'FEAT-062',
    category: '4. Video Calling',
    name: 'One-to-One HD Video Calling',
    description: 'FaceTime-style crisp video calling with responsive picture-in-picture local preview.',
    status: 'Operational',
    platformNotes: 'WebRTC video track or simulated camera stream',
    actionKey: 'start_video_call'
  },
  {
    id: 'FEAT-063',
    category: '4. Video Calling',
    name: 'Group Video Gallery Grid',
    description: 'Adaptive participant grid accommodating up to 8 video tiles seamlessly.',
    status: 'Operational',
    platformNotes: 'CSS grid with dynamic aspect ratio scaling',
    actionKey: 'start_group_video'
  },
  {
    id: 'FEAT-064',
    category: '4. Video Calling',
    name: 'Picture-in-Picture (PiP) Window',
    description: 'Pop video call out into floating picture-in-picture window while browsing.',
    status: 'Hardware/Permission Dependent',
    platformNotes: 'HTMLVideoElement.requestPictureInPicture()',
    actionKey: 'toggle_pip'
  },
  {
    id: 'FEAT-065',
    category: '4. Video Calling',
    name: 'Full Screen Sharing',
    description: 'Share entire desktop screen, application window, or browser tab with participants.',
    status: 'Hardware/Permission Dependent',
    platformNotes: 'navigator.mediaDevices.getDisplayMedia()',
    actionKey: 'start_screen_share'
  },
  {
    id: 'FEAT-066',
    category: '4. Video Calling',
    name: 'Camera Switching (Front/Back/External)',
    description: 'Switch between front FaceTime camera, rear camera, or external USB webcams.',
    status: 'Hardware/Permission Dependent',
    platformNotes: 'facingMode constraints: user vs environment',
    actionKey: 'switch_camera'
  },
  {
    id: 'FEAT-067',
    category: '4. Video Calling',
    name: 'Camera Privacy Shutter',
    description: 'Temporarily disable camera feed with animated frosted glass privacy shield.',
    status: 'Operational',
    platformNotes: 'Video track mute with placeholder avatar',
    actionKey: 'toggle_video_mute'
  },
  {
    id: 'FEAT-068',
    category: '4. Video Calling',
    name: 'Real-Time Background Blur (Canvas 2D)',
    description: 'Blur real video background using HTML5 Canvas filter pipeline (blur(12px)).',
    status: 'Operational',
    platformNotes: 'Canvas 2D context filter processing',
    actionKey: 'toggle_background_blur'
  },
  {
    id: 'FEAT-069',
    category: '4. Video Calling',
    name: 'Virtual Background Compositing',
    description: 'Replace camera backdrop with Studio, Cupertino Campus, Library, or Abstract gradients.',
    status: 'Operational',
    platformNotes: 'Canvas compositing filter',
    actionKey: 'select_virtual_bg'
  },
  {
    id: 'FEAT-070',
    category: '4. Video Calling',
    name: 'Speaker View Auto-Spotlight',
    description: 'Spotlight mode prioritizing current speaker on large stage with gallery row below.',
    status: 'Operational',
    platformNotes: 'Active speaker layout manager',
    actionKey: 'toggle_speaker_view'
  },
  {
    id: 'FEAT-071',
    category: '4. Video Calling',
    name: 'Participant Grid Pagination',
    description: 'Pagination for large conference calls allowing seamless navigation across video pages.',
    status: 'Operational',
    platformNotes: 'Page selector buttons in call modal',
    actionKey: 'paginate_grid'
  },
  {
    id: 'FEAT-072',
    category: '4. Video Calling',
    name: 'Meeting Waiting Room',
    description: 'Host-moderated waiting room where participants wait until host grants admission.',
    status: 'Operational',
    platformNotes: 'Waiting room queue state',
    actionKey: 'toggle_waiting_room'
  },
  {
    id: 'FEAT-073',
    category: '4. Video Calling',
    name: 'Hand Raising Queue',
    description: 'Participants can raise digital hand with queue order badges and host sound alert.',
    status: 'Operational',
    platformNotes: 'Hand raise event broadcaster',
    actionKey: 'raise_hand'
  },
  {
    id: 'FEAT-074',
    category: '4. Video Calling',
    name: 'Live Non-AI Speech Subtitles / Captions',
    description: 'Real-time subtitle banner using browser speech recognition or manual caption broadcast.',
    status: 'Hardware/Permission Dependent',
    platformNotes: 'webkitSpeechRecognition / SpeechRecognition API',
    actionKey: 'toggle_live_captions'
  },
  {
    id: 'FEAT-075',
    category: '4. Video Calling',
    name: 'Floating Live In-Call Emoji Reactions',
    description: 'Send floating claps, hearts, fire, and celebration emojis that drift up the screen.',
    status: 'Operational',
    platformNotes: 'CSS keyframe drift particle animation',
    actionKey: 'send_call_reaction'
  },
  {
    id: 'FEAT-076',
    category: '4. Video Calling',
    name: 'Local Consent-Gated Call Recording',
    description: 'Record call session locally using MediaRecorder API with consent notice and WebM download.',
    status: 'Hardware/Permission Dependent',
    platformNotes: 'MediaRecorder API with local download blob',
    actionKey: 'toggle_call_recording'
  },
  {
    id: 'FEAT-077',
    category: '4. Video Calling',
    name: 'Synchronized Watch Party (SharePlay)',
    description: 'Watch synchronized video player together with play/pause/seek peer synchronization.',
    status: 'Operational',
    platformNotes: 'HTML5 Video with BroadcastChannel timestamp sync',
    actionKey: 'open_watch_party'
  },
  {
    id: 'FEAT-078',
    category: '4. Video Calling',
    name: 'Video Bandwidth & Quality Controls',
    description: 'Adjust stream quality: 1080p Full HD, 720p HD, or 360p Low Bandwidth Saver.',
    status: 'Operational',
    platformNotes: 'Video resolution constraints manager',
    actionKey: 'select_video_quality'
  },
  {
    id: 'FEAT-079',
    category: '4. Video Calling',
    name: 'Video Aspect Ratio Toggle',
    description: 'Toggle between 16:9 widescreen, 4:3 standard, and fill-screen zoom crop.',
    status: 'Operational',
    platformNotes: 'object-fit cover vs contain',
    actionKey: 'toggle_aspect_ratio'
  },
  {
    id: 'FEAT-080',
    category: '4. Video Calling',
    name: 'Low-Light Video Compensation',
    description: 'Canvas brightness & contrast boost for dark webcam environments.',
    status: 'Operational',
    platformNotes: 'CSS brightness(1.25) contrast(1.1) filter',
    actionKey: 'toggle_low_light'
  },
  {
    id: 'FEAT-081',
    category: '4. Video Calling',
    name: 'In-Call Sidebar Text Chat',
    description: 'Slide-out text messaging drawer inside active video call to share links and notes.',
    status: 'Operational',
    platformNotes: 'Integrated call chat drawer',
    actionKey: 'toggle_call_chat'
  },

  // --- 5. Location Sharing (16 Features) ---
  {
    id: 'FEAT-082',
    category: '5. Location Sharing',
    name: 'Continuous Real-Time Live Location',
    description: 'Stream live GPS coordinates with dynamic blue pulsing radar marker.',
    status: 'Hardware/Permission Dependent',
    platformNotes: 'navigator.geolocation.watchPosition',
    actionKey: 'start_live_location'
  },
  {
    id: 'FEAT-083',
    category: '5. Location Sharing',
    name: 'Temporary Location Sharing with Timer',
    description: 'Share location for 15 minutes, 1 hour, or Until End of Day with auto-stop.',
    status: 'Operational',
    platformNotes: 'Expiration timestamp watcher',
    actionKey: 'start_temporary_sharing'
  },
  {
    id: 'FEAT-084',
    category: '5. Location Sharing',
    name: 'One-Time Static Location Pin Drop',
    description: 'Drop a pin on map and send static location message card to conversation.',
    status: 'Operational',
    platformNotes: 'Interactive pin placement',
    actionKey: 'drop_location_pin'
  },
  {
    id: 'FEAT-085',
    category: '5. Location Sharing',
    name: 'Interactive OpenStreetMap Previews',
    description: 'Pan, zoom, and inspect location cards inside chat bubbles with OpenStreetMap tiles.',
    status: 'Operational',
    platformNotes: 'OpenStreetMap standard tile renderer with Leaflet',
    actionKey: 'view_map_card'
  },
  {
    id: 'FEAT-086',
    category: '5. Location Sharing',
    name: 'Turn-by-Turn Route Estimation',
    description: 'Calculates driving, walking, and transit paths with polyline display.',
    status: 'Operational',
    platformNotes: 'Geodesic path interpolation engine',
    actionKey: 'calculate_route'
  },
  {
    id: 'FEAT-087',
    category: '5. Location Sharing',
    name: 'Real-Time ETA Calculation',
    description: 'Kinematics-based Estimated Time of Arrival based on distance and transit mode.',
    status: 'Operational',
    platformNotes: 'Haversine distance formula with speed coefficients',
    actionKey: 'calculate_eta'
  },
  {
    id: 'FEAT-088',
    category: '5. Location Sharing',
    name: 'Live Trip Progress Bar',
    description: 'Displays journey progress percentage and remaining kilometers/miles.',
    status: 'Operational',
    platformNotes: 'Trip progress bar on location card',
    actionKey: 'view_trip_progress'
  },
  {
    id: 'FEAT-089',
    category: '5. Location Sharing',
    name: 'Arrival Geofence Alert',
    description: 'Triggers alert notification when contact reaches designated destination radius.',
    status: 'Operational',
    platformNotes: 'Geofence distance threshold detector',
    actionKey: 'set_arrival_geofence'
  },
  {
    id: 'FEAT-090',
    category: '5. Location Sharing',
    name: 'Departure Geofence Alert',
    description: 'Triggers alert when contact moves outside designated starting location zone.',
    status: 'Operational',
    platformNotes: 'Geofence exit detector',
    actionKey: 'set_departure_geofence'
  },
  {
    id: 'FEAT-091',
    category: '5. Location Sharing',
    name: 'Saved Places Manager',
    description: 'Bookmark Home, Work, Gym, and Favorite Cafes with custom icons and coordinates.',
    status: 'Operational',
    platformNotes: 'Saved Places drawer in Location section',
    actionKey: 'manage_saved_places'
  },
  {
    id: 'FEAT-092',
    category: '5. Location Sharing',
    name: 'Emergency SOS Location Broadcaster',
    description: 'One-touch emergency beacon broadcasting GPS location with urgent high-contrast alert.',
    status: 'Operational',
    platformNotes: 'High-priority SOS message dispatcher',
    actionKey: 'trigger_emergency_sos'
  },
  {
    id: 'FEAT-093',
    category: '5. Location Sharing',
    name: 'Radius Geofence Zone Editor',
    description: 'Create customizable circular safety zones (100m to 5km) with alert triggers.',
    status: 'Operational',
    platformNotes: 'Interactive radius slider on map',
    actionKey: 'edit_geofence_zone'
  },
  {
    id: 'FEAT-094',
    category: '5. Location Sharing',
    name: 'Contact Radar Map (Find My Friends)',
    description: 'Unified global map displaying all contacts currently sharing locations with you.',
    status: 'Operational',
    platformNotes: 'Full-screen radar map view in Location tab',
    actionKey: 'open_radar_map'
  },
  {
    id: 'FEAT-095',
    category: '5. Location Sharing',
    name: 'Master Stop Sharing All Locations Switch',
    description: 'Immediate privacy kill-switch terminating all outgoing location sessions instantly.',
    status: 'Operational',
    platformNotes: 'Global location revocation in Location header',
    actionKey: 'stop_all_location_sharing'
  },
  {
    id: 'FEAT-096',
    category: '5. Location Sharing',
    name: 'Granular Location Permissions Inspector',
    description: 'Visual audit panel showing exactly which contacts have permission to view your location.',
    status: 'Operational',
    platformNotes: 'Auditing inspector in Settings > Location',
    actionKey: 'inspect_location_perms'
  },
  {
    id: 'FEAT-097',
    category: '5. Location Sharing',
    name: 'Composer Quick Location Sharing',
    description: 'Quick-attach current GPS location button located directly in message composer toolbar.',
    status: 'Operational',
    platformNotes: 'One-click location pin in composer',
    actionKey: 'quick_share_location'
  },

  // --- 6. Finance and Payments (Aether Pay) (20 Features) ---
  {
    id: 'FEAT-098',
    category: '6. Finance and Payments',
    name: 'Contact-to-Contact Peer Payments',
    description: 'Send Aether Cash to any contact with instant balance deduction and chat receipt card.',
    status: 'Operational',
    platformNotes: 'Aether Pay ledger with real-time balance update',
    actionKey: 'send_payment'
  },
  {
    id: 'FEAT-099',
    category: '6. Finance and Payments',
    name: 'Payment Request Invoicing',
    description: 'Send an invoice request to a contact with description, amount, and due date.',
    status: 'Operational',
    platformNotes: 'Interactive Pay/Decline card in chat',
    actionKey: 'request_payment'
  },
  {
    id: 'FEAT-100',
    category: '6. Finance and Payments',
    name: 'Smart Bill Splitter Calculator',
    description: 'Split restaurant or group bills equally or with custom percentage/itemized shares.',
    status: 'Operational',
    platformNotes: 'Mathematical bill split engine',
    actionKey: 'open_bill_splitter'
  },
  {
    id: 'FEAT-101',
    category: '6. Finance and Payments',
    name: 'Interactive Tip Calculator',
    description: 'Calculate gratuity with preset chips (10%, 15%, 18%, 20%) and custom percentage slider.',
    status: 'Operational',
    platformNotes: 'Tip calculation modal with per-person breakdown',
    actionKey: 'open_tip_calculator'
  },
  {
    id: 'FEAT-102',
    category: '6. Finance and Payments',
    name: 'Shared Group Expense Tracker',
    description: 'Track group expenditures (who paid what, who owes whom) with net debt simplification.',
    status: 'Operational',
    platformNotes: 'Debt simplification algorithm',
    actionKey: 'open_group_expenses'
  },
  {
    id: 'FEAT-103',
    category: '6. Finance and Payments',
    name: 'Comprehensive Transaction History Ledger',
    description: 'Detailed list of all incoming and outgoing payments with status filters and search.',
    status: 'Operational',
    platformNotes: 'Transaction history tab in Finance section',
    actionKey: 'open_transactions'
  },
  {
    id: 'FEAT-104',
    category: '6. Finance and Payments',
    name: 'Digital Printable Receipt Generator',
    description: 'Generate high-fidelity receipt card with cryptographic hash code and print/download.',
    status: 'Operational',
    platformNotes: 'Downloadable receipt card with QR verification',
    actionKey: 'generate_receipt'
  },
  {
    id: 'FEAT-105',
    category: '6. Finance and Payments',
    name: 'Payment Reminder Notifications',
    description: 'Send courteous payment reminder notification for outstanding invoices.',
    status: 'Operational',
    platformNotes: 'Reminder dispatch to recipient',
    actionKey: 'send_payment_reminder'
  },
  {
    id: 'FEAT-106',
    category: '6. Finance and Payments',
    name: 'Spending Categorization',
    description: 'Categorize spending into Dining, Groceries, Entertainment, Travel, Bills, Shopping.',
    status: 'Operational',
    platformNotes: 'Taxonomy tagger for transactions',
    actionKey: 'view_spending_categories'
  },
  {
    id: 'FEAT-107',
    category: '6. Finance and Payments',
    name: 'Monthly Budget Tracker',
    description: 'Set category budget limits with colored progress meters and threshold warning badges.',
    status: 'Operational',
    platformNotes: 'Visual budget meter bars in Finance tab',
    actionKey: 'open_budget_tracker'
  },
  {
    id: 'FEAT-108',
    category: '6. Finance and Payments',
    name: 'Savings Piggy Bank Goals',
    description: 'Create savings targets (Vacation, New Mac, Emergency Fund) with progress milestones.',
    status: 'Operational',
    platformNotes: 'Interactive deposit and target tracking',
    actionKey: 'open_savings_goals'
  },
  {
    id: 'FEAT-109',
    category: '6. Finance and Payments',
    name: 'Recurring Subscription Tracker',
    description: 'Track monthly/annual subscriptions (Cloud, Streaming, Gym) with renewal cadence.',
    status: 'Operational',
    platformNotes: 'Subscription schedule manager',
    actionKey: 'open_subscriptions'
  },
  {
    id: 'FEAT-110',
    category: '6. Finance and Payments',
    name: 'Expense Summary SVG Donut Charts',
    description: 'Visual breakdown of monthly expenditures rendered with crisp SVG donut graphics.',
    status: 'Operational',
    platformNotes: 'Clean non-AI SVG chart renderer',
    actionKey: 'view_expense_chart'
  },
  {
    id: 'FEAT-111',
    category: '6. Finance and Payments',
    name: 'Multi-Currency Conversion Engine',
    description: 'Convert between USD, EUR, GBP, JPY, CAD, AUD, CHF, SGD, HKD with live table.',
    status: 'Operational',
    platformNotes: 'Deterministic exchange rates matrix',
    actionKey: 'open_currency_converter'
  },
  {
    id: 'FEAT-112',
    category: '6. Finance and Payments',
    name: 'Shared Collaborative Shopping List',
    description: 'Create grocery/shopping lists in chat with checkboxes and estimated price sums.',
    status: 'Operational',
    platformNotes: 'Interactive checklist card in conversation',
    actionKey: 'create_shopping_list'
  },
  {
    id: 'FEAT-113',
    category: '6. Finance and Payments',
    name: 'Biometric / PIN Payment Authorization',
    description: 'Security confirmation modal requiring PIN verification before funds transfer.',
    status: 'Operational',
    platformNotes: 'PIN verification guard modal',
    actionKey: 'authorize_payment'
  },
  {
    id: 'FEAT-114',
    category: '6. Finance and Payments',
    name: 'Simulated vs Live Mode Disclosure',
    description: 'Strict regulatory badge stating transactions are in simulated sandbox test mode.',
    status: 'Operational',
    platformNotes: 'Compliance banner on all financial views',
    actionKey: 'view_finance_disclosure'
  },
  {
    id: 'FEAT-115',
    category: '6. Finance and Payments',
    name: 'Peer Payment Refund Processing',
    description: 'Recipient can issue a one-click refund reversing completed peer payment.',
    status: 'Operational',
    platformNotes: 'Ledger debit/credit reversal engine',
    actionKey: 'process_refund'
  },
  {
    id: 'FEAT-116',
    category: '6. Finance and Payments',
    name: 'Virtual Aether Cash Card Top-Up / Cash-Out',
    description: 'Top-up card balance from simulated bank account or transfer funds to bank.',
    status: 'Operational',
    platformNotes: 'Top-Up & Cash-Out modal in Finance header',
    actionKey: 'top_up_balance'
  },
  {
    id: 'FEAT-117',
    category: '6. Finance and Payments',
    name: 'Payment QR Code Generator & Scanner',
    description: 'Generate personal payment QR code for instant in-person contactless payments.',
    status: 'Operational',
    platformNotes: 'Dynamic QR generator for Aether Pay handles',
    actionKey: 'show_payment_qr'
  },

  // --- 7. Group Chats and Communities (21 Features) ---
  {
    id: 'FEAT-118',
    category: '7. Group Chats and Communities',
    name: 'Multi-Participant Group Chat Creation',
    description: 'Create group chats with custom name, member selector, and welcome message.',
    status: 'Operational',
    platformNotes: 'New Group modal in conversation list',
    actionKey: 'create_group'
  },
  {
    id: 'FEAT-119',
    category: '7. Group Chats and Communities',
    name: 'Custom Group Avatar & Color Icon Builder',
    description: 'Generate initials-based colorful icons or upload custom group emblems.',
    status: 'Operational',
    platformNotes: 'Canvas group icon synthesizer',
    actionKey: 'customize_group_icon'
  },
  {
    id: 'FEAT-120',
    category: '7. Group Chats and Communities',
    name: 'Group Description & Topic Banner',
    description: 'Set group purpose, pinned guidelines, and topic description in header.',
    status: 'Operational',
    platformNotes: 'Group details drawer',
    actionKey: 'edit_group_description'
  },
  {
    id: 'FEAT-121',
    category: '7. Group Chats and Communities',
    name: 'Role-Based Access Control',
    description: 'Assign Owner, Admin, Moderator, and Member roles with specific badges.',
    status: 'Operational',
    platformNotes: 'Member role assignment selector',
    actionKey: 'manage_member_roles'
  },
  {
    id: 'FEAT-122',
    category: '7. Group Chats and Communities',
    name: 'Granular Member Permissions Manager',
    description: 'Configure permissions: send messages, add members, edit info, pin messages.',
    status: 'Operational',
    platformNotes: 'Group Settings > Permissions panel',
    actionKey: 'configure_group_permissions'
  },
  {
    id: 'FEAT-123',
    category: '7. Group Chats and Communities',
    name: 'Shareable Group Invite Link Generator',
    description: 'Generate invite links (aether.chat/invite?code=...) with revoke switch.',
    status: 'Operational',
    platformNotes: 'Unique token generator with revocation switch',
    actionKey: 'generate_invite_link'
  },
  {
    id: 'FEAT-124',
    category: '7. Group Chats and Communities',
    name: 'QR Code Group Invitation Card',
    description: 'Display QR code for instant camera scanning to join the group conversation.',
    status: 'Operational',
    platformNotes: 'QR invitation modal',
    actionKey: 'show_group_qr'
  },
  {
    id: 'FEAT-125',
    category: '7. Group Chats and Communities',
    name: 'Membership Request Approval Queue',
    description: 'Admin queue for reviewing and approving/rejecting incoming group joins.',
    status: 'Operational',
    platformNotes: 'Approval queue drawer in group settings',
    actionKey: 'review_membership_requests'
  },
  {
    id: 'FEAT-126',
    category: '7. Group Chats and Communities',
    name: 'Group Polls with Live Percentage Graphs',
    description: 'Broadcast polls to groups with real-time percentage graphs per option.',
    status: 'Operational',
    platformNotes: 'Real-time voting aggregation',
    actionKey: 'create_group_poll'
  },
  {
    id: 'FEAT-127',
    category: '7. Group Chats and Communities',
    name: 'Shared Group Calendar',
    description: 'Shared calendar for scheduling group events, sync meetings, and deadlines.',
    status: 'Operational',
    platformNotes: 'Calendar view inside group details drawer',
    actionKey: 'open_group_calendar'
  },
  {
    id: 'FEAT-128',
    category: '7. Group Chats and Communities',
    name: 'Group Event Builder with RSVP',
    description: 'Create events with location, time, and track RSVPs (Going, Maybe, Can’t Go).',
    status: 'Operational',
    platformNotes: 'Interactive RSVP card inside chat',
    actionKey: 'create_group_event'
  },
  {
    id: 'FEAT-129',
    category: '7. Group Chats and Communities',
    name: 'Pinned Group Announcements',
    description: 'Admins can pin announcements to prominent persistent top banner.',
    status: 'Operational',
    platformNotes: 'Dismissible top banner bar',
    actionKey: 'pin_announcement'
  },
  {
    id: 'FEAT-130',
    category: '7. Group Chats and Communities',
    name: 'Shared Group Media & Album Gallery',
    description: 'Consolidated gallery of all photos, videos, links, and documents sent to the group.',
    status: 'Operational',
    platformNotes: 'Shared Media tab in chat info',
    actionKey: 'open_shared_album'
  },
  {
    id: 'FEAT-131',
    category: '7. Group Chats and Communities',
    name: 'One-Tap Group Audio Call Launcher',
    description: 'Start instant group voice conference ringing all eligible members.',
    status: 'Operational',
    platformNotes: 'Audio conference trigger in group header',
    actionKey: 'start_group_audio'
  },
  {
    id: 'FEAT-132',
    category: '7. Group Chats and Communities',
    name: 'One-Tap Group Video Room Launcher',
    description: 'Start instant multi-user FaceTime video conference from group chat.',
    status: 'Operational',
    platformNotes: 'Video conference trigger in group header',
    actionKey: 'start_group_video_call'
  },
  {
    id: 'FEAT-133',
    category: '7. Group Chats and Communities',
    name: 'Participant Management (Kick & Mute)',
    description: 'Admins can mute abusive participants or remove members from the conversation.',
    status: 'Operational',
    platformNotes: 'Member context action menu',
    actionKey: 'manage_participants'
  },
  {
    id: 'FEAT-134',
    category: '7. Group Chats and Communities',
    name: 'Temporary Disband Group Mode',
    description: 'Create temporary event groups that auto-archive and self-destruct after 24 hours.',
    status: 'Operational',
    platformNotes: 'Auto-disband countdown scheduler',
    actionKey: 'set_temporary_group'
  },
  {
    id: 'FEAT-135',
    category: '7. Group Chats and Communities',
    name: 'Community Channels Hierarchy',
    description: 'Sub-channels within a community (e.g., #general, #announcements, #media, #random).',
    status: 'Operational',
    platformNotes: 'Channel navigation list for communities',
    actionKey: 'open_community_channels'
  },
  {
    id: 'FEAT-136',
    category: '7. Group Chats and Communities',
    name: 'Topic-Based Thread Drawer',
    description: 'Side-drawer displaying dedicated threads on specific project topics.',
    status: 'Operational',
    platformNotes: 'Thread index panel',
    actionKey: 'open_topic_threads'
  },
  {
    id: 'FEAT-137',
    category: '7. Group Chats and Communities',
    name: 'Community Moderation Audit Log',
    description: 'Audit log recording all moderator actions (messages removed, users banned).',
    status: 'Operational',
    platformNotes: 'Admin moderation log in Group Settings',
    actionKey: 'view_moderation_log'
  },
  {
    id: 'FEAT-138',
    category: '7. Group Chats and Communities',
    name: 'Spam and Abuse Reporting Tool',
    description: 'Report abusive content with reason codes for admin review.',
    status: 'Operational',
    platformNotes: 'Abuse report dialog with confirmation badge',
    actionKey: 'report_abuse'
  },

  // --- 8. Contacts and Profiles (18 Features) ---
  {
    id: 'FEAT-139',
    category: '8. Contacts and Profiles',
    name: 'Manual Contact Creator',
    description: 'Add contacts with name, handle, phone, email, notes, and profile avatar.',
    status: 'Operational',
    platformNotes: 'New Contact modal in Contacts tab',
    actionKey: 'add_contact'
  },
  {
    id: 'FEAT-140',
    category: '8. Contacts and Profiles',
    name: 'VCard (.vcf) & JSON Import / Export',
    description: 'Export address book or import contacts from standard .vcf or JSON files.',
    status: 'Operational',
    platformNotes: 'File API VCF parser and exporter',
    actionKey: 'import_export_contacts'
  },
  {
    id: 'FEAT-141',
    category: '8. Contacts and Profiles',
    name: 'Profile Photo Uploader & Cropper',
    description: 'Upload profile image with circular crop preview and high-DPI scaling.',
    status: 'Operational',
    platformNotes: 'Canvas circular crop processor',
    actionKey: 'edit_profile_photo'
  },
  {
    id: 'FEAT-142',
    category: '8. Contacts and Profiles',
    name: 'Display Name and @username Handle System',
    description: 'Set custom display name and unique @handle with format validation.',
    status: 'Operational',
    platformNotes: 'Settings > Profile editor',
    actionKey: 'edit_username'
  },
  {
    id: 'FEAT-143',
    category: '8. Contacts and Profiles',
    name: 'Custom Status Message with Expiration',
    description: 'Set status message with emoji and auto-clear timer (1 hr, 4 hrs, Today, Don’t Clear).',
    status: 'Operational',
    platformNotes: 'Status picker with countdown timer',
    actionKey: 'set_custom_status'
  },
  {
    id: 'FEAT-144',
    category: '8. Contacts and Profiles',
    name: 'Personal QR Contact Card',
    description: 'Display personal profile QR card for rapid in-person scanning and adding.',
    status: 'Operational',
    platformNotes: 'Interactive QR card modal',
    actionKey: 'show_my_qr'
  },
  {
    id: 'FEAT-145',
    category: '8. Contacts and Profiles',
    name: 'Profile Theme Customizer',
    description: 'Choose profile banner gradient, glow colors, and highlight style.',
    status: 'Operational',
    platformNotes: 'Banner gradient selector',
    actionKey: 'customize_profile_theme'
  },
  {
    id: 'FEAT-146',
    category: '8. Contacts and Profiles',
    name: 'Private Contact Notes',
    description: 'Store encrypted private notes per contact that are visible only to you.',
    status: 'Operational',
    platformNotes: 'Local private notes field in Contact card',
    actionKey: 'edit_contact_notes'
  },
  {
    id: 'FEAT-147',
    category: '8. Contacts and Profiles',
    name: 'VIP Favorite Contacts List',
    description: 'Star VIP contacts to pin them to the top of Contacts and allow DND bypass.',
    status: 'Operational',
    platformNotes: 'Favorites filter and priority status',
    actionKey: 'toggle_favorite_contact'
  },
  {
    id: 'FEAT-148',
    category: '8. Contacts and Profiles',
    name: 'Blocked Contacts Manager',
    description: 'Block unwanted contacts from messaging or calling, with instant unblock list.',
    status: 'Operational',
    platformNotes: 'Settings > Privacy > Blocked list',
    actionKey: 'manage_blocked_contacts'
  },
  {
    id: 'FEAT-149',
    category: '8. Contacts and Profiles',
    name: 'Contact Requests Queue',
    description: 'Review incoming contact invitations with Accept or Ignore options.',
    status: 'Operational',
    platformNotes: 'Invitations tab in Contacts',
    actionKey: 'view_contact_requests'
  },
  {
    id: 'FEAT-150',
    category: '8. Contacts and Profiles',
    name: 'Official Verification Badges',
    description: 'Display verified blue or gold checkmark badges for authenticated identities.',
    status: 'Operational',
    platformNotes: 'Verification badge component',
    actionKey: 'view_verification_status'
  },
  {
    id: 'FEAT-151',
    category: '8. Contacts and Profiles',
    name: 'Birthday Reminders Calendar',
    description: 'Automatic birthday alerts for contacts with one-tap celebratory wish button.',
    status: 'Operational',
    platformNotes: 'Birthday reminder banner in Contacts',
    actionKey: 'view_birthdays'
  },
  {
    id: 'FEAT-152',
    category: '8. Contacts and Profiles',
    name: 'Multi-Account Profile Switcher',
    description: 'Seamlessly switch between Personal, Work, and Secondary profiles without relogin.',
    status: 'Operational',
    platformNotes: 'Account switcher in sidebar footer',
    actionKey: 'switch_account'
  },
  {
    id: 'FEAT-153',
    category: '8. Contacts and Profiles',
    name: '12-Word Cryptographic Recovery Key',
    description: 'Generate BIP39-style 12-word mnemonic backup phrase for offline account restoration.',
    status: 'Operational',
    platformNotes: 'Deterministic mnemonic word generator',
    actionKey: 'show_recovery_key'
  },
  {
    id: 'FEAT-154',
    category: '8. Contacts and Profiles',
    name: 'Contact Duplicate Detection & Merge',
    description: 'Scans address book for duplicate names or numbers and merges with 1 click.',
    status: 'Operational',
    platformNotes: 'Deterministic deduplication utility',
    actionKey: 'merge_duplicate_contacts'
  },
  {
    id: 'FEAT-155',
    category: '8. Contacts and Profiles',
    name: 'Contact Interaction Statistics',
    description: 'View total messages exchanged, call minutes, and shared media count with any contact.',
    status: 'Operational',
    platformNotes: 'Statistics card in Contact detail modal',
    actionKey: 'view_contact_stats'
  },
  {
    id: 'FEAT-156',
    category: '8. Contacts and Profiles',
    name: 'Contact Nickname Customizer',
    description: 'Assign custom local nicknames to any contact overriding their display name.',
    status: 'Operational',
    platformNotes: 'Custom nickname override field',
    actionKey: 'set_contact_nickname'
  },

  // --- 9. Privacy and Security (18 Features) ---
  {
    id: 'FEAT-157',
    category: '9. Privacy and Security',
    name: 'Web Crypto AES-GCM 256-Bit E2EE',
    description: 'Authentic cryptographic payload encryption using Web Crypto API AES-GCM.',
    status: 'Operational',
    platformNotes: 'window.crypto.subtle.encrypt / decrypt',
    actionKey: 'test_e2ee_encryption'
  },
  {
    id: 'FEAT-158',
    category: '9. Privacy and Security',
    name: 'Safety Numbers / Fingerprint Verification',
    description: 'Compare 60-digit cryptographic safety numbers with contact to ensure no MITM.',
    status: 'Operational',
    platformNotes: 'SHA-256 fingerprint comparison modal',
    actionKey: 'view_safety_numbers'
  },
  {
    id: 'FEAT-159',
    category: '9. Privacy and Security',
    name: 'Passcode & Biometric App Lock Screen',
    description: 'Lock app with 4 or 6-digit PIN pad with biometric simulation and auto-lock timeout.',
    status: 'Operational',
    platformNotes: 'Full-screen PIN pad overlay with SHA-256 hash verify',
    actionKey: 'lock_app_now'
  },
  {
    id: 'FEAT-160',
    category: '9. Privacy and Security',
    name: 'Two-Factor Authentication (TOTP Simulator)',
    description: 'Built-in RFC 6238 TOTP 6-digit code generator and verification simulator.',
    status: 'Operational',
    platformNotes: 'Deterministic HMAC-SHA1 TOTP implementation',
    actionKey: 'configure_2fa'
  },
  {
    id: 'FEAT-161',
    category: '9. Privacy and Security',
    name: 'Passkey Registration Simulator',
    description: 'Simulates WebAuthn FIDO2 passkey registration and public-key attestation.',
    status: 'Operational',
    platformNotes: 'WebAuthn navigator.credentials interface',
    actionKey: 'register_passkey'
  },
  {
    id: 'FEAT-162',
    category: '9. Privacy and Security',
    name: 'Active Sessions Manager',
    description: 'List active client devices (macOS, iPhone, Web, Linux) with IP and last active time.',
    status: 'Operational',
    platformNotes: 'Settings > Security > Sessions panel',
    actionKey: 'view_active_sessions'
  },
  {
    id: 'FEAT-163',
    category: '9. Privacy and Security',
    name: 'One-Tap Remote Session Revocation',
    description: 'Remote logout: "Log Out From All Other Devices" terminating other sessions.',
    status: 'Operational',
    platformNotes: 'Session revocation broadcast',
    actionKey: 'revoke_other_sessions'
  },
  {
    id: 'FEAT-164',
    category: '9. Privacy and Security',
    name: 'Security & Login Alerts Audit Log',
    description: 'Security log capturing all login events, IP locations, and potential alerts.',
    status: 'Operational',
    platformNotes: 'Security logs viewer',
    actionKey: 'view_security_alerts'
  },
  {
    id: 'FEAT-165',
    category: '9. Privacy and Security',
    name: 'Disappearing Messages Auto-Destruct Cleaner',
    description: 'Background cron job scanning and permanently expunging expired messages.',
    status: 'Operational',
    platformNotes: 'Deterministic interval-based database vacuum',
    actionKey: 'run_disappearing_cleaner'
  },
  {
    id: 'FEAT-166',
    category: '9. Privacy and Security',
    name: 'Anti-Phishing Heuristic URL Scanner',
    description: 'Scans URLs for homoglyphs, deceptive domains, or IP hostnames before opening.',
    status: 'Operational',
    platformNotes: 'Deterministic URL heuristic inspector',
    actionKey: 'test_phishing_scanner'
  },
  {
    id: 'FEAT-167',
    category: '9. Privacy and Security',
    name: 'Anti-Spam Rate Limit Guard',
    description: 'Detects and throttles burst message floods to prevent spamming.',
    status: 'Operational',
    platformNotes: 'Token bucket rate limiter',
    actionKey: 'test_rate_limiter'
  },
  {
    id: 'FEAT-168',
    category: '9. Privacy and Security',
    name: 'Window-Blur Privacy Screen Shield',
    description: 'Automatically blurs message content when browser window loses focus (Cmd+Tab).',
    status: 'Operational',
    platformNotes: 'window.onblur and document.visibilitychange handler',
    actionKey: 'toggle_privacy_shield'
  },
  {
    id: 'FEAT-169',
    category: '9. Privacy and Security',
    name: 'Encrypted Local Backup Creation',
    description: 'Export database into AES-GCM encrypted backup package with password salt.',
    status: 'Operational',
    platformNotes: 'Web Crypto PBKDF2 + AES-GCM file export',
    actionKey: 'create_encrypted_backup'
  },
  {
    id: 'FEAT-170',
    category: '9. Privacy and Security',
    name: 'Backup Restore with Key Verification',
    description: 'Restore conversations and contacts from encrypted backup file with password decrypt.',
    status: 'Operational',
    platformNotes: 'Backup importer with password prompt',
    actionKey: 'restore_backup'
  },
  {
    id: 'FEAT-171',
    category: '9. Privacy and Security',
    name: 'Privacy Audit Permissions Dashboard',
    description: 'Visual panel displaying current status of Camera, Mic, Geolocation, and Notifications.',
    status: 'Operational',
    platformNotes: 'navigator.permissions query monitor',
    actionKey: 'view_privacy_dashboard'
  },
  {
    id: 'FEAT-172',
    category: '9. Privacy and Security',
    name: 'Comprehensive Data Export (GDPR Archive)',
    description: 'Download complete user archive (chats, media links, settings, ledger) in JSON.',
    status: 'Operational',
    platformNotes: 'Data takeout generator',
    actionKey: 'export_all_data'
  },
  {
    id: 'FEAT-173',
    category: '9. Privacy and Security',
    name: 'Irreversible Account Deletion Workflow',
    description: 'Permanent scrub of all messages, contacts, keys, and settings from device.',
    status: 'Operational',
    platformNotes: 'Confirmation-guarded database purge',
    actionKey: 'delete_account'
  },
  {
    id: 'FEAT-174',
    category: '9. Privacy and Security',
    name: 'E2EE Encryption Verification Banner',
    description: 'Subtle lock badge in chat header certifying end-to-end encryption status.',
    status: 'Operational',
    platformNotes: 'Real-time encryption status indicator',
    actionKey: 'view_e2ee_badge'
  },

  // --- 10. Notifications (15 Features) ---
  {
    id: 'FEAT-175',
    category: '10. Notifications',
    name: 'Web Notifications API Integration',
    description: 'Native browser push notification dispatch with custom icon and body.',
    status: 'Hardware/Permission Dependent',
    platformNotes: 'window.Notification.requestPermission()',
    actionKey: 'request_notification_permission'
  },
  {
    id: 'FEAT-176',
    category: '10. Notifications',
    name: 'Original Synthesized Sound Selector',
    description: '5 original Web Audio synthesized tones: Aether Chime, Crystal, Celestial, Pulse, Ripple.',
    status: 'Operational',
    platformNotes: 'Procedural Web Audio sound generator (zero external audio files)',
    actionKey: 'test_notification_sounds'
  },
  {
    id: 'FEAT-177',
    category: '10. Notifications',
    name: 'Per-Contact Custom Notification Sounds',
    description: 'Assign unique sound tones to individual VIP contacts to recognize them by ear.',
    status: 'Operational',
    platformNotes: 'Configurable in Contact Details',
    actionKey: 'set_contact_sound'
  },
  {
    id: 'FEAT-178',
    category: '10. Notifications',
    name: 'Vibration Haptic Feedback Patterns',
    description: 'Haptic patterns via navigator.vibrate: Double pulse, Subtle tap, Heartbeat pattern.',
    status: 'Hardware/Permission Dependent',
    platformNotes: 'navigator.vibrate([100, 50, 100])',
    actionKey: 'test_vibration'
  },
  {
    id: 'FEAT-179',
    category: '10. Notifications',
    name: 'Quiet Hours Schedule',
    description: 'Automatically mute notifications between scheduled times (e.g., 22:00 to 07:00).',
    status: 'Operational',
    platformNotes: 'Clock time evaluation engine',
    actionKey: 'configure_quiet_hours'
  },
  {
    id: 'FEAT-180',
    category: '10. Notifications',
    name: 'Master Do Not Disturb (DND) Toggle',
    description: 'Global mute switch in header silencing all incoming alerts instantly.',
    status: 'Operational',
    platformNotes: 'DND toggle button in header',
    actionKey: 'toggle_dnd'
  },
  {
    id: 'FEAT-181',
    category: '10. Notifications',
    name: 'Notification Batch Summary Drawer',
    description: 'Groups non-urgent notifications into a consolidated summary drawer.',
    status: 'Operational',
    platformNotes: 'Notification center drawer',
    actionKey: 'open_notification_center'
  },
  {
    id: 'FEAT-182',
    category: '10. Notifications',
    name: 'Priority Notification Overrides',
    description: 'Allow starred VIP contacts to bypass DND and quiet hours.',
    status: 'Operational',
    platformNotes: 'Priority rule evaluator',
    actionKey: 'configure_vip_bypass'
  },
  {
    id: 'FEAT-183',
    category: '10. Notifications',
    name: '@Mention Alert Notifications',
    description: 'Mentions of @yourname generate high-priority sound and badge even in muted groups.',
    status: 'Operational',
    platformNotes: 'Username mention parser',
    actionKey: 'simulate_mention'
  },
  {
    id: 'FEAT-184',
    category: '10. Notifications',
    name: 'Missed-Call Audible and Badge Alerts',
    description: 'Distinctive missed call audio chime and red badge indicator.',
    status: 'Operational',
    platformNotes: 'Web Audio missed call chime',
    actionKey: 'trigger_missed_call_alert'
  },
  {
    id: 'FEAT-185',
    category: '10. Notifications',
    name: 'Notification Preview Privacy Toggle',
    description: 'Toggle between "Show sender and message" or "New message received" privacy masking.',
    status: 'Operational',
    platformNotes: 'Settings > Notifications preference',
    actionKey: 'toggle_preview_privacy'
  },
  {
    id: 'FEAT-186',
    category: '10. Notifications',
    name: 'Lock Screen Privacy Masking',
    description: 'Hide sensitive sender details when device or app is locked.',
    status: 'Operational',
    platformNotes: 'Privacy state mask',
    actionKey: 'toggle_lock_screen_privacy'
  },
  {
    id: 'FEAT-187',
    category: '10. Notifications',
    name: 'Per-Conversation Notification Controls',
    description: 'Configure chat notification level: All Messages, Mentions Only, or Completely Muted.',
    status: 'Operational',
    platformNotes: 'Chat details notification dropdown',
    actionKey: 'set_chat_notifications'
  },
  {
    id: 'FEAT-188',
    category: '10. Notifications',
    name: 'Focus Modes (Work, Personal, Sleep, Fitness)',
    description: 'Apple-style Focus modes filtering allowed notifications and contacts.',
    status: 'Operational',
    platformNotes: 'Focus mode switcher in header',
    actionKey: 'select_focus_mode'
  },
  {
    id: 'FEAT-189',
    category: '10. Notifications',
    name: 'Notification History Log',
    description: 'Browse recently dismissed alerts with timestamps and quick-reopen action.',
    status: 'Operational',
    platformNotes: 'History panel in Notification Center',
    actionKey: 'view_notification_history'
  },

  // --- 11. Audio and Voice Messages (13 Features) ---
  {
    id: 'FEAT-190',
    category: '11. Audio and Voice Messages',
    name: 'Real-Time Voice Note Recording',
    description: 'Record voice messages with live duration counter and mic visualizer.',
    status: 'Hardware/Permission Dependent',
    platformNotes: 'MediaRecorder + AudioContext analyzer',
    actionKey: 'start_voice_note'
  },
  {
    id: 'FEAT-191',
    category: '11. Audio and Voice Messages',
    name: 'Dynamic Animated Audio Waveform',
    description: 'Real-time Canvas waveform visualizer reacting to audio amplitude in real-time.',
    status: 'Operational',
    platformNotes: 'Canvas 2D frequency visualizer',
    actionKey: 'view_waveform'
  },
  {
    id: 'FEAT-192',
    category: '11. Audio and Voice Messages',
    name: 'Playback Speed Controls (1x, 1.25x, 1.5x, 2x)',
    description: 'Adjust voice message playback speed on the fly with pitch-preserving speed chip.',
    status: 'Operational',
    platformNotes: 'HTMLAudioElement.playbackRate',
    actionKey: 'toggle_playback_speed'
  },
  {
    id: 'FEAT-193',
    category: '11. Audio and Voice Messages',
    name: 'Interactive Audio Scrubbing Bar',
    description: 'Drag or click anywhere on the waveform bar to jump to specific timestamps.',
    status: 'Operational',
    platformNotes: 'Interactive scrub bar with current time indicator',
    actionKey: 'scrub_audio'
  },
  {
    id: 'FEAT-194',
    category: '11. Audio and Voice Messages',
    name: 'Pause, Resume & Discard Recording Controls',
    description: 'Pause recording, preview captured audio, and resume or discard before sending.',
    status: 'Operational',
    platformNotes: 'MediaRecorder pause/resume controls in composer',
    actionKey: 'control_voice_recording'
  },
  {
    id: 'FEAT-195',
    category: '11. Audio and Voice Messages',
    name: 'Audio File Sharing (MP3, WAV, M4A)',
    description: 'Attach and send audio recordings and music files directly into conversation.',
    status: 'Operational',
    platformNotes: 'Audio attachment uploader',
    actionKey: 'send_audio_file'
  },
  {
    id: 'FEAT-196',
    category: '11. Audio and Voice Messages',
    name: 'Voice Message Bookmarks',
    description: 'Add timestamp markers on long voice recordings to bookmark key highlights.',
    status: 'Operational',
    platformNotes: 'Timestamped markers on waveform',
    actionKey: 'bookmark_voice_note'
  },
  {
    id: 'FEAT-197',
    category: '11. Audio and Voice Messages',
    name: 'Music Track Sharing Card',
    description: 'Rich card preview with album cover art, song title, artist, and embedded player.',
    status: 'Operational',
    platformNotes: 'Music player card in chat',
    actionKey: 'share_music_track'
  },
  {
    id: 'FEAT-198',
    category: '11. Audio and Voice Messages',
    name: 'Shared Collaborative Playlist Card',
    description: 'Create and contribute songs to shared group playlists.',
    status: 'Operational',
    platformNotes: 'Playlist card in conversation',
    actionKey: 'share_playlist'
  },
  {
    id: 'FEAT-199',
    category: '11. Audio and Voice Messages',
    name: 'Synchronized Listening Room (Audio SharePlay)',
    description: 'Listen to music tracks synchronously with peers with synced playhead.',
    status: 'Operational',
    platformNotes: 'BroadcastChannel playhead synchronization',
    actionKey: 'start_listening_room'
  },
  {
    id: 'FEAT-200',
    category: '11. Audio and Voice Messages',
    name: 'Podcast Episode Sharing Card',
    description: 'Share podcast episodes with custom jump-to timestamp markers.',
    status: 'Operational',
    platformNotes: 'Podcast card with timestamp jump',
    actionKey: 'share_podcast'
  },
  {
    id: 'FEAT-201',
    category: '11. Audio and Voice Messages',
    name: 'Audio Device Output Selector for Notes',
    description: 'Route voice notes to earpiece mode or main speakers.',
    status: 'Hardware/Permission Dependent',
    platformNotes: 'HTMLMediaElement.setSinkId',
    actionKey: 'select_audio_output'
  },
  {
    id: 'FEAT-202',
    category: '11. Audio and Voice Messages',
    name: 'Manual Non-AI Transcription Assistant',
    description: 'Manual typing transcription pad with automatic audio pause on keystroke.',
    status: 'Operational',
    platformNotes: 'Productivity tool for human transcription (strictly zero AI)',
    actionKey: 'open_manual_transcription'
  },

  // --- 12. Photos, Videos, and Files (14 Features) ---
  {
    id: 'FEAT-203',
    category: '12. Photos, Videos, and Files',
    name: 'Drag-and-Drop Multi-File Uploader',
    description: 'Drag multiple photos, videos, or documents directly into conversation window.',
    status: 'Operational',
    platformNotes: 'HTML5 Drag and Drop File API',
    actionKey: 'upload_files'
  },
  {
    id: 'FEAT-204',
    category: '12. Photos, Videos, and Files',
    name: 'In-App Live Camera Snapshot Capture',
    description: 'Capture photo snapshots directly using connected webcam with preview.',
    status: 'Hardware/Permission Dependent',
    platformNotes: 'Webcam snapshot via Canvas 2D capture',
    actionKey: 'capture_camera_photo'
  },
  {
    id: 'FEAT-205',
    category: '12. Photos, Videos, and Files',
    name: 'Canvas Image Editor & Filters',
    description: 'Crop, rotate, and apply photo filters (Noir, Vivid, Warm, Cool, Silver) before sending.',
    status: 'Operational',
    platformNotes: 'Canvas 2D pixel manipulation filters',
    actionKey: 'open_image_editor'
  },
  {
    id: 'FEAT-206',
    category: '12. Photos, Videos, and Files',
    name: 'High-Fidelity Video Player with Scrubbing',
    description: 'In-app video player with fullscreen mode, timeline scrubbing, volume, and looping.',
    status: 'Operational',
    platformNotes: 'Custom video player component',
    actionKey: 'open_video_player'
  },
  {
    id: 'FEAT-207',
    category: '12. Photos, Videos, and Files',
    name: 'Video Trim Preview Tool',
    description: 'Set start and end markers to preview trimmed video clip prior to dispatch.',
    status: 'Operational',
    platformNotes: 'HTML5 Video currentTime clamping',
    actionKey: 'open_video_trimmer'
  },
  {
    id: 'FEAT-208',
    category: '12. Photos, Videos, and Files',
    name: 'Shared Media Gallery Viewer',
    description: 'Categorized gallery tab showing all Photos, Videos, and Files sent in conversation.',
    status: 'Operational',
    platformNotes: 'Shared media browser in Chat Details',
    actionKey: 'open_media_gallery'
  },
  {
    id: 'FEAT-209',
    category: '12. Photos, Videos, and Files',
    name: 'Original-Quality vs Data-Saver Uploads',
    description: 'Toggle between lossless original upload or client-side compressed data saver.',
    status: 'Operational',
    platformNotes: 'Canvas JPEG compression quality slider',
    actionKey: 'toggle_upload_compression'
  },
  {
    id: 'FEAT-210',
    category: '12. Photos, Videos, and Files',
    name: 'Universal Document Attachments (PDF, DOCX, ZIP)',
    description: 'Share PDFs, spreadsheets, archives, and code files with file size and type badges.',
    status: 'Operational',
    platformNotes: 'File attachment card component',
    actionKey: 'attach_document'
  },
  {
    id: 'FEAT-211',
    category: '12. Photos, Videos, and Files',
    name: 'In-App Document and PDF Viewer Modal',
    description: 'Inspect PDF, Markdown, and text attachments directly inside floating glass modal.',
    status: 'Operational',
    platformNotes: 'In-app document viewer modal',
    actionKey: 'view_document_modal'
  },
  {
    id: 'FEAT-212',
    category: '12. Photos, Videos, and Files',
    name: 'Rich Open Graph Link Preview Generator',
    description: 'Generates rich link preview cards (title, description, domain, favicon, thumbnail).',
    status: 'Operational',
    platformNotes: 'Deterministic metadata extractor & card builder',
    actionKey: 'generate_link_preview'
  },
  {
    id: 'FEAT-213',
    category: '12. Photos, Videos, and Files',
    name: 'Single-Click File Download Manager',
    description: 'Download any received media or document directly to computer with 1 click.',
    status: 'Operational',
    platformNotes: 'HTMLAnchorElement download trigger',
    actionKey: 'download_file'
  },
  {
    id: 'FEAT-214',
    category: '12. Photos, Videos, and Files',
    name: 'Rich Media Captions Editor',
    description: 'Add text captions and markdown notes to photos or videos before sending.',
    status: 'Operational',
    platformNotes: 'Caption input bar in media preview modal',
    actionKey: 'edit_media_caption'
  },
  {
    id: 'FEAT-215',
    category: '12. Photos, Videos, and Files',
    name: 'Live Photo Simulation',
    description: 'Captures still photo with attached 1.5-second animated burst on press-and-hold.',
    status: 'Operational',
    platformNotes: 'Press-and-hold video loop trigger',
    actionKey: 'play_live_photo'
  },
  {
    id: 'FEAT-216',
    category: '12. Photos, Videos, and Files',
    name: 'Storage Breakdown Meter',
    description: 'Visual breakdown showing megabytes consumed by Images, Videos, Audio, and Files.',
    status: 'Operational',
    platformNotes: 'Settings > Storage meter bar',
    actionKey: 'view_storage_breakdown'
  },

  // --- 13. Search and Organization (14 Features) ---
  {
    id: 'FEAT-217',
    category: '13. Search and Organization',
    name: 'Universal Global Search (Cmd+K)',
    description: 'Global spotlight search across messages, contacts, files, and transaction receipts.',
    status: 'Operational',
    platformNotes: 'Keyboard shortcut Cmd+K / Ctrl+K modal',
    actionKey: 'open_universal_search'
  },
  {
    id: 'FEAT-218',
    category: '13. Search and Organization',
    name: 'Date Range Search Filters',
    description: 'Filter search results: Past 24 Hours, Past Week, Past Month, or Custom Date range.',
    status: 'Operational',
    platformNotes: 'Timestamp range query filter',
    actionKey: 'filter_search_by_date'
  },
  {
    id: 'FEAT-219',
    category: '13. Search and Organization',
    name: 'Sender / Participant Search Filters',
    description: 'Filter universal results to specific contacts or group conversations.',
    status: 'Operational',
    platformNotes: 'Contact selector filter chip',
    actionKey: 'filter_search_by_sender'
  },
  {
    id: 'FEAT-220',
    category: '13. Search and Organization',
    name: 'Starred Messages Quick Drawer',
    description: 'Browse all starred messages across all conversations in a unified drawer.',
    status: 'Operational',
    platformNotes: 'Starred messages side drawer',
    actionKey: 'open_starred_drawer'
  },
  {
    id: 'FEAT-221',
    category: '13. Search and Organization',
    name: 'Chat Archive System',
    description: 'Archive conversations to declutter chat list; unarchive anytime.',
    status: 'Operational',
    platformNotes: 'Archived folder with unarchive action',
    actionKey: 'open_archived_chats'
  },
  {
    id: 'FEAT-222',
    category: '13. Search and Organization',
    name: 'Custom Chat Folders',
    description: 'Organize conversations into custom folders: Work, Personal, Family, Finance, VIP.',
    status: 'Operational',
    platformNotes: 'Folder tabs above chat list',
    actionKey: 'manage_chat_folders'
  },
  {
    id: 'FEAT-223',
    category: '13. Search and Organization',
    name: 'Color-Coded Conversation Tags / Labels',
    description: 'Apply colored tags (Urgent, Follow-up, Project, Family) to any chat.',
    status: 'Operational',
    platformNotes: 'Tag chips on conversation items',
    actionKey: 'add_chat_tag'
  },
  {
    id: 'FEAT-224',
    category: '13. Search and Organization',
    name: 'Pinned Chats Carousel',
    description: 'Pin up to 6 priority contacts to top circular avatar row for 1-click access.',
    status: 'Operational',
    platformNotes: 'Top pinned carousel in chat list',
    actionKey: 'pin_chat_to_top'
  },
  {
    id: 'FEAT-225',
    category: '13. Search and Organization',
    name: 'Shared Links History Directory',
    description: 'Consolidated index of all URLs shared in chat with domain chips and titles.',
    status: 'Operational',
    platformNotes: 'Shared Links tab in chat details',
    actionKey: 'open_shared_links'
  },
  {
    id: 'FEAT-226',
    category: '13. Search and Organization',
    name: 'Attachment Media Search by Extension',
    description: 'Search documents by extension (.pdf, .png, .zip, .mp3, .docx).',
    status: 'Operational',
    platformNotes: 'Extension filter in search modal',
    actionKey: 'filter_attachments_by_ext'
  },
  {
    id: 'FEAT-227',
    category: '13. Search and Organization',
    name: 'Read vs Unread Conversation Filter',
    description: 'Quick toggle pill displaying only conversations containing unread messages.',
    status: 'Operational',
    platformNotes: 'Filter toggle in conversation list header',
    actionKey: 'toggle_unread_only'
  },
  {
    id: 'FEAT-228',
    category: '13. Search and Organization',
    name: 'Conversation Sorting Options',
    description: 'Sort chats by Most Recent, Unread First, or Alphabetical name.',
    status: 'Operational',
    platformNotes: 'Sort menu in conversation list',
    actionKey: 'select_chat_sort'
  },
  {
    id: 'FEAT-229',
    category: '13. Search and Organization',
    name: 'Keyword Highlighting in Message Bubbles',
    description: 'Highlights matched keyword in yellow inside message bubbles during active search.',
    status: 'Operational',
    platformNotes: 'Safe HTML mark tag highlighting',
    actionKey: 'highlight_search_keyword'
  },
  {
    id: 'FEAT-230',
    category: '13. Search and Organization',
    name: 'Saved Messages ("Note to Self") Sandbox',
    description: 'Dedicated private conversation with yourself for personal notes, media, and testing.',
    status: 'Operational',
    platformNotes: 'Permanent self-conversation item',
    actionKey: 'open_note_to_self'
  },

  // --- 14. Cross-Platform Support (11 Features) ---
  {
    id: 'FEAT-231',
    category: '14. Cross-Platform Support',
    name: 'Responsive Triple-Column Layout',
    description: 'Mac desktop 3-column split view, iPad 2-column view, and mobile fluid single-column.',
    status: 'Operational',
    platformNotes: 'CSS media query breakpoints + responsive state',
    actionKey: 'toggle_layout_preview'
  },
  {
    id: 'FEAT-232',
    category: '14. Cross-Platform Support',
    name: 'Collapsible Detail Sidebar',
    description: 'Slide-out right inspector drawer showing chat information, media, and security.',
    status: 'Operational',
    platformNotes: 'Info button in chat header',
    actionKey: 'toggle_detail_sidebar'
  },
  {
    id: 'FEAT-233',
    category: '14. Cross-Platform Support',
    name: 'Keyboard Shortcuts Manager',
    description: 'Full keyboard navigation (Cmd+N new chat, Cmd+K search, Esc close, Cmd+Enter send).',
    status: 'Operational',
    platformNotes: 'Shortcuts cheatsheet modal (Cmd+/)',
    actionKey: 'open_keyboard_shortcuts'
  },
  {
    id: 'FEAT-234',
    category: '14. Cross-Platform Support',
    name: 'Linked Devices Manager',
    description: 'Shows linked macOS, iPhone, iPad, Windows, and Web clients with last active time.',
    status: 'Operational',
    platformNotes: 'Settings > Linked Devices console',
    actionKey: 'open_linked_devices'
  },
  {
    id: 'FEAT-235',
    category: '14. Cross-Platform Support',
    name: 'Multi-Tab BroadcastChannel Synchronization',
    description: 'Real-time multi-window sync: actions in one tab reflect instantly across all tabs.',
    status: 'Operational',
    platformNotes: 'BroadcastChannel("aether_sync_bus")',
    actionKey: 'test_multi_tab_sync'
  },
  {
    id: 'FEAT-236',
    category: '14. Cross-Platform Support',
    name: 'Cross-Device Draft Persistence',
    description: 'Draft typed in one client automatically synchronizes and appears in other clients.',
    status: 'Operational',
    platformNotes: 'Sync bus draft payload propagation',
    actionKey: 'test_draft_sync'
  },
  {
    id: 'FEAT-237',
    category: '14. Cross-Platform Support',
    name: 'System Native Desktop Notifications',
    description: 'Triggers native OS notification banners through Notification API.',
    status: 'Hardware/Permission Dependent',
    platformNotes: 'window.Notification constructor',
    actionKey: 'trigger_desktop_notification'
  },
  {
    id: 'FEAT-238',
    category: '14. Cross-Platform Support',
    name: 'Safe Device Pairing QR Code',
    description: 'QR code generator for securely linking a secondary mobile device or tablet.',
    status: 'Operational',
    platformNotes: 'Encrypted ephemeral pairing token QR',
    actionKey: 'show_pairing_qr'
  },
  {
    id: 'FEAT-239',
    category: '14. Cross-Platform Support',
    name: 'Device Platform Nicknames & Icons',
    description: 'Custom nicknames and platform hardware badges (MacBook Pro, iPhone 15 Pro, iPad).',
    status: 'Operational',
    platformNotes: 'Platform indicator icons',
    actionKey: 'edit_device_nickname'
  },
  {
    id: 'FEAT-240',
    category: '14. Cross-Platform Support',
    name: 'Mobile Touch Swipe Gestures',
    description: 'Swipe-to-reply and swipe-to-archive gestures optimized for mobile touchscreens.',
    status: 'Operational',
    platformNotes: 'Touchstart / Touchmove delta handlers',
    actionKey: 'test_touch_gestures'
  },
  {
    id: 'FEAT-241',
    category: '14. Cross-Platform Support',
    name: 'Network Connection Status Indicator',
    description: 'Persistent banner displaying Online (Green), Syncing (Yellow), or Offline (Red).',
    status: 'Operational',
    platformNotes: 'navigator.onLine event listener',
    actionKey: 'toggle_offline_mode'
  },

  // --- 15. Customization and Accessibility (14 Features) ---
  {
    id: 'FEAT-242',
    category: '15. Customization and Accessibility',
    name: 'Theme Selector (Dark, Light, Auto OLED)',
    description: 'Switch between Midnight Dark, Canvas Light, and System Auto theme.',
    status: 'Operational',
    platformNotes: 'HTML data-theme attribute',
    actionKey: 'toggle_theme'
  },
  {
    id: 'FEAT-243',
    category: '15. Customization and Accessibility',
    name: 'High-Contrast WCAG AAA Mode',
    description: 'Elevates contrast ratios with stark borders and high-visibility text.',
    status: 'Operational',
    platformNotes: 'HTML data-contrast="high" attribute',
    actionKey: 'toggle_high_contrast'
  },
  {
    id: 'FEAT-244',
    category: '15. Customization and Accessibility',
    name: 'Accent Color Selector',
    description: 'Choose signature accent color: Azure Blue, Emerald Green, Royal Violet, Coral, Amber, Cyan.',
    status: 'Operational',
    platformNotes: 'CSS variable --accent-primary palette',
    actionKey: 'select_accent_color'
  },
  {
    id: 'FEAT-245',
    category: '15. Customization and Accessibility',
    name: 'Adjustable Font Size Slider',
    description: 'Adjust text scale from Small (13px), Default (15px), Medium (17px), Large, to XL (20px).',
    status: 'Operational',
    platformNotes: 'Dynamic typography root scaling',
    actionKey: 'adjust_font_size'
  },
  {
    id: 'FEAT-246',
    category: '15. Customization and Accessibility',
    name: 'Reduced Motion Accessibility Mode',
    description: 'Disables spring physics, screen shakes, and particle effects for motion sensitivity.',
    status: 'Operational',
    platformNotes: 'Disables CSS animations & canvas particles',
    actionKey: 'toggle_reduced_motion'
  },
  {
    id: 'FEAT-247',
    category: '15. Customization and Accessibility',
    name: 'Chat Wallpaper Gallery & Custom Upload',
    description: 'Select minimalist frosted wallpaper, dark mesh gradient, or upload custom image.',
    status: 'Operational',
    platformNotes: 'Wallpaper gallery in Settings > Appearance',
    actionKey: 'choose_wallpaper'
  },
  {
    id: 'FEAT-248',
    category: '15. Customization and Accessibility',
    name: 'Bubble Style Selector',
    description: 'Choose bubble shape: Apple Classic Rounded, Modern Squircle, or Compact Flat.',
    status: 'Operational',
    platformNotes: 'Border-radius styling selector',
    actionKey: 'select_bubble_style'
  },
  {
    id: 'FEAT-249',
    category: '15. Customization and Accessibility',
    name: 'Per-Contact Theme & Wallpaper Override',
    description: 'Customize specific wallpaper and accent color per individual conversation.',
    status: 'Operational',
    platformNotes: 'Chat details appearance settings',
    actionKey: 'set_contact_theme_override'
  },
  {
    id: 'FEAT-250',
    category: '15. Customization and Accessibility',
    name: 'Screen-Reader ARIA Live Regions',
    description: 'Announces new incoming messages and call events via aria-live="polite" regions.',
    status: 'Operational',
    platformNotes: 'ARIA live region announcements',
    actionKey: 'test_aria_announcements'
  },
  {
    id: 'FEAT-251',
    category: '15. Customization and Accessibility',
    name: 'Full Keyboard Tab Navigation & Focus Rings',
    description: 'Navigate every button, input, and bubble with Tab key and high-contrast focus rings.',
    status: 'Operational',
    platformNotes: 'CSS :focus-visible outlines',
    actionKey: 'test_keyboard_focus'
  },
  {
    id: 'FEAT-252',
    category: '15. Customization and Accessibility',
    name: 'Left-Hand vs Right-Hand Mobile Alignment',
    description: 'Align composer buttons and actions for left-handed single-hand ergonomics.',
    status: 'Operational',
    platformNotes: 'Ergonomic alignment toggle in Settings',
    actionKey: 'toggle_hand_alignment'
  },
  {
    id: 'FEAT-253',
    category: '15. Customization and Accessibility',
    name: 'Sound Volume Controls for Rings & Effects',
    description: 'Independent volume sliders for call ringtones, message alerts, and tapback sounds.',
    status: 'Operational',
    platformNotes: 'Web Audio MasterGain nodes',
    actionKey: 'adjust_sound_volumes'
  },
  {
    id: 'FEAT-254',
    category: '15. Customization and Accessibility',
    name: 'Custom UI Density (Comfortable vs Compact)',
    description: 'Switch between spacious Comfortable spacing and dense Compact view.',
    status: 'Operational',
    platformNotes: 'UI density padding modifier',
    actionKey: 'toggle_ui_density'
  },
  {
    id: 'FEAT-255',
    category: '15. Customization and Accessibility',
    name: 'Accessible Large-Button Calling Controls Overlay',
    description: 'High-contrast large touch targets for mute, video, and hangup during calls.',
    status: 'Operational',
    platformNotes: 'Large controls mode in video call',
    actionKey: 'toggle_large_calling_controls'
  },

  // --- 16. Social Features (13 Features) ---
  {
    id: 'FEAT-256',
    category: '16. Social Features',
    name: '24-Hour Ephemeral Stories (Status Posts)',
    description: 'Post image or styled text stories that automatically expire after 24 hours.',
    status: 'Operational',
    platformNotes: 'Stories bar above conversation list',
    actionKey: 'create_story'
  },
  {
    id: 'FEAT-257',
    category: '16. Social Features',
    name: 'Story Viewer with Progress Bars',
    description: 'Instagram/Apple style story viewer with timed progress segments and tap-to-skip.',
    status: 'Operational',
    platformNotes: 'Full-screen story modal with progress timers',
    actionKey: 'view_stories'
  },
  {
    id: 'FEAT-258',
    category: '16. Social Features',
    name: 'Direct Story Reply to Private Chat',
    description: 'Reply to any contact’s story; reply lands as a quote in your direct message thread.',
    status: 'Operational',
    platformNotes: 'Story reply composer',
    actionKey: 'reply_to_story'
  },
  {
    id: 'FEAT-259',
    category: '16. Social Features',
    name: 'Contact Mood Status Feed',
    description: 'View current mood emoji and status updates of all contacts in one feed.',
    status: 'Operational',
    platformNotes: 'Social feed tab in Social section',
    actionKey: 'view_mood_feed'
  },
  {
    id: 'FEAT-260',
    category: '16. Social Features',
    name: 'Shared Collaborative Photo Album with Likes',
    description: 'Shared social album inside chats where participants can like and comment on photos.',
    status: 'Operational',
    platformNotes: 'Shared album with heart counter',
    actionKey: 'open_social_album'
  },
  {
    id: 'FEAT-261',
    category: '16. Social Features',
    name: 'Event Invitation Builder with RSVP',
    description: 'Create invitations (Dinner, Birthday, Conference) with date, location, and RSVP buttons.',
    status: 'Operational',
    platformNotes: 'Interactive invitation card in chat',
    actionKey: 'create_event_invitation'
  },
  {
    id: 'FEAT-262',
    category: '16. Social Features',
    name: 'Live RSVP Attendee Tracker',
    description: 'Shows live count and avatar list of Going, Maybe, and Can’t Go responses.',
    status: 'Operational',
    platformNotes: 'RSVP breakdown list in event card',
    actionKey: 'view_rsvp_list'
  },
  {
    id: 'FEAT-263',
    category: '16. Social Features',
    name: 'Collaborative Sticky Notes Pad',
    description: 'Shared notepad in chat details where members can add and edit brainstorm notes.',
    status: 'Operational',
    platformNotes: 'Sticky notes widget in chat info',
    actionKey: 'open_sticky_notes'
  },
  {
    id: 'FEAT-264',
    category: '16. Social Features',
    name: 'Shared Task List with Assignees & Checkboxes',
    description: 'Collaborative task checklist in chat with checkboxes, due dates, and assignee chips.',
    status: 'Operational',
    platformNotes: 'Interactive task checklist in chat',
    actionKey: 'open_shared_tasks'
  },
  {
    id: 'FEAT-265',
    category: '16. Social Features',
    name: 'Meetup Planner with Time & Place Voting',
    description: 'Suggest meetup locations and times; participants vote on their preferred option.',
    status: 'Operational',
    platformNotes: 'Interactive meetup voting card',
    actionKey: 'open_meetup_planner'
  },
  {
    id: 'FEAT-266',
    category: '16. Social Features',
    name: 'Interactive Question / Icebreaker Cards',
    description: 'Send "Ask Me Anything" cards with public or private answer reveals.',
    status: 'Operational',
    platformNotes: 'Question card in chat',
    actionKey: 'send_question_card'
  },
  {
    id: 'FEAT-267',
    category: '16. Social Features',
    name: 'Public vs Private Profile Visibility Toggle',
    description: 'Toggle whether profile and stories are visible to all contacts or only VIP favorites.',
    status: 'Operational',
    platformNotes: 'Settings > Privacy > Profile visibility',
    actionKey: 'toggle_profile_visibility'
  },
  {
    id: 'FEAT-268',
    category: '16. Social Features',
    name: 'Contact Activity & Shared Timeline',
    description: 'Chronological timeline of shared milestones, calls, events, and photos with contact.',
    status: 'Operational',
    platformNotes: 'Timeline view in contact modal',
    actionKey: 'view_activity_timeline'
  },

  // --- 17. Backup and Reliability (12 Features) ---
  {
    id: 'FEAT-269',
    category: '17. Backup and Reliability',
    name: 'One-Click JSON Database Export',
    description: 'Export all conversations, contacts, messages, and settings into portable JSON file.',
    status: 'Operational',
    platformNotes: 'JSON file export trigger',
    actionKey: 'export_json_db'
  },
  {
    id: 'FEAT-270',
    category: '17. Backup and Reliability',
    name: 'Encrypted Password-Protected Backup Creation',
    description: 'Generates AES-GCM encrypted backup package protected with user password.',
    status: 'Operational',
    platformNotes: 'Web Crypto PBKDF2 + AES-GCM export',
    actionKey: 'create_encrypted_backup_file'
  },
  {
    id: 'FEAT-271',
    category: '17. Backup and Reliability',
    name: 'Backup Restore Tool with Conflict Resolution',
    description: 'Restore conversations from JSON/encrypted backup with duplicate resolution.',
    status: 'Operational',
    platformNotes: 'File import and state merger',
    actionKey: 'restore_backup_file'
  },
  {
    id: 'FEAT-272',
    category: '17. Backup and Reliability',
    name: 'Offline Message Queue & Auto-Retry',
    description: 'Queues messages when disconnected and automatically dispatches upon reconnect.',
    status: 'Operational',
    platformNotes: 'Queue worker reacting to window.online',
    actionKey: 'view_offline_queue'
  },
  {
    id: 'FEAT-273',
    category: '17. Backup and Reliability',
    name: 'Visual Connection Status Indicator',
    description: 'Header badge indicating connection health: Online (Green), Syncing, or Offline.',
    status: 'Operational',
    platformNotes: 'Real-time connection banner',
    actionKey: 'inspect_connection_status'
  },
  {
    id: 'FEAT-274',
    category: '17. Backup and Reliability',
    name: 'Real-Time Sync Conflict Resolver',
    description: 'Deterministic timestamp-based last-write-wins conflict resolution algorithm.',
    status: 'Operational',
    platformNotes: 'Deterministic sync engine',
    actionKey: 'run_conflict_resolver'
  },
  {
    id: 'FEAT-275',
    category: '17. Backup and Reliability',
    name: 'Media Cache Manager with "Clear Cache"',
    description: 'Calculates temporary media cache bytes and provides one-click cache purge.',
    status: 'Operational',
    platformNotes: 'Settings > Storage > Clear cache button',
    actionKey: 'clear_media_cache'
  },
  {
    id: 'FEAT-276',
    category: '17. Backup and Reliability',
    name: 'Automatic Media Download Preferences',
    description: 'Configure auto-download behavior: Always, Wi-Fi Only, or Manual click-to-download.',
    status: 'Operational',
    platformNotes: 'Settings > Data usage settings',
    actionKey: 'configure_auto_download'
  },
  {
    id: 'FEAT-277',
    category: '17. Backup and Reliability',
    name: 'Conversation Plain Text (.txt) Export',
    description: 'Export chat transcript into clean, human-readable formatted plain text file.',
    status: 'Operational',
    platformNotes: 'TXT file download in chat menu',
    actionKey: 'export_chat_txt'
  },
  {
    id: 'FEAT-278',
    category: '17. Backup and Reliability',
    name: 'Data Retention Auto-Purge Scheduler',
    description: 'Configure auto-delete policies: Keep Forever, Keep for 1 Year, or Keep for 30 Days.',
    status: 'Operational',
    platformNotes: 'Data retention policy engine',
    actionKey: 'configure_data_retention'
  },
  {
    id: 'FEAT-279',
    category: '17. Backup and Reliability',
    name: 'Database Integrity Check & Repair Tool',
    description: 'Scans message indexes for orphans or corrupted pointers and repairs automatically.',
    status: 'Operational',
    platformNotes: 'Diagnostics > Integrity Check tool',
    actionKey: 'run_db_integrity_check'
  },
  {
    id: 'FEAT-280',
    category: '17. Backup and Reliability',
    name: 'Duplicate Message Deduplication Engine',
    description: 'Detects and removes duplicate messages by unique message ID hash.',
    status: 'Operational',
    platformNotes: 'Deterministic deduplication index',
    actionKey: 'run_deduplication'
  },

  // --- 18. App Management & Feature Matrix (10 Features) ---
  {
    id: 'FEAT-281',
    category: '18. App Management',
    name: 'User Account Settings Console',
    description: 'Edit personal details, phone, email, bio, security settings, and app preferences.',
    status: 'Operational',
    platformNotes: 'Settings tab in navigation sidebar',
    actionKey: 'open_account_settings'
  },
  {
    id: 'FEAT-282',
    category: '18. App Management',
    name: 'Comprehensive Permissions Dashboard',
    description: 'Audit and manage browser permissions for Camera, Microphone, Location, Notifications.',
    status: 'Operational',
    platformNotes: 'Permissions audit panel in Settings',
    actionKey: 'open_permissions_dashboard'
  },
  {
    id: 'FEAT-283',
    category: '18. App Management',
    name: 'Security Audit Health Report Card',
    description: 'Grades account security posture (PIN, 2FA, Passkey, Recovery phrase, Active sessions).',
    status: 'Operational',
    platformNotes: 'Security health score card (0-100%)',
    actionKey: 'view_security_score'
  },
  {
    id: 'FEAT-284',
    category: '18. App Management',
    name: 'Connected Devices Management Console',
    description: 'Manage paired devices with last location and remote unpair capabilities.',
    status: 'Operational',
    platformNotes: 'Devices panel in Settings',
    actionKey: 'open_devices_console'
  },
  {
    id: 'FEAT-285',
    category: '18. App Management',
    name: 'Third-Party Services Status Panel',
    description: 'Status of non-AI services: OpenStreetMap tile server, WebRTC gateway, E2EE vault.',
    status: 'Operational',
    platformNotes: 'Integrations monitor in Settings',
    actionKey: 'view_integrations_status'
  },
  {
    id: 'FEAT-286',
    category: '18. App Management',
    name: 'Security & Audit Session Logs',
    description: 'Chronological log of authentication events, password updates, and session changes.',
    status: 'Operational',
    platformNotes: 'Audit log in Security settings',
    actionKey: 'view_audit_logs'
  },
  {
    id: 'FEAT-287',
    category: '18. App Management',
    name: 'Community Moderation Dashboard',
    description: 'Review flagged spam messages, abuse reports, and apply moderation actions.',
    status: 'Operational',
    platformNotes: 'Moderator dashboard modal',
    actionKey: 'open_moderation_dashboard'
  },
  {
    id: 'FEAT-288',
    category: '18. App Management',
    name: 'Diagnostic Tools (Ping, Loopback, Audio)',
    description: 'Live test utilities: WebRTC loopback latency ping, Web Audio test tone generator.',
    status: 'Operational',
    platformNotes: 'Diagnostics suite in Settings',
    actionKey: 'open_diagnostics'
  },
  {
    id: 'FEAT-289',
    category: '18. App Management',
    name: 'Service Status Health Monitor',
    description: 'Monitors health and latency of Messaging Bus, Audio Engine, Map Tiles, and Vault.',
    status: 'Operational',
    platformNotes: 'Live latency ping monitor',
    actionKey: 'view_service_health'
  },
  {
    id: 'FEAT-290',
    category: '18. App Management',
    name: 'Interactive Feature Matrix & System Inspector (290/290)',
    description: 'Interactive dashboard listing all 290 cataloged features with filters, status, and Jump buttons.',
    status: 'Operational',
    platformNotes: 'Dedicated Feature Matrix tab in main navigation',
    actionKey: 'open_feature_matrix'
  }
];
