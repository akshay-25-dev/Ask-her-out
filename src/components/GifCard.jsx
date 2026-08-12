import { useState } from "react";

export default function GifCard({ src, alt, fallbackEmoji = "💛" }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex h-56 w-56 items-center justify-center overflow-hidden rounded-3xl bg-white/60 shadow-lg sm:h-64 sm:w-64">
      {failed ? (
        <span className="text-7xl" role="img" aria-label={alt}>
          {fallbackEmoji}
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
