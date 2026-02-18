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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = buildMetadata({
  title: "Aqualyx Leeds Prices",
  description:
    "Aqualyx Leeds prices from £99 with transparent consultation-led quotes, plus fat freezing and cavitation package guidance.",
  path: "/prices"
});

export default function PricesPage() {
  return (
    <>
      <Section
        className="pt-10 sm:pt-14"
        containerClassName="rounded-[2rem] border border-primary/20 bg-card/85 p-6 shadow-soft sm:p-10"
        variant="gradient"
      >
        <div className="mb-8 space-y-2.5 sm:mb-10">
          <p className="eyebrow">Pricing</p>
          <h1 className="max-w-4xl text-balance text-[2.05rem] font-semibold leading-[1.1] text-foreground sm:text-[3rem]">
            Aqualyx Leeds Prices
          </h1>
          <p className="lead">
            From £99. Final price depends on target area, dosage plan, and consultation findings.
          </p>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            Use this page for a realistic starting point before booking. Every quote is confirmed only after assessment,
            suitability checks, and area planning.
          </p>
          <CTACluster compact />
        </div>
      </Section>

      <Section>
        <SectionHeading title="Price overview" />
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle>Fat dissolving (per ml)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p className="text-2xl font-semibold text-foreground">{pricingConfig.fatDissolving.pricePerMl} per ml</p>
              <p>{pricingConfig.fatDissolving.disclaimer}</p>
              <Button asChild variant="outline">
                <Link href="/pricing/fat-dissolving">View per-ml details</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle>Fat freezing packages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p className="text-2xl font-semibold text-foreground">From £{pricingConfig.fatFreezingPackages[0].priceGbp}</p>
              <p>Fixed package pricing with free extras on selected plans.</p>
              <Button asChild variant="outline">
                <Link href="/pricing/fat-freezing">View fat freezing pricing</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle>Ultrasound cavitation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p className="text-2xl font-semibold text-foreground">From £{pricingConfig.cavitationPackages[0].priceGbp}</p>
              <p>Package-based non-invasive session options with flexible planning.</p>
              <Button asChild variant="outline">
                <Link href="/pricing/cavitation">View cavitation pricing</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeading title="Typical ml ranges by area" />
        <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Area</th>
                <th className="px-4 py-3">Typical range</th>
              </tr>
            </thead>
            <tbody>
              {pricingConfig.fatDissolving.typicalMlRangesByArea.map((entry) => (
                <tr className="border-t border-border/60" key={entry.area}>
                  <td className="px-4 py-3 font-medium text-foreground">{entry.area}</td>
                  <td className="px-4 py-3 text-muted-foreground">{entry.mlRange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Pricing FAQs" />
        <FaqAccordion items={pricingFaqs} />
      </Section>

      <Section className="pt-0">
        <CtaStrip
          title="Ready for your tailored quote?"
          description="Book consultation to confirm suitability, expected sessions, and final pricing for your area."
        />
      </Section>

      <Section>
        <InternalLinksBlock
          title="Pricing links"
          links={[
            {
              href: "/aqualyx-leeds",
              label: "Aqualyx Leeds",
              description: "Primary Leeds hub with suitability, timeline, and FAQs."
            },
            {
              href: "/fat-dissolving-injections-leeds",
              label: "Fat Dissolving Injections Leeds",
              description: "Service overview with expectations and aftercare."
            },
            {
              href: "/book",
              label: "Book Free Consultation",
              description: "Submit your internal booking request online."
            }
          ]}
        />
      </Section>
    </>
  );
}
