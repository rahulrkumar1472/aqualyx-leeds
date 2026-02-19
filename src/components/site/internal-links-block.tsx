"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/track";

export type InternalLinkItem = {
  href: string;
  label: string;
  description?: string;
};

type InternalLinksBlockProps = {
  links: InternalLinkItem[];
  title?: string;
  description?: string;
};

const requiredCoreLinks: InternalLinkItem[] = [
  {
    href: "/treatments/aqualyx",
    label: "Aqualyx treatment page",
    description: "Primary treatment guide for suitability, timeline, and booking intent."
  },
  {
    href: "/pricing/fat-dissolving",
    label: "Fat dissolving pricing",
    description: "Transparent per-ml pricing from £99."
  },
  {
    href: "/book",
    label: "Book Free Consultation",
    description: "Submit your booking request online."
  },
  {
    href: "/locations/leeds",
    label: "Leeds Clinic",
    description: "Address, map and local trust details."
  },
  {
    href: "/blog",
    label: "Blog guides",
    description: "Consultation-safe reading on costs, safety, and timelines."
  },
  {
    href: "/faqs",
    label: "FAQs",
    description: "Common booking, safety, and aftercare answers."
  }
];

export function InternalLinksBlock({
  links,
  title = "Continue Your Journey",
  description = "Use these internal links to compare treatment, pricing, location and booking pages."
}: InternalLinksBlockProps) {
  const mergedLinks = [...links];

  for (const required of requiredCoreLinks) {
    if (!mergedLinks.some((link) => link.href === required.href)) {
      mergedLinks.push(required);
    }
  }

  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {mergedLinks.map((link) => (
          <Card className="border-border/70 shadow-soft transition hover:-translate-y-0.5 hover:border-primary/35" key={link.href}>
            <CardHeader>
              <CardTitle className="text-base">{link.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {link.description ? <p className="text-sm text-muted-foreground">{link.description}</p> : null}
              <Link
                className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
                href={link.href}
                onClick={() =>
                  trackEvent("internal_link_click", {
                    location: title,
                    href: link.href,
                    label: link.label
                  })
                }
              >
                Open page <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
