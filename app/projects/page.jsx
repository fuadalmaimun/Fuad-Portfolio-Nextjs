import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Projects",
  description:
    "Explore full-stack and frontend applications built by Fuad Al Maimun.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#05020D] text-text-primary">
      <Navbar />
      <main className="pt-16">
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
