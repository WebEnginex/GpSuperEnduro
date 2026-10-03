import type { EventInfoCard } from "@/types";

export const eventConfig = {
  name: "GP SuperEnduro Paris",
  edition: "27 février 2027",
  /** Ouverture des portes : 17h30 heure de Paris (CET, UTC+1) */
  countdownTargetDate: "2027-02-27T17:30:00+01:00",
  hero: {
    title: "GP SUPER ENDURO PARIS",
    titleAccent: "Championnat du monde 2027",
    subtitle: "27 février 2027 · Arena Grand Paris",
    description:
      "Une soirée indoor explosive : les meilleurs pilotes du monde, un circuit technique, et l'ambiance d'une Arena à pleine charge. Préparez-vous à vibrer.",
    primaryButton: {
      label: "Acheter des billets",
      href: "/billeterie",
    },
    secondaryButton: {
      label: "Voir le programme",
      href: "/programme",
    },
    videoSrc: "/video/hero-superenduro.webm",
    videoSrcMp4: "/video/hero-superenduro.mp4",
    posterSrc: "/images/hero-poster.webp",
    scrollLabel: "Défiler",
  },
  about: {
    title: "À propos de l'événement",
    subtitle: "Le Super Enduro s'installe à Paris",
    paragraphs: [
      "Le championnat du monde SuperEnduro 2027 à l'Arena Grand Paris réunit les meilleurs pilotes mondiaux pour une soirée hors normes ! Entre sauts, passages techniques et bagarres de positions, chaque course pousse les pilotes et le public dans le rouge.",
      "De l'ouverture des portes à 17h30 jusqu'aux finales à 22h00, le programme enchaîne dédicaces, cérémonie d'ouverture, SuperPole et courses toutes catégories. Une expérience complète, pensée pour les fans comme pour ceux qui découvrent la discipline.",
    ],
    image: {
      src: "/images/pages/about-superenduro.webp",
      alt: "Ambiance course Super Enduro indoor",
    },
    stats: [
      {
        value: "3 catégories",
        label: "Catégories",
        details: [
          "GP SuperEnduro Prestige",
          "SuperEnduro Junior",
          "SuperEnduro 125cc - de 18 ans",
        ],
      },
      { value: "4h+", label: "De courses" },
      { value: "Arena", label: "Grand Paris" },
      { value: "17h30 → 22h30", label: "Horaires" },
    ],
  },
  cta: {
    title: "Ne ratez pas le départ",
    description:
      "Places limitées à l'Arena Grand Paris. Choisissez votre catégorie, réservez dès maintenant et soyez là le 27 février 2027.",
    primaryButton: {
      label: "Acheter des billets",
      href: "/billeterie",
    },
    secondaryButton: {
      label: "Nous contacter",
      href: "/contact",
    },
  },
  sections: {
    eventInfo: {
      title: "Informations pratiques",
      subtitle: "Tout pour préparer votre soirée",
    },
    ridersPreview: {
      title: "Pilotes",
      subtitle: "Catégorie Prestige",
      viewAll: "Voir tous les pilotes",
    },
    countdown: {
      title: "Compte à rebours",
      subtitle: "27 février 2027 · 17h30",
    },
    gallery: {
      title: "Galerie",
      subtitle: "L'ambiance GP SuperEnduro",
    },
    partners: {
      title: "Nos partenaires",
      subtitle: "Ils nous accompagnent",
    },
    faq: {
      title: "Questions fréquentes",
      subtitle: "Bon à savoir",
    },
    newsletter: {
      title: "Restez dans la boucle",
      subtitle: "Infolettre",
      description:
        "Infos billets, annonces pilotes et actus de la soirée, directement dans votre boîte mail.",
      placeholder: "Adresse e-mail",
      button: "S'inscrire",
    },
  },
} as const;

export const eventInfoCards: EventInfoCard[] = [
  {
    id: "date",
    title: "Date",
    value: "27 février 2027",
    description: "Une soirée unique. Ouverture des portes à 17h30.",
    icon: "calendar",
  },
  {
    id: "venue",
    title: "Lieu",
    value: "Arena Grand Paris",
    description: [
      "1 Av. Traversière, 93290 Tremblay-en-France",
      "À 1 minute du Parc Expo Paris Nord Villepinte",
    ],
    icon: "map-pin",
  },
  {
    id: "hours",
    title: "Horaires",
    value: "17h30 → 22h00",
    description: "Ouverture des portes à 17h30, finales à 22h00.",
    icon: "clock",
  },
  {
    id: "schedule",
    title: "Programme",
    value: "Dédicaces · Courses · Finales",
    description:
      "SuperPole, courses toutes catégories et finales. Voir le détail sur la page Programme.",
    icon: "list",
  },
  {
    id: "parking",
    title: "Parking",
    value: "Sur place",
    description:
      "Parkings à proximité de l'Arena.",
    icon: "car",
  },
  {
    id: "vip",
    title: "Emplacements",
    value: "3 catégories",
    description:
      "Catégorie 1, 2 ou 3 selon votre place dans l'Arena. Tarifs Normal, Groupe et Enfant.",
    icon: "star",
  },
  {
    id: "food",
    title: "Restauration",
    value: "Sur site",
    description:
      "Points de restauration et boissons disponibles tout au long de la soirée.",
    icon: "utensils",
  },
  {
    id: "merch",
    title: "Boutique",
    value: "Merchandising",
    description:
      "Retrouvez les produits officiels et souvenirs Super Enduro sur place.",
    icon: "shopping-bag",
  },
];
