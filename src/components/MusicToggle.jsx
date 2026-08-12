import { useEffect, useRef, useState } from "react";

const AUDIO_SOURCES = [
  "/Love Me Like You Do.mp3",
  "/music.mp3"
];

const START_TIME_SECONDS = 16;

/**
 * Persistent background music toggle. Plays automatically when the site opens
 * (starting at 16s), or upon first user interaction if blocked by autoplay policy.
 */
export default function MusicToggle() {
  const audioRef = useRef(null);
  const [available, setAvailable] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [srcIndex, setSrcIndex] = useState(0);
  const hasSeekedRef = useRef(false);

  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio) return Promise.resolve(false);

    if (!hasSeekedRef.current || audio.currentTime < START_TIME_SECONDS) {
      try {
        audio.currentTime = START_TIME_SECONDS;
      } catch {
        // ignore if metadata not loaded yet
      }
      hasSeekedRef.current = true;
    }

    return audio.play()
      .then(() => {
        setPlaying(true);
        return true;
      })
      .catch(() => {
        return false;
      });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    function handleError() {
      if (srcIndex < AUDIO_SOURCES.length - 1) {
        setSrcIndex((prev) => prev + 1);
        hasSeekedRef.current = false;
      } else {
        setAvailable(false);
      }
    }

    audio.addEventListener("error", handleError);
    return () => audio.removeEventListener("error", handleError);
  }, [srcIndex]);

  useEffect(() => {
    if (!available) return;

    let started = false;

    const handleStart = () => {
      if (started) return;
      playAudio().then((success) => {
        if (success) {
          started = true;
          removeListeners();
        }
      });
    };

    const events = ["click", "touchstart", "pointerdown", "keydown"];
    const addListeners = () => {
      events.forEach((evt) => window.addEventListener(evt, handleStart, { once: true }));
    };
    const removeListeners = () => {
      events.forEach((evt) => window.removeEventListener(evt, handleStart));
    };

    // Attempt immediate autoplay on mount
    handleStart();
    addListeners();

    return () => {
      removeListeners();
    };
  }, [available, srcIndex]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      playAudio();
    }
  }

  if (!available) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_SOURCES[srcIndex]}
        loop
        preload="auto"
        autoPlay
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background music" : "Play background music"}
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg backdrop-blur transition-transform hover:scale-110"
      >
        {playing ? "🔊" : "🔈"}
      </button>
    </>
  );
}
