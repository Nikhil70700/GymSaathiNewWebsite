import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion, useMotionValue, useTransform, useSpring,
  useInView, useScroll, AnimatePresence, animate
} from "motion/react";
import {
  BookOpen, TrendingUp, Dumbbell, CheckSquare, Target,
  Users, Apple, Cpu, ArrowRight, HelpCircle, BookMarked,
  Clock, ChevronRight, Zap, Star, Menu, X
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   GLOBAL STYLES — matches GymSaathi.jsx design system
═══════════════════════════════════════════════════════ */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --or:#f7931e;--or2:#ff6b00;--or3:#ffb347;
  --bg:#060608;--s1:#0e0e12;--s2:#141418;
  --t:#f2f2f2;--tm:#7a7a8a;--td:#3a3a4a;
  --ff:'Bebas Neue',cursive;--fb:'Outfit',sans-serif;
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

.hxl{font-family:var(--ff);font-size:clamp(52px,9vw,108px);line-height:.94;letter-spacing:.01em;color:var(--t)}
.hlg{font-family:var(--ff);font-size:clamp(40px,6vw,76px);line-height:.96;color:var(--t)}
.hmd{font-family:var(--ff);font-size:clamp(22px,3.5vw,40px);line-height:1.05;color:var(--t)}
.body-lg{font-size:clamp(16px,2vw,19px);line-height:1.72;color:var(--tm);font-weight:300}
.body-sm{font-size:clamp(13px,1.4vw,15px);line-height:1.7;color:var(--tm)}
.label{display:inline-flex;align-items:center;gap:8px;padding:5px 16px;border-radius:100px;border:1px solid rgba(247,147,30,.3);background:rgba(247,147,30,.07);font-family:var(--fb);font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--or)}

.bp{position:relative;display:inline-flex;align-items:center;gap:10px;padding:clamp(14px,2vw,18px) clamp(28px,4vw,48px);background:linear-gradient(135deg,var(--or),var(--or2));color:#fff;font-family:var(--fb);font-weight:700;font-size:clamp(13px,1.5vw,15px);border-radius:100px;border:none;cursor:none;overflow:hidden;white-space:nowrap;transition:transform .2s,box-shadow .2s}
.bp::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--or3),var(--or));opacity:0;transition:opacity .3s}
.bp:hover{transform:translateY(-3px);box-shadow:0 16px 50px rgba(247,147,30,.45)}
.bp:hover::before{opacity:1}
.bo{display:inline-flex;align-items:center;gap:10px;padding:clamp(13px,2vw,17px) clamp(28px,4vw,48px);background:transparent;color:var(--t);font-family:var(--fb);font-weight:600;font-size:clamp(13px,1.5vw,15px);border-radius:100px;border:1.5px solid rgba(242,242,242,.2);cursor:none;transition:all .25s;white-space:nowrap}
.bo:hover{border-color:rgba(242,242,242,.55);background:rgba(242,242,242,.05);transform:translateY(-3px)}
.bor{display:inline-flex;align-items:center;gap:10px;padding:clamp(13px,2vw,17px) clamp(28px,4vw,48px);background:transparent;color:var(--or);font-family:var(--fb);font-weight:600;font-size:clamp(13px,1.5vw,15px);border-radius:100px;border:1.5px solid rgba(247,147,30,.4);cursor:none;transition:all .25s;white-space:nowrap}
.bor:hover{border-color:rgba(247,147,30,.8);background:rgba(247,147,30,.07);transform:translateY(-3px);box-shadow:0 0 30px rgba(247,147,30,.2)}

.card{background:linear-gradient(145deg,rgba(255,255,255,.03),rgba(247,147,30,.015));border:1px solid rgba(247,147,30,.1);border-radius:var(--r);transition:border-color .35s,transform .35s,box-shadow .35s}
.card:hover{border-color:rgba(247,147,30,.32);transform:translateY(-8px);box-shadow:0 28px 70px rgba(0,0,0,.5),0 0 40px rgba(247,147,30,.1)}

.divline{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(247,147,30,.18),transparent)}

.g2{display:grid;grid-template-columns:1fr;gap:clamp(16px,2.5vw,28px)}
.g3{display:grid;grid-template-columns:1fr;gap:clamp(16px,2.5vw,28px)}
.g4{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(14px,2vw,24px)}
@media(min-width:640px){.g2{grid-template-columns:repeat(2,1fr)}.g3{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.g3{grid-template-columns:repeat(3,1fr)}.g4{grid-template-columns:repeat(4,1fr)}}

body::after{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.045'/%3E%3C/svg%3E");pointer-events:none;z-index:9999;opacity:.5}

@keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.3)}}
@keyframes line-scan{0%{transform:scaleY(0) translateY(-100%);opacity:0}20%{opacity:1}80%{opacity:1}100%{transform:scaleY(1) translateY(0);opacity:0}}
`;

/* ── Shared Utilities ── */
function Cursor() {
  const cx = useMotionValue(-100), cy = useMotionValue(-100);
  const sx = useSpring(cx, { stiffness: 180, damping: 18 });
  const sy = useSpring(cy, { stiffness: 180, damping: 18 });
  const [hov, setHov] = useState(false);
  const [clicking, setClicking] = useState(false);
  useEffect(() => {
    const mv = e => { cx.set(e.clientX); cy.set(e.clientY); };
    const over = e => setHov(!!e.target.closest("button,a,[data-hover]"));
    const dn = () => setClicking(true), up = () => setClicking(false);
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseover", over); window.removeEventListener("mousedown", dn); window.removeEventListener("mouseup", up); };
  }, []);
  return (
    <>
      <motion.div style={{ x: cx, y: cy, translateX: "-50%", translateY: "-50%", position: "fixed", top: 0, left: 0, zIndex: 10001, pointerEvents: "none" }}>
        <motion.div animate={{ scale: clicking ? 0.5 : 1 }} style={{ width: 8, height: 8, borderRadius: "50%", background: "#f7931e" }} />
      </motion.div>
      <motion.div style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", position: "fixed", top: 0, left: 0, zIndex: 10000, pointerEvents: "none" }}>
        <motion.div animate={{ scale: hov ? 2.2 : clicking ? 0.8 : 1, opacity: hov ? 0.5 : 0.3 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}
          style={{ width: 32, height: 32, borderRadius: "50%", border: "1.5px solid #f7931e" }} />
      </motion.div>
    </>
  );
}

function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return <motion.div style={{ scaleX, transformOrigin: "left", position: "fixed", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#f7931e,#ff6b00,#ffb347)", zIndex: 10002 }} />;
}

function SplitText({ text, className, style, delay = 0, staggerDelay = 0.03 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <span ref={ref} className={className} style={{ display: "block", ...style }}>
      {text.split(" ").map((word, wi) => (
        <span key={wi} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.25em" }}>
          <motion.span style={{ display: "inline-block" }} initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.75, delay: delay + wi * staggerDelay, ease: [0.22, 1, 0.36, 1] }}>{word}</motion.span>
        </span>
      ))}
    </span>
  );
}

function Counter({ to, suffix = "", prefix = "" }) {
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

function MagBtn({ children, className, style }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
  const handleMouse = useCallback((e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  }, []);
  return (
    <motion.button ref={ref} className={className} style={{ x: sx, y: sy, ...style }}
      onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0); }} whileTap={{ scale: 0.94 }}>
      {children}
    </motion.button>
  );
}

function Orbs({ orbs }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {orbs.map((o, i) => (
        <motion.div key={i}
          style={{ position: "absolute", width: o.size, height: o.size, borderRadius: "50%", background: `radial-gradient(circle,${o.color} 0%,transparent 65%)`, top: o.top, left: o.left, filter: `blur(${o.blur || 60}px)` }}
          animate={{ x: o.ax || [0, 40, 0], y: o.ay || [0, -30, 0], scale: o.as || [1, 1.15, 1] }}
          transition={{ duration: o.dur || 10, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }} />
      ))}
    </div>
  );
}

function TiltCard({ children, className, style, intensity = 8 }) {
  const ref = useRef(null);
  const rotX = useMotionValue(0), rotY = useMotionValue(0);
  const sX = useSpring(rotX, { stiffness: 200, damping: 20 });
  const sY = useSpring(rotY, { stiffness: 200, damping: 20 });
  const glowX = useTransform(sY, [-intensity, intensity], ["0%", "100%"]);
  const glowY = useTransform(sX, [intensity, -intensity], ["0%", "100%"]);
  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    rotX.set(((e.clientY - r.top) / r.height - 0.5) * -intensity * 2);
    rotY.set(((e.clientX - r.left) / r.width - 0.5) * intensity * 2);
  };
  return (
    <motion.div ref={ref} className={className} onMouseMove={handleMove} onMouseLeave={() => { rotX.set(0); rotY.set(0); }}
      style={{ rotateX: sX, rotateY: sY, transformPerspective: 800, transformStyle: "preserve-3d", ...style, position: "relative", overflow: "hidden" }}>
      <motion.div style={{ position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none", zIndex: 2, "--gx": glowX, "--gy": glowY, background: "radial-gradient(circle at var(--gx) var(--gy),rgba(255,255,255,.07) 0%,transparent 60%)" }} />
      {children}
    </motion.div>
  );
}

function Marquee({ items }) {
  return (
    <div style={{ overflow: "hidden", padding: "20px 0", borderTop: "1px solid rgba(247,147,30,.08)", borderBottom: "1px solid rgba(247,147,30,.08)", background: "rgba(247,147,30,.02)" }}>
      <motion.div style={{ display: "flex", gap: 60, whiteSpace: "nowrap", width: "max-content" }}
        animate={{ x: ["0%", "-50%"] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(15px,1.8vw,19px)", color: "#3a3a4a", letterSpacing: ".1em", display: "flex", alignItems: "center", gap: 24 }}>
            {item}
            <span style={{ color: "#f7931e", fontSize: 12, transform: "rotate(45deg)", display: "inline-block" }}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const MARQUEE = ["Gym Business Growth","Fitness Guides","Nutrition Advice","Member Retention","ERP Software","Digital Marketing","Training Programs","Success Stories","Help Center","Expert Tips","Industry News","Case Studies"];

/* ═══════════════════════════════════════════════════════
   1. HERO
═══════════════════════════════════════════════════════ */
function HeroSection() {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const o1x = useTransform(smx, [-1, 1], [-30, 30]);
  const o1y = useTransform(smy, [-1, 1], [-20, 20]);

  const floatIcons = [
    { Icon: BookOpen, top: "14%", left: "8%", size: 52, delay: 0, dur: 4 },
    { Icon: TrendingUp, top: "22%", right: "10%", size: 46, delay: 0.5, dur: 5 },
    { Icon: Dumbbell, bottom: "22%", left: "6%", size: 44, delay: 1, dur: 4.5 },
    { Icon: CheckSquare, bottom: "18%", right: "8%", size: 48, delay: 0.8, dur: 3.8 },
    { Icon: Target, top: "55%", left: "14%", size: 38, delay: 1.5, dur: 5.5 },
    { Icon: Apple, top: "40%", right: "6%", size: 36, delay: 0.3, dur: 4.2 },
  ];

  return (
    <div
      onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left - r.width / 2) / (r.width / 2)); my.set((e.clientY - r.top - r.height / 2) / (r.height / 2)); }}
      style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", background: "var(--bg)" }}
    >
      {/* Parallax orb */}
      <motion.div style={{ x: o1x, y: o1y, position: "absolute", top: "15%", left: "0%", width: "clamp(400px,55vw,650px)", height: "clamp(400px,55vw,650px)", borderRadius: "50%", background: "radial-gradient(circle,rgba(247,147,30,.09) 0%,transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "5%", right: "-5%", width: "clamp(250px,35vw,420px)", height: "clamp(250px,35vw,420px)", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,107,0,.06) 0%,transparent 65%)", filter: "blur(100px)", pointerEvents: "none" }} />

      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(247,147,30,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(247,147,30,.03) 1px,transparent 1px)", backgroundSize: "clamp(40px,6vw,80px) clamp(40px,6vw,80px)", maskImage: "radial-gradient(ellipse 80% 80% at 50% 40%,black 30%,transparent 100%)", pointerEvents: "none" }} />

      {/* Rotating rings */}
      {[600, 820, 1040].map((s, i) => (
        <motion.div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: s, height: s, marginLeft: -s / 2, marginTop: -s / 2, borderRadius: "50%", border: `1px solid rgba(247,147,30,${0.055 - i * 0.012})` }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 28 + i * 12, repeat: Infinity, ease: "linear" }} />
      ))}

      {/* Floating background icons */}
      {floatIcons.map(({ Icon, top, left, right, bottom, size, delay, dur }, i) => (
        <motion.div key={i}
          style={{ position: "absolute", top, left, right, bottom, pointerEvents: "none" }}
          animate={{ y: [0, -16, 0], rotate: i % 2 === 0 ? [0, 6, -6, 0] : [0, -6, 6, 0] }}
          transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <Icon size={size} style={{ color: "#f7931e", opacity: 0.12 }} strokeWidth={1.2} />
        </motion.div>
      ))}

      {/* Particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div key={i} style={{ position: "absolute", width: Math.random() * 3 + 2, height: Math.random() * 3 + 2, borderRadius: "50%", background: "#f7931e", left: `${8 + Math.random() * 84}%`, top: `${8 + Math.random() * 84}%`, opacity: 0 }}
          animate={{ y: [0, -55, 0], opacity: [0, 0.45, 0], scale: [0, 1, 0] }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: i * 0.55, ease: "easeInOut" }} />
      ))}

      <div className="con" style={{ position: "relative", zIndex: 2, paddingTop: 130, paddingBottom: 80 }}>
        <div style={{ textAlign: "center", maxWidth: 920, margin: "0 auto" }}>

          {/* Label */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: 32 }}>
            <span className="label">
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 7, height: 7, borderRadius: "50%", background: "#f7931e", display: "inline-block" }} />
              Knowledge Hub for Gym Owners & Fitness Pros
            </span>
          </motion.div>

          {/* Headline */}
          <div className="hxl" style={{ marginBottom: 28 }}>
            <SplitText text="GYMSAATHI" className="hxl" staggerDelay={0.07} />
            <SplitText text="RESOURCES" className="hxl"
              style={{ background: "linear-gradient(135deg,#f7931e 0%,#ffb347 50%,#ff6b00 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}
              delay={0.35} staggerDelay={0.09} />
          </div>

          <motion.p className="body-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75 }}
            style={{ maxWidth: 680, margin: "0 auto 40px", fontSize: "clamp(15px,2vw,19px)" }}>
            Insights, guides, and fitness business knowledge to help gyms grow smarter and members train better.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }}
            style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}>
            <MagBtn className="bp" style={{ boxShadow: "0 0 50px rgba(247,147,30,.35)", fontSize: "clamp(13px,1.8vw,15px)", padding: "clamp(14px,2vw,20px) clamp(30px,4vw,52px)" }}>
              👉 Explore Blogs <ArrowRight size={15} />
            </MagBtn>
            <MagBtn className="bo" style={{ fontSize: "clamp(13px,1.8vw,15px)", padding: "clamp(14px,2vw,20px) clamp(30px,4vw,52px)" }}>
              📘 Visit Help Center
            </MagBtn>
          </motion.div>

          {/* Stats bar */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", background: "rgba(14,14,18,0.7)", border: "1px solid rgba(247,147,30,.12)", borderRadius: 24, overflow: "hidden", backdropFilter: "blur(12px)" }} className="res-stats">
            {[
              { val: 50, suf: "+", label: "Expert Articles" },
              { val: 10, suf: "K+", label: "Monthly Readers" },
              { val: 4, suf: " Guides", label: "Resource Categories" },
              { val: 100, suf: "%", label: "Free Knowledge" },
            ].map((s, i) => (
              <motion.div key={i} style={{ padding: "clamp(18px,3vw,28px)", textAlign: "center", borderRight: i % 2 === 0 ? "1px solid rgba(247,147,30,.08)" : "none", borderBottom: i < 2 ? "1px solid rgba(247,147,30,.08)" : "none" }} whileHover={{ background: "rgba(247,147,30,.04)" }}>
                <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(24px,4.5vw,42px)", color: "#f7931e", letterSpacing: ".02em", lineHeight: 1 }}>
                  <Counter to={s.val} suffix={s.suf} />
                </div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(10px,1.3vw,12px)", color: "#3a3a4a", marginTop: 5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, color: "#3a3a4a", letterSpacing: ".15em", textTransform: "uppercase" }}>Scroll</span>
        <motion.div style={{ width: 1, height: 36, background: "linear-gradient(180deg,#f7931e,transparent)", originY: 0 }}
          animate={{ scaleY: [0, 1, 0], y: [0, 0, 18] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>

      <style>{`@media(min-width:640px){.res-stats{grid-template-columns:repeat(4,1fr)!important}}`}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   2. CATEGORY BROWSE
═══════════════════════════════════════════════════════ */
function CategoriesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const cats = [
    { Icon: Target, title: "Gym Business Growth", desc: "Memberships, retention & revenue tips that actually move the needle.", color: "#f7931e" },
    { Icon: Dumbbell, title: "Fitness & Training", desc: "Workouts, exercise science, recovery & performance.", color: "#ff6b00" },
    { Icon: Apple, title: "Nutrition & Lifestyle", desc: "Diet guidance, wellness habits & sustainable healthy living.", color: "#f7931e" },
    { Icon: Cpu, title: "Digital Tools for Gyms", desc: "ERP, websites, CRM, automation & member-facing apps.", color: "#ff6b00" },
  ];

  return (
    <section ref={ref} className="sec" style={{ background: "var(--s1)" }}>
      <div className="divline" style={{ position: "absolute", top: 0 }} />
      <div className="con">
        <div style={{ textAlign: "center", marginBottom: "clamp(44px,6vw,72px)" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ marginBottom: 18 }}>
            <span className="label">Browse Topics</span>
          </motion.div>
          <SplitText text="BROWSE BY CATEGORY" className="hlg" delay={0.1} staggerDelay={0.05} />
        </div>

        <div className="g4">
          {cats.map((c, i) => (
            <TiltCard key={i} className="card" data-hover
              style={{ padding: "clamp(26px,3.5vw,44px)", cursor: "none" }}>
              <motion.div initial={{ opacity: 0, y: 35 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.12 }}>
                {/* Icon */}
                <motion.div
                  style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(247,147,30,.08)", border: "1px solid rgba(247,147,30,.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}
                  animate={{ boxShadow: ["0 0 0px rgba(247,147,30,0)", "0 0 22px rgba(247,147,30,.28)", "0 0 0px rgba(247,147,30,0)"] }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.5 }}
                  whileHover={{ scale: 1.12, rotate: 8, background: "rgba(247,147,30,.16)" }}
                >
                  <c.Icon size={28} style={{ color: c.color }} strokeWidth={1.8} />
                </motion.div>

                <h3 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(18px,2.5vw,26px)", color: "#f2f2f2", marginBottom: 10, letterSpacing: ".04em" }}>{c.title}</h3>
                <p className="body-sm" style={{ lineHeight: 1.75 }}>{c.desc}</p>

                {/* Arrow */}
                <motion.div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 20, color: "#f7931e" }}
                  whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>
                  <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 600 }}>Explore</span>
                  <ChevronRight size={14} />
                </motion.div>

                {/* Bottom bar */}
                <motion.div style={{ height: 2, background: "linear-gradient(90deg,#f7931e,transparent)", borderRadius: 1, marginTop: 20, scaleX: 0, originX: 0 }}
                  animate={inView ? { scaleX: 1 } : { scaleX: 0 }} transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }} />
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   3. ABOUT GYMSAATHI
═══════════════════════════════════════════════════════ */
function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section ref={ref} className="sec" style={{ background: "var(--bg)" }}>
      <div className="divline" style={{ position: "absolute", top: 0 }} />
      <Orbs orbs={[{ size: 500, top: "10%", left: "10%", color: "rgba(247,147,30,.07)", blur: 80, dur: 12, ax: [0, 50, 0], ay: [0, -25, 0] }]} />

      <div className="con" style={{ position: "relative", zIndex: 2 }}>
        {/* Two-col layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(40px,6vw,80px)", alignItems: "center" }} className="about-grid">

          {/* Left — text */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.15 }}>
            <span className="label" style={{ marginBottom: 20, display: "inline-flex" }}>About GymSaathi</span>
            <div className="hlg" style={{ marginTop: 16, marginBottom: 20 }}>
              <SplitText text="BUILT FOR INDIAN" className="hlg" delay={0.1} staggerDelay={0.05} />
              <SplitText text="GYM OWNERS." className="hlg"
                style={{ background: "linear-gradient(135deg,#f7931e,#ffb347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}
                delay={0.38} staggerDelay={0.05} />
            </div>
            <p className="body-lg" style={{ maxWidth: 520, marginBottom: 36 }}>
              GymSaathi is a fitness-technology platform built to digitally empower local gyms across India. From gym ERP and custom websites to member fitness apps, we help gyms operate smarter, grow faster, and deliver better experiences — without upfront tech costs.
            </p>
            <motion.a href="#" data-hover
              style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(16px,2vw,20px)", color: "#f7931e", textDecoration: "none", letterSpacing: ".06em", position: "relative" }}
              whileHover={{ x: 6 }}>
              Learn More About GymSaathi
              <ArrowRight size={18} />
              <motion.div style={{ position: "absolute", bottom: -3, left: 0, height: 1.5, background: "#f7931e", scaleX: 0, originX: 0, right: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.25 }} />
            </motion.a>
          </motion.div>

          {/* Right — stat pillars */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
              {[
                { val: 30000, suf: "+", label: "Gyms Partnered", icon: "🏋️" },
                { val: 79, pre: "₹", label: "Per Month Only", icon: "💰" },
                { val: 99, suf: "%", label: "Customer Satisfaction", icon: "⭐" },
                { val: 60, suf: " min", label: "Avg Setup Time", icon: "⚡" },
              ].map((s, i) => (
                <TiltCard key={i} className="card" style={{ padding: "clamp(20px,2.5vw,30px)", cursor: "none" }}>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 + i * 0.1 }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                    <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(26px,4vw,44px)", color: "#f7931e", letterSpacing: ".02em", lineHeight: 1 }}>
                      <Counter to={s.val} prefix={s.pre || ""} suffix={s.suf || ""} />
                    </div>
                    <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(11px,1.3vw,13px)", color: "#3a3a4a", marginTop: 6, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase" }}>{s.label}</div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`@media(min-width:1024px){.about-grid{grid-template-columns:1.1fr 1fr!important}}`}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   4. BLOG ARTICLES
═══════════════════════════════════════════════════════ */
function BlogsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const blogs = [
    { cat: "Gym Business", title: "10 Proven Ways to Increase Gym Memberships in 2025", summary: "Marketing strategies that actually convert leads into loyal members.", time: "5 min read", hot: true },
    { cat: "Fitness Tech", title: "Why Your Gym Needs a Custom Website", summary: "Stand out online and attract more local members with professional branding.", time: "4 min read" },
    { cat: "Member Retention", title: "How to Reduce Gym Member Churn by 40%", summary: "Retention tactics using data, engagement, and smart automation.", time: "6 min read", hot: true },
    { cat: "Training", title: "Science-Backed Workout Programs for Beginners", summary: "Help new members get results fast with structured training plans.", time: "7 min read" },
    { cat: "Nutrition", title: "Complete Guide to Gym Nutrition for Trainers", summary: "What trainers need to know about diet, macros, and supplements.", time: "8 min read" },
    { cat: "Operations", title: "Streamline Gym Operations with ERP Software", summary: "Save hours weekly on billing, attendance, and inventory management.", time: "5 min read" },
    { cat: "Growth", title: "How to Scale Your Gym Business to Multiple Locations", summary: "Strategic expansion planning and operational systems for multi-gym owners.", time: "9 min read", hot: true },
    { cat: "Digital Marketing", title: "Social Media Strategy for Gyms That Actually Works", summary: "Content ideas, posting schedules, and engagement tactics for gym owners.", time: "6 min read" },
    { cat: "Fitness Tech", title: "The Future of Fitness: AI, Apps, and Member Experience", summary: "Emerging technologies reshaping how gyms operate and engage members.", time: "7 min read" },
    { cat: "Success Story", title: "How FlexFit Gym Doubled Revenue in 6 Months with GymSaathi", summary: "Real case study of digital transformation and business growth.", time: "5 min read", hot: true },
  ];

  const catColors = { "Gym Business": "#f7931e", "Fitness Tech": "#ff6b00", "Member Retention": "#ffb347", "Training": "#f7931e", "Nutrition": "#ff6b00", "Operations": "#f7931e", "Growth": "#ffb347", "Digital Marketing": "#ff6b00", "Success Story": "#f7931e" };

  return (
    <section ref={ref} className="sec" style={{ background: "var(--s1)" }}>
      <div className="divline" style={{ position: "absolute", top: 0 }} />
      <div className="con">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: "clamp(44px,6vw,72px)" }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ marginBottom: 18 }}>
              <span className="label">Blog</span>
            </motion.div>
            <SplitText text="LATEST FROM THE" className="hlg" delay={0.1} staggerDelay={0.05} />
            <SplitText text="GYMSAATHI BLOG" className="hlg"
              style={{ background: "linear-gradient(135deg,#f7931e,#ffb347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}
              delay={0.4} staggerDelay={0.04} />
          </div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
            <MagBtn className="bor" style={{ fontSize: 13 }}>View All Articles <ArrowRight size={14} /></MagBtn>
          </motion.div>
        </div>

        {/* Featured first post */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} style={{ marginBottom: 28 }}>
          <TiltCard className="card" data-hover style={{ padding: "clamp(28px,4vw,48px)", cursor: "none" }} intensity={4}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, alignItems: "center" }} className="featured-grid">
              <div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
                  <span style={{ padding: "5px 14px", borderRadius: 8, background: "rgba(247,147,30,.14)", border: "1px solid rgba(247,147,30,.28)", fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 12, color: "#f7931e" }}>{blogs[0].cat}</span>
                  <span style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(247,147,30,.08)", border: "1px solid rgba(247,147,30,.2)", fontFamily: "'Bebas Neue',cursive", fontSize: 11, color: "#ff6b00", letterSpacing: ".1em" }}>🔥 TRENDING</span>
                </div>
                <h2 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(22px,4vw,46px)", color: "#f2f2f2", marginBottom: 16, letterSpacing: ".02em", lineHeight: 1.05 }}>{blogs[0].title}</h2>
                <p className="body-lg" style={{ marginBottom: 24, maxWidth: 560 }}>{blogs[0].summary}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#3a3a4a" }}>
                    <Clock size={15} /><span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13 }}>{blogs[0].time}</span>
                  </div>
                  <motion.div data-hover style={{ display: "flex", alignItems: "center", gap: 6, color: "#f7931e", fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 14, cursor: "none" }} whileHover={{ x: 6 }}>
                    Read Full Article <ArrowRight size={15} />
                  </motion.div>
                </div>
              </div>
              {/* Right — decorative visual */}
              <div style={{ display: "none" }} className="featured-visual">
                <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: 16, background: "linear-gradient(135deg,rgba(247,147,30,.1) 0%,rgba(255,107,0,.05) 100%)", border: "1px solid rgba(247,147,30,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <motion.div animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                    <BookOpen size={64} style={{ color: "#f7931e", opacity: 0.3 }} strokeWidth={1} />
                  </motion.div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Blog grid */}
        <div className="g3" style={{ marginBottom: 44 }}>
          {blogs.slice(1).map((b, i) => (
            <TiltCard key={i} className="card" data-hover
              style={{ padding: "clamp(22px,3vw,32px)", cursor: "none" }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.25 + i * 0.07 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
                  <span style={{ padding: "4px 12px", borderRadius: 6, background: "rgba(247,147,30,.1)", border: "1px solid rgba(247,147,30,.22)", fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 11, color: catColors[b.cat] || "#f7931e" }}>{b.cat}</span>
                  {b.hot && (
                    <motion.span animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity }}
                      style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 10, color: "#ff6b00", letterSpacing: ".1em" }}>🔥 HOT</motion.span>
                  )}
                </div>
                <h3 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(17px,2.2vw,22px)", color: hoveredIdx === i ? "#f7931e" : "#f2f2f2", marginBottom: 10, letterSpacing: ".03em", lineHeight: 1.15, transition: "color .25s" }}>{b.title}</h3>
                <p className="body-sm" style={{ marginBottom: 20, lineHeight: 1.75 }}>{b.summary}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#3a3a4a" }}>
                    <Clock size={14} strokeWidth={2} />
                    <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12 }}>{b.time}</span>
                  </div>
                  <motion.div style={{ display: "flex", alignItems: "center", gap: 5, color: "#f7931e", fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 13 }} whileHover={{ x: 5 }}>
                    Read More <ArrowRight size={13} />
                  </motion.div>
                </div>
                <motion.div style={{ height: 1.5, background: "linear-gradient(90deg,#f7931e,transparent)", borderRadius: 1, marginTop: 20, scaleX: 0, originX: 0 }}
                  animate={inView ? { scaleX: 1 } : { scaleX: 0 }} transition={{ duration: 0.7, delay: 0.5 + i * 0.06 }} />
              </motion.div>
            </TiltCard>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.9 }} style={{ textAlign: "center" }}>
          <MagBtn className="bor" style={{ fontSize: "clamp(13px,1.5vw,15px)" }}>View All Articles <ArrowRight size={15} /></MagBtn>
        </motion.div>
      </div>
      <style>{`
        @media(min-width:1024px){.featured-grid{grid-template-columns:1.4fr 1fr!important}}
        @media(min-width:1024px){.featured-visual{display:block!important}}
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   5. SUCCESS STORIES — Infinite scroll carousel
═══════════════════════════════════════════════════════ */
function SuccessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [paused, setPaused] = useState(false);

  const cards = [
    { name: "Rajesh Kumar", gym: "PowerFit Gym, Mumbai", quote: "GymSaathi helped us digitize everything. Member retention increased by 35% in just 3 months.", badge: "+35% Retention", stars: 5 },
    { name: "Priya Sharma", gym: "FlexZone Fitness, Delhi", quote: "The custom website brought us 50+ new inquiries monthly. Best investment we made.", badge: "+50 Leads/Month", stars: 5 },
    { name: "Amit Patel", gym: "IronCore Gym, Bangalore", quote: "Operations became so smooth with the ERP. We save 15 hours weekly on admin work.", badge: "15 Hrs Saved/Week", stars: 5 },
    { name: "Sneha Verma", gym: "Strength Studio, Pune", quote: "The member app keeps our clients engaged 7 days a week. Renewals are at an all-time high.", badge: "+60% Renewals", stars: 5 },
    { name: "Vikram Singh", gym: "Alpha Fitness, Jaipur", quote: "Setup was done in 45 minutes. Our revenue grew 28% in the first quarter with GymSaathi.", badge: "+28% Revenue", stars: 5 },
  ];

  return (
    <section ref={ref} className="sec" style={{ background: "var(--bg)", overflow: "hidden" }}>
      <div className="divline" style={{ position: "absolute", top: 0 }} />
      <Orbs orbs={[{ size: 400, top: "30%", left: "60%", color: "rgba(247,147,30,.06)", blur: 80, dur: 10 }]} />

      <div className="con" style={{ position: "relative", zIndex: 2, marginBottom: "clamp(44px,6vw,60px)" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ marginBottom: 18 }}>
              <span className="label">Success Stories</span>
            </motion.div>
            <SplitText text="REAL GYMS." className="hlg" delay={0.1} staggerDelay={0.06} />
            <SplitText text="REAL GROWTH." className="hlg"
              style={{ background: "linear-gradient(135deg,#f7931e,#ffb347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}
              delay={0.42} staggerDelay={0.07} />
          </div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
              {[...Array(5)].map((_, j) => (
                <motion.div key={j} initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 0.6 + j * 0.07, type: "spring" }}>
                  <Star size={16} fill="#f7931e" color="#f7931e" />
                </motion.div>
              ))}
            </div>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, color: "#3a3a4a", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase" }}>Rated 4.9 / 5</p>
          </motion.div>
        </div>
      </div>

      {/* Carousel */}
      <div style={{ overflow: "hidden", paddingBottom: 8 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}>
        <motion.div
          style={{ display: "flex", gap: 24, width: "max-content" }}
          animate={{ x: paused ? undefined : ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {[...cards, ...cards].map((c, i) => (
            <TiltCard key={i} className="card" data-hover
              style={{ flexShrink: 0, width: "clamp(300px,38vw,420px)", padding: "clamp(24px,3vw,36px)", cursor: "none" }}>
              <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: (i % cards.length) * 0.1 }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
                  {[...Array(c.stars)].map((_, j) => <Star key={j} size={14} fill="#f7931e" color="#f7931e" />)}
                </div>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontStyle: "italic", fontWeight: 300, color: "#a0a0b0", fontSize: "clamp(13px,1.6vw,15px)", lineHeight: 1.8, marginBottom: 22 }}>"{c.quote}"</p>
                <motion.span
                  style={{ display: "inline-block", padding: "5px 14px", borderRadius: 8, background: "rgba(247,147,30,.1)", border: "1px solid rgba(247,147,30,.25)", fontFamily: "'Bebas Neue',cursive", fontSize: 13, color: "#f7931e", letterSpacing: ".08em", marginBottom: 18 }}
                  animate={{ boxShadow: ["0 0 0 rgba(247,147,30,0)", "0 0 14px rgba(247,147,30,.25)", "0 0 0 rgba(247,147,30,0)"] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}>
                  {c.badge}
                </motion.span>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 17, color: "#f2f2f2", letterSpacing: ".06em" }}>{c.name}</div>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, color: "#f7931e", marginTop: 2, fontWeight: 500 }}>{c.gym}</div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </motion.div>
      </div>

      <div className="con" style={{ position: "relative", zIndex: 2, marginTop: 44, textAlign: "center" }}>
        <motion.a href="#" data-hover
          style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(16px,2vw,20px)", color: "#f7931e", textDecoration: "none", letterSpacing: ".06em", position: "relative" }}
          whileHover={{ x: 6 }}>
          View All Success Stories <ArrowRight size={18} />
          <motion.div style={{ position: "absolute", bottom: -3, left: 0, height: 1.5, background: "#f7931e", scaleX: 0, originX: 0, right: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.25 }} />
        </motion.a>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   6. HELP CENTER CTA
═══════════════════════════════════════════════════════ */
function HelpCenterSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const cards2 = [
    { Icon: BookMarked, title: "Help Center", desc: "Step-by-step guides, setup docs, and onboarding walkthroughs.", cta: "Visit Help Center", cls: "bp" },
    { Icon: HelpCircle, title: "FAQs", desc: "Quick answers to the most common questions from gym owners.", cta: "View FAQs", cls: "bor" },
  ];

  return (
    <section ref={ref} className="sec" style={{ background: "var(--s1)" }}>
      <div className="divline" style={{ position: "absolute", top: 0 }} />
      {/* Diagonal stripe bg */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg,rgba(247,147,30,.018) 0px,rgba(247,147,30,.018) 1px,transparent 1px,transparent 44px)", pointerEvents: "none" }} />

      <div className="con" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(44px,6vw,64px)" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ marginBottom: 18 }}>
            <span className="label">Support</span>
          </motion.div>
          <SplitText text="NEED HELP OR HAVE" className="hlg" delay={0.1} staggerDelay={0.04} />
          <SplitText text="QUESTIONS?" className="hlg"
            style={{ background: "linear-gradient(135deg,#f7931e,#ffb347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}
            delay={0.42} staggerDelay={0.07} />
          <motion.p className="body-lg" initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
            style={{ maxWidth: 560, margin: "24px auto 0", fontSize: "clamp(14px,1.8vw,17px)" }}>
            Find answers, onboarding guides, and support resources — everything you need to get started smoothly.
          </motion.p>
        </div>

        <div className="g2" style={{ maxWidth: 860, margin: "0 auto" }}>
          {cards2.map((c, i) => (
            <TiltCard key={i} className="card" style={{ padding: "clamp(32px,4vw,52px)", textAlign: "center", cursor: "none" }}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.15 }}>
                <motion.div
                  style={{ width: 72, height: 72, borderRadius: "50%", border: "1.5px solid rgba(247,147,30,.35)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", background: "rgba(247,147,30,.06)" }}
                  animate={{ boxShadow: ["0 0 0px rgba(247,147,30,0)", "0 0 28px rgba(247,147,30,.32)", "0 0 0px rgba(247,147,30,0)"] }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.6 }}
                  whileHover={{ scale: 1.1, borderColor: "rgba(247,147,30,.7)" }}
                >
                  <c.Icon size={28} color="#f7931e" />
                </motion.div>
                <h3 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(22px,3vw,32px)", color: "#f2f2f2", marginBottom: 12, letterSpacing: ".06em" }}>{c.title}</h3>
                <p className="body-sm" style={{ lineHeight: 1.8, marginBottom: 28 }}>{c.desc}</p>
                <MagBtn className={c.cls} style={{ justifyContent: "center" }}>{c.cta} <ArrowRight size={15} /></MagBtn>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   7. FINAL CTA
═══════════════════════════════════════════════════════ */
function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const { scrollYProgress } = useScroll({ target: ref });
  const parallax = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="sec" style={{ background: "var(--bg)", overflow: "hidden" }}>
      <div className="divline" style={{ position: "absolute", top: 0 }} />

      {/* Parallax animated bg */}
      <motion.div style={{ position: "absolute", inset: 0, y: parallax, pointerEvents: "none" }}>
        <motion.div style={{ position: "absolute", inset: 0 }}
          animate={{ background: ["linear-gradient(135deg,#060608 0%,rgba(247,147,30,.08) 50%,#060608 100%)", "linear-gradient(135deg,#060608 0%,rgba(255,107,0,.12) 50%,#060608 100%)", "linear-gradient(135deg,#060608 0%,rgba(247,147,30,.08) 50%,#060608 100%)"] }}
          transition={{ duration: 6, repeat: Infinity }} />
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div key={i} style={{ position: "absolute", width: `${Math.random() * 3 + 1}px`, height: `${Math.random() * 3 + 1}px`, borderRadius: "50%", background: "#f7931e", left: `${8 + Math.random() * 84}%`, top: `${8 + Math.random() * 84}%` }}
            animate={{ y: [0, -75, 0], opacity: [0, 0.55, 0], scale: [0, 1, 0] }}
            transition={{ duration: 5 + Math.random() * 4, repeat: Infinity, delay: i * 0.75, ease: "easeInOut" }} />
        ))}
        {/* Rotating rings */}
        {[500, 750].map((s, i) => (
          <motion.div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: s, height: s, marginLeft: -s / 2, marginTop: -s / 2, borderRadius: "50%", border: `1px solid rgba(247,147,30,${0.05 - i * 0.02})` }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }} transition={{ duration: 25 + i * 10, repeat: Infinity, ease: "linear" }} />
        ))}
      </motion.div>

      <div className="con" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ marginBottom: 28 }}>
          <span className="label">Join GymSaathi</span>
        </motion.div>

        <div className="hxl" style={{ marginBottom: 24 }}>
          <SplitText text="READY TO DIGITIZE" className="hxl" delay={0.1} staggerDelay={0.06} />
          <SplitText text="YOUR GYM?" className="hxl"
            style={{ background: "linear-gradient(135deg,#f7931e,#ffb347,#ff6b00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}
            delay={0.5} staggerDelay={0.09} />
        </div>

        <motion.p className="body-lg" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.7 }}
          style={{ maxWidth: 600, margin: "0 auto 52px", fontSize: "clamp(15px,2vw,18px)" }}>
          Join GymSaathi and bring technology, visibility, and growth to your fitness business.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.85 }}
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
          <MagBtn className="bp" style={{ fontSize: "clamp(14px,1.8vw,17px)", padding: "clamp(16px,2.5vw,22px) clamp(36px,5vw,56px)", boxShadow: "0 0 60px rgba(247,147,30,.4)" }}>
            Get Started at ₹79/month <ArrowRight size={18} />
          </MagBtn>
          <MagBtn className="bo" style={{ fontSize: "clamp(14px,1.8vw,17px)", padding: "clamp(15px,2.5vw,21px) clamp(36px,5vw,56px)" }}>
            Talk to Our Team
          </MagBtn>
        </motion.div>

        {/* Trust pulse */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.1 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <motion.div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f7931e" }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }} />
          <p style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(15px,2vw,19px)", color: "#f7931e", letterSpacing: ".1em" }}>
            Trusted by 30,000+ Gyms Across India
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════ */
export default function Resources() {
  return (
    <>
      <style>{G}</style>
      <Cursor />
      <ScrollBar />
      <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
        <HeroSection />
        <Marquee items={MARQUEE} />
        <CategoriesSection />
        <AboutSection />
        <BlogsSection />
        <SuccessSection />
        <HelpCenterSection />
        <FinalCTA />
      </div>
    </>
  );
}