import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import EducationSection from '@/components/sections/EducationSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ResumeSection from '@/components/sections/ResumeSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ScrollProgress from '@/components/ScrollProgress';
import { useDocumentMetadata } from '@/hooks/useDocumentMetadata';

const Index = () => {
  useDocumentMetadata({
    title: 'Joseph Lopez - Portfolio',
    description: 'Joseph Lopez - BSIT Student | Aspiring Web Developer & AI Engineer',
    ogTitle: 'Joseph Lopez - Portfolio',
    ogDescription: 'BSIT Student | Aspiring Web Developer & AI Engineer',
    ogImage: '/profile/prof-day.jpg',
    twitterCard: 'summary_large_image',
    twitterImage: '/profile/prof-day.jpg',
  });
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
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
