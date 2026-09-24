"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#11120f]/95 backdrop-blur">
     <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-black tracking-tight text-white"
        >
          <span className="grid h-8 w-8 place-items-center rounded bg-[#ccff00] text-sm text-black">
            F
          </span>
          FITLOG
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 text-sm font-bold md:flex">
          <Link href="/" className="text-[#ccff00] transition hover:text-white">
            WORKOUT
          </Link>

          <Link
            href="/my-plan"
            className="text-white/70 transition hover:text-[#ccff00]"
          >
            MY PLAN
          </Link>
        </div>

        {/* Counters */}
        <div className="hidden items-center gap-2 sm:flex">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-3 py-2 text-xs font-black text-black transition hover:bg-white"
          >
            PLAN 0
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-white/40 px-3 py-2 text-xs font-black text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
          >
            SAVED 0
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#11120f] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4 text-sm font-bold">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-[#ccff00]"
            >
              WORKOUT
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className="text-white/70"
            >
              MY PLAN
            </Link>

            <div className="flex gap-2 pt-2">
              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-[#ccff00] px-3 py-2 text-xs font-black text-black"
              >
                PLAN 0
              </Link>

              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-white/40 px-3 py-2 text-xs font-black text-white"
              >
                SAVED 0
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}