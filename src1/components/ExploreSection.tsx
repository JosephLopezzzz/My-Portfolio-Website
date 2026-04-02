import { motion } from "framer-motion";
import { Trees, Droplets, Mountain, Sparkles } from "lucide-react";

const features = [
  {
    icon: Trees,
    title: "Ancient Forests",
    description: "Walk beneath canopies older than memory, where glowing mushrooms light hidden paths.",
  },
  {
    icon: Droplets,
    title: "Living Waters",
    description: "Crystal rivers that sing as they flow, carrying stories from mountain peaks to meadow pools.",
  },
  {
    icon: Mountain,
    title: "Forgotten Peaks",
    description: "Climb stone sentinels wrapped in cloud and ivy, where ruins whisper of ages past.",
  },
  {
    icon: Sparkles,
    title: "Twilight Meadows",
    description: "Fields that bloom with light at dusk, painting the earth in bioluminescent wonder.",
  },
];

export default function ExploreSection() {
  return (
    <section id="explore" className="relative py-28 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase font-light" style={{ fontFamily: "var(--font-body)" }}>
            Discover
          </span>
          <h2
            className="mt-4 text-4xl md:text-5xl font-bold tracking-wide text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Explore the Valley
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg font-light" style={{ fontFamily: "var(--font-body)" }}>
            Every corner holds a secret, every path leads to wonder
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative rounded-xl border border-border bg-card/60 backdrop-blur-sm p-8 hover:border-primary/30 transition-colors duration-500"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-500">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3
                className="text-lg font-semibold text-card-foreground mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-light" style={{ fontFamily: "var(--font-body)" }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
