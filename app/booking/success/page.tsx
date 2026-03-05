import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#1A1A1A] flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-32 px-6 text-center mt-10">
        <div className="bg-white p-12 md:p-16 border border-gray-100 shadow-sm max-w-2xl w-full flex flex-col items-center">
          <CheckCircle2 className="w-20 h-20 text-[#2C3E2E] mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-medium mb-6">
            Booking Confirmed
          </h1>
          <p className="text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">
            Thank you for your deposit. Your booking has been confirmed and we
            will be in touch shortly with further details about your expedition.
          </p>
          <Link
            href="/tours"
            className="bg-[#2C3E2E] text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#1A261C] transition-colors"
          >
            Return to Expeditions
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
