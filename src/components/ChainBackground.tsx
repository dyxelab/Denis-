const LINK_COUNT = 16;
const SPACING = 30;
const WIDTH = 44;
const TOP_PAD = 20;
const HEIGHT = TOP_PAD * 2 + LINK_COUNT * SPACING;

export default function ChainBackground() {
  const links = [];
  for (let i = 0; i < LINK_COUNT; i++) {
    const cy = TOP_PAD + i * SPACING;
    const vertical = i % 2 === 0;
    links.push(
      <ellipse
        key={i}
        cx={WIDTH / 2}
        cy={cy}
        rx={vertical ? 10 : 15}
        ry={vertical ? 15 : 10}
        fill="none"
        stroke="url(#chainLinkGradient)"
        strokeWidth={3.2}
      />
    );
  }

  return (
    <div className="chain-wrap" aria-hidden="true">
      <div className="chain-pull">
        <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} fill="none">
          <defs>
            <linearGradient id="chainLinkGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f4f4f5" />
              <stop offset="35%" stopColor="#6b6b72" />
              <stop offset="55%" stopColor="#e4e4e7" />
              <stop offset="80%" stopColor="#3f3f46" />
              <stop offset="100%" stopColor="#a1a1aa" />
            </linearGradient>
          </defs>
          {links}
        </svg>
      </div>
    </div>
  );
}
