import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { RefObject } from 'react';

const facts = [
  { label: 'Education', value: 'BSIT / Bestlink College / Expected 2027' },
  { label: 'Focus', value: 'Full-stack web and mobile applications' },
  { label: 'Community', value: 'App Builders PH' },
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="w-full relative py-2" ref={ref as RefObject<HTMLElement>}>
      <div className={`section-container transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:gap-16">
          <div>
            <h2 className="section-title">About</h2>
            <p className="section-subtitle mb-0">
              I build practical web and mobile applications, focusing on clear interfaces and useful systems.
            </p>
          </div>

          <dl className="divide-y divide-border/70 border-y border-border/70">
            {facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[100px_1fr] gap-4 py-4 sm:grid-cols-[120px_1fr]">
                <dt className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{fact.label}</dt>
                <dd className="text-sm font-medium text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
