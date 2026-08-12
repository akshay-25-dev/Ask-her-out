import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlan } from "../hooks/usePlan.js";
import DodgeButton from "../components/DodgeButton.jsx";
import GifCard from "../components/GifCard.jsx";
import FloatingHearts from "../components/FloatingHearts.jsx";
import MusicToggle from "../components/MusicToggle.jsx";

const MAX_GROWTH_SCALE = 1.9;
const GROWTH_STEP = 0.12;

export default function AskPage() {
  const navigate = useNavigate();
  const [plan] = usePlan();
  const [dodges, setDodges] = useState(0);

  const yesScale = Math.min(MAX_GROWTH_SCALE, 1 + dodges * GROWTH_STEP);

  function handleYes() {
    navigate("/plan");
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blush to-peach px-6 py-16">
      <FloatingHearts />
      <MusicToggle />

      <div className="relative z-[1] flex max-w-lg flex-col items-center text-center">
        <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          Do you wanna go out with me
          {plan.name ? `, ${plan.name}` : ""}?
        </h1>
        <h2 className="mt-2 font-display text-xl font-medium text-ink/70 sm:text-2xl">
          Are you free tomorrow?
        </h2>

        <div className="mt-8">
          <GifCard
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtZ2JiZDR0a3lvMWF4OG8yc3p6Ymdvd3g2d245amdveDhyYmx6eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/cLS1cfxvGOPVpf9g3y/giphy.gif"
            alt="Cute animated illustration"
            fallbackEmoji="🐻"
          />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleYes}
            style={{ transform: `scale(${yesScale})` }}
            className="animate-pop rounded-full bg-rose px-9 py-4 text-lg font-bold text-white shadow-lg shadow-rose/30 transition-transform duration-300 ease-out hover:bg-rose-dark"
          >
            Yes
          </button>
          <DodgeButton onDodge={setDodges} />
        </div>

        {dodges > 2 && (
          <p className="mt-6 text-sm font-semibold text-ink/60">
            (the "yes" button is not going to stop growing, just so you know)
          </p>
        )}
      </div>
    </main>
  );
}
