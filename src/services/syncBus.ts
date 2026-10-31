// Multi-Tab & Device Real-Time Event Bus via BroadcastChannel

export type SyncEventType =
  | 'NEW_MESSAGE'
  | 'EDIT_MESSAGE'
  | 'DELETE_MESSAGE'
  | 'UNSEND_MESSAGE'
  | 'REACTION_UPDATE'
  | 'TYPING_STATUS'
  | 'PAYMENT_SENT'
  | 'CALL_INITIATED'
  | 'CALL_ANSWERED'
  | 'CALL_ENDED'
  | 'DRAFT_SYNC'
  | 'NEW_STORY'
  | 'LOCATION_UPDATE';

export interface SyncPayload<T = unknown> {
  type: SyncEventType;
  senderDeviceId: string;
  timestamp: number;
  data: T;
}

class SyncBus {
  private channel: BroadcastChannel | null = null;
  private listeners: Map<SyncEventType, Set<(payload: SyncPayload) => void>> = new Map();
  public readonly deviceId: string;

  constructor() {
    this.deviceId = 'dev_' + Math.random().toString(36).substring(2, 9);
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.channel = new BroadcastChannel('aether_sync_bus');
      this.channel.onmessage = (event) => {
        this.dispatch(event.data);
      };
    } else if (typeof window !== 'undefined') {
      (window as Window).addEventListener('storage', (event: StorageEvent) => {
        if (event.key === 'aether_sync_event' && event.newValue) {
          try {
            const parsed = JSON.parse(event.newValue);
            this.dispatch(parsed);
          } catch {}
        }
      });
    }
  }

  // Publish event to other tabs/windows
  publish<T>(type: SyncEventType, data: T) {
    const payload: SyncPayload<T> = {
      type,
      senderDeviceId: this.deviceId,
      timestamp: Date.now(),
      data,
    };

    if (this.channel) {
      this.channel.postMessage(payload);
    } else if (typeof window !== 'undefined') {
      localStorage.setItem('aether_sync_event', JSON.stringify(payload));
    }
  }

  // Subscribe to specific event type
  subscribe(type: SyncEventType, callback: (payload: SyncPayload) => void): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(callback);

    return () => {
      this.listeners.get(type)?.delete(callback);
    };
  }

  private dispatch(payload: SyncPayload) {
    if (payload.senderDeviceId === this.deviceId) return; // Don't echo to self
    const handlers = this.listeners.get(payload.type);
    if (handlers) {
      handlers.forEach((fn) => {
        try {
          fn(payload);
        } catch (err) {
          console.error('SyncBus handler error:', err);
        }
      });
    }
  }
}

export const syncBus = new SyncBus();
