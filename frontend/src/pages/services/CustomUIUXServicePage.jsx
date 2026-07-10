import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger } from 'animejs';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import { ArrowRight, Palette, Layers, Smartphone, MousePointer2, Eye, Zap, CheckCircle, Layout } from 'lucide-react';

const ACCENT = '#ec4899';
const ACCENT2 = '#8b5cf6';

const designPrinciples = [
  { title: 'Cognitive Load Management', desc: 'We engineer interfaces that guide user attention without causing sensory overload — every element has a deliberate hierarchy.' },
  { title: 'Emotional Color Theory', desc: 'Colors are chosen using psychological principles to evoke trust, urgency, or delight at precisely the right moments in the user journey.' },
  { title: 'Micro-interaction Mesh', desc: 'Subtle, high-performance animations provide instant feedback — making the software feel alive and responsive to every user action.' },
  { title: 'Atomic Design Systems', desc: 'Every component we build is part of a scalable design language, ensuring visual consistency from MVP to enterprise scale.' },
];

const processPhases = [
  { num: '01', title: 'Persona & Empathy Mapping', icon: Eye, desc: 'We study your target demographics, create detailed behavioral personas, and map emotional journeys before any visual design begins.' },
  { num: '02', title: 'Wireframe & Information Architecture', icon: Layout, desc: 'Building the logical skeleton — structuring every navigation path, content hierarchy, and user flow before applying any aesthetics.' },
  { num: '03', title: 'High-Fidelity Visual Design', icon: Palette, desc: 'Translating wireframes into polished, pixel-perfect interfaces using our proprietary premium design language and component library.' },
  { num: '04', title: 'Interactive Prototyping & QA', icon: MousePointer2, desc: 'Delivering fully interactive Figma prototypes and testing every micro-interaction, animation timing, and gesture with real users.' },
];

const designTokens = [
  { label: 'Primary', color: '#ec4899', hex: '#EC4899' },
  { label: 'Accent', color: '#8b5cf6', hex: '#8B5CF6' },
  { label: 'Surface', color: '#1e293b', hex: '#1E293B' },
  { label: 'Neutral', color: '#64748b', hex: '#64748B' },
  { label: 'Success', color: '#10b981', hex: '#10B981' },
  { label: 'Warning', color: '#f59e0b', hex: '#F59E0B' },
];

const metrics = [
  { value: '150%', label: 'User Retention Growth', desc: 'Avg increase in session duration after UI/UX redesign' },
  { value: '50%', label: 'Friction Reduction', desc: 'Drop in checkout and form abandonment rates' },
  { value: '4.9★', label: 'Client Satisfaction', desc: 'Average post-delivery design review score' },
];

export default function CustomUIUXServicePage() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeToken, setActiveToken] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Custom UI/UX | VP Group';

    const handleMouseMove = (e) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    canvasRef.current?.addEventListener('mousemove', handleMouseMove);
    return () => canvasRef.current?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    animate('.uiux-phase-card', {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 600,
      delay: stagger(120),
      easing: 'easeOutQuart'
    });
    animate('.uiux-principle', {
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 500,
      delay: stagger(100),
      easing: 'easeOutQuart'
    });
    // Gradient morph on hero
    animate('.uiux-gradient-orb', {
      scale: [1, 1.3, 1],
      opacity: [0.4, 0.8, 0.4],
      duration: 4000,
      loop: true,
      easing: 'easeInOutSine',
      delay: stagger(800)
    });
  }, []);

  return (
    <div style={{ background: '#080010', minHeight: '100vh', fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#fff' }}>
      <ProjectNavbar />

      {/* HERO: Design Canvas */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(100px, 10vw, 140px) 5% clamp(60px, 8vw, 100px)', position: 'relative', overflow: 'hidden' }}>
        {/* Floating gradient orbs */}
        <div className="uiux-gradient-orb" style={{ position: 'absolute', top: '15%', left: '60%', width: '400px', height: '400px', borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}20 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div className="uiux-gradient-orb" style={{ position: 'absolute', bottom: '20%', right: '5%', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT2}20 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1300px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: `${ACCENT}15`, border: `1px solid ${ACCENT}30`, borderRadius: '100px', padding: '6px 16px', marginBottom: '40px' }}>
            <Palette size={14} color={ACCENT} />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '3px', textTransform: 'uppercase' }}>Custom UI/UX Design</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 950, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: '28px' }}>
                <span style={{ display: 'block', color: '#fff' }}>Design That</span>
                <span style={{ display: 'block', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Converts & Captivates</span>
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.8, marginBottom: '40px' }}>
                We don't draw interfaces — we engineer emotional and cognitive experiences. Rooted in behavioral psychology, our designs make users fall in love with your product.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/help/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, color: '#fff', padding: '16px 32px', borderRadius: '14px', fontWeight: 800, textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  Start Your Design <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Design Canvas Mockup */}
            <div ref={canvasRef} style={{ background: '#0f0018', border: `1px solid ${ACCENT}20`, borderRadius: '24px', padding: '32px', position: 'relative', overflow: 'hidden', cursor: 'none', minHeight: '400px' }}>
              {/* Custom cursor */}
              <div style={{ position: 'absolute', width: '20px', height: '20px', border: `2px solid ${ACCENT}`, borderRadius: '50%', pointerEvents: 'none', transform: `translate(${cursorPos.x - 10}px, ${cursorPos.y - 10}px)`, transition: 'transform 0.05s linear', zIndex: 10 }} />

              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '3px', marginBottom: '24px' }}>DESIGN CANVAS</div>

              {/* Wireframe elements */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                {['Hero Banner', 'Navigation'].map((label, i) => (
                  <div key={i} style={{ padding: '20px', border: `1px dashed ${ACCENT}30`, borderRadius: '10px', textAlign: 'center', fontSize: '0.75rem', color: '#475569', background: `${ACCENT}05`, transition: 'all 0.3s ease', cursor: 'default' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.background = `${ACCENT}10`; e.currentTarget.style.color = ACCENT; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${ACCENT}30`; e.currentTarget.style.background = `${ACCENT}05`; e.currentTarget.style.color = '#475569'; }}>
                    {label}
                  </div>
                ))}
              </div>
              <div style={{ padding: '30px', border: `1px dashed ${ACCENT2}30`, borderRadius: '10px', textAlign: 'center', fontSize: '0.75rem', color: '#475569', marginBottom: '12px', background: `${ACCENT2}05`, transition: 'all 0.3s ease', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT2; e.currentTarget.style.color = ACCENT2; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${ACCENT2}30`; e.currentTarget.style.color = '#475569'; }}>
                Main Content Block
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                {['Card 1', 'Card 2', 'Card 3'].map((c, i) => (
                  <div key={i} style={{ padding: '16px', border: `1px dashed rgba(255,255,255,0.1)`, borderRadius: '8px', textAlign: 'center', fontSize: '0.7rem', color: '#334155', transition: 'all 0.3s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#334155'; }}>{c}</div>
                ))}
              </div>

              {/* Design tokens strip */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '24px', flexWrap: 'wrap' }}>
                {designTokens.map((token, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = token.color + '60'; setActiveToken(i); }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; setActiveToken(null); }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: token.color, boxShadow: activeToken === i ? `0 0 8px ${token.color}` : 'none' }} />
                    <span style={{ fontSize: '0.65rem', color: '#475569', fontFamily: 'monospace' }}>{token.hex}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 5%', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
          {metrics.map((m, i) => (
            <div key={i} style={{ padding: '40px', background: `${ACCENT}05`, border: `1px solid ${ACCENT}15`, borderRadius: '24px', textAlign: 'center', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = ACCENT + '40'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = ACCENT + '15'; }}>
              <div style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 950, letterSpacing: '-2px', color: ACCENT, marginBottom: '10px' }}>{m.value}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>{m.label}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DESIGN PRINCIPLES */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) 5%' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '64px' }}>
            <div style={{ width: '4px', height: '40px', borderRadius: '4px', background: `linear-gradient(${ACCENT}, ${ACCENT2})` }} />
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '6px' }}>Our Design Philosophy</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 950, letterSpacing: '-1.5px', color: '#fff', margin: 0 }}>The Science Behind Beautiful UI</h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {designPrinciples.map((p, i) => (
              <div key={i} className="uiux-principle" style={{ padding: '36px', background: 'rgba(236, 72, 153, 0.03)', border: '1px solid rgba(236, 72, 153, 0.1)', borderRadius: '24px', transition: 'all 0.4s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT + '40'; e.currentTarget.style.transform = 'translateY(-6px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ width: '40px', height: '3px', background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})`, borderRadius: '4px', marginBottom: '24px' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '14px' }}>{p.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '0.95rem', margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGN PROCESS */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) 5%', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>Our Creative Process</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 950, letterSpacing: '-2px', color: '#fff', margin: 0 }}>From Blank Canvas to Premium Product</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {processPhases.map((phase, i) => (
              <div key={i} className="uiux-phase-card" style={{ padding: '40px 32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', position: 'relative', overflow: 'hidden', transition: 'all 0.4s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT + '40'; e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = `0 20px 40px ${ACCENT}10`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ position: 'absolute', top: '20px', right: '24px', fontSize: '3.5rem', fontWeight: 950, color: `${ACCENT}10`, lineHeight: 1 }}>{phase.num}</div>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `linear-gradient(135deg, ${ACCENT}30, ${ACCENT2}20)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <phase.icon size={24} color={ACCENT} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', marginBottom: '14px' }}>{phase.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '0.92rem', margin: 0 }}>{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(100px, 12vw, 180px) 5%', textAlign: 'center', background: `radial-gradient(ellipse at 50% 0%, ${ACCENT}12 0%, transparent 60%)` }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '24px' }}>Ready to Transform Your UX?</div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 950, letterSpacing: '-2.5px', color: '#fff', marginBottom: '24px' }}>
            Design That <span style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Makes Users Stay.</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '48px', lineHeight: 1.8 }}>
            Let our design team craft an interface so intuitive and beautiful, your users will never want to leave.
          </p>
          <Link to="/help/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, color: '#fff', padding: '20px 48px', borderRadius: '16px', fontWeight: 800, textDecoration: 'none', fontSize: '1rem', letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.3s ease' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 20px 60px ${ACCENT}40`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            Start Design Sprint <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
      <style>{`
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
