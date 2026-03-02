"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail } from "lucide-react";
import Image from "next/image";

interface NewsletterModalContextType {
  openModal: () => void;
  closeModal: () => void;
}

const NewsletterModalContext = createContext<
  NewsletterModalContextType | undefined
>(undefined);

export function useNewsletterModal() {
  const context = useContext(NewsletterModalContext);
  if (!context) {
    throw new Error(
      "useNewsletterModal must be used within a NewsletterModalProvider",
    );
  }
  return context;
}

export function NewsletterModalProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the banner in this session
    const hasSeenNewsletter = sessionStorage.getItem("newsletter_seen");

    if (!hasSeenNewsletter) {
      // Show the banner after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem("newsletter_seen", "true");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the newsletter signup
    console.log("Newsletter signup submitted!");
    setIsVisible(false);
  };

  return (
    <NewsletterModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      <AnimatePresence>
        {isVisible && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-[#1A1A1A] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row z-10"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white/70 hover:text-white hover:bg-black/40 transition-all"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Image Section */}
              <div className="relative w-full md:w-1/2 h-56 md:h-auto">
                <Image
                  src="/captures/Pantanal Jaguar/jaguar-on-tree-pantanal-brazil-2.webp"
                  alt="Wildlife Newsletter"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1A1A1A] via-transparent to-transparent opacity-90 md:opacity-60" />
              </div>

              {/* Content Section */}
              <div className="relative w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4 block">
                    [ Join The Pack ]
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl text-white mb-4 leading-tight">
                    Capture The <br className="hidden md:block" />
                    <span className="italic text-white/80">Wildest</span>{" "}
                    Moments.
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Sign up to receive stunning wildlife imagery, field notes,
                    and exclusive seasonal booking updates directly to your
                    inbox.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                      size={16}
                    />
                    <input
                      type="email"
                      placeholder="Enter your email address..."
                      required
                      className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all rounded-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-white text-black px-6 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors w-full rounded-sm"
                  >
                    Join The Newsletter
                  </button>
                </form>

                <p className="text-[10px] text-white/40 mt-6 text-center">
                  We respect your privacy. No spam, just wild tales.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </NewsletterModalContext.Provider>
  );
}
