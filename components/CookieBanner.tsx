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
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setIsVisible(false);
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      });
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 p-2 md:p-6 pb-4 md:pb-8"
      >
        <div className="max-w-6xl mx-auto bg-[#1A1A1A] border border-white/20 text-white p-4 md:p-6 shadow-2xl flex flex-col md:flex-row items-center md:items-center justify-between gap-4 md:gap-6 relative overflow-hidden text-center md:text-left">
          {/* Subtle background glow/texture could go here */}

          <div className="flex-1 md:pr-0">
            <h3 className="font-serif text-lg md:text-xl mb-1 md:mb-2 pr-6 md:pr-0">
              We value your privacy
            </h3>
            <p className="text-xs md:text-sm text-white/60 leading-relaxed">
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

          <div className="flex flex-row w-full md:w-auto gap-2 md:gap-3 shrink-0 justify-center mt-2 md:mt-0">
            <button
              onClick={handleDecline}
              className="flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 border border-white/20 text-[10px] md:text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-colors text-center"
            >
              Essential Only
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 bg-white text-black text-[10px] md:text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors text-center"
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
