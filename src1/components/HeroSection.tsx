import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import valleyDay from "@/assets/valley-day.png";
import valleyNight from "@/assets/valley-night.jpg";

const petals = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${60 + Math.random() * 30}%`,
  size: 4 + Math.random() * 6,
  delay: Math.random() * 12,
  duration: 8 + Math.random() * 10,
  dx: `${-80 + Math.random() * 160}px`,
  dy: `${-200 - Math.random() * 150}px`,
  rot: `${Math.random() * 360}deg`,
  color: ["#fff", "#f9c4d2", "#fde68a", "#c4f0c2"][Math.floor(Math.random() * 4)],
}));

const sparkles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${30 + Math.random() * 40}%`,
  top: `${50 + Math.random() * 30}%`,
  delay: Math.random() * 5,
  duration: 2 + Math.random() * 3,
  size: 2 + Math.random() * 3,
}));

const stars = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  left: `${5 + Math.random() * 90}%`,
  top: `${5 + Math.random() * 40}%`,
  size: 1.5 + Math.random() * 2.5,
  delay: Math.random() * 4,
  duration: 2 + Math.random() * 3,
}));

export default function HeroSection() {
  const [isNight, setIsNight] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const bgParallax = scrollY * 0.4;
  const midParallax = scrollY * 0.6;
  const fgParallax = scrollY * 0.8;
  const textParallax = scrollY * 0.9;

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-background">
      {/* Day background layer — slowest parallax */}
      <div
        className="absolute inset-0 transition-opacity duration-[2500ms] ease-in-out will-change-transform"
        style={{
          opacity: isNight ? 0 : 1,
          transform: `translateY(${bgParallax}px) scale(1.15)`,
        }}
      >
        <img
          src={valleyDay}
          alt="Sunlit fantasy valley"
          className="w-full h-full object-cover object-center"
          style={{ animation: "hero-dolly 30s ease-in-out infinite alternate" }}
        />
      </div>

      {/* Night background layer — slowest parallax */}
      <div
        className="absolute inset-0 transition-opacity duration-[2500ms] ease-in-out will-change-transform"
        style={{
          opacity: isNight ? 1 : 0,
          transform: `translateY(${bgParallax}px) scale(1.15)`,
        }}
      >
        <img
          src={valleyNight}
          alt="Moonlit fantasy valley"
          className="w-full h-full object-cover object-center"
          style={{ animation: "hero-dolly 30s ease-in-out infinite alternate" }}
        />
      </div>

      {/* Stars — only visible at night */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-[2500ms]"
        style={{ opacity: isNight ? 1 : 0, transform: `translateY(${bgParallax * 0.5}px)` }}
      >
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              backgroundColor: "#fff",
              animation: `star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Mist overlay — mid parallax */}
      <div
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          transform: `translateY(${midParallax * 0.3}px)`,
          background: isNight
            ? "linear-gradient(180deg, transparent 30%, hsl(220 30% 15% / 0.15) 60%, hsl(var(--background) / 0.5) 100%)"
            : "linear-gradient(180deg, transparent 40%, hsl(var(--hero-mist) / 0.08) 70%, hsl(var(--background) / 0.4) 100%)",
          animation: "mist-drift 20s ease-in-out infinite",
          transition: "background 2.5s ease-in-out",
        }}
      />

      {/* Water shimmer sparkles — mid parallax */}
      <div
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{ transform: `translateY(${midParallax * 0.2}px)` }}
      >
        {sparkles.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              background: isNight
                ? `radial-gradient(circle, hsl(210 60% 80% / 0.7), transparent)`
                : `radial-gradient(circle, hsl(var(--hero-gold) / 0.9), transparent)`,
              animation: `shimmer ${s.duration}s ease-in-out ${s.delay}s infinite`,
              transition: "background 2.5s",
            }}
          />
        ))}
      </div>

      {/* Floating petals — foreground parallax */}
      <div
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{ transform: `translateY(${fgParallax * 0.15}px)` }}
      >
        {petals.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size * 0.6,
              backgroundColor: p.color,
              opacity: 0,
              "--dx": p.dx,
              "--dy": p.dy,
              "--rot": p.rot,
              animation: `float-petal ${p.duration}s ease-in-out ${p.delay}s infinite`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* Day/Night toggle */}
      <button
        onClick={() => setIsNight((p) => !p)}
        className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full flex items-center justify-center border border-foreground/20 bg-background/30 backdrop-blur-sm cursor-pointer transition-all duration-500 hover:scale-110 hover:border-foreground/40"
        aria-label={isNight ? "Switch to day" : "Switch to night"}
      >
        <AnimatePresence mode="wait">
          {isNight ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.4 }}
            >
              <Moon className="w-5 h-5 text-foreground/80" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.4 }}
            >
              <Sun className="w-5 h-5 text-foreground/80" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Title content — fastest parallax (moves with scroll) */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 will-change-transform"
        style={{ transform: `translateY(${textParallax * 0.3}px)`, opacity: Math.max(0, 1 - scrollY / 500) }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-hero-title text-5xl md:text-7xl lg:text-8xl font-bold tracking-wide text-center leading-tight"
        >
          The Whispering Valley
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
          className="text-hero-subtitle mt-6 text-lg md:text-xl lg:text-2xl font-light tracking-widest text-center max-w-2xl"
        >
          Where rivers sing and mountains dream
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="mt-12 flex flex-col items-center gap-2"
        >
          <span className="text-hero-subtitle text-sm tracking-[0.3em] uppercase font-light">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-foreground/30 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-foreground/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
