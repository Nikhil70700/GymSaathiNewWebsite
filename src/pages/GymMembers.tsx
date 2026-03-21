import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { Dumbbell, Heart, Activity, TrendingUp, Apple, Brain, Target, Bell, Calendar, Award, Users, Shield, Check, Play, Smartphone, ChevronRight, Zap, Flame, BarChart2, Clock, Star } from 'lucide-react';

/* ══════════════════════════════════════════════════════════
   GLOBAL STYLES
══════════════════════════════════════════════════════════ */
const GLOBAL = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

  @keyframes gm-breathe { 0%,100%{opacity:.04} 50%{opacity:.11} }
  @keyframes gm-spin-cw  { to{transform:rotate(360deg)} }
  @keyframes gm-spin-ccw { to{transform:rotate(-360deg)} }
  @keyframes gm-float-a  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
  @keyframes gm-float-b  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(10px)} }
  @keyframes gm-pulse-ring {
    0%   { transform:scale(.85); opacity:.7; }
    100% { transform:scale(1.8); opacity:0; }
  }
  @keyframes gm-dot  { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.55)} }
  @keyframes gm-shimmer {
    0%   { transform:translateX(-120%) skewX(-14deg); }
    100% { transform:translateX(320%)  skewX(-14deg); }
  }
  @keyframes gm-cta-glow {
    0%,100% { box-shadow:0 0 20px rgba(254,122,1,.4),0 4px 24px rgba(0,0,0,.4); }
    50%     { box-shadow:0 0 48px rgba(254,122,1,.8),0 4px 40px rgba(0,0,0,.5); }
  }
  @keyframes gm-ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes gm-stat-scroll {
    0%   { transform:translateY(0); }
    100% { transform:translateY(-60%); }
  }
  @keyframes gm-word-in {
    from { opacity:0; transform:translateY(22px) skewY(2deg); }
    to   { opacity:1; transform:translateY(0)    skewY(0deg); }
  }
  @keyframes gm-line-grow {
    from { transform:scaleX(0); transform-origin:left; }
    to   { transform:scaleX(1); transform-origin:left; }
  }
  @keyframes gm-card-in {
    from { opacity:0; transform:translateY(30px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes gm-badge-in {
    from { opacity:0; transform:translateX(-12px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes gm-scan {
    0%   { top:0;   opacity:.8; }
    100% { top:100%;opacity:0; }
  }
  @keyframes gm-counter {
    from { opacity:0; transform:translateY(10px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .gm-btn-primary {
    position:relative; overflow:hidden;
    animation:gm-cta-glow 3s ease-in-out infinite;
  }
  .gm-btn-primary::after {
    content:''; position:absolute; inset:0; border-radius:inherit;
    background:linear-gradient(105deg,transparent 36%,rgba(255,255,255,.22) 50%,transparent 64%);
    animation:gm-shimmer 3.5s ease-in-out infinite; pointer-events:none;
  }
  .gm-card {
    position:relative; border-radius:18px; overflow:hidden;
    background:#141414; border:1px solid rgba(255,255,255,.07);
    transition:transform .3s ease, border-color .3s ease, box-shadow .3s ease;
    cursor:default;
  }
  .gm-card:hover {
    transform:translateY(-7px);
    border-color:rgba(247,147,30,.35);
    box-shadow:0 24px 56px rgba(0,0,0,.55), 0 0 0 1px rgba(247,147,30,.14);
  }
  .gm-card::after {
    content:''; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
    background:linear-gradient(105deg,transparent 36%,rgba(255,255,255,.04) 50%,transparent 64%);
    animation:gm-shimmer 5s ease-in-out infinite;
  }
  @media(max-width:720px){.gm-cta-grid{grid-template-columns:1fr !important;}}
  @media(max-width:768px){.gm-two-col{grid-template-columns:1fr !important;}}
`;

/* ══════════════════════════════════════════════════════════
   SHARED ATOMS
══════════════════════════════════════════════════════════ */
const O = '#fe7a01';
const OD = 'rgba(254,122,1,.15)';
const OB = 'rgba(254,122,1,.22)';
const ease = [.22, 1, .36, 1] as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: .12, delayChildren: .15 } },
};
const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: .6, ease } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: .88 },
  visible: { opacity: 1, scale: 1, transition: { duration: .5, ease } },
};

function OrangeDot({ size = 6, delay = 0 }: { size?: number, delay?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: O,
      boxShadow: `0 0 8px ${O}`, flexShrink: 0,
      animation: `gm-dot 1.9s ease-in-out ${delay}s infinite`,
    }} />
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '5px 14px', borderRadius: 4,
      background: 'rgba(254,122,1,.07)', border: `1px solid ${OB}`,
      marginBottom: 'clamp(14px,2vh,22px)',
    }}>
      <OrangeDot size={6} />
      <span style={{
        fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700,
        fontSize: 'clamp(9px,.9vw,11px)', letterSpacing: '.34em',
        textTransform: 'uppercase', color: O,
      }}>
        {children}
      </span>
    </div>
  );
}

function SectionHeading({ children, center = false }: { children: React.ReactNode, center?: boolean }) {
  return (
    <h2 style={{
      fontFamily: "font-heading, sans-serif",
      fontWeight: 700,
      fontSize: 'clamp(26px,3.6vw,48px)',
      letterSpacing: '-.4px',
      lineHeight: .95,
      textTransform: 'uppercase',
      color: '#f5f5f5',
      margin: '0 0 clamp(12px,1.8vh,16px)',
      textAlign: center ? 'center' : 'left',
      wordBreak: 'break-word',
      overflowWrap: 'break-word',
    }}>
      {children}
    </h2>
  );
}

function OrangeSpan({ children }: { children: React.ReactNode }) {
  return <span style={{ color: O, textShadow: `0 0 28px rgba(254,122,1,.38)` }}>{children}</span>;
}

function Sub({ children, center = false, max = 520 }: { children: React.ReactNode, center?: boolean, max?: number }) {
  return (
    <p style={{
      fontFamily: "'Barlow',sans-serif", fontWeight: 400,
      fontSize: 'clamp(13px,1.3vw,16px)', color: 'rgba(161,161,161,.82)',
      lineHeight: 1.72, maxWidth: max,
      textAlign: center ? 'center' : 'left',
      margin: center ? '0 auto' : '0',
    }}>
      {children}
    </p>
  );
}

function BgBase({ color = '#0b0b0b' }: { color?: string }) {
  return (
    <>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: .02,
        backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)',
        backgroundSize: '54px 54px',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse at 50% 0%,rgba(254,122,1,.04),transparent 60%)`,
      }} />
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   1. HERO
══════════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const spY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  const dumbbellX = useTransform(spX, [-1, 1], [-18, 18]);
  const dumbbellY = useTransform(spY, [-1, 1], [-18, 18]);
  const heartX = useTransform(spX, [-1, 1], [-26, 26]);
  const heartY = useTransform(spY, [-1, 1], [-26, 26]);
  const ringX = useTransform(spX, [-1, 1], [-12, 12]);
  const ringY = useTransform(spY, [-1, 1], [-12, 12]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left - r.width / 2) / 80);
    mouseY.set((e.clientY - r.top - r.height / 2) / 80);
  };

  const words = ['Your Fitness', 'Journey,', 'Simplified &', 'Smarter'];

  return (
    <motion.div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center' }}
      onMouseMove={handleMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      initial="hidden" animate="visible" variants={staggerContainer}
    >
      {/* Radial bg */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 40% 55%,rgba(254,122,1,.08) 0%,rgba(120,70,18,.18) 32%,rgba(30,16,4,.45) 55%,#080808 72%)' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 40% 56%,rgba(254,122,1,.12) 0%,transparent 48%)', animation: 'gm-breathe 4.5s ease-in-out infinite' }} />
      <BgBase />

      {/* Floating gym icons */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <motion.div style={{ position: 'absolute', top: '14%', left: '8%', x: dumbbellX, y: dumbbellY }}>
          <Dumbbell style={{ width: 'clamp(48px,6vw,80px)', height: 'clamp(48px,6vw,80px)', color: 'rgba(247,147,30,.2)', strokeWidth: 1.5 }} />
        </motion.div>
        <motion.div style={{ position: 'absolute', top: '18%', right: '10%', x: heartX, y: heartY }}>
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <Activity style={{ width: 'clamp(40px,5vw,68px)', height: 'clamp(40px,5vw,68px)', color: 'rgba(254,122,1,.22)', strokeWidth: 1.5 }} />
          </motion.div>
        </motion.div>
        <motion.div style={{ position: 'absolute', bottom: '16%', right: '9%', x: ringX, y: ringY }}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
            <svg width="clamp(64px,8vw,100px)" height="clamp(64px,8vw,100px)" viewBox="0 0 100 100" style={{ opacity: .18 }}>
              <circle cx="50" cy="50" r="40" fill="none" stroke={O} strokeWidth="3" strokeDasharray="70 185" strokeLinecap="round" />
              <circle cx="50" cy="50" r="30" fill="none" stroke={O} strokeWidth="2.5" strokeDasharray="45 145" strokeLinecap="round" />
            </svg>
          </motion.div>
        </motion.div>
        <motion.div style={{ position: 'absolute', bottom: '22%', left: '7%', x: dumbbellY, y: dumbbellX }}>
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [.15, .3, .15] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
            <Flame style={{ width: 'clamp(36px,4.5vw,58px)', height: 'clamp(36px,4.5vw,58px)', color: O, strokeWidth: 1.5 }} />
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: 'clamp(96px,14vh,140px) clamp(20px,5vw,56px) clamp(64px,9vh,100px)', width: '100%' }}>
        <div style={{ maxWidth: 780 }}>

          <motion.div variants={fadeInUp}>
            <Badge>Gym Members Platform</Badge>
          </motion.div>

          {/* Headline */}
          <div style={{ marginBottom: 'clamp(14px,2vh,20px)' }}>
            {words.map((w, i) => (
              <div key={i} style={{
                fontFamily: "font-heading, sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(30px,6vw,60px)',
                lineHeight: 1,
                letterSpacing: '.02em',
                color: i >= 2 ? O : '#f5f5f5',
                display: 'block',
                paddingBottom: 'clamp(2px,.4vh,6px)',
                animation: `gm-word-in .55s cubic-bezier(.22,1,.36,1) ${.15 + i * .1}s both`,
              }}>
                {w}
              </div>
            ))}
          </div>

          <motion.div variants={fadeInUp} style={{ marginBottom: 'clamp(28px,4vh,40px)' }}>
            <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 'clamp(14px,1.6vw,18px)', color: O, letterSpacing: '.04em', marginBottom: 10 }}>
              Free Workouts · AI Diet Plans · Live Progress
            </p>
            <Sub max={560}>
              Work out smarter with guided exercises, personalized plans, progress tracking, and expert nutrition support — all inside your gym's app.
            </Sub>
          </motion.div>

          <motion.div variants={fadeInUp} style={{ display: 'flex', gap: 'clamp(10px,1.8vw,16px)', flexWrap: 'wrap', marginBottom: 'clamp(32px,5vh,48px)' }}>
            <motion.button
              className="gm-btn-primary"
              whileHover={{ scale: 1.06, filter: 'brightness(1.1)' }} whileTap={{ scale: .97 }}
              style={{ background: `linear-gradient(135deg,${O},#c55a00)`, color: '#fff', border: 'none', cursor: 'pointer', borderRadius: 999, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 'clamp(13px,1.3vw,15px)', letterSpacing: '.18em', textTransform: 'uppercase', padding: 'clamp(13px,1.8vh,16px) clamp(26px,3.5vw,44px)', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}
            >
              <Play size={14} strokeWidth={2.5} /> Access via Your Gym
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: OB, backgroundColor: OD }} whileTap={{ scale: .97 }}
              style={{ background: 'transparent', border: '1.5px solid rgba(245,245,245,.25)', color: '#f5f5f5', cursor: 'pointer', borderRadius: 999, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 'clamp(13px,1.3vw,15px)', letterSpacing: '.18em', textTransform: 'uppercase', padding: 'clamp(13px,1.8vh,16px) clamp(26px,3.5vw,44px)', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', transition: 'all .22s' }}
            >
              <Smartphone size={14} /> Explore Features
            </motion.button>
          </motion.div>

          {/* Stat pills */}
          <motion.div variants={fadeInUp} style={{ display: 'flex', gap: 'clamp(14px,3vw,28px)', flexWrap: 'wrap' }}>
            {[{ v: '10K+', l: 'Active Members' }, { v: '50+', l: 'Workout Plans' }, { v: '100%', l: 'Science-backed' }, { v: '24/7', l: 'Access' }].map((s, i) => (
              <div key={i} style={{ borderLeft: `2px solid rgba(254,122,1,.42)`, paddingLeft: 'clamp(10px,1.5vw,14px)' }}>
                <div style={{ fontFamily: "font-heading, sans-serif", fontSize: 'clamp(18px,2.4vw,27px)', color: O, lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 'clamp(9px,.88vw,11px)', color: 'rgba(161,161,161,.52)', letterSpacing: '.18em', textTransform: 'uppercase', marginTop: 3 }}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 'clamp(18px,3.5vh,32px)', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: .4 }}>
        <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 10, color: O, letterSpacing: '1.2px', textTransform: 'uppercase' }}>Scroll</span>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: 11, height: 11, borderRight: `2px solid ${O}`, borderBottom: `2px solid ${O}`, animation: `gm-breathe 1.7s ease-in-out ${i * .2}s infinite`, opacity: 1 - i * .25, transform: 'rotate(45deg)' }} />
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   2. WHY MEMBERS LOVE
══════════════════════════════════════════════════════════ */
function WhySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: .15 });

  const features = [
    { icon: Target, title: 'Train Right', desc: 'Scientifically guided exercises with proper form cues and video demonstrations.', hex: '#fe7a01' },
    { icon: Calendar, title: 'Stay Consistent', desc: 'Plans, reminders, and streak tracking keep you accountable every single day.', hex: '#f7931e' },
    { icon: TrendingUp, title: 'Track Everything', desc: 'Calories, workouts, BMI, body composition, and full transformation history.', hex: '#ffaa35' },
    { icon: Smartphone, title: 'All in One App', desc: 'No multiple apps — workouts, diet, payments and progress under one ecosystem.', hex: '#fe7a01' },
  ];

  return (
    <section ref={ref} style={{ background: '#0b0b0b', padding: 'clamp(64px,9vh,112px) 0', position: 'relative', overflow: 'hidden' }}>
      <BgBase />
      <div style={{ position: 'absolute', top: '20%', right: '-5%', width: '35%', height: '60%', borderRadius: '50%', background: `radial-gradient(circle,rgba(254,122,1,.06),transparent 70%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)' }}>
        <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 'clamp(48px,7vh,72px)' }}>
          <motion.div variants={fadeInUp}><Badge>Why Members Love It</Badge></motion.div>
          <motion.div variants={fadeInUp}><SectionHeading center>Built for Real<br /><OrangeSpan>Fitness Progress</OrangeSpan></SectionHeading></motion.div>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(clamp(220px,26vw,280px),1fr))', gap: 'clamp(14px,2vw,20px)' }}>
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: i * .1, ease }}>
              <div className="gm-card" style={{ padding: 'clamp(24px,3vw,36px)', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <motion.div whileHover={{ rotate: 8, scale: 1.1 }} transition={{ duration: .25, ease }} style={{ width: 'clamp(44px,5vw,56px)', height: 'clamp(44px,5vw,56px)', borderRadius: 12, background: `${f.hex}14`, border: `1px solid ${f.hex}28`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <f.icon size={22} color={f.hex} strokeWidth={2} />
                </motion.div>
                <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 'clamp(17px,1.8vw,22px)', color: '#f5f5f5', margin: 0, letterSpacing: '-.2px' }}>{f.title}</h3>
                <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 'clamp(12px,1.1vw,14px)', color: 'rgba(161,161,161,.8)', lineHeight: 1.7, margin: 0, flex: 1 }}>{f.desc}</p>
                <div style={{ height: 2, borderRadius: 999, background: `linear-gradient(90deg,${f.hex},rgba(254,122,1,.1))`, animation: isInView ? `gm-line-grow .7s ease ${.2 + i * .1}s both` : 'none', transform: 'scaleX(0)', transformOrigin: 'left' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   3. CORE FEATURES
══════════════════════════════════════════════════════════ */
function CoreFeaturesSection() {
  const features = [
    { icon: Dumbbell, title: 'Exercise Library', desc: '3D animations + trainer-led videos for correct form on every movement. 200+ exercises across all muscle groups.', hex: '#fe7a01', tag: '200+ Exercises' },
    { icon: Apple, title: 'AI Diet & Nutrition', desc: 'Goal-based ICMR-aligned diet suggestions, macro tracking, calorie calculator, and personalized meal plans.', hex: '#f7931e', tag: 'ICMR-Based' },
    { icon: Brain, title: 'Yoga & Recovery', desc: 'Guided sessions for flexibility, injury prevention, active recovery, and mental wellness — train smarter.', hex: '#ffb347', tag: 'Science-Backed' },
    { icon: TrendingUp, title: 'Progress Tracker', desc: 'Track workouts, weight, BMI, and full body transformation history with visual before/after comparisons.', hex: '#fe7a01', tag: 'Visual Analytics' },
    { icon: Target, title: 'Goal-Based Plans', desc: 'Fat loss, muscle gain, strength, endurance, or general fitness — AI picks the optimal plan for your goals.', hex: '#f7931e', tag: 'Personalized' },
    { icon: Bell, title: 'Smart Reminders', desc: 'Intelligent alerts for workouts, hydration, supplements, and renewal — stay accountable without effort.', hex: '#ffaa35', tag: 'WhatsApp + App' },
  ];

  return (
    <section style={{ background: '#0f0f0f', padding: 'clamp(64px,9vh,112px) 0', position: 'relative', overflow: 'hidden' }}>
      <BgBase color="#0f0f0f" />
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: '30%', height: '50%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(254,122,1,.05),transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)' }}>
        <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 'clamp(48px,7vh,72px)' }}>
          <motion.div variants={fadeInUp}><Badge>Platform Features</Badge></motion.div>
          <motion.div variants={fadeInUp}><SectionHeading center>Everything You Need<br /><OrangeSpan>to Stay Fit</OrangeSpan></SectionHeading></motion.div>
          <motion.div variants={fadeInUp}><Sub center max={520}>Your complete fitness toolkit — workouts, nutrition, tracking, and recovery in one powerful app.</Sub></motion.div>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(clamp(260px,30vw,360px),1fr))', gap: 'clamp(16px,2.2vw,22px)' }}>
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: (i % 3) * .1, ease }}>
              <div className="gm-card" style={{ padding: 'clamp(24px,3vw,36px)', display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <motion.div whileHover={{ rotate: 8, scale: 1.1 }} transition={{ duration: .25 }} style={{ width: 'clamp(48px,5.5vw,60px)', height: 'clamp(48px,5.5vw,60px)', borderRadius: 14, background: `${f.hex}14`, border: `1px solid ${f.hex}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <f.icon size={22} color={f.hex} strokeWidth={2} />
                  </motion.div>
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 'clamp(8px,.8vw,10px)', letterSpacing: '.18em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4, background: `${f.hex}18`, border: `1px solid ${f.hex}35`, color: f.hex }}>{f.tag}</span>
                </div>
                <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 'clamp(17px,1.8vw,21px)', color: '#f5f5f5', margin: 0, letterSpacing: '-.2px' }}>{f.title}</h3>
                <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 'clamp(12px,1.1vw,14px)', color: 'rgba(161,161,161,.8)', lineHeight: 1.7, margin: 0, flex: 1 }}>{f.desc}</p>
                <div style={{ height: 2, borderRadius: 999, background: `linear-gradient(90deg,${f.hex}88,rgba(254,122,1,.08))`, animation: `gm-line-grow .7s ease .3s both`, transform: 'scaleX(0)', transformOrigin: 'left' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   4. HOW IT WORKS
══════════════════════════════════════════════════════════ */
function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: .2 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineW = useTransform(scrollYProgress, [.15, .75], ['0%', '100%']);

  const steps = [
    { num: '01', title: 'Join a Partner Gym', tag: 'Step One', desc: 'Your gym gives you GymSaathi access as part of their digital membership.', icon: <Dumbbell size={28} color={O} strokeWidth={1.8} />, delay: 0.1 },
    { num: '02', title: 'Download & Login', tag: 'Step Two', desc: 'Access workouts, AI diet plans, and progress tracking instantly on your phone.', icon: <Smartphone size={28} color={O} strokeWidth={1.8} />, delay: 0.25 },
    { num: '03', title: 'Train & Transform', tag: 'Step Three', desc: 'Follow expert plans, monitor every metric, and watch your body transform.', icon: <TrendingUp size={28} color={O} strokeWidth={1.8} />, delay: 0.4 },
  ];

  return (
    <section ref={ref} style={{ background: '#080808', padding: 'clamp(64px,9vh,112px) 0', position: 'relative', overflow: 'hidden' }}>
      <BgBase />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)' }}>
        <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 'clamp(52px,8vh,88px)' }}>
          <motion.div variants={fadeInUp}><Badge>How It Works</Badge></motion.div>
          <motion.div variants={fadeInUp}><SectionHeading center>Start in<br /><OrangeSpan>3 Simple Steps</OrangeSpan></SectionHeading></motion.div>
          <motion.div variants={fadeInUp}><Sub center max={460}>Join as a member through your partner gym — completely free, no extra apps needed.</Sub></motion.div>
        </motion.div>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: 'clamp(52px,7vw,68px)', left: 'calc(16.66% + 20px)', right: 'calc(16.66% + 20px)', height: 2, background: 'rgba(255,255,255,.07)', borderRadius: 999, overflow: 'visible', zIndex: 0 }} className="hidden lg:block">
            <motion.div style={{ height: '100%', width: lineW, background: `linear-gradient(90deg,${O},#ffaa35,${O})`, boxShadow: `0 0 10px rgba(254,122,1,.5)`, borderRadius: 999 }} />
            <motion.div style={{ position: 'absolute', top: '50%', y: '-50%', left: lineW, width: 10, height: 10, borderRadius: '50%', background: O, boxShadow: `0 0 14px rgba(254,122,1,.95)`, marginLeft: -5 }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(clamp(220px,28vw,340px),1fr))', gap: 'clamp(16px,2.5vw,28px)', position: 'relative', zIndex: 1 }}>
            {steps.map((s, i) => (
              <motion.div key={s.num} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: i * .12, ease }}>
                <div className="gm-card" style={{ padding: 'clamp(28px,3.5vw,44px) clamp(20px,2.5vw,32px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(14px,2vh,18px)', textAlign: 'center' }}>
                  <div style={{ position: 'absolute', top: 14, right: 18, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 'clamp(11px,1.1vw,13px)', letterSpacing: '.12em', color: 'rgba(254,122,1,.32)', animation: `gm-breathe 3s ease-in-out ${i * .5}s infinite` }}>{s.num}</div>
                  <div style={{ position: 'relative', marginTop: 8 }}>
                    <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: `1px solid rgba(254,122,1,.2)`, animation: `gm-pulse-ring 2.4s ease-out ${i * .5}s infinite` }} />
                    <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: `1px solid rgba(254,122,1,.15)`, animation: `gm-pulse-ring 2.4s ease-out ${i * .5 + .8}s infinite` }} />
                    <motion.div whileHover={{ scale: 1.12, rotate: 6 }} transition={{ duration: .25, ease }} style={{ width: 'clamp(60px,7vw,76px)', height: 'clamp(60px,7vw,76px)', borderRadius: '50%', background: `linear-gradient(135deg,rgba(254,122,1,.2),rgba(254,122,1,.06))`, border: `1px solid rgba(254,122,1,.32)`, boxShadow: '0 0 28px rgba(254,122,1,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {s.icon}
                    </motion.div>
                  </div>
                  <div style={{ padding: '3px 12px', borderRadius: 999, background: OD, border: `1px solid ${OB}` }}>
                    <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 'clamp(8px,.8vw,10px)', letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(254,122,1,.82)' }}>{s.tag}</span>
                  </div>
                  <h3 style={{ fontFamily: "font-heading, sans-serif", fontWeight: 700, fontSize: 'clamp(18px,2.2vw,26px)', color: '#f5f5f5', lineHeight: 1, margin: 0, textTransform: 'uppercase' }}>{s.title}</h3>
                  <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 'clamp(12px,1.1vw,14px)', color: 'rgba(161,161,161,.8)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                  <div ref={el => {
                    if (el && isInView) { const t = setTimeout(() => { el.style.transition = `transform .75s cubic-bezier(.22,1,.36,1) ${s.delay}s`; el.style.transform = 'scaleX(1)'; }, 10); return () => clearTimeout(t); }
                  }} style={{ width: '100%', height: 2, borderRadius: 999, background: `linear-gradient(90deg,${O},rgba(254,122,1,.1))`, transform: 'scaleX(0)', transformOrigin: 'left', flexShrink: 0 }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6, delay: .4 }} style={{ textAlign: 'center', marginTop: 'clamp(40px,6vh,60px)' }}>
          <motion.button className="gm-btn-primary" whileHover={{ scale: 1.06 }} whileTap={{ scale: .97 }} style={{ background: `linear-gradient(135deg,${O},#c55a00)`, color: '#fff', border: 'none', cursor: 'pointer', borderRadius: 999, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 'clamp(12px,1.2vw,14px)', letterSpacing: '.2em', textTransform: 'uppercase', padding: 'clamp(13px,1.8vh,16px) clamp(36px,5vw,56px)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Ask Your Gym for Access <ChevronRight size={14} strokeWidth={2.5} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   5. MEMBER EXPERIENCE
══════════════════════════════════════════════════════════ */
function MemberExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: .2 });

  const addOns = [
    { icon: TrendingUp, text: 'Transformation history & visual progress charts' },
    { icon: Award, text: 'Fitness challenges, streaks & achievement badges' },
    { icon: Users, text: 'Connected gym experience with real trainers' },
    { icon: Smartphone, text: 'Full offline access — train anywhere, anytime' },
  ];

  const phoneStats = [
    { l: 'Calories Burned', v: '2,450', icon: '🔥' },
    { l: 'Active Minutes', v: '87', icon: '⏱️' },
    { l: 'Workout Streak', v: '12 days', icon: '🎯' },
    { l: 'Weight Progress', v: '-3.2 kg', icon: '📊' },
    { l: 'Goals Completed', v: '8/10', icon: '✅' },
    { l: 'Total Workouts', v: '45', icon: '💪' },
    { l: 'Calories Burned', v: '2,450', icon: '🔥' },
    { l: 'Active Minutes', v: '87', icon: '⏱️' },
  ];

  return (
    <section ref={ref} style={{ background: '#0f0f0f', padding: 'clamp(64px,9vh,112px) 0', position: 'relative', overflow: 'hidden' }}>
      <BgBase color="#0f0f0f" />
      <div style={{ position: 'absolute', top: '20%', right: '8%', width: '28%', height: '55%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(254,122,1,.07),transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', animation: 'gm-breathe 5s ease-in-out infinite' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(40px,7vw,96px)', alignItems: 'center' }} className="gm-two-col">
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .7, ease }}>
            <Badge>Member Experience</Badge>
            <SectionHeading>More Than<br />Just<br /><OrangeSpan>Workouts</OrangeSpan></SectionHeading>
            <div style={{ height: 'clamp(14px,2vh,20px)' }} />
            <Sub max={440}>Everything your fitness journey needs — connected, intuitive, and built to keep you coming back.</Sub>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2vh,20px)', marginTop: 'clamp(28px,4vh,40px)' }}>
              {addOns.map((a, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .5, delay: .15 + i * .09, ease }} whileHover={{ x: 6 }} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px,1.8vw,18px)' }}>
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} style={{ width: 'clamp(40px,4.8vw,50px)', height: 'clamp(40px,4.8vw,50px)', borderRadius: 12, background: OD, border: `1px solid ${OB}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <a.icon size={18} color={O} strokeWidth={2} />
                  </motion.div>
                  <span style={{ fontFamily: "'Barlow',sans-serif", fontWeight: 500, fontSize: 'clamp(13px,1.3vw,16px)', color: 'rgba(245,245,245,.88)', lineHeight: 1.5 }}>{a.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .7, delay: .15, ease }} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 'clamp(220px,28vw,320px)', animation: 'gm-float-a 5s ease-in-out infinite' }}>
              <div style={{ position: 'absolute', inset: -40, background: 'radial-gradient(ellipse,rgba(254,122,1,.18),transparent 70%)', filter: 'blur(30px)', borderRadius: '50%', zIndex: 0 }} />
              <div style={{ position: 'relative', background: '#1a1a1a', borderRadius: 'clamp(24px,3vw,36px)', border: '7px solid #0b0b0b', boxShadow: '0 40px 80px rgba(0,0,0,.7)', overflow: 'hidden', zIndex: 1 }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 'clamp(80px,10vw,110px)', height: 'clamp(16px,2.2vw,22px)', background: '#0b0b0b', borderRadius: '0 0 12px 12px', zIndex: 20 }} />
                <div style={{ background: 'linear-gradient(180deg,#0f0f0f,#0b0b0b)', padding: 'clamp(28px,4vw,36px) clamp(14px,2vw,18px) clamp(18px,2.5vw,24px)', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(14px,2vw,20px)' }}>
                    <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 'clamp(11px,1.2vw,14px)', color: '#f5f5f5', letterSpacing: '.04em' }}>My Progress</span>
                    <div style={{ width: 'clamp(22px,2.8vw,28px)', height: 'clamp(22px,2.8vw,28px)', borderRadius: '50%', background: OD, border: `1px solid ${OB}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Zap size={11} color={O} strokeWidth={2.5} />
                    </div>
                  </div>
                  <div style={{ overflow: 'hidden', height: 'clamp(220px,30vw,320px)' }}>
                    <div style={{ animation: 'gm-stat-scroll 12s linear infinite' }}>
                      {phoneStats.map((s, i) => (
                        <div key={i} style={{ background: 'rgba(254,122,1,.05)', border: '1px solid rgba(254,122,1,.15)', borderRadius: 10, padding: 'clamp(10px,1.5vw,14px)', marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px,1.2vw,12px)' }}>
                            <span style={{ fontSize: 'clamp(16px,2vw,22px)' }}>{s.icon}</span>
                            <span style={{ fontFamily: "'Barlow',sans-serif", fontWeight: 500, fontSize: 'clamp(9px,.9vw,12px)', color: 'rgba(245,245,245,.7)' }}>{s.l}</span>
                          </div>
                          <span style={{ fontFamily: "font-heading, sans-serif", fontSize: 'clamp(13px,1.6vw,17px)', color: O }}>{s.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'clamp(24px,3vw,36px)', pointerEvents: 'none', zIndex: 5 }}>
                  <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,rgba(254,122,1,.7),rgba(255,230,120,.4),rgba(254,122,1,.7),transparent)`, boxShadow: '0 0 10px rgba(254,122,1,.4)', animation: 'gm-scan 5s linear infinite' }} />
                </div>
              </div>
              {([{ t: -6, l: -6, bT: true, bL: true }, { t: -6, r: -6, bT: true, bR: true }, { b: -6, l: -6, bB: true, bL: true }, { b: -6, r: -6, bB: true, bR: true }] as any[]).map((c, i) => (
                <div key={i} style={{ position: 'absolute', width: 18, height: 18, top: c.t, bottom: c.b, left: c.l, right: c.r, borderTop: c.bT ? `2px solid ${O}` : undefined, borderBottom: c.bB ? `2px solid ${O}` : undefined, borderLeft: c.bL ? `2px solid ${O}` : undefined, borderRight: c.bR ? `2px solid ${O}` : undefined, opacity: .55, zIndex: 10 }} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   6. TRUST
══════════════════════════════════════════════════════════ */
function TrustSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: .3 });

  const points = [
    { icon: Heart, label: 'Safe & Effective', desc: 'All plans are designed for safe, sustainable progress — no crash diets, no injury risks.' },
    { icon: Check, label: 'Scientifically Backed', desc: 'Workouts and nutrition are aligned with ICMR guidelines and sports science research.' },
    { icon: Shield, label: 'Expert Verified', desc: 'Content is reviewed by certified trainers, nutritionists, and fitness professionals.' },
  ];

  return (
    <section ref={ref} style={{ background: '#0b0b0b', padding: 'clamp(64px,9vh,112px) 0', position: 'relative', overflow: 'hidden' }}>
      <BgBase />
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}>
          <Badge>Trust & Safety</Badge>
          <SectionHeading center>Fitness Backed<br /><OrangeSpan>by Science</OrangeSpan></SectionHeading>
          <div style={{ height: 'clamp(12px,1.8vh,16px)' }} />
          <Sub center max={580}>All workouts and plans promote safe, effective, and sustainable habits — no guesswork, no misinformation.</Sub>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(clamp(220px,26vw,300px),1fr))', gap: 'clamp(16px,2vw,24px)', marginTop: 'clamp(40px,6vh,64px)' }}>
          {points.map((p, i) => (
            <motion.div key={p.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .5, delay: i * .1, ease }}>
              <div className="gm-card" style={{ padding: 'clamp(28px,3.5vw,40px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: `1px solid rgba(254,122,1,.2)`, animation: `gm-pulse-ring 2.5s ease-out ${i * .5}s infinite` }} />
                  <motion.div whileHover={{ scale: 1.12, rotate: 8 }} style={{ width: 'clamp(60px,7vw,76px)', height: 'clamp(60px,7vw,76px)', borderRadius: '50%', background: OD, border: `1px solid ${OB}`, boxShadow: '0 0 24px rgba(254,122,1,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p.icon size={26} color={O} strokeWidth={2} />
                  </motion.div>
                </div>
                <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 'clamp(16px,1.8vw,20px)', color: '#f5f5f5', margin: 0 }}>{p.label}</h3>
                <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 'clamp(12px,1.1vw,14px)', color: 'rgba(161,161,161,.78)', lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   7. FINAL CTA
══════════════════════════════════════════════════════════ */
function FinalCTASection() {
  const checks = ['Free for all gym members', 'No extra apps needed', 'Instant access on signup', 'Works on any smartphone'];
  const metrics = [{ v: '10K+', l: 'Members' }, { v: '50+', l: 'Workout Plans' }, { v: '100%', l: 'Free Access' }, { v: '24/7', l: 'Available' }];

  return (
    <section style={{ background: '#080808', padding: 'clamp(64px,9vh,100px) clamp(20px,5vw,56px)', position: 'relative', overflow: 'hidden' }}>
      <BgBase />
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '40%', height: '120%', background: `linear-gradient(135deg,${O}18,${O}06,transparent)`, pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7, ease }}
          style={{ borderRadius: 24, overflow: 'hidden', display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,.9fr)', border: `1px solid rgba(254,122,1,.18)`, boxShadow: '0 40px 80px rgba(0,0,0,.6)' }}
          className="gm-cta-grid"
        >
          {/* LEFT */}
          <div style={{ background: '#111', padding: 'clamp(36px,5vw,64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(20px,3vh,28px)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 4, background: OD, border: `1px solid ${OB}`, width: 'fit-content' }}>
              <OrangeDot size={6} />
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 'clamp(9px,.9vw,11px)', letterSpacing: '.34em', textTransform: 'uppercase', color: O }}>Start Today</span>
            </div>
            <h2 style={{ fontFamily: "font-heading, sans-serif", fontWeight: 700, fontSize: 'clamp(28px,3.8vw,52px)', lineHeight: .95, letterSpacing: '-.3px', textTransform: 'uppercase', color: '#f5f5f5', margin: 0 }}>
              Start Your Fitness Journey with{' '}
              <span style={{ color: O, textShadow: `0 0 24px rgba(254,122,1,.4)` }}>GymSaathi</span>
            </h2>
            <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 'clamp(13px,1.25vw,15px)', color: 'rgba(161,161,161,.82)', lineHeight: 1.72, margin: 0, maxWidth: 420 }}>
              Ask your gym for GymSaathi access and train smarter from day one — personalized plans, live tracking, and AI nutrition, all free.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {checks.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: OD, border: `1px solid ${OB}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={10} color={O} strokeWidth={3} />
                  </div>
                  <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 'clamp(12px,1.1vw,14px)', color: 'rgba(245,245,245,.75)' }}>{c}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <motion.button
                className="gm-btn-primary"
                whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }} whileTap={{ scale: .97 }}
                style={{ background: `linear-gradient(135deg,${O},#c55a00)`, color: '#fff', border: 'none', cursor: 'pointer', borderRadius: 999, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 'clamp(12px,1.2vw,14px)', letterSpacing: '.18em', textTransform: 'uppercase', padding: 'clamp(12px,1.7vh,15px) clamp(24px,3vw,36px)', display: 'inline-flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap' }}
              >
                <Zap size={13} strokeWidth={2.5} /> Get Access via My Gym
              </motion.button>
              <motion.button
                whileHover={{ borderColor: OB, color: '#fff' }} whileTap={{ scale: .97 }}
                style={{ background: 'transparent', border: '1.5px solid rgba(255,255,255,.18)', color: 'rgba(255,255,255,.65)', cursor: 'pointer', borderRadius: 999, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 'clamp(12px,1.2vw,14px)', letterSpacing: '.18em', textTransform: 'uppercase', padding: 'clamp(12px,1.7vh,15px) clamp(22px,2.8vw,32px)', whiteSpace: 'nowrap', transition: 'all .2s' }}
              >
                Learn More
              </motion.button>
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ background: `linear-gradient(135deg,${O},#d06000)`, padding: 'clamp(36px,5vw,64px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 'clamp(20px,3vh,28px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: .06, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '-20%', right: '-20%', width: '70%', height: '70%', borderRadius: '50%', background: 'rgba(255,255,255,.08)', filter: 'blur(40px)', pointerEvents: 'none' }} />
            <div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 'clamp(9px,.9vw,11px)', letterSpacing: '.34em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', marginBottom: 12 }}>Platform Stats</div>
              <div style={{ width: 40, height: 3, borderRadius: 2, background: 'rgba(255,255,255,.4)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px,2.5vw,24px)', flex: 1, alignContent: 'center' }}>
              {metrics.map((m, i) => (
                <div key={i} style={{ background: 'rgba(0,0,0,.18)', borderRadius: 14, padding: 'clamp(16px,2.2vw,24px)', backdropFilter: 'blur(8px)' }}>
                  <div style={{ fontFamily: "font-heading, sans-serif", fontWeight: 700, fontSize: 'clamp(24px,3.2vw,42px)', color: '#fff', lineHeight: 1, marginBottom: 4 }}>{m.v}</div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 'clamp(9px,.85vw,11px)', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.65)' }}>{m.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', opacity: .75, animation: 'gm-dot 2s ease-in-out infinite' }} />
              <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 'clamp(11px,1vw,13px)', color: 'rgba(255,255,255,.75)', margin: 0, lineHeight: 1.5 }}>
                Trusted by thousands of fitness enthusiasts across India
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════ */
export default function GymMembers() {
  return (
    <>
      <style>{GLOBAL}</style>
      <HeroSection />
      <WhySection />
      <CoreFeaturesSection />
      <HowItWorksSection />
      <MemberExperienceSection />
      <TrustSection />
      <FinalCTASection />
    </>
  );
}