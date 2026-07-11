import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger } from 'animejs';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import StatTile from '../../components/halo/StatTile';
import HaloCard from '../../components/halo/HaloCard';
import Chip from '../../components/halo/Chip';
import {
  ArrowRight, Code2, Globe, Database, Search, PenTool,
  CheckCircle2, Monitor, Layers, Server, ArrowUpRight
} from 'lucide-react';

/* ── Sparkline data (market research / industry benchmarks) ── */
const sparkLCP   = [22, 18, 15, 12, 8, 5, 3, 2, 1, 0.8];   // load time decreasing = good
const sparkConv  = [12, 14, 17, 19, 22, 27, 31, 35, 38, 40]; // conversion lift %
const sparkUp    = [97, 98, 98, 99, 99, 99, 99.5, 99.8, 99.9, 99.9];
const sparkSEO   = [1, 1.5, 2, 3, 4, 5.5, 7, 8, 9, 10];

const codeLines = [
  { indent: 0, text: '<App>', color: '#9AA0AE' },
  { indent: 1, text: '<Router>', color: '#5B6BFF' },
  { indent: 2, text: '<Navbar />', color: '#2BE08C' },
  { indent: 2, text: '<HeroSection', color: '#3DD7E5' },
  { indent: 3, text: 'title="Scale Infinitely"', color: '#5C6170' },
  { indent: 3, text: 'animate={true}', color: '#5C6170' },
  { indent: 2, text: '/>', color: '#3DD7E5' },
  { indent: 2, text: '<ServicesGrid />', color: '#2BE08C' },
  { indent: 2, text: '<ContactForm />', color: '#2BE08C' },
  { indent: 1, text: '</Router>', color: '#5B6BFF' },
  { indent: 0, text: '</App>', color: '#9AA0AE' },
];

const techStack = [
  { name: 'React 18', desc: 'Component UI', tag: 'FRONTEND' },
  { name: 'Node.js', desc: 'Backend Runtime', tag: 'BACKEND' },
  { name: 'MongoDB', desc: 'Database Layer', tag: 'DATA' },
  { name: 'Next.js', desc: 'SSR / SEO', tag: 'SSR' },
  { name: 'Redis', desc: 'Cache Layer', tag: 'CACHE' },
  { name: 'Docker', desc: 'Containerization', tag: 'INFRA' },
];

const processSteps = [
  { num: '01', title: 'Discovery Sprint', desc: 'Business audit to define requirements, personas, and the full technical scope before architecture begins.', icon: Search },
  { num: '02', title: 'System Blueprint', desc: 'Database schemas, API contracts, and component hierarchies designed before a single line of code is written.', icon: PenTool },
  { num: '03', title: 'Rapid Build Cycles', desc: 'Feature-by-feature implementation in agile sprints with live staging previews and feedback loops.', icon: Code2 },
  { num: '04', title: 'Edge QA & Launch', desc: 'Global stress tests, lighthouse audits, and CI/CD pipeline configuration for zero-downtime deployment.', icon: CheckCircle2 },
];

const domTree = [
  { depth: 0, tag: '<App />', accent: '#9AA0AE' },
  { depth: 1, tag: '<Router />', accent: '#5B6BFF' },
  { depth: 2, tag: '<Navbar />', accent: '#2BE08C' },
  { depth: 2, tag: '<HeroSection />', accent: '#2BE08C' },
  { depth: 3, tag: '<AnimatedHeadline />', accent: '#3DD7E5' },
  { depth: 3, tag: '<CTAButton />', accent: '#3DD7E5' },
  { depth: 2, tag: '<ServicesGrid />', accent: '#2BE08C' },
  { depth: 3, tag: '<ServiceCard × 7 />', accent: '#3DD7E5' },
  { depth: 2, tag: '<Footer />', accent: '#2BE08C' },
];

const H = { font: "'Inter', sans-serif", mono: "'JetBrains Mono', ui-monospace, monospace" };

export default function WebDevServicePage() {
  const [visibleLines, setVisibleLines] = useState([]);
  const codeRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); document.title = 'Web Development | VP Group'; }, []);

  useEffect(() => {
    let active = true;
    let timeoutId;
    let intervalId;

    const runLoop = () => {
      let idx = 0;
      setVisibleLines([]);
      
      intervalId = setInterval(() => {
        if (!active) return;
        if (idx < codeLines.length) {
          const lineToAdd = codeLines[idx];
          setVisibleLines(p => [...p, lineToAdd]);
          idx++;
        } else {
          clearInterval(intervalId);
          timeoutId = setTimeout(() => {
            if (active) runLoop();
          }, 2400);
        }
      }, 200);
    };

    runLoop();

    return () => {
      active = false;
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    animate('.wd-stat', { opacity: [0, 1], translateY: [16, 0], duration: 500, delay: stagger(80), easing: 'easeOutQuart' });
    animate('.wd-tech', { opacity: [0, 1], scale: [0.96, 1], duration: 400, delay: stagger(60), easing: 'easeOutQuart' });
    animate('.wd-step', { opacity: [0, 1], translateX: [-12, 0], duration: 500, delay: stagger(100), easing: 'easeOutQuart' });
  }, []);

  return (
    <div className="halo-page" style={{ fontFamily: H.font }}>
      <ProjectNavbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="halo-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}>
        <div className="halo-container" style={{ width: '100%' }}>
          <div className="halo-hero-grid">

            {/* Left */}
            <div>
              <Chip variant="info" style={{ marginBottom: '28px', display: 'inline-flex' }}>
                <Monitor size={11} style={{ marginRight: 4 }} />WEB DEVELOPMENT
              </Chip>
              <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontFamily: H.font, fontSize: 'clamp(2.25rem, 5vw, 4rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.06, color: '#F2F4F8', margin: 0 }}>
                  High-Performance<br />
                  <span style={{ color: '#5B6BFF' }}>Digital Ecosystems</span>
                </h1>
              </div>
              <p style={{ fontFamily: H.font, fontSize: '0.9375rem', fontWeight: 400, color: '#9AA0AE', letterSpacing: '-0.005em', lineHeight: 1.55, maxWidth: '460px', marginBottom: '40px' }}>
                We engineer fluid, scalable, conversion-optimised web applications using the MERN stack and Next.js — built for speed, built for scale.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/help/contact" className="halo-btn-primary">
                  Start Your Project <ArrowRight size={16} />
                </Link>
                <Link to="/help/portfolio" className="halo-btn-secondary">
                  View Portfolio <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right: Browser / code editor */}
            <div style={{ background: '#14151C', border: '1px solid #2A2D38', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.55)' }}>
              {/* Browser chrome */}
              <div style={{ padding: '12px 16px', background: '#1E2029', borderBottom: '1px solid #2A2D38', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['#FF3A5C','#F5D547','#2BE08C'].map((c,i) => <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.8 }} />)}
                </div>
                <div style={{ flex: 1, background: '#14151C', borderRadius: '6px', padding: '4px 12px', fontSize: '0.75rem', color: '#5C6170', marginLeft: '8px', fontFamily: H.mono }}>
                  vp-group-website.vercel.app
                </div>
              </div>
              {/* Code pane */}
              <div ref={codeRef} style={{ padding: '20px', fontFamily: H.mono, fontSize: '0.8rem', lineHeight: 1.7, minHeight: '260px' }}>
                {visibleLines.map((line, i) => (
                  <div key={i} style={{ paddingLeft: `${line.indent * 18}px`, animation: 'wd-fadein 0.15s ease' }}>
                    <span style={{ color: '#3A3D4A', marginRight: '14px', fontSize: '0.7rem', userSelect: 'none' }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ color: line.color }}>{line.text}</span>
                    {i === visibleLines.length - 1 && <span style={{ display: 'inline-block', width: '2px', height: '13px', background: '#5B6BFF', marginLeft: '2px', animation: 'wd-blink 0.7s step-end infinite', verticalAlign: 'middle' }} />}
                  </div>
                ))}
              </div>
              {/* Status bar */}
              <div style={{ padding: '7px 16px', background: '#5B6BFF', display: 'flex', gap: '16px', fontSize: '0.7rem', color: '#fff', fontFamily: H.mono }}>
                <span>✓ 0 errors</span><span>⚡ Live Dev Server</span>
                <span style={{ marginLeft: 'auto' }}>React 18 · Vite 5</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: '320px', height: '320px', background: 'radial-gradient(circle, rgba(91,107,255,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      </section>

      {/* ── STAT TILES ───────────────────────────────────────── */}
      <section className="halo-section halo-section-divider">
        <div className="halo-container">
          <div className="halo-label" style={{ marginBottom: '24px' }}>Performance Benchmarks — Market Research 2024–25</div>
          <div className="halo-grid-4">
            <div className="wd-stat"><StatTile eyebrow="Core Web Vitals" metric="<1s" description="LCP target on Lighthouse" trend="up" trendLabel="+24% conversions" accent="info" sparkData={sparkLCP} /></div>
            <div className="wd-stat"><StatTile eyebrow="Conversion Lift" metric="40%" description="vs. pre-launch baseline avg" trend="up" trendLabel="Industry avg +28%" accent="success" sparkData={sparkConv} /></div>
            <div className="wd-stat"><StatTile eyebrow="Uptime SLA" metric="99.9%" description="Globally distributed CDN" trend="up" trendLabel="Edge-deployed" accent="primary" sparkData={sparkUp} /></div>
            <div className="wd-stat"><StatTile eyebrow="SEO Reach" metric="10x" description="Via SSR & structured data" trend="up" trendLabel="93% sessions start on Google" accent="warning" sparkData={sparkSEO} /></div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────── */}
      <section className="halo-section halo-section-divider">
        <div className="halo-container">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4px', marginBottom: '8px' }}>
            <div style={{ width: '2px', height: '32px', background: '#5B6BFF', borderRadius: '2px', marginRight: '12px', flexShrink: 0 }} />
            <div>
              <div className="halo-label" style={{ marginBottom: '6px' }}>Technology Arsenal</div>
              <h2 style={{ fontFamily: H.font, fontSize: '2.25rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#F2F4F8', margin: 0 }}>The MERN Stack & Beyond</h2>
            </div>
          </div>
          <p style={{ fontFamily: H.font, fontSize: '0.9375rem', color: '#9AA0AE', lineHeight: 1.55, marginBottom: '48px', maxWidth: '560px' }}>
            Production-hardened, battle-tested technologies chosen for performance, developer experience, and long-term scalability.
          </p>
          <div className="halo-grid-3">
            {techStack.map((t, i) => (
              <div key={i} className="wd-tech">
                <HaloCard hoverable accent="primary" padding="20px">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', paddingTop: '6px' }}>
                    <div style={{ fontFamily: H.font, fontSize: '1.125rem', fontWeight: 600, letterSpacing: '-0.01em', color: '#F2F4F8' }}>{t.name}</div>
                    <Chip variant="muted">{t.tag}</Chip>
                  </div>
                  <div style={{ fontFamily: H.font, fontSize: '0.8125rem', color: '#9AA0AE' }}>{t.desc}</div>
                </HaloCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE ─────────────────────────────────────── */}
      <section className="halo-section halo-section-divider">
        <div className="halo-container">
          <div className="halo-hero-grid" style={{ alignItems: 'start' }}>
            <div>
              <div className="halo-label" style={{ marginBottom: '16px' }}>Architecture Deep Dive</div>
              <h2 style={{ fontFamily: H.font, fontSize: '2.25rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#F2F4F8', marginBottom: '20px' }}>Full-Stack Blueprint,<br />Layer by Layer</h2>
              <p style={{ fontFamily: H.font, fontSize: '0.9375rem', color: '#9AA0AE', lineHeight: 1.55, marginBottom: '32px' }}>
                Every project begins with a forensic architecture session. We map every data flow, API contract, and UI component before writing a single line — eliminating technical debt before it starts.
              </p>
              {[
                { icon: Globe, label: 'Frontend Layer', desc: 'React 18 with atomic design, optimised hydration' },
                { icon: Server, label: 'Backend Layer', desc: 'Node.js/Express REST & GraphQL APIs' },
                { icon: Database, label: 'Data Layer', desc: 'MongoDB clusters with Redis caching' },
                { icon: Layers, label: 'DevOps Layer', desc: 'Docker, CI/CD, and edge CDN deployment' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', marginBottom: '16px', padding: '14px', borderRadius: '10px', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#14151C'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(91,107,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={16} color="#5B6BFF" />
                  </div>
                  <div>
                    <div style={{ fontFamily: H.font, fontWeight: 600, fontSize: '0.9375rem', color: '#F2F4F8', marginBottom: '2px' }}>{item.label}</div>
                    <div style={{ fontFamily: H.font, fontSize: '0.8125rem', color: '#9AA0AE' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* DOM Tree */}
            <HaloCard elevated>
              <div className="halo-label" style={{ marginBottom: '20px' }}>// COMPONENT TREE</div>
              <div style={{ fontFamily: H.mono, fontSize: '0.8rem', lineHeight: 1.8 }}>
                {domTree.map((node, i) => (
                  <div key={i} style={{ paddingLeft: `${node.depth * 20}px`, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {node.depth > 0 && <span style={{ color: '#2A2D38', fontSize: '0.75rem' }}>└─</span>}
                    <span style={{ color: node.accent }}>{node.tag}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '20px', padding: '8px 12px', background: 'rgba(43,224,140,0.08)', border: '1px solid rgba(43,224,140,0.2)', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#2BE08C', fontSize: '0.75rem', fontFamily: H.mono }}>✓ Zero violations · Accessibility AA</span>
              </div>
            </HaloCard>
          </div>
        </div>
      </section>

      {/* ── PROCESS STEPS ────────────────────────────────────── */}
      <section className="halo-section halo-section-divider">
        <div className="halo-container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="halo-label" style={{ marginBottom: '12px' }}>Our Build Process</div>
            <h2 style={{ fontFamily: H.font, fontSize: '2.25rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#F2F4F8', margin: 0 }}>From Concept to Deployed Production</h2>
          </div>
          <div className="halo-grid-4">
            {processSteps.map((step, i) => (
              <div key={i} className="wd-step">
                <HaloCard hoverable accent="success">
                  <div style={{ fontFamily: H.mono, fontSize: '0.75rem', fontWeight: 600, color: '#2A2D38', marginBottom: '20px', paddingTop: '6px' }}>{step.num}</div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(43,224,140,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <step.icon size={16} color="#2BE08C" />
                  </div>
                  <div style={{ fontFamily: H.font, fontSize: '1.125rem', fontWeight: 600, letterSpacing: '-0.01em', color: '#F2F4F8', marginBottom: '10px' }}>{step.title}</div>
                  <div style={{ fontFamily: H.font, fontSize: '0.8125rem', color: '#9AA0AE', lineHeight: 1.55 }}>{step.desc}</div>
                </HaloCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="halo-section" style={{ textAlign: 'center', background: 'radial-gradient(ellipse at 50% 0%, rgba(91,107,255,0.08) 0%, transparent 60%)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div className="halo-label" style={{ marginBottom: '20px' }}>Ready to Build?</div>
          <h2 style={{ fontFamily: H.font, fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#F2F4F8', marginBottom: '20px', lineHeight: 1.08 }}>
            Ship Your Next<br /><span style={{ color: '#5B6BFF' }}>Digital Product</span>
          </h2>
          <p style={{ fontFamily: H.font, fontSize: '0.9375rem', color: '#9AA0AE', lineHeight: 1.55, marginBottom: '40px' }}>
            From MVP to enterprise scale — we engineer it right the first time.
          </p>
          <Link to="/help/contact" className="halo-btn-primary" style={{ fontSize: '0.9375rem', height: '48px', padding: '0 28px' }}>
            Schedule a Discovery Call <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
      <style>{`
        @keyframes wd-fadein { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:none; } }
        @keyframes wd-blink { 0%,100%{opacity:1}50%{opacity:0} }
        @media(max-width:960px){ section > div[style*="grid-template-columns: 1fr 1fr"]{ display:block!important; } }
      `}</style>
    </div>
  );
}
