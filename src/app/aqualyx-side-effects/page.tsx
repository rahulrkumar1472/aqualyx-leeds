import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { seoLandingByPath } from "@/content/seo-pages";
import { buildMetadata } from "@/lib/seo";

const page = seoLandingByPath("/aqualyx-side-effects");

export const metadata = buildMetadata({
  title: page?.title ?? "Aqualyx Side Effects",
  description: page?.description ?? "Aqualyx side effects and safety guidance in Leeds.",
  path: "/aqualyx-side-effects"
});

export default function AqualyxSideEffectsPage() {
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
