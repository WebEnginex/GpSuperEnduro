export const CACHE_CONFIG = {
  // Taille maximale du cache (en MB)
  MAX_CACHE_SIZE: 150,
  
  // Durée de vie du cache (en jours) - 30 jours pour être tranquille jusqu'à octobre
  CACHE_DURATION: 30,
  
  // Médias à précharger au démarrage
  CRITICAL_MEDIA: [
    { url: '/videos/SXTour2025.webm', type: 'video' as const },
    { url: '/videos/SXTour2025-mobile.webm', type: 'video' as const },
    { url: '/images/background/supercross-bg.webp', type: 'image' as const },
    { url: '/images/logo-sx-tour.svg', type: 'image' as const },
    { url: '/images/logo-championnat-fr.svg', type: 'image' as const },
    { url: '/images/affiche/affiche_supercross_douai.webp', type: 'image' as const },
    { url: '/images/flags/france.svg', type: 'image' as const },
    { url: '/images/marques/yamaha.svg', type: 'image' as const }
  ],
  
  // Médias à précharger pour la page pilotes
  PILOTS_MEDIA: [
    // Pilotes 125
    { url: '/images/pilotes_125/Bruneau_Liam.webp', type: 'image' as const },
    { url: '/images/pilotes_125/Camps_Fauria_Xavier.webp', type: 'image' as const },
    { url: '/images/pilotes_125/Lopez_Yannis.webp', type: 'image' as const },
    { url: '/images/pilotes_125/Ortiz_Ilyes.webp', type: 'image' as const },
    { url: '/images/pilotes_125/Simo_Maho.webp', type: 'image' as const },
    
    // Pilotes 250
    { url: '/images/pilotes_250/Desprey_Maxime.webp', type: 'image' as const },
    { url: '/images/pilotes_250/Fonvieille_Calvin.webp', type: 'image' as const },
    { url: '/images/pilotes_250/Irsuti_Yannis.webp', type: 'image' as const },
    { url: '/images/pilotes_250/Lamarque_Mickaël.webp', type: 'image' as const },
    { url: '/images/pilotes_250/Lefrançois_Charles.webp', type: 'image' as const },
    
    // Pilotes 450
    { url: '/images/pilotes_450/Aranda_Gregory.webp', type: 'image' as const },
    { url: '/images/pilotes_450/Bourdon_Anthony.webp', type: 'image' as const },
    { url: '/images/pilotes_450/Escoffier_Adrien.webp', type: 'image' as const },
    { url: '/images/pilotes_450/Ramette_Thomas.webp', type: 'image' as const },
    { url: '/images/pilotes_450/Soubeyras_Cedric.webp', type: 'image' as const }
  ],
  
  // Logos partenaires
  PARTNERS_MEDIA: [
    { url: '/images/partners/FFMOTO_LOGO.png', type: 'image' as const },
    { url: '/images/partners/FFMOTO_PROFIL_PIC_LOGO.webp', type: 'image' as const },
    { url: '/images/partners/Logo_Gayant-Expo-Douai.webp', type: 'image' as const },
    { url: '/images/partners/Logo_Nord-le-Departement.webp', type: 'image' as const },
    { url: '/images/partners/Logo_Region-hauts-de-France.webp', type: 'image' as const },
    { url: '/images/partners/Supercross_Championnat_FR.png', type: 'image' as const }
  ]
};

export const getMediaForPage = (page: string) => {
  switch (page) {
    case 'pilotes':
      return [...CACHE_CONFIG.CRITICAL_MEDIA, ...CACHE_CONFIG.PILOTS_MEDIA];
    case 'home':
      return [...CACHE_CONFIG.CRITICAL_MEDIA, ...CACHE_CONFIG.PARTNERS_MEDIA];
    default:
      return CACHE_CONFIG.CRITICAL_MEDIA;
  }
};
