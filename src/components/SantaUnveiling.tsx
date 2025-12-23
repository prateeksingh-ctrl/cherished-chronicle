import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Gift, Star, Heart, Sparkles } from 'lucide-react';
import Snowfall from 'react-snowfall';

interface SantaUnveilingProps {
  onUnlock: () => void;
}

const SantaUnveiling = ({ onUnlock }: SantaUnveilingProps) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  
  const dragProgress = useMotionValue(0);
  const sleighX = useTransform(dragProgress, [0, 1], [0, 280]);
  const snowPileX = useTransform(dragProgress, [0, 1], [0, 350]);
  const snowOpacity = useTransform(dragProgress, [0, 0.8, 1], [1, 0.3, 0]);
  const giftScale = useTransform(dragProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  const giftGlow = useTransform(dragProgress, [0, 1], [0, 40]);
  
  // Move this hook to top level - this was causing the error
  const giftBoxShadow = useTransform(
    giftGlow,
    (v) => `0 0 ${v}px ${v / 2}px rgba(197, 160, 89, 0.4)`
  );

  // Memoize star positions to prevent re-renders
  const starPositions = useMemo(() => 
    [...Array(80)].map(() => ({
      width: Math.random() > 0.8 ? 3 : Math.random() > 0.5 ? 2 : 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 70}%`,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    })), []
  );

  const handleDrag = useCallback((event: any, info: any) => {
    const progress = Math.min(Math.max(info.offset.x / 280, 0), 1);
    dragProgress.set(progress);
  }, [dragProgress]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    if (dragProgress.get() > 0.85) {
      animate(dragProgress, 1, { duration: 0.3 });
      setIsUnlocked(true);
      setTimeout(() => setShowMessage(true), 800);
      setTimeout(() => onUnlock(), 2500);
    } else {
      animate(dragProgress, 0, { duration: 0.4, type: 'spring' });
    }
  }, [dragProgress, onUnlock]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-night-sky"
    >
      {/* Heavy Snowfall */}
      <Snowfall
        color="#fff"
        snowflakeCount={180}
        speed={[0.5, 2]}
        wind={[-0.5, 1.5]}
        radius={[1, 4]}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 2,
        }}
      />

      {/* Starfield */}
      <div className="absolute inset-0 z-0">
        {starPositions.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: star.width,
              height: star.width,
              left: star.left,
              top: star.top,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Moon with glow */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute right-[15%] top-[10%] z-[1]"
      >
        <div className="relative h-28 w-28 rounded-full bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-100 shadow-[0_0_80px_20px_rgba(255,250,220,0.3)]">
          <div className="absolute left-4 top-6 h-4 w-4 rounded-full bg-amber-200/30" />
          <div className="absolute bottom-8 right-6 h-3 w-3 rounded-full bg-amber-200/20" />
          <div className="absolute bottom-4 left-8 h-2 w-2 rounded-full bg-amber-200/25" />
        </div>
      </motion.div>

      {/* Aurora effect */}
      <div className="absolute inset-0 z-[1] opacity-20">
        <motion.div
          className="absolute left-0 right-0 top-0 h-1/2"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, hsl(180 60% 30% / 0.3) 30%, hsl(280 60% 30% / 0.2) 60%, transparent 100%)',
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center px-6">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="unlock-interface"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="w-full text-center"
            >
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <div className="mb-4 flex items-center justify-center gap-3">
                  <Star className="h-5 w-5 text-magazine-gold" />
                  <p className="font-body text-xs uppercase tracking-[0.4em] text-magazine-gold/70">
                    Christmas 2025
                  </p>
                  <Star className="h-5 w-5 text-magazine-gold" />
                </div>
                <h1 className="font-display text-5xl font-medium tracking-tight text-magazine-cream md:text-7xl">
                  A Gift For You
                </h1>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="mx-auto mt-6 h-px w-32 origin-center bg-gradient-to-r from-transparent via-magazine-gold to-transparent"
                />
              </motion.div>

              {/* Interactive unlock area */}
              <div className="relative mx-auto w-full max-w-sm">
                {/* Snow pile that gets pushed */}
                <motion.div
                  style={{ x: snowPileX, opacity: snowOpacity }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2"
                >
                  <div className="relative h-20 w-72">
                    <div className="absolute bottom-0 left-0 h-16 w-24 rounded-t-full bg-gradient-to-t from-white/80 to-white/95" />
                    <div className="absolute bottom-0 left-16 h-20 w-32 rounded-t-full bg-gradient-to-t from-white/85 to-white" />
                    <div className="absolute bottom-0 right-0 h-14 w-20 rounded-t-full bg-gradient-to-t from-white/75 to-white/90" />
                  </div>
                </motion.div>

                {/* Gift box behind */}
                <motion.div
                  style={{ scale: giftScale }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <motion.div
                    style={{ boxShadow: giftBoxShadow }}
                    className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-magazine-gold via-amber-400 to-magazine-gold-dark"
                  >
                    <Gift className="h-12 w-12 text-magazine-dark" />
                  </motion.div>
                </motion.div>

                {/* Sleigh track */}
                <div className="relative mx-auto h-32 w-80">
                  <div className="absolute bottom-4 left-4 right-4 h-1 rounded-full bg-magazine-gold/20" />
                  
                  {/* Draggable sleigh */}
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 280 }}
                    dragElastic={0}
                    onDrag={handleDrag}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={handleDragEnd}
                    style={{ x: sleighX }}
                    whileDrag={{ scale: 1.05 }}
                    className="absolute bottom-0 left-0 cursor-grab active:cursor-grabbing"
                  >
                    <motion.div
                      animate={!isDragging ? { y: [0, -4, 0] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="relative"
                    >
                      <div className="relative h-16 w-20">
                        <div className="absolute bottom-0 left-0 right-0 h-10 rounded-bl-2xl rounded-br-sm bg-gradient-to-b from-red-500 to-red-700 shadow-lg">
                          <div className="absolute left-2 top-2 h-1 w-6 rounded-full bg-red-400/50" />
                          <div className="absolute left-2 top-4 h-1 w-4 rounded-full bg-red-400/30" />
                        </div>
                        <div className="absolute -bottom-1 left-1 right-1 h-2 rounded-full bg-magazine-gold shadow-md" />
                        <motion.div
                          animate={{ rotate: [-3, 3, -3] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="absolute -top-1 left-1/2 -translate-x-1/2"
                        >
                          <div className="h-6 w-6 rounded-sm bg-magazine-gold shadow-md">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="h-full w-1 bg-red-500" />
                              <div className="absolute h-1 w-full bg-red-500" />
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Instruction */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-16 font-handwritten text-2xl text-magazine-cream/70"
              >
                <motion.span
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="inline-block"
                >
                  ✦ Drag the sleigh to unwrap your gift ✦
                </motion.span>
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="revealed-message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: 'spring', stiffness: 80 }}
              className="text-center"
            >
              <AnimatePresence>
                {showMessage && (
                  <>
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        initial={{
                          x: 0,
                          y: 0,
                          scale: 0,
                          opacity: 1,
                        }}
                        animate={{
                          x: (Math.random() - 0.5) * 300,
                          y: (Math.random() - 0.5) * 300,
                          scale: [0, 1, 0],
                          opacity: [1, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.05,
                        }}
                      >
                        <Sparkles className="h-4 w-4 text-magazine-gold" />
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.8, type: 'spring' }}
                      className="mb-8"
                    >
                      <motion.div
                        animate={{
                          boxShadow: [
                            '0 0 30px rgba(197, 160, 89, 0.4)',
                            '0 0 60px rgba(197, 160, 89, 0.6)',
                            '0 0 30px rgba(197, 160, 89, 0.4)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mx-auto flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-magazine-gold via-amber-400 to-magazine-gold"
                      >
                        <Heart className="h-16 w-16 text-magazine-dark" fill="currentColor" />
                      </motion.div>
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-display text-5xl font-medium text-magazine-cream md:text-6xl"
                    >
                      Merry Christmas
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-4 font-handwritten text-3xl text-magazine-gold"
                    >
                      My Love ♡
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="mt-8 font-editorial text-lg italic text-magazine-cream/60"
                    >
                      Opening your gift...
                    </motion.p>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ground shimmer */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent" />
    </motion.div>
  );
};

export default SantaUnveiling;