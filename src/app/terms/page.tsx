import { buildMetadata } from "@/lib/seo";
import { getAsset } from "@/content/assets";
import { siteConfig } from "@/content/site";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InternalLinksBlock } from "@/components/site/internal-links-block";

export const metadata = buildMetadata({
  title: "Terms and Conditions Leeds",
  description: "Terms and conditions for using the Aqualyx Leeds website and booking services.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <>
      <HeroShell
        eyebrow="Terms"
        subline="General terms for website use, bookings, and communication with Aqualyx Leeds."
        title="Terms and Conditions"
        trustPills={["Leeds clinic", "Clear booking terms", "Consultation required", "Transparent communication"]}
        typewriterPhrases={[
          "Booking requests are confirmed by clinic follow-up.",
          "Website content is informational, not a diagnosis.",
          "Use approved clinic channels for care decisions."
        ]}
        visual={<ImageFrame alt="Terms overview" illustration="faq" preferPhoto src={getAsset("clinic", "gallery", 1)} />}
      />

      <Section>
        <Card className="mb-4 border-primary/20 bg-primary/5 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Website information is educational and does not replace consultation.</p>
            <p>Booking requests are confirmed only after clinic follow-up.</p>
            <p>Last updated: 19 February 2026.</p>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Use of this website</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Content is for general information only.</p>
              <p>• Clinical suitability is confirmed during consultation.</p>
              <p>• You must not misuse forms or attempt unauthorised access.</p>
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Booking terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Submitted requests are not instant confirmed appointments.</p>
              <p>• Slot options may vary based on clinic availability.</p>
              <p>• Treatment plans are agreed only after consultation.</p>
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-muted-foreground">
              <p>{siteConfig.address}</p>
              <p>Phone: {siteConfig.phoneDisplay}</p>
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
