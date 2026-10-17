const services = [
  {
    title: "Websites and landing pages",
    description:
      "Responsive portfolio, product, and business pages with clear navigation and a straightforward path to contact.",
  },
  {
    title: "Full-stack web applications",
    description:
      "Interfaces, APIs, and database-backed workflows for dashboards, management tools, and other focused products.",
  },
  {
    title: "Product features and integrations",
    description:
      "Authentication flows, data features, and AI integrations connected through server-side APIs.",
  },
];

const ServicesSection = () => (
  <section id="services" className="w-full relative py-2" aria-labelledby="services-title">
    <div className="section-container">
      <div className="max-w-2xl">
        <h2 id="services-title" className="section-title">
          Ways I can help
        </h2>
        <p className="section-subtitle mb-0">
          I’m open to small, clearly scoped projects and collaborations. We can
          agree on the features and deliverables before work begins.
        </p>
      </div>

      <ul className="mt-8 divide-y divide-border border-y border-border">
        {services.map((service) => (
          <li
            key={service.title}
            className="grid gap-2 py-5 md:grid-cols-[240px_minmax(0,1fr)] md:gap-8"
          >
            <h3 className="text-lg font-semibold text-foreground">
              {service.title}
            </h3>
            <p className="max-w-2xl leading-relaxed text-muted-foreground">
              {service.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ServicesSection;
