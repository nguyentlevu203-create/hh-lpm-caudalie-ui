import { Truck, RotateCcw, ShieldCheck, Lock } from "lucide-react";

/** Reference's TrustBadges reuses two Caudalie brand-value photos
 * ("98% natural-origin", "100% ocean plastic") — those claims and images
 * are Caudalie-specific and may not be reused here (hard constraint, and no
 * real HH trust-badge photography exists yet). Ported as an icon+label row
 * instead of image badges, carrying genuine HH-relevant claims already
 * established elsewhere in the site (free shipping threshold, French import
 * sourcing) rather than a redesign. */
const BADGES = [
  { icon: Truck, label: "Giao hàng toàn quốc", detail: "2-5 ngày làm việc" },
  { icon: RotateCcw, label: "Đổi trả trong 7 ngày", detail: "Sản phẩm còn nguyên tem" },
  { icon: ShieldCheck, label: "Hàng chính hãng", detail: "Nhập khẩu trực tiếp từ Pháp" },
  { icon: Lock, label: "Thanh toán an toàn", detail: "Bảo mật thông tin khách hàng" },
];

export function TrustBadges() {
  return (
    <div className="mt-10 grid grid-cols-2 gap-6 border-t border-hh-border pt-10 sm:grid-cols-4">
      {BADGES.map((badge) => (
        <div key={badge.label} className="flex flex-col items-center gap-2 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-hh-primary-soft">
            <badge.icon className="size-6 text-hh-primary" strokeWidth={1.5} />
          </span>
          <p className="text-sm font-medium text-hh-ink">{badge.label}</p>
          <p className="text-xs text-hh-muted-foreground">{badge.detail}</p>
        </div>
      ))}
    </div>
  );
}
