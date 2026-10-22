import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ThemeToggle from "@/components/ThemeToggle";
import { useDocumentMetadata } from "@/hooks/useDocumentMetadata";

const ProjectsPage = () => {
  useDocumentMetadata({
    title: "All Projects | Joseph T. Lopez",
    description:
      "Explore Joseph T. Lopez's web, mobile, and data-backed application projects.",
    ogTitle: "All Projects | Joseph T. Lopez",
    ogDescription:
      "Explore Joseph T. Lopez's web, mobile, and data-backed application projects.",
  });

  return (
    <div className="relative z-10 min-h-screen overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />
      <div className="fixed right-6 top-6 z-[60]">
        <ThemeToggle />
      </div>
      <main className="pt-20 md:pt-24">
        <ProjectsSection mode="all" />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default ProjectsPage;
