// Downloads matched LPM France (lepetitmarseillais.com) product packshots for the
// 14 real Hoàng Hà demo products into public/images/hh/products/.
// Source URLs identified manually in docs/production/HH_LPM_DEMO_DATA_AUDIT_REPORT.md §9.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "public", "images", "hh", "products");

const ASSETS = [
  ["https://images.ctfassets.net/jncafthqaw2i/5AmFtso2yIRzLu5cdvYB0s/3ca6452e81aa623361c9b1e804b19ab2/LPM_EMEA_FR_3574661853789_90726500_529412_SHOWER_GEL_SALT_300ML_PR_000_TIF.WEBP?fm=jpg&w=1200", "st54463-muoi-bien.jpg"],
  ["https://images.ctfassets.net/jncafthqaw2i/7zaBHw5vKg2W7UF6nmacLq/d84d1a85ced398dfba540c4b6e3e3c1f/LPM_EMEA_FR_3574661853130_90723800_587310_SHW_BTH_GPFR_ORNG_650ml_000_TIF.WEBP?fm=jpg&w=1200", "st01868-cam-buoi.jpg"],
  ["https://images.ctfassets.net/jncafthqaw2i/iGpIJ6zZrBA9Rc7aCX4Tk/1fb233a10079ccec60359854ea8a0034/LPM_EMEA_FR_3574661852560_90723100_587102_SHW_BTH_APRI_HNUT_650ml_000_TIF.WEBP?fm=jpg&w=1200", "st00809-mo-hat-phi.jpg"],
  ["https://images.ctfassets.net/jncafthqaw2i/2Nmkg73nsTkMQGvwUyeZZW/5e8a2357366e936e0c71291f2ae5b8c5/LPM_EMEA_FR_3574661853765_90726300_530605_SHGEL_POMEGRANATE_300ML_PR_000_TIF.WEBP?fm=jpg&w=1200", "st19308-luu.jpg"],
  ["https://images.ctfassets.net/jncafthqaw2i/319qc5u3CvkbEP88bz5kkE/021ae75e19c3c4db7643cafdbf3c51c4/LPM_EMEA_FR_3574661853710_90725800_530314_SHGEL_MONOI_300ML_PR_000_TIF.WEBP?fm=jpg&w=1200", "st99493-hoa-tiare.jpg"],
  ["https://images.ctfassets.net/jncafthqaw2i/6tyF8lgtoiA3Qi8BAXIeet/4846f43de70c1de9486335d992c1bdc7/lpm_emea_3574661574646_2791102_purifying_lidl_shampoo_300ml_0001.jpg?fm=jpg&w=1200", "dg74646-tam-ma-chanh.jpg"],
  ["https://images.ctfassets.net/jncafthqaw2i/3evRDNq5S7BAO5pTJF10ch/63e8d3643bd71e9a6e28c947eea7ff8c/lpm_emea_fr_3574661801841_90491400_shmp_softness_shine_300ml_000_2.jpg?fm=jpg&w=1200", "dg01841-hanh-nhan-hat-lanh.jpg"],
  ["https://images.ctfassets.net/jncafthqaw2i/55aU6ENWe7PiAkVttOTRfN/032b5e7aaeeaafa62f1d8b43ba4c895e/lpm_emea_3574661761916_90318600_conditioner_soft_shine_200ml_000_0-fr-fr?fm=jpg&w=1200", "dx61916-dau-xa-hanh-nhan-hat-lanh.jpg"],
  ["https://images.ctfassets.net/jncafthqaw2i/5Irtn6PExfR8lriwQ4ci4P/c830ae0aff52a5b45b01fd961ca12f1e/LPM_EMEA_3574661818054_90571100_BODYCARE_LAIT_NUTRITION_KARITE_ARGAN_250ML_000_1.jpg?fm=jpg&w=1200", "dt83916-bo-hat-mo-hanh-nhan-argan.jpg"],
  ["https://images.ctfassets.net/jncafthqaw2i/KWt3e2mJO0wNGfpNGKnnc/4c32fa9ae33e9dbfdecb755b2180fe1e/LPM_EMEA_3251241018485_90456501_CREME_MAINS_NUTRITION_75ML_000.jpg?fm=jpg&w=1200", "kt18485-kem-tay-bo-hat-mo-hanh-nhan-argan.jpg"],
  ["https://images.ctfassets.net/jncafthqaw2i/YXoHF01AuRqNCsM3ybCSy/cd74ae405f77ed293b8ab81622fd8378/lpm_3574661680996_emea_bar_soap_sweet_almond_oil_2x100g_000_1_0-fr-fr?fm=jpg&w=1200", "xp80996-xa-phong-hanh-nhan.jpg"],
  ["https://images.ctfassets.net/jncafthqaw2i/17crqMEuddpDgMkaCtTMQj/9b3c749dafa22148afd047d4ffe2bd7d/LPM_EMEA_FR_3574661672373_8548104_LE_PETIT_MARSEILLAIS_Lip_care_3_in_1_4P9G_000_TIF.jpg?fm=jpg&w=1200", "sd72373-son-duong-3in1.jpg"],
  ["https://images.ctfassets.net/jncafthqaw2i/4Gtj3KAPSIuMxGpymCIWJD/946ac34e694228ce924fd6bf27685553/lpm_3574661750699_pm_liquid_soap_pure_500ml_994597640_000_1-fr-fr?fm=jpg&w=1200", "nr50699-gel-rua-tay-pure-soap.jpg"],
  ["https://images.ctfassets.net/jncafthqaw2i/41BjzMe7pDPIN0evI7MS2w/252cd9d79465b7258968f60bc9e69169/lpm_3574661750729_liquid_soap_exdoux_peach_nectarine_500ml_994597640_000-fr-fr?fm=jpg&w=1200", "nr50729-gel-rua-tay-dao-xuan-dao.jpg"],
];

async function downloadOne([url, filename]) {
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAILED (${res.status}): ${filename} <- ${url}`);
    return;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(path.join(OUT_DIR, filename), buf);
  console.log(`OK: ${filename} (${buf.length} bytes, ${res.headers.get("content-type")})`);
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const BATCH = 4;
  for (let i = 0; i < ASSETS.length; i += BATCH) {
    await Promise.all(ASSETS.slice(i, i + BATCH).map(downloadOne));
  }
}

run();
