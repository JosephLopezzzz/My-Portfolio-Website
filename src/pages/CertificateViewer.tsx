import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDocumentMetadata } from '@/hooks/useDocumentMetadata';

const CertificateViewer = () => {
  const { filename } = useParams<{ filename: string }>();

  // Set favicon immediately on mount
  useEffect(() => {
    // Remove existing favicons
    const existingFavicons = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
    existingFavicons.forEach(link => link.remove());
    
    // Add new favicon
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/jpeg';
    link.href = '/profile/prof-day.jpg';
    document.head.appendChild(link);
  }, []);

  const pdfPath = filename ? `/${decodeURIComponent(filename)}` : '';
  const decodedFilename = filename ? decodeURIComponent(filename).replace('.pdf', '').replace(/%20/g, ' ') : '';
  const isResume = decodedFilename.toLowerCase().includes('resume');
  const displayTitle = decodedFilename || (isResume ? 'Resume' : 'Certificate');
  const description = isResume 
    ? 'Joseph Lopez - Resume / CV' 
    : 'Certificate of completion';

  useDocumentMetadata({
    title: `${displayTitle} | Joseph Lopez`,
    description: description,
    ogTitle: `${displayTitle} | Joseph Lopez`,
    ogDescription: description,
    ogImage: '/profile/prof-day.jpg',
    twitterCard: 'summary_large_image',
    twitterImage: '/profile/prof-day.jpg',
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
