import { Clock3, MapPin, PhoneCall } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { BookingConfirmTracker } from "@/components/booking/booking-confirm-tracker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { availabilityConfig } from "@/content/availability";
import { siteConfig } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Booking Confirmation Leeds",
  description: "Your Aqualyx Leeds consultation request has been received.",
  path: "/book/confirm"
});

const weekdayOrder = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
] as const;

function formatDay(day: (typeof weekdayOrder)[number]) {
  return day.charAt(0).toUpperCase() + day.slice(1);
}

export default function BookConfirmPage({
  searchParams
}: {
  searchParams?: { ref?: string; name?: string };
}) {
  const firstName = searchParams?.name?.trim() || "there";
  const ref = searchParams?.ref?.trim() || "AL-PENDING";

  return (
    <>
      <BookingConfirmTracker reference={ref} />
      <Section className="pt-10 sm:pt-14" containerClassName="rounded-[2rem] border border-primary/20 bg-card/90 p-6 shadow-soft sm:p-10" variant="gradient">
        <SectionHeading
          eyebrow="Confirmation"
          subtext={`Thanks ${firstName}, your consultation request has been received.`}
          title="Booking request submitted"
        />
        <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4">
          <p className="text-sm text-muted-foreground">Reference ID</p>
          <p className="text-xl font-semibold text-foreground">{ref}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Next steps: we&apos;ll contact you within 24 working hours to confirm availability and suitability.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Clinic details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p className="inline-flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                {siteConfig.address}
              </p>
              <p className="inline-flex items-start gap-2">
                <PhoneCall className="mt-0.5 h-4 w-4 text-primary" />
                {siteConfig.phoneDisplay}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Opening hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-muted-foreground">
              {weekdayOrder.map((day) => {
                const windows = availabilityConfig.openingHours[day];
                return (
                  <p className="inline-flex items-center gap-2" key={day}>
                    <Clock3 className="h-4 w-4 text-primary" />
                    <span className="w-28">{formatDay(day)}</span>
                    <span>
                      {windows.length
                        ? windows.map((window) => `${window.start} - ${window.end}`).join(", ")
                        : "Closed"}
                    </span>
                  </p>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild>
            <a href={siteConfig.phoneHref}>Call</a>
          </Button>
          <Button asChild variant="ctaSecondary">
            <a href={siteConfig.whatsappUrl} rel="noopener noreferrer" target="_blank">
              WhatsApp
            </a>
          </Button>
          <Button asChild variant="ctaTertiary">
            <a href={siteConfig.mapQueryUrl} rel="noopener noreferrer" target="_blank">
              View directions
            </a>
          </Button>
        </div>
      </Section>
    </>
  );
}
