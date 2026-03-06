"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import LightboxGallery from "./LightboxGallery";

interface TourGalleryData {
  id: string;
  title: string;
  images: string[];
}

interface CategorizedGalleryProps {
  toursData: TourGalleryData[];
}

const IMAGES_PER_PAGE = 12;

export default function CategorizedGallery({
  toursData,
}: CategorizedGalleryProps) {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(IMAGES_PER_PAGE);

  // Derive the active images based on the selected tab
  const activeImages = useMemo(() => {
    if (activeTab === "All") {
      // Flatten all images and remove duplicates
      const allUrlList = toursData.flatMap((t) => t.images);
      return Array.from(new Set(allUrlList));
    }
    const selectedTour = toursData.find((t) => t.id === activeTab);
    return selectedTour ? selectedTour.images : [];
  }, [activeTab, toursData]);

  // Slice for pagination
  const visibleImages = activeImages.slice(0, visibleCount);
  const hasMore = visibleCount < activeImages.length;

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setVisibleCount(IMAGES_PER_PAGE); // Reset pagination on tab change
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + IMAGES_PER_PAGE);
  };

  return (
    <div>
      {/* Category Tabs */}
      <div className="relative mb-12 -mx-6 px-6 md:mx-0 md:px-0">
        <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2 md:pb-0 md:flex-wrap">
          <button
            onClick={() => handleTabChange("All")}
            className={`flex-shrink-0 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${
              activeTab === "All"
                ? "bg-[#1A1A1A] text-white"
                : "bg-white text-[#1A1A1A] border border-gray-200 hover:border-gray-400"
            }`}
          >
            All Captures
          </button>
          {toursData.map((tour) => (
            <button
              key={tour.id}
              onClick={() => handleTabChange(tour.id)}
              className={`flex-shrink-0 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${
                activeTab === tour.id
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-white text-[#1A1A1A] border border-gray-200 hover:border-gray-400"
              }`}
            >
              {tour.title}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of visible images using the Lightbox functionality natively */}
      <div className="mb-0">
        <LightboxGallery
          images={visibleImages}
          tourTitle={activeTab === "All" ? "Wildlife Gallery" : activeTab}
          hideHeader={true}
        />
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-12 mb-24">
          <button
            onClick={loadMore}
            className="group flex items-center gap-3 bg-white border border-black text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
          >
            Load More Captures
          </button>
        </div>
      )}
    </div>
  );
}
