import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
}

const GoldCursor = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Create new particle
      const newParticle: Particle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
      };

      setParticles((prev) => [...prev.slice(-15), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const cleanup = setInterval(() => {
      setParticles((prev) => prev.slice(1));
    }, 100);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="pointer-events-none fixed z-50 h-6 w-6 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(45 75% 60% / 0.8) 0%, transparent 70%)',
          boxShadow: '0 0 20px hsl(45 75% 60% / 0.5)',
        }}
        animate={{
          x: mousePos.x - 12,
          y: mousePos.y - 12,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Trailing particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="pointer-events-none fixed z-40 h-2 w-2 rounded-full"
            style={{
              background: 'hsl(45 75% 60% / 0.6)',
              left: particle.x - 4,
              top: particle.y - 4,
            }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default GoldCursor;
