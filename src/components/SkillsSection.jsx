import SkillsShowcase from "./SkillsShowcase";

export default function SkillsSection() {
  return (
    <section className="bg-[#10071D] px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-bold text-white">
          My Skills & Technologies
        </h2>

        <SkillsShowcase />
      </div>
    </section>
  );
}