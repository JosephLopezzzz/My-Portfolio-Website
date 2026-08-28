import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Calendar, Building } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type Certification = {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  logo: string;
  status: 'completed' | 'in-progress';
};

type CertificationCategory = {
  title: string;
  items: Certification[];
};

const certificationCategories: CertificationCategory[] = [
  {
    title: 'All',
    items: [
      {
        title: 'Prompt Like an Engineer',
        issuer: 'Cisco Networking Academy',
        date: '2026',
        logo: '/certs/prompt-like-an-engineer.png',
        status: 'completed',
        credentialUrl: '/certs/PromptLikeanEngineer20260828-21-b83sda.pdf',
      },
      {
        title: 'Python Developer Certification',
        issuer: 'freeCodeCamp',
        date: '2026',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        status: 'completed',
        credentialUrl: '/certs/pyy.pdf',
      },
      {
        title: 'HTML Fundamentals',
        issuer: 'Coddy Team',
        date: '2025',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
        status: 'completed',
        credentialUrl: '/certs/html-fundamentals.pdf',
      },
      {
        title: 'HTML Styling with CSS',
        issuer: 'Coddy Team',
        date: '2025',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
        status: 'completed',
        credentialUrl: '/certs/html-styling-with-css.pdf',
      },
      {
        title: 'HTML CSS Mastery',
        issuer: 'Coddy Team',
        date: '2025',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg',
        status: 'completed',
        credentialUrl: '/certs/html-css-mastery.pdf',
      },
      {
        title: 'HTML JavaScript in Action',
        issuer: 'Coddy Team',
        date: '2026',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
        status: 'completed',
        credentialUrl: '/certs/sx1ZOs-html-bJ2T8b copy.pdf',
      },
      {
        title: 'HTML Practical Frontend',
        issuer: 'Coddy Team',
        date: '2026',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
        status: 'completed',
        credentialUrl: '/certs/practical-frontend.pdf',
      },
      {
        title: 'C Fundamentals',
        issuer: 'Coddy Team',
        date: '2026',
        logo: '/c-logo.svg',
        status: 'completed',
        credentialUrl: '/certs/c.pdf',
      },
    ]
  },
  {
    title: 'Web Development',
    items: [
      {
        title: 'HTML Fundamentals',
        issuer: 'Coddy Team',
        date: '2025',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
        status: 'completed',
        credentialUrl: '/certs/html-fundamentals.pdf',
      },
      {
        title: 'HTML Styling with CSS',
        issuer: 'Coddy Team',
        date: '2025',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
        status: 'completed',
        credentialUrl: '/certs/html-styling-with-css.pdf',
      },
      {
        title: 'HTML CSS Mastery',
        issuer: 'Coddy Team',
        date: '2025',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg',
        status: 'completed',
        credentialUrl: '/certs/html-css-mastery.pdf',
      },
      {
        title: 'HTML JavaScript in Action',
        issuer: 'Coddy Team',
        date: '2026',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
        status: 'completed',
        credentialUrl: '/certs/sx1ZOs-html-bJ2T8b copy.pdf',
      },
      {
        title: 'HTML Practical Frontend',
        issuer: 'Coddy Team',
        date: '2026',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
        status: 'completed',
        credentialUrl: '/certs/practical-frontend.pdf',
      },
    ]
  },
  {
    title: 'Core Programming',
    items: [
      {
        title: 'Python Developer Certification',
        issuer: 'freeCodeCamp',
        date: '2026',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        status: 'completed',
        credentialUrl: '/certs/pyy.pdf',
      },
      {
        title: 'C Fundamentals',
        issuer: 'Coddy Team',
        date: '2026',
        logo: '/c-logo.svg',
        status: 'completed',
        credentialUrl: '/certs/c.pdf',
      },
    ]
  },
  {
    title: 'Artificial Intelligence',
    items: [
      {
        title: 'Prompt Like an Engineer',
        issuer: 'Cisco Networking Academy',
        date: '2026',
        logo: '/certs/prompt-like-an-engineer.png',
        status: 'completed',
        credentialUrl: '/certs/PromptLikeanEngineer20260828-21-b83sda.pdf',
      },
    ]
  }
];

const workshops = [
  {
    title: 'IT Career Development Seminar',
    organizer: 'Bestlink College of the Philippines',
    date: '2024',
  },
  {
    title: 'Web Development Workshop',
    organizer: 'BSIT Department',
    date: '2024',
  },
  {
    title: 'Cybersecurity Awareness Training',
    organizer: 'IT Student Organization',
    date: '2024',
  },
];

const CertificationsSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="certifications" className="py-20 md:py-32 bg-card/30">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-title">Certifications & Trainings</h2>
          <p className="section-subtitle mx-auto">
            Professional development and continuous learning
          </p>
        </div>

        {/* Category Tabs */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {certificationCategories.map((category, index) => (
            <button
              key={category.title}
              onClick={() => setActiveCategory(index)}
              className={activeCategory === index ? 'glass-btn px-6 relative' : 'glass-btn glass-btn-secondary px-6'}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid md:grid-cols-2 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {certificationCategories[activeCategory].items.map((cert, index) => (
              <motion.div
                key={cert.title}
                className="glass-card hover-card p-6 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              >
                <div className="flex items-start gap-4">
                  {/* Logo */}
                  <div className="w-14 h-14 rounded-xl bg-background/50 p-3 flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                    <img
                      src={cert.logo}
                      alt={cert.issuer}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {cert.title}
                      </h3>
                      <span className={`skill-badge border-none whitespace-nowrap ${cert.status === 'completed' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'}`}>
                        {cert.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Building size={14} />
                      <span>{cert.issuer}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      <span>{cert.date}</span>
                    </div>

                    {cert.credentialUrl && (
                      <a
                        href={`/cert/${encodeURIComponent(cert.credentialUrl.replace('/', ''))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-3 text-sm text-primary hover:underline font-medium"
                      >
                        View Credential
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Seminars & Workshops */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-8 flex items-center justify-center gap-2">
            <Award className="text-primary" size={24} />
            Seminars & Workshops
          </h3>

          <div className="space-y-4">
            {workshops.map((workshop, index) => (
              <div
                key={workshop.title}
                className="glass-card hover-card flex items-center gap-4 p-4 min-h-[5rem]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate">{workshop.title}</h4>
                  <p className="text-sm text-muted-foreground">{workshop.organizer}</p>
                </div>
                <span className="text-sm text-muted-foreground flex-shrink-0 font-medium">
                  {workshop.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground italic">
            * Currently pursuing additional certifications to enhance my technical skills
          </p>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
