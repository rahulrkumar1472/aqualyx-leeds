import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const sourceDir = path.join(publicDir, "aqualyxleeds");

const targets = {
  brand: path.join(publicDir, "brand"),
  hero: path.join(publicDir, "images", "hero"),
  aqualyx: path.join(publicDir, "images", "treatments", "aqualyx"),
  lemonBottle: path.join(publicDir, "images", "treatments", "lemon-bottle"),
  fatFreezing: path.join(publicDir, "images", "treatments", "fat-freezing"),
  cavitation: path.join(publicDir, "images", "treatments", "cavitation"),
  clinic: path.join(publicDir, "images", "clinic"),
  results: path.join(publicDir, "images", "results")
};

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

const keywordProfiles = {
  hero: ["woman", "body", "calories", "beauty", "touching", "stomach"],
  aqualyx: ["injection", "mesotherapy", "surgeon", "syringe", "abdominal"],
  lemonBottle: ["side-view", "hands", "beauty", "body"],
  fatFreezing: ["fat", "adipometer", "measuring", "belly", "obese", "lose-weight"],
  cavitation: ["massage", "back", "body", "syringe"],
  clinic: ["2026", "beauty", "woman", "care"],
  results: ["drawing", "arrows", "before", "after", "shape", "abdomen", "fat"]
};

const limits = {
  hero: 4,
  aqualyx: 5,
  lemonBottle: 4,
  fatFreezing: 5,
  cavitation: 5,
  clinic: 5,
  results: 10
};

function toPosixPublicPath(filePath) {
  return `/${path.relative(publicDir, filePath).split(path.sep).join("/")}`;
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
    if (imageExtensions.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

function scoreFile(filePath, keywords) {
  const name = path.basename(filePath).toLowerCase();
  return keywords.reduce((score, keyword) => score + (name.includes(keyword) ? 1 : 0), 0);
}

function pickFiles(files, keywords, limit) {
  const ranked = files
    .map((file) => ({ file, score: scoreFile(file, keywords) }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return path.basename(a.file).localeCompare(path.basename(b.file));
    })
    .map((entry) => entry.file);

  return ranked.slice(0, Math.min(limit, ranked.length));
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

function ensureJpgCandidate(files) {
  const jpg = files.find((file) => {
    const ext = path.extname(file).toLowerCase();
    return ext === ".jpg" || ext === ".jpeg";
  });
  return jpg ?? files[0] ?? null;
}

async function run() {
  let sourceFiles = [];

  try {
    sourceFiles = await scanRecursive(sourceDir);
  } catch {
    sourceFiles = [];
  }

  if (!sourceFiles.length) {
    const emptyManifest = {
      generatedAt: new Date().toISOString(),
      sourceDir: "/aqualyxleeds",
      brand: {
        logo: "/brand/logo.svg",
        og: "/brand/og.svg"
      },
      hero: [],
      treatments: {
        aqualyx: [],
        lemonBottle: [],
        fatFreezing: [],
        cavitation: []
      },
      clinic: [],
      results: []
    };

    await fs.writeFile(
      path.join(root, "src", "content", "assets.generated.json"),
      JSON.stringify(emptyManifest, null, 2) + "\n",
      "utf8"
    );

    console.log("No source images found. Generated empty asset manifest.");
    return;
  }

  const heroSelected = pickFiles(sourceFiles, keywordProfiles.hero, limits.hero);
  const aqualyxSelected = pickFiles(sourceFiles, keywordProfiles.aqualyx, limits.aqualyx);
  const lemonSelected = pickFiles(sourceFiles, keywordProfiles.lemonBottle, limits.lemonBottle);
  const fatFreezingSelected = pickFiles(sourceFiles, keywordProfiles.fatFreezing, limits.fatFreezing);
  const cavitationSelected = pickFiles(sourceFiles, keywordProfiles.cavitation, limits.cavitation);
  const clinicSelected = pickFiles(sourceFiles, keywordProfiles.clinic, limits.clinic);
  const resultsSelected = pickFiles(sourceFiles, keywordProfiles.results, limits.results);

  const heroPaths = await copyWithPrefix(heroSelected, targets.hero, "hero");
  const aqualyxPaths = await copyWithPrefix(aqualyxSelected, targets.aqualyx, "aqualyx");
  const lemonPaths = await copyWithPrefix(lemonSelected, targets.lemonBottle, "lemon-bottle");
  const fatFreezingPaths = await copyWithPrefix(fatFreezingSelected, targets.fatFreezing, "fat-freezing");
  const cavitationPaths = await copyWithPrefix(cavitationSelected, targets.cavitation, "cavitation");
  const clinicPaths = await copyWithPrefix(clinicSelected, targets.clinic, "clinic");
  const resultsPaths = await copyWithPrefix(resultsSelected, targets.results, "result");

  await fs.mkdir(targets.brand, { recursive: true });

  const customLogo = path.join(targets.brand, "logo.svg");
  let logoPublicPath = "/brand/logo.svg";

  if (!(await fileExists(customLogo))) {
    const logoSource = sourceFiles.find((file) => path.basename(file).toLowerCase().includes("logo")) ?? heroSelected[0];
    const logoExt = path.extname(logoSource).toLowerCase();
    const logoDest = path.join(targets.brand, `logo${logoExt}`);
    await fs.copyFile(logoSource, logoDest);
    logoPublicPath = toPosixPublicPath(logoDest);
  }

  const ogSource = ensureJpgCandidate([...heroSelected, ...sourceFiles]);
  const customOg = path.join(targets.brand, "og.svg");
  let ogPublicPath = "/brand/og.svg";

  if (!(await fileExists(customOg)) && ogSource) {
    const ogDest = path.join(targets.brand, "og.jpg");
    await fs.copyFile(ogSource, ogDest);
    ogPublicPath = "/brand/og.jpg";
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    sourceDir: "/aqualyxleeds",
    brand: {
      logo: logoPublicPath,
      og: ogPublicPath
    },
    hero: heroPaths,
    treatments: {
      aqualyx: aqualyxPaths,
      lemonBottle: lemonPaths,
      fatFreezing: fatFreezingPaths,
      cavitation: cavitationPaths
    },
    clinic: clinicPaths,
    results: resultsPaths
  };

  await fs.writeFile(
    path.join(root, "src", "content", "assets.generated.json"),
    JSON.stringify(manifest, null, 2) + "\n",
    "utf8"
  );

  console.log("Asset manifest generated:", path.join("src", "content", "assets.generated.json"));
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
