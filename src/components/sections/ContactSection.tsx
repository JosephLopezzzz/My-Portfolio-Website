import { useState } from "react";
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { toast } from "sonner";

const email = "josephlopez102004@gmail.com";

const socialLinks = [
  {
    label: "GitHub",
    value: "github.com/JosephLopezzzz",
    href: "https://github.com/JosephLopezzzz",
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "Joseph T. Lopez",
    href: "https://www.linkedin.com/in/joseph-lopez-5a2090412",
    icon: Linkedin,
  },
];

const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email address copied.");
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Clipboard access is unavailable. Please use the email link.");
    }
  };

  return (
    <section id="contact" className="w-full relative py-2" aria-labelledby="contact-title">
      <div className="section-container">
        <div className="max-w-2xl">
          <h2 id="contact-title" className="section-title">
            Start a conversation
          </h2>
          <p className="section-subtitle mb-0">
            I’m open to scoped freelance work and remote opportunities. Share a
            little about what you’re building, your goals, and your timeline; I’ll
            follow up when I can.
          </p>
        </div>

        <div className="mt-8 grid max-w-4xl gap-6 border-y border-border py-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <p className="mb-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Email
            </p>
            <a
              href={`mailto:${email}?subject=Project%20inquiry`}
              className="inline-flex items-center gap-2 text-lg font-semibold text-foreground underline-offset-4 hover:underline sm:text-xl"
            >
              <Mail size={18} aria-hidden="true" />
              {email}
            </a>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${email}?subject=Project%20inquiry`} className="minimal-btn">
              Discuss a project
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="minimal-btn-secondary"
              aria-label={copied ? "Email address copied" : "Copy email address"}
              aria-live="polite"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied" : "Copy email"}
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Professional profiles
          </span>
          {socialLinks.map(({ label, value, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`${label}: ${value}`}
            >
              <Icon size={16} aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
