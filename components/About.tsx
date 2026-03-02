"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function About() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#F4F4F0] text-[#1A1A1A]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[4/3] overflow-hidden shadow-2xl">
          <Image
            src="/captures/Sri Lanka/asian-elephant-yala-national-park.webp" // Elephant
            alt="Photographer in the wild"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div className="space-y-8">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">
            [ About Wildsnap ]
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
            Began With A Single Photographer&apos;s Passion For <br />
            <span className="font-bold">WILDLIFE & CONSERVATION.</span>
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-lg">
            Wildsnap is a premier wildlife photography service that specializes
            in capturing the raw beauty of nature and its inhabitants. We
            document wildlife with precision, respect, and artistry—bringing the
            untamed world closer to those who admire it.
          </p>
          <button className="bg-[#2C3E2E] text-white px-8 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#1A261C] transition-colors">
            Read More
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 border-t border-gray-300 pt-12">
        {[
          { label: "Photos Captured", value: "10M+" },
          { label: "Years In The Wild", value: "25+" },
          { label: "Guided Expeditions", value: "500+" },
          { label: "International Awards", value: "75+" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="text-center md:text-left"
          >
            <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              {stat.label}
            </span>
            <span className="font-serif text-4xl md:text-5xl font-bold">
              {stat.value}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
