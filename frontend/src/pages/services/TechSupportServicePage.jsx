import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger } from 'animejs';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import { ArrowRight, Shield, Activity, Database, ShieldCheck, AlertTriangle, CheckCircle, Clock, Wifi, Server, RefreshCw, Eye } from 'lucide-react';

const ACCENT = '#10b981';
const ACCENT2 = '#06b6d4';

const alertLog = [
  { time: '09:41:02', level: 'INFO', msg: 'Monitoring agent started on cluster-01', status: 'ok' },
  { time: '09:41:05', level: 'INFO', msg: 'All 47 endpoints healthy — response < 12ms', status: 'ok' },
  { time: '09:43:22', level: 'WARN', msg: 'CPU spike detected on node-4 (78%)', status: 'warn' },
  { time: '09:43:24', level: 'AUTO', msg: 'Auto-scaling triggered: adding node-5 to pool', status: 'ok' },
  { time: '09:43:31', level: 'INFO', msg: 'Load redistributed — node-4 CPU normalized (41%)', status: 'ok' },
  { time: '09:51:07', level: 'ALERT', msg: 'Potential brute-force detected on /auth/login', status: 'alert' },
  { time: '09:51:08', level: 'BLOCK', msg: 'IP 185.220.101.x rate-limited & flagged', status: 'ok' },
  { time: '10:02:00', level: 'INFO', msg: 'Backup snapshot completed — 0 data loss', status: 'ok' },
  { time: '10:15:00', level: 'INFO', msg: 'Security patch CVE-2024-21351 applied to all nodes', status: 'ok' },
];

const uptimeNodes = [
  { name: 'API Gateway', uptime: '99.97%', latency: '3ms', status: 'green' },
  { name: 'Auth Service', uptime: '100%', latency: '8ms', status: 'green' },
  { name: 'Database Cluster', uptime: '99.99%', latency: '1ms', status: 'green' },
  { name: 'CDN Network', uptime: '100%', latency: '22ms', status: 'green' },
  { name: 'Email Workers', uptime: '99.8%', latency: '45ms', status: 'yellow' },
  { name: 'File Storage', uptime: '100%', latency: '12ms', status: 'green' },
];

const capabilities = [
  { icon: Eye, title: '24/7 Uptime Surveillance', desc: 'AI-driven anomaly detection monitors all endpoints every 30 seconds, identifying issues before users notice.' },
  { icon: Shield, title: 'Zero-Day Patch Deployment', desc: 'Critical vulnerability patches applied within hours of CVE disclosure across your entire infrastructure.' },
  { icon: Database, title: 'Encrypted Backup Mesh', desc: 'Hourly snapshots with AES-256 encryption — guaranteed restore within 15 minutes of any failure event.' },
  { icon: RefreshCw, title: 'Disaster Recovery Drills', desc: 'Monthly simulated failure scenarios testing your full recovery pipeline from alert to full restoration.' },
  { icon: Wifi, title: 'Multi-Region Redundancy', desc: 'Traffic routes across failover regions automatically — users never experience downtime even during outages.' },
  { icon: Activity, title: 'Predictive Maintenance', desc: 'Machine-learning models forecast hardware degradation and capacity limits weeks before they become critical.' },
];

export default function TechSupportServicePage() {
  const [logLines, setLogLines] = useState([]);
  const [pulseActive, setPulseActive] = useState(true);
  const logRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Technical Support | VP Group';

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < alertLog.length) {
        setLogLines(prev => [...prev, alertLog[idx]]);
        idx++;
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
      } else {
        idx = 0;
        setTimeout(() => setLogLines([]), 2000);
      }
    }, 600);

    const pulse = setInterval(() => setPulseActive(p => !p), 1500);
    return () => { clearInterval(interval); clearInterval(pulse); };
  }, []);

  useEffect(() => {
    animate('.ts-cap-card', {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 500,
      delay: stagger(80),
      easing: 'easeOutQuart'
    });
    animate('.ts-uptime-bar', {
      width: ['0%', '100%'],
      duration: 1200,
      delay: stagger(150),
      easing: 'easeOutQuart'
    });
  }, []);

  const logColor = (level) => {
    if (level === 'ALERT') return '#ef4444';
    if (level === 'WARN') return '#f59e0b';
    if (level === 'BLOCK' || level === 'AUTO') return ACCENT2;
    return ACCENT;
  };

  return (
    <div style={{ background: '#020f0a', minHeight: '100vh', fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#fff' }}>
      <ProjectNavbar />

      {/* HERO: Ops Dashboard Style */}
      <section style={{ minHeight: '100vh', padding: 'clamp(100px, 10vw, 140px) 5% clamp(60px, 8vw, 100px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: `${ACCENT}15`, border: `1px solid ${ACCENT}30`, borderRadius: '100px', padding: '6px 16px', marginBottom: '40px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: ACCENT, animation: 'pulse 1.5s ease-in-out infinite', boxShadow: `0 0 8px ${ACCENT}` }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '3px', textTransform: 'uppercase' }}>Live Technical Support</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 950, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: '28px' }}>
                <span style={{ display: 'block', color: '#fff' }}>24/7 Resilience</span>
                <span style={{ display: 'block', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Infrastructure Shield</span>
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.8, marginBottom: '40px' }}>
                Your infrastructure, continuously monitored. Our predictive surveillance and instant response protocols keep your systems online, secure, and optimized — always.
              </p>

              {/* Live uptime stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '40px' }}>
                {[
                  { v: '99.9%', l: 'Uptime SLA' },
                  { v: '12min', l: 'Avg MTTR' },
                  { v: '24/7', l: 'Engineer Watch' },
                ].map((s, i) => (
                  <div key={i} style={{ padding: '20px', background: `${ACCENT}08`, border: `1px solid ${ACCENT}20`, borderRadius: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 950, color: ACCENT, letterSpacing: '-1px' }}>{s.v}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>{s.l}</div>
                  </div>
                ))}
              </div>

              <Link to="/help/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, color: '#fff', padding: '16px 32px', borderRadius: '14px', fontWeight: 800, textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                Get Protected Now <ArrowRight size={18} />
              </Link>
            </div>

            {/* Live Log Dashboard */}
            <div style={{ background: '#030f08', border: `1px solid ${ACCENT}20`, borderRadius: '20px', overflow: 'hidden', boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 60px ${ACCENT}08` }}>
              {/* Dashboard header */}
              <div style={{ padding: '16px 20px', background: '#041410', borderBottom: `1px solid ${ACCENT}15`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />
                  <span style={{ fontSize: '0.8rem', color: ACCENT, fontWeight: 700, fontFamily: 'monospace' }}>VP-SENTINEL MONITOR v2.1</span>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#475569', fontFamily: 'monospace' }}>All Systems Nominal</span>
              </div>

              {/* Log stream */}
              <div ref={logRef} style={{ padding: '20px', fontFamily: 'monospace', fontSize: '0.72rem', lineHeight: 1.7, height: '300px', overflowY: 'auto' }}>
                {logLines.map((line, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '2px', animation: 'slideIn 0.2s ease' }}>
                    <span style={{ color: '#334155', flexShrink: 0 }}>{line.time}</span>
                    <span style={{ color: logColor(line.level), minWidth: '48px', flexShrink: 0 }}>[{line.level}]</span>
                    <span style={{ color: '#94a3b8' }}>{line.msg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `radial-gradient(ellipse at 70% 40%, ${ACCENT}06 0%, transparent 60%)`, pointerEvents: 'none' }} />
      </section>

      {/* ENDPOINT STATUS BOARD */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) 5%', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '56px' }}>
            <div style={{ width: '4px', height: '40px', borderRadius: '4px', background: `linear-gradient(${ACCENT}, ${ACCENT2})` }} />
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '6px' }}>Live Status Board</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 950, letterSpacing: '-1.5px', color: '#fff', margin: 0 }}>All Endpoints Monitored</h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {uptimeNodes.map((node, i) => (
              <div key={i} style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT + '40'; e.currentTarget.style.background = `${ACCENT}05`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: node.status === 'green' ? ACCENT : '#f59e0b', flexShrink: 0, boxShadow: `0 0 8px ${node.status === 'green' ? ACCENT : '#f59e0b'}80` }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: '#fff', marginBottom: '6px', fontSize: '0.95rem' }}>{node.name}</div>
                  <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div className="ts-uptime-bar" style={{ height: '100%', background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})`, borderRadius: '4px', width: '0%' }} />
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: ACCENT }}>{node.uptime}</div>
                  <div style={{ fontSize: '0.75rem', color: '#475569' }}>{node.latency} avg</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES GRID */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) 5%' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>What We Protect</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 950, letterSpacing: '-2px', color: '#fff', margin: 0 }}>Full Spectrum Infrastructure Defense</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {capabilities.map((cap, i) => (
              <div key={i} className="ts-cap-card" style={{ padding: '36px', background: 'rgba(16, 185, 129, 0.03)', border: '1px solid rgba(16, 185, 129, 0.1)', borderRadius: '24px', transition: 'all 0.4s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT + '40'; e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.background = `${ACCENT}06`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.1)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(16, 185, 129, 0.03)'; }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${ACCENT}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <cap.icon size={24} color={ACCENT} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '14px' }}>{cap.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '0.95rem', margin: 0 }}>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(100px, 12vw, 180px) 5%', textAlign: 'center', background: `radial-gradient(ellipse at 50% 0%, ${ACCENT}10 0%, transparent 60%)` }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <ShieldCheck size={56} color={ACCENT} style={{ marginBottom: '24px' }} />
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 950, letterSpacing: '-2.5px', color: '#fff', marginBottom: '24px' }}>
            Never Go <span style={{ color: '#ef4444' }}>Offline</span> Again.
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '48px', lineHeight: 1.8 }}>
            Let our 24/7 guardian mesh protect your infrastructure while you focus on growing your business.
          </p>
          <Link to="/help/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, color: '#fff', padding: '20px 48px', borderRadius: '16px', fontWeight: 800, textDecoration: 'none', fontSize: '1rem', letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.3s ease' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 20px 60px ${ACCENT}40`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            Activate Protection <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.5;transform:scale(1.3);} }
        @keyframes slideIn { from{opacity:0;transform:translateY(4px);}to{opacity:1;transform:translateY(0);} }
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          section > div[style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          section > div[style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
