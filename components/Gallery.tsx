"use client";

import { motion } from "motion/react";
import { Leaf, Eye, Users } from "lucide-react";

const principles = [
  {
    icon: <Leaf className="w-8 h-8 md:w-12 md:h-12 mb-6 text-gray-400" />,
    title: "Ethical Encounters",
    description:
      "We operate without baiting or disturbance. Nature is unpredictable, and we document it authentically, maintaining safe distances and respecting habitats.",
  },
  {
    icon: <Eye className="w-8 h-8 md:w-12 md:h-12 mb-6 text-gray-400" />,
    title: "Fieldcraft & Instinct",
    description:
      "Every tour is built around interpreting light and predicting behaviour. We prioritise strategic positioning to ensure powerful, portfolio-worthy framing.",
  },
  {
    icon: <Users className="w-8 h-8 md:w-12 md:h-12 mb-6 text-gray-400" />,
    title: "Small-Group Intensity",
    description:
      "By strictly limiting numbers, we guarantee freedom of movement, cleaner shooting angles, and personal guidance in both hides and vehicles.",
  },
];

export default function Gallery() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#2C3E2E] text-white">
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4 block">
          [ Our Philosophy ]
        </span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
          The Photographic{" "}
          <span className="font-bold border-b border-white/30 pb-2">
            APPROACH.
          </span>
        </h2>
        <p className="text-white/80 text-lg leading-relaxed">
          We don&apos;t just organise trips — we create opportunities to capture
          the extraordinary. This means stripping back the tourist noise and
          focusing on what actually matters to serious photographers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 max-w-7xl mx-auto">
        {principles.map((principle, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-500 rounded-sm group cursor-default"
          >
            <div className="transform group-hover:scale-110 transition-transform duration-500">
              {principle.icon}
            </div>
            <h3 className="font-serif text-2xl mb-4 leading-tight">
              {principle.title}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              {principle.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
