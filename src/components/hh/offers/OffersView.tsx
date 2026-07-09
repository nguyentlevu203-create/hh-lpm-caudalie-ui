"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { OFFERS } from "@/data/site-content";
import { cn } from "@/lib/utils";

function OfferCard({ offer }: { offer: (typeof OFFERS)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-hh-muted p-6">
      <p className="text-lg font-semibold text-hh-ink">{offer.heading}</p>
      <p className="mt-2 text-sm text-hh-muted-foreground">{offer.body}</p>
      {"code" in offer && offer.code && (
        <p className="mt-3 inline-block rounded bg-white px-3 py-1 text-sm font-medium text-hh-primary">
          Mã: {offer.code}
        </p>
      )}
      <div className="mt-4">
        <Link
          href="/san-pham"
          className="inline-flex h-10 items-center justify-center rounded-md bg-hh-primary px-5 text-sm font-medium text-white"
        >
          {offer.cta}
        </Link>
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-4 flex w-full items-center justify-between border-t border-hh-border pt-3 text-sm text-hh-ink"
      >
        Điều kiện áp dụng
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <p className="mt-2 text-xs text-hh-muted-foreground">
          Áp dụng theo chương trình hiện hành của Hoàng Hà, có thể thay đổi mà không báo trước. Liên hệ hotline
          để biết thêm chi tiết.
        </p>
      )}
    </div>
  );
}

/** Offers hub pattern cloned from /reference/offers (heading/intro, 2-col
 * campaign card grid, per-card terms accordion) rebuilt with HH promo
 * copy — no product-photo cards since no real HH campaign photography
 * exists yet. */
export function OffersView() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-10 md:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-hh-ink sm:text-4xl">Ưu đãi dành cho bạn</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-hh-muted-foreground sm:text-base">
          Khám phá các ưu đãi đang áp dụng cho sản phẩm Le Petit Marseillais tại Hoàng Hà.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {OFFERS.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
}
