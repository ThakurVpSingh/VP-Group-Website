import React from 'react';
import { Terminal, Shield, Eye, Cpu, Activity, Lock, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VaultDemoNavbar from '../components/VaultDemoNavbar';

const Demo = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-canvas)', color: 'var(--color-ink)', padding: '0 5% 80px', transition: 'background 0.3s ease, color 0.3s ease' }}>
      <VaultDemoNavbar />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '160px' }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(28, 105, 212, 0.1)', color: 'var(--color-primary)', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px', marginBottom: '20px' }}>SIMULATED ENVIRONMENT</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '900', letterSpacing: '-2px', marginBottom: '24px', color: 'var(--color-ink)' }}>VexioGate <span style={{ color: 'var(--color-primary)' }}>Experience.</span></h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
            Step inside our next-generation identity and access management ecosystem. This demo simulates the live operational interface of the VexioGate framework.
          </p>
        </div>

        {/* Features Showcase */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '80px' }}>
          <div id="telemetry" className="demo-card">
            <Activity color="var(--color-primary)" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '12px', color: 'var(--color-ink)' }}>Real-time Telemetry</h3>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>Monitor every node connection and identity packet across your global infrastructure with sub-millisecond latency.</p>
          </div>
          <div id="neural" className="demo-card">
            <Cpu color="#8b5cf6" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '12px', color: 'var(--color-ink)' }}>Neural Guarding</h3>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>AI-driven threat detection that evolves with every login attempt, ensuring zero-trust integrity at every layer.</p>
          </div>
          <div id="vault" className="demo-card">
            <Lock color="#ec4899" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '12px', color: 'var(--color-ink)' }}>Quantum Vault</h3>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>Immutable storage protocols that protect the sensitive data of your workforce against legacy and emerging threats.</p>
          </div>
        </div>

        {/* Simulated UI Section */}
        <div className="glass-panel" style={{ padding: '40px', background: 'var(--color-surface-card)', border: '1px solid var(--color-hairline)', borderRadius: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--color-hairline)' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }}></div>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }}></div>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }}></div>
            <span style={{ marginLeft: '12px', fontSize: '0.7rem', color: 'var(--color-muted)', letterSpacing: '1px' }}>VEXIO_TERMINAL v2.0.4 - SESSION: ACTIVE</span>
          </div>
          <div style={{ fontFamily: 'monospace', color: 'var(--color-primary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
            <div>[SYSTEM] Initializing VexioGate Core...</div>
            <div>[AUTH] Scanning global identity nodes... OK</div>
            <div style={{ color: '#10b981' }}>[SECURITY] Neural Guard active. Zero threats detected.</div>
            <div style={{ color: '#8b5cf6' }}>[NODE] Establish connection to: US-EAST-01 (ACTIVE)</div>
            <div style={{ color: '#f59e0b' }}>[INFO] 12,402 identity packets processed in last 60s.</div>
            <div className="cursor">_</div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: '100px', textAlign: 'center', background: 'var(--color-surface-soft)', padding: '60px', borderRadius: '40px', border: '1px solid var(--color-hairline)' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '20px', color: 'var(--color-ink)' }}>Ready to deploy?</h2>
          <p style={{ color: 'var(--color-muted)', marginBottom: '40px' }}>Transition from experience to operation. Choose your subscription plan to begin.</p>
          <button 
            onClick={() => navigate('/pricing')}
            style={{ 
              padding: '18px 48px', 
              borderRadius: '12px', 
              background: 'var(--color-primary)', 
              color: '#ffffff', 
              fontWeight: '900', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: '1rem',
              transition: '0.3s'
            }}
          >
            EXPLORE SUBSCRIPTION PLANS
          </button>
        </div>

      </div>

      <style>{`
        .demo-card {
          padding: 40px;
          background: var(--color-surface-card);
          border-radius: 24px;
          border: 1px solid var(--color-hairline);
          transition: 0.3s;
        }
        .demo-card:hover {
          background: var(--color-surface-soft);
          transform: translateY(-5px);
        }
        .cursor {
          display: inline-block;
          animation: blink 1s infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        @media (max-width: 1024px) {
          h1 { font-size: 3rem !important; }
        }
        @media (max-width: 768px) {
          h1 { font-size: 2.2rem !important; }
          .demo-card { padding: 30px 20px !important; }
        }
      `}</style>
    </div>
  );
};

export default Demo;
