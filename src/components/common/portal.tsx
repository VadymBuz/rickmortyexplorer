import { useId } from "react";

import { cn } from "@/lib/utils";

// Swirl arms, as [rotation in degrees, stroke width, opacity].
const ARMS = [
  [0, 6, 0.7],
  [40, 3, 0.4],
  [90, 5, 0.6],
  [130, 2.5, 0.35],
  [180, 6, 0.7],
  [220, 3, 0.4],
  [270, 5, 0.6],
  [310, 2.5, 0.35],
] as const;

/**
 * The show's green portal: a glowing disc with swirling arms and a liquid,
 * wobbly rim. Purely decorative.
 */
export function Portal({ className }: { className?: string }) {
  // Next keeps recently visited pages in the DOM (hidden), so several portals
  // can exist at once and their SVG ids must be unique.
  const id = useId();

  return (
    <svg
      viewBox="-100 -100 200 200"
      aria-hidden
      focusable="false"
      className={cn("pointer-events-none", className)}
    >
      <defs>
        <radialGradient id={`${id}-fill`}>
          <stop offset="0" stopColor="#f4ffdc" />
          <stop offset="0.16" stopColor="#d3f594" />
          <stop offset="0.5" stopColor="#97ce4c" />
          <stop offset="0.86" stopColor="#5d9b30" />
          <stop offset="1" stopColor="#3d701d" />
        </radialGradient>
        <filter id={`${id}-liquid`} x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="10" />
        </filter>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      <circle r="74" fill="#97ce4c" opacity="0.5" filter={`url(#${id}-glow)`} />
      <g filter={`url(#${id}-liquid)`}>
        <circle r="70" fill={`url(#${id}-fill)`} />
        <circle r="46" fill="none" stroke="#c9ef86" strokeWidth="3" opacity="0.35" />
        <g fill="none" stroke="#dcf7a4" strokeLinecap="round">
          {ARMS.map(([rotation, width, opacity]) => (
            <path
              key={rotation}
              d="M0 -6 C 24 -24, 58 -10, 62 26"
              transform={`rotate(${rotation})`}
              strokeWidth={width}
              opacity={opacity}
            />
          ))}
        </g>
        <circle r="14" fill="#f8ffe8" opacity="0.85" />
      </g>
    </svg>
  );
}
