import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { CTACluster } from "@/components/layout/CTACluster";
import { HeroShell } from "@/components/layout/HeroShell";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaStrip } from "@/components/site/cta-strip";
import { InternalLinksBlock } from "@/components/site/internal-links-block";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { articleSchema, buildMetadata, faqSchema } from "@/lib/seo";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function textFromNode(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map((item) => textFromNode(item)).join(" ");
  if (node && typeof node === "object" && "props" in node) {
    return textFromNode((node as { props?: { children?: ReactNode } }).props?.children ?? "");
  }
  return "";
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return buildMetadata({
      title: "Aqualyx Leeds Blog",
      description: "Aqualyx Leeds topical authority blog content.",
      path: "/blog"
    });
  }

  return buildMetadata({
    title: post.title,
    description: `${post.description} Leeds insights from Aqualyx Leeds.`,
    path: `/blog/${post.slug}`
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, allPosts] = await Promise.all([getBlogPostBySlug(params.slug), getAllBlogPosts()]);
  if (!post) notFound();
  const relatedPosts = allPosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const published = new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const updated = new Date(post.updatedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  return (
    <>
      <Script
        id={`${post.slug}-article-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: post.title,
              description: post.description,
              path: `/blog/${post.slug}`,
              datePublished: post.date,
              dateModified: post.updatedAt,
              section: post.category
            })
          )
        }}
      />
      {post.faqs.length ? (
        <Script
          id={`${post.slug}-faq-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(post.faqs)) }}
        />
      ) : null}

      <HeroShell
        ctaCluster={<CTACluster compact includeCall={false} />}
        eyebrow={post.category}
        priceTeaser={`${published} • ${post.readTime}`}
        subline={post.description}
        title={post.title}
        trustPills={["Leeds-focused guide", "Consultation required", "Results vary", "WhatsApp support"]}
        typewriterPhrases={[
          "Learn before you book",
          "Clinical-style guidance in plain English",
          "Suitability is confirmed in consultation"
        ]}
        visual={
          <ImageFrame
            alt={post.title}
            className="min-h-[280px]"
            illustration={
              post.category === "Fat freezing"
                ? "fatFreezing"
                : post.category === "Cavitation"
                ? "cavitation"
                : "aqualyx"
            }
          />
        }
      />

      <Section className="pt-0">
        <p className="text-xs text-muted-foreground">By {post.author} • {post.reviewer} • Updated {updated}</p>
      </Section>

      <Section>
        <CtaStrip
          description="Need tailored guidance for your area? Message us on WhatsApp, then book."
          title="Book free consultation"
        />
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="hidden space-y-4 lg:sticky lg:top-28 lg:block lg:self-start">
            <Card className="border-border/70 shadow-soft">
              <CardHeader>
                <CardTitle>Table of contents</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  {post.outline.map((item, index) => (
                    <li key={item}>
                      <a className="hover:text-foreground hover:underline" href={`#${slugify(item)}`}>
                        {index + 1}. {item}
                      </a>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </aside>

          <div className="space-y-5">
            <Card className="border-border/70 shadow-soft lg:hidden">
              <CardHeader>
                <CardTitle>Table of contents</CardTitle>
              </CardHeader>
              <CardContent>
                <details>
                  <summary className="cursor-pointer text-sm font-semibold text-foreground">Open sections</summary>
                  <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {post.outline.map((item, index) => (
                      <li key={`${item}-mobile`}>
                        <a className="hover:text-foreground hover:underline" href={`#${slugify(item)}`}>
                          {index + 1}. {item}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
              </CardContent>
            </Card>

            <Card className="border-border/70 shadow-soft">
              <CardHeader>
                <CardTitle>Key takeaways</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {(post.keyTakeaways.length ? post.keyTakeaways : post.outline.slice(0, 5)).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/70 shadow-soft">
              <CardHeader>
                <CardTitle>Quick consultation snapshot</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-xl border border-border/70">
                  <table className="w-full text-left text-sm">
                    <tbody>
                      <tr className="border-b border-border/60">
                        <td className="px-3 py-2 font-medium">Category</td>
                        <td className="px-3 py-2 text-muted-foreground">{post.category}</td>
                      </tr>
                      <tr className="border-b border-border/60">
                        <td className="px-3 py-2 font-medium">Read time</td>
                        <td className="px-3 py-2 text-muted-foreground">{post.readTime}</td>
                      </tr>
                      <tr className="border-b border-border/60">
                        <td className="px-3 py-2 font-medium">Updated</td>
                        <td className="px-3 py-2 text-muted-foreground">
                          {new Date(post.updatedAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium">Consultation</td>
                        <td className="px-3 py-2 text-muted-foreground">Required for suitability and final plan</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <article className="overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-soft">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => {
                    const text = textFromNode(children).trim();
                    return (
                      <h2 className="px-6 pb-1 pt-8 text-2xl font-semibold text-foreground md:px-8" id={slugify(text)}>
                        {children}
                      </h2>
                    );
                  },
                  p: ({ children }) => (
                    <p className="px-6 pb-4 text-[0.98rem] leading-relaxed text-muted-foreground md:px-8">{children}</p>
                  ),
                  ul: ({ children }) => <ul className="space-y-2 px-6 pb-4 md:px-8">{children}</ul>,
                  ol: ({ children }) => <ol className="space-y-2 px-6 pb-4 md:px-8">{children}</ol>,
                  li: ({ children }) => <li className="text-[0.98rem] text-muted-foreground">{children}</li>,
                  table: ({ children }) => (
                    <div className="px-6 pb-5 md:px-8">
                      <div className="overflow-x-auto rounded-2xl border border-border/70">
                        <table className="w-full min-w-[520px] border-collapse text-sm">{children}</table>
                      </div>
                    </div>
                  ),
                  thead: ({ children }) => <thead className="bg-muted/55 text-left">{children}</thead>,
                  th: ({ children }) => (
                    <th className="border-b border-border/70 px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => <td className="border-b border-border/50 px-3 py-2.5 text-muted-foreground">{children}</td>,
                  tr: ({ children, ...props }) => (
                    <tr className="odd:bg-background even:bg-muted/20" {...props}>
                      {children}
                    </tr>
                  ),
                  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                  a: ({ children, href }) => (
                    <a className="font-medium text-primary underline-offset-4 hover:underline" href={href}>
                      {children}
                    </a>
                  )
                }}
              >
                {post.content}
              </ReactMarkdown>
            </article>

            <Card className="border-border/70 shadow-soft">
              <CardHeader>
                <CardTitle>Decision table</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-xl border border-border/70">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th className="px-3 py-2">When this helps</th>
                        <th className="px-3 py-2">Best next step</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-border/60">
                        <td className="px-3 py-2 text-muted-foreground">You need area-specific suitability clarity</td>
                        <td className="px-3 py-2 text-muted-foreground">Book consultation and review treatment options</td>
                      </tr>
                      <tr className="border-t border-border/60">
                        <td className="px-3 py-2 text-muted-foreground">You need quick answer first</td>
                        <td className="px-3 py-2 text-muted-foreground">Message on WhatsApp, then book if appropriate</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <CtaStrip
          description="If you want a personalised recommendation by area, start with WhatsApp and then book."
          title="Need a tailored treatment recommendation?"
        />
      </Section>

      {post.faqs.length ? (
        <Section>
          <SectionHeading title="FAQs" />
          <FaqAccordion items={post.faqs} />
        </Section>
      ) : null}

      <Section>
        <SectionHeading title="Related posts" />
        <div className="grid gap-4 md:grid-cols-3">
          {relatedPosts.map((related) => (
            <Card className="border-border/70 shadow-soft" key={related.slug}>
              <CardHeader className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {related.category}
                </p>
                <CardTitle className="text-lg leading-snug">{related.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>{related.description}</p>
                <Link
                  className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
                  href={`/blog/${related.slug}`}
                >
                  Read article
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <InternalLinksBlock
          links={[
            {
              href: "/aqualyx-leeds",
              label: "Aqualyx Leeds",
              description: "Full treatment process, timeline, suitability, and FAQs."
            },
            {
              href: "/prices",
              label: "Pricing",
              description: "Transparent pricing overview with consultation quote notes."
            },
            {
              href: "/book",
              label: "Book consultation",
              description: "Submit your booking request online."
            },
            {
              href: "/locations/leeds",
              label: "Leeds location",
              description: "Address, directions, and contact options."
            }
          ]}
          title="Continue reading"
        />
      </Section>

      <Section className="pt-0">
        <CtaStrip
          description="Talk through your goals, pricing, and suitability with the clinic team."
          title="Ready to plan your treatment?"
        />
      </Section>
    </>
  );
}
