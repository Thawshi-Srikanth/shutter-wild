"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import Link from "next/link";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pb-6 md:pb-8"
      >
        <div className="max-w-6xl mx-auto bg-[#1A1A1A] border border-white/20 text-white p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle background glow/texture could go here */}

          <div className="flex-1 pr-8 md:pr-0">
            <h3 className="font-serif text-xl mb-2">We value your privacy</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              We use cookies to enhance your browsing experience, serve
              personalized content, and analyze our traffic. By clicking
              &quot;Accept All&quot;, you consent to our use of cookies in
              accordance with EU regulations. Read our{" "}
              <Link
                href="/cookie-policy"
                className="underline hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>{" "}
              for more information.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 shrink-0">
            <button
              onClick={handleDecline}
              className="px-6 py-2.5 border border-white/20 text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-colors text-center"
            >
              Essential Only
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors text-center"
            >
              Accept All
            </button>
          </div>

          <button
            onClick={handleDecline}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-1"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
