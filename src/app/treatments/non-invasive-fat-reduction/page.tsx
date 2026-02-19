import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CTACluster } from "@/components/layout/CTACluster";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAsset } from "@/content/assets";

export const metadata = buildMetadata({
  title: "Non-invasive Fat Reduction Leeds",
  description: "Compare fat freezing and cavitation options for non-invasive contour support in Leeds.",
  path: "/treatments/non-invasive-fat-reduction"
});

export default function NonInvasiveOverviewPage() {
  return (
    <>
      <HeroShell
        eyebrow="Non-invasive Options"
        subline="Explore cooling and ultrasound pathways with package-led planning and consultation-first suitability checks."
        title="Non-invasive Fat Reduction in Leeds"
        typewriterPhrases={[
          "Compare cryolipolysis and cavitation routes",
          "Consultation confirms what may suit your goals",
          "Quick WhatsApp guidance before booking"
        ]}
        visual={
          <ImageFrame
            alt="Non-invasive fat reduction options"
            illustration="fatFreezing"
            preferPhoto
            src={getAsset("treatments/fat-freezing", "hero")}
          />
        }
      />

      <Section>
        <SectionHeading actions={<CTACluster compact includeCall={false} />} title="Choose your non-invasive route" />
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle>Fat Freezing (Cryolipolysis)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Cooling-based packages for suitable pinchable fat areas with staged review.</p>
              <Button asChild>
                <Link href="/treatments/fat-freezing">View Fat Freezing</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle>Ultrasound Cavitation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Session-based ultrasound contour support with package structure and follow-up checkpoints.</p>
              <Button asChild variant="outline">
                <Link href="/treatments/ultrasound-cavitation">View Cavitation</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="pt-0">
        <CtaStrip />
      </Section>

      <Section>
        <InternalLinksBlock
          links={[
            {
              href: "/treatments/fat-freezing",
              label: "Fat Freezing",
              description: "View packages and suitability checklist."
            },
            {
              href: "/treatments/ultrasound-cavitation",
              label: "Ultrasound Cavitation",
              description: "Review session options in Leeds."
            }
          ]}
          title="Non-invasive links"
        />
      </Section>
    </>
  );
}
