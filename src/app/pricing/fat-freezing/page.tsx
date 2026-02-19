import { FatFreezingPricingBlock } from "@/components/sections/pricing-blocks";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { WhatsAppPanel } from "@/components/site/whatsapp-panel";
import { HeroShell } from "@/components/layout/HeroShell";
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
      <HeroShell
        ctaCluster={<CTACluster compact />}
        eyebrow="Package Pricing"
        priceTeaser="Packages from £49"
        subline="Fixed package prices with clear inclusions so you can compare value before booking."
        title="Fat Freezing Packages in Leeds"
        typewriterPhrases={[
          "Package-led options with listed inclusions.",
          "Compare value before you book consultation.",
          "WhatsApp us for a quick package recommendation."
        ]}
        visual={<ImageFrame alt="Fat freezing pricing illustration" illustration="pricing" />}
      />

      <Section>
        <FatFreezingPricingBlock />
      </Section>

      <Section className="pt-0">
        <WhatsAppPanel title="Need help choosing a package?" />
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
