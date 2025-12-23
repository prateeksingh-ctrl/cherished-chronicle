import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Sparkles, Heart, Plane, Home, Star } from 'lucide-react';

interface Dream {
  id: string;
  text: string;
  category: 'love' | 'travel' | 'home' | 'personal';
}

const categoryConfig = {
  love: { icon: Heart, color: 'from-pink-500/20 to-rose-500/20', iconColor: 'text-pink-500' },
  travel: { icon: Plane, color: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-500' },
  home: { icon: Home, color: 'from-green-500/20 to-emerald-500/20', iconColor: 'text-green-500' },
  personal: { icon: Star, color: 'from-purple-500/20 to-violet-500/20', iconColor: 'text-purple-500' },
};

const DreamsSection = () => {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [newDream, setNewDream] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Dream['category']>('love');
  const [isAddingDream, setIsAddingDream] = useState(false);

  const addDream = () => {
    if (newDream.trim()) {
      setDreams((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: newDream.trim(),
          category: selectedCategory,
        },
      ]);
      setNewDream('');
      setIsAddingDream(false);
    }
  };

  const removeDream = (id: string) => {
    setDreams((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <section
      id="goals"
      className="relative min-h-screen overflow-hidden py-32"
      style={{ background: 'linear-gradient(180deg, hsl(22 21% 90%) 0%, hsl(40 33% 97%) 100%)' }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-magazine-gold/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20 text-center"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-magazine-mousse"
          >
            Chapter Two
          </motion.p>
          <h2 className="font-editorial text-6xl font-light tracking-tight text-magazine-dark md:text-7xl lg:text-8xl">
            Our Dreams
          </h2>
          <h3 className="font-script -mt-2 text-5xl text-magazine-gold md:text-6xl">
            for 2026
          </h3>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '120px' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mx-auto mt-8 h-px bg-magazine-gold"
          />
          <p className="mx-auto mt-6 max-w-md font-handwritten text-xl text-muted-foreground">
            Add your dreams and wishes for the coming year. What adventures await us?
          </p>
        </motion.div>

        {/* Dreams Grid */}
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {dreams.map((dream, index) => {
                const config = categoryConfig[dream.category];
                const Icon = config.icon;
                
                return (
                  <motion.div
                    key={dream.id}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -5, boxShadow: '0 20px 40px -20px rgba(0,0,0,0.2)' }}
                    className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-lg"
                  >
                    {/* Category gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-50`} />
                    
                    {/* Delete button */}
                    <motion.button
                      initial={{ opacity: 0 }}
                      whileHover={{ scale: 1.1 }}
                      className="absolute right-3 top-3 rounded-full bg-background/80 p-1.5 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => removeDream(dream.id)}
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </motion.button>

                    <div className="relative">
                      <Icon className={`mb-3 h-8 w-8 ${config.iconColor}`} />
                      <p className="font-handwritten text-xl text-magazine-dark">
                        {dream.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Add Dream Card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <AnimatePresence mode="wait">
                {isAddingDream ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="rounded-2xl border-2 border-dashed border-magazine-gold/50 bg-card p-6"
                  >
                    <textarea
                      value={newDream}
                      onChange={(e) => setNewDream(e.target.value)}
                      placeholder="Write your dream here..."
                      className="mb-4 w-full resize-none rounded-xl border-0 bg-transparent font-handwritten text-xl placeholder:text-muted-foreground focus:outline-none focus:ring-0"
                      rows={3}
                      autoFocus
                    />
                    
                    {/* Category selector */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {(Object.keys(categoryConfig) as Dream['category'][]).map((cat) => {
                        const config = categoryConfig[cat];
                        const Icon = config.icon;
                        return (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm capitalize transition-all ${
                              selectedCategory === cat
                                ? 'bg-magazine-gold text-magazine-dark'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                            {cat}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={addDream}
                        className="flex-1 rounded-xl bg-magazine-gold py-3 font-body text-sm font-medium text-magazine-dark"
                      >
                        Add Dream
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsAddingDream(false)}
                        className="rounded-xl bg-muted px-4 py-3 font-body text-sm text-muted-foreground"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.button
                    key="button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ scale: 1.02, borderColor: 'hsl(41 47% 56%)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsAddingDream(true)}
                    className="flex h-full min-h-[180px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-card/50 p-6 transition-colors"
                  >
                    <motion.div
                      animate={{ rotate: [0, 90, 180, 270, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      className="mb-4 rounded-full bg-magazine-gold/20 p-4"
                    >
                      <Plus className="h-8 w-8 text-magazine-gold" />
                    </motion.div>
                    <p className="font-handwritten text-xl text-muted-foreground">
                      Add a new dream
                    </p>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Empty state */}
          {dreams.length === 0 && !isAddingDream && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 text-center"
            >
              <Sparkles className="mx-auto mb-4 h-12 w-12 text-magazine-gold/50" />
              <p className="font-editorial text-2xl text-muted-foreground">
                Start adding your dreams and watch them come true
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DreamsSection;
