import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";

export const metadata = buildMetadata({
  title: "Terms and Conditions Leeds",
  description: "Terms and conditions for using the Aqualyx Leeds website and booking services.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14" containerClassName="rounded-[2rem] border border-primary/20 bg-card/85 p-6 shadow-soft sm:p-10" variant="gradient">
        <SectionHeading title="Terms and Conditions" subtext="General terms for website use, bookings, and communication with Aqualyx Leeds." />
      </Section>

      <Section>
        <div className="space-y-5 text-sm text-muted-foreground">
          <p>
            Website content is provided for informational purposes. Treatment suitability and final recommendations are
            made only after consultation.
          </p>
          <p>
            Booking requests submitted through the website are not confirmed appointments until acknowledged by the
            clinic. Availability may change and alternative slots may be offered.
          </p>
          <p>
            By using this website, you agree not to misuse forms, submit false information, or attempt unauthorised
            access to site systems.
          </p>
        </div>
      </Section>
    </>
  );
}
