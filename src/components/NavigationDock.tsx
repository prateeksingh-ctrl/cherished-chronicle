import { motion } from 'framer-motion';
import { Heart, Camera, Gift, Sparkles, Music, Star } from 'lucide-react';

interface NavigationDockProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: 'hero', icon: Heart, label: 'Home' },
  { id: 'memories', icon: Camera, label: 'Memories' },
  { id: 'music', icon: Music, label: 'Music' },
  { id: 'goals', icon: Sparkles, label: 'Dreams' },
  { id: 'unveiling', icon: Gift, label: 'Surprise' },
  { id: 'surprise', icon: Star, label: 'Love Note' },
];

const NavigationDock = ({ activeSection, onNavigate }: NavigationDockProps) => {
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 100 }}
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="glass rounded-full px-4 py-3 shadow-2xl md:px-6 md:py-4">
        <ul className="flex items-center gap-1 md:gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <motion.li key={item.id}>
                <motion.button
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate(item.id)}
                  className={`group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 md:h-12 md:w-12 ${
                    isActive
                      ? 'bg-magazine-gold text-magazine-dark shadow-lg shadow-magazine-gold/30'
                      : 'text-magazine-cream hover:bg-white/20'
                  }`}
                  aria-label={item.label}
                >
                  <Icon className="h-4 w-4 md:h-5 md:w-5" />
                  
                  {/* Tooltip */}
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-magazine-dark px-4 py-2 font-body text-xs uppercase tracking-wider text-magazine-cream opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                  >
                    {item.label}
                  </motion.span>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 h-1 w-4 rounded-full bg-magazine-dark md:h-1.5 md:w-6"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
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
