import { siteConfig } from "@/content/site";

export type FaqItem = {
  question: string;
  answer: string;
};

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addressStructured.streetAddress,
      addressLocality: siteConfig.addressStructured.addressLocality,
      postalCode: siteConfig.addressStructured.postalCode,
      addressCountry: siteConfig.addressStructured.addressCountry
    },
    areaServed: ["Leeds", "West Yorkshire"],
    sameAs: [siteConfig.googleBusinessUrl, siteConfig.whatsappUrl],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: siteConfig.phoneDisplay
    }
  };
}

export function serviceSchema(serviceName: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    provider: {
      "@type": "MedicalBusiness",
      name: siteConfig.name,
      url: siteConfig.siteUrl
    },
    areaServed: "Leeds",
    description,
    url: `${siteConfig.siteUrl}${path}`
  };
}

export function faqSchema(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}
