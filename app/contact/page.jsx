import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Fuad Al Maimun for projects and collaborations.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#05020D] text-text-primary">
      <Navbar />
      <main className="pt-16">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
