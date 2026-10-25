"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import AiBadge from "./AiBadge";

/** How long the "KI-generiert" seal stays on the film once it plays. */
const BADGE_SECONDS = 3;

/**
 * Box around the intro film carrying the AI seal. The seal shows on the
 * poster and during the first seconds only, then fades out so it does not
 * sit on the film; seeking back to the start brings it back.
 */
export default function IntroVideoFrame({
  badgeLabel,
  children,
}: {
  badgeLabel: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);

  useEffect(() => {
    const video = ref.current?.querySelector("video");
    if (!video) return;
    const update = () => setAtStart(video.currentTime < BADGE_SECONDS);
    video.addEventListener("timeupdate", update);
    video.addEventListener("seeked", update);
    return () => {
      video.removeEventListener("timeupdate", update);
      video.removeEventListener("seeked", update);
    };
  }, []);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[min(360px,calc(70svh*9/16))]">
      {children}
      <AiBadge label={badgeLabel} kind="video" lazy hidden={!atStart} />
    </div>
  );
}
