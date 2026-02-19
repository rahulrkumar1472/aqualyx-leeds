import { TreatmentPageTemplate } from "@/components/treatment-page";
import { FatDissolvingPricingBlock } from "@/components/sections/pricing-blocks";
import { getAsset } from "@/content/assets";
import { treatments } from "@/content/treatments";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Lemon Bottle in Leeds",
  description: "Lemon Bottle treatment page for Leeds with consultation, process, pricing and FAQ support.",
  path: "/treatments/lemon-bottle"
});

export default function LemonBottlePage() {
  const treatment = treatments.lemonBottle;

  return (
    <TreatmentPageTemplate
      areas={treatment.areas}
      illustration="lemonBottle"
      coverImage={getAsset("treatments/lemon-bottle", "hero")}
      intro="Lemon Bottle in Leeds is offered as a supporting treatment pathway where clinically appropriate after consultation."
      pricingSection={<FatDissolvingPricingBlock />}
      pricingTeaser="Per-ml model with final cost confirmed after assessment."
      relatedLinks={[
        { href: "/treatments/aqualyx", label: "Aqualyx", description: "Return to the main pillar page." },
        { href: "/pricing/fat-dissolving", label: "Fat Dissolving Pricing", description: "Review per-ml pricing details." },
        { href: "/book", label: "Book Free Consultation", description: "Start your booking request." },
        { href: "/treatments/fat-freezing", label: "Fat Freezing", description: "Compare against non-invasive packages." }
      ]}
      slug="lemon-bottle"
      steps={[
        "Suitability consultation and area planning",
        "Treatment protocol discussion and dosage estimate",
        "Session delivery and aftercare guidance",
        "Follow-up and timeline review"
      ]}
      suitability={treatment.suitability}
      timeline={[
        "Consultation and baseline planning",
        "Treatment appointment",
        "Post-session review window",
        "Further sessions if advised"
      ]}
      treatmentName="Lemon Bottle"
    />
  );
}
