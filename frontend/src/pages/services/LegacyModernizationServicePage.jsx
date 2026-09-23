import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import { 
  RefreshCw, 
  Layers, 
  Cloud, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Database, 
  Cpu, 
  Lock, 
  TrendingUp, 
  FileCode,
  Server,
  ArrowUpRight,
  GitBranch
} from 'lucide-react';

export default function LegacyModernizationServicePage() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Legacy Modernization Services | VP Group & Technologies';
  }, []);

  const strategies = [
    {
      title: 'Monolith to Microservices (Strangler Fig)',
      desc: 'Incrementally carve out discrete business domains into independent microservices or serverless functions without risky big-bang rewrites.',
      benefits: 'Zero downtime during incremental releases; independent team velocity.'
    },
    {
      title: 'Cloud Replatforming & Containerization',
      desc: 'Migrate on-premise servers and brittle VMs to modern containerized environments on AWS, Google Cloud, or Azure with automated autoscaling.',
      benefits: 'Up to 55% infrastructure cost reduction and 99.99% automated fault recovery.'
    },
    {
      title: 'Database & Schema Modernization',
      desc: 'Migrate outdated legacy SQL databases to distributed, high-throughput engines like modern PostgreSQL, ClickHouse, and managed cloud DBs with zero data loss.',
      benefits: 'Eliminates database bottlenecks and enables real-time reporting.'
    },
    {
      title: 'API Encapsulation & Integration Layer',
      desc: 'Wrap aging backend systems with secure RESTful and GraphQL API gateways, enabling modern web, mobile, and partner apps to integrate seamlessly.',
      benefits: 'Unlock legacy data without breaking existing core banking or ERP logic.'
    }
  ];

  const modernizationPillars = [
    {
      title: '60% Faster Feature Delivery',
      desc: 'Modern CI/CD pipelines, containerized environments, and clean modular code let your engineering team ship features in days instead of months.',
      icon: <Zap className="text-amber-500" size={24} />
    },
    {
      title: 'Zero Business Disruption',
      desc: 'We use parallel runs, canary releases, and bi-directional data synchronization to guarantee your customers experience uninterrupted service.',
      icon: <ShieldCheck className="text-emerald-500" size={24} />
    },
    {
      title: 'Eliminate Technical Debt & Security Risks',
      desc: 'Patch unmaintained libraries, resolve CVE vulnerabilities, and ensure compliance with modern standards (GDPR, SOC2, HIPAA, ISO 27001).',
      icon: <Lock className="text-blue-500" size={24} />
    },
    {
      title: 'Substantial Cost Savings',
      desc: 'Deprecate expensive proprietary legacy licenses, reduce datacenter hosting footprints, and switch to pay-as-you-go elastic cloud resources.',
      icon: <TrendingUp className="text-indigo-500" size={24} />
    }
  ];

  const modernizationPhases = [
    { num: '01', title: 'System & Codebase Audit', desc: 'Deep-dive analysis of your legacy source code, database dependencies, security vulnerabilities, and operational bottlenecks.' },
    { num: '02', title: 'Modern Target Architecture', desc: 'Designing a future-proof cloud-native target architecture (APIs, microservices, cloud infra) and step-by-step migration matrix.' },
    { num: '03', title: 'Safe Incremental Extraction', desc: 'Extracting non-critical and high-impact services first using the Strangler pattern with comprehensive automated regression testing.' },
    { num: '04', title: 'Data Migration & Verification', desc: 'Secure ETL pipelines to synchronize, validate, and migrate historical data with zero packet loss or ledger discrepancies.' },
    { num: '05', title: 'Cutover, Training & Maintenance', desc: 'Seamless switchover to the modern stack, engineering handoff, and 24/7 proactive infrastructure monitoring.' }
  ];

  return (
    <div className="halo-page" style={{ minHeight: '100vh' }}>
      <ProjectNavbar />

      {/* Hero Section */}
      <section style={{ padding: '140px 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '30px', background: 'rgba(91, 107, 255, 0.1)', color: 'var(--halo-primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '24px' }}>
          <RefreshCw size={16} />
          <span>ENTERPRISE LEGACY TRANSFORMATION</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '24px', color: 'var(--halo-on-surface)' }}>
          Legacy Modernization. <br />
          <span style={{ color: 'var(--halo-primary)' }}>Re-Engineer Without Business Disruption.</span>
        </h1>

        <p style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--halo-muted)', maxWidth: '780px', marginBottom: '36px' }}>
          Free your enterprise from slow, brittle legacy applications and skyrocketing maintenance costs. 
          We modernize monolithic architectures, refactor outdated codebases, and migrate infrastructure to the cloud with zero downtime.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '60px' }}>
          <Link to="/consultation/book" className="halo-btn-primary" style={{ padding: '14px 32px', height: 'auto', fontSize: '1rem' }}>
            <span>Book Legacy Code Audit</span>
            <ArrowRight size={18} />
          </Link>
          <a href="#strategies" className="halo-btn-secondary" style={{ padding: '14px 28px', height: 'auto', fontSize: '1rem' }}>
            <span>Explore Modernization Strategies</span>
          </a>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', padding: '28px', background: 'var(--halo-surface)', border: '1px solid var(--halo-border)', borderRadius: '16px' }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--halo-primary)' }}>0 hrs</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--halo-on-surface)', fontWeight: 700 }}>Unplanned Downtime</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--halo-muted)' }}>Canary releases & phased migrations</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--halo-success)' }}>50-70%</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--halo-on-surface)', fontWeight: 700 }}>Lower Server Costs</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--halo-muted)' }}>Elastic cloud auto-scaling</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--halo-info)' }}>10x</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--halo-on-surface)', fontWeight: 700 }}>Release Velocity</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--halo-muted)' }}>Modular code & automated CI/CD</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#F5D547' }}>100%</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--halo-on-surface)', fontWeight: 700 }}>Security Compliance</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--halo-muted)' }}>Zero unpatched legacy vulnerabilities</div>
          </div>
        </div>
      </section>

      {/* Modernization Strategies */}
      <section id="strategies" style={{ padding: '80px 24px', background: 'var(--halo-surface)', borderTop: '1px solid var(--halo-border)', borderBottom: '1px solid var(--halo-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--halo-primary)', textTransform: 'uppercase', letterSpacing: '2px' }}>PROVEN ENGINEERING APPROACHES</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginTop: '8px', color: 'var(--halo-on-surface)' }}>How We Modernize Complex Systems</h2>
            <p style={{ color: 'var(--halo-muted)', fontSize: '1.05rem', maxWidth: '640px', margin: '12px auto 0' }}>
              We avoid reckless "rip and replace" tactics. Instead, we use battle-tested architectural patterns to incrementally de-risk your digital infrastructure.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {strategies.map((strat, idx) => (
              <div key={idx} style={{ padding: '32px', background: 'var(--halo-bg)', border: '1px solid var(--halo-border)', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--halo-primary)', marginBottom: '8px' }}>STRATEGY 0{idx + 1}</div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--halo-on-surface)', marginBottom: '12px' }}>{strat.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--halo-muted)', lineHeight: 1.6, marginBottom: '24px' }}>{strat.desc}</p>
                </div>
                <div style={{ padding: '12px 16px', background: 'rgba(91, 107, 255, 0.08)', borderRadius: '10px', fontSize: '0.88rem', color: 'var(--halo-on-surface)', borderLeft: '3px solid var(--halo-primary)' }}>
                  <strong>Key Advantage:</strong> {strat.benefits}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Benefits Grid */}
      <section style={{ padding: '90px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--halo-primary)', textTransform: 'uppercase', letterSpacing: '2px' }}>TANGIBLE BUSINESS OUTCOMES</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginTop: '8px', color: 'var(--halo-on-surface)' }}>What You Gain After Modernization</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px' }}>
          {modernizationPillars.map((p, i) => (
            <div key={i} style={{ padding: '32px', background: 'var(--halo-surface)', border: '1px solid var(--halo-border)', borderRadius: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--halo-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                {p.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--halo-on-surface)', marginBottom: '12px' }}>{p.title}</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--halo-muted)', lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Phased Roadmap */}
      <section style={{ padding: '80px 24px', background: 'var(--halo-surface)', borderTop: '1px solid var(--halo-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--halo-primary)', textTransform: 'uppercase', letterSpacing: '2px' }}>THE MIGRATION LIFECYCLE</span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--halo-on-surface)', marginTop: '8px' }}>Predictable, Risk-Managed Execution</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {modernizationPhases.map((phase, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '24px', padding: '24px 28px', background: 'var(--halo-bg)', border: '1px solid var(--halo-border)', borderRadius: '14px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--halo-primary)', minWidth: '45px' }}>{phase.num}</div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--halo-on-surface)', marginBottom: '6px' }}>{phase.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--halo-muted)', lineHeight: 1.6, margin: 0 }}>{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section style={{ padding: '40px 24px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ padding: '60px 40px', background: 'var(--halo-surface)', border: '1px solid var(--halo-border)', borderRadius: '24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '16px', color: 'var(--halo-on-surface)' }}>Ready to Modernize Your Legacy Infrastructure?</h2>
          <p style={{ fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto 36px', color: 'var(--halo-muted)' }}>
            Schedule an architecture audit with our modernization team. We will analyze your codebase, map risks, and produce an incremental migration roadmap.
          </p>
          <Link to="/consultation/book" className="halo-btn-primary" style={{ padding: '16px 36px', height: 'auto', fontSize: '1rem' }}>
            <span>Book Free Technical Audit</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
