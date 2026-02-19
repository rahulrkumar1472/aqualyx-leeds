import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, TriangleAlert } from "lucide-react";
import { CTACluster } from "@/components/layout/CTACluster";
import { HeroShell } from "@/components/layout/HeroShell";
import { ProofRow } from "@/components/layout/ProofRow";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { areaCoverage, type SeoLandingConfig } from "@/content/seo-pages";
import { faqSchema, serviceSchema } from "@/lib/seo/schema";

export function SeoLandingPage({ page }: { page: SeoLandingConfig }) {
  return (
    <>
      <Script
        id={`${page.path.replaceAll("/", "")}-service-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema(page.h1, page.path, page.description))
        }}
      />
      <Script
        id={`${page.path.replaceAll("/", "")}-faq-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(page.faqs))
        }}
      />

      <HeroShell
        ctaCluster={<CTACluster />}
        eyebrow="Leeds Service"
        priceTeaser="From £99 • Final price depends on area and plan confirmed in consultation"
        subline={page.benefitLine}
        title={page.h1}
        trustPills={["Leeds clinic (LS11)", "Results vary", "Consultation required", "From £99"]}
        typewriterPhrases={[
          "Spot-fat reduction, mapped in consultation.",
          "Transparent pricing — Leeds clinic (LS11).",
          "Message us on WhatsApp — fast replies.",
          "Free consultation + suitability review.",
          "Clinically guided plan. No rushed decisions."
        ]}
        visual={<ImageFrame alt={page.h1} className="min-h-[280px]" illustration={page.illustration} />}
      />

      <Section className="pt-0">
        <div className="space-y-2">
          <p className="lead">{page.intro}</p>
          <ProofRow items={["Consultation-led, clinically guided, Leeds clinic (LS11)."]} />
        </div>
      </Section>

      <Section>
        <SectionHeading title="Who it's for and who it's not for" />
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Who it&apos;s for</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {page.whoFor.map((item) => (
                <p className="inline-flex items-start gap-2" key={item}>
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  {item}
                </p>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Who it&apos;s not for</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {page.whoNotFor.map((item) => (
                <p className="inline-flex items-start gap-2" key={item}>
                  <TriangleAlert className="mt-0.5 h-4 w-4 text-primary" />
                  {item}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeading title="How many sessions and timeline" />
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How many sessions?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {page.sessions.map((item) => (
                <p key={item}>• {item}</p>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Typical timeline (results vary)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="pb-2 pr-2">Stage</th>
                    <th className="pb-2">What to expect</th>
                  </tr>
                </thead>
                <tbody>
                  {page.timeline.map((entry) => (
                    <tr className="border-t border-border/60" key={entry.stage}>
                      <td className="py-2 pr-2 font-medium text-foreground">{entry.stage}</td>
                      <td className="py-2 text-muted-foreground">{entry.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <SectionHeading title="What to expect, aftercare, and side effects" />
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What to expect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {page.expect.map((item) => (
                <p key={item}>• {item}</p>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Aftercare</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {page.aftercare.map((item) => (
                <p key={item}>• {item}</p>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Risks & side effects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {page.risks.map((item) => (
                <p key={item}>• {item}</p>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="pt-0">
        <CtaStrip
          description="Speak to us on WhatsApp first or secure your consultation online in under two minutes."
          title="Ready to discuss your plan?"
        />
      </Section>

      <Section variant="muted">
        <SectionHeading title="Areas we serve" />
        <div className="flex flex-wrap gap-2">
          {areaCoverage.map((area) => (
            <span
              className="rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs text-muted-foreground"
              key={area}
            >
              {area}
            </span>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          actions={
            <Button asChild variant="outline">
              <Link href="/book">Book Free Consultation</Link>
            </Button>
          }
          title="FAQs"
        />
        <FaqAccordion items={page.faqs} />
      </Section>

      <Section>
        <InternalLinksBlock
          links={[
            {
              href: "/aqualyx-leeds",
              label: "Aqualyx Leeds",
              description: "Primary Leeds hub page for treatment planning."
            },
            {
              href: "/prices",
              label: "Prices",
              description: "Pricing overview from £99 with consultation notes."
            },
            {
              href: "/book",
              label: "Book Free Consultation",
              description: "Submit your consultation request online."
            },
            ...page.relatedLinks
          ]}
          title="Related links"
        />
      </Section>
    </>
  );
}
