# HH × LPM — LAN Development Guide

Hướng dẫn ngắn cho 2 việc khác nhau: (1) mở **dev server** cho thiết bị khác trên cùng mạng LAN truy cập khi demo, và (2) chạy **production standalone preview** thật (không phải dev server) trên máy hiện tại hoặc qua LAN.

## 1. Development — dev server cho LAN

```bash
npm run dev:lan
```

Lệnh này chạy `next dev --hostname 0.0.0.0 --port 3000` — bind vào mọi network interface thay vì chỉ `localhost`, cổng cố định `3000`. `allowedDevOrigins` trong `next.config.ts` (mục 5 dưới đây) **chỉ ảnh hưởng lệnh này** — không ảnh hưởng `npm run build`/`npm run start`.

Chạy `npm run dev` (không có `:lan`) như bình thường nếu chỉ cần truy cập từ chính máy đang code — không cần bind `0.0.0.0`.

## 1b. Production-like standalone preview

Dev server (`next dev`) không phản ánh đúng hiệu năng/hành vi production — dùng lệnh dưới đây để chạy **đúng bundle production** (`output: "standalone"`) trên máy hiện tại trước khi tin tưởng một thay đổi là "sẵn sàng":

```bash
npm run build
HOSTNAME=127.0.0.1 PORT=4173 npm run start
```

- `npm run start` giờ chạy `node .next/standalone/server.js` (không còn `next start` — `next start` không tương thích với `output: "standalone"` và từng phát cảnh báo, xem `HH_LPM_PHASE_2_REPO_HYGIENE_REPORT.md` §Phase 2.1 mục 2).
- Trước khi server khởi động, hook `prestart` tự chạy `scripts/prepare-standalone.mjs` — copy `public/` và `.next/static/` vào `.next/standalone/` (2 thư mục này không tự có trong standalone build, thiếu chúng sẽ khiến ảnh/font/CSS/JS chunk 404 dù server chạy được).
- `PORT`/`HOSTNAME` đọc trực tiếp từ environment (server standalone của Next.js đọc `process.env.PORT`/`process.env.HOSTNAME`, mặc định `3000`/`0.0.0.0` nếu không set) — không hard-code trong script.
- Muốn cho thiết bị LAN truy cập preview production thật (không phải dev server): `HOSTNAME=0.0.0.0 PORT=4173 npm run start`, sau đó dùng IP LAN (mục 2) — ví dụ `http://<lan-ip>:4173`.

## 2. Lấy IP LAN hiện tại trên macOS

```bash
ipconfig getifaddr en0   # Wi-Fi (phổ biến nhất)
ipconfig getifaddr en1   # nếu máy có 2 interface (Ethernet/Wi-Fi phụ)
```

IP này **đổi mỗi khi chuyển mạng** (nhà/văn phòng/quán cà phê) hoặc khi router cấp lại DHCP lease — đây chính xác là lý do `next.config.ts` không còn hard-code IP nữa (xem `docs/production/HH_LPM_PHASE_2_REPO_HYGIENE_REPORT.md` §C). Lấy IP mới mỗi lần đổi mạng thay vì tin vào giá trị cũ trong ghi chú/lịch sử chat.

## 3. URL truy cập từ thiết bị cùng mạng

Sau khi chạy `npm run dev:lan`, terminal sẽ in ra dòng `Network: http://<ip>:3000` — dùng đúng URL đó trên điện thoại/tablet (phải cùng mạng Wi-Fi với máy tính).

Nếu Next.js chặn request với lỗi cross-origin (HMR/RSC bị từ chối), IP/hostname của thiết bị truy cập chưa nằm trong `allowedDevOrigins` — xem mục 5.

## 4. localStorage/cookie khác nhau theo origin

`localhost:3000` và `<lan-ip>:3000` là **hai origin khác nhau** theo chuẩn same-origin policy của trình duyệt — dữ liệu lưu ở một origin (giỏ hàng demo, phiên đăng nhập demo trong `localStorage`/cookie) **không tự động xuất hiện** ở origin kia. Nếu test trên điện thoại thấy giỏ hàng trống dù vừa thêm sản phẩm trên máy tính qua `localhost`, đây là hành vi đúng theo thiết kế trình duyệt, không phải lỗi ứng dụng — cần thao tác lại từ đầu trên chính thiết bị/origin đang test.

## 5. `LAN_DEV_HOST` / `LAN_DEV_IP`

`next.config.ts` đọc 2 biến môi trường này để mở rộng `allowedDevOrigins` (mặc định đã có sẵn `127.0.0.1` và hostname `.local` của máy hiện tại — `localhost` không cần liệt kê vì Next.js đã cho phép mặc định, xem code comment trong file). Nếu build chạy trên máy khác hoặc mạng khác cần thêm origin riêng:

1. Copy `.env.example` thành `.env.local` (đã có sẵn trong `.gitignore`, không commit).
2. Điền giá trị thật, ví dụ:
   ```
   LAN_DEV_HOST=ten-may-cua-ban.local
   LAN_DEV_IP=192.168.1.50
   ```
3. Restart `npm run dev:lan` để Next.js đọc lại `next.config.ts`.

## 6. Browser API cần HTTPS (secure context)

`next dev --hostname 0.0.0.0` vẫn phục vụ qua **HTTP thuần**, không phải HTTPS. Một số Web API chỉ hoạt động trong "secure context" (`https://` hoặc `localhost` — **không tính LAN IP qua HTTP**) và **sẽ không hoạt động** khi truy cập qua `http://<lan-ip>:3000` từ thiết bị khác:

- Microphone (`getUserMedia` — dùng bởi icon mic trong ô tìm kiếm)
- Camera
- Clipboard nâng cao (`navigator.clipboard.write` với nội dung ngoài text)
- Service Worker / Push API
- Geolocation (một số trình duyệt vẫn cho phép qua HTTP LAN, không đồng nhất — không tin cậy được)

Nếu cần test các API này thật trên thiết bị LAN, phải chạy dev server qua HTTPS cục bộ bằng công cụ như [mkcert](https://github.com/FiloSottile/mkcert) (tạo chứng chỉ tự ký, tin cậy trên máy dev) — **không thêm đường dẫn certificate cố định vào `package.json`/`next.config.ts`**, và **tuyệt đối không commit file certificate/private key vào git**. Chạy riêng qua một server proxy HTTPS cục bộ (ví dụ `local-ssl-proxy` hoặc cấu hình server tùy chỉnh) khi cần, ngoài phạm vi scripts chuẩn của repo.
