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
    <div style={{ minHeight: '100vh', background: '#0A0B0F', color: '#F2F4F8', fontFamily: H.font }}>
      <ProjectNavbar />

      <main style={{ paddingTop: '100px' }}>
        {/* Hero */}
        <section style={{ padding: '80px 24px', background: 'radial-gradient(ellipse at 50% 0%, rgba(43,224,140,0.12) 0%, transparent 70%)', borderBottom: '1px solid #1E2029' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(43,224,140,0.1)', border: '1px solid rgba(43,224,140,0.3)', borderRadius: '20px', fontSize: '0.75rem', fontFamily: H.mono, color: '#2BE08C', fontWeight: 700, marginBottom: '20px' }}>
              <Users size={14} color="#2BE08C" /> INTELLIGENT CRM ARCHITECTURE
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px', background: 'linear-gradient(135deg, #FFF 0%, #2BE08C 50%, #3DD7E5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Custom CRM Platforms Engineered for Your Workflow
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#94A3B8', maxWidth: '750px', margin: '0 auto 36px', lineHeight: 1.6 }}>
              Ditch generic off-the-shelf software. We engineer tailor-made CRM solutions with built-in AI lead enrichment, automated follow-up sequences, and seamless ERP data sync.
            </p>
            <button onClick={() => navigate('/consultation/book')} style={{ padding: '14px 32px', borderRadius: '30px', background: 'linear-gradient(135deg, #2BE08C, #3DD7E5)', color: '#0A0B0F', fontWeight: 800, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Build Custom CRM <ArrowRight size={16} />
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
        <section style={{ padding: '80px 24px', background: '#0D0E14', borderTop: '1px solid #1E2029' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '40px', textAlign: 'center' }}>Enterprise CRM Modules</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {[
                { icon: Bot, title: "AI Lead Scoring & Enrichment", desc: "Autonomous enrichment fetching firmographics, tech stack, and intent signals directly into deal records." },
                { icon: GitMerge, title: "Custom Pipeline Automations", desc: "Visual drag-and-drop pipelines with automated triggers for emails, tasks, Webhooks, and SMS notifications." },
                { icon: Database, title: "Unified Customer Single Source of Truth", desc: "Consolidate support history, invoices, platform usage, and communication logs into a single high-speed dashboard." },
                { icon: ShieldCheck, title: "Strict Access Controls & Audit Trails", desc: "Role-based data access (RBAC) with complete change logging for strict compliance and data security." }
              ].map((item, idx) => (
                <HaloCard key={idx} style={{ padding: '28px' }}>
                  <item.icon size={32} color="#2BE08C" style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px' }}>{item.title}</h3>
                  <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
                </HaloCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '100px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '16px' }}>Empower Your Sales & Ops Teams</h2>
          <p style={{ color: '#94A3B8', marginBottom: '32px' }}>Book a demo session to map your custom CRM architecture.</p>
          <button onClick={() => navigate('/consultation/book')} style={{ padding: '16px 40px', borderRadius: '30px', background: 'linear-gradient(135deg, #2BE08C, #3DD7E5)', color: '#0A0B0F', fontWeight: 800, border: 'none', cursor: 'pointer' }}>
            Book CRM Architecture Consultation
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CRMDevServicePage;
