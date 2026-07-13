import { Users } from "lucide-react";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { SOCIAL_PROOF } from "@/data/site-content";

const TILE_COLORS: [string, string][] = [
  ["#2f6b4f", "#5c9b7c"],
  ["#7c6fb0", "#b8aede"],
  ["#e08a3e", "#f3cf87"],
  ["#d98fa0", "#f3c9d3"],
  ["#8fa06a", "#c7d3a8"],
  ["#cd6a3c", "#e8ab84"],
];

/** Header + horizontal-scroll tile row — structural analog of the shared
 * Caudalie homepage's InstagramFeed.tsx. No real social embed/API and no
 * Caudalie Instagram assets — tiles are the site's standard gradient
 * placeholder art, and the CTA uses a plain lucide icon instead of a
 * platform logo image. */
export function SocialFeed() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 md:px-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-normal text-hh-ink">{SOCIAL_PROOF.heading}</h2>
        <a
          href="#"
          className="flex items-center gap-2 rounded-md border border-hh-border bg-white px-6 py-3 text-hh-primary"
        >
          <Users className="size-5" strokeWidth={1.5} />
          <span>{SOCIAL_PROOF.cta}</span>
        </a>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {TILE_COLORS.map(([colorFrom, colorTo], index) => (
          <ProductPlaceholderArt
            key={`${colorFrom}-${index}`}
            colorFrom={colorFrom}
            colorTo={colorTo}
            className="aspect-square w-[200px] flex-shrink-0 rounded-none md:w-[264px]"
          />
        ))}
      </div>
    </section>
  );
}
