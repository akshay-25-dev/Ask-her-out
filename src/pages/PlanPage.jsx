import { useNavigate } from "react-router-dom";
import { usePlan } from "../hooks/usePlan.js";
import FloatingHearts from "../components/FloatingHearts.jsx";

const DAYS = ["Tomorrow", "This weekend", "Next week", "Surprise me"];
const PLACES = ["Coffee ☕", "Dinner 🍝", "A movie 🎬", "A walk 🌇", "Surprise me"];

function PillGroup({ label, options, selected, onSelect }) {
  return (
    <div className="w-full">
      <p className="mb-2 text-left font-display text-sm font-semibold text-ink/70">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              selected === opt
                ? "bg-rose text-white shadow-md shadow-rose/30"
                : "bg-white/70 text-ink hover:bg-white"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PlanPage() {
  const navigate = useNavigate();
  const [plan, updatePlan] = usePlan();

  const canContinue = Boolean(plan.day && plan.place);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blush to-peach px-6 py-16">
      <FloatingHearts />

      <div className="relative z-[1] flex w-full max-w-md flex-col items-center gap-8 text-center">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Yay{plan.name ? `, ${plan.name}` : ""}! 🎉
          </h1>
          <p className="mt-2 text-ink/70">Let's pick a day and a place.</p>
        </div>

        <PillGroup
          label="When"
          options={DAYS}
          selected={plan.day}
          onSelect={(day) => updatePlan({ day })}
        />
        <PillGroup
          label="Where"
          options={PLACES}
          selected={plan.place}
          onSelect={(place) => updatePlan({ place })}
        />

        <button
          type="button"
          disabled={!canContinue}
          onClick={() => navigate("/celebrate")}
          className="rounded-full bg-rose px-9 py-4 text-lg font-bold text-white shadow-lg shadow-rose/30 transition-all hover:bg-rose-dark disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          It's a date →
        </button>
      </div>
    </main>
  );
}
