import Image from "next/image";

const flagMap: Record<string, string> = {
  gb: "/images/flags/gb.svg",
  se: "/images/flags/se.svg",
  pl: "/images/flags/pl.svg",
  us: "/images/flags/us.svg",
  de: "/images/flags/de.svg",
  pt: "/images/flags/pt.svg",
  es: "/images/flags/es.svg",
};

export function PilotFlag({ country, size = 24 }: { country?: string; size?: number }) {
  if (!country || !flagMap[country]) return null;
  return (
    <Image
      src={flagMap[country]}
      alt={`Drapeau ${country}`}
      width={size}
      height={size * 2 / 3}
      className="rounded shadow-sm border border-gray-300"
      style={{ display: "inline-block" }}
    />
  );
}
