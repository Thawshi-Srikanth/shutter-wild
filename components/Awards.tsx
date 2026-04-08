"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const awards = [
  {
    year: "2026",
    category: "Animal Behaviour",
    title: "Winter Yawn",
    image: "/awards/winter-yawn.jpg",
  },
  {
    year: "2026",
    category: "Animal Portraits",
    title: "Grace on the Water",
    image: "/awards/grace-on-the-water.jpg",
  },
  {
    year: "2026",
    category: "Black & White",
    title: "Morning Serenade",
    image: "/awards/morning-serenade.jpg",
  },
];

export default function Awards() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#F4F4F0] text-[#1A1A1A]">
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">
          [ Award Winning ]
        </span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium">
          British Wildlife Photography{" "}
          <span className="font-bold">AWARDS 2026</span>
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
              onClick={() => scrollTo(index)}
              className={`flex justify-between items-center border-b pb-8 group cursor-pointer transition-all duration-300 ${
                selectedIndex === index
                  ? "border-black translate-x-4"
                  : "border-gray-300 hover:border-black"
              }`}
            >
              <div>
                <span
                  className={`text-xs font-bold uppercase tracking-widest mb-1 block transition-colors ${
                    selectedIndex === index ? "text-black" : "text-gray-500"
                  }`}
                >
                  {award.category}
                </span>
                <h3
                  className={`font-serif text-2xl md:text-3xl transition-transform duration-300 ${
                    selectedIndex === index ? "font-bold" : ""
                  }`}
                >
                  {award.title}
                </h3>
              </div>
              <span
                className={`text-sm font-bold transition-colors ${
                  selectedIndex === index ? "text-black" : "text-gray-400"
                }`}
              >
                {award.year}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="relative aspect-[4/3] overflow-hidden shadow-2xl group/carousel">
          <div className="embla h-full" ref={emblaRef}>
            <div className="embla__container h-full flex">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className="embla__slide relative flex-[0_0_100%] h-full min-w-0"
                >
                  <Image
                    src={award.image}
                    alt={award.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {awards.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === index
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
