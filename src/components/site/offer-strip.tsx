"use client";

import { usePathname } from "next/navigation";
import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-[11px] sm:px-6 sm:text-xs lg:px-8">
        <p className="inline-flex items-center gap-1.5 font-medium text-secondary">
          <Gift className="h-3.5 w-3.5 text-primary" />
          Limited availability: claim 25% off + free coaching
        </p>
        <Button className="h-8 px-3.5 text-[11px]" onClick={openOffer} size="sm" type="button" variant="ctaSecondary">
          Claim Offer
        </Button>
      </div>
    </div>
  );
}
