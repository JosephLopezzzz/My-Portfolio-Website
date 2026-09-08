import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SpotlightCard from '@/components/ui/SpotlightCard';

const certifications = [
  {
    title: 'Computer Hardware Basics',
    issuer: 'Cisco Networking Academy',
    date: '2026',
    link: '/certs/computer-hardware-basics.pdf',
    badgeUrl: 'https://www.credly.com/badges/37959b93-bd0b-4f72-a7ce-8eda8ff01f50/public_url',
    image: '/certs/computer-hardware-basics.png',
  },
  {
    title: 'Prompt Like an Engineer',
    issuer: 'Cisco Networking Academy',
    date: '2026',
    link: '/certs/PromptLikeanEngineer20260828-21-b83sda.pdf',
    image: '/certs/prompt-like-an-engineer.png',
  },
  {
    title: 'HTML & CSS Mastery',
    issuer: 'Coddy Team',
    date: '2026',
    link: '/certs/html-css-mastery.pdf',
  },
  {
    title: 'HTML Fundamentals',
    issuer: 'Coddy Team',
    date: '2026',
    link: '/certs/html-fundamentals.pdf',
  },
  {
    title: 'HTML Styling with CSS',
    issuer: 'Coddy Team',
    date: '2026',
    link: '/certs/html-styling-with-css.pdf',
  },
  {
    title: 'Practical Frontend',
    issuer: 'Coddy Team',
    date: '2026',
    link: '/certs/practical-frontend.pdf',
  },
  {
    title: 'C Programming',
    issuer: 'Coddy Team',
    date: '2026',
    link: '/certs/c.pdf',
  },
  {
    title: 'Python Programming',
    issuer: 'Coddy Team',
    date: '2026',
    link: '/certs/pyy.pdf',
  },
];

const CertificationsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleCerts = isExpanded ? certifications : certifications.slice(0, 2);

  return (
    <section id="certifications" className="w-full relative py-2 " ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={`section-container transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-display font-medium text-foreground">Certifications</h2>
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {isExpanded ? 'Show Less <' : 'View All >'}
          </button>
        </div>

        <div className="flex flex-col gap-8">
          {visibleCerts.map((cert, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-start">
              <div className="text-sm text-muted-foreground pt-1">
                {cert.date}
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1 leading-tight">{cert.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{cert.issuer}</p>
                <div className="flex flex-col items-start gap-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <a 
                      href={cert.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-1 text-sm font-medium"
                    >
                      Certificate (PDF) <ExternalLink size={14} />
                    </a>
                    {cert.badgeUrl && (
                      <a 
                        href={cert.badgeUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 text-xs font-mono bg-secondary/60 hover:bg-secondary px-2.5 py-1 rounded-md border border-border/80"
                      >
                        Verify on Credly <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                  {cert.image && (
                    <a 
                      href={cert.badgeUrl || cert.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-block transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                      title={cert.badgeUrl ? "Verify on Credly" : "View Certificate"}
                    >
                      <img src={cert.image} alt={cert.title} className="w-24 h-auto rounded-md border border-border/50 shadow-sm object-cover" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CertificationsSection;
