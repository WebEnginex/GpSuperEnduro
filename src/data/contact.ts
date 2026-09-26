import type { ContactCategory } from "@/types";
import { siteConfig, venueConfig } from "@/data/site";

export const organizerInfo = {
  name: siteConfig.name,
  email: "E-mail de l'organisateur",
  venueName: venueConfig.name,
  address: venueConfig.fullAddress,
  addressLines: venueConfig.displayLines,
  mapsUrl: venueConfig.mapsUrl,
  mapsLabel: venueConfig.mapsLabel,
} as const;

export const contactCategories: ContactCategory[] = [
  { value: "general", label: "Informations générales" },
  { value: "tickets", label: "Billets" },
  { value: "vip", label: "VIP" },
  { value: "press", label: "Presse" },
  { value: "partnership", label: "Partenariat" },
  { value: "volunteer", label: "Bénévolat" },
  { value: "other", label: "Autre" },
];

export const contactPageLabels = {
  title: "Contact",
  subtitle: "Nous contacter",
  organizer: "Organisateur",
  email: "E-mail",
  venue: "Lieu",
  sendMessage: "Envoyer un message",
  form: {
    name: "Nom et prénom",
    email: "E-mail",
    subject: "Objet",
    category: "Catégorie",
    message: "Message",
    namePlaceholder: "Ex. : Jean Dupont",
    emailPlaceholder: "Votre e-mail",
    subjectPlaceholder: "Objet",
    messagePlaceholder: "Votre message",
    submit: "Envoyer le message",
    success:
      "Merci ! Votre message a bien été envoyé. On vous répond dès que possible.",
  },
} as const;
