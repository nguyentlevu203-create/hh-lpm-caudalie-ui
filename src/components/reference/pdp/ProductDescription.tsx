"use client";

import { useState } from "react";

const ATTRIBUTES: { label: string; value: string }[] = [
  { label: "Skin type", value: "All skin types" },
  { label: "Need", value: "Dark spot correction & hyperpigmentation" },
  { label: "Texture", value: "Serum" },
  { label: "Key ingredients", value: "Olive squalane, Viniferine" },
  { label: "Use", value: "Morning and night, before your cream" },
];

const EXTRA_CLAIMS = [
  "Visibly reduces the appearance of new dark spots with regular use*",
  "Lightweight, fast-absorbing texture layers cleanly under moisturiser",
];

export function ProductDescription() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-t border-border pt-8">
      <dl className="grid gap-2 text-base text-primary">
        {ATTRIBUTES.map((attr) => (
          <div key={attr.label} className="flex gap-1">
            <dt className="font-medium">{attr.label} :</dt>
            <dd>{attr.value}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-6 text-lg font-medium text-primary">What is it?</h2>
      <p className="mt-2 text-base text-muted-foreground">
        This serum targets dark spots caused by sun exposure, acne, pregnancy or
        age, helping to visibly brighten an uneven complexion over time. Its
        gentle, non-irritating formula is suitable for all skin types, including
        sensitive skin.
      </p>

      {expanded && (
        <div className="mt-4">
          <p className="text-base font-medium text-primary">Clinically proven results</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-base text-muted-foreground">
            <li>Dark spot intensity reduced by up to 63% after one bottle*</li>
            {EXTRA_CLAIMS.map((claim) => (
              <li key={claim}>{claim}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-muted-foreground">
            *Self-assessment test, 118 participants, 12 weeks.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-4 block text-base text-primary underline"
      >
        {expanded ? "See less" : "See more"}
      </button>
    </div>
  );
}
