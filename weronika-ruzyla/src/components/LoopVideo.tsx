"use client";

import { useEffect, useRef } from "react";

type Props = { src: string; webm?: string; poster: string; className?: string };

/** Muted looping clip that only plays while on screen, so off-screen videos cost nothing. */
export default function LoopVideo({ src, webm, poster, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    >
      {/* H.264 for Safari and most browsers, VP9 for builds without H.264 */}
      <source src={src} type="video/mp4" />
      {webm && <source src={webm} type="video/webm" />}
    </video>
  );
}
