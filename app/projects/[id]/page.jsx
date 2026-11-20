import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCaseStudyView from "@/components/ProjectCaseStudyView";
import { fetchProjectById, fetchProjects } from "@/lib/api";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const project = await fetchProjectById(resolvedParams.id);
  if (!project) {
    return { title: "Project Case Study" };
  }
  return {
    title: `${project.title} | Project Case Study`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }) {
  const resolvedParams = await params;
  const project = await fetchProjectById(resolvedParams.id);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-[#05020D] text-text-primary">
      <Navbar />
      <main className="pt-24 pb-20">
        <ProjectCaseStudyView project={project} />
      </main>
      <Footer />
    </div>
  );
}
