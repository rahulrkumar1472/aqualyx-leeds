"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { trackEvent } from "@/lib/track";

type CTAClusterProps = {
  compact?: boolean;
  bookHref?: string;
  includeCall?: boolean;
  primaryLabel?: string;
  className?: string;
};

export function CTACluster({
  compact = false,
  bookHref = "/book",
  includeCall = true,
  primaryLabel = "Book Free Consultation",
  className
}: CTAClusterProps) {
  const size = compact ? "default" : "lg";

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2.5">
        <Button asChild size={size}>
          <Link
            href={bookHref}
            onClick={() =>
              trackEvent("cta_book_click", {
                location: "cta_cluster",
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
                location: "cta_cluster"
              })
            }
            rel="noopener noreferrer"
            target="_blank"
          >
            WhatsApp
          </a>
        </Button>
        {includeCall ? (
          <Button asChild size={size} variant="ctaTertiary">
            <a
              href={siteConfig.phoneHref}
              onClick={() =>
                trackEvent("cta_call_click", {
                  location: "cta_cluster"
                })
              }
            >
              <span className="inline-flex items-center gap-1.5">
                <Phone className="h-4 w-4" /> Call
              </span>
            </a>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
