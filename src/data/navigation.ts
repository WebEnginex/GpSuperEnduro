import type { FooterLink, NavLink, SocialLink } from "@/types";

export const navLinks: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Programme", href: "/programme" },
  { label: "Pilotes", href: "/pilotes" },
  { label: "Billetterie", href: "/billetterie", highlight: true },
  { label: "Contact", href: "/contact" },
];

export const footerNavLinks: FooterLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Programme", href: "/programme" },
  { label: "Pilotes", href: "/pilotes" },
  { label: "Billetterie", href: "/billetterie" },
  { label: "Contact", href: "/contact" },
];

export const legalLinks: FooterLink[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
];

export const socialLinks: SocialLink[] = [
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@gpsuperenduroparis",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/parissuperendurogp2027/",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/ParisSuperEnduroChampionnatduMonde?locale=fr_FR",
  },
];
