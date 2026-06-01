import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Compass, Calendar, User } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  const currentDate = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#1A1A1A] flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-[#1A1A1A] flex flex-col flex-shrink-0 border-r border-gray-200 shadow-sm">
        {/* Brand */}
        <div className="p-6 border-b border-gray-100 bg-[#F4F4F0]/30">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#1E2E22] uppercase block mb-1">
            [ Admin Panel ]
          </span>
          <h1 className="font-serif text-xl font-semibold tracking-wide text-[#1A1A1A]">
            SHUTTER WILD
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 mt-4">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest rounded-sm text-gray-500 hover:text-[#1A1A1A] hover:bg-[#F4F4F0] transition-all"
          >
            <LayoutDashboard size={16} className="text-[#1E2E22]" />
            Dashboard
          </Link>
          <Link
            href="/admin/tours"
            className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest rounded-sm text-gray-500 hover:text-[#1A1A1A] hover:bg-[#F4F4F0] transition-all"
          >
            <Compass size={16} className="text-[#1E2E22]" />
            Expeditions
          </Link>
          <Link
            href="/admin/bookings"
            className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest rounded-sm text-gray-500 hover:text-[#1A1A1A] hover:bg-[#F4F4F0] transition-all"
          >
            <Calendar size={16} className="text-[#1E2E22]" />
            Bookings
          </Link>
        </nav>

        {/* Footer Area */}
        <div className="p-4 border-t border-gray-100 bg-[#F4F4F0]/30 space-y-2">
          <div className="flex items-center gap-3 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            <User size={13} className="text-[#1E2E22]" />
            <span>Administrator</span>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Topbar Header */}
        <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Welcome, Administrator
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-[#F4F4F0] px-4 py-2 rounded-sm border border-gray-200">
            <Calendar size={13} className="text-[#1A1A1A]" />
            <span>{currentDate}</span>
          </div>
        </header>

        {/* Work Area */}
        <main className="flex-1 p-8 md:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
