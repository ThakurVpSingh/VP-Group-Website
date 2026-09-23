import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import { 
  Puzzle, 
  Layers, 
  Workflow, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Globe, 
  Cpu, 
  Lock, 
  ShieldCheck, 
  Share2,
  Plug,
  ExternalLink
} from 'lucide-react';

export default function PluginIntegrationsServicePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Plug-ins & Enterprise Integrations | VP Group & Technologies';
  }, []);

  const ecosystems = [
    {
      title: 'E-Commerce & Billing Connectors',
      category: 'Commerce',
      platforms: 'Shopify, WooCommerce, Stripe, PayPal, Razorpay, Paddle',
      desc: 'Custom Shopify apps, custom checkout funnels, localized payment gateway connectors, and automated inventory sync with warehouses.'
    },
    {
      title: 'CRM & Marketing Automation',
      category: 'Sales & Growth',
      platforms: 'Salesforce, HubSpot, Zoho, ActiveCampaign, Marketo',
      desc: 'Two-way lead synchronization, automated pipeline triggers, custom CRM dashboard widgets, and marketing attribution tracking.'
    },
    {
      title: 'Design & Creative Cloud Extensions',
      category: 'Creative Tech',
      platforms: 'Adobe InDesign, Photoshop, Illustrator, Figma, Premiere Pro',
      desc: 'Automated catalog generation plugins, design token sync engines, bulk asset export pipelines, and native C++ / CEP / UXP plugins.'
    },
    {
      title: 'Productivity & Collaboration Hubs',
      category: 'Workforce',
      platforms: 'Slack, Microsoft Teams, Jira, Asana, Notion, Google Workspace',
      desc: 'Custom bots, automated incident reporting alerts, real-time Jira sprint syncing, and approval bots right within Slack and Teams.'
    }
  ];

  const integrationFeatures = [
    {
      title: 'Bi-Directional Real-Time Sync',
      desc: 'We build high-throughput webhook listeners and message queues (Kafka, RabbitMQ) that sync data across your systems in sub-second latency.',
      icon: <Workflow className="text-indigo-500" size={24} />
    },
    {
      title: 'Robust Error Handling & Auto-Retry',
      desc: 'Never lose a transaction or lead. Exponential backoff retries, dead-letter queues, and instant alerts when third-party APIs experience downtime.',
      icon: <ShieldCheck className="text-emerald-500" size={24} />
    },
    {
      title: 'Bank-Grade Security & Token Rotation',
      desc: 'OAuth2 authentication flows, encrypted credential vaults, zero-trust token rotation, and complete audit logging for regulatory compliance.',
      icon: <Lock className="text-blue-500" size={24} />
    },
    {
      title: 'Public & Private Marketplace Readiness',
      desc: 'We package and prepare your extensions for official app stores (Shopify App Store, Salesforce AppExchange, Figma Community, Slack Directory).',
      icon: <Puzzle className="text-amber-500" size={24} />
    }
  ];

  const techStack = [
    { name: 'APIs & Protocols', list: 'REST, GraphQL, gRPC, WebSockets, Webhooks' },
    { name: 'Messaging & Queues', list: 'Apache Kafka, RabbitMQ, AWS SQS, Redis Pub/Sub' },
    { name: 'SDKs & Languages', list: 'TypeScript, Node.js, Python, C++, Go, React' },
    { name: 'Security & Auth', list: 'OAuth 2.0, JWT, HMAC Signatures, AWS Secrets Manager' }
  ];

  return (
    <div className="halo-page" style={{ minHeight: '100vh' }}>
      <ProjectNavbar />

      {/* Hero Section */}
      <section style={{ padding: '140px 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '30px', background: 'rgba(91, 107, 255, 0.1)', color: 'var(--halo-primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '24px' }}>
          <Plug size={16} />
          <span>ENTERPRISE INTEGRATION ECOSYSTEMS</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '24px', color: 'var(--halo-on-surface)' }}>
          Plug-ins & Integrations. <br />
          <span style={{ color: 'var(--halo-primary)' }}>Connect Every Tool in Your Business.</span>
        </h1>

        <p style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--halo-muted)', maxWidth: '780px', marginBottom: '36px' }}>
          Eliminate disconnected software silos. We engineer high-performance custom plugins, API middleware, and enterprise connectors 
          that unify your software stack into one cohesive, automated powerhouse.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '60px' }}>
          <Link to="/consultation/book" className="halo-btn-primary" style={{ padding: '14px 32px', height: 'auto', fontSize: '1rem' }}>
            <span>Discuss Integration Needs</span>
            <ArrowRight size={18} />
          </Link>
          <a href="#ecosystems" className="halo-btn-secondary" style={{ padding: '14px 28px', height: 'auto', fontSize: '1rem' }}>
            <span>View Supported Ecosystems</span>
          </a>
        </div>

        {/* Highlight Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', padding: '28px', background: 'var(--halo-surface)', border: '1px solid var(--halo-border)', borderRadius: '16px' }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--halo-primary)' }}>100+</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--halo-on-surface)', fontWeight: 700 }}>APIs Integrated</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--halo-muted)' }}>From Stripe to custom proprietary protocols</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--halo-success)' }}>&lt; 500ms</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--halo-on-surface)', fontWeight: 700 }}>Sync Latency</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--halo-muted)' }}>Real-time webhooks & event streams</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--halo-info)' }}>99.99%</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--halo-on-surface)', fontWeight: 700 }}>Delivery Reliability</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--halo-muted)' }}>Dead-letter queues & automated retries</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#F5D547' }}>SOC2 / GDPR</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--halo-on-surface)', fontWeight: 700 }}>Compliance Ready</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--halo-muted)' }}>Zero unencrypted data transfers</div>
          </div>
        </div>
      </section>

      {/* Ecosystems We Build For */}
      <section id="ecosystems" style={{ padding: '80px 24px', background: 'var(--halo-surface)', borderTop: '1px solid var(--halo-border)', borderBottom: '1px solid var(--halo-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--halo-primary)', textTransform: 'uppercase', letterSpacing: '2px' }}>SUPPORTED ECOSYSTEMS</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginTop: '8px', color: 'var(--halo-on-surface)' }}>Custom Plugins Built for Any Environment</h2>
            <p style={{ color: 'var(--halo-muted)', fontSize: '1.05rem', maxWidth: '640px', margin: '12px auto 0' }}>
              Whether you need an internal connector between ERP and CRM or a public monetization plugin for Shopify or Figma, we deliver it end-to-end.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {ecosystems.map((eco, i) => (
              <div key={i} style={{ padding: '32px', background: 'var(--halo-bg)', border: '1px solid var(--halo-border)', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--halo-primary)', textTransform: 'uppercase', marginBottom: '8px' }}>{eco.category}</div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--halo-on-surface)', marginBottom: '12px' }}>{eco.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--halo-muted)', lineHeight: 1.6, marginBottom: '20px' }}>{eco.desc}</p>
                </div>
                <div style={{ padding: '12px 14px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '10px', fontSize: '0.85rem', color: 'var(--halo-on-surface)' }}>
                  <span style={{ fontWeight: 700, color: 'var(--halo-primary)' }}>Platforms: </span>{eco.platforms}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Engineering Features */}
      <section style={{ padding: '90px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--halo-primary)', textTransform: 'uppercase', letterSpacing: '2px' }}>ENTERPRISE GRADE</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginTop: '8px', color: 'var(--halo-on-surface)' }}>Why Our Integrations Never Fail Under Load</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px' }}>
          {integrationFeatures.map((feat, i) => (
            <div key={i} style={{ padding: '32px', background: 'var(--halo-surface)', border: '1px solid var(--halo-border)', borderRadius: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--halo-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                {feat.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--halo-on-surface)', marginBottom: '12px' }}>{feat.title}</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--halo-muted)', lineHeight: 1.6 }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section style={{ padding: '80px 24px', background: 'var(--halo-surface)', borderTop: '1px solid var(--halo-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--halo-primary)', textTransform: 'uppercase', letterSpacing: '2px' }}>MODERN ARCHITECTURE</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--halo-on-surface)', marginTop: '8px' }}>Protocols & Tools We Work With</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {techStack.map((item, idx) => (
              <div key={idx} style={{ padding: '24px', background: 'var(--halo-bg)', border: '1px solid var(--halo-border)', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--halo-primary)', textTransform: 'uppercase', marginBottom: '8px' }}>{item.name}</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--halo-on-surface)' }}>{item.list}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section style={{ padding: '40px 24px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ padding: '60px 40px', background: 'var(--halo-surface)', border: '1px solid var(--halo-border)', borderRadius: '24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '16px', color: 'var(--halo-on-surface)' }}>Need a Custom Plugin or API Connector?</h2>
          <p style={{ fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto 36px', color: 'var(--halo-muted)' }}>
            Connect with our integration architects to review your technical specs and get a rapid prototype estimate.
          </p>
          <Link to="/consultation/book" className="halo-btn-primary" style={{ padding: '16px 36px', height: 'auto', fontSize: '1rem' }}>
            <span>Schedule Integration Consultation</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
