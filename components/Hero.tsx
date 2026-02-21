"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });

  // Background moves down half as fast as the scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Image Parallax */}
      <motion.div style={{ y }} className="absolute inset-[-10%] z-0">
        <Image
          src="/images/background-lepeord.png"
          alt="Wildlife Background"
          fill
          className="object-cover opacity-60"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </motion.div>

      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6"
        >
          Immersive Wildlife Photography <br />
          Expeditions Across the UK &{" "}
          <span className="font-bold border-b border-white pb-2">
            WORLDWIDE.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-xl text-sm md:text-base lg:text-lg opacity-80 mb-10 leading-relaxed font-sans"
        >
          Small-group, expertly curated wildlife photography tours designed to
          help you capture powerful, portfolio-worthy images in the natural
          world.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#tours"
            className="bg-white text-black px-8 py-4 text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            View Upcoming Expeditions <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 md:right-12 z-20">
        <div className="w-10 h-10 bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
          <ArrowRight className="transform rotate-90 text-white" size={16} />
        </div>
      </div>
    </section>
  );
}
