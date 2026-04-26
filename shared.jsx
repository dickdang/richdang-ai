/* Shared atoms — icons, hooks, embers, skill data
   Exposed on window so all variant scripts can use them. */

/* ── Inline icon set (no external deps) ─────────────────────── */
const Icon = {
  Globe: ({ size = 20, ...p }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </svg>
  ),
  Mail: ({ size = 20, ...p }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  Github: ({ size = 20, ...p }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  ),
  Linkedin: ({ size = 20, ...p }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Calendar: ({ size = 20, ...p }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  ArrowRight: ({ size = 20, ...p }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  ArrowUpRight: ({ size = 16, ...p }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  ),
  Spark: ({ size = 18, ...p }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  ),
  Download: ({ size = 16, ...p }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  ),
};

/* ── Reveal-on-scroll hook ──────────────────────────────────── */
function useInView(opts = { threshold: 0.15, once: true }) {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        if (opts.once) io.disconnect();
      } else if (!opts.once) {
        setSeen(false);
      }
    }, { threshold: opts.threshold ?? 0.15, rootMargin: opts.rootMargin ?? '-60px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

/* ── FadeUp wrapper ─────────────────────────────────────────── */
function FadeUp({ as: Tag = 'div', delay = 0, className = '', children, style, ...rest }) {
  const [ref, seen] = useInView();
  return (
    <Tag
      ref={ref}
      className={`fade-up ${seen ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ── Embers (drifting warm particles for hero) ──────────────── */
function Embers({ count = 28 }) {
  const particles = React.useMemo(() => Array.from({ length: count }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    bottom: `${-Math.random() * 20}%`,
    delay: `${Math.random() * 12}s`,
    dur: `${10 + Math.random() * 14}s`,
    drift: `${(Math.random() - 0.5) * 80}px`,
    scale: 0.4 + Math.random() * 1.2,
    key: i,
  })), [count]);
  return (
    <div className="embers" aria-hidden>
      {particles.map(p => (
        <span
          key={p.key}
          className="ember"
          style={{
            left: p.left,
            bottom: p.bottom,
            animationDelay: p.delay,
            animationDuration: p.dur,
            transform: `scale(${p.scale})`,
            '--drift': p.drift,
          }}
        />
      ))}
    </div>
  );
}

/* ── Data ───────────────────────────────────────────────────── */
const SKILLS = [
  { tag: 'CRM',         title: 'Salesforce',                blurb: 'Pipeline hygiene, custom objects, and flow automations that keep data honest and reps moving.' },
  { tag: 'CRM',         title: 'HubSpot',                   blurb: 'Lifecycle ops, lead scoring, and reporting dashboards built for revenue clarity.' },
  { tag: 'Data',        title: 'Databricks',                blurb: 'Lakehouse pipelines and notebooks that turn warehouse sprawl into trusted, queryable surfaces.' },
  { tag: 'Motion',      title: 'Remotion',                  blurb: 'Programmatic video — sales reels, product demos, and personalized motion at scale.' },
  { tag: 'Insight',     title: 'Analysis',                  blurb: 'From cohort math to attribution audits, finding the lever before building the dashboard.' },
  { tag: 'Data',        title: 'Web Scraping',              blurb: 'Headless crawlers and structured extraction pipelines for competitive and market signal.' },
  { tag: 'Growth',      title: 'Funnel Optimization',       blurb: 'Conversion teardown, experiment design, and step-by-step lift across the full funnel.' },
  { tag: 'Agents',      title: 'Sales Enablement Agents',   blurb: 'Account research, call prep, and follow-up agents that make every rep look senior.' },
];

const RESUME = [
  { year: '2024 — 2026', role: 'Head of Revenue Operations',                   org: 'Plooto' },
  { year: '2022 — 2024', role: 'Head of Business Ops, Finance & RevOps',       org: 'Briq' },
  { year: '2022',        role: 'SaaS Sales Consultant',                        org: 'Relay Financial & Opencare' },
  { year: '2020 — 2022', role: 'VP of Sales',                                  org: 'Notch' },
  { year: '2018 — 2020', role: 'Program Manager, Sales Strategy & Operations', org: 'Uber Eats' },
  { year: '2013 — 2018', role: 'Sales Manager',                                org: 'FreshBooks' },
];

const CONTACT = {
  email:    'richtdang@gmail.com',
  linkedin: 'https://www.linkedin.com/in/richdang/',
  github:   'https://github.com/dickdang',
  cal:      'https://calendly.com/richdang/30-minute-meeting',
};

Object.assign(window, { Icon, useInView, FadeUp, Embers, SKILLS, RESUME, CONTACT });
