import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { seoLandingByPath } from "@/content/seo-pages";
import { buildMetadata } from "@/lib/seo";

const page = seoLandingByPath("/aqualyx-love-handles-leeds");

export const metadata = buildMetadata({
  title: page?.title ?? "Aqualyx Love Handles Leeds",
  description: page?.description ?? "Aqualyx love handles treatment guidance and consultation planning in Leeds.",
  path: "/aqualyx-love-handles-leeds"
});

export default function AqualyxLoveHandlesLeedsPage() {
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
