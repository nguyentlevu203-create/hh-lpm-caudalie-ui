// Phase 4 Part 5: resolves each of the 1161 `08_Thu_vien_anh`/`02_Anh_san_pham`
// media-library rows against every image already legitimately downloaded
// elsewhere in this project (HH products, brand-library reference products,
// ingredients, articles, brand/content pages, cards) by exact imageUrl
// match. Rows that resolve get a real localPath + downloadStatus
// "downloaded"; the rest keep downloadStatus "not_downloaded" and are never
// fetched here — no mass hotlinking of the ~800 images nothing in the UI
// actually uses. Produces src/data/content/media-library-derived.json.
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "src/data/content");
const CATALOG_DIR = path.join(ROOT, "src/data/catalog");

const strip = (u) => (u ? u.split("?")[0] : u);

async function readJson(p) {
  return JSON.parse(await readFile(p, "utf-8"));
}

async function run() {
  const media = (await readJson(path.join(CONTENT_DIR, "media-library.json"))).media;
  const hhProducts = await readJson(path.join(CATALOG_DIR, "hh-products-derived.json"));
  const brandLibrary = await readJson(path.join(CATALOG_DIR, "brand-products-derived.json"));
  const cards = await readJson(path.join(CONTENT_DIR, "cards-derived.json"));

  // Ingredients/articles/brand-pages derived JSON only keep the page
  // sourceUrl, not the original heroImageUrl — pull heroImageUrl from the
  // raw source-tracked JSON (keyed by `id`) and join against the derived
  // JSON's local `image` path via that same `id`.
  const ingredientsRaw = (await readJson(path.join(CONTENT_DIR, "ingredients.json"))).ingredients;
  const articlesRaw = (await readJson(path.join(CONTENT_DIR, "articles.json"))).articles;
  const brandPagesRaw = (await readJson(path.join(CONTENT_DIR, "brand-pages.json"))).brandPages;
  const ingredientsDerived = await readJson(path.join(CONTENT_DIR, "ingredients-derived.json"));
  const articlesDerived = await readJson(path.join(CONTENT_DIR, "articles-derived.json"));
  const contentPages = await readJson(path.join(CONTENT_DIR, "content-pages-derived.json"));

  const urlToLocal = new Map();
  const addAll = (records, urlField, imageField) => {
    for (const r of records) {
      if (r[imageField] && r[urlField]) urlToLocal.set(strip(r[urlField]), r[imageField]);
    }
  };
  addAll(hhProducts, "imageSourceUrl", "image");
  addAll(brandLibrary, "imageSourceUrl", "image");
  addAll(cards, "imageSourceUrl", "image");

  const joinRawToDerived = (rawRecords, derivedRecords) => {
    const idToHero = new Map(rawRecords.map((r) => [r.fields.id, r.fields.heroImageUrl]));
    for (const d of derivedRecords) {
      const hero = idToHero.get(d.id);
      if (hero && d.image) urlToLocal.set(strip(hero), d.image);
    }
  };
  joinRawToDerived(ingredientsRaw, ingredientsDerived);
  joinRawToDerived(articlesRaw, articlesDerived);
  // content-pages-derived.json covers the 14 canonical brand_content + 1
  // index page; its own `sourceUrl`/`id` line up directly with brandPagesRaw.
  const brandIdToHero = new Map(brandPagesRaw.map((r) => [r.fields.id, r.fields.heroImageUrl]));
  for (const p of contentPages) {
    const hero = brandIdToHero.get(p.id);
    if (hero && p.image) urlToLocal.set(strip(hero), p.image);
  }

  let resolved = 0;
  const out = media.map((rec) => {
    const f = rec.fields;
    const local = urlToLocal.get(strip(f.imageUrl));
    if (local) resolved++;
    return {
      id: `${rec.sourceSheet}-${rec.sourceRow}`,
      sourceSheet: rec.sourceSheet,
      imageType: f.imageType,
      sourceArea: f.sourceArea,
      altTextVi: f.altTextVi,
      pagesUsingCount: f.pagesUsingCount,
      sampleUsagePage: f.sampleUsagePage,
      imageUrl: f.imageUrl,
      localPath: local ?? null,
      downloadStatus: local ? "downloaded" : "not_downloaded",
    };
  });

  await writeFile(path.join(CONTENT_DIR, "media-library-derived.json"), JSON.stringify(out, null, 2));
  console.log(`media-library-derived.json: ${out.length} records, resolved to local file: ${resolved}`);
}

run();
