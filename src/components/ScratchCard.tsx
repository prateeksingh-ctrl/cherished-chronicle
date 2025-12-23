import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles } from 'lucide-react';
import { loveNote } from '../data/mockData';

const ScratchCard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    // Draw gold foil pattern
    const gradient = ctx.createLinearGradient(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    gradient.addColorStop(0, '#a38b27');
    gradient.addColorStop(0.25, '#e1c44d');
    gradient.addColorStop(0.5, '#c5a059');
    gradient.addColorStop(0.75, '#e1c44d');
    gradient.addColorStop(1, '#a38b27');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    // Add shine effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.ellipse(canvas.offsetWidth * 0.3, canvas.offsetHeight * 0.3, 100, 50, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    // Add text
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.font = 'bold 24px "Playfair Display", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Scratch to Reveal ✨', canvas.offsetWidth / 2, canvas.offsetHeight / 2);
  }, []);

  const calculateScratchPercent = () => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;

    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    return (transparentPixels / (pixels.length / 4)) * 100;
  };

  const scratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x: number, y: number;

    if ('touches' in e) {
      x = (e.touches[0].clientX - rect.left) * 2;
      y = (e.touches[0].clientY - rect.top) * 2;
    } else {
      x = (e.clientX - rect.left) * 2;
      y = (e.clientY - rect.top) * 2;
    }

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2);
    ctx.fill();

    const percent = calculateScratchPercent();
    setScratchPercent(percent);

    if (percent > 50 && !isRevealed) {
      setIsRevealed(true);
    }
  };

  const handleStart = () => {
    isDrawing.current = true;
  };

  const handleEnd = () => {
    isDrawing.current = false;
  };

  return (
    <section id="surprise" className="relative min-h-screen bg-crimson-vignette py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <Gift className="mx-auto mb-4 h-10 w-10 text-magazine-gold" />
          <h2 className="font-editorial text-5xl font-bold text-magazine-cream md:text-6xl">
            A Special Surprise
          </h2>
          <p className="mt-4 font-handwritten text-2xl text-magazine-cream/70">
            Scratch to reveal your gift
          </p>
        </motion.div>

        {/* Scratch Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-lg"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            {/* Hidden content */}
            <div className="bg-magazine-cream p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isRevealed ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Sparkles className="mx-auto mb-4 h-8 w-8 text-magazine-gold" />
                <h3 className="mb-6 font-editorial text-2xl font-semibold text-magazine-dark">
                  A Letter For You
                </h3>
                <div className="font-handwritten text-xl leading-relaxed text-magazine-dark/80 whitespace-pre-line">
                  {loveNote}
                </div>
              </motion.div>
            </div>

            {/* Scratch overlay */}
            {!isRevealed && (
              <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full cursor-crosshair touch-none"
                onMouseDown={handleStart}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onMouseMove={scratch}
                onTouchStart={handleStart}
                onTouchEnd={handleEnd}
                onTouchMove={scratch}
              />
            )}
          </div>

          {/* Progress hint */}
          {!isRevealed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 text-center font-handwritten text-lg text-magazine-cream/60"
            >
              {scratchPercent > 0
                ? `${Math.round(scratchPercent)}% revealed... keep going!`
                : 'Use your finger or mouse to scratch'}
            </motion.p>
          )}

          {/* Revealed celebration */}
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
            >
              <p className="font-handwritten text-2xl text-magazine-gold">
                ✨ You found it! ✨
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 text-center"
        >
          <p className="font-handwritten text-xl text-magazine-cream/50">
            Made with ♡ for you
          </p>
          <p className="mt-2 font-body text-sm text-magazine-cream/30">
            Our 2025 Recap Magazine
          </p>
        </motion.footer>
      </div>
    </section>
  );
};

export default ScratchCard;
