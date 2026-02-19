import generated from "@/content/assets.generated.json";

export type AssetManifest = {
  generatedAt: string;
  sourceDir: string;
  brand: {
    logo: string;
    icon: string;
    og: string;
  };
  categories: Record<
    string,
    {
      hero: string | null;
      gallery: string[];
    }
  >;
  hero: string[];
  treatments: {
    aqualyx: string[];
    lemonBottle: string[];
    fatFreezing: string[];
    cavitation: string[];
  };
  clinic: string[];
  results: string[];
};

const manifest = generated as AssetManifest;

export const assets: AssetManifest = {
  ...manifest,
  brand: {
    logo: "/brand/logo.svg",
    icon: "/brand/icon.svg",
    og: "/brand/og.svg"
  }
};

export function assetAt(images: string[] | undefined, index = 0, fallback = assets.brand.og) {
  if (!images?.length) return fallback;
  return images[index % images.length] ?? fallback;
}

export type AssetCategory = keyof typeof assets.categories;

export function getAsset(category: AssetCategory, key: "hero" | "gallery" = "hero", index = 0) {
  const entry = assets.categories[category];
  if (!entry) return assets.brand.og;
  if (key === "hero") return entry.hero ?? assets.brand.og;
  return assetAt(entry.gallery, index, assets.brand.og);
}
