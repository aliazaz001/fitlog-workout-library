import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0c0d10] px-6 text-center">
      <div>
        <p className="font-[Oswald] text-7xl font-bold text-[#c2f800]">
          404
        </p>

        <h1 className="mt-4 font-[Oswald] text-3xl font-bold text-white">
          WORKOUT NOT FOUND
        </h1>

        <p className="mt-3 text-sm text-[#9ca3af]">
          This workout does not exist or may have been moved.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex rounded-full bg-[#c2f800] px-5 py-3 text-sm font-bold text-black transition hover:bg-white"
        >
          Back to workouts
        </Link>
      </div>
    </main>
  );
}