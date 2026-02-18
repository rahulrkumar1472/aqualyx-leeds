"use client";

import Link from "next/link";
import { MessageCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { trackEvent } from "@/lib/track";

export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-2.5 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        <Button asChild>
          <Link
            href="/book"
            onClick={() =>
              trackEvent("cta_book_click", {
                location: "mobile_sticky"
              })
            }
          >
            Book Free Consultation
          </Link>
        </Button>
        <Button asChild variant="ctaSecondary">
          <a
            href={siteConfig.whatsappUrl}
            onClick={() =>
              trackEvent("cta_whatsapp_click", {
                location: "mobile_sticky"
              })
            }
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </span>
          </a>
        </Button>
        <Button asChild variant="ctaTertiary">
          <a
            href={siteConfig.phoneHref}
            onClick={() =>
              trackEvent("cta_call_click", {
                location: "mobile_sticky"
              })
            }
          >
            <span className="inline-flex items-center gap-1">
              <PhoneCall className="h-3.5 w-3.5" />
              Call
            </span>
          </a>
        </Button>
      </div>
    </div>
  );
}
