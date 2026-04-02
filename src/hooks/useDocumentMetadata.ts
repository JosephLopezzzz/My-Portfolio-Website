import { useEffect } from 'react';

interface DocumentMetadata {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  twitterImage?: string;
}

const defaultMetadata: Required<DocumentMetadata> = {
  title: 'Joseph Lopez - Portfolio',
  description: 'Joseph Lopez - BSIT Student | Aspiring Web Developer & AI Engineer',
  ogTitle: 'Joseph Lopez - Portfolio',
  ogDescription: 'BSIT Student | Aspiring Web Developer & AI Engineer',
  ogImage: '/profile/prof-day.jpg',
  twitterCard: 'summary_large_image',
  twitterImage: '/profile/prof-day.jpg',
};

export const useDocumentMetadata = (metadata: DocumentMetadata = {}) => {
  const {
    title,
    description,
    ogTitle,
    ogDescription,
    ogImage,
    twitterCard,
    twitterImage,
  } = metadata;

  useEffect(() => {
    // Update document title
    const pageTitle = title || defaultMetadata.title;
    document.title = pageTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update or create link tags (for favicon)
    const updateLinkTag = (rel: string, href: string, type?: string) => {
      // Remove existing favicon links first
      const existingLinks = document.querySelectorAll(`link[rel="${rel}"]`);
      existingLinks.forEach(link => link.remove());
      
      // Create new favicon link
      const link = document.createElement('link');
      link.setAttribute('rel', rel);
      link.setAttribute('href', href);
      if (type) {
        link.setAttribute('type', type);
      }
      document.head.appendChild(link);
    };

    // Update favicon to match homepage - set multiple formats for better browser support
    updateLinkTag('icon', '/profile/prof-day.jpg', 'image/jpeg');
    updateLinkTag('shortcut icon', '/profile/prof-day.jpg', 'image/jpeg');
    updateLinkTag('apple-touch-icon', '/profile/prof-day.jpg', 'image/jpeg');

    // Update description
    const pageDescription = description || defaultMetadata.description;
    updateMetaTag('description', pageDescription);

    // Update Open Graph tags
    const pageOgTitle = ogTitle || title || defaultMetadata.ogTitle;
    const pageOgDescription = ogDescription || description || defaultMetadata.ogDescription;
    const pageOgImage = ogImage || defaultMetadata.ogImage;

    updateMetaTag('og:title', pageOgTitle, 'property');
    updateMetaTag('og:description', pageOgDescription, 'property');
    updateMetaTag('og:image', pageOgImage, 'property');
    updateMetaTag('og:type', 'website', 'property');

    // Update Twitter tags
    const pageTwitterCard = twitterCard || defaultMetadata.twitterCard;
    const pageTwitterImage = twitterImage || ogImage || defaultMetadata.twitterImage;

    updateMetaTag('twitter:card', pageTwitterCard);
    updateMetaTag('twitter:image', pageTwitterImage);
  }, [title, description, ogTitle, ogDescription, ogImage, twitterCard, twitterImage]);
};
