import { motion } from 'framer-motion';
import { BookOpen, Camera, Feather, Sparkles, Star } from 'lucide-react'; 
// Swapped icons for more "Editorial" choices:
// Heart -> BookOpen (Cover)
// Music -> Camera (Gallery)
// Gift -> Feather (Editorial/Letter)

interface NavigationDockProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: 'cover', icon: BookOpen, label: 'Cover' },      // Was 'hero'
  { id: 'editorial', icon: Feather, label: 'Editorial' }, // Was 'memories'
  { id: 'gallery', icon: Camera, label: 'Gallery' },    // Was 'music'
  { id: 'vision', icon: Sparkles, label: 'Vision' },    // Was 'goals'
  { id: 'surprise', icon: Star, label: 'Finale' },      // Was 'surprise'
];

const NavigationDock = ({ activeSection, onNavigate }: NavigationDockProps) => {
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.0, type: 'spring', stiffness: 80, damping: 20 }} // Slower, more elegant entry
      className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
    >
      {/* Container: Changed from Glass Pill to Gold-Bordered Bar */}
      <div className="bg-magazine-black/95 backdrop-blur-md border border-magazine-gold/40 px-2 py-2 shadow-[0_10px_40px_-10px_rgba(212,175,55,0.3)] rounded-full md:rounded-lg md:px-6 md:py-3">
        <ul className="flex items-center gap-2 md:gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <motion.li key={item.id}>
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate(item.id)}
                  className={`group relative flex h-10 w-10 items-center justify-center rounded-md transition-all duration-500 md:h-12 md:w-12 ${
                    isActive
                      ? 'bg-magazine-gold text-magazine-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'text-magazine-gold/50 hover:text-magazine-gold hover:bg-white/5'
                  }`}
                  aria-label={item.label}
                >
                  <Icon className="h-4 w-4 md:h-5 md:w-5 stroke-[1.5]" />
                  
                  {/* Tooltip: Now Serif & Elegant */}
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap 
                               bg-magazine-gold text-magazine-black px-3 py-1.5 
                               font-display italic text-sm tracking-wide shadow-xl
                               after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-t-magazine-gold after:border-transparent"
                  >
                    {item.label}
                  </motion.span>
                </motion.button>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
};

export default NavigationDock;