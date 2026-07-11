import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger } from 'animejs';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import StatTile from '../../components/halo/StatTile';
import HaloCard from '../../components/halo/HaloCard';
import Chip from '../../components/halo/Chip';
import { ArrowRight, Pen, Layers, Eye, MousePointer, Smartphone, Monitor, Zap, Users } from 'lucide-react';

const H = { font: "'Inter', sans-serif", mono: "'JetBrains Mono', ui-monospace, monospace" };

const sparkROI     = [20,35,55,80,120,180,260,380,540,9900];  // $1 → $100 ROI
const sparkConv    = [80,100,120,140,160,175,185,195,200,200]; // 200% conversion lift
const sparkReturn  = [40,50,55,62,68,74,79,84,87,88]; // 88% won't return
const sparkMobile  = [42,45,48,51,54,56,58,59,60,60];  // mobile traffic %

const principles = [
  { num:'01', icon:Eye,         title:'Research First',       desc:'User interviews, competitor audits, and heatmap analysis before a single wireframe is drawn.' },
  { num:'02', icon:Layers,      title:'Information Architecture', desc:'Content hierarchy, navigation flows, and user journey maps that feel intuitive — not designed.' },
  { num:'03', icon:Pen,         title:'High-Fidelity Design', desc:'Pixel-perfect Figma prototypes with interactive states, micro-animations, and design tokens.' },
  { num:'04', icon:MousePointer,'title':'Usability Testing',  desc:'5-user prototype tests to validate assumptions and eliminate friction before development starts.' },
];

const deliverables = [
  { label:'Design System',   desc:'Reusable component library, token set, and Figma documentation for consistent scale' },
  { label:'UX Research Pack', desc:'User personas, journey maps, pain-point analysis, and opportunity matrix' },
  { label:'Interactive Prototype', desc:'High-fidelity clickable prototype for stakeholder sign-off and dev handoff' },
  { label:'Accessibility Audit', desc:'WCAG 2.1 AA compliance check and remediation guide' },
];

const wireBlocks = [
  { x:'5%', y:'8%', w:'40%', h:'18%', color:'#5B6BFF', label:'Hero' },
  { x:'50%', y:'8%', w:'45%', h:'18%', color:'#3A3D4A', label:'Nav' },
  { x:'5%', y:'32%', w:'28%', h:'28%', color:'#2A2D38', label:'Card' },
  { x:'38%', y:'32%', w:'28%', h:'28%', color:'#2A2D38', label:'Card' },
  { x:'71%', y:'32%', w:'24%', h:'28%', color:'#2A2D38', label:'Card' },
  { x:'5%', y:'66%', w:'90%', h:'14%', color:'#1E2029', label:'Footer' },
];

export default function CustomUIUXServicePage() {
  const canvasRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 50, y: 50 });
  const [activeBlock, setActiveBlock] = useState(null);
  const [activeTab, setActiveTab] = useState('research');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Custom UI/UX Design | VP Group';
  }, []);

  useEffect(() => {
    animate('.uiux-stat',  { opacity:[0,1], translateY:[16,0], duration:500, delay:stagger(80),  easing:'easeOutQuart' });
    animate('.uiux-prin',  { opacity:[0,1], translateY:[16,0], duration:500, delay:stagger(90),  easing:'easeOutQuart' });
    animate('.uiux-deliv', { opacity:[0,1], translateX:[-12,0], duration:500, delay:stagger(80), easing:'easeOutQuart' });
  }, []);

  const handleCanvasMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setCursor({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const tabs = [
    { id:'research',   label:'Research' },
    { id:'wireframe',  label:'Wireframe' },
    { id:'prototype',  label:'Prototype' },
    { id:'handoff',    label:'Dev Handoff' },
  ];

  return (
    <div className="halo-page" style={{ fontFamily:H.font }}>
      <ProjectNavbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="halo-section" style={{ minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:'100px', position:'relative', overflow:'hidden' }}>
        <div className="halo-container" style={{ width:'100%', position:'relative', zIndex:1 }}>
          <div className="halo-hero-grid">
            <div>
              <div style={{ marginBottom:'28px' }}>
                <Chip variant="error"><Pen size={11} style={{ marginRight:4 }} />UI/UX DESIGN</Chip>
              </div>
              <h1 style={{ fontFamily:H.font, fontSize:'clamp(2.25rem, 5vw, 4rem)', fontWeight:600, letterSpacing:'-0.03em', lineHeight:1.06, color:'#F2F4F8', marginBottom:'20px' }}>
                Interfaces People<br /><span style={{ color:'#FF3A5C' }}>Fall in Love With</span>
              </h1>
              <p style={{ fontFamily:H.font, fontSize:'0.9375rem', color:'#9AA0AE', lineHeight:1.55, marginBottom:'40px', maxWidth:'440px' }}>
                Research-driven, pixel-perfect design systems that transform how users feel about your product — and convert that feeling into measurable revenue.
              </p>

              {/* Process tabs */}
              <div className="halo-tabs" style={{ marginBottom:'36px' }}>
                {tabs.map(t=>(
                  <button key={t.id} className={`halo-tab${activeTab===t.id?' active':''}`} onClick={()=>setActiveTab(t.id)}>{t.label}</button>
                ))}
              </div>

              <div style={{ padding:'18px', background:'#14151C', border:'1px solid #2A2D38', borderRadius:'12px', minHeight:'80px', marginBottom:'32px' }}>
                {activeTab==='research'  && <p style={{ fontFamily:H.font, fontSize:'0.875rem', color:'#9AA0AE', margin:0, lineHeight:1.55 }}>User interviews, heatmaps, A/B test analysis, and competitor benchmarking to uncover real pain points before design begins.</p>}
                {activeTab==='wireframe' && <p style={{ fontFamily:H.font, fontSize:'0.875rem', color:'#9AA0AE', margin:0, lineHeight:1.55 }}>Low-to-mid fidelity wireframes mapping information architecture, user flows, and interaction patterns across all key screens.</p>}
                {activeTab==='prototype' && <p style={{ fontFamily:H.font, fontSize:'0.875rem', color:'#9AA0AE', margin:0, lineHeight:1.55 }}>Interactive Figma prototypes with real micro-animations, hover states, and transitions — ready for usability testing sessions.</p>}
                {activeTab==='handoff'   && <p style={{ fontFamily:H.font, fontSize:'0.875rem', color:'#9AA0AE', margin:0, lineHeight:1.55 }}>Annotated Figma with component properties, design tokens, accessibility specs, and developer-ready asset exports.</p>}
              </div>

              <Link to="/help/contact" className="halo-btn-primary">
                Start Your Design Sprint <ArrowRight size={16} />
              </Link>
            </div>

            {/* Interactive wireframe canvas */}
            <div ref={canvasRef} onMouseMove={handleCanvasMove}
              style={{ background:'#14151C', border:'1px solid #2A2D38', borderRadius:'16px', padding:'24px', position:'relative', overflow:'hidden', cursor:'none', height:'420px', boxShadow:'0 24px 60px rgba(0,0,0,0.55)' }}>
              <div className="halo-label" style={{ marginBottom:'16px' }}>// INTERACTIVE WIREFRAME CANVAS</div>
              {/* Custom cursor glow */}
              <div style={{ position:'absolute', width:'60px', height:'60px', borderRadius:'50%', background:`radial-gradient(circle, rgba(255,58,92,0.15) 0%, transparent 70%)`, left:`${cursor.x}%`, top:`${cursor.y}%`, transform:'translate(-50%,-50%)', transition:'left 0.05s, top 0.05s', pointerEvents:'none', zIndex:10 }} />
              <div style={{ position:'absolute', width:'8px', height:'8px', borderRadius:'50%', background:'#FF3A5C', left:`${cursor.x}%`, top:`${cursor.y}%`, transform:'translate(-50%,-50%)', transition:'left 0.05s, top 0.05s', pointerEvents:'none', zIndex:11 }} />
              {/* Wireframe blocks */}
              <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
                {wireBlocks.map((b,i)=>(
                  <g key={i} style={{ cursor:'pointer' }}
                    onMouseEnter={()=>setActiveBlock(i)}
                    onMouseLeave={()=>setActiveBlock(null)}>
                    <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="6" ry="6"
                      fill={activeBlock===i?'rgba(255,58,92,0.15)':b.color}
                      stroke={activeBlock===i?'#FF3A5C':'#3A3D4A'}
                      strokeWidth={activeBlock===i?'1.5':'1'}
                      style={{ transition:'all 0.15s' }}
                    />
                    <text x={`calc(${b.x} + ${parseFloat(b.w)/2}%)`} y="50%" dominantBaseline="middle" textAnchor="middle"
                      fill={activeBlock===i?'#FF3A5C':'#5C6170'} fontSize="8" fontFamily="sans-serif"
                      style={{ pointerEvents:'none' }}>
                    </text>
                  </g>
                ))}
              </svg>
              <div style={{ position:'absolute', bottom:'16px', left:'50%', transform:'translateX(-50%)' }}>
                <Chip variant="error"><MousePointer size={10} style={{ marginRight:3 }} />Move cursor to interact</Chip>
              </div>
            </div>
          </div>
        </div>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 65% 40%, rgba(255,58,92,0.04) 0%, transparent 55%)', pointerEvents:'none' }} />
      </section>

      {/* ── STAT TILES ───────────────────────────────────────── */}
      <section className="halo-section halo-section-divider">
        <div className="halo-container">
          <div className="halo-label" style={{ marginBottom:'24px' }}>UX Industry Research — Why Design ROI Matters</div>
          <div className="halo-grid-4">
            <div className="uiux-stat"><StatTile eyebrow="UX Return on Investment" metric="9,900%" description="Every $1 in UX returns $100 in value" trend="up" trendLabel="Forrester Research" accent="error" sparkData={sparkROI} /></div>
            <div className="uiux-stat"><StatTile eyebrow="Conversion Increase" metric="+200%" description="Better UX drives higher conversion rate" trend="up" trendLabel="vs poor UX baseline" accent="success" sparkData={sparkConv} /></div>
            <div className="uiux-stat"><StatTile eyebrow="User Retention Risk" metric="88%" description="Won't return after a bad experience" trend="down" trendLabel="One strike rule" accent="warning" sparkData={sparkReturn} /></div>
            <div className="uiux-stat"><StatTile eyebrow="Mobile Traffic" metric="60%" description="Of all web sessions are on mobile" trend="up" trendLabel="Mobile-first mandate" accent="primary" sparkData={sparkMobile} /></div>
          </div>
        </div>
      </section>

      {/* ── DESIGN PRINCIPLES ────────────────────────────────── */}
      <section className="halo-section halo-section-divider">
        <div className="halo-container">
          <div style={{ textAlign:'center', marginBottom:'56px' }}>
            <div className="halo-label" style={{ marginBottom:'12px' }}>Design Philosophy</div>
            <h2 style={{ fontFamily:H.font, fontSize:'2.25rem', fontWeight:600, letterSpacing:'-0.02em', color:'#F2F4F8', margin:0 }}>Research → Architecture → Pixels → Ship</h2>
          </div>
          <div className="halo-grid-4">
            {principles.map((p,i)=>(
              <div key={i} className="uiux-prin">
                <HaloCard hoverable accent="error">
                  <div style={{ fontFamily:H.mono, fontSize:'0.7rem', fontWeight:600, color:'#2A2D38', marginBottom:'16px', paddingTop:'6px' }}>{p.num}</div>
                  <div style={{ width:'36px', height:'36px', borderRadius:'8px', background:'rgba(255,58,92,0.1)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'14px' }}>
                    <p.icon size={16} color="#FF3A5C" />
                  </div>
                  <div style={{ fontFamily:H.font, fontSize:'1.125rem', fontWeight:600, color:'#F2F4F8', marginBottom:'10px' }}>{p.title}</div>
                  <div style={{ fontFamily:H.font, fontSize:'0.8125rem', color:'#9AA0AE', lineHeight:1.55 }}>{p.desc}</div>
                </HaloCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES ─────────────────────────────────────── */}
      <section className="halo-section halo-section-divider">
        <div className="halo-container">
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'48px' }}>
            <div style={{ width:'2px', height:'32px', background:'#FF3A5C', borderRadius:'2px' }} />
            <div>
              <div className="halo-label" style={{ marginBottom:'4px' }}>What You Get</div>
              <h2 style={{ fontFamily:H.font, fontSize:'2.25rem', fontWeight:600, letterSpacing:'-0.02em', color:'#F2F4F8', margin:0 }}>Design Deliverables</h2>
            </div>
          </div>
          <div className="halo-grid-2">
            {deliverables.map((d,i)=>(
              <div key={i} className="uiux-deliv">
                <HaloCard hoverable>
                  <div style={{ display:'flex', gap:'14px' }}>
                    <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#FF3A5C', marginTop:'5px', flexShrink:0 }} />
                    <div>
                      <div style={{ fontFamily:H.font, fontWeight:600, fontSize:'1.125rem', color:'#F2F4F8', marginBottom:'8px', letterSpacing:'-0.01em' }}>{d.label}</div>
                      <div style={{ fontFamily:H.font, fontSize:'0.8125rem', color:'#9AA0AE', lineHeight:1.55 }}>{d.desc}</div>
                    </div>
                  </div>
                </HaloCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="halo-section" style={{ textAlign:'center', background:'radial-gradient(ellipse at 50% 0%, rgba(255,58,92,0.05) 0%, transparent 55%)' }}>
        <div style={{ maxWidth:'600px', margin:'0 auto' }}>
          <div className="halo-label" style={{ marginBottom:'20px' }}>Design Partnership</div>
          <h2 style={{ fontFamily:H.font, fontSize:'clamp(2rem, 4vw, 3.5rem)', fontWeight:600, letterSpacing:'-0.03em', color:'#F2F4F8', marginBottom:'20px' }}>
            Make Users <span style={{ color:'#FF3A5C' }}>Love It.</span>
          </h2>
          <p style={{ fontFamily:H.font, fontSize:'0.9375rem', color:'#9AA0AE', lineHeight:1.55, marginBottom:'36px' }}>
            From wireframe to design system — we make every pixel intentional and every interaction delightful.
          </p>
          <Link to="/help/contact" className="halo-btn-primary" style={{ height:'48px', padding:'0 28px', fontSize:'0.9375rem' }}>
            Start Your Design Project <ArrowRight size={18} />
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
