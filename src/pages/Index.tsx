import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import EducationSection from '@/components/sections/EducationSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ResumeSection from '@/components/sections/ResumeSection';
import ContactSection from '@/components/sections/ContactSection';
import GallerySection from '@/components/sections/GallerySection';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ScrollProgress from '@/components/ScrollProgress';
import { useDocumentMetadata } from '@/hooks/useDocumentMetadata';

const Index = () => {
  useDocumentMetadata({
    title: 'Joseph T. Lopez — Full-Stack Developer & AI Engineer',
    description: 'Portfolio of Joseph T. Lopez — BSIT student at Bestlink College, building modern web apps and AI-integrated systems.',
    ogTitle: 'Joseph T. Lopez — Full-Stack Developer & AI Engineer',
    ogDescription: 'BSIT student at Bestlink College of the Philippines. Building modern web applications and AI-integrated systems.',
    ogImage: '/pfp/white1x1.png',
    twitterCard: 'summary_large_image',
    twitterImage: '/pfp/white1x1.png',
  });
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <GallerySection />
        <EducationSection />
        <CertificationsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
