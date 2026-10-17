import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ArrowDown, ArrowUpRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import ThemeToggle from '@/components/ThemeToggle';
import { ChatBot } from '@/components/ui/ChatBot';
import PixelTransition from '@/components/ui/PixelTransition';
import { useReducedMotion } from 'framer-motion';

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  // Typewriter state
  const [text, setText] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const name = "Joseph T. Lopez";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth typewriter entrance
  useEffect(() => {
    if (!mounted) return;
    if (prefersReducedMotion) {
      if (text !== name) setText(name);
      setIsFinished(true);
      return;
    }
    if (text.length < name.length) {
      const timeout = setTimeout(() => {
        setText(name.substring(0, text.length + 1));
      }, 70 + Math.random() * 30);
      return () => clearTimeout(timeout);
    } else {
      setIsFinished(true);
    }
  }, [text, mounted, prefersReducedMotion]);

  const isDark = resolvedTheme === 'dark';

  return (
    <>
      <section
        id="home"
        className="relative w-full min-h-screen flex items-center justify-center pt-36 md:pt-40 pb-12"
      >
        <div className="w-full max-w-3xl mx-auto px-6 flex flex-col items-start animate-fade-up z-10 relative">

          {/* Avatar and Name Block */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0">
              <div className="absolute inset-0 rounded-full border border-border bg-card overflow-hidden">
                {mounted && (prefersReducedMotion ? (
                  <img
                    src={isDark ? '/profile/prof-night.png' : '/profile/prof-day.jpg'}
                    alt="Joseph Lopez"
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <PixelTransition
                    firstContent={
                      <>
                        <img
                          src="/pfp/white1x1.png"
                          alt="Joseph Lopez"
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                          style={{ opacity: isDark ? 0 : 1 }}
                          draggable={false}
                        />
                        <img
                          src="/pfp/black1x1.png"
                          alt="Joseph Lopez"
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                          style={{ opacity: isDark ? 1 : 0 }}
                          draggable={false}
                        />
                      </>
                    }
                    secondContent={
                      <img
                        src={isDark ? '/profile/prof-night.png' : '/profile/prof-day.jpg'}
                        alt="Joseph Lopez Real"
                        className="absolute inset-0 w-full h-full object-cover"
                        draggable={false}
                      />
                    }
                    gridSize={10}
                    pixelColor={isDark ? '#000000' : '#ffffff'}
                    animationStepDuration={0.4}
                    className="w-full h-full"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground"
                  aria-label={name}
                  aria-live="polite"
                >
                  <span aria-hidden="true">{text}</span>
                  <span
                    className={`inline-block w-[3px] h-[0.9em] bg-foreground ml-1.5 align-middle transition-opacity duration-300 ${
                      isFinished ? 'opacity-40 animate-pulse' : 'opacity-100'
                    }`}
                    aria-hidden="true"
                  />
                </h1>
              </div>

              <div className="flex items-center gap-4 text-muted-foreground">
                <a href="https://github.com/JosephLopezzzz" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                  <Github size={20} />
                  <span className="sr-only">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/joseph-lopez-5a2090412" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                  <Linkedin size={20} />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="mailto:josephlopez102004@gmail.com" className="hover:text-foreground transition-colors">
                  <Mail size={20} />
                  <span className="sr-only">Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-medium text-foreground mb-6 leading-tight">
            Full-Stack Web Developer
          </h2>

          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Open to scoped freelance work
          </p>

          {/* Bio */}
          <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl">
            I build thoughtful web and mobile experiences that make real workflows clearer and easier to use. I focus on intuitive interactions, polished details, and practical outcomes for the people using them.
          </p>

          {/* CTA Group */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:josephlopez102004@gmail.com?subject=Project%20inquiry"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-background bg-foreground rounded-lg hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-sm"
            >
              <Mail size={16} />
              Discuss a project
            </a>

            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-foreground bg-transparent border border-border rounded-lg hover:bg-secondary/60 hover:border-foreground/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Explore Projects
              <ArrowDown size={16} />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 font-medium text-foreground bg-transparent border border-border rounded-lg hover:bg-secondary/60 hover:border-foreground/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              View Resume
              <ArrowUpRight size={15} className="text-muted-foreground" />
            </a>
          </div>

          </div>
      </section>

      {/* Floating Chat Button */}
      <ChatBot />
    </>
  );
};

export default HeroSection;
