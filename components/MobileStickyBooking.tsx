"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface MobileStickyBookingProps {
  tourName: string;
  price: string;
  slug: string;
}

export default function MobileStickyBooking({
  tourName,
  price,
  slug,
}: MobileStickyBookingProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past the hero section (approx 70vh)
      const heroHeight = window.innerHeight * 0.7;
      setIsVisible(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-[80px] left-0 right-0 z-40 bg-white shadow-md border-b border-gray-100 px-6 py-3 lg:hidden flex items-center justify-between animate-in slide-in-from-top-4 duration-300">
      <div>
        <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">
          Investment
        </div>
        <div className="font-serif text-lg font-bold">{price}</div>
      </div>
      <Link
        href={`/tours/${slug}/book`}
        className="bg-[#2C3E2E] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-[#1A261C] transition-colors"
      >
        Book Now
      </Link>
    </div>
  );
}
