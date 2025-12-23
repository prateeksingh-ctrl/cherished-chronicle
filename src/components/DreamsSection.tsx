import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Check, Sparkles, Heart, Plane, Home, Star, Briefcase, Music, Camera, ChevronRight } from 'lucide-react';

interface Dream {
  id: string;
  text: string;
  category: string;
  isCompleted: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  gradient: string;
  iconColor: string;
}

const categories: Category[] = [
  { id: 'love', name: 'Love & Us', icon: Heart, gradient: 'from-rose-500/20 to-pink-500/20', iconColor: 'text-rose-500' },
  { id: 'travel', name: 'Adventures', icon: Plane, gradient: 'from-sky-500/20 to-blue-500/20', iconColor: 'text-sky-500' },
  { id: 'home', name: 'Our Home', icon: Home, gradient: 'from-emerald-500/20 to-green-500/20', iconColor: 'text-emerald-500' },
  { id: 'career', name: 'Growth', icon: Briefcase, gradient: 'from-amber-500/20 to-orange-500/20', iconColor: 'text-amber-500' },
  { id: 'experiences', name: 'Experiences', icon: Camera, gradient: 'from-purple-500/20 to-violet-500/20', iconColor: 'text-purple-500' },
  { id: 'wellness', name: 'Wellness', icon: Star, gradient: 'from-teal-500/20 to-cyan-500/20', iconColor: 'text-teal-500' },
];

const DreamsSection = () => {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newDream, setNewDream] = useState('');
  const [isAddingDream, setIsAddingDream] = useState(false);

  const addDream = () => {
    if (newDream.trim() && selectedCategory) {
      setDreams((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: newDream.trim(),
          category: selectedCategory,
          isCompleted: false,
        },
      ]);
      setNewDream('');
      setIsAddingDream(false);
    }
  };

  const toggleDream = (id: string) => {
    setDreams((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isCompleted: !d.isCompleted } : d))
    );
  };

  const removeDream = (id: string) => {
    setDreams((prev) => prev.filter((d) => d.id !== id));
  };

  const getCategoryDreams = (categoryId: string) => {
    return dreams.filter((d) => d.category === categoryId);
  };

  const getCategory = (id: string) => categories.find((c) => c.id === id);

  return (
    <section
      id="goals"
      className="relative min-h-screen overflow-hidden bg-paper py-32"
    >
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-magazine-mousse">
            Chapter Three
          </p>
          <h2 className="font-display text-6xl font-medium tracking-tight text-magazine-dark md:text-7xl lg:text-8xl">
            Our Dreams
          </h2>
          <p className="font-handwritten mt-2 text-4xl text-magazine-gold md:text-5xl">
            for 2026
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mx-auto mt-8 h-px w-32 origin-center bg-gradient-to-r from-transparent via-magazine-gold to-transparent"
          />
          <p className="mx-auto mt-6 max-w-md font-editorial text-lg italic text-muted-foreground">
            Select a category and add your dreams and wishes for the coming year
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            /* Category Selection Grid */
            <motion.div
              key="categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-4xl"
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  const dreamCount = getCategoryDreams(category.id).length;
                  const completedCount = getCategoryDreams(category.id).filter(d => d.isCompleted).length;
                  
                  return (
                    <motion.button
                      key={category.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      whileHover={{ y: -4, boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCategory(category.id)}
                      className="group relative overflow-hidden rounded-2xl bg-card p-8 text-left shadow-sm transition-all"
                    >
                      {/* Background gradient on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 transition-opacity group-hover:opacity-100`} />
                      
                      <div className="relative">
                        <div className="mb-4 flex items-center justify-between">
                          <div className={`rounded-xl bg-gradient-to-br ${category.gradient} p-3`}>
                            <Icon className={`h-6 w-6 ${category.iconColor}`} />
                          </div>
                          {dreamCount > 0 && (
                            <span className="font-body text-xs text-muted-foreground">
                              {completedCount}/{dreamCount}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="font-display text-xl font-medium text-magazine-dark">
                          {category.name}
                        </h3>
                        
                        <div className="mt-4 flex items-center gap-2 font-body text-sm text-muted-foreground">
                          <span>{dreamCount === 0 ? 'Add dreams' : `${dreamCount} dream${dreamCount !== 1 ? 's' : ''}`}</span>
                          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* Dreams List View */
            <motion.div
              key="dreams"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-2xl"
            >
              {/* Back button and category header */}
              <div className="mb-8">
                <motion.button
                  whileHover={{ x: -4 }}
                  onClick={() => setSelectedCategory(null)}
                  className="mb-6 flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  Back to categories
                </motion.button>
                
                {(() => {
                  const cat = getCategory(selectedCategory);
                  if (!cat) return null;
                  const Icon = cat.icon;
                  return (
                    <div className="flex items-center gap-4">
                      <div className={`rounded-xl bg-gradient-to-br ${cat.gradient} p-3`}>
                        <Icon className={`h-8 w-8 ${cat.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-display text-3xl font-medium text-magazine-dark">
                          {cat.name}
                        </h3>
                        <p className="font-body text-sm text-muted-foreground">
                          {getCategoryDreams(selectedCategory).length} dreams added
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Dreams list */}
              <div className="space-y-3">
                <AnimatePresence>
                  {getCategoryDreams(selectedCategory).map((dream, index) => (
                    <motion.div
                      key={dream.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100, height: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group flex items-center gap-4 rounded-xl bg-card p-4 shadow-sm"
                    >
                      {/* Checkbox */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleDream(dream.id)}
                        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border-2 transition-all ${
                          dream.isCompleted
                            ? 'border-magazine-gold bg-magazine-gold text-white'
                            : 'border-muted-foreground/30 hover:border-magazine-gold'
                        }`}
                      >
                        {dream.isCompleted && <Check className="h-4 w-4" />}
                      </motion.button>

                      {/* Dream text */}
                      <p
                        className={`flex-1 font-handwritten text-xl transition-all ${
                          dream.isCompleted
                            ? 'text-muted-foreground line-through'
                            : 'text-magazine-dark'
                        }`}
                      >
                        {dream.text}
                      </p>

                      {/* Delete button */}
                      <motion.button
                        initial={{ opacity: 0 }}
                        whileHover={{ scale: 1.1, backgroundColor: 'hsl(0 84% 60% / 0.1)' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeDream(dream.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg opacity-0 transition-all group-hover:opacity-100"
                      >
                        <X className="h-4 w-4 text-destructive" />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Add dream form */}
                <AnimatePresence mode="wait">
                  {isAddingDream ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="rounded-xl border-2 border-dashed border-magazine-gold/40 bg-card p-4">
                        <input
                          type="text"
                          value={newDream}
                          onChange={(e) => setNewDream(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && addDream()}
                          placeholder="Write your dream here..."
                          className="mb-4 w-full border-0 bg-transparent font-handwritten text-xl placeholder:text-muted-foreground/50 focus:outline-none focus:ring-0"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={addDream}
                            disabled={!newDream.trim()}
                            className="flex-1 rounded-lg bg-magazine-gold py-3 font-body text-sm font-medium text-magazine-dark transition-opacity disabled:opacity-50"
                          >
                            Add Dream
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setIsAddingDream(false);
                              setNewDream('');
                            }}
                            className="rounded-lg bg-muted px-6 py-3 font-body text-sm text-muted-foreground"
                          >
                            Cancel
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="add-button"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      whileHover={{ scale: 1.01, borderColor: 'hsl(38 52% 55%)' }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setIsAddingDream(true)}
                      className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-dashed border-muted-foreground/20 bg-card/50 p-6 transition-colors"
                    >
                      <div className="rounded-lg bg-magazine-gold/10 p-2">
                        <Plus className="h-5 w-5 text-magazine-gold" />
                      </div>
                      <span className="font-handwritten text-xl text-muted-foreground">
                        Add a new dream
                      </span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Empty state */}
              {getCategoryDreams(selectedCategory).length === 0 && !isAddingDream && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8 text-center"
                >
                  <Sparkles className="mx-auto mb-4 h-12 w-12 text-magazine-gold/40" />
                  <p className="font-editorial text-xl italic text-muted-foreground">
                    Start adding your dreams for this category
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DreamsSection;