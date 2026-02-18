import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { seoLandingByPath } from "@/content/seo-pages";
import { buildMetadata } from "@/lib/seo";

const page = seoLandingByPath("/aqualyx-leeds");

export const metadata = buildMetadata({
  title: page?.title ?? "Aqualyx Leeds",
  description: page?.description ?? "Aqualyx Leeds consultation-led fat dissolving service page.",
  path: "/aqualyx-leeds"
});

export default function AqualyxLeedsPage() {
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
