import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Facebook,
  Copy,
  Check,
  Clock,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Magnetic from "@/components/ui/Magnetic";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

const socialLinks = [
  {
    label: "GitHub",
    value: "github.com/JosephLopezzzz",
    href: "https://github.com/JosephLopezzzz",
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "Joseph T. Lopez",
    href: "https://www.linkedin.com/in/joseph-lopez-5a2090412",
    icon: Linkedin,
  },
  {
    label: "Facebook",
    value: "Joseph Lopez",
    href: "https://www.facebook.com/josephlopez102004",
    icon: Facebook,
  },
];

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [phTime, setPhTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const time = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Manila",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        setPhTime(time);
      } catch {
        setPhTime("");
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  // Framer motion interactive 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    if (width === 0 || height === 0) return;

    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handlePointerMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleCopyEmail = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("josephlopez102004@gmail.com");
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="w-full relative py-2"
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      <div
        className={`section-container transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="mb-6">
          <h2 className="section-title">Let's Connect</h2>
          <div className="w-12 h-1 bg-foreground mb-4" />
          <p className="section-subtitle">
            I'm currently looking for new opportunities, freelance projects, and
            hackathon teams. My inbox is always open.
          </p>
        </div>

        <div className="w-full max-w-3xl" style={{ perspective: 1200 }}>
          <motion.div
            ref={cardRef}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handlePointerLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handlePointerLeave}
            onTouchCancel={handlePointerLeave}
            className="w-full cursor-grab active:cursor-grabbing rounded-3xl"
          >
            <SpotlightCard className="flex flex-col gap-6 bg-card/60 backdrop-blur-xl border border-border/80 hover:border-foreground/30 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
              {/* Top Meta Bar: Status & Quickest way to reach me */}
              <div className="flex items-center justify-between gap-4 flex-wrap z-10">
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" />
                  Quickest way to reach me
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-xs font-mono text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span>Available for work</span>
                </div>
              </div>

              {/* Headline */}
              <p className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-tight z-10">
                Drop me a line and I'll respond within 24 hours.
              </p>

              {/* Interactive Email Actions: Open Mailto + Quick Copy with instant tactile feedback */}
              <div className="flex flex-wrap items-center gap-3 z-10">
                <a
                  href="mailto:josephlopez102004@gmail.com"
                  className="minimal-btn group/email active:scale-95 transition-transform"
                >
                  <Mail
                    size={16}
                    className="group-hover/email:scale-110 transition-transform"
                  />
                  <span>josephlopez102004@gmail.com</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-all active:scale-95 ${
                    copied
                      ? "bg-green-500/10 border-green-500/50 text-green-500"
                      : "bg-secondary/60 hover:bg-secondary border-border text-foreground hover:border-foreground/30"
                  }`}
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check
                        size={16}
                        className="text-green-500 animate-bounce"
                      />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span className="hidden sm:inline">Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              {/* Bottom Row: Social links + Interactive Location & Time */}
              <div className="border-t border-border pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 z-10">
                <div>
                  <p className="text-sm text-muted-foreground mb-3 font-mono text-xs uppercase tracking-wider">
                    Or find me on
                  </p>
                  <div className="flex items-center gap-3">
                    {socialLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Tooltip key={item.label}>
                          <TooltipTrigger asChild>
                            <div>
                              <Magnetic pullFactor={0.3}>
                                <a
                                  href={item.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="w-10 h-10 rounded-xl bg-background/50 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-secondary/40 transition-all active:scale-90 shadow-sm"
                                  aria-label={item.label}
                                >
                                  <Icon size={18} />
                                </a>
                              </Magnetic>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="font-mono text-xs"
                          >
                            {item.value}
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>

                {/* Location & Live Clock Badge */}
                <div className="flex items-center gap-3 bg-background/40 border border-border/80 px-4 py-3 rounded-2xl hover:border-foreground/20 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-secondary/70 border border-border flex items-center justify-center text-foreground flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                        Location
                      </span>
                      {phTime && (
                        <span className="text-[10px] font-mono text-primary/80 bg-primary/10 px-1.5 py-0.2 rounded flex items-center gap-1">
                          <Clock size={10} />
                          {phTime}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      Quezon City, Philippines
                    </span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
