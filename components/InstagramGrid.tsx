"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Instagram } from "lucide-react";

// Mocking the feed with visually stunning placeholders
const instaPosts = [
  "https://picsum.photos/id/1024/600/600",
  "https://picsum.photos/id/1074/600/600",
  "https://picsum.photos/id/1083/600/600",
  "https://picsum.photos/id/1036/600/600",
  "https://picsum.photos/id/1012/600/600",
  "https://picsum.photos/id/1043/600/600",
  "https://picsum.photos/id/1003/600/600",
  "https://picsum.photos/id/1025/600/600",
];

export default function InstagramGrid() {
  return (
    <section className="py-24 bg-white text-[#1A1A1A]">
      <div className="text-center mb-12 px-6">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">
          [ Follow The Journey ]
        </span>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-6">
          <a
            href="https://www.instagram.com/thineshtphotography"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors flex items-center justify-center gap-4"
          >
            @thineshtphotography{" "}
            <Instagram size={36} className="text-gray-400" />
          </a>
        </h2>
      </div>

      {/* Grid wrapper extending full width without gaps on mobile, slight gaps on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 w-full">
        {instaPosts.map((src, index) => (
          <motion.a
            key={index}
            href="https://www.instagram.com/thineshtphotography"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className="relative aspect-square overflow-hidden group block"
          >
            <Image
              src={src}
              alt="Instagram Post Placeholder"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              unoptimized
            />

            {/* Hover overlay with Instagram Icon */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <Instagram
                size={32}
                className="text-white transform scale-50 group-hover:scale-100 transition-transform duration-300"
              />
            </div>
          </motion.a>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <a
          href="https://www.instagram.com/thineshtphotography"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 w-fit"
        >
          View Full Gallery on Instagram
        </a>
      </div>
    </section>
  );
}
