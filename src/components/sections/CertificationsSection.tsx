import React from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { FaChartBar, FaFileExcel } from 'react-icons/fa';
import { SiSqlite } from 'react-icons/si';
import type { IconType } from 'react-icons';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SpotlightCard from '@/components/ui/SpotlightCard';

interface CertIcon {
  alt: string;
  src?: string;
  component?: IconType;
  className?: string;
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

interface CertificationPath {
  id: string;
  title: string;
  description: string;
  interest?: string;
  certifications: Certification[];
}

const pythonProgrammingCertification: Certification = {
  title: 'Python Programming',
  issuer: 'freeCodeCamp',
  date: '2026',
  link: '/certs/python-programming.pdf',
  badgeUrl: 'https://www.freecodecamp.org/certification/joseph_25/python-v9',
  icons: [{ src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', alt: 'Python' }],
};

const certificationPaths: CertificationPath[] = [
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    description: 'Excel · Power BI · SQL with SQLite · Python',
    certifications: [
      {
        title: 'Excel Fundamentals',
        issuer: 'Coddy Team',
        date: '2026',
        link: '/certs/excel-fundamentals.pdf',
        badgeUrl: 'https://coddy.tech/certifications/sx1ZOs-excel-RJobxc',
        icons: [{ component: FaFileExcel, alt: 'Microsoft Excel', className: 'text-[#217346]' }],
      },
      {
        title: 'Excel Formulas and Data Analysis',
        issuer: 'Coddy Team',
        date: '2026',
        link: '/certs/excel-formulas-and-data-analysis.pdf',
        badgeUrl: 'https://coddy.tech/certifications/sx1ZOs-excel-exc2_3',
        icons: [{ component: FaFileExcel, alt: 'Microsoft Excel', className: 'text-[#217346]' }],
      },
      {
        title: 'Power BI Basics',
        issuer: 'Coddy Team',
        date: '2026',
        link: '/certs/power-bi-basics.pdf',
        badgeUrl: 'https://coddy.tech/certifications/sx1ZOs-power_bi-RP4bx1',
        icons: [{ component: FaChartBar, alt: 'Power BI', className: 'text-[#F2C811]' }],
      },
      {
        title: 'SQLite Fundamentals',
        issuer: 'Coddy Team',
        date: '2026',
        link: '/certs/sqlite-fundamentals.pdf',
        badgeUrl: 'https://coddy.tech/certifications/sx1ZOs-sqlite-oRigJZ',
        icons: [{ component: SiSqlite, alt: 'SQLite', className: 'text-[#003B57]' }],
      },
      {
        title: 'SQLite Beyond the Basics',
        issuer: 'Coddy Team',
        date: '2026',
        link: '/certs/sqlite-beyond-the-basics.pdf',
        badgeUrl: 'https://coddy.tech/certifications/sx1ZOs-sqlite-PcA4IJ',
        icons: [{ component: SiSqlite, alt: 'SQLite', className: 'text-[#003B57]' }],
      },
      pythonProgrammingCertification,
    ],
  },
  {
    id: 'ai-prompt-engineering',
    title: 'AI & Prompt Engineering',
    description: 'Prompt design · LLMs · Output evaluation',
    interest: 'Exploring AI-assisted development',
    certifications: [
      {
        title: 'Prompt Like an Engineer',
        issuer: 'Cisco Networking Academy',
        date: '2026',
        link: '/certs/PromptLikeanEngineer20260828-21-b83sda.pdf',
        badgeUrl: 'https://www.credly.com/badges/1b13d7c7-1e85-4adc-982d-b812aa4ca9d1',
        image: '/certs/prompt-like-an-engineer.png',
      },
    ],
  },
  {
    id: 'it-networking',
    title: 'IT & Networking',
    description: 'Computer hardware · Networking',
    certifications: [
      {
        title: 'Computer Hardware Basics',
        issuer: 'Cisco Networking Academy',
        date: '2026',
        link: '/certs/computer-hardware-basics.pdf',
        badgeUrl: 'https://www.credly.com/badges/37959b93-bd0b-4f72-a7ce-8eda8ff01f50/public_url',
        image: '/certs/computer-hardware-basics.png',
      },
      {
        title: 'Networking Basics',
        issuer: 'Cisco Networking Academy',
        date: '2026',
        link: '/certs/networking-basics.pdf',
        badgeUrl: 'https://www.credly.com/badges/8765bdb9-dd4e-4970-8144-10a204d2f075',
        image: '/certs/networking-basics.png',
      },
    ],
  },
  {
    id: 'programming-foundations',
    title: 'Programming Foundations',
    description: 'C · Python · HTML · CSS · JavaScript',
    certifications: [
      {
        title: 'C Programming',
        issuer: 'Coddy Team',
        date: '2026',
        link: '/certs/c.pdf',
        badgeUrl: 'https://coddy.tech/certifications/sx1ZOs-c-0xW5Z9',
        icons: [{ src: '/c-logo.svg', alt: 'C' }],
      },
      pythonProgrammingCertification,
      {
        title: 'HTML Fundamentals',
        issuer: 'Coddy Team',
        date: '2025',
        link: '/certs/html-fundamentals.pdf',
        badgeUrl: 'https://coddy.tech/certifications/sx1ZOs-html-mQsrS3',
        icons: [{ src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', alt: 'HTML5' }],
      },
      {
        title: 'HTML Styling with CSS',
        issuer: 'Coddy Team',
        date: '2025',
        link: '/certs/html-styling-with-css.pdf',
        badgeUrl: 'https://coddy.tech/certifications/sx1ZOs-html-P457Ik',
        icons: [{ src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', alt: 'CSS3' }],
      },
      {
        title: 'HTML & CSS Mastery',
        issuer: 'Coddy Team',
        date: '2025',
        link: '/certs/html-css-mastery.pdf',
        badgeUrl: 'https://coddy.tech/certifications/sx1ZOs-html-MCa2tZ',
        icons: [
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', alt: 'HTML5' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', alt: 'CSS3' },
        ],
      },
      {
        title: 'HTML JavaScript in Action',
        issuer: 'Coddy Team',
        date: '2026',
        link: '/certs/html-javascript-in-action.pdf',
        badgeUrl: 'https://coddy.tech/certifications/sx1ZOs-html-bJ2T8b',
        icons: [
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', alt: 'HTML5' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', alt: 'JavaScript' },
        ],
      },
      {
        title: 'Practical Frontend',
        issuer: 'Coddy Team',
        date: '2026',
        link: '/certs/practical-frontend.pdf',
        badgeUrl: 'https://coddy.tech/certifications/sx1ZOs-html-2sLKgb',
        icons: [
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', alt: 'HTML5' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', alt: 'CSS3' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', alt: 'JavaScript' },
        ],
      },
    ],
  },
];

const CertEmblem = ({ cert, id }: { cert: Certification; id: string }) => {
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
  const textPathId = `cert-seal-${id}`;
  const sealText = `${cert.title} • ${cert.issuer} • ${cert.issuer} • `.toUpperCase();

  return (
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-border/70 bg-secondary/30 flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden transition-transform duration-300 group-hover/card:scale-105 select-none">
      {/* Curved circular perimeter text */}
      <svg aria-hidden="true" viewBox="0 0 100 100" className="w-full h-full absolute inset-0 pointer-events-none">
        <defs>
          <path
            id={textPathId}
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text aria-hidden="true" className="text-[5.5px] font-mono tracking-[0.16em] fill-muted-foreground/80 font-medium">
          <textPath href={`#${textPathId}`} startOffset="0%">
            {sealText}
          </textPath>
        </text>
      </svg>

      {/* Central icons */}
      <div className="relative z-10 flex items-center justify-center gap-1.5 p-2">
        {cert.icons?.map((icon, i) => {
          const sizeClass = cert.icons && cert.icons.length > 2
            ? 'w-4 h-4 sm:w-5 sm:h-5'
            : cert.icons && cert.icons.length > 1
            ? 'w-5 h-5 sm:w-6 sm:h-6'
            : 'w-6 h-6 sm:w-8 sm:h-8';
          const className = `${sizeClass} object-contain transition-transform duration-300 group-hover/card:scale-110 ${icon.className ?? ''}`;
          const Icon = icon.component;

          return Icon ? (
            <Icon key={i} role="img" aria-label={icon.alt} className={className} />
          ) : (
            <img key={i} src={icon.src} alt={icon.alt} className={className} />
          );
        })}
      </div>
    </div>
  );
};

const getVerifyButtonLabel = (url: string) => {
  if (url.includes('credly.com')) return 'Verify on Credly';
  if (url.includes('coddy.tech')) return 'Verify on Coddy';
  if (url.includes('freecodecamp.org')) return 'Verify on freeCodeCamp';
  return 'Verify Credential';
};

const CertificationsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="certifications" className="w-full relative py-2" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={`section-container transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        <div className="mb-6">
          <h2 className="text-3xl font-display font-medium text-foreground">Certifications</h2>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-muted-foreground">
            Credentials grouped by the skills I’ve studied and the areas I’m exploring.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {certificationPaths.map((path) => (
            <SpotlightCard
              key={path.id}
              className="relative z-0 w-full overflow-hidden rounded-2xl border border-border/60 bg-card/30 p-0 transition-all duration-300 hover:z-10 hover:scale-[1.02] hover:border-foreground/30 hover:bg-card/45 hover:shadow-2xl focus-within:z-10 focus-within:scale-[1.02] focus-within:border-foreground/30 focus-within:shadow-2xl motion-reduce:hover:scale-100 motion-reduce:focus-within:scale-100"
              spotlightColor="rgba(255, 255, 255, 0.08)"
            >
              <details className="group/path rounded-2xl open:bg-card/45 transition-colors">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-4 sm:p-5 [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset">
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2.5">
                      <span className="text-lg sm:text-xl font-semibold text-foreground">{path.title}</span>
                      <span className="rounded-full border border-border/70 bg-secondary/70 px-2.5 py-0.5 text-xs font-mono text-muted-foreground">
                        {path.certifications.length} {path.certifications.length === 1 ? 'certificate' : 'certificates'}
                      </span>
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{path.description}</span>
                    {path.interest && (
                      <span className="mt-2 block text-xs sm:text-sm text-primary/90">Area of interest: {path.interest.replace('Exploring ', '')}</span>
                    )}
                  </span>
                  <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open/path:rotate-180" />
                </summary>

                <div className="flex flex-col gap-4 px-3 pb-4 sm:px-5 sm:pb-5" aria-label={`${path.title} certificates`}>
                  {path.certifications.map((cert, index) => {
                    const isFirst = index === 0;
                    const isLast = index === path.certifications.length - 1;

                    return (
                      <div key={`${path.id}-${cert.title}`} className="relative flex items-center gap-3 sm:gap-6 group">
                        <div className="relative flex w-14 shrink-0 select-none items-center justify-end gap-2.5 self-stretch sm:w-20 sm:gap-4">
                          <div
                            aria-hidden="true"
                            className={`absolute right-[5px] sm:right-[6px] w-[2px] bg-border/60 ${
                              isFirst && isLast ? 'hidden' : isFirst ? 'top-1/2 -bottom-2' : isLast ? '-top-2 bottom-1/2' : '-top-2 -bottom-2'
                            }`}
                          />
                          <span className="text-xs font-mono font-medium text-muted-foreground sm:text-sm">{cert.date}</span>
                          <span aria-hidden="true" className="relative z-10 h-3 w-3 shrink-0 rounded-full border-2 border-background bg-zinc-400 ring-2 ring-border/80 transition-transform duration-300 group-hover:scale-125 group-hover:bg-primary group-hover:ring-primary/40 sm:h-3.5 sm:w-3.5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <SpotlightCard
                            onClick={() => window.open(cert.badgeUrl || cert.link, '_blank')}
                            className="group/card relative z-0 flex cursor-pointer items-center gap-4 rounded-2xl border border-border/80 bg-card/40 p-4 shadow-lg transition-all duration-300 hover:z-10 hover:scale-[1.02] hover:border-foreground/30 hover:bg-card/70 hover:shadow-2xl focus-within:z-10 focus-within:scale-[1.02] focus-within:border-foreground/30 focus-within:shadow-2xl motion-reduce:hover:scale-100 motion-reduce:focus-within:scale-100 sm:gap-6 sm:p-5"
                            spotlightColor="rgba(255, 255, 255, 0.08)"
                          >
                            <CertEmblem cert={cert} id={`${path.id}-${index}`} />

                            <div className="min-w-0 flex-1">
                              <div className="mb-1">
                                <span className="inline-block rounded-full border border-border/40 bg-secondary/80 px-2.5 py-0.5 text-xs font-mono font-medium text-muted-foreground">
                                  {cert.date}
                                </span>
                              </div>
                              <h3 className="mb-0.5 break-words text-base font-bold leading-snug text-foreground transition-colors group-hover/card:text-primary sm:text-lg md:text-xl">
                                {cert.title}
                              </h3>
                              <p className="mb-2.5 text-xs text-muted-foreground sm:text-sm">{cert.issuer}</p>

                              <div className="flex flex-wrap items-center gap-3">
                                <a
                                  href={cert.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline sm:text-sm"
                                >
                                  Credential <ExternalLink size={13} />
                                </a>
                                {cert.badgeUrl && (
                                  <a
                                    href={cert.badgeUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-border/80 bg-secondary/60 px-2.5 py-1 text-xs font-mono text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                                  >
                                    {getVerifyButtonLabel(cert.badgeUrl)} <ExternalLink size={11} />
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
              </details>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
