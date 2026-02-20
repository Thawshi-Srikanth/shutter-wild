"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { tours } from "@/data/tours";

export default function ExperienceScroll() {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const updateRange = () => {
      if (scrollContainerRef.current) {
        // Total width of the horizonal scrolling container minus the viewport width.
        // This gives the exact number of pixels we need to shift left to reach the end.
        const range =
          scrollContainerRef.current.scrollWidth - window.innerWidth;
        setScrollRange(range > 0 ? range : 0);
      }
    };

    updateRange();
    window.addEventListener("resize", updateRange);
    return () => window.removeEventListener("resize", updateRange);
  }, []); // Run on mount and window resize

  // Interpolate from 0 pixels to -scrollRange pixels
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section
      ref={targetRef}
      // Increased height to 600vh to make the scroll speed slower and smoother
      className="relative h-[600vh] bg-[#F4F4F0] text-[#1A1A1A]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        {/* Header absolute positioned at top, like original design */}
        <div className="absolute top-24 left-6 md:left-12 lg:left-24 z-10 w-full max-w-xl pointer-events-none">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">
            [ Join Our Journeys ]
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium">
            Upcoming <span className="font-bold">EXPEDITIONS.</span>
          </h2>
        </div>

        <motion.div
          ref={scrollContainerRef}
          style={{ x }}
          // Added mt-32 md:mt-48 to push cards down so they don't overlap the absolute header
          className="flex w-max items-center pl-6 md:pl-12 lg:pl-24 gap-6 md:gap-12 pr-[10vw] mt-32 md:mt-48"
        >
          {tours.map((tour) => (
            <Link
              href={`/tours/${tour.slug}`}
              key={tour.id}
              className="w-[85vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0 h-[50vh] md:h-[60vh] flex flex-col justify-end relative rounded-sm overflow-hidden group"
            >
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                unoptimized
              />
              {/* Dark overlay specifically behind text for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              <div className="relative z-10 p-8 md:p-12 text-white">
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4 leading-none text-white drop-shadow-lg">
                  {tour.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-md drop-shadow-md line-clamp-2">
                  {tour.overview}
                </p>

                <div className="grid grid-cols-3 gap-4 border-t border-white/30 pt-4">
                  <div>
                    <span className="block text-xs text-white/50 uppercase tracking-wider mb-1">
                      Date
                    </span>
                    <span className="text-sm font-medium line-clamp-1">
                      {tour.date}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-white/50 uppercase tracking-wider mb-1">
                      Location
                    </span>
                    <span className="text-sm font-medium">{tour.location}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-white/50 uppercase tracking-wider mb-1">
                      Limit
                    </span>
                    <span className="text-sm font-medium">
                      {tour.maxPhotographers} Guests
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
