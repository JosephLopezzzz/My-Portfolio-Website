import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'HTML5/CSS3', 'PHP'],
  },
  {
    title: 'Frontend Development',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'Shadcn UI'],
  },
  {
    title: 'Backend & Database',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'MongoDB', 'REST APIs'],
  },
  {
    title: 'Tools & Ecosystem',
    skills: ['Git & GitHub', 'Docker', 'Vercel', 'Postman', 'Figma', 'Linux'],
  },
];

const SkillsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="w-full relative py-20 bg-card/50" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={`section-container transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="w-12 h-1 bg-foreground mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {skillCategories.map((category, index) => (
            <div key={index} className="minimal-card">
              <h3 className="text-lg font-bold text-foreground mb-6 uppercase tracking-wider">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="tech-pill text-sm px-4 py-2">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
