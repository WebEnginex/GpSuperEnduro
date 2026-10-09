import type { Rider, RiderCategory } from "@/types";

export const ridersPageLabels = {
  title: "Super Enduro GP Prestige",
  prestige: "Prestige",
  junior: "Junior",
  emptyState: "Aucun pilote dans cette catégorie pour le moment.",
} as const;

export const riderCategories: { id: RiderCategory; label: string }[] = [
  { id: "prestige", label: ridersPageLabels.prestige },
  // Junior temporairement masqué (données / pilotes incomplets)
  // { id: "junior", label: ridersPageLabels.junior },
];

/**
 * Prestige : ordre + numéros officiels SuperEnduro.
 * Junior : numéros provisoires (à mettre à jour plus tard).
 */
export const riders: Rider[] = [
  // Prestige — ordre liste officielle
  {
    id: "prestige-billy",
    number: "57",
    category: "prestige",
    name: "Billy Bolt",
    imageSrc: "/images/pilotes_prestige/Billy-1-1.webp",
  },
  {
    id: "prestige-jonathan",
    number: "22",
    category: "prestige",
    name: "Jonathan Walker",
    imageSrc: "/images/pilotes_prestige/Jonny-1-.webp",
  },
  {
    id: "prestige-mitchell",
    number: "12",
    category: "prestige",
    name: "Mitchell Brightmore",
    imageSrc: "/images/pilotes_prestige/Mitch-1-1.webp",
  },
  {
    id: "prestige-eddie",
    number: "42",
    category: "prestige",
    name: "Eddie Karlsson",
    imageSrc: "/images/pilotes_prestige/Eddie-1-.webp",
  },
  {
    id: "prestige-toby",
    number: "212",
    category: "prestige",
    name: "Toby Martyn",
    imageSrc: "/images/pilotes_prestige/Toby-1-1.webp",
  },
  {
    id: "prestige-manuel",
    number: "304",
    category: "prestige",
    name: "Manuel Lettenbichler",
    imageSrc: "/images/pilotes_prestige/Mani-1.webp",
  },
  {
    id: "prestige-tim",
    number: "96",
    category: "prestige",
    name: "Tim Apolle",
    imageSrc: "/images/pilotes_prestige/Tim-1-1.webp",
  },
  {
    id: "prestige-alfredo",
    number: "89",
    category: "prestige",
    name: "Alfredo Gomez",
    imageSrc: "/images/pilotes_prestige/Alfredo-1-1.webp",
  },
  {
    id: "prestige-dominik",
    number: "501",
    category: "prestige",
    name: "Dominik Olszowy",
    imageSrc: "/images/pilotes_prestige/Dominik-1-1.webp",
  },
  {
    id: "prestige-ashton",
    number: "7",
    category: "prestige",
    name: "Ashton Brightmore",
    imageSrc: "/images/pilotes_prestige/Ash-1-1.webp",
  },
  {
    id: "prestige-diogo",
    number: "21",
    category: "prestige",
    name: "Diogo Vieira",
    imageSrc: "/images/pilotes_prestige/Diogo-1.webp",
  },
  {
    id: "prestige-marc",
    number: "56",
    category: "prestige",
    name: "Marc Fernandez Serra",
    imageSrc: "/images/pilotes_prestige/Marc-1.webp",
  },
  {
    id: "prestige-josep",
    number: "26",
    category: "prestige",
    name: "Josep Garcia",
    imageSrc: "/images/pilotes_prestige/Josep-1.webp",
  },
  {
    id: "prestige-harry",
    number: "16",
    category: "prestige",
    name: "Harry Edmondson",
    imageSrc: "/images/pilotes_prestige/Harry-1.webp",
  },
  {
    id: "prestige-aleksander",
    number: "83",
    category: "prestige",
    name: "Aleksander Gotkowski",
    imageSrc: "/images/pilotes_prestige/Aleksander.webp",
  },

  // Junior
  {
    id: "junior-bruneau",
    number: "21",
    category: "junior",
    name: "Liam Bruneau",
    imageSrc: "/images/pilotes_125/Bruneau_Liam.webp",
  },
  {
    id: "junior-camps",
    number: "22",
    category: "junior",
    name: "Xavier Camps Fauria",
    imageSrc: "/images/pilotes_125/Camps_Fauria_Xavier.webp",
  },
  {
    id: "junior-lopez",
    number: "23",
    category: "junior",
    name: "Yannis Lopez",
    imageSrc: "/images/pilotes_125/Lopez_Yannis.webp",
  },
  {
    id: "junior-ortiz",
    number: "24",
    category: "junior",
    name: "Ilyes Ortiz",
    imageSrc: "/images/pilotes_125/Ortiz_Ilyes.webp",
  },
  {
    id: "junior-simo",
    number: "25",
    category: "junior",
    name: "Maho Simo",
    imageSrc: "/images/pilotes_125/Simo_Maho.webp",
  },
  {
    id: "junior-desprey",
    number: "31",
    category: "junior",
    name: "Maxime Desprey",
    imageSrc: "/images/pilotes_250/Desprey_Maxime.webp",
  },
  {
    id: "junior-fonvieille",
    number: "32",
    category: "junior",
    name: "Calvin Fonvieille",
    imageSrc: "/images/pilotes_250/Fonvieille_Calvin.webp",
  },
  {
    id: "junior-irsuti",
    number: "33",
    category: "junior",
    name: "Yannis Irsuti",
    imageSrc: "/images/pilotes_250/Irsuti_Yannis.webp",
  },
  {
    id: "junior-lamarque",
    number: "34",
    category: "junior",
    name: "Mickaël Lamarque",
    imageSrc: "/images/pilotes_250/Lamarque_Mickaël.webp",
  },
  {
    id: "junior-lefrancois",
    number: "35",
    category: "junior",
    name: "Charles Lefrançois",
    imageSrc: "/images/pilotes_250/Lefrançois_Charles.webp",
  },
  {
    id: "junior-aranda",
    number: "41",
    category: "junior",
    name: "Gregory Aranda",
    imageSrc: "/images/pilotes_450/Aranda_Gregory.webp",
  },
  {
    id: "junior-bourdon",
    number: "42",
    category: "junior",
    name: "Anthony Bourdon",
    imageSrc: "/images/pilotes_450/Bourdon_Anthony.webp",
  },
  {
    id: "junior-escoffier",
    number: "43",
    category: "junior",
    name: "Adrien Escoffier",
    imageSrc: "/images/pilotes_450/Escoffier_Adrien.webp",
  },
  {
    id: "junior-ramette",
    number: "44",
    category: "junior",
    name: "Thomas Ramette",
    imageSrc: "/images/pilotes_450/Ramette_Thomas.webp",
  },
  {
    id: "junior-soubeyras",
    number: "45",
    category: "junior",
    name: "Cedric Soubeyras",
    imageSrc: "/images/pilotes_450/Soubeyras_Cedric.webp",
  },
];

export function getRidersByCategory(category: RiderCategory): Rider[] {
  return riders.filter((rider) => rider.category === category);
}
