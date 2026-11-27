import { ArrowUpRight, Briefcase, CalendarDays, Linkedin, Mail, X } from "lucide-react";
import { Close } from "@radix-ui/react-popover";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { bookingUrl, contactEmail, linkedInUrl } from "@/lib/contact";

const actions = [
  {
    title: "Schedule a meeting",
    description: "Choose a time on Google Calendar",
    href: bookingUrl,
    external: true,
    icon: CalendarDays,
  },
  {
    title: "Send an email",
    description: contactEmail,
    href: `mailto:${contactEmail}?subject=Project%20inquiry`,
    external: false,
    icon: Mail,
  },
  {
    title: "Connect on LinkedIn",
    description: "Joseph T. Lopez",
    href: linkedInUrl,
    external: true,
    icon: Linkedin,
  },
];

export default function WorkWithMe() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-6 z-[60] inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-foreground px-4 py-2.5 text-sm font-semibold text-background shadow-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Briefcase size={18} aria-hidden="true" />
          Work with me
        </button>
      </PopoverTrigger>
      <PopoverContent
        aria-labelledby="work-with-me-title"
        side="top"
        align="end"
        sideOffset={12}
        collisionPadding={12}
        className="z-[70] max-h-[var(--radix-popover-content-available-height)] w-[min(21rem,calc(100vw-1.5rem))] overflow-y-auto rounded-2xl border-border/80 bg-card/95 text-card-foreground shadow-xl backdrop-blur-xl motion-reduce:animate-none"
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 id="work-with-me-title" className="font-semibold">Work with me</h2>
          <Close asChild>
            <button type="button" aria-label="Close contact options" className="grid size-10 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <X size={17} aria-hidden="true" />
            </button>
          </Close>
        </div>
        <ul className="space-y-2">
          {actions.map(({ title, description, href, external, icon: Icon }) => (
            <li key={title}>
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="flex min-h-14 items-center gap-3 rounded-xl border border-border px-3 py-2.5 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary">
                  <Icon size={17} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{title}</span>
                  <span className="block break-words text-xs text-muted-foreground">{description}</span>
                </span>
                <ArrowUpRight size={15} aria-hidden="true" className="shrink-0 text-muted-foreground" />
              </a>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
