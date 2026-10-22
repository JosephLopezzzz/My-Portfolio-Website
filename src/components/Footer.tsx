const Footer = () => {
  return (
    <footer className="w-full py-8 border-t border-border bg-background">
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center justify-center">
        <div className="text-sm text-muted-foreground font-mono uppercase tracking-widest">
          © {new Date().getFullYear()} Joseph T. Lopez.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
