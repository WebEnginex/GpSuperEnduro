import type { ScheduleItem } from "@/types";

export const programmePageLabels = {
  title: "Programme",
  subtitle: "27 février 2027",
  billetterieCta: "Réserver vos places",
} as const;

export const scheduleItems: ScheduleItem[] = [
  {
    id: "schedule-01",
    time: "17h30",
    title: "Ouverture des portes",
    description:
      "Accueil du public, accès au merchandising officiel et aux tribunes.",
  },
  {
    id: "schedule-02",
    time: "18h00",
    title: "Séance de dédicaces",
    description:
      "Rencontrez les 6 meilleurs pilotes mondiaux et repartez avec un autographe.",
    highlight: true,
  },
  {
    id: "schedule-03",
    time: "19h00",
    title: "Cérémonie d'ouverture",
    description:
      "Présentation des meilleurs pilotes SuperEnduro GP et lancement officiel de la soirée.",
    highlight: true,
  },
  {
    id: "schedule-04",
    time: "19h45",
    title: "SuperPole",
    description: "Qualifications décisives pour déterminer les meilleures positions de départ.",
    highlight: true,
  },
  {
    id: "schedule-05",
    time: "19h55",
    title: "Premières courses toutes catégories",
    description: "Première série de courses toutes catégories confondues.",
    highlight: true,
  },
  {
    id: "schedule-06",
    time: "20h45",
    title: "Entracte",
    description: "Pause : restauration, merchandising et ambiance dans l'Arena.",
  },
  {
    id: "schedule-07",
    time: "21h00",
    title: "Deuxièmes courses toutes catégories",
    description: "Deuxième série de courses toutes catégories confondues.",
    highlight: true,
  },
  {
    id: "schedule-08",
    time: "21h50",
    title: "Entracte",
    description: "Dernière pause avant les finales.",
  },
  {
    id: "schedule-09",
    time: "22h00",
    title: "Finales",
    description: "Les finales Super Enduro, le moment culminant de la soirée.",
    highlight: true,
  },
];
