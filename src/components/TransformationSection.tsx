import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,900&family=Barlow:wght@400;500&display=swap');

  @keyframes ts-pulse-dot {
    0%,100% { box-shadow: 0 0 0 0 rgba(254,122,1,.7) }
    50%     { box-shadow: 0 0 0 8px rgba(254,122,1,0) }
  }
  @keyframes ts-stamp-shake {
    0%,100% { transform: rotate(-2deg) scale(1) }
    50%     { transform: rotate(-2deg) scale(1.02) }
  }
  @keyframes ts-spark {
    0%   { transform: translateY(0) translateX(0) scale(1); opacity: .9 }
    100% { transform: translateY(-70px) translateX(var(--dx)) scale(0); opacity: 0 }
  }
  @keyframes ts-chev {
    0%,100% { opacity:.4; transform:rotate(45deg) translate(0,0) }
    50%     { opacity:.9; transform:rotate(45deg) translate(3px,3px) }
  }

  .ts-pulse-dot { animation: ts-pulse-dot 1.6s ease-out infinite; }
  .ts-stamp     { animation: ts-stamp-shake 3s ease-in-out infinite; }
  .ts-chev      { animation: ts-chev 1.4s ease-in-out infinite; }
`;

export default function TransformationSection() {
  const sectionRef    = useRef<HTMLElement>(null);

  // Diagonal slash mask — the key visual
  const slashRef      = useRef<HTMLDivElement>(null);   // orange diagonal blade
  const oldLayerRef   = useRef<HTMLDivElement>(null);   // old side (clipped)
  const newLayerRef   = useRef<HTMLDivElement>(null);   // new side (clipped)

  // Text refs
  const oldTextRef    = useRef<HTMLDivElement>(null);
  const newTextRef    = useRef<HTMLDivElement>(null);
  const strikeRef     = useRef<HTMLDivElement>(null);
  const stampRef      = useRef<HTMLDivElement>(null);   // "OUTDATED" stamp

  // Progress
  const fillRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=280%',
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
        },
      });

      /* ── Phase 1 (0→0.5): Diagonal slash sweeps left-to-right ──
         Old layer clips from right edge moving left.
         New layer clips from left edge moving right.
         Slash blade tracks the boundary.
      ── */
      tl.fromTo(oldLayerRef.current,
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
        { clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0 100%)', ease: 'none', duration: .5 },
        0
      );

      tl.fromTo(newLayerRef.current,
        { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' },
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', ease: 'none', duration: .5 },
        0
      );

      // Slash blade moves with the wipe
      tl.fromTo(slashRef.current,
        { left: '0%', opacity: 0 },
        { left: '100%', opacity: 1, ease: 'none', duration: .44 },
        0
      );
      tl.to(slashRef.current, { opacity: 0, duration: .06, ease: 'none' }, .44);

      /* ── Phase 2 (0→0.2): Strike slashes through old title ── */
      tl.fromTo(strikeRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, ease: 'none', duration: .2 },
        0.04
      );

      /* ── Phase 3 (0.08→0.28): Old text crunches away ── */
      tl.to(oldTextRef.current,
        { x: -40, opacity: 0, filter: 'blur(4px)', ease: 'none', duration: .22 },
        0.08
      );

      /* ── Phase 4 (0.1→0.15): Stamp slams in then fades ── */
      tl.fromTo(stampRef.current,
        { scale: 3, opacity: 0, rotate: '-2deg' },
        { scale: 1, opacity: 1, rotate: '-2deg', ease: 'none', duration: .08 },
        0.08
      );
      tl.to(stampRef.current,
        { opacity: 0, ease: 'none', duration: .12 },
        0.2
      );

      /* ── Phase 5 (0.35→0.6): New text punches in ── */
      tl.fromTo(newTextRef.current,
        { x: 60, opacity: 0, filter: 'blur(6px)' },
        { x: 0, opacity: 1, filter: 'blur(0px)', ease: 'none', duration: .28 },
        0.38
      );

      /* ── Phase 6: Progress bar ── */
      tl.fromTo(fillRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', duration: 1 },
        0
      );

    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{STYLES}</style>

      <section
        ref={sectionRef}
        style={{
          position: 'relative',
          height: '80vh',
          width: '100%',
          overflow: 'hidden',
          background: '#0c0805',
        }}
      >

        {/* ────────────────────────────────────────────────
            NEW LAYER — modern gym (base, always visible)
        ──────────────────────────────────────────────── */}
        <div
          ref={newLayerRef}
          style={{
            position: 'absolute', inset: 0, zIndex: 1,
            clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
          }}
        >
          <img
            src="/assets/smart_gym.png"
            alt="Modern Gym"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .8 }}
          />
          {/* Deep warm overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(0,0,0,.85) 0%, rgba(10,4,0,.6) 50%, rgba(0,0,0,.75) 100%)' }} />
          {/* Upward orange light from floor */}
          <div style={{
            position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)',
            width: '80%', height: 260,
            background: 'radial-gradient(ellipse, rgba(254,122,1,.35) 0%, transparent 70%)',
            filter: 'blur(32px)',
          }} />

          {/* Spark particles */}
          <div style={{ position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
            {[...Array(10)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: `${(i - 5) * 22}px`, bottom: 0,
                width: `${3 + i % 3}px`, height: `${3 + i % 3}px`,
                borderRadius: '50%',
                background: i % 2 === 0 ? '#fe7a01' : '#ffcc00',
                ['--dx' as any]: `${(i - 5) * 8}px`,
                animation: `ts-spark ${.9 + i % 4 * .25}s ease-out ${i * .15}s infinite`,
              }} />
            ))}
          </div>

          {/* New content */}
          <div
            ref={newTextRef}
            style={{
              position: 'absolute', inset: 0, zIndex: 6,
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 clamp(20px,6vw,96px)',
              opacity: 0,
            }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              marginBottom: 'clamp(12px,2vh,20px)',
            }}>
              <div className="ts-pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#fe7a01', flexShrink: 0 }} />
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 'clamp(10px,1.1vw,12px)', fontWeight: 700, letterSpacing: '.4em', textTransform: 'uppercase', color: '#fe7a01' }}>
                GymSaathi Platform
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(44px,8vw,108px)',
              lineHeight: .86,
              letterSpacing: '.02em',
              textTransform: 'uppercase',
              color: '#fff',
              margin: 0,
              textShadow: '0 4px 32px rgba(0,0,0,.7)',
            }}>
              RUN YOUR<br />
              GYM ON<br />
              <span style={{
                color: '#fe7a01',
                textShadow: '0 0 40px rgba(254,122,1,.7), 0 0 80px rgba(254,122,1,.3)',
              }}>AUTOPILOT</span>
            </h2>

            <p style={{
              fontFamily: "'Barlow',sans-serif",
              fontSize: 'clamp(12px,1.3vw,15px)',
              color: 'rgba(255,255,255,.45)',
              maxWidth: 400,
              lineHeight: 1.65,
              marginTop: 'clamp(12px,2.2vh,22px)',
              marginBottom: 0,
            }}>
              Billing, attendance, diet plans, leads — all automated. Zero paperwork. Zero stress.
            </p>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 'clamp(8px,2vw,20px)', marginTop: 'clamp(16px,2.5vh,28px)', flexWrap: 'wrap' }}>
              {[
                { n: '3×',    l: 'Conversions' },
                { n: '100%',  l: 'Auto Billing' },
                { n: '0',     l: 'Manual Errors' },
              ].map(s => (
                <div key={s.n} style={{
                  borderLeft: '3px solid #fe7a01',
                  paddingLeft: 'clamp(8px,1.2vw,14px)',
                }}>
                  <div style={{ fontFamily: "'Anton',sans-serif", fontSize: 'clamp(20px,2.8vw,34px)', color: '#fe7a01', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 'clamp(9px,1vw,11px)', color: 'rgba(255,255,255,.4)', letterSpacing: '.2em', textTransform: 'uppercase', marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────
            OLD LAYER — paper records (top, wipes away)
        ──────────────────────────────────────────────── */}
        <div
          ref={oldLayerRef}
          style={{
            position: 'absolute', inset: 0, zIndex: 10,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          }}
        >
          <img
            src="/assets/old_gym.png"
            alt="Old Gym"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(.8) sepia(.4) brightness(.55)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(0,0,0,.2) 0%, rgba(0,0,0,.82) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,6,0,.5)' }} />

          {/* Aged ruled lines */}
          {[...Array(7)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute', left: 0, right: 0,
              top: `${14 + i * 12}%`, height: 1,
              background: 'rgba(160,140,100,.07)',
            }} />
          ))}

          {/* "OUTDATED" stamp — slams in then fades */}
          <div
            ref={stampRef}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%) rotate(-2deg)',
              zIndex: 15, opacity: 0, pointerEvents: 'none',
              fontFamily: "'Anton',sans-serif",
              fontSize: 'clamp(40px,7vw,90px)',
              color: 'transparent',
              letterSpacing: '.1em',
              WebkitTextStroke: '3px rgba(254,122,1,.7)',
              textTransform: 'uppercase',
              textShadow: '0 0 30px rgba(254,122,1,.3)',
              whiteSpace: 'nowrap',
            }}
          >
            OUTDATED
          </div>

          {/* Old content */}
          <div
            ref={oldTextRef}
            style={{
              position: 'absolute', inset: 0, zIndex: 8,
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 clamp(20px,6vw,96px)',
            }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              marginBottom: 'clamp(12px,2vh,20px)',
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(180,150,100,.5)', flexShrink: 0 }} />
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 'clamp(10px,1.1vw,12px)', fontWeight: 700, letterSpacing: '.4em', textTransform: 'uppercase', color: 'rgba(200,175,130,.55)' }}>
                Old School Method
              </span>
            </div>

            <div style={{ position: 'relative', display: 'inline-block' }}>
              <h2 style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 'clamp(44px,8vw,108px)',
                lineHeight: .86,
                letterSpacing: '.02em',
                textTransform: 'uppercase',
                color: 'rgba(220,200,165,.85)',
                margin: 0,
                textShadow: '2px 4px 0 rgba(0,0,0,.8)',
              }}>
                PAPER<br />
                REGISTER.<br />
                LATE FEES.<br />
                <span style={{ color: 'rgba(200,175,130,.6)' }}>CHAOS.</span>
              </h2>

              {/* Orange strike-through */}
              <div
                ref={strikeRef}
                style={{
                  position: 'absolute',
                  top: '50%', left: '-3%', width: '106%',
                  height: 'clamp(5px,.55vw,8px)',
                  background: 'linear-gradient(90deg, #fe7a01, #ff2200)',
                  transform: 'translateY(-50%) scaleX(0)',
                  borderRadius: 3, zIndex: 5,
                  boxShadow: '0 0 18px rgba(254,122,1,.8), 0 0 36px rgba(254,122,1,.4)',
                }}
              />
            </div>

            {/* Scroll chevrons */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 5, marginTop: 'clamp(20px,3vh,32px)' }}>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 'clamp(9px,1vw,11px)', letterSpacing: '.35em', textTransform: 'uppercase', color: 'rgba(200,175,130,.4)', marginBottom: 8, fontWeight: 600 }}>
                Scroll to upgrade
              </span>
              <div style={{ display: 'flex', gap: 6 }}>
                {[0,1,2].map(i => (
                  <div
                    key={i}
                    className="ts-chev"
                    style={{
                      width: 'clamp(10px,1.4vw,16px)',
                      height: 'clamp(10px,1.4vw,16px)',
                      borderRight: '2px solid rgba(254,122,1,.5)',
                      borderBottom: '2px solid rgba(254,122,1,.5)',
                      transform: 'rotate(45deg)',
                      animationDelay: `${i * 0.18}s`,
                      opacity: 1 - i * 0.22,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────
            DIAGONAL SLASH BLADE — tracks the wipe seam
        ──────────────────────────────────────────────── */}
        <div
          ref={slashRef}
          style={{
            position: 'absolute', top: 0, bottom: 0,
            left: '0%', width: 6,
            transform: 'translateX(-50%)',
            zIndex: 20, opacity: 0, pointerEvents: 'none',
            background: 'linear-gradient(180deg, transparent, #fe7a01 20%, #fff 50%, #fe7a01 80%, transparent)',
            boxShadow: '0 0 24px 8px rgba(254,122,1,.55), 0 0 48px 18px rgba(254,122,1,.22)',
          }}
        />

        {/* ────────────────────────────────────────────────
            BOTTOM PROGRESS BAR
        ──────────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', bottom: 'clamp(14px,2.2vh,24px)',
          left: '50%', transform: 'translateX(-50%)',
          zIndex: 40, width: 'min(320px,78vw)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 9, letterSpacing: '.25em', textTransform: 'uppercase', color: 'rgba(200,175,130,.45)', fontWeight: 600 }}>Manual</span>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 9, letterSpacing: '.25em', textTransform: 'uppercase', color: 'rgba(254,122,1,.6)', fontWeight: 600 }}>Automated</span>
          </div>
          <div style={{ position: 'relative', height: 2, background: 'rgba(255,255,255,.08)', borderRadius: 999, overflow: 'hidden' }}>
            <div
              ref={fillRef}
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, rgba(180,150,100,.5) 0%, #fe7a01 55%, #ff3300 100%)',
                transformOrigin: 'left',
                transform: 'scaleX(0)',
                boxShadow: '0 0 10px rgba(254,122,1,.6)',
              }}
            />
          </div>
        </div>

      </section>
    </>
  );
}