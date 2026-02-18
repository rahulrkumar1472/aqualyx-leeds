import Link from "next/link";
import Script from "next/script";
import { ArrowUpRight, BadgeCheck, CheckCircle2, MapPin, ShieldCheck, Wallet } from "lucide-react";
import { Typewriter } from "@/components/ui/typewriter";
import { CTACluster } from "@/components/layout/CTACluster";
import { InlineNotice } from "@/components/layout/InlineNotice";
import { ProofRow } from "@/components/layout/ProofRow";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aqualyxFaqs, generalFaqs } from "@/content/faqs";
import { pricingConfig } from "@/content/pricing";
import { siteConfig } from "@/content/site";
import { getAllBlogPosts } from "@/lib/blog";
import { buildMetadata, faqSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Aqualyx Fat Dissolving Injections in Leeds",
  description:
    "Aqualyx Leeds offers consultation-led fat dissolving injections with transparent pricing, WhatsApp-first support, and structured treatment planning.",
  path: "/",
  keywords: ["Aqualyx Leeds", "fat dissolving injections Leeds", "Aqualyx injections Leeds"]
});

const homeFaqs = [...aqualyxFaqs, ...generalFaqs].slice(0, 8);

const goalCards = [
  {
    title: "Chin and jawline",
    body: "Plan targeted contouring for submental fullness after a suitability check."
  },
  {
    title: "Stomach",
    body: "Assess localised abdominal fat pockets and build a realistic session strategy."
  },
  {
    title: "Love handles",
    body: "Treat flank areas with dosage planning based on body profile and goals."
  },
  {
    title: "Arms and thighs",
    body: "Set phased treatment goals with monitoring and practical aftercare."
  }
];

const steps = [
  {
    title: "Consultation",
    body: "We review goals, medical history, treatment area, and suitability before any treatment is planned."
  },
  {
    title: "Treatment planning",
    body: "Your plan is mapped by area with realistic dosage ranges and timeline expectations."
  },
  {
    title: "Aftercare guidance",
    body: "You receive straightforward aftercare instructions and what to monitor in the first week."
  },
  {
    title: "Review and next steps",
    body: "Progress is assessed and your next appointment is adjusted if clinically appropriate."
  }
];

const comparison = [
  {
    name: "Aqualyx",
    goodFor: "Targeted stubborn fat areas",
    approach: "Injection-based",
    cadence: "Planned sessions",
    page: "/treatments/aqualyx"
  },
  {
    name: "Fat Freezing",
    goodFor: "Pinchable surface fat",
    approach: "Cooling applicators",
    cadence: "Package-led",
    page: "/treatments/fat-freezing"
  },
  {
    name: "Cavitation",
    goodFor: "Non-injection body contour support",
    approach: "Ultrasound sessions",
    cadence: "Series-based",
    page: "/treatments/ultrasound-cavitation"
  }
];

export default async function HomePage() {
  const posts = await getAllBlogPosts();
  const featuredPosts = posts.slice(0, 3);

  return (
    <>
      <Script
        id="home-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(homeFaqs)) }}
      />

      <Section className="pt-10 sm:pt-14" containerClassName="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-card/85 p-6 shadow-soft sm:p-10" variant="gradient">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/18 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-accent/60 blur-3xl" />
        <div className="absolute right-6 top-6 hidden h-36 w-36 rounded-full border border-primary/25 bg-primary/10 lg:block" />
        <div className="relative space-y-6">
          <div className="space-y-5">
            <Badge className="rounded-full px-3 py-1" variant="secondary">
              Aqualyx Leeds
            </Badge>
            <h1 className="max-w-4xl">Aqualyx Fat Dissolving Injections in Leeds</h1>
            <p className="lead text-[1.08rem]">Spot-fat reduction • Transparent pricing • Free consultation</p>
            <p className="text-sm font-semibold text-secondary">From {pricingConfig.fatDissolving.pricePerMl} per ml</p>
            <div className="max-w-2xl">
              <Typewriter
                phrases={[
                  "Target stubborn areas like chin, jawline, stomach & love handles",
                  "Clinically guided treatment plans — consultation required",
                  "Fast, visible progress over weeks — results vary",
                  "Book online or message us on WhatsApp"
                ]}
              />
            </div>
            <CTACluster />
            <div className="flex flex-wrap items-center gap-3 text-xs text-secondary">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/75 bg-card/75 px-3 py-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Leeds clinic (LS11)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/75 bg-card/75 px-3 py-1.5">
                <Wallet className="h-3.5 w-3.5 text-primary" />
                Transparent pricing
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/75 bg-card/75 px-3 py-1.5">
                <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                Free consultation
              </span>
            </div>
            <ProofRow items={["Results vary", "Consultation required", "No downtime*"]} />
            <p className="text-xs text-muted-foreground">*Downtime varies by person.</p>
          </div>
          <div className="pointer-events-none absolute -bottom-10 right-8 hidden w-44 opacity-80 lg:block">
            <ImageFrame alt="Aqualyx motif" className="min-h-[170px]" illustration="aqualyx" />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          actions={<CTACluster compact includeCall={false} />}
          eyebrow="Goals"
          subtext="Choose a treatment goal and we will map the safest route, likely dosage range, and expected timeline during consultation."
          title="What do you want to target?"
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {goalCards.map((goal) => (
            <Card className="border-border/70 shadow-soft" key={goal.title}>
              <CardHeader>
                <CardTitle className="text-xl">{goal.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{goal.body}</p>
                <Button asChild size="sm" variant="outline">
                  <Link href="/book">Book for this area</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeading
          actions={
            <Button asChild variant="outline">
              <Link href="/treatments/aqualyx">View full Aqualyx guide</Link>
            </Button>
          }
          eyebrow="Pathway"
          subtext="Each step is consultation-led and adjusted to your area, baseline profile, and response. No guarantees are made."
          title="How treatment works"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <Card className="border-primary/15 bg-card/90" key={step.title}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {index + 1}. {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{step.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <InlineNotice>
            Suitability, contraindications, and dosing are confirmed only after in-person clinical assessment.
          </InlineNotice>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeading
          actions={
            <Button asChild variant="outline">
              <Link href="/pricing">View all pricing</Link>
            </Button>
          }
          eyebrow="Transparent Pricing"
          subtext="Use this as a guide before your quote. Final cost is confirmed only after consultation and area assessment."
          title="Pricing preview"
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border-primary/20 shadow-soft">
            <CardHeader>
              <CardTitle>Fat dissolving (per ml)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p className="text-2xl font-semibold text-foreground">{pricingConfig.fatDissolving.pricePerMl} per ml</p>
              <div className="rounded-2xl border border-border/70 bg-muted/40 p-3">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="pb-2 pr-2 font-semibold">Area</th>
                      <th className="pb-2 font-semibold">Typical ml range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingConfig.fatDissolving.typicalMlRangesByArea.slice(0, 3).map((entry) => (
                      <tr className="border-t border-border/50" key={entry.area}>
                        <td className="py-2 pr-2">{entry.area}</td>
                        <td className="py-2">{entry.mlRange}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <CTACluster compact includeCall={false} />
              <p className="text-xs">{pricingConfig.fatDissolving.disclaimer}</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-soft">
            <CardHeader>
              <CardTitle>Fat freezing packages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="rounded-2xl border border-border/70 bg-muted/40 p-3">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="pb-2 pr-2 font-semibold">Applicators</th>
                      <th className="pb-2 font-semibold">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingConfig.fatFreezingPackages.map((pkg) => (
                      <tr className="border-t border-border/50" key={pkg.applicators}>
                        <td className="py-2 pr-2">{pkg.applicators}</td>
                        <td className="py-2">£{pkg.priceGbp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild>
                  <Link href="/pricing/fat-freezing">View fat freezing deals</Link>
                </Button>
                <Button asChild variant="ctaSecondary">
                  <a href={siteConfig.whatsappUrl} rel="noopener noreferrer" target="_blank">
                    WhatsApp
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeading
          eyebrow="Compare"
          subtext="Different modalities suit different goals, anatomy, and timelines. Consultation decides the best route for you."
          title="Aqualyx vs non-invasive options"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {comparison.map((item) => (
            <Card className="border-border/70 bg-card/85 shadow-soft" key={item.name}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Best for:</strong> {item.goodFor}
                </p>
                <p>
                  <strong className="text-foreground">Approach:</strong> {item.approach}
                </p>
                <p>
                  <strong className="text-foreground">Typical cadence:</strong> {item.cadence}
                </p>
                <Link
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  href={item.page}
                >
                  Compare details <ArrowUpRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <ReviewsSection />
      </Section>

      <Section variant="muted">
        <SectionHeading
          actions={
            <Button asChild variant="outline">
              <Link href="/blog">View all articles</Link>
            </Button>
          }
          eyebrow="Learn"
          subtext="Customer-friendly guides on suitability, pricing, timelines, and treatment comparisons."
          title="Featured articles"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {featuredPosts.map((post) => (
            <Card className="border-border/70 bg-card/85 shadow-soft" key={post.slug}>
              <CardHeader>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">{post.category}</p>
                <CardTitle className="text-lg leading-snug">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>{post.description}</p>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/blog/${post.slug}`}>Read article</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section variant="bordered">
        <SectionHeading
          actions={<CTACluster compact />}
          eyebrow="Leeds Clinic"
          subtext="Tunstall Road clinic with WhatsApp-first support and straightforward booking."
          title="Visit Aqualyx Leeds"
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="inline-flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" /> {siteConfig.address}
            </p>
            <p className="inline-flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" /> Clinical guidance and suitability checks before
              treatment.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Button asChild variant="ctaSecondary">
                <a href={siteConfig.googleBusinessUrl} rel="noopener noreferrer" target="_blank">
                  View Google Business Profile
                </a>
              </Button>
              <Button asChild variant="ctaTertiary">
                <a href={siteConfig.mapQueryUrl} rel="noopener noreferrer" target="_blank">
                  Open in Google Maps
                </a>
              </Button>
            </div>
          </div>
          <ImageFrame alt="Aqualyx Leeds clinic illustration" illustration="clinic" />
        </div>
      </Section>

      <Section>
        <SectionHeading
          actions={
            <Button asChild variant="outline">
              <Link href="/faqs">Open all FAQs</Link>
            </Button>
          }
          eyebrow="Questions"
          title="Frequently asked questions"
        />
        <FaqAccordion items={homeFaqs} />
      </Section>

      <Section>
        <InternalLinksBlock
          description="High-intent pages for treatment selection, per-ml pricing, Leeds location trust, and booking."
          links={[
            {
              href: "/treatments/fat-freezing",
              label: "Fat Freezing",
              description: "Compare packages and free extras."
            },
            {
              href: "/treatments/ultrasound-cavitation",
              label: "Ultrasound Cavitation",
              description: "Explore non-injection contour support."
            },
            {
              href: "/treatments/lemon-bottle",
              label: "Lemon Bottle",
              description: "Review supporting fat dissolving option."
            }
          ]}
          title="Popular links"
        />
      </Section>

      <Section className="pt-0">
        <CtaStrip
          description="Speak to us on WhatsApp for quick answers, then secure your consultation online."
          title="Ready to start your treatment plan?"
        />
      </Section>
    </>
  );
}
