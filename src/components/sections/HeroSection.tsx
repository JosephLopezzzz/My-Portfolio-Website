import React from 'react';
import { ArrowRight, FileDown, Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  return (
    <section 
      id="home" 
      className="relative w-full min-h-screen flex items-center justify-center bg-background pt-20"
    >
      <div className="section-container w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Side — Content */}
        <div className="flex flex-col items-start text-left animate-fade-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground mb-6">
            Joseph T.<br />Lopez
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground font-medium mb-4">
            Full-Stack Developer & AI Engineer
          </p>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
            I am a BSIT student at Bestlink College of the Philippines. I specialize in building modern, scalable web applications and exploring the frontiers of generative AI. 
            I love turning rough ideas into things people actually use.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a href="#projects" className="minimal-btn">
              View Projects
              <ArrowRight size={16} />
            </a>
            <a href="/resume.pdf" download className="minimal-btn-secondary">
              <FileDown size={16} />
              Resume
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a href="https://github.com/JosephLopezzzz" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/joseph-lopez-5a2090412" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="mailto:josephlopez102004@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail size={24} />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>

        {/* Right Side — Profile Image */}
        <div className="flex items-center justify-center lg:justify-end animate-fade-up stagger-2">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <div className="absolute inset-0 rounded-full border border-border bg-card overflow-hidden">
              {mounted && (
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
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
