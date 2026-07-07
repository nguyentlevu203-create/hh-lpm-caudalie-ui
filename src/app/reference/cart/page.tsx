import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { CartDrawer } from "@/components/reference/cart/CartDrawer";

export default function CartReferencePage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center">
        <p className="text-2xl text-primary">Continue shopping</p>
        <p className="mt-2 max-w-md text-base text-muted-foreground">
          This page represents whatever you were browsing before opening the
          cart — the drawer overlays it, matching the live site&apos;s
          `/checkout/cart` behaviour.
        </p>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
