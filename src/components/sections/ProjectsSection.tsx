import { ExternalLink, Github, Folder } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 80, damping: 20 } 
  }
};

const ProjectsSection = () => {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 md:py-32 bg-card/30">
      <motion.div 
        className="section-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle mx-auto">
            A showcase of my work and what I've built
          </p>
        </motion.div>

        {/* Featured Projects Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[320px] gap-6 mb-24">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className={`glass-card hover-card group relative overflow-hidden rounded-3xl flex flex-col justify-end ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'
              }`}
            >
              {/* Image Background */}
              <div className="absolute inset-0 z-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent ${index === 0 ? 'opacity-80 group-hover:opacity-90' : 'opacity-90 group-hover:opacity-95'} transition-opacity duration-300`} />
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end h-full pointer-events-none">
                <h3 className={`font-bold mb-3 group-hover:text-primary transition-colors pointer-events-auto w-fit ${index === 0 ? 'text-3xl lg:text-4xl' : 'text-xl md:text-2xl'}`}>
                  {project.title}
                </h3>
                <p className={`text-muted-foreground mb-6 pointer-events-auto ${index === 0 ? 'text-base lg:text-lg max-w-xl line-clamp-3' : 'text-sm line-clamp-2'}`}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6 pointer-events-auto">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="skill-badge bg-background/50 backdrop-blur-md border-border/50 text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 mt-auto pointer-events-auto">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      <Github size={20} />
                      <span className={index === 0 ? 'block' : 'hidden md:block'}>Code</span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink size={20} />
                      <span className={index === 0 ? 'block' : 'hidden md:block'}>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.h3 className="text-2xl font-semibold text-center mb-10" variants={itemVariants}>Other Projects</motion.h3>
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {otherProjects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass-card hover-card p-6 group flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <Folder className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <div className="flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl hover:bg-muted transition-colors"
                    >
                      <Github size={20} className="text-muted-foreground hover:text-foreground" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl hover:bg-muted transition-colors"
                    >
                      <ExternalLink size={20} className="text-muted-foreground hover:text-foreground" />
                    </a>
                  )}
                </div>
              </div>
              <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h4>
              <p className="text-muted-foreground mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="skill-badge text-xs px-2.5 py-1 bg-background/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
