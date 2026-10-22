import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTheme } from 'next-themes';

const activityTheme = {
  light: ['#ededed', '#c8c8c8', '#969696', '#5c5c5c', '#222222'],
  dark: ['#222222', '#4a4a4a', '#7a7a7a', '#b0b0b0', '#f2f2f2'],
};

const GithubSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { resolvedTheme } = useTheme();
  const calendarContainerRef = React.useRef<HTMLDivElement>(null);
  const [calendarWidth, setCalendarWidth] = React.useState(0);

  const isDark = resolvedTheme === 'dark';
  const blockSize = calendarWidth > 0
    ? Math.max(2, Math.min(12, Math.floor((calendarWidth - 32) / 53) - 1))
    : 10;

  React.useEffect(() => {
    const container = calendarContainerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) setCalendarWidth(entry.contentRect.width);
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="github" className="w-full relative py-2" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={`section-container transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            GitHub Activity
          </h2>
        </div>

        <div ref={calendarContainerRef} className="w-full min-w-0 flex justify-center minimal-card rounded-2xl overflow-hidden border border-border bg-card p-6 md:p-8">
          <GitHubCalendar 
            username="JosephLopezzzz" 
            colorScheme={isDark ? 'dark' : 'light'}
            theme={activityTheme}
            blockSize={blockSize}
            blockMargin={1}
            fontSize={12}
          />
        </div>

      </div>
    </section>
  );
};

export default GithubSection;
