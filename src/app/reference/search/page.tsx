import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { SearchResultsView } from "@/components/reference/search/SearchResultsView";

export default function SearchReferencePage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        <SearchResultsView />
      </main>
      <Footer />
    </>
  );
}
