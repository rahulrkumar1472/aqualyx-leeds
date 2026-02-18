import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";

export const metadata = buildMetadata({
  title: "Privacy Policy Leeds",
  description: "Privacy policy for Aqualyx Leeds website enquiries, lead capture, and booking requests.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14" containerClassName="rounded-[2rem] border border-primary/20 bg-card/85 p-6 shadow-soft sm:p-10" variant="gradient">
        <SectionHeading title="Privacy Policy" subtext="How Aqualyx Leeds handles website form data, contact details, and booking requests." />
      </Section>

      <Section>
        <div className="space-y-5 text-sm text-muted-foreground">
          <p>
            We collect information submitted through this website, including name, phone, email, treatment interest,
            and booking details. This information is used to respond to enquiries, manage appointments, and provide
            treatment-related communications.
          </p>
          <p>
            Data is processed for operational purposes only and is not sold to third parties. Access is limited to team
            members who need it for service delivery. Data may be retained as required for booking administration,
            audit, or legal obligations.
          </p>
          <p>
            If you need to update or request removal of your personal data, contact the clinic directly through the
            details listed on the contact page.
          </p>
        </div>
      </Section>
    </>
  );
}
