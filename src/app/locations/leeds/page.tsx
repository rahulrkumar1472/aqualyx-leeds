import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CTACluster } from "@/components/layout/CTACluster";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = buildMetadata({
  title: "Aqualyx in Leeds",
  description: "Leeds clinic page with map, directions, contact options, and local trust details for Aqualyx Leeds.",
  path: "/locations/leeds"
});

export default function LeedsLocationPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14" containerClassName="rounded-[2rem] border border-primary/20 bg-card/85 p-6 shadow-soft sm:p-10" variant="gradient">
        <SectionHeading
          eyebrow="Leeds Clinic"
          subtext="Consultation-led treatment planning at the LS11 clinic with WhatsApp-first support."
          title="Aqualyx in Leeds (LS11)"
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>{siteConfig.address}</p>
            <p>Phone: {siteConfig.phoneDisplay}</p>
            <CTACluster compact />
          </div>
          <ImageFrame alt="Leeds clinic illustration" illustration="clinic" />
        </div>
      </Section>

      <Section>
        <SectionHeading title="How to get to us" />
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">By car</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Use LS11 5HL in your sat nav and choose the route that best matches live traffic conditions on the day.
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Parking</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Street or nearby options may be available; confirm local parking options on arrival.
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Public transport</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Leeds bus and rail routes provide access with a short local transfer depending on your starting point.
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeading title="Map and local trust links" />
        <div className="space-y-4">
          <iframe
            className="h-80 w-full rounded-[1.5rem] border border-border/70 bg-card"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={siteConfig.mapEmbedUrl}
            title="Map - Aqualyx Leeds"
          />
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="ctaSecondary">
              <a href={siteConfig.mapQueryUrl} rel="noopener noreferrer" target="_blank">
                Open in Google Maps
              </a>
            </Button>
            <Button asChild variant="ctaTertiary">
              <a href={siteConfig.phoneHref}>Call</a>
            </Button>
            <Button asChild variant="ctaSecondary">
              <a href={siteConfig.whatsappUrl} rel="noopener noreferrer" target="_blank">
                WhatsApp
              </a>
            </Button>
            <Button asChild>
              <a href={siteConfig.googleBusinessUrl} rel="noopener noreferrer" target="_blank">
                View Google Business Profile
              </a>
            </Button>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <CtaStrip />
      </Section>

      <Section>
        <InternalLinksBlock
          links={[
            {
              href: "/treatments/aqualyx",
              label: "Aqualyx pillar",
              description: "Treatment process and suitability guide."
            },
            {
              href: "/pricing/fat-dissolving",
              label: "Fat dissolving pricing",
              description: "Per-ml pricing and quote guidance."
            },
            {
              href: "/book",
              label: "Book consultation",
              description: "Submit booking request online."
            },
            {
              href: "/locations/near-leeds",
              label: "Areas near Leeds",
              description: "Browse nearby location pages."
            }
          ]}
          title="Leeds location links"
        />
      </Section>
    </>
  );
}

