export type RiderCategory = "prestige" | "junior";

export interface Rider {
  id: string;
  /** Numéro de course (à confirmer / remplacer) */
  number: string;
  category: RiderCategory;
  /** Nom affiché sur la carte (dérivé du fichier image) */
  name: string;
  imageSrc: string;
}

export interface EventInfoCard {
  id: string;
  title: string;
  value: string;
  description: string | readonly string[];
  icon: string;
}

export interface Partner {
  id: string;
  name: string;
  logoSrc: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface GalleryImage {
  id: string;
  alt: string;
  src: string;
  aspectRatio: "square" | "landscape" | "portrait";
}

export interface NavLink {
  label: string;
  href: string;
  highlight?: boolean;
}

export interface ContactCategory {
  value: string;
  label: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface TicketPrices {
  normal: number;
  group: number;
  child: number;
}

export interface Ticket {
  id: string;
  name: string;
  description: string;
  prices: TicketPrices;
  purchaseUrl: string;
  tier: "category1" | "category2" | "category3";
  featured?: boolean;
  badge?: string;
}
