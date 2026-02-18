"use client";

import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { availabilityConfig } from "@/content/availability";
import { siteConfig } from "@/content/site";
import { trackEvent } from "@/lib/track";

const footerColumns = [
  {
    title: "Treatments",
    links: [
      { title: "Aqualyx", href: "/treatments/aqualyx" },
      { title: "Lemon Bottle", href: "/treatments/lemon-bottle" },
      { title: "Fat Freezing", href: "/treatments/fat-freezing" },
      { title: "Ultrasound Cavitation", href: "/treatments/ultrasound-cavitation" }
    ]
  },
  {
    title: "Pricing",
    links: [
      { title: "Prices Hub", href: "/prices" },
      { title: "Overview", href: "/pricing" },
      { title: "Fat Dissolving", href: "/pricing/fat-dissolving" },
      { title: "Fat Freezing", href: "/pricing/fat-freezing" },
      { title: "Cavitation", href: "/pricing/cavitation" }
    ]
  },
  {
    title: "Locations",
    links: [
      { title: "Leeds", href: "/locations/leeds" },
      { title: "Areas Near Leeds", href: "/locations/near-leeds" },
      { title: "Book", href: "/book" },
      { title: "Contact", href: "/contact" }
    ]
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "Results", href: "/results" },
      { title: "FAQs", href: "/faqs" },
      { title: "Blog", href: "/blog" },
      { title: "Contact", href: "/contact" }
    ]
  }
];

export function Footer() {
  const openingHours = [
    `Mon-Tue ${availabilityConfig.openingHours.monday[0]?.start}-${availabilityConfig.openingHours.monday[0]?.end}`,
    `Wed-Thu ${availabilityConfig.openingHours.wednesday[0]?.start}-${availabilityConfig.openingHours.wednesday[0]?.end}`,
    `Fri ${availabilityConfig.openingHours.friday[0]?.start}-${availabilityConfig.openingHours.friday[0]?.end}`,
    `Sat ${availabilityConfig.openingHours.saturday[0]?.start}-${availabilityConfig.openingHours.saturday[0]?.end}`,
    "Sun Closed"
  ];

  return (
    <footer className="border-t border-border/70 bg-muted/35 pb-24 md:pb-10">
      <Container className="py-12">
        <div className="grid gap-8 lg:grid-cols-6">
          <div className="space-y-4 lg:col-span-2">
            <h2 className="text-xl font-semibold text-secondary">{siteConfig.name}</h2>
            <p className="text-sm text-muted-foreground">
              Consultation-led fat dissolving injections and non-invasive body contouring support in Leeds.
            </p>
            <div className="space-y-1 text-sm">
              <p>{siteConfig.address}</p>
              <p>Opening hours: {openingHours.join(" • ")}</p>
              <p>
                <a
                  className="hover:underline"
                  href={siteConfig.phoneHref}
                  onClick={() =>
                    trackEvent("cta_call_click", {
                      location: "footer"
                    })
                  }
                >
                  {siteConfig.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  className="hover:underline"
                  href={siteConfig.whatsappUrl}
                  onClick={() =>
                    trackEvent("cta_whatsapp_click", {
                      location: "footer"
                    })
                  }
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {siteConfig.whatsappDisplay}
                </a>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm">
                <Link
                  href="/book"
                  onClick={() =>
                    trackEvent("cta_book_click", {
                      location: "footer"
                    })
                  }
                >
                  Book
                </Link>
              </Button>
              <Button asChild size="sm" variant="ctaSecondary">
                <a
                  href={siteConfig.whatsappUrl}
                  onClick={() =>
                    trackEvent("cta_whatsapp_click", {
                      location: "footer"
                    })
                  }
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                  </span>
                </a>
              </Button>
              <Button asChild size="sm" variant="ctaTertiary">
                <a
                  href={siteConfig.phoneHref}
                  onClick={() =>
                    trackEvent("cta_call_click", {
                      location: "footer"
                    })
                  }
                >
                  <span className="inline-flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5" /> Call
                  </span>
                </a>
              </Button>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.13em] text-secondary/90">
                {column.title}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground/95">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link className="transition hover:text-foreground hover:underline" href={link.href}>
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          <p>
            Medical information on this site is general and does not replace a consultation. Treatment suitability,
            contraindications, and expected outcomes are confirmed in person. Results vary.
          </p>
          <div className="mt-2 flex flex-wrap gap-4">
            <Link className="hover:underline" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:underline" href="/terms">
              Terms
            </Link>
            <Link className="hover:underline" href="/medical-disclaimer">
              Medical Disclaimer
            </Link>
            <Link className="hover:underline" href="/cookie-policy">
              Cookie Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
