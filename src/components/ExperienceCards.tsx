import Image from "next/image";

interface ExperienceCard {
  image: string;
  title: string;
  description: string;
  cta: string;
}

const EXPERIENCE_CARDS: ExperienceCard[] = [
  {
    image: "/images/caudalie/experience-powered-by-grape.png",
    title: "Powered by the Grape",
    description:
      "Born in Bordeaux at the heart of the vines, patented and natural formulas",
    cta: "Shop now",
  },
  {
    image: "/images/caudalie/experience-skin-diagnosis.png",
    title: "Skin diagnosis",
    description: "Discover your personalized skincare routine.",
    cta: "Scan my skin",
  },
  {
    image: "/images/caudalie/experience-earn-loyalty-points.jpg",
    title: "Earn loyalty points",
    description: "Earn points with every purchase and enjoy free products!",
    cta: "Shop now",
  },
  {
    image: "/images/caudalie/experience-welcome-offer.png",
    title: "Welcome offer",
    description: "Welcome offer: 15% off sitewide. Code: WELCOME15",
    cta: "Shop now",
  },
  {
    image: "/images/caudalie/experience-find-a-store.png",
    title: "Where our boutiques are",
    description: "See where our boutiques are near you",
    cta: "Shop now",
  },
];

export default function ExperienceCards() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
      <h2 className="text-2xl md:text-3xl font-normal text-black text-left mb-6 md:mb-8">
        The Caudalie Experience
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {EXPERIENCE_CARDS.map((card) => (
          <div
            key={card.title}
            className="flex flex-shrink-0 w-[280px] md:w-[320px] flex-col"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(min-width: 768px) 320px, 280px"
                className="object-cover"
              />
            </div>

            <h3 className="mt-4 text-base font-light text-black">
              {card.title}
            </h3>
            <p className="mt-1 text-base font-light text-black line-clamp-2">
              {card.description}
            </p>

            <button
              type="button"
              className="mt-4 w-fit rounded-md border border-black/30 bg-white px-[15px] py-3 text-[#2d1946]"
            >
              {card.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export { ExperienceCards };
