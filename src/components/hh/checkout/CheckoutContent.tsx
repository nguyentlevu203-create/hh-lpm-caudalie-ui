"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { PromoBar } from "@/components/hh/layout/PromoBar";
import { Header } from "@/components/hh/layout/Header";
import { Footer } from "@/components/hh/layout/Footer";
import { ProductBreadcrumb } from "@/components/hh/product/ProductBreadcrumb";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { useAccount, type DemoOrder } from "@/components/hh/AccountContext";
import { getProductBySlug, getEffectivePrice, INQUIRY_PRICE_LABEL, PRICE_DISCLAIMER } from "@/data/products";
import { cn } from "@/lib/utils";

function formatVnd(value: number) {
  return value.toLocaleString("vi-VN") + "₫";
}

/** Demo checkout — collects name/phone/address/note, a COD-or-bank-transfer
 * choice (both simulated, no real payment gateway), then calls
 * AccountContext.placeOrder to persist a DemoOrder to localStorage and
 * clears the cart. Inquiry-priced items stay in the order with price=null;
 * the order total only ever sums real (demo) prices, never a fabricated
 * number for an inquiry item. */
export function CheckoutContent() {
  const { cartLines, clearCart } = useSiteUI();
  const { placeOrder } = useAccount();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank_transfer">("cod");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<DemoOrder | null>(null);

  const items = cartLines.flatMap((line) => {
    const product = getProductBySlug(line.slug);
    return product ? [{ product, quantity: line.quantity }] : [];
  });
  const subtotal = items.reduce((sum, item) => {
    const price = getEffectivePrice(item.product);
    return price !== null ? sum + price * item.quantity : sum;
  }, 0);
  const hasInquiryItems = items.some((item) => getEffectivePrice(item.product) === null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = "Vui lòng nhập họ tên";
    if (!phone.trim()) nextErrors.phone = "Vui lòng nhập số điện thoại";
    else if (!/^[0-9+\s-]{8,15}$/.test(phone.trim())) nextErrors.phone = "Số điện thoại không hợp lệ";
    if (!address.trim()) nextErrors.address = "Vui lòng nhập địa chỉ nhận hàng";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const order = placeOrder({
      customerName: name.trim(),
      customerPhone: phone.trim(),
      customerAddress: address.trim(),
      note: note.trim(),
      paymentMethod,
      items: items.map((item) => ({
        slug: item.product.slug,
        name: item.product.name,
        quantity: item.quantity,
        price: getEffectivePrice(item.product),
      })),
      subtotal,
      hasInquiryItems,
    });
    clearCart();
    setConfirmedOrder(order);
  }

  if (confirmedOrder) {
    return (
      <>
        <PromoBar />
        <Header />
        <main className="mx-auto w-full max-w-[600px] flex-1 px-4 py-16 text-center md:px-8">
          <p className="text-2xl font-semibold text-hh-ink">Đặt hàng thành công!</p>
          <p className="mt-3 text-base text-hh-muted-foreground">
            Mã đơn hàng <span className="font-medium text-hh-ink">#{confirmedOrder.id}</span>. Nhân viên Hoàng Hà sẽ
            liên hệ với bạn qua số {confirmedOrder.customerPhone} để xác nhận
            {confirmedOrder.hasInquiryItems ? " đơn hàng và báo giá các sản phẩm cần liên hệ" : " đơn hàng"}.
          </p>
          <p className="mt-4 text-lg font-semibold text-hh-ink">Tạm tính: {formatVnd(confirmedOrder.subtotal)}</p>
          <p className="mt-1 text-xs text-hh-muted-foreground">{PRICE_DISCLAIMER}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/tai-khoan" className="rounded-md border-2 border-hh-primary px-6 py-3 text-sm font-medium text-hh-primary">
              Xem lịch sử đơn hàng
            </Link>
            <Link href="/san-pham" className="rounded-md bg-hh-primary px-6 py-3 text-sm font-semibold text-white">
              Tiếp tục mua sắm
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <PromoBar />
      <Header />
      <main className="mx-auto w-full max-w-[1000px] flex-1 px-4 py-6 md:px-8">
        <ProductBreadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Thanh toán" }]} />
        <h1 className="mt-6 hh-heading-page text-hh-ink">Thanh toán</h1>

        {items.length === 0 ? (
          <div className="mt-8 text-center">
            <p className="text-base text-hh-muted-foreground">Giỏ hàng của bạn đang trống.</p>
            <Link href="/san-pham" className="mt-4 inline-block rounded-md bg-hh-primary px-6 py-3 text-sm font-semibold text-white">
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h2 className="text-lg font-medium text-hh-ink">Thông tin nhận hàng</h2>
              <div>
                <label className="text-sm text-hh-ink">Họ và tên</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={cn(
                    "mt-1 w-full border-b bg-transparent py-2 text-sm text-hh-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary",
                    errors.name ? "border-red-500" : "border-hh-border"
                  )}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label className="text-sm text-hh-ink">Số điện thoại</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={cn(
                    "mt-1 w-full border-b bg-transparent py-2 text-sm text-hh-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary",
                    errors.phone ? "border-red-500" : "border-hh-border"
                  )}
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
              </div>
              <div>
                <label className="text-sm text-hh-ink">Địa chỉ nhận hàng</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={cn(
                    "mt-1 w-full border-b bg-transparent py-2 text-sm text-hh-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary",
                    errors.address ? "border-red-500" : "border-hh-border"
                  )}
                />
                {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
              </div>
              <div>
                <label className="text-sm text-hh-ink">Ghi chú (tuỳ chọn)</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-md border border-hh-border bg-transparent p-2 text-sm text-hh-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary"
                />
              </div>

              <div className="mt-2">
                <p className="text-sm font-medium text-hh-ink">Phương thức thanh toán</p>
                <div className="mt-2 flex flex-col gap-2">
                  <label className="flex items-center gap-2 rounded-md border border-hh-border px-3 py-2 text-sm text-hh-ink">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    Thanh toán khi nhận hàng (COD)
                  </label>
                  <label className="flex items-center gap-2 rounded-md border border-hh-border px-3 py-2 text-sm text-hh-ink">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "bank_transfer"}
                      onChange={() => setPaymentMethod("bank_transfer")}
                    />
                    Chuyển khoản ngân hàng (demo — thông tin tài khoản sẽ được gửi sau khi đặt hàng)
                  </label>
                </div>
              </div>

              <button type="submit" className="mt-4 h-12 w-full rounded-md bg-hh-primary text-sm font-semibold text-white">
                Đặt hàng
              </button>
              <p className="text-center text-xs text-hh-muted-foreground">
                Đây là đơn hàng demo nội bộ — không phát sinh giao dịch hay giao hàng thật.
              </p>
            </form>

            <div>
              <h2 className="text-lg font-medium text-hh-ink">Đơn hàng của bạn</h2>
              <div className="mt-4 divide-y divide-hh-border rounded-md border border-hh-border bg-hh-surface">
                {items.map(({ product, quantity }) => {
                  const price = getEffectivePrice(product);
                  return (
                    <div key={product.slug} className="flex items-center justify-between gap-3 px-4 py-3">
                      <div>
                        <p className="text-sm text-hh-ink">{product.name}</p>
                        <p className="text-xs text-hh-muted-foreground">
                          {product.volume} × {quantity}
                        </p>
                      </div>
                      <span className="text-sm text-hh-ink">
                        {price !== null ? formatVnd(price * quantity) : (
                          <span className="text-hh-primary">{INQUIRY_PRICE_LABEL}</span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-between text-lg font-semibold text-hh-ink">
                <span>Tạm tính</span>
                <span>{formatVnd(subtotal)}</span>
              </div>
              {hasInquiryItems && (
                <p className="mt-1 text-sm text-hh-primary">
                  Đơn hàng có sản phẩm chưa có giá — nhân viên Hoàng Hà sẽ liên hệ báo giá sau khi bạn đặt hàng.
                </p>
              )}
              <p className="mt-2 text-xs text-hh-muted-foreground">{PRICE_DISCLAIMER}</p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
