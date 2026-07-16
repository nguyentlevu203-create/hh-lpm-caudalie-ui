"use client";

import { useRouter } from "next/navigation";
import { MEDIA_SOURCE_SHEETS, MEDIA_IMAGE_TYPES } from "@/data/media-library";

function buildHref(params: { sheet?: string; type?: string; status?: string }) {
  const search = new URLSearchParams();
  if (params.sheet) search.set("sheet", params.sheet);
  if (params.type) search.set("type", params.type);
  if (params.status) search.set("status", params.status);
  const qs = search.toString();
  return qs ? `/thu-vien-hinh-anh?${qs}` : "/thu-vien-hinh-anh";
}

export function MediaLibraryFilterBar({
  activeSheet,
  activeType,
  activeStatus,
}: {
  activeSheet?: string;
  activeType?: string;
  activeStatus?: string;
}) {
  const router = useRouter();

  const selectClass =
    "rounded-md border border-hh-border bg-white px-3 py-2 text-sm text-hh-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary";

  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={activeSheet ?? ""}
        onChange={(e) =>
          router.push(buildHref({ sheet: e.target.value || undefined, type: activeType, status: activeStatus }))
        }
        className={selectClass}
        aria-label="Lọc theo sheet nguồn"
      >
        <option value="">Tất cả sheet nguồn</option>
        {MEDIA_SOURCE_SHEETS.map((sheet) => (
          <option key={sheet} value={sheet}>
            {sheet}
          </option>
        ))}
      </select>

      <select
        value={activeType ?? ""}
        onChange={(e) =>
          router.push(buildHref({ sheet: activeSheet, type: e.target.value || undefined, status: activeStatus }))
        }
        className={selectClass}
        aria-label="Lọc theo loại ảnh"
      >
        <option value="">Tất cả loại ảnh</option>
        {MEDIA_IMAGE_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select
        value={activeStatus ?? ""}
        onChange={(e) =>
          router.push(buildHref({ sheet: activeSheet, type: activeType, status: e.target.value || undefined }))
        }
        className={selectClass}
        aria-label="Lọc theo trạng thái tải"
      >
        <option value="">Tất cả trạng thái</option>
        <option value="downloaded">Đã tải (hiển thị ảnh local)</option>
        <option value="not_downloaded">Chưa tải (chỉ metadata)</option>
      </select>
    </div>
  );
}
