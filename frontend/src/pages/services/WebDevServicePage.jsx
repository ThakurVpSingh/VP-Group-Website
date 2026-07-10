import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger } from 'animejs';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import {
  ArrowRight, Code2, Zap, Globe, Database, Search, PenTool,
  CheckCircle2, Monitor, Layers, Server, Smartphone, ArrowUpRight
} from 'lucide-react';

const ACCENT = '#3b82f6';
const ACCENT2 = '#06b6d4';

const codeLines = [
  { indent: 0, text: '<App>', color: '#e879f9' },
  { indent: 1, text: '<Router>', color: '#60a5fa' },
  { indent: 2, text: '<Navbar />', color: '#34d399' },
  { indent: 2, text: '<HeroSection', color: '#fbbf24' },
  { indent: 3, text: 'title="Scale Infinitely"', color: '#94a3b8' },
  { indent: 3, text: 'animate={true}', color: '#94a3b8' },
  { indent: 2, text: '/>', color: '#fbbf24' },
  { indent: 2, text: '<ServicesGrid />', color: '#34d399' },
  { indent: 2, text: '<ContactForm />', color: '#34d399' },
  { indent: 1, text: '</Router>', color: '#60a5fa' },
  { indent: 0, text: '</App>', color: '#e879f9' },
];

const techStack = [
  { name: 'React', desc: 'Component UI', color: '#61dafb', icon: '⚛' },
  { name: 'Node.js', desc: 'Backend Runtime', color: '#68a063', icon: '🟢' },
  { name: 'MongoDB', desc: 'Database Layer', color: '#47a248', icon: '🍃' },
  { name: 'Next.js', desc: 'SSR / SEO', color: '#fff', icon: '▲' },
  { name: 'Redis', desc: 'Cache Layer', color: '#dc382d', icon: '🔴' },
  { name: 'Docker', desc: 'Containerization', color: '#2496ed', icon: '🐳' },
];

const processSteps = [
  { num: '01', title: 'Discovery Sprint', desc: 'Business audit to define requirements, personas, and the full technical scope before architecture begins.', icon: Search },
  { num: '02', title: 'System Blueprint', desc: 'Database schemas, API contracts, and component hierarchies designed before a single line of code is written.', icon: PenTool },
  { num: '03', title: 'Rapid Build Cycles', desc: 'Feature-by-feature implementation in agile sprints with live staging previews and feedback loops.', icon: Code2 },
  { num: '04', title: 'Edge QA & Launch', desc: 'Global stress tests, lighthouse audits, and CI/CD pipeline configuration for zero-downtime deployment.', icon: CheckCircle2 },
];

const metrics = [
  { value: '<1s', label: 'Load Time', sub: 'Avg LCP on Lighthouse', bg: `${ACCENT}15` },
  { value: '40%', label: 'Conversion Lift', sub: 'vs. pre-launch baseline', bg: `${ACCENT2}15` },
  { value: '99%', label: 'Uptime SLA', sub: 'Globally distributed CDN', bg: '#8b5cf615' },
  { value: '10x', label: 'SEO Reach', sub: 'Via SSR & structured data', bg: '#f59e0b15' },
];

export default function WebDevServicePage() {
  const [typedLine, setTypedLine] = useState(0);
  const [visibleLines, setVisibleLines] = useState([]);
  const codeRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Web Development | VP Group';
  }, []);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < codeLines.length) {
        setVisibleLines(prev => [...prev, codeLines[idx]]);
        idx++;
      } else {
        setTimeout(() => {
          setVisibleLines([]);
          idx = 0;
        }, 2000);
      }
    }, 220);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    animate('.wd-metric-card', {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 600,
      delay: stagger(100),
      easing: 'easeOutQuart'
    });
    animate('.wd-stack-chip', {
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 500,
      delay: stagger(80),
      easing: 'easeOutBack'
    });
  }, []);

  return (
    <div style={{ background: '#030b1a', minHeight: '100vh', fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#fff' }}>
      <ProjectNavbar />

      {/* HERO: Split Code/Browser */}
      <section style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, paddingTop: '80px', position: 'relative', overflow: 'hidden' }}>
        {/* Left: Text + Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(40px, 6vw, 100px)', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: `${ACCENT}15`, border: `1px solid ${ACCENT}30`, borderRadius: '100px', padding: '6px 16px', marginBottom: '32px', width: 'fit-content' }}>
            <Monitor size={14} color={ACCENT} />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '3px', textTransform: 'uppercase' }}>Web Development</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 950, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: '24px' }}>
            <span style={{ display: 'block', color: '#fff' }}>High-Performance</span>
            <span style={{ display: 'block', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Digital Ecosystems</span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: '#94a3b8', lineHeight: 1.8, maxWidth: '480px', marginBottom: '48px' }}>
            We engineer fluid, scalable, conversion-optimized web applications using the MERN stack and Next.js — built for speed, built for scale.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/help/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, color: '#fff', padding: '16px 32px', borderRadius: '14px', fontWeight: 800, textDecoration: 'none', fontSize: '0.95rem', letterSpacing: '0.5px', transition: 'all 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              Start Your Project <ArrowRight size={18} />
            </Link>
            <Link to="/help/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '16px 32px', borderRadius: '14px', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = ACCENT}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}>
              View Portfolio <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        {/* Right: Browser Mockup with Live Code */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', position: 'relative', zIndex: 2 }}>
          <div style={{ width: '100%', maxWidth: '540px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', overflow: 'hidden', boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 60px ${ACCENT}15` }}>
            {/* Browser Bar */}
            <div style={{ padding: '14px 20px', background: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
              </div>
              <div style={{ flex: 1, background: '#334155', borderRadius: '6px', padding: '4px 12px', fontSize: '0.75rem', color: '#64748b', marginLeft: '8px', fontFamily: 'monospace' }}>
                vp-group-website.vercel.app
              </div>
            </div>
            {/* Code Editor */}
            <div ref={codeRef} style={{ padding: '24px', fontFamily: '"Fira Code", "Courier New", monospace', fontSize: '0.8rem', lineHeight: '1.7', minHeight: '300px' }}>
              {visibleLines.map((line, i) => (
                <div key={i} style={{ paddingLeft: `${line.indent * 20}px`, opacity: 1, animation: 'fadeSlideIn 0.2s ease forwards' }}>
                  <span style={{ color: '#475569', marginRight: '16px', userSelect: 'none', fontSize: '0.7rem' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ color: line.color }}>{line.text}</span>
                  {i === visibleLines.length - 1 && <span style={{ display: 'inline-block', width: '2px', height: '14px', background: ACCENT, marginLeft: '2px', animation: 'blink 0.7s step-end infinite' }} />}
                </div>
              ))}
            </div>
            {/* Status Bar */}
            <div style={{ padding: '8px 20px', background: ACCENT, display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.7rem', color: '#fff' }}>
              <span>✓ 0 errors</span>
              <span>⚡ Live Dev Server</span>
              <span style={{ marginLeft: 'auto' }}>React 18 • Vite 5</span>
            </div>
          </div>
        </div>

        {/* Background ambient */}
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: '500px', height: '500px', background: `radial-gradient(circle, ${ACCENT}10 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '0', left: '30%', width: '600px', height: '2px', background: `linear-gradient(90deg, transparent, ${ACCENT}30, transparent)`, pointerEvents: 'none' }} />
      </section>

      {/* METRICS BAND */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 5%' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {metrics.map((m, i) => (
              <div key={i} className="wd-metric-card" style={{ padding: '32px', background: m.bg, border: `1px solid ${ACCENT}15`, borderRadius: '20px', textAlign: 'center', transition: 'all 0.3s ease', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = ACCENT + '60'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = ACCENT + '15'; }}>
                <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 950, color: '#fff', letterSpacing: '-2px', marginBottom: '8px' }}>{m.value}</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>{m.label}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 5%', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
            <div style={{ width: '4px', height: '40px', borderRadius: '4px', background: `linear-gradient(${ACCENT}, ${ACCENT2})` }} />
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '6px' }}>Our Technology Arsenal</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 950, letterSpacing: '-1.5px', color: '#fff', margin: 0 }}>The MERN Stack & Beyond</h2>
            </div>
          </div>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '56px', maxWidth: '600px' }}>Production-hardened, battle-tested technologies chosen for performance, developer experience, and long-term scalability.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
            {techStack.map((tech, i) => (
              <div key={i} className="wd-stack-chip" style={{ padding: '28px 24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', textAlign: 'center', transition: 'all 0.3s ease', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = tech.color + '60'; e.currentTarget.style.background = tech.color + '08'; e.currentTarget.style.transform = 'translateY(-6px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{tech.icon}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>{tech.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOM ARCHITECTURE VISUAL */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) 5%' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>Architecture Deep Dive</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 950, letterSpacing: '-1.5px', color: '#fff', marginBottom: '24px' }}>Full-Stack Blueprint, Layer by Layer</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '40px' }}>
                Every project begins with a forensic architecture session. We map every data flow, API contract, and UI component before writing a single line of code — eliminating technical debt before it starts.
              </p>
              {[
                { icon: Globe, label: 'Frontend Layer', desc: 'React 18 with atomic design, optimized hydration' },
                { icon: Server, label: 'Backend Layer', desc: 'Node.js/Express REST & GraphQL APIs' },
                { icon: Database, label: 'Data Layer', desc: 'MongoDB clusters with Redis caching' },
                { icon: Layers, label: 'DevOps Layer', desc: 'Docker, CI/CD, and edge CDN deployment' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '20px', padding: '16px', borderRadius: '12px', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${ACCENT}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={18} color={ACCENT} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: '#fff', marginBottom: '4px' }}>{item.label}</div>
                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* DOM Tree Visual */}
            <div style={{ position: 'relative', background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '40px', fontFamily: 'monospace', fontSize: '0.82rem' }}>
              <div style={{ color: '#475569', marginBottom: '20px', fontSize: '0.7rem', letterSpacing: '2px' }}>// COMPONENT TREE</div>
              {[
                { depth: 0, tag: '<App />', color: '#e879f9' },
                { depth: 1, tag: '<Router />', color: '#60a5fa' },
                { depth: 2, tag: '<Navbar />', color: '#34d399' },
                { depth: 2, tag: '<HeroSection />', color: '#34d399' },
                { depth: 3, tag: '<AnimatedHeadline />', color: '#fbbf24' },
                { depth: 3, tag: '<CTAButton />', color: '#fbbf24' },
                { depth: 2, tag: '<ServicesGrid />', color: '#34d399' },
                { depth: 3, tag: '<ServiceCard × 7 />', color: '#fbbf24' },
                { depth: 2, tag: '<Footer />', color: '#34d399' },
              ].map((node, i) => (
                <div key={i} style={{ paddingLeft: `${node.depth * 22}px`, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {node.depth > 0 && <span style={{ color: '#1e3a5f' }}>{'└─'}</span>}
                  <span style={{ color: node.color }}>{node.tag}</span>
                </div>
              ))}
              <div style={{ position: 'absolute', bottom: '20px', right: '20px', padding: '6px 12px', background: `${ACCENT}20`, border: `1px solid ${ACCENT}30`, borderRadius: '8px', fontSize: '0.7rem', color: ACCENT }}>
                ✓ Zero violations
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS STEPS */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) 5%', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>Our Build Process</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 950, letterSpacing: '-2px', color: '#fff', margin: 0 }}>From Concept to Deployed Production</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
            {processSteps.map((step, i) => (
              <div key={i} style={{ padding: '40px 32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', position: 'relative', overflow: 'hidden', transition: 'all 0.4s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT + '40'; e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = `0 20px 40px ${ACCENT}10`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ fontSize: '4rem', fontWeight: 950, color: `${ACCENT}15`, position: 'absolute', top: '20px', right: '24px', lineHeight: 1, userSelect: 'none' }}>{step.num}</div>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${ACCENT}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <step.icon size={22} color={ACCENT} />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '14px' }}>{step.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '0.95rem', margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section style={{ padding: 'clamp(100px, 12vw, 180px) 5%', textAlign: 'center', background: `radial-gradient(ellipse at 50% 0%, ${ACCENT}12 0%, transparent 60%)` }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '24px' }}>Ready to Build?</div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 950, letterSpacing: '-3px', color: '#fff', lineHeight: 1.05, marginBottom: '24px' }}>Ship Your Next<br /><span style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Digital Product</span></h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '48px', lineHeight: 1.8 }}>From MVP to enterprise scale — we engineer it right the first time.</p>
          <Link to="/help/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, color: '#fff', padding: '20px 48px', borderRadius: '16px', fontWeight: 800, textDecoration: 'none', fontSize: '1rem', letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.3s ease', boxShadow: `0 0 40px ${ACCENT}30` }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'; e.currentTarget.style.boxShadow = `0 20px 60px ${ACCENT}40`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = `0 0 40px ${ACCENT}30`; }}>
            Schedule a Discovery Call <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @media (max-width: 1024px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          section[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
