import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MagicalSnow = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    // Create 50 floating particles
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Random Horizontal position %
      y: Math.random() * 100, // Random Vertical position %
      size: Math.random() * 3 + 1, // Random size between 1px and 4px
      duration: Math.random() * 20 + 10, // Slow float (10-30s)
      delay: Math.random() * -20 // Start at random times
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${i % 3 === 0 ? 'bg-magazine-gold' : 'bg-white'}`}
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            opacity: i % 3 === 0 ? 0.3 : 0.15, // Gold is brighter, white is subtle
            boxShadow: i % 3 === 0 ? '0 0 10px rgba(212,175,55,0.4)' : 'none'
          }}
          initial={{ top: -10 }}
          animate={{ 
            top: "110%", // Fall to bottom
            x: ["-10px", "10px", "-10px"] // Sway left/right
          }} 
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
            x: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      ))}
    </div>
  );
};

export default MagicalSnow;