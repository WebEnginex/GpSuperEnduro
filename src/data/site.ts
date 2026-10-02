export const venueConfig = {
  name: "Arena Grand Paris",
  street: "1 Av. Traversière",
  postalCode: "93290",
  city: "Tremblay-en-France",
  country: "FR",
  shortLabel: "Arena Grand Paris",
  fullAddress: "1 Av. Traversière, 93290 Tremblay-en-France",
  displayLines: [
    "Arena Grand Paris",
    "1 Av. Traversière",
    "93290 Tremblay-en-France",
  ] as const,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Arena+Grand+Paris+1+Avenue+de+la+Traversi%C3%A8re+93290+Tremblay-en-France",
  mapsLabel: "Voir sur Google Maps",
} as const;

export const siteConfig = {
  name: "GP SuperEnduro Paris",
  shortName: "GP SuperEnduro",
  tagline: "Championnat du monde Super Enduro 2027 à Paris",
  description:
    "GP SuperEnduro Paris — Championnat du monde 2027. Le 27 février 2027 à l'Arena Grand Paris (Tremblay-en-France). Courses indoor, pilotes Prestige, billetterie et programme.",
  url: "https://gpsuperenduroparis.fr",
  locale: "fr_FR",
  language: "fr",
  themeColor: "#E30613",
  backgroundColor: "#0a0a0a",
  ogImage: "/images/og-image.jpg",
  ogImageAlt:
    "Pilote Super Enduro en saut entre les flammes à l'Arena — GP SuperEnduro Paris 2027",
  keywords: [
    "Super Enduro",
    "GP SuperEnduro Paris",
    "Championnat du monde Super Enduro",
    "Arena Grand Paris",
    "Tremblay-en-France",
    "motocross indoor",
    "billets Super Enduro",
    "27 février 2027",
    "FIM SuperEnduro",
  ],
  footerDescription:
    "Le 27 février 2027, le Championnat du monde de Super Enduro s'invite à l'Arena Grand Paris. Courses, dédicaces et finales sous le même toit.",
} as const;
