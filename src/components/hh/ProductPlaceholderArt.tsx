import { cn } from "@/lib/utils";

interface ProductPlaceholderArtProps {
  colorFrom: string;
  colorTo: string;
  shape?: "bottle" | "soap" | "tube";
  className?: string;
}

/**
 * Stand-in "product photo" — a gradient tile with a plain geometric bottle
 * silhouette (rects/rounded-rects only). Used everywhere a real product
 * photo would go, since no real Hoàng Hà / Le Petit Marseillais photography
 * exists yet and no Caudalie imagery may be reused. Deliberately reads as an
 * abstract placeholder rather than attempting photorealism — see the
 * production report for what real assets are still needed.
 */
export function ProductPlaceholderArt({
  colorFrom,
  colorTo,
  shape = "bottle",
  className,
}: ProductPlaceholderArtProps) {
  return (
    <div
      className={cn("relative flex items-center justify-center overflow-hidden rounded-xl", className)}
      style={{ background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})` }}
    >
      <svg viewBox="0 0 100 100" className="h-2/3 w-2/3" aria-hidden="true">
        {shape === "soap" && (
          <rect x="18" y="36" width="64" height="32" rx="14" fill="#ffffff" fillOpacity="0.85" />
        )}
        {shape === "tube" && (
          <>
            <rect x="36" y="18" width="28" height="58" rx="10" fill="#ffffff" fillOpacity="0.85" />
            <rect x="43" y="8" width="14" height="14" rx="4" fill="#ffffff" fillOpacity="0.6" />
          </>
        )}
        {shape === "bottle" && (
          <>
            <rect x="30" y="28" width="40" height="58" rx="8" fill="#ffffff" fillOpacity="0.85" />
            <rect x="40" y="12" width="20" height="18" rx="4" fill="#ffffff" fillOpacity="0.6" />
          </>
        )}
      </svg>
    </div>
  );
}
