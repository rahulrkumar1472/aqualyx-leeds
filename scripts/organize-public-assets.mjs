import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const sourceDir = path.join(publicDir, "aqualyxleeds");
const outputFile = path.join(root, "src", "content", "assets.generated.json");

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg"]);

const categoryConfig = {
  hero: {
    dir: path.join(publicDir, "images", "hero"),
    prefix: "hero",
    limit: 6,
    keywords: ["hero", "body", "beauty", "stomach", "touching"]
  },
  "treatments/aqualyx": {
    dir: path.join(publicDir, "images", "treatments", "aqualyx"),
    prefix: "aqualyx",
    limit: 8,
    keywords: ["injection", "mesotherapy", "syringe", "surgeon", "abdominal", "aqualyx"]
  },
  "treatments/fat-freezing": {
    dir: path.join(publicDir, "images", "treatments", "fat-freezing"),
    prefix: "fat-freezing",
    limit: 8,
    keywords: ["fat", "measuring", "adipometer", "belly", "obese", "freezing", "cryo"]
  },
  "treatments/lemon-bottle": {
    dir: path.join(publicDir, "images", "treatments", "lemon-bottle"),
    prefix: "lemon-bottle",
    limit: 8,
    keywords: ["lemon", "side-view", "beauty", "woman", "body"]
  },
  "treatments/ultrasound-cavitation": {
    dir: path.join(publicDir, "images", "treatments", "ultrasound-cavitation"),
    prefix: "cavitation",
    limit: 8,
    keywords: ["massage", "back", "body", "cavitation", "ultrasound"]
  },
  pricing: {
    dir: path.join(publicDir, "images", "pricing"),
    prefix: "pricing",
    limit: 6,
    keywords: ["measuring", "drawing", "arrows", "shape", "body", "stomach"]
  },
  locations: {
    dir: path.join(publicDir, "images", "locations"),
    prefix: "location",
    limit: 6,
    keywords: ["leeds", "clinic", "woman", "care", "2026", "beauty"]
  },
  blog: {
    dir: path.join(publicDir, "images", "blog"),
    prefix: "blog",
    limit: 10,
    keywords: ["drawing", "arrows", "before", "after", "abdomen", "body"]
  },
  "textures/backgrounds": {
    dir: path.join(publicDir, "images", "textures", "backgrounds"),
    prefix: "texture",
    limit: 6,
    keywords: ["white", "background", "calories", "beauty"]
  },
  clinic: {
    dir: path.join(publicDir, "images", "clinic"),
    prefix: "clinic",
    limit: 6,
    keywords: ["clinic", "care", "woman", "2026", "beauty"]
  },
  results: {
    dir: path.join(publicDir, "images", "results"),
    prefix: "result",
    limit: 12,
    keywords: ["drawing", "arrows", "before", "after", "shape", "abdomen", "fat"]
  }
};

function toPosixPublicPath(filePath) {
  return `/${path.relative(publicDir, filePath).split(path.sep).join("/")}`;
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function scanRecursive(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await scanRecursive(fullPath)));
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (imageExtensions.has(ext)) files.push(fullPath);
  }

  return files;
}

function scoreFile(filePath, keywords) {
  const fileName = path.basename(filePath).toLowerCase();
  return keywords.reduce((score, keyword) => score + (fileName.includes(keyword) ? 1 : 0), 0);
}

function pickFiles(files, keywords, limit) {
  return files
    .map((file) => ({ file, score: scoreFile(file, keywords) }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return path.basename(a.file).localeCompare(path.basename(b.file));
    })
    .map((entry) => entry.file)
    .slice(0, Math.min(limit, files.length));
}

async function copyWithPrefix(files, destination, prefix) {
  await fs.mkdir(destination, { recursive: true });
  const copied = [];

  for (let index = 0; index < files.length; index += 1) {
    const source = files[index];
    const ext = path.extname(source).toLowerCase();
    const destinationPath = path.join(destination, `${prefix}-${index + 1}${ext}`);
    await fs.copyFile(source, destinationPath);
    copied.push(toPosixPublicPath(destinationPath));
  }

  return copied;
}

function categoryEntry(images) {
  return {
    hero: images[0] ?? null,
    gallery: images
  };
}

async function run() {
  let sourceFiles = [];
  try {
    sourceFiles = await scanRecursive(sourceDir);
  } catch {
    sourceFiles = [];
  }

  const categoryEntries = {};
  for (const [category, config] of Object.entries(categoryConfig)) {
    const selected = pickFiles(sourceFiles, config.keywords, config.limit);
    const copied = sourceFiles.length
      ? await copyWithPrefix(selected, config.dir, config.prefix)
      : [];
    categoryEntries[category] = categoryEntry(copied);
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    sourceDir: "/aqualyxleeds",
    brand: {
      logo: "/brand/logo.svg",
      icon: "/brand/icon.svg",
      og: "/brand/og.svg"
    },
    categories: categoryEntries,
    // Backward-compatible keys for existing components/pages.
    hero: categoryEntries.hero.gallery,
    treatments: {
      aqualyx: categoryEntries["treatments/aqualyx"].gallery,
      lemonBottle: categoryEntries["treatments/lemon-bottle"].gallery,
      fatFreezing: categoryEntries["treatments/fat-freezing"].gallery,
      cavitation: categoryEntries["treatments/ultrasound-cavitation"].gallery
    },
    clinic: categoryEntries.clinic.gallery,
    results: categoryEntries.results.gallery
  };

  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputFile, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`Asset manifest generated: ${path.relative(root, outputFile)}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
