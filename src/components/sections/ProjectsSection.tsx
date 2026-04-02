import { ExternalLink, Github, Folder } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type Project = {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  live?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: 'Student Management System',
    description: 'A comprehensive web application for managing student records, grades, and attendance. Features include CRUD operations, search functionality, and report generation.',
    technologies: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&h=400&fit=crop',
    github: 'https://github.com/josephlopez102004',
    featured: true,
  },
  {
    title: 'Inventory Management System',
    description: 'A robust inventory tracking system with real-time stock monitoring, low stock alerts, and detailed analytics dashboard.',
    technologies: ['Python', 'MySQL', 'Tkinter'],
    image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=600&h=400&fit=crop',
    github: 'https://github.com/josephlopez102004',
    featured: true,
  },
  {
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with React and Tailwind CSS. Features smooth animations and dark mode support.',
    technologies: ['React', 'Tailwind CSS', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
    github: 'https://github.com/josephlopez102004',
    live: '#',
    featured: true,
  },
  {
    title: 'Login/Register System',
    description: 'Secure authentication system with password hashing, session management, and email verification functionality.',
    technologies: ['PHP', 'MySQL', 'CSS'],
    image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=600&h=400&fit=crop',
    github: 'https://github.com/josephlopez102004',
  },
  {
    title: 'Simple Mobile App',
    description: 'A mobile application prototype designed for task management with intuitive UI and offline capabilities.',
    technologies: ['Java', 'Android Studio', 'SQLite'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
    github: 'https://github.com/josephlopez102004',
  },
  {
    title: 'Network Security Lab',
    description: 'Documentation and implementation of various network security protocols and penetration testing exercises.',
    technologies: ['Wireshark', 'Linux', 'Python'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    github: 'https://github.com/josephlopez102004',
  },
];

const ProjectsSection = () => {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="projects" className="py-20 md:py-32 bg-card/30">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle mx-auto">
            A showcase of my work and what I've built
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {featuredProjects.map((project, index) => (
            <div
              key={project.title}
              className="glass-card hover-card group relative overflow-hidden rounded-2xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="skill-badge"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        <h3 className="text-2xl font-semibold text-center mb-8">Other Projects</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project, index) => (
            <div
              key={project.title}
              className="glass-card hover-card p-6 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Folder className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Github size={18} className="text-muted-foreground hover:text-foreground" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <ExternalLink size={18} className="text-muted-foreground hover:text-foreground" />
                    </a>
                  )}
                </div>
              </div>
              <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="skill-badge text-[10px] px-2 py-0.5"
                  >
                    {tech}
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

export default ProjectsSection;
