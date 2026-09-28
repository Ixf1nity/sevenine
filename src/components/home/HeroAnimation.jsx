import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './HeroAnimation.css';

/**
 * HeroAnimation: Cinematic "79 | sevenine.in" logo reveal
 *
 * Layout: A fixed-height animation zone contains the absolute-positioned
 * logo stages. Tagline and CTA sit below in normal document flow.
 *
 * GSAP timeline phases:
 * 1. Giant "7" and "9" slam in from opposing sides
 * 2. Separator bar materializes
 * 3. Particle burst from center
 * 4. Logo stage fades out, wordmark stage appears
 * 5. "79" compact form + "sevenine" letters cascade with 3D flip
 * 6. ".in" drops in with bounce
 * 7. Gradient underline wipes
 * 8. Tagline fades up
 * 9. CTA buttons materialize
 */
export default function HeroAnimation() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.3,
      });

      // Phase 1: Giant "7" slams in from left
      tl.fromTo(
        '.hero-digit-7',
        { opacity: 0, x: -120, scale: 0.4, filter: 'blur(20px)' },
        {
          opacity: 1, x: 0, scale: 1, filter: 'blur(0px)',
          duration: 0.9, ease: 'back.out(1.7)',
        }
      )
      // Giant "9" slams in from right
      .fromTo(
        '.hero-digit-9',
        { opacity: 0, x: 120, scale: 0.4, filter: 'blur(20px)' },
        {
          opacity: 1, x: 0, scale: 1, filter: 'blur(0px)',
          duration: 0.9, ease: 'back.out(1.7)',
        },
        '-=0.7'
      )

      // Phase 2: Separator bar
      .fromTo(
        '.hero-sep',
        { opacity: 0, scaleY: 0 },
        { opacity: 0.35, scaleY: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      )

      // Particle burst
      .add(() => {
        burstParticles(canvasRef.current);
      }, '+=0.15')

      // Phase 3: Fade out giant "79" stage
      .to(
        '.hero-logo-stage',
        { opacity: 0, scale: 0.6, duration: 0.45, ease: 'power3.in',
          onComplete() {
            const el = containerRef.current?.querySelector('.hero-logo-stage');
            if (el) el.style.display = 'none';
          }
        },
        '+=0.4'
      )

      // Phase 4: Reveal wordmark
      .add(() => {
        const el = containerRef.current?.querySelector('.hero-wordmark-stage');
        if (el) el.style.display = 'flex';
      })

      // "79" compact form slides in
      .fromTo(
        '.hero-wm-79',
        { opacity: 0, x: -40, scale: 0.8 },
        { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)' }
      )
      .fromTo(
        '.hero-wm-sep',
        { opacity: 0, scaleY: 0 },
        { opacity: 0.35, scaleY: 1, duration: 0.35 },
        '-=0.35'
      )

      // Phase 5: "sevenine" letters cascade with 3D flip
      .fromTo(
        '.hero-wm-letter',
        { opacity: 0, y: 30, rotateX: -90, scale: 0.7, filter: 'blur(4px)' },
        {
          opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)',
          duration: 0.45, stagger: 0.04, ease: 'back.out(1.8)',
        },
        '-=0.15'
      )

      // Phase 6: ".in" drops in with bounce
      .fromTo(
        '.hero-wm-dotin',
        { opacity: 0, y: -30, scale: 0.5, rotateZ: -10 },
        { opacity: 1, y: 0, scale: 1, rotateZ: 0, duration: 0.5, ease: 'back.out(2)' },
        '-=0.15'
      )

      // Phase 7: Gradient underline wipes
      .fromTo(
        '.hero-underline',
        { scaleX: 0, opacity: 0.5 },
        { scaleX: 1, opacity: 1, duration: 0.75, ease: 'power2.inOut' },
        '-=0.2'
      )

      // Phase 8: Tagline
      .fromTo(
        '.hero-tagline',
        { opacity: 0, y: 24, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6 },
        '-=0.25'
      )

      // Phase 9: CTA buttons
      .fromTo(
        '.hero-cta-btn',
        { opacity: 0, y: 18, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.3)' },
        '-=0.25'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="hero-anim-root">
      {/* Particle canvas overlays everything */}
      <canvas ref={canvasRef} className="hero-particles" aria-hidden="true" />

      {/* Fixed-height animation zone for the logo stages */}
      <div className="hero-anim-zone">
        {/* Phase 1-2: Giant "79" */}
        <div className="hero-logo-stage">
          <span className="hero-digit hero-digit-7">7</span>
          <span className="hero-sep" aria-hidden="true">|</span>
          <span className="hero-digit hero-digit-9">9</span>
        </div>

        {/* Phase 4-6: Full "79 | sevenine.in" wordmark */}
        <div className="hero-wordmark-stage" style={{ display: 'none' }}>
          <div className="hero-wordmark-inner">
            <span className="hero-wm-79">79</span>
            <span className="hero-wm-sep" aria-hidden="true">|</span>
            <span className="hero-wm-letters">
              {'sevenine'.split('').map((ch, i) => (
                <span
                  key={i}
                  className={`hero-wm-letter ${i < 5 ? 'hero-wm-letter--seven' : 'hero-wm-letter--nine'}`}
                >
                  {ch}
                </span>
              ))}
              <span className="hero-wm-dotin">.in</span>
            </span>
          </div>
          <div className="hero-underline" />
        </div>
      </div>

      {/* Below the animation zone: tagline + CTA in normal flow */}
      <p className="hero-tagline">
        The academic and social exchange platform<br />
        built exclusively for IB and IGCSE students in Pune.
      </p>

      <div className="hero-cta-row">
        <a href="#community" className="hero-cta-btn hero-cta-btn--primary">
          <span>Join Network</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="hero-cta-icon" aria-hidden="true">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
        <a href="#about" className="hero-cta-btn hero-cta-btn--ghost">
          Why 7 & 9
        </a>
      </div>
    </div>
  );
}

/* Particle burst effect */
function burstParticles(canvas) {
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (!w || !h) return;
  const ctx = canvas.getContext('2d');
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);

  const cx = w / 2;
  const cy = h * 0.4;
  const COUNT = 90;
  const colors = ['#1b90ff', '#ff551f', '#b4f53c', '#fbbf24', '#34d399', '#ffffff'];

  const particles = Array.from({ length: COUNT }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 7;
    return {
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 1 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: 0.01 + Math.random() * 0.015,
    };
  });

  let raf;
  function animate() {
    ctx.clearRect(0, 0, w, h);
    let alive = false;
    for (const p of particles) {
      if (p.alpha <= 0) continue;
      alive = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04;
      p.vx *= 0.994;
      p.alpha -= p.decay;
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (alive) raf = requestAnimationFrame(animate);
  }
  animate();
  setTimeout(() => cancelAnimationFrame(raf), 4000);
}
