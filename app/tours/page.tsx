import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { tours } from "@/data/tours";
import { ArrowRight, Calendar, Users, MapPin } from "lucide-react";

export const metadata = {
  title: "Expeditions | ShutterWild",
  description:
    "Join ShutterWild on immersive wildlife photography expeditions worldwide.",
};

export default function ToursPage() {
  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#1A1A1A]">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 block">
          [ Our Journeys ]
        </span>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium mb-6">
          Upcoming{" "}
          <span className="font-bold border-b-2 border-black pb-2">
            EXPEDITIONS.
          </span>
        </h1>
        <p className="max-w-2xl text-lg text-gray-600 leading-relaxed font-sans">
          Small-group, expertly curated wildlife photography tours designed for
          passionate photographers who seek ethical wildlife encounters and
          portfolio-worthy images.
        </p>
      </section>

      {/* Tour List */}
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto pb-24">
        <div className="flex flex-col gap-16 md:gap-24">
          {tours.map((tour, index) => (
            <div
              key={tour.id}
              className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 md:gap-16 items-center`}
            >
              {/* Image Container */}
              <div className="w-full lg:w-1/2 aspect-[4/3] md:aspect-[16/10] relative overflow-hidden rounded-sm group">
                <Link href={`/tours/${tour.slug}`}>
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                </Link>
              </div>

              {/* Content Container */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-black/5 px-3 py-1 rounded-full text-gray-700 flex items-center gap-1.5">
                    <MapPin size={12} /> {tour.location}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-black/5 px-3 py-1 rounded-full text-gray-700 flex items-center gap-1.5">
                    <Calendar size={12} /> {tour.date}
                  </span>
                </div>

                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
                  <Link
                    href={`/tours/${tour.slug}`}
                    className="hover:text-gray-600 transition-colors"
                  >
                    {tour.title}
                  </Link>
                </h2>

                <p className="text-gray-600 mb-8 leading-relaxed line-clamp-3">
                  {tour.overview}
                </p>

                <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-10 border-t border-gray-200 pt-6">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                      Duration
                    </span>
                    <span className="text-sm font-medium">{tour.duration}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                      Group Size
                    </span>
                    <span className="text-sm font-medium flex items-center gap-1.5">
                      <Users size={14} className="text-gray-500" /> Max{" "}
                      {tour.maxPhotographers}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                      Investment
                    </span>
                    <span className="text-sm font-medium">{tour.price}</span>
                  </div>
                </div>

                <Link
                  href={`/tours/${tour.slug}`}
                  className="inline-flex items-center gap-2 border border-black border-opacity-20 px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 w-fit group"
                >
                  Explore Expedition
                  <ArrowRight
                    size={16}
                    className="transform group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
