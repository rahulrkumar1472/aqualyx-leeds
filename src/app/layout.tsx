import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { LayoutDebug } from "@/components/dev/layout-debug";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { OfferStrip } from "@/components/site/offer-strip";
import { RevealObserver } from "@/components/site/reveal-observer";
import { SitewideFinalCta } from "@/components/site/sitewide-final-cta";
import { TrustStrip } from "@/components/site/trust-strip";
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Aqualyx Leeds | Fat Dissolving Injections in Leeds",
    description:
      "Consultation-led fat dissolving injections and non-invasive body contouring options in Leeds.",
    images: ["/brand/og.svg"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID?.trim();

  return (
    <html lang="en">
      <body className="bg-noise-overlay font-sans">
        {gtmId ? (
          <noscript>
            <iframe
              height="0"
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              style={{ display: "none", visibility: "hidden" }}
              width="0"
            />
          </noscript>
        ) : null}
        {gtmId ? (
          <Script
            id="gtm-loader"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `
            }}
          />
        ) : null}
        {ga4Id ? <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" /> : null}
        {ga4Id ? (
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${ga4Id}', { send_page_view: true });
              `
            }}
          />
        ) : null}
        <Script
          id="js-enabled-flag"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js-enabled');"
          }}
        />
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
        <OfferStrip />
        <Header />
        <TrustStrip />
        <RevealObserver />
        <Breadcrumbs />
        <PageShell>{children}</PageShell>
        <SitewideFinalCta />
        <Footer />
        <LeadPopup />
        <StickyMobileCTA />
        <WhatsAppFloat />
        {process.env.NODE_ENV === "development" ? <LayoutDebug /> : null}
      </body>
    </html>
  );
}
