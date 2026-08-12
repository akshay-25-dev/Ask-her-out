const HEARTS = [
  { left: "6%", size: 22, delay: "0s", duration: "14s" },
  { left: "18%", size: 14, delay: "2.5s", duration: "11s" },
  { left: "32%", size: 26, delay: "5s", duration: "16s" },
  { left: "48%", size: 16, delay: "1s", duration: "12s" },
  { left: "63%", size: 20, delay: "6.5s", duration: "15s" },
  { left: "78%", size: 15, delay: "3.5s", duration: "10s" },
  { left: "90%", size: 24, delay: "8s", duration: "17s" },
];

/**
 * Decorative, non-interactive hearts drifting up from the bottom of the
 * screen. Purely ambient — hidden from screen readers, and animation is
 * disabled site-wide for prefers-reduced-motion (see index.css).
 */
export default function FloatingHearts() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {HEARTS.map((h, i) => (
        <span
          key={i}
          className="absolute bottom-0 animate-float-up text-rose/70"
          style={{
            left: h.left,
            fontSize: h.size,
            animationDelay: h.delay,
            animationDuration: h.duration,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
