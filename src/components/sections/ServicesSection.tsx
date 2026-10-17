import { Code2, PanelsTopLeft, Workflow, type LucideIcon } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SpotlightCard from "@/components/ui/SpotlightCard";

const services: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Websites and landing pages",
    description:
      "Responsive portfolio, product, and business pages with clear navigation and a straightforward path to contact.",
    icon: PanelsTopLeft,
  },
  {
    title: "Full-stack web applications",
    description:
      "Interfaces, APIs, and database-backed workflows for dashboards, management tools, and other focused products.",
    icon: Code2,
  },
  {
    title: "Product features and integrations",
    description:
      "Authentication flows, data features, and AI integrations connected through server-side APIs.",
    icon: Workflow,
  },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

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
            I’m open to small, clearly scoped projects and collaborations. We can
            agree on the features and deliverables before work begins.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map(({ title, description, icon: Icon }) => (
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
      </div>
    </section>
  );
};

export default ServicesSection;
