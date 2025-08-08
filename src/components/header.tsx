'use client';

import Link from "next/link";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useState, useEffect } from "react";
import { Menu, X, Ticket, Settings } from "lucide-react";
import Image from "next/image";
import { createClient } from '@/lib/supabase/client';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

interface HeaderProps {
  showCountdown?: boolean;
}

export function Header({ showCountdown = true }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const scrollY = useScrollPosition();
  const supabase = createClient();

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté en tant qu'admin
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAdmin(!!session?.user);
    };

    checkAdminStatus();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      setIsAdmin(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

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
        <div className="flex items-center justify-between py-4 sm:py-6">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between w-full">
            {/* Titre à gauche - Desktop seulement */}
            <div className="flex-1 flex justify-start">
              <Link href="/" className="cursor-pointer">
                <h1 className="text-white text-2xl font-bold tracking-wide transition-colors duration-300">
                  Supercross <span className="text-red-600">Douai</span>
                </h1>
              </Link>
            </div>

            {/* Logos au centre - Desktop seulement */}
            <div className="flex-1 justify-center flex">
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

            {/* Boutons à droite - Desktop seulement */}
            <div className="flex-1 justify-end flex items-center gap-3">
              {isAdmin && (
                <Link 
                  href="/admin/dashboard"
                  className="inline-flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 text-sm space-x-2 border border-gray-600"
                >
                  <Settings size={16} />
                  <span>Dashboard</span>
                </Link>
              )}
              <Link 
                href="/billeterie"
                className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 text-base space-x-2"
              >
                <Ticket size={18} />
                <span>Billeterie</span>
              </Link>
            </div>
          </div>

          {/* Mobile/Tablette : Bouton hamburger parfaitement centré */}
          <div className="lg:hidden w-full flex justify-center items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 text-white hover:text-red-400 transition-colors duration-300 flex items-center justify-center"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Deuxième ligne : Menu - Desktop seulement */}
        <div className="border-t border-white/10 py-6 hidden lg:block">
          {/* Navigation Desktop */}
          <nav className="flex justify-center">
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
        </div>

        {/* Menu Mobile/Tablette */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg shadow-2xl border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-4">
              {/* Titre et logos dans le menu mobile */}
              <div className="text-center mb-6">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <h1 className="text-white text-xl sm:text-2xl font-bold tracking-wide mb-4">
                    Supercross <span className="text-red-600">Douai</span>
                  </h1>
                </Link>
                
                {/* Logos dans le menu mobile */}
                <div className="flex items-center justify-center space-x-6 sm:space-x-8">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/partners/FFMOTO_LOGO.png"
                      alt="FFMOTO"
                      width={100}
                      height={60}
                      className="h-14 sm:h-16 w-auto"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/partners/Supercross_Championnat_FR.png"
                      alt="Championnat de France Supercross"
                      width={100}
                      height={60}
                      className="h-14 sm:h-16 w-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div className="flex flex-col space-y-2">
                {menuItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-white hover:text-red-400 transition-all duration-300 font-medium text-lg sm:text-xl uppercase tracking-wide px-4 py-3 hover:bg-white/5 rounded-lg text-center"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Bouton Dashboard mobile (si admin) */}
                {isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    className="mt-2 inline-flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-300 text-base sm:text-lg space-x-2 mx-4 border border-gray-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings size={18} />
                    <span>Dashboard</span>
                  </Link>
                )}
                
                {/* Bouton Billeterie mobile */}
                <Link
                  href="/billeterie"
                  className="mt-4 inline-flex items-center justify-center px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 text-base sm:text-lg space-x-2 mx-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Ticket size={20} />
                  <span>Billeterie</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
