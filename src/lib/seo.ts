import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { assets } from "@/content/assets";
import { buildCanonicalUrl, normalizePathname } from "@/lib/url";
import {
  articleSchema as buildArticleSchema,
  faqSchema as buildFaqSchema,
  localBusinessSchema as buildLocalBusinessSchema,
  serviceSchema as buildServiceSchema
} from "@/lib/seo/schema";

type MetadataArgs = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function buildMetadata({ title, description, path, keywords }: MetadataArgs): Metadata {
  const canonicalPath = normalizePathname(path);
  const canonical = buildCanonicalUrl(canonicalPath, siteConfig.siteUrl);

  return {
    title,
    description,
    keywords,
    robots: {
      index: true,
      follow: true
    },
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "en_GB",
      type: "website",
      images: [
        {
          url: assets.brand.og,
          width: 1200,
          height: 630,
          alt: siteConfig.name
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [assets.brand.og]
    }
  };
}

export function localBusinessSchema() {
  return buildLocalBusinessSchema();
}

export function serviceSchema(serviceName: string, path: string, description: string) {
  return buildServiceSchema(serviceName, path, description);
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return buildFaqSchema(items);
}

export function articleSchema(args: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  section: string;
  image?: string;
}) {
  return buildArticleSchema(args);
}
