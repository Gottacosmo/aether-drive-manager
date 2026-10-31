// WebRTC, Media Stream and Canvas Video Processing Service

export class WebRTCService {
  private localStream: MediaStream | null = null;
  private screenStream: MediaStream | null = null;
  private canvasProcessingStream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private blurAnimationId: number | null = null;

  // Request user camera and microphone with configurable constraints
  async getLocalMedia(video: boolean = true, audio: boolean = true, noiseSuppression: boolean = true): Promise<MediaStream> {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.localStream = await navigator.mediaDevices.getUserMedia({
          video: video ? { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' } : false,
          audio: audio ? { echoCancellation: true, noiseSuppression: noiseSuppression } : false,
        });
        return this.localStream;
      }
    } catch {
      console.warn('Real camera/mic unavailable. Initializing high-fidelity simulated media stream.');
    }

    // Fallback: Generate procedural video stream from canvas
    return this.createSimulatedMediaStream();
  }

  // Request display screen sharing
  async getScreenShare(): Promise<MediaStream | null> {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        this.screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });
        return this.screenStream;
      }
    } catch {
      console.warn('Screen share permission denied or unsupported');
    }
    return null;
  }

  // Real-Time Canvas 2D Video Background Blur Pipeline
  applyBackgroundBlur(videoElement: HTMLVideoElement, blurAmount: number = 14): MediaStream {
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');

    const renderLoop = () => {
      if (ctx && videoElement.readyState >= 2) {
        ctx.save();
        ctx.filter = `blur(${blurAmount}px)`;
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        ctx.restore();

        // Draw clear centered portrait subject simulation
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(canvas.width / 2, canvas.height / 2 + 50, 240, 320, 0, 0, Math.PI * 2);
        ctx.clip();
        ctx.filter = 'none';
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        ctx.restore();
      }
      this.blurAnimationId = requestAnimationFrame(renderLoop);
    };

    renderLoop();
    this.canvasProcessingStream = canvas.captureStream(30);
    return this.canvasProcessingStream;
  }

  stopBackgroundBlur() {
    if (this.blurAnimationId) {
      cancelAnimationFrame(this.blurAnimationId);
      this.blurAnimationId = null;
    }
  }

  // Start local call recording with MediaRecorder
  startRecording(stream: MediaStream): boolean {
    try {
      this.recordedChunks = [];
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';

      this.mediaRecorder = new MediaRecorder(stream, { mimeType });
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };
      this.mediaRecorder.start(1000); // 1-second chunks
      return true;
    } catch {
      return false;
    }
  }

  // Stop recording and prompt local file download
  stopRecording(): string | null {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
      const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
      const downloadUrl = URL.createObjectURL(blob);

      // Trigger automatic save
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `Aether_Call_Recording_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      return downloadUrl;
    }
    return null;
  }

  // Generate procedural canvas video stream for zero-hardware environments
  private createSimulatedMediaStream(): MediaStream {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    let hue = 210;

    const draw = () => {
      if (ctx) {
        hue = (hue + 0.2) % 360;
        ctx.fillStyle = `hsl(${hue}, 40%, 15%)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Simulated avatar silhouette
        ctx.fillStyle = `hsl(${hue}, 60%, 55%)`;
        ctx.beginPath();
        ctx.arc(320, 200, 80, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(320, 380, 160, 120, 0, 0, Math.PI * 2);
        ctx.fill();

        // Watermark badge
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = 'bold 16px -apple-system, sans-serif';
        ctx.fillText('AETHER HD VIDEO', 20, 450);
      }
      requestAnimationFrame(draw);
    };
    draw();

    return canvas.captureStream(30);
  }

  stopAll() {
    this.stopBackgroundBlur();
    if (this.localStream) {
      this.localStream.getTracks().forEach((t) => t.stop());
      this.localStream = null;
    }
    if (this.screenStream) {
      this.screenStream.getTracks().forEach((t) => t.stop());
      this.screenStream = null;
    }
  }
}

export const webrtcService = new WebRTCService();
