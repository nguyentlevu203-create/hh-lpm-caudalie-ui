export interface OfferCard {
  id: string;
  heading: string;
  body: string;
  /** Bold promo code line, e.g. "Code: SUMMER" (omitted for points/loyalty offers). */
  code?: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  /**
   * Small white gift-box icon overlaid on the top-right of the image.
   * Observed live on the "Long-lasting Tan" card only — not a systemic
   * per-card treatment, so most cards omit it.
   */
  hasGiftBadge?: boolean;
  /** Fine-print paragraphs shown under a "Terms & conditions" accordion toggle. Omitted entirely on cards with no live T&C row. */
  terms?: string[];
}

/**
 * Real campaign copy + fine print captured from
 * https://en.caudalie.com/gift-offers/all-offers ("Exclusive online offers").
 */
export const OFFER_CARDS: OfferCard[] = [
  {
    id: "double-your-points",
    heading: "Double your points",
    body: "Double your MYCAUDALIE loyalty points with every order until 07/07.",
    code: undefined,
    ctaLabel: "Shop now",
    ctaHref: "#",
    image: "/images/reference/offers/double-your-points.png",
    imageAlt: "Vos points de fidélité sont doublés !",
    terms: [
      "*Offer valid from 01/07 to 07/07 included (excluding SPA vouchers and e-gift cards):",
      "1) On caudalie.com for any order placed on the website. Your new points balance will be updated on your account when your order is dispatched, within 48 hours at the latest.",
      "2) In Caudalie Boutique SPAs by indicating to the boutique personnel that you have an account or want to create one.",
      "3) In health and beauty stores and spa locations nationwide, for any purchase of Caudalie products with a unique code found inside the packaging: enter this unique code on caudalie.com while the offer is valid in the “My Account – Register a unique code” section”. Non-binding photos.",
    ],
  },
  {
    id: "summer-freshness",
    heading: "Summer freshness",
    body: "A free Grape Water and a Cleansing Oil when you spend 69€*.",
    code: "Code: SUMMER",
    ctaLabel: "Shop now",
    ctaHref: "#",
    image: "/images/reference/offers/summer-freshness.jpg",
    imageAlt: "Fraîcheur d'été",
    terms: [
      "*Free gift: a free Grape Water 75ml and a Makeup Removing Cleansing Oil 75ml when you spend 69€. Offer valid on caudalie.com (apply the promo code at checkout) and in Caudalie Boutique SPAs. Offer cannot be combined with another promo code offer. While stocks last from 02/06/2026 until 30/07/2026. Excluding SPA vouchers and e-gift cards. Non-binding photos.",
    ],
  },
  {
    id: "long-lasting-tan",
    heading: "Long-lasting Tan",
    body: "Your free After-Sun Repairing Lotion 200ml when you spend 49€*",
    code: "Code: SUN49",
    ctaLabel: "Shop now",
    ctaHref: "#",
    image: "/images/reference/offers/long-lasting-tan.jpg",
    imageAlt: "Bronzage Longue Durée",
    hasGiftBadge: true,
    terms: [
      "*Free gift: an After-Sun Repairing Lotion with Aloe Vera 200ml. Offer valid when you spend over 49€ on caudalie.com (apply the promo code at checkout), in Caudalie Boutique SPAs and in participating points of sale. Offer cannot be combined with another promo code offer. While stocks last until 30/07/2026. Excluding SPA vouchers and e-gift cards. Non-binding photos.",
    ],
  },
  {
    id: "limited-edition-gift-sets",
    heading: "Limited edition gift sets",
    body: "Treat yourself to our new gifting collection, complete with our best-sellers and limited edition sets.",
    ctaLabel: "shop now",
    ctaHref: "#",
    image: "/images/reference/offers/limited-edition-gift-sets.jpg",
    imageAlt: "page-offre-coffret-editions-limitées",
  },
  {
    id: "mycaudalie-loyalty",
    heading: "Take advantage of the MYCAUDALIE loyalty programme",
    body: "Register your purchases\nEarn points\nChoose your gifts!\n100 points = 1 FREE full-size product",
    ctaLabel: "Shop now",
    ctaHref: "#",
    image: "/images/reference/offers/mycaudalie-loyalty.jpg",
    imageAlt:
      "A collection of Caudalie skincare products, including creams and serums, displayed with grapes against a light purple background.",
  },
  {
    id: "welcome-offer",
    heading: "Welcome offer",
    body: "15% off your first order when you sign up for email!*\n\nPlus, be the first to shop exclusive offers, new product launches, and so much more.",
    ctaLabel: "Sign up",
    ctaHref: "#",
    image: "/images/reference/offers/welcome-offer.jpg",
    imageAlt:
      "vinoperfect, premier cru, resveratrol and beauty elixir products packshot",
    terms: [
      "*Get 15% off your first online order when you subscribe for emails. Offer valid on caudalie.com. Apply code received through email at checkout. Only one code can be applied at checkout excludes spa treatment vouchers, egift cards, and discounted items. Offer not valid on previous or pending purchases. Non-binding photos.",
    ],
  },
];

export interface GiftDiscoveryTile {
  id: string;
  caption: string;
  image: string;
  imageAlt: string;
  href: string;
}

/** The "Looking for the perfect gift?" discovery row at the bottom of the offers hub. */
export const GIFT_DISCOVERY_TILES: GiftDiscoveryTile[] = [
  {
    id: "egift-card",
    caption: "eGift Card",
    image: "/images/reference/offers/egift-card.jpg",
    imageAlt:
      "Two hands exchanging a purple gift card with “CAUDALÍE” printed on it, against a white background.",
    href: "#",
  },
  {
    id: "bestsellers",
    caption: "Best-sellers",
    image: "/images/reference/offers/bestsellers.jpg",
    imageAlt: "Page_offres&avantages_bestsellers",
    href: "#",
  },
  {
    id: "limited-editions",
    caption: "Limited Editions",
    image: "/images/reference/offers/limited-editions.jpg",
    imageAlt: "Quoi_Offrir_Duo_VP_Suncare",
    href: "#",
  },
];
