import { FatDissolvingPricingBlock } from "@/components/sections/pricing-blocks";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CTACluster } from "@/components/layout/CTACluster";
import { ImageFrame } from "@/components/media/ImageFrame";
import { pricingFaqs } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Fat Dissolving Pricing Leeds",
  description: "Per-ml Aqualyx pricing details for Leeds with area ranges, inclusions, and quote guidance.",
  path: "/pricing/fat-dissolving"
});

export default function FatDissolvingPricingPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14" containerClassName="rounded-[2rem] border border-primary/20 bg-card/85 p-6 shadow-soft sm:p-10" variant="gradient">
        <SectionHeading
          eyebrow="Per-ml Guide"
          subtext="Guide pricing for educational planning. Final cost is confirmed after in-person suitability assessment."
          title="Fat Dissolving Pricing in Leeds"
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <CTACluster compact />
          <ImageFrame alt="Aqualyx pricing illustration" illustration="aqualyx" />
        </div>
      </Section>

      <Section>
        <FatDissolvingPricingBlock />
      </Section>

      <Section variant="muted">
        <SectionHeading title="Pricing FAQs" />
        <FaqAccordion items={pricingFaqs} />
      </Section>

      <Section className="pt-0">
        <CtaStrip />
      </Section>

      <Section>
        <InternalLinksBlock
          links={[
            {
              href: "/treatments/aqualyx",
              label: "Aqualyx pillar",
              description: "Process, timeline, and suitability guide."
            },
            {
              href: "/book",
              label: "Book consultation",
              description: "Request appointment online."
            },
            {
              href: "/faqs",
              label: "FAQs",
              description: "More answers on safety and expectations."
            }
          ]}
          title="Related pricing links"
        />
      </Section>
    </>
  );
}

