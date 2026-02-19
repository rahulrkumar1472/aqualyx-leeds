import { TreatmentPageTemplate } from "@/components/treatment-page";
import { FatFreezingPricingBlock } from "@/components/sections/pricing-blocks";
import { getAsset } from "@/content/assets";
import { pricingConfig } from "@/content/pricing";
import { treatments } from "@/content/treatments";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Fat Freezing in Leeds",
  description: "Cryolipolysis treatment information in Leeds including package pricing and consultation details.",
  path: "/treatments/fat-freezing"
});

export default function FatFreezingPage() {
  const treatment = treatments.fatFreezing;

  return (
    <TreatmentPageTemplate
      areas={treatment.areas}
      illustration="fatFreezing"
      coverImage={getAsset("treatments/fat-freezing", "hero")}
      intro="Fat Freezing (Cryolipolysis) in Leeds is designed for non-invasive contour support with package-led pricing and consultation planning."
      pricingSection={<FatFreezingPricingBlock />}
      pricingTeaser={`Packages from £${pricingConfig.fatFreezingPackages[0].priceGbp} with bundled treatment extras on selected plans.`}
      relatedLinks={[
        { href: "/pricing/fat-freezing", label: "Fat Freezing Packages", description: "View full package and bonus breakdown." },
        { href: "/treatments/ultrasound-cavitation", label: "Ultrasound Cavitation", description: "Compare with cavitation sessions." },
        { href: "/book", label: "Book Free Consultation", description: "Request a recommendation by area." },
        { href: "/treatments/lemon-bottle", label: "Lemon Bottle", description: "Compare supporting injection options." }
      ]}
      slug="fat-freezing"
      steps={[
        "Assessment of pinchable fat areas and suitability",
        "Applicator and package planning",
        "Cryolipolysis session and post-treatment guidance",
        "Progress review and next-step recommendations"
      ]}
      suitability={treatment.suitability}
      timeline={[
        "Consultation and package planning",
        "Treatment appointment",
        "Monitoring over following weeks",
        "Outcome review and optional follow-up"
      ]}
      treatmentName="Fat Freezing"
    />
  );
}
