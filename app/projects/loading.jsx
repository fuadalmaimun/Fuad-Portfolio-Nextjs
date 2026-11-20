import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LoaderCircle } from "lucide-react";

export default function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-[#05020D] text-text-primary">
      <Navbar />
      <main className="flex min-h-[70vh] items-center justify-center pt-20">
        <div
          className="flex flex-col items-center gap-4 text-purple-300"
          role="status"
          aria-live="polite"
        >
          <LoaderCircle className="animate-spin" size={36} />
          <p className="text-sm text-gray-300">Loading projects...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
