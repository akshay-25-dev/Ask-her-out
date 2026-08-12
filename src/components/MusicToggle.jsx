import { useEffect, useRef, useState } from "react";

/**
 * Background music toggle. Starts paused (browsers block autoplay-with-sound
 * anyway, so there's no point fighting that) and lets the visitor opt in.
 *
 * If you want music, drop an mp3 at `public/music.mp3` — this component
 * checks whether that file actually loads and hides itself entirely if it's
 * missing, rather than showing a button that does nothing.
 */
export default function MusicToggle() {
  const audioRef = useRef(null);
  const [available, setAvailable] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    function handleError() {
      setAvailable(false);
    }

    audio.addEventListener("error", handleError);
    return () => audio.removeEventListener("error", handleError);
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => setAvailable(false));
      setPlaying(true);
    }
  }

  if (!available) return null;

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background music" : "Play background music"}
        className="fixed bottom-5 right-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg backdrop-blur transition-transform hover:scale-110"
      >
        {playing ? "🔊" : "🔈"}
      </button>
    </>
  );
}
