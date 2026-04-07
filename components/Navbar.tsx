"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Expeditions", href: "/tours" },
  { name: "Gallery", href: "/gallery" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
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
  const hasDarkHero = isHomePage;

  let navClasses = "";

  let useWhiteLogo = false;

  if (isOpen) {
    navClasses = "bg-transparent text-white";
    useWhiteLogo = true;
  } else if (scrolled) {
    navClasses = "bg-[#F4F4F0]/90 backdrop-blur-md text-[#1A1A1A]";
    useWhiteLogo = false;
  } else if (hasDarkHero) {
    // Default for top of Home and Tour Detail pages (dark hero)
    navClasses = "bg-transparent text-white";
    useWhiteLogo = true;
  } else {
    // Any other page without a hero image has a light background
    navClasses = "bg-transparent text-[#1A1A1A]";
    useWhiteLogo = false;
  }

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center transition-all duration-300 ${navClasses}`}
      >
        <Link href="/" onClick={closeMenu} className="relative z-[60]">
          <Image
            src={
              useWhiteLogo
                ? "/logos/shutter-wild-white.png"
                : "/logos/shutter-wild-green.png"
            }
            alt="Shutter Wild"
            width={240}
            height={60}
            className="h-8 md:h-10 lg:h-12 w-auto object-contain transition-all duration-300"
            priority
          />
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
            className="fixed inset-0 z-40 bg-[#1A1A1A] flex flex-col justify-top pt-24 px-6 md:px-24 overflow-y-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              {navLinks.map((link, i) => (
                <div
                  key={link.name}
                  className="overflow-hidden flex items-center"
                >
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
                      className="font-serif text-4xl md:text-6xl lg:text-7xl text-white hover:text-gray-400 transition-colors inline-block"
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
                <p>info@shutterwild.co.uk</p>
                <p>+44 790 123 4567</p>
              </div>
              <div>
                <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-xs">
                  Social
                </h4>
                <Link
                  href="https://www.instagram.com/thineshtphotography"
                  target="_blank"
                  className="flex items-center gap-2 hover:text-white transition-colors mb-2"
                >
                  <FaInstagram size={18} /> Instagram
                </Link>
                <Link
                  href="https://www.facebook.com/thinesht"
                  target="_blank"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <FaFacebook size={18} /> Facebook
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
