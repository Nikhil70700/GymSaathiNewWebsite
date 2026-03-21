import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Brain, Activity, LineChart, ScanFace,
  Megaphone, CreditCard, CheckCircle2,
  ArrowRight, Zap,
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
    image: "/assets/gym_erp.png",
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
    image: "/assets/ai_diet.png",
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
    image: "/assets/bca.png",
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
    image: "/assets/marketing.png",
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
    image: "/assets/pos.png",
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
    image: "/assets/biometric.png",
  },
];

/* ─── Styles ────────────────────────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Sora:wght@300;400;500;600;700&display=swap');

  @keyframes sfs-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.85)} }
  @keyframes sfs-scan  { 0%{top:-2px;opacity:.8} 100%{top:100%;opacity:0} }
  @keyframes sfs-drift { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-14px) rotate(4deg)} }
  @keyframes sfs-shimmer { 0%{transform:translateX(-100%) skewX(-15deg)} 100%{transform:translateX(300%) skewX(-15deg)} }
  @keyframes sfs-ring  { 0%{transform:scale(.6);opacity:.7} 100%{transform:scale(2);opacity:0} }

  .sfs-dot  { animation: sfs-pulse 1.5s ease-in-out infinite; }
  .sfs-scan-line { animation: sfs-scan 3.5s linear infinite; }
  .sfs-drift { animation: sfs-drift 5s ease-in-out infinite; }
  .sfs-shimmer-el::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.06) 50%,transparent 60%);
    animation: sfs-shimmer 3.5s ease-in-out infinite;
    pointer-events:none;
  }
`;

/* ─── Feature row ───────────────────────────────────────────────────────────── */
function FeatureRow({ label, desc, hex, i }: { label: string; desc: string; hex: string; i: number }) {
  return (
    <div style={{
      display: 'flex', gap: 14, alignItems: 'flex-start',
      padding: '12px 16px', borderRadius: 14,
      background: i % 2 === 0 ? 'rgba(255,255,255,.025)' : 'transparent',
      border: '1px solid rgba(255,255,255,.04)',
      transition: 'background .2s',
    }}>
      <div style={{
        flexShrink: 0, marginTop: 3,
        width: 20, height: 20, borderRadius: 6,
        background: `${hex}18`, border: `1px solid ${hex}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <CheckCircle2 size={11} color={hex} />
      </div>
      <div>
        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(11px,1vw,13px)', fontWeight: 700, color: '#fff', marginBottom: 2 }}>{label}</div>
        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(10px,.9vw,12px)', color: 'rgba(255,255,255,.42)', lineHeight: 1.5 }}>{desc}</div>
      </div>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────────────────── */
export default function SmartFeaturesSection() {
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

      // Image glides in from right
      gsap.fromTo(img,
        { x: 160, opacity: 0, rotateY: 8, scale: .93 },
        { x: 0,   opacity: 1, rotateY: 0, scale: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: panel, containerAnimation: scrollTween, start: "left 65%", end: "center center", scrub: 1 }
        }
      );

      // Text slides up
      gsap.fromTo(text,
        { y: 60, opacity: 0, filter: 'blur(8px)' },
        { y: 0,  opacity: 1, filter: 'blur(0px)',
          ease: "power3.out",
          scrollTrigger: { trigger: panel, containerAnimation: scrollTween, start: "left 50%", end: "center center", scrub: 1 }
        }
      );

      // Badge pops
      gsap.fromTo(badge,
        { scale: 0, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: panel, containerAnimation: scrollTween, start: "left 45%", end: "center center", scrub: 1 }
        }
      );

      // Index number fades
      gsap.fromTo(num,
        { opacity: 0, x: -20 },
        { opacity: 1,  x: 0,
          scrollTrigger: { trigger: panel, containerAnimation: scrollTween, start: "left 60%", end: "center center", scrub: 1 }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <>
      <style>{STYLES}</style>

      <section
        ref={containerRef}
        style={{ position: 'relative', height: '100dvh', overflow: 'hidden', background: '#060708', color: '#fff' }}
      >
        {/* ── Fixed top bar: label left | progress pills right ──────── */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 'clamp(48px,6vh,64px)',
          zIndex: 30, pointerEvents: 'none',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(20px,4vw,52px)',
          background: 'linear-gradient(180deg,rgba(6,7,8,.95) 0%,rgba(6,7,8,.6) 80%,transparent 100%)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(255,255,255,.05)',
        }}>
          {/* Left: section label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#f7931e', boxShadow: '0 0 8px #f7931e' }} className="sfs-dot" />
            <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(9px,.85vw,11px)', letterSpacing: '.35em', textTransform: 'uppercase', color: 'rgba(247,147,30,.7)', fontWeight: 600 }}>
              Smart Features
            </span>
            <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,.1)', margin: '0 4px' }} />
            <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.22)' }}>
              Platform Suite
            </span>
          </div>

          {/* Right: progress pills */}
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {slides.map((s) => (
              <div key={s.id} style={{
                width: 24, height: 3, borderRadius: 999,
                background: `rgba(255,255,255,.1)`,
                overflow: 'hidden', position: 'relative',
              }}>
                <div style={{ position: 'absolute', inset: 0, background: s.hex, borderRadius: 999, opacity: .7 }} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Slides track ─────────────────────────────────────────── */}
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
                  /* Top: clear the 48-64px header bar + extra breathing room
                     Bottom: clear the scroll hint strip (~40px)             */
                  padding: 'clamp(72px,9vh,96px) clamp(20px,5vw,64px) clamp(40px,5vh,56px)',
                  position: 'relative',
                  boxSizing: 'border-box',
                }}
              >
                {/* Per-slide background glow */}
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: `radial-gradient(ellipse at 50% 60%, ${slide.hex}10 0%, transparent 65%)`,
                }} />
                {/* Subtle grid */}
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none', opacity: .025,
                  backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
                  backgroundSize: '52px 52px',
                }} />

                {/* ── Main two-column grid ── */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
                  gap: 'clamp(24px,4vw,64px)',
                  maxWidth: 1200, width: '100%',
                  alignItems: 'center',
                  position: 'relative', zIndex: 10,
                  height: '100%',
                  overflow: 'hidden',
                }}>

                  {/* ── LEFT: Image ──────────────────────────────────── */}
                  <div className="sfs-img-wrap" style={{ position: 'relative' }}>

                    {/* Slide index number — background watermark */}
                    <div className="sfs-num" style={{
                      position: 'absolute', top: -10, left: -8, zIndex: 0,
                      fontFamily: "'Bebas Neue',sans-serif",
                      fontSize: 'clamp(80px,12vw,160px)',
                      color: `${slide.hex}08`,
                      lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
                    }}>{slide.index}</div>

                    {/* Image card */}
                    <div
                      className="sfs-shimmer-el"
                      style={{
                        position: 'relative', borderRadius: 24, overflow: 'hidden',
                        background: '#0a0c0e',
                        border: `1px solid ${slide.hex}22`,
                        boxShadow: `0 32px 72px rgba(0,0,0,.65), 0 0 0 1px ${slide.hex}10, 0 0 60px ${slide.hex}18`,
                      }}
                    >
                      {/* Scan line */}
                      <div className="sfs-scan-line" style={{
                        position: 'absolute', left: 0, right: 0, height: 2, zIndex: 10,
                        background: `linear-gradient(90deg,transparent,${slide.hex}bb,transparent)`,
                        boxShadow: `0 0 10px 3px ${slide.hex}55`,
                      }} />

                      {/* HUD corners */}
                      {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h], ci) => (
                        <div key={ci} style={{
                          position: 'absolute', [v]: 14, [h]: 14,
                          width: 18, height: 18, zIndex: 5,
                          borderTop:    v==='top'    ? `2px solid ${slide.hex}60` : 'none',
                          borderBottom: v==='bottom' ? `2px solid ${slide.hex}60` : 'none',
                          borderLeft:   h==='left'   ? `2px solid ${slide.hex}60` : 'none',
                          borderRight:  h==='right'  ? `2px solid ${slide.hex}60` : 'none',
                        }} />
                      ))}

                      <div style={{ aspectRatio: '16/10', position: 'relative', overflow: 'hidden' }}>
                        <img
                          src={slide.image}
                          alt={slide.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(.88)' }}
                        />
                        {/* Gradient overlay at bottom */}
                        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(6,7,8,.9) 0%, transparent 50%, rgba(0,0,0,.2) 100%)` }} />
                        {/* Side glow from slide color */}
                        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 80% 20%, ${slide.hex}18, transparent 60%)` }} />
                      </div>

                      {/* In-card footer */}
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

                    {/* Floating badge — bottom right */}
                    <div className="sfs-badge sfs-drift" style={{
                      position: 'absolute', bottom: -18, right: -16, zIndex: 20,
                      background: 'rgba(6,7,8,.95)', borderRadius: 16,
                      border: `1px solid ${slide.hex}30`,
                      padding: '12px 16px',
                      backdropFilter: 'blur(16px)',
                      boxShadow: `0 16px 40px rgba(0,0,0,.5), 0 0 0 1px ${slide.hex}18`,
                      display: 'flex', alignItems: 'center', gap: 12,
                      minWidth: 160,
                    }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                        background: `${slide.hex}14`, border: `1px solid ${slide.hex}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={20} color={slide.hex} />
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: `${slide.hex}aa`, marginBottom: 3 }}>System Status</div>
                        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, color: '#fff', letterSpacing: '.06em', lineHeight: 1 }}>{slide.status}</div>
                      </div>
                      <Zap size={14} color={slide.hex} style={{ marginLeft: 'auto', opacity: .7 }} />
                    </div>
                  </div>

                  {/* ── RIGHT: Text ──────────────────────────────────── */}
                  <div className="sfs-text-wrap" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px,1.4vh,18px)', overflow: 'hidden' }}>

                    {/* Category chip */}
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8, width: 'fit-content',
                      padding: '6px 14px', borderRadius: 999,
                      background: `${slide.hex}10`, border: `1px solid ${slide.hex}30`,
                    }}>
                      <Icon size={12} color={slide.hex} />
                      <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: slide.hex, fontWeight: 700 }}>{slide.category}</span>
                    </div>

                    {/* Title */}
                    <h2 style={{
                      fontFamily: "'Bebas Neue',sans-serif",
                      fontSize: 'clamp(36px,5vw,72px)',
                      lineHeight: .9, letterSpacing: '-.01em',
                      color: '#fff', margin: 0,
                      whiteSpace: 'pre-line',
                    }}>
                      {slide.title.split('\n')[0]}<br />
                      <span style={{ background: `linear-gradient(90deg,${slide.hex},${slide.hex}bb)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {slide.title.split('\n')[1]}
                      </span>
                    </h2>

                    {/* Description */}
                    <p style={{
                      fontFamily: "'Sora',sans-serif",
                      fontSize: 'clamp(12px,1.2vw,15px)',
                      color: 'rgba(255,255,255,.45)', lineHeight: 1.7, margin: 0,
                      maxWidth: 460,
                    }}>
                      {slide.description}
                    </p>

                    {/* Feature list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {slide.features.map((f, fi) => (
                        <FeatureRow key={fi} label={f.label} desc={f.desc} hex={slide.hex} i={fi} />
                      ))}
                    </div>

                    {/* CTA row */}
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

        {/* ── Bottom scroll hint ────────────────────────────────────── */}
        <div style={{
          position: 'absolute', bottom: 'clamp(14px,2.5vh,24px)', left: '50%', transform: 'translateX(-50%)',
          zIndex: 30, display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'none',
        }}>
          <div style={{ height: 1, width: 32, background: 'rgba(255,255,255,.15)' }} />
          <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,.22)' }}>
            Scroll to explore
          </span>
          <div style={{ height: 1, width: 32, background: 'rgba(255,255,255,.15)' }} />
        </div>

      </section>
    </>
  );
}