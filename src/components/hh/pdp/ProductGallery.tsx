"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, Play, X, ZoomIn } from "lucide-react";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { useAccount } from "@/components/hh/AccountContext";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { cn } from "@/lib/utils";
import { getProductGalleryItems, type HHProduct } from "@/data/products";

type Slide =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; poster?: string; title?: string };

/**
 * PDP media gallery — Phase 8A P0.5. Three real modes, chosen purely from
 * what `getProductGalleryItems`/`product.video` actually return — never
 * from a fixed design assumption:
 *
 * - 0 slides  → PLACEHOLDER: `ProductPlaceholderArt`, no gallery chrome.
 * - 1 slide   → SINGLE: one image, click-to-zoom lightbox, no thumbnail
 *   rail, no prev/next (there is nothing to navigate to — a visible-but-
 *   disabled prev/next would be controls with no function, which the P0.5
 *   spec explicitly rules out).
 * - 2+ slides → MULTI: thumbnail rail (scrollable on mobile), prev/next,
 *   keyboard arrow-key navigation, selected-state ring on the active
 *   thumbnail, lightbox opens at the current slide.
 *
 * Every product in the current catalogue import has 0 or 1 image and 0
 * video (audited in `HH_LPM_CAUDALIE_PARITY_P0_REPORT.md` §P0.5) — so
 * MULTI never actually renders today. It's built and left in place for
 * whenever multi-angle photography exists, per the "build the real
 * architecture, don't fake 5 thumbnails from 1 photo" instruction.
 */
export function ProductGallery({ product }: { product: HHProduct }) {
  const { isWishlisted, toggleWishlist } = useAccount();
  const wishlisted = isWishlisted(product.slug);

  const imageItems = getProductGalleryItems(product);
  const slides: Slide[] = [
    ...imageItems.map((item): Slide => ({ kind: "image", src: item.src, alt: item.alt })),
    ...(product.video
      ? [{ kind: "video" as const, src: product.video.src, poster: product.video.poster, title: product.video.title }]
      : []),
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const active = slides[activeIndex];
  const isMulti = slides.length > 1;

  function goTo(index: number) {
    setActiveIndex(((index % slides.length) + slides.length) % slides.length);
  }

  function openLightbox() {
    setLightboxOpen(true);
  }

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-hh-border bg-hh-cream">
        {product.badge && (
          <span
            className={cn(
              "absolute left-3 top-3 z-10 rounded px-[10px] py-1 text-xs font-normal",
              product.badge === "Hữu cơ" ? "bg-[#dceee1] text-[#1f5c3d]" : "bg-hh-primary text-white"
            )}
          >
            {product.badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleWishlist(product.slug)}
          aria-label={wishlisted ? "Bỏ khỏi yêu thích" : "Yêu thích"}
          aria-pressed={wishlisted}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-hh-surface/80 backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary"
        >
          <Heart className={cn("h-4 w-4 text-hh-primary", wishlisted && "fill-hh-primary")} strokeWidth={1.5} />
        </button>

        {slides.length === 0 ? (
          <ProductPlaceholderArt
            colorFrom="#d9bd87"
            colorTo="#f5e7c9"
            shape={product.category === "xa-phong-banh" ? "soap" : product.category === "cham-soc-tay" ? "tube" : "bottle"}
            className="h-full w-full rounded-none"
          />
        ) : (
          <>
            <button
              ref={triggerRef}
              type="button"
              onClick={openLightbox}
              aria-label={
                active.kind === "video"
                  ? `Xem video: ${active.title ?? product.name}`
                  : `Phóng to ảnh: ${active.alt}`
              }
              className="group absolute inset-0 h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary"
            >
              {active.kind === "video" ? (
                <span className="relative block h-full w-full">
                  {active.poster && (
                    <Image
                      src={active.poster}
                      alt={active.title ?? product.name}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-contain p-8"
                    />
                  )}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-hh-primary/90 text-white">
                      <Play className="size-6" fill="currentColor" strokeWidth={0} />
                    </span>
                  </span>
                </span>
              ) : (
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                  className="object-contain p-8"
                />
              )}
              <span className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full bg-hh-surface/80 text-hh-primary opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                <ZoomIn className="size-4" strokeWidth={1.75} />
              </span>
            </button>

            {isMulti && (
              <>
                <button
                  type="button"
                  onClick={() => goTo(activeIndex - 1)}
                  aria-label="Ảnh trước"
                  className="absolute left-2 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-hh-surface/85 text-hh-ink backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(activeIndex + 1)}
                  aria-label="Ảnh tiếp theo"
                  className="absolute right-2 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-hh-surface/85 text-hh-ink backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
          </>
        )}
      </div>

      {isMulti && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Chọn ảnh sản phẩm">
          {slides.map((slide, index) => (
            <button
              key={slide.kind === "image" ? slide.src : slide.src + index}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={slide.kind === "video" ? `Xem video ${index + 1}` : `Xem ảnh ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative size-16 shrink-0 overflow-hidden rounded-sm border bg-hh-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary",
                index === activeIndex ? "border-hh-primary ring-1 ring-hh-primary" : "border-hh-border"
              )}
            >
              {slide.kind === "video" ? (
                <span className="flex h-full w-full items-center justify-center bg-hh-ink/5">
                  <Play className="size-4 text-hh-primary" fill="currentColor" strokeWidth={0} />
                </span>
              ) : (
                <Image src={slide.src} alt={slide.alt} fill sizes="64px" className="object-contain p-1.5" />
              )}
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <Lightbox
          slides={slides}
          activeIndex={activeIndex}
          productName={product.name}
          onIndexChange={goTo}
          onClose={() => setLightboxOpen(false)}
          returnFocusRef={triggerRef}
        />
      )}
    </div>
  );
}

function Lightbox({
  slides,
  activeIndex,
  productName,
  onIndexChange,
  onClose,
  returnFocusRef,
}: {
  slides: Slide[];
  activeIndex: number;
  productName: string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const isMulti = slides.length > 1;
  const active = slides[activeIndex];

  useFocusTrap(panelRef, true);

  // Latest-value refs so the mount-once effect below can read fresh
  // `activeIndex`/callbacks without listing them as dependencies — keeps
  // Escape/scroll-lock/focus-restore running exactly once per open (mount)
  // and once per close (unmount), not re-running (and re-firing focus
  // restore) on every arrow-key navigation between slides.
  const activeIndexRef = useRef(activeIndex);
  const onIndexChangeRef = useRef(onIndexChange);
  const onCloseRef = useRef(onClose);
  activeIndexRef.current = activeIndex;
  onIndexChangeRef.current = onIndexChange;
  onCloseRef.current = onClose;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCloseRef.current();
      if (isMulti && event.key === "ArrowLeft") onIndexChangeRef.current(activeIndexRef.current - 1);
      if (isMulti && event.key === "ArrowRight") onIndexChangeRef.current(activeIndexRef.current + 1);
    }
    window.addEventListener("keydown", onKeyDown);

    const trigger = returnFocusRef.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      // Focus restore — Escape/close returns focus to whatever opened the
      // lightbox (the main gallery image button), not just wherever the
      // browser happens to land by default.
      trigger?.focus();
    };
    // Intentionally mount/unmount-only — see the latest-value refs above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-hh-ink/80 p-4" role="dialog" aria-modal="true" aria-label={`Xem ảnh phóng to: ${productName}`}>
      <div ref={panelRef} className="relative flex max-h-full w-full max-w-3xl flex-col items-center">
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="absolute -top-2 right-0 z-10 flex size-10 items-center justify-center rounded-full bg-hh-surface text-hh-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary"
        >
          <X className="size-5" />
        </button>

        <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-hh-surface">
          {active.kind === "video" ? (
            <video
              src={active.src}
              poster={active.poster}
              controls
              autoPlay={false}
              className="h-full w-full object-contain"
            >
              {active.title}
            </video>
          ) : (
            <Image src={active.src} alt={active.alt} fill sizes="100vw" className="object-contain p-6" />
          )}
        </div>

        {isMulti && (
          <div className="mt-4 flex items-center gap-6">
            <button
              type="button"
              onClick={() => onIndexChange(activeIndex - 1)}
              aria-label="Ảnh trước"
              className="flex size-10 items-center justify-center rounded-full bg-hh-surface text-hh-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary"
            >
              <ChevronLeft className="size-5" />
            </button>
            <span className="text-sm text-white">
              {activeIndex + 1} / {slides.length}
            </span>
            <button
              type="button"
              onClick={() => onIndexChange(activeIndex + 1)}
              aria-label="Ảnh tiếp theo"
              className="flex size-10 items-center justify-center rounded-full bg-hh-surface text-hh-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
