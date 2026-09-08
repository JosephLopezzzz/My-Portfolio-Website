import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDocumentMetadata } from '@/hooks/useDocumentMetadata';
import { useTheme } from 'next-themes';

const CertificateViewer = () => {
  const { filename } = useParams<{ filename: string }>();
  const { resolvedTheme } = useTheme();

  const decodedRaw = filename ? decodeURIComponent(filename) : '';
  const isResume = decodedRaw.toLowerCase().includes('resume');
  const pdfPath = decodedRaw
    ? decodedRaw.startsWith('/certs/') || decodedRaw.startsWith('certs/')
      ? `/${decodedRaw.replace(/^\/+/, '')}`
      : isResume
        ? `/${decodedRaw.replace(/^\/+/, '')}`
        : `/certs/${decodedRaw.replace(/^\/+/, '')}`
    : '';
  const rawTitle = decodedRaw.replace(/^(\/)?certs\//, '').replace('.pdf', '').replace(/[-_]/g, ' ').trim();
  const formattedTitle = rawTitle
    ? rawTitle
        .split(' ')
        .map(word => {
          const lower = word.toLowerCase();
          if (['html', 'css', 'js', 'it', 'c', 'sms', 'hr'].includes(lower)) return lower.toUpperCase();
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ')
    : '';
  const displayTitle = formattedTitle || (isResume ? 'Resume' : 'Certificate');
  const description = isResume 
    ? 'Joseph Lopez - Resume / CV' 
    : 'Certificate of completion';

  const isDark = resolvedTheme === 'dark';
  const mainFavicon = isDark ? '/pfp/black1x1.png' : '/pfp/white1x1.png';

  // Ensure favicon always matches main website favicon
  useEffect(() => {
    const faviconLight = document.getElementById('favicon-light') as HTMLLinkElement | null;
    const faviconDark = document.getElementById('favicon-dark') as HTMLLinkElement | null;
    if (faviconLight) faviconLight.href = '/pfp/white1x1.png';
    if (faviconDark) faviconDark.href = '/pfp/black1x1.png';

    const existingIcons = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
    existingIcons.forEach(el => {
      (el as HTMLLinkElement).href = mainFavicon;
    });
  }, [mainFavicon]);

  useDocumentMetadata({
    title: `${displayTitle} | Joseph Lopez`,
    description: description,
    ogTitle: `${displayTitle} | Joseph Lopez`,
    ogDescription: description,
    ogImage: mainFavicon,
    twitterCard: 'summary_large_image',
    twitterImage: mainFavicon,
  });

  if (!filename) {
    return null;
  }

  // Minimal wrapper - just the PDF in full screen with favicon
  return (
    <div style={{ margin: 0, padding: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src={`${pdfPath}#toolbar=1&navpanes=1&scrollbar=1`}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title={displayTitle}
      />
    </div>
  );
};

export default CertificateViewer;
