import Link from "next/link";
import { notFound } from "next/navigation";
import { nearLeedsAreas } from "@/content/locations";
import { buildMetadata } from "@/lib/seo";
import { availabilityConfig } from "@/content/availability";
import { siteConfig } from "@/content/site";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CTACluster } from "@/components/layout/CTACluster";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function generateStaticParams() {
  return nearLeedsAreas.map((area) => ({ area: area.slug }));
}

export async function generateMetadata({ params }: { params: { area: string } }) {
  const match = nearLeedsAreas.find((area) => area.slug === params.area);

  if (!match) {
    return buildMetadata({
      title: "Area not found in Leeds",
      description: "Area page not found for Aqualyx Leeds.",
      path: "/locations/near-leeds"
    });
  }

  return buildMetadata({
    title: `Aqualyx in ${match.name} (Leeds)`,
    description: `Aqualyx access for ${match.name} residents, with treatment delivered at the LS11 Leeds clinic.`,
    path: `/locations/areas/${match.slug}`
  });
}

export default function AreaLocationPage({ params }: { params: { area: string } }) {
  const area = nearLeedsAreas.find((entry) => entry.slug === params.area);
  if (!area) notFound();
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
        ctaCluster={<CTACluster compact />}
        eyebrow="Area Page"
        priceTeaser="Treatment delivered at LS11 clinic"
        subline={`Treatment for ${area.name} clients is delivered at our Leeds clinic on Tunstall Road, LS11 5HL.`}
        title={`Aqualyx in ${area.name} (Leeds)`}
        typewriterPhrases={[
          `Serving ${area.name} with Leeds clinic treatment`,
          "Consultation-led pathway with transparent pricing",
          "Book online or message us on WhatsApp"
        ]}
        visual={<ImageFrame alt={`Aqualyx in ${area.name}`} illustration="locationMap" />}
      />

      <Section className="pt-0">
        <p className="mb-4 text-sm text-muted-foreground">{area.intro}</p>
        <div className="overflow-hidden rounded-[1.4rem] border border-border/70 bg-card shadow-soft">
          <table className="w-full text-left text-sm">
            <tbody>
              <tr className="border-b border-border/60">
                <th className="w-44 px-3 py-2 text-xs uppercase tracking-wide text-muted-foreground">Clinic address</th>
                <td className="px-3 py-2 text-muted-foreground">{siteConfig.address}</td>
              </tr>
              <tr>
                <th className="px-3 py-2 text-xs uppercase tracking-wide text-muted-foreground">Opening hours</th>
                <td className="px-3 py-2 text-muted-foreground">{hoursSummary}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <Card className="border-primary/20 bg-primary/5 shadow-soft">
          <CardHeader>
            <CardTitle>Book in Leeds clinic</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Prefer to secure your slot now? Use online booking or message us on WhatsApp for quick help.</p>
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <Link href="/book">Book Free Consultation</Link>
              </Button>
              <Button asChild variant="ctaSecondary">
                <a href={siteConfig.whatsappUrl} rel="noopener noreferrer" target="_blank">
                  WhatsApp
                </a>
              </Button>
              <Button asChild variant="ctaTertiary">
                <a href={siteConfig.phoneHref}>Call</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section variant="muted">
        <SectionHeading title="Travel and directions" />
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">How far from LS11 5HL</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              The clinic is set up for straightforward travel from {area.name}. Journey times vary with traffic and
              transport schedules.
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">By car and parking</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Use LS11 5HL in sat nav. Street or nearby parking options may be available; confirm on arrival day.
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Public transport</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Leeds transport links can provide access with local final-leg options depending on your route.
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="pt-0">
        <CtaStrip title="Ready to book from your area?" />
      </Section>

      <Section>
        <Card className="border-primary/20 bg-primary/5 shadow-soft">
          <CardHeader>
            <CardTitle>Book in Leeds clinic</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Treatment is delivered at {siteConfig.address}. Book online or contact us directly for guidance.</p>
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <Link href="/book">Book Free Consultation</Link>
              </Button>
              <Button asChild variant="ctaSecondary">
                <a href={siteConfig.whatsappUrl} rel="noopener noreferrer" target="_blank">
                  WhatsApp
                </a>
              </Button>
              <Button asChild variant="ctaTertiary">
                <a href={siteConfig.phoneHref}>Call</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section>
        <InternalLinksBlock
          links={[
            {
              href: "/treatments/aqualyx",
              label: "Aqualyx pillar",
              description: "Main treatment guidance page."
            },
            {
              href: "/pricing/fat-dissolving",
              label: "Fat dissolving pricing",
              description: "Per-ml pricing and quote details."
            },
            {
              href: "/faqs",
              label: "FAQs",
              description: "Common treatment and safety questions."
            },
            {
              href: "/locations/leeds",
              label: "Leeds location",
              description: "Directions, map, and contact details."
            }
          ]}
          title="Area links"
        />
      </Section>
    </>
  );
}
