import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { HH_BASE_METADATA } from "@/data/site-content";
import { HHShell } from "@/components/hh/HHShell";
import { PromoBar } from "@/components/hh/layout/PromoBar";
import { Header } from "@/components/hh/layout/Header";
import { Footer } from "@/components/hh/layout/Footer";
import { ProductBreadcrumb } from "@/components/hh/product/ProductBreadcrumb";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { ContentCardCarousel } from "@/components/hh/content/ContentCardCarousel";
import { getCardsForRoute } from "@/data/cards";
import { HH_ARTICLES, getArticleBySlug } from "@/data/articles";

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * `mainContent` is stored as a single string with real `\n` line breaks,
 * most lines prefixed "• " (see `src/data/content/articles-derived.json`).
 * Rendering it as one `whitespace-pre-line` blob (the old behaviour) drew
 * "•" as plain text inside a paragraph rather than a real list — reads as
 * unedited scraped copy. This groups consecutive "• "-prefixed lines into a
 * real `<ul><li>`, and renders anything else as a normal paragraph. Pure
 * render-time parsing — the underlying data string is untouched.
 */
function ArticleBody({ text }: { text: string }) {
  const lines = text.split("\n").filter((line) => line.trim().length > 0);
  const blocks: { type: "list" | "p"; lines: string[] }[] = [];

  for (const line of lines) {
    const isBullet = line.trimStart().startsWith("• ");
    const content = isBullet ? line.trimStart().slice(2) : line;
    const last = blocks[blocks.length - 1];
    const type = isBullet ? "list" : "p";
    if (last && last.type === type) {
      last.lines.push(content);
    } else {
      blocks.push({ type, lines: [content] });
    }
  }

  return (
    <div className="mt-8 space-y-4 hh-body text-hh-ink">
      {blocks.map((block, i) =>
        block.type === "list" ? (
          <ul key={i} className="list-disc space-y-2 pl-5">
            {block.lines.map((line, j) => (
              <li key={j}>{line}</li>
            ))}
          </ul>
        ) : (
          block.lines.map((line, j) => <p key={`${i}-${j}`}>{line}</p>)
        )
      )}
    </div>
  );
}

export function generateStaticParams() {
  return HH_ARTICLES.map((art) => ({ slug: art.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const art = getArticleBySlug(slug);
  if (!art) return HH_BASE_METADATA;
  return { ...HH_BASE_METADATA, title: art.title, description: art.intro || HH_BASE_METADATA.description };
}

export default async function BaiVietDetailPage({ params }: Props) {
  const { slug } = await params;
  const art = getArticleBySlug(slug);
  if (!art) notFound();

  return (
    <HHShell>
      <PromoBar />
      <Header />
      <main className="mx-auto w-full max-w-[900px] flex-1 px-4 py-6 md:px-8">
        <ProductBreadcrumb
          items={[{ label: "Trang chủ", href: "/" }, { label: "Bài viết", href: "/bai-viet" }, { label: art.title }]}
        />

        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-md bg-hh-cream">
          {art.image ? (
            <Image src={art.image} alt={art.title} fill sizes="900px" className="object-cover" priority />
          ) : (
            <ProductPlaceholderArt colorFrom="#e08a3e" colorTo="#204a37" className="h-full w-full" />
          )}
        </div>

        <div className="mx-auto max-w-[65ch]">
          {art.topic && <p className="mt-6 text-xs uppercase tracking-wide text-hh-primary">{art.topic}</p>}
          <h1 className="mt-2 hh-heading-page text-hh-ink">{art.title}</h1>
          {art.intro && <p className="mt-3 hh-body-lg text-hh-muted-foreground">{art.intro}</p>}

          {art.mainContent && <ArticleBody text={art.mainContent} />}
        </div>

        <ContentCardCarousel cards={getCardsForRoute(`/bai-viet/${slug}`)} heading="Nội dung liên quan" />
      </main>
      <Footer />
    </HHShell>
  );
}
