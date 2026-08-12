import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { usePlan } from "../hooks/usePlan.js";
import GifCard from "../components/GifCard.jsx";
import FloatingHearts from "../components/FloatingHearts.jsx";

function fireConfetti() {
  const colors = ["#FF6B9D", "#FFC857", "#FFD6A5", "#4A154B"];
  const duration = 1500;
  const end = Date.now() + duration;

  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors });
    confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  confetti({ particleCount: 120, spread: 100, origin: { y: 0.5 }, colors });
}

async function sharePlan(plan) {
  const text = `${plan.name ? plan.name + ", it's" : "It's"} official — we're doing ${plan.place} on ${plan.day}! 💌`;

  if (navigator.share) {
    try {
      await navigator.share({ text });
      return;
    } catch {
      // user cancelled the share sheet — fall through to clipboard copy
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  } catch {
    alert(text);
  }
}

export default function CelebratePage() {
  const navigate = useNavigate();
  const [plan] = usePlan();

  useEffect(() => {
    if (!plan.day || !plan.place) {
      navigate("/plan", { replace: true });
      return;
    }
    fireConfetti();
  }, [plan.day, plan.place, navigate]);

  if (!plan.day || !plan.place) return null;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blush to-peach px-6 py-16">
      <FloatingHearts />

      <div className="relative z-[1] flex max-w-md flex-col items-center gap-8 text-center">
        <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">
          Hurrayyyy!! 🎉
        </h1>

        <GifCard
          src="https://media0.giphy.com/media/T86i6yDyOYz7J6dPhf/giphy.gif"
          alt="Excited celebration illustration"
          fallbackEmoji="🎊"
        />

        {/* Signature element: a torn-edge "date ticket" recapping the plan */}
        <div className="w-full animate-ticket-in rounded-2xl bg-cream px-6 py-5 text-left shadow-xl">
          <div className="flex items-center justify-between border-b-2 border-dashed border-ink/15 pb-3">
            <span className="font-display text-sm font-bold uppercase tracking-wide text-rose">
              Admit Two
            </span>
            <span className="text-2xl">💌</span>
          </div>
          <dl className="mt-3 space-y-2">
            <div className="flex justify-between">
              <dt className="text-sm text-ink/60">Guest</dt>
              <dd className="font-semibold text-ink">{plan.name || "You"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-ink/60">When</dt>
              <dd className="font-semibold text-ink">{plan.day}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-ink/60">Where</dt>
              <dd className="font-semibold text-ink">{plan.place}</dd>
            </div>
          </dl>
        </div>

        <button
          type="button"
          onClick={() => sharePlan(plan)}
          className="rounded-full bg-white/80 px-6 py-3 text-sm font-bold text-ink shadow-md transition-colors hover:bg-white"
        >
          Share the news ↗
        </button>
      </div>
    </main>
  );
}
