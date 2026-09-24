import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <main
        id="library"
        className="min-h-screen bg-[#11120f] px-5 py-14 text-white md:px-10 lg:px-16"
      >
        <h2 className="text-4xl font-black">THE LIBRARY</h2>
      </main>
    </>
  );
}