import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ArrowDown, ArrowUpRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import ThemeToggle from '@/components/ThemeToggle';
import { ChatBot } from '@/components/ui/ChatBot';
import PixelTransition from '@/components/ui/PixelTransition';
import { useReducedMotion } from 'framer-motion';

const HERO_NAME = 'Joseph T. Lopez';
const HERO_ROLES = [
  { text: 'Web Development & Web Design', fontClassName: 'font-display' },
  { text: 'Mobile Application Development', fontClassName: 'font-sans' },
  { text: 'Custom Software Development', fontClassName: 'font-display' },
  { text: 'Application Development', fontClassName: 'font-sans' },
  { text: 'Database Development', fontClassName: 'font-display' },
  { text: 'Technical Support & Software Testing', fontClassName: 'font-sans' },
  { text: 'Search Engine Optimization (SEO)', fontClassName: 'font-display' },
] as const;
const HERO_ROLES_LABEL = 'Web Development, Web Design, Mobile Application Development, Application Development, Custom Software Development, Database Development, Technical Support, Software Testing, and Search Engine Optimization (SEO)';
const ROLE_TYPE_DELAY_MS = 85;
const ROLE_ERASE_DELAY_MS = 40;
const ROLE_PAUSE_DELAY_MS = 1400;
const ROLE_SWITCH_DELAY_MS = 250;
const ROLE_START_DELAY_MS = 2300;
const HERO_SOCIAL_LINK_CLASS_NAME = [
  'inline-flex size-9 items-center justify-center rounded-full',
  'transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-110',
  'hover:bg-secondary/70 hover:text-sky-500 active:scale-95',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  'motion-reduce:transform-none motion-reduce:transition-none',
].join(' ');

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cycle the role line through a type, pause, erase, and font-switch sequence.
  // Keep a complete static label available to assistive technology.
  useEffect(() => {
    if (!mounted) return;
    if (prefersReducedMotion) {
      setRoleIndex(0);
      setRoleText(HERO_ROLES[0].text);
      return;
    }

    let activeRoleIndex = 0;
    let characterIndex = 0;
    let timeout: number;

    setRoleIndex(activeRoleIndex);
    setRoleText('');

    const typeNextCharacter = () => {
      const role = HERO_ROLES[activeRoleIndex].text;
      characterIndex += 1;
      setRoleText(role.slice(0, characterIndex));

      if (characterIndex < role.length) {
        timeout = window.setTimeout(typeNextCharacter, ROLE_TYPE_DELAY_MS);
        return;
      }

      timeout = window.setTimeout(eraseNextCharacter, ROLE_PAUSE_DELAY_MS);
    };

    const eraseNextCharacter = () => {
      const role = HERO_ROLES[activeRoleIndex].text;
      characterIndex -= 1;
      setRoleText(role.slice(0, characterIndex));

      if (characterIndex > 0) {
        timeout = window.setTimeout(eraseNextCharacter, ROLE_ERASE_DELAY_MS);
        return;
      }

      activeRoleIndex = (activeRoleIndex + 1) % HERO_ROLES.length;
      setRoleIndex(activeRoleIndex);
      timeout = window.setTimeout(typeNextCharacter, ROLE_SWITCH_DELAY_MS);
    };

    timeout = window.setTimeout(typeNextCharacter, ROLE_START_DELAY_MS);
    return () => window.clearTimeout(timeout);
  }, [mounted, prefersReducedMotion]);

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
                <h1 className="inline-flex items-center gap-2 font-sans text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  {HERO_NAME}
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4 shrink-0 text-sky-500 sm:size-5"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
                      fill="currentColor"
                    />
                    <path
                      d="m8.7 12.2 2.1 2.1 4.6-4.6"
                      fill="none"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.2"
                    />
                  </svg>
                </h1>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <a href="https://github.com/JosephLopezzzz" target="_blank" rel="noreferrer" className={HERO_SOCIAL_LINK_CLASS_NAME}>
                  <Github size={20} />
                  <span className="sr-only">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/joseph-lopez-5a2090412" target="_blank" rel="noreferrer" className={HERO_SOCIAL_LINK_CLASS_NAME}>
                  <Linkedin size={20} />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="mailto:josephlopez102004@gmail.com" className={HERO_SOCIAL_LINK_CLASS_NAME}>
                  <Mail size={20} />
                  <span className="sr-only">Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h2
            className={`min-h-[2.4em] sm:min-h-[1.3em] text-2xl sm:text-3xl font-normal text-foreground mb-6 leading-tight ${HERO_ROLES[roleIndex].fontClassName}`}
            aria-label={HERO_ROLES_LABEL}
          >
            <span aria-hidden="true">{roleText}</span>
            {!prefersReducedMotion && (
              <span
                className="inline-block w-[2px] h-[0.9em] ml-1 align-middle bg-foreground/70 animate-pulse"
                aria-hidden="true"
              />
            )}
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
