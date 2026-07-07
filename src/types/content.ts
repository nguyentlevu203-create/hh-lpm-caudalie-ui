export interface Product {
  id: string;
  badge?: string;
  title: string;
  subtitle: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  compareAtPrice?: number;
  href: string;
}

export interface PromoBanner {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
}

export interface ExperienceCard {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
}

export interface CultProduct {
  id: string;
  name: string;
  image: string;
  href: string;
}

export interface BrandValueStat {
  id: string;
  kind: "circular-text" | "percentage" | "badge";
  value: string;
  label: string;
  image?: string;
}

export interface BenefitItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

export interface FooterAccordionSection {
  id: string;
  title: string;
  links: { label: string; href: string }[];
}

export interface SocialLink {
  id: string;
  platform: "instagram" | "facebook" | "youtube" | "tiktok" | "linkedin";
  href: string;
}

export interface MegaMenuLink {
  label: string;
  href?: string;
}

export interface MegaMenuColumn {
  heading: string;
  links: MegaMenuLink[];
}

export interface MegaMenuPromoTile {
  title: string;
  caption: string;
  href?: string;
}

export interface MegaMenuContent {
  /** Multi-column layout (e.g. "Shop"). */
  columns?: MegaMenuColumn[];
  /** Single vertical list layout (e.g. "Gifts & offers", "Needs" left column). */
  links?: MegaMenuLink[];
  /** Optional portrait promo tiles rendered alongside a list layout. */
  promoTiles?: MegaMenuPromoTile[];
  /** Optional centered call-to-action button below the menu content. */
  ctaLabel?: string;
  ctaHref?: string;
}

export interface NavItem {
  label: string;
  href?: string;
  /** Visual treatment for the nav item itself. */
  variant?: "default" | "pill-yellow" | "pill-grey";
  /** Present when the item opens a hover mega menu (desktop) / accordion (mobile). */
  megaMenu?: MegaMenuContent;
}

export interface InstagramPost {
  id: string;
  image: string;
  href: string;
}

export interface SearchProduct {
  id: string;
  /** Brand/collection line shown above the title (search fallback cards only). */
  eyebrow?: string;
  title: string;
  image: string;
  price: number;
  href: string;
}
