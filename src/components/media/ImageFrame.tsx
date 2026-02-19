import { type ReactNode } from "react";
import {
  AqualyxIllustration,
  BlogArt,
  CavitationIllustration,
  ClinicIllustration,
  FAQArt,
  FatFreezingIllustration,
  HeroAbstract,
  LemonBottleIllustration,
  LocationMapArt,
  PricingArt,
  ResultsArt
} from "@/components/brand/Illustrations";
import { SmartImage } from "@/components/media/SmartImage";
import { cn } from "@/lib/utils";

type IllustrationKey =
  | "heroAbstract"
  | "aqualyx"
  | "lemonBottle"
  | "fatFreezing"
  | "cavitation"
  | "clinic"
  | "blog"
  | "faq"
  | "results"
  | "pricing"
  | "locationMap"
  | "generic";

type ImageFrameProps = {
  alt: string;
  className?: string;
  src?: string;
  preferPhoto?: boolean;
  illustration?: IllustrationKey;
  badge?: ReactNode;
  crop?: "wide" | "tall" | "square" | "auto";
  caption?: string;
  duotone?: boolean;
  blurBackdrop?: boolean;
};

const illustrationMap: Record<IllustrationKey, ReactNode> = {
  heroAbstract: <HeroAbstract />,
  aqualyx: <AqualyxIllustration />,
  lemonBottle: <LemonBottleIllustration />,
  fatFreezing: <FatFreezingIllustration />,
  cavitation: <CavitationIllustration />,
  clinic: <ClinicIllustration />,
  blog: <BlogArt />,
  faq: <FAQArt />,
  results: <ResultsArt />,
  pricing: <PricingArt />,
  locationMap: <LocationMapArt />,
  generic: <ClinicIllustration />
};

export function ImageFrame({
  alt,
  className,
  src,
  preferPhoto = false,
  illustration = "generic",
  badge,
  crop = "auto",
  caption,
  duotone = true,
  blurBackdrop = true
}: ImageFrameProps) {
  const cropClass =
    crop === "wide" ? "aspect-[16/9]" : crop === "tall" ? "aspect-[4/5]" : crop === "square" ? "aspect-square" : "";

  if (preferPhoto && src) {
    return (
      <div className={cn("relative overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-soft", cropClass, className)}>
        {blurBackdrop ? (
          <div
            className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl"
            style={{ backgroundImage: `url(${src})`, opacity: 0.25 }}
          />
        ) : null}
        <SmartImage alt={alt} className="relative h-full min-h-[240px]" fill src={src} />
        {duotone ? <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-secondary/25 via-transparent to-primary/20" /> : null}
        {caption ? <p className="absolute bottom-3 left-3 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs">{caption}</p> : null}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-soft", cropClass, className)}>
      <div className="absolute inset-0 bg-hero-mesh opacity-70" />
      <div className="relative h-full min-h-[240px]">{illustrationMap[illustration]}</div>
      {badge ? <div className="absolute left-4 top-4">{badge}</div> : null}
      {caption ? <p className="absolute bottom-3 left-3 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs">{caption}</p> : null}
    </div>
  );
}
