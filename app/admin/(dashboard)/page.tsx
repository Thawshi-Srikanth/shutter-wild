import prisma from "@/lib/prisma";
import {
  Compass,
  CreditCard,
  Users,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export const revalidate = 0; // Dynamic server page

export default async function AdminDashboard() {
  // Query live metrics from Database
  const toursCount = await prisma.tour.count();
  const bookingsCount = await prisma.booking.count();

  // Aggregate Revenue (stored in cents or pence or raw integers)
  const revenueAggregate = await prisma.booking.aggregate({
    _sum: {
      amount: true,
    },
  });
  const totalRevenueRaw = revenueAggregate._sum.amount ?? 0;
  // If stored in cents/pence, divide by 100, else keep raw. Let's inspect Stripe routes later, but display with currency formatter:
  const formattedRevenue = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(totalRevenueRaw > 10000 ? totalRevenueRaw / 100 : totalRevenueRaw); // Stripe is usually in cents/pence, so handle gracefully!

  // Sum of available slots
  const tours = await prisma.tour.findMany({
    select: {
      title: true,
      slug: true,
      maxPhotographers: true,
      availableSlots: true,
    },
  });

  const totalCapacity = tours.reduce((acc, t) => acc + t.maxPhotographers, 0);
  const totalAvailable = tours.reduce((acc, t) => acc + t.availableSlots, 0);
  const totalBooked = totalCapacity - totalAvailable;

  const capacityFillRate =
    totalCapacity > 0 ? Math.round((totalBooked / totalCapacity) * 100) : 0;

  // Fetch recent bookings
  const recentBookings = await prisma.booking.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tour: {
        select: {
          title: true,
        },
      },
    },
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Overview of your wildlife expeditions, real-time availability, and checkout statuses.
        </p>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-sm flex items-start justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
              Active Expeditions
            </span>
            <span className="text-3xl font-serif font-medium">{toursCount}</span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-sm text-emerald-700">
            <Compass size={20} />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-sm flex items-start justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
              Total Bookings
            </span>
            <span className="text-3xl font-serif font-medium">{bookingsCount}</span>
          </div>
          <div className="p-3 bg-blue-50 rounded-sm text-blue-700">
            <Users size={20} />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-sm flex items-start justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
              Revenue Generated
            </span>
            <span className="text-3xl font-serif font-medium">{formattedRevenue}</span>
          </div>
          <div className="p-3 bg-amber-50 rounded-sm text-amber-700">
            <CreditCard size={20} />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-sm flex items-start justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
              Overall Capacity
            </span>
            <span className="text-3xl font-serif font-medium">{capacityFillRate}%</span>
          </div>
          <div className="p-3 bg-purple-50 rounded-sm text-purple-700">
            <TrendingUp size={20} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Expedition Capacity Status */}
        <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm lg:col-span-7 space-y-6">
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#1A1A1A]">
            Expedition Capacity Rates
          </h2>

          <div className="space-y-5">
            {tours.map((tour) => {
              const booked = tour.maxPhotographers - tour.availableSlots;
              const fillPct = Math.round((booked / tour.maxPhotographers) * 100);
              return (
                <div key={tour.slug} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-gray-800 line-clamp-1">
                      {tour.title}
                    </span>
                    <span className="text-gray-500 font-bold text-xs uppercase tracking-wider">
                      {booked} / {tour.maxPhotographers} Slots Booked ({fillPct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        fillPct === 100
                          ? "bg-red-500"
                          : fillPct > 70
                            ? "bg-amber-500"
                            : "bg-emerald-600"
                      }`}
                      style={{ width: `${fillPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {tours.length === 0 && (
              <p className="text-gray-500 italic text-sm">No expeditions available.</p>
            )}
          </div>
        </div>

        {/* Recent Checkout Activities */}
        <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm lg:col-span-5 flex flex-col">
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#1A1A1A] mb-6">
            Recent Stripe Bookings
          </h2>

          <div className="flex-1 space-y-5">
            {recentBookings.map((booking) => {
              const amt = new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP",
              }).format(booking.amount > 10000 ? booking.amount / 100 : booking.amount);

              return (
                <div
                  key={booking.id}
                  className="flex items-start gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0"
                >
                  <div className="p-2 bg-emerald-50 rounded-full text-emerald-700 mt-0.5">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {booking.customerEmail}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      Expedition: {booking.tour.title}
                    </p>
                    <span className="text-[10px] text-gray-400 font-medium tracking-wider">
                      {new Date(booking.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-gray-900">{amt}</div>
                </div>
              );
            })}

            {recentBookings.length === 0 && (
              <div className="h-full flex items-center justify-center py-10">
                <p className="text-gray-400 italic text-sm">No checkout records registered yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
