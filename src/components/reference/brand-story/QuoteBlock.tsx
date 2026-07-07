import Image from "next/image";

export function QuoteBlock() {
  return (
    <div className="bg-[#F4F3F1] px-4 py-10 text-center md:py-14">
      <p className="mx-auto max-w-2xl text-lg italic leading-relaxed md:text-xl">
        &ldquo;I am personally committed to every formula: Every week I test
        dozens of formulas to choose the most effective and sensorial
        ones.&rdquo;
      </p>
      <Image
        src="/images/reference/brand-story/mathilde-signature.png"
        alt="Mathilde Thomas"
        width={142}
        height={23}
        className="mx-auto mt-4"
      />
      <p className="mt-1 text-sm italic">Co-founder of Caudalie</p>
    </div>
  );
}
