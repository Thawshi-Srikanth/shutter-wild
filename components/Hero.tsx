'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/id/1003/1920/1080" // Deer/Nature placeholder
          alt="Wildlife Background"
          fill
          className="object-cover opacity-60"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-6"
        >
          Framing The <br />
          Wild, One Click <br />
          <span className="font-bold">AT A TIME.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-md text-sm md:text-base opacity-80 mb-10 leading-relaxed"
        >
          Our work captures rare and real moments in nature that spark storytelling.
          Wildsnap is your visual partner in wildlife preservation and exploration.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-wrap gap-4"
        >
          <button className="bg-white text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center gap-2">
            Work With Us <ArrowRight size={16} />
          </button>
          <button className="border border-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors">
            See Our Projects
          </button>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 md:right-12 z-20">
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <ArrowRight className="transform rotate-90 text-white" size={16} />
        </div>
      </div>
    </section>
  );
}
