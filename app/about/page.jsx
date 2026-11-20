import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Me",
  description:
    "Learn more about Fuad Al Maimun, full-stack web developer background, principles, and journey.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#08050d] text-text-primary">
      <Navbar />
      <main className="pt-16">
        <About />
      </main>
      <Footer />
    </div>
  );
}
