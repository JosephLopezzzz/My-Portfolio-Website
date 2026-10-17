import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import { ChatBot } from "@/components/ui/ChatBot";

const HeroSection = () => {
  const { resolvedTheme } = useTheme();
  const portrait =
    resolvedTheme === "dark" ? "/profile/prof-night.png" : "/profile/prof-day.jpg";

  return (
    <>
      <section
        id="home"
        aria-labelledby="hero-title"
        className="relative flex min-h-[min(88vh,860px)] w-full items-center pt-32 pb-16 md:pt-36"
      >
        <div className="section-container grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_220px] md:gap-16">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm text-muted-foreground">
              Quezon City, Philippines · Open to scoped freelance work
            </p>
            <h1
              id="hero-title"
              className="mb-5 font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl"
            >
              Joseph T. Lopez
            </h1>
            <h2 className="mb-5 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
              Web apps built around real workflows.
            </h2>
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I’m a full-stack web developer and IT student. I build web and
              mobile apps from the interface through the API and data layer,
              using tools such as React, TypeScript, Node.js, and SQL databases.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:josephlopez102004@gmail.com?subject=Project%20inquiry"
                className="minimal-btn"
              >
                <Mail size={16} />
                Discuss a project
              </a>
              <a href="#projects" className="minimal-btn-secondary">
                View selected work
                <ArrowDown size={16} />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Resume <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="mt-8 flex items-center gap-4 text-muted-foreground">
              <a
                href="https://github.com/JosephLopezzzz"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
                aria-label="GitHub profile"
              >
                <Github size={19} />
              </a>
              <a
                href="https://www.linkedin.com/in/joseph-lopez-5a2090412"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={19} />
              </a>
              <a
                href="mailto:josephlopez102004@gmail.com"
                className="transition-colors hover:text-foreground"
                aria-label="Email Joseph"
              >
                <Mail size={19} />
              </a>
            </div>
          </div>

          <figure className="order-first mx-auto w-40 sm:w-48 md:order-last md:w-full">
            <img
              src={portrait}
              alt="Portrait of Joseph Lopez"
              className="aspect-square w-full rounded-full border border-border object-cover"
              draggable={false}
            />
          </figure>
        </div>
      </section>

      <ChatBot />
    </>
  );
};

export default HeroSection;
