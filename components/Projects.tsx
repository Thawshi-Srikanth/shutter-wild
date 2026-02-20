'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: "Territory Of The Deep",
    description: "We documented territorial displays and subtle interactions in calm, green pools. These massive beings moved with force and calm.",
    year: "2025",
    location: "Australia, DAR",
    service: "Savanna Stories",
    image: "https://picsum.photos/id/1003/1200/800" // Placeholder for Hippos
  },
  {
    id: 2,
    title: "Skyline Song And Silence",
    description: "Far from roads, we documented rare species in undisturbed treetops. Each sighting was fleeting, precious, and sharp.",
    year: "2025",
    location: "Tanzania, ARU",
    service: "Birds Watching",
    image: "https://picsum.photos/id/1025/1200/800" // Placeholder for Birds
  },
  {
    id: 3,
    title: "Patterns In The Wild",
    description: "We followed a small zebra group through vast plains. Natural light at angles brought their beauty and order to life.",
    year: "2025",
    location: "Botswana, MUN",
    service: "Safari Stories",
    image: "https://picsum.photos/id/1074/1200/800" // Placeholder for Zebras/Lions
  }
];

export default function Projects() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#F4F4F0] text-[#1A1A1A]">
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">[ Featured Projects ]</span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium">
          Stories From The <span className="font-bold">WILD WORLD.</span>
        </h2>
      </div>

      <div className="space-y-24">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
          >
            <div className="lg:col-span-8 relative aspect-[16/10] overflow-hidden rounded-sm">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                unoptimized
              />
            </div>
            
            <div className="lg:col-span-4 flex flex-col justify-end h-full pb-4">
              <h3 className="font-serif text-3xl md:text-4xl mb-4 leading-tight">{project.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-md">
                {project.description}
              </p>
              
              <div className="grid grid-cols-3 gap-4 border-t border-gray-300 pt-6">
                <div>
                  <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Year</span>
                  <span className="text-sm font-medium">{project.year}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Location</span>
                  <span className="text-sm font-medium">{project.location}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Service</span>
                  <span className="text-sm font-medium">{project.service}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
