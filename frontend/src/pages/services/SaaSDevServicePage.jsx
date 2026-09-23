import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import StatTile from '../../components/halo/StatTile';
import HaloCard from '../../components/halo/HaloCard';
import Chip from '../../components/halo/Chip';
import { ArrowRight, Layers, CreditCard, Shield, Zap, Server, Globe, Cpu, CheckCircle } from 'lucide-react';

const H = { font: "'Inter', sans-serif", mono: "'JetBrains Mono', ui-monospace, monospace" };

const SaaSDevServicePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "SaaS Platform Engineering | VP Group & Technologies";
  }, []);

  return (
    <div className="halo-page" style={{ minHeight: '100vh', fontFamily: H.font }}>
      <ProjectNavbar />

      <main style={{ paddingTop: '100px' }}>
        {/* Hero Banner */}
        <section style={{ padding: '80px 24px', background: 'radial-gradient(ellipse at 50% 0%, rgba(91,107,255,0.15) 0%, transparent 70%)', borderBottom: '1px solid var(--halo-border)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(91,107,255,0.1)', border: '1px solid rgba(91,107,255,0.3)', borderRadius: '20px', fontSize: '0.75rem', fontFamily: H.mono, color: 'var(--halo-primary)', fontWeight: 700, marginBottom: '20px' }}>
              <Layers size={14} color="#5B6BFF" /> MULTI-TENANT SAAS ARCHITECTURE
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px', color: 'var(--halo-on-surface)' }}>
              SaaS Development <span style={{ color: 'var(--halo-primary)' }}>Built for Infinite Scale</span>
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--halo-muted)', maxWidth: '750px', margin: '0 auto 36px', lineHeight: 1.6 }}>
              From initial MVP prototype to multi-region multi-tenant platforms. We architect subscription engines, tenant data isolation, automated billing, and AI features built to scale seamlessly.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/consultation/book')} className="halo-btn-primary" style={{ padding: '14px 32px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span>Launch SaaS Platform</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <StatTile label="Tenant Data Isolation" val="Row-Level Security" sparkline={[10, 30, 60, 90, 100]} color="#5B6BFF" />
            <StatTile label="Billing Webhook Reliability" val="99.999% SLA" sparkline={[99.9, 99.95, 99.99, 99.999]} color="#2BE08C" />
            <StatTile label="Time to Market" val="3x Faster Launch" sparkline={[1, 2, 2.5, 3]} color="#3DD7E5" />
            <StatTile label="Global Edge Latency" val="< 25 ms" sparkline={[120, 80, 45, 22]} color="#F5D547" />
          </div>
        </section>

        {/* Architecture & Methodology */}
        <section style={{ padding: '80px 24px', background: 'var(--halo-surface)', borderTop: '1px solid var(--halo-border)', borderBottom: '1px solid var(--halo-border)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '40px', textAlign: 'center', color: 'var(--halo-on-surface)' }}>SaaS Engineering Methodology</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {[
                { icon: Server, title: "1. Multi-Tenant Core", desc: "Data isolation via schema-per-tenant or Row-Level Security (RLS) ensuring absolute privacy and zero cross-tenant leakage." },
                { icon: CreditCard, title: "2. Automated Billing Engine", desc: "Stripe & Paddle webhook integration supporting usage-based metering, tier upgrades, proration, and automated dunning loops." },
                { icon: Shield, title: "3. Enterprise Auth & RBAC", desc: "SSO, SAML 2.0, OAuth2, and granular role-based permissions ready for enterprise SOC2 compliance audits." },
                { icon: Cpu, title: "4. Embedded AI Features", desc: "Integration of autonomous AI workflows, vector search, and LLM Copilots directly into your product's user interface." }
              ].map((item, idx) => (
                <HaloCard key={idx} style={{ padding: '28px' }}>
                  <item.icon size={32} color="#3DD7E5" style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px', color: 'var(--halo-on-surface)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--halo-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
                </HaloCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '100px 24px', textAlign: 'center', background: 'radial-gradient(circle at 50% 50%, rgba(91,107,255,0.1) 0%, transparent 60%)' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '16px', color: 'var(--halo-on-surface)' }}>Ready to Scale Your SaaS Product?</h2>
          <p style={{ color: 'var(--halo-muted)', marginBottom: '32px' }}>Book a 30-minute architecture review session with our SaaS engineering leads.</p>
          <button onClick={() => navigate('/consultation/book')} className="halo-btn-primary" style={{ padding: '16px 40px', fontSize: '1.05rem', margin: '0 auto' }}>
            Book SaaS Architecture Call
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SaaSDevServicePage;
