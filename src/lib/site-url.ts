const PRODUCTION_URL = "https://www.gpsuperenduroparis.fr";

export function getSiteUrl(): string {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicitUrl) return explicitUrl;

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return PRODUCTION_URL;
}
