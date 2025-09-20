'use client';

import Link from "next/link";
import { useVisitTracker } from "@/hooks/useVisitTracker";
import { Header } from "@/components/header";
import { SimpleCountdown } from "@/components/simple-countdown";
import { BackgroundImage } from "@/components/media/BackgroundImage";
import { DebugPanel } from "@/components/DebugPanel";
import Image from "next/image";

// Import du test en développement seulement
if (process.env.NODE_ENV === 'development') {
  import("@/utils/testCache");
}

export default function Home() {
  // Tracker les visites automatiquement
  useVisitTracker();

  return (
    <div className="w-full overflow-x-hidden">
      {/* Header réutilisable */}
      <Header showCountdown={true} />

      {/* Section principale avec image de fond */}
      <BackgroundImage
        src="/images/background/supercross-sxtour-bg.webp?v=2025011"
        alt="Gp SuperEnduro"
        className="min-h-screen h-screen w-full overflow-hidden relative"
      >
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black/50 z-10 w-full h-full"></div>

        {/* Contenu superposé */}
        <div className="relative z-20 w-full h-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-20 md:pt-16 lg:pt-0">
          {/* Compte à rebours centré */}
          <div className="text-center mb-12">
            <SimpleCountdown />
          </div>

          {/* Boutons d'action sur le background */}
          <div className="flex gap-6 justify-center flex-col sm:flex-row max-w-lg mx-auto">
            <Link 
              href="/billeterie"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg"
            >
              Billeterie officielle
            </Link>
            
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 border-2 border-white hover:border-gray-200 font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg"
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
      </BackgroundImage>

      {/* Section de contenu après la vidéo */}
      <div className="bg-white dark:bg-slate-900">
        {/* Section Hero avec informations */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              GRAND PRIX de FRANCE de
              <span className="text-red-600 dark:text-red-400"> SuperEnduro</span>
            </h1>
            
            <div className="mb-4">
              <div className="flex items-center justify-center space-x-3">
                
                <p className="text-lg sm:text-xl text-red-600 dark:text-red-400 font-semibold">
                  championnat du monde 2026
                </p>
                
              </div>
            </div>
            
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed mb-16">
              Le championnat du monde de SuperEnduro 2026 vous donne rendez vous le 7 mars à Douai Gayant Expo ! 
            </p>

            {/* Informations événement */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Horaires</h3>
              <p className="text-slate-600 dark:text-slate-300">Ouvertures des portes :</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Gold Pass : 13h00<br />
                Autres : 17h30
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
                <p className="text-slate-600 dark:text-slate-300">Tarifs à venir</p>
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
