"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function Introduction() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 block">
              [ Welcome to ShutterWild ]
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-8 leading-tight">
              Curated Photographic <br />
              Experiences{" "}
              <span className="font-bold border-b-2 border-black pb-1">
                WORLDWIDE.
              </span>
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Welcome to ShutterWild Expedition Ltd — a specialist wildlife
              photography tour company dedicated to delivering carefully curated
              photographic experiences across the UK and worldwide.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our expeditions are designed for passionate photographers who
              value ethical wildlife encounters, strong fieldcraft, prime
              locations, and meaningful time in the field. Every tour is built
              around light, behaviour, positioning, and patience — ensuring you
              return home with powerful, portfolio-worthy images.
            </p>
            <p className="font-serif text-xl md:text-2xl font-medium italic text-gray-800 border-l-4 border-black pl-6 my-8">
              &quot;We don&apos;t just organise trips — we create opportunities
              to capture the extraordinary.&quot;
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Led by an award-winning and internationally published wildlife
              photographer whose work has been featured in the prestigious
              Wildlife Photographer of the Year Yearbook, ShutterWild Expedition
              is built on professionalism, preparation, and respect for nature.
            </p>
          </motion.div>

          {/* Features Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-[#F4F4F0] p-10 md:p-14 lg:p-16 rounded-sm shadow-sm"
          >
            <h3 className="font-serif text-3xl mb-8">Why Choose Us?</h3>
            <ul className="space-y-6">
              {[
                "Small, carefully managed groups for personalised attention",
                "Photography-focused itineraries designed around light and behaviour",
                "Ethical and responsible wildlife approach",
                "Expert-led guidance and fieldcraft",
                "Carefully selected accommodation and seamless logistics",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="min-w-[4px] h-[4px] bg-black rounded-full mt-2.5" />
                  <span className="text-gray-700 leading-relaxed font-medium">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-12">
              <a
                href="#tours"
                className="inline-block border border-black px-8 py-3 text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
              >
                Explore Our Tours
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
