const UNIT_LINKS = 30;
const SPACING = 34;
const BASE_Y = 30;
const SAG_AMPLITUDE = 5;
const TOTAL_LINKS = UNIT_LINKS * 2;
const UNIT_WIDTH = UNIT_LINKS * SPACING;
const TOTAL_WIDTH = UNIT_WIDTH * 2;
const HEIGHT = BASE_Y * 2;

function Link({ cx, cy, rx, ry }: { cx: number; cy: number; rx: number; ry: number }) {
  return (
    <g>
      {/* soft cast shadow for depth */}
      <ellipse cx={cx + 1.6} cy={cy + 2.4} rx={rx} ry={ry} fill="none" stroke="#000000" strokeOpacity={0.4} strokeWidth={4.6} />
      {/* metallic body */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="url(#chainLinkGradient)" strokeWidth={4} />
      {/* specular highlight */}
      <ellipse
        cx={cx - rx * 0.12}
        cy={cy - ry * 0.18}
        rx={rx * 0.72}
        ry={ry * 0.72}
        fill="none"
        stroke="#ffffff"
        strokeOpacity={0.45}
        strokeWidth={1.2}
      />
    </g>
  );
}

export default function ChainBackground() {
  const links = [];
  for (let i = 0; i < TOTAL_LINKS; i++) {
    const patternIndex = i % UNIT_LINKS;
    const cx = SPACING / 2 + i * SPACING;
    const cy = BASE_Y + Math.sin(patternIndex * 0.35) * SAG_AMPLITUDE;
    const edgeOn = i % 2 === 0;
    links.push(
      <Link key={i} cx={cx} cy={cy} rx={edgeOn ? 9 : 15} ry={edgeOn ? 15 : 9} />
    );
  }

  return (
    <div className="chain-wrap" aria-hidden="true">
      <div className="chain-track" style={{ width: TOTAL_WIDTH }}>
        <svg width={TOTAL_WIDTH} height={HEIGHT} viewBox={`0 0 ${TOTAL_WIDTH} ${HEIGHT}`} fill="none">
          <defs>
            <linearGradient id="chainLinkGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f4f4f5" />
              <stop offset="30%" stopColor="#6b6b72" />
              <stop offset="52%" stopColor="#e4e4e7" />
              <stop offset="78%" stopColor="#3f3f46" />
              <stop offset="100%" stopColor="#a1a1aa" />
            </linearGradient>
          </defs>
          {links}
        </svg>
      </div>
    </div>
  );
}
