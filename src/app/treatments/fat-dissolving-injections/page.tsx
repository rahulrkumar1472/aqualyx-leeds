import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CTACluster } from "@/components/layout/CTACluster";
import { InlineNotice } from "@/components/layout/InlineNotice";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = buildMetadata({
  title: "Fat Dissolving Injections Leeds",
  description: "Overview of Aqualyx and Lemon Bottle pathways with consultation-first planning in Leeds.",
  path: "/treatments/fat-dissolving-injections"
});

export default function FatDissolvingOverviewPage() {
  return (
    <>
      <HeroShell
        eyebrow="Injection Pathways"
        subline="Aqualyx is the primary pillar service, with Lemon Bottle as a supporting option where suitable."
        title="Fat Dissolving Injections in Leeds"
        typewriterPhrases={[
          "Consultation-led area planning before any treatment",
          "Transparent per-ml pricing and realistic timelines",
          "Book online or message us on WhatsApp"
        ]}
        visual={<ImageFrame alt="Fat dissolving treatment options" illustration="aqualyx" />}
      />

      <Section>
        <SectionHeading actions={<CTACluster compact includeCall={false} />} title="Choose your treatment guide" />
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle>Aqualyx (primary)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Pillar page covering process, safety, timeline, FAQs, and Leeds-focused booking pathways.</p>
              <Button asChild>
                <Link href="/treatments/aqualyx">View Aqualyx guide</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle>Lemon Bottle (supporting)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Supporting page for comparison where a consultation identifies this route as suitable.</p>
              <Button asChild variant="outline">
                <Link href="/treatments/lemon-bottle">View Lemon Bottle guide</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="mt-5">
          <InlineNotice>
            Treatment suitability and final dosage are confirmed only after in-person assessment.
          </InlineNotice>
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
              label: "Lemon Bottle",
              description: "Compare supporting injection pathway."
            },
            {
              href: "/treatments/fat-freezing",
              label: "Fat Freezing",
              description: "Compare with non-invasive package treatment."
            }
          ]}
          title="Injection treatment links"
        />
      </Section>
    </>
  );
}
