import { Download } from "lucide-react";
import { useDocumentMetadata } from "@/hooks/useDocumentMetadata";

const ResumePage = () => {
  useDocumentMetadata({
    title: "Résumé | Joseph T. Lopez",
    description: "Résumé of Joseph T. Lopez, full-stack web developer and IT student.",
  });

  return (
    <main className="flex h-dvh flex-col bg-background text-foreground">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-4 py-2 sm:px-6">
        <h1 className="text-sm font-semibold">Résumé</h1>
        <a
          href="/resume.pdf"
          download
          className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Download size={16} aria-hidden="true" />
          Download PDF
        </a>
      </header>
      <iframe src="/resume.pdf" title="Joseph T. Lopez résumé PDF" className="min-h-0 w-full flex-1 border-0" />
    </main>
  );
};

export default ResumePage;
