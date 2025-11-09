'use client';

/**
 * Composant d'accessibilité permettant aux utilisateurs de clavier
 * de sauter directement au contenu principal en appuyant sur Tab
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="skip-to-content sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-red-600 focus:text-white focus:font-semibold focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-400"
    >
      Aller au contenu principal
    </a>
  );
}
