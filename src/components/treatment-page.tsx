import Script from "next/script";
import type { ReactNode } from "react";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, Clock3, MapPin, ShieldCheck } from "lucide-react";
import { CTACluster } from "@/components/layout/CTACluster";
import { HeroShell } from "@/components/layout/HeroShell";
import { InlineNotice } from "@/components/layout/InlineNotice";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { WhatsAppPanel } from "@/components/site/whatsapp-panel";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/content/site";
import { aqualyxFaqs } from "@/content/faqs";
import { faqSchema, serviceSchema } from "@/lib/seo";

type TreatmentPageProps = {
  slug: string;
  treatmentName: string;
  intro: string;
  illustration?: "aqualyx" | "lemonBottle" | "fatFreezing" | "cavitation" | "clinic" | "generic";
  coverImage?: string;
  areas: readonly string[];
  suitability: readonly string[];
  steps: readonly string[];
  timeline: readonly string[];
  pricingTeaser: string;
  pricingSection: ReactNode;
  comparisonSection?: ReactNode;
  relatedLinks: { href: string; label: string; description?: string }[];
};

export function TreatmentPageTemplate({
  slug,
  treatmentName,
  intro,
  illustration = "aqualyx",
  coverImage,
  areas,
  suitability,
  steps,
  timeline,
  pricingTeaser,
  pricingSection,
  comparisonSection,
  relatedLinks
}: TreatmentPageProps) {
  const title = `${treatmentName} in Leeds`;
  const atGlance = [
    { label: "Consultation", value: "Required before treatment" },
    { label: "Session window", value: "Typically 20-45 minutes" },
    { label: "Downtime", value: "Usually minimal, varies by person" },
    { label: "Pricing anchor", value: pricingTeaser.replace(" with final cost confirmed after assessment.", "") }
  ];

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(
              `${treatmentName} in Leeds`,
              `/treatments/${slug}`,
              `${treatmentName} treatment and consultation services in Leeds.`
            )
          )
        }}
        id={`${slug}-service-schema`}
        type="application/ld+json"
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(aqualyxFaqs))
        }}
        id={`${slug}-faq-schema`}
        type="application/ld+json"
      />

      <HeroShell
        ctaCluster={<CTACluster />}
        eyebrow="Aqualyx Leeds"
        priceTeaser={pricingTeaser}
        subline={intro}
        title={title}
        trustPills={["Leeds clinic (LS11)", "Consultation required", "Results vary", "Aftercare guidance"]}
        typewriterPhrases={[
          `${treatmentName} plans are tailored by area and suitability`,
          "Consultation is required before treatment decisions",
          "Progress is usually gradual over weeks and results vary",
          "Book online or message us on WhatsApp for guidance"
        ]}
        visual={
          <ImageFrame
            alt={`${treatmentName} in Leeds`}
            className="min-h-[300px]"
            illustration={illustration}
            preferPhoto={false}
            src={coverImage}
          />
        }
      />

      <Section className="pt-0">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {atGlance.map((item) => (
            <Card className="border-border/70 shadow-soft" key={item.label}>
              <CardContent className="space-y-1 p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
                <p className="text-sm font-semibold text-foreground">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Overview"
          subtext="Clinical guidance and suitability are assessed first. Information here is general and does not replace an in-person assessment."
          title={`What ${treatmentName} is`}
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border-border/70 shadow-soft">
            <CardContent className="space-y-3 p-5 text-sm text-muted-foreground">
              <p>
                {treatmentName} is offered through a consultation-led pathway focused on localised fat areas. Treatment
                decisions depend on your baseline profile, goals, and safety screening.
              </p>
              <p>
                The plan may include staged sessions and review checkpoints. You will receive clear aftercare guidance
                and when to contact the clinic if needed.
              </p>
              <CTACluster compact includeCall={false} />
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl">Who it&apos;s for</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suitability.map((point) => (
                <p className="inline-flex items-start gap-2 text-sm text-muted-foreground" key={point}>
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  {point}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border-primary/20 bg-primary/5 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">What you&apos;ll get in consultation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Area-by-area suitability review and safety screening.</p>
              <p>• Realistic timeline discussion with no guarantee claims.</p>
              <p>• Per-area treatment planning and estimated pricing range.</p>
              <p>• Clear aftercare and follow-up guidance.</p>
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Who may need to avoid or defer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Anyone with contraindications identified during screening.</p>
              <p>• Clients seeking guaranteed or immediate body transformation.</p>
              <p>• People requiring medical weight-management treatment instead.</p>
              <p>• Anyone unable to follow aftercare or review recommendations.</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeading eyebrow="Treatment Areas" title="Areas often discussed in consultation" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <Card className="border-primary/15 bg-card/95 shadow-soft" key={area}>
              <CardContent className="space-y-3 p-4 text-sm">
                <p className="font-medium text-foreground">{area}</p>
                <Button asChild size="sm" variant="outline">
                  <Link href="/book">Book for this area</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Process" title="Before, during, and after treatment" />
        <div className="grid gap-4 md:grid-cols-2">
          {steps.map((step, index) => (
            <Card className="border-border/70 shadow-soft" key={step}>
              <CardHeader>
                <CardTitle className="text-lg">Step {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{step}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <CtaStrip
          description="For quick guidance, message us on WhatsApp before selecting your consultation time."
          title="Need a fast recommendation by area?"
        />
      </Section>

      <Section variant="muted">
        <SectionHeading eyebrow="Timeline" title="Week-by-week expectations (results vary)" />
        <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Window</th>
                <th className="px-4 py-3">What to expect</th>
              </tr>
            </thead>
            <tbody>
              {timeline.map((item, index) => (
                <tr className="border-t border-border/60 align-top" key={item}>
                  <td className="px-4 py-3 font-medium text-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="h-4 w-4 text-primary" />
                      Stage {index + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <InlineNotice>
          Response varies by person, area, and adherence to aftercare. Individual outcomes cannot be guaranteed.
        </InlineNotice>
      </Section>

      {comparisonSection ? <Section>{comparisonSection}</Section> : null}

      <Section>
        <SectionHeading
          eyebrow="Safety"
          title="Suitability and aftercare checks"
          subtext="This is high-level information and not medical advice. Your clinician confirms final suitability."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2 text-lg">
                <ShieldCheck className="h-4 w-4 text-primary" /> Clinical guidance & suitability
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Medical history and treatment goals are reviewed before planning dosage and session strategy.
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">What to expect</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              You receive a clear overview of expected response windows, review points, and realistic treatment limits.
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2 text-lg">
                <AlertTriangle className="h-4 w-4 text-primary" /> When to speak to a clinician
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Contact the clinic if symptoms are unexpected, prolonged, or concerning after treatment.
            </CardContent>
          </Card>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {[
            "Hydration and aftercare consistency",
            "Avoid rushed treatment decisions",
            "Use review points to assess progress",
            "Message clinic promptly if concerned"
          ].map((item) => (
            <Card className="border-primary/15 bg-card/95 shadow-soft" key={item}>
              <CardContent className="p-4 text-sm text-muted-foreground">{item}</CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-5">
          <CTACluster compact />
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeading eyebrow="Pricing" title="Pricing and quote guidance" />
        <div className="mb-4 grid gap-3 md:grid-cols-3">
          <Card className="border-border/70 shadow-soft">
            <CardContent className="p-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Area size</p>
              Larger areas usually need higher ml planning.
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardContent className="p-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Session count</p>
              Staged treatment may be advised based on review.
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardContent className="p-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Clinical suitability</p>
              Final plan is confirmed only after consultation.
            </CardContent>
          </Card>
        </div>
        <div className="mb-4 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Cost factor</th>
                <th className="px-4 py-3">How it affects your quote</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border/60">
                <td className="px-4 py-3 font-medium text-foreground">Target area size</td>
                <td className="px-4 py-3 text-muted-foreground">Larger areas usually require higher planned ml.</td>
              </tr>
              <tr className="border-t border-border/60">
                <td className="px-4 py-3 font-medium text-foreground">Session strategy</td>
                <td className="px-4 py-3 text-muted-foreground">Staged sessions may be recommended for safer progression.</td>
              </tr>
              <tr className="border-t border-border/60">
                <td className="px-4 py-3 font-medium text-foreground">Suitability review</td>
                <td className="px-4 py-3 text-muted-foreground">Final plan is confirmed after in-person consultation.</td>
              </tr>
            </tbody>
          </table>
        </div>
        {pricingSection}
      </Section>

      <Section>
        <SectionHeading eyebrow="FAQs" title={`${treatmentName} in Leeds FAQs`} />
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <FaqAccordion items={aqualyxFaqs} />
          <WhatsAppPanel />
        </div>
      </Section>

      <Section variant="gradient">
        <SectionHeading eyebrow="Location" title="Leeds clinic access" />
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="inline-flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" /> {siteConfig.address}
            </p>
            <p>Speak to the team on WhatsApp first, then book a consultation slot that fits your schedule.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="ctaSecondary">
              <a href={siteConfig.mapQueryUrl} rel="noopener noreferrer" target="_blank">
                Open in Google Maps
              </a>
            </Button>
            <Button asChild variant="ctaTertiary">
              <a href={siteConfig.phoneHref}>Call now</a>
            </Button>
            <Button asChild>
              <Link href="/book">Book Free Consultation</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section>
        <InternalLinksBlock links={relatedLinks} title="Related links" />
      </Section>
    </>
  );
}
