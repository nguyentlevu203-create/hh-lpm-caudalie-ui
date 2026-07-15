// Phase 4 Part 3: resolves the 105-row `05_Trang_noi_dung` sheet against the
// already-imported canonical content (ingredients/articles/brand_content) by
// EXACT sourceUrl match (verified 100% coverage for the 3 duplicate
// pageTypes — no fuzzy/text matching, no risk of a wrong match). Produces:
//  - src/data/content/content-pages-derived.json: the 14 canonical
//    brand_content pages (copied from brand-pages-derived.json, each tagged
//    with its dedicated route if one of the 3 named routes already covers
//    it) PLUS the 1 unique `ingredient_index_page` row (own hero image
//    downloaded here, not part of any prior script run).
//  - src/data/content/content-duplicates-derived.json: the 104 confirmed
//    scrape-duplicate rows, each resolved to the canonical route it
//    duplicates, for the "104 nội dung trùng lặp" section of
//    /noi-dung-thuong-hieu.
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "src/data/content");

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

async function downloadImage(url, subdir, slug) {
  if (!url) return null;
  const sep = url.includes("?") ? "&" : "?";
  try {
    const res = await fetch(`${url}${sep}fm=jpg&w=1200`);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    const dir = path.join(ROOT, "public/images/hh", subdir, slug);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "main.jpg"), buf);
    return `/images/hh/${subdir}/${slug}/main.jpg`;
  } catch {
    return null;
  }
}

async function run() {
  const brandPagesRaw = JSON.parse(await readFile(path.join(CONTENT_DIR, "brand-pages.json"), "utf-8")).brandPages;
  const brandPagesDerived = JSON.parse(await readFile(path.join(CONTENT_DIR, "brand-pages-derived.json"), "utf-8"));
  const ingredients = JSON.parse(await readFile(path.join(CONTENT_DIR, "ingredients-derived.json"), "utf-8"));
  const articles = JSON.parse(await readFile(path.join(CONTENT_DIR, "articles-derived.json"), "utf-8"));

  // --- content-pages-derived.json: 14 canonical + 1 unique index page ---
  const contentPages = brandPagesDerived.map((p) => ({
    ...p,
    dedicatedRoute: DEDICATED_ROUTES[p.slug] ?? null,
  }));

  const indexRow = brandPagesRaw.find((r) => r.fields.pageType === "ingredient_index_page");
  if (indexRow) {
    const f = indexRow.fields;
    const slug = slugify(f.title) || `trangnd-${indexRow.sourceRow}`;
    const image = await downloadImage(f.heroImageUrl, "brand", slug);
    contentPages.push({
      id: f.id,
      slug,
      pageName: f.title,
      h1: f.h1,
      intro: f.intro,
      sections: f.fullContent ?? null,
      cards: null,
      image,
      sourceUrl: f.sourceUrl,
      dedicatedRoute: null,
      isIndexPage: true,
    });
  }

  await writeFile(
    path.join(CONTENT_DIR, "content-pages-derived.json"),
    JSON.stringify(contentPages, null, 2)
  );

  // --- content-duplicates-derived.json: 104 confirmed scrape duplicates ---
  const ingUrls = new Map(ingredients.map((r) => [strip(r.sourceUrl), r]));
  const artUrls = new Map(articles.map((r) => [strip(r.sourceUrl), r]));
  const canon = brandPagesRaw.filter((r) => r.fields.pageType === "brand_content");
  const canonUrls = new Map(canon.map((r) => [strip(r.fields.sourceUrl), r]));

  const dupRows = brandPagesRaw.filter((r) =>
    [
      "generic_scrape_duplicate_of_ingredient",
      "generic_scrape_duplicate_of_article",
      "generic_scrape_duplicate_of_brand_content",
    ].includes(r.fields.pageType)
  );

  const duplicates = [];
  let unresolved = 0;
  for (const r of dupRows) {
    const f = r.fields;
    const u = strip(f.sourceUrl);
    let canonicalType = null;
    let canonicalSlug = null;
    let canonicalTitle = null;
    let canonicalRoute = null;

    if (f.pageType === "generic_scrape_duplicate_of_ingredient" && ingUrls.has(u)) {
      const c = ingUrls.get(u);
      canonicalType = "ingredient";
      canonicalSlug = c.slug;
      canonicalTitle = c.name;
      canonicalRoute = `/nguyen-lieu/${c.slug}`;
    } else if (f.pageType === "generic_scrape_duplicate_of_article" && artUrls.has(u)) {
      const c = artUrls.get(u);
      canonicalType = "article";
      canonicalSlug = c.slug;
      canonicalTitle = c.title;
      canonicalRoute = `/bai-viet/${c.slug}`;
    } else if (f.pageType === "generic_scrape_duplicate_of_brand_content" && canonUrls.has(u)) {
      const c = canonUrls.get(u);
      const cSlug = slugify(c.fields.pageName);
      canonicalType = "brand_content";
      canonicalSlug = cSlug;
      canonicalTitle = c.fields.pageName;
      canonicalRoute = DEDICATED_ROUTES[cSlug] ?? `/noi-dung-thuong-hieu/${cSlug}`;
    } else {
      unresolved++;
    }

    duplicates.push({
      id: f.id,
      pageTypeRaw: f.pageTypeRaw,
      title: f.title,
      h1: f.h1,
      sourceUrl: f.sourceUrl,
      canonicalType,
      canonicalSlug,
      canonicalTitle,
      canonicalRoute,
    });
  }

  await writeFile(
    path.join(CONTENT_DIR, "content-duplicates-derived.json"),
    JSON.stringify(duplicates, null, 2)
  );

  console.log(`content-pages-derived.json: ${contentPages.length} records (14 canonical + ${indexRow ? 1 : 0} index page)`);
  console.log(`content-duplicates-derived.json: ${duplicates.length} records, unresolved: ${unresolved}`);
}

run();
