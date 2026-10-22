import React from "react";
import { Link } from "react-router-dom";
import { Github, ArrowRight, ArrowLeft, ArrowUpRight, Download, Database } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SpotlightCard from "@/components/ui/SpotlightCard";
import {
  SiTypescript,
  SiReact,
  SiExpo,
  SiNodedotjs,
  SiJavascript,
  SiNextdotjs,
  SiSqlite,
  SiPostgresql,
  SiSupabase,
} from "react-icons/si";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const getTechIcon = (tag: string) => {
  switch (tag) {
    case "TypeScript":
      return <SiTypescript className="w-5 h-5 text-[#3178C6]" />;
    case "React Native":
    case "React":
      return <SiReact className="w-5 h-5 text-[#61DAFB]" />;
    case "Expo":
      return <SiExpo className="w-5 h-5" />;
    case "Node.js":
      return <SiNodedotjs className="w-5 h-5 text-[#339933]" />;
    case "JavaScript":
      return <SiJavascript className="w-5 h-5 text-[#F7DF1E]" />;
    case "Next.js":
      return <SiNextdotjs className="w-5 h-5" />;
    case "SQLite":
      return <SiSqlite className="w-5 h-5 text-[#44A6DA]" />;
    case "PostgreSQL":
      return <SiPostgresql className="w-5 h-5 text-[#4169E1]" />;
    case "Supabase":
      return <SiSupabase className="w-5 h-5 text-[#3FCF8E]" />;
    case "IndexedDB":
      return <Database className="w-5 h-5" />;
    default:
      return null;
  }
};

interface Project {
  title: string;
  initials: string;
  accentChar: string;
  role?: string;
  description: string;
  tags: string[];
  github?: string;
  link?: string;
  linkLabel?: string;
  download?: string;
  livePreview?: string;
  image?: string;
  imageAlt?: string;
  status: string;
  imageFit?: "cover" | "contain";
  bgImage?: string;
  bgColor?: string;
  projectType?: "School project" | "Team capstone";
}

const projects: Project[] = [
  {
    title: "Nokma",
    initials: "NK",
    accentChar: "ノ",
    role: "Solo developer",
    status: "Expo build and brand site available",
    description:
      "A mobile nutrition and macro-tracking app built with React Native and SQLite. The linked website is a brand overview; the app build is linked separately.",
    tags: ["TypeScript", "React Native", "Expo", "SQLite"],
    github: "https://github.com/JosephLopezzzz/Nokma",
    link: "https://nokma-branding.vercel.app/",
    linkLabel: "Brand Site",
    livePreview: "https://nokma-branding.vercel.app/",
    download:
      "https://expo.dev/accounts/josephlopezzzz/projects/coach-hoo/builds/c3b15c7e-98fd-4494-92d5-f19a428eef43",
    image: "/nokma logo.png",
    imageAlt: "Nokma brand mark",
    bgImage: "/bgg.jpeg",
  },
  {
    title: "Bangwit",
    initials: "BW",
    accentChar: "",
    role: "Creator & Developer",
    status: "Prototype · source repository available",
    description:
      "A Cavite waterbody explorer prototype with a private, browser-local catch journal and personal species list. Verified regional species records, fishing rules, and safety guidance are not available yet.",
    tags: ["TypeScript", "Next.js", "React", "IndexedDB"],
    github: "https://github.com/JosephLopezzzz/Bangwit",
    image: "/bangwit-preview.jpg",
    imageAlt: "Bangwit prototype showing the Cavite waterbody explorer",
    imageFit: "contain",
    bgColor: "#ffffff",
  },
  {
    title: "Fraud Detection in Microfinance",
    initials: "FD",
    accentChar: "∑",
    role: "Full-stack development",
    status: "School project · source repository available",
    description:
      "A microfinance management dashboard with rule-based alerts for transaction patterns such as duplicates, rapid activity, large amounts, and after-hours activity.",
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL", "Supabase"],
    github:
      "https://github.com/JosephLopezzzz/Fraud-Detection-System-in-Microfinance",
    image: "/fraud detection.png",
    imageAlt: "Microfinance loan management product page with a sign-in screen",
    imageFit: "contain",
    projectType: "School project",
  },
  {
    title: "HR Management System",
    initials: "HR",
    accentChar: "///",
    role: "Full Stack Developer",
    status: "School project · source repository available",
    description:
      "A role-based HR system covering employee records, departments, attendance, leave, performance, payroll, and audit logs. No public interactive demo is linked.",
    tags: ["TypeScript", "React", "PostgreSQL", "Supabase"],
    github:
      "https://github.com/JosephLopezzzz/Human-Resources-Management-System-G1",
    image: "/hrms.png",
    imageAlt: "HR management product page with a sign-in screen",
    imageFit: "contain",
    projectType: "School project",
  },
  {
    title: "FleetOps",
    initials: "FT",
    accentChar: "F",
    projectType: "Team capstone",
    status: "Team capstone · source repository available",
    description:
      "A fleet and hotel guest transportation management system covering booking requests, approvals, driver and vehicle scheduling, GPS-tracked trips, and odometer, fuel, and maintenance follow-up.",
    tags: ["Next.js", "React", "Expo", "React Native", "PostgreSQL", "Supabase"],
    github: "https://github.com/ro-mee/fleet-transpo",
    image: "/image copy.png",
    imageFit: "contain",
    imageAlt: "FleetOps fleet and transportation management system",
  },
];

type ProjectsSectionProps = {
  mode?: "featured" | "all";
};

const ProjectsSection = ({ mode = "featured" }: ProjectsSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();
  const isAllProjectsPage = mode === "all";

  return (
    <section
      id={isAllProjectsPage ? undefined : "projects"}
      className="w-full relative py-2"
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      <div
        className={`section-container transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="mx-auto w-full max-w-[45rem]">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="mb-0 font-display text-[1.75rem] font-normal leading-tight tracking-tight text-foreground">
              Projects
            </h2>
            {isAllProjectsPage && (
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back to Portfolio
              </Link>
            )}
          </div>

          <div id="project-grid" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(isAllProjectsPage ? projects : projects.slice(0, 3)).map((project, index) => (
            <SpotlightCard
              key={index}
              className="group flex h-full flex-col !rounded-xl !border-dotted !border-border/60 !bg-transparent !p-2.5"
            >
              {/* Project thumbnail or live site preview */}
              <a
                href={project.link || project.download || project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title}${project.livePreview ? " live site" : ""}`}
                className="block w-full shrink-0"
              >
                <div className="h-40 w-full rounded-lg border border-border/30 bg-white p-1.5">
                  <div
                    className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-md ${project.bgImage || project.bgColor ? "" : "bg-white"}`}
                    style={{
                      ...(project.bgImage
                        ? {
                            backgroundImage: `url('${project.bgImage}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : {}),
                      ...(project.bgColor
                        ? {
                            backgroundColor: project.bgColor,
                          }
                        : {}),
                    }}
                  >
                    {project.livePreview ? (
                      <>
                        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.05]">
                          <iframe
                            src={project.livePreview}
                            title={`${project.title} live preview`}
                            aria-hidden="true"
                            tabIndex={-1}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            sandbox="allow-scripts"
                            className="pointer-events-none absolute left-0 top-0 h-[300%] w-[300%] origin-top-left border-0"
                            style={{ transform: "scale(0.3333)" }}
                          />
                        </div>
                        <span className="absolute right-2 top-2 z-20 rounded-full border border-white/30 bg-black/60 px-2 py-1 text-[0.6rem] font-mono uppercase tracking-wider text-white backdrop-blur-sm">
                          Brand site preview
                        </span>
                      </>
                    ) : project.image ? (
                      <img
                        src={project.image}
                        alt={project.imageAlt ?? project.title}
                        className={`relative z-10 h-full w-full ${project.imageFit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-500 group-hover:scale-[1.05]`}
                      />
                    ) : (
                      <>
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage:
                              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                          }}
                        />
                        <span
                          className="pointer-events-none absolute select-none font-mono text-8xl font-bold"
                          style={{
                            color: "hsl(var(--foreground)/0.1)",
                            letterSpacing: "-0.05em",
                          }}
                        >
                          {project.accentChar}
                        </span>
                        <span className="relative z-10 font-mono text-5xl font-bold tracking-tighter text-foreground/80">
                          {project.initials}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </a>

              <div className="mt-3 flex flex-grow flex-col">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                  {project.projectType && (
                    <span className="flex-shrink-0 whitespace-nowrap rounded-sm border border-foreground/30 px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                      {project.projectType}
                    </span>
                  )}
                </div>

                {project.role && (
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    {project.role}
                  </p>
                )}

                <p className="mb-4 flex-grow text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="mb-4 flex flex-wrap items-center gap-x-2.5 gap-y-2">
                  <TooltipProvider delayDuration={100}>
                    {project.tags.map((tag) => {
                      const icon = getTechIcon(tag);
                      return (
                        <Tooltip key={tag}>
                          <TooltipTrigger asChild>
                            <span role="img" aria-label={tag} tabIndex={0} className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-muted-foreground transition-opacity hover:opacity-70">
                              {icon ? (
                                icon
                              ) : (
                                <span className="text-xs font-mono">
                                  {tag.slice(0, 2)}
                                </span>
                              )}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{tag}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </TooltipProvider>
                </div>

                <div
                  className={`mt-auto flex items-center border-t border-border/60 pt-3 ${project.download || project.link ? "justify-between gap-2" : "justify-end"}`}
                >
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="relative z-20 flex items-center gap-1 text-[0.65rem] font-mono uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground group/link"
                    >
                      <Github size={14} />
                      <span>
                        {project.download || project.link
                          ? "Code"
                          : "View Github"}
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform"
                      />
                    </a>
                  )}

                  <div className="flex items-center gap-2.5">
                    {project.download && (
                      <a
                        href={project.download}
                        target="_blank"
                        rel="noreferrer"
                        className="relative z-20 flex items-center gap-1 text-[0.65rem] font-mono font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground group/link"
                      >
                        <Download size={14} />
                        <span>Download</span>
                        <ArrowUpRight
                          size={14}
                          className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform"
                        />
                      </a>
                    )}

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="relative z-20 flex items-center gap-1 text-[0.65rem] font-mono uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground group/link"
                      >
                        <span>{project.linkLabel || "Visit Site"}</span>
                        <ArrowUpRight
                          size={14}
                          className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
          </div>

          {!isAllProjectsPage && (
            <div className="mt-7 flex justify-center">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Explore All Projects
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
