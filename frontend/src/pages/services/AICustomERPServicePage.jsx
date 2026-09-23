import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import { 
  Cpu, 
  Layers, 
  BarChart3, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Database, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  FileText,
  Boxes,
  Lock,
  Workflow
} from 'lucide-react';

export default function AICustomERPServicePage() {
  const [activeModule, setActiveModule] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'AI Custom ERP Development | VP Group & Technologies';
  }, []);

  const erpModules = [
    {
      id: 'finance',
      title: 'AI Financial Intelligence & Reconciliation',
      icon: <BarChart3 className="text-indigo-500" size={28} />,
      desc: 'Automated invoice matching, predictive cash flow forecasting, multi-currency ledger management, and instant tax compliance audit logs.',
      metrics: '95% manual bookkeeping eliminated',
      capabilities: ['Automated 3-way invoice matching', 'AI fraud and anomaly detection', 'Predictive runway & revenue forecasting', 'Multi-entity consolidation']
    },
    {
      id: 'supply-chain',
      title: 'Smart Inventory & Supply Chain',
      icon: <Boxes className="text-emerald-500" size={28} />,
      desc: 'Dynamic inventory re-ordering based on predictive demand patterns, supplier lead-time modeling, and multi-warehouse routing.',
      metrics: '38% lower carrying costs',
      capabilities: ['Predictive stockout alerts', 'Automated PO generation', 'Lot & serial number tracking', 'Supplier SLA performance scoring']
    },
    {
      id: 'operations',
      title: 'Automated Operations & Workflow Engine',
      icon: <Workflow className="text-cyan-500" size={28} />,
      desc: 'No-code and low-code operational trigger engines that automatically route tasks, approvals, and customer escalations across departments.',
      metrics: '4.5x faster task turnaround',
      capabilities: ['Smart approval matrices', 'Cross-departmental webhook routing', 'SLA breach escalation loops', 'Real-time bottleneck identification']
    },
    {
      id: 'hr-workforce',
      title: 'Intelligent HR & Workforce Planning',
      icon: <Cpu className="text-violet-500" size={28} />,
      desc: 'Automated payroll processing, shift optimization, skill matrix mapping, and employee self-service portals.',
      metrics: '100% on-time payroll delivery',
      capabilities: ['Biometric & remote clock-in sync', 'Smart roster generation', 'Performance review tracking', 'Tax deductions & compliance filings']
    }
  ];

  const businessBenefits = [
    {
      title: 'Tailored 100% to Your Workflows',
      desc: 'Say goodbye to bloated off-the-shelf software with per-seat licensing fees. Your custom ERP is built specifically for your exact business logic and processes.',
      icon: <Layers className="text-indigo-500" size={24} />
    },
    {
      title: 'AI-Powered Decision Making',
      desc: 'Built-in machine learning models analyze your operational data 24/7 to predict inventory deficits, revenue trends, and client payment delays before they happen.',
      icon: <Sparkles className="text-amber-500" size={24} />
    },
    {
      title: 'Enterprise-Grade Data Security',
      desc: 'Role-based access control (RBAC), end-to-end encryption at rest and in transit, complete audit trails, and self-hosted or dedicated cloud deployment options.',
      icon: <Lock className="text-emerald-500" size={24} />
    },
    {
      title: 'Zero Per-Seat License Fees',
      desc: 'You own your intellectual property and software code. Scale your company from 20 to 20,000 employees without paying skyrocketing monthly SaaS seat charges.',
      icon: <TrendingUp className="text-blue-500" size={24} />
    }
  ];

  const techStack = [
    { category: 'Backend & Microservices', tech: 'Node.js, Python (FastAPI), Go, NestJS' },
    { category: 'Frontend Dashboards', tech: 'React, Next.js, Tailwind CSS, TanStack Table' },
    { category: 'Databases & In-Memory', tech: 'PostgreSQL, Redis, TimescaleDB, ClickHouse' },
    { category: 'AI & Machine Learning', tech: 'OpenAI, Google Gemini, Anthropic Claude, LangChain, PyTorch' },
    { category: 'Infrastructure & Cloud', tech: 'Docker, Kubernetes, AWS, Google Cloud, Terraform' }
  ];

  const steps = [
    { step: '01', title: 'Workflow Discovery & Architecture', desc: 'We shadow your departments, map every manual spreadsheet and process, and design a streamlined modular architecture.' },
    { step: '02', title: 'Data Migration & Pipeline Setup', desc: 'Secure extraction, cleaning, and normalization of historical data from legacy systems, Excel files, and existing tools.' },
    { step: '03', title: 'Modular Agile Development', desc: 'We build and deploy modules in rapid 2-week sprints—starting with high-impact areas like finance and inventory.' },
    { step: '04', title: 'AI Integration & Automation', desc: 'We train and connect proprietary AI models for predictive analytics, OCR invoice reading, and smart notifications.' },
    { step: '05', title: 'Staff Training & 24/7 Support', desc: 'Hands-on training sessions for your team, comprehensive video guides, and 24/7 technical monitoring support.' }
  ];

  return (
    <div className="halo-page" style={{ minHeight: '100vh' }}>
      <ProjectNavbar />

      {/* Hero Section */}
      <section style={{ padding: '140px 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '30px', background: 'rgba(91, 107, 255, 0.1)', color: 'var(--halo-primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '24px' }}>
          <Sparkles size={16} />
          <span>ENTERPRISE DIGITAL TRANSFORMATION</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '24px', color: 'var(--halo-on-surface)' }}>
          AI Custom ERP <br />
          <span style={{ color: 'var(--halo-primary)' }}>Engineered for Your Exact Operations.</span>
        </h1>

        <p style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--halo-muted)', maxWidth: '780px', marginBottom: '36px' }}>
          Replace rigid, expensive legacy software with a custom AI-driven Enterprise Resource Planning system. 
          Unify your finances, inventory, human resources, and customer operations into a single intelligent platform you own 100%.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '60px' }}>
          <Link to="/consultation/book" className="halo-btn-primary" style={{ padding: '14px 32px', height: 'auto', fontSize: '1rem' }}>
            <span>Schedule ERP Consultation</span>
            <ArrowRight size={18} />
          </Link>
          <a href="#modules" className="halo-btn-secondary" style={{ padding: '14px 28px', height: 'auto', fontSize: '1rem' }}>
            <span>Explore ERP Modules</span>
          </a>
        </div>

        {/* Quick Highlights Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', padding: '28px', background: 'var(--halo-surface)', border: '1px solid var(--halo-border)', borderRadius: '16px' }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--halo-primary)' }}>100%</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--halo-on-surface)', fontWeight: 700 }}>Custom Business Logic</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--halo-muted)' }}>Built around how your team actually operates</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--halo-success)' }}>Zero</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--halo-on-surface)', fontWeight: 700 }}>Per-Seat License Fees</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--halo-muted)' }}>Full source code & IP ownership</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--halo-info)' }}>3-4x</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--halo-on-surface)', fontWeight: 700 }}>Faster Processing</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--halo-muted)' }}>Automated paperwork and approvals</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#F5D547' }}>99.99%</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--halo-on-surface)', fontWeight: 700 }}>Availability SLA</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--halo-muted)' }}>Cloud-native and resilient infrastructure</div>
          </div>
        </div>
      </section>

      {/* Interactive Core Modules Section */}
      <section id="modules" style={{ padding: '80px 24px', background: 'var(--halo-surface)', borderTop: '1px solid var(--halo-border)', borderBottom: '1px solid var(--halo-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--halo-primary)', textTransform: 'uppercase', letterSpacing: '2px' }}>CORE PLATFORM ARCHITECTURE</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginTop: '8px', color: 'var(--halo-on-surface)' }}>Modular Capabilities Designed to Scale</h2>
            <p style={{ color: 'var(--halo-muted)', fontSize: '1.05rem', maxWidth: '640px', margin: '12px auto 0' }}>
              Choose the exact operational modules your business needs today, and effortlessly plug in additional intelligence modules as you grow.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {erpModules.map((mod, idx) => (
              <div 
                key={mod.id}
                onClick={() => setActiveModule(idx)}
                style={{
                  padding: '32px',
                  borderRadius: '16px',
                  background: activeModule === idx ? 'var(--halo-elevated)' : 'var(--halo-bg)',
                  border: `2px solid ${activeModule === idx ? 'var(--halo-primary)' : 'var(--halo-border)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ marginBottom: '16px' }}>{mod.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--halo-on-surface)', marginBottom: '12px' }}>{mod.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--halo-muted)', lineHeight: 1.6, marginBottom: '20px' }}>{mod.desc}</p>
                <div style={{ padding: '8px 12px', background: 'rgba(43, 224, 140, 0.1)', color: 'var(--halo-success)', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '20px' }}>
                  Impact: {mod.metrics}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {mod.capabilities.map((cap, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--halo-on-surface)' }}>
                      <CheckCircle2 size={16} className="text-emerald-500" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Custom ERP vs Generic COTS */}
      <section style={{ padding: '90px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--halo-primary)', textTransform: 'uppercase', letterSpacing: '2px' }}>THE VP GROUP ADVANTAGE</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginTop: '8px', color: 'var(--halo-on-surface)' }}>Why Forward-Thinking Companies Choose Custom ERP</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px' }}>
          {businessBenefits.map((b, i) => (
            <div key={i} style={{ padding: '32px', background: 'var(--halo-surface)', border: '1px solid var(--halo-border)', borderRadius: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--halo-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                {b.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--halo-on-surface)', marginBottom: '12px' }}>{b.title}</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--halo-muted)', lineHeight: 1.6 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack Grid */}
      <section style={{ padding: '80px 24px', background: 'var(--halo-surface)', borderTop: '1px solid var(--halo-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--halo-primary)', textTransform: 'uppercase', letterSpacing: '2px' }}>RELIABLE FOUNDATION</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--halo-on-surface)', marginTop: '8px' }}>Technologies We Deploy for Custom ERP</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {techStack.map((t, idx) => (
              <div key={idx} style={{ padding: '24px', background: 'var(--halo-bg)', border: '1px solid var(--halo-border)', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--halo-primary)', textTransform: 'uppercase', marginBottom: '8px' }}>{t.category}</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--halo-on-surface)' }}>{t.tech}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step by step delivery process */}
      <section style={{ padding: '90px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--halo-primary)', textTransform: 'uppercase', letterSpacing: '2px' }}>OUR IMPLEMENTATION ROADMAP</span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--halo-on-surface)', marginTop: '8px' }}>From Requirement Analysis to Enterprise Go-Live</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: '24px', padding: '28px', background: 'var(--halo-surface)', border: '1px solid var(--halo-border)', borderRadius: '16px', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--halo-primary)', minWidth: '50px' }}>{s.step}</div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--halo-on-surface)', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--halo-muted)', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action card */}
      <section style={{ padding: '40px 24px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ padding: '60px 40px', background: 'linear-gradient(135deg, var(--halo-primary) 0%, #22D3EE 100%)', borderRadius: '24px', color: '#ffffff', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '16px', color: '#fff' }}>Ready to Build Your AI-Powered Custom ERP?</h2>
          <p style={{ fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto 36px', opacity: 0.95, color: '#fff' }}>
            Book a 30-minute discovery consultation with our senior solutions architects. We will analyze your workflows and outline an actionable ERP roadmap.
          </p>
          <Link to="/consultation/book" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#ffffff', color: '#0F172A', padding: '16px 36px', borderRadius: '30px', fontWeight: 800, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}>
            <span>Book Discovery Call</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
