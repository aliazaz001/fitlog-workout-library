import Link from "next/link";
import { ArrowDownToLine } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-[#11120f] px-4 py-6 sm:px-6">
      <div className="mx-auto grid max-w-[1232px] items-center gap-8 rounded-2xl border border-[#222630] bg-[#15171d] p-6 md:grid-cols-2 md:p-10 lg:h-[448px] lg:p-14">
        <div>
          <p className="mb-4 text-xs font-black tracking-[0.22em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="font-[Oswald] text-[30px] font-bold leading-[36px] tracking-[-0.75px] text-white">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-6 text-white/65 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="mt-7 inline-flex items-center gap-2 rounded bg-[#ccff00] px-5 py-3 text-sm font-black text-black transition hover:bg-white"
          >
            <ArrowDownToLine size={18} />
            BROWSE WORKOUTS
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <img
            src="/banner.png"
            alt="FitLog workout banner"
            className="max-h-[330px] w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}