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

const certifications: Certification[] = [
  {
    title: 'Practical Frontend Development',
    issuer: 'Update Issuer/Platform',
    date: '2025',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    status: 'completed',
    credentialUrl: '/practical frontend.pdf',
  },
  {
    title: 'JavaScript Programming',
    issuer: 'Update Issuer/Platform',
    date: '2025',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    status: 'completed',
    credentialUrl: '/javascript.pdf',
  },
  {
    title: 'Google IT Support Professional Certificate',
    issuer: 'Google via Coursera',
    date: 'Expected 2025',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
    status: 'in-progress',
  },
  {
    title: 'Cisco IT Essentials',
    issuer: 'Cisco Networking Academy',
    date: 'Expected 2025',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cisco/cisco-original.svg',
    status: 'in-progress',
  },
  {
    title: 'Web Development Fundamentals',
    issuer: 'Udemy',
    date: 'Expected 2025',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chrome/chrome-original.svg',
    status: 'in-progress',
  },
  {
    title: 'Python for Beginners',
    issuer: 'Coursera',
    date: 'Expected 2025',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    status: 'in-progress',
  },
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

  return (
    <section id="certifications" className="py-20 md:py-32 bg-card/30">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-title">Certifications & Trainings</h2>
          <p className="section-subtitle mx-auto">
            Professional development and continuous learning
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {certifications.map((cert, index) => (
            <div
              key={cert.title}
              className="glass-card hover-card p-6 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                {/* Logo */}
                <div className="w-14 h-14 rounded-xl bg-background/50 p-3 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <img
                    src={cert.logo}
                    alt={cert.issuer}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <span className={`skill-badge border-none ${cert.status === 'completed' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'}`}>
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
                      className="inline-flex items-center gap-1 mt-3 text-sm text-primary hover:underline"
                    >
                      View Credential
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

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
