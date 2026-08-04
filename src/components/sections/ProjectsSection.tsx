import { useEffect, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { motion, Variants } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

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
    title: "Coach-Hoo",
    description:
      "A food-tracking mobile app that helps you log meals, understand your macros, and make better food choices — from home-cooked dishes to takeout — without giving up the meals you love.",
    technologies: ["React Native", "Expo", "TypeScript", "Zustand"],
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
    github: "https://github.com/JosephLopezzzz/Coach-Hoo",
    featured: true,
  },
  {
    title: "Fraud Detection System in Microfinance",
    description:
      "My BPM Project on my 3rd year — a full-stack fintech dashboard for Philippine microfinance institutions. A risk-scoring engine flags duplicate, rapid, large, and off-hours transactions, then auto-freezes suspicious activity.",
    technologies: ["React", "TypeScript", "Express", "Supabase"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    github:
      "https://github.com/JosephLopezzzz/Fraud-Detection-System-in-Microfinance",
    featured: true,
  },
  {
    title: "My-Portfolio-Website",
    description:
      "The site you\u2019re browsing — a responsive portfolio with liquid-glass cards, day/night theming, and motion design, built with React, TypeScript, and Tailwind CSS.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    github: "https://github.com/JosephLopezzzz/My-Portfolio-Website",
    live: "/",
    featured: true,
  },
  {
    title: "Hotel and Restaurant Fleet and Transportation Management",
    description:
      "A fleet and transportation management system for the hospitality industry — dispatch vehicles, manage drivers and trips, and coordinate guest and delivery transportation end to end.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&h=400&fit=crop",
    github: "https://github.com/ro-mee/fleet-transpo",
    featured: true,
  },
  {
    title: "Human Resources Management System",
    description:
      "A full-featured HR platform covering employees, departments, attendance, leave, performance reviews, and payroll — secured with role-based access on Supabase.",
    technologies: ["React", "TypeScript", "Supabase", "Vite"],
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
    github:
      "https://github.com/JosephLopezzzz/Human-Resources-Management-System-G1",
    featured: true,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
};

const ProjectsSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    }, 6000);
    return () => window.clearInterval(id);
  }, [api, paused, current]);

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
            Apps and systems I've built, open-sourced on GitHub
          </p>
        </motion.div>

        {/* Projects Photo Carousel */}
        <motion.div
          className="max-w-5xl mx-auto"
          variants={itemVariants}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Carousel
            setApi={setApi}
            opts={{ align: "center", loop: true, containScroll: "trimSnaps" }}
            aria-label="Featured projects"
          >
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem
                  key={project.title}
                  className="basis-full md:basis-[85%] lg:basis-[75%]"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="glass-card hover-card group relative overflow-hidden rounded-3xl flex flex-col justify-end h-[400px]"
                  >
                    {/* Image Background */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end h-full pointer-events-none">
                      <h3 className="font-bold mb-3 group-hover:text-primary transition-colors pointer-events-auto w-fit text-xl md:text-2xl">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 pointer-events-auto text-sm line-clamp-2">
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
                            <span className="block">Code</span>
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
                            <span className="block">Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-3 md:-left-5 z-20 h-11 w-11 bg-background/70 backdrop-blur-md border-border/60 text-foreground shadow-lg hover:bg-background/90 hover:text-primary" />
            <CarouselNext className="right-3 md:-right-5 z-20 h-11 w-11 bg-background/70 backdrop-blur-md border-border/60 text-foreground shadow-lg hover:bg-background/90 hover:text-primary" />
          </Carousel>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-8">
            {projects.map((project, index) => (
              <button
                key={project.title}
                type="button"
                aria-label={`Go to ${project.title}`}
                onClick={() => api?.scrollTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  index === current
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-primary/30 hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
