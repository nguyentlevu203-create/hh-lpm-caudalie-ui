"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { HH_CATEGORIES, getProductsByCategory } from "@/data/products";
import { FEATURED_COLLECTION } from "@/data/site-content";

const TILE_COLORS: [string, string][] = [
  ["#7c6fb0", "#b8aede"],
  ["#8fa06a", "#c7d3a8"],
  ["#d98fa0", "#f3c9d3"],
  ["#e2a33a", "#f3cf87"],
  ["#c7ab7a", "#e8d5ac"],
  ["#cd6a3c", "#e8ab84"],
];

function CategoryTile({
  image,
  colorFrom,
  colorTo,
  shape,
}: {
  image: string | null;
  colorFrom: string;
  colorTo: string;
  shape: "bottle" | "soap" | "tube";
}) {
  const [failed, setFailed] = useState(false);
  const showImage = image && !failed;

  return (
    <div className="relative aspect-[3/4] w-[220px] flex-shrink-0 overflow-hidden rounded-md bg-hh-cream">
      {showImage ? (
        <Image
          src={image}
          alt=""
          fill
          sizes="220px"
          className="object-contain p-4"
          onError={() => setFailed(true)}
        />
      ) : (
        <ProductPlaceholderArt colorFrom={colorFrom} colorTo={colorTo} shape={shape} className="h-full w-full" />
      )}
    </div>
  );
}

/** Two-column brand-promise section — structure ported from the shared
 * Caudalie homepage's DiscoverCults.tsx: a static text/CTA block on one
 * side, a horizontally scrollable strip of product art on the other. Not a
 * genuine structural analog of ComboOffers.tsx (which is a header + product
 * grid, kept as its own legitimate section), so ported separately with HH
 * category art instead of Caudalie cult-product photography. Each tile now
 * shows a real product photo from that category (first sellable product
 * with a downloaded image) when one exists, falling back to the gradient
 * placeholder otherwise or on load error. */
export function FeaturedCollection() {
  return (
    <section className="flex flex-col md:flex-row">
      <div className="flex w-full flex-col justify-center gap-8 bg-hh-cream px-6 py-16 md:w-1/2 md:px-16 md:py-24">
        <div className="w-fit border-b border-hh-primary pb-2">
          <span className="text-sm text-hh-primary">{FEATURED_COLLECTION.eyebrow}</span>
        </div>

        <p className="hh-heading-section text-hh-ink">{FEATURED_COLLECTION.heading}</p>

        <Link
          href={FEATURED_COLLECTION.cta.href}
          className="w-fit rounded-md bg-hh-primary px-6 py-3 text-sm font-medium text-white"
        >
          {FEATURED_COLLECTION.cta.label}
        </Link>
      </div>

      <div className="flex w-full gap-4 overflow-x-auto bg-hh-muted px-6 py-16 md:w-1/2 md:px-16 md:py-24">
        {HH_CATEGORIES.map((cat, index) => {
          const product = getProductsByCategory(cat.slug).find((p) => p.image);
          return (
            <CategoryTile
              key={cat.slug}
              image={product?.image ?? null}
              colorFrom={TILE_COLORS[index % TILE_COLORS.length][0]}
              colorTo={TILE_COLORS[index % TILE_COLORS.length][1]}
              shape={cat.slug === "xa-phong-banh" ? "soap" : cat.slug === "cham-soc-tay" ? "tube" : "bottle"}
            />
          );
        })}
      </div>
    </section>
  );
}
