import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { CategoryBreadcrumb } from "@/components/reference/category/CategoryBreadcrumb";
import { CategoryHeading } from "@/components/reference/category/CategoryHeading";
import { ProductFilterDrawer } from "@/components/reference/category/ProductFilterDrawer";
import { ProductGrid } from "@/components/reference/category/ProductGrid";

export default function CategoryReferencePage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-6 md:px-8">
          <CategoryBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "All products", href: "#" },
              { label: "Face", href: "#" },
              { label: "Serums" },
            ]}
          />

          <CategoryHeading
            title="Serums"
            description="A daily serum can help visibly improve dullness, dark spots, fine lines and blemishes. For best results, pair it with a moisturiser from the same collection."
          />

          <div className="mt-8 flex justify-end">
            <ProductFilterDrawer />
          </div>

          <div className="mt-6 pb-16">
            <ProductGrid />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
