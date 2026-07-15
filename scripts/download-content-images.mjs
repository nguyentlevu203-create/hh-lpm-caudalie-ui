// Phase 3 image pipeline, content sheets: downloads hero images for
// ingredients (19), articles (71), and the 14 canonical brand_content pages
// into public/images/hh/{ingredients,articles,brand}/<slug>/main.<ext>,
// deduping by SHA-256. Writes derived, UI-ready JSON files consumed by the
// new /nguyen-lieu, /bai-viet, /thuong-hieu routes.
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "src/data/content");

function slugify(text) {
  if (!text) return "";
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const hashToPath = new Map();
const summary = {};

async function downloadImage(url, subdir, slug) {
  if (!url) return null;
  const sep = url.includes("?") ? "&" : "?";
  const fullUrl = `${url}${sep}fm=jpg&w=1200`;
  try {
    const res = await fetch(fullUrl);
    if (!res.ok) return { error: `HTTP ${res.status}` };
    const buf = Buffer.from(await res.arrayBuffer());
    const hash = crypto.createHash("sha256").update(buf).digest("hex");
    if (hashToPath.has(hash)) return { path: hashToPath.get(hash), deduped: true };
    const dir = path.join(ROOT, "public/images/hh", subdir, slug);
    await mkdir(dir, { recursive: true });
    const filename = "main.jpg";
    await writeFile(path.join(dir, filename), buf);
    const publicPath = `/images/hh/${subdir}/${slug}/${filename}`;
    hashToPath.set(hash, publicPath);
    return { path: publicPath };
  } catch (err) {
    return { error: String(err) };
  }
}

async function processIngredients() {
  const doc = JSON.parse(await readFile(path.join(CONTENT_DIR, "ingredients.json"), "utf-8"));
  const out = [];
  let ok = 0, failed = 0;
  const targets = doc.ingredients;
  for (let i = 0; i < targets.length; i += 4) {
    await Promise.all(
      targets.slice(i, i + 4).map(async (rec) => {
        const f = rec.fields;
        const slug = f.slug || slugify(f.name) || `ing-${rec.sourceRow}`;
        const result = await downloadImage(f.heroImageUrl, "ingredients", slug);
        const image = result && result.path ? result.path : null;
        if (image) ok++; else failed++;
        out.push({
          id: f.id, slug, name: f.name, headline: f.headline, h1: f.h1, intro: f.intro,
          origin: f.origin, benefit: f.benefit, beautyTip: f.beautyTip,
          scentExperience: f.scentExperience, fullContent: f.fullContent,
          image, sourceUrl: f.sourceUrl,
        });
      })
    );
  }
  await writeFile(path.join(CONTENT_DIR, "ingredients-derived.json"), JSON.stringify(out, null, 2));
  summary.ingredients = { total: targets.length, ok, failed };
  console.log(`ingredients: ${ok} images ok, ${failed} failed, ${out.length} records`);
}

async function processArticles() {
  const doc = JSON.parse(await readFile(path.join(CONTENT_DIR, "articles.json"), "utf-8"));
  const out = [];
  let ok = 0, failed = 0;
  const seenSlugs = {};
  const targets = doc.articles;
  for (let i = 0; i < targets.length; i += 4) {
    await Promise.all(
      targets.slice(i, i + 4).map(async (rec) => {
        const f = rec.fields;
        let slug = slugify(f.title) || `bai-viet-${rec.sourceRow}`;
        let n = 2;
        while (seenSlugs[slug]) { slug = `${slug}-${n++}`; }
        seenSlugs[slug] = true;
        const result = await downloadImage(f.heroImageUrl, "articles", slug);
        const image = result && result.path ? result.path : null;
        if (image) ok++; else failed++;
        out.push({
          id: f.id, slug, title: f.title, topic: f.topic, intro: f.intro,
          headings: f.headings, mainContent: f.mainContent, image, sourceUrl: f.sourceUrl,
          relatedProducts: f.relatedProducts,
        });
      })
    );
  }
  await writeFile(path.join(CONTENT_DIR, "articles-derived.json"), JSON.stringify(out, null, 2));
  summary.articles = { total: targets.length, ok, failed };
  console.log(`articles: ${ok} images ok, ${failed} failed, ${out.length} records`);
}

async function processBrandContent() {
  const doc = JSON.parse(await readFile(path.join(CONTENT_DIR, "brand-pages.json"), "utf-8"));
  const canonical = doc.brandPages.filter((r) => r.fields.pageType === "brand_content");
  const out = [];
  let ok = 0, failed = 0;
  const seenSlugs = {};
  for (const rec of canonical) {
    const f = rec.fields;
    let slug = slugify(f.pageName) || `brand-${rec.sourceRow}`;
    let n = 2;
    while (seenSlugs[slug]) { slug = `${slug}-${n++}`; }
    seenSlugs[slug] = true;
    const result = await downloadImage(f.heroImageUrl, "brand", slug);
    const image = result && result.path ? result.path : null;
    if (image) ok++; else failed++;
    out.push({
      id: f.id, slug, pageName: f.pageName, h1: f.h1, intro: f.intro,
      sections: f.sections, cards: f.cards, image, sourceUrl: f.sourceUrl,
    });
  }
  await writeFile(path.join(CONTENT_DIR, "brand-pages-derived.json"), JSON.stringify(out, null, 2));
  summary.brandPages = { total: canonical.length, ok, failed };
  console.log(`brand-pages: ${ok} images ok, ${failed} failed, ${out.length} records`);
}

async function run() {
  await processIngredients();
  await processArticles();
  await processBrandContent();
  console.log("\n=== Summary ===", JSON.stringify(summary, null, 2));
}

run();
