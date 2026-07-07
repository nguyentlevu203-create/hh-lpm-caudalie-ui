import type { SearchProduct } from "@/types/content";

/** Results for the live query `https://en.caudalie.com/search?q=serum` (10 matches). */
export const SEARCH_QUERY = "serum";

export const SEARCH_QUERY_PRODUCTS: SearchProduct[] = [
  {
    id: "vinoperfect-duo",
    title: "Dark Spot Brightening Serum & SPF50+ Cream Duo",
    image: "/images/reference/category/vinoperfect-duo.jpg",
    price: 53.0,
    href: "#",
  },
  {
    id: "premier-cru-serum",
    title: "The Serum",
    image: "/images/reference/category/premier-cru-serum.jpg",
    price: 92.0,
    href: "#",
  },
  {
    id: "vinohydra-serum",
    title: "Hyaluronic Serum",
    image: "/images/reference/category/vinohydra-serum.jpg",
    price: 31.0,
    href: "#",
  },
  {
    id: "resveratrol-lift-duo",
    title: "Instant Firming Serum & Refill Duo",
    image: "/images/reference/category/resveratrol-lift-duo.jpg",
    price: 100.0,
    href: "#",
  },
  {
    id: "resveratrol-lift-refill",
    title: "Instant Firming Serum - Refill",
    image: "/images/reference/category/resveratrol-lift-refill.jpg",
    price: 46.0,
    href: "#",
  },
  {
    id: "vinopure-serum",
    title: "Blemish Control Salicylic Serum",
    image: "/images/reference/category/vinopure-serum.jpg",
    price: 34.0,
    href: "#",
  },
  {
    id: "vinoperfect-jumbo",
    title: "Dark Spot Brightening Serum Vitamin C Alternative - Jumbo",
    image: "/images/reference/category/vinoperfect-jumbo.jpg",
    price: 74.0,
    href: "#",
  },
  {
    id: "vinoperfect-30ml",
    title: "Dark Spot Brightening Serum Vitamin C Alternative - 30ml",
    image: "/images/reference/category/vinoperfect-30ml.jpg",
    price: 53.0,
    href: "#",
  },
  {
    id: "resveratrol-lift-serum",
    title: "Instant Firming Retinol Alternative Serum",
    image: "/images/reference/category/resveratrol-lift-serum.jpg",
    price: 54.0,
    href: "#",
  },
  {
    id: "pore-minimising-detox-mask",
    title: "Pore Minimising Instant Detox Mask",
    image: "/images/reference/search/pore-minimising-detox-mask.jpg",
    price: 27.0,
    href: "#",
  },
];

/**
 * Quick category shortcuts rendered above the results. The live page repeats
 * each category twice (once per matching product's primary + secondary
 * taxonomy) — kept as observed rather than de-duplicated.
 */
export const SEARCH_QUERY_CATEGORIES = [
  "Serums",
  "Serums",
  "Resveratrol-Lift",
  "Resveratrol-Lift",
  "Face",
  "All products",
  "All products",
  "Face",
  "Gift Ideas",
  "Gift Ideas",
];

/** Fallback "Bestsellers" rail shown on the live site for a no-match query. */
export const SEARCH_NO_RESULTS_QUERY = "zzzznonexistentproductxyz";

export const SEARCH_BESTSELLER_PRODUCTS: SearchProduct[] = [
  {
    id: "vinoperfect-30ml-bestseller",
    eyebrow: "Vinoperfect",
    title: "Dark Spot Brightening Serum Vitamin C Alternative - 30ml",
    image: "/images/reference/category/vinoperfect-30ml.jpg",
    price: 53.0,
    href: "#",
  },
  {
    id: "resveratrol-lift-cashmere-cream",
    eyebrow: "Resveratrol-Lift",
    title: "Firming Cashmere Cream",
    image: "/images/reference/search/resveratrol-lift-cashmere-cream.jpg",
    price: 51.0,
    href: "#",
  },
  {
    id: "vinopure-serum-bestseller",
    eyebrow: "Vinopure",
    title: "Blemish Control Salicylic Serum",
    image: "/images/reference/category/vinopure-serum.jpg",
    price: 34.0,
    href: "#",
  },
  {
    id: "premier-cru-eye-cream",
    eyebrow: "Premier Cru",
    title: "The Eye Cream",
    image: "/images/reference/search/premier-cru-eye-cream.jpg",
    price: 49.0,
    href: "#",
  },
  {
    id: "premier-cru-the-cream",
    eyebrow: "Premier Cru",
    title: "The Cream",
    image: "/images/reference/search/premier-cru-the-cream.jpg",
    price: 92.0,
    href: "#",
  },
  {
    id: "resveratrol-lift-serum-bestseller",
    eyebrow: "Resveratrol-Lift",
    title: "Instant Firming Retinol Alternative Serum",
    image: "/images/reference/category/resveratrol-lift-serum.jpg",
    price: 54.0,
    href: "#",
  },
];
