import Link from "next/link";
import { BadgeCheck, ExternalLink, MapPin, ShieldCheck, Star, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/content/site";

type TrustStackProps = {
  adminPreview?: boolean;
};

export function TrustStack({ adminPreview = false }: TrustStackProps) {
  const hasGoogle = Boolean(siteConfig.trust.google.profileUrl);
  const hasTrustpilot = Boolean(siteConfig.trust.trustpilot.profileUrl);
  const featuredVerified = siteConfig.trust.featuredOn.filter((item) => item.isVerified && item.url);
  const featuredPending = siteConfig.trust.featuredOn.filter((item) => !item.isVerified || !item.url);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {hasGoogle ? (
          <Card className="border-border/70 shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="inline-flex items-center gap-2 text-base">
                <Star className="h-4 w-4 text-primary" />
                Google rating
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p className="text-lg font-semibold text-foreground">
                {siteConfig.trust.google.ratingValue}★
                {siteConfig.trust.google.ratingCount ? ` (${siteConfig.trust.google.ratingCount})` : ""}
              </p>
              <p>Rating sourced from Google Business Profile.</p>
              <a
                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                href={siteConfig.trust.google.profileUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                View Google Reviews <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </CardContent>
          </Card>
        ) : null}

        {hasTrustpilot && siteConfig.trust.trustpilot.ratingValue ? (
          <Card className="border-border/70 shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="inline-flex items-center gap-2 text-base">
                <BadgeCheck className="h-4 w-4 text-primary" />
                Trustpilot rating
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p className="text-lg font-semibold text-foreground">
                {siteConfig.trust.trustpilot.ratingValue}★
                {siteConfig.trust.trustpilot.reviewCount ? ` (${siteConfig.trust.trustpilot.reviewCount})` : ""}
              </p>
              <p>Rating sourced from Trustpilot profile.</p>
              <a
                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                href={siteConfig.trust.trustpilot.profileUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                View Trustpilot profile <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </CardContent>
          </Card>
        ) : null}

        <Card className="border-border/70 shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="inline-flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4 text-primary" />
              Local positioning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>{siteConfig.trust.valuePositioning.localClinic}</p>
            <p>{siteConfig.trust.valuePositioning.affordability}</p>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="inline-flex items-center gap-2 text-base">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Price match policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>{siteConfig.trust.valuePositioning.priceMatch}</p>
            <Link className="inline-flex items-center gap-1 font-semibold text-primary hover:underline" href={siteConfig.trust.valuePositioning.priceMatchPath}>
              Read policy
            </Link>
          </CardContent>
        </Card>
      </div>

      {featuredVerified.length ? (
        <Card className="border-border/70 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">As seen on (verified)</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {featuredVerified.map((item) => (
              <a
                className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-card px-3 py-1.5 text-sm font-medium text-foreground"
                href={item.url}
                key={item.name}
                rel="noopener noreferrer"
                target="_blank"
              >
                {item.name}
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
              </a>
            ))}
          </CardContent>
        </Card>
      ) : null}

      {adminPreview && featuredPending.length ? (
        <Card className="hidden border-dashed border-border/80 bg-muted/30 shadow-soft md:block">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-base">
              <Wallet className="h-4 w-4 text-primary" />
              Verification pending (admin preview)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {featuredPending.map((item) => item.name).join(", ")}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
