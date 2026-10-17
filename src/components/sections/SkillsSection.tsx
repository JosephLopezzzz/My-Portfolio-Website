const technologyGroups = [
  {
    category: "Frontend",
    technologies: ["React", "Next.js", "React Native", "TypeScript", "Tailwind CSS", "Expo"],
  },
  {
    category: "APIs and data",
    technologies: ["Node.js", "Express", "PostgreSQL", "Supabase", "SQLite", "IndexedDB"],
  },
  {
    category: "Portfolio site",
    technologies: ["Vite", "React", "TypeScript", "Tailwind CSS"],
  },
];

const SkillsSection = () => (
  <section id="skills" className="w-full relative py-2" aria-labelledby="skills-title">
    <div className="section-container">
      <div className="max-w-2xl">
        <h2 id="skills-title" className="section-title">
          Technologies in my work
        </h2>
        <p className="section-subtitle mb-0">
          A focused list of tools used in the selected projects and this site.
        </p>
      </div>

      <dl className="mt-8 divide-y divide-border border-y border-border">
        {technologyGroups.map((group) => (
          <div
            key={group.category}
            className="grid gap-3 py-5 md:grid-cols-[180px_minmax(0,1fr)] md:gap-8"
          >
            <dt className="pt-1 text-sm font-medium text-muted-foreground">
              {group.category}
            </dt>
            <dd className="flex flex-wrap gap-2">
              {group.technologies.map((technology) => (
                <span
                  key={`${group.category}-${technology}`}
                  className="rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground"
                >
                  {technology}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default SkillsSection;
