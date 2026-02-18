import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CTACluster } from "@/components/layout/CTACluster";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = buildMetadata({
  title: "About Aqualyx Leeds",
  description: "Learn about Aqualyx Leeds clinical approach, consultation process, and treatment values.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14" containerClassName="rounded-[2rem] border border-primary/20 bg-card/85 p-6 shadow-soft sm:p-10" variant="gradient">
        <SectionHeading
          eyebrow="About"
          subtext="Aqualyx Leeds focuses on consultation-led contour pathways with transparent communication and realistic expectations."
          title="About Aqualyx Leeds"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <ImageFrame alt="Aqualyx clinic illustration" illustration="clinic" />
          <ImageFrame alt="Aqualyx treatment illustration" illustration="aqualyx" />
        </div>
      </Section>

      <Section>
        <SectionHeading title="What guides our approach" />
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Clinical guidance & suitability</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Treatment decisions are made after assessment, not assumed in advance.
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Transparent pricing</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              We explain pricing clearly and confirm final cost after consultation.
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Structured follow-up</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Aftercare and review checkpoints are part of planning, not an afterthought.
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeading title="Clinic details" />
        <p className="text-sm text-muted-foreground">{siteConfig.address}</p>
        <p className="text-sm text-muted-foreground">Phone: {siteConfig.phoneDisplay}</p>
        <div className="mt-4">
          <CTACluster />
        </div>
      </Section>

      <Section className="pt-0">
        <CtaStrip />
      </Section>

      <Section>
        <InternalLinksBlock
          links={[
            {
              href: "/contact",
              label: "Contact",
              description: "Map, WhatsApp, call, and booking links."
            },
            {
              href: "/treatments/lemon-bottle",
              label: "Lemon Bottle",
              description: "Supporting treatment comparison page."
            }
          ]}
          title="About page links"
        />
      </Section>
    </>
  );
}

