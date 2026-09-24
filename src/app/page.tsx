import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LibrarySection from "./components/LibrarySection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <LibrarySection />
      </main>

      <Footer />
    </>
  );
}