import { GoogleDriveMediaType, PermissionStatus, DriveUrlParseResult } from '../types/media';

export class GoogleDriveService {
  /**
   * Universal regex pattern matching all standard Google Drive and Google Docs URLs
   */
  private static readonly DRIVE_PATTERNS = [
    // Standard file view/preview: drive.google.com/file/d/{id}/...
    /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i,
    // Open by ID: drive.google.com/open?id={id}
    /drive\.google\.com\/open\?(?:.*&)?id=([a-zA-Z0-9_-]+)/i,
    // Direct UC download: drive.google.com/uc?id={id} or docs.google.com/uc?id={id}
    /(?:drive|docs)\.google\.com\/uc\?(?:.*&)?id=([a-zA-Z0-9_-]+)/i,
    // Google Docs document: docs.google.com/document/d/{id}/...
    /docs\.google\.com\/document\/d\/([a-zA-Z0-9_-]+)/i,
    // Google Spreadsheets: docs.google.com/spreadsheets/d/{id}/...
    /docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/i,
    // Google Presentation (Slides): docs.google.com/presentation/d/{id}/...
    /docs\.google\.com\/presentation\/d\/([a-zA-Z0-9_-]+)/i,
    // Google Drive Folders: drive.google.com/drive/(?:u/\d+/)?folders/{id}
    /drive\.google\.com\/drive\/(?:u\/\d+\/)?folders\/([a-zA-Z0-9_-]+)/i,
  ];

  /**
   * Extract Google Drive ID from any supported Google Drive link
   */
  static extractDriveId(url: string): { id: string | null; isFolder: boolean } {
    if (!url || typeof url !== 'string') return { id: null, isFolder: false };

    const trimmed = url.trim();

    // Check for folder
    const folderMatch = trimmed.match(/drive\.google\.com\/drive\/(?:u\/\d+\/)?folders\/([a-zA-Z0-9_-]+)/i);
    if (folderMatch && folderMatch[1]) {
      return { id: folderMatch[1], isFolder: true };
    }

    for (const pattern of this.DRIVE_PATTERNS) {
      const match = trimmed.match(pattern);
      if (match && match[1]) {
        return { id: match[1], isFolder: false };
      }
    }

    return { id: null, isFolder: false };
  }

  /**
   * Detect category based on URL markers, file extensions, and naming clues
   */
  static detectCategory(rawText: string, driveId?: string): GoogleDriveMediaType {
    const lower = rawText.toLowerCase();

    // 1. Google Workspace Specific
    if (lower.includes('docs.google.com/document')) return 'document';
    if (lower.includes('docs.google.com/spreadsheets')) return 'document';
    if (lower.includes('docs.google.com/presentation')) return 'document';

    // 2. Video / Movie hints
    if (
      /\.(mp4|mkv|mov|avi|webm|m4v|wmv|flv)($|[?&#/\s])/i.test(lower) ||
      lower.includes('movie') ||
      lower.includes('film') ||
      lower.includes('trailer') ||
      lower.includes('cinema') ||
      lower.includes('1080p') ||
      lower.includes('720p') ||
      lower.includes('4k') ||
      lower.includes('video')
    ) {
      return 'movie';
    }

    // 3. Audio / Music hints
    if (
      /\.(mp3|wav|ogg|flac|m4a|aac|wma|aiff)($|[?&#/\s])/i.test(lower) ||
      lower.includes('music') ||
      lower.includes('song') ||
      lower.includes('audio') ||
      lower.includes('soundtrack') ||
      lower.includes('podcast') ||
      lower.includes('album') ||
      lower.includes('track')
    ) {
      return 'music';
    }

    // 4. Books / Literature / Academic PDFs
    if (
      /\.(epub|mobi|azw3)($|[?&#/\s])/i.test(lower) ||
      (lower.includes('.pdf') && (lower.includes('book') || lower.includes('novel') || lower.includes('read') || lower.includes('edition'))) ||
      lower.includes('novel') ||
      lower.includes('ebook') ||
      lower.includes('handbook')
    ) {
      return 'book';
    }

    // 5. General PDF / Office Documents
    if (
      /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt|rtf|csv|md)($|[?&#/\s])/i.test(lower) ||
      lower.includes('document') ||
      lower.includes('sheet') ||
      lower.includes('slide') ||
      lower.includes('presentation') ||
      lower.includes('report') ||
      lower.includes('contract') ||
      lower.includes('guide')
    ) {
      return 'document';
    }

    // 6. Image hints
    if (
      /\.(jpg|jpeg|png|gif|webp|svg|bmp|tiff|avif)($|[?&#/\s])/i.test(lower) ||
      lower.includes('photo') ||
      lower.includes('image') ||
      lower.includes('picture') ||
      lower.includes('wallpaper') ||
      lower.includes('gallery') ||
      lower.includes('screenshot')
    ) {
      return 'image';
    }

    // Default heuristic: If drive file without extension, treat as movie or document
    return 'movie';
  }

  /**
   * Infer human-readable title from URL or context
   */
  static inferTitle(rawUrl: string, detectedType: GoogleDriveMediaType): string {
    try {
      const urlObj = new URL(rawUrl);
      
      // Check query params like filename or title
      const explicitName = urlObj.searchParams.get('filename') || urlObj.searchParams.get('title') || urlObj.searchParams.get('name');
      if (explicitName) {
        return decodeURIComponent(explicitName).replace(/[-_]+/g, ' ').replace(/\.[a-z0-9]+$/i, '');
      }

      // Check path segments
      const segments = urlObj.pathname.split('/').filter(Boolean);
      for (const seg of segments) {
        if (seg.includes('.') && !seg.includes('view') && !seg.includes('preview')) {
          return decodeURIComponent(seg).replace(/[-_]+/g, ' ').replace(/\.[a-z0-9]+$/i, '');
        }
      }
    } catch {}

    const typeLabels: Record<GoogleDriveMediaType, string> = {
      movie: 'Cinema Feature Film',
      music: 'Studio Audio Master',
      book: 'Literary Anthology Edition',
      document: 'Strategic Architecture Specification',
      image: 'Editorial High-Res Visual',
    };

    return `Google Drive ${typeLabels[detectedType]} (${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;
  }

  /**
   * Parse a single Google Drive URL into a complete rich object
   */
  static parseUrl(url: string, manualCategory?: GoogleDriveMediaType): DriveUrlParseResult {
    const { id, isFolder } = this.extractDriveId(url);

    if (!id) {
      return {
        isValid: false,
        driveId: '',
        originalUrl: url,
        previewUrl: '',
        downloadUrl: '',
        thumbnailUrl: '',
        detectedType: 'document',
        inferredTitle: 'Invalid Google Drive Link',
        permissionStatus: 'private_request_needed',
        isFolder: false,
      };
    }

    const detectedType = manualCategory || this.detectCategory(url, id);
    const inferredTitle = this.inferTitle(url, detectedType);

    // Google Drive standard preview & thumbnail endpoints
    const previewUrl = isFolder
      ? `https://drive.google.com/embeddedfolderview?id=${id}#grid`
      : `https://drive.google.com/file/d/${id}/preview`;

    const downloadUrl = `https://docs.google.com/uc?export=download&id=${id}`;
    
    // High-resolution thumbnail endpoint supported by Google Drive
    const thumbnailUrl = `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;

    // Permission detection: check sharing parameters
    const hasSharingParams = url.includes('usp=sharing') || url.includes('usp=drive_link') || url.includes('/view');
    const permissionStatus: PermissionStatus = hasSharingParams ? 'public' : 'verified';

    return {
      isValid: true,
      driveId: id,
      originalUrl: url,
      previewUrl,
      downloadUrl,
      thumbnailUrl,
      detectedType,
      inferredTitle,
      permissionStatus,
      isFolder,
    };
  }

  /**
   * Parse multiple URLs from a bulk text (separated by newlines, spaces, or commas)
   */
  static parseMultipleUrls(rawText: string): DriveUrlParseResult[] {
    if (!rawText) return [];

    // Extract all candidate URLs
    const urlRegex = /(https?:\/\/[^\s,]+)/g;
    const matches = rawText.match(urlRegex) || [];

    const results: DriveUrlParseResult[] = [];
    const seenIds = new Set<string>();

    for (const match of matches) {
      const parsed = this.parseUrl(match);
      if (parsed.isValid && !seenIds.has(parsed.driveId)) {
        seenIds.add(parsed.driveId);
        results.push(parsed);
      }
    }

    return results;
  }

  /**
   * Scan text (e.g. chat composer or social post) for any Google Drive links
   */
  static detectDriveLinksInText(text: string): DriveUrlParseResult[] {
    if (!text || !text.includes('google.com')) return [];
    return this.parseMultipleUrls(text);
  }

  /**
   * Generate an internal shareable link for a media item
   */
  static generateInternalShareUrl(mediaId: string): string {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://aether-drive.onrender.com';
    return `${origin}/#media=${mediaId}`;
  }

  /**
   * Formatted file size string
   */
  static formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  /**
   * Format seconds to mm:ss or hh:mm:ss
   */
  static formatDuration(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
