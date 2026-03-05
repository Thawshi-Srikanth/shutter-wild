"use client";

import Link from "next/link";
import { useBookingModal } from "@/components/BookingModalProvider";

interface BookingActionsProps {
  tourName: string;
  slug: string;
}

export default function BookingActions({
  tourName,
  slug,
}: BookingActionsProps) {
  const { openModal } = useBookingModal();

  return (
    <div className="flex flex-col gap-3 mb-8">
      <Link
        href={`/tours/${slug}/book`}
        className="block w-full text-center bg-[#2C3E2E] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#1A261C] transition-colors"
      >
        Book Now
      </Link>
      <button
        onClick={() => openModal(tourName)}
        className="w-full bg-white border border-black text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
      >
        Enquire Now
      </button>
    </div>
  );
}
