# HH × LPM — Catalog Data Issues Log

Tracks data-quality issues surfaced during image verification/download/mapping work that are **out of scope** for those phases (per instruction: no catalog text/volume/EAN edits during image work). Each entry needs a separate, dedicated data-correction pass with its own review.

---

## MN75209 — unverified `volume` placeholder

**Status:** `NEEDS_CATALOG_REVIEW`
**Found:** 2026-08-27, during product image verification/download phase (`docs/production/HH_LPM_PRODUCT_IMAGE_VERIFICATION_REPORT.md`, row #18 and re-verification note).

- Current HH record (`src/data/catalog/hh-products-derived.json`, SKU `MN75209`) carries `"volume": "370ml"`, `"volumeIsReference": true` — an unverified reference placeholder, not a confirmed HH value.
- Independent verification (3 sources: Carrefour — EAN embedded directly in the product URL and page text "le pot de 300mL"; miamland.com; Amazon.fr) confirms EAN `3574661575209` — the EAN tied to this exact product name and ingredient profile (calendula + coconut water 4-in-1 hair mask) — is **300ml**, not 370ml.
- The existing `370ml` value appears to trace to a **different EAN** (`3574661809922`, a separately-existing coconut hair mask without calendula in its name) surfaced by retailers Cocooncenter/Newpharma/Auchan — i.e. the placeholder was likely borrowed from a similarly-named but distinct LPM product/pack code, not from MN75209's own EAN.
- The product's own detailed ingredient text in HH's data already correctly lists calendula ("chiết xuất hoa cúc kim chẩn thảo (calendula officinalis flower extract)") — only the `volume` field is suspect, not the name/description/ingredients.

**Recommended fix (not applied here):** update `volume` to `"300ml"` and clear/reconsider `volumeIsReference` for SKU `MN75209` in a dedicated catalog data-correction pass, with its own review — not bundled into image mapping work.

**Not changed in this pass:** size, EAN, title, description, ingredients — per instruction, image-phase work only maps the `image`/`imageSourceUrl` fields.
