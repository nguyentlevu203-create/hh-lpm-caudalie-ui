export interface DiagnosisConcern {
  id: string;
  /** Italic collection eyebrow above the heading, e.g. "Premier Cru". */
  eyebrow: string;
  heading: string;
  body: string;
  image: string;
  imageAlt: string;
  /** Card background color (hex), sampled from the live card. */
  cardBg: string;
  /** Heading + eyebrow text color when the card sits on a dark background. */
  onDark?: boolean;
  /** Heading color (hex) — independently themed per card on the live site. */
  headingColor: string;
  buttonBg: string;
  buttonTextColor: string;
  /**
   * The live site renders VinoHydra and Vinopure with a desaturated heading
   * + "Shop now" button (same muted tone as their card background), reading
   * as a soft-disabled / lower-priority state next to the other collections.
   */
  muted?: boolean;
  href: string;
}

/**
 * Real content captured from https://en.caudalie.com/find-your-regimen/find-your-regimen
 * (the "1 issue, 1 solution" concern grid), including exact card/button colors
 * read via computed styles.
 */
export const DIAGNOSIS_CONCERNS: DiagnosisConcern[] = [
  {
    id: "premier-cru",
    eyebrow: "Premier Cru",
    heading: "The anti-ageing solution without compromise",
    body: "There's no longer any need to choose, these exceptional formulas, boosted by the patented TET8™ technology, correct all signs of ageing: settled wrinkles, fine lines, firmness, volume, elasticity, dark spots, hydration and radiance.",
    image: "/images/reference/diagnosis/premier-cru.jpg",
    imageAlt:
      "Caudalie skincare products on a purple background, including a serum, eye cream, and creams, with a grape on the side.",
    cardBg: "#2D1946",
    onDark: true,
    headingColor: "#FFFFFF",
    buttonBg: "#FFFFFF",
    buttonTextColor: "#000000",
    href: "#",
  },
  {
    id: "resveratrol-lift",
    eyebrow: "Resveratrol-Lift",
    heading: "The anti-wrinkle & firming solution",
    body: "Loss of firmness, lack of radiance, sagging facial contours... There are numerous signs of ageing. To rejuvenate the skin, discover our anti-wrinkle collection and its patented vegan collagen booster. It firms and redensifies the skin for a visibly more youthful complexion.",
    image: "/images/reference/diagnosis/resveratrol-lift.png",
    imageAlt: "Resveratrol-Lift range on a pale pink background.",
    cardBg: "#F9F0F1",
    headingColor: "#0040A8",
    buttonBg: "#0040A8",
    buttonTextColor: "#FFFFFF",
    href: "#",
  },
  {
    id: "vinoperfect",
    eyebrow: "Vinoperfect",
    heading: "The anti-spot solution",
    body: "Say goodbye to dark spots with these targeted treatments that are effective on all types of dark spots (sun, acne, melasma, age) and suitable for all skin types. Achieve a radiant and even complexion!",
    image: "/images/reference/diagnosis/vinoperfect.jpg",
    imageAlt: "Caudalie, Vinoperfect",
    cardBg: "#E2E7F7",
    headingColor: "#3B3E3D",
    buttonBg: "#1D358C",
    buttonTextColor: "#FFFFFF",
    href: "#",
  },
  {
    id: "vinohydra",
    eyebrow: "VinoHydra",
    heading: "The hydration solution",
    body: "Goodbye dry and dehydrated skin! This tailor-made hydration routine enriched with organic grape water comes to the rescue of sensitive skin, offering an intense boost of moisture all day long!",
    image: "/images/reference/diagnosis/vinohydra.jpg",
    imageAlt: "Caudalie, VinoHydra",
    cardBg: "#FAD2DB",
    headingColor: "#F5A2B5",
    buttonBg: "#F5A2B5",
    buttonTextColor: "#FFFFFF",
    muted: true,
    href: "#",
  },
  {
    id: "vinoclean",
    eyebrow: "Vinoclean",
    heading: "Make-up removal: Your first beauty step",
    body: "Essential for healthy skin and adapted to every need, these cleansers and make-up removers effectively and gently purify the skin.",
    image: "/images/reference/diagnosis/vinoclean.jpg",
    imageAlt: "Vinoclean cleansers and make-up removers.",
    cardBg: "#D5ECE0",
    headingColor: "#005056",
    buttonBg: "#005056",
    buttonTextColor: "#FFFFFF",
    href: "#",
  },
  {
    id: "vinopure",
    eyebrow: "Vinopure",
    heading: "The acne-blemish solution",
    body: "Enriched with an exclusive cocktail of anti-acne active ingredients, this purifying skincare ritual eliminates blemishes for a visbily clearer, mattified complexion.",
    image: "/images/reference/diagnosis/vinopure.jpg",
    imageAlt: "Vinopure purifying skincare ritual.",
    cardBg: "#F6F8F7",
    headingColor: "#A5BDB1",
    buttonBg: "#A5BDB1",
    buttonTextColor: "#FFFFFF",
    muted: true,
    href: "#",
  },
  {
    id: "vinosculpt",
    eyebrow: "Vinosculpt",
    heading: "The firmness solution",
    body: "Achieve a toned figure all year round with the Firming Programme. It acts effectively on the whole body to refine the figure and visibly firm the skin",
    image: "/images/reference/diagnosis/vinosculpt.jpg",
    imageAlt: "Vinosculpt firming body cream.",
    cardBg: "#4A3650",
    onDark: true,
    headingColor: "#FFFFFF",
    buttonBg: "#F2F2F2",
    buttonTextColor: "#000000",
    href: "#",
  },
  {
    id: "suncare",
    eyebrow: "Suncare",
    heading: "Protect. Glow.",
    body: "In summer or all year round, protect your skin from the sun's rays with high-performance skincare, designed for the whole family and formulated to combine efficacy, tolerance and sensoriality.",
    image: "/images/reference/diagnosis/suncare.jpg",
    imageAlt: "Suncare sun protection range on the beach.",
    cardBg: "#FAE25F",
    headingColor: "#1D358C",
    buttonBg: "#1D358C",
    buttonTextColor: "#FFFFFF",
    href: "#",
  },
  {
    id: "beauty-elixir",
    eyebrow: "Beauty Elixir",
    heading: "Beauty in a bottle",
    body: "Fall in love with our cult multi-use mist! Popular with make-up artists and celebrities alike, Beauty Elixir is a must-have to prep skin, fix make-up and instantly illuminate the complexion.",
    image: "/images/reference/diagnosis/beauty-elixir.jpg",
    imageAlt:
      "Bottle of Beauty Elixir by Caudalie surrounded by roses, grapes, rosemary and other herbs on a pink gradient background.",
    cardBg: "#EDCBDC",
    headingColor: "#3B3E3D",
    buttonBg: "#3B3E3D",
    buttonTextColor: "#FFFFFF",
    href: "#",
  },
  {
    id: "eaux-fraiches",
    eyebrow: "Eaux Fraîches",
    heading: "A sensory escape in the vines",
    body: "Sensual, addictive, mysterious, sparkling, fresh... Discover the vineyard with Caudalie Fresh Fragrances. Find the scent that best suits you from our 5 fragrances.",
    image: "/images/reference/diagnosis/eaux-fraiches.jpg",
    imageAlt: "Eaux Fraîches fragrance bottles.",
    cardBg: "#F4F3F1",
    headingColor: "#5E1D48",
    buttonBg: "#5E1D48",
    buttonTextColor: "#FFFFFF",
    href: "#",
  },
];
