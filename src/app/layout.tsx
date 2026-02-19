import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { MobileStickyCta } from "@/components/site/mobile-sticky-cta";
import { OfferStrip } from "@/components/site/offer-strip";
import { RevealObserver } from "@/components/site/reveal-observer";
import { SitewideFinalCta } from "@/components/site/sitewide-final-cta";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { LeadPopup } from "@/components/lead-popup";
import { siteConfig } from "@/content/site";
import { localBusinessSchema } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Aqualyx Leeds | Fat Dissolving Injections in Leeds",
    template: "%s | Aqualyx Leeds"
  },
  description:
    "Aqualyx Leeds provides consultation-led fat dissolving injections and non-invasive fat reduction treatments in Leeds.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/brand/icon.svg", type: "image/svg+xml" }
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico"
  },
  openGraph: {
    title: "Aqualyx Leeds | Fat Dissolving Injections in Leeds",
    description:
      "Consultation-led fat dissolving injections and non-invasive body contouring options in Leeds.",
    url: siteConfig.siteUrl,
    images: [
      {
        url: "/brand/og.svg",
        width: 1200,
        height: 630,
        alt: "Aqualyx Leeds"
      }
    ]
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-noise-overlay font-sans">
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
        <OfferStrip />
        <Header />
        <RevealObserver />
        <Breadcrumbs />
        <PageShell>{children}</PageShell>
        <SitewideFinalCta />
        <Footer />
        <LeadPopup />
        <MobileStickyCta />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
