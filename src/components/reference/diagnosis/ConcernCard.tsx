import Image from "next/image";
import type { DiagnosisConcern } from "@/components/reference/diagnosis/data";

export function ConcernCard({ concern }: { concern: DiagnosisConcern }) {
  const {
    eyebrow,
    heading,
    body,
    image,
    imageAlt,
    cardBg,
    onDark,
    headingColor,
    buttonBg,
    buttonTextColor,
  } = concern;

  return (
    <div
      className="flex overflow-hidden"
      style={{ backgroundColor: cardBg }}
    >
      <div className="relative aspect-[722/806] w-1/2 shrink-0 sm:w-2/5">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 20vw, 40vw"
          className="object-cover"
        />
      </div>

      <div className="flex w-1/2 flex-col items-center justify-center gap-3 px-5 py-8 text-center sm:w-3/5 sm:px-8">
        <p
          className="text-xs italic"
          style={{ color: onDark ? "#FFFFFF" : headingColor }}
        >
          {eyebrow}
        </p>

        <p
          className="text-lg font-medium leading-snug"
          style={{ color: headingColor }}
        >
          {heading}
        </p>

        <p
          className="text-xs leading-relaxed"
          style={{ color: onDark ? "#FFFFFF" : "#3B3E3D" }}
        >
          {body}
        </p>

        <a
          href={concern.href}
          className="mt-2 inline-flex h-11 items-center justify-center rounded-md px-5 text-base transition-opacity hover:opacity-90"
          style={{ backgroundColor: buttonBg, color: buttonTextColor }}
        >
          Shop now
        </a>
      </div>
    </div>
  );
}
