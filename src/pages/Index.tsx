import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import GithubSection from "@/components/sections/GithubSection";
import EducationSection from "@/components/sections/EducationSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ScrollProgress from "@/components/ScrollProgress";
import ThemeToggle from "@/components/ThemeToggle";
import { useDocumentMetadata } from "@/hooks/useDocumentMetadata";
import ClickSpark from "@/components/ui/ClickSpark";
import Particles from "@/components/ui/Particles";
import { useTheme } from "next-themes";
import { useReducedMotion } from "framer-motion";

const Index = () => {
  useDocumentMetadata({
    title: "Joseph T. Lopez — Full-Stack Web Developer",
    description:
      "Portfolio of Joseph T. Lopez, a full-stack web developer and IT student building practical web and mobile applications.",
    ogTitle: "Joseph T. Lopez — Full-Stack Web Developer",
    ogDescription:
      "Selected web and mobile projects, services, technical skills, and contact information.",
    twitterCard: "summary_large_image",
  });
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative z-10">
      {!prefersReducedMotion && (
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
          <Particles
            particleColors={[isDark ? "#ffffff" : "#000000"]}
            particleCount={100}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>
      )}
      {!prefersReducedMotion && (
        <ClickSpark
          sparkColor={isDark ? "#ffffff" : "#000000"}
          sparkSize={12}
          sparkRadius={20}
          sparkCount={8}
          duration={500}
        />
      )}
      <ScrollProgress />
      <div className="fixed top-6 right-6 z-[60]">
        <ThemeToggle />
      </div>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ServicesSection />
        <ProcessSection />
        <GithubSection />
        <SkillsSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
