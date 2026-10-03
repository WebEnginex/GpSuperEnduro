"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Facebook, MapPin } from "lucide-react";
import {
  footerNavLinks,
  legalLinks,
  socialLinks,
} from "@/data/navigation";
import { siteConfig, venueConfig } from "@/data/site";
import { footerLabels } from "@/data/ui";
import { EventButton } from "@/components/ui/EventButton";

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15Z" />
    </svg>
  );
}

const socialIcons: Record<string, React.ReactNode> = {
  tiktok: <TikTokIcon size={20} />,
  instagram: <Instagram size={20} />,
  facebook: <Facebook size={20} />,
};

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", { email });
    setEmail("");
  };

  return (
    <footer className="theme-dark bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="font-display text-xl font-bold text-white mb-4">
              {siteConfig.shortName}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-5">
              {siteConfig.footerDescription}
            </p>
            <div className="flex items-start gap-2.5">
              <MapPin
                size={16}
                className="text-brand-red shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <p className="text-white text-sm font-medium mb-0.5">
                  {venueConfig.name}
                </p>
                <a
                  href={venueConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-brand-red text-sm leading-relaxed transition-colors"
                >
                  {venueConfig.fullAddress}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-widest text-sm mb-4">
              {footerLabels.navigation}
            </h4>
            <ul className="space-y-2">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-brand-red text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-widest text-sm mb-4">
              {footerLabels.newsletter}
            </h4>
            <p className="text-zinc-400 text-sm mb-4">
              {footerLabels.newsletterDescription}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <label htmlFor="footer-newsletter-email" className="sr-only">
                {footerLabels.emailPlaceholder}
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={footerLabels.emailPlaceholder}
                className="flex-1 min-w-0 bg-surface border border-white/10 rounded-sm px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-brand-red/50"
                required
                autoComplete="email"
              />
              <EventButton type="submit" size="sm" variant="primary">
                {footerLabels.joinButton}
              </EventButton>
            </form>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-widest text-sm mb-4">
              {footerLabels.followUs}
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-sm bg-surface border border-white/10 text-zinc-400 hover:text-white hover:border-brand-red/50 transition-all"
                >
                  {socialIcons[social.id]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400 text-sm" suppressHydrationWarning>
            © {new Date().getFullYear()} {siteConfig.name}. {footerLabels.rightsReserved}
          </p>
          {legalLinks.length > 0 && (
            <ul className="flex flex-wrap gap-6">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-zinc-300 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
