/* Sparkles — interactive sparkle overlay for the hero portrait. */

const { useEffect, useRef } = React;

function Sparkles({
  anchorRef = null,
  region = { left: 0.32, top: 0.00, right: 0.98, bottom: 0.28 },
  excludeRegion = null,
  count = 70,
  cursorRadius = 140,
  cursorStrength = 1.6,
  className,
  style,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const particlesRef = useRef([]);
  const cursorRef = useRef({ x: -9999, y: -9999, active: false });
  const regionRef = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const excludeRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = 0, H = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const computeRegion = () => {
      const cr = canvas.getBoundingClientRect();
      const ar = anchorRef?.current?.getBoundingClientRect();
      const base = (ar && ar.width > 0 && ar.height > 0)
        ? { x: ar.left - cr.left, y: ar.top - cr.top, w: ar.width, h: ar.height }
        : { x: 0, y: 0, w: W, h: H };
      regionRef.current.x = base.x + region.left * base.w;
      regionRef.current.y = base.y + region.top  * base.h;
      regionRef.current.w = (region.right - region.left) * base.w;
      regionRef.current.h = (region.bottom - region.top)  * base.h;
      if (excludeRegion) {
        excludeRef.current = {
          x: base.x + excludeRegion.left * base.w,
          y: base.y + excludeRegion.top  * base.h,
          w: (excludeRegion.right - excludeRegion.left) * base.w,
          h: (excludeRegion.bottom - excludeRegion.top) * base.h,
        };
      } else {
        excludeRef.current = null;
      }
    };

    const inExclude = (x, y) => {
      const e = excludeRef.current;
      if (!e) return false;
      return x >= e.x && x <= e.x + e.w && y >= e.y && y <= e.y + e.h;
    };

    const initParticles = () => {
      const ps = [];
      const r = regionRef.current;
      for (let i = 0; i < count; i++) {
        let x, y, attempts = 0;
        do {
          const dx = Math.pow(Math.random(), 0.6);
          const dy = Math.pow(Math.random(), 1.2);
          x = r.x + dx * r.w;
          y = r.y + dy * r.h;
          attempts++;
        } while (inExclude(x, y) && attempts < 12);
        ps.push({
          hx: x, hy: y,
          x, y,
          vx: 0, vy: 0,
          size: 0.8 + Math.pow(Math.random(), 3) * 4.2,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.6 + Math.random() * 1.4,
          tint: Math.random(),
          seed: Math.random() * 1000,
        });
      }
      particlesRef.current = ps;
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = (W * DPR) | 0;
      canvas.height = (H * DPR) | 0;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      computeRegion();
      if (particlesRef.current.length === 0) initParticles();
      else {
        const r2 = regionRef.current;
        particlesRef.current.forEach((p) => {
          const dxFrac = (p.hx - (r2.x)) / Math.max(1, r2.w);
          if (!isFinite(dxFrac) || dxFrac < -0.1 || dxFrac > 1.1) {
            p.hx = r2.x + Math.pow(Math.random(), 0.6) * r2.w;
            p.hy = r2.y + Math.pow(Math.random(), 1.2) * r2.h;
            p.x = p.hx; p.y = p.hy;
          }
        });
      }
    };
    resize();
    initParticles();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    if (anchorRef?.current) ro.observe(anchorRef.current);

    const onMove = (e) => {
      const cr = canvas.getBoundingClientRect();
      cursorRef.current.x = e.clientX - cr.left;
      cursorRef.current.y = e.clientY - cr.top;
      cursorRef.current.active = true;
    };
    const onLeave = () => { cursorRef.current.active = false; };
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(48, now - last); last = now;
      const t = now / 1000;

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';

      const ps = particlesRef.current;
      const cur = cursorRef.current;
      const cR2 = cursorRadius * cursorRadius;

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];

        const wobX = Math.sin(t * 0.5 + p.seed) * 6;
        const wobY = Math.cos(t * 0.4 + p.seed * 1.2) * 4;
        const tx = p.hx + wobX;
        const ty = p.hy + wobY;

        const k = 0.012;
        let ax = (tx - p.x) * k;
        let ay = (ty - p.y) * k;

        if (cur.active) {
          const dx = p.x - cur.x;
          const dy = p.y - cur.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < cR2 && d2 > 1) {
            const d = Math.sqrt(d2);
            const fall = 1 - d / cursorRadius;
            const force = fall * fall * cursorStrength;
            ax += (dx / d) * force;
            ay += (dy / d) * force;
          }
        }

        const ex = excludeRef.current;
        if (ex) {
          const cx = p.x, cy = p.y;
          const ix = Math.max(ex.x, Math.min(cx, ex.x + ex.w));
          const iy = Math.max(ex.y, Math.min(cy, ex.y + ex.h));
          const inside = (cx >= ex.x && cx <= ex.x + ex.w && cy >= ex.y && cy <= ex.y + ex.h);
          if (inside) {
            const dLeft = cx - ex.x;
            const dRight = (ex.x + ex.w) - cx;
            const dTop = cy - ex.y;
            const dBot = (ex.y + ex.h) - cy;
            const minD = Math.min(dLeft, dRight, dTop, dBot);
            const push = 1.6;
            if (minD === dLeft)       ax -= push;
            else if (minD === dRight) ax += push;
            else if (minD === dTop)   ay -= push;
            else                      ay += push;
          } else {
            const dx2 = cx - ix;
            const dy2 = cy - iy;
            const d2x = dx2 * dx2 + dy2 * dy2;
            const buffer = 24;
            if (d2x < buffer * buffer && d2x > 0.5) {
              const d = Math.sqrt(d2x);
              const fall = 1 - d / buffer;
              const force = fall * fall * 1.2;
              ax += (dx2 / d) * force;
              ay += (dy2 / d) * force;
            }
          }
        }

        p.vx = (p.vx + ax) * 0.92;
        p.vy = (p.vy + ay) * 0.92;
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);

        p.phase += (p.phaseSpeed * dt) / 1000;
        const twinkle = 0.55 + 0.45 * Math.sin(p.phase);

        if (excludeRef.current) {
          const ex = excludeRef.current;
          if (p.x >= ex.x && p.x <= ex.x + ex.w && p.y >= ex.y && p.y <= ex.y + ex.h) {
            continue;
          }
        }

        const r = 255;
        const g = 220 + 30 * (1 - p.tint);
        const b = 130 + 80 * (1 - p.tint);
        const alpha = twinkle * 0.95;

        const haloR = p.size * 4.5;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloR);
        grd.addColorStop(0,    `rgba(${r},${g|0},${b|0},${alpha * 0.6})`);
        grd.addColorStop(0.4,  `rgba(${r},${(g*0.85)|0},${(b*0.65)|0},${alpha * 0.18})`);
        grd.addColorStop(1,    'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, haloR, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255,${Math.min(255, (g+25))|0},${b|0},${Math.min(1, alpha * 1.4)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, p.size * 0.65), 0, Math.PI * 2);
        ctx.fill();

        if (p.size > 2.4) {
          const flare = p.size * 6 * twinkle;
          ctx.strokeStyle = `rgba(255,235,180,${alpha * 0.45})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x - flare, p.y); ctx.lineTo(p.x + flare, p.y);
          ctx.moveTo(p.x, p.y - flare); ctx.lineTo(p.x, p.y + flare);
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [anchorRef, region.left, region.top, region.right, region.bottom, count, cursorRadius, cursorStrength, excludeRegion?.left, excludeRegion?.top, excludeRegion?.right, excludeRegion?.bottom]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'auto',
        filter: 'blur(0.3px) saturate(1.1)',
        ...style,
      }}
    />
  );
}

window.Sparkles = Sparkles;
