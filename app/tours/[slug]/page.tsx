import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingActions from "@/components/BookingActions";
import MobileStickyBooking from "@/components/MobileStickyBooking";
import LightboxGallery from "@/components/LightboxGallery";
import { tours as staticTours, Tour } from "@/data/tours";
import {
  ArrowLeft,
  Calendar,
  Users,
  MapPin,
  CheckCircle2,
  XCircle,
  Camera,
} from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import prisma from "@/lib/prisma";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  
  let tour: any = null;
  try {
    tour = await prisma.tour.findUnique({
      where: { slug },
    });
  } catch (err) {}

  if (!tour) {
    tour = staticTours.find((t) => t.slug === slug);
  }

  if (!tour) return {};

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: tour.title,
    description: tour.overview.substring(0, 160) + "...",
    openGraph: {
      title: tour.title,
      description: tour.overview,
      images: [tour.image, ...previousImages],
    },
    twitter: {
      card: "summary_large_image",
      title: tour.title,
      description: tour.overview.substring(0, 160) + "...",
      images: [tour.image],
    },
  };
}

export const revalidate = 60; // Revalidate every 60 seconds for manual DB updates

export async function generateStaticParams() {
  let dbTours: any[] = [];
  try {
    dbTours = await prisma.tour.findMany({ select: { slug: true } });
  } catch (err) {}

  const allTours = dbTours.length > 0 ? dbTours : staticTours;

  return allTours.map((tour) => ({
    slug: tour.slug,
  }));
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  let tour: Tour | null = null;
  let availableSlots = 0;

  try {
    const dbTour = await prisma.tour.findUnique({
      where: { slug },
    });
    if (dbTour) {
      tour = {
        id: dbTour.id,
        slug: dbTour.slug,
        title: dbTour.title,
        maxPhotographers: dbTour.maxPhotographers,
        date: dbTour.date,
        location: dbTour.location,
        price: dbTour.price,
        duration: dbTour.duration,
        overview: dbTour.overview,
        focusSpecies: dbTour.focusSpecies,
        itinerary: (dbTour.itinerary as any) || [],
        included: dbTour.included,
        notIncluded: dbTour.notIncluded,
        equipment: dbTour.equipment,
        image: dbTour.image,
        gallery: dbTour.gallery,
        nonRefundableDeposit: dbTour.nonRefundableDeposit,
      };
      availableSlots = dbTour.availableSlots;
    }
  } catch (err) {
    console.error("Database query failed:", err);
  }

  // Fallback to static data
  if (!tour) {
    const staticTour = staticTours.find((t) => t.slug === slug);
    if (!staticTour) {
      notFound();
    }
    tour = staticTour;

    try {
      const dbTourAvail = await prisma.tour.findUnique({
        where: { slug },
        select: { availableSlots: true },
      });
      availableSlots = dbTourAvail?.availableSlots ?? tour.maxPhotographers;
    } catch (err) {
      availableSlots = tour.maxPhotographers;
    }
  }


  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#1A1A1A]">
      <Navbar />
      <MobileStickyBooking
        tourName={tour.title}
        price={tour.price.split(" ")[0]}
        slug={tour.slug}
        availableSlots={availableSlots}
      />

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
            <span
              className={`text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 ${availableSlots === 0 ? "text-red-400" : "text-white"}`}
            >
              <Users size={14} />{" "}
              {availableSlots === 0
                ? "Fully Booked"
                : `${availableSlots} Slots Available`}
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
            <div className="bg-white p-6 border-l-4 border-gray-300 shadow-sm mb-8">
              <p className="text-gray-700 text-sm font-medium">
                Please note: All camera gear, lenses, equipment, and appropriate
                warm clothing are{" "}
                <span className="font-bold">not included</span> in the
                expedition and must be provided by the attendee.
              </p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
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

            {/* New section for Travel & Health Disclaimers */}
            <h2 className="font-serif text-3xl md:text-4xl mb-8">
              Important Disclaimers
            </h2>
            <div className="space-y-6 text-gray-600 mb-16 text-sm bg-gray-50/80 p-6 md:p-8 border-l-4 border-[#1A1A1A] shadow-sm">
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-2 uppercase tracking-wide text-xs">
                  Medical Insurance & Vaccinations
                </h4>
                <p className="leading-relaxed">
                  It is the attendee&apos;s sole responsibility to ensure they
                  have all required and recommended travel vaccinations for the
                  destination. Comprehensive medical and travel insurance is
                  mandatory and is not provided by us. We will request proof of
                  suitable coverage prior to departure.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] mb-2 uppercase tracking-wide text-xs">
                  Traveling with Photography Gear
                </h4>
                <p className="leading-relaxed">
                  We highly recommend insuring your camera gear against loss,
                  theft, or damage. For large lenses that exceed standard cabin
                  baggage allowances, please check directly with your airline
                  regarding their specific policies for professional photography
                  equipment, as regulations vary significantly. It remains your
                  responsibility to ensure your gear is safely transported.
                </p>
              </div>
            </div>

            {tour.gallery && tour.gallery.length > 0 && (
              <LightboxGallery images={tour.gallery} tourTitle={tour.title} />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 sticky top-32 shadow-sm border border-gray-100">
              <h3 className="font-serif text-2xl mb-6">Investment Details</h3>
              <div className="text-4xl font-serif mb-2">
                {tour.price.split(" ")[0]}
              </div>
              <div className="text-gray-500 text-sm mb-6">
                {tour.price.split(" ").slice(1).join(" ")}
              </div>

              {tour.nonRefundableDeposit && (
                <div className="bg-[#F4F4F0] p-4 border-l-2 border-black mb-8">
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                    Non-Refundable Deposit
                  </div>
                  <div className="text-xl font-serif font-medium text-black">
                    £{tour.nonRefundableDeposit}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Required to secure your booking
                  </div>
                </div>
              )}

              <BookingActions
                tourName={tour.title}
                slug={tour.slug}
                availableSlots={availableSlots}
              />

              <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 border-b pb-2">
                  What&apos;s Included
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
