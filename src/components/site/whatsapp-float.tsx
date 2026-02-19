"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/content/site";
import { trackEvent } from "@/lib/track";

export function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float fixed bottom-[calc(var(--mobile-cta-h)+env(safe-area-inset-bottom)+16px)] right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border border-primary/25 bg-primary text-primary-foreground shadow-[0_16px_34px_hsl(var(--primary)/0.38)] transition hover:-translate-y-0.5 hover:bg-primary/90 md:bottom-6"
      href={siteConfig.whatsappUrl}
      onClick={() =>
        trackEvent("cta_click", {
          location: "whatsapp_float",
          type: "whatsapp"
        })
      }
      rel="noopener noreferrer"
      target="_blank"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
