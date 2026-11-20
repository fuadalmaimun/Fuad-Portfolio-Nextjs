import Navbar from "@/components/Navbar";
import Education from "@/components/Education";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Education | Fuad Al Maimun",
  description: "Academic and professional education journey of Fuad Al Maimun.",
};

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-[#08050d] text-white">
      <Navbar />
      <main className="pt-20">
        <Education />
      </main>
      <Footer />
    </div>
  );
}
