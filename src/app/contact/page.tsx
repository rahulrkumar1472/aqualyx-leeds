import { buildMetadata } from "@/lib/seo";
import { availabilityConfig } from "@/content/availability";
import { siteConfig } from "@/content/site";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { CTACluster } from "@/components/layout/CTACluster";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { ContactForm } from "@/components/forms/contact-form";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = buildMetadata({
  title: "Contact Aqualyx Leeds",
  description: "Contact Aqualyx Leeds by WhatsApp, phone, or booking form. Includes map and Google profile.",
  path: "/contact"
});

export default function ContactPage() {
  const openingHours = [
    `Mon-Tue ${availabilityConfig.openingHours.monday[0]?.start}-${availabilityConfig.openingHours.monday[0]?.end}`,
    `Wed-Thu ${availabilityConfig.openingHours.wednesday[0]?.start}-${availabilityConfig.openingHours.wednesday[0]?.end}`,
    `Fri ${availabilityConfig.openingHours.friday[0]?.start}-${availabilityConfig.openingHours.friday[0]?.end}`,
    `Sat ${availabilityConfig.openingHours.saturday[0]?.start}-${availabilityConfig.openingHours.saturday[0]?.end}`,
    "Sun Closed"
  ];

  return (
    <>
      <HeroShell
        eyebrow="Contact"
        priceTeaser="WhatsApp-first support"
        subline="Speak to us on WhatsApp first for quick answers, then book consultation online."
        title="Contact Aqualyx Leeds"
        typewriterPhrases={[
          "Fast WhatsApp replies for treatment questions",
          "Book your consultation online in minutes",
          "Leeds clinic support with transparent pricing"
        ]}
        visual={<ImageFrame alt="Clinic illustration" illustration="locationMap" />}
      />

      <Section>
        <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-primary/20 bg-primary/5 shadow-soft">
            <CardContent className="space-y-2 p-4 text-sm">
              <p className="font-semibold text-foreground">WhatsApp</p>
              <p className="text-muted-foreground">Fast replies from the Leeds team.</p>
              <Button asChild size="sm" variant="ctaSecondary">
                <a href={siteConfig.whatsappUrl} rel="noopener noreferrer" target="_blank">
                  Message now
                </a>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardContent className="space-y-2 p-4 text-sm">
              <p className="font-semibold text-foreground">Call</p>
              <p className="text-muted-foreground">{siteConfig.phoneDisplay}</p>
              <Button asChild size="sm" variant="ctaTertiary">
                <a href={siteConfig.phoneHref}>Call clinic</a>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardContent className="space-y-2 p-4 text-sm">
              <p className="font-semibold text-foreground">Address</p>
              <p className="text-muted-foreground">{siteConfig.address}</p>
              <Button asChild size="sm" variant="outline">
                <a href={siteConfig.mapQueryUrl} rel="noopener noreferrer" target="_blank">
                  Directions
                </a>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardContent className="space-y-2 p-4 text-sm">
              <p className="font-semibold text-foreground">Opening hours</p>
              <p className="text-muted-foreground">{openingHours.join(" • ")}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactForm />
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
