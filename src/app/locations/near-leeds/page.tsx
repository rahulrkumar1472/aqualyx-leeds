import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { nearLeedsAreas } from "@/content/locations";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = buildMetadata({
  title: "Areas Near Leeds",
  description: "Aqualyx Leeds serves Leeds and surrounding areas through one consultation-led clinic pathway.",
  path: "/locations/near-leeds"
});

export default function NearLeedsPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14" containerClassName="rounded-[2rem] border border-primary/20 bg-card/85 p-6 shadow-soft sm:p-10" variant="gradient">
        <SectionHeading
          eyebrow="Local Coverage"
          subtext="Serving Leeds and surrounding areas from one LS11 clinic with transparent pricing and fast booking support."
          title="Areas near Leeds"
        />
        <ImageFrame alt="Near Leeds coverage illustration" illustration="clinic" className="min-h-[260px]" />
      </Section>

      <Section>
        <SectionHeading title="Choose your local area page" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {nearLeedsAreas.map((area) => (
            <Card className="border-border/70 shadow-soft" key={area.slug}>
              <CardHeader>
                <CardTitle>{area.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>{area.intro}</p>
                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="outline">
                    <Link href={`/locations/areas/${area.slug}`}>Aqualyx in {area.name}</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/book">Book</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
              description: "Primary treatment page for local intent."
            },
            {
              href: "/pricing/fat-dissolving",
              label: "Fat dissolving pricing",
              description: "Per-ml guide for nearby-area visitors."
            },
            {
              href: "/book",
              label: "Book consultation",
              description: "Submit booking request online."
            }
          ]}
          title="Near-Leeds links"
        />
      </Section>
    </>
  );
}

