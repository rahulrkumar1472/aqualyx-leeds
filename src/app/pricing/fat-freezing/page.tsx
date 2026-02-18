import { FatFreezingPricingBlock } from "@/components/sections/pricing-blocks";
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
  title: "Fat Freezing Pricing Leeds",
  description: "Fat freezing package pricing in Leeds with free extras and consultation-first suitability checks.",
  path: "/pricing/fat-freezing"
});

export default function FatFreezingPricingPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14" containerClassName="rounded-[2rem] border border-primary/20 bg-card/85 p-6 shadow-soft sm:p-10" variant="gradient">
        <SectionHeading
          eyebrow="Package Pricing"
          subtext="Fixed package prices with clear inclusions so you can compare value before booking."
          title="Fat Freezing Packages in Leeds"
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <CTACluster compact />
          <ImageFrame alt="Fat freezing pricing illustration" illustration="fatFreezing" />
        </div>
      </Section>

      <Section>
        <FatFreezingPricingBlock />
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
              description: "Compare with fat dissolving pathway."
            },
            {
              href: "/pricing/fat-dissolving",
              label: "Fat dissolving pricing",
              description: "Per-ml comparison page."
            },
            {
              href: "/book",
              label: "Book consultation",
              description: "Get area-specific recommendation."
            }
          ]}
          title="Related pricing links"
        />
      </Section>
    </>
  );
}

