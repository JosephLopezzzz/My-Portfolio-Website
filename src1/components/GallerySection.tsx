import { motion } from "framer-motion";
import galleryForest from "@/assets/gallery-forest.jpg";
import galleryLake from "@/assets/gallery-lake.jpg";
import galleryWaterfall from "@/assets/gallery-waterfall.jpg";
import galleryRuins from "@/assets/gallery-ruins.jpg";
import galleryCottage from "@/assets/gallery-cottage.jpg";
import galleryMeadow from "@/assets/gallery-meadow.jpg";

const images = [
  { src: galleryForest, alt: "Enchanted forest with glowing mushrooms", span: "col-span-2 row-span-1" },
  { src: galleryLake, alt: "Mountain lake at golden hour", span: "col-span-1 row-span-2" },
  { src: galleryWaterfall, alt: "Majestic hidden waterfall", span: "col-span-1 row-span-2" },
  { src: galleryRuins, alt: "Ancient hilltop ruins at sunset", span: "col-span-2 row-span-1" },
  { src: galleryCottage, alt: "Cozy cottage at dusk", span: "col-span-1 row-span-1" },
  { src: galleryMeadow, alt: "Bioluminescent meadow under stars", span: "col-span-1 row-span-1" },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="relative py-28 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase font-light" style={{ fontFamily: "var(--font-body)" }}>
            Visions
          </span>
          <h2
            className="mt-4 text-4xl md:text-5xl font-bold tracking-wide text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Gallery
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg font-light" style={{ fontFamily: "var(--font-body)" }}>
            Moments captured from beyond the mist
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[220px] gap-3">
          {images.map((img, i) => (
            <motion.div
              key={img.alt}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`${img.span} relative overflow-hidden rounded-lg group cursor-pointer`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-500 flex items-end p-4">
                <span
                  className="text-foreground text-sm font-light tracking-wide opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {img.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
