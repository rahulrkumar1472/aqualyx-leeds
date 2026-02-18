import { CavitationPricingBlock } from "@/components/sections/pricing-blocks";
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
  title: "Cavitation Pricing Leeds",
  description: "Ultrasound cavitation package pricing details for Leeds with transparent session-based options.",
  path: "/pricing/cavitation"
});

export default function CavitationPricingPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14" containerClassName="rounded-[2rem] border border-primary/20 bg-card/85 p-6 shadow-soft sm:p-10" variant="gradient">
        <SectionHeading
          eyebrow="Session Packages"
          subtext="Use package options as a guide before your consultation and suitability review."
          title="Ultrasound Cavitation Pricing in Leeds"
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <CTACluster compact />
          <ImageFrame alt="Cavitation pricing illustration" illustration="cavitation" />
        </div>
      </Section>

      <Section>
        <CavitationPricingBlock />
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
              description: "Compare injections and cavitation."
            },
            {
              href: "/treatments/fat-freezing",
              label: "Fat freezing",
              description: "Compare non-invasive alternatives."
            },
            {
              href: "/book",
              label: "Book consultation",
              description: "Receive a tailored recommendation."
            }
          ]}
          title="Related pricing links"
        />
      </Section>
    </>
  );
}

