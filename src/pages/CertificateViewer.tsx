import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDocumentMetadata } from '@/hooks/useDocumentMetadata';

const CertificateViewer = () => {
  const { filename } = useParams<{ filename: string }>();

  const decodedRaw = filename ? decodeURIComponent(filename) : '';
  const isResume = decodedRaw.toLowerCase().includes('resume');
  const pdfPath = decodedRaw
    ? decodedRaw.startsWith('/certs/') || decodedRaw.startsWith('certs/')
      ? `/${decodedRaw.replace(/^\/+/, '')}`
      : isResume
        ? `/${decodedRaw.replace(/^\/+/, '')}`
        : `/certs/${decodedRaw.replace(/^\/+/, '')}`
    : '';
  const decodedFilename = decodedRaw.replace(/^(\/)?certs\//, '').replace('.pdf', '').replace(/[-_]/g, ' ');
  const displayTitle = decodedFilename || (isResume ? 'Resume' : 'Certificate');
  const description = isResume 
    ? 'Joseph Lopez - Resume / CV' 
    : 'Certificate of completion';

  useDocumentMetadata({
    title: `${displayTitle} | Joseph Lopez`,
    description: description,
    ogTitle: `${displayTitle} | Joseph Lopez`,
    ogDescription: description,
    twitterCard: 'summary_large_image',
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
