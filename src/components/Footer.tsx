import { Github, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/josephlopez102004',
    label: 'GitHub',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/josephlopez',
    label: 'LinkedIn',
  },
  {
    icon: Mail,
    href: 'mailto:josephlopez102004@gmail.com',
    label: 'Email',
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a href="#home" className="text-xl font-bold gradient-text">
              Joseph Lopez
            </a>
            <p className="text-sm text-muted-foreground mt-1">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                aria-label={link.label}
              >
                <link.icon size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
