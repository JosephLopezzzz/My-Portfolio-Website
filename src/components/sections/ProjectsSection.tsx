import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const projects = [
  {
    title: 'Nokma',
    description: 'This app helps you track what you eat, understand your macros, and make better food choices—without giving up the meals you love.',
    image: '',
    tags: ['TypeScript'],
    github: 'https://github.com/JosephLopezzzz/Nokma',
    live: 'https://github.com/JosephLopezzzz/Nokma',
  },
  {
    title: 'HR Management System G1',
    description: 'Human Resources Management System for managing employee data, attendance, and payroll efficiently.',
    image: '',
    tags: ['TypeScript'],
    github: 'https://github.com/JosephLopezzzz/Human-Resources-Management-System-G1',
    live: 'https://github.com/JosephLopezzzz/Human-Resources-Management-System-G1',
  },
  {
    title: 'Fraud Detection in Microfinance',
    description: 'A system designed to detect fraudulent activities and transactions within microfinance institutions.',
    image: '',
    tags: ['TypeScript'],
    github: 'https://github.com/JosephLopezzzz/Fraud-Detection-System-in-Microfinance',
    live: 'https://github.com/JosephLopezzzz/Fraud-Detection-System-in-Microfinance',
  },
  {
    title: 'Microfinance SMS',
    description: 'An automated SMS notification system for microfinance clients for payment reminders and alerts.',
    image: '',
    tags: ['TypeScript', 'Node.js'],
    github: 'https://github.com/JosephLopezzzz/Microfinance-SMS',
    live: 'https://github.com/JosephLopezzzz/Microfinance-SMS',
  },
  {
    title: 'hmscore1last1',
    description: 'A core management system built for scalable institutional operations.',
    image: '',
    tags: ['PHP'],
    github: 'https://github.com/JosephLopezzzz/hmscore1last1',
    live: 'https://github.com/JosephLopezzzz/hmscore1last1',
  },
];

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="w-full relative py-20" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={`section-container transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="section-title">Featured Projects</h2>
            <div className="w-12 h-1 bg-foreground mb-4" />
            <p className="section-subtitle mb-0 max-w-xl">
              A selection of my recent work in web development, AI integration, and hackathons.
            </p>
          </div>
          <a href="https://github.com/JosephLopezzzz" target="_blank" rel="noreferrer" className="minimal-btn-secondary whitespace-nowrap">
            View All Projects
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="minimal-card flex flex-col group p-0 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-full h-48 bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-colors z-10" />
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground z-0">
                   {/* Fallback pattern if image is missing */}
                   <span className="font-mono text-xs uppercase tracking-widest">{project.title.replace(/\s+/g, '-').toLowerCase()}</span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-pill">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm font-medium"
                  >
                    <Github size={16} /> Code
                  </a>
                  <a 
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm font-medium ml-auto"
                  >
                    Live Site <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
