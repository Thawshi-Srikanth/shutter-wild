"use client";

import { motion } from "motion/react";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-[#1A1A1A] text-white pt-24 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/captures/Norway Winter/goshawk-forest-winter-norway.webp" // Goshawk
          alt="Footer Background"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent" />
      </div>

      <div className="relative z-10 text-center mb-24">
        <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4 block">
          [ Start Capturing ]
        </span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl mb-6">
          Start Your Wildlife Photo Journey <br />
          Today{" "}
          <span className="font-bold border-b border-white pb-2">
            WITH SHUTTER WILD.
          </span>
        </h2>
        <p className="text-white/60 max-w-xl mx-auto mb-10 text-sm md:text-base">
          From deep jungles to desert dunes, Shutter Wild offers more than
          photos—we capture wild emotion, texture, and truth. Join us in telling
          nature&apos;s tale.
        </p>
        <button className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors">
          View Expeditions
        </button>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-white/10 pt-12">
        <div>
          <h4 className="font-serif text-xl mb-6">Find And Follow Us</h4>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/thinesht"
              className="hover:text-gray-300 transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/thineshtphotography"
              className="hover:text-gray-300 transition-colors"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-8 text-sm text-white/70">
          <div className="space-y-3">
            <h5 className="text-white font-bold uppercase text-xs tracking-wider mb-4">
              Explore
            </h5>
            <a
              href="/about"
              className="block hover:text-white transition-colors"
            >
              About Us
            </a>
            <a
              href="/tours"
              className="block hover:text-white transition-colors"
            >
              Expeditions
            </a>
            <a
              href="/gallery"
              className="block hover:text-white transition-colors"
            >
              Gallery
            </a>
            <a href="/faq" className="block hover:text-white transition-colors">
              FAQ
            </a>
          </div>
          <div className="space-y-3">
            <h5 className="text-white font-bold uppercase text-xs tracking-wider mb-4">
              Connect
            </h5>
            <a
              href="/contact"
              className="block hover:text-white transition-colors"
            >
              Contact Us
            </a>
            <a
              href="https://www.instagram.com/thineshtphotography"
              className="block hover:text-white transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-xl mb-6">
            Subscribe To Our Newsletter
          </h4>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="e.g. hello@email.com"
              className="bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
            />
            <button className="bg-[#2C3E2E] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#1A261C] transition-colors">
              Subscribe
            </button>
          </form>
          <p className="text-[10px] text-white/40 mt-4 leading-tight">
            Join our newsletter and receive stunning wildlife imagery, field
            notes, and seasonal booking updates.
          </p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-white/10 text-xs text-white/40">
        <div className="flex flex-col mb-4 md:mb-0">
          <div className="flex gap-8 mb-2">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>474 - 937 - 8270</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>mail@yoursite.com</span>
            </div>
          </div>
          <div className="text-[10px] text-white/30 flex flex-col gap-0.5 mt-2">
            <p className="font-semibold text-white/40">
              SHUTTERWILD EXPEDITIONS LTD
            </p>
            <p>Company Number: 17011318</p>
            <p>Registered in England and Wales</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href="/privacy-policy"
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="/cookie-policy"
            className="hover:text-white transition-colors"
          >
            Cookie Policy
          </a>
          <a
            href="/terms-of-service"
            className="hover:text-white transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
