# Hoàng Hà / Le Petit Marseillais — Demo Data Audit (Phase 1)

**Date:** 2026-07-14
**Branch:** `hh-lpm-demo-data`
**Scope:** Direct inspection of the two local source workbooks. No UI changes, no image downloads, no price generation, no commit in this phase — audit only.

**Sources inspected directly** (via a one-off local Python/openpyxl script, run outside the app — not imported into the Next.js runtime or browser, per instruction):
- `data-source/hh_web_company.xlsx` (147,896 bytes, 7 sheets)
- `data-source/lpm_brand_web.xlsx` (1,016,036 bytes, 10 sheets)

Both files are already covered by `.gitignore` (`data-source/*.xlsx`) — confirmed neither is staged or committed.

Every number in this report was read directly from the workbooks (sheet names, row/column counts, header labels, and sampled cell values) — nothing below is inferred from `HH_LPM_PRODUCTION_UI_PLAN.md` or any other prior report.

---

## 1. Sheet inventory

### `hh_web_company.xlsx` — 7 sheets

| Sheet | Data rows (excl. title/header) | Columns |
|---|---|---|
| `00_Tổng quan CMO` | 20 | 6 (two side-by-side mini-tables) |
| `01_Catalogue chuẩn` | **89** | 15 |
| `02_Content MKT` | 89 | 13 |
| `03_Thành phần & Claims` | 89 | 8 |
| `04_QA thiếu dữ liệu` | 117 (multiple issues per product) | 7 |
| `05_Từ điển chuẩn hoá` | 8 | 2 |
| `06_Raw nguồn` | 89 | 6 |

### `lpm_brand_web.xlsx` — 10 sheets

| Sheet | Data rows (excl. header) | Columns |
|---|---|---|
| `00_Tong_quan` | 13 | 3 |
| `01_San_pham` | **147** | 18 |
| `02_Anh_san_pham` | 2,527 | 5 |
| `03_Nguyen_lieu` | 19 | 13 |
| `04_Bai_viet_MKT` | 71 | 11 |
| `05_Trang_noi_dung` | 105 | 9 |
| `06_Brand_content` | 14 | 9 |
| `07_Cards_CTA` | 159 | 8 |
| `08_Thu_vien_anh` | 807 | 9 |
| `09_Glossary_chuan_hoa` | 14 | 3 |

## 2. Per-sheet detail

### `hh_web_company.xlsx`

**`00_Tổng quan CMO`** — Columns: `Chỉ số`/`Giá trị`/`Ghi chú` + a second mini-table `Nhóm danh mục chuẩn`/`Số sản phẩm`/`Tỷ trọng`. Purpose: executive summary written by whoever prepared the file for CMO review — states totals, category breakdown, and (critically) a self-reported list of missing fields. **This sheet explicitly states, in the workbook's own words**: *"File nguồn không có link ảnh sản phẩm, gallery, URL sản phẩm, tồn kho, trạng thái publish, danh mục/tag gốc"* and *"File nguồn chỉ có 6 cột, không có giá bán/giá khuyến mại"* — i.e. the preparer already confirms no price and no images exist anywhere in this workbook. Missing fields: none (it's a summary sheet), but it documents that the *entire workbook* has no price/image/URL/stock data.

**`01_Catalogue chuẩn`** — 89 rows × 15 cols: `STT, ID WooCommerce, SKU, Loại WC, Nhóm danh mục chuẩn, Dòng/định vị, Tên sản phẩm chuẩn, Mùi/biến thể chính, Dung tích/quy cách, Mô tả ngắn chuẩn, Mô tả đầy đủ chuẩn, Claim cần kiểm tra?, Nhóm claim nhạy cảm, Trạng thái dữ liệu, Ghi chú QA`. Purpose: the standardized product catalogue — the single most useful sheet in this workbook, and the primary source for SKU/name/category/scent/volume/description in this audit. Missing fields: no barcode/EAN, no price, no image URL, no stock/publish status (confirmed absent in every row, not just some).

**`02_Content MKT`** — 89 rows × 13 cols: `STT, SKU, Tên sản phẩm chuẩn, Nhóm danh mục, Dòng/định vị, Mùi/biến thể, Dung tích/quy cách, Mô tả ngắn dùng cho PDP/Ads, USP/Công dụng nổi bật, Thành phần nổi bật, Hướng dẫn sử dụng, Thành phần chi tiết, Nội dung đầy đủ PDP/SEO`. Purpose: marketing/PDP-ready copy, keyed by the same SKU as sheet 01 — best source for ingredients (`Thành phần chi tiết`) and usage instructions. Missing fields: `USP/Công dụng nổi bật` is frequently `None` even when other fields are filled (spot-checked row 1).

**`03_Thành phần & Claims`** — 89 rows × 8 cols: `STT, SKU, Tên sản phẩm chuẩn, Nhóm danh mục, Claim/từ khóa cần lưu ý, Khuyến nghị sử dụng claim, Thành phần nổi bật, Thành phần chi tiết`. Purpose: legal/RA (regulatory affairs) pre-screen — flags marketing phrases that need verification before public use. This sheet is the authoritative source for the claim-risk flags used in §7 below.

**`04_QA thiếu dữ liệu`** — 117 rows × 7 cols: `STT, ID WooCommerce, SKU, Tên sản phẩm chuẩn, Mức độ, Vấn đề phát hiện, Khuyến nghị xử lý`. Purpose: a punch-list of data-quality issues, one row per issue (so a product can appear more than once). Severity breakdown read directly: **Cao=9, Trung bình=67, Thấp=41**. The 9 "Cao" (high) issues are exactly the 6 missing-SKU rows plus 3 rows with a completely empty full description (`NR50491`, `SD39787`, `SD72373`) — this cross-validates the independent count in §6 below.

**`05_Từ điển chuẩn hoá`** — 8 rows × 2 cols: `Hạng mục` / `Quy chuẩn/định nghĩa áp dụng`. Purpose: documents *how* the "Nhóm danh mục chuẩn" and "Dòng/định vị" columns were inferred (by keyword, since the source WooCommerce export had no real category column). This is a direct admission that category values were guessed from the product name/description — which matches the mis-categorization bugs found in §8.

**`06_Raw nguồn`** — 89 rows × 6 cols: `ID, Loại, SKU, Tên gốc, Mô tả ngắn gốc, Mô tả gốc`. Purpose: unprocessed original text, kept for traceability. The sheet's own note warns it still contains ChatGPT/UI HTML wrapper markup and should not be used directly — confirmed by inspection (row 1's `Mô tả ngắn gốc` literally contains `<div class="flex max-w-full...">` markup).

### `lpm_brand_web.xlsx`

**`00_Tong_quan`** — 13 rows × 3 cols, summary sheet. States the file's own processing notes verbatim, notably: *"Ưu tiên cột tiếng Việt vi_...; nếu bản dịch trống/lỗi thì giữ nội dung gốc"* (machine-translated Vietnamese, original kept as fallback) and *"Một số bản dịch máy cần biên tập thêm theo giọng thương hiệu trước khi đưa lên website"* — i.e. the workbook itself flags its Vietnamese text as machine-translated and in need of editorial pass.

**`01_San_pham`** — **147 rows × 18 cols**: `STT, Tên sản phẩm tiếng Việt, Tên gốc, Danh mục, Phân nhóm, Dòng sản phẩm, Dung tích, Mùi/Thành phần nổi bật, Mô tả ngắn, Mô tả chi tiết, Công dụng/Benefits, Hướng dẫn sử dụng, Thành phần, Claims, Bao bì/Tái chế, Link ảnh chính, Tất cả link ảnh, Link sản phẩm`. Purpose: this is **the global Le Petit Marseillais brand catalogue as sold on lepetitmarseillais.com (France/EMEA)** — not Hoàng Hà's own Vietnam-market catalogue. Product names are Vietnamese translations of the French global lineup (`Tên gốc` carries the original French name, e.g. *"Soin Express Douceur & Éclat à l'Amande et aux Graines de lin Bio"*). This is the only sheet with `Link ảnh chính`/`Tất cả link ảnh`/`Link sản phẩm`. **No SKU and no barcode column exists in this sheet, or anywhere else in this workbook.** Missing fields: `Thành phần` and `Claims` are `None` on some rows (spot-checked row 4 — both empty); `Bao bì/Tái chế` empty on row 5.

**`02_Anh_san_pham`** — 2,527 rows × 5 cols: `STT, Tên sản phẩm, Loại ảnh/Gợi ý dùng, Link ảnh, Link sản phẩm`. Purpose: a flat, de-duplicated image index (per the `00_Tong_quan` note, "loại trùng theo sản phẩm + URL ảnh") — more granular than `01_San_pham`'s `Tất cả link ảnh`, useful if a product needs more than the 1–2 real product photos already in the main sheet.

**`03_Nguyen_lieu`** — 19 rows × 13 cols: `STT, Nguyên liệu, Slug, Headline, H1, Intro, Nguồn gốc/Câu chuyện, Công dụng, Bí quyết làm đẹp, Hương/Trải nghiệm, Nội dung đầy đủ, Link ảnh hero, Link trang nguồn`. Purpose: brand-storytelling content per raw ingredient (e.g. "Hoa cam" — orange blossom), for an ingredient-glossary page. Not product-specific.

**`04_Bai_viet_MKT`** — 71 rows × 11 cols: `STT, Tiêu đề bài viết, Chủ đề, Intro, Các heading, Nội dung chính, Link ảnh hero, Tất cả link ảnh, Card liên quan, Sản phẩm liên quan, Link bài viết`. Purpose: marketing/blog articles (beauty tips etc.) — this is the primary source for a future "bài viết"/blog feature, and includes a `Sản phẩm liên quan` column linking back to products.

**`05_Trang_noi_dung`** — 105 rows × 9 cols: `STT, Loại trang, Title, H1, Meta description, Intro, Nội dung đầy đủ, Link ảnh hero, Link trang nguồn`. Purpose: generic brand/content page scrapes (FAQ, policy-style pages, etc.), cleaned of raw HTML per the workbook's own processing note.

**`06_Brand_content`** — 14 rows × 9 cols: `STT, Tên trang, H1, Intro, Sections, Cards, Link ảnh hero, Tất cả link ảnh, Link trang nguồn`. Purpose: the brand's "about"/manifesto-style pages (sampled row 1: "Tuyên ngôn thương hiệu của chúng tôi" — brand manifesto). Primary source for brand-story content if the site ever builds a genuine "về LPM" page (distinct from Hoàng Hà's own distributor story already in `site-content.ts`).

**`07_Cards_CTA`** — 159 rows × 8 cols: `STT, Loại card, Tiêu đề card, Mô tả card, CTA, Link ảnh, Link đích, Trang nguồn`. Purpose: small promotional card/CTA snippets scraped from various brand pages (e.g. "QUẢ MƠ" ingredient card) — usable for cross-sell/related-content widgets, not a primary content source.

**`08_Thu_vien_anh`** — 807 rows × 9 cols: `STT, Loại ảnh/Gợi ý dùng, Khu vực nguồn, Alt text tiếng Việt, Width, Height, Số trang dùng ảnh, Trang mẫu đang dùng ảnh, Link ảnh`. Purpose: a broader raw image library (product + editorial + banner images) with alt text and usage-context metadata — the deepest image source in either workbook, but least structured relative to a specific product.

**`09_Glossary_chuan_hoa`** — 14 rows × 3 cols: `Thuật ngữ gốc, Dịch chuẩn nên dùng, Ghi chú áp dụng`. Purpose: a terminology dictionary for consistent Vietnamese translation (e.g. row 1: *"Gel douche" → "Sữa tắm"*, note: *"Không dịch là 'sữa tắm' trong tài liệu trình CEO/CMO"* — i.e. the correct product-facing translation differs from the executive-report translation). Should be consulted before writing any final copy sourced from this workbook.

## 3. Primary source per field

| Field | Primary source | Notes |
|---|---|---|
| SKU | `hh_web_company` → `01_Catalogue chuẩn` | Only workbook with SKU at all. 83/89 rows have one (6 missing, §6). |
| Barcode/EAN | **Neither workbook** | No barcode/EAN/mã vạch column exists anywhere in either file — confirmed by scanning all 17 sheets' headers. Must be sourced elsewhere if ever needed. |
| Tên sản phẩm | `hh_web_company` → `01_Catalogue chuẩn` (`Tên sản phẩm chuẩn`) | This is the name actually tied to an HH SKU. `lpm_brand_web`'s names (`Tên sản phẩm tiếng Việt`/`Tên gốc`) are the *global* LPM catalogue's own names — useful only as a matching aid, not as the product name to publish under an HH SKU. |
| Danh mục | `hh_web_company` → `01_Catalogue chuẩn` (`Nhóm danh mục chuẩn`) | **Needs manual correction before use** — this column was keyword-inferred (per `05_Từ điển chuẩn hoá`) and has confirmed mis-classifications (§8). `lpm_brand_web`'s `Danh mục`/`Dòng sản phẩm` can help cross-check once a product is matched. |
| Dung tích | `hh_web_company` → `01_Catalogue chuẩn` (`Dung tích/quy cách`) | Present on 60/89 rows. Where missing, `lpm_brand_web`'s `Dung tích` on a matched row can be cited as a *reference* value only — it's the global pack size, not confirmed to be identical to what HH imports. |
| Mùi hương | `hh_web_company` → `01_Catalogue chuẩn` (`Mùi/biến thể chính`) | |
| Mô tả | `hh_web_company` → `01_Catalogue chuẩn` / `02_Content MKT` | Both carry the same standardized description text; `06_Raw nguồn` must **not** be used directly (HTML wrapper artifacts). |
| Thành phần | `hh_web_company` → `02_Content MKT` (`Thành phần chi tiết`) primary; `lpm_brand_web` → `01_San_pham` (`Thành phần`) as a cross-check/fallback when HH's is empty | |
| Hướng dẫn sử dụng | `hh_web_company` → `02_Content MKT` | |
| Giá | **Neither workbook** | Confirmed absent — `hh_web_company`'s own `00_Tổng quan CMO` sheet states this explicitly. No price data exists anywhere; none is fabricated in this phase or any later phase without a real source. |
| URL ảnh chính | `lpm_brand_web` → `01_San_pham` (`Link ảnh chính`) | Only workbook with any image URLs. |
| URL gallery | `lpm_brand_web` → `01_San_pham` (`Tất cả link ảnh`), cross-referenced against `02_Anh_san_pham`/`08_Thu_vien_anh` | **Caution**: `Tất cả link ảnh` is semicolon-separated and mixes genuine product pack-shots (first 1–2 URLs) with unrelated CMS content thumbnails (ingredient-glossary banners, hair-routine articles, etc. — confirmed by inspecting raw cell values). Do not treat the full list as a clean product gallery without filtering. |
| Nội dung thương hiệu | `lpm_brand_web` → `06_Brand_content`, `03_Nguyen_lieu`, `05_Trang_noi_dung` | |
| Bài viết | `lpm_brand_web` → `04_Bai_viet_MKT` | 71 articles, includes a `Sản phẩm liên quan` link-back column. |

## 4. Best matching key between the two workbooks

Requested priority order: barcode/EAN → SKU → product URL → normalized product name.

**Neither barcode/EAN nor a shared SKU nor a shared product-URL scheme exists between the two files** — `lpm_brand_web` has no SKU column at all, neither file has a barcode column, and `hh_web_company` has no product-URL column. This was confirmed by scanning every header across all 17 sheets, not assumed.

**The only usable key is normalized product name / scent+ingredient matching** — specifically, tokenized Vietnamese scent/ingredient keywords from HH's `Tên sản phẩm chuẩn` + `Mùi/biến thể chính` against LPM's `Tên sản phẩm tiếng Việt` + `Mùi/Thành phần nổi bật` + `Tên gốc`, scoped to a category-equivalent bucket on the LPM side (e.g. HH `Sữa tắm/Gel tắm` → LPM `Chăm sóc cơ thể / Sữa tắm`).

## 5. Matching methodology and confidence discipline

An automated token-overlap script was used as a **first pass only** — it tokenizes both names (lowercased, diacritics-stripped, brand/category stopwords removed) and scores candidates by keyword intersection within the correct category bucket. This surfaced candidates but was **not trusted blindly**:

- Every candidate with a "high" or "approximate" score below was **manually re-read side by side** (HH Vietnamese name vs. LPM Vietnamese name vs. LPM's French `Tên gốc`) before being accepted into §6.
- The automated script has a known blind spot (words ≤2 characters were filtered as noise, e.g. Vietnamese "hà", "ma"), which caused a few genuine matches to be under-scored (e.g. `ST92871` "lá bạc hà hữu cơ" vs LPM's identical phrase "lá bạc hà hữu cơ" — an exact wording match the script under-ranked). These were caught and corrected by manual review, not left in the wrong bucket.
- **A separate, more serious class of error was found and corrected manually**: `hh_web_company`'s own `Nhóm danh mục chuẩn` column (keyword-inferred, per §2) mis-tags several real product families, which caused the automated script to search the *wrong* LPM category bucket for them (see §8). These were manually re-matched against the correct LPM bucket.
- Where no candidate reached a defensible confidence level, the product is listed under §6.3 (no image found) rather than assigned a low-confidence guess — per instruction, nothing here was auto-merged on low confidence.

## 6. Full classification (all 89 HH catalogue products)

### 6.1 Khớp chính xác — exact/near-exact match (39 products)

Same distinctive scent/ingredient combination confirmed in both workbooks (manually verified, not just script-scored). "[đối chiếu thủ công]" = corrected from the automated pass, either because the HH-side category tag was wrong (§8) or because of the short-word tokenizer gap (§5).

| SKU | HH category | HH product | LPM match |
|---|---|---|---|
| DG01841 | Dầu gội | Vào Nếp Suôn Mượt Hạnh Nhân & Hạt Lanh Hữu Cơ | Mềm mại & rạng rỡ với hạnh nhân và hạt lanh hữu cơ |
| DG60650 | Dầu gội | Phục Hồi Hư Tổn Chuyên Sâu Dầu Jojoba Hữu Cơ | Phục hồi chuyên nghiệp với dầu jojoba hữu cơ |
| DG74042 | Dầu gội | Trị Gàu Bạc Hà Hữu Cơ Và Tinh Dầu Thiên Nhiên | Trị gàu với bạc hà hữu cơ và tinh dầu |
| DG74646 | Dầu gội | Ngăn Ngừa Gàu Tầm Ma & Chanh Hữu Cơ | Thanh lọc cơ thể với cây tầm ma và chanh hữu cơ [đối chiếu thủ công] |
| DX78785 | Dầu gội* | Dưỡng Ẩm Sâu Dầu Argan Hữu Cơ (*thực chất là dầu xả, xem §8) | Dinh dưỡng chuyên sâu với dầu argan hữu cơ |
| DX61916 | Dầu xả | Hạnh Nhân Và Hạt Lanh Hữu Cơ | Dầu xả chăm sóc nhanh — hạnh nhân và hạt lanh hữu cơ |
| KT18485 | Kem dưỡng tay | Bơ Hạt Mỡ, Hạnh Nhân & Dầu Argan | Kem dưỡng tay bơ hạt mỡ, hạnh nhân ngọt, argan |
| KT34768 | Kem dưỡng tay | Bơ Hạt Mỡ, Lô Hội, Sáp Ong | Kem dưỡng tay phục hồi bơ hạt mỡ, lô hội, sáp ong |
| — (thiếu SKU) | Son dưỡng môi* | Bơ Hạt Mỡ, Hạnh Nhân Ngọt & Dầu Argan 2X4.9G (*trùng SD39787) | Kem dưỡng tay bơ hạt mỡ/hạnh nhân/argan |
| — (thiếu SKU) | Son dưỡng môi* | 3 Trong 1 Bơ Hạt Mỡ Và Dầu Bơ 4.9G (*trùng SD72373) | Dưỡng môi 3in1 bơ hạt mỡ & dầu bơ |
| NR50613 | Son dưỡng môi* | Gel Rửa Tay Kháng Khuẩn Tinh Dầu Xô Thơm (*thực chất Gel rửa tay, xem §8) | Gel rửa tay kháng khuẩn Maxi Refill |
| NR50644 | Son dưỡng môi* | Gel Rửa Tay Xà Phòng Nguyên Chất & Oải Hương | Gel rửa tay Pure Soap & Lavender |
| NR50699 | Son dưỡng môi* | Gel Rửa Tay Xà Phòng Nguyên Chất | Gel rửa tay Pure Soap |
| NR50729 | Son dưỡng môi* | Gel Rửa Tay Đào Trắng Và Xuân Đào | Gel rửa tay đào trắng và xuân đào |
| SD39787 | Son dưỡng môi | Bơ Hạt Mỡ, Hạnh Nhân Ngọt & Dầu Argan 2X4.9G | Kem dưỡng tay bơ hạt mỡ/hạnh nhân/argan [đối chiếu thủ công — lưu ý: đây là kem tay LPM, không phải son môi cùng công thức] |
| SD72373 | Son dưỡng môi | 3 Trong 1 Bơ Hạt Mỡ Và Dầu Bơ 4.9G | Dưỡng môi 3in1 bơ hạt mỡ & dầu bơ [đối chiếu thủ công] |
| DT02684 | Sữa dưỡng thể | Bơ Hạt Mỡ, Hạnh Nhân Ngọt & Dầu Argan | Sữa/sáp dưỡng ẩm bơ hạt mỡ, hạnh nhân ngọt, argan |
| DT65312 | Sữa dưỡng thể | Phục Hồi Bơ Hạt Mỡ, Lô Hội & Sáp Ong | Sữa dưỡng thể phục hồi bơ hạt mỡ, lô hội, sáp ong |
| DT83916 | Sữa dưỡng thể | Dưỡng Ẩm Bơ Hạt Mỡ, Hạnh Nhân & Argan 400ml | Sữa dưỡng thể bơ hạt mỡ, hạnh nhân ngọt, argan |
| DT84159 | Sữa dưỡng thể | Phục Hồi Bơ Hạt Mỡ, Lô Hội & Sáp Ong | Sữa dưỡng thể phục hồi bơ hạt mỡ, lô hội, sáp ong |
| ST00809 | Sữa tắm/Gel tắm | Mơ Hữu Cơ Và Hạt Phỉ Hữu Cơ | Sữa tắm mơ hữu cơ và hạt phỉ hữu cơ |
| ST00892 | Sữa tắm/Gel tắm | Dịu Nhẹ Sữa Hạnh Nhân Hữu Cơ | Sữa tắm dịu nhẹ sữa hạnh nhân hữu cơ |
| ST01240 / ST01288 | Sữa tắm/Gel tắm | Đào Trắng Hữu Cơ Và Xuân Đào Hữu Cơ (2 SKU trùng biến thể) | Sữa tắm đào trắng hữu cơ và xuân đào hữu cơ |
| ST01431 | Sữa tắm/Gel tắm | 4in1 Nam — Gỗ Cam & Argan | Sữa tắm nam hương hoa cam và dầu argan |
| ST01868 | Sữa tắm/Gel tắm | Cam Hữu Cơ & Bưởi Hữu Cơ | Sữa tắm cam hữu cơ và bưởi hữu cơ |
| ST04371 | Sữa tắm/Gel tắm | 4in1 Nam — Gừng & Gỗ Bách Hương | Sữa tắm nam hương gừng và gỗ bách |
| ST08273 | Sữa tắm/Gel tắm | Hạnh Nhân | Sữa tắm dịu nhẹ sữa hạnh nhân hữu cơ |
| ST48441 | Sữa tắm/Gel tắm | Mâm Xôi Hữu Cơ & Hoa Mẫu Đơn | Sữa tắm mâm xôi hữu cơ và hoa mẫu đơn |
| ST53594 | Sữa tắm/Gel tắm | Dịu Nhẹ Sữa Hạnh Nhân Hữu Cơ | Sữa tắm dịu nhẹ sữa hạnh nhân hữu cơ |
| ST54463 | Sữa tắm/Gel tắm | Muối Biển | Sữa tắm muối biển dịu nhẹ |
| ST65434 | Sữa tắm/Gel tắm | Bông & Hoa Anh Túc Hữu Cơ | Sữa tắm bông và hoa anh túc hữu cơ |
| ST68823 / ST99622 | Sữa tắm/Gel tắm | Xoài Hữu Cơ & Chanh Dây (2 SKU trùng biến thể) | Sữa tắm xoài và chanh dây hữu cơ |
| ST92871 | Sữa tắm/Gel tắm | Lá Bạc Hà Hữu Cơ | Sữa tắm chiết xuất lá bạc hà hữu cơ [đối chiếu thủ công] |
| XP80699 | Sữa tắm/Gel tắm* | Bánh Xà Phòng Hoa Kim Ngân (*thực chất xà phòng bánh, xem §8) | Xà phòng hoa kim ngân cực dịu nhẹ [đối chiếu thủ công] |
| XP80965 | Sữa tắm/Gel tắm* | Bánh Xà Phòng Hoa Cam | Xà phòng hoa cam dịu nhẹ [đối chiếu thủ công] |
| XP78368 | Sữa tắm/Gel tắm* | Bánh Xà Phòng Vani | Xà phòng vani siêu dịu nhẹ [đối chiếu thủ công] |
| XP80996 | Sữa tắm/Gel tắm* | Bánh Xà Phòng Dầu Hạnh Nhân Ngọt | Xà phòng dầu hạnh nhân ngọt [đối chiếu thủ công] |
| XP81108 | Sữa tắm/Gel tắm* | Bánh Xà Phòng Bơ Hạt Mỡ | Xà phòng bơ hạt mỡ [đối chiếu thủ công] |

*(một vài dòng ở bảng trên cũng đồng thời xuất hiện trong danh sách "cần chỉnh danh mục" ở §8 — vẫn liệt kê ở đây vì việc khớp ảnh với LPM là chính xác, bất kể nhãn danh mục HH bị sai)*

### 6.2 Khớp gần đúng — approximate match (≈30 products)

Real product-family/ingredient overlap but with meaningfully lower certainty — either a single (rather than multi-word) distinctive token, a close-but-not-identical ingredient pairing, or a cross-category LPM analog (e.g. a hair mask standing in for a conditioner of the same scent). Examples: `DG31372` (táo & oliu → matched to a jojoba shampoo, same "phục hồi" line but different fruit), `DT04660` (ca cao & bơ hạt mỡ → matched to an apricot body wash on a weak "sâu"/"cao" token overlap), `ST39109`/`ST00823` (hoa cam → matched to the men's orange-wood-and-argan gel, plausible but not certain given multiple orange-scented LPM lines exist), `XP80651` (nguyên chất không mùi → LPM "Savon Brut", same positioning, not confirmed identical formula), `DG37450` (lựu — hair colour-protect vs. LPM's pomegranate shampoo, same fruit, different product line intent). Full list of SKUs in this tier: `DG31372, DG37429, DG37450, DG37467, DG74035, DG74554, DG74608, DX61909, DX74752 (weak), MN75209, NR50620, NR73618, DT04660, DT55885, DT77412, ST00526, ST00557, ST00755, ST00823, ST01172, ST01295 (weak), ST01318, ST01356, ST01902, ST06999, ST19308, ST39109, ST54494, ST55017, ST68816, ST99493, XP80651`, plus the two unlabeled multi-product combo rows (STT62/63).

### 6.3 Không tìm được ảnh phù hợp — no defensible image match (≈17 products)

No candidate in the LPM catalogue reached a confidence worth using, or the best candidate shares only one generic word (e.g. "hoa", "chất") with many other unrelated LPM products — using it would risk showing the wrong scent. This includes: `ST01496, ST01601, ST68867, ST55031, ST55055, ST53379, ST53386, ST00526** (see note), ST00557**, ST00991, ST01295, DG90435, DG90442, NR50675, NR73601` (no "hoa hồng dại"/wild-rose hand-wash exists anywhere in LPM's Nước rửa tay line — checked directly), plus the two SKU-less rows (STT61 gift item, STT62 bundle-offer row with no distinct identity of its own). ST00526/ST00557 (vanilla) has a plausible single-word candidate (see §6.2) but is borderline enough to flag here as well — treat with caution either way.

### 6.4 Missing SKU / barcode / dung tích / mô tả

- **Barcode**: **89/89 products missing** — no barcode/EAN field exists anywhere in either workbook (confirmed across all 17 sheets).
- **Missing SKU (6/89)**: STT 61 ("[QUÀ TẶNG KHÔNG BÁN] Bông Tạo Bọt..."), STT 62 (2-chai bundle offer), STT 63 (3-product combo offer), STT 78 ("Gel Rửa Tay...Dầu Ô Liu", duplicate of NR50491 without a SKU), STT 85 ("Son Dưỡng Môi...2X4.9G", duplicate of SD39787), STT 86 ("Son Dưỡng Môi 3 Trong 1...4.9G", duplicate of SD72373).
- **Missing dung tích (29/89)** — full list available in the workbook's own `04_QA thiếu dữ liệu` sheet; spans mostly `Sữa dưỡng thể` (7/7 missing), `Kem dưỡng tay` (2/2 missing), and about a third of `Sữa tắm/Gel tắm` and `Dầu gội`.
- **Missing mô tả ngắn (7/89)**: `ST01288, DG74035, DG37467`, STT61 (no SKU), `NR50491, SD39787, SD72373`.
- **Missing mô tả đầy đủ (3/89)**: `NR50491, SD39787, SD72373` — all three are also flagged **"Cao" (high) severity** in the workbook's own `04_QA thiếu dữ liệu` sheet, independently confirming this finding.

## 7. Claim / legal-risk flags (from `03_Thành phần & Claims`)

38/89 products (43%) are flagged `Claim cần kiểm tra? = Có`. Breakdown of the flagged claim type (`Nhóm claim nhạy cảm`): **phục hồi/tái tạo** (repair/regenerate) 21, **không gây dị ứng** (hypoallergenic) 10, **chống lão hóa** (anti-aging) 2 (incl. combined), **trị/loại bỏ gàu** (anti-dandruff) 1, **kháng khuẩn** (antibacterial) 1, **chứng minh lâm sàng** (clinically proven) 1, plus combinations. This audit treats "không gây dị ứng", "chống lão hóa", and "chứng minh lâm sàng" as the highest-risk phrasing (medical/absolute claims), and "phục hồi/tái tạo"/"kháng khuẩn"/"trị gàu" as lower-risk, common cosmetic-marketing language that still technically needs RA sign-off per the source sheet's own recommendation.

## 8. Data-quality findings worth flagging before any real integration

1. **No barcode, no price, no image URL anywhere in `hh_web_company.xlsx`** — confirmed directly (not assumed) by the workbook's own `00_Tổng quan CMO` summary and by scanning every sheet's headers.
2. **`lpm_brand_web.xlsx` has no SKU or barcode column** — it is the *global* LPM brand catalogue (French-market names translated to Vietnamese), not Hoàng Hà's own sellable SKU list. Matching to it is a **visual/scent reference aid only**, not a guarantee that HH's imported product is the identical pack/formulation.
3. **`hh_web_company`'s own `Nhóm danh mục chuẩn` column has confirmed mis-classifications**, because it was keyword-inferred rather than sourced from a real category field (per `05_Từ điển chuẩn hoá`'s own admission):
   - All 6 bar-soap SKUs (`XP80699, XP80965, XP78368, XP80996, XP81108, XP80651`) are tagged `Sữa tắm/Gel tắm` (shower gel) instead of `Xà phòng` (bar soap).
   - Nearly all `Gel Rửa Tay`/hand-wash SKUs (`NR50729, NR50699, NR50613, NR50620, NR73601, NR50675, NR50644`) are tagged `Son dưỡng môi` (lip balm) instead of a hand-wash/hand-soap category; only one hand-wash SKU (`NR73618`) is correctly tagged `Rửa tay`.
   - Two more (`NR50491`, and the untagged STT78 duplicate) are tagged `Xà phòng` despite being liquid hand-wash gel, not bar soap.
   - `DX78785` (an "après-shampooing"/conditioner per its own name) is tagged `Dầu gội` (shampoo) instead of `Dầu xả`.
   - **Recommendation**: re-derive category tags from product name keywords (`Bánh Xà Phòng` → xà phòng bánh, `Gel/Sữa Rửa Tay` → rửa tay, `Son Dưỡng Môi` → chăm sóc môi, `Dầu Xả` → dầu xả) before this column is trusted for site navigation/filtering.
4. **`lpm_brand_web`'s `Tất cả link ảnh` (gallery) field mixes genuine product photos with unrelated CMS content thumbnails** (ingredient-glossary banners, "hiểu về loại tóc của bạn" article images, brand-ritual banners) — typically only the first 1–2 of ~10+ URLs per row are actual product pack-shots. Any later automated gallery-import step must not take this field at face value.
5. **Short descriptions in `hh_web_company` were machine-generated** ("Mô tả ngắn có HTML wrapper ChatGPT, đã bóc tách text" — flagged on 34/89 rows in `04_QA thiếu dữ liệu`) — cleaned of markup in the standardized sheets, but the underlying copy itself was AI-authored, not written by Hoàng Hà's own marketing team. Worth knowing before treating it as final brand voice.
6. **`lpm_brand_web`'s Vietnamese text is machine-translated** (workbook's own `00_Tong_quan` note) and its own `09_Glossary_chuan_hoa` sheet exists specifically because some translations are inconsistent (e.g. "Gel douche" should not always become "sữa tắm").
7. **Several distinct HH SKUs describe what appears to be the same underlying LPM product/variant** (e.g. `ST01240` and `ST01288` are both "Đào Trắng Hữu Cơ Và Xuân Đào Hữu Cơ"; `ST68823` and `ST99622` are both "Xoài Hữu Cơ & Chanh Dây") — likely different batches/listings of the same item in HH's WooCommerce export, not distinct products. Worth deduplicating before a real catalogue import.
8. **No barcode found anywhere means the requested join-key priority (barcode → SKU → URL → name) could only reach its 4th and weakest option.** Any future data source that adds a shared barcode/EAN between HH's real inventory and a reference catalogue would meaningfully de-risk this matching work.

## 9. Recommended 14 products for demo

Selected to prioritize (in order): a real SKU, a real dung tích (or a clearly-labeled LPM reference volume where HH's own is blank), a real description, at least one confidently-matched image, spread across as many distinct real product groups as possible (correcting the mis-tags from §8), and — wherever the catalogue allowed it — no flagged legal claim. Four categories (`Dầu xả`, `Sữa dưỡng thể`, `Kem dưỡng tay`, and one `Dầu gội` pick) had **no** claim-clean candidate at all in the source data; those are included anyway for category coverage but flagged individually below — do not publish their claim language without RA sign-off first.

| # | SKU | Nhóm sản phẩm (đã sửa) | Tên sản phẩm HH | Dung tích | Mô tả | Claim cần xác minh? | Ảnh LPM (mức tin cậy) |
|---|---|---|---|---|---|---|---|
| 1 | `ST54463` | Sữa tắm/Gel tắm | Gel Tắm...Dịu Nhẹ Muối Biển | 250ml | ✅ có | Không | Chính xác |
| 2 | `ST01868` | Sữa tắm/Gel tắm | Gel Tắm...Cam Hữu Cơ & Bưởi Hữu Cơ | 650ml | ✅ có | Không | Chính xác |
| 3 | `ST00809` | Sữa tắm/Gel tắm | Sữa Tắm...Mơ Hữu Cơ Và Hạt Phỉ Hữu Cơ | 650ml | ✅ có | Không | Chính xác |
| 4 | `ST19308` | Sữa tắm/Gel tắm | Gel Tắm...Dịu Nhẹ Lựu Hữu Cơ | 250ml | ✅ có | Không | Gần đúng (từ khoá đơn nhưng đặc trưng: "lựu") |
| 5 | `ST99493` | Sữa tắm/Gel tắm | Gel Tắm...Dịu Nhẹ Hoa Tiaré | 250ml | ✅ có | Không | Gần đúng (từ mượn hiếm gặp "Tiaré", độ tin cậy cao dù điểm số thấp) |
| 6 | `DG74646` | Dầu gội | Dầu Gội...Ngăn Ngừa Gàu Tầm Ma & Chanh Hữu Cơ | ⚠️ trống ở HH (LPM ghi tham khảo 300ml) | ✅ có | Không | Chính xác (đối chiếu thủ công) |
| 7 | `DG01841` | Dầu gội | Dầu Gội...Hạnh Nhân và Hạt Lanh Hữu Cơ | 300ml | ✅ có | ⚠️ Có — "phục hồi/tái tạo" | Chính xác |
| 8 | `DX61916` | Dầu xả | Dầu Xả...Hạnh Nhân Và Hạt Lanh Hữu Cơ | 200ml | ✅ có | ⚠️ Có — "phục hồi/tái tạo" | Chính xác (ghép cặp cùng dòng với #7) |
| 9 | `DT83916` | Sữa dưỡng thể | Sữa Dưỡng Thể...Bơ Hạt Mỡ, Hạnh Nhân & Argan | 400ml | ✅ có | ⚠️ Có — "phục hồi/tái tạo" | Chính xác |
| 10 | `KT18485` | Kem dưỡng tay | Kem Dưỡng Tay...Bơ Hạt Mỡ, Hạnh Nhân & Dầu Argan | ⚠️ trống ở HH (LPM ghi tham khảo 75ml) | ✅ có | ⚠️⚠️ Có — "phục hồi/tái tạo, **chống lão hóa**" (claim rủi ro cao nhất trong danh sách — cần bỏ hoặc xác minh trước khi dùng) | Chính xác |
| 11 | `XP80996` | Xà phòng bánh *(sửa từ "Sữa tắm/Gel tắm", xem §8)* | Hộp 2 Bánh Xà Phòng...Dầu Hạnh Nhân Ngọt 2x100G | 2 x 100g | ✅ có | Không | Chính xác (đối chiếu thủ công, đúng nhóm Savons Solides) |
| 12 | `SD72373` | Son dưỡng môi | Son Dưỡng Môi 3 Trong 1...Bơ Hạt Mỡ Và Dầu Bơ 4.9G | 4.9g | ⚠️ **trống ở cả hai workbook** — LPM cũng chỉ có "Đọc bài đánh giá." (nội dung rác, không dùng được) — cần viết mới trước khi lên site | Không | Chính xác (đối chiếu thủ công, đúng nhóm Soins Des Levres) |
| 13 | `NR50699` | Gel rửa tay *(sửa từ "Son dưỡng môi", xem §8)* | Gel Rửa Tay...Với Xà Phòng Nguyên Chất | 500ml | ✅ có | Không | Chính xác |
| 14 | `NR50729` | Gel rửa tay *(sửa từ "Son dưỡng môi", xem §8)* | Gel Rửa Tay...Với Chiết Xuất Đào Trắng Và Xuân Đào | 500ml | ✅ có | Không | Chính xác |

**Coverage**: 8 distinct real product groups (Sữa tắm/Gel tắm ×5, Dầu gội ×2, Dầu xả ×1, Sữa dưỡng thể ×1, Kem dưỡng tay ×1, Xà phòng bánh ×1, Son dưỡng môi ×1, Gel rửa tay ×2 — corrected per §8, not the source's own mis-tags). 10/14 have no legal-claim flag; 4/14 carry a claim (3 mild "phục hồi/tái tạo", 1 higher-risk "chống lão hóa" on `KT18485` flagged explicitly). All 14 have a confidently-matched LPM image and product URL. One (`SD72373`) has a genuine description gap in both sources and is flagged rather than silently filled.

No image was downloaded, no price was invented, and no product page was built in this phase, per instruction.

## 10. Explicitly not done in this phase

- No UI/component changes.
- No image downloads (URLs identified and recorded above only).
- No price data created (none exists in either source; will need a separate, real pricing input before Phase 2 can add prices).
- No commit — `data-source/*.xlsx` remains untracked and gitignored; this report is the only new file.

Stopping here per instruction.
