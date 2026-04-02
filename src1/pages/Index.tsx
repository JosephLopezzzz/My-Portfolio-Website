import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ExploreSection from "@/components/ExploreSection";
import GallerySection from "@/components/GallerySection";

const Index = () => {
  return (
    <main className="bg-background">
      <Navbar />
      <HeroSection />
      <ExploreSection />
      <GallerySection />
      <footer className="py-16 text-center border-t border-border">
        <p className="text-muted-foreground text-sm tracking-widest font-light" style={{ fontFamily: "var(--font-body)" }}>
          ✦ The Whispering Valley ✦
        </p>
      </footer>
    </main>
  );
};

export default Index;
