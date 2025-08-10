'use client';

import Link from "next/link";
import { useVisitTracker } from "@/hooks/useVisitTracker";
import { Header } from "@/components/header";
import { SimpleCountdown } from "@/components/simple-countdown";
import { CachedImage } from "@/components/media/CachedImage";
import { CachedVideo } from "@/components/media/CachedVideo";
import { CacheDebugger } from "@/components/CacheDebugger";

export default function Home() {
  // Tracker les visites automatiquement
  useVisitTracker();

  return (
    <>
      {/* Header réutilisable */}
      <Header showCountdown={true} />

      {/* Contenu principal */}
      <div className="relative h-screen overflow-hidden">
        {/* Vidéo en arrière-plan */}
        <div className="absolute inset-0 z-0">
        {/* Vidéo Desktop */}
        <CachedVideo
          src="/videos/SXTour2025.webm"
          autoPlay={true}
          muted={true}
          loop={true}
          controls={false}
          hideControls={true}
          className="hidden md:block w-full h-full object-cover"
          priority={true}
        />
        
        {/* Vidéo Mobile/Tablette */}
        <CachedVideo
          src="/videos/SXTour2025-mobile.webm"
          autoPlay={true}
          muted={true}
          loop={true}
          controls={false}
          hideControls={true}
          className="block md:hidden w-full h-full object-cover"
          priority={true}
        />
        
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 h-screen flex flex-col pt-32">
        {/* Section en bas de la vidéo */}
        <main className="flex-1 flex flex-col justify-end px-4 sm:px-6 lg:px-8 pb-8">
          {/* Compte à rebours centré */}
          <div className="text-center mb-12">
            <div className="flex justify-center">
              <div className="hidden lg:block">
                <SimpleCountdown />
              </div>
              <div className="lg:hidden">
                <div className="text-white text-center">
                  <p className="text-lg font-semibold mb-2">Samedi 4 Octobre 2025</p>
                  <p className="text-sm opacity-80">13H30 - 18H30</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Indicateur de scroll en bas à droite */}
        <div className="absolute bottom-8 right-8">
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
                  className="w-8 h-3 text-white/60 animate-bounce" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ animationDelay: '0s' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
                <svg 
                  className="w-8 h-3 text-white/40 animate-bounce" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ animationDelay: '0.2s' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
                <svg 
                  className="w-8 h-3 text-white/20 animate-bounce" 
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

        {/* Footer spacer */}
        <div className="py-8"></div>
      </div>
      </div>

      {/* Section de contenu après la vidéo */}
      <div className="bg-white dark:bg-slate-900">
        {/* Section Hero avec informations */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Supercross de
              <span className="text-red-600 dark:text-red-400"> Douai</span>
            </h1>
            
            <div className="mb-4">
              <div className="flex items-center justify-center space-x-3">
                <CachedImage
                  src="/images/flags/france.svg"
                  alt="Drapeau français"
                  width={24}
                  height={18}
                  className="w-6 h-4"
                  priority={true}
                />
                <p className="text-lg sm:text-xl text-red-600 dark:text-red-400 font-semibold">
                  Championnat de France 2025
                </p>
                <CachedImage
                  src="/images/flags/france.svg"
                  alt="Drapeau français"
                  width={24}
                  height={18}
                  className="w-6 h-4"
                  priority={true}
                />
              </div>
            </div>
            
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
              L&apos;événement supercross le plus spectaculaire du Nord de la France vous attend à Gayant Expo Concerts le Samedi 4 octobre 2025 !
            </p>

            {/* Boutons d'action */}
            <div className="flex gap-4 justify-center flex-col sm:flex-row max-w-md mx-auto mb-16">
              <Link 
                href="/billeterie"
                className="flex-1 inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg"
              >
                Réserver mes billets
              </Link>
              
              <Link 
                href="/contact"
                className="flex-1 inline-flex items-center justify-center px-8 py-4 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 font-semibold rounded-full transition-all duration-300 hover:scale-105 text-lg"
              >
                En savoir plus
              </Link>
            </div>

            {/* Informations événement */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Date & Horaires</h3>
                <p className="text-slate-600 dark:text-slate-300">Samedi 4 Octobre 2025</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  Ouverture : 13H30 - 18H30
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
                <p className="text-slate-600 dark:text-slate-300">À partir de 25€</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  Toutes catégories disponibles
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
                <div className="text-4xl font-bold mb-2">60+</div>
                <p className="text-red-100">Pilotes participants</p>
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

        {/* Section Call to Action */}
        <section className="bg-slate-900 dark:bg-slate-950 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Prêt pour l&apos;Adrénaline ?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Ne manquez pas l&apos;événement supercross de l&apos;année ! 
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
      {/* Debug temporaire */}
      <CacheDebugger />
    </>
  );
}
