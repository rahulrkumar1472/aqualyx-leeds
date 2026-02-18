"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/content/site";

const labelOverrides: Record<string, string> = {
  treatments: "Treatments",
  "fat-dissolving-injections": "Fat Dissolving Injections",
  "non-invasive-fat-reduction": "Non-invasive Fat Reduction",
  "fat-freezing": "Fat Freezing",
  "ultrasound-cavitation": "Ultrasound Cavitation",
  "lemon-bottle": "Lemon Bottle",
  pricing: "Pricing",
  faqs: "FAQs",
  locations: "Locations",
  "near-leeds": "Areas Near Leeds",
  "medical-disclaimer": "Medical Disclaimer",
  "cookie-policy": "Cookie Policy"
};

function formatSegment(segment: string) {
  if (labelOverrides[segment]) return labelOverrides[segment];
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.siteUrl
      },
      ...segments.map((segment, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: formatSegment(segment),
        item: `${siteConfig.siteUrl}/${segments.slice(0, index + 1).join("/")}`
      }))
    ]
  };

  return (
    <div className="border-b bg-muted/40">
      <Container className="py-3 text-sm">
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          type="application/ld+json"
        />
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-muted-foreground">
            <li>
              <Link className="hover:text-foreground" href="/">
                Home
              </Link>
            </li>
            {segments.map((segment, index) => {
              const href = `/${segments.slice(0, index + 1).join("/")}`;
              const last = index === segments.length - 1;

              return (
                <li className="flex items-center gap-1" key={href}>
                  <ChevronRight className="h-3 w-3" />
                  {last ? (
                    <span className="font-medium text-foreground">{formatSegment(segment)}</span>
                  ) : (
                    <Link className="hover:text-foreground" href={href}>
                      {formatSegment(segment)}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </Container>
    </div>
  );
}
