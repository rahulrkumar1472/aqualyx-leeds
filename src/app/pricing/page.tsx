import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { pricingConfig } from "@/content/pricing";
import { pricingFaqs } from "@/content/faqs";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CTACluster } from "@/components/layout/CTACluster";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { WhatsAppPanel } from "@/components/site/whatsapp-panel";
import { ImageFrame } from "@/components/media/ImageFrame";
import { QuickLeadForm } from "@/components/forms/quick-lead-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAsset } from "@/content/assets";

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
  },
  {
    title: "Price Match Policy",
    href: "/pricing/price-match",
    description: "Policy conditions and like-for-like comparison terms for Leeds clients.",
    teaser: "Ask us to review a local quote"
  }
];

export default function PricingPage() {
  return (
    <>
      <HeroShell
        ctaCluster={<CTACluster compact />}
        eyebrow="Transparent Pricing"
        priceTeaser="From £99 • Final plan confirmed after suitability review"
        subline="Use this hub for fast comparison, then book consultation for your confirmed treatment plan."
        title="Pricing in Leeds"
        typewriterPhrases={[
          "Transparent pricing with consultation-first guidance.",
          "Per-ml and package options explained clearly.",
          "Message us on WhatsApp for quick estimate support."
        ]}
        visual={<ImageFrame alt="Pricing illustration" illustration="pricing" preferPhoto src={getAsset("pricing", "hero")} />}
      />

      <Section>
        <SectionHeading title="Choose a pricing page" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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

      <Section className="pt-0">
        <Card className="border-primary/20 bg-[linear-gradient(140deg,hsl(var(--primary)/0.1),hsl(var(--background)))] shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl">Get a quick quote callback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Share your target area and preferred contact route. Our Leeds team can guide you before booking.
            </p>
            <QuickLeadForm />
          </CardContent>
        </Card>
      </Section>

      <Section className="pt-0">
        <WhatsAppPanel
          description="Need a quick cost-direction before booking? Message us on WhatsApp and we’ll guide you to the right pricing page."
          title="Quick pricing help"
        />
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
