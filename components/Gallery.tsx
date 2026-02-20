'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const galleryImages = [
  {
    id: 1,
    title: "Tropical Birds",
    tags: ["Toucan-Bird", "Perch", "Vibrant", "Macro"],
    image: "https://picsum.photos/id/1024/800/600" // Toucan
  },
  {
    id: 2,
    title: "Predators In Action",
    tags: ["Lions", "Motion-Blur", "Gold", "Dusk"],
    image: "https://picsum.photos/id/1074/800/600" // Lion
  },
  {
    id: 3,
    title: "Savanna Moments",
    tags: ["Hartebeest", "Sunset", "Fight", "Herd"],
    image: "https://picsum.photos/id/1083/800/600" // Savanna
  },
  {
    id: 4,
    title: "Mountain Dwellers",
    tags: ["Ibex", "Panorama", "Cliff", "Distance"],
    image: "https://picsum.photos/id/1036/800/600" // Mountain
  },
  {
    id: 5,
    title: "Primates In Motion",
    tags: ["Chimpanzee", "Grooming", "Forest-Light", "Candid"],
    image: "https://picsum.photos/id/1012/800/600" // Primate
  },
  {
    id: 6,
    title: "Reptile Realm",
    tags: ["Chameleon", "Textures", "Focus", "Camouflaged"],
    image: "https://picsum.photos/id/1043/800/600" // Reptile
  }
];

export default function Gallery() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#2C3E2E] text-white">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2 block">[ Through Our Lens ]</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium">
            Stories From <span className="font-bold">THE WILDERNESS.</span>
          </h2>
        </div>
        <button className="mt-8 md:mt-0 border border-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors">
          View All Photos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryImages.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              unoptimized
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h3 className="font-serif text-2xl mb-2">{item.title}</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] uppercase tracking-wider bg-white/20 px-2 py-1 rounded-sm backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
