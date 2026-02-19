import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InternalLinksBlock } from "@/components/site/internal-links-block";

export const metadata = buildMetadata({
  title: "Privacy Policy Leeds",
  description: "Privacy policy for Aqualyx Leeds website enquiries, lead capture, and booking requests.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <>
      <HeroShell
        eyebrow="Privacy"
        subline="How Aqualyx Leeds handles website form data, contact details, and booking requests."
        title="Privacy Policy"
        trustPills={["Leeds clinic", "Secure lead handling", "Consultation required", "Clear contact options"]}
        typewriterPhrases={[
          "Your data supports booking and enquiry follow-up.",
          "We do not sell personal data to third parties.",
          "Contact us directly for privacy requests."
        ]}
        visual={<ImageFrame alt="Privacy overview" illustration="faq" />}
      />

      <Section>
        <Card className="mb-4 border-primary/20 bg-primary/5 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>We only collect data needed to respond to enquiries and manage consultations.</p>
            <p>We do not sell your personal data.</p>
            <p>Last updated: 19 February 2026.</p>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">What we collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Name, email, phone, and enquiry details.</p>
              <p>• Booking preferences and treatment interest.</p>
              <p>• Technical site data used for performance and security.</p>
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">How we use it</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Respond to enquiries and confirm appointments.</p>
              <p>• Maintain booking and follow-up records.</p>
              <p>• Improve service quality and communication speed.</p>
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Contact for privacy requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-muted-foreground">
              <p>{siteConfig.address}</p>
              <p>Phone: {siteConfig.phoneDisplay}</p>
              <p>
                WhatsApp:{" "}
                <a className="font-medium text-foreground underline" href={siteConfig.whatsappUrl} rel="noopener noreferrer" target="_blank">
                  {siteConfig.whatsappDisplay}
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <InternalLinksBlock
          links={[
            { href: "/contact", label: "Contact", description: "Speak with the clinic team directly." },
            { href: "/book", label: "Book consultation", description: "Submit your booking request online." }
          ]}
          title="Useful links"
        />
      </Section>
    </>
  );
}
