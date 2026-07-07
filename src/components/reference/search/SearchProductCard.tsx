import Image from "next/image";
import Link from "next/link";
import type { SearchProduct } from "@/types/content";

interface SearchProductCardProps {
  product: SearchProduct;
}

export function SearchProductCard({ product }: SearchProductCardProps) {
  const { eyebrow, title, image, price, href } = product;

  return (
    <Link href={href} className="flex flex-col items-center">
      <Image
        src={image}
        alt={title}
        width={160}
        height={160}
        className="h-auto w-[160px] max-w-full"
      />
      {eyebrow && (
        <p className="mt-2 text-center text-base text-primary">{eyebrow}</p>
      )}
      <p className="mt-2 min-h-[4.5rem] text-center text-base text-primary">
        {title}
      </p>
      <p className="mt-2 w-full bg-gray-100 p-2 text-center">
        <span className="text-base font-semibold text-primary">
          {"€"}
          {price.toFixed(2)}
        </span>
      </p>
    </Link>
  );
}
