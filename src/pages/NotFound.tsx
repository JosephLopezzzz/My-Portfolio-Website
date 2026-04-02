import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDocumentMetadata } from '@/hooks/useDocumentMetadata';

const NotFound = () => {
  const location = useLocation();

  useDocumentMetadata({
    title: '404 - Page Not Found | Joseph Lopez',
    description: 'The page you are looking for does not exist.',
    ogTitle: '404 - Page Not Found | Joseph Lopez',
    ogDescription: 'The page you are looking for does not exist.',
    ogImage: '/profile/prof-day.jpg',
    twitterCard: 'summary_large_image',
    twitterImage: '/profile/prof-day.jpg',
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
