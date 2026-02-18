import { ConsultationForm } from "@/components/booking/consultation-form";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CTACluster } from "@/components/layout/CTACluster";
import { InlineNotice } from "@/components/layout/InlineNotice";
import { CtaStrip } from "@/components/site/cta-strip";
import { ImageFrame } from "@/components/media/ImageFrame";
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
      <Section className="pt-10 sm:pt-14" containerClassName="rounded-[2rem] border border-primary/20 bg-card/85 p-6 shadow-soft sm:p-10" variant="gradient">
        <SectionHeading
          eyebrow="Booking"
          subtext="Complete the steps to submit your request. We’ll confirm availability and suitability follow-up."
          title="Book Free Consultation"
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div className="space-y-3">
            <CTACluster compact includeCall={false} />
            <InlineNotice>
              Consultation is required to confirm treatment suitability, dosage, and final pricing.
            </InlineNotice>
          </div>
          <ImageFrame alt="Booking illustration" illustration="clinic" />
        </div>
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
