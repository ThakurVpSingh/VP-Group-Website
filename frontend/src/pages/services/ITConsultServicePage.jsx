import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger } from 'animejs';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import StatTile from '../../components/halo/StatTile';
import HaloCard from '../../components/halo/HaloCard';
import Chip from '../../components/halo/Chip';
import { ArrowRight, Map, TrendingUp, Target, Layers, Clock, CheckCircle, Award, BarChart2 } from 'lucide-react';

const H = { font: "'Inter', sans-serif", mono: "'JetBrains Mono', ui-monospace, monospace" };

const sparkCloud  = [18,22,25,28,31,33,35,37,39,40];
const sparkDeploy = [1.0,1.3,1.6,2.0,2.3,2.7,3.0,3.2,3.4,3.5];
const sparkAccel  = [55,60,65,68,72,75,78,82,86,89];
const sparkROI    = [0.8,1.0,1.2,1.4,1.6,1.8,2.0,2.1,2.2,2.3];

const milestones = [
  { phase:'01', title:'Technology Audit', duration:'Week 1–2', desc:'Complete inventory of your current infrastructure, tech debt, and bottlenecks. Scored severity matrix.', done:true },
  { phase:'02', title:'Strategy Blueprint', duration:'Week 2–3', desc:'Vendor-agnostic transformation roadmap with prioritised initiatives, budgets, and risk mitigation.', done:true },
  { phase:'03', title:'Pilot Deployment', duration:'Week 4–8', desc:'One high-impact initiative launched as a controlled pilot to prove ROI before full commitment.', done:false },
  { phase:'04', title:'Scale & Optimise', duration:'Week 8+', desc:'Full rollout, team training, and continuous optimisation cycles to maintain competitive advantage.', done:false },
];

const domains = [
  { icon:Map,      label:'Cloud Migration',         desc:'AWS / GCP / Azure strategy, FinOps, and zero-downtime migration execution.' },
  { icon:Layers,   label:'System Modernisation',    desc:'Legacy monolith decomposition, microservices migration, and API-first architecture.' },
  { icon:BarChart2,label:'Digital Transformation',  desc:'End-to-end process reengineering — from paper forms to AI-native workflows.' },
  { icon:Target,   label:'Technology Roadmapping',  desc:'3–5 year technology strategy aligned to your business objectives and market position.' },
  { icon:Award,    label:'Vendor Selection',        desc:'Vendor-agnostic analysis and RFP management to select the right tools for your needs.' },
  { icon:Clock,    label:'CTO-as-a-Service',        desc:'Fractional CTO support for startups and scale-ups — strategy without the FTE cost.' },
];

export default function ITConsultServicePage() {
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'IT Consultation | VP Group';
    const iv = setInterval(() => setActivePhase(p => (p + 1) % milestones.length), 2200);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    animate('.itc-stat',   { opacity:[0,1], translateY:[16,0], duration:500, delay:stagger(80), easing:'easeOutQuart' });
    animate('.itc-domain', { opacity:[0,1], translateX:[-12,0], duration:500, delay:stagger(70), easing:'easeOutQuart' });
  }, []);

  return (
    <div className="halo-page" style={{ fontFamily:H.font }}>
      <ProjectNavbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="halo-section" style={{ minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:'100px', position:'relative', overflow:'hidden' }}>
        {/* Diagonal grid background */}
        <div style={{ position:'absolute', inset:0, opacity:0.04, pointerEvents:'none' }}>
          <svg width="100%" height="100%"><defs><pattern id="dg" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><rect width="1" height="60" fill="#F5D547" /></pattern></defs><rect width="100%" height="100%" fill="url(#dg)" /></svg>
        </div>

        <div className="halo-container" style={{ width:'100%', position:'relative', zIndex:1 }}>
          <div className="halo-hero-grid" style={{ alignItems:'start' }}>
            <div>
              <div style={{ marginBottom:'28px' }}>
                <Chip variant="warning"><Map size={11} style={{ marginRight:4 }} />IT CONSULTATION</Chip>
              </div>
              <h1 style={{ fontFamily:H.font, fontSize:'clamp(2.25rem, 5vw, 4rem)', fontWeight:600, letterSpacing:'-0.03em', lineHeight:1.06, color:'#F2F4F8', marginBottom:'20px' }}>
                Strategic Technology<br /><span style={{ color:'#F5D547' }}>Leadership</span>
              </h1>
              <p style={{ fontFamily:H.font, fontSize:'0.9375rem', color:'#9AA0AE', lineHeight:1.55, marginBottom:'40px', maxWidth:'440px' }}>
                We become your technology thinking partner — aligning infrastructure decisions, vendor choices, and digital initiatives to your commercial goals.
              </p>

              {/* Impact KPIs */}
              <div className="halo-grid-2" style={{ gap:'12px', marginBottom:'36px' }}>
                {[{v:'40%',l:'Cloud cost savings'},{v:'3.5x',l:'Deploy velocity'},{v:'89%',l:'Firms accelerated post-2020'},{v:'2.3x',l:'ROI in 3yr transformation'}].map((k,i)=>(
                  <div key={i} style={{ padding:'16px', background:'#14151C', border:'1px solid #2A2D38', borderRadius:'12px' }}>
                    <div style={{ fontFamily:H.mono, fontSize:'1.4rem', fontWeight:600, letterSpacing:'-0.02em', color:'#F5D547', marginBottom:'4px' }}>{k.v}</div>
                    <div style={{ fontFamily:H.font, fontSize:'0.75rem', color:'#5C6170' }}>{k.l}</div>
                  </div>
                ))}
              </div>

              <Link to="/help/contact" className="halo-btn-primary">
                Book a Strategy Session <ArrowRight size={16} />
              </Link>
            </div>

            {/* Roadmap timeline */}
            <HaloCard elevated padding="32px">
              <div className="halo-label" style={{ marginBottom:'28px' }}>Transformation Roadmap</div>
              <div style={{ position:'relative', paddingLeft:'24px' }}>
                {/* Vertical line */}
                <div style={{ position:'absolute', left:'9px', top:'8px', bottom:'8px', width:'2px', background:'#2A2D38', borderRadius:'2px' }} />
                {milestones.map((m,i)=>(
                  <div key={i} style={{ position:'relative', marginBottom:i<milestones.length-1?'28px':'0', cursor:'pointer' }} onClick={()=>setActivePhase(i)}>
                    {/* Phase dot */}
                    <div style={{ position:'absolute', left:'-24px', top:'4px', width:'12px', height:'12px', borderRadius:'50%', background: activePhase===i?'#F5D547':'#1E2029', border:`2px solid ${activePhase===i?'#F5D547':'#3A3D4A'}`, transition:'all 0.25s', boxShadow: activePhase===i?'0 0 10px #F5D54760':'' }} />
                    <div style={{ padding:'16px', background: activePhase===i?'rgba(245,213,71,0.06)':'transparent', borderRadius:'10px', border:`1px solid ${activePhase===i?'rgba(245,213,71,0.2)':'transparent'}`, transition:'all 0.25s' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px' }}>
                        <span style={{ fontFamily:H.mono, fontSize:'0.7rem', fontWeight:600, color: activePhase===i?'#F5D547':'#3A3D4A' }}>{m.phase}</span>
                        <span style={{ fontFamily:H.font, fontWeight:600, fontSize:'0.9375rem', color: activePhase===i?'#F2F4F8':'#9AA0AE' }}>{m.title}</span>
                        <Chip variant="muted">{m.duration}</Chip>
                      </div>
                      {activePhase===i && <p style={{ fontFamily:H.font, fontSize:'0.8125rem', color:'#9AA0AE', lineHeight:1.55, margin:0 }}>{m.desc}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </HaloCard>
          </div>
        </div>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 60% 40%, rgba(245,213,71,0.04) 0%, transparent 55%)', pointerEvents:'none' }} />
      </section>

      {/* ── STAT TILES ───────────────────────────────────────── */}
      <section className="halo-section halo-section-divider">
        <div className="halo-container">
          <div className="halo-label" style={{ marginBottom:'24px' }}>Digital Transformation Impact — Global Research 2024–25</div>
          <div className="halo-grid-4">
            <div className="itc-stat"><StatTile eyebrow="Cloud Cost Savings" metric="40%" description="Average infrastructure reduction post-migration" trend="up" trendLabel="Gartner 2024" accent="warning" sparkData={sparkCloud} /></div>
            <div className="itc-stat"><StatTile eyebrow="Deployment Speed" metric="3.5x" description="Faster releases with modernised stack" trend="up" trendLabel="DevOps Research Report" accent="success" sparkData={sparkDeploy} /></div>
            <div className="itc-stat"><StatTile eyebrow="Firms Accelerated" metric="89%" description="Accelerated digital plans post-pandemic" trend="up" trendLabel="McKinsey Global Survey" accent="primary" sparkData={sparkAccel} /></div>
            <div className="itc-stat"><StatTile eyebrow="Transformation ROI" metric="2.3x" description="Return on digital investment over 3 years" trend="up" trendLabel="BCG Analysis" accent="info" sparkData={sparkROI} /></div>
          </div>
        </div>
      </section>

      {/* ── CONSULTATION DOMAINS ─────────────────────────────── */}
      <section className="halo-section halo-section-divider">
        <div className="halo-container">
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px' }}>
            <div style={{ width:'2px', height:'32px', background:'#F5D547', borderRadius:'2px' }} />
            <div>
              <div className="halo-label" style={{ marginBottom:'4px' }}>Service Domains</div>
              <h2 style={{ fontFamily:H.font, fontSize:'2.25rem', fontWeight:600, letterSpacing:'-0.02em', color:'#F2F4F8', margin:0 }}>Where We Drive Value</h2>
            </div>
          </div>
          <p style={{ fontFamily:H.font, fontSize:'0.9375rem', color:'#9AA0AE', lineHeight:1.55, marginBottom:'48px', maxWidth:'540px' }}>
            Spanning every layer of your technology stack — from strategic planning to hands-on execution.
          </p>
          <div className="halo-grid-3">
            {domains.map((d,i)=>(
              <div key={i} className="itc-domain">
                <HaloCard hoverable accent="warning">
                  <div style={{ width:'36px', height:'36px', borderRadius:'8px', background:'rgba(245,213,71,0.1)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px', paddingTop:'6px' }}>
                    <d.icon size={16} color="#F5D547" />
                  </div>
                  <div style={{ fontFamily:H.font, fontSize:'1.125rem', fontWeight:600, color:'#F2F4F8', marginBottom:'10px' }}>{d.label}</div>
                  <div style={{ fontFamily:H.font, fontSize:'0.8125rem', color:'#9AA0AE', lineHeight:1.55 }}>{d.desc}</div>
                </HaloCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="halo-section" style={{ textAlign:'center', background:'radial-gradient(ellipse at 50% 0%, rgba(245,213,71,0.06) 0%, transparent 55%)' }}>
        <div style={{ maxWidth:'600px', margin:'0 auto' }}>
          <div className="halo-label" style={{ marginBottom:'20px' }}>Your Technology Strategy</div>
          <h2 style={{ fontFamily:H.font, fontSize:'clamp(2rem, 4vw, 3.5rem)', fontWeight:600, letterSpacing:'-0.03em', color:'#F2F4F8', marginBottom:'20px' }}>
            Decisions That <span style={{ color:'#F5D547' }}>Compound.</span>
          </h2>
          <p style={{ fontFamily:H.font, fontSize:'0.9375rem', color:'#9AA0AE', lineHeight:1.55, marginBottom:'36px' }}>
            Right tech choices compound over years. Wrong ones cost millions to unwind. Get expert guidance before you commit.
          </p>
          <Link to="/help/contact" className="halo-btn-primary" style={{ height:'48px', padding:'0 28px', fontSize:'0.9375rem' }}>
            Schedule Free Strategy Call <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
      <style>{`
        @media(max-width:960px){ .halo-grid-4{grid-template-columns:1fr 1fr!important} section>.halo-container>div[style*="grid-template-columns: 1fr 1fr"]{ display:block!important; } }
        @media(max-width:720px){ .halo-grid-4,.halo-grid-3,.halo-grid-2{grid-template-columns:1fr!important} }
      `}</style>
    </div>
  );
}
