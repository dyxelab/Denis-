type ThornVineProps = {
  className?: string;
  width?: number;
  height?: number;
  thorns?: number;
  id: string;
};

/**
 * Procedurally generated barbed-wire strand. Deterministic (sine-based, no RNG)
 * so server/client markup always matches.
 */
export default function ThornVine({
  className,
  width = 600,
  height = 90,
  thorns = 14,
  id,
}: ThornVineProps) {
  const strokeColor = `url(#chromeStroke-${id})`;
  const midY = height / 2;
  const amplitude = height * 0.22;

  const stemPoints: [number, number][] = [];
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const x = (width / steps) * i;
    const y = midY + Math.sin((i / steps) * Math.PI * 3.4) * amplitude;
    stemPoints.push([x, y]);
  }
  const stemPath = stemPoints
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");

  const thornEls = [];
  const barbCount = 5;
  for (let t = 0; t < thorns; t++) {
    const progress = (t + 0.5) / thorns;
    const x = progress * width;
    const y = midY + Math.sin(progress * Math.PI * 3.4) * amplitude;
    const spikeLen = height * (0.16 + 0.04 * Math.sin(progress * Math.PI * 7));
    const baseAngle = (progress * 220) % 360;

    const barbs = [];
    for (let b = 0; b < barbCount; b++) {
      const angle = baseAngle + (360 / barbCount) * b;
      const rad = (angle * Math.PI) / 180;
      const x2 = Math.cos(rad) * spikeLen;
      const y2 = Math.sin(rad) * spikeLen;
      const nx = Math.cos(rad) * spikeLen * 0.62;
      const ny = Math.sin(rad) * spikeLen * 0.62;
      const px = -Math.sin(rad);
      const py = Math.cos(rad);
      const barbSpread = spikeLen * 0.22;
      barbs.push(
        <g key={b}>
          <line x1={0} y1={0} x2={x2} y2={y2} strokeWidth={1.8} strokeLinecap="round" />
          <line
            x1={nx + px * barbSpread}
            y1={ny + py * barbSpread}
            x2={nx - px * barbSpread}
            y2={ny - py * barbSpread}
            strokeWidth={1.4}
            strokeLinecap="round"
          />
        </g>
      );
    }

    thornEls.push(
      <g key={t} transform={`translate(${x.toFixed(1)},${y.toFixed(1)})`}>
        <circle r={2.4} fill={strokeColor} />
        {barbs}
      </g>
    );
  }

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`chromeStroke-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4f4f5" />
          <stop offset="35%" stopColor="#71717a" />
          <stop offset="55%" stopColor="#e4e4e7" />
          <stop offset="80%" stopColor="#3f3f46" />
          <stop offset="100%" stopColor="#a1a1aa" />
        </linearGradient>
      </defs>
      <path
        d={stemPath}
        stroke={`url(#chromeStroke-${id})`}
        strokeWidth={2.4}
        fill="none"
      />
      <g stroke={strokeColor}>{thornEls}</g>
    </svg>
  );
}
