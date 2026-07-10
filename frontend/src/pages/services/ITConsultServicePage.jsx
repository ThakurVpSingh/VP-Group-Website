import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger } from 'animejs';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import { ArrowRight, Search, Zap, Globe, Layers, CheckCircle2, Target, TrendingUp, Clock, Users } from 'lucide-react';

const ACCENT = '#f59e0b';
const ACCENT2 = '#f97316';

const roadmapMilestones = [
  { phase: 'WEEK 1–2', title: 'Business Audit', status: 'done', desc: 'Full forensic analysis of workflows, tools, and technology gaps.' },
  { phase: 'WEEK 3–4', title: 'Strategic Blueprint', status: 'done', desc: 'Multi-year digital roadmap aligned with your growth ambitions.' },
  { phase: 'MONTH 2', title: 'Pilot Testing', status: 'active', desc: 'Small-scale implementation of recommended tech stacks with benchmarking.' },
  { phase: 'MONTH 3', title: 'Full Rollout', status: 'upcoming', desc: 'Team training, tooling transitions, and new infrastructure deployment.' },
  { phase: 'ONGOING', title: 'Governance & QA', status: 'upcoming', desc: 'Security protocol reviews and performance audits on a quarterly cadence.' },
];

const auditAreas = [
  { icon: Target, title: 'Technology Stack Audit', desc: 'We evaluate your current tooling for ROI, performance bottlenecks, and long-term sustainability.', tag: 'ASSESSMENT' },
  { icon: Globe, title: 'Cloud Cost Optimization', desc: 'Identifying over-provisioned infrastructure and renegotiating cloud commitments to save up to 40% in operational spend.', tag: 'SAVINGS' },
  { icon: Layers, title: 'Legacy Modernization Path', desc: 'Creating a risk-minimal migration plan from monolithic systems to modern cloud-native microservices.', tag: 'MIGRATION' },
  { icon: TrendingUp, title: 'Growth Scalability Plan', desc: 'Architecting your platform for 100x user scale without needing to rebuild from scratch.', tag: 'SCALE' },
  { icon: Users, title: 'Team & Tooling Sync', desc: 'Aligning your engineering culture and tooling with modern DevOps and collaboration best practices.', tag: 'PEOPLE' },
  { icon: CheckCircle2, title: 'Compliance & Governance', desc: 'Ensuring all tech decisions meet ISO, GDPR, HIPAA, or industry-specific regulatory standards.', tag: 'COMPLIANCE' },
];

const outcomes = [
  { value: '3.5x', label: 'Faster Deployment', sub: 'CI/CD pipeline optimization' },
  { value: '40%', label: 'Cost Reduction', sub: 'Cloud configuration savings' },
  { value: '100%', label: 'Stack Compliance', sub: 'Zero-Trust audit score' },
  { value: '2yr', label: 'Future-Proof Plan', sub: 'Minimum roadmap horizon' },
];

export default function ITConsultServicePage() {
  const [activeStep, setActiveStep] = useState(0);
  const pathRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'IT Consultation | VP Group';

    const interval = setInterval(() => {
      setActiveStep(s => (s + 1) % roadmapMilestones.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    animate('.itc-milestone', {
      opacity: [0, 1],
      translateX: [-30, 0],
      duration: 600,
      delay: stagger(120),
      easing: 'easeOutQuart'
    });
    animate('.itc-audit-card', {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 500,
      delay: stagger(90),
      easing: 'easeOutQuart'
    });
  }, []);

  const statusColor = (s) => s === 'done' ? '#22c55e' : s === 'active' ? ACCENT : '#334155';
  const statusLabel = (s) => s === 'done' ? '✓ Complete' : s === 'active' ? '⚡ In Progress' : '○ Upcoming';

  return (
    <div style={{ background: '#090800', minHeight: '100vh', fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#fff' }}>
      <ProjectNavbar />

      {/* HERO: Strategy Board */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(100px, 10vw, 140px) 5% clamp(60px, 8vw, 100px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: `${ACCENT}15`, border: `1px solid ${ACCENT}30`, borderRadius: '100px', padding: '6px 16px', marginBottom: '40px' }}>
            <Target size={14} color={ACCENT} />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '3px', textTransform: 'uppercase' }}>IT Consultation</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 950, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: '28px' }}>
                <span style={{ display: 'block', color: '#fff' }}>Strategic Digital</span>
                <span style={{ display: 'block', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Transformation</span>
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.8, marginBottom: '40px' }}>
                We translate business goals into precise technology strategies — selecting the right stacks, optimizing costs, and ensuring your infrastructure scales with your ambition.
              </p>

              <div style={{ padding: '24px', background: `${ACCENT}08`, border: `1px solid ${ACCENT}20`, borderRadius: '20px', marginBottom: '40px' }}>
                <div style={{ fontSize: '0.7rem', color: ACCENT, fontWeight: 700, letterSpacing: '2px', marginBottom: '12px' }}>WHAT YOU GET</div>
                {['Full technology stack audit & ROI analysis', 'Multi-year digital transformation roadmap', 'Cloud cost optimization strategies', 'Compliance & security protocol design'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <CheckCircle2 size={16} color={ACCENT} />
                    <span style={{ fontSize: '0.95rem', color: '#cbd5e1' }}>{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/help/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, color: '#fff', padding: '16px 32px', borderRadius: '14px', fontWeight: 800, textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                Book Strategy Session <ArrowRight size={18} />
              </Link>
            </div>

            {/* Roadmap Timeline Visual */}
            <div style={{ background: '#0f0e00', border: `1px solid ${ACCENT}15`, borderRadius: '24px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '3px', marginBottom: '28px' }}>TRANSFORMATION ROADMAP</div>
              <div style={{ position: 'relative', paddingLeft: '32px', borderLeft: `2px solid ${ACCENT}20` }}>
                {roadmapMilestones.map((m, i) => (
                  <div key={i} className="itc-milestone" style={{ marginBottom: '24px', position: 'relative', padding: '16px 20px', borderRadius: '14px', background: activeStep === i ? `${ACCENT}08` : 'transparent', border: `1px solid ${activeStep === i ? ACCENT + '30' : 'transparent'}`, transition: 'all 0.4s ease' }}>
                    <div style={{ position: 'absolute', left: '-39px', top: '18px', width: '14px', height: '14px', borderRadius: '50%', background: statusColor(m.status), border: `2px solid ${statusColor(m.status)}40`, boxShadow: m.status === 'active' ? `0 0 10px ${ACCENT}` : 'none', transition: 'all 0.3s ease' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <span style={{ fontSize: '0.65rem', color: '#475569', fontWeight: 700, letterSpacing: '2px' }}>{m.phase}</span>
                        <div style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>{m.title}</div>
                      </div>
                      <span style={{ fontSize: '0.7rem', color: statusColor(m.status), background: `${statusColor(m.status)}15`, padding: '4px 10px', borderRadius: '100px', whiteSpace: 'nowrap' }}>{statusLabel(m.status)}</span>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0, lineHeight: 1.6 }}>{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 70% 50%, ${ACCENT}06 0%, transparent 60%)`, pointerEvents: 'none' }} />
      </section>

      {/* OUTCOMES STRIP */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 5%', background: `linear-gradient(135deg, ${ACCENT}08 0%, ${ACCENT2}05 100%)`, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
          {outcomes.map((o, i) => (
            <div key={i}>
              <div style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 950, letterSpacing: '-2px', color: ACCENT, marginBottom: '8px' }}>{o.value}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>{o.label}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{o.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AUDIT AREAS */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) 5%' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
            <div style={{ width: '4px', height: '40px', borderRadius: '4px', background: `linear-gradient(${ACCENT}, ${ACCENT2})` }} />
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '6px' }}>Our Consultation Framework</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 950, letterSpacing: '-1.5px', color: '#fff', margin: 0 }}>Six Audit Domains We Master</h2>
            </div>
          </div>
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginBottom: '56px', maxWidth: '600px' }}>Every consultation is a full-spectrum analysis — no surface-level recommendations.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {auditAreas.map((area, i) => (
              <div key={i} className="itc-audit-card" style={{ padding: '36px', background: 'rgba(245, 158, 11, 0.03)', border: '1px solid rgba(245, 158, 11, 0.1)', borderRadius: '24px', position: 'relative', transition: 'all 0.4s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT + '40'; e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = `0 20px 40px ${ACCENT}10`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.1)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ position: 'absolute', top: '20px', right: '20px', padding: '4px 10px', background: `${ACCENT}15`, border: `1px solid ${ACCENT}30`, borderRadius: '100px', fontSize: '0.6rem', fontWeight: 700, color: ACCENT, letterSpacing: '2px' }}>{area.tag}</div>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${ACCENT}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <area.icon size={24} color={ACCENT} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>{area.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '0.92rem', margin: 0 }}>{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(100px, 12vw, 180px) 5%', textAlign: 'center', background: `radial-gradient(ellipse at 50% 0%, ${ACCENT}12 0%, transparent 60%)` }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '24px' }}>Start Your Audit</div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 950, letterSpacing: '-2.5px', color: '#fff', marginBottom: '24px' }}>
            Clarity Before <span style={{ color: ACCENT }}>Code.</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '48px', lineHeight: 1.8 }}>
            A strategy session with our lead consultants is the highest-ROI investment you can make before spending a single dollar on development.
          </p>
          <Link to="/help/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, color: '#fff', padding: '20px 48px', borderRadius: '16px', fontWeight: 800, textDecoration: 'none', fontSize: '1rem', letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.3s ease' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 20px 60px ${ACCENT}40`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            Schedule Free Consultation <ArrowRight size={20} />
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
