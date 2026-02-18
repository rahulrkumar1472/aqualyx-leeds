import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/content/site";

export function WhatsAppFloat() {
  return (
    <a
      className="fixed bottom-20 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border border-primary/25 bg-primary text-primary-foreground shadow-[0_16px_34px_hsl(var(--primary)/0.38)] transition hover:-translate-y-0.5 hover:bg-primary/90 md:bottom-6"
      href={siteConfig.whatsappUrl}
      rel="noopener noreferrer"
      target="_blank"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
