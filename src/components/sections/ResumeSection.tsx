import { FileText, Download } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ResumeSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="resume" className="w-full relative py-2" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={`section-container transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <div className="minimal-card flex flex-col md:flex-row items-center justify-between gap-8 bg-secondary/50">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-background border border-border flex items-center justify-center text-foreground flex-shrink-0">
              <FileText size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">My Full Resume</h2>
              <p className="text-muted-foreground">Detailed overview of my experience, education, and skills.</p>
            </div>
          </div>
          
          <a href="/resume.pdf" download className="minimal-btn whitespace-nowrap">
            <Download size={18} />
            Download PDF
          </a>
        </div>

      </div>
    </section>
  );
};

export default ResumeSection;
