"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What Types Of Wildlife Photography Do You Offer?",
    answer:
      "We offer a wide range of services including safari shoots, bird watching documentation, drone scouting, and night vision photography. We specialize in capturing animals in their natural habitats.",
  },
  {
    question: "Can I Hire Wildsnap For A Specific Animal Project?",
    answer:
      "Yes, absolutely. We can tailor our expeditions to focus on specific species or regions. Contact us to discuss your specific requirements.",
  },
  {
    question: "Do You Offer Guided Wildlife Photography Tours?",
    answer:
      "Yes, we partner with experienced tour guides to offer guided photography tours. These are perfect for enthusiasts looking to learn from professionals in the field.",
  },
  {
    question: "Can I License Your Wildlife Images?",
    answer:
      "Yes, our images are available for licensing for various uses including editorial, commercial, and educational purposes. Please check our licensing page for more details.",
  },
  {
    question: "Can I Collaborate With Wildsnap For Conservation Work?",
    answer:
      "We are passionate about conservation. We actively collaborate with NGOs and conservation groups to document and support their efforts.",
  },
  {
    question: "What Gear Do You Use For Your Shoots?",
    answer:
      "We use top-of-the-line equipment including high-resolution cameras, telephoto lenses, drones, and specialized night vision gear to ensure the best possible quality.",
  },
  {
    question: "What If Weather Conditions Change Suddenly?",
    answer:
      "Wildlife photography often involves unpredictable weather. Our team is experienced in working in various conditions and we always have contingency plans.",
  },
  {
    question: "Is It Safe To Join A Wildsnap Tour?",
    answer:
      "Safety is our top priority. We work with certified guides and follow strict safety protocols to ensure a safe and enjoyable experience for everyone.",
  },
  {
    question: "Do You Offer Post-Processing Services?",
    answer:
      "Yes, all our packages include professional post-processing to ensure your images are polished and ready for use.",
  },
  {
    question: "How Do I Book A Wildlife Shoot?",
    answer:
      "You can book a shoot by contacting us through our website or giving us a call. We'll discuss your needs and create a custom package for you.",
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
        <button className="mt-8 md:mt-0 bg-[#2C3E2E] text-white px-8 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#1A261C] transition-colors">
          Explore FAQs
        </button>
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
