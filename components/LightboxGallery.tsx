"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxGalleryProps {
  images: string[];
  tourTitle: string;
}

export default function LightboxGallery({
  images,
  tourTitle,
}: LightboxGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  // Handle body scroll locking
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeIndex]);

  const goToNext = useCallback(() => {
    if (activeIndex !== null) {
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev! + 1));
    }
  }, [activeIndex, images.length]);

  const goToPrev = useCallback(() => {
    if (activeIndex !== null) {
      setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev! - 1));
    }
  }, [activeIndex, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, closeLightbox, goToNext, goToPrev]);

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrev();
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Grid Display */}
      <h2 className="font-serif text-3xl md:text-4xl mb-8">
        Expedition Gallery
      </h2>
      <div className="flex flex-col gap-4 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, idx) => (
            <div
              key={idx}
              className="relative aspect-square overflow-hidden bg-gray-100 cursor-pointer group"
              onClick={() => openLightbox(idx)}
            >
              <Image
                src={image}
                alt={`${tourTitle} gallery image ${idx + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium tracking-widest uppercase transition-opacity">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Lightbox */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center backdrop-blur-sm"
          >
            {/* Top Bar for close and count */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
              <span className="text-white/60 text-sm font-medium tracking-widest uppercase">
                {activeIndex + 1} / {images.length}
              </span>
              <button
                onClick={closeLightbox}
                className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
                aria-label="Close"
              >
                <X size={28} />
              </button>
            </div>

            {/* Main Image Area with Swipe support */}
            <div
              className="relative w-full h-full flex items-center justify-center p-4 md:p-12 cursor-pointer"
              onClick={(e) => {
                // Close if clicked on the backdrop, not the image or buttons
                if (e.target === e.currentTarget) closeLightbox();
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full max-w-6xl max-h-[85vh] cursor-default"
                >
                  <Image
                    src={images[activeIndex]}
                    alt={`${tourTitle} full gallery image ${activeIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Desktop Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors focus:outline-none hidden md:block z-50"
              aria-label="Previous image"
            >
              <ChevronLeft size={40} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors focus:outline-none hidden md:block z-50"
              aria-label="Next image"
            >
              <ChevronRight size={40} />
            </button>

            {/* Mobile Navigation Area (Tap Zones) */}
            <div
              className="absolute left-0 top-20 bottom-0 w-1/4 z-40 md:hidden"
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
            />
            <div
              className="absolute right-0 top-20 bottom-0 w-1/4 z-40 md:hidden"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
