"use client";

const palette = ["#fff3d6", "#f2c86b", "#d7263d", "#fff3d6", "#2f9e6a", "#f2c86b"];
const SWAGS = 3;
const N = 25;

/** A string of fairy lights hanging in soft swags across the full width. */
export default function Garland({ className = "" }: { className?: string }) {
  const sag = (x: number) => Math.sin(Math.PI * ((x * SWAGS) % 1)); // 0 at the pins, 1 mid-swag
  const path = Array.from({ length: 121 }, (_, i) => {
    const x = i / 120;
    return `${i ? "L" : "M"}${(x * 1000).toFixed(1)} ${(4 + sag(x) * 30).toFixed(1)}`;
  }).join(" ");
  return (
    <div aria-hidden="true" className={`pointer-events-none relative h-12 w-full ${className}`}>
      <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d={path} fill="none" stroke="rgba(234,215,164,0.45)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      {Array.from({ length: N }, (_, i) => {
        const x = (i + 0.5) / N;
        const color = palette[i % palette.length];
        return (
          <span
            key={i}
            className="twinkle absolute h-[6px] w-[6px] -translate-x-1/2 rounded-full"
            style={{
              left: `${x * 100}%`,
              top: `calc(${((4 + sag(x) * 30) / 40) * 100}% + 1px)`,
              backgroundColor: color,
              boxShadow: `0 0 8px 2px ${color}aa, 0 0 18px 5px ${color}33`,
              animationDelay: `${((i * 37) % 23) / 10}s`,
              animationDuration: `${1.7 + ((i * 11) % 9) / 10}s`,
            }}
          />
        );
      })}
    </div>
  );
}
