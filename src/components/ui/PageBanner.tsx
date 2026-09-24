import Image from "next/image";
import { cn } from "@/lib/cn";

interface PageBannerProps {
  src: string;
  alt: string;
  className?: string;
  /** Priorité de chargement (pages d’entrée) */
  priority?: boolean;
}

export function PageBanner({
  src,
  alt,
  className,
  priority = true,
}: PageBannerProps) {
  return (
    <div
      className={cn(
        "relative w-full h-[200px] sm:h-[240px] md:h-[280px] overflow-hidden",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>
  );
}
