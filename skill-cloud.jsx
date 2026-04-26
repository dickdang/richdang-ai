/* Skill cloud — fluid-drift word cloud with hover proficiency badges. */

const CLOUD_SKILLS = [
  // Tier 1 — anchors (4)
  { name: 'Salesforce',          tier: 1, level: 'Expert' },
  { name: 'Claude',              tier: 1, level: 'Expert' },
  { name: 'Forecasting',         tier: 1, level: 'Expert' },
  { name: 'Funnel Optimization', tier: 1, level: 'Expert' },

  // Tier 2 — strong (9)
  { name: 'Outreach',            tier: 2, level: 'Expert' },
  { name: 'SalesLoft',           tier: 2, level: 'Advanced' },
  { name: 'Gong',                tier: 2, level: 'Advanced' },
  { name: 'LeanData',            tier: 2, level: 'Advanced' },
  { name: 'Databricks',          tier: 2, level: 'Advanced' },
  { name: 'Budgets & Actuals',   tier: 2, level: 'Expert' },
  { name: 'Sales Enablement Agents', tier: 2, level: 'Expert' },
  { name: 'ChatGPT',             tier: 2, level: 'Advanced' },
  { name: 'Gemini',              tier: 2, level: 'Advanced' },

  // Tier 3 — working (9)
  { name: 'HubSpot',             tier: 3, level: 'Intermediate' },
  { name: 'Momentum',            tier: 3, level: 'Intermediate' },
  { name: 'RingDNA',             tier: 3, level: 'Intermediate' },
  { name: 'Aircall',             tier: 3, level: 'Advanced' },
  { name: 'NetSuite',            tier: 3, level: 'Intermediate' },
  { name: 'QuickBooks Online',   tier: 3, level: 'Intermediate' },
  { name: 'Web Scraping',        tier: 3, level: 'Advanced' },
  { name: 'Remotion',            tier: 3, level: 'Intermediate' },
  { name: 'AWS',                 tier: 3, level: 'Intermediate' },
];

function rng(seed) { let s = seed * 9301 + 49297; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }

const POSITIONS = [
  // Tier 1 — anchors (4)
  { x: 22, y: 38 },
  { x: 56, y: 30 },
  { x: 30, y: 70 },
  { x: 72, y: 64 },

  // Tier 2 — second ring (9)
  { x: 10, y: 18 },
  { x: 38, y: 14 },
  { x: 78, y: 14 },
  { x: 92, y: 32 },
  { x: 8,  y: 58 },
  { x: 92, y: 50 },
  { x: 50, y: 50 },
  { x: 16, y: 84 },
  { x: 90, y: 80 },

  // Tier 3 — outer scatter (9)
  { x: 64, y: 8 },
  { x: 5,  y: 38 },
  { x: 88, y: 64 },
  { x: 60, y: 88 },
  { x: 38, y: 92 },
  { x: 76, y: 44 },
  { x: 4,  y: 76 },
  { x: 50, y: 70 },
  { x: 22, y: 56 },
];

const TIER_STYLE = {
  1: { size: 56, weight: 600, opacity: 1.00 },
  2: { size: 36, weight: 600, opacity: 0.95 },
  3: { size: 24, weight: 500, opacity: 0.80 },
  4: { size: 16, weight: 500, opacity: 0.55 },
};

function SkillCloud({ accent = '#e8a87c' }) {
  const [hoverIdx, setHoverIdx] = React.useState(null);

  return (
    <div className="liquid-glass" style={{
      borderRadius: 28, position: 'relative', overflow: 'hidden',
      background: '#0a0810',
      aspectRatio: '16 / 9', minHeight: 520,
    }}>
      {/* Falling-binary background layer */}
      <div className="binary-rain" aria-hidden />
      {/* Soft warm glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 60% 50% at 50% 60%, ${accent}18 0%, transparent 65%)`,
      }} />

      {/* Words */}
      {CLOUD_SKILLS.map((s, i) => {
        const pos = POSITIONS[i] || { x: 50, y: 50 };
        const tier = TIER_STYLE[s.tier];
        const r = rng(i + 1);
        const dur = 14 + r() * 14;
        const delay = -(r() * 20);
        const dxA = (r() - 0.5) * 22;
        const dyA = (r() - 0.5) * 22;
        const rotA = (r() - 0.5) * 4;
        const isHover = hoverIdx === i;
        return (
          <span
            key={s.name}
            onMouseEnter={() => setHoverIdx(i)}
            onMouseLeave={() => setHoverIdx(h => (h === i ? null : h))}
            style={{
              position: 'absolute',
              left: `${pos.x}%`, top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)',
              fontFamily: 'var(--sans)',
              fontSize: tier.size,
              fontWeight: tier.weight,
              letterSpacing: '-0.01em',
              color: isHover ? accent : `rgba(245, 240, 232, ${tier.opacity})`,
              textShadow: isHover ? `0 0 24px ${accent}66` : 'none',
              cursor: 'default',
              whiteSpace: 'nowrap',
              transition: 'color .18s, text-shadow .18s, transform .18s cubic-bezier(.2,.7,.3,1)',
              animation: `cloud-drift-${i} ${dur}s ease-in-out ${delay}s infinite alternate`,
              zIndex: isHover ? 20 : (s.tier === 1 ? 4 : (s.tier === 2 ? 3 : 2)),
            }}
          >
            <style>{`
              @keyframes cloud-drift-${i} {
                0%   { translate: 0 0; rotate: 0deg; }
                100% { translate: ${dxA}px ${dyA}px; rotate: ${rotA}deg; }
              }
            `}</style>
            {s.name}
            {isHover && (
              <span style={{
                position: 'absolute',
                bottom: 'calc(100% + 8px)', left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'var(--mono)', fontSize: 10,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: accent,
                background: 'rgba(8, 6, 12, 0.85)',
                border: `1px solid ${accent}`,
                borderRadius: 999,
                padding: '5px 12px',
                whiteSpace: 'nowrap',
                animation: 'badge-in .25s cubic-bezier(.2,.7,.3,1)',
                boxShadow: `0 0 20px ${accent}30`,
              }}>
                {s.level}
              </span>
            )}
          </span>
        );
      })}

      <style>{`
        .binary-rain {
          position: absolute; inset: 0; pointer-events: none;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: rgba(245, 240, 232, 0.04);
          overflow: hidden;
          letter-spacing: 0.15em;
        }
        .binary-rain::before, .binary-rain::after {
          content: "01001 10110 11010 01101 11001 00101 10011 01110 11001 00110 10110 01001 11010 00101 10011 01110 11001 00110 10110 01001 11010 00101 10011 01110 11001 00110 10110 01001 11010 00101 10011 01110 11001 00110 10110 01001 11010 00101 10011 01110 11001 00110 10110";
          position: absolute; left: 0; top: 0; width: 100%;
          word-break: break-all; line-height: 1.8;
          writing-mode: vertical-rl;
          height: 200%;
          animation: rain 28s linear infinite;
        }
        .binary-rain::after {
          left: 50%; animation-duration: 36s; animation-delay: -10s;
          color: rgba(245, 240, 232, 0.025);
        }
        @keyframes rain { from { transform: translateY(-50%); } to { transform: translateY(0%); } }
        @keyframes badge-in {
          from { opacity: 0; transform: translateX(-50%) translateY(6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}

window.SkillCloud = SkillCloud;
