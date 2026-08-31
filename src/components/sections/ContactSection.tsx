import { Mail, MapPin, Phone } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className="w-full relative py-20" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={`section-container transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <div className="mb-16">
          <h2 className="section-title">Let's Connect</h2>
          <div className="w-12 h-1 bg-foreground mb-4" />
          <p className="section-subtitle">
            I'm currently looking for new opportunities, freelance projects, and hackathon teams. My inbox is always open.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          <div className="flex-1 space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-secondary/50 border border-border flex items-center justify-center text-foreground flex-shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-1">Email</h3>
                <a href="mailto:josephlopez102004@gmail.com" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                  josephlopez102004@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-secondary/50 border border-border flex items-center justify-center text-foreground flex-shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-1">Phone</h3>
                <p className="text-lg font-medium text-foreground">
                  +63 9XX XXX XXXX
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-secondary/50 border border-border flex items-center justify-center text-foreground flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-1">Location</h3>
                <p className="text-lg font-medium text-foreground">
                  Quezon City, Philippines
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <form className="minimal-card flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-mono text-muted-foreground uppercase tracking-widest mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-foreground transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-mono text-muted-foreground uppercase tracking-widest mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-foreground transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-mono text-muted-foreground uppercase tracking-widest mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                  placeholder="Hello Joseph, I'd like to discuss..."
                />
              </div>
              <button type="submit" className="minimal-btn mt-2">
                Send Message
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
