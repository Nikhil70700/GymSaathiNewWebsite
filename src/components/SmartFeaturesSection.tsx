import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Brain, Activity, LineChart, ScanFace,
  Megaphone, CreditCard, CheckCircle2,
  ArrowRight, Zap, ChevronDown,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const slides = [
  {
    id: "erp",
    index: "01",
    category: "Gym Management",
    title: "Complete\nOperations Control",
    description: "Manage memberships, automate billing and reminders, handle trainers, and access financial reports — all from one mobile app.",
    features: [
      { label: "Member & Subscription Management", desc: "Manage member profiles, plans, renewals, and freeze options seamlessly." },
      { label: "Automated Billing & Payment Tracking", desc: "Auto-generate invoices, track payments, and manage pending dues." },
      { label: "Attendance Tracking", desc: "Real-time attendance through mobile app, QR, or biometric integrations." },
      { label: "Financial Reports & Analytics", desc: "One-click access to revenue, collections, expenses, and profit reports." },
    ],
    status: "Active",
    hex: "#3b82f6",
    icon: LineChart,
    image: "src/assets/operationalcontrol (1).png",
  },
  {
    id: "diet",
    index: "02",
    category: "Nutrition Planner",
    title: "Personalized\nNutrition Planning",
    description: "Science-backed nutrition powered by ICMR guidelines, personalized diets, and goal-based consultations driven by body composition insights.",
    features: [
      { label: "ICMR-Based Nutrition", desc: "Diet plans built on ICMR-NIN guidelines for safe, balanced nutrition." },
      { label: "Smart Calorie & Macro Tracking", desc: "Automatic calorie calculation with intelligent macro distribution." },
      { label: "Goal-Focused Meal Planning", desc: "Indian meal options curated for gym members ensuring practicality." },
      { label: "Expert Consultation", desc: "Monthly nutrition consultations with data-driven plan updates." },
    ],
    status: "Beta",
    hex: "#22c55e",
    icon: Brain,
    image: "src/assets/nutriPlanning.png",
  },
  {
    id: "bca",
    index: "03",
    category: "BCA Integration",
    title: "Body Composition\nAnalysis",
    description: "Seamlessly sync with BCA machines to track muscle mass, fat percentage, and long-term progress through a 13-parameter analysis.",
    features: [
      { label: "Smart BCA Sync", desc: "Instantly sync with BCA machines for accurate body composition tracking." },
      { label: "13-Point Body Insights", desc: "Unlock detailed muscle, fat, and health metrics with advanced analysis." },
      { label: "Track-Analyse-Improve", desc: "Monitor progress over time with clear trends and actionable insights." },
      { label: "Progress Reports", desc: "Visual charts showing transformation over weeks and months." },
    ],
    status: "Active",
    hex: "#a855f7",
    icon: Activity,
    image: "src/assets/bcas.png",
  },
  {
    id: "marketing",
    index: "04",
    category: "Marketing Wing",
    title: "Automated Marketing\nCampaigns",
    description: "Manage members and leads seamlessly with integrated WhatsApp & SMS campaigns, track conversions and ROI in real time.",
    features: [
      { label: "WhatsApp & SMS Automation", desc: "Launch targeted campaigns to engage leads and inactive users automatically." },
      { label: "Smart Lead Conversion", desc: "Track walk-in and digital leads, monitor conversions and campaign ROI." },
      { label: "Personalized Communication", desc: "Send automated renewals, offers, and reminders based on member behaviour." },
      { label: "Real-Time Analytics", desc: "Live dashboard showing campaign performance and conversion metrics." },
    ],
    status: "Active",
    hex: "#eab308",
    icon: Megaphone,
    image: "src/assets/marketing.png",
  },
  {
    id: "pos",
    index: "05",
    category: "POS & Billing",
    title: "Smart Payment\nSystem",
    description: "Smart POS built for gyms to handle memberships, renewals, and payments end-to-end with zero manual follow-up.",
    features: [
      { label: "Faster Collections, Zero Hassle", desc: "Accept, track, and manage all gym payments seamlessly." },
      { label: "Complete Financial Control", desc: "Centralize memberships, renewals, and transactions in one dashboard." },
      { label: "Built for Gyms", desc: "A gym-focused POS that simplifies payments and scales with growth." },
      { label: "Digital Invoicing", desc: "Auto-generate and send GST-compliant invoices instantly." },
    ],
    status: "Active",
    hex: "#ef4444",
    icon: CreditCard,
    image: "src/assets/smart payment.png",
  },
  {
    id: "access",
    index: "06",
    category: "Biometric Access",
    title: "Face ID\nEntry System",
    description: "Enable touchless gym entry with secure face recognition for fast, seamless member check-ins with zero front-desk congestion.",
    features: [
      { label: "Frictionless Member Entry", desc: "Fast, touchless check-ins that enhance member experience." },
      { label: "Secure Access Control", desc: "Prevent unauthorized entries with AI-powered facial recognition." },
      { label: "Automated Attendance", desc: "Track attendance without cards, fingerprints, or manual logs." },
      { label: "Real-Time Alerts", desc: "Instant notifications for unrecognized access attempts." },
    ],
    status: "Active",
    hex: "#06b6d4",
    icon: ScanFace,
    image: "src/assets/face.png",
  },
];

/* ─── Styles ────────────────────────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Sora:wght@300;400;500;600;700&display=swap');

  @keyframes sfs-pulse   { 0%,100%{opacity:1;transform:scale(1)}  50%{opacity:.5;transform:scale(.85)} }
  @keyframes sfs-scan    { 0%{top:-2px;opacity:.8} 100%{top:100%;opacity:0} }
  @keyframes sfs-drift   { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-14px) rotate(4deg)} }
  @keyframes sfs-shimmer { 0%{transform:translateX(-100%) skewX(-15deg)} 100%{transform:translateX(300%) skewX(-15deg)} }
  @keyframes sfs-fadein  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

  .sfs-dot       { animation: sfs-pulse 1.5s ease-in-out infinite; }
  .sfs-scan-line { animation: sfs-scan  3.5s linear infinite; }
  .sfs-drift     { animation: sfs-drift 5s ease-in-out infinite; }

  .sfs-shimmer-el::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.06) 50%,transparent 60%);
    animation: sfs-shimmer 3.5s ease-in-out infinite;
    pointer-events:none;
  }

  /* ── Visibility guards ── */
  .sfs-desktop { display:block; }
  .sfs-mobile  { display:none;  }

  @media (max-width: 767px) {
    .sfs-desktop { display:none  !important; }
    .sfs-mobile  { display:block !important; }
  }

  /* ── Mobile card base ── */
  .sfs-mob-card {
    border-radius: 20px;
    overflow: hidden;
    background: #0c0d10;
    border: 1px solid rgba(255,255,255,.07);
    animation: sfs-fadein .5s ease both;
  }

  /* ── Mobile accordion toggle ── */
  .sfs-accord-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 13px 16px;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
  }

  /* ── Mobile feature row ── */
  .sfs-feat-row {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 10px 14px;
    border-radius: 12px;
  }
  .sfs-feat-row:nth-child(odd)  { background: rgba(255,255,255,.025); }
  .sfs-feat-row:nth-child(even) { background: transparent; }
`;

/* ─── Shared: feature row ───────────────────────────────────────────────────── */
function FeatureRow({ label, desc, hex, i }: { label: string; desc: string; hex: string; i: number }) {
  return (
    <div className="sfs-feat-row" style={{ border: '1px solid rgba(255,255,255,.04)' }}>
      <div style={{
        flexShrink: 0, marginTop: 3,
        width: 20, height: 20, borderRadius: 6,
        background: `${hex}18`, border: `1px solid ${hex}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <CheckCircle2 size={11} color={hex} />
      </div>
      <div>
        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(11px,3vw,13px)', fontWeight: 700, color: '#fff', marginBottom: 2 }}>{label}</div>
        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(10px,2.8vw,12px)', color: 'rgba(255,255,255,.42)', lineHeight: 1.5 }}>{desc}</div>
      </div>
    </div>
  );
}

/* ─── Mobile card ───────────────────────────────────────────────────────────── */
function MobileCard({ slide, index }: { slide: typeof slides[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = slide.icon;

  return (
    <div
      className="sfs-mob-card"
      style={{
        animationDelay: `${index * 0.07}s`,
        border: `1px solid ${slide.hex}20`,
      }}
    >
      {/* ── Image banner ── */}
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#111' }}>
        <img
          src={slide.image}
          alt={slide.category}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(.82)' }}
        />

        {/* Gradient: bottom fade + colour tint */}
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(12,13,16,.98) 0%, rgba(12,13,16,.2) 55%, transparent 100%)` }} />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 80% 20%, ${slide.hex}20, transparent 65%)` }} />

        {/* Scan line */}
        <div className="sfs-scan-line" style={{
          position: 'absolute', left: 0, right: 0, height: 2, zIndex: 4,
          background: `linear-gradient(90deg,transparent,${slide.hex}bb,transparent)`,
          boxShadow: `0 0 8px 2px ${slide.hex}44`,
        }} />

        {/* HUD corners */}
        {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h], ci) => (
          <div key={ci} style={{
            position: 'absolute', [v]: 10, [h]: 10,
            width: 13, height: 13, zIndex: 5,
            borderTop:    v==='top'    ? `1.5px solid ${slide.hex}55` : 'none',
            borderBottom: v==='bottom' ? `1.5px solid ${slide.hex}55` : 'none',
            borderLeft:   h==='left'   ? `1.5px solid ${slide.hex}55` : 'none',
            borderRight:  h==='right'  ? `1.5px solid ${slide.hex}55` : 'none',
          }} />
        ))}

        {/* Status pill — top right */}
        <div style={{
          position: 'absolute', top: 12, right: 12, zIndex: 6,
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '4px 10px', borderRadius: 999,
          background: `${slide.hex}18`, border: `1px solid ${slide.hex}35`,
          backdropFilter: 'blur(8px)',
        }}>
          <span className="sfs-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: slide.hex, display: 'inline-block' }} />
          <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 9, letterSpacing: '.2em', color: slide.hex }}>{slide.status}</span>
        </div>

        {/* Index watermark — bottom right */}
        <div style={{
          position: 'absolute', bottom: 6, right: 12, zIndex: 3,
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 52, color: `${slide.hex}12`,
          lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        }}>{slide.index}</div>
      </div>

      {/* ── Text body ── */}
      <div style={{ padding: '16px 18px 0' }}>

        {/* Category chip */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 11px', borderRadius: 999, marginBottom: 11,
          background: `${slide.hex}10`, border: `1px solid ${slide.hex}28`,
        }}>
          <Icon size={10} color={slide.hex} />
          <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 9, letterSpacing: '.26em', textTransform: 'uppercase', color: slide.hex, fontWeight: 700 }}>{slide.category}</span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 'clamp(28px,8vw,40px)',
          lineHeight: .92, letterSpacing: '-.01em',
          color: '#fff', margin: '0 0 10px',
        }}>
          {slide.title.split('\n')[0]}<br />
          <span style={{ background: `linear-gradient(90deg,${slide.hex},${slide.hex}99)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {slide.title.split('\n')[1]}
          </span>
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: "'Sora',sans-serif",
          fontSize: 'clamp(12px,3.2vw,14px)',
          color: 'rgba(255,255,255,.42)', lineHeight: 1.68,
          margin: '0 0 14px',
        }}>
          {slide.description}
        </p>
      </div>

      {/* ── Accordion: Features ── */}
      <div style={{ borderTop: `1px solid ${slide.hex}18` }}>
        <button className="sfs-accord-btn" onClick={() => setOpen(o => !o)}>
          <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 12, fontWeight: 600, color: `${slide.hex}cc`, letterSpacing: '.08em' }}>
            {open ? 'Hide features' : 'Show features'}
          </span>
          <div style={{
            width: 26, height: 26, borderRadius: '50%',
            background: `${slide.hex}10`, border: `1px solid ${slide.hex}28`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform .28s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
          }}>
            <ChevronDown size={13} color={slide.hex} />
          </div>
        </button>

        {/* Collapsible feature list */}
        <div style={{
          maxHeight: open ? 600 : 0,
          overflow: 'hidden',
          transition: 'max-height .38s cubic-bezier(.22,1,.36,1)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '4px 14px 16px' }}>
            {slide.features.map((f, fi) => (
              <FeatureRow key={fi} label={f.label} desc={f.desc} hex={slide.hex} i={fi} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Card footer ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 18px',
        borderTop: `1px solid rgba(255,255,255,.05)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
          <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 12, fontWeight: 600, color: slide.hex, letterSpacing: '.06em' }}>Learn more</span>
          <ArrowRight size={13} color={slide.hex} />
        </div>
        <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.2)', letterSpacing: '.12em' }}>
          {slide.index} / 0{slides.length}
        </span>
      </div>
    </div>
  );
}

/* ─── Mobile layout ─────────────────────────────────────────────────────────── */
function MobileLayout() {
  return (
    <section
      className="sfs-mobile"
      style={{ background: '#060708', color: '#fff', padding: 'clamp(48px,7vh,64px) 0 clamp(40px,6vh,56px)' }}
    >
      {/* Section header */}
      <div style={{ padding: '0 clamp(16px,5vw,22px)', marginBottom: 'clamp(24px,4vh,32px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div className="sfs-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#f7931e', boxShadow: '0 0 7px #f7931e' }} />
          <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 10, letterSpacing: '.32em', textTransform: 'uppercase', color: 'rgba(247,147,30,.7)', fontWeight: 600 }}>
            Smart Features
          </span>
        </div>
        <h2 style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 'clamp(34px,9vw,48px)',
          lineHeight: .9, letterSpacing: '-.01em', color: '#fff',
          margin: '0 0 10px',
        }}>
          Everything Your<br />
          <span style={{ background: 'linear-gradient(90deg,#f7931e,#ffb347)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Gym Needs
          </span>
        </h2>
        <p style={{
          fontFamily: "'Sora',sans-serif",
          fontSize: 'clamp(12px,3.5vw,14px)',
          color: 'rgba(255,255,255,.38)', lineHeight: 1.65,
          maxWidth: 340, margin: 0,
        }}>
          Six powerful modules. One platform. Tap any card to explore the features.
        </p>
      </div>

      {/* Module index pills */}
      <div style={{
        padding: '0 clamp(16px,5vw,22px)',
        marginBottom: 'clamp(20px,3.5vh,28px)',
        display: 'flex', gap: 7, flexWrap: 'wrap',
      }}>
        {slides.map(s => (
          <div key={s.id} style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '4px 11px', borderRadius: 999,
            background: `${s.hex}0e`, border: `1px solid ${s.hex}22`,
          }}>
            <s.icon size={9} color={s.hex} />
            <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: `${s.hex}cc`, fontWeight: 600 }}>{s.index}</span>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,3vw,18px)', padding: '0 clamp(16px,5vw,22px)' }}>
        {slides.map((slide, i) => (
          <MobileCard key={slide.id} slide={slide} index={i} />
        ))}
      </div>

      {/* Footer note */}
      <p style={{
        fontFamily: "'Sora',sans-serif",
        fontSize: 11, color: 'rgba(255,255,255,.18)',
        letterSpacing: '.1em', textAlign: 'center',
        marginTop: 28, padding: '0 clamp(16px,5vw,22px)',
      }}>
        6 modules · 107+ gyms live · Free to start
      </p>
    </section>
  );
}

/* ─── Desktop layout (original GSAP horizontal scroll) ─────────────────────── */
function DesktopLayout() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray<HTMLElement>(".sfs-panel");
    const total = panels.length;

    gsap.set(trackRef.current, { width: `${total * 100}vw` });

    const scrollTween = gsap.to(panels, {
      xPercent: -100 * (total - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (total - 1),
        end: () => `+=${window.innerWidth * total * 1.4}`,
      },
    });

    panels.forEach((panel) => {
      const img   = panel.querySelector(".sfs-img-wrap");
      const text  = panel.querySelector(".sfs-text-wrap");
      const badge = panel.querySelector(".sfs-badge");
      const num   = panel.querySelector(".sfs-num");

      gsap.fromTo(img,
        { x: 160, opacity: 0, rotateY: 8, scale: .93 },
        { x: 0, opacity: 1, rotateY: 0, scale: 1, ease: "power3.out",
          scrollTrigger: { trigger: panel, containerAnimation: scrollTween, start: "left 65%", end: "center center", scrub: 1 } }
      );
      gsap.fromTo(text,
        { y: 60, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', ease: "power3.out",
          scrollTrigger: { trigger: panel, containerAnimation: scrollTween, start: "left 50%", end: "center center", scrub: 1 } }
      );
      gsap.fromTo(badge,
        { scale: 0, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, ease: "back.out(1.7)",
          scrollTrigger: { trigger: panel, containerAnimation: scrollTween, start: "left 45%", end: "center center", scrub: 1 } }
      );
      gsap.fromTo(num,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0,
          scrollTrigger: { trigger: panel, containerAnimation: scrollTween, start: "left 60%", end: "center center", scrub: 1 } }
      );
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="sfs-desktop"
      style={{ position: 'relative', height: '100dvh', overflow: 'hidden', background: '#060708', color: '#fff' }}
    >
      {/* Fixed top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 'clamp(48px,6vh,64px)', zIndex: 30, pointerEvents: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(20px,4vw,52px)',
        background: 'linear-gradient(180deg,rgba(6,7,8,.95) 0%,rgba(6,7,8,.6) 80%,transparent 100%)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255,255,255,.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#f7931e', boxShadow: '0 0 8px #f7931e' }} className="sfs-dot" />
          <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(9px,.85vw,11px)', letterSpacing: '.35em', textTransform: 'uppercase', color: 'rgba(247,147,30,.7)', fontWeight: 600 }}>Smart Features</span>
          <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,.1)', margin: '0 4px' }} />
          <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.22)' }}>Platform Suite</span>
        </div>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          {slides.map((s) => (
            <div key={s.id} style={{ width: 24, height: 3, borderRadius: 999, background: s.hex, opacity: .55 }} />
          ))}
        </div>
      </div>

      {/* Track */}
      <div ref={trackRef} style={{ display: 'flex', height: '100%' }}>
        {slides.map((slide) => {
          const Icon = slide.icon;
          return (
            <div
              key={slide.id}
              className="sfs-panel"
              style={{
                width: '100vw', height: '100%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 'clamp(72px,9vh,96px) clamp(20px,5vw,64px) clamp(40px,5vh,56px)',
                position: 'relative', boxSizing: 'border-box',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse at 50% 60%, ${slide.hex}10 0%, transparent 65%)` }} />
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: .025, backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '52px 52px' }} />

              <div style={{
                display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
                gap: 'clamp(24px,4vw,64px)', maxWidth: 1200, width: '100%',
                alignItems: 'center', position: 'relative', zIndex: 10,
                height: '100%', overflow: 'hidden',
              }}>
                {/* Image side */}
                <div className="sfs-img-wrap" style={{ position: 'relative' }}>
                  <div className="sfs-num" style={{
                    position: 'absolute', top: -10, left: -8, zIndex: 0,
                    fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(80px,12vw,160px)',
                    color: `${slide.hex}08`, lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
                  }}>{slide.index}</div>

                  <div className="sfs-shimmer-el" style={{
                    position: 'relative', borderRadius: 24, overflow: 'hidden',
                    background: '#0a0c0e', border: `1px solid ${slide.hex}22`,
                    boxShadow: `0 32px 72px rgba(0,0,0,.65), 0 0 0 1px ${slide.hex}10, 0 0 60px ${slide.hex}18`,
                  }}>
                    <div className="sfs-scan-line" style={{
                      position: 'absolute', left: 0, right: 0, height: 2, zIndex: 10,
                      background: `linear-gradient(90deg,transparent,${slide.hex}bb,transparent)`,
                      boxShadow: `0 0 10px 3px ${slide.hex}55`,
                    }} />
                    {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h], ci) => (
                      <div key={ci} style={{
                        position: 'absolute', [v]: 14, [h]: 14, width: 18, height: 18, zIndex: 5,
                        borderTop:    v==='top'    ? `2px solid ${slide.hex}60` : 'none',
                        borderBottom: v==='bottom' ? `2px solid ${slide.hex}60` : 'none',
                        borderLeft:   h==='left'   ? `2px solid ${slide.hex}60` : 'none',
                        borderRight:  h==='right'  ? `2px solid ${slide.hex}60` : 'none',
                      }} />
                    ))}
                    <div style={{ aspectRatio: '16/10', position: 'relative', overflow: 'hidden' }}>
                      <img src={slide.image} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(.88)' }} />
                      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(6,7,8,.9) 0%, transparent 50%, rgba(0,0,0,.2) 100%)` }} />
                      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 80% 20%, ${slide.hex}18, transparent 60%)` }} />
                    </div>
                    <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${slide.hex}18` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <Icon size={14} color={slide.hex} />
                        <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: `${slide.hex}cc` }}>{slide.category}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 999, background: `${slide.hex}14`, border: `1px solid ${slide.hex}30` }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: slide.hex, display: 'inline-block' }} className="sfs-dot" />
                        <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 9, letterSpacing: '.2em', color: slide.hex }}>{slide.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="sfs-badge sfs-drift" style={{
                    position: 'absolute', bottom: -18, right: -16, zIndex: 20,
                    background: 'rgba(6,7,8,.95)', borderRadius: 16,
                    border: `1px solid ${slide.hex}30`, padding: '12px 16px',
                    backdropFilter: 'blur(16px)',
                    boxShadow: `0 16px 40px rgba(0,0,0,.5), 0 0 0 1px ${slide.hex}18`,
                    display: 'flex', alignItems: 'center', gap: 12, minWidth: 160,
                  }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: `${slide.hex}14`, border: `1px solid ${slide.hex}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={20} color={slide.hex} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: `${slide.hex}aa`, marginBottom: 3 }}>System Status</div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, color: '#fff', letterSpacing: '.06em', lineHeight: 1 }}>{slide.status}</div>
                    </div>
                    <Zap size={14} color={slide.hex} style={{ marginLeft: 'auto', opacity: .7 }} />
                  </div>
                </div>

                {/* Text side */}
                <div className="sfs-text-wrap" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px,1.4vh,18px)', overflow: 'hidden' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, width: 'fit-content', padding: '6px 14px', borderRadius: 999, background: `${slide.hex}10`, border: `1px solid ${slide.hex}30` }}>
                    <Icon size={12} color={slide.hex} />
                    <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: slide.hex, fontWeight: 700 }}>{slide.category}</span>
                  </div>
                  <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(36px,5vw,72px)', lineHeight: .9, letterSpacing: '-.01em', color: '#fff', margin: 0, whiteSpace: 'pre-line' }}>
                    {slide.title.split('\n')[0]}<br />
                    <span style={{ background: `linear-gradient(90deg,${slide.hex},${slide.hex}bb)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {slide.title.split('\n')[1]}
                    </span>
                  </h2>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(12px,1.2vw,15px)', color: 'rgba(255,255,255,.45)', lineHeight: 1.7, margin: 0, maxWidth: 460 }}>
                    {slide.description}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {slide.features.map((f, fi) => (
                      <FeatureRow key={fi} label={f.label} desc={f.desc} hex={slide.hex} i={fi} />
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                      <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 12, fontWeight: 600, color: slide.hex, letterSpacing: '.08em' }}>Learn more</span>
                      <ArrowRight size={14} color={slide.hex} />
                    </div>
                    <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,.12)' }} />
                    <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 11, color: 'rgba(255,255,255,.25)', letterSpacing: '.1em' }}>
                      {slide.index} / 0{slides.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: 'clamp(14px,2.5vh,24px)', left: '50%', transform: 'translateX(-50%)',
        zIndex: 30, display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'none',
      }}>
        <div style={{ height: 1, width: 32, background: 'rgba(255,255,255,.15)' }} />
        <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,.22)' }}>Scroll to explore</span>
        <div style={{ height: 1, width: 32, background: 'rgba(255,255,255,.15)' }} />
      </div>
    </section>
  );
}

/* ─── Root export ───────────────────────────────────────────────────────────── */
export default function SmartFeaturesSection() {
  return (
    <>
      <style>{STYLES}</style>
      <DesktopLayout />   {/* shown ≥ 768 px */}
      <MobileLayout />    {/* shown  < 768 px */}
    </>
  );
}