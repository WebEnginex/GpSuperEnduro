'use client';

import Link from "next/link";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useState } from "react";
import { Menu, X, Ticket } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  showCountdown?: boolean;
}

export function Header({ showCountdown = true }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollY = useScrollPosition();

  const menuItems = [
    { href: "/", label: "Accueil" },
    { href: "/programme", label: "Programme" },
    { href: "/pilotes", label: "Pilotes" },
    { href: "/billeterie", label: "Billeterie" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrollY > 50 
        ? 'bg-black/80 backdrop-blur-lg shadow-xl' 
        : showCountdown ? 'bg-transparent' : 'bg-black/60'
    }`}>
      
      {/* Image de fond uniquement pour les pages autres que l'accueil et quand pas de scroll */}
      {!showCountdown && (
        <div className={`absolute inset-0 z-0 transition-opacity duration-700 ease-in-out ${
          scrollY <= 50 ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-full h-full bg-[url('/images/background/supercross-bg.webp')] bg-cover bg-center opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
        </div>
      )}
      
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!showCountdown ? 'relative z-10' : ''}`}>
        {/* Première ligne : Titre/Décompte - Logos - Bouton Billeterie */}
        <div className="flex items-center justify-between py-6">
          {/* Titre à gauche */}
          <div className="flex-1 flex justify-start">
            <div className="hidden lg:block">
              <Link href="/" className="cursor-pointer">
                <h1 className="text-white text-2xl font-bold tracking-wide transition-colors duration-300">
                  Supercross <span className="text-red-600">Douai</span>
                </h1>
              </Link>
            </div>
          </div>

          {/* Logos au centre */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center space-x-8 sm:space-x-10">
              <div className="flex-shrink-0">
                <Image
                  src="/images/partners/FFMOTO_LOGO.png"
                  alt="FFMOTO"
                  width={100}
                  height={60}
                  className="h-16 sm:h-20 w-auto"
                />
              </div>
              <div className="flex-shrink-0">
                <Image
                  src="/images/partners/Supercross_Championnat_FR.png"
                  alt="Championnat de France Supercross"
                  width={100}
                  height={60}
                  className="h-16 sm:h-20 w-auto"
                />
              </div>
            </div>
          </div>

          {/* Bouton Billeterie à droite */}
          <div className="flex-1 flex justify-end">
            <Link 
              href="/billeterie"
              className="hidden sm:inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 text-base space-x-2"
            >
              <Ticket size={18} />
              <span>Billeterie</span>
            </Link>
          </div>
        </div>

        {/* Deuxième ligne : Menu */}
        <div className="border-t border-white/10 py-6">
          {/* Navigation Desktop */}
          <nav className="hidden md:flex justify-center">
            <div className="flex space-x-12">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-red-400 transition-colors duration-300 font-medium text-xl uppercase tracking-wide relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Navigation Mobile */}
          <div className="md:hidden flex justify-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 text-white hover:text-red-400 transition-colors duration-300"
            >
              {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 mx-4 bg-black/90 backdrop-blur-lg rounded-xl overflow-hidden transform transition-all duration-300 ease-out animate-in slide-in-from-top-2">
            <div className="flex flex-col py-4">
              {menuItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-red-400 transition-all duration-300 font-medium text-xl uppercase tracking-wide px-6 py-4 hover:bg-white/5 rounded-lg mx-2"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  {item.label}
                </Link>
              ))}
              {/* Bouton Billeterie mobile */}
              <Link
                href="/billeterie"
                className="mx-4 mt-4 mb-2 inline-flex items-center justify-center px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 text-lg space-x-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Ticket size={20} />
                <span>Billeterie</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
