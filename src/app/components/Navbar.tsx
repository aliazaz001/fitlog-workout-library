"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      const plan = JSON.parse(localStorage.getItem("fitlog-plan") || "[]");
      const saved = JSON.parse(localStorage.getItem("fitlog-saved") || "[]");

      setPlanCount(plan.length);
      setSavedCount(saved.length);
    };

    updateCounts();

    window.addEventListener("fitlog-updated", updateCounts);

    return () => {
      window.removeEventListener("fitlog-updated", updateCounts);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#1c1f26] bg-[#0c0d10]/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 lg:h-[81px]">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="FitLog"
            className="h-6 w-auto object-contain"
          />
          <span className="text-xs font-black tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        <div className="hidden items-center gap-5 text-[11px] md:flex">
          <Link
            href="/"
            className="rounded-full bg-[#ccff00] px-4 py-1.5 font-semibold text-black"
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className="font-medium text-white/65 transition hover:text-white"
          >
            My Plan
          </Link>
        </div>

        <div className="hidden items-center gap-5 text-[11px] md:flex">
          <Link
            href="/my-plan"
            className="font-medium text-white/65 transition hover:text-white"
          >
            Plan
            <span className="ml-1.5 inline-grid h-4 w-4 place-items-center rounded-full bg-[#ccff00] text-[9px] font-bold text-black">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="font-medium text-white/65 transition hover:text-white"
          >
            Saved
            <span className="ml-1.5 inline-grid h-4 w-4 place-items-center rounded-full border border-white/40 text-[9px] font-bold text-white">
              {savedCount}
            </span>
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-[#1c1f26] bg-[#0c0d10] px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4 text-sm">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="font-semibold text-[#ccff00]"
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className="text-white/70"
            >
              My Plan
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className="text-white/70"
            >
              Plan: <span className="text-[#ccff00]">{planCount}</span>
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className="text-white/70"
            >
              Saved: {savedCount}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}