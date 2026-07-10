import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger } from 'animejs';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import { ArrowRight, Shield, Server, Database, Terminal, Cpu, Lock, ArrowUpRight, GitBranch, Zap } from 'lucide-react';

const ACCENT = '#a78bfa';
const DARK = '#0a0010';

const terminalLines = [
  { delay: 0, type: 'cmd', text: '$ docker-compose up --scale api=3 --scale worker=5' },
  { delay: 800, type: 'log', text: '[INFO] Starting load balancer on :8080...' },
  { delay: 1200, type: 'success', text: '[OK]   api_1 healthy — latency: 4ms' },
  { delay: 1500, type: 'success', text: '[OK]   api_2 healthy — latency: 6ms' },
  { delay: 1800, type: 'success', text: '[OK]   api_3 healthy — latency: 3ms' },
  { delay: 2200, type: 'log', text: '[INFO] Syncing PostgreSQL primary → replicas...' },
  { delay: 2600, type: 'success', text: '[OK]   replica_01 synced — 0ms lag' },
  { delay: 2900, type: 'success', text: '[OK]   replica_02 synced — 1ms lag' },
  { delay: 3300, type: 'log', text: '[INFO] Deploying to Kubernetes cluster (prod)...' },
  { delay: 3700, type: 'cmd', text: '$ kubectl rollout status deployment/api-gateway' },
  { delay: 4200, type: 'success', text: '[✓]   Rollout complete. 0 downtime. SLA: 99.99%' },
];

const nodes = [
  { id: 'LB', label: 'Load Balancer', x: 50, y: 10, color: ACCENT },
  { id: 'API1', label: 'API Node 1', x: 15, y: 40, color: '#60a5fa' },
  { id: 'API2', label: 'API Node 2', x: 50, y: 40, color: '#60a5fa' },
  { id: 'API3', label: 'API Node 3', x: 85, y: 40, color: '#60a5fa' },
  { id: 'DB', label: 'Primary DB', x: 30, y: 72, color: '#34d399' },
  { id: 'R1', label: 'Replica 1', x: 60, y: 72, color: '#34d399' },
  { id: 'R2', label: 'Replica 2', x: 85, y: 72, color: '#34d399' },
];

const edges = [
  ['LB', 'API1'], ['LB', 'API2'], ['LB', 'API3'],
  ['API1', 'DB'], ['API2', 'DB'], ['API3', 'DB'],
  ['DB', 'R1'], ['DB', 'R2'],
];

const specs = [
  { label: 'Languages', value: 'Go, Rust, TypeScript, Python', icon: Terminal },
  { label: 'Databases', value: 'PostgreSQL, MongoDB, Redis', icon: Database },
  { label: 'Infra', value: 'Docker, Kubernetes, Terraform', icon: Server },
  { label: 'Security', value: 'Zero-Trust, OAuth2, AES-256', icon: Lock },
];

const pillars = [
  { num: '01', title: 'Microservices Architecture', desc: 'Decompose monoliths into independently deployable service units that scale horizontally under load.', icon: GitBranch },
  { num: '02', title: 'Zero-Trust Security', desc: 'Every request authenticated and authorized at the network, API, and database layers — no implicit trust.', icon: Shield },
  { num: '03', title: 'Cloud-Native Orchestration', desc: 'Kubernetes-managed containerized workloads with automated self-healing, scaling, and rolling deployments.', icon: Cpu },
  { num: '04', title: '99.99% SLA Engineering', desc: 'Redundant architecture, circuit breakers, and automated failover ensuring enterprise-grade availability.', icon: Zap },
];

export default function SoftwareEngServicePage() {
  const [visibleLines, setVisibleLines] = useState([]);
  const termRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Software Engineering | VP Group';

    terminalLines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
      }, line.delay);
    });
  }, []);

  useEffect(() => {
    animate('.se-node-dot', {
      scale: [0.8, 1.2],
      opacity: [0.6, 1],
      duration: 1000,
      direction: 'alternate',
      loop: true,
      delay: stagger(200),
      easing: 'easeInOutSine'
    });
    animate('.se-pillar', {
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 500,
      delay: stagger(100),
      easing: 'easeOutQuart'
    });
  }, []);

  const getNodePos = (id) => nodes.find(n => n.id === id);

  const lineColor = (type) => {
    if (type === 'cmd') return '#e879f9';
    if (type === 'success') return '#34d399';
    return '#94a3b8';
  };

  return (
    <div style={{ background: DARK, minHeight: '100vh', fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#fff' }}>
      <ProjectNavbar />

      {/* HERO: Terminal Fullscreen */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(100px, 10vw, 140px) 5% clamp(60px, 8vw, 100px)', position: 'relative', overflow: 'hidden' }}>
        {/* Circuit grid background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.06 }}>
          <svg width="100%" height="100%"><defs><pattern id="circuit" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke={ACCENT} strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#circuit)" /></svg>
        </div>

        <div style={{ maxWidth: '1300px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: `${ACCENT}15`, border: `1px solid ${ACCENT}30`, borderRadius: '100px', padding: '6px 16px', marginBottom: '40px' }}>
            <Terminal size={14} color={ACCENT} />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '3px', textTransform: 'uppercase' }}>Software Engineering</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 950, lineHeight: 1.05, letterSpacing: '-2.5px', marginBottom: '28px' }}>
                <span style={{ display: 'block', color: '#fff' }}>Enterprise-Grade</span>
                <span style={{ display: 'block', background: `linear-gradient(135deg, ${ACCENT}, #ec4899)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>System Architecture</span>
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.8, marginBottom: '40px' }}>
                We design robust, secure, high-availability software for complex enterprise challenges — custom ERPs, IAM platforms, and mission-critical gateway systems.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/help/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: ACCENT, color: '#fff', padding: '16px 32px', borderRadius: '14px', fontWeight: 800, textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  Architect With Us <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Terminal */}
            <div style={{ background: '#050005', border: `1px solid ${ACCENT}25`, borderRadius: '16px', overflow: 'hidden', boxShadow: `0 40px 80px rgba(0,0,0,0.8), 0 0 60px ${ACCENT}10` }}>
              <div style={{ padding: '12px 16px', background: '#0f0015', borderBottom: `1px solid ${ACCENT}15`, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
                </div>
                <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: '#475569', fontFamily: 'monospace' }}>vp-engineering ~ production</span>
              </div>
              <div ref={termRef} style={{ padding: '24px', fontFamily: '"Fira Code", monospace', fontSize: '0.78rem', lineHeight: 1.8, height: '320px', overflowY: 'auto' }}>
                {visibleLines.map((line, i) => (
                  <div key={i} style={{ color: lineColor(line.type), animation: 'fadeIn 0.2s ease' }}>
                    {line.text}
                  </div>
                ))}
                <span style={{ display: 'inline-block', width: '8px', height: '16px', background: ACCENT, animation: 'blink 0.7s step-end infinite', marginTop: '4px' }} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', top: '20%', left: '60%', width: '500px', height: '500px', background: `radial-gradient(circle, ${ACCENT}08 0%, transparent 70%)`, pointerEvents: 'none' }} />
      </section>

      {/* NODE GRAPH ARCHITECTURE */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) 5%', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '64px' }}>
            <div style={{ width: '4px', height: '40px', borderRadius: '4px', background: ACCENT }} />
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '6px' }}>System Topology</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 950, letterSpacing: '-1.5px', color: '#fff', margin: 0 }}>Microservices Node Graph</h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            {/* SVG Node graph */}
            <div style={{ background: '#050005', border: `1px solid ${ACCENT}15`, borderRadius: '24px', padding: '40px', position: 'relative' }}>
              <svg viewBox="0 0 100 90" style={{ width: '100%', height: '360px' }}>
                {edges.map(([from, to], i) => {
                  const a = getNodePos(from), b = getNodePos(to);
                  return <line key={i} x1={`${a.x}%`} y1={`${a.y + 4}%`} x2={`${b.x}%`} y2={`${b.y - 4}%`} stroke={ACCENT} strokeWidth="0.5" strokeOpacity="0.35" strokeDasharray="2,2" />;
                })}
                {nodes.map((node, i) => (
                  <g key={i} className="se-node-dot">
                    <circle cx={`${node.x}%`} cy={`${node.y}%`} r="5" fill={node.color} opacity="0.9" filter="url(#nodeGlow)" />
                    <circle cx={`${node.x}%`} cy={`${node.y}%`} r="8" fill="none" stroke={node.color} strokeWidth="0.5" opacity="0.4" />
                    <text x={`${node.x}%`} y={`${node.y + 9}%`} textAnchor="middle" fill="#94a3b8" fontSize="4" fontFamily="sans-serif">{node.label}</text>
                  </g>
                ))}
                <defs>
                  <filter id="nodeGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
              </svg>
            </div>

            {/* Specs table */}
            <div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginBottom: '32px', letterSpacing: '-0.5px' }}>Technical Specifications</h3>
              {specs.map((spec, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${ACCENT}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <spec.icon size={18} color={ACCENT} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>{spec.label}</div>
                    <div style={{ fontSize: '1rem', color: '#fff', fontWeight: 600 }}>{spec.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 PILLARS */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) 5%' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>Engineering Doctrine</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 950, letterSpacing: '-2px', color: '#fff', margin: 0 }}>Four Pillars of Enterprise Software</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {pillars.map((p, i) => (
              <div key={i} className="se-pillar" style={{ padding: '40px', background: 'rgba(167,139,250,0.03)', border: '1px solid rgba(167,139,250,0.1)', borderRadius: '24px', position: 'relative', overflow: 'hidden', transition: 'all 0.4s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT + '40'; e.currentTarget.style.transform = 'translateY(-8px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(167,139,250,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ position: 'absolute', top: '20px', right: '24px', fontSize: '3.5rem', fontWeight: 950, color: `${ACCENT}10`, lineHeight: 1 }}>{p.num}</div>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${ACCENT}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <p.icon size={22} color={ACCENT} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '14px' }}>{p.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '0.95rem', margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLA STATS */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 5%', background: `linear-gradient(135deg, ${ACCENT}08 0%, transparent 60%)`, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
          {[
            { v: '99.99%', l: 'SLA Availability' },
            { v: '<4ms', l: 'API Response Time' },
            { v: '4.8x', l: 'DB Throughput Scale' },
            { v: 'Zero', l: 'Security Breaches' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 950, letterSpacing: '-2px', color: ACCENT, marginBottom: '8px' }}>{s.v}</div>
              <div style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(100px, 12vw, 180px) 5%', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 950, letterSpacing: '-2.5px', color: '#fff', marginBottom: '24px' }}>
            Build Systems That <span style={{ color: ACCENT }}>Never Fail.</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '48px', lineHeight: 1.8 }}>
            Partner with our senior engineers to architect mission-critical infrastructure that scales from Day 1 to IPO.
          </p>
          <Link to="/help/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: ACCENT, color: '#fff', padding: '20px 48px', borderRadius: '16px', fontWeight: 800, textDecoration: 'none', fontSize: '1rem', letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.3s ease' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 20px 60px ${ACCENT}40`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            Request Architecture Review <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes blink { 0%,100%{opacity:1;}50%{opacity:0;} }
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
