import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InternalLinksBlock } from "@/components/site/internal-links-block";

export const metadata = buildMetadata({
  title: "Cookie Policy Leeds",
  description: "Cookie policy for Aqualyx Leeds website analytics and site functionality.",
  path: "/cookie-policy"
});

export default function CookiePolicyPage() {
  return (
    <>
      <HeroShell
        eyebrow="Cookies"
        subline="How cookies are used on the Aqualyx Leeds website."
        title="Cookie Policy"
        trustPills={["Performance insights", "Core site functionality", "No medical diagnosis", "Leeds clinic support"]}
        typewriterPhrases={[
          "Cookies support core website functionality.",
          "Analytics helps improve user experience.",
          "Treatment suitability is confirmed in consultation."
        ]}
        visual={<ImageFrame alt="Cookie policy overview" illustration="faq" />}
      />

      <Section>
        <Card className="mb-4 border-primary/20 bg-primary/5 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Essential cookies help core website functionality work properly.</p>
            <p>Analytics cookies support service improvement.</p>
            <p>Last updated: 19 February 2026.</p>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Cookie categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Essential: required for site reliability.</p>
              <p>• Analytics: helps us understand page performance and user flow.</p>
              <p>• Preference cookies: may store interface settings where available.</p>
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Your control options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• You can manage cookies in your browser settings.</p>
              <p>• Blocking some cookies may affect page functionality.</p>
              <p>• Use contact channels if you need policy clarification.</p>
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
            { href: "/privacy", label: "Privacy policy", description: "See how website data is handled." }
          ]}
          title="Useful links"
        />
      </Section>
    </>
  );
}
