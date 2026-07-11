import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger } from 'animejs';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import StatTile from '../../components/halo/StatTile';
import HaloCard from '../../components/halo/HaloCard';
import Chip from '../../components/halo/Chip';
import { ArrowRight, Cpu, Brain, Database, Zap, Bot, Network, GitBranch, TrendingUp } from 'lucide-react';

const H = { font: "'Inter', sans-serif", mono: "'JetBrains Mono', ui-monospace, monospace" };

/* ── Sparklines ─────────────────────────────────────────────── */
const sparkCost   = [100,90,80,70,60,50,40,32,26,25];    // cost % of original (decreasing = good)
const sparkHrs    = [0.5,1,1.5,2.2,3,4,4.8,5.5,6,6.3];  // hrs saved/employee/wk
const sparkMarket = [200,350,500,700,900,1100,1300,1500,1700,1800]; // AI market $B toward 2030
const sparkPerf   = [1,1.2,1.5,1.8,2.2,2.6,3.0,3.2,3.4,3.5]; // outperformance multiplier

const agentLoop = [
  { label:'PERCEIVE', desc:'Agent observes inputs from APIs, databases, and user queries.', accent:'info',    icon:'👁', accentColor:'#3DD7E5' },
  { label:'PLAN',     desc:'Cognitive reasoning loop selects tools and builds the action sequence.', accent:'primary', icon:'🧠', accentColor:'#5B6BFF' },
  { label:'ACT',      desc:'Function calls execute: API reads, DB writes, external webhooks.', accent:'warning', icon:'⚡', accentColor:'#F5D547' },
  { label:'REFLECT',  desc:'Output evaluated, memory updated, feedback loop closes the cycle.', accent:'success', icon:'🔄', accentColor:'#2BE08C' },
];

const useCases = [
  { title:'Customer Support Agent',  desc:'Autonomous 24/7 support that handles tickets, escalations, and FAQ resolution without human intervention.', impact:'80% ticket deflection',  icon:Bot },
  { title:'Document Intelligence',   desc:'RAG pipeline that indexes your knowledge base and gives employees instant, accurate answers from internal docs.', impact:'10x knowledge retrieval', icon:Database },
  { title:'Content Automation',      desc:'LLM pipeline generating product descriptions, social copy, and marketing content at scale — brand-aligned.', impact:'20h/week saved per marketer', icon:Zap },
  { title:'Data Extraction & Sync',  desc:'Agentic workflows monitoring data sources, extracting structured data, and syncing directly to your databases.', impact:'99.9% accuracy',          icon:Network },
  { title:'Sales Intelligence',      desc:'AI agent researches leads, drafts personalised outreach, and logs CRM activity — while your team closes.', impact:'3x qualified conversations', icon:TrendingUp },
  { title:'Code Review Assistant',   desc:'Automated PR reviewer checking security issues, performance bugs, and style violations before human review.', impact:'60% faster review cycle', icon:GitBranch },
];

const techStack = [
  { label:'Orchestration', value:'LangChain, AutoGen, LangGraph',          accent:'primary' },
  { label:'LLM APIs',      value:'Gemini, OpenAI GPT-4, Anthropic Claude', accent:'info' },
  { label:'Vector DBs',    value:'Pinecone, Qdrant, pgvector, Chroma',     accent:'success' },
  { label:'Safety Layer',  value:'Guardrails AI, PII masking, Rate limiting', accent:'warning' },
];

const RAG_NODES = [
  { id:'doc', label:'Docs', x:'12%', y:'30%', r:8, color:'#FF3A5C' },
  { id:'pdf', label:'PDF',  x:'12%', y:'55%', r:8, color:'#FF3A5C' },
  { id:'db',  label:'DB',   x:'12%', y:'80%', r:8, color:'#FF3A5C' },
  { id:'e1',  label:'',     x:'33%', y:'30%', r:6, color:'#5B6BFF' },
  { id:'e2',  label:'',     x:'33%', y:'55%', r:6, color:'#5B6BFF' },
  { id:'e3',  label:'',     x:'33%', y:'80%', r:6, color:'#5B6BFF' },
  { id:'llm', label:'LLM',  x:'56%', y:'42%', r:10,color:'#3DD7E5' },
  { id:'ag',  label:'Agent',x:'56%', y:'72%', r:10,color:'#3DD7E5' },
  { id:'out', label:'Result',x:'80%',y:'57%', r:12,color:'#2BE08C' },
];

const ACCENTMAP = { primary:'#5B6BFF', success:'#2BE08C', warning:'#F5D547', info:'#3DD7E5', error:'#FF3A5C' };

export default function AIAutomationServicePage() {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'AI Automation | VP Group';
    const iv = setInterval(() => setActiveNode(n => (n + 1) % agentLoop.length), 2200);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    animate('.ai-node', {
      scale:[0.85, 1.15, 0.85],
      opacity:[0.6, 1, 0.6],
      duration:2000, loop:true, delay:stagger(350), easing:'easeInOutSine'
    });
    animate('.ai-stat', { opacity:[0,1], translateY:[16,0], duration:500, delay:stagger(80), easing:'easeOutQuart' });
    animate('.ai-case', { opacity:[0,1], translateY:[16,0], duration:500, delay:stagger(70), easing:'easeOutQuart' });
  }, []);

  return (
    <div className="halo-page" style={{ fontFamily:H.font }}>
      <ProjectNavbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="halo-section" style={{ minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:'100px', position:'relative', overflow:'hidden' }}>
        {/* Neural dot grid */}
        <div style={{ position:'absolute', inset:0, opacity:0.05, pointerEvents:'none' }}>
          <svg width="100%" height="100%"><defs><pattern id="ndot" width="36" height="36" patternUnits="userSpaceOnUse"><circle cx="18" cy="18" r="1.2" fill="#5B6BFF" /></pattern></defs><rect width="100%" height="100%" fill="url(#ndot)" /></svg>
        </div>

        <div className="halo-container" style={{ width:'100%', position:'relative', zIndex:1 }}>
          <div className="halo-hero-grid">
            <div>
              <div style={{ marginBottom:'28px' }}>
                <Chip variant="default"><Cpu size={11} style={{ marginRight:4 }} />AI AUTOMATION</Chip>
              </div>
              <h1 style={{ fontFamily:H.font, fontSize:'clamp(2.25rem, 5vw, 4rem)', fontWeight:600, letterSpacing:'-0.03em', lineHeight:1.06, color:'#F2F4F8', marginBottom:'20px' }}>
                Autonomous Agents.<br /><span style={{ color:'#5B6BFF' }}>Infinite Scale.</span>
              </h1>
              <p style={{ fontFamily:H.font, fontSize:'0.9375rem', color:'#9AA0AE', lineHeight:1.55, marginBottom:'40px', maxWidth:'440px' }}>
                We design and deploy autonomous AI agents, RAG knowledge pipelines, and custom LLM integrations that automate complex workflows — 24/7, without human bottlenecks.
              </p>

              {/* Agent uptime badge */}
              <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'10px 16px', background:'rgba(91,107,255,0.08)', border:'1px solid rgba(91,107,255,0.2)', borderRadius:'12px', marginBottom:'36px' }}>
                <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#2BE08C', boxShadow:'0 0 8px #2BE08C', animation:'ai-pulse 1.5s ease-in-out infinite' }} />
                <span style={{ fontFamily:H.mono, fontSize:'0.8125rem', color:'#9AA0AE' }}>Agent runtime: <span style={{ color:'#2BE08C' }}>24/7 autonomous</span></span>
              </div>

              <div style={{ display:'flex', gap:'12px' }}>
                <Link to="/help/contact" className="halo-btn-primary">Deploy Your AI Agent <ArrowRight size={16} /></Link>
              </div>
            </div>

            {/* Agent Loop */}
            <div>
              <HaloCard elevated>
                <div className="halo-label" style={{ marginBottom:'20px' }}>AUTONOMOUS AGENT LOOP</div>
                <div className="halo-grid-2" style={{ gap:'12px' }}>
                  {agentLoop.map((node,i)=>(
                    <div key={i}
                      style={{ padding:'18px', background:activeNode===i?`${node.accentColor}0E`:'transparent', border:`1px solid ${activeNode===i?node.accentColor+'40':'#2A2D38'}`, borderRadius:'12px', cursor:'pointer', transition:'all 0.3s', position:'relative', overflow:'hidden' }}
                      onClick={()=>setActiveNode(i)}>
                      {activeNode===i && <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:node.accentColor, borderRadius:'12px 12px 0 0' }} />}
                      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'8px' }}>
                        <span style={{ fontSize:'1.2rem' }}>{node.icon}</span>
                        <span style={{ fontFamily:H.mono, fontSize:'0.7rem', fontWeight:600, color:activeNode===i?node.accentColor:'#5C6170', letterSpacing:'0.08em' }}>{node.label}</span>
                      </div>
                      <p style={{ fontFamily:H.font, fontSize:'0.8125rem', color:'#5C6170', lineHeight:1.5, margin:0 }}>{node.desc}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display:'flex', justifyContent:'center', marginTop:'20px' }}>
                  <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'rgba(91,107,255,0.15)', border:'1px solid rgba(91,107,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem' }}>🤖</div>
                </div>
              </HaloCard>
            </div>
          </div>
        </div>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 40% 50%, rgba(91,107,255,0.06) 0%, transparent 55%)', pointerEvents:'none' }} />
      </section>

      {/* ── STAT TILES ───────────────────────────────────────── */}
      <section className="halo-section halo-section-divider">
        <div className="halo-container">
          <div className="halo-label" style={{ marginBottom:'24px' }}>AI Automation Market Impact — Global Research 2024–30</div>
          <div className="halo-grid-4">
            <div className="ai-stat"><StatTile eyebrow="Avg Cost Reduction" metric="75%" description="In manual operational tasks post-AI" trend="up" trendLabel="McKinsey 2024" accent="success" sparkData={sparkCost} /></div>
            <div className="ai-stat"><StatTile eyebrow="Time Saved Per Employee" metric="6.3hrs" description="Per week with AI workflow tools" trend="up" trendLabel="Microsoft Work Trend" accent="primary" sparkData={sparkHrs} /></div>
            <div className="ai-stat"><StatTile eyebrow="AI Market by 2030" metric="$1.8T" description="Global artificial intelligence market size" trend="up" trendLabel="Grand View Research" accent="info" sparkData={sparkMarket} /></div>
            <div className="ai-stat"><StatTile eyebrow="Competitive Advantage" metric="3.5x" description="More likely to outperform with AI" trend="up" trendLabel="BCG AI Leaders Study" accent="warning" sparkData={sparkPerf} /></div>
          </div>
        </div>
      </section>

      {/* ── RAG PIPELINE + TECH STACK ────────────────────────── */}
      <section className="halo-section halo-section-divider">
        <div className="halo-container">
          <div className="halo-hero-grid" style={{ alignItems:'start' }}>
            {/* RAG SVG */}
            <HaloCard elevated>
              <div className="halo-label" style={{ marginBottom:'20px' }}>RAG PIPELINE ARCHITECTURE</div>
              <svg viewBox="0 0 100 100" style={{ width:'100%', height:'280px' }}>
                {/* Edges */}
                {[['12%','30%','33%','30%'],['12%','55%','33%','55%'],['12%','80%','33%','80%'],
                  ['33%','30%','56%','42%'],['33%','55%','56%','57%'],['33%','80%','56%','72%'],
                  ['56%','42%','80%','57%'],['56%','72%','80%','57%']].map(([x1,y1,x2,y2],i)=>(
                  <line key={i} className="ai-node" x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#2A2D38" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.6" />
                ))}
                {RAG_NODES.map((n,i)=>(
                  <g key={i} className="ai-node">
                    <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} opacity="0.85" />
                    <circle cx={n.x} cy={n.y} r={n.r+4} fill="none" stroke={n.color} strokeWidth="0.5" opacity="0.25" />
                    {n.label && <text x={n.x} y={`calc(${n.y} + 12px)`} textAnchor="middle" fill="#5C6170" fontSize="4" fontFamily="sans-serif">{n.label}</text>}
                  </g>
                ))}
                {[{x:'12%',y:'14%',l:'SOURCES'},{x:'33%',y:'14%',l:'EMBED'},{x:'56%',y:'14%',l:'REASON'},{x:'80%',y:'14%',l:'OUTPUT'}].map((lbl,i)=>(
                  <text key={i} x={lbl.x} y={lbl.y} textAnchor="middle" fill="#3A3D4A" fontSize="3.5" fontWeight="600" fontFamily="sans-serif">{lbl.l}</text>
                ))}
              </svg>
            </HaloCard>

            {/* Tech stack */}
            <div>
              <div className="halo-label" style={{ marginBottom:'16px' }}>Enterprise AI Stack</div>
              <h2 style={{ fontFamily:H.font, fontSize:'2.25rem', fontWeight:600, letterSpacing:'-0.02em', color:'#F2F4F8', marginBottom:'32px' }}>Infrastructure We Build On</h2>
              {techStack.map((item,i)=>(
                <div key={i} style={{ padding:'20px', background:'#14151C', border:'1px solid #2A2D38', borderRadius:'12px', marginBottom:'10px', transition:'all 0.2s', cursor:'default' }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor=ACCENTMAP[item.accent]+'40'; e.currentTarget.style.background=`${ACCENTMAP[item.accent]}06`; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor='#2A2D38'; e.currentTarget.style.background='#14151C'; }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'6px' }}>
                    <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:ACCENTMAP[item.accent], flexShrink:0 }} />
                    <span className="halo-label" style={{ color:ACCENTMAP[item.accent] }}>{item.label}</span>
                  </div>
                  <span style={{ fontFamily:H.font, fontSize:'0.9375rem', color:'#F2F4F8', paddingLeft:'18px' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── USE CASES ────────────────────────────────────────── */}
      <section className="halo-section halo-section-divider">
        <div className="halo-container">
          <div style={{ textAlign:'center', marginBottom:'56px' }}>
            <div className="halo-label" style={{ marginBottom:'12px' }}>AI Systems We Deploy</div>
            <h2 style={{ fontFamily:H.font, fontSize:'2.25rem', fontWeight:600, letterSpacing:'-0.02em', color:'#F2F4F8', margin:0 }}>Agents That Transform Operations</h2>
          </div>
          <div className="halo-grid-3">
            {useCases.map((uc,i)=>(
              <div key={i} className="ai-case">
                <HaloCard hoverable accent="primary">
                  <div style={{ width:'36px', height:'36px', borderRadius:'8px', background:'rgba(91,107,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px', paddingTop:'6px' }}>
                    <uc.icon size={16} color="#5B6BFF" />
                  </div>
                  <div style={{ fontFamily:H.font, fontSize:'1.125rem', fontWeight:600, color:'#F2F4F8', marginBottom:'10px', letterSpacing:'-0.01em' }}>{uc.title}</div>
                  <div style={{ fontFamily:H.font, fontSize:'0.8125rem', color:'#9AA0AE', lineHeight:1.55, marginBottom:'16px' }}>{uc.desc}</div>
                  <Chip variant="success"><Zap size={10} style={{ marginRight:3 }} />{uc.impact}</Chip>
                </HaloCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="halo-section" style={{ textAlign:'center', background:'radial-gradient(ellipse at 50% 0%, rgba(91,107,255,0.07) 0%, transparent 55%)' }}>
        <div style={{ maxWidth:'600px', margin:'0 auto' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'16px' }}>🤖</div>
          <div className="halo-label" style={{ marginBottom:'20px' }}>AI Deployment</div>
          <h2 style={{ fontFamily:H.font, fontSize:'clamp(2rem, 4vw, 3.5rem)', fontWeight:600, letterSpacing:'-0.03em', color:'#F2F4F8', marginBottom:'20px' }}>
            Automate What Humans <span style={{ color:'#5B6BFF' }}>Shouldn't.</span>
          </h2>
          <p style={{ fontFamily:H.font, fontSize:'0.9375rem', color:'#9AA0AE', lineHeight:1.55, marginBottom:'36px' }}>
            Our AI architects audit your workflows and deploy agents that work around the clock — eliminating bottlenecks and 10x-ing operational throughput.
          </p>
          <Link to="/help/contact" className="halo-btn-primary" style={{ height:'48px', padding:'0 28px', fontSize:'0.9375rem' }}>
            Deploy Your First AI Agent <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
      <style>{`
        @keyframes ai-pulse { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.3)} }
        @media(max-width:960px){ .halo-grid-4{grid-template-columns:1fr 1fr!important} section>.halo-container>div[style*="grid-template-columns: 1fr 1fr"]{ display:block!important; } }
        @media(max-width:720px){ .halo-grid-4,.halo-grid-3,.halo-grid-2{grid-template-columns:1fr!important} }
      `}</style>
    </div>
  );
}
