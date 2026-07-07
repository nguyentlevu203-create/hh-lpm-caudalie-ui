"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SearchResultsSummary } from "@/components/reference/search/SearchResultsSummary";
import { SearchCategoryPills } from "@/components/reference/search/SearchCategoryPills";
import { SearchProductGrid } from "@/components/reference/search/SearchProductGrid";
import {
  SEARCH_QUERY,
  SEARCH_QUERY_PRODUCTS,
  SEARCH_QUERY_CATEGORIES,
  SEARCH_NO_RESULTS_QUERY,
  SEARCH_BESTSELLER_PRODUCTS,
} from "@/components/reference/search/data";

const STATES = [
  { id: "results" as const, tabLabel: `"${SEARCH_QUERY}"` },
  { id: "empty" as const, tabLabel: `"${SEARCH_NO_RESULTS_QUERY}"` },
];

export function SearchResultsView() {
  const [state, setState] = useState<"results" | "empty">("results");

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 md:px-8">
      <div className="mb-6 flex justify-center gap-2 lg:justify-start">
        {STATES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setState(s.id)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              state === s.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-primary/30 text-primary"
            )}
          >
            Try query {s.tabLabel}
          </button>
        ))}
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          {state === "results" ? (
            <>
              <SearchResultsSummary
                label={`(${SEARCH_QUERY_PRODUCTS.length} results)`}
              />
              <SearchCategoryPills categories={SEARCH_QUERY_CATEGORIES} />
            </>
          ) : (
            <SearchResultsSummary label="No results" />
          )}
        </div>

        {state === "results" ? (
          <SearchProductGrid products={SEARCH_QUERY_PRODUCTS} />
        ) : (
          <SearchProductGrid
            heading="Bestsellers"
            products={SEARCH_BESTSELLER_PRODUCTS}
          />
        )}
      </div>
    </div>
  );
}
