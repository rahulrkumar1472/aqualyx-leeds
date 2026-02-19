import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { treatmentNavigation } from "@/content/treatments";
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
  title: "Treatments in Leeds",
  description: "Compare Aqualyx, Lemon Bottle, fat freezing, and cavitation pathways in Leeds.",
  path: "/treatments"
});

export default function TreatmentsOverviewPage() {
  return (
    <>
      <HeroShell
        eyebrow="Treatment Hub"
        subline="Compare injection-based and non-invasive pathways with consultation-led suitability checks."
        title="Treatments in Leeds"
        typewriterPhrases={[
          "Choose the route that fits your area and goals",
          "Consultation confirms suitability and realistic timeline",
          "Book online or WhatsApp us for fast guidance"
        ]}
        visual={<ImageFrame alt="Treatments in Leeds" illustration="heroAbstract" preferPhoto src={getAsset("hero", "gallery", 1)} />}
      />

      <Section>
        <SectionHeading
          actions={<CTACluster compact includeCall={false} />}
          eyebrow="Pathways"
          title="Compare treatment categories"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {treatmentNavigation.map((section) => (
            <Card className="border-border/70 shadow-soft" key={section.section}>
              <CardHeader>
                <CardTitle>{section.section}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {section.items.map((item) => (
                  <Link className="block rounded-2xl border border-border/70 px-3 py-2 hover:border-primary/35" href={item.href} key={item.href}>
                    <span className="inline-flex items-center gap-1 font-medium text-foreground">
                      {item.title}
                      <ArrowUpRight className="h-4 w-4 text-primary" />
                    </span>
                  </Link>
                ))}
                <Button asChild variant="outline">
                  <Link href={section.href}>Open category overview</Link>
                </Button>
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
              href: "/treatments/fat-freezing",
              label: "Fat Freezing",
              description: "Package-led cryolipolysis overview."
            },
            {
              href: "/treatments/ultrasound-cavitation",
              label: "Ultrasound Cavitation",
              description: "Non-invasive session pathway."
            },
            {
              href: "/treatments/lemon-bottle",
              label: "Lemon Bottle",
              description: "Supporting injection option."
            }
          ]}
          title="Popular treatment links"
        />
      </Section>
    </>
  );
}
