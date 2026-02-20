'use client';

import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Solo Coverage",
    description: "Great for individuals needing discreet mobile documentation.",
    price: "$950",
    features: ["1-day shoot - Flexible field hours", "25 edited photos - High-res deliver", "RAW access - Optional add-on", "Location help - Permits & prep", "Stealth gear - Camouflaged tools", "Gallery link - Private download"]
  },
  {
    name: "Production Team",
    description: "Perfectly ideal for series or campaigns needing pro coverage.",
    price: "$2,200",
    features: ["3-day shoot - Mixed terrain", "50+ images - Color-graded", "Drone footage - Aerial shots", "Creative prep - Vision call", "On-site edit - Live previews", "Media license - Broadcast use"]
  },
  {
    name: "Conservation Project",
    description: "Best for NGOs documenting wildlife, habitat preservation.",
    price: "$3,500",
    features: ["5-day shoot - Multi-area", "100+ images - Story-led", "Interviews - With field researchers", "Data visuals - Maps & charts", "Usage rights - Shared license", "Delivery kit - Web & print"]
  }
];

export default function Pricing() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#F4F4F0] text-[#1A1A1A]">
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">[ Simple Rates ]</span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium">
          Transparent Pricing For <span className="font-bold">WILD MOMENTS.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
          >
            <h3 className="font-serif text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-sm text-gray-500 mb-6 min-h-[40px]">{plan.description}</p>
            
            <div className="flex items-baseline mb-8">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-sm text-gray-400 ml-2">/project</span>
            </div>

            <button className="w-full bg-[#2C3E2E] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#1A261C] transition-colors mb-8">
              Get Started
            </button>

            <ul className="space-y-4">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start text-sm text-gray-600">
                  <Check size={16} className="text-[#2C3E2E] mr-3 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
