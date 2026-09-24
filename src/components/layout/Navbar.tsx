"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { navbarLabels } from "@/data/ui";
import { useNavbarScroll } from "@/hooks/useNavbarScroll";
import { useIsAdminSession } from "@/hooks/useIsAdminSession";
import { cn } from "@/lib/cn";

export function Navbar() {
  const pathname = usePathname();
  const isScrolled = useNavbarScroll();
  const isAdmin = useIsAdminSession();
  const [isOpen, setIsOpen] = useState(false);
  const isHomePage = pathname === "/";
  const showSolidBackground = !isHomePage || isScrolled;

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "theme-dark fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        showSolidBackground
          ? "bg-black/95 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "bg-transparent"
      )}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label={navbarLabels.mainNavigation}
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4 h-16 md:h-20">
          <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 xl:gap-4 min-w-0 flex-1 lg:flex-none">
            <Link
              href="/"
              className="relative flex items-center min-w-0 transition-opacity hover:opacity-90"
              aria-label={siteConfig.name}
            >
              <Image
                src="/images/logo/logo_SuperEnduro.png"
                alt={siteConfig.shortName}
                width={240}
                height={72}
                className="h-7 w-auto max-w-[118px] sm:h-8 sm:max-w-[148px] lg:h-10 lg:max-w-[200px] xl:h-11 xl:max-w-[230px] object-contain"
                priority
              />
            </Link>
            <span
              className="h-5 sm:h-6 lg:h-8 w-px bg-white/20 shrink-0"
              aria-hidden="true"
            />
            <Image
              src="/images/partners/FIMLogo.webp"
              alt="FIM"
              width={120}
              height={60}
              className="h-6 w-auto max-w-[36px] sm:h-7 sm:max-w-[44px] lg:h-9 lg:max-w-[60px] xl:h-10 xl:max-w-[68px] object-contain opacity-95 shrink-0"
            />
          </div>

          <ul className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 shrink-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium uppercase tracking-widest transition-colors relative group whitespace-nowrap",
                    link.highlight
                      ? "px-4 py-2 bg-brand-red text-white font-semibold rounded-sm hover:bg-brand-red-dark shadow-lg shadow-brand-red/20"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {link.label}
                  {!link.highlight && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full" />
                  )}
                </Link>
              </li>
            ))}
            {isAdmin ? (
              <li>
                <Link
                  href="/admin"
                  className="text-sm font-medium uppercase tracking-widest text-brand-red hover:text-white transition-colors whitespace-nowrap"
                >
                  Admin
                </Link>
              </li>
            ) : null}
          </ul>

          <button
            type="button"
            className="lg:hidden p-2 -mr-1 text-white shrink-0"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? navbarLabels.closeMenu : navbarLabels.openMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <ul className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block py-3 px-4 rounded-sm uppercase tracking-widest text-sm font-medium transition-colors",
                      link.highlight
                        ? "bg-brand-red text-white font-semibold text-center"
                        : "text-white/90 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {isAdmin ? (
                <li>
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="block py-3 px-4 rounded-sm uppercase tracking-widest text-sm font-medium text-brand-red hover:bg-white/5"
                  >
                    Admin
                  </Link>
                </li>
              ) : null}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
