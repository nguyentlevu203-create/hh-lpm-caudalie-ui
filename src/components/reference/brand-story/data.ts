export interface TimelineEntryData {
  type: "entry";
  id: string;
  year: string;
  heading: string;
  body: string;
  image: string;
  imageAlt: string;
  /** Which side of the full-bleed image the translucent text card sits on. */
  align: "left" | "right";
  ctaLabel?: string;
  ctaHref?: string;
}

export interface KodaliBlockData {
  type: "kodali";
}

export interface QuoteBlockData {
  type: "quote";
}

export type TimelineBlock = TimelineEntryData | KodaliBlockData | QuoteBlockData;

/**
 * Real content captured from https://en.caudalie.com/about-caudalie/our-story
 * ("Our story"). The live page has ~18 timeline entries in total; this is a
 * representative subset covering every distinct block variant observed
 * (black & white archival photography vs. modern color product photography,
 * left/right card alignment, with/without a "Find out more" CTA, plus the
 * two special one-off blocks), per the task's "representative pattern, not
 * exhaustive clone" instruction — not the full chronological set.
 */
export const TIMELINE_BLOCKS: TimelineBlock[] = [
  {
    type: "entry",
    id: "1993",
    year: "1993",
    heading: "The encounter",
    body: "We met professor Joseph Vercauteren, laboratory director of the Pharmacy University of Bordeaux, during the harvest at Château Smith Haut Lafitte. He told us that grape seeds contain the most powerful antioxidants in the world. We have worked together for 25 years, as well as with his laboratory and teams. By upcycling these grape seeds, we have been pioneers of natural and responsible beauty.",
    image: "/images/reference/brand-story/1993-encounter.jpg",
    imageAlt: "1993",
    align: "left",
  },
  {
    type: "entry",
    id: "1995",
    year: "1995",
    heading: "Polyphenols",
    body: "Two years after this encounter, we launched our first 3 products, containing grape seed polyphenols (which still exist today!). At just 23 years old, we packed our bags and set out to show pharmacists across France our creations. Impressed with the effectiveness of our products, we were given our first shot of success - And there, Caudalie truely began ...",
    image: "/images/reference/brand-story/1995-polyphenols.jpg",
    imageAlt:
      "A woman and a man kneel in a vineyard, examining and holding tubes while surrounded by grapevines. The image is in black and white.",
    align: "right",
  },
  { type: "kodali" },
  {
    type: "entry",
    id: "1997",
    year: "1997",
    heading: "Beauty Elixir",
    body: "The formula is inspired by the Queen of Hungary's elixir of youth. The unique, 100% plant based formula quickly became a cult classic, loved by celebrities, make-up artists and beauty junkies all around the world.",
    image: "/images/reference/brand-story/1997-beauty-elixir.png",
    imageAlt:
      "A Caudalie Paris bottle with a pink rose, rosemary, and mint leaves against a pink background.",
    align: "left",
    ctaLabel: "Find out more",
    ctaHref: "#",
  },
  {
    type: "entry",
    id: "2005",
    year: "2005",
    heading: "Viniférine",
    body: "A precious sap that runs from the vine stalks. This sap – as women working in the vines well know – fades dark spots on the hands and face and restores your skin's natural radiance. Professor Vercauteren identified and patented the molecule behind these incredible properties: Viniferine. This is how our Vinoperfect serum was first created and today, it is the No.1 best-seller around the world.",
    image: "/images/reference/brand-story/2005-viniferine.jpg",
    imageAlt:
      "A close-up of a tree branch with a single droplet hanging from the cut end, against a blurred green background.",
    align: "right",
  },
  {
    type: "entry",
    id: "2006",
    year: "2006",
    heading: "A pioneer in cosm-ethics",
    body: "We created our Cosm-ethics values in 2006 and strive to improve them every year. Mathilde is committed to offering you the most natural-origin formulas possible, whilst guaranteeing they remain both effective and luxurious.",
    image: "/images/reference/brand-story/2006-cosmethics.jpg",
    imageAlt:
      "Hands holding a bunch of ripe yellow grapes in a vineyard, with blurred green leaves in the background.",
    align: "left",
  },
  { type: "quote" },
  {
    type: "entry",
    id: "2013-2023",
    year: "2013 - 2023",
    heading: "Partnership with Dr. David Sinclair, Harvard Medical School",
    body: "Efficacy has always been at the heart of our concerns. That's why we've worked with Dr. David Sinclair from Harvard Medical School for 10 years. Nicknamed the “longevity guru” by Times magazine, our joint research has resulted in the discovery of unique ingredients and exclusive patents, at the cutting edge of anti-ageing innovation: Resveratrol – the active ingredient that's even more effective than Retinol for lifting and firming – or TET8™ technology to correct all the signs of ageing.",
    image: "/images/reference/brand-story/2013-2023-partnership.jpg",
    imageAlt:
      "Four scientists in white lab coats smile in a modern laboratory with large windows and equipment visible in the background.",
    align: "left",
  },
  {
    type: "entry",
    id: "2025",
    year: "2025",
    heading: "Premier Cru and its exclusive Longevity Patent",
    body: "By combining a new natural-origin plumping active ingredient derived from rosewood with its Longevity Patent developed with Harvard Medical School, the Premier Cru collection reactivates the skin's youth mechanisms and provides a complete solution against all signs of ageing: wrinkles, dark spots, loss of volume, for skin that looks younger for longer.",
    image: "/images/reference/brand-story/2025-premier-cru.jpg",
    imageAlt:
      "Dark purple jar of Caudalie Premier Cru cream surrounded by glossy grapes on a purple background.",
    align: "right",
    ctaLabel: "Find out more",
    ctaHref: "#",
  },
];

export const FOOTNOTES: string[] = [
  "(1) In vitro test on the thickness of collagen fibres.",
  "(2) GERSDATA – SOG EARLY – Face skincare category – Anti-ageing segment – in turnover on the pharmacy distribution circuit – in France – for CMA to March 2025.",
  "(3) GERSDATA – SOG EARLY – Facial care category – Anti-pigmentation segment – based on sales in the pharmacy distribution channel – in France – on the CMA in January 2025.",
  "(4) In vitro test on the inhibiting action of Viniferine on tyrosinase.",
  "(5) Calculation based on internal Sell-in data from January 2024 to December 2024.",
];
