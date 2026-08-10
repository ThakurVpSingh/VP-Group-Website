import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import StatTile from '../../components/halo/StatTile';
import HaloCard from '../../components/halo/HaloCard';
import { ArrowRight, Shield, Lock, Eye, Terminal, Server, KeyRound, AlertTriangle } from 'lucide-react';

const H = { font: "'Inter', sans-serif", mono: "'JetBrains Mono', ui-monospace, monospace" };

const CybersecurityServicePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Cybersecurity & Zero-Trust Architecture | VP Group & Technologies";
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0A0B0F', color: '#F2F4F8', fontFamily: H.font }}>
      <ProjectNavbar />

      <main style={{ paddingTop: '100px' }}>
        {/* Hero */}
        <section style={{ padding: '80px 24px', background: 'radial-gradient(ellipse at 50% 0%, rgba(255,58,92,0.12) 0%, transparent 70%)', borderBottom: '1px solid #1E2029' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(255,58,92,0.1)', border: '1px solid rgba(255,58,92,0.3)', borderRadius: '20px', fontSize: '0.75rem', fontFamily: H.mono, color: '#FF3A5C', fontWeight: 700, marginBottom: '20px' }}>
              <Shield size={14} color="#FF3A5C" /> ZERO-TRUST CYBERSECURITY MESH
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px', background: 'linear-gradient(135deg, #FFF 0%, #FF3A5C 50%, #5B6BFF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Uncompromising Security for Modern Digital Assets
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#94A3B8', maxWidth: '750px', margin: '0 auto 36px', lineHeight: 1.6 }}>
              Threat modelling, vulnerability hardening, identity orchestration (IAM), and 24/7 continuous security monitoring to eliminate attack vectors before exploitation.
            </p>
            <button onClick={() => navigate('/consultation/book')} style={{ padding: '14px 32px', borderRadius: '30px', background: 'linear-gradient(135deg, #FF3A5C, #5B6BFF)', color: '#FFF', fontWeight: 800, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Conduct Security Audit <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <StatTile label="Zero-Trust Architecture" val="100% Policy Enforced" sparkline={[20, 50, 85, 100]} color="#FF3A5C" />
            <StatTile label="Threat Detection Speed" val="< 2.4 Seconds" sparkline={[60, 30, 10, 2.4]} color="#3DD7E5" />
            <StatTile label="Vulnerability Coverage" val="OWASP Top 10 +" sparkline={[80, 90, 95, 100]} color="#5B6BFF" />
            <StatTile label="Unplanned Security Breaches" val="0 Incidents" sparkline={[0, 0, 0, 0]} color="#2BE08C" />
          </div>
        </section>

        {/* Capabilities */}
        <section style={{ padding: '80px 24px', background: '#0D0E14', borderTop: '1px solid #1E2029' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '40px', textAlign: 'center' }}>Cybersecurity Safeguards</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {[
                { icon: Lock, title: "Zero-Trust IAM Orchestration", desc: "Never trust, always verify. Context-aware authentication, continuous identity validation, and short-lived tokens." },
                { icon: Eye, title: "Penetration Testing & Audits", desc: "White-box & black-box security penetration testing across APIs, web apps, databases, and cloud infrastructure." },
                { icon: KeyRound, title: "Secrets & Key Management", desc: "Hardware-backed key rotation, Vault encryption at rest and in transit, with automated policy enforcement." },
                { icon: AlertTriangle, title: "Automated Incident Response", desc: "Real-time SIEM logging, anomaly detection, and automated containment playbooks stopping threats instantaneously." }
              ].map((item, idx) => (
                <HaloCard key={idx} style={{ padding: '28px' }}>
                  <item.icon size={32} color="#FF3A5C" style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px' }}>{item.title}</h3>
                  <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
                </HaloCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '100px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '16px' }}>Secure Your Enterprise Architecture Today</h2>
          <p style={{ color: '#94A3B8', marginBottom: '32px' }}>Schedule a zero-trust vulnerability assessment with our security team.</p>
          <button onClick={() => navigate('/consultation/book')} style={{ padding: '16px 40px', borderRadius: '30px', background: 'linear-gradient(135deg, #FF3A5C, #5B6BFF)', color: '#FFF', fontWeight: 800, border: 'none', cursor: 'pointer' }}>
            Book Security Vulnerability Audit
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CybersecurityServicePage;
