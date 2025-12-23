import { motion } from 'framer-motion';
import { Heart, Camera, Music, Target, Gift } from 'lucide-react';

interface NavigationDockProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: 'hero', icon: Heart, label: 'Home' },
  { id: 'memories', icon: Camera, label: 'Memories' },
  { id: 'music', icon: Music, label: 'Music' },
  { id: 'goals', icon: Target, label: 'Goals' },
  { id: 'surprise', icon: Gift, label: 'Surprise' },
];

const NavigationDock = ({ activeSection, onNavigate }: NavigationDockProps) => {
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 100 }}
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="glass rounded-full px-4 py-3 shadow-2xl">
        <ul className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <motion.li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`group relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-magazine-gold text-magazine-dark'
                      : 'text-magazine-cream hover:bg-white/20'
                  }`}
                  aria-label={item.label}
                >
                  <Icon className="h-5 w-5" />
                  
                  {/* Tooltip */}
                  <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-magazine-dark px-3 py-1.5 font-handwritten text-sm text-magazine-cream opacity-0 transition-opacity group-hover:opacity-100">
                    {item.label}
                  </span>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 h-1 w-4 rounded-full bg-magazine-dark"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
};

export default NavigationDock;
