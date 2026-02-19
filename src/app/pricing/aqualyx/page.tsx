import { FatDissolvingPricingBlock } from "@/components/sections/pricing-blocks";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { WhatsAppPanel } from "@/components/site/whatsapp-panel";
import { ImageFrame } from "@/components/media/ImageFrame";
import { getAsset } from "@/content/assets";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Aqualyx Pricing Leeds",
  description: "Aqualyx pricing in Leeds with per-ml guide ranges and consultation-led quote confirmation.",
  path: "/pricing/aqualyx"
});

export default function AqualyxPricingPage() {
  return (
    <>
      <HeroShell
        eyebrow="Aqualyx Pricing"
        priceTeaser="From £99 per ml"
        subline="Per-ml guide pricing for Aqualyx in Leeds. Final quote is confirmed in consultation after suitability checks."
        title="Aqualyx Pricing in Leeds"
        typewriterPhrases={[
          "Transparent per-ml structure with area guidance",
          "Consultation confirms final dosage and quote",
          "WhatsApp us for quick pricing direction"
        ]}
        visual={<ImageFrame alt="Aqualyx pricing Leeds" illustration="pricing" preferPhoto src={getAsset("pricing", "hero")} />}
      />

      <Section>
        <FatDissolvingPricingBlock />
      </Section>

      <Section className="pt-0">
        <WhatsAppPanel title="Need a fast estimate?" />
      </Section>

      <Section className="pt-0">
        <CtaStrip />
      </Section>

      <Section>
        <SectionHeading title="Related links" />
        <InternalLinksBlock
          links={[
            {
              href: "/treatments/aqualyx",
              label: "Aqualyx treatment page",
              description: "Suitability, timeline, and FAQs."
            },
            {
              href: "/pricing/fat-dissolving",
              label: "Fat dissolving pricing",
              description: "Main per-ml pricing page."
            },
            {
              href: "/book",
              label: "Book Free Consultation",
              description: "Get your confirmed quote and plan."
            }
          ]}
        />
      </Section>
    </>
  );
}
