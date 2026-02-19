import { BlogIndex } from "@/components/blog/blog-index";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { ImageFrame } from "@/components/media/ImageFrame";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { buildMetadata } from "@/lib/seo";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata = buildMetadata({
  title: "Aqualyx Leeds Blog",
  description:
    "Clinical-style guidance from Aqualyx Leeds on fat dissolving injections, treatment planning, pricing, and safety in Leeds.",
  path: "/blog"
});

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <HeroShell
        eyebrow="Knowledge Hub"
        priceTeaser="Learn before you book"
        subline="Read practical, consultation-safe guides that explain options, timelines, pricing, and suitability in plain language."
        title="Aqualyx Leeds Blog"
        trustPills={["Leeds-focused guides", "Safety-first tone", "Pricing clarity", "Consultation required"]}
        typewriterPhrases={[
          "Clinical-style guidance in plain English",
          "Leeds-focused pricing, safety, and suitability articles",
          "Book or WhatsApp directly from any guide"
        ]}
        visual={<ImageFrame alt="Aqualyx Leeds blog" illustration="blog" />}
      />

      <Section className="pt-0">
        <p className="max-w-[65ch] text-sm text-muted-foreground">
          Articles are educational and do not replace a consultation. Suitability, contraindications, and treatment
          planning are confirmed with a clinician.
        </p>
      </Section>

      <Section>
        <BlogIndex
          posts={posts.map((post) => ({
            title: post.title,
            slug: post.slug,
            description: post.description,
            readTime: post.readTime,
            date: post.date,
            category: post.category
          }))}
        />
      </Section>

      <Section className="pt-0">
        <CtaStrip
          description="Want tailored advice on your area and expected treatment path? Start with WhatsApp, then book."
          title="Need personal guidance today?"
        />
      </Section>

      <Section>
        <InternalLinksBlock
          links={[
            {
              href: "/treatments/lemon-bottle",
              label: "Lemon Bottle",
              description: "Compare supporting fat dissolving option."
            },
            {
              href: "/treatments/fat-freezing",
              label: "Fat Freezing",
              description: "Compare with non-invasive cooling packages."
            },
            {
              href: "/treatments/ultrasound-cavitation",
              label: "Cavitation",
              description: "Review ultrasound session pathway."
            }
          ]}
          title="Popular treatment links"
        />
      </Section>
    </>
  );
}
