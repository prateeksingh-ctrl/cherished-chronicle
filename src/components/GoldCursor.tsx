import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const GoldCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Smooth spring physics for the cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Check if hovering over clickable elements
    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') !== null ||
        target.closest('.interactive') !== null
      );
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', checkHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', checkHover);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* The Main Ring */}
      <motion.div
        className="absolute w-8 h-8 border border-magazine-gold rounded-full flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 1 : 0.5,
          borderColor: isHovering ? '#D4AF37' : 'rgba(212,175,55,0.3)'
        }}
      >
        <div className="w-1 h-1 bg-magazine-gold rounded-full" />
      </motion.div>
    </div>
  );
};

export default GoldCursor;