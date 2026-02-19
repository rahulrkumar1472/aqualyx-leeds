import Script from "next/script";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { WhatsAppPanel } from "@/components/site/whatsapp-panel";
import { ImageFrame } from "@/components/media/ImageFrame";
import { aqualyxFaqs, generalFaqs } from "@/content/faqs";
import { buildMetadata, faqSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Aqualyx Leeds FAQs",
  description: "Frequently asked questions about Aqualyx, pricing, suitability, and booking in Leeds.",
  path: "/faqs"
});

const bookingFaqs = [
  {
    question: "Is consultation free?",
    answer: "Yes. Consultation is free and used to confirm suitability, timeline, and pricing guidance."
  },
  {
    question: "Can I message before booking?",
    answer: "Yes. WhatsApp is the fastest route for quick pre-booking questions."
  },
  {
    question: "How fast is follow-up after booking?",
    answer: "The team usually responds within 24 working hours."
  },
  {
    question: "What details should I prepare?",
    answer: "Your target area, treatment goals, preferred contact method, and any relevant treatment history."
  }
];
const faqItems = [...aqualyxFaqs, ...generalFaqs, ...bookingFaqs];

export default function FaqPage() {
  return (
    <>
      <Script
        id="faq-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }}
      />
      <HeroShell
        eyebrow="FAQ Hub"
        subline="Straightforward answers about process, pricing, safety, and booking at Aqualyx Leeds."
        title="Aqualyx Leeds FAQs"
        typewriterPhrases={[
          "Quick answers before you book",
          "Consultation is required for final suitability",
          "Message us on WhatsApp for fast clarifications"
        ]}
        visual={<ImageFrame alt="FAQ illustration" illustration="faq" />}
      />

      <Section>
        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            <div>
              <h2 className="mb-3 text-xl font-semibold">Aqualyx basics</h2>
              <FaqAccordion items={aqualyxFaqs.slice(0, 4)} />
            </div>
            <div>
              <h2 className="mb-3 text-xl font-semibold">Safety and suitability</h2>
              <FaqAccordion items={aqualyxFaqs.slice(4)} />
            </div>
            <div>
              <h2 className="mb-3 text-xl font-semibold">Booking and WhatsApp</h2>
              <FaqAccordion items={bookingFaqs} />
            </div>
            <div>
              <h2 className="mb-3 text-xl font-semibold">General clinic questions</h2>
              <FaqAccordion items={generalFaqs} />
            </div>
          </div>
          <WhatsAppPanel />
        </div>
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
