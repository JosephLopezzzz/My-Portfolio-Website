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

const ProcessSection = () => (
  <section id="process" className="w-full relative py-2" aria-labelledby="process-title">
    <div className="section-container grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
      <div>
        <h2 id="process-title" className="section-title">
          How I work
        </h2>
        <p className="section-subtitle mb-0">
          A simple process keeps the scope, progress, and next decision visible.
        </p>
      </div>

      <ol className="divide-y divide-border border-y border-border">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="grid gap-2 py-5 sm:grid-cols-[36px_minmax(0,1fr)] sm:gap-4"
          >
            <span
              aria-hidden="true"
              className="pt-1 font-mono text-xs text-muted-foreground"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-1 leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default ProcessSection;
