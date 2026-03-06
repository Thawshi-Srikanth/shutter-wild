"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button if we scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link
      href="https://wa.me/447557763222"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 flex items-center justify-center group ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto hover:scale-110"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </Link>
  );
}
