import Image from "next/image";
import { cn } from "@/lib/cn";

interface PageBannerProps {
  src: string;
  alt: string;
  className?: string;
  /** Priorité de chargement (pages d’entrée) */
  priority?: boolean;
}

/** Visuels attendus : 1920 × 640 px (ratio 3:1), sujet dans la zone centrale. */
export function PageBanner({
  src,
  alt,
  className,
  priority = true,
}: PageBannerProps) {
  return (
    <div className={cn("bg-black pt-16 md:pt-20", className)}>
      <div className="relative w-full aspect-[2/1] sm:aspect-[3/1] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}
