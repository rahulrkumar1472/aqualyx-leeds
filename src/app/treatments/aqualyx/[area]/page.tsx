import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ImageFrame } from "@/components/media/ImageFrame";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { WhatsAppPanel } from "@/components/site/whatsapp-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAsset } from "@/content/assets";
import { aqualyxAreaPages } from "@/content/services";
import { faqSchema, serviceSchema } from "@/lib/seo";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return aqualyxAreaPages.map((area) => ({ area: area.slug }));
}

export async function generateMetadata({ params }: { params: { area: string } }) {
  const match = aqualyxAreaPages.find((item) => item.slug === params.area);
  if (!match) {
    return buildMetadata({
      title: "Aqualyx area page",
      description: "Aqualyx Leeds treatment area page.",
      path: "/treatments/aqualyx"
    });
  }

  return buildMetadata({
    title: `Aqualyx for ${match.areaName} in Leeds`,
    description: `${match.areaName} consultation-led Aqualyx guidance for Leeds, including timeline, dosage range context, and FAQs.`,
    path: `/treatments/aqualyx/${match.slug}`
  });
}

export default function AqualyxAreaPage({ params }: { params: { area: string } }) {
  const area = aqualyxAreaPages.find((item) => item.slug === params.area);
  if (!area) notFound();

  return (
    <>
      <Script
        id={`aqualyx-${area.slug}-service-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(
              `Aqualyx for ${area.areaName} in Leeds`,
              `/treatments/aqualyx/${area.slug}`,
              area.intro
            )
          )
        }}
      />
      <Script
        id={`aqualyx-${area.slug}-faq-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(area.faqs)) }}
      />

      <HeroShell
        eyebrow="Aqualyx Area Guide"
        priceTeaser={area.mlRange}
        subline={area.intro}
        title={`Aqualyx for ${area.areaName} in Leeds`}
        typewriterPhrases={[
          "Consultation confirms suitability and dosage range",
          "Clear timeline expectations and aftercare guidance",
          "Book online or message us on WhatsApp"
        ]}
        visual={<ImageFrame alt={`Aqualyx for ${area.areaName}`} illustration="aqualyx" preferPhoto src={getAsset("treatments/aqualyx", "gallery", 2)} />}
      />

      <Section className="pt-0">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="border-border/70 shadow-soft">
            <CardContent className="space-y-1 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Area</p>
              <p className="text-sm font-semibold text-foreground">{area.areaName}</p>
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardContent className="space-y-1 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Dosage guide</p>
              <p className="text-sm font-semibold text-foreground">{area.mlRange}</p>
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardContent className="space-y-1 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Consultation</p>
              <p className="text-sm font-semibold text-foreground">Required</p>
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardContent className="space-y-1 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Results</p>
              <p className="text-sm font-semibold text-foreground">Vary by person</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Who it may suit and who it may not suit" />
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Who it may suit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {area.whoFor.map((item) => (
                <p key={item}>• {item}</p>
              ))}
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Who needs review first</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {area.whoNotFor.map((item) => (
                <p key={item}>• {item}</p>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeading title="Timeline expectations" />
        <div className="overflow-hidden rounded-[1.6rem] border border-border/70 bg-card shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-2">Stage</th>
                <th className="px-3 py-2">What to expect</th>
              </tr>
            </thead>
            <tbody>
              {area.timeline.map((entry) => (
                <tr className="border-t border-border/60" key={entry.stage}>
                  <td className="px-3 py-2 font-medium text-foreground">{entry.stage}</td>
                  <td className="px-3 py-2 text-muted-foreground">{entry.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle>FAQs for {area.areaName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {area.faqs.map((faq) => (
                <div className="rounded-xl border border-border/60 p-3" key={faq.question}>
                  <p className="font-semibold text-foreground">{faq.question}</p>
                  <p className="mt-1">{faq.answer}</p>
                </div>
              ))}
              <div className="flex flex-wrap gap-2">
                <Button asChild>
                  <Link href="/book">Book Free Consultation</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/pricing/aqualyx">View Aqualyx pricing</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <WhatsAppPanel />
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
              label: "Aqualyx parent page",
              description: "Full treatment process and safety guidance."
            },
            {
              href: "/pricing/aqualyx",
              label: "Aqualyx pricing",
              description: "Per-ml guide and quote factors."
            },
            {
              href: "/book",
              label: "Book consultation",
              description: "Get your personalised plan and estimate."
            }
          ]}
        />
      </Section>
    </>
  );
}
