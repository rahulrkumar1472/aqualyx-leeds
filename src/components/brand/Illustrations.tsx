import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

type IllustrationProps = {
  className?: string;
  title?: string;
};

function BaseSvg({
  className,
  children,
  title,
  ...props
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      className={className}
      role={title ? "img" : "presentation"}
      viewBox="0 0 600 420"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id="ill-a" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.30)" />
          <stop offset="100%" stopColor="hsl(var(--secondary) / 0.10)" />
        </linearGradient>
        <linearGradient id="ill-b" x1="0%" x2="100%" y1="20%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.80)" />
          <stop offset="100%" stopColor="hsl(var(--secondary) / 0.85)" />
        </linearGradient>
        <filter id="ill-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>
      <rect fill="url(#ill-a)" height="420" rx="36" width="600" />
      <ellipse
        cx="480"
        cy="70"
        fill="hsl(var(--primary) / 0.3)"
        filter="url(#ill-blur)"
        rx="96"
        ry="48"
      />
      {children}
    </svg>
  );
}

export function AqualyxIllustration({ className, title = "Aqualyx illustration" }: IllustrationProps) {
  return (
    <BaseSvg className={cn("h-full w-full", className)} title={title}>
      <path d="M180 332C220 252 275 194 300 120C325 194 380 252 420 332" fill="none" stroke="url(#ill-b)" strokeLinecap="round" strokeWidth="16" />
      <path d="M164 336C218 300 382 300 436 336" fill="none" stroke="hsl(var(--secondary) / 0.35)" strokeLinecap="round" strokeWidth="10" />
      <path d="M300 82C276 120 250 150 250 184C250 220 272 246 300 246C328 246 350 220 350 184C350 150 324 120 300 82Z" fill="hsl(var(--background))" stroke="url(#ill-b)" strokeWidth="10" />
      <circle cx="300" cy="184" fill="hsl(var(--primary) / 0.25)" r="26" />
    </BaseSvg>
  );
}

export function LemonBottleIllustration({
  className,
  title = "Lemon Bottle illustration"
}: IllustrationProps) {
  return (
    <BaseSvg className={cn("h-full w-full", className)} title={title}>
      <circle cx="300" cy="206" fill="hsl(var(--background))" r="112" stroke="url(#ill-b)" strokeWidth="12" />
      <circle cx="300" cy="206" fill="none" r="76" stroke="hsl(var(--secondary) / 0.28)" strokeDasharray="10 10" strokeWidth="8" />
      <path d="M300 92C282 120 264 141 264 166C264 191 280 208 300 208C320 208 336 191 336 166C336 141 318 120 300 92Z" fill="hsl(var(--primary) / 0.23)" stroke="url(#ill-b)" strokeWidth="8" />
      <path d="M216 304C246 282 354 282 384 304" fill="none" stroke="hsl(var(--secondary) / 0.35)" strokeLinecap="round" strokeWidth="10" />
    </BaseSvg>
  );
}

export function FatFreezingIllustration({
  className,
  title = "Fat freezing illustration"
}: IllustrationProps) {
  return (
    <BaseSvg className={cn("h-full w-full", className)} title={title}>
      <path d="M300 94V302M210 146L390 250M210 250L390 146M238 104L362 298M238 298L362 104" fill="none" stroke="url(#ill-b)" strokeLinecap="round" strokeWidth="10" />
      <circle cx="300" cy="198" fill="hsl(var(--background) / 0.78)" r="82" stroke="hsl(var(--secondary) / 0.28)" strokeWidth="8" />
      <path d="M184 324C236 286 364 286 416 324" fill="none" stroke="hsl(var(--secondary) / 0.34)" strokeLinecap="round" strokeWidth="10" />
    </BaseSvg>
  );
}

export function CavitationIllustration({ className, title = "Cavitation illustration" }: IllustrationProps) {
  return (
    <BaseSvg className={cn("h-full w-full", className)} title={title}>
      <path d="M154 164C198 126 246 126 290 164C334 202 382 202 446 160" fill="none" stroke="url(#ill-b)" strokeLinecap="round" strokeWidth="12" />
      <path d="M154 222C198 184 246 184 290 222C334 260 382 260 446 218" fill="none" stroke="hsl(var(--secondary) / 0.56)" strokeLinecap="round" strokeWidth="12" />
      <path d="M154 280C198 242 246 242 290 280C334 318 382 318 446 276" fill="none" stroke="hsl(var(--primary) / 0.5)" strokeLinecap="round" strokeWidth="12" />
      <circle cx="300" cy="118" fill="hsl(var(--background))" r="34" stroke="url(#ill-b)" strokeWidth="8" />
    </BaseSvg>
  );
}

export function ClinicIllustration({ className, title = "Leeds clinic illustration" }: IllustrationProps) {
  return (
    <BaseSvg className={cn("h-full w-full", className)} title={title}>
      <path d="M300 98C257 98 222 132 222 174C222 228 300 304 300 304C300 304 378 228 378 174C378 132 343 98 300 98Z" fill="hsl(var(--background))" stroke="url(#ill-b)" strokeWidth="10" />
      <circle cx="300" cy="174" fill="hsl(var(--primary) / 0.28)" r="28" />
      <path d="M180 320C224 280 376 280 420 320" fill="none" stroke="hsl(var(--secondary) / 0.35)" strokeLinecap="round" strokeWidth="10" />
      <path d="M226 334C246 322 272 314 300 314C328 314 354 322 374 334" fill="none" stroke="hsl(var(--primary) / 0.45)" strokeLinecap="round" strokeWidth="8" />
    </BaseSvg>
  );
}

export function HeroAbstract({ className, title = "Aqualyx Leeds abstract hero" }: IllustrationProps) {
  return (
    <BaseSvg className={cn("h-full w-full", className)} title={title}>
      <ellipse cx="172" cy="122" fill="hsl(var(--primary) / 0.35)" rx="112" ry="72" />
      <ellipse cx="446" cy="304" fill="hsl(var(--secondary) / 0.16)" rx="124" ry="88" />
      <path
        d="M118 282C168 240 228 240 278 282C328 324 388 324 468 266"
        fill="none"
        stroke="url(#ill-b)"
        strokeLinecap="round"
        strokeWidth="12"
      />
      <path
        d="M118 330C168 288 228 288 278 330C328 372 388 372 468 314"
        fill="none"
        stroke="hsl(var(--secondary) / 0.46)"
        strokeLinecap="round"
        strokeWidth="10"
      />
      <circle cx="300" cy="170" fill="hsl(var(--background))" r="44" stroke="url(#ill-b)" strokeWidth="9" />
    </BaseSvg>
  );
}

export function PricingArt({ className, title = "Pricing illustration" }: IllustrationProps) {
  return (
    <BaseSvg className={cn("h-full w-full", className)} title={title}>
      <rect x="132" y="108" width="336" height="216" rx="24" fill="hsl(var(--background) / 0.84)" stroke="hsl(var(--secondary) / 0.2)" strokeWidth="8" />
      <path d="M172 166H426M172 210H426M172 254H354" fill="none" stroke="hsl(var(--secondary) / 0.42)" strokeLinecap="round" strokeWidth="10" />
      <circle cx="404" cy="254" fill="hsl(var(--primary) / 0.3)" r="30" />
      <path d="M388 254H420" stroke="hsl(var(--secondary) / 0.75)" strokeLinecap="round" strokeWidth="8" />
    </BaseSvg>
  );
}

export function ResultsArt({ className, title = "Results tracking illustration" }: IllustrationProps) {
  return (
    <BaseSvg className={cn("h-full w-full", className)} title={title}>
      <path d="M140 298L214 220L286 248L360 174L442 208" fill="none" stroke="url(#ill-b)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" />
      <circle cx="214" cy="220" fill="hsl(var(--primary) / 0.45)" r="12" />
      <circle cx="286" cy="248" fill="hsl(var(--primary) / 0.45)" r="12" />
      <circle cx="360" cy="174" fill="hsl(var(--primary) / 0.45)" r="12" />
      <rect x="116" y="112" width="368" height="222" rx="26" fill="none" stroke="hsl(var(--secondary) / 0.22)" strokeWidth="8" />
    </BaseSvg>
  );
}

export function BlogArt({ className, title = "Blog illustration" }: IllustrationProps) {
  return (
    <BaseSvg className={cn("h-full w-full", className)} title={title}>
      <rect x="136" y="92" width="328" height="246" rx="24" fill="hsl(var(--background) / 0.86)" stroke="hsl(var(--secondary) / 0.2)" strokeWidth="8" />
      <path d="M176 146H424M176 186H386M176 226H424M176 266H352" fill="none" stroke="hsl(var(--secondary) / 0.45)" strokeLinecap="round" strokeWidth="9" />
      <circle cx="406" cy="266" fill="hsl(var(--primary) / 0.25)" r="24" />
    </BaseSvg>
  );
}

export function FAQArt({ className, title = "FAQ illustration" }: IllustrationProps) {
  return (
    <BaseSvg className={cn("h-full w-full", className)} title={title}>
      <circle cx="300" cy="172" fill="hsl(var(--background))" r="72" stroke="url(#ill-b)" strokeWidth="10" />
      <path d="M286 158C286 146 294 138 306 138C318 138 326 146 326 158C326 168 320 174 312 178C304 182 300 188 300 198" fill="none" stroke="hsl(var(--secondary) / 0.72)" strokeLinecap="round" strokeWidth="10" />
      <circle cx="300" cy="222" fill="hsl(var(--secondary) / 0.72)" r="6" />
      <path d="M174 320C224 282 376 282 426 320" fill="none" stroke="hsl(var(--secondary) / 0.35)" strokeLinecap="round" strokeWidth="10" />
    </BaseSvg>
  );
}

export function LocationMapArt({ className, title = "Location map illustration" }: IllustrationProps) {
  return <ClinicIllustration className={className} title={title} />;
}

export function TreatmentAqualyx({ className, title = "Aqualyx treatment illustration" }: IllustrationProps) {
  return <AqualyxIllustration className={className} title={title} />;
}

export function TreatmentLemonBottle({ className, title = "Lemon Bottle illustration" }: IllustrationProps) {
  return <LemonBottleIllustration className={className} title={title} />;
}

export function TreatmentFatFreezing({ className, title = "Fat freezing illustration" }: IllustrationProps) {
  return <FatFreezingIllustration className={className} title={title} />;
}

export function TreatmentCavitation({ className, title = "Cavitation illustration" }: IllustrationProps) {
  return <CavitationIllustration className={className} title={title} />;
}
