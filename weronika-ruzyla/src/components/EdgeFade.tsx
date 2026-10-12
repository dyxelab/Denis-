// cosine ease: flat at both ends, so the blend starts and lands without a visible edge
const STOPS: [number, number][] = [
  [0, 1.000], [0.0625, 0.990], [0.125, 0.962], [0.1875, 0.916], [0.25, 0.854], [0.3125, 0.778], [0.375, 0.691], [0.4375, 0.598], [0.5, 0.500], [0.5625, 0.402], [0.625, 0.309], [0.6875, 0.222], [0.75, 0.146], [0.8125, 0.084], [0.875, 0.038], [0.9375, 0.010], [1, 0.000],
];

function rgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

/**
 * Soft blend at the bottom of a section, ending exactly in the colour the next section starts with,
 * so blocks melt into each other instead of meeting on a hard line. Its height matches the
 * section's bottom padding, so it never sits over the content.
 */
export default function EdgeFade({ color, className = "h-14 md:h-20" }: { color: string; className?: string }) {
  const stops = STOPS.map(([p, a]) => `${rgba(color, a)} ${(p * 100).toFixed(1)}%`).join(", ");
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 ${className}`}
      style={{ background: `linear-gradient(to top, ${stops})` }}
    />
  );
}
