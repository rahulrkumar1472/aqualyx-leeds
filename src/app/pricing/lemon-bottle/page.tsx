import Link from "next/link";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { WhatsAppPanel } from "@/components/site/whatsapp-panel";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAsset } from "@/content/assets";
import { pricingConfig } from "@/content/pricing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Lemon Bottle Pricing Leeds",
  description:
    "Lemon Bottle pricing guidance in Leeds with consultation-led planning and transparent quote confirmation.",
  path: "/pricing/lemon-bottle"
});

export default function LemonBottlePricingPage() {
  return (
    <>
      <HeroShell
        eyebrow="Lemon Bottle Pricing"
        priceTeaser="Guide pricing shown • Final quote after consultation"
        subline="Lemon Bottle is discussed as a supporting fat dissolving option. Suitability and dosage are confirmed in consultation."
        title="Lemon Bottle Pricing in Leeds"
        typewriterPhrases={[
          "Consultation confirms whether this route is suitable",
          "Area and dosage planning determine final quote",
          "Message us on WhatsApp for quick guidance"
        ]}
        visual={<ImageFrame alt="Lemon Bottle pricing Leeds" illustration="lemonBottle" preferPhoto src={getAsset("treatments/lemon-bottle", "hero")} />}
      />

      <Section>
        <SectionHeading title="Pricing guidance" />
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle>Typical pricing structure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Consultation-led estimate by area and suitability findings.</p>
              <p>• Dosage planning may vary between treatment areas.</p>
              <p>• Final quote is confirmed in person before treatment.</p>
              <p className="text-xs">
                For a per-ml benchmark, many clients first review the fat dissolving guide from{" "}
                {pricingConfig.fatDissolving.pricePerMl} per ml.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button asChild>
                  <Link href="/pricing/fat-dissolving">View per-ml guide</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/book">Book Free Consultation</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <WhatsAppPanel />
        </div>
      </Section>

      <Section className="pt-0">
        <CtaStrip />
      </Section>

      <Section>
        <InternalLinksBlock
          links={[
            {
              href: "/treatments/lemon-bottle",
              label: "Lemon Bottle treatment page",
              description: "Suitability and process overview."
            },
            {
              href: "/pricing/fat-dissolving",
              label: "Fat dissolving pricing",
              description: "Per-ml benchmark and area ranges."
            },
            {
              href: "/book",
              label: "Book Free Consultation",
              description: "Receive your confirmed quote pathway."
            }
          ]}
        />
      </Section>
    </>
  );
}
