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

  // Search results — https://en.caudalie.com/search?q=serum (products not already covered above)
  ["https://caudalie-europe.imgix.net/media/catalog/product/m/a/masque_detox_75ml.jpg?w=700&fit=fill&fill=solid&fill-color=f4f3f1", "search/pore-minimising-detox-mask.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/1/_/1_resveratrol-lift_cachemire_caudalie_packshot_offwhite_1_2026.jpg?w=700&fit=fill&fill=solid&fill-color=f4f3f1", "search/resveratrol-lift-cashmere-cream.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/1/_/1_premiercru_lacremeyeux_caudalie_packshot_241115.jpg?w=700&fit=fill&fill=solid&fill-color=f4f3f1", "search/premier-cru-eye-cream.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/1/_/1_premiercru_lacreme_caudalie_packshot.jpg?w=700&fit=fill&fill=solid&fill-color=f4f3f1", "search/premier-cru-the-cream.jpg"],

  // Find your regimen / diagnosis hub — https://en.caudalie.com/find-your-regimen/find-your-regimen
  ["https://assets.caudalie.com/f/286013/722x806/d7300c94af/lp-des-lp-premiercru.jpg/m/filters:quality(90)", "diagnosis/premier-cru.jpg"],
  ["https://assets.caudalie.com/f/286013/634x680/d729dd97ca/range_rvl_2023.png/m/filters:quality(90)", "diagnosis/resveratrol-lift.png"],
  ["https://assets.caudalie.com/f/286013/722x806/1c0c88947e/lp-des-lp-vinoperfect.jpg/m/filters:quality(90)", "diagnosis/vinoperfect.jpg"],
  ["https://assets.caudalie.com/f/286013/722x806/3fc34f6b9d/vh_c_r.jpg/m/filters:quality(90)", "diagnosis/vinohydra.jpg"],
  ["https://assets.caudalie.com/f/286013/722x806/313c1babf1/vinoclean_2025_lp_des_lp.jpg/m/filters:quality(90)", "diagnosis/vinoclean.jpg"],
  ["https://assets.caudalie.com/f/286013/722x806/496fab492b/lp-des-lp-vinopure.jpg/m/filters:quality(90)", "diagnosis/vinopure.jpg"],
  ["https://assets.caudalie.com/f/286013/634x680/9ba02318a4/vinosculpt-634-x-680_2025-03.jpg/m/filters:quality(90)", "diagnosis/vinosculpt.jpg"],
  ["https://assets.caudalie.com/f/286013/722x806/823bf5d2b8/lp-des-lp-suncare.jpg/m/filters:quality(90)", "diagnosis/suncare.jpg"],
  ["https://assets.caudalie.com/f/286013/722x806/4989605fbe/lp-des-lp-beauty-elix_202506.jpg/m/filters:quality(90)", "diagnosis/beauty-elixir.jpg"],
  ["https://assets.caudalie.com/f/286013/722x806/c8b89e0a7a/lp-des-lp-eaux.jpg/m/filters:quality(90)", "diagnosis/eaux-fraiches.jpg"],

  // Offers hub — https://en.caudalie.com/gift-offers/all-offers
  ["https://assets.caudalie.com/f/286013/1140x1140/e45013d687/page_offre_dyp.png/m/filters:quality(90)", "offers/double-your-points.png"],
  ["https://assets.caudalie.com/f/286013/1140x1140/297b23c951/page_offre_refresh_v1.jpg/m/filters:quality(90)", "offers/summer-freshness.jpg"],
  ["https://assets.caudalie.com/f/286013/1140x1140/24ce78e0bb/page_offre-aftersun.jpg/m/filters:quality(90)", "offers/long-lasting-tan.jpg"],
  ["https://assets.caudalie.com/f/286013/1080x1080/63a607fb5e/page-offre-coffret-editions-limitees.jpg/m/filters:quality(90)", "offers/limited-edition-gift-sets.jpg"],
  ["https://assets.caudalie.com/f/286013/1080x1080/15ada20464/caudalie_rewards_and_benefits.jpg/m/filters:quality(90)", "offers/mycaudalie-loyalty.jpg"],
  ["https://assets.caudalie.com/f/286013/1140x1140/2fad8417cc/welcome_offer_page.jpg/m/filters:quality(90)", "offers/welcome-offer.jpg"],
  ["https://assets.caudalie.com/f/286013/1365x818/564f2f7c16/lpcadeaux-egiftcard.jpg/m/filters:quality(90)", "offers/egift-card.jpg"],
  ["https://assets.caudalie.com/f/286013/721x433/6e1e4a562f/page_offres-avantages_bestsellers.jpg/m/filters:quality(90)", "offers/bestsellers.jpg"],
  ["https://assets.caudalie.com/f/286013/546x326/3618ae86dd/quoi_offrir_duo_vp_suncare.jpg/m/filters:quality(90)", "offers/limited-editions.jpg"],
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
