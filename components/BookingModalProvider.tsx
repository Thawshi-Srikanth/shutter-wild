"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check } from "lucide-react";
import Image from "next/image";

interface BookingModalContextType {
  openModal: (tourName: string) => void;
  closeModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(
  undefined,
);

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error(
      "useBookingModal must be used within a BookingModalProvider",
    );
  }
  return context;
}

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tourName, setTourName] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const openModal = (name: string) => {
    setTourName(name);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setAgreedToTerms(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }
    console.log(`Booking submitted for ${tourName}`);
    setIsOpen(false);
    alert("Thank you for your booking request! We will be in touch shortly.");
  };

  return (
    <BookingModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop Overview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-white text-black shadow-2xl z-10 flex flex-col lg:flex-row overflow-hidden max-h-[90vh]"
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 lg:right-auto lg:left-6 z-20 text-gray-500 hover:text-black lg:text-white/70 lg:hover:text-white transition-colors bg-white/50 lg:bg-black/20 p-2 rounded-full backdrop-blur-sm"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {/* Image Section (Visible on large screens) */}
              <div className="hidden lg:block lg:w-2/5 relative">
                <Image
                  src="https://picsum.photos/id/1018/800/1000" // Example wildlife/nature image
                  alt="Booking nature background"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-12 left-12 right-12 text-white">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2 block">
                    [ Join The Pack ]
                  </span>
                  <p className="font-serif text-3xl leading-tight">
                    Every great journey begins with a single step into the wild.
                  </p>
                </div>
              </div>

              {/* Form Section */}
              <div className="w-full lg:w-3/5 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                <h3 className="font-serif text-3xl mb-2">Book Your Place</h3>
                <p className="text-gray-500 mb-8 text-sm">
                  Secure your spot for:{" "}
                  <span className="font-semibold text-black">{tourName}</span>
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="firstName"
                        className="text-xs font-bold uppercase tracking-widest text-gray-500"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="lastName"
                        className="text-xs font-bold uppercase tracking-widest text-gray-500"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-bold uppercase tracking-widest text-gray-500"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="phone"
                      className="text-xs font-bold uppercase tracking-widest text-gray-500"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="text-xs font-bold uppercase tracking-widest text-gray-500"
                    >
                      Additional Needs (Optional)
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                    ></textarea>
                  </div>

                  <div className="mt-2 flex items-start gap-3">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="peer appearance-none w-5 h-5 border border-gray-300 rounded-sm checked:bg-black checked:border-black transition-colors cursor-pointer"
                      />
                      <Check
                        size={14}
                        className="absolute text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                      />
                    </div>
                    <label
                      htmlFor="terms"
                      className="text-sm text-gray-600 cursor-pointer select-none"
                    >
                      I accept the{" "}
                      <a
                        href="/terms-of-service"
                        className="text-black underline hover:text-gray-600 transition-colors"
                        target="_blank"
                      >
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy-policy"
                        className="text-black underline hover:text-gray-600 transition-colors"
                        target="_blank"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!agreedToTerms}
                    className={`mt-4 px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${
                      agreedToTerms
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Confirm Booking Request
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </BookingModalContext.Provider>
  );
}
