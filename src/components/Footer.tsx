import Image from "next/image";
import { ChevronDown } from "@/components/icons";

interface FooterLinkColumn {
  heading: string;
  links: string[];
}

const linkColumns: FooterLinkColumn[] = [
  {
    heading: "Order online",
    links: [
      "Track my order",
      "My account",
      "My orders",
      "MYCAUDALIE points",
      "Free shipping",
      "Return policy",
      "Payment options",
    ],
  },
  {
    heading: "Services",
    links: [
      "Loyalty program",
      "Skin diagnosis",
      "Find a store",
      "Find an event",
      "eGift Card",
      "Paris Yoga & Pilates Studio",
    ],
  },
  {
    heading: "About Caudalie",
    links: [
      "Our story",
      "1% for the planet",
      "Recruitment & Careers",
      "Sustainability Report",
    ],
  },
  {
    heading: "Need help?",
    links: ["FAQ", "Contact us"],
  },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/caudalie",
    src: "/images/caudalie/icon-instagram.png",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/CaudalieFrance/",
    src: "/images/caudalie/icon-facebook.png",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/Caudalie",
    src: "/images/caudalie/icon-youtube.png",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@caudalie",
    src: "/images/caudalie/icon-tiktok.png",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/caudalie",
    src: "/images/caudalie/icon-linkedin.png",
  },
];

const legalLinks = [
  "Personal data & Cookies",
  "T&C",
  "Legal Note",
  "Loyalty Program",
  "MYCAUDALIE terms",
];

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-4">
        {linkColumns.map((column) => (
          <div key={column.heading}>
            <h3 className="mb-4 text-base font-medium text-black">
              {column.heading}
            </h3>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-base text-black/80 hover:underline">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="bg-secondary p-8 md:col-span-4 lg:col-span-1">
          <h3 className="mb-4 text-xl font-normal text-black">
            Let&apos;s be grape friends
          </h3>
          <form className="flex items-center gap-4">
            <input
              type="email"
              placeholder="Your email address..."
              className="flex-1 border-0 border-b-2 border-[#ccc] bg-transparent px-0 py-2 focus:outline-none"
            />
            <button type="submit" className="text-base text-black">
              OK
            </button>
          </form>
          <div className="mt-6 flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <Image
                  src={social.src}
                  alt={social.name}
                  width={28}
                  height={28}
                />
              </a>
            ))}
          </div>
          <p className="mt-4 text-sm text-black/60">
            By registering, you authorize Caudalie to use your email address
            to send you newsletters and to retain it as part of its Personal
            Data Protection Policy.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 border-t border-border px-8 pb-6 pt-6 text-sm">
        <button
          type="button"
          className="flex items-center gap-2 text-black/80"
        >
          <Image
            src="/images/caudalie/icon-flag-international.svg"
            alt="International"
            width={20}
            height={20}
          />
          <span>International</span>
          <ChevronDown className="size-4" />
        </button>

        {legalLinks.map((link) => (
          <a key={link} href="#" className="text-black/80 hover:underline">
            {link}
          </a>
        ))}

        <span className="text-black/80">© Caudalie Copyright</span>
      </div>
    </footer>
  );
}

export default Footer;
