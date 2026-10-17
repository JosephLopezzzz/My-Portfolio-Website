import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SpotlightCard from "@/components/ui/SpotlightCard";

const steps = [
  {
    title: "Understand the goal",
    description:
      "We discuss the audience, the problem to solve, and what a useful first release should include.",
  },
  {
    title: "Agree on scope",
    description:
      "I outline the features, milestones, and handoff expectations so the work is clear before it starts.",
  },
  {
    title: "Build in checkpoints",
    description:
      "I share progress in focused steps and use feedback to keep the implementation aligned with the agreed scope.",
  },
  {
    title: "Review and hand off",
    description:
      "We review the key flows, address issues in scope, and hand over the source and setup notes.",
  },
];

const ProcessSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="process" className="w-full relative py-2" aria-labelledby="process-title">
      <div
        ref={ref}
        className={`section-container grid items-start gap-8 transition-all duration-1000 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div>
          <h2 id="process-title" className="section-title">
            How I work
          </h2>
          <p className="section-subtitle mb-0">
            A simple process keeps the scope, progress, and next decision visible.
          </p>
        </div>

        <SpotlightCard
          className="rounded-3xl border border-border/80 bg-card/60 p-5 shadow-lg backdrop-blur-xl sm:p-7"
          spotlightColor="rgba(255, 255, 255, 0.08)"
        >
          <ol className="relative grid gap-x-8 md:grid-cols-2">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="relative flex gap-4 border-b border-border/70 py-5 first:pt-2 last:border-0 md:odd:border-r md:odd:pr-6 md:even:pl-2"
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-secondary/60 font-mono text-xs text-muted-foreground"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </SpotlightCard>
      </div>
    </section>
  );
};

export default ProcessSection;
