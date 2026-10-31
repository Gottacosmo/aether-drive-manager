import React, { useEffect, useRef } from 'react';
import { MessageEffect } from '../../types';

export const ScreenEffects: React.FC<{ effect: MessageEffect; onComplete?: () => void }> = ({
  effect,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (effect === 'none' || effect === 'slam' || effect === 'loud' || effect === 'gentle' || effect === 'invisible_ink') {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId: number;
    let startTime = Date.now();
    const duration = 3500; // 3.5 seconds

    // Particles Data
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
    }[] = [];

    const colors = ['#007aff', '#34c759', '#af52de', '#ff2d55', '#ff9500', '#ffd60a'];

    // Initialize particles according to effect
    if (effect === 'confetti') {
      for (let i = 0; i < 120; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: -20 - Math.random() * 200,
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 4 + 3,
          size: Math.random() * 8 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
        });
      }
    } else if (effect === 'balloons') {
      for (let i = 0; i < 25; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 200,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -(Math.random() * 3 + 2.5),
          size: Math.random() * 20 + 25,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: 0,
          rotationSpeed: 0,
        });
      }
    } else if (effect === 'hearts') {
      for (let i = 0; i < 45; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 100,
          vx: (Math.random() - 0.5) * 2,
          vy: -(Math.random() * 3.5 + 2),
          size: Math.random() * 14 + 12,
          color: '#ff2d55',
          rotation: (Math.random() - 0.5) * 0.3,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
        });
      }
    }

    const render = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed > duration) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onComplete?.();
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (effect === 'lasers') {
        // Draw Sci-Fi Laser Beams
        ctx.lineWidth = 4;
        for (let i = 0; i < 6; i++) {
          const t = (elapsed / 400 + i) % 10;
          ctx.strokeStyle = i % 2 === 0 ? '#32ade6' : '#af52de';
          ctx.shadowBlur = 20;
          ctx.shadowColor = ctx.strokeStyle;
          ctx.beginPath();
          ctx.moveTo(0, canvas.height * (i / 6));
          ctx.lineTo(canvas.width, (canvas.height * (1 - i / 6) + Math.sin(t) * 100));
          ctx.stroke();
        }
      } else if (effect === 'fireworks') {
        // Draw Fireworks explosions
        const centers = [
          { x: canvas.width * 0.3, y: canvas.height * 0.35, color: '#ff2d55' },
          { x: canvas.width * 0.7, y: canvas.height * 0.28, color: '#ffd60a' },
          { x: canvas.width * 0.5, y: canvas.height * 0.45, color: '#007aff' },
        ];
        centers.forEach((c) => {
          const progress = (elapsed % 1200) / 1200;
          const radius = progress * 160;
          ctx.strokeStyle = c.color;
          ctx.shadowBlur = 15;
          ctx.shadowColor = c.color;
          for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
            ctx.beginPath();
            ctx.moveTo(c.x + Math.cos(a) * (radius * 0.3), c.y + Math.sin(a) * (radius * 0.3));
            ctx.lineTo(c.x + Math.cos(a) * radius, c.y + Math.sin(a) * radius);
            ctx.stroke();
          }
        });
      } else {
        // Particle renderer (confetti, balloons, hearts)
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.rotationSpeed;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;

          if (effect === 'confetti') {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
          } else if (effect === 'balloons') {
            // Balloon body
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 0.7, p.size, 0, 0, Math.PI * 2);
            ctx.fill();
            // String
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(0, p.size);
            ctx.lineTo(Math.sin(elapsed / 100) * 8, p.size + 24);
            ctx.stroke();
          } else if (effect === 'hearts') {
            // Heart emoji
            ctx.font = `${p.size}px sans-serif`;
            ctx.fillText('❤️', -p.size / 2, p.size / 2);
          }

          ctx.restore();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [effect, onComplete]);

  if (effect === 'none' || effect === 'slam' || effect === 'loud' || effect === 'gentle' || effect === 'invisible_ink') {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
};
