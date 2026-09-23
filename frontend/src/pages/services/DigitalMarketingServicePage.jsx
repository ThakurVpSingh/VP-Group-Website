import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import StatTile from '../../components/halo/StatTile';
import HaloCard from '../../components/halo/HaloCard';
import { ArrowRight, TrendingUp, Target, BarChart3, Megaphone, Zap, Globe } from 'lucide-react';

const H = { font: "'Inter', sans-serif", mono: "'JetBrains Mono', ui-monospace, monospace" };

const DigitalMarketingServicePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Digital Marketing & Performance Growth | VP Group & Technologies";
  }, []);

  return (
    <div className="halo-page" style={{ minHeight: '100vh', fontFamily: H.font }}>
      <ProjectNavbar />

      <main style={{ paddingTop: '100px' }}>
        {/* Hero */}
        <section style={{ padding: '80px 24px', background: 'radial-gradient(ellipse at 50% 0%, rgba(245,213,71,0.12) 0%, transparent 70%)', borderBottom: '1px solid var(--halo-border)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(245,213,71,0.1)', border: '1px solid rgba(245,213,71,0.3)', borderRadius: '20px', fontSize: '0.75rem', fontFamily: H.mono, color: 'var(--halo-warning)', fontWeight: 700, marginBottom: '20px' }}>
              <TrendingUp size={14} color="#F5D547" /> HIGH-PERFORMANCE GROWTH ENGINE
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px', color: 'var(--halo-on-surface)' }}>
              Data-Driven Marketing <span style={{ color: 'var(--halo-warning)' }}>That Compounds</span>
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--halo-muted)', maxWidth: '750px', margin: '0 auto 36px', lineHeight: 1.6 }}>
              Precision paid acquisition across Google Ads, Meta, and LinkedIn paired with AI-optimized landing pages and full-funnel conversion attribution.
            </p>
            <button onClick={() => navigate('/consultation/book')} className="halo-btn-primary" style={{ padding: '14px 32px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}>
              <span>Scale Acquisition</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <StatTile label="Average ROAS Multiplier" val="4.2x Growth" sparkline={[1.5, 2.2, 3.1, 4.2]} color="#F5D547" />
            <StatTile label="Conversion Rate Lift" val="+142% Avg" sparkline={[10, 30, 75, 142]} color="#2BE08C" />
            <StatTile label="Cost Per Acquisition" val="-38% CAC" sparkline={[100, 85, 70, 62]} color="#3DD7E5" />
            <StatTile label="Ad Spend Managed" val="$2M+ Optimized" sparkline={[20, 50, 120, 200]} color="#FF3A5C" />
          </div>
        </section>

        {/* Strategies */}
        <section style={{ padding: '80px 24px', background: 'var(--halo-surface)', borderTop: '1px solid var(--halo-border)', borderBottom: '1px solid var(--halo-border)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '40px', textAlign: 'center', color: 'var(--halo-on-surface)' }}>Growth Engineering Stack</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {[
                { icon: Target, title: "Precision Paid Ads", desc: "Hyper-targeted campaigns across Google Search/Display, Meta Ads, and LinkedIn targeting exact decision-maker personas." },
                { icon: BarChart3, title: "Attribution Modeling", desc: "Full-funnel attribution tracking with GA4, Server-Side Tag Manager, and custom conversion events." },
                { icon: Megaphone, title: "Content & Copy Engine", desc: "AI-assisted copywriting and brand storytelling optimized for high organic engagement and click-through rates." },
                { icon: Zap, title: "Conversion Rate Optimization (CRO)", desc: "A/B split testing of landing pages, checkout flows, and CTAs to maximize yield from existing web traffic." }
              ].map((item, idx) => (
                <HaloCard key={idx} style={{ padding: '28px' }}>
                  <item.icon size={32} color="#F5D547" style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px', color: 'var(--halo-on-surface)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--halo-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
                </HaloCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '100px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '16px', color: 'var(--halo-on-surface)' }}>Ready to Scale Paid & Organic Revenue?</h2>
          <p style={{ color: 'var(--halo-muted)', marginBottom: '32px' }}>Get a free performance audit and digital growth blueprint.</p>
          <button onClick={() => navigate('/consultation/book')} className="halo-btn-primary" style={{ padding: '16px 40px', fontSize: '1.05rem', margin: '0 auto' }}>
            Request Free Marketing Audit
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DigitalMarketingServicePage;
