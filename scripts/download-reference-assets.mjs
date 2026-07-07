// Downloads assets for the /reference/* UI templates (docs/research/CAUDALIE_URL_INVENTORY.md)
// into public/images/reference/<template>/. Extend ASSETS as each template is cloned.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "public", "images", "reference");

const ASSETS = [
  // Category / Listing (Face > Serums) — https://en.caudalie.com/c/all-products/face/serums.html
  ["https://caudalie-europe.imgix.net/media/catalog/product/1/_/1_duo_vp_vinosun_packshot_caudalie.jpg?w=700&fit=fill&fill=solid&fill-color=f4f3f1", "category/vinoperfect-duo.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/1/_/1_vinoperfect_serumjumbo_packshot_caudalie.jpg?w=700&fit=fill&fill=solid&fill-color=f4f3f1", "category/vinoperfect-jumbo.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/1/_/1_vinoperfect_serum_pack_caudalie_3.jpg?w=700&fit=fill&fill=solid&fill-color=f4f3f1", "category/vinoperfect-30ml.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/r/o/routine_vinoperfect_2025_1.jpg?w=700&fit=fill&fill=solid&fill-color=f4f3f1", "category/vinoperfect-routine.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/1/_/1_vinopure_serum_packshot_caudalie_250716.jpg?w=700&fit=fill&fill=solid&fill-color=f4f3f1", "category/vinopure-serum.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/1/_/1_resveratrol-lift_serum_caudalie_packshot_offwhite_2026.jpg?w=700&fit=fill&fill=solid&fill-color=f4f3f1", "category/resveratrol-lift-serum.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/0/_/0_rvlift_refill_serum_packshot_copy_2026.jpg?w=700&fit=fill&fill=solid&fill-color=f4f3f1", "category/resveratrol-lift-refill.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/1/_/1_premiercru_serum_caudalie_packshot_456.jpg?w=700&fit=fill&fill=solid&fill-color=f4f3f1", "category/premier-cru-serum.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/1/_/1_vinohydra_serum_packshot_caudalie.jpg?w=700&fit=fill&fill=solid&fill-color=f4f3f1", "category/vinohydra-serum.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/r/o/routine_vinopure_2025.jpg?w=700&fit=fill&fill=solid&fill-color=f4f3f1", "category/vinopure-routine.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/b/u/bundle_packshot.jpg?w=700&fit=fill&fill=solid&fill-color=f4f3f1", "category/resveratrol-lift-duo.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/b/u/bundle-pc-2025.jpg?w=700&fit=fill&fill=solid&fill-color=f4f3f1", "category/premier-cru-routine.jpg"],

  // Product Detail Page — https://en.caudalie.com/p/432C/vinoperfect-radiance-serum-complexion-correcting-432c.html
  ["https://caudalie-europe.imgix.net/media/catalog/product/3/_/3_vinoperfect_2026_serum_clinical_1_caudalie-en_1.jpg?w=900&fit=fill&fill=solid&fill-color=f4f3f1", "pdp/vinoperfect-clinical.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/4/_/4_vinoperfect_2026_serum_les-taches_caudalie-en_1.jpg?w=900&fit=fill&fill=solid&fill-color=f4f3f1", "pdp/vinoperfect-dark-spots.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/5/_/5_vinoperfect_2026_serum_before-after_caudalie-en_1.jpg?w=900&fit=fill&fill=solid&fill-color=f4f3f1", "pdp/vinoperfect-before-after.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/7/_/7_vinoperfect_2026_serum_ingredients_caudalie-en_1.jpg?w=900&fit=fill&fill=solid&fill-color=f4f3f1", "pdp/vinoperfect-ingredients.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/1/_/1_fresh-fragrance_rdv_caudalie_packshot_0_1.jpg?w=700&fit=fill&fill=solid&fill-color=f4f3f1", "pdp/rose-de-vigne-packshot.jpg"],
];

async function downloadOne([url, relativePath]) {
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAILED (${res.status}): ${url}`);
    return;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const dest = path.join(OUT_DIR, relativePath);
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  console.log(`OK: ${relativePath} (${buf.length} bytes)`);
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const BATCH = 4;
  for (let i = 0; i < ASSETS.length; i += BATCH) {
    await Promise.all(ASSETS.slice(i, i + BATCH).map(downloadOne));
  }
}

run();
