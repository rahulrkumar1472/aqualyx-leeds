import Script from "next/script";
import Link from "next/link";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { caseStudies } from "@/content/case-studies";
import { getAsset } from "@/content/assets";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Case Studies Leeds",
  description:
    "Consultation-led Aqualyx Leeds case study style examples showing concern, plan, sessions, and realistic outcome notes.",
  path: "/case-studies"
});

export default function CaseStudiesPage() {
  return (
    <>
      <Script
        id="case-studies-note"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            name: "Aqualyx Leeds case studies",
            description: "Illustrative examples for educational purposes; consultation confirms individual suitability."
          })
        }}
      />

      <HeroShell
        eyebrow="Case Studies"
        subline="Clear concern-to-plan examples to help you understand what a consultation-led pathway can look like."
        title="Aqualyx Leeds Case Studies"
        typewriterPhrases={[
          "Concern → plan → review checkpoints",
          "Illustrative examples, not guaranteed outcomes",
          "Consultation confirms your individual route"
        ]}
        visual={<ImageFrame alt="Case study overview" illustration="results" preferPhoto src={getAsset("results", "gallery", 4)} />}
      />

      <Section className="pt-0">
        <p className="text-sm text-muted-foreground">
          All examples on this page are labelled clearly. If marked illustrative, they are educational examples only and
          do not represent guaranteed outcomes.
        </p>
      </Section>

      <Section>
        <SectionHeading title="Illustrative examples" />
        <div className="grid gap-4 lg:grid-cols-3">
          {caseStudies.map((item) => (
            <Card className="border-border/70 shadow-soft" key={item.title}>
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <ImageFrame alt={item.title} caption="Illustrative example" preferPhoto src={item.image} />
                <p>
                  <span className="font-semibold text-foreground">Concern:</span> {item.concern}
                </p>
                <div>
                  <p className="font-semibold text-foreground">Plan:</p>
                  {item.plan.map((line) => (
                    <p key={line}>• {line}</p>
                  ))}
                </div>
                <p>
                  <span className="font-semibold text-foreground">Sessions:</span> {item.sessions}
                </p>
                <div>
                  <p className="font-semibold text-foreground">Outcome notes:</p>
                  {item.outcomeNotes.map((line) => (
                    <p key={line}>• {line}</p>
                  ))}
                </div>
                <p>
                  <span className="font-semibold text-foreground">Next step:</span> {item.nextSteps}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button asChild size="sm">
                    <Link href="/book">Book Free Consultation</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link href="/pricing/fat-dissolving">View pricing</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <CtaStrip
          description="Use these examples as guidance only. Your own treatment route is confirmed during consultation."
          title="Discuss your own treatment plan"
        />
      </Section>

      <Section>
        <InternalLinksBlock
          title="Case study links"
          links={[
            {
              href: "/treatments/aqualyx",
              label: "Aqualyx treatment guide",
              description: "Process, safety notes, timeline, and FAQs."
            },
            {
              href: "/results",
              label: "Results expectations",
              description: "Realistic timeline and outcome factors."
            },
            {
              href: "/contact",
              label: "Contact",
              description: "WhatsApp, call, and clinic location details."
            }
          ]}
        />
      </Section>
    </>
  );
}
