import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import StatTile from '../../components/halo/StatTile';
import HaloCard from '../../components/halo/HaloCard';
import { ArrowRight, Server, Cloud, Cpu, GitBranch, Shield, Zap, RefreshCw } from 'lucide-react';

const H = { font: "'Inter', sans-serif", mono: "'JetBrains Mono', ui-monospace, monospace" };

const CloudDevOpsServicePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Cloud & DevOps Architecture | VP Group & Technologies";
  }, []);

  return (
    <div className="halo-page" style={{ minHeight: '100vh', fontFamily: H.font }}>
      <ProjectNavbar />

      <main style={{ paddingTop: '100px' }}>
        {/* Hero */}
        <section style={{ padding: '80px 24px', background: 'radial-gradient(ellipse at 50% 0%, rgba(61,215,229,0.12) 0%, transparent 70%)', borderBottom: '1px solid var(--halo-border)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(61,215,229,0.1)', border: '1px solid rgba(61,215,229,0.3)', borderRadius: '20px', fontSize: '0.75rem', fontFamily: H.mono, color: 'var(--halo-info)', fontWeight: 700, marginBottom: '20px' }}>
              <Cloud size={14} color="#3DD7E5" /> EDGE-READY CLOUD & DEVOPS MESH
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px', color: 'var(--halo-on-surface)' }}>
              Resilient Cloud Infrastructure & <span style={{ color: 'var(--halo-primary)' }}>Zero-Downtime CI/CD</span>
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--halo-muted)', maxWidth: '750px', margin: '0 auto 36px', lineHeight: 1.6 }}>
              Multi-cloud strategy across AWS, Google Cloud, and Azure. We automate deployment pipelines, container orchestration with Kubernetes, and Infrastructure as Code (IaC).
            </p>
            <button onClick={() => navigate('/consultation/book')} className="halo-btn-primary" style={{ padding: '14px 32px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}>
              <span>Architect Cloud Pipeline</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <StatTile label="Uptime Reliability" val="99.99% Availability" sparkline={[99.9, 99.95, 99.98, 99.99]} color="#3DD7E5" />
            <StatTile label="Deployment Frequency" val="10x Daily Deploys" sparkline={[1, 3, 6, 10]} color="#2BE08C" />
            <StatTile label="Cloud Infrastructure Cost" val="-32% Optimized" sparkline={[100, 88, 75, 68]} color="#5B6BFF" />
            <StatTile label="Deployment Rollback Time" val="< 15 Seconds" sparkline={[120, 60, 20, 15]} color="#F5D547" />
          </div>
        </section>

        {/* Capabilities */}
        <section style={{ padding: '80px 24px', background: 'var(--halo-surface)', borderTop: '1px solid var(--halo-border)', borderBottom: '1px solid var(--halo-border)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '40px', textAlign: 'center', color: 'var(--halo-on-surface)' }}>Cloud & DevOps Architecture Stack</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {[
                { icon: Server, title: "Container Orchestration", desc: "Kubernetes & Docker cluster setup, automated autoscaling, self-healing nodes, and traffic load balancing." },
                { icon: GitBranch, title: "Automated CI/CD Pipelines", desc: "GitHub Actions, GitLab CI, and Cloud Build pipelines with automated linting, testing, and zero-downtime blue/green deployments." },
                { icon: Cpu, title: "Infrastructure as Code (IaC)", desc: "Terraform & Pulumi scripts for repeatable, version-controlled cloud environment provisioning." },
                { icon: RefreshCw, title: "Observability & Monitoring", desc: "Prometheus, Grafana, Datadog, and OpenTelemetry instrumentation for instant alert triggers and performance insights." }
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
        <section style={{ padding: '100px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '16px', color: 'var(--halo-on-surface)' }}>Build High-Availability Cloud Infrastructure</h2>
          <p style={{ color: 'var(--halo-muted)', marginBottom: '32px' }}>Book a cloud architecture review session with our DevOps engineers.</p>
          <button onClick={() => navigate('/consultation/book')} className="halo-btn-primary" style={{ padding: '16px 40px', fontSize: '1.05rem', margin: '0 auto' }}>
            Book Cloud Architecture Consultation
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CloudDevOpsServicePage;
