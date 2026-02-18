import Link from "next/link";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { ImageFrame } from "@/components/media/ImageFrame";
import { SmartImage } from "@/components/media/smart-image";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CTACluster } from "@/components/layout/CTACluster";
import { InlineNotice } from "@/components/layout/InlineNotice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { assets, assetAt } from "@/content/assets";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Aqualyx Leeds Results",
  description: "Results page with treatment context visuals and case-study style examples from Aqualyx Leeds.",
  path: "/results"
});

const caseStudies = [
  {
    title: "Double chin contour pathway",
    summary: "Consultation-led staging with follow-up review over several weeks."
  },
  {
    title: "Lower abdomen planning",
    summary: "Area-by-area discussion and realistic timeline setting."
  },
  {
    title: "Flank/love handle strategy",
    summary: "Targeted treatment planning with practical aftercare guidance."
  }
];

export default function ResultsPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14" containerClassName="rounded-[2rem] border border-primary/20 bg-card/85 p-6 shadow-soft sm:p-10" variant="gradient">
        <SectionHeading
          eyebrow="Results"
          subtext="Visual context and case-study style summaries to help set realistic consultation expectations."
          title="Aqualyx Leeds Results"
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Results vary by person, area, baseline profile, and adherence to aftercare. This page is educational and
              not a guarantee of outcome.
            </p>
            <CTACluster compact />
          </div>
          <ImageFrame alt="Results illustration" illustration="aqualyx" />
        </div>
      </Section>

      <Section>
        <SectionHeading title="Results gallery" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <SmartImage
              alt={`Aqualyx Leeds gallery image ${index + 1}`}
              className="h-52"
              fill
              key={`gallery-${index}`}
              src={assetAt(assets.results, index)}
            />
          ))}
        </div>
        <div className="mt-4">
          <InlineNotice>
            Gallery assets are informational visuals. Suitability and expected response are reviewed in consultation.
          </InlineNotice>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeading title="Case-study style snapshots" />
        <div className="grid gap-4 md:grid-cols-3">
          {caseStudies.map((caseStudy, index) => (
            <Card className="border-border/70 shadow-soft" key={caseStudy.title}>
              <CardHeader>
                <CardTitle>{caseStudy.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <SmartImage alt={caseStudy.title} className="h-40" fill src={assetAt(assets.results, index + 2)} />
                <p>{caseStudy.summary}</p>
                <p className="text-xs">Outcomes vary and are reviewed individually during consultation.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/book">Book Free Consultation</Link>
          </Button>
          <Button asChild variant="ctaSecondary">
            <Link href="/treatments/aqualyx">Aqualyx pillar</Link>
          </Button>
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
              label: "Fat freezing",
              description: "Compare injection and cooling pathways."
            },
            {
              href: "/treatments/ultrasound-cavitation",
              label: "Ultrasound cavitation",
              description: "Review non-invasive ultrasound option."
            }
          ]}
          title="Results links"
        />
      </Section>
    </>
  );
}

