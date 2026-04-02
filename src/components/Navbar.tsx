import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useActiveSection } from '@/hooks/useActiveSection';

const navLinks = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Education', href: '#education', id: 'education' },
  { name: 'Certifications', href: '#certifications', id: 'certifications' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/60 backdrop-blur-md z-40 md:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'liquid-glass'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 md:h-14">
            {/* Logo */}
            <a
              href="#home"
              className="text-xl md:text-2xl font-bold gradient-text hover:opacity-80 transition-opacity"
            >
              JL
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`nav-link text-sm transition-colors duration-300 ${
                    activeSection === link.id 
                      ? 'text-primary font-semibold' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors z-50 relative"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out relative z-50 ${
              isOpen ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {isOpen && (
              <div
                className="flex flex-col gap-1.5 pt-2 pb-2 px-2 animate-fade-in rounded-xl mx-1 mb-2"
                style={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturate))',
                  WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturate))',
                  border: '1px solid var(--glass-border)',
                  boxShadow: 'var(--glass-shadow)',
                }}
              >
                {navLinks.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-2.5 rounded-lg transition-all duration-300 ${
                      activeSection === link.id
                        ? 'bg-primary/15 text-primary font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/10'
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
