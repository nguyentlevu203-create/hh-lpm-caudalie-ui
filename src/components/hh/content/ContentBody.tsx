/**
 * Renders a block of text stored as a single string with real `\n` line
 * breaks, where some lines are prefixed "• " (see
 * `src/data/content/articles-derived.json` and
 * `src/data/content/content-pages-derived.json`). Rendering it as one
 * `whitespace-pre-line` blob draws "•" as plain text inside a paragraph
 * rather than a real list — reads as unedited scraped copy. This groups
 * consecutive "• "-prefixed lines into a real `<ul><li>`, and renders
 * anything else as a normal paragraph. Pure render-time parsing — the
 * underlying data string is untouched.
 *
 * Originally written for the article detail page (P0/V3); reused as-is for
 * the brand-content detail page (P2.6) — 9/15 `content-pages-derived.json`
 * entries have the same "• "-prefixed `sections` text and were rendering
 * fake bullets via `whitespace-pre-line` before this.
 */
export function ContentBody({ text, className }: { text: string; className?: string }) {
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
    <div className={className ?? "space-y-4 hh-body text-hh-ink"}>
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
