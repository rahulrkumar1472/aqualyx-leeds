import { ConsultationForm } from "@/components/booking/consultation-form";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { InlineNotice } from "@/components/layout/InlineNotice";
import { CtaStrip } from "@/components/site/cta-strip";
import { ImageFrame } from "@/components/media/ImageFrame";
import { getAsset } from "@/content/assets";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book Consultation Leeds",
  description:
    "Book your free consultation with Aqualyx Leeds using our internal booking form. Fast response and transparent pricing from £99.",
  path: "/book"
});

export default function BookPage({
  searchParams
}: {
  searchParams?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
  };
}) {
  return (
    <>
      <HeroShell
        eyebrow="Booking"
        priceTeaser="Transparent pricing from £99 after assessment"
        subline="Complete the steps to submit your request. We’ll confirm availability and suitability follow-up."
        title="Book Free Consultation"
        trustPills={["Leeds clinic (LS11)", "Consultation-led", "WhatsApp-first replies", "Results vary"]}
        typewriterPhrases={[
          "Consultation-led treatment planning in Leeds (LS11)",
          "WhatsApp-friendly follow-up after your request",
          "Secure your preferred date and time now"
        ]}
        visual={<ImageFrame alt="Booking illustration" illustration="clinic" preferPhoto src={getAsset("clinic", "hero")} />}
      />

      <Section className="pt-0">
        <InlineNotice>
          Consultation is required to confirm treatment suitability, dosage, and final pricing.
        </InlineNotice>
      </Section>

      <Section>
        <ConsultationForm
          pagePath="/book"
          utmCampaign={searchParams?.utm_campaign}
          utmContent={searchParams?.utm_content}
          utmMedium={searchParams?.utm_medium}
          utmSource={searchParams?.utm_source}
          utmTerm={searchParams?.utm_term}
        />
      </Section>

      <Section className="pt-0">
        <CtaStrip title="Need help before booking?" />
      </Section>
    </>
  );
}
