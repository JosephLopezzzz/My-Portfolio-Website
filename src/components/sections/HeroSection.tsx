import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, MessageCircle, ChevronRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import ThemeToggle from '@/components/ThemeToggle';
import { ChatBot } from '@/components/ui/ChatBot';
import PixelTransition from '@/components/ui/PixelTransition';

const InlineBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 mx-1 text-xs font-mono rounded-md border border-border bg-secondary/50 text-foreground translate-y-[-1px]">
    {children}
  </span>
);

const fontFamilies = [
  "inherit",
  "'Pixel Operator', monospace",
  "'Playfair Display', serif",
  "'Space Mono', monospace",
  "'Caveat', cursive",
  "Georgia, serif"
];

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  // Typewriter state
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [fontIndex, setFontIndex] = useState(0);
  const name = "Joseph T. Lopez";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Typewriter logic
  useEffect(() => {
    if (!mounted) return;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < name.length) {
          setText(name.substring(0, text.length + 1));
          setTypingSpeed(150 + Math.random() * 50);
        } else {
          setTimeout(() => setIsDeleting(true), 3000);
        }
      } else {
        if (text.length > 0) {
          setText(name.substring(0, text.length - 1));
          setTypingSpeed(75);
        } else {
          setIsDeleting(false);
          setTypingSpeed(500);
          setFontIndex((prev) => (prev + 1) % fontFamilies.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, mounted, typingSpeed]);

  const isDark = resolvedTheme === 'dark';

  return (
    <>
      <section 
        id="home" 
        className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-4"
      >
        <div className="w-full max-w-3xl mx-auto px-6 flex flex-col items-start animate-fade-up z-10 relative">
          
          {/* Avatar and Name Block */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0">
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
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground min-w-[15ch]"
                  style={{ fontFamily: fontFamilies[fontIndex] }}
                >
                  {text}<span className="animate-pulse">|</span>
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
          <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed max-w-2xl">
            I'm a full-stack web developer and AI engineer building modern applications with 
            <InlineBadge>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="" className="w-3.5 h-3.5" />
              React
            </InlineBadge> 
            <InlineBadge>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="" className="w-3.5 h-3.5" />
              Node.js
            </InlineBadge>
            and 
            <InlineBadge>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="" className="w-3.5 h-3.5" />
              Python
            </InlineBadge>. 
            I'm currently in my 4th year pursuing a BSIT at Bestlink College of the Philippines. 
            I specialize in developing scalable systems, exploring generative AI integrations, and participating in hackathons to solve complex problems.
          </p>
          
          {/* CTA Button */}
          <a 
            href="/resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-background bg-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            View Resume
            <ChevronRight size={18} />
          </a>

          </div>
      </section>

      {/* Floating Chat Button */}
      <ChatBot />
    </>
  );
};

export default HeroSection;
