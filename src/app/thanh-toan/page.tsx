import type { Metadata } from "next";
import { HH_BASE_METADATA } from "@/data/site-content";
import { HHShell } from "@/components/hh/HHShell";
import { CheckoutContent } from "@/components/hh/checkout/CheckoutContent";

export const metadata: Metadata = { ...HH_BASE_METADATA, title: "Thanh toán" };

export default function ThanhToanPage() {
  return (
    <HHShell>
      <CheckoutContent />
    </HHShell>
  );
}
