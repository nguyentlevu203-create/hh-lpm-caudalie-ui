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

export interface NavLink {
  label: string;
  href: string;
}

export interface MegaMenuColumn {
  heading: string;
  links: NavLink[];
}

export interface MegaMenuPromoTile {
  image: string;
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  highlighted?: boolean;
  megaMenu?: {
    columns?: MegaMenuColumn[];
    promoTiles?: MegaMenuPromoTile[];
    ctaLabel?: string;
    ctaHref?: string;
  };
}

export interface InstagramPost {
  id: string;
  image: string;
  href: string;
}
