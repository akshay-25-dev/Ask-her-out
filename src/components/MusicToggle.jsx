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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let seeked = false;

    const setInitialTime = () => {
      if (!seeked && audio.duration >= START_TIME_SECONDS) {
        try {
          audio.currentTime = START_TIME_SECONDS;
          seeked = true;
        } catch (e) {
          // ignore
        }
      }
    };

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleError = () => {
      if (srcIndex < AUDIO_SOURCES.length - 1) {
        setSrcIndex((prev) => prev + 1);
        seeked = false;
      } else {
        setAvailable(false);
      }
    };

    audio.addEventListener("loadedmetadata", setInitialTime);
    audio.addEventListener("canplay", setInitialTime);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    if (audio.readyState >= 1) {
      setInitialTime();
    }

    return () => {
      audio.removeEventListener("loadedmetadata", setInitialTime);
      audio.removeEventListener("canplay", setInitialTime);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
    };
  }, [srcIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !available) return;

    let isSubscribed = true;

    const tryPlay = () => {
      if (!audio) return;
      if (audio.currentTime < START_TIME_SECONDS) {
        try {
          audio.currentTime = START_TIME_SECONDS;
        } catch {
          // ignore
        }
      }
      audio.play().then(() => {
        if (isSubscribed) {
          removeListeners();
        }
      }).catch(() => {
        // Autoplay blocked by browser policy; user interaction listener remains active
      });
    };

    const handleUserInteraction = () => {
      tryPlay();
    };

    const events = ["click", "touchstart", "pointerdown", "keydown"];
    const addListeners = () => {
      events.forEach((evt) => window.addEventListener(evt, handleUserInteraction));
    };
    const removeListeners = () => {
      events.forEach((evt) => window.removeEventListener(evt, handleUserInteraction));
    };

    tryPlay();
    addListeners();

    return () => {
      isSubscribed = false;
      removeListeners();
    };
  }, [available, srcIndex]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
    } else {
      if (audio.currentTime < START_TIME_SECONDS) {
        try {
          audio.currentTime = START_TIME_SECONDS;
        } catch {
          // ignore
        }
      }
      audio.play().catch(() => {});
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
