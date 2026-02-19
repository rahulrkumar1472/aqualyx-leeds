import { buildMetadata } from "@/lib/seo";
import { getAsset } from "@/content/assets";
import { siteConfig } from "@/content/site";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InternalLinksBlock } from "@/components/site/internal-links-block";

export const metadata = buildMetadata({
  title: "Medical Disclaimer Leeds",
  description: "Medical disclaimer for Aqualyx Leeds website content and treatment information.",
  path: "/medical-disclaimer"
});

export default function MedicalDisclaimerPage() {
  return (
    <>
      <HeroShell
        eyebrow="Medical Disclaimer"
        subline="Important information about website content, suitability, and treatment expectations."
        title="Medical Disclaimer"
        trustPills={["Information only", "Consultation required", "Results vary", "Leeds clinic support"]}
        typewriterPhrases={[
          "Website content is educational and informational.",
          "Clinical suitability is confirmed in person.",
          "No treatment outcomes are guaranteed."
        ]}
        visual={<ImageFrame alt="Medical disclaimer overview" illustration="faq" preferPhoto src={getAsset("clinic", "gallery", 3)} />}
      />

      <Section>
        <Card className="mb-4 border-primary/20 bg-primary/5 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Website content is informational and does not replace medical advice.</p>
            <p>Consultation is required before treatment decisions are made.</p>
            <p>Last updated: 19 February 2026.</p>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Important points</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Treatment suitability is confirmed in person only.</p>
              <p>• Outcomes vary by person, area, and aftercare adherence.</p>
              <p>• No outcome can be guaranteed.</p>
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">When to seek help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Contact the clinic for non-urgent treatment concerns.</p>
              <p>• Seek urgent medical support for severe or worsening symptoms.</p>
              <p>• Follow your post-treatment advice and review schedule.</p>
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Clinic contact details</CardTitle>
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
            { href: "/treatments/aqualyx", label: "Aqualyx treatment guide", description: "Clinical overview and FAQs." },
            { href: "/faqs", label: "FAQs", description: "Read common safety and booking questions." }
          ]}
          title="Useful links"
        />
      </Section>
    </>
  );
}
