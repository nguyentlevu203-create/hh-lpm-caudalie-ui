import Image from "next/image";

const BADGES = [
  { src: "/images/caudalie/brand-value-natural-origin.jpg", alt: "98% natural-origin ingredients" },
  { src: "/images/caudalie/brand-value-ocean-plastic.jpg", alt: "100% ocean plastic collect" },
];

export function TrustBadges() {
  return (
    <div className="flex items-center justify-center gap-8 py-8">
      {BADGES.map((badge) => (
        <Image
          key={badge.src}
          src={badge.src}
          alt={badge.alt}
          width={120}
          height={120}
          className="h-20 w-20 object-contain sm:h-28 sm:w-28"
        />
      ))}
    </div>
  );
}
