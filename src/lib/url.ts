export function normalizeSiteUrl(value?: string | null) {
  const fallback = "https://leedsfatdissolving.co.uk";
  if (!value?.trim()) return fallback;

  let candidate = value.trim();
  if (!/^https?:\/\//i.test(candidate)) {
    candidate = `https://${candidate}`;
  }

  try {
    const parsed = new URL(candidate);
    if (parsed.hostname.toLowerCase().endsWith("vercel.app")) {
      return fallback;
    }
    parsed.protocol = "https:";
    parsed.hash = "";
    parsed.search = "";
    const pathname = parsed.pathname === "/" ? "" : parsed.pathname.replace(/\/+$/, "");
    return `${parsed.protocol}//${parsed.hostname.toLowerCase()}${pathname}`;
  } catch {
    return fallback;
  }
}

export function normalizePathname(pathname?: string | null) {
  if (!pathname?.trim()) return "/";

  const [withoutQuery] = pathname.split(/[?#]/, 1);
  const withLeadingSlash = withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery}`;
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, "/").toLowerCase();
  if (collapsed === "/") return "/";
  return collapsed.replace(/\/+$/, "");
}

export function buildCanonicalUrl(pathname: string, siteUrl: string) {
  const base = normalizeSiteUrl(siteUrl);
  const normalizedPath = normalizePathname(pathname);
  return normalizedPath === "/" ? base : `${base}${normalizedPath}`;
}
