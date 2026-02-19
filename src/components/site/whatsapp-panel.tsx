import { MessageCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";

type WhatsAppPanelProps = {
  title?: string;
  description?: string;
  className?: string;
};

export function WhatsAppPanel({
  title = "Need a quick answer?",
  description = "Message Aqualyx Leeds on WhatsApp for fast guidance on areas, pricing, and next steps.",
  className
}: WhatsAppPanelProps) {
  return (
    <aside className={`rounded-[1.7rem] border border-primary/25 bg-hero-mesh p-5 shadow-soft ${className ?? ""}`}>
      <h3 className="text-lg font-semibold text-secondary">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button asChild variant="ctaSecondary">
          <a href={siteConfig.whatsappUrl} rel="noopener noreferrer" target="_blank">
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </span>
          </a>
        </Button>
        <Button asChild variant="ctaTertiary">
          <a href={siteConfig.phoneHref}>
            <span className="inline-flex items-center gap-1.5">
              <PhoneCall className="h-4 w-4" />
              Call {siteConfig.phoneDisplay}
            </span>
          </a>
        </Button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Consultation required. Final treatment plan and pricing are confirmed after assessment.
      </p>
    </aside>
  );
}
