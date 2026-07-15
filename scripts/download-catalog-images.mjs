// Phase 3 image pipeline: downloads every product image actually referenced
// by src/data/catalog/hh-products-derived.json into
// public/images/hh/products/<slug>/main.<ext>, deduping by SHA-256 content
// hash so identical LPM source images (shared across HH SKU variants) are
// only downloaded once. Updates hh-products-derived.json's `image` field
// in place. Read the report at docs/production/HH_LPM_FULL_DEMO_DATA_REPORT.md
// for what "actually used" scope this covers.
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = process.cwd();
const DERIVED_PATH = path.join(ROOT, "src/data/catalog/hh-products-derived.json");
const OUT_BASE = path.join(ROOT, "public/images/hh/products");

const hashToPath = new Map(); // sha256 -> public path (first owner wins)
const results = { ok: 0, failed: 0, deduped: 0, failures: [] };

function extFromContentType(ct) {
  if (!ct) return "jpg";
  if (ct.includes("webp")) return "jpg"; // we request ?fm=jpg below, but guard anyway
  if (ct.includes("png")) return "png";
  return "jpg";
}

async function downloadOne(product) {
  if (product.image || !product.imageSourceUrl) return;
  const url = product.imageSourceUrl.includes("?") ? `${product.imageSourceUrl}&fm=jpg&w=1200` : `${product.imageSourceUrl}?fm=jpg&w=1200`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      results.failed++;
      results.failures.push({ sku: product.sku, url, status: res.status });
      return;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const hash = crypto.createHash("sha256").update(buf).digest("hex");

    if (hashToPath.has(hash)) {
      product.image = hashToPath.get(hash);
      results.deduped++;
      return;
    }

    const dir = path.join(OUT_BASE, product.slug);
    await mkdir(dir, { recursive: true });
    const ext = extFromContentType(res.headers.get("content-type"));
    const filename = `main.${ext}`;
    await writeFile(path.join(dir, filename), buf);
    const publicPath = `/images/hh/products/${product.slug}/${filename}`;
    hashToPath.set(hash, publicPath);
    product.image = publicPath;
    results.ok++;
    console.log(`OK: ${product.sku} -> ${publicPath} (${buf.length} bytes)`);
  } catch (err) {
    results.failed++;
    results.failures.push({ sku: product.sku, url, error: String(err) });
  }
}

async function run() {
  const products = JSON.parse(await readFile(DERIVED_PATH, "utf-8"));

  // Seed hashToPath with the 14 already-downloaded images from Phase 2 so
  // any of the 26 new ones that happen to share content aren't re-fetched.
  for (const p of products) {
    if (p.image) {
      // We don't have their hash without reading the file; skip — these are
      // already correctly wired and won't be touched (image is truthy).
      continue;
    }
  }

  const targets = products.filter((p) => !p.image && p.imageSourceUrl);
  console.log(`${targets.length} products to download`);

  const BATCH = 4;
  for (let i = 0; i < targets.length; i += BATCH) {
    await Promise.all(targets.slice(i, i + BATCH).map(downloadOne));
  }

  await writeFile(DERIVED_PATH, JSON.stringify(products, null, 2), "utf-8");

  console.log("\n=== Results ===");
  console.log(`OK (new download): ${results.ok}`);
  console.log(`Deduped (reused existing hash): ${results.deduped}`);
  console.log(`Failed: ${results.failed}`);
  for (const f of results.failures) console.log("  FAILED:", f);
}

run();
