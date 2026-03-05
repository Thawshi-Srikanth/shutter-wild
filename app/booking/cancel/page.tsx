import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { XCircle } from "lucide-react";

export default function BookingCancelPage() {
  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#1A1A1A] flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-32 px-6 text-center mt-10">
        <div className="bg-white p-12 md:p-16 border border-gray-100 shadow-sm max-w-2xl w-full flex flex-col items-center">
          <XCircle className="w-20 h-20 text-red-800 mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-medium mb-6">
            Booking Cancelled
          </h1>
          <p className="text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">
            Your payment was cancelled and no charges were made. If you
            experienced an issue, please try again or contact us for assistance.
          </p>
          <Link
            href="/tours"
            className="bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            View Expeditions
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
