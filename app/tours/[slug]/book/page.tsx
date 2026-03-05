import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { tours } from "@/data/tours";
import { ArrowLeft } from "lucide-react";
import BookingForm from "@/components/BookingForm";

export async function generateStaticParams() {
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = tours.find((t) => t.slug === slug);

  if (!tour) {
    notFound();
  }

  const priceAmount = tour.price.split(" ")[0] || "TBA";
  const formattedDeposit = `£${tour.nonRefundableDeposit}`;

  const tourSummary = {
    title: tour.title,
    date: tour.date,
    priceAmount,
    formattedDeposit,
    depositAmount: tour.nonRefundableDeposit,
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#1A1A1A]">
      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto w-full">
        <Link
          href={`/tours/${tour.slug}`}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-12 text-sm uppercase tracking-widest font-bold transition-colors"
        >
          <ArrowLeft size={16} /> Back to Expedition
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-12">
          Booking Form
        </h1>

        <BookingForm tour={tourSummary} />
      </main>

      <Footer />
    </div>
  );
}
