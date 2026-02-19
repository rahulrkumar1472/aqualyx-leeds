"use client";

import Link from "next/link";
import { MessageCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { trackEvent } from "@/lib/track";
import { cn } from "@/lib/utils";

type CTAActionsProps = {
  className?: string;
  compact?: boolean;
  bookHref?: string;
  primaryLabel?: string;
  trackingLocation?: string;
  includeCall?: boolean;
};

export function CTAActions({
  className,
  compact = false,
  bookHref = "/book",
  primaryLabel = "Book Free Consultation",
  trackingLocation = "cta_actions",
  includeCall = true
}: CTAActionsProps) {
  const size = compact ? "default" : "lg";

  return (
    <div className={cn("flex flex-wrap gap-2.5", className)}>
      <Button asChild size={size}>
        <Link
          href={bookHref}
          onClick={() =>
            trackEvent("cta_book_click", {
              location: trackingLocation,
              href: bookHref
            })
          }
        >
          {primaryLabel}
        </Link>
      </Button>
      <Button asChild size={size} variant="ctaSecondary">
        <a
          href={siteConfig.whatsappUrl}
          onClick={() =>
            trackEvent("cta_whatsapp_click", {
              location: trackingLocation
            })
          }
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="inline-flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </span>
        </a>
      </Button>
      {includeCall ? (
        <Button asChild size={size} variant="ctaTertiary">
          <a
            href={siteConfig.phoneHref}
            onClick={() =>
              trackEvent("cta_call_click", {
                location: trackingLocation
              })
            }
          >
            <span className="inline-flex items-center gap-1.5">
              <PhoneCall className="h-4 w-4" />
              Call
            </span>
          </a>
        </Button>
      ) : null}
    </div>
  );
}
