# HH × LPM — Product Image Download & Mapping Report

**Ngày:** 2026-08-27. Branch: `hh-lpm-caudalie-ui-parity`.
**Nguồn xác minh bắt buộc:** `docs/production/HH_LPM_PRODUCT_IMAGE_VERIFICATION_REPORT.md` (28 SKU verify, cập nhật cùng ngày sau đợt tái xác minh 9 SKU manual-review).

Không tự tìm candidate mới ngoài report verification. Không sửa catalog text/volume/EAN. Không commit, không push.

---

## Phase 1 — Frozen queue (18 SKU APPROVED_STRONG)

Trích chính xác từ verification report, không tự thêm/bớt:

`ST68816, ST39109, ST00755, ST01318, ST01356, DT04660, DT55885, DT77412, DG74554, DX74752, MN75209, DG37467, ST00823, DX61909, NR73618, NR50620, XP80651, NR50491`

Bảng đầy đủ (SKU/EAN/tên/nguồn/bằng chứng) nằm trong Phase 1 của `HH_LPM_PRODUCT_IMAGE_ASSET_MANIFEST.md`.

**Tuyệt đối không đụng đến:**
- 7 SKU `REJECTED_WRONG_VARIANT`: `ST55017, ST01902, ST01172, DG37429, DG74035, DG37450, DG74608`
- 3 SKU `REJECTED_WRONG_SIZE`: `ST54494, ST06999, DG31372`
- 15 SKU confirmed-no-image (không audit lại): `ST01496, ST01601, ST68867, ST55031, ST55055, ST53379, ST53386, ST00526, ST00557, ST00991, ST01295, DG90435, DG90442, NR50675, NR73601`

Đã xác nhận bằng script (Phase 9 bên dưới): cả 25 SKU này vẫn giữ `image: null` sau khi mapping.

## Phase 2 — Download nguồn gốc

18 agent độc lập (mỗi agent 1 SKU) tải ảnh vào staging `public/images/products/_incoming/`, theo đúng thứ tự ưu tiên nguồn (official LPM CDN `images.ctfassets.net/jncafthqaw2i` → distributor → retailer đã verify → phụ). Kết quả nguồn thực tế dùng:

- **13/18** lấy được từ **official LPM brand CDN** (cùng CDN với 40 ảnh production hiện có): ST00755, ST01318, ST01356, DT55885, DT77412, DG74554, DX74752, MN75209, DX61909, NR73618, NR50620, XP80651, NR50491
- **5/18** fallback xuống retailer đã verify (vì official CDN không có asset đúng size/EAN cho SKU đó, đã kiểm tra kỹ trước khi fallback): ST68816 (Carrefour — official CDN có ảnh nhưng EAN filename sai, agent tự phát hiện và loại bỏ), ST39109 (megastorexpress — official CDN chỉ có bản 300ml), DT04660 (Carrefour — sản phẩm đã delist khỏi site chính hãng), DG37467 (Redcare — không tìm được asset chính hãng), ST00823 (Houra.fr — official CDN chỉ có bản 300ml, SKU này cần 250ml)

**18/18 download thành công**, 0 thất bại. Không dùng screenshot trang web, không base64, không upscale.

## Phase 3 — File Identity QA (độc lập, không chỉ tin agent)

Sau khi 18 agent báo cáo xong, tôi tự chạy lại kiểm tra trên toàn bộ file trong `_incoming/`:
- `file` command trên cả 18 file → tất cả đều là dữ liệu ảnh thật (JPEG/WebP/PNG hợp lệ), không có file HTML/lỗi giả dạng ảnh.
- `sips -g pixelWidth -g pixelHeight` xác nhận kích thước khớp với self-report của từng agent.
- `shasum -a 256` trên cả 18 file → 18 hash khác nhau hoàn toàn (không trùng).

Không SKU nào rơi vào `ASSET_REVIEW_FAILED` ở bước này.

## Phase 4 — Visual QA (tôi tự mở toàn bộ 18 ảnh, không delegate)

Tôi dùng công cụ đọc ảnh để xem trực tiếp cả 18 file (không chỉ tin visual-check self-report của sub-agent). Kết quả:

| SKU | Packshot đúng SP? | Variant đúng? | Label chính đúng? | Watermark? | Crop issue? | Decision |
|---|---|---|---|---|---|---|
| ST68816 | ✅ Fleur de Tiaré 650ml | ✅ | ✅ | Không | Không | ASSET_APPROVED |
| ST39109 | ✅ Fleur d'Oranger 650ml | ✅ | ✅ (có blur nhẹ do nguồn fallback) | Không | Không | ASSET_APPROVED (marginal — xem ghi chú) |
| ST00755 | ✅ Fleur de Cerisier BIO 650ml | ✅ | ✅ | Không | Không | ASSET_APPROVED |
| ST01318 | ✅ Cèdre (không phải Cade) | ✅ | ✅ | Không | Không | ASSET_APPROVED |
| ST01356 | ✅ Pin Maritime & Eucalyptus | ✅ | ✅ | Không | Không | ASSET_APPROVED |
| DT04660 | ✅ Beurre de Cacao & Karité | ✅ | ✅ (vết mờ nhỏ góc dưới trái) | Không | Không | ASSET_APPROVED (ghi chú nhỏ) |
| DT55885 | ✅ Jojoba BIO | ✅ | ✅ | Không | Không | ASSET_APPROVED |
| DT77412 | ✅ Fleur d'Amandier BIO | ✅ | ✅ | Không | Không | ASSET_APPROVED |
| DG74554 | ✅ Miel & Karité Bio | ✅ | ✅ | Không | Không | ASSET_APPROVED |
| DX74752 | ✅ Eau de Coco (không Calendula) | ✅ | ✅ | Không | Không | ASSET_APPROVED |
| MN75209 | ✅ Masque Eau de Coco Bio | ✅ | ✅ | Không | Không | ASSET_APPROVED |
| DG37467 | ✅ Infusion Thé Vert Bio | ✅ | ✅ | Không | Không | ASSET_APPROVED |
| ST00823 | ✅ Crème 250ml (khác ST39109) | ✅ | ✅ | Không | Không | ASSET_APPROVED |
| DX61909 | ✅ Miel & Karité | ✅ | ✅ | Không | Không | ASSET_APPROVED |
| NR73618 | ✅ Feuille d'Olivier | ✅ | ✅ | Không | Không | ASSET_APPROVED |
| NR50620 | ✅ Le Cuisinier (pump, không refill) | ✅ | ✅ | Không | Không | ASSET_APPROVED |
| XP80651 | ✅ Savon Brut (bar soap, không chai) | ✅ | ✅ | Không | Không | ASSET_APPROVED |
| NR50491 | ✅ Pur Savon & Huile d'Olive | ✅ | ✅ | Không | Không | ASSET_APPROVED |

**18/18 ASSET_APPROVED** — không có `ASSET_REVIEW_FAILED` hay `ASSET_TOO_LOW_RESOLUTION` (không ép pass, nhưng cả 18 đều đạt tiêu chuẩn thực sự; 2 ghi chú nhỏ ở ST39109/DT04660 không đủ nghiêm trọng để reject).

## Phase 5–6 — Chuẩn hoá tên file & định dạng

Dùng **convention hiện hữu của repo** (`public/images/hh/products/<slug>/main.jpg`), không tạo convention mới, theo đúng chỉ đạo. 4 file webp/png được convert sang jpg chất lượng 95 (không upscale, không sharpen) để khớp định dạng 40 ảnh production hiện có. File gốc giữ nguyên tại `public/images/products/_incoming/` làm bản lưu vết.

## Phase 7 — Asset Manifest

Xem đầy đủ tại `docs/production/HH_LPM_PRODUCT_IMAGE_ASSET_MANIFEST.md` — bảng SKU/EAN/Product/Source URL/Original File/Production File/WxH/Bytes/Hash/Asset QA/Mapping cho cả 18 SKU.

## Phase 8 — Product Data Mapping

Map bằng script Node đọc `hh-products-derived.json`, khớp **chính xác theo SKU** (không theo index mảng, không theo slug gần giống, không theo thứ tự file). Script abort toàn bộ nếu bất kỳ SKU nào không tìm thấy hoặc đã có `image` sẵn (an toàn khỏi ghi đè nhầm).

Xác minh sau mapping bằng `git diff`:
```
36 insertions(+), 36 deletions(-)  =  18 SKU × 2 field (image + imageSourceUrl)
```
Grep xác nhận **không có dòng thay đổi nào ngoài `"image"` và `"imageSourceUrl"`** — không đụng SKU, EAN, tên, mô tả, dung tích, thành phần của bất kỳ sản phẩm nào (kể cả 18 SKU được map).

**18/18 MAPPED thành công**, 0 FAILED.

## Phase 9 — Placeholder Safety

Script xác minh độc lập:
- 18 SKU mapped → tất cả có `image` khác null. ✅ 0 failure.
- 10 SKU rejected (7 wrong-variant + 3 wrong-size) → tất cả vẫn `image: null`. ✅ 0 failure.
- 15 SKU confirmed-no-image → tất cả vẫn `image: null`. ✅ 0 failure.

Không có thumbnail cũ bị dùng nhầm — script mapping abort nếu SKU đã có `image` sẵn, không ghi đè.

## Phase 10 — Catalog Data Issue (MN75209)

Đã tạo `docs/production/HH_LPM_CATALOG_DATA_ISSUES.md`: `MN75209` mang `volume: "370ml"` (placeholder tham khảo chưa xác minh) trong khi verification xác nhận **300ml** mới đúng cho EAN của sản phẩm này; giá trị 370ml có vẻ mượn từ EAN của 1 sản phẩm khác. Status: `NEEDS_CATALOG_REVIEW`. **Không sửa** size/EAN/title/description/ingredient trong phase này — đúng chỉ đạo.

## Phase 11 — Browser QA

`npm run check` (lint + typecheck + build): **PASS**, 0 lỗi. Build tạo tĩnh thành công 362 route, bao gồm toàn bộ 83 PDP sản phẩm (`/san-pham/[slug]`).

Chạy dev server + Playwright, chụp và kiểm tra 16 lượt tải trang (`/san-pham` tại 1440px/500px, 5 PDP approved tại 1440px/500px, 5 PDP placeholder tại 1440px):

| Kiểm tra | Kết quả |
|---|---|
| HTTP status | 16/16 = 200 |
| Console errors | 0/16 |
| Failed/404 requests (ảnh) | 0/16 |
| Hydration error | 0 |

Xem trực tiếp screenshot (không chỉ tin log tự động) cho: `/san-pham` (grid, cả 2 viewport — placeholder card và card có ảnh thật cùng hiển thị đúng), `ST68816`, `DT55885`, `DX74752` (mobile), `MN75209`, `XP80651` (mobile) — ảnh hiển thị đúng object-fit, không stretch, không crop bất thường. Placeholder PDP (`ST01496`, `ST55017`) hiển thị đúng component placeholder (bottle silhouette), không phải broken-image icon.

## Phase 12 — Duplicate Safety

18/18 SHA256 hash trên **production files** khác nhau hoàn toàn — 0 exact-hash duplicate. Không có công cụ perceptual-hash trong môi trường; thay vào đó đã xem trực tiếp cả 18 ảnh ở Phase 4 và xác nhận mỗi ảnh là bao bì/sản phẩm khác biệt rõ ràng về màu/nhãn/hình dạng — rủi ro trùng lặp thị giác không đáng kể.

## Phase 13 — Final Counts

| Chỉ số | Số lượng |
|---|---|
| Download attempted | 18 |
| Download succeeded | 18 |
| Asset approved | 18 |
| Asset rejected after download | 0 |
| Successfully mapped | 18 |
| Placeholder retained | 25 (10 rejected + 15 confirmed-no-image) |

**Phương trình kiểm tra: Mapped + Placeholder = 18 + 25 = 43 ✅** (khớp đúng universe gốc 43 SKU thiếu ảnh, xác minh bằng script Phase 9).

## Rejected assets

Không có asset nào bị reject sau download — cả 18 candidate đã qua vòng verification nghiêm ngặt trước đó nên không phát sinh mismatch mới khi tải ảnh thật.

## Placeholder list (25 SKU giữ nguyên)

**10 rejected:** `ST55017, ST01902, ST01172, DG37429, DG74035, DG37450, DG74608` (wrong-variant) + `ST54494, ST06999, DG31372` (wrong-size)
**15 confirmed-no-image:** `ST01496, ST01601, ST68867, ST55031, ST55055, ST53379, ST53386, ST00526, ST00557, ST00991, ST01295, DG90435, DG90442, NR50675, NR73601`

## Files changed

- **Modified:** `src/data/catalog/hh-products-derived.json` (chỉ 18 SKU × 2 field `image`/`imageSourceUrl`)
- **New (docs):** `docs/production/HH_LPM_PRODUCT_IMAGE_ASSET_MANIFEST.md`, `docs/production/HH_LPM_CATALOG_DATA_ISSUES.md`, `docs/production/HH_LPM_PRODUCT_IMAGE_DOWNLOAD_MAPPING_REPORT.md` (file này), `docs/production/HH_LPM_PRODUCT_IMAGE_VERIFICATION_REPORT.md` (untracked từ phase trước, chưa từng commit)
- **New (production images):** 18 thư mục mới dưới `public/images/hh/products/<slug>/main.jpg`
- **New (staging, chưa track):** `public/images/products/_incoming/` — 18 file gốc + 4 file `_converted/` (18 gốc + 4 converted = 22 file). **Cần quyết định trước khi commit:** giữ lại làm bằng chứng nguồn, hay xoá/gitignore — không tự ý xoá vì chưa được yêu cầu.

## npm run check result

**PASS** — lint 0 lỗi, typecheck 0 lỗi, build thành công (362 route tĩnh).

---

## Kết luận

**SAFE_TO_COMMIT = YES**

Lý do: 18/18 asset đúng nguồn verify, đúng identity (xác nhận độc lập bằng file-QA + visual-QA của tôi, không chỉ tin sub-agent), mapping chỉ đụng đúng field cần thiết (xác minh bằng diff), 25 SKU placeholder được bảo toàn (xác minh bằng script), build+lint+typecheck sạch, browser QA không lỗi/404/hydration-error, không trùng lặp hash.

## Cập nhật 2026-08-27 — Quyết định của người duyệt

1. **`_incoming/`** — staging-only, đã thêm `public/images/products/_incoming/` vào `.gitignore`; xác nhận (grep toàn bộ `src/`, `app/`, và mọi `.ts/.tsx/.json/.mjs/.js`) không có production component/data nào tham chiếu path này. Sẽ không commit; có thể xoá local sau khi final assets đã verify xong.
2. **`ST39109`** — giữ asset hiện tại, không block commit. Đã gắn `ASSET_QUALITY_FOLLOWUP` trong manifest: cần thay bằng packshot 650ml độ phân giải cao chính hãng nếu/khi có, không tìm lại trong task này.
3. **`MN75209`** — không sửa catalog trong lần commit ảnh này; giữ nguyên `NEEDS_CATALOG_REVIEW` trong `HH_LPM_CATALOG_DATA_ISSUES.md`. Task sửa catalog (370ml → 300ml) phải làm ngay sau image commit và trước khi staging deploy chính thức.

Kết quả pre-check/commit/push cuối cùng nằm trong lịch sử commit của branch `hh-lpm-caudalie-ui-parity` (không tạo thêm báo cáo riêng cho bước này).
