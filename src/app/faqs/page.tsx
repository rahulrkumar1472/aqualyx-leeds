import Script from "next/script";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CTACluster } from "@/components/layout/CTACluster";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { ImageFrame } from "@/components/media/ImageFrame";
import { aqualyxFaqs, generalFaqs } from "@/content/faqs";
import { buildMetadata, faqSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Aqualyx Leeds FAQs",
  description: "Frequently asked questions about Aqualyx, pricing, suitability, and booking in Leeds.",
  path: "/faqs"
});

const faqItems = [...aqualyxFaqs, ...generalFaqs];

export default function FaqPage() {
  return (
    <>
      <Script
        id="faq-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }}
      />
      <Section className="pt-10 sm:pt-14" containerClassName="rounded-[2rem] border border-primary/20 bg-card/85 p-6 shadow-soft sm:p-10" variant="gradient">
        <SectionHeading
          eyebrow="FAQ Hub"
          subtext="Straightforward answers about process, pricing, safety, and booking at Aqualyx Leeds."
          title="Aqualyx Leeds FAQs"
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <CTACluster compact includeCall={false} />
          <ImageFrame alt="FAQ illustration" illustration="clinic" />
        </div>
      </Section>

      <Section>
        <FaqAccordion items={faqItems} />
      </Section>

      <Section className="pt-0">
        <CtaStrip />
      </Section>

      <Section>
        <InternalLinksBlock
          links={[
            {
              href: "/results",
              label: "Results",
              description: "View contextual gallery and case snapshots."
            },
            {
              href: "/treatments/fat-freezing",
              label: "Fat freezing",
              description: "Compare non-invasive treatment options."
            }
          ]}
          title="FAQ links"
        />
      </Section>
    </>
  );
}

