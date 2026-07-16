"use client";

import { useState } from "react";
import Image from "next/image";
import { Users } from "lucide-react";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { SOCIAL_PROOF } from "@/data/site-content";
import { HH_ARTICLES } from "@/data/articles";

const TILE_COLORS: [string, string][] = [
  ["#2f6b4f", "#5c9b7c"],
  ["#7c6fb0", "#b8aede"],
  ["#e08a3e", "#f3cf87"],
  ["#d98fa0", "#f3c9d3"],
  ["#8fa06a", "#c7d3a8"],
  ["#cd6a3c", "#e8ab84"],
];

const tileArticles = HH_ARTICLES.filter((a) => a.image).slice(0, 6);

function Tile({ image, colorFrom, colorTo }: { image: string | null; colorFrom: string; colorTo: string }) {
  const [failed, setFailed] = useState(false);
  const showImage = image && !failed;

  return (
    <div className="relative aspect-square w-[200px] flex-shrink-0 overflow-hidden md:w-[264px]">
      {showImage ? (
        <Image
          src={image}
          alt=""
          fill
          sizes="264px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <ProductPlaceholderArt colorFrom={colorFrom} colorTo={colorTo} className="h-full w-full rounded-none" />
      )}
    </div>
  );
}

/** Header + horizontal-scroll tile row — structural analog of the shared
 * Caudalie homepage's InstagramFeed.tsx. No real social embed/API exists,
 * so the tiles show real article hero photos (Phase 3 download) as a
 * stand-in "community content" rail instead of a fake social embed —
 * falling back to the gradient placeholder tile on load error or if fewer
 * than 6 articles have images. */
export function SocialFeed() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 md:px-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="hh-heading-section text-hh-ink">{SOCIAL_PROOF.heading}</h2>
        <span
          aria-label={`${SOCIAL_PROOF.cta} — đang cập nhật`}
          className="flex cursor-default items-center gap-2 rounded-md border border-hh-border bg-white px-6 py-3 text-hh-muted-foreground"
        >
          <Users className="size-5" strokeWidth={1.5} />
          <span>{SOCIAL_PROOF.cta}</span>
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {TILE_COLORS.map(([colorFrom, colorTo], index) => (
          <Tile key={`${colorFrom}-${index}`} image={tileArticles[index]?.image ?? null} colorFrom={colorFrom} colorTo={colorTo} />
        ))}
      </div>
    </section>
  );
}
