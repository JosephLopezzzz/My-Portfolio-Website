import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type SkillCategory = {
  title: string;
  skills: { name: string; icon: string }[];
};

const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'C', icon: '/c-logo.svg' },
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    ],
  },
  {
    title: 'Frameworks & Tools',
    skills: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    ],
  },
  {
    title: 'Other IT Skills',
    skills: [
      { name: 'Networking', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
      { name: 'Troubleshooting', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg' },
      { name: 'System Administration', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-plain.svg' },
    ],
  },
];

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle mx-auto">
            Technologies and tools I work with
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skillCategories.map((category, index) => (
            <button
              key={category.title}
              onClick={() => setActiveCategory(index)}
              className={activeCategory === index ? 'glass-btn px-6' : 'glass-btn glass-btn-secondary px-6'}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {skillCategories[activeCategory].skills.map((skill, index) => (
            <div
              key={skill.name}
              className="glass-card hover-card p-6 flex flex-col items-center justify-center gap-3 group cursor-pointer"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center p-2 rounded-xl bg-background/50 group-hover:scale-110 transition-transform duration-300">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-full h-full object-contain dark:invert-0"
                  loading="lazy"
                />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
                {skill.name}
              </span>
            </div>
          ))}
        </div>

        {/* All Skills Display */}
        <div className="mt-16 pt-8 border-t border-border">
          <h3 className="text-xl font-semibold text-center mb-8">All Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skillCategories.flatMap((cat) => cat.skills).map((skill) => (
              <span key={skill.name} className="skill-badge">
                <img src={skill.icon} alt="" className="w-4 h-4" />
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
