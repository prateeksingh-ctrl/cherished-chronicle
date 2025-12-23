import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Gift, Sparkles } from 'lucide-react';
import Snowfall from 'react-snowfall';

interface SantaUnveilingProps {
  onReveal?: () => void;
}

const SantaUnveiling = ({ onReveal }: SantaUnveilingProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [sleighPosition, setSleighPosition] = useState(0);
  const [showGift, setShowGift] = useState(false);
  
  const dragX = useMotionValue(0);
  const sleighX = useTransform(dragX, [0, 300], [0, 100]);
  const snowOpacity = useTransform(dragX, [0, 300], [1, 0]);

  const handleDragEnd = () => {
    if (dragX.get() > 200) {
      setIsRevealed(true);
      setTimeout(() => setShowGift(true), 1000);
      onReveal?.();
    } else {
      dragX.set(0);
    }
  };

  return (
    <section
      id="unveiling"
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0a1628] via-[#1a2a4a] to-[#0a1628]"
    >
      {/* Heavy Snowfall */}
      <div style={{ opacity: snowOpacity.get() }}>
        <Snowfall
          color="#fff"
          snowflakeCount={200}
          speed={[1, 3]}
          wind={[-1, 2]}
          radius={[1, 5]}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 5,
          }}
        />
      </div>

      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute right-20 top-20 h-32 w-32 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-[0_0_60px_rgba(255,255,200,0.5)]"
      />

      {/* Section content */}
      <div className="container relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-4 inline-block"
          >
            <Sparkles className="h-12 w-12 text-magazine-gold" />
          </motion.div>
          <h2 className="font-editorial text-5xl font-bold text-magazine-cream md:text-7xl">
            A Special Surprise
          </h2>
          <p className="mt-4 font-script text-3xl text-magazine-gold">
            awaits you...
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="sleigh"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="relative w-full max-w-2xl"
            >
              {/* Snow pile to plow through */}
              <motion.div
                style={{ x: sleighX, opacity: snowOpacity }}
                className="absolute bottom-0 left-0 right-0 h-48 rounded-t-full bg-gradient-to-t from-white/90 to-white/60"
              >
                {/* Snow texture */}
                <div className="absolute inset-0 overflow-hidden rounded-t-full">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-white/50"
                      style={{
                        width: `${30 + Math.random() * 50}px`,
                        height: `${20 + Math.random() * 30}px`,
                        left: `${Math.random() * 100}%`,
                        bottom: `${Math.random() * 80}%`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Draggable Sleigh */}
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 300 }}
                style={{ x: dragX }}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 1.05 }}
                className="relative z-20 cursor-grab active:cursor-grabbing"
              >
                {/* Santa + Sleigh SVG representation */}
                <div className="relative flex items-end">
                  {/* Sleigh */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="relative"
                  >
                    <div className="relative h-32 w-48">
                      {/* Sleigh body */}
                      <div className="absolute bottom-0 left-0 right-0 h-16 rounded-bl-3xl rounded-br-md bg-gradient-to-b from-red-600 to-red-800 shadow-lg">
                        <div className="absolute -left-2 bottom-0 h-4 w-4 rounded-full bg-magazine-gold" />
                        <div className="absolute -right-2 bottom-0 h-4 w-4 rounded-full bg-magazine-gold" />
                      </div>
                      {/* Gift in sleigh */}
                      <motion.div
                        animate={{ rotate: [-5, 5, -5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2"
                      >
                        <Gift className="h-16 w-16 text-magazine-gold" />
                      </motion.div>
                      {/* Runners */}
                      <div className="absolute -bottom-2 left-2 right-2 h-2 rounded-full bg-magazine-gold shadow-md" />
                    </div>
                  </motion.div>
                </div>

                {/* Instruction */}
                <motion.p
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="mt-8 text-center font-handwritten text-2xl text-magazine-cream"
                >
                  ← Drag the sleigh through the snow →
                </motion.p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="gift"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="text-center"
            >
              <AnimatePresence>
                {showGift && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                  >
                    {/* Gift box */}
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 30px rgba(197, 160, 89, 0.3)',
                          '0 0 60px rgba(197, 160, 89, 0.6)',
                          '0 0 30px rgba(197, 160, 89, 0.3)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mx-auto mb-8 flex h-48 w-48 items-center justify-center rounded-3xl bg-gradient-to-br from-magazine-gold via-yellow-400 to-magazine-gold"
                    >
                      <Gift className="h-24 w-24 text-magazine-dark" />
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-editorial text-4xl font-bold text-magazine-cream md:text-5xl"
                    >
                      Merry Christmas!
                    </motion.h3>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-4 font-script text-3xl text-magazine-gold"
                    >
                      You are my greatest gift
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="mx-auto mt-8 max-w-md rounded-2xl bg-magazine-cream/10 p-8 backdrop-blur-sm"
                    >
                      <p className="font-handwritten text-xl leading-relaxed text-magazine-cream">
                        Every day with you feels like Christmas morning. 
                        Thank you for being the most wonderful part of my life. 
                        Here's to our forever together. 💕
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ground/horizon line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-magazine-gold/50 to-transparent" />
    </section>
  );
};

export default SantaUnveiling;
