import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { pricingConfig } from "@/content/pricing";
import { pricingFaqs } from "@/content/faqs";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CTACluster } from "@/components/layout/CTACluster";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = buildMetadata({
  title: "Pricing in Leeds",
  description: "Transparent pricing hub for fat dissolving, fat freezing packages, and cavitation in Leeds.",
  path: "/pricing"
});

const pricingPages = [
  {
    title: "Fat Dissolving (per ml)",
    href: "/pricing/fat-dissolving",
    description: "Per-ml pricing with typical area ranges and consultation quote confirmation.",
    teaser: `From ${pricingConfig.fatDissolving.pricePerMl} per ml`
  },
  {
    title: "Fat Freezing Packages",
    href: "/pricing/fat-freezing",
    description: "Fixed package pricing with listed free extras on selected plans.",
    teaser: `From £${pricingConfig.fatFreezingPackages[0].priceGbp}`
  },
  {
    title: "Cavitation Packages",
    href: "/pricing/cavitation",
    description: "Session package plans with flexible programme structures.",
    teaser: `From £${pricingConfig.cavitationPackages[0].priceGbp}`
  }
];

export default function PricingPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14" containerClassName="rounded-[2rem] border border-primary/20 bg-card/85 p-6 shadow-soft sm:p-10" variant="gradient">
        <SectionHeading
          eyebrow="Transparent Pricing"
          subtext="Use this hub for fast comparison, then book consultation for your confirmed treatment plan."
          title="Pricing in Leeds"
        />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>All prices are guide-level and final totals are confirmed after clinical assessment.</p>
            <CTACluster compact />
          </div>
          <ImageFrame alt="Pricing illustration" illustration="clinic" />
        </div>
      </Section>

      <Section>
        <SectionHeading title="Choose a pricing page" />
        <div className="grid gap-4 md:grid-cols-3">
          {pricingPages.map((page) => (
            <Card className="border-border/70 shadow-soft" key={page.href}>
              <CardHeader>
                <CardTitle>{page.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p className="text-lg font-semibold text-foreground">{page.teaser}</p>
                <p>{page.description}</p>
                <Button asChild variant="outline">
                  <Link href={page.href}>Open pricing</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeading title="Pricing FAQs" />
        <FaqAccordion items={pricingFaqs} />
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
              description: "Primary Leeds treatment page."
            },
            {
              href: "/book",
              label: "Book consultation",
              description: "Start your booking flow in minutes."
            },
            {
              href: "/locations/leeds",
              label: "Leeds clinic",
              description: "Map, directions, and contact details."
            }
          ]}
          title="Pricing links"
        />
      </Section>
    </>
  );
}

