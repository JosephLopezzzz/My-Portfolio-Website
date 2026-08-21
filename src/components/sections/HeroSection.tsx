import { ArrowDown, FileDown, Send, ExternalLink } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '@/components/ui/Magnetic';
import valleyDay from '@/assets/valley-day.png';
import valleyNight from '@/assets/valley-night.jpg';

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

const HeroSection = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Typewriter effect state
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [fontIndex, setFontIndex] = useState(0);
  const name = "Joseph T. Lopez";

  const fontFamilies = [
    "inherit",
    "'Playfair Display', serif",
    "'Space Mono', monospace",
    "'Caveat', cursive",
    "Georgia, serif"
  ];

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    setMounted(true);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') checkDark();
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [handleScroll]);

  // Typewriter logic
  useEffect(() => {
    if (!mounted) return;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < name.length) {
          setText(name.substring(0, text.length + 1));
          setTypingSpeed(150 + Math.random() * 50); // slight variance in typing
        } else {
          setTimeout(() => setIsDeleting(true), 3000); // pause at the end
        }
      } else {
        if (text.length > 0) {
          setText(name.substring(0, text.length - 1));
          setTypingSpeed(75); // delete faster
        } else {
          setIsDeleting(false);
          setTypingSpeed(500); // pause before re-typing
          setFontIndex((prev) => (prev + 1) % fontFamilies.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, mounted, typingSpeed]);

  const bgParallax = scrollY * 0.4;
  const midParallax = scrollY * 0.6;
  const fgParallax = scrollY * 0.8;
  const contentParallax = scrollY * 0.2;

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="relative w-full h-screen overflow-hidden bg-background pt-20"
    >
      {/* --- BACKGROUND LAYERS --- */}
      
      {/* Day background layer */}
      <div
        className="absolute inset-0 transition-opacity duration-[2500ms] ease-in-out will-change-transform"
        style={{
          opacity: isDark ? 0 : 1,
          transform: `translateY(${bgParallax}px) scale(1.15)`,
        }}
      >
        <img
          src={valleyDay}
          alt="Sunlit fantasy valley"
          className="w-full h-full object-cover object-center animate-hero-dolly"
        />
      </div>

      {/* Night background layer */}
      <div
        className="absolute inset-0 transition-opacity duration-[2500ms] ease-in-out will-change-transform"
        style={{
          opacity: isDark ? 1 : 0,
          transform: `translateY(${bgParallax}px) scale(1.15)`,
        }}
      >
        <img
          src={valleyNight}
          alt="Moonlit fantasy valley"
          className="w-full h-full object-cover object-center animate-hero-dolly"
        />
      </div>

      {/* Stars — only visible at night */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-[2500ms]"
        style={{ opacity: isDark ? 1 : 0, transform: `translateY(${bgParallax * 0.5}px)` }}
      >
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full pointer-events-none animate-star-twinkle"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              backgroundColor: "#fff",
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Mist overlay — mid parallax */}
      <div
        className="absolute inset-0 pointer-events-none will-change-transform animate-mist-drift"
        style={{
          transform: `translateY(${midParallax * 0.3}px)`,
          background: isDark
            ? "linear-gradient(180deg, transparent 30%, hsl(220 30% 15% / 0.15) 60%, hsl(var(--background) / 0.5) 100%)"
            : "linear-gradient(180deg, transparent 40%, hsl(var(--hero-mist) / 0.08) 70%, hsl(var(--background) / 0.4) 100%)",
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
            className="absolute rounded-full animate-shimmer"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              background: isDark
                ? `radial-gradient(circle, hsl(210 60% 80% / 0.7), transparent)`
                : `radial-gradient(circle, hsl(var(--hero-gold) / 0.9), transparent)`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
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
            className="absolute rounded-full animate-float-petal"
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
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            } as any}
          />
        ))}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

      {/* --- CONTENT LAYER --- */}
      <div 
        className="section-container relative z-20 w-full px-4 sm:px-6 lg:px-8 will-change-transform"
        style={{ 
          transform: `translateY(${contentParallax}px)`,
          opacity: Math.max(0, 1 - scrollY / 700)
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">

          {/* Left Side — Name & Info */}
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-hero-title text-4xl md:text-5xl lg:text-7xl font-bold mb-3 lg:mb-4 tracking-tight min-h-[1.2em] inline-flex items-center whitespace-nowrap"
              style={{ fontFamily: fontFamilies[fontIndex] }}
            >
              <span>{text}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="inline-block ml-1 w-[3px] md:w-[4px] h-[1em] bg-foreground"
              />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-hero-subtitle text-base md:text-lg lg:text-xl font-semibold mb-3 lg:mb-4 tracking-widest uppercase"
            >
              Bachelor of Science in Information Technology
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-sm md:text-base lg:text-lg text-slate-200 drop-shadow-md max-w-xl mb-6 lg:mb-8 font-light"
            >
              Aspiring Web Developer, AI Engineer | BSIT Student at Bestlink College of the Philippines
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-3 lg:gap-4"
            >
              <Magnetic>
                <a href="#projects" className="glass-btn">
                  <ExternalLink size={18} />
                  View Projects
                </a>
              </Magnetic>
              <Magnetic>
                <a href="/resume.pdf" download className="glass-btn glass-btn-secondary text-hero-subtitle">
                  <FileDown size={18} />
                  Download Resume
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="glass-btn glass-btn-secondary text-hero-subtitle">
                  <Send size={18} />
                  Contact Me
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right Side — Profile Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center justify-center lg:justify-end"
          >
            <div
              className="relative flex-shrink-0"
              style={{ width: 'clamp(18rem, 35vw, 26rem)', height: 'clamp(18rem, 35vw, 26rem)' }}
            >
              {/* Liquid glass glow ring */}
              <div
                className="absolute inset-0 rounded-full animate-pulse-glow"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary) / 0.6), hsl(var(--accent) / 0.6))',
                  padding: '3px',
                }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid var(--glass-border)',
                    padding: '3px',
                  }}
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    {mounted ? (
                      <>
                        <img
                          src="/profile/prof-day.jpg"
                          alt="Joseph Lopez — Day"
                          className="absolute inset-0 w-full h-full rounded-full object-cover object-bottom transition-opacity duration-700"
                          style={{ opacity: isDark ? 0 : 1 }}
                          draggable={false}
                        />
                        <img
                          src="/profile/prof-night.png"
                          alt="Joseph Lopez — Night"
                          className="absolute inset-0 w-full h-full rounded-full object-cover object-bottom transition-opacity duration-700"
                          style={{ opacity: isDark ? 1 : 0 }}
                          draggable={false}
                        />
                      </>
                    ) : (
                      <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                        <span className="text-6xl font-bold gradient-text">JL</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Online indicator dot */}
              <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-background animate-pulse shadow-lg z-10" />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="text-xs tracking-[0.2em] uppercase font-light text-hero-subtitle">Scroll Down</span>
            <div className="w-5 h-9 rounded-full border-2 border-foreground/20 flex items-start justify-center pt-1.5 transition-colors group-hover:border-primary/50">
               <motion.div 
                 animate={{ y: [0, 12, 0] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                 className="w-1 h-2 rounded-full bg-primary" 
               />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
