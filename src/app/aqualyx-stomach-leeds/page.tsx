import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { seoLandingByPath } from "@/content/seo-pages";
import { buildMetadata } from "@/lib/seo";

const page = seoLandingByPath("/aqualyx-stomach-leeds");

export const metadata = buildMetadata({
  title: page?.title ?? "Aqualyx Stomach Leeds",
  description: page?.description ?? "Aqualyx stomach-area treatment planning and consultation guidance in Leeds.",
  path: "/aqualyx-stomach-leeds"
});

export default function AqualyxStomachLeedsPage() {
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
