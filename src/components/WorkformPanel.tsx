import { Workform } from "@/types/generator";

interface WorkformPanelProps {
  workform: Workform | null;
}

export default function WorkformPanel({ workform }: WorkformPanelProps) {
  if (!workform) {
    return (
      <div className="rounded-[20px] bg-white/93 p-5 text-[#222] shadow-[0_20px_70px_rgba(45,24,18,.22)]">
        <p>Kies een werkvorm om doel, tijd en stappen te zien.</p>
      </div>
    );
  }

  return (
    <div className="rounded-[20px] bg-white/93 p-5 text-[#222] shadow-[0_20px_70px_rgba(45,24,18,.22)]">
      <h3 className="mb-3 text-2xl font-black tracking-tight">
        {workform.title}
      </h3>
      <p className="mb-4 text-base font-extrabold leading-relaxed text-[#444]">
        {workform.goal}
      </p>

      <dl className="mb-3 grid grid-cols-[90px_1fr] gap-x-3 gap-y-2 text-sm leading-relaxed max-sm:grid-cols-1">
        <dt className="font-black text-[#333]">Tijd</dt>
        <dd className="text-[#555]">{workform.durationMinutes} minuten</dd>
        <dt className="font-black text-[#333]">Output</dt>
        <dd className="text-[#555]">{workform.output}</dd>
      </dl>

      <ol className="mb-3 list-decimal pl-5 text-sm font-semibold leading-relaxed text-[#555]">
        {workform.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      {workform.reflectionQuestions.length > 0 && (
        <div>
          <p className="text-sm font-black text-[#333]">Reflectievragen</p>
          <ul className="list-disc pl-5 text-sm font-semibold leading-relaxed text-[#555]">
            {workform.reflectionQuestions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
