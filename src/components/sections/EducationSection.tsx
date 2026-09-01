import React from 'react';
import { GraduationCap } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SpotlightCard from '@/components/ui/SpotlightCard';

const EducationSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="education" className="w-full relative py-2" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={`section-container transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <div className="mb-6">
          <h2 className="text-3xl font-display font-medium text-foreground mb-6">Education</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start">
          <div className="text-sm text-muted-foreground pt-1.5 font-mono">
            Expected 2027
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">Bachelor of Science in Information Technology</h3>
            <p className="text-base text-muted-foreground font-medium mb-4">Bestlink College of the Philippines</p>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Currently pursuing my degree with a focus on web technologies, software engineering, and artificial intelligence. Actively participating in hackathons and leading technical projects.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EducationSection;
