"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const CONTAINER = "mx-auto w-full max-w-[1440px] px-4 md:px-8";

interface Slide {
  id: string;
  image: string;
  imageAlt: string;
  eyebrow?: string;
  heading: string;
  body?: string;
  cta: string;
}

const SLIDES: Slide[] = [
  {
    id: "loyalty-offer",
    image: "/images/caudalie/hero-offer.png",
    imageAlt: "Caudalie loyalty offer with product bottles",
    eyebrow: "Until 07/07",
    heading: "Double your loyalty points with every order",
    cta: "Shop now",
  },
  {
    id: "summer-freshness",
    image: "/images/caudalie/product-grape-water.jpg",
    imageAlt: "Caudalie Grape Water and Cleansing Oil",
    heading: "Summer freshness",
    body: "A free Grape Water and a Cleansing Oil when you spend €69.",
    cta: "Shop now",
  },
];

function SlidePanel({ slide, priority }: { slide: Slide; priority: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src={slide.image}
        alt={slide.imageAlt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 z-[5] h-3/4 bg-gradient-to-t from-white via-white/70 to-transparent" />
      <div className="relative z-10 flex h-full flex-col items-start justify-end gap-3 p-8 sm:p-10 lg:p-12">
        {slide.eyebrow ? (
          <p className="text-base font-normal text-black">{slide.eyebrow}</p>
        ) : null}
        <h2 className="max-w-md text-[38px] font-normal leading-[48px] text-black">
          {slide.heading}
        </h2>
        {slide.body ? (
          <p className="max-w-sm text-base font-normal text-black">
            {slide.body}
          </p>
        ) : null}
        <button
          type="button"
          className="rounded-md border border-white/70 bg-white/70 px-[30px] py-3 text-black transition-colors hover:bg-white"
        >
          {slide.cta}
        </button>
      </div>
    </div>
  );
}

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={cn("flex min-h-[70vh] pb-8", CONTAINER)}>
      <div className="flex w-full flex-col">
        {/* Desktop: both slides side-by-side, no controls */}
        <div className="hidden w-full flex-1 lg:flex lg:gap-4">
          {SLIDES.map((slide, index) => (
            <div key={slide.id} className="min-h-[70vh] flex-1">
              <SlidePanel slide={slide} priority={index === 0} />
            </div>
          ))}
        </div>

        {/* Mobile / tablet: single slide with dot indicators */}
        <div className="flex w-full flex-1 flex-col lg:hidden">
          <div className="relative min-h-[70vh] w-full flex-1">
            {SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                className={cn(
                  "absolute inset-0 transition-opacity",
                  index === activeIndex
                    ? "z-10 opacity-100"
                    : "pointer-events-none z-0 opacity-0"
                )}
                aria-hidden={index !== activeIndex}
              >
                <SlidePanel slide={slide} priority={index === 0} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 pt-4">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Show slide ${index + 1}: ${slide.heading}`}
                aria-current={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full border border-black transition-colors",
                  index === activeIndex ? "bg-black" : "bg-transparent"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
