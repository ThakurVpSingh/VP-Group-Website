import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger } from 'animejs';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import StatTile from '../../components/halo/StatTile';
import HaloCard from '../../components/halo/HaloCard';
import Chip from '../../components/halo/Chip';
import { ArrowRight, Shield, Activity, Database, ShieldCheck, Wifi, Server, RefreshCw, Eye } from 'lucide-react';

const H = { font: "'Inter', sans-serif", mono: "'JetBrains Mono', ui-monospace, monospace" };

const sparkUp     = [97.5,98,98.5,99,99.2,99.5,99.7,99.8,99.9,99.9];
const sparkMTTR   = [38,32,28,24,20,18,16,14,13,12];
const sparkReduce = [20,28,35,42,48,53,57,60,63,64];
const sparkCost   = [280,290,295,299,300,300,300,300,300,300]; // $K/hr (flat threat)

const alertLog = [
  { time:'09:41:02', level:'INFO',  msg:'Monitoring agent started on cluster-01' },
  { time:'09:41:05', level:'INFO',  msg:'All 47 endpoints healthy — response < 12ms' },
  { time:'09:43:22', level:'WARN',  msg:'CPU spike detected on node-4 (78%)' },
  { time:'09:43:24', level:'AUTO',  msg:'Auto-scaling triggered: adding node-5 to pool' },
  { time:'09:43:31', level:'INFO',  msg:'Load redistributed — node-4 CPU normalized (41%)' },
  { time:'09:51:07', level:'ALERT', msg:'Potential brute-force detected on /auth/login' },
  { time:'09:51:08', level:'BLOCK', msg:'IP 185.220.101.x rate-limited & flagged' },
  { time:'10:02:00', level:'INFO',  msg:'Backup snapshot completed — 0 data loss' },
  { time:'10:15:00', level:'INFO',  msg:'Security patch CVE-2024-21351 applied to all nodes' },
];

const uptimeNodes = [
  { name:'API Gateway',      uptime:'99.97%', latency:'3ms',  status:'success' },
  { name:'Auth Service',     uptime:'100%',   latency:'8ms',  status:'success' },
  { name:'Database Cluster', uptime:'99.99%', latency:'1ms',  status:'success' },
  { name:'CDN Network',      uptime:'100%',   latency:'22ms', status:'success' },
  { name:'Email Workers',    uptime:'99.8%',  latency:'45ms', status:'warning' },
  { name:'File Storage',     uptime:'100%',   latency:'12ms', status:'success' },
];

const capabilities = [
  { icon:Eye,       title:'24/7 Uptime Surveillance',  desc:'AI-driven anomaly detection monitors all endpoints every 30 seconds, identifying issues before users notice.' },
  { icon:Shield,    title:'Zero-Day Patch Deployment', desc:'Critical vulnerability patches applied within hours of CVE disclosure across your entire infrastructure.' },
  { icon:Database,  title:'Encrypted Backup Mesh',     desc:'Hourly snapshots with AES-256 encryption — guaranteed restore within 15 minutes of any failure event.' },
  { icon:RefreshCw, title:'Disaster Recovery Drills',  desc:'Monthly simulated failure scenarios testing your full recovery pipeline from alert to full restoration.' },
  { icon:Wifi,      title:'Multi-Region Redundancy',   desc:'Traffic routes across failover regions automatically — users never experience downtime even during outages.' },
  { icon:Activity,  title:'Predictive Maintenance',    desc:'Machine-learning models forecast hardware degradation and capacity limits weeks before they become critical.' },
];

const logColor = (l) => l==='ALERT'?'#FF3A5C':l==='WARN'?'#F5D547':l==='BLOCK'||l==='AUTO'?'#3DD7E5':'#2BE08C';
const logVariant = (l) => l==='ALERT'?'error':l==='WARN'?'warning':l==='BLOCK'||l==='AUTO'?'info':'success';

export default function TechSupportServicePage() {
  const [logLines, setLogLines] = useState([]);
  const logRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Technical Support | VP Group';
    
    let active = true;
    let timeoutId;
    let intervalId;

    const runLoop = () => {
      let idx = 0;
      setLogLines([]);
      
      intervalId = setInterval(() => {
        if (!active) return;
        if (idx < alertLog.length) {
          const lineToAdd = alertLog[idx];
          setLogLines(p => [...p, lineToAdd]);
          idx++;
          if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
        } else {
          clearInterval(intervalId);
          timeoutId = setTimeout(() => {
            if (active) runLoop();
          }, 2500);
        }
      }, 600);
    };

    runLoop();

    return () => {
      active = false;
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    animate('.ts-stat',  { opacity:[0,1], translateY:[16,0], duration:500, delay:stagger(80), easing:'easeOutQuart' });
    animate('.ts-cap',   { opacity:[0,1], translateY:[16,0], duration:500, delay:stagger(70), easing:'easeOutQuart' });
    animate('.ts-upbar', { width:['0%','100%'], duration:1400, delay:stagger(120), easing:'easeOutQuart' });
  }, []);

  return (
    <div className="halo-page" style={{ fontFamily: H.font }}>
      <ProjectNavbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="halo-section" style={{ minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:'100px', position:'relative', overflow:'hidden' }}>
        <div className="halo-container" style={{ width:'100%', position:'relative', zIndex:1 }}>
          <div className="halo-hero-grid">
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'28px' }}>
                <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#2BE08C', boxShadow:'0 0 8px #2BE08C', animation:'ts-pulse 1.5s ease-in-out infinite' }} />
                <Chip variant="success">LIVE TECHNICAL SUPPORT</Chip>
              </div>
              <h1 style={{ fontFamily:H.font, fontSize:'clamp(2.25rem, 5vw, 4rem)', fontWeight:600, letterSpacing:'-0.03em', lineHeight:1.06, color:'#F2F4F8', marginBottom:'20px' }}>
                24/7 Resilience<br /><span style={{ color:'#2BE08C' }}>Infrastructure Shield</span>
              </h1>
              <p style={{ fontFamily:H.font, fontSize:'0.9375rem', color:'#9AA0AE', lineHeight:1.55, marginBottom:'40px', maxWidth:'440px' }}>
                Your infrastructure, continuously monitored. Our predictive surveillance and instant response protocols keep your systems online, secure, and optimised — always.
              </p>

              {/* Quick stats row */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px', marginBottom:'36px' }}>
                {[{v:'99.9%',l:'Uptime SLA'},{v:'12min',l:'Avg MTTR'},{v:'24/7',l:'Engineer Watch'}].map((s,i)=>(
                  <div key={i} style={{ padding:'16px', background:'#14151C', border:'1px solid #2A2D38', borderRadius:'12px', textAlign:'center' }}>
                    <div style={{ fontFamily:H.mono, fontSize:'1.4rem', fontWeight:600, letterSpacing:'-0.02em', color:'#2BE08C', marginBottom:'4px' }}>{s.v}</div>
                    <div style={{ fontFamily:H.font, fontSize:'0.75rem', color:'#5C6170' }}>{s.l}</div>
                  </div>
                ))}
              </div>

              <Link to="/help/contact" className="halo-btn-primary">
                Get Protected Now <ArrowRight size={16} />
              </Link>
            </div>

            {/* Live log */}
            <div style={{ background:'#14151C', border:'1px solid #2A2D38', borderRadius:'16px', overflow:'hidden', boxShadow:'0 24px 60px rgba(0,0,0,0.55)' }}>
              <div style={{ padding:'12px 16px', background:'#1E2029', borderBottom:'1px solid #2A2D38', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                  <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#2BE08C', boxShadow:'0 0 6px #2BE08C' }} />
                  <span style={{ fontFamily:H.mono, fontSize:'0.72rem', color:'#2BE08C', fontWeight:500 }}>VP-SENTINEL MONITOR v2.1</span>
                </div>
                <Chip variant="success">All Systems Nominal</Chip>
              </div>
              <div ref={logRef} style={{ padding:'18px', fontFamily:H.mono, fontSize:'0.72rem', lineHeight:1.75, height:'290px', overflowY:'auto' }}>
                {logLines.map((l,i)=>(
                  <div key={i} style={{ display:'flex', gap:'12px', marginBottom:'1px', animation:'ts-fadein 0.2s ease' }}>
                    <span style={{ color:'#3A3D4A', flexShrink:0 }}>{l.time}</span>
                    <span style={{ color:logColor(l.level), minWidth:'44px', flexShrink:0 }}>[{l.level}]</span>
                    <span style={{ color:'#9AA0AE' }}>{l.msg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 70% 50%, rgba(43,224,140,0.05) 0%, transparent 60%)', pointerEvents:'none' }} />
      </section>

      {/* ── STAT TILES ───────────────────────────────────────── */}
      <section className="halo-section halo-section-divider">
        <div className="halo-container">
          <div className="halo-label" style={{ marginBottom:'24px' }}>Operational Impact Metrics — Industry Data 2024</div>
          <div className="halo-grid-4">
            <div className="ts-stat"><StatTile eyebrow="SLA Guarantee" metric="99.9%" description="Uptime across all monitored services" trend="up" trendLabel="Edge redundancy" accent="success" sparkData={sparkUp} /></div>
            <div className="ts-stat"><StatTile eyebrow="Mean Time To Resolve" metric="12min" description="Average incident response & fix" trend="up" trendLabel="↓ from 38min industry avg" accent="info" sparkData={sparkMTTR} /></div>
            <div className="ts-stat"><StatTile eyebrow="Incident Reduction" metric="64%" description="Fewer alerts via proactive monitoring" trend="up" trendLabel="vs reactive support model" accent="primary" sparkData={sparkReduce} /></div>
            <div className="ts-stat"><StatTile eyebrow="Enterprise Downtime Cost" metric="$300K" description="Per hour — why prevention matters" trend="down" trendLabel="Our avg $0 loss/client" accent="error" sparkData={sparkCost} /></div>
          </div>
        </div>
      </section>

      {/* ── ENDPOINT STATUS BOARD ────────────────────────────── */}
      <section className="halo-section halo-section-divider">
        <div className="halo-container">
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px' }}>
            <div style={{ width:'2px', height:'32px', background:'#2BE08C', borderRadius:'2px' }} />
            <div>
              <div className="halo-label" style={{ marginBottom:'4px' }}>Live Status Board</div>
              <h2 style={{ fontFamily:H.font, fontSize:'2.25rem', fontWeight:600, letterSpacing:'-0.02em', color:'#F2F4F8', margin:0 }}>All Endpoints Monitored</h2>
            </div>
          </div>
          <p style={{ fontFamily:H.font, fontSize:'0.9375rem', color:'#9AA0AE', lineHeight:1.55, marginBottom:'40px', maxWidth:'540px' }}>
            Real-time pulse on every critical service in your infrastructure stack.
          </p>
          <div className="halo-grid-2">
            {uptimeNodes.map((node,i)=>(
              <HaloCard key={i} hoverable accent={node.status} padding="20px">
                <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
                  <div style={{ width:'10px', height:'10px', borderRadius:'50%', background: node.status==='success'?'#2BE08C':'#F5D547', flexShrink:0, boxShadow:`0 0 8px ${node.status==='success'?'#2BE08C':'#F5D547'}60` }} />
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:H.font, fontWeight:600, color:'#F2F4F8', marginBottom:'8px', fontSize:'0.9375rem' }}>{node.name}</div>
                    <div style={{ height:'3px', background:'#1E2029', borderRadius:'4px', overflow:'hidden' }}>
                      <div className="ts-upbar" style={{ height:'100%', background: node.status==='success'?'#2BE08C':'#F5D547', borderRadius:'4px', width:'0%' }} />
                    </div>
                  </div>
                  <div style={{ textAlign:'right', flexShrink:0 }}>
                    <div style={{ fontFamily:H.mono, fontSize:'1.1rem', fontWeight:600, color: node.status==='success'?'#2BE08C':'#F5D547' }}>{node.uptime}</div>
                    <div style={{ fontFamily:H.mono, fontSize:'0.72rem', color:'#5C6170' }}>{node.latency}</div>
                  </div>
                </div>
              </HaloCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────── */}
      <section className="halo-section halo-section-divider">
        <div className="halo-container">
          <div style={{ textAlign:'center', marginBottom:'56px' }}>
            <div className="halo-label" style={{ marginBottom:'12px' }}>What We Protect</div>
            <h2 style={{ fontFamily:H.font, fontSize:'2.25rem', fontWeight:600, letterSpacing:'-0.02em', color:'#F2F4F8', margin:0 }}>Full Spectrum Infrastructure Defense</h2>
          </div>
          <div className="halo-grid-3">
            {capabilities.map((cap,i)=>(
              <div key={i} className="ts-cap">
                <HaloCard hoverable accent="success">
                  <div style={{ width:'36px', height:'36px', borderRadius:'8px', background:'rgba(43,224,140,0.1)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px', paddingTop:'6px' }}>
                    <cap.icon size={16} color="#2BE08C" />
                  </div>
                  <div style={{ fontFamily:H.font, fontSize:'1.125rem', fontWeight:600, letterSpacing:'-0.01em', color:'#F2F4F8', marginBottom:'10px' }}>{cap.title}</div>
                  <div style={{ fontFamily:H.font, fontSize:'0.8125rem', color:'#9AA0AE', lineHeight:1.55 }}>{cap.desc}</div>
                </HaloCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="halo-section" style={{ textAlign:'center', background:'radial-gradient(ellipse at 50% 0%, rgba(43,224,140,0.06) 0%, transparent 60%)' }}>
        <div style={{ maxWidth:'600px', margin:'0 auto' }}>
          <ShieldCheck size={40} color="#2BE08C" style={{ marginBottom:'20px' }} />
          <h2 style={{ fontFamily:H.font, fontSize:'clamp(2rem, 4vw, 3.5rem)', fontWeight:600, letterSpacing:'-0.03em', color:'#F2F4F8', marginBottom:'16px' }}>
            Never Go <span style={{ color:'#FF3A5C' }}>Offline</span> Again.
          </h2>
          <p style={{ fontFamily:H.font, fontSize:'0.9375rem', color:'#9AA0AE', lineHeight:1.55, marginBottom:'36px' }}>
            Let our 24/7 guardian mesh protect your infrastructure while you focus on growing your business.
          </p>
          <Link to="/help/contact" className="halo-btn-primary" style={{ height:'48px', padding:'0 28px', fontSize:'0.9375rem' }}>
            Activate Protection <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
      <style>{`
        @keyframes ts-pulse  { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.3)} }
        @keyframes ts-fadein { from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:none} }
        @media(max-width:960px){ .halo-grid-4{grid-template-columns:1fr 1fr!important} section>.halo-container>div[style*="grid-template-columns: 1fr 1fr"]{ display:block!important; } }
        @media(max-width:720px){ .halo-grid-4,.halo-grid-3,.halo-grid-2{grid-template-columns:1fr!important} }
      `}</style>
    </div>
  );
}
