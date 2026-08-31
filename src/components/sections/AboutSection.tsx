import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="w-full relative py-20 bg-card/50" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={`section-container transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="flex-1">
            <h2 className="section-title">About Me</h2>
            <div className="w-12 h-1 bg-foreground mb-8" />
            
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                I'm a passionate Full-Stack Web Developer and AI Engineer currently pursuing my Bachelor of Science in Information Technology at Bestlink College of the Philippines.
              </p>
              <p>
                My journey into tech started with a curiosity about how things work behind the screen. Today, I specialize in building robust, scalable web applications using modern technologies like React, TailwindCSS, and Node.js.
              </p>
              <p>
                Beyond traditional web development, I am deeply invested in generative AI. I enjoy exploring how large language models can be integrated into everyday tools to create smarter, more intuitive user experiences.
              </p>
              <p>
                When I'm not coding, you'll likely find me participating in hackathons, learning new frameworks, or organizing events for the local developer community.
              </p>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="minimal-card flex flex-col justify-center">
              <h3 className="text-4xl font-bold text-foreground mb-2">3+</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Years Coding</p>
            </div>
            <div className="minimal-card flex flex-col justify-center">
              <h3 className="text-4xl font-bold text-foreground mb-2">15+</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Projects Shipped</p>
            </div>
            <div className="minimal-card flex flex-col justify-center">
              <h3 className="text-4xl font-bold text-foreground mb-2">1</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Hackathon</p>
            </div>
            <div className="minimal-card flex flex-col justify-center">
              <h3 className="text-4xl font-bold text-foreground mb-2">10K+</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Lines of Code</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
