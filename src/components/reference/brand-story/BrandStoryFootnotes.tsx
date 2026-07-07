import { FOOTNOTES } from "@/components/reference/brand-story/data";

export function BrandStoryFootnotes() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-center text-xs text-muted-foreground">
      {FOOTNOTES.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}
