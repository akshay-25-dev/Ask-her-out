import { useRef, useState } from "react";

const MESSAGES = [
  "No",
  "Are you sure?",
  "Really?",
  "Think again 👀",
  "Last chance!",
  "You sure about that?",
  "😭 please?",
];

const MIN_SCALE = 0.55;
const SCALE_STEP = 0.07;
const EDGE_PADDING = 16;

export default function DodgeButton({ onDodge }) {
  const buttonRef = useRef(null);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [position, setPosition] = useState(null); // null = static layout position

  const message = MESSAGES[Math.min(dodgeCount, MESSAGES.length - 1)];
  const scale = Math.max(MIN_SCALE, 1 - dodgeCount * SCALE_STEP);

  function dodge() {
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const maxLeft = Math.max(EDGE_PADDING, window.innerWidth - rect.width - EDGE_PADDING);
    const maxTop = Math.max(EDGE_PADDING, window.innerHeight - rect.height - EDGE_PADDING);

    const left = EDGE_PADDING + Math.random() * (maxLeft - EDGE_PADDING);
    const top = EDGE_PADDING + Math.random() * (maxTop - EDGE_PADDING);

    setPosition({ top, left });
    setDodgeCount((c) => c + 1);
    onDodge?.(dodgeCount + 1);
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onMouseEnter={dodge}
      onClick={dodge}
      style={{
        ...(position
          ? { position: "fixed", top: position.top, left: position.left }
          : {}),
        transform: `scale(${scale})`,
      }}
      className="rounded-full bg-white px-8 py-4 text-lg font-bold text-ink shadow-md transition-[transform,left,top] duration-300 ease-out"
    >
      {message}
    </button>
  );
}
