import type { Product } from "@/types/content";
import { ProductCard } from "@/components/ProductCard";

const RELATED_PRODUCTS: Product[] = [
  {
    id: "eau-des-vignes",
    badge: "New",
    title: "Fresh Fragrances & Perfumes",
    subtitle: "Fresh Fragrance Eau des Vignes",
    image: "/images/caudalie/product-eau-des-vignes-packshot.jpg",
    rating: 4.5,
    reviewCount: 52,
    price: 30.0,
    href: "#",
  },
  {
    id: "caudalie-essentials",
    badge: "Limited edition",
    title: "Caudalie Essentials x Maria de la Orden",
    subtitle: "",
    image: "/images/caudalie/product-caudalie-essentials-set.jpg",
    rating: 4.5,
    reviewCount: 798,
    price: 16.0,
    href: "#",
  },
  {
    id: "rose-de-vigne",
    badge: "New",
    title: "Fresh Fragrances & Perfumes",
    subtitle: "Fresh Fragrance Rose de Vigne",
    image: "/images/reference/pdp/rose-de-vigne-packshot.jpg",
    rating: 4.5,
    reviewCount: 41,
    price: 30.0,
    href: "#",
  },
  {
    id: "ange-des-vignes",
    badge: "New",
    title: "Fresh Fragrances & Perfumes",
    subtitle: "Ange des Vignes Light Fragrance",
    image: "/images/caudalie/product-ange-des-vignes-packshot.jpg",
    rating: 4.5,
    reviewCount: 34,
    price: 30.0,
    href: "#",
  },
  {
    id: "grape-water",
    title: "Vinoclean",
    subtitle: "Grape Water - 300ml",
    image: "/images/caudalie/product-grape-water.jpg",
    rating: 5,
    reviewCount: 260,
    price: 17.0,
    compareAtPrice: 21.0,
    href: "#",
  },
];

export function RelatedProducts() {
  return (
    <div className="border-t border-border py-10">
      <h2 className="text-2xl text-primary">You may also like</h2>
      <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
        {RELATED_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
