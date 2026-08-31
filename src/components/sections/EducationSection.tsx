import React from 'react';
import { GraduationCap } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const EducationSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="education" className="w-full relative py-20" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={`section-container transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <div className="mb-12 flex items-center gap-4">
          <GraduationCap className="text-foreground flex-shrink-0" size={36} aria-hidden="true" />
          <div>
            <h2 className="section-title">Education</h2>
            <div className="w-12 h-1 bg-foreground mt-4" />
          </div>
        </div>

        <div className="minimal-card flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Bachelor of Science in Information Technology</h3>
            <p className="text-lg text-muted-foreground font-medium mb-4">Bestlink College of the Philippines</p>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Currently pursuing my degree with a focus on web technologies, software engineering, and artificial intelligence. Actively participating in hackathons and leading technical projects.
            </p>
          </div>
          <div className="md:text-right">
            <span className="inline-block px-4 py-2 bg-secondary text-foreground text-sm font-mono font-bold tracking-widest uppercase border border-border">
              Expected 2027
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EducationSection;
