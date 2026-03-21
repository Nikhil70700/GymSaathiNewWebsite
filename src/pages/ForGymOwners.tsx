import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion, useMotionValue, useTransform, useSpring,
  useInView, useScroll, AnimatePresence, animate
} from "motion/react";
import {
  Zap, Users, DollarSign, Building2, Target, Phone,
  Settings, ArrowRight, Check, Star, Menu, X,
  ChevronDown, Dumbbell, TrendingUp, Shield, Clock
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   GLOBAL STYLES — aligned to main app font system
═══════════════════════════════════════════════════════ */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --or:#f7931e; --or2:#ff6b00; --or3:#ffb347;
  --bg:#060608; --s1:#0e0e12; --s2:#141418;
  --t:#f2f2f2; --tm:rgba(242,242,242,.65); --td:#3a3a4a;
  --ff:'font-heading',sans-serif;
  --fb:'Barlow',sans-serif;
  --fc:'Barlow Condensed',sans-serif;
  --r:20px;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--t);font-family:var(--fb);-webkit-font-smoothing:antialiased;overflow-x:hidden;cursor:none}
::selection{background:rgba(247,147,30,.35);color:#fff}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:#060608}
::-webkit-scrollbar-thumb{background:linear-gradient(180deg,var(--or),var(--or2));border-radius:2px}

.con{max-width:1180px;margin:0 auto;padding:0 clamp(20px,4vw,60px)}
.sec{padding:clamp(80px,10vw,140px) 0;position:relative}

/* Headings now use font-heading (same as main app) */
.hxl{font-family:var(--ff);font-size:clamp(48px,8vw,100px);line-height:.94;letter-spacing:.01em;color:var(--t)}
.hlg{font-family:var(--ff);font-size:clamp(36px,5.5vw,70px);line-height:.96;color:var(--t)}
.hmd{font-family:var(--ff);font-size:clamp(24px,3.5vw,44px);line-height:1.05;color:var(--t)}

/* Body copy — improved contrast (was .42-.5 opacity, now .65+) */
.body-lg{font-size:clamp(15px,1.8vw,18px);line-height:1.72;color:rgba(242,242,242,.72);font-weight:400}
.body-sm{font-size:clamp(13px,1.3vw,15px);line-height:1.7;color:rgba(242,242,242,.65)}

.label{
  display:inline-flex;align-items:center;gap:8px;
  padding:5px 16px;border-radius:100px;
  border:1px solid rgba(247,147,30,.3);
  background:rgba(247,147,30,.07);
  font-family:var(--fc);font-size:11px;font-weight:700;
  letter-spacing:.14em;text-transform:uppercase;color:var(--or)
}

.bp{
  position:relative;display:inline-flex;align-items:center;gap:10px;
  padding:clamp(14px,2vw,18px) clamp(30px,4vw,48px);
  background:linear-gradient(135deg,var(--or),var(--or2));
  color:#fff;font-family:var(--fc);font-weight:800;
  font-size:clamp(12px,1.4vw,14px);letter-spacing:.18em;text-transform:uppercase;
  border-radius:100px;border:none;cursor:pointer;overflow:hidden;
  white-space:nowrap;transition:transform .2s,box-shadow .2s
}
.bp::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--or3),var(--or));opacity:0;transition:opacity .3s}
.bp:hover{transform:translateY(-3px);box-shadow:0 16px 50px rgba(247,147,30,.45)}
.bp:hover::before{opacity:1}
.bo{
  display:inline-flex;align-items:center;gap:10px;
  padding:clamp(13px,2vw,17px) clamp(30px,4vw,48px);
  background:transparent;color:var(--t);
  font-family:var(--fc);font-weight:700;
  font-size:clamp(12px,1.4vw,14px);letter-spacing:.18em;text-transform:uppercase;
  border-radius:100px;border:1.5px solid rgba(242,242,242,.25);
  cursor:pointer;transition:all .25s;white-space:nowrap
}
.bo:hover{border-color:rgba(242,242,242,.55);background:rgba(242,242,242,.05);transform:translateY(-3px)}

.card{
  background:linear-gradient(145deg,rgba(255,255,255,.03),rgba(247,147,30,.015));
  border:1px solid rgba(247,147,30,.1);border-radius:var(--r);
  transition:border-color .35s,transform .35s,box-shadow .35s
}
.card:hover{
  border-color:rgba(247,147,30,.32);transform:translateY(-8px);
  box-shadow:0 28px 70px rgba(0,0,0,.5),0 0 40px rgba(247,147,30,.1)
}

.divline{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(247,147,30,.18),transparent)}

.g2{display:grid;grid-template-columns:1fr;gap:clamp(16px,2.5vw,28px)}
.g3{display:grid;grid-template-columns:1fr;gap:clamp(16px,2.5vw,28px)}
.g4{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(14px,2vw,24px)}
@media(min-width:640px){.g2{grid-template-columns:repeat(2,1fr)}.g3{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.g3{grid-template-columns:repeat(3,1fr)}.g4{grid-template-columns:repeat(4,1fr)}}

/* Noise overlay */
body::after{
  content:'';position:fixed;inset:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.045'/%3E%3C/svg%3E");
  pointer-events:none;z-index:9999;opacity:.5
}
`;

/* ── Custom Cursor ── */
function Cursor() {
  const cx = useMotionValue(-100);
  const cy = useMotionValue(-100);
  const sx = useSpring(cx, { stiffness: 180, damping: 18 });
  const sy = useSpring(cy, { stiffness: 180, damping: 18 });
  const [hov, setHov] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const mv = (e: MouseEvent) => { cx.set(e.clientX); cy.set(e.clientY); };
    const over = (e: MouseEvent) => setHov(!!(e.target as Element).closest("button,a,[data-hover]"));
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <>
      <motion.div style={{ x: cx, y: cy, translateX: "-50%", translateY: "-50%", position: "fixed", top: 0, left: 0, zIndex: 10001, pointerEvents: "none" }}>
        <motion.div animate={{ scale: clicking ? 0.5 : 1 }} style={{ width: 8, height: 8, borderRadius: "50%", background: "#f7931e" }} />
      </motion.div>
      <motion.div style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", position: "fixed", top: 0, left: 0, zIndex: 10000, pointerEvents: "none" }}>
        <motion.div
          animate={{ scale: hov ? 2.2 : clicking ? 0.8 : 1, opacity: hov ? 0.5 : 0.3 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          style={{ width: 32, height: 32, borderRadius: "50%", border: "1.5px solid #f7931e" }}
        />
      </motion.div>
    </>
  );
}

/* ── Scroll Progress ── */
function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return <motion.div style={{ scaleX, transformOrigin: "left", position: "fixed", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#f7931e,#ff6b00,#ffb347)", zIndex: 10002 }} />;
}

/* ── Split Text ── */
function SplitText({ text, className, style, delay = 0, staggerDelay = 0.03 }: {
  text: string; className?: string; style?: React.CSSProperties; delay?: number; staggerDelay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const words = text.split(" ");
  return (
    <span ref={ref} className={className} style={{ display: "block", ...style }}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.25em" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.75, delay: delay + wi * staggerDelay, ease: [0.22, 1, 0.36, 1] }}
          >{word}</motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── Counter ── */
function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: v => setVal(Math.round(v)) });
    return ctrl.stop;
  }, [inView, to]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

/* ── Magnetic Button ── */
function MagBtn({ children, className, onClick, style }: {
  children: React.ReactNode; className?: string; onClick?: () => void; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  }, []);
  return (
    <motion.button ref={ref} className={className} onClick={onClick} style={{ x: sx, y: sy, ...style }}
      onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0); }} whileTap={{ scale: 0.94 }}>
      {children}
    </motion.button>
  );
}

/* ── Orbs ── */
function Orbs({ orbs }: { orbs: { size: number; top?: string; left?: string; color: string; blur?: number; dur?: number; ax?: number[]; ay?: number[]; as?: number[] }[] }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {orbs.map((o, i) => (
        <motion.div key={i}
          style={{ position: "absolute", width: o.size, height: o.size, borderRadius: "50%", background: `radial-gradient(circle,${o.color} 0%,transparent 65%)`, top: o.top, left: o.left, filter: `blur(${o.blur || 60}px)` }}
          animate={{ x: o.ax || [0, 40, 0], y: o.ay || [0, -30, 0], scale: o.as || [1, 1.15, 1] }}
          transition={{ duration: o.dur || 10, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
        />
      ))}
    </div>
  );
}

/* ── Marquee ── */
function Marquee({ items }: { items: string[] }) {
  return (
    <div style={{ overflow: "hidden", padding: "20px 0", borderTop: "1px solid rgba(247,147,30,.08)", borderBottom: "1px solid rgba(247,147,30,.08)", background: "rgba(247,147,30,.02)" }}>
      <motion.div
        style={{ display: "flex", gap: 60, whiteSpace: "nowrap", width: "max-content" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "clamp(14px,1.8vw,18px)", color: "#3a3a4a", letterSpacing: ".14em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 24 }}>
            {item}
            <span style={{ color: "#f7931e", fontSize: 14, transform: "rotate(45deg)", display: "inline-block" }}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Tilt Card ── */
function TiltCard({ children, className, style, intensity = 8 }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties; intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 200, damping: 20 });
  const sRotY = useSpring(rotY, { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rotX.set((py - 0.5) * -intensity * 2);
    rotY.set((px - 0.5) * intensity * 2);
  };

  return (
    <motion.div ref={ref} className={className}
      style={{ rotateX: sRotX, rotateY: sRotY, transformPerspective: 800, transformStyle: "preserve-3d", ...style, position: "relative", overflow: "hidden" }}
      onMouseMove={handleMove} onMouseLeave={() => { rotX.set(0); rotY.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/* ── Stable particles — no Math.random() in render ── */
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  w: (i * 7 % 4) + 2,
  h: (i * 11 % 4) + 2,
  left: `${10 + (i * 37 % 80)}%`,
  top:  `${10 + (i * 53 % 80)}%`,
  dur:  4 + (i * 17 % 4),
  del:  i * 0.6,
}));

const CTA_PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  w: `${(i * 7 % 3) + 1}px`,
  h: `${(i * 11 % 3) + 1}px`,
  left: `${10 + (i * 43 % 80)}%`,
  top:  `${10 + (i * 59 % 80)}%`,
  dur:  5 + (i * 17 % 4),
  del:  i * 0.8,
}));

/* ═══════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════ */
function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const o1x = useTransform(smx, [-1, 1], [-30, 30]);
  const o1y = useTransform(smy, [-1, 1], [-20, 20]);
  const o2x = useTransform(smx, [-1, 1], [20, -20]);
  const o2y = useTransform(smy, [-1, 1], [15, -15]);

  const stats = [
    { val: 107, suf: "+",    label: "Gyms Live"    },
    { val: 79,  pre: "₹",   label: "Per Month"    },
    { val: 60,  suf: " min", label: "Setup Time"   },
    { val: 99,  suf: "%",   label: "Uptime"       },
  ];

  return (
    <div
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left - r.width / 2) / (r.width / 2));
        my.set((e.clientY - r.top - r.height / 2) / (r.height / 2));
      }}
      style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", background: "var(--bg)" }}
    >
      <motion.div style={{ x: o1x, y: o1y, position: "absolute", top: "10%", left: "-5%", width: "clamp(400px,60vw,700px)", height: "clamp(400px,60vw,700px)", borderRadius: "50%", background: "radial-gradient(circle,rgba(247,147,30,.09) 0%,transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />
      <motion.div style={{ x: o2x, y: o2y, position: "absolute", bottom: "5%", right: "-5%", width: "clamp(300px,40vw,500px)", height: "clamp(300px,40vw,500px)", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,107,0,.07) 0%,transparent 65%)", filter: "blur(100px)", pointerEvents: "none" }} />

      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(247,147,30,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(247,147,30,.03) 1px,transparent 1px)", backgroundSize: "clamp(40px,6vw,80px) clamp(40px,6vw,80px)", maskImage: "radial-gradient(ellipse 80% 80% at 50% 40%,black 30%,transparent 100%)", pointerEvents: "none" }} />

      {/* Concentric rings */}
      {[500, 700, 900].map((s, i) => (
        <motion.div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: s, height: s, marginLeft: -s / 2, marginTop: -s / 2, borderRadius: "50%", border: `1px solid rgba(247,147,30,${0.06 - i * 0.015})` }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.02, 1] }}
          transition={{ rotate: { duration: 30 + i * 15, repeat: Infinity, ease: "linear" }, scale: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 } }}
        />
      ))}

      {/* Stable floating particles — no Math.random() */}
      {PARTICLES.map((p, i) => (
        <motion.div key={i} style={{ position: "absolute", width: p.w, height: p.h, borderRadius: "50%", background: "#f7931e", left: p.left, top: p.top, opacity: 0 }}
          animate={{ y: [0, -60, 0], opacity: [0, 0.5, 0], scale: [0, 1, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: "easeInOut" }}
        />
      ))}

      <div className="con" style={{ position: "relative", zIndex: 2, paddingTop: 130, paddingBottom: 80 }}>
        <div style={{ textAlign: "center", maxWidth: 960, margin: "0 auto" }}>

          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: 32 }}>
            <span className="label">
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 7, height: 7, borderRadius: "50%", background: "#f7931e", display: "inline-block" }} />
              India's #1 Gym Management Platform
            </span>
          </motion.div>

          {/* Headline — font-heading, same as main app */}
          <div className="hxl" style={{ marginBottom: 28 }}>
            <SplitText text="RUN YOUR GYM" className="hxl" staggerDelay={0.06} />
            <SplitText text="SMARTER." className="hxl"
              style={{ background: "linear-gradient(135deg,#f7931e 0%,#ffb347 50%,#ff6b00 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}
              delay={0.35} staggerDelay={0.08} />
          </div>

          {/* Body — improved contrast */}
          <motion.p className="body-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}
            style={{ maxWidth: 660, margin: "0 auto 16px", fontSize: "clamp(15px,1.8vw,18px)" }}>
            GymSaathi gives local gyms a free website, powerful ERP, and a premium member app — all in one platform. No setup cost. No tech headache.
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(18px,2.5vw,26px)", color: "#f7931e", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 44 }}>
            Just ₹79 / Month. Everything Included.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.05 }}
            style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}>
            <MagBtn className="bp" style={{ fontSize: "clamp(12px,1.4vw,14px)", padding: "clamp(14px,2vw,20px) clamp(32px,4vw,52px)", boxShadow: "0 0 50px rgba(247,147,30,.35)" }}>
              Get Free Demo <ArrowRight size={16} />
            </MagBtn>
            <MagBtn className="bo" style={{ fontSize: "clamp(12px,1.4vw,14px)", padding: "clamp(14px,2vw,20px) clamp(32px,4vw,52px)" }}>
              Talk to Our Team
            </MagBtn>
          </motion.div>

          {/* Stat grid */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", background: "rgba(14,14,18,0.7)", border: "1px solid rgba(247,147,30,.12)", borderRadius: 24, overflow: "hidden", backdropFilter: "blur(12px)" }}
            className="hero-stats">
            {stats.map((s, i) => (
              <motion.div key={i}
                style={{ padding: "clamp(20px,3vw,30px)", textAlign: "center", borderRight: i % 2 === 0 ? "1px solid rgba(247,147,30,.08)" : "none", borderBottom: i < 2 ? "1px solid rgba(247,147,30,.08)" : "none" }}
                whileHover={{ background: "rgba(247,147,30,.04)" }}>
                <div style={{ fontFamily: "font-heading, sans-serif", fontSize: "clamp(28px,5vw,46px)", color: "#f7931e", letterSpacing: ".02em", lineHeight: 1 }}>
                  <Counter to={s.val} prefix={s.pre || ""} suffix={s.suf || ""} />
                </div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: "clamp(10px,1.2vw,13px)", color: "rgba(242,242,242,.45)", marginTop: 6, letterSpacing: ".1em", textTransform: "uppercase" }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 10, color: "rgba(242,242,242,.35)", letterSpacing: ".2em", textTransform: "uppercase" }}>Scroll</span>
        <motion.div style={{ width: 1, height: 40, background: "linear-gradient(180deg,#f7931e,transparent)", originY: 0 }}
          animate={{ scaleY: [0, 1, 0], y: [0, 0, 20] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>

      <style>{`@media(min-width:640px){.hero-stats{grid-template-columns:repeat(4,1fr)!important}}`}</style>
    </div>
  );
}

const MARQUEE_ITEMS = ["Gym ERP System","Member Management","Auto Billing","Fitness App","Free Website","WhatsApp Reminders","Progress Tracking","Diet Plans","Staff Management","Revenue Reports","Workout Planner","Lead Capture"];

/* ═══════════════════════════════════════════════════════
   HOW IT WORKS
═══════════════════════════════════════════════════════ */
function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const steps = [
    { n: "01", icon: <Shield size={26} color="#f7931e" />, title: "PARTNER UP", desc: "Sign up in minutes. No credit card, no setup fee — zero friction to start." },
    { n: "02", icon: <Zap size={26} color="#f7931e" />, title: "GO DIGITAL", desc: "Your website, ERP dashboard, and member app go live instantly." },
    { n: "03", icon: <TrendingUp size={26} color="#f7931e" />, title: "MANAGE & GROW", desc: "Track members, automate billing, and scale your gym with ease." },
  ];
  return (
    <section ref={ref} className="sec" style={{ background: "var(--s1)" }}>
      <div className="divline" style={{ position: "absolute", top: 0 }} />
      <div className="con">
        <div style={{ textAlign: "center", marginBottom: "clamp(48px,7vw,80px)" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: 20 }}>
            <span className="label">How It Works</span>
          </motion.div>
          <SplitText text="3 STEPS TO GO LIVE" className="hlg" delay={0.1} staggerDelay={0.05} />
        </div>
        <div className="g3">
          {steps.map((s, i) => (
            <TiltCard key={i} className="card" style={{ padding: "clamp(28px,4vw,48px)", overflow: "hidden", cursor: "default" }}>
              <div style={{ position: "absolute", top: -20, right: 10, fontFamily: "font-heading, sans-serif", fontSize: "clamp(90px,14vw,160px)", color: "rgba(247,147,30,.04)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>{s.n}</div>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.15 }}>
                <motion.div
                  style={{ width: 64, height: 64, borderRadius: "50%", border: "1.5px solid rgba(247,147,30,.35)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28, background: "rgba(247,147,30,.06)" }}
                  animate={{ boxShadow: ["0 0 0px rgba(247,147,30,0)","0 0 24px rgba(247,147,30,.3)","0 0 0px rgba(247,147,30,0)"] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}>
                  {s.icon}
                </motion.div>
                <h3 className="hmd" style={{ fontSize: "clamp(22px,2.8vw,32px)", marginBottom: 14 }}>{s.title}</h3>
                <p className="body-sm" style={{ lineHeight: 1.8 }}>{s.desc}</p>
                <motion.div style={{ height: 2, background: "linear-gradient(90deg,#f7931e,transparent)", borderRadius: 1, marginTop: 32, scaleX: 0, originX: 0 }}
                  animate={inView ? { scaleX: 1 } : { scaleX: 0 }} transition={{ duration: 0.8, delay: 0.4 + i * 0.15 }} />
              </motion.div>
            </TiltCard>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.6 }} style={{ textAlign: "center", marginTop: 52 }}>
          <p style={{ fontFamily: "'Barlow',sans-serif", fontWeight: 500, fontSize: "clamp(14px,1.8vw,17px)", color: "rgba(242,242,242,.55)" }}>
            You focus on your members. <span style={{ color: "#f7931e", fontWeight: 700 }}>GymSaathi handles the rest.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   ERP
═══════════════════════════════════════════════════════ */
function ERPSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const features = [
    { icon: <Users size={20} color="#f7931e" />, title: "Member & Subscription Mgmt", desc: "Add members, track plans, renewals, and attendance from one place." },
    { icon: <DollarSign size={20} color="#f7931e" />, title: "Automated Billing & Reminders", desc: "Fee collection with WhatsApp nudges — zero manual follow-ups." },
    { icon: <Building2 size={20} color="#f7931e" />, title: "Staff & Inventory Control", desc: "Manage trainer salaries, roles, and gear without spreadsheets." },
    { icon: <TrendingUp size={20} color="#f7931e" />, title: "Actionable Reports", desc: "Revenue, active members, renewals and growth insights at a glance." },
  ];
  return (
    <section ref={ref} className="sec" style={{ background: "var(--bg)", position: "relative" }}>
      <div className="divline" style={{ position: "absolute", top: 0 }} />
      <Orbs orbs={[{ size: 500, top: "20%", left: "-10%", color: "rgba(247,147,30,.06)", blur: 80, dur: 12 },{ size: 300, top: "60%", left: "70%", color: "rgba(255,107,0,.04)", blur: 60, dur: 8 }]} />
      <div className="con" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(48px,6vw,80px)", alignItems: "center" }} className="erp-grid">
          <div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
              <span className="label" style={{ marginBottom: 20, display: "inline-flex" }}>Gym ERP</span>
              <div className="hlg" style={{ marginTop: 16, marginBottom: 20 }}>
                <SplitText text="RUN YOUR GYM" className="hlg" delay={0.1} staggerDelay={0.05} />
                <SplitText text="ON AUTOPILOT" className="hlg"
                  style={{ background: "linear-gradient(135deg,#f7931e,#ffb347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}
                  delay={0.35} staggerDelay={0.05} />
              </div>
              <p className="body-lg" style={{ marginBottom: 36, maxWidth: 480 }}>All daily operations — members, payments, staff, reports — from one smart dashboard. No IT degree needed.</p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <MagBtn className="bp">Explore ERP <ArrowRight size={15} /></MagBtn>
                <MagBtn className="bo">Live Demo</MagBtn>
              </div>
            </motion.div>
          </div>
          <div className="g2" style={{ gap: 18 }}>
            {features.map((f, i) => (
              <TiltCard key={i} className="card" style={{ padding: "clamp(22px,3vw,32px)", cursor: "default" }}>
                <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay: i * 0.12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 13, background: "rgba(247,147,30,.09)", border: "1px solid rgba(247,147,30,.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>{f.icon}</div>
                  <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(15px,1.8vw,19px)", color: "#f2f2f2", marginBottom: 8, letterSpacing: ".02em" }}>{f.title}</h3>
                  <p className="body-sm">{f.desc}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(min-width:1024px){.erp-grid{grid-template-columns:1fr 1.2fr!important}}`}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MEMBER APP
═══════════════════════════════════════════════════════ */
function MemberApp() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const perks = [
    { title: "Goal-Based Workout Planner", desc: "Custom programs with video guidance for every fitness level." },
    { title: "Nutrition & Diet Tracking", desc: "Personalized diet plans, calorie logs, and macro tracking built in." },
    { title: "Progress & Streak System", desc: "Visual progress charts and streaks that drive consistency." },
    { title: "AI Recommendations Engine", desc: "Smart nudges that help members train smarter and hit goals faster." },
  ];
  const bars = [{ label: "Workouts", pct: 78 }, { label: "Nutrition", pct: 89 }, { label: "Recovery", pct: 62 }];
  return (
    <section ref={ref} className="sec" style={{ background: "var(--s1)" }}>
      <div className="divline" style={{ position: "absolute", top: 0 }} />
      <div className="con">
        <div style={{ textAlign: "center", marginBottom: "clamp(48px,6vw,80px)" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ marginBottom: 20 }}>
            <span className="label">Member App</span>
          </motion.div>
          <SplitText text="KEEP MEMBERS HOOKED" className="hlg" delay={0.1} staggerDelay={0.04} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(40px,6vw,80px)", alignItems: "center" }} className="app-grid">
          {/* Phone mockup */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ display: "flex", justifyContent: "center" }}>
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <div style={{ position: "relative", width: "clamp(240px,42vw,310px)" }}>
                <div style={{ position: "absolute", inset: -30, borderRadius: "50%", background: "radial-gradient(circle,rgba(247,147,30,.15) 0%,transparent 70%)", filter: "blur(30px)", pointerEvents: "none" }} />
                <div style={{ position: "relative", width: "100%", aspectRatio: "9/19", borderRadius: 44, border: "2px solid rgba(247,147,30,.3)", background: "linear-gradient(160deg,#1a1a20 0%,#111115 100%)", overflow: "hidden", boxShadow: "0 50px 100px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.08)", padding: 20 }}>
                  <div style={{ width: 80, height: 26, borderRadius: 13, background: "#0a0a0e", margin: "-4px auto 16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#1a1a20", border: "1px solid #2a2a30" }} />
                    <div style={{ width: 40, height: 6, borderRadius: 3, background: "#1a1a20" }} />
                  </div>
                  <div style={{ textAlign: "center", marginBottom: 16 }}>
                    <div style={{ fontFamily: "font-heading, sans-serif", fontSize: 20, color: "#f2f2f2", letterSpacing: ".02em" }}>Good Morning 💪</div>
                    <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, color: "#3a3a4a", marginTop: 3 }}>Day 47 · Keep the streak!</div>
                  </div>
                  {["Chest & Triceps Today","Protein: 142g / 160g","Steps: 8,420 / 10k"].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 + i * 0.12 }}
                      style={{ background: "rgba(247,147,30,.06)", border: "1px solid rgba(247,147,30,.14)", borderRadius: 13, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#f7931e", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 12, color: "rgba(242,242,242,.75)" }}>{item}</span>
                    </motion.div>
                  ))}
                  <div style={{ marginTop: 12 }}>
                    {bars.map((b, i) => (
                      <div key={i} style={{ marginBottom: 10 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ fontFamily: "'Barlow',sans-serif", fontWeight: 600, fontSize: 10, color: "#5a5a6a" }}>{b.label}</span>
                          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, color: "#f7931e", letterSpacing: ".05em" }}>{b.pct}%</span>
                        </div>
                        <div style={{ height: 4, borderRadius: 4, background: "#1e1e24", overflow: "hidden" }}>
                          <motion.div initial={{ width: 0 }} animate={inView ? { width: `${b.pct}%` } : {}} transition={{ duration: 1.2, delay: 0.7 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg,#f7931e,#ffb347)" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: "center", marginTop: 16 }}>
                    <div style={{ width: 100, height: 4, borderRadius: 2, background: "#2a2a30", margin: "0 auto" }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          {/* Feature list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {perks.map((p, i) => (
              <motion.div key={i} className="card" initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay: i * 0.12 }}
                style={{ padding: "clamp(18px,2.5vw,26px)", display: "flex", gap: 18, alignItems: "flex-start", cursor: "default" }}
                whileHover={{ x: 8, borderColor: "rgba(247,147,30,.3)" }}>
                <motion.div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(247,147,30,.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }} whileHover={{ rotate: 10, scale: 1.1 }}>
                  <Check size={16} color="#f7931e" strokeWidth={2.5} />
                </motion.div>
                <div>
                  <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(15px,1.8vw,19px)", color: "#f2f2f2", marginBottom: 6, letterSpacing: ".02em" }}>{p.title}</h3>
                  <p className="body-sm">{p.desc}</p>
                </div>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}>
              <MagBtn className="bp" style={{ marginTop: 8 }}>See Member App <ArrowRight size={15} /></MagBtn>
            </motion.div>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:1024px){.app-grid{grid-template-columns:1fr 1.5fr!important}}`}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   WEBSITE
═══════════════════════════════════════════════════════ */
function WebsiteSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const feats = [
    { title: "Custom Gym Website — Free", desc: "Mobile-first site tailored to your gym brand and city." },
    { title: "SEO & Google Visibility", desc: "Rank higher when people search for gyms near you." },
    { title: "Lead Capture + CRM Sync", desc: "All enquiries auto-flow into your GymSaathi dashboard." },
    { title: "Social Media Integration", desc: "Instagram & YouTube connected to amplify your presence." },
  ];
  return (
    <section ref={ref} className="sec" style={{ background: "var(--bg)" }}>
      <div className="divline" style={{ position: "absolute", top: 0 }} />
      <div className="con">
        <div style={{ textAlign: "center", marginBottom: "clamp(48px,6vw,80px)" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ marginBottom: 20 }}>
            <span className="label">Free Website</span>
          </motion.div>
          <SplitText text="YOUR GYM ONLINE" className="hlg" delay={0.1} staggerDelay={0.05} />
          <SplitText text="BUILT & MANAGED FREE" className="hlg"
            style={{ background: "linear-gradient(135deg,#f7931e,#ffb347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}
            delay={0.4} staggerDelay={0.04} />
        </div>
        {/* Browser mockup */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} style={{ marginBottom: 48 }}>
          <motion.div whileHover={{ y: -6, boxShadow: "0 60px 120px rgba(0,0,0,.6),0 0 60px rgba(247,147,30,.1)" }} transition={{ duration: 0.4 }}
            style={{ borderRadius: 22, border: "1px solid rgba(247,147,30,.18)", background: "#0e0e12", overflow: "hidden", maxWidth: 900, margin: "0 auto", boxShadow: "0 40px 100px rgba(0,0,0,.5)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,.04)", background: "#131317" }}>
              {["#f7575f","#f7b731","#34c769"].map((c, i) => (<div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: .75 }} />))}
              <div style={{ flex: 1, marginLeft: 16, background: "#1c1c22", borderRadius: 8, padding: "6px 14px", fontFamily: "'Barlow',sans-serif", fontSize: 12, color: "#3a3a4a", display: "flex", alignItems: "center", gap: 8, maxWidth: 340 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", border: "1.5px solid #3a3a4a", flexShrink: 0 }} />ironforce.gymsaathi.in
              </div>
            </div>
            <div style={{ padding: "clamp(48px,8vw,90px) clamp(24px,5vw,72px)", background: "linear-gradient(160deg,#0e0e12 0%,#0a0a0e 100%)", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <Orbs orbs={[{ size: 300, top: "30%", left: "40%", color: "rgba(247,147,30,.08)", blur: 60, dur: 6 }]} />
              <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} style={{ position: "relative", zIndex: 2 }}>
                <div style={{ fontFamily: "font-heading, sans-serif", fontSize: "clamp(26px,5.5vw,52px)", color: "#f2f2f2", letterSpacing: ".02em", marginBottom: 12 }}>
                  <span style={{ color: "#f7931e" }}>Iron</span>Force Gym
                </div>
                <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: "clamp(12px,1.6vw,15px)", color: "rgba(242,242,242,.45)", marginBottom: 28, maxWidth: 380, margin: "0 auto 28px" }}>
                  Transform your body. Transform your life. Delhi's #1 fitness studio.
                </div>
                <MagBtn className="bp" style={{ fontSize: "clamp(11px,1.4vw,13px)", padding: "12px 28px" }}>Join Now — First Week Free</MagBtn>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        <div className="g2" style={{ marginBottom: 44 }}>
          {feats.map((f, i) => (
            <TiltCard key={i} className="card" style={{ padding: "clamp(22px,3vw,32px)", cursor: "default" }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i * 0.1 }}>
                <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(15px,1.8vw,20px)", color: "#f2f2f2", marginBottom: 10, letterSpacing: ".02em" }}>{f.title}</h3>
                <p className="body-sm">{f.desc}</p>
              </motion.div>
            </TiltCard>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <MagBtn className="bp">View Sample Website <ArrowRight size={15} /></MagBtn>
          <MagBtn className="bo">Get My Gym Online</MagBtn>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   WHY CHOOSE
═══════════════════════════════════════════════════════ */
function WhyChoose() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const vals = [
    { icon: <Zap size={26} color="#f7931e" />, title: "Cut Manual Work", sub: "Automate billing, attendance, and reminders." },
    { icon: <Users size={26} color="#f7931e" />, title: "Boost Retention", sub: "Engagement tools that keep members monthly." },
    { icon: <DollarSign size={26} color="#f7931e" />, title: "Zero Upfront Cost", sub: "No setup fee. Start completely free." },
    { icon: <Building2 size={26} color="#f7931e" />, title: "Built for India", sub: "Designed for local gyms, not enterprise chains." },
  ];
  const testimonials = [
    { name: "Rajesh Kumar", gym: "FitZone, Delhi", text: "Automated billing alone saves us 8 hours every week. GymSaathi is a game-changer." },
    { name: "Priya Sharma", gym: "PowerHouse, Mumbai", text: "Retention improved 40% in 3 months. Members genuinely love the progress tracking." },
    { name: "Amit Singh", gym: "Iron Temple, Bangalore", text: "Setup in under an hour. The team was incredibly helpful. Best decision this year." },
  ];
  return (
    <section ref={ref} className="sec" style={{ background: "var(--s1)" }}>
      <div className="divline" style={{ position: "absolute", top: 0 }} />
      <div className="con">
        <div style={{ textAlign: "center", marginBottom: "clamp(48px,6vw,80px)" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ marginBottom: 20 }}>
            <span className="label">Why GymSaathi</span>
          </motion.div>
          <SplitText text="WHY GYM OWNERS CHOOSE US" className="hlg" delay={0.1} staggerDelay={0.04} />
        </div>
        <div className="g4" style={{ marginBottom: 60 }}>
          {vals.map((v, i) => (
            <TiltCard key={i} className="card" style={{ padding: "clamp(24px,3vw,36px)", cursor: "default" }}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: i * 0.1 }}>
                <motion.div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(247,147,30,.07)", border: "1px solid rgba(247,147,30,.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}
                  whileHover={{ scale: 1.12, background: "rgba(247,147,30,.14)", rotate: 5 }} transition={{ duration: 0.25 }}>
                  {v.icon}
                </motion.div>
                <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(15px,1.8vw,20px)", color: "#f2f2f2", marginBottom: 8, letterSpacing: ".02em" }}>{v.title}</h3>
                <p className="body-sm">{v.sub}</p>
              </motion.div>
            </TiltCard>
          ))}
        </div>
        {/* Testimonials */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5, duration: 0.7 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 8 }}>
              {[...Array(5)].map((_, j) => (
                <motion.div key={j} initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 0.7 + j * 0.07, type: "spring" }}>
                  <Star size={18} fill="#f7931e" color="#f7931e" />
                </motion.div>
              ))}
            </div>
            <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 12, color: "rgba(242,242,242,.35)", letterSpacing: ".1em", textTransform: "uppercase" }}>Rated 4.9 / 5 by gym owners across India</p>
          </div>
          <div className="g3">
            {testimonials.map((t, i) => (
              <TiltCard key={i} className="card" style={{ padding: "clamp(24px,3vw,32px)", cursor: "default" }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 + i * 0.12 }}>
                  <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                    {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#f7931e" color="#f7931e" />)}
                  </div>
                  {/* Quote */}
                  <p style={{ fontFamily: "'Barlow',sans-serif", fontStyle: "italic", fontWeight: 300, color: "rgba(242,242,242,.62)", fontSize: "clamp(13px,1.4vw,15px)", lineHeight: 1.75, marginBottom: 20 }}>"{t.text}"</p>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 16, color: "#f2f2f2", letterSpacing: ".04em" }}>{t.name}</div>
                    <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: 12, color: "#f7931e", marginTop: 2, fontWeight: 500 }}>{t.gym}</div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   PRICING
═══════════════════════════════════════════════════════ */
function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const included = [
    "Free custom gym website built for you",
    "Full gym ERP & CRM dashboard",
    "Member fitness & tracking app",
    "Workout, nutrition & progress tools",
    "Automated billing & WhatsApp reminders",
    "Real-time revenue & growth reports",
    "No setup fee, no lock-in — cancel anytime",
  ];
  return (
    <section ref={ref} className="sec" style={{ background: "var(--bg)" }}>
      <div className="divline" style={{ position: "absolute", top: 0 }} />
      <Orbs orbs={[{ size: 600, top: "20%", left: "20%", color: "rgba(247,147,30,.05)", blur: 100, dur: 10 }]} />
      <div className="con" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ marginBottom: 20 }}>
            <span className="label">Pricing</span>
          </motion.div>
          <SplitText text="SIMPLE PRICING." className="hlg" delay={0.1} staggerDelay={0.05} />
          <SplitText text="NO HIDDEN COSTS." className="hlg"
            style={{ background: "linear-gradient(135deg,#f7931e,#ffb347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}
            delay={0.35} staggerDelay={0.05} />
        </div>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }} style={{ maxWidth: 620, margin: "0 auto" }}>
          <div style={{ borderRadius: 32, border: "1px solid rgba(247,147,30,.25)", background: "linear-gradient(160deg,#131318 0%,#0e0e12 100%)", padding: "clamp(36px,6vw,68px)", position: "relative", overflow: "hidden", boxShadow: "0 50px 120px rgba(0,0,0,.5),0 0 80px rgba(247,147,30,.06)" }}>
            <div style={{ position: "absolute", top: -80, right: -80, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle,rgba(247,147,30,.14) 0%,transparent 70%)", pointerEvents: "none" }} />
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
              <motion.span style={{ padding: "6px 22px", borderRadius: 100, background: "rgba(247,147,30,.1)", border: "1px solid rgba(247,147,30,.28)", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 13, color: "#f7931e", letterSpacing: ".14em", textTransform: "uppercase" }}
                animate={{ boxShadow: ["0 0 0 rgba(247,147,30,0)","0 0 20px rgba(247,147,30,.25)","0 0 0 rgba(247,147,30,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity }}>
                ALL-INCLUSIVE PLAN
              </motion.span>
            </div>
            {/* Price */}
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <motion.div style={{ display: "inline-flex", alignItems: "baseline", gap: 8 }} animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                <span style={{ fontFamily: "font-heading, sans-serif", fontSize: "clamp(64px,12vw,100px)", color: "#f7931e", letterSpacing: "-.02em", lineHeight: 1, filter: "drop-shadow(0 0 30px rgba(247,147,30,.4))" }}>₹79</span>
                <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: "clamp(15px,2.2vw,20px)", color: "#3a3a4a", fontWeight: 300 }}>/mo</span>
              </motion.div>
              <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 12, color: "rgba(242,242,242,.35)", marginTop: 10 }}>Per active member · Scale as you grow</p>
            </div>
            {/* Checklist */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 44 }}>
              {included.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <motion.div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(247,147,30,.1)", border: "1px solid rgba(247,147,30,.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }} whileHover={{ scale: 1.2 }}>
                    <Check size={12} color="#f7931e" strokeWidth={3} />
                  </motion.div>
                  <span style={{ fontFamily: "'Barlow',sans-serif", color: "rgba(242,242,242,.72)", fontSize: "clamp(13px,1.4vw,15px)" }}>{item}</span>
                </motion.div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }} className="pc">
              <MagBtn className="bp" style={{ justifyContent: "center", fontSize: "clamp(13px,1.6vw,15px)", padding: "clamp(16px,2vw,20px)" }}>Get Started Today <ArrowRight size={16} /></MagBtn>
              <MagBtn className="bo" style={{ justifyContent: "center", fontSize: "clamp(13px,1.6vw,15px)", padding: "clamp(15px,2vw,19px)" }}>Book a Free Demo</MagBtn>
            </div>
            <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, color: "#2e2e38", textAlign: "center", marginTop: 18 }}>No credit card · Cancel anytime</p>
          </div>
        </motion.div>
      </div>
      <style>{`@media(min-width:480px){.pc{flex-direction:row!important}}`}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FAQ
═══════════════════════════════════════════════════════ */
function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "How long does setup take?", a: "Most gyms go live within 60 minutes. Our team guides you step-by-step through the entire process." },
    { q: "Is there a long-term contract?", a: "No lock-in. GymSaathi runs monthly — cancel anytime with zero penalties." },
    { q: "Do I need technical knowledge?", a: "Not at all. If you can use WhatsApp, you can use GymSaathi. Designed for gym owners, not IT pros." },
    { q: "What if I already have a website?", a: "Keep your existing site or switch to our free custom gym website — both integrate fully." },
    { q: "How is support provided?", a: "WhatsApp, phone, and email support. Real humans, not bots. You're never left alone." },
    { q: "What happens as my gym grows?", a: "GymSaathi scales with you. You only pay for active members — costs grow only when you do." },
  ];
  return (
    <section ref={ref} className="sec" style={{ background: "var(--s1)" }}>
      <div className="divline" style={{ position: "absolute", top: 0 }} />
      <div className="con">
        <div style={{ textAlign: "center", marginBottom: "clamp(48px,6vw,80px)" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ marginBottom: 20 }}>
            <span className="label">FAQ</span>
          </motion.div>
          <SplitText text="COMMON QUESTIONS" className="hlg" delay={0.1} staggerDelay={0.05} />
        </div>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.09 }} style={{ borderBottom: "1px solid rgba(247,147,30,.07)" }}>
              <motion.button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", padding: "clamp(18px,2.5vw,26px) 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                whileHover={{ x: 6 }}>
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "clamp(15px,2.2vw,20px)", color: open === i ? "#f7931e" : "rgba(242,242,242,.75)", letterSpacing: ".04em", transition: "color .2s", lineHeight: 1.3 }}>{faq.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ color: "#f7931e", flexShrink: 0 }}>
                  <ChevronDown size={20} />
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: "hidden" }}>
                    <p style={{ fontFamily: "'Barlow',sans-serif", fontWeight: 400, color: "rgba(242,242,242,.62)", fontSize: "clamp(13px,1.5vw,15px)", lineHeight: 1.8, paddingBottom: 24 }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FINAL CTA
═══════════════════════════════════════════════════════ */
function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const { scrollYProgress } = useScroll({ target: ref });
  const parallax = useTransform(scrollYProgress, [0, 1], [0, -60]);
  return (
    <section ref={ref} className="sec" style={{ background: "var(--bg)", overflow: "hidden", position: "relative" }}>
      <div className="divline" style={{ position: "absolute", top: 0 }} />
      <motion.div style={{ position: "absolute", inset: 0, y: parallax, pointerEvents: "none" }}>
        <motion.div style={{ position: "absolute", inset: 0 }}
          animate={{ background: ["linear-gradient(135deg,#060608 0%,rgba(247,147,30,.08) 50%,#060608 100%)","linear-gradient(135deg,#060608 0%,rgba(255,107,0,.12) 50%,#060608 100%)","linear-gradient(135deg,#060608 0%,rgba(247,147,30,.08) 50%,#060608 100%)"] }}
          transition={{ duration: 6, repeat: Infinity }} />
        {/* Stable CTA particles */}
        {CTA_PARTICLES.map((p, i) => (
          <motion.div key={i} style={{ position: "absolute", width: p.w, height: p.h, borderRadius: "50%", background: "#f7931e", left: p.left, top: p.top }}
            animate={{ y: [0, -80, 0], opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: "easeInOut" }} />
        ))}
      </motion.div>

      <div className="con" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ marginBottom: 28 }}>
          <span className="label">Start Today</span>
        </motion.div>
        <div className="hxl" style={{ marginBottom: 24 }}>
          <SplitText text="READY TO DIGITIZE" className="hxl" delay={0.1} staggerDelay={0.06} />
          <SplitText text="YOUR GYM?" className="hxl"
            style={{ background: "linear-gradient(135deg,#f7931e,#ffb347,#ff6b00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}
            delay={0.5} staggerDelay={0.08} />
        </div>
        <motion.p className="body-lg" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.7 }}
          style={{ maxWidth: 580, margin: "0 auto 52px", fontSize: "clamp(15px,1.8vw,17px)" }}>
          Join hundreds of gym owners managing smarter, saving time, and retaining more members with GymSaathi.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.85 }}
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
          <MagBtn className="bp" style={{ fontSize: "clamp(13px,1.6vw,16px)", padding: "clamp(16px,2.5vw,22px) clamp(36px,5vw,60px)", boxShadow: "0 0 60px rgba(247,147,30,.4)" }}>
            Book a Free Demo <ArrowRight size={18} />
          </MagBtn>
          <MagBtn className="bo" style={{ fontSize: "clamp(13px,1.6vw,16px)", padding: "clamp(15px,2.5vw,21px) clamp(36px,5vw,60px)" }}>
            Talk to Our Team
          </MagBtn>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.1 }}
          style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: "rgba(242,242,242,.25)" }}>
          Trusted by 107+ gyms · Setup in 60 minutes · No credit card required
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════ */
export default function ForGymOwners() {
  return (
    <>
      <style>{G}</style>
      <Cursor />
      <ScrollBar />
      <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
        <Hero />
        <Marquee items={MARQUEE_ITEMS} />
        <HowItWorks />
        <ERPSection />
        <MemberApp />
        <WebsiteSection />
        <WhyChoose />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </div>
    </>
  );
}