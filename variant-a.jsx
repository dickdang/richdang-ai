/* Variant A — Cinematic Warm Glass
   Hero with cosmic background, serif headline, glass nav,
   sections for skills / about / resume / contact / book. */

function VariantA({ tweaks }) {
  const accent = tweaks?.accent || '#ffa45a';
  const heroImgRef = React.useRef(null);
  const heroSectionRef = React.useRef(null);

  return (
    <div className="page-root" style={{ background: 'transparent', color: 'var(--ink)', minHeight: '100%', position: 'relative', zIndex: 1 }}>
      {/* ──────────── HERO ──────────── */}
      <section ref={heroSectionRef} style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div className="cosmic-bg" />
        <Embers count={32} />

        {/* Top-band sparkles */}
        <Sparkles
          anchorRef={heroSectionRef}
          region={{ left: 0.00, top: 0.06, right: 1.00, bottom: 0.30 }}
          count={90}
          cursorRadius={180}
          cursorStrength={2.2}
          style={{ zIndex: 5, mixBlendMode: 'screen' }}
        />

        {/* Hero content — left text + right figure */}
        <div className="hero-grid" style={{
          position: 'relative', zIndex: 10, flex: 1,
          display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 48, alignItems: 'center',
          padding: '20px 64px 80px', maxWidth: 1280, margin: '0 auto', width: '100%',
        }}>
          {/* Left: text */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 20, color: 'var(--ink-mute)', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 999, background: accent, boxShadow: `0 0 8px ${accent}` }} />
              <span style={{ fontFamily: 'var(--mono)' }}>LOCATION:</span>
              <span style={{ color: 'var(--ink-dim)' }}>Toronto, Ontario · Canada</span>
            </div>
            <h1 className="hero-h1" style={{
              fontSize: 'clamp(56px, 7.5vw, 120px)',
              margin: 0, lineHeight: 1.05,
              paddingBottom: '0.12em',
            }}>
              Rich <em>Dang</em>
            </h1>
            <p style={{
              maxWidth: 520, margin: '28px 0 0',
              fontSize: 18, lineHeight: 1.6, color: 'var(--ink-dim)',
            }}>
              Revenue leader, AI enthusiast, and systems builder. I turn intuition,
              data, and automation into scalable growth engines.
            </p>

            {/* Social row */}
            <div style={{ marginTop: 32, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[
                { icon: <Icon.Mail />,     href: `mailto:${CONTACT.email}`, label: 'Email',          external: true  },
                { icon: <Icon.Linkedin />, href: CONTACT.linkedin,          label: 'LinkedIn',       external: true  },
                { icon: <Icon.Github />,   href: CONTACT.github,            label: 'GitHub',         external: true  },
                { icon: <Icon.Calendar />, href: '#book',                   label: 'Book a meeting', external: false },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  {...(s.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  aria-label={s.label}
                  className="liquid-glass"
                  style={{ borderRadius: 999, padding: 14, color: 'var(--ink-dim)', display: 'inline-flex' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right: figure */}
          <div className="hero-figure" style={{ position: 'relative', height: '90vh', minHeight: 620, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'visible' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: 720, height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              {/* warm aura */}
              <div aria-hidden style={{
                position: 'absolute', left: 0, right: 0, top: '8%', height: '38%', pointerEvents: 'none', zIndex: 0,
                background: `radial-gradient(ellipse 55% 60% at 55% 25%, ${accent}40 0%, transparent 65%)`,
                filter: 'blur(40px)',
              }} />
              <img
                ref={heroImgRef}
                src="assets/hero-figure-v9.png"
                alt="Rich Dang"
                style={{
                  position: 'relative', zIndex: 1,
                  width: '100%', height: 'auto', maxHeight: '100%',
                  objectFit: 'contain', objectPosition: 'bottom',
                }}
              />
              {/* Interactive sparkle overlay */}
              <Sparkles
                anchorRef={heroImgRef}
                region={{ left: 0.00, top: 0.00, right: 1.00, bottom: 0.45 }}
                excludeRegion={{ left: 0.00, top: 0.18, right: 0.55, bottom: 0.50 }}
                count={70}
                cursorRadius={170}
                cursorStrength={2.0}
                style={{ zIndex: 2, mixBlendMode: 'screen' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── ABOUT / MANIFESTO ──────────── */}
      <section id="about" style={{
        padding: '180px 24px 60px', position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.025) 0%, transparent 60%)',
      }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <FadeUp className="eyebrow">The New Growth Playbook Era</FadeUp>
          <FadeUp delay={120} as="h2" style={{
            fontFamily: 'var(--serif)', fontWeight: 400,
            fontSize: 'clamp(40px, 6.5vw, 88px)',
            lineHeight: 1.05, letterSpacing: '-0.02em',
            margin: '24px 0 0', color: 'var(--ink)',
          }}>
            Most companies don't have a<br/>
            <em style={{ color: 'var(--ink-dim)' }}>sales</em> problem. They have an<br/>
            <em style={{ color: 'var(--ink-dim)' }}>operational</em> one.
          </FadeUp>
          <FadeUp delay={260} style={{
            maxWidth: 640, marginTop: 48,
            fontSize: 17, lineHeight: 1.7, color: 'var(--ink-dim)',
            display: 'flex', flexDirection: 'column', gap: 18,
          }}>
            <p style={{ margin: 0 }}>
              Broken systems create bad behaviors: inaccurate forecasts, wasted pipeline,
              bloated teams, and leaders making decisions on incomplete data.
            </p>
            <p style={{ margin: 0 }}>
              I've worked across sales, finance, and revenue operations long enough to
              see the pattern.
            </p>
            <p style={{ margin: 0 }}>
              The next generation of companies won't win by hiring more people. They'll
              win by <span style={{ color: 'var(--ink)' }}>building smarter systems</span>.
            </p>
            <p style={{ margin: 0 }}>
              I'm obsessed with helping companies scale revenue through operational
              discipline, AI workflows, and automation that creates leverage—not complexity.
            </p>
          </FadeUp>
          <FadeUp delay={400} style={{
            marginTop: 36,
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(22px, 2.4vw, 30px)',
            lineHeight: 1.4, letterSpacing: '-0.01em',
            color: 'var(--ink)',
          }}>
            Build lean. Move fast. <span style={{ color: 'var(--warm)' }}>Remove friction.</span>
          </FadeUp>
        </div>
      </section>

      {/* ──────────── SKILL CLOUD ──────────── */}
      <section id="skills" style={{ padding: '60px 24px 120px', position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 60%)',
        }} />
        <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 40 }}>
            <FadeUp as="h2" style={{
              fontFamily: 'var(--serif)', fontWeight: 400,
              fontSize: 'clamp(36px, 5.5vw, 72px)', letterSpacing: '-0.02em',
              margin: 0, lineHeight: 1.05,
            }}>
              <em style={{ color: 'var(--ink-dim)' }}>The </em>
              workbench.
            </FadeUp>
            <FadeUp delay={120} className="eyebrow">// skill cloud · hover for proficiency</FadeUp>
          </div>
          <FadeUp delay={200}>
            <SkillCloud accent={accent} />
          </FadeUp>
        </div>
      </section>

      {/* ──────────── RESUME / TIMELINE ──────────── */}
      <section id="resume" style={{ padding: '60px 24px 120px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 64 }}>
            <FadeUp as="h2" style={{
              fontFamily: 'var(--serif)', fontWeight: 400,
              fontSize: 'clamp(36px, 5.5vw, 72px)', letterSpacing: '-0.02em',
              margin: 0, lineHeight: 1.05,
            }}>
              <em style={{ color: 'var(--ink-dim)' }}>A short </em>
              résumé.
            </FadeUp>
            <FadeUp delay={100} className="eyebrow">Selected roles</FadeUp>
          </div>

          <div>
            {RESUME.map((r, i) => (
              <FadeUp key={i} delay={i * 80} className="resume-grid" style={{
                display: 'grid', gridTemplateColumns: '180px 1fr auto', gap: 24,
                padding: '24px 0', borderTop: '1px solid var(--ink-faint)',
                alignItems: 'baseline',
              }}>
                <span className="eyebrow">{r.year}</span>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 30, lineHeight: 1.15, letterSpacing: '-0.01em' }}>
                  {r.role}<span style={{ color: 'var(--ink-mute)' }}> · {r.org}</span>
                </div>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-mute)',
                  letterSpacing: '0.1em',
                }}>0{i+1}</span>
              </FadeUp>
            ))}
            <div style={{ borderTop: '1px solid var(--ink-faint)' }} />
          </div>
        </div>
      </section>

      {/* ──────────── BOOK A MEETING ──────────── */}
      <section id="book" style={{ padding: '60px 24px 100px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <FadeUp className="liquid-glass book-grid" style={{
            borderRadius: 32, padding: 'clamp(32px, 5vw, 72px)',
            display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: `radial-gradient(ellipse 80% 60% at 100% 100%, ${accent}30 0%, transparent 60%)`,
            }} />
            <div style={{ position: 'relative' }}>
              <div className="eyebrow" style={{ marginBottom: 16 }}>Let's connect</div>
              <h2 style={{
                fontFamily: 'var(--serif)', fontWeight: 400,
                fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em',
                margin: 0, lineHeight: 1.05,
              }}>
                Let's <em style={{ color: 'var(--ink-dim)' }}>connect</em>.
              </h2>
              <p style={{ margin: '24px 0 0', color: 'var(--ink-dim)', fontSize: 16, lineHeight: 1.7, maxWidth: 520 }}>
                I enjoy meeting ambitious people and learning what they're building.
              </p>
              <p style={{ margin: '14px 0 0', color: 'var(--ink-dim)', fontSize: 15, lineHeight: 1.7, maxWidth: 520 }}>
                Whether you're a new graduate looking for career advice, a company scaling
                its revenue engine, or a CEO exploring AI-driven GTM efficiency — I'm
                always open to meaningful conversations.
              </p>
              <div style={{
                marginTop: 28, padding: '18px 22px',
                borderLeft: `2px solid ${accent}`,
                background: `linear-gradient(90deg, ${accent}10 0%, transparent 80%)`,
                borderRadius: '0 12px 12px 0',
                fontSize: 14, lineHeight: 1.65, color: 'var(--ink-dim)',
                maxWidth: 520,
              }}>
                <span style={{ color: 'var(--ink)', fontWeight: 500 }}>One small ask:</span>{' '}
                if you're reaching out to sell me software, please consider donating to{' '}
                <a
                  href="https://donate.sunnybrook.ca"
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                  style={{ color: accent, fontWeight: 500 }}
                >
                  Sunnybrook Health Sciences Centre
                </a>{' '}
                cancer research first.
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div className="liquid-glass" style={{ borderRadius: 22, padding: 28 }}>
                {/* Calendar UI */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: 22 }}>May 2026</span>
                  <span style={{ display: 'flex', gap: 6 }}>
                    <button className="liquid-glass" style={{ width: 28, height: 28, borderRadius: 999, color: 'var(--ink)', cursor: 'pointer' }}>‹</button>
                    <button className="liquid-glass" style={{ width: 28, height: 28, borderRadius: 999, color: 'var(--ink)', cursor: 'pointer' }}>›</button>
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, fontSize: 12 }}>
                  {['M','T','W','T','F','S','S'].map((d,i) => (
                    <div key={i} style={{ textAlign: 'center', color: 'var(--ink-mute)', padding: '6px 0' }}>{d}</div>
                  ))}
                  {Array.from({ length: 31 }).map((_,i) => {
                    const day = i + 1;
                    const active = [5, 6, 8, 12, 13].includes(day);
                    return (
                      <div key={i} style={{
                        textAlign: 'center', padding: '8px 0', borderRadius: 8,
                        color: active ? 'var(--ink)' : 'var(--ink-mute)',
                        background: active ? 'rgba(255,255,255,0.04)' : 'transparent',
                        border: '1px solid transparent',
                        cursor: active ? 'pointer' : 'default',
                        fontVariantNumeric: 'tabular-nums',
                      }}>{day}</div>
                    );
                  })}
                </div>
                <div style={{ marginTop: 18, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['9:00','10:30','13:00','15:30'].map(t => (
                    <button key={t} className="liquid-glass" style={{
                      borderRadius: 999, padding: '8px 14px', fontSize: 12, color: 'var(--ink)', cursor: 'pointer',
                      fontFamily: 'var(--mono)',
                    }}>{t}</button>
                  ))}
                </div>
              </div>
              <a href={CONTACT.cal} target="_blank" rel="noreferrer" className="liquid-glass pill" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                marginTop: 14, width: '100%', textDecoration: 'none',
              }}>
                Book on Calendly <Icon.ArrowRight size={14} />
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ──────────── CONTACT FOOTER ──────────── */}
      <section id="contact" style={{
        padding: '80px 24px 60px',
        borderTop: '1px solid var(--ink-faint)',
        position: 'relative',
      }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{
                  width: 24, height: 24, borderRadius: 999,
                  background: `radial-gradient(circle at 30% 30%, ${accent}, #6b3a1f 70%)`,
                  boxShadow: `0 0 12px ${accent}80`,
                }} />
                <span style={{ fontWeight: 600, fontSize: 16 }}>richdang.ai</span>
              </div>
              <p style={{ color: 'var(--ink-mute)', fontSize: 13, lineHeight: 1.6, maxWidth: 320, margin: 0 }}>
                AI GTM operator. Currently shipping agents, pipelines, and revenue systems
                from the warm side of the country.
              </p>
            </div>

            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Contact</div>
              <a className="link" href={`mailto:${CONTACT.email}`} style={{ display: 'block', fontSize: 14, marginBottom: 8 }}>{CONTACT.email}</a>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Social</div>
              <a className="link" href={CONTACT.linkedin} target="_blank" rel="noreferrer" style={{ display: 'block', fontSize: 14, marginBottom: 8 }}>LinkedIn</a>
              <a className="link" href={CONTACT.github}   target="_blank" rel="noreferrer" style={{ display: 'block', fontSize: 14 }}>GitHub</a>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Site</div>
              <a className="link" href="#skills" style={{ display: 'block', fontSize: 14, marginBottom: 8 }}>Skills</a>
              <a className="link" href="#resume" style={{ display: 'block', fontSize: 14, marginBottom: 8 }}>Résumé</a>
              <a className="link" href="#book"   style={{ display: 'block', fontSize: 14 }}>Book a meeting</a>
            </div>
          </div>

          <div style={{
            marginTop: 60, paddingTop: 24, borderTop: '1px solid var(--ink-faint)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-mute)', letterSpacing: '0.05em',
            flexWrap: 'wrap', gap: 8,
          }}>
            <span>© 2026 RICH DANG</span>
            <span>BUILT WITH CLAUDE · TYPESET IN INSTRUMENT SERIF</span>
          </div>
        </div>
      </section>
    </div>
  );
}

window.VariantA = VariantA;
