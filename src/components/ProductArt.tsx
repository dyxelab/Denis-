type IconProps = { className?: string };

const gradientDefs = (id: string) => (
  <defs>
    <linearGradient id={`glossBlack-${id}`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#3f3f46" />
      <stop offset="45%" stopColor="#0a0a0a" />
      <stop offset="60%" stopColor="#18181b" />
      <stop offset="100%" stopColor="#000000" />
    </linearGradient>
    <linearGradient id={`sheen-${id}`} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
      <stop offset="50%" stopColor="#ffffff" stopOpacity="0.35" />
      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
    </linearGradient>
  </defs>
);

export function TeeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {gradientDefs("tee")}
      <path
        d="M70 30 L100 45 L130 30 L165 55 L148 82 L130 70 L130 175 L70 175 L70 70 L52 82 L35 55 Z"
        fill="url(#glossBlack-tee)"
        stroke="#52525b"
        strokeWidth="1.5"
      />
      <path d="M70 30 Q100 60 130 30" fill="none" stroke="#3f3f46" strokeWidth="1.5" />
      <path d="M90 45 L100 40 L110 45" fill="none" stroke="#71717a" strokeWidth="1" />
      <rect x="66" y="30" width="10" height="140" fill="url(#sheen-tee)" transform="skewX(-8)" />
    </svg>
  );
}

export function CapIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {gradientDefs("cap")}
      <path
        d="M40 120 Q100 65 165 100 L175 112 Q110 88 45 132 Z"
        fill="url(#glossBlack-cap)"
        stroke="#52525b"
        strokeWidth="1.5"
      />
      <path
        d="M45 132 Q100 92 170 113 Q160 165 100 165 Q48 165 45 132 Z"
        fill="url(#glossBlack-cap)"
        stroke="#52525b"
        strokeWidth="1.5"
      />
      <circle cx="100" cy="112" r="4" fill="#71717a" />
      <path d="M60 130 Q100 105 150 118" fill="none" stroke="#3f3f46" strokeWidth="1" />
      <rect x="55" y="95" width="12" height="70" fill="url(#sheen-cap)" transform="rotate(20 55 95)" />
    </svg>
  );
}

export function BagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {gradientDefs("bag")}
      <path
        d="M55 70 L145 70 L155 175 L45 175 Z"
        fill="url(#glossBlack-bag)"
        stroke="#52525b"
        strokeWidth="1.5"
      />
      <path
        d="M75 70 L75 50 Q75 30 100 30 Q125 30 125 50 L125 70"
        fill="none"
        stroke="#71717a"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M55 70 L145 70" stroke="#3f3f46" strokeWidth="1.5" />
      <rect x="60" y="90" width="10" height="70" fill="url(#sheen-bag)" transform="skewX(-6)" />
    </svg>
  );
}

export function HoodieIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {gradientDefs("hoodie")}
      <path
        d="M65 35 Q100 15 135 35 L170 58 L152 86 L135 74 L135 175 L65 175 L65 74 L48 86 L30 58 Z"
        fill="url(#glossBlack-hoodie)"
        stroke="#52525b"
        strokeWidth="1.5"
      />
      <path d="M78 40 Q100 70 122 40" fill="none" stroke="#3f3f46" strokeWidth="1.5" />
      <path d="M90 100 L90 140" stroke="#3f3f46" strokeWidth="1.5" />
      <path d="M110 100 L110 140" stroke="#3f3f46" strokeWidth="1.5" />
      <rect x="64" y="40" width="10" height="135" fill="url(#sheen-hoodie)" transform="skewX(-8)" />
    </svg>
  );
}

export function BootIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {gradientDefs("boot")}
      <path
        d="M75 30 L130 30 L130 110 Q150 118 165 140 Q172 155 160 165 L45 165 Q35 155 42 140 L75 120 Z"
        fill="url(#glossBlack-boot)"
        stroke="#52525b"
        strokeWidth="1.5"
      />
      <path d="M75 55 L130 55" stroke="#3f3f46" strokeWidth="1.5" />
      <path d="M75 75 L130 75" stroke="#3f3f46" strokeWidth="1.5" />
      <path d="M75 95 L130 95" stroke="#3f3f46" strokeWidth="1.5" />
      <path d="M45 150 L160 150" stroke="#71717a" strokeWidth="3" />
      <rect x="78" y="35" width="10" height="80" fill="url(#sheen-boot)" transform="skewX(-6)" />
    </svg>
  );
}

export function ChainIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {gradientDefs("chain")}
      {Array.from({ length: 6 }).map((_, i) => (
        <ellipse
          key={i}
          cx={70 + (i % 2 === 0 ? 0 : 26)}
          cy={40 + i * 26}
          rx="16"
          ry="22"
          fill="none"
          stroke="url(#glossBlack-chain)"
          strokeWidth="8"
          transform={i % 2 === 0 ? undefined : `rotate(90 ${70 + 26} ${40 + i * 26})`}
        />
      ))}
    </svg>
  );
}
