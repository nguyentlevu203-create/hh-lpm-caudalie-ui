import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { LoginView } from "@/components/reference/login/LoginView";

export default function LoginReferencePage() {
  return (
    <>
      <Header />
      <main className="relative min-h-[70vh]">
        <LoginView />
      </main>
      <Footer />
    </>
  );
}
