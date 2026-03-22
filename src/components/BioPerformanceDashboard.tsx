import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, TrendingUp, Activity, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Sora:wght@400;600;700&display=swap');

  @keyframes orb-pulse   { 0%,100%{transform:scale(1);opacity:.18} 50%{transform:scale(1.18);opacity:.28} }
  @keyframes ring-spin   { to{transform:rotate(360deg)} }
  @keyframes ring-spin-r { to{transform:rotate(-360deg)} }
  @keyframes float-a     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
  @keyframes float-b     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  @keyframes hud-blink   { 0%,49%{opacity:1} 50%,100%{opacity:0} }
  @keyframes ticker      { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes bar-glow    { 0%,100%{filter:brightness(1)} 50%{filter:brightness(1.35)} }

  .bpd-float-a  { animation: float-a 4s ease-in-out infinite; }
  .bpd-float-b  { animation: float-b 5s ease-in-out 1s infinite; }
  .bpd-hud-dot  { animation: hud-blink 2s step-end infinite; }
  .bpd-bar-fill { animation: bar-glow 2.2s ease-in-out infinite; }
`;

/* ── Stat card ─────────────────────────────────────────────────────────────── */
function StatCard({ icon, label, value, unit, accent }: {
  icon: React.ReactNode; label: string; value: string; unit: string; accent: string;
}) {
  return (
    <div style={{
      background: 'rgba(6,8,10,.9)', borderRadius: 14,
      border: `1px solid ${accent}22`,
      padding: '10px 14px',
      backdropFilter: 'blur(16px)',
      boxShadow: `inset 0 1px 0 ${accent}18, 0 8px 24px rgba(0,0,0,.55)`,
      minWidth: 140, maxWidth: 180,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <span style={{ color: accent }}>{icon}</span>
        <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.45)', flex: 1 }}>{label}</span>
        <span className="bpd-hud-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: accent, boxShadow: `0 0 5px ${accent}` }} />
      </div>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(20px,2.2vw,28px)', color: '#fff', letterSpacing: '.04em', lineHeight: 1 }}>
        {value} <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.38)', fontWeight: 400 }}>{unit}</span>
      </div>
    </div>
  );
}

/* ── Macro row ─────────────────────────────────────────────────────────────── */
function MacroRow({ label, hex, target }: { label: string; hex: string; target: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: hex, fontWeight: 700 }}>{label}</span>
        <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.55)', fontWeight: 600 }}>{target}</span>
      </div>
      <div style={{ height: 3, background: 'rgba(255,255,255,.07)', borderRadius: 999, overflow: 'hidden' }}>
        <div className="macro-bar-fill bpd-bar-fill" style={{ height: '100%', width: 0, background: `linear-gradient(90deg,${hex}99,${hex})`, borderRadius: 999 }} />
      </div>
    </div>
  );
}

/* ── Main ──────────────────────────────────────────────────────────────────── */
const BioPerformanceDashboard = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bodyRef      = useRef<HTMLImageElement>(null);
  const mealRef      = useRef<HTMLImageElement>(null);
  const textRef      = useRef<HTMLDivElement>(null);
  const text2Ref     = useRef<HTMLDivElement>(null);
  const macroCardRef = useRef<HTMLDivElement>(null);
  const orbRef       = useRef<HTMLDivElement>(null);
  const scanRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // Measure navbar height dynamically so the pin aligns perfectly
    const navbar = document.querySelector('nav, header, [data-navbar]') as HTMLElement | null;
    const navH = navbar ? navbar.getBoundingClientRect().height : 0;

    // Set CSS var so section can reference it if needed
    document.documentElement.style.setProperty('--nav-h', `${navH}px`);

    // Apply exact height to section so it never overflows
    if (containerRef.current) {
      containerRef.current.style.height = `calc(100dvh - ${navH}px)`;
      containerRef.current.style.maxHeight = `calc(100dvh - ${navH}px)`;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          // Pin starts exactly when section top aligns with bottom of navbar
          start: `top ${navH}px`,
          end: `+=${window.innerHeight * 3.2}`,
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      tl.fromTo(mealRef.current,
        { y: 100, opacity: 0, scale: .85, filter: 'blur(8px)' },
        { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: .28, ease: 'none' }, 0);

      tl.fromTo(macroCardRef.current,
        { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: .24, ease: 'none' }, .06);

      tl.to('.macro-bar-fill',
        { width: (i: number) => ['40%', '35%', '25%'][i], duration: .24, stagger: .06, ease: 'none' }, .2);

      tl.fromTo(scanRef.current,
        { top: 0, opacity: 0 }, { top: '100%', opacity: 1, duration: .18, ease: 'none' }, .4);
      tl.to(scanRef.current, { opacity: 0, duration: .04 }, .58);

      tl.to(mealRef.current,
        { x: 100, opacity: 0, scale: .5, filter: 'blur(6px)', duration: .2, ease: 'none' }, .52);
      tl.to(bodyRef.current, {
        filter: 'drop-shadow(0 0 28px rgba(254,122,1,.9)) brightness(1.25) sepia(1) saturate(3.5) hue-rotate(-18deg)',
        scale: 1.06, duration: .22, ease: 'none',
      }, .52);
      tl.to(orbRef.current, { opacity: .4, scale: 1.5, duration: .22, ease: 'none' }, .52);

      tl.to(textRef.current,
        { y: -36, opacity: 0, filter: 'blur(5px)', duration: .16, ease: 'none' }, .55);
      tl.fromTo(text2Ref.current,
        { y: 40, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: .2, ease: 'none' }, .64);

    }, containerRef);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  const macros = [
    { label: 'Protein',       hex: '#fe7a01', target: '40 g / 160 kcal' },
    { label: 'Carbohydrates', hex: '#00e676', target: '35 g / 140 kcal' },
    { label: 'Healthy Fats',  hex: '#29b6f6', target: '25 g / 225 kcal' },
  ];

  return (
    <>
      <style>{STYLES}</style>

      <section
        ref={containerRef}
        style={{
          position: 'relative',
          /* Use 100dvh so mobile browser chrome is excluded.
             Falls back to 100vh on older browsers. */
          height: '100dvh',
          maxHeight: '100dvh',
          width: '100%',
          overflow: 'hidden',
          background: '#060708',
          display: 'flex',
          flexDirection: 'column',
          /* Push section down by navbar height so ScrollTrigger
             pins it flush — JS sets this via CSS var */
          marginTop: 0,
        }}
      >
        {/* ── BG grid ──────────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px)',
          backgroundSize: '52px 52px',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 55%,transparent 28%,rgba(0,0,0,.72) 100%)', pointerEvents: 'none' }} />

        {/* ── MAIN CONTENT (fills viewport minus ticker) ────────────── */}
        <div style={{
          flex: 1, minHeight: 0,                     /* ← crucial: allows shrinking */
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(16px,3vw,48px)',
          padding: 'clamp(12px,2vh,24px) clamp(16px,3vw,48px)',
          position: 'relative', zIndex: 10,
          alignItems: 'center',
          overflow: 'hidden',
        }}>

          {/* ───── LEFT: Body hologram ─────────────────────────────── */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 0 }}>

            {/* Orb */}
            <div ref={orbRef} style={{
              position: 'absolute', width: '65%', aspectRatio: '1/1', borderRadius: '50%',
              background: 'radial-gradient(circle,rgba(254,122,1,.2) 0%,transparent 70%)',
              filter: 'blur(44px)', opacity: .18,
              animation: 'orb-pulse 4s ease-in-out infinite',
            }} />

            {/* Rings */}
            {[
              { sz: '76%', col: 'rgba(254,122,1,.11)', anim: 'ring-spin 20s linear infinite' },
              { sz: '60%', col: 'rgba(0,230,180,.09)',  anim: 'ring-spin-r 13s linear infinite' },
            ].map((r, i) => (
              <div key={i} style={{
                position: 'absolute', width: r.sz, aspectRatio: '1/1', borderRadius: '50%',
                border: `1px dashed ${r.col}`, animation: r.anim, pointerEvents: 'none',
              }} />
            ))}

            {/* Body image — height capped so it stays inside */}
            <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
              <img
                ref={bodyRef}
                src="/assets/holo_body.png"
                alt="3D Body"
                style={{
                  maxHeight: '75vh',
                  height: '100%',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'sepia(1) saturate(3) hue-rotate(-20deg) drop-shadow(0 0 12px rgba(254,122,1,.55))',
                  display: 'block',
                }}
              />
              {/* Scan line */}
              <div ref={scanRef} style={{
                position: 'absolute', left: 0, right: 0, top: 0, height: 2, opacity: 0,
                background: 'linear-gradient(90deg,transparent,rgba(254,122,1,.9),#fff,rgba(254,122,1,.9),transparent)',
                boxShadow: '0 0 10px 4px rgba(254,122,1,.5)', pointerEvents: 'none',
              }} />
            </div>

            {/* Stat — top-left */}
            <div className="bpd-float-a" style={{ position: 'absolute', top: 'clamp(8px,2vh,24px)', left: 0, zIndex: 20 }}>
              <StatCard icon={<Activity size={12} />} label="Metabolic Rate" value="2,450" unit="kcal/day" accent="#fe7a01" />
            </div>

            {/* Stat — bottom-right */}
            <div className="bpd-float-b" style={{ position: 'absolute', bottom: 'clamp(8px,2vh,24px)', right: 0, zIndex: 20 }}>
              <StatCard icon={<TrendingUp size={12} />} label="Recovery Score" value="98%" unit="Optimal" accent="#00e6b4" />
            </div>

            {/* HUD dots */}
            <div style={{ position: 'absolute', bottom: 'clamp(4px,1vh,12px)', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 5 }}>
              {[1, .4, .18].map((o, i) => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#fe7a01', opacity: o, boxShadow: '0 0 5px rgba(254,122,1,.6)' }} />)}
            </div>
          </div>

          {/* ───── RIGHT: Text + Meal + Macros ────────────────────── */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
            gap: 'clamp(8px,1.4vh,16px)',
            height: '100%', minHeight: 0,
            position: 'relative',
          }}>

            {/* Text 1 */}
            <div ref={textRef} style={{ flexShrink: 0 }}>
              <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(8px,.8vw,10px)', letterSpacing: '.38em', textTransform: 'uppercase', color: 'rgba(254,122,1,.6)', margin: '0 0 8px' }}>
                ◈ &nbsp; Nutrition Intelligence
              </p>
              <h2 style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: 'clamp(36px,5.5vw,76px)',
                lineHeight: .92, letterSpacing: '-.01em', color: '#fff', margin: '0 0 10px',
              }}>
                Fuel Your<br />
                <span style={{ background: 'linear-gradient(90deg,#fe7a01,#ff5500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Ambition</span>
              </h2>
              <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(11px,1.1vw,14px)', color: 'rgba(255,255,255,.42)', lineHeight: 1.65, maxWidth: 400, margin: 0 }}>
                Scientifically crafted meal plans tailored to each member's body composition — designed to fuel performance, recovery, and growth.
              </p>
            </div>

            {/* Text 2 — overlaid, revealed by GSAP */}
            <div ref={text2Ref} style={{ position: 'absolute', top: 0, left: 0, right: 0, opacity: 0 }}>
              <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(8px,.8vw,10px)', letterSpacing: '.38em', textTransform: 'uppercase', color: 'rgba(0,230,180,.6)', margin: '0 0 8px' }}>
                ◈ &nbsp; Energy Transferred
              </p>
              <h2 style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: 'clamp(36px,5.5vw,76px)',
                lineHeight: .92, letterSpacing: '-.01em', color: '#fff', margin: '0 0 10px',
              }}>
                Nutrients<br />
                <span style={{ background: 'linear-gradient(90deg,#00e6b4,#29b6f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Absorbed</span>
              </h2>
              <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(11px,1.1vw,14px)', color: 'rgba(255,255,255,.42)', lineHeight: 1.65, maxWidth: 400, margin: 0 }}>
                Every macro precisely metabolised — your body is now operating at peak biological efficiency.
              </p>
            </div>

            {/* Meal image — constrained height */}
            <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', height: 'clamp(120px,18vh,220px)' }}>
              <img
                ref={mealRef}
                src="src/assets/meal.png"
                alt="Meal"
                style={{ height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 16px 32px rgba(0,0,0,.7)) drop-shadow(0 0 16px rgba(254,122,1,.18))' }}
              />
            </div>

            {/* Macro card */}
            <div
              ref={macroCardRef}
              style={{
                flexShrink: 0,
                background: 'rgba(6,8,10,.92)',
                border: '1px solid rgba(255,255,255,.07)',
                borderRadius: 18,
                padding: 'clamp(12px,1.8vh,20px) clamp(14px,2vw,24px)',
                backdropFilter: 'blur(20px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,.06), 0 20px 40px rgba(0,0,0,.6)',
                marginTop: 'clamp(-16px,-2vh,-4px)',
                position: 'relative', zIndex: 20,
                opacity: 0,
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(10px,1.5vh,16px)' }}>
                <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 9, letterSpacing: '.28em', textTransform: 'uppercase', color: '#fe7a01', fontWeight: 700 }}>
                  Macro Composition
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'Sora',sans-serif", fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: '#00e6b4' }}>
                  <Check size={10} /> Perfect Match
                </span>
              </div>

              {/* Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(9px,1.3vh,14px)' }}>
                {macros.map((m, i) => <MacroRow key={i} {...m} />)}
              </div>

              {/* Total */}
              <div style={{ marginTop: 'clamp(10px,1.4vh,16px)', paddingTop: 'clamp(8px,1.2vh,12px)', borderTop: '1px solid rgba(255,255,255,.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Zap size={11} style={{ color: '#fe7a01' }} />
                  <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.38)' }}>Total Energy</span>
                </div>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(16px,1.6vw,22px)', color: '#fff', letterSpacing: '.05em' }}>
                  525 <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.32)', fontWeight: 400 }}>kcal</span>
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ── TICKER — fixed 36px strip at bottom ─────────────────────── */}
        <div style={{
          flexShrink: 0, height: 36,
          borderTop: '1px solid rgba(254,122,1,.13)',
          background: 'rgba(0,0,0,.65)', backdropFilter: 'blur(8px)',
          overflow: 'hidden', zIndex: 50,
          display: 'flex', alignItems: 'center',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', gap: 64, animation: 'ticker 28s linear infinite', whiteSpace: 'nowrap' }}>
            {Array(2).fill(null).map((_, r) =>
              ['Protein Synthesis ↑ 38%', 'Recovery Score: 98%', 'Metabolic Rate: 2,450 kcal', 'Body Fat ↓ 2.1%', 'VO₂ Max: 54.2', 'Hydration: 92%'].map((t, i) => (
                <span key={`${r}-${i}`} style={{ fontFamily: "'Sora',monospace", fontSize: 9, letterSpacing: '.24em', textTransform: 'uppercase', color: 'rgba(254,122,1,.48)', paddingRight: 64 }}>
                  ◈ &nbsp;{t}
                </span>
              ))
            )}
          </div>
        </div>

      </section>
    </>
  );
};

export default BioPerformanceDashboard;