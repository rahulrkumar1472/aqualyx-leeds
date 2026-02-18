import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { treatmentNavigation } from "@/content/treatments";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CTACluster } from "@/components/layout/CTACluster";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = buildMetadata({
  title: "Treatments in Leeds",
  description: "Compare Aqualyx, Lemon Bottle, fat freezing, and cavitation pathways in Leeds.",
  path: "/treatments"
});

export default function TreatmentsOverviewPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14" containerClassName="rounded-[2rem] border border-primary/20 bg-card/85 p-6 shadow-soft sm:p-10" variant="gradient">
        <SectionHeading
          eyebrow="Treatment Hub"
          subtext="Choose between injection-based and non-invasive options with consultation-led suitability checks."
          title="Treatments in Leeds"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <ImageFrame alt="Aqualyx treatment illustration" illustration="aqualyx" />
          <ImageFrame alt="Non-invasive treatment illustration" illustration="fatFreezing" />
        </div>
      </Section>

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

