'use client';

import { motion } from 'motion/react';
import { ArrowUpRight, Camera, Bird, Moon, ScanEye, Mountain, Trees } from 'lucide-react';
import Image from 'next/image';

const services = [
  {
    id: 1,
    title: "Safari Shoots",
    description: "We capture animals in their natural habitat, blending art an adventure to deliver unforgettable wildlife portraits.",
    icon: <Camera size={24} />,
    image: "https://picsum.photos/id/1015/800/600" // Placeholder for Safari
  },
  {
    id: 2,
    title: "Savanna Stories",
    description: "Document life on open plains—from predators stalking prey to herds in motion under golden skies.",
    icon: <Trees size={24} />,
    image: "https://picsum.photos/id/1016/800/600" // Placeholder for Savanna
  },
  {
    id: 3,
    title: "Birds Watching",
    description: "Our photographers document rare birds with high-speed equipment, perfect for documentaries and research use.",
    icon: <Bird size={24} />,
    image: "https://picsum.photos/id/1024/800/600" // Placeholder for Birds
  },
  {
    id: 4,
    title: "Shadow Hunt",
    description: "Step into the dim and quiet corners of the jungle, where elusive creatures roam under fading light.",
    icon: <Mountain size={24} />,
    image: "https://picsum.photos/id/1036/800/600" // Placeholder for Jungle
  },
  {
    id: 5,
    title: "Drone Scouting",
    description: "Aerial wildlife photography from drones to cover large range and capture herds or flocks in their natural formations.",
    icon: <ScanEye size={24} />,
    image: "https://picsum.photos/id/1040/800/600" // Placeholder for Drone
  },
  {
    id: 6,
    title: "Night Vision",
    description: "Low-light and infrared photography to reveal wildlife behavior after sunset in remote locations.",
    icon: <Moon size={24} />,
    image: "https://picsum.photos/id/1043/800/600" // Placeholder for Night
  }
];

export default function Services() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#2C3E2E] text-white">
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2 block">[ Wildsnap Services ]</span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium">
          Crafted To Capture <span className="font-bold">THE WILD.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div 
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative h-80 rounded-xl overflow-hidden bg-black/20 hover:bg-black/40 transition-colors"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                unoptimized
              />
            </div>
            
            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white">
                  {service.icon}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <ArrowUpRight className="text-white" />
                </div>
              </div>
              
              <div>
                <h3 className="font-serif text-2xl mb-2">{service.title}</h3>
                <p className="text-xs text-white/70 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
                  {service.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
