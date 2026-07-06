import Image from "next/image";

const INSTAGRAM_POSTS = [
  "/images/caudalie/instagram-post-1.png",
  "/images/caudalie/instagram-post-2.png",
  "/images/caudalie/instagram-post-3.png",
  "/images/caudalie/instagram-post-4.png",
  "/images/caudalie/instagram-post-5.png",
  "/images/caudalie/instagram-post-6.png",
];

function InstagramFeed() {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-normal text-black">
          Follow us on Instagram
        </h2>
        <a
          href="https://www.instagram.com/caudalie"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-black/30 rounded-md px-6 py-3 bg-white text-[#2d1946] flex items-center gap-2"
        >
          <Image
            src="/images/caudalie/icon-instagram.png"
            alt=""
            width={20}
            height={20}
          />
          <span>Follow us on Instagram</span>
        </a>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {INSTAGRAM_POSTS.map((src, index) => (
          <a
            key={src}
            href="https://www.instagram.com/caudaliefrance/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-[200px] md:w-[264px] aspect-square relative"
          >
            <Image
              src={src}
              alt={`Caudalie Instagram post ${index + 1}`}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 264px, 200px"
            />
          </a>
        ))}
      </div>
    </section>
  );
}

export default InstagramFeed;
