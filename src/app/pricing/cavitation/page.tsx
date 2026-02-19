import { CavitationPricingBlock } from "@/components/sections/pricing-blocks";
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
  title: "Cavitation Pricing Leeds",
  description: "Ultrasound cavitation package pricing details for Leeds with transparent session-based options.",
  path: "/pricing/cavitation"
});

export default function CavitationPricingPage() {
  return (
    <>
      <HeroShell
        ctaCluster={<CTACluster compact />}
        eyebrow="Session Packages"
        priceTeaser="Packages from £59"
        subline="Use package options as a guide before your consultation and suitability review."
        title="Ultrasound Cavitation Pricing in Leeds"
        typewriterPhrases={[
          "Session-based non-invasive contour pricing.",
          "Compare package structure before booking.",
          "Chat on WhatsApp for quick plan guidance."
        ]}
        visual={<ImageFrame alt="Cavitation pricing illustration" illustration="pricing" preferPhoto src={getAsset("pricing", "gallery", 2)} />}
      />

      <Section>
        <CavitationPricingBlock />
      </Section>

      <Section className="pt-0">
        <WhatsAppPanel title="Need guidance on session packages?" />
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
