"use client";

import Image from "next/image";
import Link from "next/link";
import { PromoBar } from "@/components/hh/layout/PromoBar";
import { Header } from "@/components/hh/layout/Header";
import { Footer } from "@/components/hh/layout/Footer";
import { ProductBreadcrumb } from "@/components/hh/product/ProductBreadcrumb";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { useAccount } from "@/components/hh/AccountContext";
import { getProductBySlug } from "@/data/products";

function formatVnd(value: number) {
  return value.toLocaleString("vi-VN") + "₫";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("vi-VN", { dateStyle: "medium", timeStyle: "short" });
}

/** Demo membership dashboard: profile, points/tier, vouchers, order
 * history (from AccountContext, localStorage-backed), and wishlist
 * (re-hydrated against the live catalog so removed/renamed products don't
 * crash the page). Prompts sign-in via the shared AuthOverlay when no
 * session exists rather than duplicating the form. */
export function TaiKhoanContent() {
  const { openAuth } = useSiteUI();
  const { user, points, tier, vouchers, orders, wishlist, signOut } = useAccount();

  const wishlistProducts = wishlist.flatMap((slug) => {
    const product = getProductBySlug(slug);
    return product ? [product] : [];
  });

  return (
    <>
      <PromoBar />
      <Header />
      <main className="mx-auto w-full max-w-[900px] flex-1 px-4 py-6 md:px-8">
        <ProductBreadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Tài khoản" }]} />
        <h1 className="mt-6 hh-heading-page text-hh-ink">Tài khoản của tôi</h1>

        {!user ? (
          <div className="mt-8 rounded-md border border-hh-border p-8 text-center">
            <p className="text-base text-hh-muted-foreground">Đăng nhập để xem điểm thành viên, voucher, lịch sử đơn hàng và danh sách yêu thích.</p>
            <button
              type="button"
              onClick={openAuth}
              className="hh-cta-primary mt-4 px-6 py-3 text-sm"
            >
              Đăng nhập / Đăng ký
            </button>
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-10">
            <section className="flex items-center justify-between rounded-md bg-hh-muted p-5">
              <div>
                <p className="text-lg font-medium text-hh-ink">{user.name || user.email}</p>
                <p className="text-sm text-hh-muted-foreground">{user.email}</p>
                <p className="mt-2 inline-block rounded-full bg-hh-accent/20 px-3 py-1 text-sm text-hh-ink">
                  {tier} · {points} điểm
                </p>
              </div>
              <button type="button" onClick={signOut} className="text-sm text-hh-primary underline underline-offset-2">
                Đăng xuất
              </button>
            </section>

            <section>
              <h2 className="text-lg font-medium text-hh-ink">Voucher của tôi</h2>
              {vouchers.length === 0 ? (
                <p className="mt-2 text-sm text-hh-muted-foreground">Chưa có voucher nào.</p>
              ) : (
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {vouchers.map((v) => (
                    <div key={v.code} className="rounded-md border border-dashed border-hh-primary p-4">
                      <p className="text-sm font-semibold text-hh-primary">{v.code}</p>
                      <p className="mt-1 text-sm text-hh-ink">{v.label}</p>
                      <p className="mt-1 text-xs text-hh-muted-foreground">{v.detail}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-lg font-medium text-hh-ink">Lịch sử đơn hàng</h2>
              {orders.length === 0 ? (
                <p className="mt-2 text-sm text-hh-muted-foreground">Bạn chưa có đơn hàng nào.</p>
              ) : (
                <div className="mt-3 flex flex-col gap-3">
                  {orders.map((order) => (
                    <div key={order.id} className="rounded-md border border-hh-border p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-hh-ink">#{order.id}</p>
                        <p className="text-xs text-hh-muted-foreground">{formatDate(order.createdAt)}</p>
                      </div>
                      <p className="mt-1 text-sm text-hh-muted-foreground">
                        {order.items.length} sản phẩm · {order.paymentMethod === "cod" ? "COD" : "Chuyển khoản"}
                      </p>
                      <p className="mt-2 text-base font-medium text-hh-ink">
                        {formatVnd(order.subtotal)}
                        {order.hasInquiryItems && <span className="ml-2 text-sm font-normal text-hh-primary">+ sản phẩm cần liên hệ</span>}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-lg font-medium text-hh-ink">Sản phẩm yêu thích</h2>
              {wishlistProducts.length === 0 ? (
                <p className="mt-2 text-sm text-hh-muted-foreground">Chưa có sản phẩm yêu thích nào.</p>
              ) : (
                <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {wishlistProducts.map((product) => (
                    <Link key={product.id} href={`/san-pham/${product.slug}`} className="flex flex-col gap-2">
                      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-hh-cream">
                        {product.image ? (
                          <Image src={product.image} alt={product.name} fill sizes="150px" className="object-contain p-3" />
                        ) : (
                          <ProductPlaceholderArt colorFrom="#d9bd87" colorTo="#f5e7c9" className="h-full w-full" />
                        )}
                      </div>
                      <p className="line-clamp-2 text-sm text-hh-ink">{product.name}</p>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
