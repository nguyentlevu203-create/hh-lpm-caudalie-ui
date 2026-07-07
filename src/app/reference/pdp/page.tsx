import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { CategoryBreadcrumb } from "@/components/reference/category/CategoryBreadcrumb";
import { ProductGallery } from "@/components/reference/pdp/ProductGallery";
import { ProductBuyBox } from "@/components/reference/pdp/ProductBuyBox";
import { ProductDescription } from "@/components/reference/pdp/ProductDescription";
import { ProductAccordions } from "@/components/reference/pdp/ProductAccordions";
import { TrustBadges } from "@/components/reference/pdp/TrustBadges";
import { ProductReviews } from "@/components/reference/pdp/ProductReviews";
import { RelatedProducts } from "@/components/reference/pdp/RelatedProducts";

export default function ProductDetailReferencePage() {
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
              { label: "Serums", href: "/reference/category" },
              { label: "Dark Spot Brightening Serum Vitamin C Alternative - 30ml" },
            ]}
          />

          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
            <ProductGallery />
            <ProductBuyBox />
          </div>

          <ProductDescription />
          <ProductAccordions />
          <TrustBadges />
          <ProductReviews />
          <RelatedProducts />
        </div>
      </main>
      <Footer />
    </>
  );
}
