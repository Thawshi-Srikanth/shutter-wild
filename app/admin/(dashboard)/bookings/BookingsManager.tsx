"use client";

import { useState, useMemo } from "react";
import { Search, ExternalLink, Calendar, CreditCard, Inbox } from "lucide-react";

type BookingWithTour = {
  id: string;
  customerEmail: string;
  amount: number;
  stripeSessionId: string;
  createdAt: Date | string;
  tour: {
    title: string;
    location: string;
    date: string;
  };
};

type BookingsManagerProps = {
  initialBookings: BookingWithTour[];
};

export default function BookingsManager({ initialBookings }: BookingsManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTour, setSelectedTour] = useState("all");

  // Get unique expedition list for filters
  const uniqueTours = useMemo(() => {
    const toursMap = new Map<string, string>();
    initialBookings.forEach((b) => {
      toursMap.set(b.tour.title, b.tour.title);
    });
    return Array.from(toursMap.keys());
  }, [initialBookings]);

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return initialBookings.filter((b) => {
      const emailMatch = b.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
      const tourMatch = b.tour.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSearch = emailMatch || tourMatch;

      const matchesFilter = selectedTour === "all" || b.tour.title === selectedTour;

      return matchesSearch && matchesFilter;
    });
  }, [initialBookings, searchQuery, selectedTour]);

  // Total summary of filtered set
  const totalRevenue = useMemo(() => {
    const rawSum = filteredBookings.reduce((acc, b) => acc + b.amount, 0);
    // Stripe amounts are in smallest currency unit (pence/cents)
    return rawSum > 10000 ? rawSum / 100 : rawSum;
  }, [filteredBookings]);

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner Header */}
      <div>
        <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-[#1A1A1A]">
          Bookings Manager
        </h1>
        <p className="text-gray-500 mt-2">
          Verify registrations, check payments, and track customer Stripe transaction details.
        </p>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Registered Bookings
            </span>
            <span className="text-2xl font-serif font-medium">{filteredBookings.length}</span>
          </div>
          <div className="p-3 bg-emerald-50 text-[#1E2E22] rounded-sm">
            <Calendar size={18} />
          </div>
        </div>

        <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm flex items-center justify-between col-span-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Filtered Total Revenue
            </span>
            <span className="text-2xl font-serif font-medium text-emerald-800">
              {new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP",
              }).format(totalRevenue)}
            </span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-700 rounded-sm">
            <CreditCard size={18} />
          </div>
        </div>
      </div>

      {/* Filters Area */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-white p-4 border border-gray-200 rounded-sm shadow-sm">
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search by customer email or expedition title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-sm focus:border-[#1E2E22] focus:bg-white outline-none text-sm text-gray-800 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400 whitespace-nowrap">
            Filter Expedition:
          </label>
          <select
            value={selectedTour}
            onChange={(e) => setSelectedTour(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-sm focus:border-[#1E2E22] focus:bg-white outline-none text-xs font-bold uppercase tracking-wider text-gray-600 cursor-pointer"
          >
            <option value="all">ALL EXPEDITIONS</option>
            {uniqueTours.map((t) => (
              <option key={t} value={t}>
                {t.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bookings List Table */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Registration Date
                </th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Customer Email
                </th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Expedition Details
                </th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right">
                  Amount Paid
                </th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Stripe Session ID
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBookings.map((b) => {
                const bookingAmount = b.amount > 10000 ? b.amount / 100 : b.amount;
                const formattedAmount = new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(bookingAmount);

                return (
                  <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(b.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">
                      {b.customerEmail}
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="truncate text-sm font-bold text-gray-800">
                        {b.tour.title}
                      </div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                        {b.tour.location} &bull; {b.tour.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right whitespace-nowrap">
                      {formattedAmount}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1.5 font-mono bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-sm w-fit max-w-[180px] truncate select-all" title={b.stripeSessionId}>
                        <span className="truncate">{b.stripeSessionId}</span>
                        <a
                          href={`https://dashboard.stripe.com/payments`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-emerald-700 transition-colors flex-shrink-0"
                          title="Open Stripe Dashboard Payments"
                        >
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-gray-400">
                    <Inbox className="w-10 h-10 mx-auto text-gray-300 stroke-[1.2] mb-3" />
                    <span className="text-sm font-medium uppercase tracking-wider block">
                      No matching bookings registered
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
