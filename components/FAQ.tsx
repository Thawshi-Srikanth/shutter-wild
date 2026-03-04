"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "Who are these expeditions suitable for?",
    answer:
      "Our tours are suitable for passionate wildlife photographers — from serious enthusiasts to advanced shooters. You should be comfortable operating your camera manually and working in natural outdoor conditions. If you are unsure about suitability, we are happy to discuss your experience level before booking.",
  },
  {
    question: "What level of photography experience is required?",
    answer:
      "A good understanding of exposure (aperture, shutter speed, ISO) is recommended. These expeditions are photography-focused, and field conditions may require quick adjustments. Guidance will be provided throughout the trip.",
  },
  {
    question: "What camera gear should I bring?",
    answer:
      "We recommend: A DSLR or mirrorless camera body, a telephoto lens (400mm or longer recommended for wildlife), spare batteries and memory cards, and weather-appropriate clothing. Detailed gear guidance will be provided prior to departure for each specific expedition.",
  },
  {
    question: "Are the tours ethical?",
    answer:
      "Yes. Ethical wildlife practice is at the core of ShutterWild Expeditions. We work with trusted local partners and follow responsible fieldcraft principles. Wildlife welfare always comes before photography.",
  },
  {
    question: "How many participants are on each trip?",
    answer:
      "Our expeditions are intentionally small — typically 3 to 6 participants — ensuring personalised attention and better photographic opportunities.",
  },
  {
    question: "What is included in the expedition price?",
    answer:
      "Inclusions vary by destination but typically include: Accommodation, Local ground transport, Photography guiding, and Access permits where required. Full inclusions and exclusions are listed on each expedition page.",
  },
  {
    question: "Are international flights included?",
    answer:
      "No. International flights are not included unless explicitly stated. Participants are responsible for arranging their own flights to the designated meeting point.",
  },
  {
    question: "How physically demanding are the tours?",
    answer:
      "Some tours involve cold conditions, early mornings, or moderate walking in natural terrain. Specific details are provided on each expedition page so you can assess suitability.",
  },
  {
    question: "What happens after I book?",
    answer:
      "Once your deposit is received, you will receive: A booking confirmation, A detailed itinerary, A preparation and gear guide, and A WhatsApp group link (if applicable). We remain available for support and preparation guidance before departure.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "A deposit is required to secure your place. Deposits are generally non-refundable unless the expedition is cancelled by us. Full cancellation terms are outlined in our Terms & Conditions.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#F4F4F0] text-[#1A1A1A]">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">
            [ Ask Away ]
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium">
            Everything You <span className="font-bold">NEED TO KNOW.</span>
          </h2>
        </div>
        <Link
          href="/contact"
          className="mt-8 md:mt-0 bg-[#2C3E2E] text-white px-8 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#1A261C] transition-colors inline-block"
        >
          Contact Us
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300">
            <button
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
              className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
            >
              <span className="font-serif text-lg md:text-xl group-hover:text-[#2C3E2E] transition-colors">
                {faq.question}
              </span>
              <span className="text-gray-400 group-hover:text-[#2C3E2E] transition-colors">
                {activeIndex === index ? (
                  <Minus size={20} />
                ) : (
                  <Plus size={20} />
                )}
              </span>
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
