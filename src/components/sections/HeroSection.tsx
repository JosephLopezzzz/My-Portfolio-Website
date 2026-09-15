import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, MessageCircle, ChevronRight, ArrowDown, ArrowUpRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import ThemeToggle from '@/components/ThemeToggle';
import { ChatBot } from '@/components/ui/ChatBot';
import PixelTransition from '@/components/ui/PixelTransition';

const InlineBadge = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono rounded-md border border-border bg-secondary/50 text-foreground translate-y-[-1px] ${className}`}>
    {children}
  </span>
);

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

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
    if (text.length < name.length) {
      const timeout = setTimeout(() => {
        setText(name.substring(0, text.length + 1));
      }, 70 + Math.random() * 30);
      return () => clearTimeout(timeout);
    } else {
      setIsFinished(true);
    }
  }, [text, mounted]);

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
                {mounted && (
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
                )}
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
            Full-Stack Web Developer <span className="text-muted-foreground">— React & AI</span>
          </h2>
          
          {/* Bio */}
          <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl">
            I'm a full-stack developer building modern applications with
            <InlineBadge className="mx-1">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="" className="w-3.5 h-3.5" />
              React
            </InlineBadge> 
            <InlineBadge className="mx-1">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="" className="w-3.5 h-3.5" />
              Node.js
            </InlineBadge>
            and
            <InlineBadge className="ml-1 mr-0">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="" className="w-3.5 h-3.5" />
              Python
            </InlineBadge>.
            I'm currently in my 4th year pursuing a BSIT. 
            I specialize in developing scalable systems, exploring generative AI integrations, and participating in hackathons to solve complex problems.
          </p>
          
          {/* CTA Group */}
          <div className="flex flex-wrap items-center gap-3">
            <a 
              href="#projects" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-background bg-foreground rounded-lg hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-sm"
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
