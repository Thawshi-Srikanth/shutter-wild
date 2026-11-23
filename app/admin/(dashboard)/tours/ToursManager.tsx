"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteTour, TourInput } from "../../actions";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  MapPin,
  Calendar,
  Users,
  Compass,
} from "lucide-react";

export default function ToursManager({
  initialTours,
}: {
  initialTours: TourInput[];
}) {
  const [tours, setTours] = useState<TourInput[]>(initialTours);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Filter tours by search query
  const filteredTours = tours.filter(
    (tour) =>
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string, title: string) => {
    setError(null);
    setSuccess(null);

    const check = confirm(
      `Are you sure you want to permanently delete the "${title}" expedition? This action cannot be undone.`
    );
    if (!check) return;

    startTransition(async () => {
      const res = await deleteTour(id);
      if (res.success) {
        setTours((prev) => prev.filter((t) => t.id !== id));
        setSuccess(`Successfully deleted "${title}" from the database.`);
      } else {
        setError(res.error || "Failed to delete expedition.");
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight">
            Expeditions
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your photography workshop portfolios, pricing structures, and itinerary details.
          </p>
        </div>
        <Link
          href="/admin/tours/new"
          className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#1E2E22] hover:bg-[#2C3E2E] text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-sm"
        >
          <Plus size={16} /> Create Expedition
        </Link>
      </div>

      {/* Notifications */}
      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-sm">
          {success}
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm rounded-sm">
          {error}
        </div>
      )}

      {/* Filter and Search */}
      <div className="bg-white p-4 border border-gray-100 shadow-sm rounded-sm flex items-center gap-4 w-full">
        <span className="text-gray-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title or location..."
          className="w-full text-sm outline-none border-none placeholder-gray-400 bg-transparent text-gray-800"
        />
      </div>

      {/* Tours Grid/List Container */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filteredTours.map((tour) => {
            const booked = tour.maxPhotographers - tour.availableSlots;
            const fillPct = Math.round((booked / tour.maxPhotographers) * 100);

            return (
              <div
                key={tour.id}
                className="p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:bg-gray-50/50 transition-colors"
              >
                {/* Visual Cover and Meta */}
                <div className="flex items-center gap-5 flex-1 min-w-0">
                  <div className="w-20 h-16 relative bg-gray-100 rounded-sm overflow-hidden flex-shrink-0 border border-gray-100">
                    {tour.image ? (
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Compass size={24} />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h2 className="text-lg font-serif font-semibold text-gray-900 truncate">
                      {tour.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-gray-400" />
                        {tour.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-gray-400" />
                        {tour.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Capacity progress */}
                <div className="w-full lg:w-48 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Users size={12} /> Capacity
                    </span>
                    <span className="font-semibold text-gray-700">
                      {booked} / {tour.maxPhotographers} Slots
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        tour.availableSlots === 0
                          ? "bg-red-500"
                          : fillPct > 70
                            ? "bg-amber-500"
                            : "bg-emerald-600"
                      }`}
                      style={{ width: `${fillPct}%` }}
                    />
                  </div>
                </div>

                {/* Investment Cost */}
                <div className="text-left lg:text-right">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">
                    Investment Price
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {tour.price}
                  </span>
                </div>

                {/* Action Commands */}
                <div className="flex items-center gap-2 self-stretch lg:self-auto justify-end border-t lg:border-t-0 pt-4 lg:pt-0">
                  <Link
                    href={`/admin/tours/${tour.id}/edit`}
                    className="p-2.5 hover:bg-gray-100 hover:text-gray-900 rounded-sm text-gray-500 transition-colors flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
                    title="Edit Expedition"
                  >
                    <Edit2 size={15} />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(tour.id, tour.title)}
                    disabled={isPending}
                    className="p-2.5 hover:bg-red-50 hover:text-red-600 rounded-sm text-gray-400 transition-colors flex items-center gap-2 text-xs font-semibold uppercase tracking-wider cursor-pointer"
                    title="Delete Expedition"
                  >
                    <Trash2 size={15} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })}

          {filteredTours.length === 0 && (
            <div className="p-12 text-center text-gray-500 italic text-sm">
              No matching expeditions discovered in database.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
