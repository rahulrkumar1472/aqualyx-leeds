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

