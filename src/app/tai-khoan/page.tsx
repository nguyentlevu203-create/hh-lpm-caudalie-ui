import type { Metadata } from "next";
import { HH_BASE_METADATA } from "@/data/site-content";
import { ALWAYS_NOINDEX_ROBOTS } from "@/lib/seo";
import { HHShell } from "@/components/hh/HHShell";
import { TaiKhoanContent } from "@/components/hh/account/TaiKhoanContent";

// P2.9: account route stays noindex regardless of NEXT_PUBLIC_SITE_ENV.
export const metadata: Metadata = { ...HH_BASE_METADATA, title: "Tài khoản của tôi", robots: ALWAYS_NOINDEX_ROBOTS };

export default function TaiKhoanPage() {
  return (
    <HHShell>
      <TaiKhoanContent />
    </HHShell>
  );
}
