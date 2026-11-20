import Navbar from "@/components/Navbar";
import SkillsShowcase from "@/components/SkillsShowcase";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Skills | Fuad Al Maimun",
  description: "Technical skills and technologies Fuad Al Maimun specializes in.",
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-[#08050d] text-white">
      <Navbar />
      <main className="pt-20">
        <SkillsShowcase />
      </main>
      <Footer />
    </div>
  );
}
