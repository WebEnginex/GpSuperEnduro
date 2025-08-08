'use client';

import { Header } from "@/components/header";
import { usePathname } from "next/navigation";

export function ConditionalHeader() {
  const pathname = usePathname();
  
  // Ne pas afficher le header sur la page d'accueil car il est intégré dans la page
  if (pathname === '/') {
    return null;
  }
  
  // Ne pas afficher le header sur la page de connexion admin
  if (pathname === '/admin') {
    return null;
  }
  
  // Afficher le header sans décompte sur les autres pages (y compris dashboard)
  return <Header showCountdown={false} />;
}
