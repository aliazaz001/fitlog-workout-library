import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1c1f26] bg-[#0c0d10] px-6 py-7">
      <div className="mx-auto flex max-w-[1232px] flex-col gap-4 text-xs sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/Footer-logo.png"
            alt="FitLog"
            className="h-5 w-auto object-contain"
          />
          <span className="font-black tracking-wide text-white">FITLOG</span>
        </Link>

        <p className="text-[#9ca3af]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}