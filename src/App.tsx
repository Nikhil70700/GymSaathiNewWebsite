import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useAnimation, AnimatePresence } from 'motion/react';
import svgPaths from "./imports/svg-doiac9s0jm";
import ForGymOwners from './pages/ForGymOwners';
import GymMembers from './pages/GymMembers';
import Resources from './pages/Resources';
import NewFooter from './components/NewFooter';
import SmartFeaturesSection from './components/SmartFeaturesSection';
import TransformationSection from './components/TransformationSection';
import BioPerformanceDashboard from './components/BioPerformanceDashboard';
import StoryModeSection from './components/StoryModeSection';

// Navbar Component
function Navbar({ currentPage, onNavigate }: { currentPage: string; onNavigate: (page: string) => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  const navLinks = [
    { label: 'Gym Partners', page: 'gym-owners' },
    { label: 'Gym Members', page: 'members'    },
    { label: 'Resources',   page: 'resources'  },
  ];

  const NAV_H_SCROLLED = 64;
  const NAV_H_TOP      = 80;
  const navH = isScrolled ? NAV_H_SCROLLED : NAV_H_TOP;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600&display=swap');

        @keyframes nb-glow-pulse {
          0%,100% { box-shadow: 0 0 16px rgba(247,147,30,.35), 0 4px 20px rgba(0,0,0,.4); }
          50%      { box-shadow: 0 0 32px rgba(247,147,30,.7),  0 4px 28px rgba(0,0,0,.5); }
        }
        @keyframes nb-shimmer {
          0%   { transform: translateX(-110%) skewX(-14deg); }
          100% { transform: translateX(310%)  skewX(-14deg); }
        }
        @keyframes nb-dot-pulse {
          0%,100% { opacity:.45; transform:scale(1);   }
          50%     { opacity:1;   transform:scale(1.5); }
        }

        .nb-cta-btn {
          position: relative;
          overflow: hidden;
          animation: nb-glow-pulse 3s ease-in-out infinite;
        }
        .nb-cta-btn::after {
          content: '';
          position: absolute; inset: 0; border-radius: inherit;
          background: linear-gradient(105deg, transparent 36%, rgba(255,255,255,.22) 50%, transparent 64%);
          animation: nb-shimmer 3.5s ease-in-out infinite;
          pointer-events: none;
        }

        .nb-link {
          position: relative;
          background: none; border: none; cursor: pointer;
          transition: color .2s;
        }
        .nb-link::after {
          content: '';
          position: absolute; bottom: -3px; left: 0;
          height: 2px; width: 0; border-radius: 1px;
          background: linear-gradient(90deg, #f7931e, rgba(247,147,30,.4));
          transition: width .28s cubic-bezier(.22,1,.36,1);
        }
        .nb-link:hover::after  { width: 100%; }
        .nb-link.active::after { width: 100%; }
        .nb-link.active        { color: #f7931e !important; }
        .nb-link.active {
          background: rgba(247,147,30,.08) !important;
          border-color: rgba(247,147,30,.22) !important;
        }

        .nb-mobile-item {
          width: 100%; background: none; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: space-between;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,.06) !important;
          transition: border-color .2s, background .2s, color .2s;
        }
        .nb-mobile-item:hover {
          background: rgba(247,147,30,.06) !important;
          border-color: rgba(247,147,30,.2) !important;
        }
        .nb-mobile-item.active {
          background: rgba(247,147,30,.08) !important;
          border-color: rgba(247,147,30,.28) !important;
          color: #f7931e !important;
        }

        @media (max-width: 900px) {
          .nb-desktop-links { display: none !important; }
          .nb-desktop-right { display: none !important; }
          .nb-mobile-toggle { display: flex !important; }
        }
        @media (min-width: 901px) {
          .nb-mobile-toggle { display: none !important; }
          .nb-mobile-drawer { display: none !important; }
        }
      `}</style>

      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 1000,
          height: navH,
          transition: 'height .35s cubic-bezier(.22,1,.36,1)',
        }}
      >
        {/* Glass background */}
        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          animate={{
            backgroundColor: isScrolled ? 'rgba(8,8,8,.94)' : 'rgba(8,8,8,.0)',
            backdropFilter: isScrolled ? 'blur(20px) saturate(1.4)' : 'blur(0px)',
          }}
          transition={{ duration: .35, ease: [.22,1,.36,1] as const }}
        />

        {/* Bottom border */}
        <motion.div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg,transparent 0%,rgba(247,147,30,.55) 30%,rgba(247,147,30,.85) 50%,rgba(247,147,30,.55) 70%,transparent 100%)',
          }}
          animate={{ opacity: isScrolled ? 1 : 0 }}
          transition={{ duration: .35 }}
        />

        {/* Main row */}
        <div style={{
          position: 'relative', height: '100%',
          maxWidth: 1300, margin: '0 auto',
          padding: '0 clamp(16px,4vw,48px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 24,
        }}>

          {/* ── LOGO — image replaces text ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .6, delay: .15 }}
            onClick={() => onNavigate('home')}
            style={{ cursor: 'pointer', flexShrink: 0 }}
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: .97 }}
            >
              <img
                src="src/assets/GymsaathiLogo.png"
                alt="GymSaathi — Your digital partner in fitness growth"
                style={{
                  height: 'clamp(36px,4.5vw,52px)',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  mixBlendMode: 'screen' as const,
                }}
              />
            </motion.div>
          </motion.div>

          {/* Desktop nav links */}
          <motion.div
            className="nb-desktop-links"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .6, delay: .25 }}
            style={{ display: 'flex', alignItems: 'center', gap: 'clamp(2px,.8vw,6px)', flex: 1, justifyContent: 'center' }}
          >
            {navLinks.map((link, i) => {
              const isActive = currentPage === link.page;
              return (
                <NavLink
                  key={link.label}
                  page={link.page}
                  delay={0.35 + i * 0.08}
                  onClick={() => onNavigate(link.page)}
                  isActive={isActive}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </motion.div>

          {/* Desktop right CTAs */}
          <motion.div
            className="nb-desktop-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .6, delay: .45 }}
            style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px,1.4vw,20px)', flexShrink: 0 }}
          >
            <motion.a
              href="#login"
              className="nb-link"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 500,
                fontSize: 'clamp(12px,1.1vw,14px)',
                color: 'rgba(255,255,255,.48)',
                textDecoration: 'none',
                padding: '6px 2px',
                letterSpacing: '.01em',
                whiteSpace: 'nowrap',
              }}
              whileHover={{ color: '#f5f5f5' } as any}
              transition={{ duration: .15 }}
            >
              Partner Login
            </motion.a>

            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: .5, delay: .65 }}
              style={{ width: 1, height: 20, background: 'rgba(247,147,30,.22)', borderRadius: 1, flexShrink: 0 }}
            />

            <motion.button
              className="nb-cta-btn"
              whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
              whileTap={{ scale: .96 }}
              transition={{ duration: .18 }}
              style={{
                background: 'linear-gradient(135deg, #f7931e, #c55a00)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                borderRadius: 999,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(11px,1.1vw,13px)',
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                padding: 'clamp(8px,1.2vh,11px) clamp(18px,2vw,26px)',
                whiteSpace: 'nowrap',
              }}
            >
              Get Free Demo
            </motion.button>
          </motion.div>

          {/* Mobile hamburger */}
          <motion.button
            className="nb-mobile-toggle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .6, delay: .45 }}
            whileTap={{ scale: .92 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'none',
              alignItems: 'center', justifyContent: 'center',
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: isMobileMenuOpen ? 'rgba(247,147,30,.15)' : 'rgba(247,147,30,.08)',
              border: `1px solid ${isMobileMenuOpen ? 'rgba(247,147,30,.45)' : 'rgba(247,147,30,.22)'}`,
              cursor: 'pointer',
              transition: 'background .25s, border-color .25s',
            }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: .15 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 2l12 12M14 2L2 14" stroke="#f7931e" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: .15 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 5, width: 18 }}
                >
                  {[100, 70, 100].map((w, i) => (
                    <div key={i} style={{ height: 2, width: `${w}%`, background: '#f7931e', borderRadius: 2 }} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="nb-mobile-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: .3, ease: [.22,1,.36,1] as const }}
              style={{
                overflow: 'hidden',
                background: 'rgba(8,8,8,.97)',
                backdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(247,147,30,.12)',
              }}
            >
              <div style={{ padding: 'clamp(14px,2.5vw,20px) clamp(16px,4vw,32px) clamp(16px,2.5vw,22px)' }}>

                {/* Mobile logo (smaller) */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'clamp(12px,2vh,18px)', paddingBottom: 'clamp(12px,2vh,16px)', borderBottom: '1px solid rgba(247,147,30,.1)' }}>
                  <img
                    src="src/assets/GymsaathiLogo.png"
                    alt="GymSaathi"
                    style={{
                      height: 'clamp(28px,8vw,40px)',
                      width: 'auto',
                      objectFit: 'contain',
                      mixBlendMode: 'screen' as const,
                    }}
                  />
                </div>

                {/* Nav links */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                  {navLinks.map((link, i) => {
                    const isActive = currentPage === link.page;
                    return (
                      <motion.button
                        key={link.label}
                        className={`nb-mobile-item${isActive ? ' active' : ''}`}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: .22, delay: i * .055 }}
                        whileTap={{ scale: .98 }}
                        onClick={() => { setIsMobileMenuOpen(false); onNavigate(link.page); }}
                        style={{
                          padding: 'clamp(12px,2vh,15px) clamp(14px,3vw,18px)',
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 700,
                          fontSize: 'clamp(14px,4vw,16px)',
                          letterSpacing: '.06em',
                          textTransform: 'uppercase',
                          color: isActive ? '#f7931e' : 'rgba(245,245,245,.75)',
                          textAlign: 'left',
                        }}
                      >
                        {link.label}
                        {isActive && (
                          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#f7931e', boxShadow: '0 0 8px #f7931e', animation: 'nb-dot-pulse 1.9s ease-in-out infinite' }} />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(247,147,30,.2),transparent)', margin: '4px 0 14px' }} />

                {/* CTA row */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <motion.a
                    href="#login"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .22, delay: .2 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      flex: 1,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: 'clamp(12px,3.5vw,14px)',
                      letterSpacing: '.16em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,.58)',
                      padding: 'clamp(11px,2vh,14px) 0',
                      textDecoration: 'none',
                      textAlign: 'center',
                      borderRadius: 999,
                      border: '1px solid rgba(255,255,255,.14)',
                      background: 'rgba(255,255,255,.03)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    Partner Login
                  </motion.a>

                  <motion.button
                    className="nb-cta-btn"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .22, delay: .27 }}
                    whileTap={{ scale: .97 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      flex: 1,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                      fontSize: 'clamp(12px,3.5vw,14px)',
                      letterSpacing: '.16em',
                      textTransform: 'uppercase',
                      color: '#fff',
                      padding: 'clamp(11px,2vh,14px) 0',
                      borderRadius: 999,
                      border: 'none',
                      cursor: 'pointer',
                      background: 'linear-gradient(135deg,#f7931e,#c55a00)',
                    }}
                  >
                    Get Free Demo
                  </motion.button>
                </div>

                {/* Trust line */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: .35 }}
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 'clamp(9px,2.5vw,11px)',
                    color: 'rgba(255,255,255,.2)',
                    textAlign: 'center',
                    marginTop: 14,
                    letterSpacing: '.1em',
                  }}
                >
                  107+ Gyms &nbsp;·&nbsp; 14,743+ Members &nbsp;·&nbsp; Zero Setup Cost
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

// Nav Link Component
function NavLink({
  page,
  children,
  delay = 0,
  onClick,
  isActive = false,
}: {
  page: string;
  children: React.ReactNode;
  delay?: number;
  onClick?: () => void;
  isActive?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`nb-link${isActive ? ' active' : ''}`}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .5, delay }}
      whileHover={{ color: '#f5f5f5' } as any}
      style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(12px,1.15vw,14px)',
        letterSpacing: '.12em',
        textTransform: 'uppercase',
        color: isActive ? '#f7931e' : 'rgba(255,255,255,.6)',
        padding: 'clamp(6px,1vh,8px) clamp(10px,1.3vw,14px)',
        borderRadius: 8,
        border: '1px solid transparent',
        whiteSpace: 'nowrap',
        transition: 'color .18s, background .18s, border-color .18s',
      }}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="nav-active-dot"
          style={{
            position: 'absolute',
            bottom: 3, left: '50%',
            transform: 'translateX(-50%)',
            width: 4, height: 4,
            borderRadius: '50%',
            background: '#f7931e',
            boxShadow: '0 0 8px rgba(247,147,30,.9)',
          }}
        />
      )}
    </motion.button>
  );
}

// Hooks for interactions
function useCountUp(target: number, isInView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (2000 / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);
  return count;
}

function useCursorParallax(intensity = 20) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set((e.clientX / window.innerWidth  - 0.5) * intensity);
      y.set((e.clientY / window.innerHeight - 0.5) * intensity);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, intensity]);
  return { x, y };
}

const fadeInUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const scaleIn = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

// Hero Section Component
function HeroSection() {
  const ref = useRef(null);
  const parallax = useCursorParallax(15);
  const springConfig = { stiffness: 100, damping: 30 };
  const springX = useSpring(parallax.x, springConfig);
  const springY = useSpring(parallax.y, springConfig);

  const parallaxBg     = useCursorParallax(8);
  const parallaxMain   = useCursorParallax(18);
  const parallaxAccent = useCursorParallax(32);

  const springBgX     = useSpring(parallaxBg.x,     { stiffness: 80,  damping: 25 });
  const springBgY     = useSpring(parallaxBg.y,     { stiffness: 80,  damping: 25 });
  const springMainX   = useSpring(parallaxMain.x,   { stiffness: 100, damping: 30 });
  const springMainY   = useSpring(parallaxMain.y,   { stiffness: 100, damping: 30 });
  const springAccentX = useSpring(parallaxAccent.x, { stiffness: 120, damping: 35 });
  const springAccentY = useSpring(parallaxAccent.y, { stiffness: 120, damping: 35 });

  /* stable fire particle data — no Math.random() in render */
  const particles = [
    { x: 48, delay: 0,    dur: 1.4, size: 5  },
    { x: 54, delay: 0.3,  dur: 1.8, size: 7  },
    { x: 42, delay: 0.6,  dur: 1.5, size: 4  },
    { x: 58, delay: 0.9,  dur: 2.0, size: 6  },
    { x: 38, delay: 0.2,  dur: 1.6, size: 5  },
    { x: 62, delay: 0.7,  dur: 1.3, size: 4  },
    { x: 50, delay: 1.1,  dur: 1.9, size: 8  },
    { x: 45, delay: 0.4,  dur: 1.7, size: 5  },
    { x: 56, delay: 1.4,  dur: 1.4, size: 4  },
    { x: 40, delay: 0.8,  dur: 2.1, size: 6  },
  ];

  return (
    <>
      <style>{`
        @keyframes hs-fire-rise {
          0%   { transform: translateY(0)     scale(1);  opacity: .9; }
          60%  { opacity: .6; }
          100% { transform: translateY(-68px) scale(.2); opacity: 0; }
        }
        @keyframes hs-breathe    { 0%,100%{opacity:.04} 50%{opacity:.1} }
        @keyframes hs-spin-cw    { to{transform:rotate(360deg)}  }
        @keyframes hs-spin-ccw   { to{transform:rotate(-360deg)} }
        @keyframes hs-glow-cta {
          0%,100% { box-shadow:0 0 18px rgba(254,122,1,.4); }
          50%     { box-shadow:0 0 42px rgba(254,122,1,.78), 0 0 80px rgba(254,122,1,.24); }
        }
        @keyframes hs-shimmer {
          0%   { transform:translateX(-110%) skewX(-14deg); }
          100% { transform:translateX(310%)  skewX(-14deg); }
        }
        @keyframes hs-chevron {
          0%,100% { opacity:.25; transform:rotate(45deg) translate(0,0); }
          50%     { opacity:.8;  transform:rotate(45deg) translate(3px,3px); }
        }
        @keyframes hs-stat-in {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes hs-bar-breathe {
          0%,100% { transform:scaleY(1);    opacity:.45; }
          50%     { transform:scaleY(1.12); opacity:.7;  }
        }
        @keyframes hs-plate-spin { to { transform:rotate(360deg); } }
        @keyframes hs-pulse-ring {
          0%   { transform:scale(.85); opacity:.7; }
          100% { transform:scale(1.6); opacity:0;  }
        }
        @keyframes hs-scan {
          0%   { top:4%;  opacity:.8; }
          100% { top:96%; opacity:0;  }
        }
        @keyframes hs-tag-border {
          0%,100% { border-color:rgba(247,147,30,.35); }
          50%     { border-color:rgba(247,147,30,.75); }
        }
        @keyframes hs-lightning {
          0%,90%,100% { opacity:0; }
          92%,96%     { opacity:.18; }
        }

        .hs-cta-primary {
          animation:hs-glow-cta 3s ease-in-out infinite;
          position:relative; overflow:hidden;
        }
        .hs-cta-primary::after {
          content:'';
          position:absolute; inset:0; border-radius:inherit;
          background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.22) 50%,transparent 65%);
          animation:hs-shimmer 3.4s ease-in-out infinite;
          pointer-events:none;
        }
        .hs-stat { animation:hs-stat-in .55s ease both; }
      `}</style>

      <motion.div
        ref={ref}
        className="relative overflow-hidden bg-[#080808]"
        style={{ height:'100vh', width:'100%' }}
        initial="hidden"
        animate="visible"
      >

        {/* ── BACKGROUNDS ─────────────────────────────────────────── */}

        {/* Warm radial vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background:'radial-gradient(ellipse at 38% 55%, rgba(247,147,30,.09) 0%, rgba(120,70,18,.2) 30%, rgba(30,16,4,.5) 55%, #080808 76%)',
        }} />

        {/* Breathing ambient center glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background:'radial-gradient(circle at 38% 56%, rgba(254,122,1,.14) 0%, transparent 48%)',
          animation:'hs-breathe 4.5s ease-in-out infinite',
        }} />

        {/* Fine grid texture */}
        <div className="absolute inset-0 pointer-events-none" style={{
          opacity:.022,
          backgroundImage:'linear-gradient(rgba(255,255,255,.65) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.65) 1px,transparent 1px)',
          backgroundSize:'54px 54px',
        }} />

        {/* Diagonal light slash — subtle depth */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block" style={{
          background:'linear-gradient(118deg,transparent 42%,rgba(247,147,30,.03) 56%,transparent 70%)',
        }} />

        {/* Rare lightning flash */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background:'linear-gradient(135deg,transparent 30%,rgba(255,200,80,.06) 50%,transparent 70%)',
          animation:'hs-lightning 8s ease-in-out infinite',
        }} />


        {/* ── RIGHT COLUMN: 3-LAYER PARALLAX GYM GRAPHIC ─────────── */}

        <div className="absolute right-0 top-0 h-full pointer-events-none hidden lg:block"
          style={{ width:'clamp(320px,44vw,580px)' }}>

          {/* Layer 1 — ambient blob, slowest */}
          <motion.div className="absolute top-1/2" style={{
            right:'6%',
            width:'clamp(240px,30vw,380px)', height:'clamp(240px,30vw,380px)',
            x:springBgX, y:springBgY, translateY:'-50%',
          }}
            initial={{ opacity:0, scale:.8 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ duration:1.3, delay:.3, ease:[.22,1,.36,1] as const }}>
            <div className="w-full h-full rounded-full" style={{
              background:'radial-gradient(circle,rgba(247,147,30,.22) 0%,rgba(254,122,1,.06) 44%,transparent 70%)',
              filter:'blur(80px)',
            }} />
          </motion.div>

          {/* Layer 2 — gym geometry + equipment, medium */}
          <motion.div className="absolute top-1/2" style={{
            right:'7%',
            width:'clamp(220px,28vw,360px)', height:'clamp(220px,28vw,360px)',
            x:springMainX, y:springMainY, translateY:'-50%',
          }}
            initial={{ opacity:0, scale:.9 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ duration:1, delay:.5, ease:[.22,1,.36,1] as const }}>

            {/* Outer orbit ring */}
            <div className="absolute inset-0 rounded-full" style={{
              border:'1px dashed rgba(247,147,30,.18)',
              animation:'hs-plate-spin 28s linear infinite',
            }} />
            {/* Inner reverse ring */}
            <div className="absolute inset-[12%] rounded-full" style={{
              border:'1px solid rgba(247,147,30,.1)',
              animation:'hs-spin-ccw 16s linear infinite',
            }} />

            {/* Expanding pulse rings */}
            <div className="absolute inset-[22%] rounded-full" style={{
              border:'2px solid rgba(247,147,30,.3)',
              animation:'hs-pulse-ring 2.2s ease-out infinite',
            }} />
            <div className="absolute inset-[22%] rounded-full" style={{
              border:'2px solid rgba(247,147,30,.22)',
              animation:'hs-pulse-ring 2.2s ease-out .7s infinite',
            }} />

            {/* ══ DUMBBELL SVG ══ */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width:'54%', height:'54%' }}>
              <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ width:'100%', height:'100%', overflow:'visible' }}>
                {/* Left plate outer */}
                <rect x="4" y="10" width="18" height="40" rx="4"
                  fill="none" stroke="rgba(247,147,30,0.55)" strokeWidth="2"
                  style={{ filter:'drop-shadow(0 0 6px rgba(247,147,30,0.5))' }} />
                {/* Left plate inner */}
                <rect x="9" y="16" width="8" height="28" rx="2"
                  fill="rgba(247,147,30,0.12)" stroke="rgba(247,147,30,0.4)" strokeWidth="1.5" />
                {/* Left collar */}
                <rect x="22" y="22" width="10" height="16" rx="2"
                  fill="rgba(254,122,1,0.25)" stroke="rgba(254,122,1,0.6)" strokeWidth="1.5"
                  style={{ filter:'drop-shadow(0 0 4px rgba(254,122,1,0.4))' }} />
                {/* Bar */}
                <rect x="32" y="27" width="56" height="6" rx="3"
                  fill="url(#barGrad)"
                  style={{ filter:'drop-shadow(0 0 8px rgba(254,122,1,0.45))' }} />
                {/* Right collar */}
                <rect x="88" y="22" width="10" height="16" rx="2"
                  fill="rgba(254,122,1,0.25)" stroke="rgba(254,122,1,0.6)" strokeWidth="1.5"
                  style={{ filter:'drop-shadow(0 0 4px rgba(254,122,1,0.4))' }} />
                {/* Right plate outer */}
                <rect x="98" y="10" width="18" height="40" rx="4"
                  fill="none" stroke="rgba(247,147,30,0.55)" strokeWidth="2"
                  style={{ filter:'drop-shadow(0 0 6px rgba(247,147,30,0.5))' }} />
                {/* Right plate inner */}
                <rect x="103" y="16" width="8" height="28" rx="2"
                  fill="rgba(247,147,30,0.12)" stroke="rgba(247,147,30,0.4)" strokeWidth="1.5" />
                {/* Knurling marks */}
                {[44,52,60,68,76].map((cx,i) => (
                  <line key={i} x1={cx} y1="27" x2={cx} y2="33"
                    stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                ))}
                <defs>
                  <linearGradient id="barGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="rgba(247,147,30,0.6)" />
                    <stop offset="50%"  stopColor="rgba(255,170,50,0.9)" />
                    <stop offset="100%" stopColor="rgba(247,147,30,0.6)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Kettlebell — bottom left */}
            <div className="absolute bottom-[8%] left-[4%]">
              <svg viewBox="0 0 52 60" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ width:'clamp(36px,4vw,52px)', height:'clamp(42px,4.8vw,60px)', animation:'hs-spin-ccw 22s linear infinite' }}>
                <path d="M26 4 C12 4 4 14 4 26 C4 40 14 52 26 52 C38 52 48 40 48 26 C48 14 40 4 26 4Z"
                  fill="rgba(247,147,30,0.1)" stroke="rgba(247,147,30,0.45)" strokeWidth="2"/>
                <path d="M20 4 C20 4 18 0 26 0 C34 0 32 4 32 4"
                  fill="none" stroke="rgba(254,122,1,0.55)" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="26" cy="28" r="7"
                  fill="none" stroke="rgba(247,147,30,0.35)" strokeWidth="1.5"/>
              </svg>
            </div>

            {/* Weight plate — top right, spinning */}
            <motion.div className="absolute top-[6%] right-[6%]"
              animate={{ rotate:[0,360] }}
              transition={{ duration:12, repeat:Infinity, ease:'linear' }}>
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ width:'clamp(32px,3.6vw,48px)', height:'clamp(32px,3.6vw,48px)' }}>
                <circle cx="24" cy="24" r="22"
                  fill="none" stroke="rgba(247,147,30,0.42)" strokeWidth="2"
                  style={{ filter:'drop-shadow(0 0 5px rgba(247,147,30,0.4))' }}/>
                <circle cx="24" cy="24" r="14"
                  fill="rgba(247,147,30,0.08)" stroke="rgba(247,147,30,0.28)" strokeWidth="1.5"/>
                <circle cx="24" cy="24" r="4.5"
                  fill="rgba(254,122,1,0.35)" stroke="rgba(254,122,1,0.6)" strokeWidth="1.5"
                  style={{ filter:'drop-shadow(0 0 4px rgba(254,122,1,0.6))' }}/>
                {[0,60,120,180,240,300].map((deg,i) => {
                  const rad = (deg * Math.PI) / 180;
                  return (
                    <line key={i}
                      x1={24 + Math.cos(rad)*7}  y1={24 + Math.sin(rad)*7}
                      x2={24 + Math.cos(rad)*13} y2={24 + Math.sin(rad)*13}
                      stroke="rgba(247,147,30,0.3)" strokeWidth="1.2"/>
                  );
                })}
              </svg>
            </motion.div>

            {/* Vertical barbell decoration */}
            <div className="absolute bottom-[14%] right-[18%]" style={{
              width:6, height:'clamp(40px,5vw,64px)', borderRadius:3,
              background:'linear-gradient(180deg,rgba(254,122,1,.5),rgba(247,147,30,.25),rgba(254,122,1,.5))',
              boxShadow:'0 0 12px rgba(254,122,1,.35)',
              animation:'hs-bar-breathe 3s ease-in-out infinite',
              transformOrigin:'bottom center',
            }} />
          </motion.div>

          {/* Layer 3 — accent dots, fastest */}
          <motion.div className="absolute top-1/2" style={{
            right:'9%',
            width:'clamp(190px,24vw,310px)', height:'clamp(190px,24vw,310px)',
            x:springAccentX, y:springAccentY, translateY:'-50%',
          }}
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ duration:.8, delay:.7 }}>
            {[
              { t:'8%',  r:'15%', s:7, d:0    },
              { t:'65%', l:'10%', s:9, d:1    },
              { t:'35%', r:'4%',  s:5, d:.5   },
              { t:'80%', r:'26%', s:6, d:1.5  },
              { t:'18%', l:'20%', s:4, d:.8   },
            ].map((dot,i) => (
              <div key={i} className="absolute rounded-full" style={{
                width:dot.s, height:dot.s,
                top:dot.t, right:(dot as any).r, left:(dot as any).l,
                background: i%2===0 ? '#f7931e' : '#ffb347',
                boxShadow:`0 0 ${dot.s*2.8}px rgba(247,147,30,.9)`,
                animation:`hs-breathe ${2.2+i*.38}s ease-in-out ${dot.d}s infinite`,
              }} />
            ))}
          </motion.div>

          {/* Breathing glow core */}
          <motion.div className="absolute top-1/2 pointer-events-none rounded-full"
            style={{ right:'13%', width:'clamp(160px,20vw,260px)', height:'clamp(160px,20vw,260px)', translateY:'-50%', filter:'blur(64px)' }}
            animate={{ opacity:[.08,.22,.08], scale:[1,1.2,1] }}
            transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}>
            <div className="w-full h-full rounded-full" style={{ background:'radial-gradient(circle,rgba(254,122,1,.38),transparent 70%)' }} />
          </motion.div>

          {/* HUD scan line */}
          <div className="absolute" style={{ right:'4%', top:'8%', bottom:'8%', width:'clamp(200px,25vw,330px)', overflow:'hidden' }}>
            <div style={{
              position:'absolute', left:0, right:0, height:2,
              background:'linear-gradient(90deg,transparent,rgba(247,147,30,.8),rgba(255,220,100,.6),rgba(247,147,30,.8),transparent)',
              boxShadow:'0 0 14px rgba(247,147,30,.6)',
              animation:'hs-scan 4.5s linear infinite',
            }} />
          </div>

          {/* HUD corner brackets */}
          {([
            { top:'7%',    left:'3%',    bT:true, bL:true  },
            { top:'7%',    right:'3%',   bT:true, bR:true  },
            { bottom:'7%', left:'3%',    bB:true, bL:true  },
            { bottom:'7%', right:'3%',   bB:true, bR:true  },
          ] as const).map((c,i) => (
            <div key={i} className="absolute" style={{
              width:20, height:20,
              top:(c as any).top, bottom:(c as any).bottom,
              left:(c as any).left, right:(c as any).right,
              borderTop:    (c as any).bT ? '2px solid rgba(247,147,30,.48)' : 'none',
              borderBottom: (c as any).bB ? '2px solid rgba(247,147,30,.48)' : 'none',
              borderLeft:   (c as any).bL ? '2px solid rgba(247,147,30,.48)' : 'none',
              borderRight:  (c as any).bR ? '2px solid rgba(247,147,30,.48)' : 'none',
            }} />
          ))}
        </div>


        {/* ── FIRE PARTICLES ─────────────────────────────────────── */}
        <div className="absolute pointer-events-none z-10"
          style={{ bottom:'clamp(24px,5vh,42px)', left:'clamp(20px,5vw,56px)', width:'clamp(80px,10vw,130px)', height:80 }}>
          {particles.map((p,i) => (
            <div key={i} className="absolute bottom-0 rounded-full" style={{
              left:`${p.x}%`, width:p.size, height:p.size,
              background: i%3===0 ? '#fe7a01' : i%3===1 ? '#ff5500' : '#ffaa22',
              boxShadow:`0 0 ${p.size*2}px rgba(254,122,1,.8)`,
              animation:`hs-fire-rise ${p.dur}s ease-out ${p.delay}s infinite`,
            }} />
          ))}
        </div>


        {/* ── LEFT CONTENT ───────────────────────────────────────── */}

        <motion.div
          className="relative z-20 flex flex-col justify-center"
          style={{
            x:springX, y:springY,
            height:'80vh',
            padding:'clamp(72px,10vh,100px) clamp(20px,5vw,56px) clamp(40px,6vh,64px)',
            maxWidth:'clamp(340px,56vw,720px)',
          }}
        >
          {/* Eyebrow badge */}
          <motion.div
            style={{
              display:'inline-flex', alignItems:'center', gap:9, width:'fit-content',
              padding:'5px 14px', borderRadius:5,
              background:'rgba(247,147,30,.07)',
              border:'1px solid rgba(247,147,30,.35)',
              marginBottom:'clamp(12px,1.8vh,20px)',
              animation:'hs-tag-border 3s ease-in-out infinite',
            }}
            initial={{ opacity:0, y:-14 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:.6, delay:.1, ease:[.22,1,.36,1] as const }}
          >
            <div style={{
              width:7, height:7, borderRadius:'50%', background:'#f7931e',
              boxShadow:'0 0 9px #f7931e',
              animation:'hs-breathe 1.9s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700,
              fontSize:'clamp(9px,.95vw,11px)', letterSpacing:'.34em',
              textTransform:'uppercase', color:'#f7931e',
            }}>India's #1 Gym Management Platform</span>
          </motion.div>

          {/* Headline */}
          <motion.div
            style={{ marginBottom:'clamp(10px,1.4vh,16px)' }}
            initial={{ opacity:0, y:38 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:.85, delay:.2, ease:[.22,1,.36,1] as const }}
          >
            <h1 style={{
              fontFamily:"'font-heading',sans-serif",
              fontSize:'clamp(28px,4.2vw,56px)',
              lineHeight:.92, letterSpacing:'-0.8px',
              fontWeight:700, color:'#f5f5f5', margin:0,
            }}>
              Everything Your Gym<br />
              Needs to{' '}
              <motion.span
                style={{ color:'#fe7a01', display:'inline-block' }}
                animate={{ textShadow:[
                  '0 0 22px rgba(254,122,1,.3)',
                  '0 0 48px rgba(254,122,1,.65)',
                  '0 0 22px rgba(254,122,1,.3)',
                ]}}
                transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}
              >
                Go Digital
              </motion.span>
            </h1>
          </motion.div>

          {/* Sub-label */}
          <motion.p
            style={{
              fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700,
              fontSize:'clamp(13px,1.55vw,18px)', color:'#f7931e',
              letterSpacing:'.04em', marginBottom:'clamp(8px,1vh,12px)',
            }}
            initial={{ opacity:0, y:18 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:.6, delay:.5, ease:[.22,1,.36,1] as const }}
          >
            Free Website, ERP &amp; User App Solutions
          </motion.p>

          {/* Body copy */}
          <motion.p
            style={{
              fontFamily:"'Barlow',sans-serif", fontWeight:400,
              fontSize:'clamp(13px,1.28vw,16px)',
              color:'rgba(161,161,161,.85)', lineHeight:1.72,
              maxWidth:510, marginBottom:'clamp(20px,3vh,32px)',
            }}
            initial={{ opacity:0, y:18 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:.6, delay:.65, ease:[.22,1,.36,1] as const }}
          >
            Simplify gym management, automate billing, track attendance, manage nutrition, and boost member engagement — one platform built for every Indian gym.
          </motion.p>

          {/* CTAs */}
          <motion.div
            style={{ display:'flex', gap:'clamp(10px,1.8vw,16px)', flexWrap:'wrap', marginBottom:'clamp(20px,3.5vh,36px)' }}
            initial={{ opacity:0, y:18 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:.6, delay:.8, ease:[.22,1,.36,1] as const }}
          >
            <motion.button
              className="hs-cta-primary"
              whileHover={{ scale:1.07, filter:'brightness(1.1)' }}
              whileTap={{ scale:.97 }}
              transition={{ duration:.18 }}
              style={{
                background:'linear-gradient(135deg,#fe7a01,#bf5800)',
                color:'#f5f5f5', border:'none', cursor:'pointer',
                borderRadius:999,
                fontFamily:"'font-heading',sans-serif", fontWeight:700,
                fontSize:'clamp(13px,1.3vw,16px)',
                padding:'clamp(13px,1.8vh,16px) clamp(26px,3.2vw,40px)',
                whiteSpace:'nowrap', letterSpacing:'.02em',
              }}
            >
              <span className="relative z-10">Get a Free Demo</span>
            </motion.button>

            <motion.button
              whileHover={{ scale:1.06, borderColor:'rgba(247,147,30,.75)', backgroundColor:'rgba(247,147,30,.07)' }}
              whileTap={{ scale:.97 }}
              transition={{ duration:.18 }}
              style={{
                background:'transparent', border:'1.5px solid rgba(245,245,245,.28)',
                color:'#f5f5f5', cursor:'pointer', borderRadius:999,
                fontFamily:"'font-heading',sans-serif", fontWeight:700,
                fontSize:'clamp(13px,1.3vw,16px)',
                padding:'clamp(13px,1.8vh,16px) clamp(26px,3.2vw,40px)',
                transition:'border-color .22s, background .22s',
                whiteSpace:'nowrap', letterSpacing:'.02em',
              }}
            >
              Join as a Partner
            </motion.button>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            style={{ display:'flex', gap:'clamp(14px,2.8vw,26px)', flexWrap:'wrap' }}
            initial={{ opacity:0, y:14 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:.6, delay:.95, ease:[.22,1,.36,1] as const }}
          >
            {[
              { val:'107+',    label:'Active Gyms'     },
              { val:'14,743+', label:'Members Managed' },
              { val:'99.5%',   label:'Uptime'          },
              { val:'24/7',    label:'Support'         },
            ].map((s,i) => (
              <div key={i} className="hs-stat" style={{
                paddingLeft:'clamp(10px,1.5vw,14px)',
                borderLeft:'2px solid rgba(247,147,30,.42)',
                animationDelay:`${.85+i*.1}s`,
              }}>
                <div style={{
                  fontFamily:"'font-heading',sans-serif", fontWeight:700,
                  fontSize:'clamp(19px,2.4vw,28px)', color:'#f7931e', lineHeight:1,
                }}>{s.val}</div>
                <div style={{
                  fontFamily:"'Barlow Condensed',sans-serif", fontWeight:600,
                  fontSize:'clamp(9px,.88vw,11px)',
                  color:'rgba(161,161,161,.52)', letterSpacing:'.18em',
                  textTransform:'uppercase', marginTop:3,
                }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>


        {/* ── SCROLL INDICATOR ────────────────────────────────────── */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
          style={{ bottom:'clamp(18px,3.5vh,34px)', gap:10 }}
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay:1.2, duration:.7 }}
        >
          <span style={{
            fontFamily:"'Barlow Condensed',sans-serif", fontWeight:600,
            fontSize:10, color:'rgba(161,161,161,.55)',
            letterSpacing:'1.2px', textTransform:'uppercase',
          }}>Scroll</span>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width:'clamp(9px,1.3vw,13px)', height:'clamp(9px,1.3vw,13px)',
                borderRight:'2px solid rgba(247,147,30,.52)',
                borderBottom:'2px solid rgba(247,147,30,.52)',
                animation:`hs-chevron 1.7s ease-in-out ${i*.2}s infinite`,
                opacity:1-i*.24,
              }} />
            ))}
          </div>
        </motion.div>

      </motion.div>
    </>
  );
}

// Stat Card with count-up animation
function StatCard({ number, label, delay = 0 }: { number: string; label: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Handle special formats like "24/7"
  const is247Format = number === "24/7";

  // Extract the numeric part and suffix
  let numValue = 0;
  let suffix = '';

  if (is247Format) {
    numValue = 24;
    suffix = '/7';
  } else {
    numValue = parseFloat(number.replace(/[^0-9.]/g, ''));
    suffix = number.replace(/[0-9.]/g, '');
  }

  const count = useCountUp(numValue, isInView);

  return (
    <motion.div
      ref={ref}
      className="absolute bg-[#0b0b0b] content-stretch flex flex-col gap-[12px] h-[145.6px] items-start pb-[0.8px] pt-[32.8px] px-[32.8px] rounded-[16px] w-[245.2px]"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{
        y: -8,
        boxShadow: '0 0 30px rgba(247,147,30,0.3)',
        transition: { duration: 0.3 }
      }}
    >
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(247,147,30,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <motion.div
        className="absolute inset-0 rounded-[16px] opacity-0"
        whileHover={{ opacity: 1 }}
        style={{
          background: 'linear-gradient(135deg, rgba(247,147,30,0.05) 0%, transparent 100%)'
        }}
        transition={{ duration: 0.3 }}
      />
      <div className="h-[48px] relative shrink-0 w-full">
        <p className="absolute font-heading leading-[48px] left-1/2 -translate-x-1/2 not-italic text-[#f7931e] text-[48px] text-center top-[0.2px]">
          {isInView ? `${count}${suffix}` : number}
        </p>
      </div>
      <div className="h-[20px] relative shrink-0 w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-1/2 -translate-x-1/2 not-italic text-[#a1a1a1] text-[14px] text-center text-nowrap top-[0.6px] tracking-[0.7px] uppercase">{label}</p>
      </div>
    </motion.div>
  );
}

// Built For Real Gym Owners Section
function BuiltForRealGymsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const stats = [
    { number: '107+',   label: 'Active Gyms',      target: 107,   max: 200,  suffix: '+',   unit: 'gyms on platform'    },
    { number: '14743+', label: 'Members Managed',   target: 14743, max: 20000,suffix: '+',   unit: 'members & growing'   },
    { number: '99.5',   label: 'Uptime',            target: 99.5,  max: 100,  suffix: '%',   unit: 'guaranteed reliability'},
    { number: '24/7',   label: 'Support Available', target: 24,    max: 24,   suffix: '/7',  unit: 'always available'    },
  ];

  return (
    <>
      <style>{`
        @keyframes bfr-bar-fill {
          from { width: 0%; }
          to   { width: var(--bar-w); }
        }
        @keyframes bfr-val-in {
          from { opacity:0; transform:translateX(-12px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes bfr-dot  { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
        @keyframes bfr-glow { 0%,100%{opacity:.6} 50%{opacity:1} }
        @keyframes bfr-scan { 0%{left:-40%;opacity:.7} 100%{left:120%;opacity:0} }
        @keyframes bfr-fade-up {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      <motion.div
        ref={ref}
        className="relative w-full overflow-hidden"
        style={{ background:'linear-gradient(180deg,#161410 0%,#1a1508 60%,#161410 100%)', padding:'clamp(64px,9vh,112px) 0' }}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >

        {/* Ambient side glows */}
        <div style={{ position:'absolute', top:'20%', left:'-5%', width:'30%', height:'60%', borderRadius:'50%', background:'radial-gradient(circle,rgba(247,147,30,.14),transparent 70%)', filter:'blur(60px)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'30%', right:'-5%', width:'25%', height:'50%', borderRadius:'50%', background:'radial-gradient(circle,rgba(247,147,30,.08),transparent 70%)', filter:'blur(60px)', pointerEvents:'none' }} />

        {/* Grid */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', opacity:.04, backgroundImage:'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)', backgroundSize:'54px 54px' }} />

        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 clamp(20px,5vw,56px)' }}>

          {/* ── Two-column layout: heading left, bars right ── */}
          <div style={{
            display:'grid',
            gridTemplateColumns:'minmax(0,1fr) minmax(0,1.4fr)',
            gap:'clamp(40px,7vw,100px)',
            alignItems:'center',
          }}
            className="bfr-grid"
          >

            {/* LEFT — sticky headline */}
            <motion.div variants={fadeInUp}>
              {/* Eyebrow */}
              <div style={{
                display:'inline-flex', alignItems:'center', gap:8,
                padding:'5px 14px', borderRadius:4,
                background:'rgba(247,147,30,.07)', border:'1px solid rgba(247,147,30,.28)',
                marginBottom:'clamp(16px,2.5vh,24px)',
              }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:'#f7931e', boxShadow:'0 0 8px #f7931e', animation:'bfr-dot 2s ease-in-out infinite' }} />
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:'clamp(9px,.9vw,11px)', letterSpacing:'.34em', textTransform:'uppercase', color:'#f7931e' }}>
                  Real Numbers
                </span>
              </div>

              {/* Heading */}
              <h2 style={{
                fontFamily:"'font-heading',sans-serif", fontWeight:700,
                fontSize:'clamp(30px,4.2vw,56px)',
                letterSpacing:'-0.6px', lineHeight:.9,
                color:'#f5f5f5', margin:'0 0 clamp(14px,2vh,20px)',
                textTransform:'uppercase',
              }}>
                Built for<br />Real Gym<br />
                <span style={{ color:'#fe7a01', textShadow:'0 0 28px rgba(254,122,1,.35)' }}>Owners</span>
              </h2>

              <p style={{
                fontFamily:"'Barlow',sans-serif", fontWeight:400,
                fontSize:'clamp(13px,1.2vw,15px)',
                color:'rgba(161,161,161,.88)', lineHeight:1.75,
                maxWidth:380, marginBottom:'clamp(28px,4vh,40px)',
              }}>
                Empowering Indian gyms with a free, end-to-end digital platform designed to scale fitness businesses.
              </p>

              {/* CTA */}
              <motion.a
                href="#"
                whileHover={{ scale:1.05, x:4 }}
                whileTap={{ scale:.97 }}
                style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700,
                  fontSize:'clamp(12px,1.2vw,14px)', letterSpacing:'.18em',
                  textTransform:'uppercase', color:'#f7931e', textDecoration:'none',
                  borderBottom:'1px solid rgba(247,147,30,.35)', paddingBottom:4,
                  transition:'border-color .2s',
                }}
              >
                Join 107+ gyms
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="#f7931e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
            </motion.div>

            {/* RIGHT — stat progress bars */}
            <div style={{ display:'flex', flexDirection:'column', gap:'clamp(20px,3.5vh,32px)' }}>
              {stats.map((stat, i) => (
                <StatBar
                  key={stat.label}
                  stat={stat}
                  delay={0.2 + i * 0.12}
                  isInView={isInView}
                  index={i}
                />
              ))}
            </div>

          </div>
        </div>

        {/* Bottom separator */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(247,147,30,.15) 30%,rgba(247,147,30,.15) 70%,transparent)' }} />

        <style>{`@media(max-width:740px){.bfr-grid{grid-template-columns:1fr !important;}}`}</style>
      </motion.div>
    </>
  );
}

/* ─── Individual stat bar row ─────────────────────────────────────────────── */
function StatBar({
  stat,
  delay,
  isInView,
  index,
}: {
  stat: { number:string; label:string; target:number; max:number; suffix:string; unit:string };
  delay:number;
  isInView:boolean;
  index:number;
}) {
  const count = useCountUp(stat.target, isInView);
  const pct   = Math.round((stat.target / stat.max) * 100);

  const display = (() => {
    if (stat.suffix === '/7')  return '24/7';
    if (stat.suffix === '%')   return (isInView ? count : 0).toFixed(1) + '%';
    if (stat.target === 14743) return (isInView ? count : 0).toLocaleString() + '+';
    return (isInView ? count : 0) + '+';
  })();

  const colors = [
    { bar:'#fe7a01', glow:'rgba(254,122,1,.5)'  },
    { bar:'#ff9a35', glow:'rgba(255,154,53,.45)' },
    { bar:'#f7931e', glow:'rgba(247,147,30,.5)'  },
    { bar:'#ffb347', glow:'rgba(255,179,71,.45)' },
  ];
  const col = colors[index % colors.length];

  return (
    <motion.div
      variants={fadeInUp}
      style={{
        opacity:0,
        animation: isInView ? `bfr-fade-up .6s ease ${delay}s both` : 'none',
      }}
    >
      {/* Row: number + label + unit */}
      <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:'clamp(8px,1.2vh,12px)' }}>
        <div style={{ display:'flex', alignItems:'baseline', gap:10 }}>
          <span style={{
            fontFamily:"'font-heading',sans-serif", fontWeight:700,
            fontSize:'clamp(28px,3.8vw,46px)',
            color:col.bar, lineHeight:1,
            textShadow:`0 0 28px ${col.glow}`,
            animation: isInView ? `bfr-val-in .5s ease ${delay+.05}s both` : 'none',
          }}>
            {display}
          </span>
          <span style={{
            fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700,
            fontSize:'clamp(12px,1.2vw,15px)', letterSpacing:'.25em',
            textTransform:'uppercase', color:'#f5f5f5', opacity:.96,
          }}>
            {stat.label}
          </span>
        </div>
        <span style={{
          fontFamily:"'Barlow',sans-serif", fontSize:'clamp(10px,.9vw,12px)',
          color:'rgba(161,161,161,.45)', letterSpacing:'.08em',
          display:'none',
        }}
          className="bfr-unit">
          {stat.unit}
        </span>
      </div>

      {/* Progress track */}
      <div style={{
        position:'relative', height:'clamp(6px,1vh,10px)', borderRadius:999,
        background:'rgba(255,255,255,.1)',
        border:'1px solid rgba(255,255,255,.08)',
        overflow:'hidden',
      }}>
        {/* Filled bar */}
        <div style={{
          position:'absolute', top:0, left:0, bottom:0,
          borderRadius:999,
          background:`linear-gradient(90deg,${col.bar}cc,${col.bar})`,
          boxShadow:`0 0 12px ${col.glow}`,
          ['--bar-w' as any]: `${pct}%`,
          width:0,
          animation: isInView ? `bfr-bar-fill .9s cubic-bezier(.22,1,.36,1) ${delay+.1}s forwards` : 'none',
        }} />

        {/* Shimmer scan on the bar */}
        <div style={{
          position:'absolute', top:0, bottom:0, width:'40%',
          background:'linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent)',
          animation: isInView ? `bfr-scan 2.2s ease-in-out ${delay+.8}s 2` : 'none',
        }} />
      </div>

      {/* Row footer: unit + pct */}
      <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
        <span style={{
          fontFamily:"'Barlow',sans-serif", fontSize:'clamp(10px,.9vw,12px)',
          color:'rgba(161,161,161,.6)', letterSpacing:'.06em',
        }}>{stat.unit}</span>
        <span style={{
          fontFamily:"'Barlow Condensed',sans-serif", fontWeight:600,
          fontSize:'clamp(10px,.9vw,12px)', letterSpacing:'.1em',
          color:`${col.bar}88`,
        }}>{pct}%</span>
      </div>
    </motion.div>
  );
}
// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
  style,
  delay = 0
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const controls = useAnimation();

  return (
    <motion.div
      ref={ref}
      className="absolute bg-[#0b0b0b] border-[0.8px] border-[rgba(247,147,30,0.1)] border-solid h-[265.6px] rounded-[16px] w-[342.925px] group cursor-pointer"
      style={style}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{
        y: -16,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
      }}
    >
      {/* Orange glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-[16px] opacity-0 pointer-events-none"
        whileHover={{ opacity: 1 }}
        style={{
          boxShadow: '0 20px 60px rgba(247,147,30,0.4), 0 0 40px rgba(247,147,30,0.25), inset 0 0 30px rgba(247,147,30,0.08)',
          background: 'linear-gradient(135deg, rgba(247,147,30,0.08) 0%, transparent 100%)'
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Base shadow that deepens on hover */}
      <motion.div
        className="absolute inset-0 rounded-[16px] pointer-events-none"
        initial={{
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
        }}
        whileHover={{
          boxShadow: '0 25px 70px rgba(0,0,0,0.6), 0 10px 30px rgba(0,0,0,0.4)'
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Icon container with rotation on hover */}
      <motion.div
        className="absolute bg-[rgba(247,147,30,0.1)] content-stretch flex items-center justify-center left-[32px] p-[0.8px] rounded-[16.4px] size-[56px] top-[32px]"
        whileHover={{
          scale: 1.15,
          rotate: 360,
          backgroundColor: 'rgba(247,147,30,0.2)',
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as const
          }
        }}
      >
        <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(247,147,30,0.2)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />

        {/* Glow ring on hover */}
        <motion.div
          className="absolute inset-0 rounded-[16.4px] pointer-events-none opacity-0"
          whileHover={{
            opacity: 1,
            boxShadow: '0 0 30px rgba(247,147,30,0.6)',
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
        />

        {/* Icon with rotation */}
        <motion.div
          whileHover={{
            rotate: 360,
            scale: 1.1
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as const
          }}
        >
          {icon}
        </motion.div>
      </motion.div>

      <div className="absolute bg-[rgba(255,255,255,0)] h-[264px] left-0 rounded-[16px] top-0 w-full" />

      <div className="absolute left-[32px] top-[112px] w-[277.325px] flex flex-col gap-2">
        <p className="font-heading leading-[31.2px] not-italic text-[#f5f5f5] text-[24px]">{title}</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28.8px] not-italic text-[#a1a1a1] text-[18px]">{description}</p>
      </div>
    </motion.div>
  );
}

// Core Features Section
function CoreFeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const partnerFeatures = [
    {
      icon: <IconPlus />,
      title: 'Zero-Cost Website',
      description: 'Modern websites backed by SEO, CRM integration, and free yearly maintenance.',
      tag: 'Free',
      tagColor: '#22c55e',
    },
    {
      icon: <IconGlobe />,
      title: 'Gym Management Software',
      description: 'Digitize every gym operation with a free ERP for fees, attendance, and payroll.',
      tag: 'Popular',
      tagColor: '#f7931e',
    },
    {
      icon: <IconDollar />,
      title: 'E-Commerce Store',
      description: 'Monetize smarter with an all-in-one fitness marketplace.',
      tag: 'New',
      tagColor: '#3b82f6',
    },
  ];

  const memberFeatures = [
    {
      icon: <IconDumbbell />,
      title: 'Smart Workout Planner',
      description: 'Expert-built workouts with mobility, stretching, visual form guidance, and intelligent progress tracking.',
      tag: 'AI',
      tagColor: '#a855f7',
    },
    {
      icon: <IconApple />,
      title: 'Body Composition Analysis',
      description: 'Understand your body better with 13-point composition analysis and actionable performance insights.',
      tag: 'BCA',
      tagColor: '#06b6d4',
    },
    {
      icon: <IconHeart />,
      title: 'Nutrition Planning',
      description: 'Eat right backed by science, ICMR-based nutrition plans, smart calorie tracking, and expert guidance.',
      tag: 'ICMR',
      tagColor: '#22c55e',
    },
  ];

  return (
    <>
      <style>{`
        @keyframes cf-shimmer {
          0%   { transform:translateX(-120%) skewX(-14deg); }
          100% { transform:translateX(320%)  skewX(-14deg); }
        }
        @keyframes cf-dot { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
        @keyframes cf-line-grow {
          from { transform:scaleX(0); transform-origin:left; }
          to   { transform:scaleX(1); transform-origin:left; }
        }
        @keyframes cf-card-in {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .cf-card {
          position:relative; border-radius:16px; overflow:hidden;
          background:#141414;
          border:1px solid rgba(255,255,255,.07);
          padding:clamp(20px,2.8vw,32px);
          display:flex; flex-direction:column; gap:clamp(12px,1.8vh,18px);
          transition:transform .3s ease, border-color .3s ease, box-shadow .3s ease;
          cursor:default;
        }
        .cf-card:hover {
          transform:translateY(-6px);
          border-color:rgba(247,147,30,.32);
          box-shadow:0 20px 48px rgba(0,0,0,.5), 0 0 0 1px rgba(247,147,30,.12);
        }
        .cf-card::after {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:linear-gradient(105deg,transparent 36%,rgba(255,255,255,.04) 50%,transparent 64%);
          animation:cf-shimmer 5s ease-in-out infinite;
        }
        .cf-card:nth-child(2)::after { animation-delay:.8s; }
        .cf-card:nth-child(3)::after { animation-delay:1.6s; }

        .cf-section-label {
          display:flex; align-items:center; gap:10;
          padding:clamp(10px,1.5vh,14px) clamp(16px,2vw,22px);
          border-radius:10px;
          border:1px solid rgba(247,147,30,.18);
          width:fit-content;
          margin-bottom:clamp(20px,3vh,28px);
        }
      `}</style>

      <motion.div
        ref={ref}
        className="relative w-full overflow-hidden"
        style={{ background:'#141414', padding:'clamp(64px,9vh,112px) 0' }}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >
        {/* Ambient glows */}
        <div style={{ position:'absolute', top:'10%', left:'10%', width:'30%', height:'40%', borderRadius:'50%', background:'radial-gradient(circle,rgba(247,147,30,.05),transparent 70%)', filter:'blur(80px)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'10%', right:'10%', width:'28%', height:'40%', borderRadius:'50%', background:'radial-gradient(circle,rgba(247,147,30,.04),transparent 70%)', filter:'blur(80px)', pointerEvents:'none' }} />

        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 clamp(20px,5vw,56px)' }}>

          {/* ── Section header ── */}
          <motion.div variants={fadeInUp} style={{ textAlign:'center', marginBottom:'clamp(48px,7vh,80px)' }}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:8,
              padding:'5px 14px', borderRadius:4,
              background:'rgba(247,147,30,.07)', border:'1px solid rgba(247,147,30,.28)',
              marginBottom:'clamp(14px,2vh,20px)',
            }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'#f7931e', boxShadow:'0 0 8px #f7931e', animation:'cf-dot 2s ease-in-out infinite' }} />
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:'clamp(9px,.9vw,11px)', letterSpacing:'.34em', textTransform:'uppercase', color:'#f7931e' }}>
                Platform Features
              </span>
            </div>

            <h2 style={{
              fontFamily:"'font-heading',sans-serif", fontWeight:700,
              fontSize:'clamp(28px,4vw,52px)',
              letterSpacing:'-0.6px', lineHeight:.9,
              color:'#f5f5f5', margin:'0 0 clamp(12px,1.8vh,16px)',
              textTransform:'uppercase',
            }}>
              Core <span style={{ color:'#fe7a01', textShadow:'0 0 28px rgba(254,122,1,.35)' }}>Features</span>
            </h2>

            <p style={{
              fontFamily:"'Barlow',sans-serif", fontWeight:400,
              fontSize:'clamp(13px,1.3vw,16px)',
              color:'rgba(161,161,161,.8)', lineHeight:1.7,
              maxWidth:560, margin:'0 auto',
            }}>
              Holistic gym management, nutrition and workout tools in one single platform.
            </p>
          </motion.div>

          {/* ══ PARTNER FEATURES ══════════════════════════════ */}
          <motion.div variants={fadeInUp} style={{ marginBottom:'clamp(48px,7vh,72px)' }}>
            {/* Group label */}
            <div className="cf-section-label" style={{ background:'rgba(247,147,30,.06)' }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:'#f7931e', boxShadow:'0 0 8px #f7931e', animation:'cf-dot 1.8s ease-in-out infinite' }} />
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:'clamp(11px,1.1vw,14px)', letterSpacing:'.28em', textTransform:'uppercase', color:'#f7931e' }}>
                For Gym Partners
              </span>
              <span style={{ fontFamily:"'Barlow',sans-serif", fontSize:'clamp(11px,1.1vw,14px)', color:'rgba(245,245,245,.7)', letterSpacing:'.04em' }}>
                — Manage Efficiently with Zero Upfront Cost
              </span>
            </div>

            {/* Cards grid */}
            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(auto-fit,minmax(clamp(240px,28vw,340px),1fr))',
              gap:'clamp(14px,2vw,20px)',
            }}>
              {partnerFeatures.map((f, i) => (
                <CoreFeatureCard key={f.title} feature={f} delay={0.15 + i * 0.1} isInView={isInView} index={i} />
              ))}
            </div>
          </motion.div>

          {/* ══ MEMBER FEATURES ═══════════════════════════════ */}
          <motion.div variants={fadeInUp}>
            {/* Group label */}
            <div className="cf-section-label" style={{ background:'rgba(247,147,30,.04)' }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:'#f7931e', boxShadow:'0 0 8px #f7931e', animation:'cf-dot 1.8s ease-in-out .4s infinite' }} />
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:'clamp(11px,1.1vw,14px)', letterSpacing:'.28em', textTransform:'uppercase', color:'#f7931e' }}>
                For Gym Members
              </span>
              <span style={{ fontFamily:"'Barlow',sans-serif", fontSize:'clamp(11px,1.1vw,14px)', color:'rgba(245,245,245,.7)', letterSpacing:'.04em' }}>
                — Science-Backed Fitness. Faster Results.
              </span>
            </div>

            {/* Cards grid */}
            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(auto-fit,minmax(clamp(240px,28vw,340px),1fr))',
              gap:'clamp(14px,2vw,20px)',
            }}>
              {memberFeatures.map((f, i) => (
                <CoreFeatureCard key={f.title} feature={f} delay={0.15 + i * 0.1} isInView={isInView} index={i + 3} />
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </>
  );
}

/* ─── Feature card component ──────────────────────────────────────────────── */
function CoreFeatureCard({
  feature,
  delay,
  isInView,
  index,
}: {
  feature: { icon:React.ReactNode; title:string; description:string; tag:string; tagColor:string };
  delay: number;
  isInView: boolean;
  index: number;
}) {
  return (
    <motion.div
      className="cf-card"
      variants={scaleIn}
      style={{
        opacity: 0,
        animation: isInView ? `cf-card-in .55s cubic-bezier(.22,1,.36,1) ${delay}s both` : 'none',
      }}
    >
      {/* Top row: icon + tag */}
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
        <motion.div
          whileHover={{ rotate:8, scale:1.1 }}
          transition={{ duration:.25, ease:[.22,1,.36,1] as const }}
          style={{
            width:'clamp(44px,5vw,56px)', height:'clamp(44px,5vw,56px)',
            borderRadius:12, flexShrink:0,
            background:'rgba(247,147,30,.1)', border:'1px solid rgba(247,147,30,.22)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}
        >
          {feature.icon}
        </motion.div>

        {/* Tag badge */}
        <span style={{
          fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700,
          fontSize:'clamp(8px,.8vw,10px)', letterSpacing:'.2em', textTransform:'uppercase',
          padding:'3px 9px', borderRadius:4,
          background:`${feature.tagColor}18`,
          border:`1px solid ${feature.tagColor}40`,
          color: feature.tagColor,
        }}>
          {feature.tag}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily:"'font-heading',sans-serif", fontWeight:700,
        fontSize:'clamp(16px,1.7vw,21px)',
        color:'#f5f5f5', lineHeight:1.1,
        letterSpacing:'-.2px', margin:0,
      }}>
        {feature.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily:"'Barlow',sans-serif", fontWeight:400,
        fontSize:'clamp(12px,1.1vw,14px)',
        color:'rgba(161,161,161,.82)', lineHeight:1.68,
        margin:0, flex:1,
      }}>
        {feature.description}
      </p>

      {/* Bottom accent line — animates on scroll */}
      <div style={{
        height:2, borderRadius:999,
        background:'linear-gradient(90deg,rgba(247,147,30,.55),rgba(247,147,30,.15))',
        transformOrigin:'left',
        animation: isInView ? `cf-line-grow .7s ease ${delay + .2}s both` : 'none',
        transform:'scaleX(0)',
      }} />

      {/* Hover glow overlay */}
      <div style={{
        position:'absolute', inset:0, borderRadius:16,
        background:'linear-gradient(135deg,rgba(247,147,30,.04),transparent)',
        opacity:0, transition:'opacity .3s',
        pointerEvents:'none',
      }}
        className="cf-hover-glow"
      />
    </motion.div>
  );
}

// How It Works Section
function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineWidth   = useTransform(scrollYProgress, [0.15, 0.75], ['0%', '100%']);
  const dotProgress = useTransform(scrollYProgress, [0.15, 0.75], ['0%', '100%']);

  const steps = [
    {
      number: '01',
      title: 'Connect',
      tag: 'Get in Touch',
      description: 'Reach us through our website or speak with a GymSaathi business development executive.',
      icon: <IconPhone />,
      delay: 0.1,
    },
    {
      number: '02',
      title: 'Partner Up',
      tag: 'Quick Setup',
      description: 'Sign up in 60 seconds and instantly access your dedicated gym management dashboard.',
      icon: <IconUserPlus />,
      delay: 0.25,
    },
    {
      number: '03',
      title: 'Go Digital',
      tag: 'Go Live',
      description: "Launch your gym's custom website and sync member data — everything running automatically.",
      icon: <IconRocket />,
      delay: 0.4,
    },
  ];

  return (
    <>
      <style>{`
        @keyframes hiw-dot        { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
        @keyframes hiw-ring-pulse {
          0%   { transform:scale(.85); opacity:.7; }
          100% { transform:scale(1.7); opacity:0;  }
        }
        @keyframes hiw-card-in {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes hiw-shimmer {
          0%   { transform:translateX(-120%) skewX(-14deg); }
          100% { transform:translateX(320%)  skewX(-14deg); }
        }
        @keyframes hiw-num-glow   { 0%,100%{opacity:.35} 50%{opacity:.7} }
        @keyframes hiw-cta-glow   {
          0%,100% { box-shadow: 0 4px 24px rgba(254,122,1,.38); }
          50%     { box-shadow: 0 4px 36px rgba(254,122,1,.65), 0 0 60px rgba(254,122,1,.2); }
        }
        @keyframes hiw-cta-shimmer {
          0%   { transform:translateX(-120%) skewX(-14deg); }
          100% { transform:translateX(320%)  skewX(-14deg); }
        }

        .hiw-card {
          position:relative; overflow:hidden; border-radius:18px;
          background:#141414; border:1px solid rgba(255,255,255,.07);
          padding:clamp(24px,3.2vw,40px) clamp(20px,2.5vw,32px);
          display:flex; flex-direction:column; align-items:center; gap:clamp(14px,2vh,20px);
          text-align:center;
          transition:transform .3s ease, border-color .3s ease, box-shadow .3s ease;
          cursor:default;
        }
        .hiw-card:hover {
          transform:translateY(-8px);
          border-color:rgba(247,147,30,.38);
          box-shadow:0 24px 60px rgba(0,0,0,.55), 0 0 0 1px rgba(247,147,30,.16);
        }
        .hiw-card::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(247,147,30,.04),transparent 60%);
          opacity:0; transition:opacity .3s;
        }
        .hiw-card:hover::before { opacity:1; }
        .hiw-card::after {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:linear-gradient(105deg,transparent 36%,rgba(255,255,255,.04) 50%,transparent 64%);
          animation:hiw-shimmer 5s ease-in-out infinite;
        }
        .hiw-card:nth-child(2)::after { animation-delay:.9s; }
        .hiw-card:nth-child(3)::after { animation-delay:1.8s; }

        .hiw-cta-btn {
          position:relative; overflow:hidden;
          animation:hiw-cta-glow 3s ease-in-out infinite;
        }
        .hiw-cta-btn::after {
          content:''; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
          background:linear-gradient(105deg,transparent 36%,rgba(255,255,255,.2) 50%,transparent 64%);
          animation:hiw-cta-shimmer 3.5s ease-in-out infinite;
        }
      `}</style>

      <motion.div
        ref={ref}
        className="relative w-full overflow-hidden"
        style={{ background:'#0b0b0b', padding:'clamp(64px,9vh,112px) 0' }}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >

        {/* ── Backgrounds ── */}
        <div style={{ position:'absolute', top:'10%', left:'2%', width:'32%', height:'55%', borderRadius:'50%', background:'radial-gradient(circle,rgba(247,147,30,.048),transparent 70%)', filter:'blur(80px)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'5%', right:'4%', width:'28%', height:'50%', borderRadius:'50%', background:'radial-gradient(circle,rgba(247,147,30,.035),transparent 70%)', filter:'blur(80px)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', opacity:.02, backgroundImage:'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)', backgroundSize:'54px 54px' }} />

        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 clamp(20px,5vw,56px)' }}>

          {/* ── Header ── */}
          <motion.div variants={fadeInUp} style={{ textAlign:'center', marginBottom:'clamp(52px,8vh,88px)' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 14px', borderRadius:4, background:'rgba(247,147,30,.07)', border:'1px solid rgba(247,147,30,.28)', marginBottom:'clamp(14px,2vh,20px)' }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'#f7931e', boxShadow:'0 0 8px #f7931e', animation:'hiw-dot 2s ease-in-out infinite' }} />
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:'clamp(9px,.9vw,11px)', letterSpacing:'.34em', textTransform:'uppercase', color:'#f7931e' }}>
                Simple Onboarding
              </span>
            </div>

            <h2 style={{ fontFamily:"'font-heading',sans-serif", fontWeight:700, fontSize:'clamp(28px,4vw,52px)', letterSpacing:'-0.6px', lineHeight:.9, color:'#f5f5f5', margin:'0 0 clamp(12px,1.8vh,16px)', textTransform:'uppercase' }}>
              How GymSaathi{' '}
              <span style={{ color:'#fe7a01', textShadow:'0 0 28px rgba(254,122,1,.35)' }}>Works</span>
            </h2>

            <p style={{ fontFamily:"'Barlow',sans-serif", fontWeight:400, fontSize:'clamp(13px,1.3vw,16px)', color:'rgba(161,161,161,.8)', lineHeight:1.7, maxWidth:500, margin:'0 auto' }}>
              Join as a gym partner in three simple steps — completely free, zero upfront cost.
            </p>
          </motion.div>

          {/* ── Steps row ── */}
          <div style={{ position:'relative', marginBottom:'clamp(48px,7vh,72px)' }}>

            {/* Scroll-driven connector line (desktop only) */}
            <div className="absolute hidden lg:block" style={{ top:'clamp(52px,7vw,70px)', left:'calc(16.66% + 20px)', right:'calc(16.66% + 20px)', height:2, background:'rgba(255,255,255,.07)', borderRadius:999, overflow:'visible', zIndex:0 }}>
              <motion.div style={{
                height:'100%', width:lineWidth,
                background:'linear-gradient(90deg,#f7931e,#ffaa35,#f7931e)',
                boxShadow:'0 0 10px rgba(247,147,30,.5)',
                borderRadius:999,
              }} />
              {/* Travelling glow dot */}
              <motion.div style={{
                position:'absolute', top:'50%',
                y:'-50%', left:dotProgress,
                width:10, height:10, borderRadius:'50%',
                background:'#f7931e', boxShadow:'0 0 14px rgba(247,147,30,.95)',
                marginLeft:-5,
              }} />
            </div>

            {/* Cards grid */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(clamp(220px,28vw,340px),1fr))', gap:'clamp(16px,2.5vw,28px)', position:'relative', zIndex:1 }}>
              {steps.map((step, i) => (
                <HowItWorksCard key={step.number} step={step} isInView={isInView} index={i} />
              ))}
            </div>
          </div>

          {/* ── Bottom CTA strip ── */}
          <motion.div variants={fadeInUp} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'clamp(14px,2.5vh,20px)' }}>
            {/* Trust chips */}
            <div style={{ display:'flex', alignItems:'center', gap:'clamp(12px,2vw,24px)', flexWrap:'wrap', justifyContent:'center' }}>
              {['Zero Setup Cost','No Credit Card','60-Second Signup'].map((t) => (
                <div key={t} style={{ display:'flex', alignItems:'center', gap:7 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6.5" stroke="rgba(247,147,30,.38)" strokeWidth="1"/>
                    <path d="M4.5 7l1.8 1.8L9.5 5" stroke="#f7931e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:600, fontSize:'clamp(10px,1vw,12px)', letterSpacing:'.15em', textTransform:'uppercase', color:'rgba(161,161,161,.62)' }}>{t}</span>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <motion.a
              href="#"
              className="hiw-cta-btn"
              whileHover={{ scale:1.06, filter:'brightness(1.08)' }}
              whileTap={{ scale:.97 }}
              style={{
                display:'inline-flex', alignItems:'center', gap:8,
                fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800,
                fontSize:'clamp(12px,1.2vw,14px)', letterSpacing:'.2em', textTransform:'uppercase',
                background:'linear-gradient(135deg,#fe7a01,#c55a00)', color:'#fff',
                padding:'clamp(13px,1.8vh,16px) clamp(32px,4vw,52px)',
                borderRadius:999, textDecoration:'none',
              }}
            >
              Get Started Free
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </motion.div>

        </div>
      </motion.div>
    </>
  );
}

/* ─── Step card ───────────────────────────────────────────────────────────── */
function HowItWorksCard({
  step,
  isInView,
  index,
}: {
  step: { number:string; title:string; tag:string; description:string; icon:React.ReactNode; delay:number };
  isInView: boolean;
  index: number;
}) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isInView || !lineRef.current) return;
    const el = lineRef.current;
    const timer = setTimeout(() => {
      el.style.transition = `transform .75s cubic-bezier(.22,1,.36,1)`;
      el.style.transform  = 'scaleX(1)';
    }, (step.delay + 0.25) * 1000);
    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <motion.div
      className="hiw-card"
      variants={fadeInUp}
      style={{
        opacity: 0,
        animation: isInView ? `hiw-card-in .6s cubic-bezier(.22,1,.36,1) ${step.delay}s both` : 'none',
      }}
    >
      {/* Step number watermark */}
      <div style={{
        position:'absolute', top:14, right:18,
        fontFamily:"'font-heading',sans-serif", fontWeight:700,
        fontSize:'clamp(11px,1.1vw,13px)', letterSpacing:'.12em',
        color:'rgba(247,147,30,.35)',
        animation:'hiw-num-glow 3s ease-in-out infinite',
        animationDelay:`${index * .6}s`,
      }}>
        {step.number}
      </div>

      {/* Icon with double pulse rings */}
      <div style={{ position:'relative', marginTop:8, flexShrink:0 }}>
        <div style={{
          position:'absolute', inset:-10, borderRadius:'50%',
          border:'1px solid rgba(247,147,30,.2)',
          animation:`hiw-ring-pulse 2.4s ease-out ${index * .5}s infinite`,
        }} />
        <div style={{
          position:'absolute', inset:-10, borderRadius:'50%',
          border:'1px solid rgba(247,147,30,.15)',
          animation:`hiw-ring-pulse 2.4s ease-out ${index * .5 + .8}s infinite`,
        }} />
        <motion.div
          whileHover={{ scale:1.12, rotate:6 }}
          transition={{ duration:.25, ease:[.22,1,.36,1] as const }}
          style={{
            width:'clamp(56px,6.5vw,72px)', height:'clamp(56px,6.5vw,72px)',
            borderRadius:'50%',
            background:'linear-gradient(135deg,rgba(247,147,30,.2),rgba(247,147,30,.07))',
            border:'1px solid rgba(247,147,30,.32)',
            boxShadow:'0 0 28px rgba(247,147,30,.18)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}
        >
          {step.icon}
        </motion.div>
      </div>

      {/* Tag pill */}
      <div style={{ padding:'3px 12px', borderRadius:999, background:'rgba(247,147,30,.08)', border:'1px solid rgba(247,147,30,.22)' }}>
        <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:'clamp(8px,.8vw,10px)', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(247,147,30,.82)' }}>
          {step.tag}
        </span>
      </div>

      {/* Title */}
      <h3 style={{ fontFamily:"'font-heading',sans-serif", fontWeight:700, fontSize:'clamp(18px,2.2vw,26px)', color:'#f5f5f5', lineHeight:1, margin:0, textTransform:'uppercase', letterSpacing:'-.2px' }}>
        {step.title}
      </h3>

      {/* Description */}
      <p style={{ fontFamily:"'Barlow',sans-serif", fontWeight:400, fontSize:'clamp(12px,1.1vw,14px)', color:'rgba(161,161,161,.82)', lineHeight:1.7, margin:0 }}>
        {step.description}
      </p>

      {/* Animated bottom accent line */}
      <div
        ref={lineRef}
        style={{
          width:'100%', height:2, borderRadius:999, marginTop:4, flexShrink:0,
          background:'linear-gradient(90deg,#f7931e,rgba(247,147,30,.15))',
          transform:'scaleX(0)', transformOrigin:'left',
        }}
      />
    </motion.div>
  );
}
// Product Preview Section
function ProductPreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const parallax = useCursorParallax(10);
  const springX  = useSpring(parallax.x, { stiffness: 100, damping: 30 });
  const springY  = useSpring(parallax.y, { stiffness: 100, damping: 30 });

  const floatingCards = [
    { label: 'New Member', value: '✅ Rahul Sharma', sub: 'Joined today',  top: '14%', left: '-6%',  delay: 0    },
    { label: 'Revenue',    value: '₹ 1,24,000',     sub: 'This month',    top: '22%', right: '-5%', delay: 0.15 },
    { label: 'Renewals',   value: '18 Due',          sub: 'This week',     top: '62%', left: '-7%',  delay: 0.3  },
    { label: 'Attendance', value: '94%',             sub: 'Today avg.',    top: '68%', right: '-6%', delay: 0.45 },
  ];

  return (
    <>
      <style>{`
        @keyframes pp-dot    { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
        @keyframes pp-float  { 0%,100%{transform:translateY(0) rotate(-1.5deg)} 50%{transform:translateY(-18px) rotate(-1.5deg)} }
        @keyframes pp-glow   { 0%,100%{opacity:.55} 50%{opacity:1} }
        @keyframes pp-scan   { 0%{top:0;opacity:.8} 100%{top:100%;opacity:0} }
        @keyframes pp-pill-in {
          from { opacity:0; transform:translateX(var(--from-x,0)) translateY(8px); }
          to   { opacity:1; transform:translateX(0) translateY(0); }
        }
        @keyframes pp-badge-float {
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(-6px)}
        }
        @keyframes pp-shimmer {
          0%   { transform:translateX(-120%) skewX(-14deg); }
          100% { transform:translateX(320%)  skewX(-14deg); }
        }
        @keyframes pp-border-run {
          0%   { background-position:0% 50%; }
          100% { background-position:200% 50%; }
        }

        .pp-mockup-wrap {
          transform: perspective(1200px) rotateZ(2deg);
          transform-style: preserve-3d;
          transition: transform .8s cubic-bezier(.22,1,.36,1);
        }
        .pp-mockup-wrap:hover {
          transform: perspective(1200px) rotateZ(0deg);
        }
        .pp-browser {
          border-radius:18px; overflow:hidden;
          background:#111;
          border:1.5px solid rgba(254,122,1,.28);
          box-shadow:
            0 60px 120px rgba(0,0,0,.8),
            0 0 0 1px rgba(254,122,1,.12),
            0 0 100px rgba(254,122,1,.18),
            inset 0 1px 2px rgba(255,255,255,.08);
        }
        .pp-browser::after {
          content:''; position:absolute; inset:0; border-radius:18px; pointer-events:none;
          background:linear-gradient(105deg,transparent 36%,rgba(255,255,255,.04) 50%,transparent 64%);
          animation:pp-shimmer 6s ease-in-out infinite;
        }
        .pp-float-card {
          position:absolute; z-index:20;
          background:linear-gradient(135deg, rgba(30,25,15,.95) 0%, rgba(20,15,10,.9) 100%);
          backdrop-filter:blur(20px);
          border-radius:14px;
          border:1.5px solid rgba(254,122,1,.35);
          box-shadow:0 16px 50px rgba(0,0,0,.6), 0 0 30px rgba(254,122,1,.15);
          padding:12px 16px;
          animation:pp-badge-float 3.5s ease-in-out infinite;
        }
      `}</style>

      <motion.div
        ref={ref}
        className="relative w-full overflow-hidden"
        style={{ background:'linear-gradient(180deg,#141414 0%,#0f0c08 50%,#141414 100%)', padding:'clamp(64px,9vh,112px) 0' }}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >

        {/* ── Enhanced background glows ── */}
        <motion.div
          className="absolute rounded-full"
          style={{ width:'clamp(300px,38vw,560px)', height:'clamp(300px,38vw,560px)', left:'10%', top:'15%', background:'radial-gradient(circle,rgba(254,122,1,.12),transparent 70%)', filter:'blur(100px)', pointerEvents:'none' }}
          animate={{ scale:[1,1.25,1], opacity:[.6,1.1,.6] }}
          transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width:'clamp(200px,28vw,400px)', height:'clamp(200px,28vw,400px)', right:'8%', top:'35%', background:'radial-gradient(circle,rgba(254,122,1,.08),transparent 70%)', filter:'blur(100px)', pointerEvents:'none' }}
          animate={{ scale:[1,1.3,1], opacity:[.55,1.15,.55] }}
          transition={{ duration:6, repeat:Infinity, ease:'easeInOut', delay:1 }}
        />

        {/* Enhanced grid texture */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', opacity:.025, backgroundImage:'linear-gradient(rgba(254,122,1,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(254,122,1,.4) 1px,transparent 1px)', backgroundSize:'54px 54px' }} />

        {/* Top & bottom fade */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'20%', background:'linear-gradient(180deg,#141414,transparent)', pointerEvents:'none', zIndex:5 }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'20%', background:'linear-gradient(0deg,#141414,transparent)', pointerEvents:'none', zIndex:5 }} />

        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 clamp(20px,5vw,56px)' }}>

          {/* ── Header ── */}
          <motion.div variants={fadeInUp} style={{ textAlign:'center', marginBottom:'clamp(48px,7vh,72px)' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px', borderRadius:8, background:'linear-gradient(135deg, rgba(254,122,1,.12) 0%, rgba(247,147,30,.08) 100%)', border:'1.5px solid rgba(254,122,1,.35)', marginBottom:'clamp(14px,2vh,20px)' }}>
              <motion.div 
                style={{ width:7, height:7, borderRadius:'50%', background:'#fe7a01', boxShadow:'0 0 12px #fe7a01' }}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:'clamp(9px,.9vw,11px)', letterSpacing:'.34em', textTransform:'uppercase', background:'linear-gradient(135deg, #fe7a01, #f7931e)', backgroundClip:'text', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                Dashboard Preview
              </span>
            </div>

            <h2 style={{ fontFamily:"'font-heading',sans-serif", fontWeight:700, fontSize:'clamp(28px,4vw,52px)', letterSpacing:'-0.6px', lineHeight:.9, color:'#f5f5f5', margin:'0 0 clamp(12px,1.8vh,16px)', textTransform:'uppercase' }}>
              Built for{' '}
              <span style={{ background:'linear-gradient(135deg, #fe7a01 0%, #f7931e 50%, #fe7a01 100%)', backgroundClip:'text', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', textShadow:'0 0 40px rgba(254,122,1,.3)' }}>Real Work</span>
            </h2>

            <p style={{ fontFamily:"'Barlow',sans-serif", fontWeight:400, fontSize:'clamp(13px,1.3vw,16px)', color:'rgba(161,161,161,.85)', lineHeight:1.8, maxWidth:560, margin:'0 auto' }}>
              A powerful, intuitive dashboard that helps gym owners manage every aspect of their business with speed and confidence.
            </p>
          </motion.div>

          {/* ── Mockup area with 3D perspective ── */}
          <motion.div
            variants={fadeInUp}
            style={{ position:'relative', display:'flex', justifyContent:'center', paddingTop:40 }}
          >
            {/* Floating stat cards — left with enhanced styling */}
            {floatingCards.filter((_,i) => i%2===0).map((card, i) => (
              <motion.div
                key={card.label}
                className="pp-float-card hidden lg:block"
                style={{
                  top:card.top, left:card.left,
                  animationDelay:`${i * .6}s`,
                  animationDuration:`${3.2 + i * .4}s`,
                  ['--from-x' as any]: '-16px',
                  opacity:0,
                  animation: isInView
                    ? `pp-pill-in .55s ease ${card.delay + .4}s forwards, pp-badge-float ${3.2+i*.4}s ease-in-out ${card.delay + 1.2}s infinite`
                    : 'none',
                }}
              >
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:600, fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', background:'linear-gradient(135deg, #fe7a01, #f7931e)', backgroundClip:'text', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:5 }}>{card.label}</div>
                <div style={{ fontFamily:"'font-heading',sans-serif", fontWeight:700, fontSize:'clamp(13px,1.4vw,16px)', color:'#f5f5f5', lineHeight:1.1, marginBottom:3 }}>{card.value}</div>
                <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:10, color:'rgba(161,161,161,.6)' }}>{card.sub}</div>
              </motion.div>
            ))}

            {/* Floating stat cards — right with enhanced styling */}
            {floatingCards.filter((_,i) => i%2===1).map((card, i) => (
              <motion.div
                key={card.label}
                className="pp-float-card hidden lg:block"
                style={{
                  top:card.top, right:card.right,
                  animationDelay:`${i * .6}s`,
                  animationDuration:`${3.5 + i * .35}s`,
                  ['--from-x' as any]: '16px',
                  opacity:0,
                  animation: isInView
                    ? `pp-pill-in .55s ease ${card.delay + .4}s forwards, pp-badge-float ${3.5+i*.35}s ease-in-out ${card.delay + 1.2}s infinite`
                    : 'none',
                }}
              >
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:600, fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', background:'linear-gradient(135deg, #fe7a01, #f7931e)', backgroundClip:'text', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:5 }}>{card.label}</div>
                <div style={{ fontFamily:"'font-heading',sans-serif", fontWeight:700, fontSize:'clamp(13px,1.4vw,16px)', color:'#f5f5f5', lineHeight:1.1, marginBottom:3 }}>{card.value}</div>
                <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:10, color:'rgba(161,161,161,.6)' }}>{card.sub}</div>
              </motion.div>
            ))}

            {/* 3D Leaning Browser mockup */}
            <motion.div
              style={{ x:springX, y:springY, width:'100%', maxWidth:'clamp(500px,82vw,1020px)', animation:'pp-float 5s ease-in-out infinite', position:'relative', zIndex:10 }}
            >
              {/* Enhanced under-glow */}
              <div style={{ position:'absolute', inset:'-8%', background:'radial-gradient(ellipse at 50% 70%, rgba(254,122,1,.25), transparent 60%)', filter:'blur(60px)', borderRadius:28, zIndex:0 }} />
              
              {/* Additional depth shadow */}
              <div style={{ position:'absolute', inset:'-5%', background:'radial-gradient(ellipse at 50% 80%, rgba(254,122,1,.1), transparent 70%)', filter:'blur(80px)', borderRadius:32, zIndex:0 }} />

              <div className="pp-browser pp-mockup-wrap" style={{ position:'relative', zIndex:1 }}>

                {/* Chrome bar */}
                <div style={{ background:'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)', borderBottom:'1.5px solid rgba(254,122,1,.15)', padding:'clamp(10px,1.5vw,14px) clamp(14px,2vw,20px)', display:'flex', alignItems:'center', gap:'clamp(12px,2vw,20px)' }}>
                  {/* Traffic lights */}
                  <div style={{ display:'flex', gap:8, flexShrink:0 }}>
                    {['#fb2c36','#f0b100','#00c950'].map((c,i)=>(
                      <motion.div key={i} whileHover={{ scale:1.4, opacity:1 }}
                        style={{ width:'clamp(8px,1vw,12px)', height:'clamp(8px,1vw,12px)', borderRadius:'50%', background:c, opacity:0.8, boxShadow:`0 0 8px ${c}` }} />
                    ))}
                  </div>

                  {/* URL bar */}
                  <div style={{ flex:1, background:'#1a1a1a', borderRadius:8, padding:'clamp(4px,.7vh,7px) clamp(10px,1.5vw,16px)', border:'1px solid rgba(254,122,1,.15)', display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:'#fe7a01', flexShrink:0, boxShadow:'0 0 8px #fe7a01' }} />
                    <span style={{ fontFamily:'monospace', fontSize:'clamp(9px,.9vw,12px)', color:'rgba(255,255,255,.4)' }}>app.gymsaathi.com/dashboard</span>
                    <div style={{ marginLeft:'auto', display:'flex', gap:6 }}>
                      {[1,2,3].map(i=><div key={i} style={{ width:'clamp(20px,2.5vw,28px)', height:6, borderRadius:3, background:'rgba(254,122,1,.08)' }} />)}
                    </div>
                  </div>
                </div>

                {/* Dashboard body */}
                <div style={{ background:'linear-gradient(180deg, #0d0d0d 0%, #0a0a0a 100%)', padding:'clamp(12px,2vw,20px)', minHeight:'clamp(240px,38vh,460px)' }}>

                  {/* Top KPI row */}
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'clamp(8px,1.2vw,14px)', marginBottom:'clamp(12px,1.8vw,16px)' }}>
                    {[
                      { l:'Members',     v:'247', d:'+12 this week', c:'#fe7a01' },
                      { l:'Revenue',     v:'₹1.2L', d:'+8% vs last mo', c:'#22c55e' },
                      { l:'Renewals Due', v:'18',  d:'Due in 7 days',  c:'#ef4444' },
                      { l:'Attendance',  v:'94%',  d:'Today avg.',     c:'#3b82f6' },
                    ].map((k,i)=>(
                      <motion.div 
                        key={i} 
                        whileHover={{ y: -4, borderColor: k.c, boxShadow: `0 0 20px ${k.c}40` }}
                        style={{ background:'linear-gradient(135deg, #161616 0%, #1a1a1a 100%)', borderRadius:'clamp(8px,1vw,12px)', padding:'clamp(10px,1.5vw,16px)', border:`1.5px solid ${k.c}25`, transition:'all 0.3s' }}>
                        <div style={{ fontSize:'clamp(8px,.75vw,10px)', color:'rgba(255,255,255,.4)', letterSpacing:'.14em', textTransform:'uppercase', marginBottom:'clamp(4px,.6vh,7px)', fontWeight:600 }}>{k.l}</div>
                        <div style={{ fontFamily:"'font-heading',sans-serif", fontSize:'clamp(16px,2.2vw,28px)', color:k.c, lineHeight:1, letterSpacing:'-.02em', marginBottom:4, textShadow:`0 0 20px ${k.c}60` }}>{k.v}</div>
                        <div style={{ fontSize:'clamp(8px,.7vw,10px)', color:'rgba(255,255,255,.3)' }}>{k.d}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chart + member list row */}
                  <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:'clamp(8px,1.2vw,14px)', marginBottom:'clamp(8px,1.2vw,14px)' }}>
                    {/* Bar chart */}
                    <div style={{ background:'linear-gradient(135deg, #161616 0%, #1a1a1a 100%)', borderRadius:'clamp(8px,1vw,12px)', padding:'clamp(10px,1.5vw,16px)', border:'1.5px solid rgba(254,122,1,.12)' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'clamp(8px,1.2vw,14px)' }}>
                        <span style={{ fontSize:'clamp(8px,.75vw,10px)', color:'rgba(255,255,255,.5)', letterSpacing:'.12em', textTransform:'uppercase', fontWeight:600 }}>Monthly Revenue</span>
                        <span style={{ fontSize:'clamp(7px,.65vw,9px)', color:'#fe7a01', padding:'3px 10px', borderRadius:4, background:'rgba(254,122,1,.15)', border:'1px solid rgba(254,122,1,.3)', fontWeight:600 }}>This Year</span>
                      </div>
                      <div style={{ display:'flex', alignItems:'flex-end', gap:'clamp(3px,.5vw,6px)', height:'clamp(52px,7vh,80px)' }}>
                        {[38,55,42,72,58,88,65,100,78,92,68,100].map((h,i)=>(
                          <motion.div 
                            key={i} 
                            whileHover={{ opacity: 1 }}
                            style={{ flex:1, height:`${h}%`, background:i===11?'#fe7a01':i===7?'rgba(254,122,1,.6)':'rgba(254,122,1,.25)', borderRadius:'3px 3px 0 0', transition:'all .3s', opacity: i===11 || i===7 ? 0.9 : 0.7 }} 
                          />
                        ))}
                      </div>
                      <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
                        {['J','F','M','A','M','J','J','A','S','O','N','D'].map((m,i)=>(
                          <span key={i} style={{ flex:1, textAlign:'center', fontSize:'clamp(6px,.6vw,8px)', color:'rgba(255,255,255,.25)', fontWeight:500 }}>{m}</span>
                        ))}
                      </div>
                    </div>

                    {/* Member activity */}
                    <div style={{ background:'linear-gradient(135deg, #161616 0%, #1a1a1a 100%)', borderRadius:'clamp(8px,1vw,12px)', padding:'clamp(10px,1.5vw,16px)', border:'1.5px solid rgba(254,122,1,.12)', overflow:'hidden' }}>
                      <div style={{ fontSize:'clamp(8px,.75vw,10px)', color:'rgba(255,255,255,.5)', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'clamp(8px,1.2vw,12px)', fontWeight:600 }}>Recent Members</div>
                      {[
                        { n:'Rahul S.', s:'Active',    c:'#22c55e' },
                        { n:'Priya M.', s:'Renewal',   c:'#f7931e' },
                        { n:'Amit K.',  s:'New',       c:'#3b82f6' },
                        { n:'Neha P.',  s:'Active',    c:'#22c55e' },
                        { n:'Vijay R.', s:'Overdue',   c:'#ef4444' },
                      ].map((m,i)=>(
                        <motion.div 
                          key={i} 
                          whileHover={{ backgroundColor: 'rgba(254,122,1,.08)' }}
                          style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'clamp(5px,.8vh,8px) 0', borderBottom:i<4?'1px solid rgba(255,255,255,.05)':'none', transition:'all 0.3s', cursor:'pointer' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:'clamp(6px,1vw,10px)' }}>
                            <div style={{ width:'clamp(20px,2.4vw,28px)', height:'clamp(20px,2.4vw,28px)', borderRadius:'50%', background:`${m.c}30`, border:`1.5px solid ${m.c}60`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'clamp(7px,.7vw,9px)', color:m.c, fontWeight:700, boxShadow:`0 0 12px ${m.c}40` }}>{m.n[0]}</div>
                            <span style={{ fontSize:'clamp(9px,.85vw,11px)', color:'rgba(255,255,255,.7)' }}>{m.n}</span>
                          </div>
                          <span style={{ fontSize:'clamp(7px,.65vw,9px)', color:m.c, padding:'3px 9px', borderRadius:999, background:`${m.c}20`, border:`1px solid ${m.c}40`, fontWeight:600 }}>{m.s}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Quick actions bar */}
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'clamp(6px,.9vw,10px)' }}>
                    {['Add Member','Record Payment','Send Reminder','View Reports'].map((a,i)=>(
                      <motion.div 
                        key={i} 
                        whileHover={{ background:'rgba(254,122,1,.12)', borderColor:'rgba(254,122,1,.4)' }}
                        style={{ background:'#1a1a1a', borderRadius:8, padding:'clamp(7px,1vw,10px)', border:'1px solid rgba(254,122,1,.15)', textAlign:'center', cursor:'pointer', transition:'all 0.3s' }}>
                        <span style={{ fontSize:'clamp(8px,.75vw,10px)', color:'rgba(255,255,255,.5)', letterSpacing:'.08em', fontWeight:600 }}>{a}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Scan line effect */}
                <div style={{ position:'absolute', inset:0, overflow:'hidden', borderRadius:18, pointerEvents:'none', zIndex:5 }}>
                  <div style={{ position:'absolute', left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,rgba(254,122,1,.7),rgba(255,200,87,.4),rgba(254,122,1,.7),transparent)', boxShadow:'0 0 15px rgba(254,122,1,.5)', animation:'pp-scan 5s linear infinite' }} />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Feature chips below mockup ── */}
          <motion.div
            variants={fadeInUp}
            style={{ marginTop:'clamp(50px,7vh,80px)', display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'clamp(10px,1.5vw,14px)' }}
          >
            {[
              { icon:'⚡', text:'Instant Setup'     },
              { icon:'📱', text:'Mobile Ready'      },
              { icon:'🔒', text:'Secure Data'       },
              { icon:'📊', text:'Live Analytics'    },
              { icon:'💬', text:'WhatsApp Alerts'   },
              { icon:'🤖', text:'AI Diet Planner'   },
            ].map((chip) => (
              <motion.div
                key={chip.text}
                whileHover={{ scale:1.08, borderColor:'rgba(254,122,1,.6)', y:-3, boxShadow:'0 0 25px rgba(254,122,1,.3)' }}
                style={{
                  display:'inline-flex', alignItems:'center', gap:10,
                  padding:'clamp(10px,1.4vh,13px) clamp(16px,2.2vw,24px)', borderRadius:999,
                  background:'linear-gradient(135deg, rgba(30,25,15,.95) 0%, rgba(20,15,10,.9) 100%)', backdropFilter:'blur(16px)',
                  border:'1.5px solid rgba(254,122,1,.28)',
                  cursor:'default', transition:'all .3s',
                }}
              >
                <span style={{ fontSize:'clamp(12px,1.4vw,15px)', filter:'drop-shadow(0 0 4px rgba(254,122,1,.5))' }}>{chip.icon}</span>
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:'clamp(10px,1vw,13px)', letterSpacing:'.16em', textTransform:'uppercase', background:'linear-gradient(135deg, #fe7a01, #f7931e)', backgroundClip:'text', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{chip.text}</span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </motion.div>
    </>
  );
}
// Why Choose Section
function WhyChooseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const benefits = [
    {
      num: '01',
      title: 'Zero Cost to Start',
      highlight: 'Free Software + Website',
      desc: 'Full gym ERP, a personalized website, and member app — completely free. No setup fees, no hidden charges, no lock-in contracts.',
      stat: '₹0', statLabel: 'Setup Cost',
      delay: 0.1,
    },
    {
      num: '02',
      title: 'Member Retention',
      highlight: 'WhatsApp Integration',
      desc: 'Automated reminders for renewals, payments, and updates keep members engaged without a single manual follow-up.',
      stat: '40%', statLabel: 'Avg. Retention Boost',
      delay: 0.2,
    },
    {
      num: '03',
      title: 'Hours Saved Weekly',
      highlight: 'Auto Billing & Follow-ups',
      desc: 'Billing, attendance, and reminders all run on autopilot — giving you back 8+ hours every week to focus on growth.',
      stat: '8h+', statLabel: 'Saved Per Week',
      delay: 0.3,
    },
    {
      num: '04',
      title: 'Go Live in 60 Min',
      highlight: 'Easy Onboarding & Support',
      desc: 'Dedicated onboarding support in Hindi & English. Your gym is fully digital in under an hour — guaranteed.',
      stat: '60m', statLabel: 'Time to Launch',
      delay: 0.4,
    },
  ];

  return (
    <>
      <style>{`
        @keyframes wcs-dot    { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.6)} }
        @keyframes wcs-row-in { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes wcs-stat-in{ from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes wcs-line   { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes wcs-num-glow{ 0%,100%{opacity:.08} 50%{opacity:.14} }
        @keyframes wcs-cta-glow{
          0%,100%{box-shadow:0 0 18px rgba(254,122,1,.4),0 4px 20px rgba(0,0,0,.4);}
          50%    {box-shadow:0 0 38px rgba(254,122,1,.75),0 4px 30px rgba(0,0,0,.5);}
        }
        @keyframes wcs-shimmer{
          0%  {transform:translateX(-120%) skewX(-14deg);}
          100%{transform:translateX(320%)  skewX(-14deg);}
        }

        .wcs-row {
          display:grid;
          grid-template-columns: clamp(48px,6vw,72px) 1fr clamp(80px,12vw,140px);
          gap: clamp(20px,3.5vw,48px);
          align-items:center;
          padding: clamp(28px,4vh,44px) 0;
          position:relative;
          transition: background .2s;
          border-radius:12px;
        }
        .wcs-row:hover .wcs-title { color: #fe7a01 !important; }
        .wcs-row:hover .wcs-accent-line { transform: scaleX(1) !important; }

        .wcs-cta-btn {
          position:relative; overflow:hidden;
          animation: wcs-cta-glow 3s ease-in-out infinite;
        }
        .wcs-cta-btn::after {
          content:''; position:absolute; inset:0; border-radius:inherit;
          background:linear-gradient(105deg,transparent 36%,rgba(255,255,255,.22) 50%,transparent 64%);
          animation:wcs-shimmer 3.5s ease-in-out infinite; pointer-events:none;
        }

        @media(max-width:600px){
          .wcs-row { grid-template-columns:clamp(36px,8vw,52px) 1fr !important; }
          .wcs-stat-col { display:none !important; }
        }
      `}</style>

      <motion.div
        ref={ref}
        className="relative w-full overflow-hidden"
        style={{ background:'#0b0b0b', padding:'clamp(64px,9vh,112px) 0' }}
      >
        {/* Ambient */}
        <div style={{ position:'absolute', top:'10%', left:'-6%', width:'clamp(280px,36vw,500px)', height:'clamp(280px,36vw,500px)', borderRadius:'50%', background:'radial-gradient(circle,rgba(254,122,1,.06),transparent 70%)', filter:'blur(80px)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'5%', right:'-4%', width:'clamp(220px,28vw,380px)', height:'clamp(220px,28vw,380px)', borderRadius:'50%', background:'radial-gradient(circle,rgba(254,122,1,.04),transparent 70%)', filter:'blur(80px)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', opacity:.02, backgroundImage:'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)', backgroundSize:'54px 54px' }} />

        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 clamp(20px,5vw,56px)' }}>

          {/* ── Header — left-aligned, bold ── */}
          <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)', gap:'clamp(32px,5vw,64px)', alignItems:'flex-end', marginBottom:'clamp(48px,7vh,72px)' }} className="wcs-header-grid">
            <motion.div
              initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.65, ease:[.22,1,.36,1] as const }}
            >
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 14px', borderRadius:4, background:'rgba(254,122,1,.07)', border:'1px solid rgba(254,122,1,.28)', marginBottom:'clamp(14px,2vh,22px)' }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:'#fe7a01', boxShadow:'0 0 8px #fe7a01', animation:'wcs-dot 2s ease-in-out infinite' }} />
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:'clamp(9px,.9vw,11px)', letterSpacing:'.34em', textTransform:'uppercase', color:'#fe7a01' }}>Why GymSaathi</span>
              </div>

              <h2 style={{ fontFamily:"'font-heading',sans-serif", fontWeight:700, fontSize:'clamp(28px,4.2vw,54px)', letterSpacing:'-.5px', lineHeight:.92, textTransform:'uppercase', color:'#f5f5f5', margin:0 }}>
                Why Gym Owners<br/>
                <span style={{ color:'#fe7a01', textShadow:'0 0 28px rgba(254,122,1,.38)' }}>Choose Us</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6, delay:.15, ease:[.22,1,.36,1] as const }}
            >
              <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:'clamp(13px,1.3vw,16px)', color:'rgba(161,161,161,.78)', lineHeight:1.75, marginBottom:'clamp(16px,2.5vh,24px)' }}>
                Built specifically for Indian gym owners — with features that make a real difference from day one. Zero cost, maximum impact.
              </p>
              <div style={{ display:'flex', gap:24, flexWrap:'wrap' }}>
                {[{v:'107+',l:'Gyms'},{v:'14K+',l:'Members'},{v:'99.5%',l:'Uptime'}].map((s,i)=>(
                  <div key={i} style={{ borderLeft:'2px solid rgba(254,122,1,.4)', paddingLeft:'clamp(10px,1.5vw,14px)' }}>
                    <div style={{ fontFamily:"'font-heading',sans-serif", fontWeight:700, fontSize:'clamp(18px,2.2vw,26px)', color:'#fe7a01', lineHeight:1 }}>{s.v}</div>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:600, fontSize:'clamp(9px,.85vw,11px)', color:'rgba(161,161,161,.45)', letterSpacing:'.18em', textTransform:'uppercase', marginTop:3 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Divider ── */}
          <motion.div
            initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }} transition={{ duration:.7, ease:[.22,1,.36,1] as const }}
            style={{ height:1, background:'linear-gradient(90deg,rgba(254,122,1,.5),rgba(254,122,1,.15),transparent)', transformOrigin:'left', marginBottom:'clamp(8px,1.5vh,12px)' }}
          />

          {/* ── Numbered benefit rows ── */}
          <div>
            {benefits.map((b, i) => (
              <motion.div
                key={b.num}
                initial={{ opacity:0, x:-18 }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }}
                transition={{ duration:.6, delay:b.delay, ease:[.22,1,.36,1] as const }}
              >
                <div className="wcs-row" style={{ animationDelay:`${b.delay}s` }}>

                  {/* Big number — far left */}
                  <div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'flex-start' }}>
                    {/* Ghost number behind */}
                    <div style={{
                      position:'absolute', left:0,
                      fontFamily:"'font-heading',sans-serif", fontWeight:700,
                      fontSize:'clamp(52px,8vw,96px)',
                      color:'#fe7a01', lineHeight:1,
                      animation:'wcs-num-glow 4s ease-in-out infinite',
                      animationDelay:`${i*.5}s`,
                      userSelect:'none', pointerEvents:'none',
                      letterSpacing:'-.02em',
                    }}>
                      {b.num}
                    </div>
                    {/* Visible number */}
                    <div style={{
                      position:'relative', zIndex:1,
                      fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800,
                      fontSize:'clamp(11px,1.1vw,13px)', letterSpacing:'.3em',
                      color:'rgba(254,122,1,.55)', textTransform:'uppercase',
                      marginTop:'clamp(36px,5vw,56px)',
                    }}>
                      {b.num}
                    </div>
                  </div>

                  {/* Content — middle */}
                  <div>
                    {/* Highlight tag */}
                    <div style={{ marginBottom:'clamp(8px,1.2vh,12px)' }}>
                      <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:'clamp(9px,.88vw,11px)', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(254,122,1,.7)' }}>
                        {b.highlight}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="wcs-title" style={{
                      fontFamily:"'font-heading',sans-serif", fontWeight:700,
                      fontSize:'clamp(22px,3vw,38px)',
                      color:'#f5f5f5', margin:'0 0 clamp(10px,1.5vh,14px)',
                      textTransform:'uppercase', letterSpacing:'-.3px',
                      lineHeight:.95, transition:'color .25s',
                    }}>
                      {b.title}
                    </h3>

                    {/* Description */}
                    <p style={{
                      fontFamily:"'Barlow',sans-serif", fontWeight:400,
                      fontSize:'clamp(13px,1.25vw,15px)',
                      color:'rgba(161,161,161,.75)', lineHeight:1.72,
                      maxWidth:520, margin:0,
                    }}>
                      {b.desc}
                    </p>

                    {/* Hover accent line */}
                    <div className="wcs-accent-line" style={{
                      height:2, width:'clamp(32px,4vw,48px)', borderRadius:999,
                      background:'linear-gradient(90deg,#fe7a01,rgba(254,122,1,.3))',
                      marginTop:'clamp(14px,2vh,18px)',
                      transform:'scaleX(0)', transformOrigin:'left',
                      transition:'transform .3s cubic-bezier(.22,1,.36,1)',
                    }} />
                  </div>

                  {/* Stat — far right */}
                  <div className="wcs-stat-col" style={{ textAlign:'right' }}>
                    <div style={{
                      fontFamily:"'font-heading',sans-serif", fontWeight:700,
                      fontSize:'clamp(28px,4vw,48px)', color:'#fe7a01', lineHeight:1,
                      textShadow:'0 0 24px rgba(254,122,1,.35)',
                      animation: isInView ? `wcs-stat-in .5s ease ${b.delay+.2}s both` : 'none',
                      opacity:0,
                    }}>
                      {b.stat}
                    </div>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:600, fontSize:'clamp(9px,.85vw,11px)', color:'rgba(161,161,161,.4)', letterSpacing:'.18em', textTransform:'uppercase', marginTop:4 }}>
                      {b.statLabel}
                    </div>
                  </div>
                </div>

                {/* Divider between rows */}
                {i < benefits.length - 1 && (
                  <div style={{ height:1, background:'linear-gradient(90deg,rgba(254,122,1,.12),rgba(255,255,255,.04),transparent)' }} />
                )}
              </motion.div>
            ))}
          </div>

          {/* ── Bottom divider + CTA ── */}
          <motion.div
            initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }} transition={{ duration:.7, delay:.3, ease:[.22,1,.36,1] as const }}
            style={{ height:1, background:'linear-gradient(90deg,rgba(254,122,1,.5),rgba(254,122,1,.15),transparent)', transformOrigin:'left', margin:'clamp(36px,5vh,52px) 0 clamp(32px,5vh,48px)' }}
          />

          <motion.div
            initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6, delay:.2 }}
            style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'clamp(16px,3vw,32px)' }}
          >
            <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:'clamp(13px,1.25vw,16px)', color:'rgba(161,161,161,.6)', margin:0, lineHeight:1.6 }}>
              Join <span style={{ color:'#f5f5f5', fontWeight:600 }}>107+ gyms</span> managing smarter with GymSaathi
            </p>

            <div style={{ display:'flex', gap:'clamp(10px,1.5vw,14px)', flexWrap:'wrap' }}>
              <motion.button
                className="wcs-cta-btn"
                whileHover={{ scale:1.06, filter:'brightness(1.1)' }} whileTap={{ scale:.97 }}
                style={{ background:'linear-gradient(135deg,#fe7a01,#c55a00)', color:'#fff', border:'none', cursor:'pointer', borderRadius:999, fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:'clamp(12px,1.2vw,14px)', letterSpacing:'.18em', textTransform:'uppercase', padding:'clamp(12px,1.7vh,15px) clamp(26px,3.5vw,40px)', whiteSpace:'nowrap', display:'inline-flex', alignItems:'center', gap:8 }}
              >
                Get Started Free
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </motion.button>

              <motion.button
                whileHover={{ scale:1.05, borderColor:'rgba(254,122,1,.6)', color:'#fe7a01' }} whileTap={{ scale:.97 }}
                style={{ background:'transparent', border:'1.5px solid rgba(255,255,255,.18)', color:'rgba(245,245,245,.65)', cursor:'pointer', borderRadius:999, fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:'clamp(12px,1.2vw,14px)', letterSpacing:'.18em', textTransform:'uppercase', padding:'clamp(12px,1.7vh,15px) clamp(26px,3.5vw,40px)', whiteSpace:'nowrap', transition:'all .22s' }}
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>

        </div>

        <style>{`@media(max-width:700px){.wcs-header-grid{grid-template-columns:1fr !important;}}`}</style>
      </motion.div>
    </>
  );
}

// Support Section
function SupportSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const supportCards = [
    {
      title: 'Guided Onboarding',
      description: "We walk you through setup, data import, and training. Your gym goes fully digital in under 60 minutes.",
      icon: <IconSupport />,
      tag: 'Step-by-Step',
      stat: '60m',
      statLabel: 'Avg. Setup Time',
      delay: 0.1,
    },
    {
      title: '24/7 Live Support',
      description: 'Our team is always on — WhatsApp, call, or email. Real humans, not bots, available around the clock.',
      icon: <IconClock />,
      tag: 'Always On',
      stat: '24/7',
      statLabel: 'Response Time',
      delay: 0.22,
    },
    {
      title: 'Training Resources',
      description: 'Video walkthroughs, guides, and live webinars help your team master every feature at their own pace.',
      icon: <IconBook />,
      tag: 'Self-Paced',
      stat: '50+',
      statLabel: 'Guides & Videos',
      delay: 0.34,
    },
  ];

  return (
    <>
      <style>{`
        @keyframes sc-dot      { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.6)} }
        @keyframes sc-shimmer  { 0%{transform:translateX(-120%) skewX(-14deg)} 100%{transform:translateX(320%) skewX(-14deg)} }
        @keyframes sc-breathe  { 0%,100%{opacity:.05} 50%{opacity:.12} }
        @keyframes sc-card-in  { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes sc-line     { from{transform:scaleX(0);transform-origin:left} to{transform:scaleX(1);transform-origin:left} }
        @keyframes sc-icon-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(254,122,1,.4)} 60%{box-shadow:0 0 0 14px rgba(254,122,1,0)} }

        .sc-card {
          position:relative; overflow:hidden;
          background:linear-gradient(145deg,#111,#0e0e0e);
          border:1px solid rgba(255,255,255,.07);
          border-radius:20px;
          padding:clamp(28px,3.8vw,44px) clamp(24px,3vw,36px);
          display:flex; flex-direction:column; gap:clamp(16px,2.5vh,24px);
          transition:transform .3s ease, border-color .3s ease, box-shadow .3s ease;
          cursor:default;
        }
        .sc-card:hover {
          transform:translateY(-8px);
          border-color:rgba(254,122,1,.28);
          box-shadow:0 28px 70px rgba(0,0,0,.6), 0 0 0 1px rgba(254,122,1,.12), 0 0 50px rgba(254,122,1,.06);
        }
        .sc-card::after {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:linear-gradient(105deg,transparent 36%,rgba(255,255,255,.04) 50%,transparent 64%);
          animation:sc-shimmer 5.5s ease-in-out infinite;
        }
        .sc-card:nth-child(2)::after { animation-delay:1s; }
        .sc-card:nth-child(3)::after { animation-delay:2s; }

        .sc-card:hover .sc-hover-glow { opacity:1 !important; }
        .sc-card:hover .sc-accent-line { transform:scaleX(1) !important; }
      `}</style>

      <motion.div
        ref={ref}
        className="relative w-full overflow-hidden"
        style={{ background:'linear-gradient(180deg,#0a0a0a 0%,#080808 100%)', padding:'clamp(64px,9vh,112px) 0' }}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >

        {/* Ambient glows */}
        <div style={{ position:'absolute', top:'15%', left:'-5%', width:'clamp(280px,34vw,480px)', height:'clamp(280px,34vw,480px)', borderRadius:'50%', background:'radial-gradient(circle,rgba(254,122,1,.055),transparent 70%)', filter:'blur(80px)', pointerEvents:'none', animation:'sc-breathe 6s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:'10%', right:'-5%', width:'clamp(220px,26vw,380px)', height:'clamp(220px,26vw,380px)', borderRadius:'50%', background:'radial-gradient(circle,rgba(254,122,1,.04),transparent 70%)', filter:'blur(80px)', pointerEvents:'none', animation:'sc-breathe 7s ease-in-out 1.2s infinite' }} />
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', opacity:.02, backgroundImage:'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)', backgroundSize:'54px 54px' }} />

        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 clamp(20px,5vw,56px)' }}>

          {/* ── Header ── */}
          <motion.div variants={fadeInUp} style={{ textAlign:'center', marginBottom:'clamp(48px,7vh,72px)' }}>
            {/* Eyebrow */}
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 14px', borderRadius:4, background:'rgba(254,122,1,.07)', border:'1px solid rgba(254,122,1,.28)', marginBottom:'clamp(14px,2vh,22px)' }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'#fe7a01', boxShadow:'0 0 8px #fe7a01', animation:'sc-dot 2s ease-in-out infinite' }} />
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:'clamp(9px,.9vw,11px)', letterSpacing:'.34em', textTransform:'uppercase', color:'#fe7a01' }}>
                Support & Onboarding
              </span>
            </div>

            <h2 style={{ fontFamily:"'font-heading',sans-serif", fontWeight:700, fontSize:'clamp(28px,4vw,52px)', letterSpacing:'-.5px', lineHeight:.92, textTransform:'uppercase', color:'#f5f5f5', margin:'0 0 clamp(12px,1.8vh,16px)' }}>
              We're Here to Help<br/>
              <span style={{ color:'#fe7a01', textShadow:'0 0 28px rgba(254,122,1,.38)' }}>You Succeed</span>
            </h2>

            <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:'clamp(13px,1.3vw,16px)', color:'rgba(161,161,161,.78)', lineHeight:1.72, maxWidth:500, margin:'0 auto' }}>
              From day one to full scale — our team is with you every step of the way.
            </p>
          </motion.div>

          {/* ── 3 Cards ── */}
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit,minmax(clamp(260px,28vw,360px),1fr))',
            gap:'clamp(16px,2.2vw,24px)',
            marginBottom:'clamp(40px,6vh,60px)',
          }}>
            {supportCards.map((card, i) => (
              <motion.div
                key={card.title}
                style={{
                  opacity:0,
                  animation: isInView ? `sc-card-in .6s cubic-bezier(.22,1,.36,1) ${card.delay}s both` : 'none',
                }}
              >
                <div className="sc-card">

                  {/* Hover gradient overlay */}
                  <div className="sc-hover-glow" style={{
                    position:'absolute', inset:0, borderRadius:20, pointerEvents:'none',
                    background:'linear-gradient(135deg,rgba(254,122,1,.05),transparent 60%)',
                    opacity:0, transition:'opacity .3s',
                  }} />

                  {/* Top row: icon + tag */}
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>

                    {/* Icon with pulse ring */}
                    <div style={{ position:'relative', flexShrink:0 }}>
                      <div style={{
                        position:'absolute', inset:-6, borderRadius:'50%',
                        border:'1px solid rgba(254,122,1,.18)',
                        animation:`sc-icon-pulse 2.5s ease-out ${i*.6}s infinite`,
                      }} />
                      <div style={{
                        width:'clamp(52px,6.5vw,68px)', height:'clamp(52px,6.5vw,68px)',
                        borderRadius:'50%',
                        background:'linear-gradient(135deg,rgba(254,122,1,.18),rgba(254,122,1,.06))',
                        border:'1px solid rgba(254,122,1,.28)',
                        boxShadow:'0 0 24px rgba(254,122,1,.16)',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        transition:'transform .25s ease, box-shadow .25s',
                      }}
                        className="sc-icon-circle"
                      >
                        {card.icon}
                      </div>
                    </div>

                    {/* Tag */}
                    <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:'clamp(8px,.8vw,10px)', letterSpacing:'.2em', textTransform:'uppercase', padding:'3px 10px', borderRadius:4, background:'rgba(254,122,1,.09)', border:'1px solid rgba(254,122,1,.25)', color:'rgba(254,122,1,.82)' }}>
                      {card.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontFamily:"'font-heading',sans-serif", fontWeight:700, fontSize:'clamp(18px,2vw,24px)', color:'#f5f5f5', margin:0, lineHeight:1, textTransform:'uppercase', letterSpacing:'-.2px' }}>
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p style={{ fontFamily:"'Barlow',sans-serif", fontWeight:400, fontSize:'clamp(13px,1.2vw,15px)', color:'rgba(161,161,161,.78)', lineHeight:1.72, margin:0, flex:1 }}>
                    {card.description}
                  </p>

                  {/* Stat */}
                  <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginTop:'auto' }}>
                    <div>
                      <div style={{ fontFamily:"'font-heading',sans-serif", fontWeight:700, fontSize:'clamp(26px,3.5vw,42px)', color:'#fe7a01', lineHeight:1, textShadow:'0 0 20px rgba(254,122,1,.3)' }}>
                        {card.stat}
                      </div>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:600, fontSize:'clamp(9px,.85vw,11px)', color:'rgba(161,161,161,.42)', letterSpacing:'.18em', textTransform:'uppercase', marginTop:4 }}>
                        {card.statLabel}
                      </div>
                    </div>

                    {/* Arrow indicator */}
                    <div style={{ width:32, height:32, borderRadius:'50%', background:'rgba(254,122,1,.08)', border:'1px solid rgba(254,122,1,.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7h10M7 2l5 5-5 5" stroke="#fe7a01" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="sc-accent-line" style={{
                    height:2, borderRadius:999,
                    background:'linear-gradient(90deg,#fe7a01,rgba(254,122,1,.15))',
                    transform:'scaleX(0)', transformOrigin:'left',
                    transition:'transform .4s cubic-bezier(.22,1,.36,1)',
                    flexShrink:0,
                  }} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Bottom trust banner ── */}
          <motion.div
            variants={fadeInUp}
            style={{
              borderRadius:16,
              background:'linear-gradient(135deg,rgba(254,122,1,.06) 0%,rgba(254,122,1,.02) 100%)',
              border:'1px solid rgba(254,122,1,.14)',
              padding:'clamp(20px,3vw,32px) clamp(24px,4vw,44px)',
              display:'flex', alignItems:'center', justifyContent:'space-between',
              flexWrap:'wrap', gap:'clamp(16px,3vw,32px)',
            }}
          >
            <div style={{ display:'flex', alignItems:'center', gap:'clamp(12px,2vw,20px)', flexWrap:'wrap' }}>
              {/* Pulsing dot */}
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 10px rgba(34,197,94,.7)', animation:'sc-dot 1.8s ease-in-out infinite' }} />
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:'clamp(10px,1vw,12px)', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(34,197,94,.85)' }}>
                  All Systems Live
                </span>
              </div>

              <div style={{ width:1, height:20, background:'rgba(255,255,255,.08)' }} />

              {[
                { icon:'💬', text:'WhatsApp Support' },
                { icon:'📞', text:'Phone & Email'    },
                { icon:'🇮🇳', text:'Hindi + English'  },
              ].map((t,i)=>(
                <div key={i} style={{ display:'flex', alignItems:'center', gap:7 }}>
                  <span style={{ fontSize:'clamp(12px,1.4vw,15px)' }}>{t.icon}</span>
                  <span style={{ fontFamily:"'Barlow',sans-serif", fontSize:'clamp(11px,1.1vw,13px)', color:'rgba(161,161,161,.65)', fontWeight:500 }}>{t.text}</span>
                </div>
              ))}
            </div>

            <motion.a
              href="#"
              whileHover={{ scale:1.05, x:4 }}
              whileTap={{ scale:.97 }}
              style={{ display:'inline-flex', alignItems:'center', gap:8, fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:'clamp(11px,1.1vw,13px)', letterSpacing:'.2em', textTransform:'uppercase', color:'#fe7a01', textDecoration:'none', borderBottom:'1px solid rgba(254,122,1,.35)', paddingBottom:2, whiteSpace:'nowrap', transition:'border-color .2s' }}
            >
              Talk to our team
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="#fe7a01" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </motion.a>
          </motion.div>

        </div>
      </motion.div>
    </>
  );
}

function SupportCard({
  title,
  description,
  icon,
  delay = 0,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(145deg,#111,#0e0e0e)',
        border: '1px solid rgba(255,255,255,.07)',
        borderRadius: 20,
        padding: 'clamp(28px,3.8vw,44px) clamp(24px,3vw,36px)',
        display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2.5vh,24px)',
        cursor: 'default',
        transition: 'border-color .3s, box-shadow .3s',
      }}
    >
      {/* Icon */}
      <div style={{
        width: 'clamp(52px,6.5vw,68px)', height: 'clamp(52px,6.5vw,68px)',
        borderRadius: '50%',
        background: 'linear-gradient(135deg,rgba(254,122,1,.18),rgba(254,122,1,.06))',
        border: '1px solid rgba(254,122,1,.28)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {icon}
      </div>

      <h3 style={{ fontFamily:"'font-heading',sans-serif", fontWeight:700, fontSize:'clamp(18px,2vw,24px)', color:'#f5f5f5', margin:0, lineHeight:1, textTransform:'uppercase', letterSpacing:'-.2px' }}>
        {title}
      </h3>

      <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:'clamp(13px,1.2vw,15px)', color:'rgba(161,161,161,.78)', lineHeight:1.72, margin:0 }}>
        {description}
      </p>
    </motion.div>
  );
}
// Final CTA Section with Scroll Pin Animation
function FinalCTASection() {
  const sectionRef = useRef(null);
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -50, -150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);

  return (
    <div ref={sectionRef} className="relative h-[100vh] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0b0b0b] via-[#0f0f0f] to-[#0b0b0b]">
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 30% 50%, rgba(247,147,30,0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 50%, rgba(254,122,1,0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 30% 50%, rgba(247,147,30,0.15) 0%, transparent 50%)',
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-[800px] mx-auto px-[32px] text-center"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          {/* Headline */}
          <motion.h2
            className="font-heading text-[#f5f5f5] text-[56px] md:text-[64px] leading-[64px] md:leading-[76px] tracking-[-1px] mb-[20px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Ready to Transform Your Gym?
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="font-['Inter:Regular',sans-serif] text-[#a1a1a1] text-[20px] md:text-[22px] leading-[32px] md:leading-[36px] mb-[48px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Take the first step towards smarter gym management with GymSaathi.
          </motion.p>

          {/* Email Input + CTA */}
          <motion.div
            className="flex flex-col md:flex-row gap-[16px] max-w-[600px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          >
            {/* Email Input */}
            <div className="relative flex-1">
              <motion.input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full bg-[rgba(245,245,245,0.05)] border-[2px] border-[rgba(245,245,245,0.15)] text-[#f5f5f5] font-['Inter:Regular',sans-serif] text-[16px] px-[24px] py-[18px] rounded-[2.68435e+07px] outline-none transition-all duration-300"
                animate={{
                  borderColor: isFocused ? 'rgba(247,147,30,0.6)' : 'rgba(245,245,245,0.15)',
                  boxShadow: isFocused ? '0 0 30px rgba(247,147,30,0.25)' : '0 0 0 rgba(247,147,30,0)'
                }}
              />
              <style>{`
                input::placeholder {
                  color: #6b6b6b;
                }
              `}</style>
            </div>

            {/* CTA Button */}
            <motion.button
              className="relative bg-[#fe7a01] text-[#f5f5f5] font-heading text-[17px] px-[44px] py-[18px] rounded-[2.68435e+07px] overflow-hidden whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <motion.div
                className="absolute inset-0 rounded-[2.68435e+07px]"
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(254, 122, 1, 0.5)',
                    '0 0 50px rgba(254, 122, 1, 0.7)',
                    '0 0 30px rgba(254, 122, 1, 0.5)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative z-10">Book a Free Demo</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}


// Icon Components
function IconPhone() {
  return (
    <svg className="block size-[32px]" fill="none" viewBox="0 0 56 56">
      <path d="M51.3333 39.4333V46.4333C51.3357 47.1013 51.1914 47.7621 50.9104 48.3706C50.6293 48.9791 50.2181 49.5213 49.7053 49.9606C49.1925 50.3999 48.5896 50.7262 47.9379 50.9175C47.2862 51.1088 46.6007 51.1606 45.9267 51.0699C38.6093 50.1466 31.6053 47.5519 25.5233 43.5166C19.8467 39.8407 15.0926 35.0866 11.4167 29.4099C7.36665 23.2986 4.77025 16.2594 3.8633 8.9066C3.77287 8.23532 3.82421 7.55256 4.01426 6.90324C4.20431 6.25391 4.52876 5.65274 4.96568 5.14084C5.40259 4.62894 5.94217 4.21756 6.54771 3.93533C7.15324 3.65309 7.81158 3.50645 8.4773 3.5066H15.4773C16.6759 3.49421 17.8379 3.91819 18.7404 4.69799C19.6429 5.47779 20.2243 6.56116 20.3773 7.7466C20.6641 10.1168 21.2308 12.4457 22.0633 14.6899C22.3928 15.5825 22.4554 16.5496 22.2435 17.4768C22.0317 18.404 21.5544 19.2527 20.8667 19.9266L17.7333 23.0599C21.1492 28.9451 26.0548 33.8507 31.94 37.2666L35.0733 34.1333C35.7472 33.4456 36.5959 32.9683 37.5231 32.7564C38.4503 32.5446 39.4174 32.6072 40.31 32.9366C42.5542 33.7691 44.8831 34.3358 47.2533 34.6226C48.4531 34.7773 49.5479 35.3713 50.3318 36.2913C51.1156 37.2113 51.5343 38.3951 51.3333 39.4333Z" stroke="#F7931E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg className="block size-[28px]" fill="none" viewBox="0 0 28 28">
      <path d="M14 2.33333V25.6667" stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d={svgPaths.p2a38c0} stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg className="block size-[28px]" fill="none" viewBox="0 0 28 28">
      <path d={svgPaths.p1fa66600} stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d={svgPaths.p1d189680} stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d="M2.33333 14H25.6667" stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </svg>
  );
}

function IconDollar() {
  return (
    <svg className="block size-[28px]" fill="none" viewBox="0 0 28 28">
      <path d={svgPaths.p275e0300} stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d={svgPaths.p3997a780} stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </svg>
  );
}

function IconDumbbell() {
  return (
    <svg className="block size-[28px]" fill="none" viewBox="0 0 28 28">
      <path d={svgPaths.p37f23000} stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d={svgPaths.p14f88c00} stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d="M23.45 4.55L25.0833 2.91667" stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d={svgPaths.p3aeb3840} stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d="M11.2 16.8001L16.8 11.2001" stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </svg>
  );
}

function IconApple() {
  return (
    <svg className="block size-[28px]" fill="none" viewBox="0 0 28 28">
      <path d={svgPaths.p12eec480} stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d={svgPaths.p254b3880} stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg className="block size-[28px]" fill="none" viewBox="0 0 28 28">
      <path d={svgPaths.p151d7c00} stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </svg>
  );
}

function IconUserPlus() {
  return (
    <svg className="block size-[32px]" fill="none" viewBox="0 0 32 32">
      <path d={svgPaths.p27a3200} stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
      <path d={svgPaths.p2ee517c0} stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
      <path d="M25.3333 10.6667V18.6667" stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
      <path d="M29.3333 14.6667H21.3333" stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
    </svg>
  );
}

function IconRocket() {
  return (
    <svg className="block size-[32px]" fill="none" viewBox="0 0 32 32">
      <path d={svgPaths.p3da2a680} stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
      <path d={svgPaths.p31e85700} stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
      <path d={svgPaths.p3b4b8cc0} stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
      <path d={svgPaths.p2f8d9f80} stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
    </svg>
  );
}

function IconTrendingUp() {
  return (
    <svg className="block size-[32px]" fill="none" viewBox="0 0 32 32">
      <path d={svgPaths.p18cb7e80} stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
      <path d={svgPaths.p26c56780} stroke="#F7931E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
    </svg>
  );
}

function IconSupport() {
  return (
    <svg className="block size-[40px]" fill="none" viewBox="0 0 40 40">
      <path d={svgPaths.p26e00200} stroke="#FF8C00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
      <path d={svgPaths.p2877300} stroke="#FF8C00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
      <path d={svgPaths.p14dea480} stroke="#FF8C00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
      <path d={svgPaths.p25f11f80} stroke="#FF8C00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg className="block size-[40px]" fill="none" viewBox="0 0 40 40">
      <path d={svgPaths.p1068d080} stroke="#FF8C00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg className="block size-[40px]" fill="none" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="18" stroke="#FF8C00" strokeWidth="3.33333" strokeLinecap="round" />
      <path d="M20 12V20L26 24" stroke="#FF8C00" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Homepage Component
function Homepage() {
  return (
    <>
      <HeroSection />
      <BuiltForRealGymsSection />
      <CoreFeaturesSection />
      <SmartFeaturesSection />
      <BioPerformanceDashboard />
      <StoryModeSection />
      <HowItWorksSection />
      <ProductPreviewSection />
      <WhyChooseSection />
      <SupportSection />
      <TransformationSection />
      <FinalCTASection />
    </>
  );
}

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState<string>(() => {
  const hash = window.location.hash.replace('#', '').trim();
  const valid = ['home', 'gym-owners', 'members', 'resources'];
  return valid.includes(hash) ? hash : 'home';
});

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0b0b0b] relative w-full min-h-screen overflow-x-hidden">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <div className="pt-[88px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'relative' }}
          >
            {currentPage === 'home' && <Homepage />}
            {currentPage === 'gym-owners' && <ForGymOwners />}
            {currentPage === 'members' && <GymMembers />}
            {currentPage === 'resources' && <Resources />}
          </motion.div>
        </AnimatePresence>
        <NewFooter />
      </div>
    </div>
  );
}
