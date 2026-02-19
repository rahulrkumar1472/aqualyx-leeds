import { ShieldCheck, Star, Wallet, MapPin } from "lucide-react";
import { siteConfig } from "@/content/site";

const trustItems = [
  {
    label: siteConfig.trustBadges[0],
    icon: Star
  },
  {
    label: siteConfig.trustBadges[1],
    icon: Wallet
  },
  {
    label: siteConfig.trustBadges[2],
    icon: ShieldCheck
  },
  {
    label: siteConfig.trustBadges[3],
    icon: MapPin
  }
];

export function TrustStrip() {
  return (
    <div className="border-b border-border/70 bg-background/88">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-4 py-2 sm:px-6 lg:px-8">
        {trustItems.map((item) => (
          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-1 text-[11px] font-medium text-foreground shadow-soft sm:text-xs"
            key={item.label}
          >
            <item.icon className="h-3.5 w-3.5 text-primary" />
            {item.label}
          </span>
        ))}
        <a
          className="text-[11px] font-semibold text-primary underline-offset-4 hover:underline sm:text-xs"
          href={siteConfig.googleBusinessUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          View Google profile
        </a>
      </div>
    </div>
  );
}
