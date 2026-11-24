import SkillsShowcase from "./SkillsShowcase";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 bg-[#06030e] px-4 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <SkillsShowcase />
      </div>
    </section>
  );
}
