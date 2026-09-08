import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SpotlightCard from '@/components/ui/SpotlightCard';

interface CertIcon {
  src: string;
  alt: string;
}

interface Certification {
  title: string;
  issuer: string;
  date: string;
  link: string;
  badgeUrl?: string;
  image?: string;
  icons?: CertIcon[];
}

const certifications: Certification[] = [
  {
    title: 'Computer Hardware Basics',
    issuer: 'Cisco Networking Academy',
    date: '2026',
    link: '/cert/computer-hardware-basics.pdf',
    badgeUrl: 'https://www.credly.com/badges/37959b93-bd0b-4f72-a7ce-8eda8ff01f50/public_url',
    image: '/certs/computer-hardware-basics.png',
  },
  {
    title: 'Prompt Like an Engineer',
    issuer: 'Cisco Networking Academy',
    date: '2026',
    link: '/cert/PromptLikeanEngineer20260828-21-b83sda.pdf',
    badgeUrl: 'https://www.credly.com/badges/1b13d7c7-1e85-4adc-982d-b812aa4ca9d1',
    image: '/certs/prompt-like-an-engineer.png',
  },
  {
    title: 'HTML & CSS Mastery',
    issuer: 'Coddy Team',
    date: '2026',
    link: '/cert/html-css-mastery.pdf',
    icons: [
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', alt: 'HTML5' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', alt: 'CSS3' },
    ],
  },
  {
    title: 'HTML Fundamentals',
    issuer: 'Coddy Team',
    date: '2026',
    link: '/cert/html-fundamentals.pdf',
    icons: [
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', alt: 'HTML5' },
    ],
  },
  {
    title: 'HTML Styling with CSS',
    issuer: 'Coddy Team',
    date: '2026',
    link: '/cert/html-styling-with-css.pdf',
    icons: [
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', alt: 'CSS3' },
    ],
  },
  {
    title: 'Practical Frontend',
    issuer: 'Coddy Team',
    date: '2026',
    link: '/cert/practical-frontend.pdf',
    icons: [
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', alt: 'HTML5' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', alt: 'CSS3' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', alt: 'JavaScript' },
    ],
  },
  {
    title: 'C Programming',
    issuer: 'Coddy Team',
    date: '2026',
    link: '/cert/c.pdf',
    icons: [
      { src: '/c-logo.svg', alt: 'C' },
    ],
  },
  {
    title: 'Python Programming',
    issuer: 'Coddy Team',
    date: '2026',
    link: '/cert/pyy.pdf',
    icons: [
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', alt: 'Python' },
    ],
  },
];

const CertEmblem = ({ cert, index }: { cert: Certification; index: number }) => {
  // Squared badge for Cisco certs
  if (cert.image) {
    return (
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-border/70 bg-secondary/30 flex items-center justify-center p-1.5 shrink-0 shadow-sm transition-transform duration-300 group-hover/card:scale-105">
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-full object-contain rounded-xl"
        />
      </div>
    );
  }

  // Circular emblem for certs without badges (Coddy certs)
  const textPathId = `cert-seal-${index}`;
  const sealText = `${cert.title} • ${cert.issuer} • ${cert.issuer} • `.toUpperCase();

  return (
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-border/70 bg-secondary/30 flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden transition-transform duration-300 group-hover/card:scale-105 select-none">
      {/* Curved circular perimeter text */}
      <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 pointer-events-none">
        <defs>
          <path
            id={textPathId}
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text className="text-[5.5px] font-mono tracking-[0.16em] fill-muted-foreground/80 font-medium">
          <textPath href={`#${textPathId}`} startOffset="0%">
            {sealText}
          </textPath>
        </text>
      </svg>

      {/* Central icons */}
      <div className="relative z-10 flex items-center justify-center gap-1.5 p-2">
        {cert.icons?.map((icon, i) => (
          <img
            key={i}
            src={icon.src}
            alt={icon.alt}
            className={`${
              cert.icons && cert.icons.length > 2
                ? 'w-4 h-4 sm:w-5 sm:h-5'
                : cert.icons && cert.icons.length > 1
                ? 'w-5 h-5 sm:w-6 sm:h-6'
                : 'w-6 h-6 sm:w-8 sm:h-8'
            } object-contain transition-transform duration-300 group-hover/card:scale-110`}
          />
        ))}
      </div>
    </div>
  );
};

const CertificationsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleCerts = isExpanded ? certifications : certifications.slice(0, 2);

  return (
    <section id="certifications" className="w-full relative py-2" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={`section-container transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-display font-medium text-foreground">Certifications</h2>
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            {isExpanded ? 'Show Less <' : 'View All >'}
          </button>
        </div>

        {/* Timeline List of Cards */}
        <div className="flex flex-col gap-5">
          {visibleCerts.map((cert, index) => {
            const isFirst = index === 0;
            const isLast = index === visibleCerts.length - 1;

            return (
              <div key={index} className="relative flex items-center gap-3 sm:gap-6 group">
                {/* Left: Year & Timeline track with node dot */}
                <div className="flex items-center gap-2.5 sm:gap-4 shrink-0 w-14 sm:w-20 justify-end relative self-stretch select-none">
                  {/* Vertical connecting line */}
                  <div 
                    className={`absolute right-[5px] sm:right-[6px] w-[2px] bg-border/60 ${
                      isFirst && isLast
                        ? 'hidden'
                        : isFirst
                        ? 'top-1/2 -bottom-3'
                        : isLast
                        ? '-top-3 bottom-1/2'
                        : '-top-3 -bottom-3'
                    }`}
                  />

                  {/* Year text */}
                  <span className="text-xs sm:text-sm font-mono text-muted-foreground font-medium">
                    {cert.date}
                  </span>

                  {/* Circular node dot on the line */}
                  <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-zinc-400 dark:bg-zinc-500 border-2 border-background ring-2 ring-border/80 z-10 relative shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:bg-primary group-hover:ring-primary/40" />
                </div>

                {/* Right: Card */}
                <div className="flex-1 min-w-0">
                  <SpotlightCard 
                    onClick={() => window.open(cert.badgeUrl || cert.link, '_blank')}
                    className="p-4 sm:p-5 rounded-2xl border border-border/60 bg-card/40 hover:bg-card/70 transition-all duration-300 flex items-center gap-4 sm:gap-6 group/card cursor-pointer"
                    spotlightColor="rgba(255, 255, 255, 0.08)"
                  >
                    <CertEmblem cert={cert} index={index} />

                    <div className="flex-1 min-w-0">
                      {/* Year pill badge */}
                      <div className="mb-1">
                        <span className="text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full font-mono bg-secondary/80 text-muted-foreground border border-border/40 inline-block font-medium">
                          {cert.date}
                        </span>
                      </div>

                      {/* Title & Issuer */}
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-0.5 leading-snug truncate group-hover/card:text-primary transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2.5">{cert.issuer}</p>

                      {/* Action Links */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <a 
                          href={cert.link} 
                          target="_blank" 
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium underline-offset-4 hover:underline cursor-pointer"
                        >
                          Credential <ExternalLink size={13} />
                        </a>
                        {cert.badgeUrl && (
                          <a 
                            href={cert.badgeUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 text-xs font-mono bg-secondary/60 hover:bg-secondary px-2.5 py-1 rounded-md border border-border/80 cursor-pointer"
                          >
                            Verify on Credly <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CertificationsSection;
