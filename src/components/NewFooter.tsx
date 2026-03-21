import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';

/* ─── useBreakpoint hook ─────────────────────────────────────────────────────── */
function useBreakpoint() {
  const [bp, setBp] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setBp(w < 640 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop');
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);
  return bp;
}

/* ─── Glow Orb ───────────────────────────────────────────────────────────────── */
function GlowOrb({ x, y, size, opacity, color }: {
  x: string; y: string; size: number; opacity: number; color: string;
}) {
  return (
    <motion.div
      style={{
        position: 'absolute', left: x, top: y,
        width: size, height: size, borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity, filter: 'blur(60px)', transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
      animate={{ scale: [1, 1.2, 1], opacity: [opacity, opacity * 0.7, opacity] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ─── Particle ───────────────────────────────────────────────────────────────── */
function Particle({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div
      style={{
        position: 'absolute', left: `${x}%`, bottom: 0,
        width: 2, height: 2, borderRadius: '50%',
        background: '#f7931e', opacity: 0,
      }}
      animate={{ y: [0, -140, -220], opacity: [0, 0.5, 0], scale: [0.5, 1, 0.3] }}
      transition={{ duration: 4 + (x % 3), delay, repeat: Infinity, ease: 'easeOut' }}
    />
  );
}

/* ─── Footer Link ────────────────────────────────────────────────────────────── */
function FooterLink({ href, label, index }: { href: string; label: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ x: 6 }}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', cursor: 'pointer' }}
    >
      <motion.span
        style={{ color: '#f7931e', fontSize: 10, lineHeight: 1 }}
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -4 }}
        transition={{ duration: 0.2 }}
      >▶</motion.span>
      <span style={{
        position: 'relative',
        fontFamily: "'Barlow', sans-serif",
        fontSize: 14,
        color: hovered ? '#f7931e' : '#8a8a8a',
        letterSpacing: '0.03em',
        transition: 'color 0.2s',
      }}>
        {label}
        <motion.span
          style={{
            position: 'absolute', bottom: -2, left: 0,
            height: 1,
            background: 'linear-gradient(90deg,#f7931e,#ff6b35)',
            transformOrigin: 'left', scaleX: 0, display: 'block',
          }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>
    </motion.a>
  );
}

/* ─── Social Icons ───────────────────────────────────────────────────────────── */
const socialData = [
  {
    name: 'Instagram',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    name: 'X / Twitter',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

function SocialIcon({ name, icon, index }: { name: string; icon: React.ReactNode; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href="#" aria-label={name}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.12, y: -3 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative', width: 44, height: 44, borderRadius: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', overflow: 'hidden', flexShrink: 0,
        border: hovered ? '1px solid rgba(247,147,30,0.6)' : '1px solid rgba(247,147,30,0.15)',
        background: hovered ? 'rgba(247,147,30,0.08)' : 'rgba(247,147,30,0.03)',
        boxShadow: hovered ? '0 0 16px rgba(247,147,30,0.4)' : 'none',
        transition: 'border 0.25s, background 0.25s, box-shadow 0.25s',
      }}
    >
      <motion.span
        animate={{ color: hovered ? '#f7931e' : '#8a8a8a' }}
        transition={{ duration: 0.2 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {icon}
      </motion.span>
    </motion.a>
  );
}

/* ─── Newsletter ─────────────────────────────────────────────────────────────── */
function NewsletterInput() {
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const submit = () => {
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail('');
    }
  };

  return (
    <div style={{ marginTop: 28 }}>
      <p style={{
        fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
        color: '#8a8a8a', fontSize: 11, textTransform: 'uppercase',
        letterSpacing: '2px', marginBottom: 10,
      }}>
        Stay Updated
      </p>
      <div style={{
        display: 'flex', alignItems: 'center', borderRadius: 12, overflow: 'hidden',
        border: focused ? '1px solid rgba(247,147,30,0.6)' : '1px solid rgba(247,147,30,0.15)',
        boxShadow: focused ? '0 0 20px rgba(247,147,30,0.15)' : 'none',
        background: 'rgba(255,255,255,0.03)', transition: 'border 0.3s, box-shadow 0.3s',
      }}>
        <input
          type="email" value={email}
          onChange={e => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="your@email.com"
          style={{
            flex: 1, background: 'transparent', padding: '12px 16px',
            fontSize: 13, color: '#f5f5f5', outline: 'none',
            fontFamily: "'Barlow', sans-serif", minWidth: 0,
          }}
        />
        <motion.button
          onClick={submit}
          whileHover={{ backgroundColor: 'rgba(247,147,30,0.12)' }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '12px 16px', fontSize: 12,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, letterSpacing: '.12em',
            color: '#f7931e', background: 'transparent',
            border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
          }}
        >
          <AnimatePresence mode="wait">
            {submitted
              ? (
                <motion.span
                  key="d"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  style={{ color: '#4ade80', display: 'block' }}
                >✓ Done</motion.span>
              ) : (
                <motion.span
                  key="j"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  style={{ display: 'block' }}
                >Join →</motion.span>
              )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}

/* ─── Section Header ─────────────────────────────────────────────────────────── */
function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <motion.h4
      initial={{ opacity: 0, y: -8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 11, textTransform: 'uppercase', letterSpacing: '3px',
        color: '#f7931e', marginBottom: 22, marginTop: 0,
        display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700,
      }}
    >
      <span style={{
        width: 18, height: 1, background: '#f7931e',
        opacity: 0.6, flexShrink: 0, display: 'inline-block',
      }} />
      {children}
    </motion.h4>
  );
}

/* ─── Animated Divider ───────────────────────────────────────────────────────── */
function AnimatedDivider() {
  return (
    <div style={{
      position: 'relative', height: 1, width: '100%',
      background: 'rgba(247,147,30,0.08)', overflow: 'hidden',
    }}>
      <motion.div
        style={{
          position: 'absolute', top: 0, bottom: 0, width: '40%',
          background: 'linear-gradient(90deg, transparent, rgba(247,147,30,0.5), transparent)',
        }}
        animate={{ x: ['-100%', '350%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
      />
    </div>
  );
}

/* ─── Animated Logo ──────────────────────────────────────────────────────────── */
function AnimatedLogo({ isInView, isMobile }: { isInView: boolean; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);

  // Orbit dot colors
  const dotColors = ['#f7931e', '#ffb347', '#ff6b35'];

  return (
    <>
      <style>{`
        @keyframes ft-scan {
          0%   { left: -60%; opacity: .9; }
          100% { left: 130%; opacity: 0;  }
        }
        input::placeholder { color: #444; }
      `}</style>

      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{ position: 'relative', width: 'fit-content', marginBottom: 24, cursor: 'default' }}
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >

        {/* ── Layer 1: outer slow-spinning dashed ring ── */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: isMobile ? 80 : 96,
            height: isMobile ? 80 : 96,
            marginLeft: isMobile ? -40 : -48,
            marginTop: isMobile ? -40 : -48,
            borderRadius: '50%',
            border: '1px dashed rgba(247,147,30,.25)',
            pointerEvents: 'none',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />

        {/* ── Layer 2: inner reverse-spinning ring ── */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: isMobile ? 60 : 72,
            height: isMobile ? 60 : 72,
            marginLeft: isMobile ? -30 : -36,
            marginTop: isMobile ? -30 : -36,
            borderRadius: '50%',
            border: '1px solid rgba(247,147,30,.12)',
            pointerEvents: 'none',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />

        {/* ── Layer 3: pulsing glow blob behind logo ── */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%', left: 0,
            translateY: '-50%',
            width: isMobile ? 160 : 200,
            height: isMobile ? 50 : 62,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(247,147,30,.18) 0%, transparent 70%)',
            filter: 'blur(14px)',
            pointerEvents: 'none',
          }}
          animate={{
            opacity: hovered ? [0.6, 1, 0.6] : [0.3, 0.55, 0.3],
            scaleX:  hovered ? [1, 1.15, 1]  : [1, 1.08, 1],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── Layer 4: 3 orbiting dots ── */}
        {/* FIX: removed duplicate style prop — only one style object per motion.div */}
        {[0, 120, 240].map((deg, i) => (
          <motion.div
            key={`orbit-${i}`}
            initial={{ rotate: deg }}
            animate={{ rotate: deg + 360 }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.4,
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: isMobile ? 22 : 26,
              width: 5, height: 5,
              borderRadius: '50%',
              background: dotColors[i],
              boxShadow: `0 0 8px ${dotColors[i]}`,
              pointerEvents: 'none',
              marginTop: -2.5,
              originX: '0px',
              originY: '2.5px',
            }}
          />
        ))}

        {/* ── Layer 5: logo image — float + hover glow via CSS transition ── */}
        <motion.div
          style={{ position: 'relative', zIndex: 2 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/*
            FIX: Removed animate={{ filter: ... }} entirely.
            Framer Motion cannot interpolate between two CSS filter functions
            (drop-shadow + brightness) in a keyframe — it throws a console warning.
            Instead we use style + CSS transition which handles multi-function
            filters perfectly.
          */}
          <img
            src="src/assets/GymsaathiLogo.png"
            alt="GymSaathi — Your digital partner in fitness growth"
            style={{
              height: isMobile ? 44 : 56,
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              mixBlendMode: 'screen' as const,
              position: 'relative',
              zIndex: 2,
              // CSS transition handles multi-function filter smoothly — no Framer Motion needed
              filter: hovered
                ? 'drop-shadow(0 0 22px rgba(247,147,30,.75)) brightness(1.08)'
                : 'drop-shadow(0 0 6px rgba(247,147,30,.18)) brightness(1)',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'filter 0.35s ease, transform 0.25s ease',
            }}
          />

          {/* ── Layer 6: shimmer scan line over the image ── */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0, bottom: 0,
              width: '45%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent)',
              borderRadius: 4,
              pointerEvents: 'none',
              zIndex: 3,
            }}
            animate={{ x: ['-60%', '200%'] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 3.5,
            }}
          />
        </motion.div>

        {/* ── Layer 7: fire particles rising from logo bottom ── */}
        {isInView && [0, 1, 2, 3].map(i => (
          <motion.div
            key={`fire-${i}`}
            style={{
              position: 'absolute',
              bottom: -2,
              left: `${22 + i * 8}%`,
              width: 3, height: 3, borderRadius: '50%',
              background: i % 2 === 0 ? '#f7931e' : '#ffaa35',
              boxShadow: `0 0 5px ${i % 2 === 0 ? '#f7931e' : '#ffaa35'}`,
              pointerEvents: 'none', zIndex: 4,
            }}
            animate={{ y: [0, -24 - i * 4], opacity: [0.9, 0], scale: [1, 0.3] }}
            transition={{
              duration: 1.2 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.35,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* ── Layer 8: HUD corner brackets — appear on hover ── */}
        {([
          { top: -4,    left: -4,    bt: true,  bl: true  },
          { top: -4,    right: -4,   bt: true,  br: true  },
          { bottom: -4, left: -4,    bb: true,  bl: true  },
          { bottom: -4, right: -4,   bb: true,  br: true  },
        ] as const).map((c, i) => (
          <motion.div
            key={`hud-${i}`}
            style={{
              position: 'absolute',
              width: 10, height: 10,
              top:    ('top'    in c) ? c.top    : undefined,
              bottom: ('bottom' in c) ? c.bottom : undefined,
              left:   ('left'   in c) ? c.left   : undefined,
              right:  ('right'  in c) ? c.right  : undefined,
              borderTop:    ('bt' in c && c.bt) ? '1.5px solid #f7931e' : 'none',
              borderBottom: ('bb' in c && c.bb) ? '1.5px solid #f7931e' : 'none',
              borderLeft:   ('bl' in c && c.bl) ? '1.5px solid #f7931e' : 'none',
              borderRight:  ('br' in c && c.br) ? '1.5px solid #f7931e' : 'none',
              pointerEvents: 'none', zIndex: 5,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: hovered ? 0.9 : 0, scale: hovered ? 1 : 0.6 }}
            transition={{ duration: 0.3, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

      </motion.div>
    </>
  );
}

/* ─── Main Footer ────────────────────────────────────────────────────────────── */
export default function NewFooter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const bp = useBreakpoint();

  const isMobile  = bp === 'mobile';
  const isTablet  = bp === 'tablet';
  const isDesktop = bp === 'desktop';

  const productLinks = [
    { label: 'Gym Partners', href: '#gym-owners' },
    { label: 'Gym Members',  href: '#members'    },
    { label: 'Pricing',      href: '#'           },
    { label: 'Features',     href: '#'           },
  ];
  const companyLinks = [
    { label: 'About Us',   href: '#' },
    { label: 'Resources',  href: '#resources' },
    { label: 'Blog',       href: '#' },
    { label: 'Contact',    href: '#' },
  ];
  const supportLinks = [
    { label: 'Help Center',     href: '#' },
    { label: 'FAQs',            href: '#' },
    { label: 'Privacy Policy',  href: '#' },
    { label: 'Terms of Service', href: '#' },
  ];

  const particles = [8, 17, 26, 35, 44, 53, 62, 71, 80, 89, 14, 47];

  const outerPadding = isMobile ? '48px 20px' : isTablet ? '64px 32px' : '80px 48px';

  const mainGridStyle: React.CSSProperties = {
    display: 'grid',
    gap: isMobile ? 40 : isTablet ? 40 : 48,
    marginBottom: isMobile ? 40 : 56,
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '5fr 1px 7fr',
    alignItems: 'start',
  };

  const linksGridStyle: React.CSSProperties = {
    display: 'grid',
    gap: isMobile ? 32 : 24,
    gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr',
    gridColumn: isDesktop ? '3' : '1',
  };

  const statsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr',
    gap: isMobile ? 16 : 24,
    marginBottom: isMobile ? 40 : 48,
    padding: isMobile ? '20px 16px' : '24px 32px',
    borderRadius: 16,
    border: '1px solid rgba(247,147,30,0.1)',
    background: 'rgba(247,147,30,0.03)',
  };

  const bottomBarStyle: React.CSSProperties = {
    paddingTop: 24,
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: isMobile ? 16 : 12,
    textAlign: isMobile ? 'center' : 'left',
  };

  return (
    <motion.footer
      ref={ref}
      style={{ position: 'relative', overflow: 'hidden', background: '#111111' }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Background atmosphere */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <GlowOrb x="8%"  y="40%" size={420} opacity={0.04}  color="rgba(247,147,30,1)" />
        <GlowOrb x="88%" y="55%" size={340} opacity={0.03}  color="rgba(255,107,53,1)" />
        <GlowOrb x="50%" y="5%"  size={300} opacity={0.025} color="rgba(247,147,30,1)" />
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.025,
          backgroundImage: 'linear-gradient(rgba(247,147,30,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(247,147,30,0.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        {particles.map((x, i) => <Particle key={i} delay={i * 0.5} x={x} />)}
      </div>

      {/* Top accent bar */}
      <div style={{
        position: 'relative', height: 2,
        background: 'linear-gradient(90deg, transparent 0%, rgba(247,147,30,0.2) 20%, rgba(247,147,30,0.8) 50%, rgba(247,147,30,0.2) 80%, transparent 100%)',
        overflow: 'hidden',
      }}>
        <motion.div
          style={{
            position: 'absolute', inset: 0, width: '30%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)',
          }}
          animate={{ x: ['-100%', '450%'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
        />
      </div>

      {/* Content wrapper */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: outerPadding }}>

        {/* Main Grid */}
        <div style={mainGridStyle}>

          {/* Brand Block */}
          <motion.div
            style={{ gridColumn: isDesktop ? '1' : '1' }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Animated Logo */}
            <AnimatedLogo isInView={isInView} isMobile={isMobile} />

            {/* Tagline */}
            <motion.p
              style={{
                fontFamily: "'Barlow', sans-serif", color: '#666',
                fontSize: 13, lineHeight: 1.7, maxWidth: 280, marginBottom: 24, marginTop: 0,
              }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Your digital partner in fitness growth — connecting gyms, trainers, and members.
            </motion.p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {socialData.map((s, i) => (
                <SocialIcon key={s.name} name={s.name} icon={s.icon} index={i} />
              ))}
            </div>

            {/* Newsletter */}
            <NewsletterInput />
          </motion.div>

          {/* Vertical divider (desktop only) */}
          {isDesktop && (
            <div style={{
              width: 1,
              background: 'linear-gradient(to bottom, transparent, rgba(247,147,30,0.15) 30%, rgba(247,147,30,0.15) 70%, transparent)',
              alignSelf: 'stretch',
              gridColumn: '2',
            }} />
          )}

          {/* Links Grid */}
          <div style={linksGridStyle}>
            {[
              { title: 'Product', links: productLinks },
              { title: 'Company', links: companyLinks },
              { title: 'Support', links: supportLinks },
            ].map(({ title, links }, groupIdx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + groupIdx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <SectionHeader>{title}</SectionHeader>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {links.map((link, i) => (
                    <li key={i}><FooterLink href={link.href} label={link.label} index={i} /></li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          style={statsGridStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {[
            { value: '10K+', label: 'Active Members' },
            { value: '107+', label: 'Gym Partners'   },
            { value: '50+',  label: 'Cities'         },
            { value: '4.9★', label: 'App Rating'     },
          ].map((stat, i) => (
            <motion.div
              key={i}
              style={{ textAlign: 'center' }}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.55 + i * 0.08 }}
            >
              <div style={{
                fontFamily: 'font-heading, sans-serif',
                fontWeight: 700,
                fontSize: isMobile ? 22 : 26,
                background: 'linear-gradient(90deg,#f7931e,#ff6b35)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600, fontSize: 11, color: '#555',
                letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 4,
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <AnimatedDivider />

        {/* Bottom Bar */}
        <motion.div
          style={bottomBarStyle}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p style={{ fontFamily: "'Barlow', sans-serif", color: '#444', fontSize: 13, margin: 0 }}>
            © 2025 GymSaathi. All rights reserved.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {['Privacy', 'Terms', 'Cookies'].map((item, i) => (
              <motion.a
                key={i} href="#"
                whileHover={{ y: -1 }}
                style={{
                  fontFamily: "'Barlow', sans-serif", color: '#444',
                  fontSize: 12, textDecoration: 'none',
                  letterSpacing: '0.04em', transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f7931e')}
                onMouseLeave={e => (e.currentTarget.style.color = '#444')}
              >{item}</motion.a>
            ))}
          </div>

          <motion.div
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', borderRadius: 999,
              border: '1px solid rgba(247,147,30,0.15)',
              background: 'rgba(247,147,30,0.05)',
            }}
            whileHover={{ scale: 1.04 }}
          >
            <motion.span
              animate={{ scale: [1, 1.35, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ color: '#f7931e', fontSize: 13 }}
            >♥</motion.span>
            <span style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 11, color: '#555', letterSpacing: '0.06em',
            }}>Made in India</span>
          </motion.div>
        </motion.div>

      </div>
    </motion.footer>
  );
}