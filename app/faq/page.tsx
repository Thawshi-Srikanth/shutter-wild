import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQComponent from "@/components/FAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Common questions about our wildlife photography expeditions, booking process, equipment requirements, and travel logistics.",
};

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
