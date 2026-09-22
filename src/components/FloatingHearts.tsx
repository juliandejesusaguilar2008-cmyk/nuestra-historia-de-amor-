import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  character: string;
}

export const FloatingHearts: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const chars = ['❤️', '💖', '✨', '🌸', '🤍', '💕'];
    const count = 18; // Sutil y delicado, sin sobrecargar la pantalla
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100, // porcentaje horizontal
        size: 10 + Math.random() * 14,
        duration: 14 + Math.random() * 16, // movimiento lento y soñador
        delay: Math.random() * 15,
        opacity: 0.15 + Math.random() * 0.35,
        character: chars[Math.floor(Math.random() * chars.length)],
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div
      id="floating-hearts-container"
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute select-none animate-float-heart will-change-transform"
          style={{
            left: `${p.x}%`,
            bottom: '-40px',
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          }}
        >
          {p.character}
        </span>
      ))}
      <style>{`
        @keyframes floatHeart {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.9);
            opacity: 0;
          }
          10% {
            opacity: 0.45;
          }
          50% {
            transform: translateY(-50vh) rotate(15deg) scale(1.1);
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-105vh) rotate(-20deg) scale(0.95);
            opacity: 0;
          }
        }
        .animate-float-heart {
          animation-name: floatHeart;
        }
      `}</style>
    </div>
  );
};
