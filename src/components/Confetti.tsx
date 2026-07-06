import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle';
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

const COLORS = [
  '#FFC107', // Amber
  '#FF5722', // Deep Orange
  '#E91E63', // Pink
  '#9C27B0', // Purple
  '#3F51B5', // Indigo
  '#00BCD4', // Cyan
  '#4CAF50', // Green
  '#FFEB3B', // Yellow
];

export const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Create a particle
    const createParticle = (x: number, y: number, isLaunch = false): Particle => {
      const size = Math.random() * 8 + 4;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      
      let speedX = (Math.random() - 0.5) * 4;
      let speedY = Math.random() * 3 + 2; // general falling speed

      if (isLaunch) {
        // Explode upwards and outwards
        const angle = Math.random() * Math.PI * 0.4 + Math.PI * 1.3; // Upwards fan
        const force = Math.random() * 12 + 8;
        speedX = Math.cos(angle) * force;
        speedY = Math.sin(angle) * force;
      }

      return {
        x,
        y,
        size,
        color,
        shape,
        speedX,
        speedY,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
      };
    };

    // Initialize with a steady stream from top and corner cannons
    const initParticles = () => {
      // Corner Cannons
      const numCorner = 60;
      // Bottom Left Cannon
      for (let i = 0; i < numCorner; i++) {
        particles.push(createParticle(0, window.innerHeight, true));
      }
      // Bottom Right Cannon
      for (let i = 0; i < numCorner; i++) {
        particles.push(createParticle(window.innerWidth, window.innerHeight, true));
      }

      // Initial top falling ones
      for (let i = 0; i < 80; i++) {
        particles.push(createParticle(Math.random() * window.innerWidth, -50 - Math.random() * 200));
      }
    };

    initParticles();

    // Spawn new ones periodically
    let spawnTimer = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Randomly spawn gentle rain from top
      spawnTimer++;
      if (spawnTimer % 4 === 0 && particles.length < 350) {
        particles.push(createParticle(Math.random() * window.innerWidth, -10));
      }

      // Periodic secondary minor bursts
      if (spawnTimer % 90 === 0 && particles.length < 250) {
        // Bottom left burst
        for (let i = 0; i < 15; i++) {
          particles.push(createParticle(0, window.innerHeight, true));
        }
        // Bottom right burst
        for (let i = 0; i < 15; i++) {
          particles.push(createParticle(window.innerWidth, window.innerHeight, true));
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Apply physics
        p.x += p.speedX;
        p.y += p.speedY;

        // Apply gravity & friction
        p.speedY += 0.18; // gravity
        p.speedX *= 0.98; // friction

        p.rotation += p.rotationSpeed;

        // If falling down, adjust opacity slowly
        if (p.y > window.innerHeight * 0.7) {
          p.opacity -= 0.015;
        }

        // Filter out dead particles
        if (p.y > window.innerHeight + 20 || p.x < -20 || p.x > window.innerWidth + 20 || p.opacity <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        ctx.beginPath();
        if (p.shape === 'circle') {
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'triangle') {
          ctx.moveTo(0, -p.size / 2);
          ctx.lineTo(p.size / 2, p.size / 2);
          ctx.lineTo(-p.size / 2, p.size / 2);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100] w-full h-full"
      style={{ display: 'block' }}
    />
  );
};
