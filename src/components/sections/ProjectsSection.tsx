import React from 'react';
import { Github, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SpotlightCard from '@/components/ui/SpotlightCard';

const projects = [
  {
    title: 'Nokma',
    initials: 'NK',
    accentChar: 'ノ',
    description: 'This app helps you track what you eat, understand your macros, and make better food choices—without giving up the meals you love.',
    tags: ['TypeScript', 'React Native', 'Expo'],
    github: 'https://github.com/JosephLopezzzz/Nokma',
  },
  {
    title: 'HR Management System G1',
    initials: 'HR',
    accentChar: '///',
    description: 'Human Resources Management System for managing employee data, attendance, and payroll efficiently.',
    tags: ['TypeScript', 'React'],
    github: 'https://github.com/JosephLopezzzz/Human-Resources-Management-System-G1',
  },
  {
    title: 'Fraud Detection in Microfinance',
    initials: 'FD',
    accentChar: '∑',
    description: 'A system designed to detect fraudulent activities and transactions within microfinance institutions.',
    tags: ['TypeScript', 'Node.js'],
    github: 'https://github.com/JosephLopezzzz/Fraud-Detection-System-in-Microfinance',
  },
  {
    title: 'Microfinance SMS',
    initials: 'MS',
    accentChar: '◈',
    description: 'An automated SMS notification system for microfinance clients for payment reminders and alerts.',
    tags: ['TypeScript', 'Node.js'],
    github: 'https://github.com/JosephLopezzzz/Microfinance-SMS',
  },
  {
    title: 'Fleet & Transport Management',
    initials: 'FT',
    accentChar: '△',
    description: 'Capstone project — a full fleet and transportation management system built for a hotel and restaurant management context. Built in collaboration with ro-mee.',
    tags: ['TypeScript', 'React', 'Node.js'],
    github: 'https://github.com/ro-mee/fleet-transpo',
    isCapstone: true,
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
              A selection of my real work — systems built and shipped from concept to code.
            </p>
          </div>
          <a href="https://github.com/JosephLopezzzz" target="_blank" rel="noreferrer" className="minimal-btn-secondary whitespace-nowrap">
            View All Projects
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <SpotlightCard 
              key={index} 
              className="flex flex-col group p-0 border-none bg-card"
            >
              {/* Stylized project identity thumbnail */}
              <div className="w-full h-44 bg-foreground relative overflow-hidden flex items-center justify-center select-none z-10">
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'linear-gradient(hsl(var(--background)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--background)) 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }} />
                {/* Accent character — large, behind */}
                <span className="absolute font-mono text-8xl font-bold select-none pointer-events-none" style={{ color: 'hsl(var(--background)/0.3)', letterSpacing: '-0.05em' }}>
                  {project.accentChar}
                </span>
                {/* Initials — front */}
                <span className="relative z-10 font-mono text-5xl font-bold tracking-tighter" style={{ color: 'hsl(var(--background))' }}>
                  {project.initials}
                </span>
                {/* Corner tag */}
                <span aria-hidden="true" className="absolute bottom-3 right-4 font-mono text-[11px] uppercase tracking-widest" style={{ color: 'hsl(var(--background)/0.6)' }}>
                  {project.tags[0]}
                </span>
              </div>
              
              <div className="p-6 flex flex-col flex-grow relative z-10">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                  {project.isCapstone && (
                    <span className="flex-shrink-0 text-[11px] font-mono uppercase tracking-widest border border-foreground/30 px-2 py-0.5 text-muted-foreground whitespace-nowrap">
                      Capstone
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-base mb-6 flex-grow leading-relaxed">
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
                    aria-label={`View ${project.title} on GitHub`}
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm font-medium relative z-20"
                  >
                    <Github size={16} /> View on GitHub
                  </a>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
