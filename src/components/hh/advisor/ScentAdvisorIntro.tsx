/** Heading/intro block — structure cloned 1:1 from /reference/diagnosis's
 * `DiagnosisIntro` (centered, max-w-2xl heading + paragraph). */
export function ScentAdvisorIntro() {
  return (
    <div className="mx-auto mb-8 max-w-2xl text-center md:mb-12">
      <h1 className="text-2xl font-normal text-hh-ink md:text-[38px]">Tư vấn chọn mùi hương</h1>
      <p className="mt-3 text-base text-hh-muted-foreground">
        Chọn cảm giác bạn đang tìm kiếm, chúng tôi sẽ gợi ý mùi hương Le Petit Marseillais phù hợp với bạn.
      </p>
    </div>
  );
}
