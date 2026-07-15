import type { Metadata } from "next";
import localFont from "next/font/local";
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
  // Staging-wide noindex: this is an internal demo build (HH/LPM UI +
  // /reference), not a production site — no route should be crawled or
  // cached by search engines. Set once here, at the root layout, since
  // Next.js metadata.robots on a page/layout fully REPLACES (not merges
  // with) an ancestor's robots object; no page in this app currently sets
  // its own `robots`, so this one root-level value governs every route,
  // including /reference/*, without needing to touch each page individually.
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${caudalieRegular.variable} ${caudalieLight.variable} ${caudalieBold.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
