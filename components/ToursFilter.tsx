"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Search } from "lucide-react";

interface ToursFilterProps {
  isOpen: boolean;
  onClose: () => void;
  years: string[];
  activeYear: string;
  onYearChange: (year: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  priceSort: string;
  onPriceSortChange: (sort: string) => void;
  maxGroupSize: string;
  onGroupSizeChange: (size: string) => void;
}

export default function ToursFilter({
  isOpen,
  onClose,
  years,
  activeYear,
  onYearChange,
  searchQuery,
  onSearchChange,
  priceSort,
  onPriceSortChange,
  maxGroupSize,
  onGroupSizeChange,
}: ToursFilterProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#F4F4F0] z-50 shadow-2xl flex flex-col overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="font-serif text-2xl">Filter Expeditions</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Close filters"
              >
                <X size={24} className="text-gray-800" />
              </button>
            </div>

            <div className="flex-1 p-6 flex flex-col gap-8">
              {/* Search */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                  Search
                </h3>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search by title, location..."
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 focus:outline-none focus:border-[#1A1A1A] text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Year Filter */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                  Year
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => onYearChange("All")}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border ${
                      activeYear === "All"
                        ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                        : "bg-white text-[#1A1A1A] border-gray-200 hover:border-[#1A1A1A]"
                    }`}
                  >
                    All
                  </button>
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => onYearChange(year)}
                      className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border ${
                        activeYear === year
                          ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                          : "bg-white text-[#1A1A1A] border-gray-200 hover:border-[#1A1A1A]"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Sort */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                  Sort By Price
                </h3>
                <select
                  value={priceSort}
                  onChange={(e) => onPriceSortChange(e.target.value)}
                  className="w-full p-3 bg-white border border-gray-200 focus:outline-none focus:border-[#1A1A1A] text-sm transition-colors"
                >
                  <option value="">No Sorting (Default)</option>
                  <option value="low-to-high">Price: Low to High</option>
                  <option value="high-to-low">Price: High to Low</option>
                </select>
              </div>

              {/* Group Size Filter */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                  Max Group Size
                </h3>
                <select
                  value={maxGroupSize}
                  onChange={(e) => onGroupSizeChange(e.target.value)}
                  className="w-full p-3 bg-white border border-gray-200 focus:outline-none focus:border-[#1A1A1A] text-sm transition-colors"
                >
                  <option value="All">Any Size</option>
                  <option value="3">3 Photographers</option>
                  <option value="4">4 Photographers</option>
                  <option value="5">5 Photographers</option>
                  <option value="6">6+ Photographers</option>
                </select>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-6 border-t border-gray-200 bg-white">
              <button
                onClick={onClose}
                className="w-full bg-[#1A1A1A] text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors"
              >
                View Expeditions
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
