import Image from "next/image";

export function BrandStoryHero() {
  return (
    <div className="relative aspect-[2734/880] w-full">
      <Image
        src="/images/reference/brand-story/hero.jpg"
        alt="Mathilde and Bertrand Thomas, co-founders of Caudalie, in the vines at Château Smith Haut Lafitte."
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}
