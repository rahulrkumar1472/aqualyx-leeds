import { Clock3 } from "lucide-react";
import { CTAActions } from "@/components/site/cta-actions";
import { QuickLeadForm } from "@/components/forms/quick-lead-form";
import { availabilityConfig } from "@/content/availability";

type FinalCTASectionProps = {
  title?: string;
  description?: string;
};

function compactHours() {
  const mon = availabilityConfig.openingHours.monday[0];
  const wed = availabilityConfig.openingHours.wednesday[0];
  const fri = availabilityConfig.openingHours.friday[0];
  const sat = availabilityConfig.openingHours.saturday[0];

  return [
    `Mon-Tue ${mon?.start ?? "Closed"}-${mon?.end ?? ""}`.replace(/-$/, ""),
    `Wed-Thu ${wed?.start ?? "Closed"}-${wed?.end ?? ""}`.replace(/-$/, ""),
    `Fri ${fri?.start ?? "Closed"}-${fri?.end ?? ""}`.replace(/-$/, ""),
    `Sat ${sat?.start ?? "Closed"}-${sat?.end ?? ""}`.replace(/-$/, ""),
    "Sun Closed"
  ].join(" • ");
}

export function FinalCTASection({
  title = "Book Free Consultation with Aqualyx Leeds",
  description = "Speak to us on WhatsApp, request your consultation online, or call the clinic directly."
}: FinalCTASectionProps) {
  return (
    <section className="rounded-[2rem] border border-secondary/18 bg-gradient-to-r from-secondary to-secondary/90 p-6 text-secondary-foreground shadow-soft">
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
        <div className="space-y-2">
          <h2 className="text-balance text-2xl font-semibold">{title}</h2>
          <p className="max-w-[62ch] text-sm text-secondary-foreground/86">{description}</p>
          <p className="inline-flex items-center gap-1.5 text-xs text-secondary-foreground/85">
            <Clock3 className="h-3.5 w-3.5" />
            {compactHours()}
          </p>
          <CTAActions compact trackingLocation="final_cta" />
        </div>
        <div className="rounded-[1.4rem] border border-secondary-foreground/20 bg-secondary-foreground/10 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.13em] text-secondary-foreground/90">
            Short enquiry form
          </p>
          <QuickLeadForm />
        </div>
      </div>
    </section>
  );
}
