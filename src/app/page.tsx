'use client';

import Link from "next/link";
import { useVisitTracker } from "@/hooks/useVisitTracker";
import { Header } from "@/components/header";
import { SimpleCountdown } from "@/components/simple-countdown";
import { CachedVideo } from "@/components/media/CachedVideo";
import { DebugPanel } from "@/components/DebugPanel";
import Image from "next/image";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";

// Import du test en développement seulement
if (process.env.NODE_ENV === 'development') {
  import("@/utils/testCache");
}

export default function Home() {
  // Tracker les visites automatiquement
  useVisitTracker();

  // Données structurées pour l'événement
  const eventStructuredData = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "name": "Grand Prix Super Enduro Douai 2026",
    "description": "Assistez au Grand Prix Super Enduro, un événement indoor exceptionnel avec les meilleurs pilotes mondiaux.",
    "startDate": "2026-03-07T13:00:00+01:00",
    "endDate": "2026-03-07T22:30:00+01:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Gayant Expo Concerts",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rives de Gayant",
        "addressLocality": "Douai",
        "postalCode": "59500",
        "addressCountry": "FR"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Gp Super Enduro Douai",
      "email": "superendurofrance@gmail.com"
    },
    "image": [
      "https://www.gpsuperendurofrance.fr/images/logos/SuperEnduro-logo.png"
    ],
    "performer": {
      "@type": "SportsTeam",
      "name": "Pilotes Super Enduro"
    },
    "sport": "Super Enduro"
  };

  return (
    <div className="w-full overflow-x-hidden">
      <SEO 
        title="Grand Prix Super Enduro Douai - 7 Mars 2026 | Événement Indoor Super Enduro"
        description="Assistez au Grand Prix Super Enduro, un événement indoor exceptionnel avec les meilleurs pilotes mondiaux."
        url="https://www.gpsuperendurofrance.fr/"
      />
      <StructuredData data={eventStructuredData} />
      {/* Header réutilisable */}
      <Header showCountdown={true} />

      {/* Section principale avec vidéo de fond */}
      <div id="main-content" className="min-h-screen h-screen w-full overflow-hidden relative">
        {/* Vidéo de fond fixe */}
        <div className="absolute inset-0 w-full h-full video-container">
          <CachedVideo
            src="/video/SuperEnduroPoland2023.webm"
            className="w-full h-full object-cover"
            autoPlay={true}
            loop={true}
            muted={true}
            controls={false}
          />
        </div>
        
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black/40 z-5 w-full h-full"></div>

        {/* Contenu superposé */}
        <div className="absolute inset-0 z-30 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-20 pb-20">
          {/* Logo SuperEnduro au-dessus du compteur sur mobile/tablette */}
          <div className="flex lg:hidden mb-6 w-full justify-center">
            <Image
              src="/images/logos/SuperEnduro-logo.png"
              alt="SuperEnduro"
              width={320}
              height={120}
              className="mx-auto w-64 sm:w-72 h-auto drop-shadow-lg"
              priority
            />
          </div>
          {/* Compte à rebours centré */}
          <div className="text-center mb-8 w-full countdown-container">
            <SimpleCountdown />
          </div>

          {/* Boutons d'action sur le background */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md mx-auto buttons-container">
            <Link 
              href="/billeterie"
              className="w-full sm:w-auto flex items-center justify-center px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all duration-300 text-base sm:text-lg home-button"
            >
              Billeterie officielle
            </Link>
            
            <Link 
              href="/contact"
              className="w-full sm:w-auto flex items-center justify-center px-6 py-4 bg-white hover:bg-gray-100 text-gray-900 border-2 border-white hover:border-gray-200 font-semibold rounded-full transition-all duration-300 text-base sm:text-lg home-button white-bg"
            >
              Nous contacter
            </Link>
          </div>
        </div>

        {/* Indicateur de scroll centré en bas */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="text-center">
            <p className="text-white/80 text-sm mb-4 font-medium">
              Découvrez
            </p>
            <div className="flex flex-col items-center">
              {/* Indicateur moderne avec animation fluide */}
              <div className="relative">
                <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
                  <div className="w-1 h-2 bg-white/70 rounded-full animate-pulse"></div>
                </div>
                {/* Ligne animée qui descend */}
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-white/60 to-transparent animate-pulse"></div>
                </div>
              </div>
              
              {/* Triple chevron moderne */}
              <div className="flex flex-col mt-4 space-y-1">
                <svg 
                  className="w-6 h-2 sm:w-8 sm:h-3 text-white/60 animate-bounce" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ animationDelay: '0s' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
                <svg 
                  className="w-6 h-2 sm:w-8 sm:h-3 text-white/40 animate-bounce" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ animationDelay: '0.2s' }}

                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
                <svg 
                  className="w-6 h-2 sm:w-8 sm:h-3 text-white/20 animate-bounce" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ animationDelay: '0.4s' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section de contenu après la vidéo */}
      <div className="bg-white dark:bg-slate-900">
        {/* Section Hero avec informations */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              GRAND PRIX de FRANCE
              <div className="w-full flex justify-center mt-4">
                <Image src="/images/logos/SuperEnduro-logo.png" alt="SuperEnduro" width={160} height={54} className="mx-auto" />
              </div>
            </h1>
            
            
            
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed mb-16">
              Le championnat du monde de SuperEnduro 2026 vous donne rendez-vous le 7 mars à Douai Gayant Expo ! 
            </p>

            {/* Informations événement */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Horaires</h3>
              <p className="text-slate-600 dark:text-slate-300">Ouvertures des portes :</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Pass Premium : 13h00<br />
                Catégorie 1, 2 et 3 : 17h30
              </p>
              </div>
              
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Lieu</h3>
                <p className="text-slate-600 dark:text-slate-300">Gayant Expo Concerts</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  Rives de Gayant, 59500 Douai
                </p>
                </div>
              
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 text-center sm:col-span-2 lg:col-span-1">
                <div className="text-4xl mb-4">🎟️</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Billets</h3>
                <a href="https://www.ticketmaster.fr/fr/manifestation/championnat-du-monde-de-superenduro-2026-billet/idmanif/637073" target="_blank" rel="noopener noreferrer">
                  <span className="inline-block mx-auto mb-2 w-40 h-auto rounded-xl bg-white/95 shadow-2xl animate-ticket-pulse">
                    <Image
                      src="/images/logos/ticketmaster-seeklogo-min.png"
                      alt="Ticketmaster"
                      width={160}
                      height={60}
                      className="w-full h-auto transition-transform duration-300"
                    />
                  </span>
                  <style jsx>{`
                    @keyframes ticket-pulse {
                      0% {
                        transform: scale(1);
                        box-shadow: 0 4px 32px 0 rgba(0,0,0,0.18);
                      }
                      50% {
                        transform: scale(1.04);
                        box-shadow: 0 8px 48px 0 rgba(0,0,0,0.28);
                      }
                      100% {
                        transform: scale(1);
                        box-shadow: 0 4px 32px 0 rgba(0,0,0,0.18);
                      }
                    }
                    .animate-ticket-pulse {
                      animation: ticket-pulse 1.4s infinite;
                      will-change: transform, box-shadow;
                    }
                  `}</style>
                </a>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  Plusieurs catégories disponibles
                </p>
                </div>
            </div>
          </div>
        </section>

        {/* Section statistiques */}
        <section className="bg-red-600 dark:bg-red-700 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
          <div className="text-4xl font-bold mb-2">5000+</div>
          <p className="text-red-100">Spectateurs attendus</p>
              </div>
              <div>
          <div className="text-4xl font-bold mb-2">80+</div>
          <p className="text-red-100">Pilotes mondiaux</p>
              </div>
              <div>
          <div className="text-4xl font-bold mb-2">6h</div>
          <p className="text-red-100">De spectacle intense</p>
              </div>
              <div>
          <div className="text-4xl font-bold mb-2">100%</div>
          <p className="text-red-100">Sensations garanties</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section partenaires */}
        <section className="bg-white dark:bg-slate-900 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
              Nos partenaires
            </h2>
            
            {/* Container avec overflow hidden pour l'animation */}
            <div className="relative overflow-hidden">
              <div className="flex items-center justify-center gap-12 md:gap-16 lg:gap-20 animate-scroll-partners"
                style={{
                  animation: "scroll-partners 20s linear infinite"
                }}
              >
                {/* Images principales */}
                <div className="flex-shrink-0">
                  <Image 
                    src="/images/partners/FFMOTO_LOGO.png" 
                    alt="Fédération Française de Moto" 
                    width={140} 
                    height={80} 
                    className="h-16 sm:h-20 lg:h-24 w-auto object-contain filter hover:brightness-110 transition-all duration-300" 
                  />
                </div>
                <div className="flex-shrink-0">
                  <Image 
                    src="/images/partners/FIM_Logo.png" 
                    alt="Fédération Française de Moto" 
                    width={140} 
                    height={80} 
                    className="h-16 sm:h-20 lg:h-24 w-auto object-contain filter hover:brightness-110 transition-all duration-300" 
                  />
                </div>
                <div className="flex-shrink-0">
                  <Image 
                    src="/images/partners/Logo_Gayant-Expo-Douai.webp" 
                    alt="Gayant Expo Douai" 
                    width={140} 
                    height={80} 
                    className="h-16 sm:h-20 lg:h-24 w-auto object-contain filter hover:brightness-110 transition-all duration-300" 
                  />
                </div>
                <div className="flex-shrink-0">
                  <Image 
                    src="/images/partners/Logo_Nord-le-Departement.webp" 
                    alt="Département du Nord" 
                    width={140} 
                    height={80} 
                    className="h-16 sm:h-20 lg:h-24 w-auto object-contain filter hover:brightness-110 transition-all duration-300" 
                  />
                </div>
                <div className="flex-shrink-0">
                  <Image 
                    src="/images/partners/Logo_Region-hauts-de-France.webp" 
                    alt="Région Hauts-de-France" 
                    width={140} 
                    height={80} 
                    className="h-16 sm:h-20 lg:h-24 w-auto object-contain filter hover:brightness-110 transition-all duration-300" 
                  />
                </div>
                
                {/* Images dupliquées pour la continuité de l'animation */}
                <div className="flex-shrink-0">
                  <Image 
                    src="/images/partners/FFMOTO_LOGO.png" 
                    alt="Fédération Française de Moto" 
                    width={140} 
                    height={80} 
                    className="h-16 sm:h-20 lg:h-24 w-auto object-contain filter hover:brightness-110 transition-all duration-300" 
                  />
                </div>
                <div className="flex-shrink-0">
                  <Image 
                    src="/images/partners/FIM_Logo.png" 
                    alt="Fédération Française de Moto" 
                    width={140} 
                    height={80} 
                    className="h-16 sm:h-20 lg:h-24 w-auto object-contain filter hover:brightness-110 transition-all duration-300" 
                  />
                </div>
                <div className="flex-shrink-0">
                  <Image 
                    src="/images/partners/Logo_Gayant-Expo-Douai.webp" 
                    alt="Gayant Expo Douai" 
                    width={140} 
                    height={80} 
                    className="h-16 sm:h-20 lg:h-24 w-auto object-contain filter hover:brightness-110 transition-all duration-300" 
                  />
                </div>
                <div className="flex-shrink-0">
                  <Image 
                    src="/images/partners/Logo_Nord-le-Departement.webp" 
                    alt="Département du Nord" 
                    width={140} 
                    height={80} 
                    className="h-16 sm:h-20 lg:h-24 w-auto object-contain filter hover:brightness-110 transition-all duration-300" 
                  />
                </div>
                <div className="flex-shrink-0">
                  <Image 
                    src="/images/partners/Logo_Region-hauts-de-France.webp" 
                    alt="Région Hauts-de-France" 
                    width={140} 
                    height={80} 
                    className="h-16 sm:h-20 lg:h-24 w-auto object-contain filter hover:brightness-110 transition-all duration-300" 
                  />
                </div>
              </div>
            </div>
            
            {/* Message de soutien */}
            <p className="text-center text-slate-600 dark:text-slate-400 mt-8 text-sm sm:text-base">
              Merci à tous nos partenaires pour leur soutien précieux
            </p>
          </div>
          
          <style jsx>{`
            @keyframes scroll-partners {
              0% { 
                transform: translateX(0); 
              }
              100% { 
                transform: translateX(-50%); 
              }
            }
            
            .animate-scroll-partners:hover {
              animation-play-state: paused;
            }
          `}</style>
        </section>



        {/* Section Call to Action */}
        <section className="bg-slate-900 dark:bg-slate-950 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Prêt pour l&apos;Adrénaline ?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Ne manquez pas l&apos;événement SuperEnduro de l&apos;année ! 
              Réservez dès maintenant vos places pour vivre des sensations uniques.
            </p>
            <div className="flex gap-6 justify-center flex-col sm:flex-row">
              <Link 
                href="/billeterie"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg"
              >
                Billeterie officielle
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent hover:bg-white/10 text-white border-2 border-white/30 hover:border-white/50 font-semibold rounded-full transition-all duration-300 hover:scale-105 text-lg"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </section>
      </div>
      {/* Panel de debug pour le développement */}
      <DebugPanel />
    </div>
  );
}