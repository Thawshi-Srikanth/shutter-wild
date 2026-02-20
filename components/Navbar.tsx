'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center text-white">
      <div className="text-2xl font-serif font-bold tracking-tighter">WILDSNAP</div>
      
      <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide uppercase opacity-90">
        <Link href="#" className="hover:opacity-100 transition-opacity">Home</Link>
        <Link href="#about" className="hover:opacity-100 transition-opacity">About Us</Link>
        <Link href="#projects" className="hover:opacity-100 transition-opacity">Projects</Link>
        <Link href="#services" className="hover:opacity-100 transition-opacity">Services</Link>
        <Link href="#contact" className="hover:opacity-100 transition-opacity">Contact Us</Link>
      </div>

      <div className="hidden md:block">
        <Link href="#contact" className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors">
          Get Started
        </Link>
      </div>

      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md p-6 flex flex-col gap-4 md:hidden"
          >
            <Link href="#" className="text-white hover:text-gray-300">Home</Link>
            <Link href="#about" className="text-white hover:text-gray-300">About Us</Link>
            <Link href="#projects" className="text-white hover:text-gray-300">Projects</Link>
            <Link href="#services" className="text-white hover:text-gray-300">Services</Link>
            <Link href="#contact" className="text-white hover:text-gray-300">Contact Us</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
