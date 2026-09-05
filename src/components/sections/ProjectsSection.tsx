import React from 'react';
import { Github, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SpotlightCard from '@/components/ui/SpotlightCard';
import {
  SiTypescript,
  SiReact,
  SiExpo,
  SiNodedotjs,
  SiJavascript,
  SiNextdotjs,
} from 'react-icons/si';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const getTechIcon = (tag: string) => {
  switch (tag) {
    case 'TypeScript':
      return <SiTypescript className="w-5 h-5 text-[#3178C6]" />;
    case 'React Native':
    case 'React':
      return <SiReact className="w-5 h-5 text-[#61DAFB]" />;
    case 'Expo':
      return <SiExpo className="w-5 h-5" />;
    case 'Node.js':
      return <SiNodedotjs className="w-5 h-5 text-[#339933]" />;
    case 'JavaScript':
      return <SiJavascript className="w-5 h-5 text-[#F7DF1E]" />;
    case 'Next.js':
      return <SiNextdotjs className="w-5 h-5" />;
    default:
      return null;
  }
};

const projects = [
  {
    title: 'Nokma',
    initials: 'NK',
    accentChar: 'ノ',
    role: 'Solo/Full Stack Developer',
    description: 'This app helps you track what you eat, understand your macros, and make better food choices—without giving up the meals you love.',
    tags: ['TypeScript', 'React Native', 'Expo'],
    github: 'https://github.com/JosephLopezzzz/Nokma',
  },
  {
    title: 'HR Management System G1',
    initials: 'HR',
    accentChar: '///',
    role: 'Full Stack Developer',
    description: 'Human Resources Management System for managing employee data, attendance, and payroll efficiently.',
    tags: ['TypeScript', 'React'],
    github: 'https://github.com/JosephLopezzzz/Human-Resources-Management-System-G1',
  },
  {
    title: 'Fraud Detection in Microfinance',
    initials: 'FD',
    accentChar: '∑',
    role: 'Solo/Full Stack Developer',
    description: 'A system designed to detect fraudulent activities and transactions within microfinance institutions.',
    tags: ['TypeScript', 'Node.js'],
    github: 'https://github.com/JosephLopezzzz/Fraud-Detection-System-in-Microfinance',
  },

  {
    title: 'Fleet & Transport Management',
    initials: 'FT',
    accentChar: '△',
    role: 'Backend Developer',
    description: 'Capstone project — a full fleet and transportation management system built for a hotel and restaurant management context. Built in collaboration with ro-mee.',
    tags: ['JavaScript', 'Next.js', 'Node.js'],
    github: 'https://github.com/ro-mee/fleet-transpo',
    link: 'https://fleet-transpo.vercel.app',
    image: '/image copy.png',
    isCapstone: true,
  },
];

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="w-full relative py-2" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={`section-container transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <SpotlightCard 
              key={index} 
              className="flex flex-col group p-4 sm:p-5 border border-dashed border-border/60 bg-card/40 rounded-2xl"
            >
              {/* Stylized project identity thumbnail */}
              <a 
                href={project.link || project.github} 
                target="_blank" 
                rel="noreferrer"
                className="block w-full shrink-0"
              >
                <div className={`w-full h-48 rounded-xl relative overflow-hidden flex items-center justify-center select-none border border-border/30 ${project.image ? 'bg-white' : 'bg-muted/30'}`}>
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.05]" />
                  ) : (
                    <>
                      {/* Grid lines */}
                      <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                      }} />
                      {/* Accent character — large, behind */}
                      <span className="absolute font-mono text-8xl font-bold select-none pointer-events-none" style={{ color: 'hsl(var(--foreground)/0.1)', letterSpacing: '-0.05em' }}>
                        {project.accentChar}
                      </span>
                      {/* Initials — front */}
                      <span className="relative z-10 font-mono text-5xl font-bold tracking-tighter text-foreground/80">
                        {project.initials}
                      </span>
                    </>
                  )}
                </div>
              </a>
              
              <div className="flex flex-col flex-grow mt-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                  {project.isCapstone && (
                    <span className="flex-shrink-0 text-[10px] font-mono uppercase tracking-widest border border-foreground/30 px-2 py-0.5 text-muted-foreground whitespace-nowrap rounded-sm">
                      Capstone
                    </span>
                  )}
                </div>
                
                {project.role && (
                  <p className="text-sm font-medium text-amber-500/90 mb-3">{project.role}</p>
                )}
                
                <p className="text-muted-foreground text-sm flex-grow leading-relaxed mb-6">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <TooltipProvider delayDuration={100}>
                    {project.tags.map((tag) => {
                      const icon = getTechIcon(tag);
                      return (
                        <Tooltip key={tag}>
                          <TooltipTrigger asChild>
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-background border border-border/50 text-muted-foreground hover:bg-secondary transition-colors">
                              {icon ? icon : <span className="text-[10px] font-mono">{tag.slice(0, 2)}</span>}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{tag}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </TooltipProvider>
                </div>
                
                <div className="flex items-center justify-end pt-4 border-t border-dashed border-border/60 mt-auto">
                  <a 
                    href={project.link || project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest relative z-20 group/link"
                  >
                    {project.link ? 'Visit Site' : 'View Github'} 
                    <ArrowUpRight size={14} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
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
