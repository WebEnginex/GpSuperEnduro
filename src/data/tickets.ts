import type { Ticket } from "@/types";

export const ticketsPageLabels = {
  title: "Billetterie",
  subtitle: "Arena Grand Paris",
  description:
    "Trois emplacements dans l'Arena. Tarifs Normal, Groupe (dès 10 personnes) et Enfant (moins de 10 ans).",
  trustItems: [
    "Paiement sécurisé",
    "Billetterie partenaire",
    "Places limitées",
  ],
  externalNote:
    "Vous serez redirigé vers la plateforme partenaire pour finaliser votre commande.",
  cta: "Réserver",
  featuredBadge: "Meilleure vue",
  priceLabels: {
    normal: "Normal",
    group: "Groupe",
    child: "Enfant",
  },
  priceNotes: {
    group: "Dès 10 pers.",
    child: "Moins de 10 ans",
  },
} as const;

export const ticketsPreviewLabels = {
  title: "Billetterie",
  subtitle: "27 février 2027 · Arena Grand Paris",
  viewAll: "Voir les tarifs",
} as const;

const ARENA_TICKETING_URL =
  "https://billetterie.arenagrandparis.fr/fr/product/189/arena_grand_paris_hall_1/championnat_du_monde_de_superenduro";

export const tickets: Ticket[] = [
  {
    id: "ticket-cat-1",
    name: "Catégorie 1",
    description: "Emplacement privilégié. La meilleure vue sur le circuit.",
    prices: {
      normal: 67,
      group: 58,
      child: 55,
    },
    purchaseUrl: ARENA_TICKETING_URL,
    tier: "category1",
    featured: true,
    badge: "Meilleure vue",
  },
  {
    id: "ticket-cat-2",
    name: "Catégorie 2",
    description: "Emplacement intermédiaire. Excellent équilibre vue et tarif.",
    prices: {
      normal: 59,
      group: 55,
      child: 47,
    },
    purchaseUrl: ARENA_TICKETING_URL,
    tier: "category2",
  },
  {
    id: "ticket-cat-3",
    name: "Catégorie 3",
    description: "Emplacement accessible. Vivez toute l'ambiance de la soirée.",
    prices: {
      normal: 49,
      group: 40,
      child: 38,
    },
    purchaseUrl: ARENA_TICKETING_URL,
    tier: "category3",
  },
];
