"use client";

import { useTransition } from "react";
import { logoutAdmin } from "../actions";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      startTransition(async () => {
        await logoutAdmin();
      });
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest rounded-sm text-red-700 hover:text-red-800 hover:bg-red-50/50 transition-all cursor-pointer disabled:opacity-40"
    >
      <LogOut size={15} className="text-red-700" />
      <span>{isPending ? "Logging out..." : "Log Out"}</span>
    </button>
  );
}
