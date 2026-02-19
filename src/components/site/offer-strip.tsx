"use client";

import { usePathname } from "next/navigation";
import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { trackEvent } from "@/lib/track";

export function OfferStrip() {
  const pathname = usePathname();

  if (pathname.startsWith("/book")) return null;

  function openOffer() {
    if (typeof window === "undefined") return;
    trackEvent("cta_book_click", {
      location: "offer_strip"
    });
    window.dispatchEvent(new CustomEvent("aqualyx-open-offer"));
  }

  return (
    <div className="border-b border-primary/20 bg-[linear-gradient(180deg,hsl(var(--primary)/0.12),hsl(var(--primary)/0.06))]">
      <div className="mx-auto flex min-h-[34px] max-w-7xl items-center justify-between gap-2 px-3 py-1 text-[11px] sm:px-6 sm:text-xs lg:px-8">
        <p className="offer-strip-copy inline-flex min-w-0 items-center gap-1.5 font-medium text-secondary">
          <Gift className="h-3.5 w-3.5 text-primary" />
          {siteConfig.offerCopy}
        </p>
        <Button className="h-7 px-3 text-[11px] sm:h-8 sm:px-3.5" onClick={openOffer} size="sm" type="button" variant="ctaSecondary">
          Claim Offer
        </Button>
      </div>
    </div>
  );
}
