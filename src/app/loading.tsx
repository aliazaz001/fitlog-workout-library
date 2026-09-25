export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0c0d10]">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#222630] border-t-[#c2f800]" />
        <p className="mt-4 text-sm font-semibold text-[#c2f800]">
          Loading workout...
        </p>
      </div>
    </main>
  );
}