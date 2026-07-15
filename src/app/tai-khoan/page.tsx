import type { Metadata } from "next";
import { HH_BASE_METADATA } from "@/data/site-content";
import { HHShell } from "@/components/hh/HHShell";
import { TaiKhoanContent } from "@/components/hh/account/TaiKhoanContent";

export const metadata: Metadata = { ...HH_BASE_METADATA, title: "Tài khoản của tôi" };

export default function TaiKhoanPage() {
  return (
    <HHShell>
      <TaiKhoanContent />
    </HHShell>
  );
}
