// Downloads homepage assets extracted from https://en.caudalie.com/ into public/images/.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "public", "images", "caudalie");

const ASSETS = [
  ["https://assets.caudalie.com/f/286013/1140x1140/e45013d687/page_offre_dyp.png/m/filters:quality(80)", "hero-offer.png"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/1/_/1_fresh-fragrance_edv_caudalie_packshot_0_1.jpg", "product-eau-des-vignes-packshot.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/1/_/1_fresh-fragrance_edv-hero_caudalie_fr_0.jpg", "product-eau-des-vignes-hero.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/1/_/1_trousseete_2026_trousseavecproduits_caudalie_1.jpg", "product-caudalie-essentials-set.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/3/_/3_trousseete_2026_lifestyle_caudalie_1.jpg", "product-caudalie-essentials-lifestyle.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/1/_/1_fresh-fragrance_adv_caudalie_packshot_0_1.jpg", "product-ange-des-vignes-packshot.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/1/_/1_fresh-fragrance_adv-hero_caudalie_en_0.jpg", "product-ange-des-vignes-hero.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/1/_/1_lips_packshot_caudalie-fr.jpg", "product-tinted-lip-balm.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/5/0/508r1_hover.jpg", "product-vinoclean-grape-water-hover.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/e/a/eau_de_raisin_300ml_1000x1000_offwhite_2.jpg", "product-eau-de-raisin.jpg"],
  ["https://caudalie-europe.imgix.net/media/catalog/product/g/r/grape-water-300ml_02_2.jpg", "product-grape-water.jpg"],
  ["https://assets.caudalie.com/f/286013/830x1200/0bbc73b14f/spotlight_mobile_dyp.jpg/m/filters:quality(80)", "hero-banner-loyalty-mobile.jpg"],
  ["https://assets.caudalie.com/f/286013/830x1200/778f187b12/spotlight_mobile_refresh_v1.jpg/m/filters:quality(80)", "hero-banner-summer-freshness-mobile.jpg"],
  ["https://assets.caudalie.com/f/286013/640x802/767d0e9925/spotlight_prospect_1_servicesblocs.png/m/filters:quality(90)", "experience-powered-by-grape.png"],
  ["https://assets.caudalie.com/f/286013/640x802/5673232cea/bloc-service-skin-diag.png/m/filters:quality(90)", "experience-skin-diagnosis.png"],
  ["https://assets.caudalie.com/f/286013/640x802/7405042b24/spotlight_prospect_2_servicesblocs_2506.jpg/m/filters:quality(90)", "experience-earn-loyalty-points.jpg"],
  ["https://assets.caudalie.com/f/286013/640x802/0492a22a1c/spotlight_prospect_3_discount_servicesblocs.png/m/filters:quality(90)", "experience-welcome-offer.png"],
  ["https://assets.caudalie.com/f/286013/640x802/02f1f010c9/spotlight_pharma_3_servicesblocs.png/m/filters:quality(90)", "experience-find-a-store.png"],
  ["https://assets.caudalie.com/f/286013/345x434/3e425ef559/produits_cultes_vp-new.png/m/filters:quality(90)", "cult-product-vinoperfect.png"],
  ["https://assets.caudalie.com/f/286013/345x434/a08348a781/hp-bestseller-vpu-25-08-halved.jpg/m/filters:quality(90)", "cult-product-vinopure.jpg"],
  ["https://assets.caudalie.com/f/286013/345x434/d220a91d00/produits_cultes_pc.png/m/filters:quality(90)", "cult-product-premier-cru.png"],
  ["https://assets.caudalie.com/f/286013/345x434/45dab42cc9/produits_cultes_rvl.png/m/filters:quality(90)", "cult-product-resveratrol-lift.png"],
  ["https://assets.caudalie.com/f/286013/345x434/3ce80aa2b1/produits_cultes_be.png/m/filters:quality(90)", "cult-product-beaute.png"],
  ["https://assets.caudalie.com/f/286013/700x600/69b3edc846/spotlight_skin_diag.jpg/m/filters:quality(80)", "skin-analysis-banner.jpg"],
  ["https://assets.caudalie.com/f/286013/830x1200/8f2947f257/spotlight_mobile_myc.jpg/m/filters:quality(80)", "skin-analysis-banner-mobile.jpg"],
  ["https://assets.caudalie.com/f/286013/623x623/47d6856efa/natural-ingredient.jpg/m/filters:quality(90)", "brand-value-natural-origin.jpg"],
  ["https://assets.caudalie.com/f/286013/623x623/6379b5c4c6/623x623_hplogos_02_en.jpg/m/filters:quality(90)", "brand-value-zero-percent.jpg"],
  ["https://assets.caudalie.com/f/286013/623x623/f577850efe/1-for-the-planet.jpg/m/filters:quality(90)", "brand-value-1-percent-planet.jpg"],
  ["https://assets.caudalie.com/f/286013/623x623/7a36daac40/623x623_hplogos__2_100-plasticcollect.jpg/m/filters:quality(90)", "brand-value-ocean-plastic.jpg"],
  ["https://assets.caudalie.com/f/286013/1400x600/4f0df87cc7/brand_description_half.jpg/m/filters:quality(90)", "beauty-from-the-vine.jpg"],
  ["https://assets.caudalie.com/f/286013/264x335/3d2cd3514b/flux-insta-1-suncare.png/m/filters:quality(90)", "instagram-post-1.png"],
  ["https://assets.caudalie.com/f/286013/264x335/2d2bb1c909/flux-insta-2-suncare.png/m/filters:quality(90)", "instagram-post-2.png"],
  ["https://assets.caudalie.com/f/286013/264x335/895f38e9fc/flux-insta-3-suncare.png/m/filters:quality(90)", "instagram-post-3.png"],
  ["https://assets.caudalie.com/f/286013/264x335/95bee35262/flux-insta-4-suncare.png/m/filters:quality(90)", "instagram-post-4.png"],
  ["https://assets.caudalie.com/f/286013/264x335/d486d26447/flux-insta-5-suncare.png/m/filters:quality(90)", "instagram-post-5.png"],
  ["https://assets.caudalie.com/f/286013/264x335/1cee30044f/flux-insta-6-suncare.png/m/filters:quality(90)", "instagram-post-6.png"],
  // Note: these CDN URLs end in .svg but the asset pipeline (/m/filters:quality(90)) transcodes to PNG raster.
  ["https://assets.caudalie.com/f/286013/147x150/b7169d8142/icon_instagram.svg/m/filters:quality(90)", "icon-instagram.png"],
  ["https://assets.caudalie.com/f/286013/147x150/4f2e35a742/icon_facebook.svg/m/filters:quality(90)", "icon-facebook.png"],
  ["https://assets.caudalie.com/f/286013/147x150/cbf73171dc/icon_youtube.svg/m/filters:quality(90)", "icon-youtube.png"],
  ["https://assets.caudalie.com/f/286013/147x150/a22e90d871/icon_tiktok.svg/m/filters:quality(90)", "icon-tiktok.png"],
  ["https://assets.caudalie.com/f/286013/147x150/583f0c8b1f/icon_in.svg/m/filters:quality(90)", "icon-linkedin.png"],
  ["https://en.caudalie.com/icons/langs/international.svg", "icon-flag-international.svg"],
];

async function downloadOne([url, filename]) {
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAILED (${res.status}): ${url}`);
    return;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(path.join(OUT_DIR, filename), buf);
  console.log(`OK: ${filename} (${buf.length} bytes)`);
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const BATCH = 4;
  for (let i = 0; i < ASSETS.length; i += BATCH) {
    await Promise.all(ASSETS.slice(i, i + BATCH).map(downloadOne));
  }
}

run();
