import { useEffect, useRef, useState } from "react";

const AUDIO_SOURCES = [
  "/Love Me Like You Do.mp3",
  "/music.mp3"
];

/**
 * Background music toggle. Starts paused (browsers block autoplay-with-sound
 * anyway, so there's no point fighting that) and lets the visitor opt in.
 *
 * Checks configured audio sources (`public/Love Me Like You Do.mp3` or `public/music.mp3`)
 * and hides itself entirely if missing.
 */
export default function MusicToggle() {
  const audioRef = useRef(null);
  const [available, setAvailable] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [srcIndex, setSrcIndex] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    function handleError() {
      if (srcIndex < AUDIO_SOURCES.length - 1) {
        setSrcIndex((prev) => prev + 1);
      } else {
        setAvailable(false);
      }
    }

    audio.addEventListener("error", handleError);
    return () => audio.removeEventListener("error", handleError);
  }, [srcIndex]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {
        if (srcIndex < AUDIO_SOURCES.length - 1) {
          setSrcIndex((prev) => prev + 1);
        } else {
          setAvailable(false);
        }
      });
      setPlaying(true);
    }
  }

  if (!available) return null;

  return (
    <>
      <audio ref={audioRef} src={AUDIO_SOURCES[srcIndex]} loop preload="none" />
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
