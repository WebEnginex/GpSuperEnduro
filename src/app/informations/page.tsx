'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, HelpCircle, Ticket, MapPin, Coffee, Calendar } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQSection {
  title: string;
  icon: React.ElementType;
  color: string;
  items: FAQItem[];
}

const faqSections: FAQSection[] = [
  {
    title: "Billetterie & Réservations",
    icon: Ticket,
    color: "text-blue-400",
    items: [
      {
        question: "Comment puis-je acheter mes billets ?",
        answer: (
          <>
            Vous pouvez acheter vos billets directement sur notre site via la page{' '}
            <Link href="/billeterie" className="text-red-400 hover:text-red-300 underline">
              Billetterie
            </Link>
            .
          </>
        )
      },
      {
        question: "Puis-je annuler ou modifier ma réservation ?",
        answer: "Les modifications et annulations sont possibles jusqu'à 48h avant l'événement. Contactez-nous via le formulaire de contact ou par email à contact@sxtour-douai.fr ."
      },
      {
        question: "Y a-t-il un âge minimum pour assister à l'événement ?",
        answer: "Non, l'événement est ouvert à tous les âges. Les enfants de moins de 12 ans doivent être accompagnés d'un adulte. Des tarifs spéciaux sont disponibles pour les enfants."
      },
      // {
      //   question: "Y a-t-il des tarifs de groupe ?",
      //   answer: "Oui, nous proposons des tarifs préférentiels pour les groupes de 10 personnes et plus. Contactez-nous pour obtenir un devis personnalisé."
      // },
      {
        question: "Proposez-vous des tarifs préférentiels CSE ?",
        answer: "Oui, nous proposons des tarifs préférentiels CSE. Pour en bénéficier, faites votre demande via notre formulaire de contact ou directement par email à superendurofrance@gmail.com ."
      },
      {
        question: "Comment présenter mon billet lors de l'événement ?",
        answer: "Il faut imprimer le billet ou l'avoir sur son smartphone lors de l'arrivée à l'événement. Il faut impérativement le présenter pour pouvoir rentrer."
      }
    ]
  },
  {
    title: "Accès & Pratique",
    icon: MapPin,
    color: "text-green-400",
    items: [
      {
        question: "Où se déroule l'événement ?",
        answer: "L'événement a lieu au Gayant Expo Concerts de Douai. L'adresse exacte et l'itinéraire sont disponibles dans la section Contact de notre site."
      },
      {
        question: "Y a-t-il un parking disponible ?",
        answer: "Oui, un parking gratuit est mis à disposition des spectateurs à proximité immédiate du circuit. Pour les détenteurs de Gold Pass et les personnes à mobilité réduite (PMR), le parking est situé au plus proche, dans l'enceinte même de Gayant Expo."
      },
      {
        question: "L'événement est-il accessible aux personnes à mobilité réduite ?",
        answer: "Oui, le site dispose d'aménagements PMR avec des places réservées et un accès facilité. Merci de nous signaler vos besoins lors de la réservation."
      },
      {
        question: "Quels sont les moyens de transport conseillés ?",
        answer: "Le site est facilement accessible en voiture avec un parking gratuit mis à disposition. La gare de Douai se trouve également à proximité pour ceux qui préfèrent venir en train."
      }
    ]
  },
  {
    title: "Services & Restauration",
    icon: Coffee,
    color: "text-orange-400",
    items: [
      {
        question: "Y a-t-il de la restauration sur place ?",
        answer: "Absolument ! Vous trouverez sur place plusieurs espaces de restauration : Friterie, Sandwicherie, Crêperie et Bar."
      }
    ]
  },
  {
    title: "Événement & Spectacle",
    icon: Calendar,
    color: "text-red-400",
    items: [
      {
        question: "À quelle heure commence le spectacle ?",
        answer: (
          <>
            Les portes ouvrent à <span className="font-semibold">13h00</span> pour les <span className="font-semibold">Gold Pass</span> et à <span className="font-semibold">17h30</span> pour les catégories 1, 2 et 3.<br />
            Les détenteurs de Gold Pass auront accès aux essais et pourront faire le tour du circuit à pied avec un accès privilégié.
          </>
        )
      },
      {
        question: "L'événement a-t-il lieu par tous les temps ?",
        answer: "Oui, l'événement est maintenu quelles que soient les conditions météorologiques, sauf en cas de danger extrême."
      },
      {
        question: "Puis-je prendre des photos et vidéos ?",
        answer: "Les photos personnelles sont autorisées. L'usage commercial ou la diffusion nécessitent une autorisation préalable."
      }
    ]
  }
];

export default function InformationsPage() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`;
    const newExpanded = new Set(expandedItems);
    
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    
    setExpandedItems(newExpanded);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Section noire sous le header */}
      <section className="relative bg-black py-16 pt-56 sm:pt-60 lg:pt-64">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center ">
            <Badge variant="secondary" className="mb-4 bg-red-600/20 text-red-400 border-red-600/30">
            Supercross Douai 2025
          </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Informations</span>
            <span className="text-red-500"> Pratiques</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Trouvez rapidement les réponses à toutes vos questions sur le Supercross de Douai
          </p>
        </div>
      </section>

      {/* FAQ Section avec dégradé */}
      <section className="py-16 bg-gradient-to-b from-black via-gray-900/30 to-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {faqSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-gray-900/50 rounded-xl border border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <section.icon className={`w-6 h-6 ${section.color}`} />
                  <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                </div>
                
                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => {
                    const key = `${sectionIndex}-${itemIndex}`;
                    const isExpanded = expandedItems.has(key);
                    
                    return (
                      <div
                        key={itemIndex}
                        className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden transition-all duration-200 hover:border-gray-600"
                      >
                        <button
                          onClick={() => toggleItem(sectionIndex, itemIndex)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800/70 transition-colors"
                        >
                          <span className="text-white font-medium pr-4">{item.question}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        
                        {isExpanded && (
                          <div className="px-6 pb-4">
                            <div className="border-t border-gray-700 pt-4">
                              <div className="text-gray-300 leading-relaxed">{item.answer}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl border border-red-500/30 p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Vous ne trouvez pas la réponse à votre question ?
              </h3>
              <p className="text-gray-300 mb-6">
                Notre équipe est là pour vous aider ! Contactez-nous directement.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
