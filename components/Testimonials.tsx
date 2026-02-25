"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#F4F4F0] text-[#1A1A1A]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">
            [ Shared Experience ]
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
            Trusted By <span className="font-bold">WILDLIFE EXPERTS.</span>
          </h2>

          <blockquote className="text-xl md:text-2xl font-serif italic leading-relaxed text-gray-700">
            &quot;We invited Wildsnap to join our guided expedition across
            remote trails, and they became part of our crew instantly. They
            moved with care, knew when to wait, and managed to document rare
            species interactions. The results were emotionally compelling and
            visually stunning. Our guests were equally impressed by their
            professionalism.&quot;
          </blockquote>

          <div>
            <cite className="not-italic font-bold text-lg block">
              Sophia Martinez
            </cite>
            <span className="text-sm text-gray-500">
              Tour Guide, Wild Earth Travel
            </span>
          </div>

          <div className="flex gap-2 mt-8">
            <div className="w-2 h-2 bg-black"></div>
            <div className="w-2 h-2 bg-gray-300"></div>
            <div className="w-2 h-2 bg-gray-300"></div>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden shadow-2xl">
          <Image
            src="/captures/Poland Autumn/grey-wolf-poland-autumn-1.webp" // Wolf
            alt="Sophia Martinez"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
