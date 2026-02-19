import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { availabilityConfig } from "@/content/availability";
import { nearLeedsAreas } from "@/content/locations";
import { siteConfig } from "@/content/site";
import { getAsset } from "@/content/assets";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = buildMetadata({
  title: "Areas Near Leeds",
  description: "Aqualyx Leeds serves Leeds and surrounding areas through one consultation-led clinic pathway.",
  path: "/locations/near-leeds"
});

export default function NearLeedsPage() {
  const hoursSummary = [
    `Mon-Tue ${availabilityConfig.openingHours.monday[0]?.start}-${availabilityConfig.openingHours.monday[0]?.end}`,
    `Wed-Thu ${availabilityConfig.openingHours.wednesday[0]?.start}-${availabilityConfig.openingHours.wednesday[0]?.end}`,
    `Fri ${availabilityConfig.openingHours.friday[0]?.start}-${availabilityConfig.openingHours.friday[0]?.end}`,
    `Sat ${availabilityConfig.openingHours.saturday[0]?.start}-${availabilityConfig.openingHours.saturday[0]?.end}`,
    "Sun Closed"
  ].join(" • ");

  return (
    <>
      <HeroShell
        eyebrow="Local Coverage"
        priceTeaser="Treatment delivered at LS11 clinic"
        subline="Serving Leeds and surrounding areas from one LS11 clinic with transparent pricing and fast booking support."
        title="Areas near Leeds"
        typewriterPhrases={[
          "One Leeds clinic serving surrounding areas",
          "Book online or message us on WhatsApp",
          "Consultation-led planning for each area"
        ]}
        visual={
          <ImageFrame
            alt="Near Leeds coverage illustration"
            className="min-h-[260px]"
            illustration="locationMap"
            preferPhoto
            src={getAsset("locations", "gallery", 2)}
          />
        }
      />

      <Section>
        <div className="mb-4 overflow-hidden rounded-[1.4rem] border border-border/70 bg-card shadow-soft">
          <table className="w-full text-left text-sm">
            <tbody>
              <tr className="border-b border-border/60">
                <th className="w-44 px-3 py-2 text-xs uppercase tracking-wide text-muted-foreground">Address</th>
                <td className="px-3 py-2 text-muted-foreground">{siteConfig.address}</td>
              </tr>
              <tr>
                <th className="px-3 py-2 text-xs uppercase tracking-wide text-muted-foreground">Opening hours</th>
                <td className="px-3 py-2 text-muted-foreground">{hoursSummary}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <SectionHeading title="Choose your local area page" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {nearLeedsAreas.map((area) => (
            <Card className="border-border/70 shadow-soft" key={area.slug}>
              <CardHeader>
                <CardTitle>{area.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>{area.intro}</p>
                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="outline">
                    <Link href={`/locations/areas/${area.slug}`}>Aqualyx in {area.name}</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/book">Book</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
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
              description: "Primary treatment page for local intent."
            },
            {
              href: "/pricing/fat-dissolving",
              label: "Fat dissolving pricing",
              description: "Per-ml guide for nearby-area visitors."
            },
            {
              href: "/book",
              label: "Book consultation",
              description: "Submit booking request online."
            }
          ]}
          title="Near-Leeds links"
        />
      </Section>
    </>
  );
}
