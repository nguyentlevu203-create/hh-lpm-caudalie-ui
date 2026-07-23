"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { SOCIAL_PROOF } from "@/data/site-content";
import { HH_ARTICLES } from "@/data/articles";

const TILE_COLORS: [string, string][] = [
  ["#244a57", "#5f8e91"],
  ["#7c6fb0", "#b8aede"],
  ["#c99a4a", "#f3cf87"],
  ["#d98fa0", "#f3c9d3"],
  ["#8fa06a", "#c7d3a8"],
  ["#cd6a3c", "#e8ab84"],
];

const tileArticles = HH_ARTICLES.filter((a) => a.image).slice(0, 6);

/** Editorial tile: image + topic eyebrow + title, no CTA button — same
 * "no transactional chrome" rule as the article list page's card
 * (src/app/bai-viet/page.tsx), distinguishing it from ProductCard. */
function ArticleTile({
  slug,
  title,
  topic,
  image,
  colorFrom,
  colorTo,
}: {
  slug: string;
  title: string;
  topic?: string | null;
  image: string | null;
  colorFrom: string;
  colorTo: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = image && !failed;

  return (
    <Link href={`/bai-viet/${slug}`} className="group w-[200px] flex-shrink-0 md:w-[264px]">
      <div className="relative aspect-square w-full overflow-hidden">
        {showImage ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="264px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setFailed(true)}
          />
        ) : (
          <ProductPlaceholderArt colorFrom={colorFrom} colorTo={colorTo} className="h-full w-full rounded-none" />
        )}
      </div>
      {topic && <p className="mt-3 text-xs uppercase tracking-wide text-hh-primary">{topic}</p>}
      <p className="mt-1 line-clamp-2 text-sm font-medium text-hh-ink">{title}</p>
    </Link>
  );
}

/** Header + horizontal-scroll editorial rail — structural analog of the
 * shared Caudalie homepage's InstagramFeed.tsx, repointed at the site's real
 * article library (P2.1) instead of a fake social-feed placeholder: no
 * social embed/API exists, and a disabled "đang cập nhật" CTA read as
 * broken. Tiles link to real `/bai-viet/[slug]` articles; the header CTA
 * navigates to the full article list. */
export function SocialFeed() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 md:px-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="hh-heading-section text-hh-ink">{SOCIAL_PROOF.heading}</h2>
        <Link
          href={SOCIAL_PROOF.ctaHref}
          className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-hh-primary"
        >
          {SOCIAL_PROOF.cta}
          <ArrowRight className="size-4" strokeWidth={1.5} />
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {TILE_COLORS.map(([colorFrom, colorTo], index) => {
          const article = tileArticles[index];
          if (!article) return null;
          return (
            <ArticleTile
              key={article.id}
              slug={article.slug}
              title={article.title}
              topic={article.topic}
              image={article.image}
              colorFrom={colorFrom}
              colorTo={colorTo}
            />
          );
        })}
      </div>
    </section>
  );
}
