import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger } from 'animejs';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import StatTile from '../../components/halo/StatTile';
import HaloCard from '../../components/halo/HaloCard';
import Chip from '../../components/halo/Chip';
import { ArrowRight, Shield, Server, Database, Terminal, Cpu, Lock, GitBranch, Zap } from 'lucide-react';

const H = { font: "'Inter', sans-serif", mono: "'JetBrains Mono', ui-monospace, monospace" };

/* ── Sparklines ─────────────────────────────────────────────── */
const sparkSLA    = [98.5, 98.9, 99.0, 99.2, 99.5, 99.7, 99.9, 99.95, 99.99, 99.99];
const sparkLatency = [12, 10, 9, 8, 7, 6, 5, 4.5, 4, 3.8];
const sparkDeploy  = [1, 1.2, 1.5, 2, 2.2, 2.8, 3.0, 3.3, 3.5, 3.5];
const sparkAdopt   = [55, 60, 65, 70, 74, 78, 81, 83, 85, 86];

const terminalLines = [
  { type: 'cmd',     text: '$ docker-compose up --scale api=3 --scale worker=5' },
  { type: 'log',     text: '[INFO] Starting load balancer on :8080...' },
  { type: 'success', text: '[OK]   api_1 healthy — latency: 4ms' },
  { type: 'success', text: '[OK]   api_2 healthy — latency: 6ms' },
  { type: 'success', text: '[OK]   api_3 healthy — latency: 3ms' },
  { type: 'log',     text: '[INFO] Syncing PostgreSQL primary → replicas...' },
  { type: 'success', text: '[OK]   replica_01 synced — 0ms lag' },
  { type: 'log',     text: '[INFO] Deploying to Kubernetes cluster (prod)...' },
  { type: 'cmd',     text: '$ kubectl rollout status deployment/api-gateway' },
  { type: 'success', text: '[✓]   Rollout complete. 0 downtime. SLA: 99.99%' },
];

const svgNodes = [
  { id: 'LB',   label: 'Load Balancer', x: 50, y: 10, color: '#5B6BFF' },
  { id: 'API1', label: 'API Node 1',    x: 15, y: 40, color: '#3DD7E5' },
  { id: 'API2', label: 'API Node 2',    x: 50, y: 40, color: '#3DD7E5' },
  { id: 'API3', label: 'API Node 3',    x: 85, y: 40, color: '#3DD7E5' },
  { id: 'DB',   label: 'Primary DB',   x: 30, y: 72, color: '#2BE08C' },
  { id: 'R1',   label: 'Replica 1',    x: 60, y: 72, color: '#2BE08C' },
  { id: 'R2',   label: 'Replica 2',    x: 85, y: 72, color: '#2BE08C' },
];
const svgEdges = [['LB','API1'],['LB','API2'],['LB','API3'],['API1','DB'],['API2','DB'],['API3','DB'],['DB','R1'],['DB','R2']];

const specs = [
  { icon: Terminal, label: 'Languages', value: 'Go, Rust, TypeScript, Python' },
  { icon: Database, label: 'Databases', value: 'PostgreSQL, MongoDB, Redis' },
  { icon: Server,   label: 'Infra',     value: 'Docker, Kubernetes, Terraform' },
  { icon: Lock,     label: 'Security',  value: 'Zero-Trust, OAuth2, AES-256' },
];

const pillars = [
  { num: '01', title: 'Microservices Architecture', desc: 'Decompose monoliths into independently deployable service units that scale horizontally under load.', icon: GitBranch },
  { num: '02', title: 'Zero-Trust Security',        desc: 'Every request authenticated at the network, API, and database layers — no implicit trust.', icon: Shield },
  { num: '03', title: 'Cloud-Native Orchestration', desc: 'Kubernetes-managed workloads with automated self-healing, scaling, and rolling deployments.', icon: Cpu },
  { num: '04', title: '99.99% SLA Engineering',     desc: 'Redundant architecture, circuit breakers, and automated failover ensuring enterprise availability.', icon: Zap },
];

const logColor = (t) => t === 'cmd' ? '#5B6BFF' : t === 'success' ? '#2BE08C' : '#9AA0AE';
const getNode = (id) => svgNodes.find(n => n.id === id);

export default function SoftwareEngServicePage() {
  const [lines, setLines] = useState([]);
  const termRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Software Engineering | VP Group';
    
    let active = true;
    let timeoutId;
    let intervalId;

    const runLoop = () => {
      let idx = 0;
      setLines([]);
      
      intervalId = setInterval(() => {
        if (!active) return;
        if (idx < terminalLines.length) {
          const lineToAdd = terminalLines[idx];
          setLines(p => [...p, lineToAdd]);
          idx++;
          if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
        } else {
          clearInterval(intervalId);
          timeoutId = setTimeout(() => {
            if (active) runLoop();
          }, 2500);
        }
      }, 550);
    };

    runLoop();

    return () => {
      active = false;
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    animate('.se-node', { scale: [0.8, 1.1, 1], opacity: [0.5, 1], duration: 1200, direction: 'alternate', loop: true, delay: stagger(250), easing: 'easeInOutSine' });
    animate('.se-pillar', { opacity: [0, 1], translateY: [16, 0], duration: 500, delay: stagger(90), easing: 'easeOutQuart' });
    animate('.se-stat', { opacity: [0, 1], translateY: [16, 0], duration: 500, delay: stagger(80), easing: 'easeOutQuart' });
  }, []);

  return (
    <div className="halo-page" style={{ fontFamily: H.font }}>
      <ProjectNavbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="halo-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '100px', position: 'relative', overflow: 'hidden' }}>
        {/* Circuit grid */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none' }}>
          <svg width="100%" height="100%"><defs><pattern id="cg" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M 48 0 L 0 0 0 48" fill="none" stroke="#5B6BFF" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#cg)" /></svg>
        </div>

        <div className="halo-container" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="halo-hero-grid">
            <div>
              <div style={{ marginBottom: '28px' }}>
                <Chip variant="default"><Terminal size={11} style={{ marginRight: 4 }} />SOFTWARE ENGINEERING</Chip>
              </div>
              <h1 style={{ fontFamily: H.font, fontSize: 'clamp(2.25rem, 5vw, 4rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.06, color: '#F2F4F8', marginBottom: '20px' }}>
                Enterprise-Grade<br /><span style={{ color: '#5B6BFF' }}>System Architecture</span>
              </h1>
              <p style={{ fontFamily: H.font, fontSize: '0.9375rem', color: '#9AA0AE', lineHeight: 1.55, marginBottom: '40px', maxWidth: '440px' }}>
                We design robust, secure, high-availability software for complex enterprise challenges — custom ERPs, IAM platforms, and mission-critical gateway systems.
              </p>
              <Link to="/help/contact" className="halo-btn-primary">
                Architect With Us <ArrowRight size={16} />
              </Link>
            </div>

            {/* Terminal */}
            <div style={{ background: '#14151C', border: '1px solid #2A2D38', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.55)' }}>
              <div style={{ padding: '11px 16px', background: '#1E2029', borderBottom: '1px solid #2A2D38', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {['#FF3A5C','#F5D547','#2BE08C'].map((c,i) => <div key={i} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c, opacity: 0.8 }} />)}
                </div>
                <span style={{ marginLeft: '8px', fontSize: '0.72rem', color: '#5C6170', fontFamily: H.mono }}>vp-engineering ~ production</span>
              </div>
              <div ref={termRef} style={{ padding: '20px', fontFamily: H.mono, fontSize: '0.76rem', lineHeight: 1.8, height: '280px', overflowY: 'auto' }}>
                {lines.map((l, i) => (
                  <div key={i} style={{ color: logColor(l.type), animation: 'se-fadein 0.18s ease' }}>{l.text}</div>
                ))}
                <span style={{ display: 'inline-block', width: '7px', height: '14px', background: '#5B6BFF', animation: 'se-blink 0.7s step-end infinite', marginTop: '2px' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STAT TILES ───────────────────────────────────────── */}
      <section className="halo-section halo-section-divider">
        <div className="halo-container">
          <div className="halo-label" style={{ marginBottom: '24px' }}>Enterprise Engineering Benchmarks</div>
          <div className="halo-grid-4">
            <div className="se-stat"><StatTile eyebrow="Availability SLA" metric="99.99%" description="Enterprise-grade uptime guarantee" trend="up" trendLabel="↑ vs 99.9% industry avg" accent="success" sparkData={sparkSLA} /></div>
            <div className="se-stat"><StatTile eyebrow="API Response Time" metric="<4ms" description="P99 latency on production" trend="up" trendLabel="3.5x faster than avg" accent="info" sparkData={sparkLatency} /></div>
            <div className="se-stat"><StatTile eyebrow="Deploy Frequency" metric="3.5x" description="With DevOps CI/CD pipeline" trend="up" trendLabel="DORA metric: Elite" accent="primary" sparkData={sparkDeploy} /></div>
            <div className="se-stat"><StatTile eyebrow="Enterprise Adoption" metric="86%" description="of enterprises use microservices" trend="up" trendLabel="2024 CNCF Report" accent="warning" sparkData={sparkAdopt} /></div>
          </div>
        </div>
      </section>

      {/* ── NODE GRAPH ───────────────────────────────────────── */}
      <section className="halo-section halo-section-divider">
        <div className="halo-container">
          <div className="halo-hero-grid" style={{ alignItems: 'start' }}>
            <HaloCard elevated>
              <div className="halo-label" style={{ marginBottom: '20px' }}>Microservices Topology</div>
              <svg viewBox="0 0 100 90" style={{ width: '100%', height: '300px' }}>
                {svgEdges.map(([a,b],i) => {
                  const na = getNode(a), nb = getNode(b);
                  return <line key={i} x1={`${na.x}%`} y1={`${na.y+4}%`} x2={`${nb.x}%`} y2={`${nb.y-4}%`} stroke="#2A2D38" strokeWidth="0.8" strokeDasharray="2,2" />;
                })}
                {svgNodes.map((node, i) => (
                  <g key={i} className="se-node">
                    <circle cx={`${node.x}%`} cy={`${node.y}%`} r="5" fill={node.color} opacity="0.9" />
                    <circle cx={`${node.x}%`} cy={`${node.y}%`} r="8" fill="none" stroke={node.color} strokeWidth="0.5" opacity="0.35" />
                    <text x={`${node.x}%`} y={`${node.y+9}%`} textAnchor="middle" fill="#5C6170" fontSize="3.5" fontFamily="sans-serif">{node.label}</text>
                  </g>
                ))}
              </svg>
            </HaloCard>

            <div>
              <div className="halo-label" style={{ marginBottom: '16px' }}>Technical Specifications</div>
              <h2 style={{ fontFamily: H.font, fontSize: '2.25rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#F2F4F8', marginBottom: '32px' }}>Stack & Security</h2>
              {specs.map((spec, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', padding: '18px 0', borderBottom: '1px solid #2A2D38' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(91,107,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <spec.icon size={16} color="#5B6BFF" />
                  </div>
                  <div>
                    <div className="halo-label" style={{ marginBottom: '4px' }}>{spec.label}</div>
                    <div style={{ fontFamily: H.font, fontSize: '0.9375rem', color: '#F2F4F8', fontWeight: 500 }}>{spec.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 PILLARS ────────────────────────────────────────── */}
      <section className="halo-section halo-section-divider">
        <div className="halo-container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="halo-label" style={{ marginBottom: '12px' }}>Engineering Doctrine</div>
            <h2 style={{ fontFamily: H.font, fontSize: '2.25rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#F2F4F8', margin: 0 }}>Four Pillars of Enterprise Software</h2>
          </div>
          <div className="halo-grid-4">
            {pillars.map((p, i) => (
              <div key={i} className="se-pillar">
                <HaloCard hoverable accent="primary">
                  <div style={{ fontFamily: H.mono, fontSize: '0.7rem', fontWeight: 600, color: '#2A2D38', marginBottom: '16px', paddingTop: '6px' }}>{p.num}</div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(91,107,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                    <p.icon size={16} color="#5B6BFF" />
                  </div>
                  <div style={{ fontFamily: H.font, fontSize: '1.125rem', fontWeight: 600, letterSpacing: '-0.01em', color: '#F2F4F8', marginBottom: '10px' }}>{p.title}</div>
                  <div style={{ fontFamily: H.font, fontSize: '0.8125rem', color: '#9AA0AE', lineHeight: 1.55 }}>{p.desc}</div>
                </HaloCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="halo-section" style={{ textAlign: 'center', background: 'radial-gradient(ellipse at 50% 0%, rgba(91,107,255,0.07) 0%, transparent 60%)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="halo-label" style={{ marginBottom: '20px' }}>Start Building</div>
          <h2 style={{ fontFamily: H.font, fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#F2F4F8', marginBottom: '20px' }}>
            Systems That <span style={{ color: '#2BE08C' }}>Never Fail.</span>
          </h2>
          <p style={{ fontFamily: H.font, fontSize: '0.9375rem', color: '#9AA0AE', lineHeight: 1.55, marginBottom: '36px' }}>
            Partner with our senior engineers to architect mission-critical infrastructure that scales from Day 1 to IPO.
          </p>
          <Link to="/help/contact" className="halo-btn-primary" style={{ height: '48px', padding: '0 28px', fontSize: '0.9375rem' }}>
            Request Architecture Review <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
      <style>{`
        @keyframes se-fadein { from{opacity:0}to{opacity:1} }
        @keyframes se-blink  { 0%,100%{opacity:1}50%{opacity:0} }
        @media(max-width:960px){ .halo-grid-4{grid-template-columns:1fr 1fr!important} section > div > div[style*="grid-template-columns: 1fr 1fr"]{ display:block!important; gap:32px; } }
        @media(max-width:720px){ .halo-grid-4{grid-template-columns:1fr!important} }
      `}</style>
    </div>
  );
}
