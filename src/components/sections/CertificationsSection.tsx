import { Award, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const certifications = [
  {
    title: 'Prompt Like an Engineer',
    issuer: 'Certification',
    date: '2026',
    link: '/certs/PromptLikeanEngineer20260828-21-b83sda.pdf',
  },
  {
    title: 'HTML & CSS Mastery',
    issuer: 'Certification',
    date: '2026',
    link: '/certs/html-css-mastery.pdf',
  },
  {
    title: 'HTML Fundamentals',
    issuer: 'Certification',
    date: '2026',
    link: '/certs/html-fundamentals.pdf',
  },
  {
    title: 'HTML Styling with CSS',
    issuer: 'Certification',
    date: '2026',
    link: '/certs/html-styling-with-css.pdf',
  },
  {
    title: 'Practical Frontend',
    issuer: 'Certification',
    date: '2026',
    link: '/certs/practical-frontend.pdf',
  },
  {
    title: 'C Programming',
    issuer: 'Certification',
    date: '2026',
    link: '/certs/c.pdf',
  },
  {
    title: 'Python Programming',
    issuer: 'Certification',
    date: '2026',
    link: '/certs/pyy.pdf',
  },
];

const CertificationsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="certifications" className="w-full relative py-20 bg-card/50" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={`section-container transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <div className="mb-12">
          <h2 className="section-title flex items-center gap-4">
            <Award className="text-foreground" size={40} />
            Certifications
          </h2>
          <div className="w-12 h-1 bg-foreground mb-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div 
              key={index}
              className="minimal-card flex flex-col justify-between"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">{cert.title}</h3>
                <p className="text-muted-foreground text-sm mb-6">{cert.issuer}</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{cert.date}</span>
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium"
                >
                  Credential <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CertificationsSection;
