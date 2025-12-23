import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    // changed h-screen to min-h-[100dvh] for better mobile fit
    <section className="min-h-[100dvh] w-full flex flex-col justify-between p-4 md:p-12 relative overflow-hidden bg-magazine-paper">
      
      {/* NEW: Background Cover Image (Subtle Blend) */}
      <div className="absolute inset-0 z-0">
        <img 
          // You can change this URL to a photo of you two, or keep this aesthetic texture
          src="https://images.unsplash.com/photo-1490750967868-53cbaa379680?q=80&w=2000&auto=format&fit=crop" 
          alt="Cover Background" 
          className="w-full h-full object-cover opacity-[0.15] grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-magazine-paper/50 via-transparent to-magazine-paper" />
      </div>

      {/* Header Info */}
      <div className="flex justify-between items-start z-10 relative">
        <span className="font-serif text-lg md:text-2xl tracking-wide">The Chronicles</span>
        <div className="flex flex-col text-right font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase opacity-80">
          <span className="font-bold text-magazine-gold">Vol. 2025</span>
          <span>Holiday Edition</span>
        </div>
      </div>

      {/* Main Title Center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="relative text-center w-full px-4">
          
          {/* Decorative Star/Line for Mobile Filler */}
          <div className="md:hidden w-px h-12 bg-magazine-gold mx-auto mb-6 opacity-50" />

          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="font-serif text-[18vw] md:text-[15vw] leading-[0.85] text-magazine-ink tracking-tighter"
          >
            OUR
          </motion.div>
          
          <motion.div 
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="font-serif text-[18vw] md:text-[15vw] leading-[0.85] italic text-magazine-gold mix-blend-multiply"
          >
            STORY
          </motion.div>

          {/* Subtitle to fill space */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="font-sans text-[10px] md:text-sm tracking-[0.4em] uppercase mt-6 md:mt-12 opacity-60"
          >
            A Year in Review
          </motion.p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-end z-10 relative pb-8 md:pb-0">
         <div className="font-sans text-[10px] uppercase tracking-widest max-w-[150px] md:max-w-[200px] leading-relaxed opacity-70">
            A collection of moments, music, and dreams from the past 365 days.
         </div>
         {/* Hidden on mobile to save space, visible on desktop */}
         <div className="hidden md:block w-px h-24 bg-magazine-ink/20 animate-pulse"></div>
      </div>

    </section>
  );
};

export default HeroSection;