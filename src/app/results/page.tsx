import Link from "next/link";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { ImageFrame } from "@/components/media/ImageFrame";
import { SmartImage } from "@/components/media/SmartImage";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { InlineNotice } from "@/components/layout/InlineNotice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { assets, assetAt, getAsset } from "@/content/assets";
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

const outcomeFactors = [
  "Baseline body profile and target area",
  "Session plan and dosage strategy",
  "Aftercare consistency",
  "Review timing and staged treatment decisions"
];

const expectationRows = [
  {
    stage: "Early response",
    timeline: "First week",
    note: "Some expected short-term treatment response while aftercare is followed."
  },
  {
    stage: "Gradual contour change",
    timeline: "Weeks 2-4",
    note: "Visible progression may appear gradually and differs by person."
  },
  {
    stage: "Review checkpoint",
    timeline: "Weeks 4-8",
    note: "Progress is assessed and next steps are confirmed if suitable."
  }
];

export default function ResultsPage() {
  return (
    <>
      <HeroShell
        eyebrow="Results"
        subline="Visual context and case-study style summaries to help set realistic consultation expectations."
        title="Aqualyx Leeds Results"
        typewriterPhrases={[
          "Results vary by person and treatment area",
          "Progress is reviewed over weeks, not overnight",
          "Consultation confirms suitable treatment pathway"
        ]}
        visual={<ImageFrame alt="Results illustration" illustration="results" preferPhoto src={getAsset("results", "hero")} />}
      />

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

      <Section>
        <SectionHeading
          eyebrow="Expectations"
          subtext="Treatment outcomes are individual and no result can be guaranteed."
          title="What results can look like"
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">What affects outcomes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {outcomeFactors.map((factor) => (
                <p key={factor}>• {factor}</p>
              ))}
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Realistic expectations table</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-2xl border border-border/70">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2">Stage</th>
                      <th className="px-3 py-2">Typical timeline</th>
                      <th className="px-3 py-2">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expectationRows.map((row) => (
                      <tr className="border-t border-border/60" key={row.stage}>
                        <td className="px-3 py-2 font-medium text-foreground">{row.stage}</td>
                        <td className="px-3 py-2 text-muted-foreground">{row.timeline}</td>
                        <td className="px-3 py-2 text-muted-foreground">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
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
