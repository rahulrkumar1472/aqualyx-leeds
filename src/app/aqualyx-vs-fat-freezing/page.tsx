import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { seoLandingByPath } from "@/content/seo-pages";
import { buildMetadata } from "@/lib/seo";

const page = seoLandingByPath("/aqualyx-vs-fat-freezing");

export const metadata = buildMetadata({
  title: page?.title ?? "Aqualyx vs Fat Freezing",
  description: page?.description ?? "Aqualyx vs fat freezing comparison guidance in Leeds.",
  path: "/aqualyx-vs-fat-freezing"
});

export default function AqualyxVsFatFreezingPage() {
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
