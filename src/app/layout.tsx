import type { Metadata } from "next";
import localFont from "next/font/local";
import { DEFAULT_ROBOTS } from "@/lib/seo";
import "./globals.css";

const caudalieRegular = localFont({
  src: [
    { path: "./fonts/Caudalie-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Caudalie-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-caudalie",
  display: "swap",
});

const caudalieLight = localFont({
  src: [
    { path: "./fonts/Caudalie-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Caudalie-LightItalic.woff2", weight: "300", style: "italic" },
  ],
  variable: "--font-caudalie-light",
  display: "swap",
});

const caudalieBold = localFont({
  src: [{ path: "./fonts/Caudalie-Bold.woff2", weight: "700", style: "normal" }],
  variable: "--font-caudalie-bold",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CAUDALIE: Natural Beauty Skincare ⋅ Face ⋅ Body ⋅ Spa - Caudalie",
  description:
    "CAUDALIE natural skincare: face care, body care, sun care, and fresh fragrances made with grape-derived active ingredients.",
  icons: {
    icon: [
      { url: "/seo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/seo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/seo/apple-touch-icon.png",
    other: [{ rel: "mask-icon", url: "/seo/safari-pinned-tab.svg" }],
  },
  // P2.9: was a hardcoded staging-wide noindex; now reads `DEFAULT_ROBOTS`
  // from `@/lib/seo`, which stays noindex unless `NEXT_PUBLIC_SITE_ENV`
  // is explicitly set to "production" (not done in this branch — see
  // HH_LPM_CAUDALIE_PARITY_P2_REPORT.md §P2.9). Next.js metadata.robots on a
  // page/layout fully REPLACES (not merges with) an ancestor's robots
  // object — /reference/*, /tai-khoan, /thanh-toan, /thu-vien-hinh-anh, and
  // /thu-vien-noi-dung each set their own `ALWAYS_NOINDEX_ROBOTS` so they
  // stay noindex even if this root value ever opens up.
  robots: DEFAULT_ROBOTS,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${caudalieRegular.variable} ${caudalieLight.variable} ${caudalieBold.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
