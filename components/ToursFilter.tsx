"use client";

interface ToursFilterProps {
  years: string[];
  activeYear: string;
  onYearChange: (year: string) => void;
}

export default function ToursFilter({
  years,
  activeYear,
  onYearChange,
}: ToursFilterProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
      {/* Year Tabs */}
      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        <button
          onClick={() => onYearChange("All")}
          className={`px-6 py-2 text-xs font-bold uppercase tracking-wider transition-colors border ${
            activeYear === "All"
              ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
              : "bg-transparent text-[#1A1A1A] border-gray-300 hover:border-[#1A1A1A]"
          }`}
        >
          All Tours
        </button>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onYearChange(year)}
            className={`px-6 py-2 text-xs font-bold uppercase tracking-wider transition-colors border ${
              activeYear === year
                ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                : "bg-transparent text-[#1A1A1A] border-gray-300 hover:border-[#1A1A1A]"
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}
