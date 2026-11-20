import SkillsShowcase from "./SkillsShowcase";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 bg-[#06030e] px-4 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-bold text-white">
          My Skills & Technologies
        </h2>

        <SkillsShowcase />
      </div>
    </section>
  );
}
