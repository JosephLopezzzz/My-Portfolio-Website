import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTheme } from 'next-themes';

const GithubSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  return (
    <section id="github" className="w-full relative py-20 bg-background" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={`section-container transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            GitHub Activity
          </h2>
        </div>

        <div className="w-full flex justify-center minimal-card rounded-2xl overflow-x-auto overflow-y-hidden border border-border bg-card p-6 md:p-8">
          <GitHubCalendar 
            username="JosephLopezzzz" 
            colorScheme={isDark ? 'dark' : 'light'}
            blockSize={12}
            blockMargin={4}
            fontSize={12}
          />
        </div>

      </div>
    </section>
  );
};

export default GithubSection;
