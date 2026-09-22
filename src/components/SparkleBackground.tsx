type Dot = { top: number; left: number; size: number; delay: number; dur: number };
type Glow = { top: number; left: number; size: number; delay: number; dur: number };
type Sparkle = { top: number; left: number; size: number; delay: number; dur: number };

// Fixed, hand-picked positions (not computed at runtime) so server and
// client markup always match exactly.
const dots: Dot[] = [
  { top: 25.87, left: 86.24, size: 2.8, delay: 2.04, dur: 8.63 },
  { top: 39.56, left: 19.84, size: 3.4, delay: 0.02, dur: 6.27 },
  { top: 69.61, left: 60.77, size: 2.5, delay: 2.79, dur: 4.23 },
  { top: 35.55, left: 76.99, size: 3, delay: 3.21, dur: 6.84 },
  { top: 79.58, left: 91.18, size: 2.2, delay: 0.79, dur: 4.06 },
  { top: 55.12, left: 77.94, size: 3.2, delay: 0.92, dur: 7.6 },
  { top: 29.57, left: 46.44, size: 2.2, delay: 5.45, dur: 7.1 },
  { top: 58.35, left: 69.56, size: 2.5, delay: 5.31, dur: 8.2 },
  { top: 40.5, left: 23.73, size: 2.8, delay: 5.92, dur: 7.55 },
  { top: 43.73, left: 28.24, size: 2.8, delay: 8, dur: 7.72 },
  { top: 54.62, left: 52.85, size: 1.7, delay: 0.67, dur: 7.26 },
  { top: 63.07, left: 83.41, size: 3.2, delay: 3.69, dur: 4.7 },
  { top: 21.55, left: 43.62, size: 1.8, delay: 6.55, dur: 4.54 },
  { top: 90.33, left: 98.61, size: 2.4, delay: 2.75, dur: 5.27 },
  { top: 98.5, left: 50.83, size: 2.8, delay: 3.85, dur: 6.76 },
  { top: 90.43, left: 62.01, size: 3.2, delay: 0.12, dur: 4.71 },
  { top: 62.78, left: 52.25, size: 3.4, delay: 7.06, dur: 5.64 },
  { top: 99.58, left: 40.92, size: 1.6, delay: 7.64, dur: 8.4 },
  { top: 78.03, left: 79.72, size: 2, delay: 0.53, dur: 6.86 },
  { top: 77.2, left: 79.23, size: 2.3, delay: 6.58, dur: 7.36 },
  { top: 87.65, left: 42.81, size: 3.3, delay: 2.45, dur: 7.31 },
  { top: 56.67, left: 80.45, size: 2.7, delay: 0.84, dur: 5.58 },
  { top: 71.16, left: 76.59, size: 1.7, delay: 6.11, dur: 8.99 },
  { top: 61.08, left: 79.72, size: 2.9, delay: 3.95, dur: 6.3 },
  { top: 36.8, left: 98.5, size: 2.7, delay: 1.66, dur: 6.17 },
  { top: 62.69, left: 96.59, size: 1.6, delay: 3.21, dur: 4.26 },
  { top: 35.55, left: 35.86, size: 2.9, delay: 6.61, dur: 8.99 },
  { top: 21.57, left: 92.87, size: 2.3, delay: 4.06, dur: 4.4 },
  { top: 72.29, left: 36.79, size: 1.7, delay: 3.48, dur: 4.57 },
  { top: 16.77, left: 20.24, size: 1.5, delay: 0.93, dur: 5.61 },
  { top: 1.92, left: 63.81, size: 3, delay: 7.4, dur: 4.61 },
  { top: 23.42, left: 24.32, size: 3, delay: 0.04, dur: 4.67 },
  { top: 26.58, left: 79.86, size: 1.8, delay: 1.62, dur: 9 },
  { top: 40.05, left: 55.78, size: 3.1, delay: 0.62, dur: 7.03 },
  { top: 18.73, left: 4.37, size: 2.2, delay: 3.84, dur: 8.13 },
  { top: 45.09, left: 60, size: 2.3, delay: 7.35, dur: 4.85 },
  { top: 36.44, left: 41.44, size: 2.7, delay: 6.03, dur: 8.68 },
  { top: 94.55, left: 15.28, size: 2.5, delay: 1.47, dur: 8.84 },
  { top: 7.97, left: 93.5, size: 1.9, delay: 3.83, dur: 4.44 },
  { top: 28.03, left: 18.59, size: 2.8, delay: 2.04, dur: 4.93 },
  { top: 49.59, left: 97.88, size: 2.8, delay: 3.8, dur: 5.38 },
  { top: 74.44, left: 48.5, size: 2.8, delay: 7.44, dur: 8.26 },
  { top: 61.13, left: 53.92, size: 1.6, delay: 3.6, dur: 8.67 },
  { top: 77.84, left: 52.97, size: 1.6, delay: 1.54, dur: 5.74 },
  { top: 71.72, left: 69.93, size: 1.9, delay: 6.9, dur: 6.07 },
  { top: 40.6, left: 14.07, size: 1.6, delay: 2.49, dur: 5.7 },
  { top: 4.6, left: 99.94, size: 3, delay: 3.98, dur: 5.65 },
  { top: 53.48, left: 44.54, size: 1.9, delay: 2.06, dur: 7.42 },
  { top: 57.76, left: 88.75, size: 2.4, delay: 3.91, dur: 7.01 },
  { top: 73.35, left: 37.21, size: 2, delay: 6.93, dur: 8.29 },
];

const glows: Glow[] = [
  { top: 65.4, left: 26.8, size: 78, delay: 3.8, dur: 24.3 },
  { top: 2.4, left: 42.2, size: 108, delay: 0.1, dur: 20.8 },
  { top: 97.2, left: 72.7, size: 125, delay: 8.4, dur: 18.5 },
  { top: 81.5, left: 81.7, size: 66, delay: 3.7, dur: 28.9 },
  { top: 2.6, left: 3.1, size: 116, delay: 2.7, dur: 22.7 },
  { top: 98.8, left: 57, size: 105, delay: 3.9, dur: 31.5 },
  { top: 65.6, left: 52.9, size: 102, delay: 9.1, dur: 23.6 },
];

const sparkles: Sparkle[] = [
  { top: 91.6, left: 53.9, size: 20, delay: 0.86, dur: 5.06 },
  { top: 53.2, left: 8.7, size: 18, delay: 1.67, dur: 5.28 },
  { top: 75.6, left: 34.7, size: 11, delay: 2.87, dur: 4.34 },
  { top: 90.8, left: 69.8, size: 17, delay: 4.87, dur: 3.76 },
  { top: 27.2, left: 86.4, size: 11, delay: 3.72, dur: 3.82 },
  { top: 18.9, left: 78.8, size: 13, delay: 1.86, dur: 5.08 },
];

function SparkleGlint({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

export default function SparkleBackground() {
  return (
    <div className="sparkle-bg" aria-hidden="true">
      {glows.map((g, i) => (
        <div
          key={`glow-${i}`}
          className="sparkle-glow"
          style={{
            top: `${g.top}%`,
            left: `${g.left}%`,
            width: `${g.size}vw`,
            height: `${g.size}vw`,
            animationDelay: `${g.delay}s`,
            animationDuration: `${g.dur}s`,
          }}
        />
      ))}
      {dots.map((d, i) => (
        <div
          key={`dot-${i}`}
          className="sparkle-dot"
          style={{
            top: `${d.top}%`,
            left: `${d.left}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.dur}s`,
          }}
        />
      ))}
      {sparkles.map((s, i) => (
        <div
          key={`sparkle-${i}`}
          className="sparkle-star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        >
          <SparkleGlint size={s.size} />
        </div>
      ))}
    </div>
  );
}
