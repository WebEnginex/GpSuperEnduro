'use client';

import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
}

export function SEO({ title, description, url, image = '/images/logos/SuperEnduro-logo.png' }: SEOProps) {
  useEffect(() => {
    // Mise à jour du titre
    document.title = title;

    // Fonction pour mettre à jour ou créer une balise meta
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.content = content;
    };

    // Meta tags standards
    updateMetaTag('description', description);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:site_name', 'GP Super Enduro France', true);
    updateMetaTag('og:locale', 'fr_FR', true);
    
    if (url) {
      updateMetaTag('og:url', url, true);
    }
    
    if (image) {
      const fullImageUrl = image.startsWith('http') ? image : `https://www.gpsuperendurofrance.fr${image}`;
      updateMetaTag('og:image', fullImageUrl, true);
      updateMetaTag('og:image:width', '1200', true);
      updateMetaTag('og:image:height', '630', true);
      updateMetaTag('og:image:alt', 'Logo GP Super Enduro Douai', true);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    if (image) {
      const fullImageUrl = image.startsWith('http') ? image : `https://www.gpsuperendurofrance.fr${image}`;
      updateMetaTag('twitter:image', fullImageUrl);
    }
  }, [title, description, url, image]);

  return null;
}
