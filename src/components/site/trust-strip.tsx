import Link from "next/link";
import { BadgeCheck, ExternalLink, MapPin, ShieldCheck, Star, Wallet } from "lucide-react";
import { siteConfig } from "@/content/site";

type TrustStripProps = {
  previewUnverified?: boolean;
};

export function TrustStrip({ previewUnverified = false }: TrustStripProps) {
  const hasGoogleProfile = Boolean(siteConfig.trust.google.profileUrl);
  const hasTrustpilotProfile = Boolean(siteConfig.trust.trustpilot.profileUrl);

  const verifiedFeatured = siteConfig.trust.featuredOn.filter((item) => item.isVerified && item.url);
  const pendingFeatured = siteConfig.trust.featuredOn.filter((item) => !item.isVerified || !item.url);

  const valueItems = [
    {
      label: siteConfig.trust.valuePositioning.localClinic,
      compactLabel: "Leeds clinic (LS11)",
      icon: MapPin
    },
    {
      label: siteConfig.trust.valuePositioning.affordability,
      compactLabel: "Affordable Leeds options",
      icon: Wallet
    },
    {
      label: siteConfig.trust.valuePositioning.priceMatch,
      compactLabel: "Price match policy",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="border-b border-border/70 bg-background/88">
      <div className="mx-auto max-w-7xl px-3 py-2 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-start gap-1.5 sm:justify-center sm:gap-2">
          {hasGoogleProfile ? (
            <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-border/70 bg-card px-2.5 py-1 text-[10px] font-medium text-foreground shadow-soft sm:px-3 sm:text-xs">
              <Star className="h-3.5 w-3.5 shrink-0 text-primary" />
              Rated {siteConfig.trust.google.ratingValue}★ on Google
            </span>
          ) : null}

          {hasTrustpilotProfile && siteConfig.trust.trustpilot.ratingValue ? (
            <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-border/70 bg-card px-2.5 py-1 text-[10px] font-medium text-foreground shadow-soft sm:px-3 sm:text-xs">
              <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
              Rated {siteConfig.trust.trustpilot.ratingValue}★ on Trustpilot
            </span>
          ) : null}

          {valueItems.map((item) => (
            <span
              className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-border/70 bg-card px-2.5 py-1 text-[10px] font-medium text-foreground shadow-soft sm:px-3 sm:text-xs"
              key={item.label}
            >
              <item.icon className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="sm:hidden">{item.compactLabel}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </span>
          ))}
        </div>

        <div className="mt-1 flex flex-wrap items-center justify-start gap-3 sm:justify-center">
          {hasGoogleProfile ? (
            <a
              className="text-[10px] font-semibold text-primary underline-offset-4 hover:underline sm:text-xs"
              href={siteConfig.trust.google.profileUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              View Google Reviews
            </a>
          ) : null}

          <Link
            className="text-[10px] font-semibold text-primary underline-offset-4 hover:underline sm:text-xs"
            href={siteConfig.trust.valuePositioning.priceMatchPath}
          >
            Price match terms
          </Link>
        </div>
      </div>

      {verifiedFeatured.length ? (
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 border-t border-border/60 px-4 py-1.5 sm:px-6 lg:px-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Featured in
          </p>
          {verifiedFeatured.map((item) => (
            <a
              className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-card px-2.5 py-1 text-[10px] font-medium text-foreground shadow-soft sm:text-[11px]"
              href={item.url}
              key={item.name}
              rel="noopener noreferrer"
              target="_blank"
            >
              {item.name}
              <ExternalLink className="h-3 w-3 text-muted-foreground" />
            </a>
          ))}
        </div>
      ) : null}

      {previewUnverified && pendingFeatured.length ? (
        <div className="hidden border-t border-border/60 bg-muted/35 px-4 py-1.5 text-[11px] text-muted-foreground md:block">
          Verification pending: {pendingFeatured.map((item) => item.name).join(", ")}
        </div>
      ) : null}
      <p className="sr-only">Rating sourced from linked review profiles where shown.</p>
    </div>
  );
}
