import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import GlassSurface from './GlassSurface';
import { useActiveSection } from '@/hooks/useActiveSection';

const navLinks = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Certifications', href: '#certifications', id: 'certifications' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection();

  return (
    <>
      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-max max-w-[95%] transition-all duration-300">
        <GlassSurface
          width="100%"
          height={64}
          borderRadius={32}
          borderWidth={0.02}
          backgroundOpacity={0.1}
          opacity={0.8}
          blur={10}
        >
          <div className="w-full flex items-center gap-6 px-8">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`nav-link ${
                    activeSection === link.id 
                      ? 'active font-semibold' 
                      : ''
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 hover:bg-secondary transition-colors z-50 relative"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </GlassSurface>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out relative z-50 mt-4 ${
            isOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {isOpen && (
            <GlassSurface width="100%" height="auto" borderRadius={16}>
              <div className="w-full flex flex-col gap-1 p-4">
                {navLinks.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 transition-all duration-300 ${
                      activeSection === link.id
                        ? 'bg-secondary/50 text-foreground font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </GlassSurface>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
