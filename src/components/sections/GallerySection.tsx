import React, { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const HACKATHON_IMAGES = [
  'hackaton.jpg',
  '1fad6611-c596-4c24-a66b-d8c926f755ea.jpg',
  '55fa9d89-0657-4a46-a726-88560a8c6b99.jpg',
  '56057f99-8349-4a9f-9279-7503c3d2682d.jpg',
  '56aa5b5b-cc17-41c7-b7ff-8853106fec6a.jpg',
  '6eb40d32-d234-4964-a998-31b45a53cd95.jpg',
  '778b2d75-3ae8-43cd-b69b-dd4a90fb899e.jpg',
  '8441ba6e-03bb-40f6-a0e6-eb037ec03115.jpg',
  '8e94726c-cb41-42e5-b4ce-e2de07f9d701.jpg',
  '8f7398c5-bbee-4310-a4a6-e5fe7197a5e0.jpg',
  'e7125525-edcc-490f-b73f-ef3e6147a19f.jpg',
  'ff6901b8-49dd-4280-97c3-ce1d835e9fa0.jpg',
];

const GallerySection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="w-full relative py-20" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={`section-container transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <div className="mb-12">
          <h2 className="section-title">Outside the IDE</h2>
          <div className="w-12 h-1 bg-foreground mb-4" />
          <p className="section-subtitle">
            A glimpse into my journey at the National DICT eGov Hackathon 2026. Building, collaborating, and shipping.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {HACKATHON_IMAGES.map((img, index) => (
            <div 
              key={index} 
              className="break-inside-avoid relative group cursor-pointer border border-border p-2 bg-card transition-all duration-300 hover:border-foreground/30"
              onClick={() => setSelectedImage(img)}
            >
              <div className="overflow-hidden bg-muted">
                <img 
                  src={`/hackaton/${img}`} 
                  alt={`Hackathon moment ${index + 1}`}
                  className="w-full h-auto object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 bg-background text-foreground text-xs font-mono px-3 py-1 border border-border uppercase tracking-widest transition-opacity duration-300">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 sm:p-8 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center border border-border p-2 bg-card">
            <button 
              className="absolute -top-10 right-0 text-muted-foreground hover:text-foreground font-mono text-sm tracking-widest transition-colors uppercase"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image"
            >
              [ Close ]
            </button>
            <div className="w-full h-full overflow-hidden bg-muted">
              <img 
                src={`/hackaton/${selectedImage}`} 
                alt="Hackathon zoomed view" 
                className="max-w-full max-h-[90vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
