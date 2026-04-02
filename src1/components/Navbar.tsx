import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Explore", href: "#explore" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -72, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-foreground/10 bg-background/40 backdrop-blur-md"
        >
          <span
            className="text-lg font-semibold tracking-widest text-foreground/90"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Whispering Valley
          </span>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm tracking-[0.15em] uppercase text-foreground/60 hover:text-foreground transition-colors duration-300"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
