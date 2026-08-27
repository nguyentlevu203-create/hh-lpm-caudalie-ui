# Cart Persistence Fix — Report

**Ngày:** 2026-07-23 · Branch `hh-lpm-caudalie-ui-parity` · Theo sau phát hiện ở `HH_LPM_FINAL_RELEASE_CANDIDATE_REPORT.md` §4.

## Bug

Giỏ hàng (`cartLines` trong `SiteUIContext`) không tồn tại qua điều hướng trang — reset về `CART_SEED_ITEM` cứng mỗi khi chuyển route, kể cả `next/link` bình thường, kể cả nút "Đến trang thanh toán". Tái hiện 100% qua nhiều lần thử độc lập.

## Nguyên nhân gốc

`src/components/hh/SiteUIContext.tsx` dùng `useState` thuần cho `cartLines`, không có bước rehydrate từ `localStorage`. `SiteUIProvider` được mount trong `HHShell`, và `HHShell` được gọi riêng lẻ ở 22 file `page.tsx` (không có ở `app/layout.tsx` gốc) — mỗi lần chuyển route, React remount toàn bộ provider, tạo lại state từ đầu.

`AccountContext` (đăng nhập, điểm thưởng, lịch sử đơn hàng, wishlist) đã làm đúng pattern persist từ trước — đọc/ghi `localStorage` sau mount — nên không bị ảnh hưởng. Cart là mảnh state duy nhất còn thiếu pattern này.

## Fix

Áp dụng đúng pattern đã có sẵn ở `AccountContext` vào `cartLines`:

- Thêm `CART_STORAGE_KEY = "hh-demo-cart-v1"` và hàm `loadCartLines()` (SSR-safe, try/catch, fallback về `[CART_SEED_ITEM]` khi chưa có dữ liệu hoặc dữ liệu hỏng).
- Thêm state `cartHydrated` + 2 `useEffect`:
  - Effect 1 (chạy 1 lần khi mount): đọc `localStorage` bằng `loadCartLines()`, set `cartHydrated = true`. Chạy sau mount (không phải lazy `useState` initializer) để tránh hydration mismatch SSR/client — giống hệt lý do `AccountContext` đã làm.
  - Effect 2: ghi `cartLines` vào `localStorage` mỗi khi thay đổi, chỉ sau khi đã hydrate xong.

**Không đổi:** kiến trúc `HHShell`/`SiteUIProvider` per-page, hành vi `active` overlay (mở/đóng overlay vẫn reset khi đổi trang — đúng ý, không phải dữ liệu cần giữ), `CART_SEED_ITEM` vẫn là trải nghiệm demo mặc định cho khách lần đầu (khi chưa có `localStorage` entry nào).

**File thay đổi:** `src/components/hh/SiteUIContext.tsx` (1 file, ~30 dòng thêm mới, không xoá logic cũ nào ngoài comment lỗi thời).

## Verify

- `npm run lint` / `npm run typecheck` / `npm run check`: 0 lỗi.
- Build lại standalone thật (`npm run build && npm run prepare:standalone && HOSTNAME=127.0.0.1 PORT=4173 npm run start`).
- Tái hiện đúng kịch bản lỗi cũ trên browser thật:
  1. Thêm sản phẩm A (seed) + sản phẩm B (thêm mới) → badge = 2.
  2. Bấm "Đến trang thanh toán" → **cả 2 sản phẩm hiện đúng** trong "Đơn hàng của bạn" (trước đây chỉ còn 1).
  3. **Reload toàn trang** (`navigate` lại đúng URL `/thanh-toan`, không phải client-nav) → vẫn giữ đúng cả 2 sản phẩm — xác nhận dữ liệu thật sự nằm trong `localStorage`, không phải trùng hợp từ React state chưa unmount.
  4. Đặt hàng thành công (`Đặt hàng` → "Đặt hàng thành công! Mã đơn hàng #HH...") → `clearCart()` chạy → badge giỏ hàng về icon rỗng.
  5. Reload trang chủ sau khi đặt hàng → giỏ hàng **vẫn rỗng**, không tự động seed lại — xác nhận `clearCart()` cũng persist đúng.
- 0 console error trong toàn bộ phiên verify.

## Kết luận

Bug đã được xử lý, verify bằng browser thật với đúng kịch bản tái hiện gốc + 2 kịch bản bổ sung (full reload, đặt hàng xong). Đã cập nhật `HH_LPM_FINAL_RELEASE_CANDIDATE_REPORT.md` và `HH_LPM_CAUDALIE_PARITY_FINAL_SCORECARD.md` để phản ánh trạng thái mới.

Không commit, không push — file thay đổi (`SiteUIContext.tsx`) vẫn nằm trong nhóm E (P1.1 search/focus closure) của Git Scope Audit đã phân loại trước đó, chờ quyết định commit từ người dùng.
