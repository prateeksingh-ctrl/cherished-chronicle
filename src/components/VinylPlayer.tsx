import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Music, Volume2 } from 'lucide-react';
import { songs } from '../data/mockData';

const VinylPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSong = songs[currentSongIndex];

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section
      id="music"
      className="relative min-h-screen bg-crimson-vignette py-24"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <Music className="mx-auto mb-4 h-10 w-10 text-magazine-gold" />
          <h2 className="font-editorial text-5xl font-bold text-magazine-cream md:text-6xl">
            Our Soundtrack
          </h2>
          <p className="mt-4 font-handwritten text-2xl text-magazine-cream/70">
            The songs that tell our story
          </p>
        </motion.div>

        {/* Vinyl Player UI */}
        <div className="flex flex-col items-center justify-center gap-12 lg:flex-row">
          {/* Vinyl Record */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Record */}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{
                duration: 3,
                repeat: isPlaying ? Infinity : 0,
                ease: 'linear',
              }}
              className="relative h-64 w-64 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl sm:h-80 sm:w-80"
            >
              {/* Grooves */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-600/30"
                  style={{
                    width: `${60 + i * 10}%`,
                    height: `${60 + i * 10}%`,
                  }}
                />
              ))}

              {/* Center label with album art */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSong.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-magazine-gold shadow-lg sm:h-28 sm:w-28"
                >
                  <img
                    src={currentSong.coverUrl}
                    alt={currentSong.title}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
            </motion.div>

            {/* Tone arm */}
            <motion.div
              animate={{ rotate: isPlaying ? 25 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute -right-8 top-0 origin-top-right"
            >
              <div className="h-32 w-2 rounded-full bg-gradient-to-b from-magazine-gold to-magazine-gold/50 shadow-lg" />
              <div className="absolute -bottom-2 -left-1 h-4 w-4 rounded-full bg-magazine-gold shadow-md" />
            </motion.div>
          </motion.div>

          {/* Controls Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-3xl p-8 text-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSong.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6"
              >
                <h3 className="font-editorial text-3xl font-semibold text-magazine-cream">
                  {currentSong.title}
                </h3>
                <p className="mt-2 font-handwritten text-xl text-magazine-gold">
                  {currentSong.artist}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="h-1 w-64 rounded-full bg-white/20">
                <motion.div
                  className="h-full rounded-full bg-gold-gradient"
                  animate={{ width: isPlaying ? '100%' : '0%' }}
                  transition={{ duration: 180, ease: 'linear' }}
                  style={{ width: '35%' }}
                />
              </div>
              <div className="mt-2 flex justify-between font-body text-xs text-magazine-cream/60">
                <span>1:24</span>
                <span>3:45</span>
              </div>
            </div>

            {/* Control buttons */}
            <div className="flex items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevSong}
                className="rounded-full p-3 text-magazine-cream/70 transition-colors hover:bg-white/10 hover:text-magazine-cream"
              >
                <SkipBack className="h-6 w-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-magazine-gold text-magazine-dark shadow-lg shadow-magazine-gold/30 transition-shadow hover:shadow-xl hover:shadow-magazine-gold/40"
              >
                {isPlaying ? (
                  <Pause className="h-7 w-7" />
                ) : (
                  <Play className="ml-1 h-7 w-7" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSong}
                className="rounded-full p-3 text-magazine-cream/70 transition-colors hover:bg-white/10 hover:text-magazine-cream"
              >
                <SkipForward className="h-6 w-6" />
              </motion.button>
            </div>

            {/* Volume */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <Volume2 className="h-4 w-4 text-magazine-cream/50" />
              <div className="h-1 w-24 rounded-full bg-white/20">
                <div className="h-full w-3/4 rounded-full bg-magazine-gold/60" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Song list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {songs.map((song, index) => (
            <motion.button
              key={song.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSongIndex(index)}
              className={`flex items-center gap-3 rounded-full px-5 py-2.5 font-body text-sm transition-all ${
                index === currentSongIndex
                  ? 'bg-magazine-gold text-magazine-dark'
                  : 'bg-white/10 text-magazine-cream hover:bg-white/20'
              }`}
            >
              <span className="font-medium">{song.title}</span>
              <span className="text-xs opacity-70">• {song.artist}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VinylPlayer;
