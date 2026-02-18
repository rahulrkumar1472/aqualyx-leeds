import { TreatmentPageTemplate } from "@/components/treatment-page";
import { FatDissolvingPricingBlock } from "@/components/sections/pricing-blocks";
import { assetAt, assets } from "@/content/assets";
import { pricingConfig } from "@/content/pricing";
import { treatments } from "@/content/treatments";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Aqualyx in Leeds",
  description: "Aqualyx Leeds pillar page covering suitability, areas, process, week-by-week timeline, safety and pricing.",
  path: "/treatments/aqualyx",
  keywords: ["Aqualyx Leeds", "Aqualyx injections Leeds", "fat dissolving injections Leeds"]
});

export default function AqualyxPage() {
  const treatment = treatments.aqualyx;

  return (
    <TreatmentPageTemplate
      areas={treatment.areas}
      illustration="aqualyx"
      coverImage={assetAt(assets.treatments.aqualyx, 0)}
      intro="Aqualyx Leeds provides a premium clinical pathway for targeted fat dissolving injections, including treatment planning, suitability checks and aftercare guidance."
      pricingSection={<FatDissolvingPricingBlock />}
      pricingTeaser={`From ${pricingConfig.fatDissolving.pricePerMl} per ml with final cost confirmed after assessment.`}
      relatedLinks={[
        {
          href: "/pricing/fat-dissolving",
          label: "Fat Dissolving Pricing",
          description: "Review the per-ml model and area guidance."
        },
        {
          href: "/book",
          label: "Book Free Consultation",
          description: "Complete the booking flow and request your appointment."
        },
        {
          href: "/locations/leeds",
          label: "Leeds Clinic",
          description: "View map, directions and local clinic details."
        },
        {
          href: "/locations/near-leeds",
          label: "Areas Near Leeds",
          description: "Explore nearby Leeds locations served by the clinic."
        },
        {
          href: "/treatments/fat-freezing",
          label: "Fat Freezing",
          description: "Compare injection and cryolipolysis pathways."
        }
      ]}
      slug="aqualyx"
      steps={[
        "Before treatment: consultation, suitability checks and tailored area planning.",
        "During treatment: targeted injections delivered according to the agreed treatment plan.",
        "After treatment: aftercare guidance and follow-up expectations are explained.",
        "Review stage: outcomes are reviewed and next-session timing is confirmed if needed."
      ]}
      suitability={[
        "Adults close to their goal weight with localised stubborn fat pockets.",
        "Patients seeking non-surgical contouring rather than overall weight-loss treatment.",
        "Those able to follow aftercare and attend review appointments."
      ]}
      timeline={[
        "Week 1: focus on aftercare and expected early treatment response.",
        "Weeks 2-3: gradual visible change may begin in treated areas.",
        "Weeks 4-6: contour changes become clearer for many clients.",
        "Review appointment: outcomes assessed and next steps discussed."
      ]}
      treatmentName="Aqualyx"
    />
  );
}
