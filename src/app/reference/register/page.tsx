import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { RegisterForm } from "@/components/reference/register/RegisterForm";

export default function RegisterReferencePage() {
  return (
    <>
      <Header />
      <main className="relative min-h-[70vh] px-4 py-6 md:my-12 md:px-8">
        <RegisterForm />
      </main>
      <Footer />
    </>
  );
}
