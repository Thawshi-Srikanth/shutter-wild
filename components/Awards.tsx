"use client";

import { motion } from "motion/react";
import Image from "next/image";

const awards = [
  {
    year: "2025",
    category: "Nature Lens",
    title: "Best Jungle Wildlife Capture",
  },
  {
    year: "2024",
    category: "Bird World",
    title: "Outstanding Avian Flight Image",
  },
  {
    year: "2023",
    category: "Wild Frame",
    title: "Top Savanna Wildlife Scene",
  },
  {
    year: "2023",
    category: "Wild Expo",
    title: "Award-Winning Elephant Group Shot",
  },
];

export default function Awards() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#F4F4F0] text-[#1A1A1A]">
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">
          [ Award Winning ]
        </span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium">
          Celebrating Frames <span className="font-bold">THAT INSPIRE.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex justify-between items-center border-b border-gray-300 pb-8 group cursor-pointer hover:border-black transition-colors"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1 block">
                  {award.category}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl group-hover:translate-x-2 transition-transform duration-300">
                  {award.title}
                </h3>
              </div>
              <span className="text-sm font-bold text-gray-400 group-hover:text-black transition-colors">
                {award.year}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="relative aspect-[4/3] overflow-hidden shadow-2xl">
          <Image
            src="https://picsum.photos/id/1062/800/600" // Placeholder for Award Image (Dog/Wolf)
            alt="Award Winning Shot"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
