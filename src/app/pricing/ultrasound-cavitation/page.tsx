import { CavitationPricingBlock } from "@/components/sections/pricing-blocks";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { WhatsAppPanel } from "@/components/site/whatsapp-panel";
import { ImageFrame } from "@/components/media/ImageFrame";
import { getAsset } from "@/content/assets";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Ultrasound Cavitation Pricing Leeds",
  description: "Ultrasound cavitation pricing in Leeds with session package options and consultation-led recommendations.",
  path: "/pricing/ultrasound-cavitation"
});

export default function UltrasoundCavitationPricingPage() {
  return (
    <>
      <HeroShell
        eyebrow="Ultrasound Cavitation Pricing"
        priceTeaser="Packages from £59"
        subline="Session package pricing for non-invasive contour support. Final route is confirmed after consultation."
        title="Ultrasound Cavitation Pricing in Leeds"
        typewriterPhrases={[
          "Session package guidance before booking",
          "Consultation confirms suitable treatment route",
          "Quick pricing support on WhatsApp"
        ]}
        visual={<ImageFrame alt="Ultrasound cavitation pricing Leeds" illustration="cavitation" preferPhoto src={getAsset("pricing", "gallery", 3)} />}
      />

      <Section>
        <CavitationPricingBlock />
      </Section>

      <Section className="pt-0">
        <WhatsAppPanel title="Need help choosing package size?" />
      </Section>

      <Section className="pt-0">
        <CtaStrip />
      </Section>

      <Section>
        <InternalLinksBlock
          links={[
            {
              href: "/treatments/ultrasound-cavitation",
              label: "Cavitation treatment page",
              description: "Process, suitability, and expectations."
            },
            {
              href: "/pricing/cavitation",
              label: "Cavitation pricing page",
              description: "Current package options in Leeds."
            },
            {
              href: "/book",
              label: "Book Free Consultation",
              description: "Get personalised package recommendation."
            }
          ]}
        />
      </Section>
    </>
  );
}
