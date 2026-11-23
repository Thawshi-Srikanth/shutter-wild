"use client";

import { useState, useTransition } from "react";
import { loginAdmin } from "../actions";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password) {
      setError("Please enter the admin password.");
      return;
    }

    startTransition(async () => {
      const res = await loginAdmin(password);
      if (res.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(res.error || "Authentication failed.");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F4F0] text-[#1A1A1A] px-6 font-sans">
      <div className="w-full max-w-md space-y-8">
        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm mb-4">
            <ShieldCheck className="w-6 h-6 text-[#1E2E22]" />
          </div>
          <span className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase block mb-1">
            [ Portal Access ]
          </span>
          <h1 className="font-serif text-3xl font-medium tracking-wide text-[#1A1A1A]">
            SHUTTER WILD
          </h1>
        </div>

        {/* Form Box */}
        <div className="bg-white border border-gray-200 rounded-sm p-8 md:p-10 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="font-serif text-xl font-medium text-[#1A1A1A]">
              Administrative Sign In
            </h2>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Access is restricted to authorized wildlife directors.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block"
              >
                Security Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={15} />
                </span>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:border-[#1E2E22] focus:bg-white focus:ring-1 focus:ring-[#1E2E22] outline-none text-[#1A1A1A] transition-all text-sm placeholder-gray-300"
                  disabled={isPending}
                />
              </div>
            </div>

            {error && (
              <div className="text-xs text-red-700 bg-red-50 border border-red-100 px-4 py-3 rounded-sm leading-relaxed">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#1E2E22] hover:bg-[#2C3E2E] active:bg-[#1E2E22] disabled:opacity-40 text-white font-bold tracking-widest text-xs uppercase rounded-sm transition-all cursor-pointer shadow-sm"
            >
              {isPending ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Authenticate Access
                  <ArrowRight
                    size={14}
                    className="transform group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
          &copy; {new Date().getFullYear()} Shutter Wild Ltd.
        </p>
      </div>
    </div>
  );
}
