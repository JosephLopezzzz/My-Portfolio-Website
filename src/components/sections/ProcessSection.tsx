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
        className={`section-container transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="mb-6 max-w-2xl">
          <h2 id="process-title" className="section-title">
            How I work
          </h2>
          <p className="section-subtitle mb-0">
            A simple process keeps the scope, progress, and next decision visible.
          </p>
        </div>

        <SpotlightCard
          className="rounded-3xl border border-border/80 bg-card/60 p-4 shadow-lg backdrop-blur-xl sm:p-6"
          spotlightColor="rgba(255, 255, 255, 0.08)"
        >
          <ol className="relative grid md:grid-cols-2">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="relative flex gap-4 border-b border-border/70 px-3 py-5 last:border-0 md:min-h-40 md:px-5 md:py-6 md:odd:border-r md:odd:pr-7 md:even:pl-7 md:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-secondary/60 font-mono text-xs text-muted-foreground"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="mb-2 text-lg font-semibold leading-snug text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{step.description}</p>
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
