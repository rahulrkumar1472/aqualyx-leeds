import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { seoLandingByPath } from "@/content/seo-pages";
import { buildMetadata } from "@/lib/seo";

const page = seoLandingByPath("/fat-dissolving-injections-leeds");

export const metadata = buildMetadata({
  title: page?.title ?? "Fat Dissolving Injections Leeds",
  description:
    page?.description ?? "Fat dissolving injections in Leeds with consultation-led planning and transparent pricing.",
  path: "/fat-dissolving-injections-leeds"
});

export default function FatDissolvingInjectionsLeedsPage() {
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
