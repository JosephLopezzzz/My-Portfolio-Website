import React, { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { LayoutGrid } from 'lucide-react';

const fullTechStack = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', invertDark: true },
      { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
      { name: 'Expo', icon: '/expo-go-app-logo-png_seeklogo-457073.png' },
    ]
  },
  {
    category: 'Backend & Database',
    skills: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'C', icon: '/c-logo.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    ]
  },
  {
    category: 'Tools & Version Control',
    skills: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invertDark: true },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
      { name: 'Obsidian', icon: '/obsidian-color.svg' },
    ]
  },
  {
    category: 'AI & Intelligent Systems',
    skills: [
      { name: 'Claude', icon: '/claude-color.svg' },
      { name: 'OpenAI Codex', icon: '/codex-color.svg' },
      { name: 'DeepSeek', icon: '/deepseek-color.svg' },
      { name: 'Gemini', icon: '/gemini-color.svg' },
    ]
  }
];

const allSkills = fullTechStack.flatMap(cat => cat.skills);

const SkillBadge = ({ skill }: { skill: any }) => (
  <span className="flex items-center gap-2 px-4 py-2 mx-2 text-sm font-medium rounded-lg border border-border bg-card text-foreground whitespace-nowrap hover:border-primary/50 transition-colors cursor-default">
    <img 
      src={skill.icon} 
      alt="" 
      className={`w-5 h-5 object-contain ${skill.invertDark ? 'dark:invert' : ''}`} 
    />
    {skill.name}
  </span>
);

const SkillsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [isExpanded, setIsExpanded] = useState(false);

  // Split into 3 rows for marquee
  const row1 = allSkills.slice(0, Math.ceil(allSkills.length / 3));
  const row2 = allSkills.slice(Math.ceil(allSkills.length / 3), Math.ceil(allSkills.length * 2 / 3));
  const row3 = allSkills.slice(Math.ceil(allSkills.length * 2 / 3));

  return (
    <section id="skills" className="w-full relative py-20 bg-background" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={`max-w-5xl mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-display font-medium text-foreground mb-2">
              {isExpanded ? 'Full Tech Stack' : 'Technologies'}
            </h2>
            {isExpanded && (
              <p className="text-muted-foreground text-sm">Comprehensive list of tools and technologies I use.</p>
            )}
          </div>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <LayoutGrid size={16} />
            {isExpanded ? 'Show Less' : 'View All >'}
          </button>
        </div>

        {/* Content */}
        {!isExpanded ? (
          <div className="flex flex-col gap-4 overflow-hidden relative w-full [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] pb-4">
            
            <div className="flex w-max animate-marquee">
              {[...row1, ...row1].map((skill, idx) => (
                <SkillBadge key={`${skill.name}-${idx}`} skill={skill} />
              ))}
            </div>

            <div className="flex w-max animate-marquee-reverse">
              {[...row2, ...row2].map((skill, idx) => (
                <SkillBadge key={`${skill.name}-${idx}`} skill={skill} />
              ))}
            </div>

            <div className="flex w-max animate-marquee">
              {[...row3, ...row3].map((skill, idx) => (
                <SkillBadge key={`${skill.name}-${idx}`} skill={skill} />
              ))}
            </div>

          </div>
        ) : (
          <div className="space-y-12 animate-fade-in">
            {fullTechStack.map((category) => (
              <div key={category.category} className="border-b border-border/10 pb-8 last:border-0">
                <h3 className="text-lg font-semibold text-foreground mb-6">{category.category}</h3>
                <div className="flex flex-wrap gap-4">
                  {category.skills.map((skill) => (
                    <SkillBadge key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default SkillsSection;
