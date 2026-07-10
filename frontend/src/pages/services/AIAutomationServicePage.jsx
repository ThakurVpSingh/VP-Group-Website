import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger } from 'animejs';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import { ArrowRight, Cpu, Brain, Database, Zap, Bot, Network, GitBranch, Layers, TrendingUp } from 'lucide-react';

const ACCENT = '#22d3ee';
const ACCENT2 = '#a855f7';
const ACCENT3 = '#ec4899';

const agentLoop = [
  { id: 'perceive', label: 'PERCEIVE', desc: 'Agent observes inputs from APIs, databases, and user queries', color: ACCENT, icon: '👁' },
  { id: 'plan', label: 'PLAN', desc: 'Cognitive reasoning loop selects tools and builds action sequence', color: ACCENT2, icon: '🧠' },
  { id: 'act', label: 'ACT', desc: 'Function calls execute: APIs, DB writes, external webhooks', color: '#f59e0b', icon: '⚡' },
  { id: 'reflect', label: 'REFLECT', desc: 'Output evaluated, memory updated, feedback loop closes', color: '#10b981', icon: '🔄' },
];

const useCases = [
  { title: 'Customer Support Agent', desc: 'Autonomous 24/7 support agent that handles tickets, escalations, and FAQ resolution without human intervention.', impact: '80% ticket deflection', icon: Bot },
  { title: 'Document Intelligence', desc: 'RAG pipeline that indexes your internal knowledge base and gives employees instant, accurate answers from company documents.', impact: '10x faster knowledge retrieval', icon: Database },
  { title: 'Content Automation', desc: 'LLM pipeline that generates product descriptions, social posts, and marketing copy at scale — reviewed, consistent, brand-aligned.', impact: '20h/week saved per marketer', icon: Zap },
  { title: 'Data Extraction & Sync', desc: 'Agentic workflows that monitor external data sources, extract structured data, and sync directly to your internal databases.', impact: '99.9% accuracy on structured data', icon: Network },
  { title: 'Sales Intelligence', desc: 'AI agent that researches leads, drafts personalized outreach, and logs activity to CRM — while your team focuses on closing.', impact: '3x more qualified conversations', icon: TrendingUp },
  { title: 'Code Review Assistant', desc: 'Automated PR reviewer that checks for security issues, performance bugs, and style violations before human review begins.', impact: '60% reduction in review time', icon: GitBranch },
];

const techStack = [
  { label: 'Orchestration', value: 'LangChain, AutoGen, LangGraph', color: ACCENT },
  { label: 'LLM APIs', value: 'Gemini, OpenAI GPT-4, Anthropic Claude', color: ACCENT2 },
  { label: 'Vector DBs', value: 'Pinecone, Qdrant, pgvector, Chroma', color: ACCENT3 },
  { label: 'Safety Layer', value: 'Guardrails AI, PII masking, Rate limiting', color: '#f59e0b' },
];

const globalStats = [
  { v: '75%', l: 'Avg Cost Reduction', sub: 'in manual operational tasks' },
  { v: '24/7', l: 'Agent Uptime', sub: 'autonomous execution' },
  { v: '10x', l: 'Workflow Scale', sub: 'vs. manual processing' },
  { v: '6wk', l: 'Time to Deploy', sub: 'from audit to live agent' },
];

export default function AIAutomationServicePage() {
  const [activeNode, setActiveNode] = useState(0);
  const neuralRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'AI Automation | VP Group';

    const interval = setInterval(() => setActiveNode(n => (n + 1) % agentLoop.length), 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Neural pulse animation on dots
    animate('.ai-neural-dot', {
      scale: [0.8, 1.4, 0.8],
      opacity: [0.5, 1, 0.5],
      duration: 2000,
      loop: true,
      delay: stagger(300),
      easing: 'easeInOutSine'
    });
    // Edge connection pulses
    animate('.ai-edge-line', {
      strokeDashoffset: [300, 0],
      duration: 2000,
      loop: true,
      delay: stagger(400),
      easing: 'linear'
    });
    animate('.ai-usecase-card', {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 500,
      delay: stagger(80),
      easing: 'easeOutQuart'
    });
  }, []);

  return (
    <div style={{ background: '#00080f', minHeight: '100vh', fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#fff' }}>
      <ProjectNavbar />

      {/* HERO: Neural Lab */}
      <section style={{ minHeight: '100vh', padding: 'clamp(100px, 10vw, 140px) 5% clamp(60px, 8vw, 100px)', position: 'relative', overflow: 'hidden' }}>
        {/* Animated neural background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <svg width="100%" height="100%" style={{ opacity: 0.07 }}>
            <defs><pattern id="neural-grid" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill={ACCENT} /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#neural-grid)" />
          </svg>
        </div>

        <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: `${ACCENT}15`, border: `1px solid ${ACCENT}30`, borderRadius: '100px', padding: '6px 16px', marginBottom: '40px' }}>
            <Cpu size={14} color={ACCENT} />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '3px', textTransform: 'uppercase' }}>AI Automation</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 950, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: '28px' }}>
                <span style={{ display: 'block', color: '#fff' }}>Autonomous Agents.</span>
                <span style={{ display: 'block', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Infinite Scale.</span>
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.8, marginBottom: '40px' }}>
                We design and deploy autonomous AI agents, RAG knowledge pipelines, and custom LLM integrations that automate complex workflows — 24/7, without human bottlenecks.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/help/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, color: '#fff', padding: '16px 32px', borderRadius: '14px', fontWeight: 800, textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  Deploy Your AI Agent <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Agent Loop Diagram */}
            <div style={{ background: '#000d1a', border: `1px solid ${ACCENT}20`, borderRadius: '24px', padding: '36px', position: 'relative' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '3px', marginBottom: '28px' }}>AUTONOMOUS AGENT LOOP</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {agentLoop.map((node, i) => (
                  <div key={i} style={{ padding: '20px', background: activeNode === i ? `${node.color}12` : 'rgba(255,255,255,0.02)', border: `1px solid ${activeNode === i ? node.color + '50' : 'rgba(255,255,255,0.06)'}`, borderRadius: '16px', transition: 'all 0.4s ease', cursor: 'default' }}
                    onClick={() => setActiveNode(i)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <div style={{ fontSize: '1.5rem' }}>{node.icon}</div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px' }}>{node.label}</span>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>{node.desc}</p>
                    {activeNode === i && <div style={{ height: '2px', background: `linear-gradient(90deg, ${node.color}, transparent)`, borderRadius: '4px', marginTop: '12px' }} />}
                  </div>
                ))}
              </div>
              {/* Center flow indicator */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '40px', height: '40px', borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}40, ${ACCENT2}20)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', zIndex: 2, boxShadow: `0 0 20px ${ACCENT}40` }}>
                🤖
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL STATS */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 5%', background: `linear-gradient(135deg, ${ACCENT}06 0%, ${ACCENT2}04 100%)`, borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
          {globalStats.map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 950, letterSpacing: '-2px', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>{s.v}</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>{s.l}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* NEURAL ARCHITECTURE VISUAL + TECH STACK */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) 5%' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            {/* Neural network SVG */}
            <div style={{ background: '#000d1a', border: `1px solid ${ACCENT}15`, borderRadius: '24px', padding: '40px' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '3px', marginBottom: '24px' }}>RAG PIPELINE ARCHITECTURE</div>
              <svg viewBox="0 0 200 160" style={{ width: '100%', height: '320px' }}>
                {/* Edges */}
                {[[30,40,80,40],[30,80,80,80],[30,120,80,120],[80,40,130,60],[80,80,130,100],[80,120,130,60],[80,120,130,100],[130,60,170,80],[130,100,170,80]].map(([x1,y1,x2,y2], i) => (
                  <line key={i} className="ai-edge-line" x1={x1} y1={y1} x2={x2} y2={y2} stroke={ACCENT} strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="4,4" strokeDashoffset="300" />
                ))}
                {/* Input nodes */}
                {[[30,40,'Doc'],[30,80,'PDF'],[30,120,'DB']].map(([cx,cy,label], i) => (
                  <g key={i}><circle cx={cx} cy={cy} r="10" fill={ACCENT3} opacity="0.8" className="ai-neural-dot" /><text x={cx} y={cy+20} textAnchor="middle" fill="#64748b" fontSize="6">{label}</text></g>
                ))}
                {/* Hidden layer (vector embed) */}
                {[[80,40],[80,80],[80,120]].map(([cx,cy], i) => (
                  <g key={i}><circle cx={cx} cy={cy} r="8" fill={ACCENT2} opacity="0.8" className="ai-neural-dot" /></g>
                ))}
                {/* Middle nodes */}
                {[[130,60,'LLM'],[130,100,'Agent']].map(([cx,cy,label], i) => (
                  <g key={i}><circle cx={cx} cy={cy} r="12" fill={ACCENT} opacity="0.9" className="ai-neural-dot" /><text x={cx} y={cy+20} textAnchor="middle" fill="#64748b" fontSize="6">{label}</text></g>
                ))}
                {/* Output */}
                <circle cx="170" cy="80" r="14" fill="#10b981" opacity="0.9" className="ai-neural-dot" />
                <text x="170" y="100" textAnchor="middle" fill="#64748b" fontSize="6">Output</text>

                {/* Labels */}
                <text x="30" y="15" textAnchor="middle" fill="#334155" fontSize="5" fontWeight="bold">SOURCES</text>
                <text x="80" y="15" textAnchor="middle" fill="#334155" fontSize="5" fontWeight="bold">EMBED</text>
                <text x="130" y="15" textAnchor="middle" fill="#334155" fontSize="5" fontWeight="bold">REASON</text>
                <text x="170" y="15" textAnchor="middle" fill="#334155" fontSize="5" fontWeight="bold">RESULT</text>
              </svg>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>Technical Stack</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 950, letterSpacing: '-1.5px', color: '#fff', marginBottom: '36px' }}>Enterprise AI Infrastructure We Build On</h2>
              {techStack.map((item, i) => (
                <div key={i} style={{ padding: '20px 24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '14px', marginBottom: '12px', transition: 'all 0.3s ease', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = item.color + '40'; e.currentTarget.style.background = `${item.color}06`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: item.color, letterSpacing: '2px', textTransform: 'uppercase' }}>{item.label}</span>
                  </div>
                  <span style={{ fontSize: '0.95rem', color: '#cbd5e1', paddingLeft: '20px' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) 5%', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>What We Build</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 950, letterSpacing: '-2px', color: '#fff', margin: 0 }}>AI Systems That Transform Operations</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '24px' }}>
            {useCases.map((uc, i) => (
              <div key={i} className="ai-usecase-card" style={{ padding: '36px', background: `${ACCENT}03`, border: `1px solid ${ACCENT}12`, borderRadius: '24px', position: 'relative', overflow: 'hidden', transition: 'all 0.4s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT + '40'; e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = `0 20px 40px ${ACCENT}08`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${ACCENT}12`; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${ACCENT}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <uc.icon size={24} color={ACCENT} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>{uc.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '20px' }}>{uc.desc}</p>
                <div style={{ padding: '8px 14px', background: `${ACCENT}10`, border: `1px solid ${ACCENT}20`, borderRadius: '100px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Zap size={12} color={ACCENT} />
                  <span style={{ fontSize: '0.75rem', color: ACCENT, fontWeight: 700 }}>{uc.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(100px, 12vw, 180px) 5%', textAlign: 'center', background: `radial-gradient(ellipse at 50% 0%, ${ACCENT}12 0%, transparent 60%)` }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🤖</div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 950, letterSpacing: '-2.5px', color: '#fff', marginBottom: '24px' }}>
            Automate What Humans <span style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Shouldn't.</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '48px', lineHeight: 1.8 }}>
            Let our AI architects audit your workflows and deploy agents that work around the clock — eliminating bottlenecks and 10x-ing your operational throughput.
          </p>
          <Link to="/help/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, color: '#fff', padding: '20px 48px', borderRadius: '16px', fontWeight: 800, textDecoration: 'none', fontSize: '1rem', letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.3s ease' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 20px 60px ${ACCENT}40`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            Deploy Your First AI Agent <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
      <style>{`
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          section > div[style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
