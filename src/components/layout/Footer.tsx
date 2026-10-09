"use client";

import Link from "next/link";
import { Instagram, Facebook, MapPin } from "lucide-react";
import {
  footerNavLinks,
  legalLinks,
  socialLinks,
} from "@/data/navigation";
import { siteConfig, venueConfig } from "@/data/site";
import { footerLabels } from "@/data/ui";

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
  return (
    <footer className="theme-dark bg-black border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <h3 className="mb-4 font-display text-xl font-bold text-white">
              {siteConfig.shortName}
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-zinc-400">
              {siteConfig.footerDescription}
            </p>
            <div className="flex items-start gap-2.5">
              <MapPin
                size={16}
                className="mt-0.5 shrink-0 text-brand-red"
                aria-hidden="true"
              />
              <div>
                <p className="mb-0.5 text-sm font-medium text-white">
                  {venueConfig.name}
                </p>
                <a
                  href={venueConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm leading-relaxed text-zinc-400 transition-colors hover:text-brand-red"
                >
                  {venueConfig.fullAddress}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">
              {footerLabels.navigation}
            </h4>
            <ul className="space-y-2">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-brand-red"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">
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
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-surface text-zinc-400 transition-all hover:border-brand-red/50 hover:text-white"
                >
                  {socialIcons[social.id]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-sm text-zinc-400" suppressHydrationWarning>
            © {new Date().getFullYear()} {siteConfig.name}.{" "}
            {footerLabels.rightsReserved}
          </p>
          {legalLinks.length > 0 ? (
            <ul className="flex flex-wrap gap-6">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-zinc-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
