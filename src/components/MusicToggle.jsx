import { useEffect, useRef, useState } from "react";

const AUDIO_SOURCES = [
  "/Love Me Like You Do.mp3",
  "/music.mp3"
];

const START_TIME_SECONDS = 16;

/**
 * Persistent background music toggle. Plays automatically when the site opens
 * (starting at 16s). Shows a sweet "Open Invitation 💌" overlay if browser autoplay policy
 * blocks unmuted sound on initial page load.
 */
export default function MusicToggle() {
  const audioRef = useRef(null);
  const [available, setAvailable] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [srcIndex, setSrcIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let seeked = false;

    const setInitialTime = () => {
      if (!seeked && audio.duration >= START_TIME_SECONDS) {
        try {
          audio.currentTime = START_TIME_SECONDS;
          seeked = true;
        } catch {
          // ignore
        }
      }
    };

    const updatePlayingState = () => {
      setPlaying(!audio.paused && !audio.muted && audio.volume > 0);
    };

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
    audio.addEventListener("play", updatePlayingState);
    audio.addEventListener("pause", updatePlayingState);
    audio.addEventListener("volumechange", updatePlayingState);
    audio.addEventListener("error", handleError);

    if (audio.readyState >= 1) {
      setInitialTime();
    }

    return () => {
      audio.removeEventListener("loadedmetadata", setInitialTime);
      audio.removeEventListener("canplay", setInitialTime);
      audio.removeEventListener("play", updatePlayingState);
      audio.removeEventListener("pause", updatePlayingState);
      audio.removeEventListener("volumechange", updatePlayingState);
      audio.removeEventListener("error", handleError);
    };
  }, [srcIndex]);

  const startMusicUnmuted = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.readyState >= 1 && audio.currentTime < START_TIME_SECONDS) {
      try {
        audio.currentTime = START_TIME_SECONDS;
      } catch {
        // ignore
      }
    }

    audio.muted = false;
    audio.play().then(() => {
      setShowOverlay(false);
      setPlaying(true);
    }).catch(() => {
      setShowOverlay(true);
    });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !available) return;

    if (sessionStorage.getItem("music_started") === "true") {
      startMusicUnmuted();
      return;
    }

    if (audio.readyState >= 1 && audio.currentTime < START_TIME_SECONDS) {
      try {
        audio.currentTime = START_TIME_SECONDS;
      } catch {
        // ignore
      }
    }

    audio.muted = false;
    audio.play().then(() => {
      setPlaying(true);
      sessionStorage.setItem("music_started", "true");
    }).catch(() => {
      setShowOverlay(true);
    });
  }, [available, srcIndex]);

  const handleOpenInvitation = () => {
    sessionStorage.setItem("music_started", "true");
    startMusicUnmuted();
  };

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      startMusicUnmuted();
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
        playsInline
      />

      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-pop">
          <div className="flex max-w-sm flex-col items-center rounded-3xl bg-white/95 p-8 text-center shadow-2xl backdrop-blur">
            <div className="mb-4 text-5xl animate-bounce">💌</div>
            <h3 className="font-display text-2xl font-bold text-ink">
              You've got a message!
            </h3>
            <p className="mt-2 text-sm text-ink/70">
              Tap below to open your special invitation with sound 💖
            </p>
            <button
              type="button"
              onClick={handleOpenInvitation}
              className="mt-6 w-full rounded-full bg-rose py-4 text-lg font-bold text-white shadow-lg shadow-rose/30 transition-transform hover:scale-105 active:scale-95"
            >
              Open Invitation 💌
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background music" : "Play background music"}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg backdrop-blur transition-transform hover:scale-110"
      >
        {playing ? "🔊" : "🔈"}
      </button>
    </>
  );
}
