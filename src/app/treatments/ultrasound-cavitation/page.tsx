import { TreatmentPageTemplate } from "@/components/treatment-page";
import { CavitationPricingBlock } from "@/components/sections/pricing-blocks";
import { assetAt, assets } from "@/content/assets";
import { treatments } from "@/content/treatments";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Ultrasound Cavitation in Leeds",
  description: "Ultrasound cavitation treatment page with package options, FAQs and consultation steps.",
  path: "/treatments/ultrasound-cavitation"
});

export default function CavitationPage() {
  const treatment = treatments.cavitation;

  return (
    <TreatmentPageTemplate
      areas={treatment.areas}
      illustration="cavitation"
      coverImage={assetAt(assets.treatments.cavitation, 0)}
      intro="Ultrasound Cavitation in Leeds supports non-invasive contouring plans through package-based sessions and structured reviews."
      pricingSection={<CavitationPricingBlock />}
      pricingTeaser="Session packages with clear pricing and staged treatment planning."
      relatedLinks={[
        { href: "/pricing/cavitation", label: "Cavitation Pricing", description: "View package options and session counts." },
        { href: "/treatments/fat-freezing", label: "Fat Freezing", description: "Compare non-invasive alternatives." },
        { href: "/book", label: "Book Free Consultation", description: "Book a consultation to choose your plan." },
        { href: "/treatments/lemon-bottle", label: "Lemon Bottle", description: "Review injection-based alternatives." }
      ]}
      slug="ultrasound-cavitation"
      steps={[
        "Consultation and treatment zone mapping",
        "Package and session schedule planning",
        "Ultrasound session delivery",
        "Progress review with adjustment recommendations"
      ]}
      suitability={treatment.suitability}
      timeline={[
        "Consultation and package selection",
        "Treatment series delivery",
        "Progress tracking during programme",
        "Final review and maintenance planning"
      ]}
      treatmentName="Ultrasound Cavitation"
    />
  );
}
