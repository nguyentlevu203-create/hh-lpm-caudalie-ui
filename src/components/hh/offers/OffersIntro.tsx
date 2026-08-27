/** Heading/intro block — structure cloned 1:1 from /reference/offers's
 * `OffersIntro` (centered, max-w-2xl heading + paragraph). */
export function OffersIntro() {
  return (
    <div className="mx-auto mb-8 max-w-2xl text-center md:mb-12">
      <h1 className="hh-heading-page text-hh-ink">Ưu đãi dành cho bạn</h1>
      <p className="mt-3 text-base text-hh-muted-foreground">
        Khám phá các ưu đãi và đặc quyền độc quyền đang áp dụng cho sản phẩm Le Petit Marseillais tại Hoàng Hà.
      </p>
    </div>
  );
}
