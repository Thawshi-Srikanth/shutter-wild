"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLenis } from "lenis/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const lenis = useLenis();

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    onPageChange(page);
    if (lenis) {
      lenis.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-16 pb-8 border-t border-gray-200 pt-16">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#1A1A1A] transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      <div className="flex gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors border ${
              currentPage === i + 1
                ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                : "bg-transparent text-[#1A1A1A] border-gray-300 hover:border-[#1A1A1A]"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#1A1A1A] transition-colors"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
