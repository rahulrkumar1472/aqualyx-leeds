import Link from "next/link";
import Script from "next/script";
import { Award, CheckCircle2, Clock3, MapPin, ShieldCheck, Wallet } from "lucide-react";
import { CTACluster } from "@/components/layout/CTACluster";
import { HeroShell } from "@/components/layout/HeroShell";
import { InlineNotice } from "@/components/layout/InlineNotice";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { ImageFrame } from "@/components/media/ImageFrame";
import { ComparisonTable } from "@/components/ui/comparison-table";
import { IconBadge } from "@/components/ui/icon-badge";
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
    title: "Lower abdomen",
    body: "Assess localised abdominal fat pockets and build a realistic session strategy."
  },
  {
    title: "Love handles",
    body: "Treat flank areas with dosage planning based on body profile and goals."
  },
  {
    title: "Upper arms",
    body: "Review arm contour goals and expected treatment staging."
  },
  {
    title: "Thighs",
    body: "Set realistic timeline expectations for inner and outer thigh areas."
  },
  {
    title: "Jawline detail",
    body: "Discuss dose planning around jawline shape and treatment goals."
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
    title: "Review and progression",
    body: "Progress is assessed and your next appointment is adjusted if clinically appropriate."
  }
];

const comparisonRows = [
  {
    feature: "Best fit",
    aqualyx: "Targeted stubborn fat pockets by area",
    alternatives: "Depends on modality and area profile"
  },
  {
    feature: "Treatment style",
    aqualyx: "Injection-based consultation pathway",
    alternatives: "Cooling or ultrasound session pathways"
  },
  {
    feature: "Timeline profile",
    aqualyx: "Gradual progress over planned review windows",
    alternatives: "Also gradual, with modality-specific response"
  },
  {
    feature: "Planning approach",
    aqualyx: "Per-area dosage and suitability review",
    alternatives: "Package/session recommendations by suitability"
  }
];

const safetyCards = [
  {
    title: "Who it may suit",
    points: [
      "Adults near goal weight with localised fat pockets",
      "Clients seeking targeted contour support, not weight-loss treatment",
      "People able to follow aftercare and attend review appointments"
    ]
  },
  {
    title: "Who needs medical review",
    points: [
      "Anyone with relevant medical history flagged at consultation",
      "People expecting instant or guaranteed transformation",
      "Anyone unsure whether injections are the right treatment route"
    ]
  },
  {
    title: "Why consultation is required",
    points: [
      "To confirm suitability and contraindications",
      "To estimate dosage range by area",
      "To set realistic timeline and aftercare guidance"
    ]
  }
];

const expectationRows = [
  {
    notice: "Early treatment response",
    timeline: "First week",
    notes: "Area may feel different while aftercare guidance is followed."
  },
  {
    notice: "Gradual contour changes",
    timeline: "Weeks 2-4",
    notes: "Many clients notice progressive visible change over this period."
  },
  {
    notice: "Review and planning",
    timeline: "Weeks 4-8",
    notes: "Progress is reviewed and next steps are confirmed if suitable."
  }
];

const whyChooseCards = [
  "Leeds clinic at LS11 location",
  "Transparent pricing model from £99 per ml",
  "Consultation-led treatment planning",
  "WhatsApp-first support for quick answers",
  "Structured aftercare and review guidance",
  "Flexible booking flow with fast follow-up"
];

export default async function HomePage() {
  const posts = await getAllBlogPosts();
  const featuredPosts = posts.slice(0, 6);

  return (
    <>
      <Script
        id="home-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(homeFaqs)) }}
      />

      <HeroShell
        ctaCluster={<CTACluster />}
        eyebrow="Aqualyx Leeds"
        footnote="*Downtime varies by person."
        priceTeaser={`From ${pricingConfig.fatDissolving.pricePerMl} per ml`}
        subline="Consultation-led spot-fat reduction with transparent pricing."
        title="Aqualyx Fat Dissolving Injections in Leeds"
        typewriterPhrases={[
          "Target stubborn areas like chin, jawline, stomach & love handles",
          "Clinically guided treatment plans — consultation required",
          "Fast, visible progress over weeks — results vary",
          "Book online or message us on WhatsApp"
        ]}
        visual={<ImageFrame alt="Aqualyx hero visual" className="min-h-[300px]" illustration="heroAbstract" />}
      />

      <Section className="pt-0">
        <div className="flex flex-wrap gap-2.5">
          <IconBadge icon={<Award className="h-3.5 w-3.5" />} label="Trusted consultation pathway" />
          <IconBadge icon={<Clock3 className="h-3.5 w-3.5" />} label="Fast WhatsApp replies" />
          <IconBadge icon={<Wallet className="h-3.5 w-3.5" />} label="Transparent pricing from £99" />
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
              <div className="rounded-2xl border border-border/70 bg-card/85 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground">Why ranges vary</p>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>• Area size and fat distribution differ by person.</li>
                  <li>• Suitability review can change final session strategy.</li>
                  <li>• Staged treatment may be recommended for safer progression.</li>
                </ul>
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
        <ComparisonTable rows={comparisonRows} />
        <div className="mt-3 text-xs text-muted-foreground">
          Informational comparison only. Suitability and treatment route are confirmed in consultation.
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Safety & Suitability"
          subtext="Consultation-led safety checks guide all recommendations. Information here is general and does not replace clinical assessment."
          title="Who treatment may suit"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {safetyCards.map((card) => (
            <Card className="border-border/70 shadow-soft" key={card.title}>
              <CardHeader>
                <CardTitle className="text-lg">{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {card.points.map((point) => (
                  <p className="inline-flex items-start gap-2" key={point}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    {point}
                  </p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeading
          eyebrow="Results"
          subtext="No clinic can promise identical outcomes for everyone. Progress depends on area, baseline profile, and aftercare."
          title="Results and expectations"
        />
        <div className="overflow-hidden rounded-[1.6rem] border border-border/70 bg-card shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">What you might notice</th>
                <th className="px-4 py-3">Typical timeline</th>
                <th className="px-4 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {expectationRows.map((row) => (
                <tr className="border-t border-border/60" key={row.notice}>
                  <td className="px-4 py-3 font-medium text-foreground">{row.notice}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.timeline}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Trust" title="Why book with Aqualyx Leeds" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {whyChooseCards.map((item) => (
            <Card className="border-border/70 shadow-soft" key={item}>
              <CardContent className="inline-flex items-start gap-2 p-4 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                {item}
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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
