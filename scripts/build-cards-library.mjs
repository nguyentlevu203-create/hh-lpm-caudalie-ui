// Phase 4 Part 4: downloads all 159 `07_Cards_CTA` card images into
// public/images/hh/cards/<id>/main.jpg (SHA-256 deduped) and classifies each
// card into one of 7 categories (sản phẩm / nguyên liệu / bài viết / nội
// dung thương hiệu / campaign / CTA chung / chưa phân loại).
//
// Classification is two-layer:
//  1. Path-bucket on `targetUrl`'s first two path segments — a coarse but
//     100%-deterministic category (verified against every bucket present in
//     the real data; see docs/production/HH_LPM_DATA_TO_UI_COVERAGE_AUDIT.md).
//  2. Exact `sourceUrl`/`productUrl` match against the canonical datasets
//     (ingredients/articles/brand_content/brand-library) — when this hits,
//     the card gets an item-level `matchedRoute` to embed on that specific
//     detail page; when it doesn't, the card still gets its bucket category
//     but no specific target page, and renders in /thu-vien-noi-dung labeled
//     "Chưa phân loại — dữ liệu demo nội bộ" for the target-page slot only
//     (its category grouping is still shown).
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "src/data/content");
const CATALOG_DIR = path.join(ROOT, "src/data/catalog");

const DEDICATED_ROUTES = {
  "thuong-hieu-le-petit-marseillais": "/thuong-hieu",
  "le-petit-marseillais-cam-ket-bao-ve-moi-truong-tai-provence": "/cam-ket",
  "cong-thuc-cua-chung-toi-duoc-trinh-bay-mot-cach-hoan-toan-minh-bach": "/cong-thuc-minh-bach",
};

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

const strip = (u) => (u ? u.split("?")[0] : u);

function pathBucketCategory(targetUrl) {
  if (!targetUrl) return "chua-phan-loai";
  let pathname;
  try {
    pathname = new URL(targetUrl).pathname;
  } catch {
    return "chua-phan-loai";
  }
  const segs = pathname.split("/").filter(Boolean);
  if (segs.length === 0) return "chua-phan-loai";
  const top = segs[0];
  const bucket = segs.slice(0, 2).join("/");

  if (top === "par-ici-les-produits" || top === "products") return "san-pham";
  if (bucket === "coucou-la-marque/bonjour-nature") return "nguyen-lieu";
  if (top === "coucou-la-marque") return "noi-dung-thuong-hieu";
  if (top === "tous-nos-conseils") return "bai-viet";
  if (top.includes("prendre-soin-de-son-cuir-chevelu")) return "bai-viet";
  if (top === "cosmetique-bio") return "campaign";
  return "chua-phan-loai";
}

const hashToPath = new Map();
const results = { ok: 0, deduped: 0, failed: 0 };

async function downloadImage(url, id) {
  if (!url) return null;
  const sep = url.includes("?") ? "&" : "?";
  try {
    const res = await fetch(`${url}${sep}fm=jpg&w=800`);
    if (!res.ok) {
      results.failed++;
      return null;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const hash = crypto.createHash("sha256").update(buf).digest("hex");
    if (hashToPath.has(hash)) {
      results.deduped++;
      return hashToPath.get(hash);
    }
    const dir = path.join(ROOT, "public/images/hh/cards", id);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "main.jpg"), buf);
    const publicPath = `/images/hh/cards/${id}/main.jpg`;
    hashToPath.set(hash, publicPath);
    results.ok++;
    return publicPath;
  } catch {
    results.failed++;
    return null;
  }
}

async function run() {
  const cards = JSON.parse(await readFile(path.join(CONTENT_DIR, "cards.json"), "utf-8")).cards;
  const ingredients = JSON.parse(await readFile(path.join(CONTENT_DIR, "ingredients-derived.json"), "utf-8"));
  const articles = JSON.parse(await readFile(path.join(CONTENT_DIR, "articles-derived.json"), "utf-8"));
  const brandPagesRaw = JSON.parse(await readFile(path.join(CONTENT_DIR, "brand-pages.json"), "utf-8")).brandPages;
  const brandLibrary = JSON.parse(await readFile(path.join(CATALOG_DIR, "brand-products-derived.json"), "utf-8"));

  const ingUrls = new Map(ingredients.map((r) => [strip(r.sourceUrl), r]));
  const artUrls = new Map(articles.map((r) => [strip(r.sourceUrl), r]));
  const canon = brandPagesRaw.filter((r) => r.fields.pageType === "brand_content");
  const canonUrls = new Map(canon.map((r) => [strip(r.fields.sourceUrl), r]));
  const prodUrls = new Map(brandLibrary.map((r) => [strip(r.productUrl), r]));

  const categoryCounts = {};
  const out = [];

  for (let i = 0; i < cards.length; i += 6) {
    const batch = cards.slice(i, i + 6);
    await Promise.all(
      batch.map(async (rec) => {
        const f = rec.fields;
        const u = strip(f.targetUrl);
        let matchedType = null;
        let matchedSlug = null;
        let matchedTitle = null;
        let matchedRoute = null;
        let category = pathBucketCategory(f.targetUrl);

        if (u && ingUrls.has(u)) {
          const c = ingUrls.get(u);
          matchedType = "ingredient";
          matchedSlug = c.slug;
          matchedTitle = c.name;
          matchedRoute = `/nguyen-lieu/${c.slug}`;
          category = "nguyen-lieu";
        } else if (u && artUrls.has(u)) {
          const c = artUrls.get(u);
          matchedType = "article";
          matchedSlug = c.slug;
          matchedTitle = c.title;
          matchedRoute = `/bai-viet/${c.slug}`;
          category = "bai-viet";
        } else if (u && canonUrls.has(u)) {
          const c = canonUrls.get(u);
          const cSlug = slugify(c.fields.pageName);
          matchedType = "brand_content";
          matchedSlug = cSlug;
          matchedTitle = c.fields.pageName;
          matchedRoute = DEDICATED_ROUTES[cSlug] ?? `/noi-dung-thuong-hieu/${cSlug}`;
          category = "noi-dung-thuong-hieu";
        } else if (u && prodUrls.has(u)) {
          const c = prodUrls.get(u);
          matchedType = "brand_library";
          matchedSlug = c.slug;
          matchedTitle = c.nameVi;
          matchedRoute = `/thu-vien-san-pham-hang/${c.slug}`;
          category = "san-pham";
        }

        categoryCounts[category] = (categoryCounts[category] || 0) + 1;

        const image = await downloadImage(f.imageUrl, f.id);

        out.push({
          id: f.id,
          title: f.title,
          description: f.description,
          cta: f.cta,
          image,
          imageSourceUrl: f.imageUrl,
          targetUrl: f.targetUrl,
          sourcePage: f.sourcePage,
          category,
          matchedType,
          matchedSlug,
          matchedTitle,
          matchedRoute,
        });
      })
    );
  }

  await writeFile(path.join(CONTENT_DIR, "cards-derived.json"), JSON.stringify(out, null, 2));

  console.log("=== Download results ===", results);
  console.log("=== Category counts ===", categoryCounts);
  console.log(`Total: ${out.length}, matched to specific page: ${out.filter((c) => c.matchedRoute).length}`);
}

run();
