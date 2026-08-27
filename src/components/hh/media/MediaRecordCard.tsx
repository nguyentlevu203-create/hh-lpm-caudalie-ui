import Image from "next/image";
import { ImageOff } from "lucide-react";
import type { HHMediaRecord } from "@/data/media-library";

/** Metadata-only tile for the ~700 media rows we never downloaded — no
 * `<img>`/`<Image>` at all (no hotlinking the remote URL), just the
 * imported fields plus a "Chưa tải" status chip. Rows with a resolved
 * `localPath` render the real local file instead. Never renders a broken
 * or blank `<img>`. */
export function MediaRecordCard({ record }: { record: HHMediaRecord }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-sm border border-hh-border bg-hh-cream">
        {record.localPath ? (
          <Image
            src={record.localPath}
            alt={record.altTextVi || record.imageType || "Ảnh thư viện"}
            fill
            sizes="(min-width: 1024px) 20vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 px-3 text-center">
            <ImageOff className="size-6 text-hh-muted-foreground" strokeWidth={1.5} />
            <span className="text-xs text-hh-muted-foreground">Chưa tải</span>
          </div>
        )}
      </div>
      <p className="line-clamp-1 text-xs font-medium text-hh-ink">{record.imageType || "Chưa phân loại"}</p>
      <p className="line-clamp-1 text-xs text-hh-muted-foreground">
        {record.sourceSheet}
        {record.sourceArea ? ` · ${record.sourceArea}` : ""}
      </p>
    </div>
  );
}
