import { useEffect } from 'react';
import { useTheme } from 'next-themes';

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
  ogImage: '/pfp/white1x1.png',
  twitterCard: 'summary_large_image',
  twitterImage: '/pfp/white1x1.png',
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

  const { resolvedTheme } = useTheme();

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
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
      if (type) {
        link.setAttribute('type', type);
      }
    };

    // Determine active profile picture based on resolved theme
    const isDark = resolvedTheme === 'dark';
    const activePfp = isDark ? '/pfp/black1x1.png' : '/pfp/white1x1.png';

    // Update favicon with round avatar matching current theme
    const updateFavicon = () => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = activePfp;
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const size = 64;
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, size, size);

            // Clip circular avatar
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(img, 0, 0, size, size);

            // Crisp subtle border
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
            ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)';
            ctx.lineWidth = 3;
            ctx.stroke();

            const roundedDataUrl = canvas.toDataURL('image/png');
            updateLinkTag('icon', roundedDataUrl, 'image/png');
            updateLinkTag('shortcut icon', roundedDataUrl, 'image/png');
            updateLinkTag('apple-touch-icon', roundedDataUrl, 'image/png');
            return;
          }
        } catch {
          // Fallback to direct image
        }
        updateLinkTag('icon', activePfp, 'image/png');
        updateLinkTag('shortcut icon', activePfp, 'image/png');
        updateLinkTag('apple-touch-icon', activePfp, 'image/png');
      };
      img.onerror = () => {
        updateLinkTag('icon', activePfp, 'image/png');
        updateLinkTag('shortcut icon', activePfp, 'image/png');
        updateLinkTag('apple-touch-icon', activePfp, 'image/png');
      };
    };

    updateFavicon();

    // Update description
    const pageDescription = description || defaultMetadata.description;
    updateMetaTag('description', pageDescription);

    // Update Open Graph tags
    const pageOgTitle = ogTitle || title || defaultMetadata.ogTitle;
    const pageOgDescription = ogDescription || description || defaultMetadata.ogDescription;
    const pageOgImage = ogImage || activePfp;

    updateMetaTag('og:title', pageOgTitle, 'property');
    updateMetaTag('og:description', pageOgDescription, 'property');
    updateMetaTag('og:image', pageOgImage, 'property');
    updateMetaTag('og:type', 'website', 'property');

    // Update Twitter tags
    const pageTwitterCard = twitterCard || defaultMetadata.twitterCard;
    const pageTwitterImage = twitterImage || ogImage || activePfp;

    updateMetaTag('twitter:card', pageTwitterCard);
    updateMetaTag('twitter:image', pageTwitterImage);
  }, [title, description, ogTitle, ogDescription, ogImage, twitterCard, twitterImage, resolvedTheme]);
};
