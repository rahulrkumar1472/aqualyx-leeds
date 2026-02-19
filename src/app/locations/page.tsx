import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { nearLeedsAreas } from "@/content/locations";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAsset } from "@/content/assets";

export const metadata = buildMetadata({
  title: "Aqualyx Leeds Locations",
  description: "Location hub for Leeds clinic access and nearby area pages served by Aqualyx Leeds.",
  path: "/locations"
});

export default function LocationsHubPage() {
  return (
    <>
      <HeroShell
        eyebrow="Location Hub"
        subline="Treatment is delivered at the LS11 clinic, with local support pages for nearby areas around Leeds."
        title="Aqualyx Leeds Locations"
        typewriterPhrases={[
          "One Leeds clinic serving surrounding areas",
          "Directions, transport notes, and local booking routes",
          "WhatsApp-first support for quick local queries"
        ]}
        visual={<ImageFrame alt="Leeds location illustration" illustration="locationMap" preferPhoto src={getAsset("locations", "hero")} />}
      />

      <Section>
        <SectionHeading title="Primary location pages" />
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle>
                <Link className="hover:underline" href="/locations/leeds">
                  Leeds clinic page
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Map, directions, NAP details, and direct WhatsApp/call actions.
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle>
                <Link className="hover:underline" href="/locations/near-leeds">
                  Areas near Leeds
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Local-intent area pages with booking links back to the Leeds clinic.
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeading title="Nearby areas served" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {nearLeedsAreas.map((area) => (
            <Link
              className="rounded-2xl border border-border/70 bg-card px-4 py-3 text-sm shadow-soft transition hover:border-primary/35"
              href={`/locations/areas/${area.slug}`}
              key={area.slug}
            >
              Aqualyx in {area.name}
            </Link>
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
              description: "Main treatment page for Leeds intent."
            },
            {
              href: "/pricing/fat-dissolving",
              label: "Fat dissolving pricing",
              description: "Transparent per-ml pricing guide."
            },
            {
              href: "/book",
              label: "Book consultation",
              description: "Submit booking request online."
            }
          ]}
          title="Location links"
        />
      </Section>
    </>
  );
}
