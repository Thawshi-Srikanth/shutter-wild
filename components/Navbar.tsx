"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { name: "Expeditions", href: "/tours" },
  { name: "Our Approach", href: "/#approach" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll detection for background/text color toggle
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Determine navbar aesthetics based on route and scroll state
  const isHomePage = pathname === "/";
  // If we are on the tours list page, the background is light, so we want black text initially.
  // If we are on a tour detail page, the hero is dark, so we want white text initially.
  // If we have scrolled past hero, we might want to invert. For simplicity, we'll assign a base color:
  const isTourDetailPage = pathname.startsWith("/tours/");
  const isToursListPage = pathname === "/tours";

  let navClasses = "bg-transparent text-white";

  if (isOpen) {
    navClasses = "bg-transparent text-white";
  } else if (scrolled) {
    navClasses = "bg-white/90 backdrop-blur-md text-[#1A1A1A] shadow-sm";
  } else if (isToursListPage) {
    navClasses = "bg-transparent text-[#1A1A1A]";
  } else {
    // Default for top of Home and Tour Detail pages (dark hero)
    navClasses = "bg-transparent text-white";
  }

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center transition-all duration-300 ${navClasses}`}
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="text-2xl font-serif font-bold tracking-tighter relative z-[60]"
        >
          SHUTTER WILD
        </Link>

        <button
          className="relative z-[60] hover:opacity-70 transition-opacity"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>

      {/* Full Screen Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-[#1A1A1A] flex flex-col justify-center px-6 md:px-24"
          >
            <div className="flex flex-col gap-6 md:gap-10">
              {navLinks.map((link, i) => (
                <div key={link.name} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{
                      duration: 0.8,
                      delay: 0.1 * i,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="font-serif text-5xl md:text-7xl lg:text-8xl text-white hover:text-gray-400 transition-colors inline-block"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-white/50 text-sm border-t border-white/10 pt-8"
            >
              <div>
                <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-xs">
                  Contact
                </h4>
                <p>hello@shutterwild.com</p>
                <p>+44 790 123 4567</p>
              </div>
              <div>
                <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-xs">
                  Social
                </h4>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
