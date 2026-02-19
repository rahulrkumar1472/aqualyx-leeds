import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogFaqItem = {
  question: string;
  answer: string;
};

export type BlogPost = {
  title: string;
  slug: string;
  description: string;
  content: string;
  outline: string[];
  date: string;
  updatedAt: string;
  readTime: string;
  category: string;
  author: string;
  reviewer: string;
  keyTakeaways: string[];
  faqs: BlogFaqItem[];
};

function parseOutline(content: string) {
  return content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => line.replace("## ", "").trim());
}

function calculateReadTime(content: string) {
  const words = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(4, Math.round(words / 220));
  return `${minutes} min read`;
}

function normalizeFaqs(input: unknown): BlogFaqItem[] {
  if (!Array.isArray(input)) return [];
  return input
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const question = String((item as { question?: string }).question ?? "").trim();
      const answer = String((item as { answer?: string }).answer ?? "").trim();
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((item): item is BlogFaqItem => Boolean(item));
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const files = await fs.readdir(BLOG_DIR);

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const filePath = path.join(BLOG_DIR, file);
        const source = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(source);

        const date = String(data.date ?? "");
        const updatedAt = String(data.updatedAt ?? data.date ?? "");
        const readTime = String(data.readTime ?? "") || calculateReadTime(content);
        const category = String(data.category ?? "Aqualyx");
        const author = String(data.author ?? "Aqualyx Leeds Editorial Team");
        const reviewer = String(data.reviewer ?? "Clinically reviewed for suitability-safe guidance");
        const keyTakeaways = Array.isArray(data.keyTakeaways)
          ? data.keyTakeaways.map((item) => String(item)).filter(Boolean)
          : [];

        return {
          title: String(data.title),
          slug: String(data.slug),
          description: String(data.description),
          content,
          outline: parseOutline(content),
          date,
          updatedAt,
          readTime,
          category,
          author,
          reviewer,
          keyTakeaways,
          faqs: normalizeFaqs(data.faqs)
        };
      })
  );

  return posts.sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date);
    return a.title.localeCompare(b.title);
  });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
