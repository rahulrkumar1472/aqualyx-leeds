"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { CTACluster } from "@/components/layout/CTACluster";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type BlogIndexItem = {
  title: string;
  slug: string;
  description: string;
  readTime: string;
  date: string;
  category: string;
};

type BlogIndexProps = {
  posts: BlogIndexItem[];
};

const categoryOrder = [
  "Aqualyx",
  "Fat dissolving",
  "Leeds",
  "Fat freezing",
  "Cavitation",
  "Safety"
] as const;

export function BlogIndex({ posts }: BlogIndexProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const topReads = posts.slice(0, 3);

  const categories = useMemo(() => {
    const found = new Set(posts.map((post) => post.category));
    return ["All", ...categoryOrder.filter((category) => found.has(category)), ...Array.from(found).filter((c) => !categoryOrder.includes(c as never))];
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const q = query.trim().toLowerCase();
      const categoryMatch = activeCategory === "All" || post.category === activeCategory;
      const queryMatch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return categoryMatch && queryMatch;
    });
  }, [activeCategory, posts, query]);

  return (
    <div className="space-y-7">
      <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="h-11 w-full rounded-2xl border border-border/70 bg-card pl-9 pr-3 text-sm shadow-soft outline-none transition focus:border-primary/45"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search guides by topic..."
            value={query}
          />
        </label>
        <CTACluster compact includeCall={false} />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setActiveCategory(category)}
            size="sm"
            type="button"
            variant={activeCategory === category ? "default" : "outline"}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <h3 className="text-2xl font-semibold">Featured</h3>
          <p className="text-sm text-muted-foreground">Most useful starting points</p>
        </div>
        <div className="flex snap-x gap-4 overflow-x-auto pb-1">
          {topReads.map((post) => (
            <Card className="min-w-[290px] snap-start border-border/70 shadow-soft md:min-w-[340px]" key={`top-${post.slug}`}>
              <CardHeader className="space-y-3">
                <ImageFrame
                  alt={post.title}
                  className="min-h-[160px]"
                  illustration={
                    post.category === "Fat freezing"
                      ? "fatFreezing"
                      : post.category === "Cavitation"
                      ? "cavitation"
                      : "aqualyx"
                  }
                />
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{post.category}</Badge>
                </div>
                <CardTitle className="text-lg leading-snug">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>{post.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span>{post.readTime}</span>
                  <span>{new Date(post.date).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })}</span>
                </div>
                <Button asChild variant="outline">
                  <Link href={`/blog/${post.slug}`}>Read more</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <h3 className="text-2xl font-semibold">Latest</h3>
          <p className="text-sm text-muted-foreground">{filtered.length} article(s)</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((post) => (
          <Card className="border-border/70 shadow-soft" key={post.slug}>
            <CardHeader className="space-y-3">
              <ImageFrame
                alt={post.title}
                className="min-h-[170px]"
                illustration={
                  post.category === "Fat freezing"
                    ? "fatFreezing"
                    : post.category === "Cavitation"
                    ? "cavitation"
                    : "aqualyx"
                }
              />
              <div className="flex items-center gap-2">
                <Badge variant="outline">{post.category}</Badge>
              </div>
              <CardTitle className="text-lg leading-snug">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>{post.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span>{post.readTime}</span>
                <span>{new Date(post.date).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })}</span>
              </div>
              <Button asChild variant="outline">
                <Link href={`/blog/${post.slug}`}>Read more</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {!filtered.length ? (
        <Card className="border-border/70">
          <CardContent className="p-6 text-sm text-muted-foreground">
            No articles match that search. Try “Aqualyx”, “Leeds”, or “cost per ml”.
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
