import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { MobileStickyCta } from "@/components/site/mobile-sticky-cta";
import { OfferStrip } from "@/components/site/offer-strip";
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
    icon: "/brand/logo.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
        <OfferStrip />
        <Header />
        <Breadcrumbs />
        <main>{children}</main>
        <Footer />
        <LeadPopup />
        <MobileStickyCta />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
