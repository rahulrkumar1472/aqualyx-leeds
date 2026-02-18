import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { seoLandingByPath } from "@/content/seo-pages";
import { buildMetadata } from "@/lib/seo";

const page = seoLandingByPath("/aqualyx-double-chin-leeds");

export const metadata = buildMetadata({
  title: page?.title ?? "Aqualyx Double Chin Leeds",
  description: page?.description ?? "Aqualyx double chin treatment guidance for Leeds clients.",
  path: "/aqualyx-double-chin-leeds"
});

export default function AqualyxDoubleChinLeedsPage() {
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
