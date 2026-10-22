import { useState } from "react";
import {
  AppWindow,
  Bug,
  Code2,
  ChevronDown,
  ChevronUp,
  Database,
  LifeBuoy,
  PanelsTopLeft,
  Search,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SpotlightCard from "@/components/ui/SpotlightCard";

const services: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Web Development",
    description: "Responsive websites and web applications built for desktop and mobile browsers.",
    icon: PanelsTopLeft,
  },
  {
    title: "Custom Software Development",
    description: "Software features and tools shaped around specific project requirements.",
    icon: Code2,
  },
  {
    title: "Mobile Application Development",
    description: "Mobile app experiences designed for practical, everyday use.",
    icon: Smartphone,
  },
  {
    title: "Technical Support",
    description: "Help troubleshooting software issues and getting applications back on track.",
    icon: LifeBuoy,
  },
  {
    title: "Database Development",
    description: "Database structure and data handling for application needs.",
    icon: Database,
  },
  {
    title: "Software Testing",
    description: "Check application flows, find issues, and improve reliability before release.",
    icon: Bug,
  },
  {
    title: "Search Engine Optimization (SEO)",
    description: "On-page improvements that help search engines understand website content.",
    icon: Search,
  },
  {
    title: "Application Development",
    description: "Purpose-built application features, interfaces, and workflows.",
    icon: AppWindow,
  },
  {
    title: "Web Design",
    description: "Clear, usable page layouts with consistent visual details.",
    icon: PanelsTopLeft,
  },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [showAllServices, setShowAllServices] = useState(false);

  return (
    <section id="services" className="w-full relative py-2" aria-labelledby="services-title">
      <div
        ref={ref}
        className={`section-container transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="mb-8 max-w-2xl">
          <h2 id="services-title" className="section-title">
            Ways I can help
          </h2>
          <p className="section-subtitle mb-0">
            I’m open to small, clearly scoped projects across web, mobile, and custom software. We can agree on the features and deliverables before work begins.
          </p>
        </div>

        <div id="services-grid" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {(showAllServices ? services : services.slice(0, 3)).map(({ title, description, icon: Icon }) => (
            <SpotlightCard
              key={title}
              className="h-full rounded-3xl border border-border/80 bg-card/60 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-foreground/30 hover:shadow-2xl"
              spotlightColor="rgba(255, 255, 255, 0.08)"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-secondary/50 text-foreground">
                <Icon size={20} aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
              <p className="leading-relaxed text-muted-foreground">{description}</p>
            </SpotlightCard>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            aria-expanded={showAllServices}
            aria-controls="services-grid"
            onClick={() => setShowAllServices((showAll) => !showAll)}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {showAllServices ? "See less" : "See more"}
            {showAllServices ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
