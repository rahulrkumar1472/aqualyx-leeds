import Script from "next/script";
import Link from "next/link";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CTACluster } from "@/components/layout/CTACluster";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { WhatsAppPanel } from "@/components/site/whatsapp-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { faqSchema } from "@/lib/seo";
import { buildMetadata } from "@/lib/seo";
import { getAsset } from "@/content/assets";
import { ImageFrame } from "@/components/media/ImageFrame";

const priceMatchFaqs = [
  {
    question: "What does price match mean at Aqualyx Leeds?",
    answer:
      "If you have a comparable local written quote, we can review it and confirm whether a matched or improved clinic price is available."
  },
  {
    question: "Does every quote qualify?",
    answer:
      "No. The comparison must be like-for-like, local, current, and clinically appropriate for your treatment plan."
  },
  {
    question: "Is consultation still required?",
    answer:
      "Yes. Suitability and treatment planning are always confirmed in consultation before pricing is finalised."
  },
  {
    question: "Can price match be combined with all offers?",
    answer:
      "Not always. Offer combinations may be limited and are confirmed at booking."
  }
];

export const metadata = buildMetadata({
  title: "Price Match Policy in Leeds",
  description:
    "Price match policy for Aqualyx Leeds. Review eligibility conditions, what counts as like-for-like, and how to request review.",
  path: "/pricing/price-match"
});

export default function PriceMatchPage() {
  return (
    <>
      <Script
        id="price-match-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(priceMatchFaqs)) }}
      />

      <HeroShell
        ctaCluster={<CTACluster compact />}
        eyebrow="Pricing Policy"
        priceTeaser="Policy applies only after clinical suitability review"
        subline="We aim to be among the most affordable in Leeds. If you have a comparable local quote, ask us to review it."
        title="Price Match Policy"
        typewriterPhrases={[
          "Bring a comparable local quote and we will review it fairly.",
          "Like-for-like comparison only, subject to suitability.",
          "Book online or message us on WhatsApp for help."
        ]}
        visual={
          <ImageFrame
            alt="Price match policy at Aqualyx Leeds"
            illustration="pricing"
            preferPhoto
            src={getAsset("pricing", "hero")}
          />
        }
      />

      <Section>
        <SectionHeading title="How the policy works" />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "1) Share your quote",
              body: "Send a current written quote from a local provider with treatment details."
            },
            {
              title: "2) We compare like-for-like",
              body: "We review treatment type, dosage/session scope, provider location, and inclusions."
            },
            {
              title: "3) Final decision in consultation",
              body: "Eligibility is confirmed alongside your suitability review and treatment plan."
            }
          ].map((item) => (
            <Card className="border-border/70 shadow-soft" key={item.title}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{item.body}</CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeading title="Eligibility conditions" />
        <Card className="border-border/70 shadow-soft">
          <CardContent className="space-y-3 p-5 text-sm text-muted-foreground">
            <p>Price match requests are reviewed case-by-case and may include these conditions:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Quote must be from a Leeds-area clinic and be current.</li>
              <li>Comparison must be for the same treatment route and similar scope.</li>
              <li>Safety, suitability, and clinician judgement always take priority.</li>
              <li>Discount stacking may be limited.</li>
            </ul>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button asChild>
                <Link href="/book">Book Free Consultation</Link>
              </Button>
              <Button asChild variant="ctaSecondary">
                <Link href="/contact">Message us with your quote</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section className="pt-0">
        <WhatsAppPanel
          description="Need a fast answer on a quote comparison? Send the details on WhatsApp and our team will advise on next steps."
          title="Quote check on WhatsApp"
        />
      </Section>

      <Section variant="muted">
        <SectionHeading title="Price match FAQs" />
        <FaqAccordion items={priceMatchFaqs} />
      </Section>

      <Section className="pt-0">
        <CtaStrip />
      </Section>

      <Section>
        <InternalLinksBlock
          links={[
            {
              href: "/pricing",
              label: "Pricing hub",
              description: "Compare treatment routes and pricing pages."
            },
            {
              href: "/pricing/aqualyx",
              label: "Aqualyx pricing",
              description: "Per-ml guide and area range context."
            },
            {
              href: "/book",
              label: "Book consultation",
              description: "Confirm your personalised quote pathway."
            }
          ]}
          title="Price match related links"
        />
      </Section>
    </>
  );
}
