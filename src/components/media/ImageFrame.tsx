import { type ReactNode } from "react";
import {
  AqualyxIllustration,
  CavitationIllustration,
  ClinicIllustration,
  FatFreezingIllustration,
  LemonBottleIllustration
} from "@/components/brand/Illustrations";
import { SmartImage } from "@/components/media/smart-image";
import { cn } from "@/lib/utils";

type IllustrationKey =
  | "aqualyx"
  | "lemonBottle"
  | "fatFreezing"
  | "cavitation"
  | "clinic"
  | "generic";

type ImageFrameProps = {
  alt: string;
  className?: string;
  src?: string;
  preferPhoto?: boolean;
  illustration?: IllustrationKey;
  badge?: ReactNode;
};

const illustrationMap: Record<IllustrationKey, ReactNode> = {
  aqualyx: <AqualyxIllustration />,
  lemonBottle: <LemonBottleIllustration />,
  fatFreezing: <FatFreezingIllustration />,
  cavitation: <CavitationIllustration />,
  clinic: <ClinicIllustration />,
  generic: <ClinicIllustration />
};

export function ImageFrame({
  alt,
  className,
  src,
  preferPhoto = false,
  illustration = "generic",
  badge
}: ImageFrameProps) {
  if (preferPhoto && src) {
    return <SmartImage alt={alt} className={cn("h-full min-h-[240px]", className)} fill src={src} />;
  }

  return (
    <div className={cn("relative overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-soft", className)}>
      <div className="absolute inset-0 bg-hero-mesh opacity-70" />
      <div className="relative h-full min-h-[240px]">{illustrationMap[illustration]}</div>
      {badge ? <div className="absolute left-4 top-4">{badge}</div> : null}
    </div>
  );
}

