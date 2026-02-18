import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";

export const metadata = buildMetadata({
  title: "Cookie Policy Leeds",
  description: "Cookie policy for Aqualyx Leeds website analytics and site functionality.",
  path: "/cookie-policy"
});

export default function CookiePolicyPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14" containerClassName="rounded-[2rem] border border-primary/20 bg-card/85 p-6 shadow-soft sm:p-10" variant="gradient">
        <SectionHeading title="Cookie Policy" subtext="How cookies are used on the Aqualyx Leeds website." />
      </Section>

      <Section>
        <div className="space-y-5 text-sm text-muted-foreground">
          <p>
            This site may use essential cookies required for core functionality, along with analytics cookies used to
            understand general site performance and improve user experience.
          </p>
          <p>
            Cookies do not replace clinical records and are not used to make medical decisions. Users can control cookie
            settings in their browser where available.
          </p>
          <p>
            Continued use of the site indicates acceptance of this cookie policy and related privacy terms.
          </p>
        </div>
      </Section>
    </>
  );
}
