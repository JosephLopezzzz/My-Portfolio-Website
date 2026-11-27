import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTheme } from 'next-themes';
import SpotlightCard from '@/components/ui/SpotlightCard';

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

        <SpotlightCard
          className="w-full min-w-0 cursor-pointer minimal-card overflow-hidden shadow-lg transition-all duration-300 hover:z-10 hover:scale-[1.02] hover:shadow-2xl focus-within:z-10 focus-within:scale-[1.02] focus-within:shadow-2xl motion-reduce:hover:scale-100 motion-reduce:focus-within:scale-100"
          spotlightColor="rgba(255, 255, 255, 0.08)"
        >
          <div ref={calendarContainerRef} className="w-full min-w-0 flex justify-center">
            <GitHubCalendar
              username="JosephLopezzzz"
              colorScheme={isDark ? 'dark' : 'light'}
              blockSize={blockSize}
              blockMargin={1}
              fontSize={12}
            />
          </div>
        </SpotlightCard>

      </div>
    </section>
  );
};

export default GithubSection;
