import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#11120f] p-10 text-white">
        <h1 className="text-4xl font-black">FITLOG WORKOUT LIBRARY</h1>
      </main>
    </>
  );
}