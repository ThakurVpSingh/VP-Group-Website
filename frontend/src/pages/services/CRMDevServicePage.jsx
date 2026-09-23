import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import StatTile from '../../components/halo/StatTile';
import HaloCard from '../../components/halo/HaloCard';
import { ArrowRight, Users, Database, Bot, GitMerge, ShieldCheck, Zap } from 'lucide-react';

const H = { font: "'Inter', sans-serif", mono: "'JetBrains Mono', ui-monospace, monospace" };

const CRMDevServicePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Custom CRM Development | VP Group & Technologies";
  }, []);

  return (
    <div className="halo-page" style={{ minHeight: '100vh', fontFamily: H.font }}>
      <ProjectNavbar />

      <main style={{ paddingTop: '100px' }}>
        {/* Hero */}
        <section style={{ padding: '80px 24px', background: 'radial-gradient(ellipse at 50% 0%, rgba(43,224,140,0.12) 0%, transparent 70%)', borderBottom: '1px solid var(--halo-border)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(43,224,140,0.1)', border: '1px solid rgba(43,224,140,0.3)', borderRadius: '20px', fontSize: '0.75rem', fontFamily: H.mono, color: 'var(--halo-success)', fontWeight: 700, marginBottom: '20px' }}>
              <Users size={14} color="#2BE08C" /> INTELLIGENT CRM ARCHITECTURE
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px', color: 'var(--halo-on-surface)' }}>
              Custom CRM Platforms <span style={{ color: 'var(--halo-success)' }}>Engineered for Your Workflow</span>
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--halo-muted)', maxWidth: '750px', margin: '0 auto 36px', lineHeight: 1.6 }}>
              Ditch generic off-the-shelf software. We engineer tailor-made CRM solutions with built-in AI lead enrichment, automated follow-up sequences, and seamless ERP data sync.
            </p>
            <button onClick={() => navigate('/consultation/book')} className="halo-btn-primary" style={{ padding: '14px 32px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}>
              <span>Build Custom CRM</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <StatTile label="Sales Pipeline Velocity" val="3.8x Faster" sparkline={[1, 1.8, 2.7, 3.8]} color="#2BE08C" />
            <StatTile label="Lead Enrichment Speed" val="Real-Time Sync" sparkline={[500, 300, 100, 10]} color="#3DD7E5" />
            <StatTile label="Data Accuracy Rate" val="99.9% Verified" sparkline={[90, 95, 98, 99.9]} color="#5B6BFF" />
            <StatTile label="Rep Time Saved" val="18h / week" sparkline={[2, 6, 12, 18]} color="#F5D547" />
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: '80px 24px', background: 'var(--halo-surface)', borderTop: '1px solid var(--halo-border)', borderBottom: '1px solid var(--halo-border)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '40px', textAlign: 'center', color: 'var(--halo-on-surface)' }}>Enterprise CRM Modules</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {[
                { icon: Bot, title: "AI Lead Scoring & Enrichment", desc: "Autonomous enrichment fetching firmographics, tech stack, and intent signals directly into deal records." },
                { icon: GitMerge, title: "Custom Pipeline Automations", desc: "Visual drag-and-drop pipelines with automated triggers for emails, tasks, Webhooks, and SMS notifications." },
                { icon: Database, title: "Unified Customer Single Source of Truth", desc: "Consolidate support history, invoices, platform usage, and communication logs into a single high-speed dashboard." },
                { icon: ShieldCheck, title: "Strict Access Controls & Audit Trails", desc: "Role-based data access (RBAC) with complete change logging for strict compliance and data security." }
              ].map((item, idx) => (
                <HaloCard key={idx} style={{ padding: '28px' }}>
                  <item.icon size={32} color="#2BE08C" style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px', color: 'var(--halo-on-surface)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--halo-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
                </HaloCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '100px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '16px', color: 'var(--halo-on-surface)' }}>Empower Your Sales & Ops Teams</h2>
          <p style={{ color: 'var(--halo-muted)', marginBottom: '32px' }}>Book a demo session to map your custom CRM architecture.</p>
          <button onClick={() => navigate('/consultation/book')} className="halo-btn-primary" style={{ padding: '16px 40px', fontSize: '1.05rem', margin: '0 auto' }}>
            Book CRM Architecture Consultation
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CRMDevServicePage;
