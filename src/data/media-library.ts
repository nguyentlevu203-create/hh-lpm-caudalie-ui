/**
 * Full media library index — all 1161 rows of `08_Thu_vien_anh` (807) +
 * `02_Anh_san_pham` (354), resolved by `scripts/build-media-library-index.mjs`
 * against every image already legitimately downloaded elsewhere in this
 * project (exact imageUrl match — no mass hotlinking of the rest). See
 * `docs/production/HH_LPM_DATA_TO_UI_COVERAGE_AUDIT.md`.
 */
import mediaLibraryDerived from "./content/media-library-derived.json";

export interface HHMediaRecord {
  id: string;
  sourceSheet: string;
  imageType: string | null;
  sourceArea: string | null;
  altTextVi: string | null;
  pagesUsingCount: number | null;
  sampleUsagePage: string | null;
  imageUrl: string | null;
  localPath: string | null;
  downloadStatus: "downloaded" | "not_downloaded";
}

export const HH_MEDIA_LIBRARY: HHMediaRecord[] = mediaLibraryDerived as HHMediaRecord[];

export const MEDIA_SOURCE_SHEETS: string[] = Array.from(
  new Set(HH_MEDIA_LIBRARY.map((r) => r.sourceSheet))
).sort();

export const MEDIA_IMAGE_TYPES: string[] = Array.from(
  new Set(HH_MEDIA_LIBRARY.map((r) => r.imageType).filter((t): t is string => Boolean(t)))
).sort((a, b) => a.localeCompare(b, "vi"));
