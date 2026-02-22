import Script from "next/script";
import { buildMetadata } from "@/lib/seo";
import { availabilityConfig } from "@/content/availability";
import { siteConfig } from "@/content/site";
import { getAsset } from "@/content/assets";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { CTACluster } from "@/components/layout/CTACluster";
import { SectionHeading } from "@/components/layout/SectionHeading";
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
  const openingRows = [
    { day: "Monday", slots: availabilityConfig.openingHours.monday },
    { day: "Tuesday", slots: availabilityConfig.openingHours.tuesday },
    { day: "Wednesday", slots: availabilityConfig.openingHours.wednesday },
    { day: "Thursday", slots: availabilityConfig.openingHours.thursday },
    { day: "Friday", slots: availabilityConfig.openingHours.friday },
    { day: "Saturday", slots: availabilityConfig.openingHours.saturday },
    { day: "Sunday", slots: availabilityConfig.openingHours.sunday }
  ];

  const locationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: siteConfig.name,
    url: `${siteConfig.siteUrl}/locations/leeds`,
    telephone: siteConfig.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addressStructured.streetAddress,
      addressLocality: siteConfig.addressStructured.addressLocality,
      postalCode: siteConfig.addressStructured.postalCode,
      addressCountry: siteConfig.addressStructured.addressCountry
    },
    areaServed: ["Leeds", "West Yorkshire"],
    hasMap: siteConfig.mapQueryUrl,
    sameAs: [siteConfig.googleBusinessUrl, siteConfig.whatsappUrl],
    openingHoursSpecification: openingRows.flatMap((row) =>
      row.slots.map((slot) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${row.day}`,
        opens: slot.start,
        closes: slot.end
      }))
    )
  };

  return (
    <>
      <Script
        id="leeds-location-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
      />
      <HeroShell
        ctaCluster={<CTACluster compact />}
        eyebrow="Leeds Clinic"
        priceTeaser={siteConfig.address}
        subline="Consultation-led treatment planning at the LS11 clinic with WhatsApp-first support."
        title="Aqualyx in Leeds (LS11)"
        typewriterPhrases={[
          "Leeds clinic with clear access and map links",
          "WhatsApp-first support with call backup",
          "Book online and confirm your consultation slot"
        ]}
        visual={<ImageFrame alt="Leeds clinic illustration" illustration="locationMap" preferPhoto src={getAsset("locations", "gallery", 1)} />}
      />

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
          <div className="overflow-hidden rounded-[1.4rem] border border-border/70 bg-card shadow-soft">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-2">Address</th>
                  <th className="px-3 py-2">Opening hours</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border/60 align-top">
                  <td className="px-3 py-3 text-muted-foreground">{siteConfig.address}</td>
                  <td className="px-3 py-3">
                    <div className="space-y-1 text-xs text-muted-foreground">
                      {openingRows.map((row) => (
                        <p key={row.day}>
                          <span className="font-medium text-foreground">{row.day}:</span>{" "}
                          {row.slots.length ? row.slots.map((slot) => `${slot.start}-${slot.end}`).join(", ") : "Closed"}
                        </p>
                      ))}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
