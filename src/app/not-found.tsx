import Link from "next/link";
import { MessageCircle, PhoneCall } from "lucide-react";
import { CTACluster } from "@/components/layout/CTACluster";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";

export default function NotFoundPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20">
        <SectionHeading
          eyebrow="Page not found"
          title="This page is unavailable right now"
          subtext="The link may have moved. You can book consultation now, or contact Aqualyx Leeds by WhatsApp or phone."
        />
        <div className="mt-6">
          <CTACluster />
        </div>
      </Section>

      <Section className="pt-0">
        <Card className="border-border/70 shadow-soft">
          <CardContent className="flex flex-wrap gap-3 p-5">
            <Button asChild>
              <Link href="/book">Book Free Consultation</Link>
            </Button>
            <Button asChild variant="ctaSecondary">
              <a href={siteConfig.whatsappUrl} rel="noopener noreferrer" target="_blank">
                <span className="inline-flex items-center gap-1.5">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </span>
              </a>
            </Button>
            <Button asChild variant="ctaTertiary">
              <a href={siteConfig.phoneHref}>
                <span className="inline-flex items-center gap-1.5">
                  <PhoneCall className="h-4 w-4" /> Call {siteConfig.phoneDisplay}
                </span>
              </a>
            </Button>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
