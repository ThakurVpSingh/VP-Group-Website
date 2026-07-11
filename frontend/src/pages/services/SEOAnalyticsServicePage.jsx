import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger } from 'animejs';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import StatTile from '../../components/halo/StatTile';
import HaloCard from '../../components/halo/HaloCard';
import Chip from '../../components/halo/Chip';
import { ArrowRight, Search, BarChart2, TrendingUp, Globe, Tag, MousePointer, Layers, Settings } from 'lucide-react';

const H = { font: "'Inter', sans-serif", mono: "'JetBrains Mono', ui-monospace, monospace" };

const sparkSearch  = [70,75,80,84,87,89,91,92,93,93]; // 93% sessions start with search
const sparkClicks  = [40,50,58,62,65,68,70,71,71,71]; // 71% click page-1
const sparkROI     = [100,150,220,300,380,430,480,520,545,550]; // 550% SEO ROI
const sparkSearchV = [6.5,7.0,7.3,7.7,8.0,8.1,8.3,8.4,8.5,8.5]; // 8.5B searches/day

const chartData = [
  { label:'Organic',    before:22, after:68, color:'#3DD7E5' },
  { label:'Direct',     before:31, after:18, color:'#5B6BFF' },
  { label:'Referral',   before:15, after:8,  color:'#9AA0AE' },
  { label:'Paid',       before:32, after:6,  color:'#F5D547' },
];

const capabilities = [
  { icon:Search,      title:'Technical SEO Audit',       desc:'Crawl errors, Core Web Vitals, schema markup, canonical tags, and sitemap health — fully diagnosed.' },
  { icon:Tag,         title:'Keyword Architecture',      desc:'Topic-cluster strategy mapping commercial, informational, and navigational intent across your site.' },
  { icon:TrendingUp,  title:'Content Velocity Engine',   desc:'Publishing cadence strategy with AI-assisted briefs optimised for target keywords and featured snippets.' },
  { icon:Globe,       title:'Google Search Console',     desc:'Full GSC setup — property verification, sitemap submission, and performance monitoring dashboard.' },
  { icon:BarChart2,   title:'GA4 & Analytics Setup',     desc:'GA4 event taxonomy, funnel configuration, custom dashboards, and monthly performance reports.' },
  { icon:Settings,    title:'Google Tag Manager',        desc:'GTM container setup with triggers, variables, and tag firing for conversion and behaviour tracking.' },
];

const toolsData = [
  {
    id:'gsc', label:'Google Search Console',
    desc:'Index coverage, Core Web Vitals, search performance, and manual action monitoring.',
    steps:['Verify property (DNS or HTML tag)','Submit sitemap.xml','Monitor coverage report','Track position & impression data'],
  },
  {
    id:'ga4', label:'Google Analytics 4',
    desc:'Event-based tracking, audience segments, conversion funnel, and cross-device reporting.',
    steps:['Install GA4 Measurement ID','Configure key events (leads, purchases)','Build funnel exploration','Set data retention to 14 months'],
  },
  {
    id:'gtm', label:'Google Tag Manager',
    desc:'Centralised tag deployment — fire any tracking pixel without touching the codebase.',
    steps:['Create GTM workspace','Deploy GA4 via GTM tag','Configure scroll, click & form triggers','Preview > Publish to live'],
  },
];

export default function SEOAnalyticsServicePage() {
  const [activeTab, setActiveTab] = useState('gsc');
  const activeTool = toolsData.find(t => t.id === activeTab);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'SEO & Analytics | VP Group';
  }, []);

  useEffect(() => {
    animate('.seo-stat', { opacity:[0,1], translateY:[16,0], duration:500, delay:stagger(80), easing:'easeOutQuart' });
    animate('.seo-cap',  { opacity:[0,1], translateY:[16,0], duration:500, delay:stagger(70), easing:'easeOutQuart' });
    animate('.seo-bar',  { width:['0%','100%'], duration:900, delay:stagger(80), easing:'easeOutQuart' });
  }, []);

  const max = Math.max(...chartData.flatMap(d => [d.before, d.after]));

  return (
    <div className="halo-page" style={{ fontFamily:H.font }}>
      <ProjectNavbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="halo-section" style={{ minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:'100px', position:'relative', overflow:'hidden' }}>
        <div className="halo-container" style={{ width:'100%', position:'relative', zIndex:1 }}>
          <div className="halo-hero-grid">
            <div>
              <div style={{ marginBottom:'28px' }}>
                <Chip variant="info"><Search size={11} style={{ marginRight:4 }} />SEO & ANALYTICS</Chip>
              </div>
              <h1 style={{ fontFamily:H.font, fontSize:'clamp(2.25rem, 5vw, 4rem)', fontWeight:600, letterSpacing:'-0.03em', lineHeight:1.06, color:'#F2F4F8', marginBottom:'20px' }}>
                Rank Higher.<br /><span style={{ color:'#3DD7E5' }}>Track Everything.</span>
              </h1>
              <p style={{ fontFamily:H.font, fontSize:'0.9375rem', color:'#9AA0AE', lineHeight:1.55, marginBottom:'40px', maxWidth:'440px' }}>
                Full-stack SEO implementation and analytics infrastructure — from keyword architecture and Core Web Vitals to GA4 event taxonomy and GTM deployment.
              </p>

              {/* 3-tool badges */}
              <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', marginBottom:'36px' }}>
                {['Google Search Console','Google Analytics 4','Google Tag Manager'].map((t,i)=>(
                  <Chip key={i} variant="info">{t}</Chip>
                ))}
              </div>

              <Link to="/help/contact" className="halo-btn-primary">
                Start Ranking Now <ArrowRight size={16} />
              </Link>
            </div>

            {/* Bar chart */}
            <HaloCard elevated>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
                <div className="halo-label">Traffic Source Distribution</div>
                <div style={{ display:'flex', gap:'12px' }}>
                  <Chip variant="muted">Before SEO</Chip>
                  <Chip variant="info">After SEO</Chip>
                </div>
              </div>
              <div>
                {chartData.map((row,i)=>(
                  <div key={i} style={{ marginBottom:'18px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'6px' }}>
                      <span style={{ fontFamily:H.font, fontSize:'0.8125rem', color:'#9AA0AE' }}>{row.label}</span>
                      <span style={{ fontFamily:H.mono, fontSize:'0.8125rem', color:row.color }}>{row.after}%</span>
                    </div>
                    <div style={{ display:'grid', gridTemplateRows:'auto auto', gap:'4px' }}>
                      <div style={{ height:'6px', background:'#1E2029', borderRadius:'4px', overflow:'hidden' }}>
                        <div className="seo-bar" style={{ height:'100%', width:`${(row.before/max)*100}%`, background:'#3A3D4A', borderRadius:'4px' }} />
                      </div>
                      <div style={{ height:'6px', background:'#1E2029', borderRadius:'4px', overflow:'hidden' }}>
                        <div className="seo-bar" style={{ height:'100%', width:`${(row.after/max)*100}%`, background:row.color, borderRadius:'4px' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:'20px', padding:'10px 14px', background:'rgba(43,224,140,0.08)', border:'1px solid rgba(43,224,140,0.2)', borderRadius:'8px' }}>
                <span style={{ fontFamily:H.mono, fontSize:'0.75rem', color:'#2BE08C' }}>↑ +46% organic share · avg client result after 6 months</span>
              </div>
            </HaloCard>
          </div>
        </div>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 65% 40%, rgba(61,215,229,0.05) 0%, transparent 55%)', pointerEvents:'none' }} />
      </section>

      {/* ── STAT TILES ───────────────────────────────────────── */}
      <section className="halo-section halo-section-divider">
        <div className="halo-container">
          <div className="halo-label" style={{ marginBottom:'24px' }}>Global Search Landscape — Market Data 2024</div>
          <div className="halo-grid-4">
            <div className="seo-stat"><StatTile eyebrow="Sessions Start With Search" metric="93%" description="of online experiences begin on a search engine" trend="up" trendLabel="Google dominates 92%" accent="info" sparkData={sparkSearch} /></div>
            <div className="seo-stat"><StatTile eyebrow="Page-1 Click Share" metric="71%" description="of all search clicks go to first-page results" trend="up" trendLabel="Page-2 gets 6%" accent="primary" sparkData={sparkClicks} /></div>
            <div className="seo-stat"><StatTile eyebrow="SEO ROI vs Paid Ads" metric="550%" description="Return over a 36-month content investment" trend="up" trendLabel="Compound growth effect" accent="success" sparkData={sparkROI} /></div>
            <div className="seo-stat"><StatTile eyebrow="Daily Google Searches" metric="8.5B" description="Opportunities to be discovered every day" trend="up" trendLabel="Growing 7% YoY" accent="warning" sparkData={sparkSearchV} /></div>
          </div>
        </div>
      </section>

      {/* ── 3-TOOL WALKTHROUGH ───────────────────────────────── */}
      <section className="halo-section halo-section-divider">
        <div className="halo-container">
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px' }}>
            <div style={{ width:'2px', height:'32px', background:'#3DD7E5', borderRadius:'2px' }} />
            <div>
              <div className="halo-label" style={{ marginBottom:'4px' }}>Three Essential Tools</div>
              <h2 style={{ fontFamily:H.font, fontSize:'2.25rem', fontWeight:600, letterSpacing:'-0.02em', color:'#F2F4F8', margin:0 }}>Your Analytics Foundation</h2>
            </div>
          </div>
          <p style={{ fontFamily:H.font, fontSize:'0.9375rem', color:'#9AA0AE', lineHeight:1.55, marginBottom:'40px', maxWidth:'540px' }}>
            We configure all three Google tools in one afternoon — then you own the data forever.
          </p>

          <div className="halo-tabs" style={{ marginBottom:'32px' }}>
            {toolsData.map(t=>(
              <button key={t.id} className={`halo-tab${activeTab===t.id?' active':''}`} onClick={()=>setActiveTab(t.id)}>{t.label}</button>
            ))}
          </div>

          <HaloCard elevated accent="info">
            <div className="halo-grid-2" style={{ gap:'48px' }}>
              <div>
                <h3 style={{ fontFamily:H.font, fontSize:'1.5rem', fontWeight:600, letterSpacing:'-0.015em', color:'#F2F4F8', marginBottom:'12px' }}>{activeTool.label}</h3>
                <p style={{ fontFamily:H.font, fontSize:'0.9375rem', color:'#9AA0AE', lineHeight:1.55, marginBottom:'0' }}>{activeTool.desc}</p>
              </div>
              <div>
                <div className="halo-label" style={{ marginBottom:'16px' }}>Setup Checklist</div>
                {activeTool.steps.map((step,i)=>(
                  <div key={i} style={{ display:'flex', gap:'12px', alignItems:'flex-start', marginBottom:'12px' }}>
                    <div style={{ width:'20px', height:'20px', borderRadius:'50%', background:'rgba(61,215,229,0.15)', border:'1px solid rgba(61,215,229,0.3)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'1px' }}>
                      <span style={{ fontFamily:H.mono, fontSize:'0.65rem', color:'#3DD7E5', fontWeight:600 }}>{i+1}</span>
                    </div>
                    <span style={{ fontFamily:H.font, fontSize:'0.875rem', color:'#9AA0AE', lineHeight:1.5 }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </HaloCard>
        </div>
      </section>

      {/* ── SEO CAPABILITIES ─────────────────────────────────── */}
      <section className="halo-section halo-section-divider">
        <div className="halo-container">
          <div style={{ textAlign:'center', marginBottom:'56px' }}>
            <div className="halo-label" style={{ marginBottom:'12px' }}>Full Service SEO</div>
            <h2 style={{ fontFamily:H.font, fontSize:'2.25rem', fontWeight:600, letterSpacing:'-0.02em', color:'#F2F4F8', margin:0 }}>Everything to Win on Search</h2>
          </div>
          <div className="halo-grid-3">
            {capabilities.map((cap,i)=>(
              <div key={i} className="seo-cap">
                <HaloCard hoverable accent="info">
                  <div style={{ width:'36px', height:'36px', borderRadius:'8px', background:'rgba(61,215,229,0.1)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px', paddingTop:'6px' }}>
                    <cap.icon size={16} color="#3DD7E5" />
                  </div>
                  <div style={{ fontFamily:H.font, fontSize:'1.125rem', fontWeight:600, color:'#F2F4F8', marginBottom:'10px' }}>{cap.title}</div>
                  <div style={{ fontFamily:H.font, fontSize:'0.8125rem', color:'#9AA0AE', lineHeight:1.55 }}>{cap.desc}</div>
                </HaloCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="halo-section" style={{ textAlign:'center', background:'radial-gradient(ellipse at 50% 0%, rgba(61,215,229,0.05) 0%, transparent 55%)' }}>
        <div style={{ maxWidth:'600px', margin:'0 auto' }}>
          <div className="halo-label" style={{ marginBottom:'20px' }}>Search Visibility</div>
          <h2 style={{ fontFamily:H.font, fontSize:'clamp(2rem, 4vw, 3.5rem)', fontWeight:600, letterSpacing:'-0.03em', color:'#F2F4F8', marginBottom:'20px' }}>
            Be Found. <span style={{ color:'#3DD7E5' }}>Be Chosen.</span>
          </h2>
          <p style={{ fontFamily:H.font, fontSize:'0.9375rem', color:'#9AA0AE', lineHeight:1.55, marginBottom:'36px' }}>
            93% of journeys start on a search engine. Make sure yours ends on your website.
          </p>
          <Link to="/help/contact" className="halo-btn-primary" style={{ height:'48px', padding:'0 28px', fontSize:'0.9375rem' }}>
            Audit My Website Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
      <style>{`
        @media(max-width:960px){ .halo-grid-4{grid-template-columns:1fr 1fr!important} section>.halo-container>div[style*="grid-template-columns: 1fr 1fr"]{ display:block!important; } }
        @media(max-width:720px){ .halo-grid-4,.halo-grid-3,.halo-grid-2{grid-template-columns:1fr!important} .halo-tabs{width:100%;overflow-x:auto;flex-wrap:nowrap} }
      `}</style>
    </div>
  );
}
