// ---------------------------------------------------------------------------
// Donut.tsx  —  A reusable SVG ring/donut chart. No libraries needed.
// PLACE THIS FILE AT:  src/components/Donut.tsx
//
// Usage:
//   <Donut percent={72} label="Skill Score" sub="4 skills" gradientId="g1"
//          from="#4f8cff" to="#7c5cff" />
// ---------------------------------------------------------------------------

export function Donut({
    percent,
    label,
    sub,
    gradientId,
    from,
    to,
  }: {
    percent: number;
    label: string;
    sub?: string;
    gradientId: string;
    from: string;
    to: string;
  }) {
    const size = 132;
    const stroke = 12;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const clamped = Math.max(0, Math.min(100, percent));
    const offset = circumference - (clamped / 100) * circumference;
  
    return (
      <div className="ring-card">
        <div className="ring">
          <svg width={size} height={size}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={from} />
                <stop offset="100%" stopColor={to} />
              </linearGradient>
            </defs>
            {/* Background track */}
            <circle
              className="ring__track"
              cx={size / 2}
              cy={size / 2}
              r={radius}
            />
            {/* Coloured value arc */}
            <circle
              className="ring__value"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={`url(#${gradientId})`}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="ring__center">
            <span className="ring__pct">{clamped}%</span>
            {sub && <span className="ring__sub">{sub}</span>}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div className="ring-card__label">{label}</div>
        </div>
      </div>
    );
  }
  