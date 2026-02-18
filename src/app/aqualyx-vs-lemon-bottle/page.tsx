import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { seoLandingByPath } from "@/content/seo-pages";
import { buildMetadata } from "@/lib/seo";

const page = seoLandingByPath("/aqualyx-vs-lemon-bottle");

export const metadata = buildMetadata({
  title: page?.title ?? "Aqualyx vs Lemon Bottle",
  description: page?.description ?? "Aqualyx vs Lemon Bottle comparison in Leeds.",
  path: "/aqualyx-vs-lemon-bottle"
});

export default function AqualyxVsLemonBottlePage() {
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
