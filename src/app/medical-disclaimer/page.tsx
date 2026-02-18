import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";

export const metadata = buildMetadata({
  title: "Medical Disclaimer Leeds",
  description: "Medical disclaimer for Aqualyx Leeds website content and treatment information.",
  path: "/medical-disclaimer"
});

export default function MedicalDisclaimerPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14" containerClassName="rounded-[2rem] border border-primary/20 bg-card/85 p-6 shadow-soft sm:p-10" variant="gradient">
        <SectionHeading title="Medical Disclaimer" subtext="Important information about website content, suitability, and treatment expectations." />
      </Section>

      <Section>
        <div className="space-y-5 text-sm text-muted-foreground">
          <p>
            Content on this website is educational and does not constitute medical advice, diagnosis, or treatment.
            Clinical suitability is confirmed only through consultation with an appropriate practitioner.
          </p>
          <p>
            All treatment outcomes vary by individual. No result can be guaranteed, and timelines can differ depending
            on area, baseline profile, and aftercare adherence.
          </p>
          <p>
            If you have urgent symptoms or concerns after treatment, seek appropriate medical attention.
          </p>
        </div>
      </Section>
    </>
  );
}
