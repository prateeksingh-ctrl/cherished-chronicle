import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX, ExternalLink } from 'lucide-react';

const MusicSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // ========================================
  // 🎵 ADD YOUR MUSIC URL HERE 🎵
  // ========================================
  // Option 1: Direct MP3/audio file URL
  // Option 2: Cloudinary audio URL
  // Option 3: Any direct audio link
  // 
  // Example URLs:
  // - "https://res.cloudinary.com/your-cloud/video/upload/your-song.mp3"
  // - "https://example.com/jingle-bells.mp3"
  // - "https://example.com/the-night-we-met.mp3"
  // ========================================
  const MUSIC_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // Replace with your music URL
  const SONG_TITLE = 'Your Song Title'; // Replace with your song title
  const SONG_ARTIST = 'Artist Name'; // Replace with artist name
  // ========================================

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.loop = true;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          console.log('Autoplay blocked - user needs to interact first');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative overflow-hidden bg-magazine-dark py-24">
      <audio ref={audioRef} src={MUSIC_URL} preload="auto" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A059' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Animated music notes */}
      <div className="absolute inset-0 overflow-hidden">
        {['♪', '♫', '♬', '♩', '♪', '♫'].map((note, i) => (
          <motion.span
            key={i}
            className="absolute text-4xl text-magazine-gold/20"
            style={{
              left: `${10 + i * 15}%`,
              top: '50%',
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {note}
          </motion.span>
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
              viewport={{ once: true }}
              className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-magazine-gold/70"
            >
              The Soundtrack
            </motion.p>
            <h2 className="font-editorial text-5xl font-light text-magazine-cream md:text-6xl lg:text-7xl">
              Our Song
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '80px' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mx-auto mt-6 h-px bg-magazine-gold"
            />
          </motion.div>

          {/* Vinyl Player Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto max-w-xl"
          >
            {/* Main player container */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 shadow-2xl md:p-12">
              {/* Gold border accent */}
              <div className="absolute inset-0 rounded-3xl border border-magazine-gold/20" />
              
              {/* Vinyl record */}
              <div className="flex flex-col items-center md:flex-row md:gap-12">
                {/* Record */}
                <div className="relative mb-8 md:mb-0">
                  <motion.div
                    animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                    transition={isPlaying ? { duration: 3, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
                    className="relative h-48 w-48 rounded-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 shadow-xl md:h-56 md:w-56"
                  >
                    {/* Vinyl grooves */}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute rounded-full border border-neutral-700/50"
                        style={{
                          inset: `${(i + 2) * 10}px`,
                        }}
                      />
                    ))}
                    {/* Center label */}
                    <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-magazine-gold to-yellow-600">
                      <div className="h-4 w-4 rounded-full bg-neutral-900" />
                    </div>
                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
                  </motion.div>
                  
                  {/* Glow effect when playing */}
                  <AnimatePresence>
                    {isPlaying && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 -z-10 rounded-full bg-magazine-gold/20 blur-xl"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Song info and controls */}
                <div className="flex-1 text-center md:text-left">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="mb-1 font-body text-xs uppercase tracking-widest text-magazine-gold/60">
                      Now Playing
                    </p>
                    <h3 className="font-editorial text-2xl text-magazine-cream md:text-3xl">
                      {SONG_TITLE}
                    </h3>
                    <p className="mt-1 font-body text-sm text-magazine-cream/60">
                      {SONG_ARTIST}
                    </p>
                  </motion.div>

                  {/* Controls */}
                  <div className="mt-8 flex items-center justify-center gap-4 md:justify-start">
                    {/* Play/Pause */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={togglePlay}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-magazine-gold text-magazine-dark shadow-lg shadow-magazine-gold/30 transition-colors hover:bg-yellow-500"
                    >
                      {isPlaying ? (
                        <Pause className="h-7 w-7" />
                      ) : (
                        <Play className="h-7 w-7 translate-x-0.5" />
                      )}
                    </motion.button>

                    {/* Mute toggle */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleMute}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 text-magazine-cream/70 transition-colors hover:bg-neutral-700"
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </motion.button>
                  </div>

                  {/* Music bar animation */}
                  {isPlaying && (
                    <div className="mt-6 flex items-end justify-center gap-1 md:justify-start">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            height: [12, 24, 12, 32, 12],
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                          className="w-1 rounded-full bg-magazine-gold"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Instructions for customization */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="font-handwritten text-xl text-magazine-cream/40">
              Edit MusicSection.tsx to add your own music
            </p>
          </motion.div>
        </div>
      </div>

      {/* Decorative page marker */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        viewport={{ once: true }}
        className="absolute bottom-8 right-8 font-editorial text-[12rem] font-bold leading-none text-magazine-gold"
      >
        ♪
      </motion.div>
    </section>
  );
};

export default MusicSection;
