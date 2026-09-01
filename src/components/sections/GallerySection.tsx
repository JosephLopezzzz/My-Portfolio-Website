import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import DepthCarousel from '@/components/ui/DepthCarousel';
import SpotlightCard from '@/components/ui/SpotlightCard';

const HACKATHON_IMAGES = [
  { image: '/hackaton/hackaton.jpg', alt: 'Hackathon 1' },
  { image: '/hackaton/1fad6611-c596-4c24-a66b-d8c926f755ea.jpg', alt: 'Hackathon 2' },
  { image: '/hackaton/55fa9d89-0657-4a46-a726-88560a8c6b99.jpg', alt: 'Hackathon 3' },
  { image: '/hackaton/56057f99-8349-4a9f-9279-7503c3d2682d.jpg', alt: 'Hackathon 4' },
  { image: '/hackaton/56aa5b5b-cc17-41c7-b7ff-8853106fec6a.jpg', alt: 'Hackathon 5' },
  { image: '/hackaton/6eb40d32-d234-4964-a998-31b45a53cd95.jpg', alt: 'Hackathon 6' },
  { image: '/hackaton/778b2d75-3ae8-43cd-b69b-dd4a90fb899e.jpg', alt: 'Hackathon 7' },
  { image: '/hackaton/8441ba6e-03bb-40f6-a0e6-eb037ec03115.jpg', alt: 'Hackathon 8' },
  { image: '/hackaton/8e94726c-cb41-42e5-b4ce-e2de07f9d701.jpg', alt: 'Hackathon 9' },
  { image: '/hackaton/8f7398c5-bbee-4310-a4a6-e5fe7197a5e0.jpg', alt: 'Hackathon 10' },
  { image: '/hackaton/e7125525-edcc-490f-b73f-ef3e6147a19f.jpg', alt: 'Hackathon 11' },
  { image: '/hackaton/ff6901b8-49dd-4280-97c3-ce1d835e9fa0.jpg', alt: 'Hackathon 12' },
];

const GallerySection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="gallery" className="w-full relative py-2" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={`section-container transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text & Tags */}
          <div>
            <h2 className="text-3xl font-display font-medium text-foreground mb-6">Gallery</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-md">
              A glimpse into my journey at the National DICT eGov Hackathon 2026. Building, collaborating, and shipping.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full border border-border/50 text-[11px] font-medium text-foreground bg-transparent">Hackathon</span>
              <span className="px-3 py-1 rounded-full border border-border/50 text-[11px] font-medium text-foreground bg-transparent">eGov</span>
              <span className="px-3 py-1 rounded-full border border-border/50 text-[11px] font-medium text-foreground bg-transparent">2026</span>
              <span className="px-3 py-1 rounded-full border border-border/50 text-[11px] font-medium text-foreground bg-transparent">Team</span>
            </div>
          </div>

          {/* Right Column: Carousel */}
          <div className="w-full">
            <div style={{ height: '400px', position: 'relative', width: '100%' }}>
              <DepthCarousel
                items={HACKATHON_IMAGES}
                depth={220}
                spread={90}
                tilt={22}
                tiltDirection="right"
                perspective={1400}
                visibleCards={4}
                falloff={0.2}
                blur={6}
                autoplay
                loop
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
