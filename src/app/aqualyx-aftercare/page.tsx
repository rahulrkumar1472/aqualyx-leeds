import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { seoLandingByPath } from "@/content/seo-pages";
import { buildMetadata } from "@/lib/seo";

const page = seoLandingByPath("/aqualyx-aftercare");

export const metadata = buildMetadata({
  title: page?.title ?? "Aqualyx Aftercare",
  description: page?.description ?? "Aqualyx aftercare guide for Leeds clients.",
  path: "/aqualyx-aftercare"
});

export default function AqualyxAftercarePage() {
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
