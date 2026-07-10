import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger } from 'animejs';
import ProjectNavbar from '../../components/ProjectNavbar';
import Footer from '../../components/Footer';
import { ArrowRight, Search, Activity, Layers, TrendingUp, Globe, BarChart2, Tag, CheckCircle2 } from 'lucide-react';

const ACCENT = '#a855f7';
const ACCENT2 = '#06b6d4';

const toolSteps = [
  {
    tool: 'Google Search Console',
    color: '#4285f4',
    icon: Search,
    steps: [
      'Domain ownership verification via HTML meta tag',
      'Submit sitemap.xml for immediate crawling',
      'Request indexing of all main pages',
      'Monitor search impressions & keyword rankings',
    ],
    stat: '10x faster indexing',
  },
  {
    tool: 'Google Analytics 4',
    color: '#f59e0b',
    icon: Activity,
    steps: [
      'Create GA4 property & configure data stream',
      'Set correct timezone & session parameters',
      'Extract measurement ID for GTM integration',
      'Enable enhanced measurement for key events',
    ],
    stat: '100% visitor tracking accuracy',
  },
  {
    tool: 'Google Tag Manager',
    color: ACCENT,
    icon: Tag,
    steps: [
      'Deploy GTM container code (header + body)',
      'Create GA4 configuration tag from measurement ID',
      'Set up click trackers for all CTA buttons',
      'Enable debug mode, verify & publish container',
    ],
    stat: 'Zero code changes needed post-setup',
  },
];

const chartData = [
  { month: 'Jan', value: 12 },
  { month: 'Feb', value: 18 },
  { month: 'Mar', value: 24 },
  { month: 'Apr', value: 31 },
  { month: 'May', value: 45 },
  { month: 'Jun', value: 58 },
  { month: 'Jul', value: 72 },
];

const capabilities = [
  { icon: Search, title: 'Search Console Mastery', desc: 'Comprehensive GSC property setup including domain verification, sitemap submission, coverage reports, and manual indexing requests.' },
  { icon: Activity, title: 'GA4 Property Configuration', desc: 'End-to-end GA4 setup: data streams, event parameters, conversion goals, audience segments, and custom dashboard creation.' },
  { icon: Tag, title: 'Tag Manager Architecture', desc: 'Professional GTM container build with organized tag structure, reusable variables, and trigger logic that requires zero developer involvement.' },
  { icon: TrendingUp, title: 'SEO Optimization', desc: 'Technical SEO audit: page speed, Core Web Vitals, schema markup, meta tags, and canonical URL enforcement across your site.' },
  { icon: Globe, title: 'Sitemap Optimization', desc: 'Dynamic XML sitemap generation ensuring every page, blog post, and product listing is crawled and indexed rapidly.' },
  { icon: BarChart2, title: 'Real-Time Verification', desc: 'Live testing of every tag and event trigger in GTM preview mode before publishing — zero guesswork, guaranteed accuracy.' },
];

export default function SEOAnalyticsServicePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [animatedBars, setAnimatedBars] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'SEO & Analytics Setup | VP Group';

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !animatedBars) { setAnimatedBars(true); } },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animatedBars]);

  useEffect(() => {
    if (animatedBars) {
      animate('.seo-bar', {
        height: (el) => el.getAttribute('data-height') + 'px',
        duration: 1000,
        delay: stagger(100),
        easing: 'easeOutQuart'
      });
    }
  }, [animatedBars]);

  useEffect(() => {
    animate('.seo-cap-card', {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 500,
      delay: stagger(80),
      easing: 'easeOutQuart'
    });
  }, []);

  const maxVal = Math.max(...chartData.map(d => d.value));

  return (
    <div style={{ background: '#060010', minHeight: '100vh', fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#fff' }}>
      <ProjectNavbar />

      {/* HERO: Search/Analytics Dashboard */}
      <section style={{ minHeight: '100vh', padding: 'clamp(100px, 10vw, 140px) 5% clamp(60px, 8vw, 100px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: `${ACCENT}15`, border: `1px solid ${ACCENT}30`, borderRadius: '100px', padding: '6px 16px', marginBottom: '40px' }}>
            <Search size={14} color={ACCENT} />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '3px', textTransform: 'uppercase' }}>SEO & Analytics Setup</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 950, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: '28px' }}>
                <span style={{ display: 'block', color: '#fff' }}>Make Google</span>
                <span style={{ display: 'block', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Find Your Website</span>
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.8, marginBottom: '40px' }}>
                We configure Search Console, GA4, and Tag Manager as a connected measurement suite — so you know exactly who visits, where they come from, and what they do.
              </p>

              {/* Simulated search bar */}
              <div style={{ background: '#0f0018', border: `1px solid ${ACCENT}20`, borderRadius: '14px', padding: '16px 20px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Search size={18} color='#475569' />
                <span style={{ color: '#475569', fontSize: '0.9rem' }}>vp-group-website.vercel.app —</span>
                <span style={{ color: ACCENT, fontSize: '0.9rem', fontWeight: 700 }}>Indexed ✓</span>
                <div style={{ marginLeft: 'auto', padding: '4px 10px', background: `${ACCENT}20`, borderRadius: '8px', fontSize: '0.75rem', color: ACCENT, fontWeight: 700 }}>Position #1</div>
              </div>

              <Link to="/help/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, color: '#fff', padding: '16px 32px', borderRadius: '14px', fontWeight: 800, textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                Get Indexed Today <ArrowRight size={18} />
              </Link>
            </div>

            {/* Analytics Dashboard Mockup */}
            <div style={{ background: '#0a0015', border: `1px solid ${ACCENT}20`, borderRadius: '20px', overflow: 'hidden', boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 60px ${ACCENT}08` }}>
              <div style={{ padding: '16px 20px', background: '#0f0020', borderBottom: `1px solid ${ACCENT}15`, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Activity size={16} color={ACCENT} />
                <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 700 }}>GA4 Realtime Dashboard</span>
                <div style={{ marginLeft: 'auto', width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
              </div>
              {/* Chart area */}
              <div ref={sectionRef} style={{ padding: '24px' }}>
                <div style={{ fontSize: '0.7rem', color: '#475569', marginBottom: '8px', letterSpacing: '2px' }}>ORGANIC SESSIONS / MONTH</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '160px', marginBottom: '12px' }}>
                  {chartData.map((d, i) => {
                    const h = Math.round((d.value / maxVal) * 130);
                    return (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                        <div className="seo-bar" data-height={h} style={{ width: '100%', height: '4px', borderRadius: '4px 4px 0 0', background: `linear-gradient(180deg, ${ACCENT}, ${ACCENT2})`, transition: 'height 0.1s ease' }} />
                        <span style={{ fontSize: '0.6rem', color: '#334155' }}>{d.month}</span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '16px' }}>
                  {[
                    { v: '72K', l: 'Monthly Visitors' },
                    { v: '35%', l: 'CTR Growth' },
                    { v: '#1', l: 'Search Ranking' },
                  ].map((s, i) => (
                    <div key={i} style={{ padding: '12px', background: `${ACCENT}08`, borderRadius: '10px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 900, color: ACCENT }}>{s.v}</div>
                      <div style={{ fontSize: '0.65rem', color: '#475569', marginTop: '2px' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 70% 40%, ${ACCENT}06 0%, transparent 60%)`, pointerEvents: 'none' }} />
      </section>

      {/* 3-TOOL TABS */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) 5%', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '56px' }}>
            <div style={{ width: '4px', height: '40px', borderRadius: '4px', background: `linear-gradient(${ACCENT}, ${ACCENT2})` }} />
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '6px' }}>The 3-Tool Stack</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 950, letterSpacing: '-1.5px', color: '#fff', margin: 0 }}>One Afternoon. Three Tools. Complete Visibility.</h2>
            </div>
          </div>

          {/* Tab selector */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {toolSteps.map((tool, i) => (
              <button key={i} onClick={() => setActiveTab(i)} style={{ padding: '12px 24px', borderRadius: '12px', border: `1px solid ${activeTab === i ? tool.color : 'rgba(255,255,255,0.08)'}`, background: activeTab === i ? `${tool.color}15` : 'transparent', color: activeTab === i ? tool.color : '#475569', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.3s ease', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                {tool.tool}
              </button>
            ))}
          </div>

          {/* Active tool detail */}
          {toolSteps[activeTab] && (
            <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${toolSteps[activeTab].color}20`, borderRadius: '24px', padding: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${toolSteps[activeTab].color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {React.createElement(toolSteps[activeTab].icon, { size: 24, color: toolSteps[activeTab].color })}
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: 0 }}>{toolSteps[activeTab].tool}</h3>
                </div>
                <div style={{ marginBottom: '24px' }}>
                  {toolSteps[activeTab].steps.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'flex-start' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: `${toolSteps[activeTab].color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.7rem', fontWeight: 700, color: toolSteps[activeTab].color }}>
                        {i + 1}
                      </div>
                      <span style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6 }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'center', padding: '40px', background: `${toolSteps[activeTab].color}06`, borderRadius: '20px', border: `1px solid ${toolSteps[activeTab].color}20` }}>
                <div style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 950, color: toolSteps[activeTab].color, marginBottom: '12px', letterSpacing: '-1px' }}>✓</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>{toolSteps[activeTab].stat}</div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Guaranteed outcome</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) 5%' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: ACCENT, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>Full Scope of Work</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 950, letterSpacing: '-2px', color: '#fff', margin: 0 }}>Everything Included. Nothing Missed.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {capabilities.map((cap, i) => (
              <div key={i} className="seo-cap-card" style={{ padding: '36px', background: 'rgba(168, 85, 247, 0.03)', border: '1px solid rgba(168, 85, 247, 0.1)', borderRadius: '24px', transition: 'all 0.4s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT + '40'; e.currentTarget.style.transform = 'translateY(-8px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${ACCENT}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <cap.icon size={24} color={ACCENT} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>{cap.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '0.92rem', margin: 0 }}>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(100px, 12vw, 180px) 5%', textAlign: 'center', background: `radial-gradient(ellipse at 50% 0%, ${ACCENT}10 0%, transparent 60%)` }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 950, letterSpacing: '-2.5px', color: '#fff', marginBottom: '24px' }}>
            Get <span style={{ color: ACCENT }}>Discovered.</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '48px', lineHeight: 1.8 }}>
            Your website exists. Let Google and your customers actually find it — today.
          </p>
          <Link to="/help/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, color: '#fff', padding: '20px 48px', borderRadius: '16px', fontWeight: 800, textDecoration: 'none', fontSize: '1rem', letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.3s ease' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 20px 60px ${ACCENT}40`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            Set Up Analytics Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
      <style>{`
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
