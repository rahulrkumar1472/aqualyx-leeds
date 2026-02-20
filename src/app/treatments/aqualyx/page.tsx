import { TreatmentPageTemplate } from "@/components/treatment-page";
import { FatDissolvingPricingBlock } from "@/components/sections/pricing-blocks";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ComparisonTable } from "@/components/ui/comparison-table";
import { getAsset } from "@/content/assets";
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
  const comparisonRows = [
    {
      feature: "Best fit",
      aqualyx: "Localised stubborn fat pockets after suitability review",
      alternatives: "May suit different profiles depending on modality"
    },
    {
      feature: "Planning method",
      aqualyx: "Per-area dosage planning and staged review",
      alternatives: "Package/session planning based on selected treatment"
    },
    {
      feature: "Timeline profile",
      aqualyx: "Gradual progress over planned weeks",
      alternatives: "Also gradual and varies by treatment route"
    }
  ];

  return (
    <TreatmentPageTemplate
      areas={treatment.areas}
      areaLinks={{
        "Double chin": "/treatments/aqualyx/double-chin",
        "Love handles": "/treatments/aqualyx/love-handles",
        "Lower stomach": "/treatments/aqualyx/lower-stomach",
        Thighs: "/treatments/aqualyx/thighs",
        Arms: "/treatments/aqualyx/arms",
        "Back fat": "/treatments/aqualyx/back-fat"
      }}
      illustration="aqualyx"
      coverImage={getAsset("treatments/aqualyx", "hero")}
      intro="Aqualyx Leeds provides a premium clinical pathway for targeted fat dissolving injections, including treatment planning, suitability checks and aftercare guidance."
      pricingSection={<FatDissolvingPricingBlock />}
      comparisonSection={
        <>
          <SectionHeading
            eyebrow="Comparison"
            subtext="Informational overview only. Consultation confirms the most appropriate option for your goals."
            title="Aqualyx compared with other contour routes"
          />
          <ComparisonTable rows={comparisonRows} />
        </>
      }
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
