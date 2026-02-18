import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CTACluster } from "@/components/layout/CTACluster";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = buildMetadata({
  title: "Non-invasive Fat Reduction Leeds",
  description: "Compare fat freezing and cavitation options for non-invasive contour support in Leeds.",
  path: "/treatments/non-invasive-fat-reduction"
});

export default function NonInvasiveOverviewPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14" containerClassName="rounded-[2rem] border border-primary/20 bg-card/85 p-6 shadow-soft sm:p-10" variant="gradient">
        <SectionHeading
          eyebrow="Non-invasive Options"
          subtext="Explore cooling and ultrasound pathways with package-led planning and consultation-first suitability checks."
          title="Non-invasive Fat Reduction in Leeds"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <ImageFrame alt="Fat freezing illustration" illustration="fatFreezing" />
          <ImageFrame alt="Cavitation illustration" illustration="cavitation" />
        </div>
      </Section>

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

