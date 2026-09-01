import React from 'react';
import { Mail, MapPin, Github, Linkedin, Facebook, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SpotlightCard from '@/components/ui/SpotlightCard';

const socialLinks = [
  {
    label: 'Email',
    value: 'josephlopez102004@gmail.com',
    href: 'mailto:josephlopez102004@gmail.com',
    icon: Mail,
    cta: 'Send an email',
  },
  {
    label: 'GitHub',
    value: 'github.com/JosephLopezzzz',
    href: 'https://github.com/JosephLopezzzz',
    icon: Github,
    cta: 'View repositories',
  },
  {
    label: 'LinkedIn',
    value: 'Joseph T. Lopez',
    href: 'https://www.linkedin.com/in/joseph-lopez-5a2090412',
    icon: Linkedin,
    cta: 'Connect',
  },
  {
    label: 'Facebook',
    value: 'Joseph Lopez',
    href: 'https://www.facebook.com/josephlopez102004',
    icon: Facebook,
    cta: 'Follow',
  },
];

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className="w-full relative py-2" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={`section-container transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <div className="mb-6">
          <h2 className="section-title">Let's Connect</h2>
          <div className="w-12 h-1 bg-foreground mb-4" />
          <p className="section-subtitle">
            I'm currently looking for new opportunities, freelance projects, and hackathon teams. My inbox is always open.
          </p>
        </div>

        <div className="w-full max-w-3xl">
          <SpotlightCard className="flex flex-col gap-6 bg-secondary/30 border-none">
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Quickest way to reach me</p>
            <p className="text-2xl font-bold text-foreground tracking-tight leading-tight">
              Drop me a line and I'll respond within 24 hours.
            </p>
            <a
              href="mailto:josephlopez102004@gmail.com"
              className="minimal-btn self-start"
            >
              <Mail size={16} />
              josephlopez102004@gmail.com
            </a>
            
            <div className="border-t border-border pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-4">Or find me on</p>
                <div className="flex items-center gap-4">
                  <a href="https://github.com/JosephLopezzzz" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
                    <Github size={22} />
                  </a>
                  <a href="https://www.linkedin.com/in/joseph-lopez-5a2090412" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                    <Linkedin size={22} />
                  </a>
                  <a href="https://www.facebook.com/josephlopez102004" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Facebook">
                    <Facebook size={22} />
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-background/50 border border-border flex items-center justify-center text-foreground flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Location</span>
                  <span className="text-sm font-medium text-foreground">Quezon City, Philippines</span>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
