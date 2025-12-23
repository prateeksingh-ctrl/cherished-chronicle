import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="h-screen w-full flex flex-col justify-between p-6 md:p-12 relative overflow-hidden bg-magazine-paper">
      
      {/* Header Info */}
      <div className="flex justify-between items-start z-10">
        <span className="font-serif text-xl md:text-2xl">The Chronicles</span>
        <div className="flex flex-col text-right font-sans text-[10px] md:text-xs tracking-widest uppercase opacity-60">
          <span>Vol. 2025</span>
          <span>Holiday Edition</span>
        </div>
      </div>

      {/* Main Title Center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative text-center z-10">
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="font-serif text-[15vw] leading-[0.8] text-magazine-ink mix-blend-overlay"
          >
            OUR
          </motion.div>
          <motion.div 
             initial={{ y: 100, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="font-serif text-[15vw] leading-[0.8] italic text-magazine-gold mix-blend-multiply"
          >
            STORY
          </motion.div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-end z-10">
         <div className="font-sans text-[10px] uppercase tracking-widest max-w-[200px]">
            A collection of moments, music, and dreams from the past 365 days.
         </div>
         <div className="w-px h-24 bg-magazine-ink/20 animate-pulse"></div>
      </div>

    </section>
  );
};

export default HeroSection;