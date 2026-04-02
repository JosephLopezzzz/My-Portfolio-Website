import { User, Target, Heart, Lightbulb } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const highlights = [
  {
    icon: User,
    title: 'Who I Am',
    description: 'A dedicated BSIT student with a passion for technology and continuous learning.',
  },
  {
    icon: Target,
    title: 'My Goal',
    description: 'To become a skilled full-stack developer and contribute to innovative tech solutions.',
  },
  {
    icon: Heart,
    title: 'What I Love',
    description: 'Building web applications, exploring AI/ML concepts, and solving complex problems.',
  },
  {
    icon: Lightbulb,
    title: 'My Approach',
    description: 'Combining creativity with technical skills to create impactful digital experiences.',
  },
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="about" className="py-20 md:py-32 bg-card/30">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle mx-auto">
            Get to know the person behind the code
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Left Content */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hello! I'm <span className="text-foreground font-semibold">Joseph Lopez</span>, 
              a passionate BSIT student at Bestlink College of the Philippines. I'm currently 
              in my 3rd year, second semester, and I'm deeply invested in building web 
              applications and learning modern technologies.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I chose Information Technology because of my fascination with how technology 
              shapes our world. From creating simple websites to exploring the possibilities 
              of artificial intelligence, I'm constantly driven to learn and grow.
            </p>
            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-4">Areas of Interest</h3>
              <div className="flex flex-wrap gap-3">
                {['Web Development', 'Artificial Intelligence', 'Networking', 'Cybersecurity', 'Database Management'].map((interest) => (
                  <span
                    key={interest}
                    className="skill-badge"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Highlight Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="glass-card hover-card p-6 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
