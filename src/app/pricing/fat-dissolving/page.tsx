import { FatDissolvingPricingBlock } from "@/components/sections/pricing-blocks";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { WhatsAppPanel } from "@/components/site/whatsapp-panel";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CTACluster } from "@/components/layout/CTACluster";
import { ImageFrame } from "@/components/media/ImageFrame";
import { getAsset } from "@/content/assets";
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
      <HeroShell
        ctaCluster={<CTACluster compact />}
        eyebrow="Per-ml Guide"
        priceTeaser="From £99 per ml"
        subline="Guide pricing for educational planning. Final cost is confirmed after in-person suitability assessment."
        title="Fat Dissolving Pricing in Leeds"
        typewriterPhrases={[
          "Price is confirmed after area and suitability review.",
          "Transparent per-ml model with typical range guidance.",
          "Message us on WhatsApp for quick quote support."
        ]}
        visual={<ImageFrame alt="Aqualyx pricing illustration" illustration="pricing" preferPhoto src={getAsset("pricing", "hero")} />}
      />

      <Section>
        <FatDissolvingPricingBlock />
      </Section>

      <Section className="pt-0">
        <WhatsAppPanel title="Need a dosage estimate first?" />
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
