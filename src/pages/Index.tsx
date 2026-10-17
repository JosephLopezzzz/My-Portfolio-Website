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

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />
      <div className="fixed top-6 right-6 z-[60]">
        <ThemeToggle />
      </div>
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <ServicesSection />
        <ProcessSection />
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <CertificationsSection />
        <GithubSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
