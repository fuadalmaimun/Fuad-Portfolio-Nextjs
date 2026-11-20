import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen bg-[#05020D] text-text-primary">
      <Navbar />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-20 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-purple-300">
          404 · Project Not Found
        </p>
        <h1 className="mb-3 text-3xl font-bold text-white">This project does not exist</h1>
        <p className="mb-7 max-w-md text-sm leading-relaxed text-gray-400">
          The project may have been removed or the link may be incorrect.
        </p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-950/40 px-6 py-2.5 text-sm font-semibold text-purple-300 transition hover:bg-purple-600/20 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
      </main>
      <Footer />
    </div>
  );
}
