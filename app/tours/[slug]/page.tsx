import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { tours } from "@/data/tours";
import {
  ArrowLeft,
  Calendar,
  Users,
  MapPin,
  CheckCircle2,
  XCircle,
  Camera,
} from "lucide-react";

export async function generateStaticParams() {
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = tours.find((t) => t.slug === slug);

  if (!tour) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#1A1A1A]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] w-full mt-20">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 w-full px-6 md:px-12 lg:px-24 pb-16 max-w-7xl mx-auto left-0 right-0">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm uppercase tracking-widest font-bold transition-colors"
          >
            <ArrowLeft size={16} /> All Expeditions
          </Link>
          <span className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3 block">
            [ Limited Availability ]
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-medium text-white mb-6">
            {tour.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-white">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
              <MapPin size={14} /> {tour.location}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
              <Calendar size={14} /> {tour.date}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
              <Users size={14} /> Max {tour.maxPhotographers} Guests
            </span>
          </div>
        </div>
      </section>

      {/* Content Container */}
      <section className="px-6 md:px-12 lg:px-24 py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Body */}
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl md:text-4xl mb-6">Overview</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-12">
              {tour.overview}
            </p>

            <h2 className="font-serif text-3xl md:text-4xl mb-8">
              Expedition Focus
            </h2>
            <div className="flex flex-wrap gap-3 mb-16">
              {tour.focusSpecies.map((species) => (
                <span
                  key={species}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-sm text-sm font-medium"
                >
                  {species}
                </span>
              ))}
            </div>

            <h2 className="font-serif text-3xl md:text-4xl mb-8">Itinerary</h2>
            <div className="space-y-8 mb-16">
              {tour.itinerary.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 border-l-4 border-black shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      {item.day}
                    </span>
                    <h3 className="font-serif text-xl">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="font-serif text-3xl md:text-4xl mb-8">
              Equipment Profile
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tour.equipment.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <Camera
                    size={18}
                    className="text-gray-400 mt-1 flex-shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 sticky top-32 shadow-sm border border-gray-100">
              <h3 className="font-serif text-2xl mb-6">Investment Details</h3>
              <div className="text-4xl font-serif mb-2">
                {tour.price.split(" ")[0]}
              </div>
              <div className="text-gray-500 text-sm mb-8">
                {tour.price.split(" ").slice(1).join(" ")}
              </div>

              <button className="w-full bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors mb-8">
                Enquire Now
              </button>

              <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 border-b pb-2">
                  What's Included
                </h4>
                <ul className="space-y-3">
                  {tour.included.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-gray-700"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-green-600 mt-0.5 flex-shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 border-b pb-2">
                  Not Included
                </h4>
                <ul className="space-y-3">
                  {tour.notIncluded.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-gray-700"
                    >
                      <XCircle
                        size={16}
                        className="text-red-500 mt-0.5 flex-shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
