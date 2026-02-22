import type { MetadataRoute } from "next";
import { nearLeedsAreas } from "@/content/locations";
import { aqualyxAreaPages } from "@/content/services";
import { siteConfig } from "@/content/site";
import { getAllBlogPosts } from "@/lib/blog";
import { logRouteData } from "@/lib/route-log";
import { buildCanonicalUrl } from "@/lib/url";

const staticPaths = [
  "/",
  "/aqualyx-leeds",
  "/fat-dissolving-injections-leeds",
  "/aqualyx-double-chin-leeds",
  "/aqualyx-stomach-leeds",
  "/aqualyx-love-handles-leeds",
  "/aqualyx-aftercare",
  "/aqualyx-side-effects",
  "/aqualyx-vs-lemon-bottle",
  "/aqualyx-vs-fat-freezing",
  "/treatments",
  "/treatments/fat-dissolving-injections",
  "/treatments/aqualyx",
  "/treatments/lemon-bottle",
  "/treatments/non-invasive-fat-reduction",
  "/treatments/fat-freezing",
  "/treatments/ultrasound-cavitation",
  "/pricing",
  "/pricing/fat-dissolving",
  "/pricing/aqualyx",
  "/pricing/lemon-bottle",
  "/pricing/fat-freezing",
  "/pricing/cavitation",
  "/pricing/ultrasound-cavitation",
  "/pricing/price-match",
  "/results",
  "/case-studies",
  "/faqs",
  "/about",
  "/contact",
  "/book",
  "/locations",
  "/locations/leeds",
  "/locations/near-leeds",
  "/privacy",
  "/terms",
  "/medical-disclaimer",
  "/cookie-policy",
  "/blog"
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getAllBlogPosts();
  logRouteData("/sitemap.xml", `rendering sitemap with ${blogPosts.length} blog posts`);

  const staticEntries = staticPaths.map((path) => ({
    url: buildCanonicalUrl(path, siteConfig.siteUrl),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7
  }));

  const locationEntries = nearLeedsAreas.map((area) => ({
    url: buildCanonicalUrl(`/locations/areas/${area.slug}`, siteConfig.siteUrl),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  const aqualyxAreaEntries = aqualyxAreaPages.map((area) => ({
    url: buildCanonicalUrl(`/treatments/aqualyx/${area.slug}`, siteConfig.siteUrl),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  const blogEntries = blogPosts.map((post) => ({
    url: buildCanonicalUrl(`/blog/${post.slug}`, siteConfig.siteUrl),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  return [...staticEntries, ...locationEntries, ...aqualyxAreaEntries, ...blogEntries];
}
