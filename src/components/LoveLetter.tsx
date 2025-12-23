import { motion } from 'framer-motion';

const LoveLetter = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-32 px-6 bg-[#FDFBF7] relative">
      {/* Decorative Border */}
      <div className="absolute inset-4 md:inset-12 border border-magazine-ink/5 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        <div className="font-sans text-[10px] uppercase tracking-[0.4em] text-magazine-gold mb-12">
          From the Desk of the Editor
        </div>

        <h2 className="font-serif text-5xl md:text-6xl mb-12 text-magazine-ink">
          To My Favorite Person,
        </h2>

        <div className="font-serif text-lg md:text-xl leading-[2.2] text-gray-700 text-justify">
          <p className="mb-8">
            <span className="text-5xl float-left mr-3 mt-[-10px] font-serif text-magazine-gold">I</span>
            f life is a magazine, you are the cover story. This year has been a collection of moments that I want to archive forever. Not just the big wins or the vacations, but the quiet Sundays and the coffee runs.
          </p>
          <p className="mb-8">
            I don't know what 2026 holds, but as long as you are in the byline, I know it will be a bestseller. Thank you for being my muse, my partner, and my best friend.
          </p>
          <p>
            Here is to another volume of us.
          </p>
        </div>

        <div className="mt-16 font-hand text-4xl text-magazine-ink rotate-[-2deg] opacity-80">
          With all my love, <br/> Us.
        </div>
      </motion.div>
    </section>
  );
};

export default LoveLetter;