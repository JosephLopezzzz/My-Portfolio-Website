import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import GithubSection from '@/components/sections/GithubSection';
import EducationSection from '@/components/sections/EducationSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ContactSection from '@/components/sections/ContactSection';
import GallerySection from '@/components/sections/GallerySection';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ScrollProgress from '@/components/ScrollProgress';
import ThemeToggle from '@/components/ThemeToggle';
import { useDocumentMetadata } from '@/hooks/useDocumentMetadata';
import ClickSpark from '@/components/ui/ClickSpark';
import Particles from '@/components/ui/Particles';
import { useTheme } from 'next-themes';

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
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative z-10">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={[isDark ? '#ffffff' : '#000000']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>
      <ClickSpark sparkColor={isDark ? '#ffffff' : '#000000'} sparkSize={12} sparkRadius={20} sparkCount={8} duration={500} />
      <ScrollProgress />
      <div className="fixed top-6 right-6 z-[60]">
        <ThemeToggle />
      </div>
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <GithubSection />
        <SkillsSection />
        <GallerySection />
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
