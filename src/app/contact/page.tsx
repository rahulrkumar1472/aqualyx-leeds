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
  title: "Contact Aqualyx Leeds",
  description: "Contact Aqualyx Leeds by WhatsApp, phone, or booking form. Includes map and Google profile.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14" containerClassName="rounded-[2rem] border border-primary/20 bg-card/85 p-6 shadow-soft sm:p-10" variant="gradient">
        <SectionHeading
          eyebrow="Contact"
          subtext="Speak to us on WhatsApp first for quick answers, then book consultation online."
          title="Contact Aqualyx Leeds"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <ImageFrame alt="Clinic illustration" illustration="clinic" />
          <ImageFrame alt="Treatment illustration" illustration="aqualyx" />
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle>Clinic details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>{siteConfig.address}</p>
              <p>
                Phone: <a className="font-medium text-foreground underline" href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
              </p>
              <p>
                WhatsApp:{" "}
                <a className="font-medium text-foreground underline" href={siteConfig.whatsappUrl} rel="noopener noreferrer" target="_blank">
                  {siteConfig.whatsappDisplay}
                </a>
              </p>
              <CTACluster compact />
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle>Map and trust links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <iframe
                className="h-72 w-full rounded-2xl border border-border/70"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={siteConfig.mapEmbedUrl}
                title="Aqualyx Leeds map"
              />
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="ctaTertiary">
                  <a href={siteConfig.mapQueryUrl} rel="noopener noreferrer" target="_blank">
                    Open in Google Maps
                  </a>
                </Button>
                <Button asChild variant="ctaSecondary">
                  <a href={siteConfig.googleBusinessUrl} rel="noopener noreferrer" target="_blank">
                    View Google Business Profile
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="pt-0">
        <CtaStrip />
      </Section>

      <Section>
        <InternalLinksBlock
          links={[
            {
              href: "/locations/leeds",
              label: "Leeds location",
              description: "Directions and location details."
            },
            {
              href: "/faqs",
              label: "FAQs",
              description: "Read treatment and booking questions."
            }
          ]}
          title="Contact links"
        />
      </Section>
    </>
  );
}

