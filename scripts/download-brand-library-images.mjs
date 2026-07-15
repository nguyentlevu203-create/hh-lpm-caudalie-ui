// Phase 4 Part 2 image pipeline: downloads the main product image for every
// row of src/data/catalog/brand-products.json (147 LPM France reference-only
// products, sellable:false) into public/images/hh/brand-library/<slug>/main.<ext>,
// deduping by SHA-256 content hash. Where a brand-product's mainImageUrl is
// byte-identical (same URL) to one already downloaded for an HH product in
// Phase 3 (hh-products-derived.json), the existing local file is reused
// directly instead of re-downloading. Produces
// src/data/catalog/brand-products-derived.json — UI-ready records for
// /thu-vien-san-pham-hang. Never sets sellable/referenceOnly to anything but
// false/true respectively; these are reference-only, not real HH catalogue.
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = process.cwd();
const SRC_PATH = path.join(ROOT, "src/data/catalog/brand-products.json");
const HH_DERIVED_PATH = path.join(ROOT, "src/data/catalog/hh-products-derived.json");
const OUT_PATH = path.join(ROOT, "src/data/catalog/brand-products-derived.json");
const OUT_BASE = path.join(ROOT, "public/images/hh/brand-library");

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

const hashToPath = new Map();
const results = { reused: 0, ok: 0, deduped: 0, failed: 0, failures: [] };

function extFromContentType(ct) {
  if (!ct) return "jpg";
  if (ct.includes("png")) return "png";
  return "jpg";
}

async function downloadOne(rec, urlToLocal) {
  const f = rec.fields;
  const url = f.mainImageUrl;
  if (!url) return null;

  const reuse = urlToLocal.get(strip(url));
  if (reuse) {
    results.reused++;
    return reuse;
  }

  const fetchUrl = url.includes("?") ? `${url}&fm=jpg&w=1200` : `${url}?fm=jpg&w=1200`;
  try {
    const res = await fetch(fetchUrl);
    if (!res.ok) {
      results.failed++;
      results.failures.push({ id: f.id, url: fetchUrl, status: res.status });
      return null;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const hash = crypto.createHash("sha256").update(buf).digest("hex");
    if (hashToPath.has(hash)) {
      results.deduped++;
      return hashToPath.get(hash);
    }
    const slug = f.slug || `lpm-${rec.sourceRow}`;
    const dir = path.join(OUT_BASE, slug);
    await mkdir(dir, { recursive: true });
    const ext = extFromContentType(res.headers.get("content-type"));
    const filename = `main.${ext}`;
    await writeFile(path.join(dir, filename), buf);
    const publicPath = `/images/hh/brand-library/${slug}/${filename}`;
    hashToPath.set(hash, publicPath);
    results.ok++;
    console.log(`OK: ${f.id} -> ${publicPath} (${buf.length} bytes)`);
    return publicPath;
  } catch (err) {
    results.failed++;
    results.failures.push({ id: f.id, url: fetchUrl, error: String(err) });
    return null;
  }
}

async function run() {
  const src = JSON.parse(await readFile(SRC_PATH, "utf-8"));
  const hhProducts = JSON.parse(await readFile(HH_DERIVED_PATH, "utf-8"));

  const urlToLocal = new Map();
  for (const p of hhProducts) {
    if (p.image && p.imageSourceUrl) urlToLocal.set(strip(p.imageSourceUrl), p.image);
  }

  const records = src.brandProducts;
  const seenSlugs = new Map();
  for (const rec of records) {
    let slug = slugify(rec.fields.nameVi) || slugify(rec.fields.nameOriginal) || `lpm-${rec.sourceRow}`;
    let n = 2;
    const base = slug;
    while (seenSlugs.has(slug)) slug = `${base}-${n++}`;
    seenSlugs.set(slug, true);
    rec.fields.slug = slug;
  }

  const BATCH = 4;
  for (let i = 0; i < records.length; i += BATCH) {
    await Promise.all(
      records.slice(i, i + BATCH).map(async (rec) => {
        rec.fields.image = await downloadOne(rec, urlToLocal);
      })
    );
  }

  const out = records.map((rec) => {
    const f = rec.fields;
    return {
      id: f.id,
      slug: f.slug,
      nameVi: f.nameVi,
      nameOriginal: f.nameOriginal,
      categoryRaw: f.categoryRaw,
      subGroup: f.subGroup,
      productLine: f.productLine,
      volume: f.volume,
      scentOrKeyIngredient: f.scentOrKeyIngredient,
      shortDescription: f.shortDescription,
      description: f.description,
      benefits: f.benefits,
      howToUse: f.howToUse,
      ingredients: f.ingredients,
      claims: f.claims,
      packaging: f.packaging,
      image: f.image,
      imageSourceUrl: f.mainImageUrl,
      productUrl: f.productUrl,
      sellable: false,
      referenceOnly: true,
    };
  });

  await writeFile(OUT_PATH, JSON.stringify(out, null, 2), "utf-8");

  console.log("\n=== Results ===");
  console.log(`Reused (same URL as HH product image): ${results.reused}`);
  console.log(`OK (new download): ${results.ok}`);
  console.log(`Deduped (reused hash within this run): ${results.deduped}`);
  console.log(`Failed: ${results.failed}`);
  for (const f of results.failures) console.log("  FAILED:", f);
  console.log(`Total records: ${out.length}, with image: ${out.filter((r) => r.image).length}`);
}

run();
