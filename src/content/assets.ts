import generated from "@/content/assets.generated.json";

export type AssetManifest = {
  generatedAt: string;
  sourceDir: string;
  brand: {
    logo: string;
    og: string;
  };
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
    og: "/brand/og.svg"
  }
};

export function assetAt(images: string[] | undefined, index = 0, fallback = assets.brand.og) {
  if (!images?.length) return fallback;
  return images[index % images.length] ?? fallback;
}
