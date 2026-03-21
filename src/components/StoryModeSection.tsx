import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { X, AlertTriangle, TrendingUp, CheckCircle2, Zap, ArrowRight } from 'lucide-react';

/* ─── Keyframes & base styles ──────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Sora:wght@300;400;500;600;700&display=swap');

  @keyframes sm-float-a  { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(6deg)} }
  @keyframes sm-float-b  { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(10px) rotate(-6deg)} }
  @keyframes sm-pulse-r  { 0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.4)}  50%{box-shadow:0 0 0 16px rgba(239,68,68,0)} }
  @keyframes sm-pulse-o  { 0%,100%{box-shadow:0 0 0 0 rgba(247,147,30,.4)} 50%{box-shadow:0 0 0 16px rgba(247,147,30,0)} }
  @keyframes sm-ring     { 0%{transform:scale(.8);opacity:.6} 100%{transform:scale(1.8);opacity:0} }
  @keyframes sm-orbit    { 0%{transform:rotate(0deg) translateX(80px) rotate(0deg)} 100%{transform:rotate(360deg) translateX(80px) rotate(-360deg)} }
  @keyframes sm-shimmer  { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
  @keyframes sm-scan     { 0%{top:0;opacity:.7} 100%{top:100%;opacity:0} }
  @keyframes sm-ticker   { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes sm-blink    { 0%,49%{opacity:1} 50%,100%{opacity:0} }

  .sm-float-a { animation: sm-float-a 3s ease-in-out infinite; }
  .sm-float-b { animation: sm-float-b 3.5s ease-in-out .4s infinite; }
  .sm-float-c { animation: sm-float-a 4s ease-in-out .8s infinite; }
  .sm-blink   { animation: sm-blink 2s step-end infinite; }

  /* Diagonal divider shape */
  .sm-card { position:relative; overflow:hidden; }
  .sm-card::before {
    content:'';
    position:absolute; inset:0;
    background:inherit;
    clip-path:polygon(0 0,100% 0,100% 100%,0 100%);
  }

  /* Shimmer effect on cards */
  .sm-shimmer::after {
    content:'';
    position:absolute;
    inset:0;
    background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.06) 50%,transparent 60%);
    animation: sm-shimmer 3s ease-in-out infinite;
  }
`;

/* ─── Floating badge ────────────────────────────────────────────────────────── */
function FloatBadge({ icon, color, className }: { icon: React.ReactNode; color: string; className: string }) {
  return (
    <div
      className={className}
      style={{
        position: 'absolute', zIndex: 20,
        width: 52, height: 52, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `rgba(${color},.12)`,
        border: `1px solid rgba(${color},.35)`,
        backdropFilter: 'blur(10px)',
        boxShadow: `0 0 24px rgba(${color},.25)`,
      }}
    >
      {icon}
    </div>
  );
}

/* ─── Dialogue bubble ───────────────────────────────────────────────────────── */
function Bubble({ lines, accent, delay }: { lines: string[]; accent: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: .94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: .55, ease: [.22, 1, .36, 1] }}
      style={{
        position: 'relative',
        background: 'rgba(10,10,12,.88)',
        border: `1px solid rgba(${accent},.25)`,
        borderRadius: 20,
        padding: 'clamp(16px,2vw,24px) clamp(18px,2.4vw,28px)',
        backdropFilter: 'blur(20px)',
        boxShadow: `0 20px 48px rgba(0,0,0,.5), 0 0 0 1px rgba(${accent},.1), inset 0 1px 0 rgba(255,255,255,.06)`,
        overflow: 'hidden',
      }}
    >
      {/* Accent top bar */}
      <div style={{ position: 'absolute', top: 0, left: 24, right: 24, height: 2, borderRadius: '0 0 4px 4px', background: `linear-gradient(90deg,transparent,rgba(${accent},.7),transparent)` }} />

      {lines.map((l, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'flex-start', gap: 10,
          marginBottom: i < lines.length - 1 ? 10 : 0,
        }}>
          <span style={{ color: `rgba(${accent},1)`, fontSize: 12, marginTop: 4, flexShrink: 0 }}>◆</span>
          <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(12px,1.2vw,14px)', color: 'rgba(255,255,255,.82)', lineHeight: 1.6, margin: 0 }}>{l}</p>
        </div>
      ))}

      {/* Shimmer sweep */}
      <div className="sm-shimmer" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
    </motion.div>
  );
}

/* ─── Section connector arrow ───────────────────────────────────────────────── */
function ConnectorArrow() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      position: 'relative', zIndex: 10,
    }}>
      {/* Vertical line */}
      <div style={{ width: 1, height: 48, background: 'linear-gradient(180deg,transparent,rgba(247,147,30,.4),transparent)' }} />

      {/* Center circle */}
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          width: 48, height: 48, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(247,147,30,.2),transparent 70%)',
          border: '1px solid rgba(247,147,30,.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 24px rgba(247,147,30,.25)',
        }}
      >
        <ArrowRight size={18} color="#f7931e" />
      </motion.div>

      {/* Vertical line */}
      <div style={{ width: 1, height: 48, background: 'linear-gradient(180deg,rgba(247,147,30,.4),transparent)' }} />
    </div>
  );
}

/* ─── Problem card (LEFT) ───────────────────────────────────────────────────── */
function ProblemCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const problems = [
    'Leads come in but they never join.',
    'Payments & renewals are a nightmare.',
    'Members need real diet help, not PDFs.',
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .7, ease: [.22, 1, .36, 1] }}
      style={{ position: 'relative' }}
    >
      {/* Label pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: .15 }}
        style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '6px 18px', borderRadius: 999,
          background: 'rgba(239,68,68,.08)',
          border: '1px solid rgba(239,68,68,.25)',
        }}>
          <span className="sm-blink" style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 6px #ef4444', display: 'inline-block' }} />
          <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase', color: '#ef4444', fontWeight: 700 }}>The Problem</span>
        </div>
      </motion.div>

      {/* Main image card */}
      <div style={{
        position: 'relative', borderRadius: 24, overflow: 'hidden',
        border: '1px solid rgba(239,68,68,.15)',
        boxShadow: '0 40px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(239,68,68,.08)',
        background: '#0a0a0c',
      }}>
        {/* Scan line effect */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 2, zIndex: 10, pointerEvents: 'none',
          background: 'linear-gradient(90deg,transparent,rgba(239,68,68,.7),transparent)',
          animation: 'sm-scan 4s linear infinite',
        }} />

        <img
          src="https://images.unsplash.com/photo-1758519288176-0cde8339e06f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JyaWVkJTIwYnVzaW5lc3MlMjBvd25lciUyMHRoaW5raW5nfGVufDF8fHx8MTc2OTI1NjQyOXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Stressed Gym Owner"
          style={{ width: '100%', height: 'clamp(280px,38vh,420px)', objectFit: 'cover', filter: 'grayscale(.5) brightness(.72) sepia(.15)', display: 'block' }}
        />

        {/* Gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,5,5,.9) 0%, transparent 50%, rgba(0,0,0,.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 20%, rgba(239,68,68,.08) 0%, transparent 60%)' }} />

        {/* Corner HUD marks */}
        {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h], i) => (
          <div key={i} style={{
            position: 'absolute', [v]: 12, [h]: 12, width: 16, height: 16,
            borderTop: v === 'top' ? '2px solid rgba(239,68,68,.5)' : 'none',
            borderBottom: v === 'bottom' ? '2px solid rgba(239,68,68,.5)' : 'none',
            borderLeft: h === 'left' ? '2px solid rgba(239,68,68,.5)' : 'none',
            borderRight: h === 'right' ? '2px solid rgba(239,68,68,.5)' : 'none',
          }} />
        ))}

        {/* Status pill — top-left */}
        <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 15 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', borderRadius: 999,
            background: 'rgba(0,0,0,.7)', border: '1px solid rgba(239,68,68,.3)',
            backdropFilter: 'blur(8px)',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#ef4444', animation: 'sm-blink 1.4s step-end infinite', display: 'inline-block' }} />
            <span style={{ fontFamily: "'Sora',monospace", fontSize: 9, color: '#ef4444', letterSpacing: '.2em' }}>CRITICAL</span>
          </div>
        </div>
      </div>

      {/* Floating chaos icons */}
      <div className="sm-float-a" style={{ position: 'absolute', top: '18%', right: -20, zIndex: 20 }}>
        <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(239,68,68,.2)' }}>
          <X size={20} color="#ef4444" strokeWidth={2.5} />
        </div>
      </div>
      <div className="sm-float-b" style={{ position: 'absolute', top: '42%', left: -20, zIndex: 20 }}>
        <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(239,68,68,.2)' }}>
          <AlertTriangle size={20} color="#ef4444" strokeWidth={2.5} />
        </div>
      </div>
      <div className="sm-float-c" style={{ position: 'absolute', bottom: '22%', right: -14, zIndex: 20 }}>
        <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <X size={16} color="#ef4444" strokeWidth={2.5} />
        </div>
      </div>

      {/* Bubble */}
      <div style={{ marginTop: 20 }}>
        <Bubble
          lines={problems}
          accent="239,68,68"
          delay={.3}
        />
      </div>
    </motion.div>
  );
}

/* ─── Solution card (RIGHT) ─────────────────────────────────────────────────── */
function SolutionCard() {
  const solutions = [
    'Smart follow-ups convert leads automatically.',
    'Auto billing, reminders & tracking — zero stress.',
    'Expert AI diet plans with real macro precision.',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .7, ease: [.22, 1, .36, 1] }}
      style={{ position: 'relative' }}
    >
      {/* Label pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: .15 }}
        style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '6px 18px', borderRadius: 999,
          background: 'rgba(247,147,30,.08)',
          border: '1px solid rgba(247,147,30,.28)',
        }}>
          <span className="sm-blink" style={{ width: 6, height: 6, borderRadius: '50%', background: '#f7931e', boxShadow: '0 0 6px #f7931e', display: 'inline-block', animationDelay: '.3s' }} />
          <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase', color: '#f7931e', fontWeight: 700 }}>The Solution</span>
        </div>
      </motion.div>

      {/* Main holographic card */}
      <div style={{
        position: 'relative', borderRadius: 24, overflow: 'hidden',
        border: '1px solid rgba(247,147,30,.2)',
        boxShadow: '0 40px 80px rgba(0,0,0,.6), 0 0 60px rgba(247,147,30,.12), 0 0 0 1px rgba(247,147,30,.06)',
        background: '#080a06',
        height: 'clamp(280px,38vh,420px)',
      }}>
        {/* Grid texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(247,147,30,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(247,147,30,.06) 1px,transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        {/* Deep radial glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%,rgba(247,147,30,.12) 0%,transparent 65%)' }} />

        {/* Corner HUD marks */}
        {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h], i) => (
          <div key={i} style={{
            position: 'absolute', [v]: 12, [h]: 12, width: 16, height: 16,
            borderTop: v === 'top' ? '2px solid rgba(247,147,30,.4)' : 'none',
            borderBottom: v === 'bottom' ? '2px solid rgba(247,147,30,.4)' : 'none',
            borderLeft: h === 'left' ? '2px solid rgba(247,147,30,.4)' : 'none',
            borderRight: h === 'right' ? '2px solid rgba(247,147,30,.4)' : 'none',
          }} />
        ))}

        {/* Status pill */}
        <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 15 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', borderRadius: 999,
            background: 'rgba(0,0,0,.7)', border: '1px solid rgba(247,147,30,.3)',
            backdropFilter: 'blur(8px)',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#f7931e', animation: 'sm-blink 1.6s step-end infinite', animationDelay: '.4s', display: 'inline-block' }} />
            <span style={{ fontFamily: "'Sora',monospace", fontSize: 9, color: '#f7931e', letterSpacing: '.2em' }}>ACTIVE</span>
          </div>
        </div>

        {/* Central AI orb */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative' }}>
            {/* Expanding rings */}
            {[0, .5, 1].map((d, i) => (
              <div key={i} style={{
                position: 'absolute',
                inset: -(40 + i * 28),
                borderRadius: '50%',
                border: `1px solid rgba(247,147,30,${.25 - i * .07})`,
                animation: `sm-ring ${2.5 + i * .6}s ease-out ${d}s infinite`,
                pointerEvents: 'none',
              }} />
            ))}

            {/* Orbiting dot */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              width: 8, height: 8, borderRadius: '50%',
              background: '#f7931e',
              boxShadow: '0 0 12px rgba(247,147,30,.8)',
              animation: 'sm-orbit 4s linear infinite',
              marginTop: -4, marginLeft: -4,
            }} />
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              width: 6, height: 6, borderRadius: '50%',
              background: '#00e6b4',
              boxShadow: '0 0 10px rgba(0,230,180,.8)',
              animation: 'sm-orbit 6s linear .8s infinite',
              marginTop: -3, marginLeft: -3,
            }} />

            {/* Logo orb */}
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                width: 'clamp(100px,12vw,140px)',
                height: 'clamp(100px,12vw,140px)',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, rgba(255,180,60,.9), rgba(247,100,10,.8))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 60px rgba(247,147,30,.5), inset 0 0 30px rgba(255,255,255,.15), 0 0 0 1px rgba(247,147,30,.5)',
              }}
            >
              <img src="/gymsaathi_logo_icon.png" alt="GymSaathi" style={{ width: '55%', height: '55%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top,rgba(8,10,6,.95),transparent)' }} />
      </div>

      {/* Floating success icons */}
      <div className="sm-float-a" style={{ position: 'absolute', top: '18%', right: -20, zIndex: 20 }}>
        <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(247,147,30,.1)', border: '1px solid rgba(247,147,30,.35)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(247,147,30,.25)' }}>
          <CheckCircle2 size={20} color="#f7931e" strokeWidth={2} />
        </div>
      </div>
      <div className="sm-float-b" style={{ position: 'absolute', top: '42%', left: -20, zIndex: 20 }}>
        <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(0,230,180,.08)', border: '1px solid rgba(0,230,180,.3)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(0,230,180,.2)' }}>
          <TrendingUp size={20} color="#00e6b4" strokeWidth={2} />
        </div>
      </div>
      <div className="sm-float-c" style={{ position: 'absolute', bottom: '22%', right: -14, zIndex: 20 }}>
        <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(247,147,30,.1)', border: '1px solid rgba(247,147,30,.3)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Zap size={16} color="#f7931e" strokeWidth={2} />
        </div>
      </div>

      {/* Bubble */}
      <div style={{ marginTop: 20 }}>
        <Bubble
          lines={solutions}
          accent="247,147,30"
          delay={.35}
        />
      </div>
    </motion.div>
  );
}

/* ─── Main export ───────────────────────────────────────────────────────────── */
export default function StoryModeSection() {
  return (
    <>
      <style>{STYLES}</style>

      <section style={{
        position: 'relative', width: '100%',
        background: '#060708',
        overflow: 'hidden',
        padding: 'clamp(64px,8vh,120px) clamp(20px,5vw,64px)',
      }}>

        {/* ── Atmospheric background glows ───────────────────────────── */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {/* Left blue-ish glow */}
          <div style={{
            position: 'absolute', top: '-10%', left: '-10%',
            width: 'clamp(400px,50vw,700px)', aspectRatio: '1/1',
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(239,68,68,.08) 0%,transparent 70%)',
            filter: 'blur(60px)',
          }} />
          {/* Right orange glow */}
          <div style={{
            position: 'absolute', top: '-10%', right: '-10%',
            width: 'clamp(400px,50vw,700px)', aspectRatio: '1/1',
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(247,147,30,.08) 0%,transparent 70%)',
            filter: 'blur(60px)',
          }} />
          {/* Bottom center haze */}
          <div style={{
            position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)',
            width: 'clamp(300px,40vw,600px)', height: 300,
            background: 'radial-gradient(ellipse,rgba(247,147,30,.05) 0%,transparent 70%)',
            filter: 'blur(40px)',
          }} />

          {/* Subtle grid */}
          <div style={{
            position: 'absolute', inset: 0, opacity: .03,
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>

        {/* ── Section header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7, ease: [.22, 1, .36, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(48px,7vh,80px)', position: 'relative', zIndex: 10 }}
        >
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ height: 1, width: 'clamp(32px,5vw,64px)', background: 'linear-gradient(90deg,transparent,rgba(247,147,30,.5))' }} />
            <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 10, letterSpacing: '.4em', textTransform: 'uppercase', color: 'rgba(247,147,30,.7)', fontWeight: 600 }}>
              See the difference
            </span>
            <div style={{ height: 1, width: 'clamp(32px,5vw,64px)', background: 'linear-gradient(90deg,rgba(247,147,30,.5),transparent)' }} />
          </div>

          {/* Main title */}
          <h2 style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 'clamp(52px,8vw,96px)',
            lineHeight: .92, letterSpacing: '-.01em',
            color: '#fff', margin: '0 0 16px',
          }}>
            Story{' '}
            <span style={{ background: 'linear-gradient(90deg,#f7931e,#ff5500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Mode
            </span>
          </h2>

          <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(13px,1.4vw,16px)', color: 'rgba(255,255,255,.38)', maxWidth: 480, margin: '0 auto' }}>
            From manual chaos to intelligent automation — see how GymSaathi rewrites the story.
          </p>
        </motion.div>

        {/* ── Two-scene layout ───────────────────────────────────────── */}
        <div style={{
          position: 'relative', zIndex: 10,
          maxWidth: 1200, margin: '0 auto',
          display: 'grid',
          /* On mobile: single column. On desktop: two equal cols with connector */
          gridTemplateColumns: 'minmax(0,1fr)',
          gap: 'clamp(40px,6vh,64px)',
        }}>

          {/* Desktop: side-by-side via inner grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)',
            gap: 'clamp(24px,3vw,40px)',
            alignItems: 'start',
          }}
          className="story-grid"
          >
            <ProblemCard />
            {/* Connector — hidden on mobile via inline fallback */}
            <div style={{ paddingTop: 'clamp(140px,22vh,200px)' }}>
              <ConnectorArrow />
            </div>
            <SolutionCard />
          </div>

        </div>

        {/* ── Bottom VS badge ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: .8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: .5, duration: .6, ease: [.22, 1, .36, 1] }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(40px,6vh,64px)', position: 'relative', zIndex: 10 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 'clamp(16px,3vw,32px)',
            padding: 'clamp(14px,2vh,20px) clamp(24px,4vw,48px)',
            borderRadius: 999,
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,.08)',
            backdropFilter: 'blur(16px)',
          }}>
            <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(10px,1vw,13px)', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(239,68,68,.7)', fontWeight: 600 }}>Before</span>
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,.1)' }} />
            <div style={{
              fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(18px,2.5vw,28px)', letterSpacing: '.1em',
              background: 'linear-gradient(90deg,#ef4444,#f7931e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>VS</div>
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,.1)' }} />
            <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(10px,1vw,13px)', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(247,147,30,.7)', fontWeight: 600 }}>After</span>
          </div>
        </motion.div>

        {/* Mobile responsive override */}
        <style>{`
          @media (max-width: 768px) {
            .story-grid {
              grid-template-columns: 1fr !important;
            }
            .story-grid > *:nth-child(2) {
              display: none !important;
            }
          }
        `}</style>

      </section>
    </>
  );
}