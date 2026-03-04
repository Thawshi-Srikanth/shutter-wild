import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQComponent from "@/components/FAQ";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#F4F4F0] selection:bg-[#2C3E2E] selection:text-white">
      <Navbar />

      <div className="pt-16">
        <FAQComponent />
      </div>

      <Footer />
    </main>
  );
}
