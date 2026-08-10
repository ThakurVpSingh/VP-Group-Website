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
    <div style={{ minHeight: '100vh', background: '#0A0B0F', color: '#F2F4F8', fontFamily: H.font }}>
      <ProjectNavbar />

      <main style={{ paddingTop: '100px' }}>
        {/* Hero */}
        <section style={{ padding: '80px 24px', background: 'radial-gradient(ellipse at 50% 0%, rgba(61,215,229,0.12) 0%, transparent 70%)', borderBottom: '1px solid #1E2029' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(61,215,229,0.1)', border: '1px solid rgba(61,215,229,0.3)', borderRadius: '20px', fontSize: '0.75rem', fontFamily: H.mono, color: '#3DD7E5', fontWeight: 700, marginBottom: '20px' }}>
              <Cloud size={14} color="#3DD7E5" /> EDGE-READY CLOUD & DEVOPS MESH
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px', background: 'linear-gradient(135deg, #FFF 0%, #3DD7E5 50%, #5B6BFF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Resilient Cloud Infrastructure & Zero-Downtime CI/CD
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#94A3B8', maxWidth: '750px', margin: '0 auto 36px', lineHeight: 1.6 }}>
              Multi-cloud strategy across AWS, Google Cloud, and Azure. We automate deployment pipelines, container orchestration with Kubernetes, and Infrastructure as Code (IaC).
            </p>
            <button onClick={() => navigate('/consultation/book')} style={{ padding: '14px 32px', borderRadius: '30px', background: 'linear-gradient(135deg, #3DD7E5, #5B6BFF)', color: '#0A0B0F', fontWeight: 800, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Architect Cloud Pipeline <ArrowRight size={16} />
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
        <section style={{ padding: '80px 24px', background: '#0D0E14', borderTop: '1px solid #1E2029' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '40px', textAlign: 'center' }}>Cloud & DevOps Architecture Stack</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {[
                { icon: Server, title: "Container Orchestration", desc: "Kubernetes & Docker cluster setup, automated autoscaling, self-healing nodes, and traffic load balancing." },
                { icon: GitBranch, title: "Automated CI/CD Pipelines", desc: "GitHub Actions, GitLab CI, and Cloud Build pipelines with automated linting, testing, and zero-downtime blue/green deployments." },
                { icon: Cpu, title: "Infrastructure as Code (IaC)", desc: "Terraform & Pulumi scripts for repeatable, version-controlled cloud environment provisioning." },
                { icon: RefreshCw, title: "Observability & Monitoring", desc: "Prometheus, Grafana, Datadog, and OpenTelemetry instrumentation for instant alert triggers and performance insights." }
              ].map((item, idx) => (
                <HaloCard key={idx} style={{ padding: '28px' }}>
                  <item.icon size={32} color="#3DD7E5" style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px' }}>{item.title}</h3>
                  <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
                </HaloCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '100px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '16px' }}>Build High-Availability Cloud Infrastructure</h2>
          <p style={{ color: '#94A3B8', marginBottom: '32px' }}>Book a cloud architecture review session with our DevOps engineers.</p>
          <button onClick={() => navigate('/consultation/book')} style={{ padding: '16px 40px', borderRadius: '30px', background: 'linear-gradient(135deg, #3DD7E5, #5B6BFF)', color: '#0A0B0F', fontWeight: 800, border: 'none', cursor: 'pointer' }}>
            Book Cloud Architecture Consultation
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CloudDevOpsServicePage;
