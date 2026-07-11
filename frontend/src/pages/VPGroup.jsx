import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getApiUrl } from '../config';
import { submitContactForm } from '../services/formService';
import { 
  ArrowRight, 
  ExternalLink,
  Users,
  Terminal,
  Shield,
  Layers,
  Globe,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';
import ProjectNavbar from '../components/ProjectNavbar';
import Footer from '../components/Footer';

const H = { font: "'Inter', sans-serif", mono: "'JetBrains Mono', ui-monospace, monospace" };

export default function VPGroup() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "VP Group & Technologies | Engineering Infinite Scale";
    // Ping backend on load
    fetch(getApiUrl('/api/contact')).catch(() => {});
  }, []);

  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      setMousePos({ x: dx, y: dy });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setScrollY(scrollPos);
    };
    
    // Add scroll event listener to capture all scrolling events (including container element scrolls)
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    document.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
      document.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Transmitting...');
    
    const result = await submitContactForm(formData, {
        source: 'Main Landing Page'
    });

    if (result.success) {
      setStatus('Success! Message received.');
      alert(`Thanks for reaching out to us, ${formData.name}. We'll get back to you shortly within 24-48 hours.`);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setStatus(`Error: ${result.error || 'Failed'}`);
      alert(result.error || "Submission failed. Please try again later.");
    }
    setLoading(false);
  };

  // Scroll dock calculation progress (0 to 1)
  const t = Math.min(1, scrollY / 320);

  const targetLeft = winWidth > 1400 ? (winWidth - 1400) / 2 + 82 : 82;
  const targetScale = 18.4 / (winWidth * 0.13);
  const scale = 1 - t * (1 - targetScale);

  // Mouse parallax translate/rotations (fades to 0 when t approaches 1)
  const mx = mousePos.x * 20 * (1 - t);
  const my = mousePos.y * 15 * (1 - t);
  const rx = -mousePos.y * 10 * (1 - t);
  const ry = mousePos.x * 12 * (1 - t);

  // Dynamic shadow casting from mouse position as a light source
  const shadowX = -mousePos.x * 16 * (1 - t);
  const shadowY = -mousePos.y * 16 * (1 - t);
  const shadowBlur = 24 + (1 - t) * 8;
  const shadowOpacity = 0.08 * (1 - t);
  const textShadow = t >= 0.9 ? 'none' : `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity}), 0 4px 6px rgba(0, 0, 0, 0.03)`;

  return (
    <div style={{ minHeight: '100vh', background: '#F6F5F2', color: '#000000', fontFamily: H.font, position: 'relative', overflowX: 'hidden' }}>
      
      {/* ── PROJECT NAVBAR ────────────────────────────────────── */}
      <ProjectNavbar scrollY={scrollY} />

      {/* ── DOCKING TITLE ANIMATION ──────────────────────────── */}
      <div style={{
        position: 'fixed',
        left: `calc(${50 - t * 50}% + ${t * targetLeft}px)`,
        top: `calc(${50 - t * 50}% + ${t * 26}px)`,
        transform: `translate(${-50 + t * 50}%, ${-50 + t * 50}%) scale(${scale})`,
        transformOrigin: 'left top',
        zIndex: 3500,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        perspective: '1000px'
      }}>
        <div style={{
          transform: `translate3d(${mx}px, ${my}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`,
          transformOrigin: 'center center',
          fontFamily: H.font,
          fontWeight: 950,
          color: '#000000',
          letterSpacing: '-0.04em',
          fontSize: '13vw',
          lineHeight: 1,
          textShadow: textShadow,
          transition: 'color 0.2s ease, opacity 0.2s ease !important',
          WebkitTransition: 'color 0.2s ease, opacity 0.2s ease !important'
        }} className="nothin-docking-title">
          VP GROUP
        </div>
      </div>

      {/* ── MAIN CONTENT substrate ───────────────────────────────── */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        
        {/* ── HERO SECTION ────────────────────────────────────────── */}
        {/* Structured with a top spacer so the centered fixed title doesn't overlap content at Y = 0 */}
        <section style={{ minHeight: '120vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '100px 24px 140px', boxSizing: 'border-box' }}>
          
          {/* Top spacer matching the title area */}
          <div style={{ height: '45vh' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', maxWidth: '1200px', margin: '0 auto' }} className="nothin-grid-2">
            <div>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1, margin: '0 0 24px 0', color: '#000000' }}>
                Web & Software<br />
                At Infinite Scale.
              </h1>
              <p style={{ fontSize: '0.9375rem', color: '#5C6170', lineHeight: 1.6, maxWidth: '440px', margin: '0 0 32px 0' }}>
                We specialize in high-fidelity web development, mission-critical software engineering, and 24/7 technical support. We build platforms that move the world.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="nothin-btn-pill"
                >
                  Launch Project <ArrowRight size={16} />
                </button>
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="nothin-btn-pill"
                  style={{ background: 'transparent', border: '1px solid #000000', color: '#000000' }}
                >
                  Our Services
                </button>
              </div>
            </div>

            {/* Code Window visualizer */}
            <div style={{ width: '100%', maxWidth: '400px', background: '#FFFFFF', border: '1px solid #EAE9E6', borderRadius: '16px', padding: '24px', boxSizing: 'border-box', boxShadow: '0 16px 40px rgba(0,0,0,0.03)' }} className="home-desktop-only">
              <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                {['#FF3A5C','#F5D547','#2BE08C'].map(c => <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />)}
              </div>
              <div style={{ fontFamily: H.mono, fontSize: '0.75rem', lineHeight: 1.6, color: '#5C6170' }}>
                <span style={{ color: '#000000', fontWeight: 600 }}>service</span> WebDevelopment {'{'}<br />
                &nbsp;&nbsp;<span style={{ color: '#5B6BFF' }}>get</span> expertise() {'{'}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#FF3A5C' }}>return</span> ['Web', 'Software', 'Support'];<br />
                &nbsp;&nbsp;{'}'}<br />
                &nbsp;&nbsp;async build() {'{'}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#FF3A5C' }}>return</span> await this.deploy(budget: <span style={{ color: '#2BE08C' }}>'Affordable'</span>);<br />
                &nbsp;&nbsp;{'}'}<br />
                {'}'}
              </div>
            </div>
          </div>
        </section>

        {/* ── MISSION STATEMENT SECTIONS ─────────────────────────── */}
        <section style={{ padding: '160px 24px', display: 'flex', flexDirection: 'column', gap: '80px', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#000000', margin: 0, maxWidth: '900px' }}>
            Most agencies build templates.<br />
            We prefer engineering.
          </h2>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#000000', margin: 0, maxWidth: '900px', alignSelf: 'flex-end', textAlign: 'right' }}>
            Good software communicates.<br />
            Great software surprises.
          </h2>
        </section>

        {/* ── WORKS SECTION (PORTFOLIO) ─────────────────────────── */}
        <section style={{ padding: '120px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #000000', paddingBottom: '16px', marginBottom: '60px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>Selected Works</span>
            <span style={{ fontSize: '0.8rem', color: '#5C6170' }}>The Portfolio</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '120px' }}>
            {/* VexioGate Card */}
            <div className="nothin-project-row">
              <div className="project-img-wrapper">
                <div className="project-img-placeholder" style={{ background: '#EAE9E6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(0,0,0,0.06)', letterSpacing: '4px' }}>VEXIOGATE</span>
                </div>
              </div>
              <div className="project-meta">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
                  <span style={{ fontSize: '2.5rem', fontFamily: H.mono, fontWeight: 300, color: '#9AA0AE' }}>01</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '2px', padding: '4px 10px', background: '#EAE9E6', borderRadius: '4px' }}>LIVE</span>
                </div>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '16px' }}>VexioGate IAM Ecosystem</h3>
                <p style={{ fontSize: '0.95rem', color: '#5C6170', lineHeight: 1.6, marginBottom: '28px' }}>
                  Next-generation identity tracking, secure workforce dashboard, and automated gateway provisioning for modern enterprises.
                </p>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
                  {['React', 'MERN', 'Security'].map(t => <span key={t} className="nothin-tag">{t}</span>)}
                </div>
                <button onClick={() => navigate('/portfolio/vault-iam')} className="nothin-btn-pill">
                  View Case Study <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Neural Core */}
            <div className="nothin-project-row" style={{ flexDirection: 'row-reverse' }}>
              <div className="project-img-wrapper">
                <div className="project-img-placeholder" style={{ background: '#EAE9E6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(0,0,0,0.06)', letterSpacing: '4px' }}>NEURAL CORE</span>
                </div>
              </div>
              <div className="project-meta">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
                  <span style={{ fontSize: '2.5rem', fontFamily: H.mono, fontWeight: 300, color: '#9AA0AE' }}>02</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '2px', padding: '4px 10px', background: '#EAE9E6', borderRadius: '4px', color: '#5B6BFF' }}>DEV</span>
                </div>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '16px' }}>Neural Core Platform</h3>
                <p style={{ fontSize: '0.95rem', color: '#5C6170', lineHeight: 1.6, marginBottom: '28px' }}>
                  Future integration module. Our ecosystem is actively expanding to include autonomous neural tracking and semantic reasoning loops.
                </p>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
                  {['AI', 'Agents', 'RAG'].map(t => <span key={t} className="nothin-tag">{t}</span>)}
                </div>
                <div className="nothin-tag" style={{ display: 'inline-block', color: '#9AA0AE' }}>
                  In Development
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PARTNERSHIPS SECTION ──────────────────────────────── */}
        <section style={{ padding: '120px 24px', background: '#F0EFEA' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #000000', paddingBottom: '16px', marginBottom: '60px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>Partnerships</span>
              <span style={{ fontSize: '0.8rem', color: '#5C6170' }}>Visionary Clients</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }} className="nothin-grid-2">
              <div style={{ background: '#F6F5F2', border: '1px solid #E2E1DD', padding: '48px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5B6BFF', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Maternal E-Commerce</div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>Mother Bliss</h3>
                  <p style={{ fontSize: '0.95rem', color: '#5C6170', lineHeight: 1.6, marginBottom: '32px' }}>
                    A comprehensive maternal care ecosystem engineered by VP Group. We architected the full-stack infrastructure for seamless commerce and global scalability.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a href="https://wwwmotherbliss-dd920f26.vercel.app/" target="_blank" rel="noopener noreferrer" className="nothin-btn-pill-action">
                    Production Realm <ExternalLink size={14} />
                  </a>
                  <a href="https://thakurvpsingh.github.io/mothers-bliss/" target="_blank" rel="noopener noreferrer" className="nothin-btn-pill-action-secondary">
                    Legacy Archive <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div style={{ border: '2px dashed #D2D1CD', padding: '48px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', justify: 'center', marginBottom: '24px' }}>
                  <Users size={20} color="#5C6170" />
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 8px 0' }}>New Partner Socket</h4>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1.5px', background: '#E2E1DD', padding: '4px 10px', borderRadius: '20px', marginBottom: '16px' }}>AWAITING PROVISIONING</div>
                <p style={{ fontSize: '0.875rem', color: '#5C6170', lineHeight: 1.5, margin: 0, maxWidth: '280px' }}>
                  Open socket for future enterprise partnerships. Join the infrastructure that moves the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES SECTION ─────────────────────────────────── */}
        <section id="services" style={{ padding: '120px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #000000', paddingBottom: '16px', marginBottom: '60px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>Services</span>
            <span style={{ fontSize: '0.8rem', color: '#5C6170' }}>Our Capabilities</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2px', background: '#EAE9E6', border: '1px solid #EAE9E6' }}>
            {[
              { path: '/services/web-development', title: 'Web Development', desc: 'Fluid React interfaces and robust e-commerce ecosystems engineered for high-velocity conversion.' },
              { path: '/services/software-engineering', title: 'Software Engineering', desc: 'Custom enterprise software solutions, mission-critical IAM platforms, and scalable backends.' },
              { path: '/services/technical-support', title: 'Technical Support', desc: '24/7 dedicated support mesh ensuring your digital infrastructure remains resilient and secure.' },
              { path: '/services/seo-analytics-setup', title: 'SEO & Analytics', desc: 'Google Search Console, Analytics (GA4), and Tag Manager setup to index your site and track growth.' },
              { path: '/services/ai-automation', title: 'AI Automation', desc: 'Autonomous AI agents, semantic RAG retrieval systems, and customized workflow automations.' },
            ].map((s, i) => (
              <div key={i} onClick={() => navigate(s.path)} className="nothin-service-card">
                <span style={{ fontSize: '0.8rem', fontFamily: H.mono, color: '#9AA0AE', display: 'block', marginBottom: '24px' }}>0{i+1}</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.015em' }}>{s.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#5C6170', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                <div className="nothin-service-arrow">
                  <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── DNA & CULTURE SECTION ────────────────────────────── */}
        <section style={{ padding: '120px 24px', background: '#F0EFEA' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'center' }} className="nothin-grid-2">
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5C6170', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>OUR DNA</div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 850, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '24px' }}>Strategic Aim & Culture</h2>
              <p style={{ fontSize: '1.05rem', color: '#5C6170', lineHeight: 1.7, margin: 0 }}>
                At VP Group, our mission is to democratize high-end engineering. We combine enterprise-grade security and scale with accessible pricing models, ensuring every business has access to top-tier digital infrastructure.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: '#F6F5F2', border: '1px solid #E2E1DD', padding: '32px', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>Working Culture</h4>
                <p style={{ fontSize: '0.9rem', color: '#5C6170', lineHeight: 1.5, margin: 0 }}>We thrive on radical transparency. Every engineer is a decision-maker in our flat-hierarchy network.</p>
              </div>
              <div style={{ background: '#F6F5F2', border: '1px solid #E2E1DD', padding: '32px', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>Industry Standing</h4>
                <p style={{ fontSize: '0.9rem', color: '#5C6170', lineHeight: 1.5, margin: 0 }}>Positioned at the intersection of security and performance, solving the "Infinite Scale" problem.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT & COMMUNICATIONS SECTION ─────────────────── */}
        <section id="contact" style={{ padding: '120px 24px 200px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #000000', paddingBottom: '16px', marginBottom: '80px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>Direct Communication</span>
            <span style={{ fontSize: '0.8rem', color: '#5C6170' }}>Command Center</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginBottom: '80px' }}>
            {[
              { label: 'Command Center', val: 'contact.vpsdev@gmail.com', tag: '24/7 Monitoring' },
              { label: 'Headquarters', val: 'Pratapgarh, Uttar Pradesh, India', tag: 'Regional Hub' },
              { label: 'Business Line', val: 'Inquiry via Email Recommended', tag: 'Support Mesh' }
            ].map((c, i) => (
              <div key={i} style={{ background: '#F0EFEA', border: '1px solid #EAE9E6', padding: '40px 32px', borderRadius: '16px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '220px' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#5C6170', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>{c.label}</span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 16px 0', color: '#000000', wordBreak: 'break-word' }}>{c.val}</h4>
                <div style={{ display: 'inline-block', alignSelf: 'flex-start', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1px', background: '#E2E1DD', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase', color: '#5C6170' }}>{c.tag}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px' }} className="nothin-grid-2">
            <div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '16px' }}>Secure Transmission</h3>
              <p style={{ fontSize: '0.95rem', color: '#5C6170', lineHeight: 1.6, margin: 0 }}>
                Our communication lines are encrypted via end-to-end protocols. Your inquiries are routed directly to our specialized operational nodes. We typically reply within 24-48 hours.
              </p>
            </div>

            <div style={{ background: '#F0EFEA', padding: '40px', borderRadius: '16px', border: '1px solid #E2E1DD' }}>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="nothin-grid-2">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="nothin-input"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="nothin-input"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Subject" 
                  className="nothin-input" 
                  style={{ marginBottom: '16px' }}
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                />
                <textarea 
                  placeholder="Message Payload..." 
                  className="nothin-input" 
                  style={{ minHeight: '120px', marginBottom: '24px', resize: 'none' }}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                ></textarea>
                <button 
                  type="submit" 
                  className="nothin-btn-submit"
                  disabled={loading}
                >
                  {loading ? 'Transmitting...' : 'Initialize Uplink'}
                </button>
                <p style={{ marginTop: '16px', fontSize: '0.7rem', color: '#9AA0AE', textAlign: 'center', lineHeight: '1.4', margin: '16px 0 0 0' }}>
                  By submitting this form, you agree to our <Link to="/terms-conditions" style={{ color: '#000000', textDecoration: 'underline', fontWeight: 600 }}>Terms & Conditions</Link> and <Link to="/privacy-policy" style={{ color: '#000000', textDecoration: 'underline', fontWeight: 600 }}>Privacy Policy</Link>.
                </p>
                {status && <div style={{ marginTop: '20px', textAlign: 'center', color: status.includes('Success') ? '#2BE08C' : '#FF3A5C', fontWeight: '700' }}>{status}</div>}
              </form>
            </div>
          </div>
        </section>

        {/* Original Footer */}
        <Footer />
      </main>

      <style>{`
        .nothin-docking-title {
          transition: color 0.2s ease, opacity 0.2s ease !important;
          -webkit-transition: color 0.2s ease, opacity 0.2s ease !important;
        }
        .nothin-project-row {
          display: flex;
          gap: 64px;
          align-items: center;
        }
        .project-img-wrapper {
          flex: 1.2;
          width: 100%;
        }
        .project-img-placeholder {
          width: 100%;
          aspect-ratio: 16/10;
          border-radius: 12px;
          border: 1px solid #E2E1DD;
        }
        .project-meta {
          flex: 0.8;
          width: 100%;
        }
        .nothin-tag {
          font-family: ${H.mono};
          font-size: 0.7rem;
          font-weight: 600;
          color: #000000;
          background: #EAE9E6;
          padding: 6px 12px;
          border-radius: 40px;
          letter-spacing: 0.5px;
        }
        .nothin-btn-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #000000;
          color: #FFFFFF;
          border: none;
          border-radius: 30px;
          padding: 12px 24px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.85rem;
        }
        .nothin-btn-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.12);
        }
        .nothin-btn-pill-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #000000;
          color: #FFFFFF;
          border: none;
          border-radius: 12px;
          padding: 16px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s ease;
          font-size: 0.875rem;
        }
        .nothin-btn-pill-action:hover {
          background: #222222;
          transform: translateY(-2px);
        }
        .nothin-btn-pill-action-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: transparent;
          color: #000000;
          border: 1px solid #C2C1BD;
          border-radius: 12px;
          padding: 16px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s ease;
          font-size: 0.875rem;
        }
        .nothin-btn-pill-action-secondary:hover {
          background: rgba(0,0,0,0.03);
          border-color: #000000;
        }
        .nothin-service-card {
          background: #F6F5F2;
          padding: 48px;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
        }
        .nothin-service-card:hover {
          background: #FAF9F6;
        }
        .nothin-service-arrow {
          position: absolute;
          bottom: 32px;
          right: 32px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #EAE9E6;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }
        .nothin-service-card:hover .nothin-service-arrow {
          opacity: 1;
          transform: translateX(0);
        }
        .nothin-input {
          width: 100%;
          background: #F6F5F2;
          border: 1px solid #C2C1BD;
          border-radius: 8px;
          padding: 14px;
          color: #000000;
          font-size: 0.95rem;
          transition: all 0.2s;
        }
        .nothin-input:focus {
          border-color: #000000;
          outline: none;
          background: #FFFFFF;
        }
        .nothin-btn-submit {
          width: 100%;
          padding: 16px;
          background: #000000;
          color: #FFFFFF;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .nothin-btn-submit:hover:not(:disabled) {
          background: #222222;
          transform: translateY(-2px);
        }

        .home-desktop-only {
          display: block;
        }

        @media (max-width: 960px) {
          .nothin-project-row {
            flex-direction: column !important;
            gap: 32px;
          }
          .nothin-grid-2 {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .home-desktop-only {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
