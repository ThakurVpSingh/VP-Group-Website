import React, { useState, useEffect, useRef } from 'react';
import PageTemplate from '../components/PageTemplate';
import { CreditCard, Download, Shield, Eye, Settings, User, Mail, Phone, Globe, MapPin, Sparkles, Check } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const BusinessCardPage = () => {
  const [profileType, setProfileType] = useState('executive'); // 'executive' or 'collaborator'
  const [accentTheme, setAccentTheme] = useState('cyan'); // 'pink', 'purple', 'cyan', 'emerald'
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Form states for customization
  const [name, setName] = useState('Vaibhav Pratap Singh');
  const [role, setRole] = useState('Founder and Strategic Director');
  const [email, setEmail] = useState('contact.vpsdev@gmail.com');
  const [phone, setPhone] = useState('+91 6388398552');
  const [company, setCompany] = useState('VP Group & Technologies');
  const [slogan, setSlogan] = useState('Engineering Infinite Scale');
  const [locationText, setLocationText] = useState('Sector 33, Gurgaon, Haryana');
  const [website, setWebsite] = useState('vp-group-website.vercel.app');
  const [github, setGithub] = useState('ThakurVpSingh');
  const [linkedin, setLinkedin] = useState('vaibhav-pratap-singh1');

  // Preview container scale handler
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  // Mouse hover glow tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Handle auto-populating default executive details
  useEffect(() => {
    if (profileType === 'executive') {
      setName('Vaibhav Pratap Singh');
      setRole('Founder and Strategic Director');
      setEmail('contact.vpsdev@gmail.com');
      setPhone('+91 6388398552');
      setCompany('VP Group & Technologies');
      setSlogan('Engineering Infinite Scale');
      setLocationText('Sector 33, Gurgaon, Haryana');
      setWebsite('vp-group-website.vercel.app');
      setGithub('ThakurVpSingh');
      setLinkedin('vaibhav-pratap-singh1');
      setAccentTheme('cyan');
    } else {
      // Empty or user-customized details
      setName('Your Name');
      setRole('Technology Partner');
      setEmail('partner@vpgroup.co');
      setPhone('+91 99999 88888');
      setCompany('VP GROUP & TECH');
      setSlogan('Scaling Next-Gen Systems');
      setLocationText('San Francisco, US');
      setWebsite('yourdomain.com');
      setGithub('');
      setLinkedin('');
    }
  }, [profileType]);

  // Handle responsive scaling
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const cardWidth = 1050; // card base width
        // Add safety margin for padding
        const newScale = Math.min(1, (containerWidth - 24) / cardWidth);
        setScale(newScale);
      }
    };
    window.addEventListener('resize', handleResize);
    // Timeout to let DOM render completely
    const timer = setTimeout(handleResize, 100);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  // Color mapping
  const themes = {
    pink: {
      accent: '#ff4ef0',
      gradient: 'linear-gradient(135deg, #ff4ef0 0%, #8b5cf6 100%)',
      shadow: 'rgba(255, 78, 240, 0.4)',
      bgAccent: 'rgba(255, 78, 240, 0.05)',
      radial: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255, 78, 240, 0.15) 0%, transparent 60%)',
    },
    purple: {
      accent: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
      shadow: 'rgba(139, 92, 246, 0.4)',
      bgAccent: 'rgba(139, 92, 246, 0.05)',
      radial: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
    },
    cyan: {
      accent: '#22d3ee',
      gradient: 'linear-gradient(135deg, #22d3ee 0%, #8b5cf6 100%)',
      shadow: 'rgba(34, 211, 238, 0.4)',
      bgAccent: 'rgba(34, 211, 238, 0.05)',
      radial: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(34, 211, 238, 0.15) 0%, transparent 60%)',
    },
    emerald: {
      accent: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
      shadow: 'rgba(16, 185, 129, 0.4)',
      bgAccent: 'rgba(16, 185, 129, 0.05)',
      radial: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(16, 185, 129, 0.15) 0%, transparent 60%)',
    }
  };

  const activeTheme = themes[accentTheme];

  const handleDownload = async (format) => {
    const cardElement = document.getElementById('business-card-render');
    if (!cardElement) return;

    setDownloading(true);

    try {
      // Force temporary scale styles override so it exports in full high-DPI 1050x600 size
      const originalTransform = cardElement.style.transform;
      const originalTransition = cardElement.style.transition;
      
      cardElement.style.transform = 'scale(1)';
      cardElement.style.transition = 'none';

      // Capture the canvas at high DPI (scale: 3x)
      const canvas = await html2canvas(cardElement, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1050,
        windowHeight: 600
      });

      // Restore original scales
      cardElement.style.transform = originalTransform;
      cardElement.style.transition = originalTransition;

      const fileSafeName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      if (format === 'png') {
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `vp-card-${fileSafeName}.png`;
        link.href = url;
        link.click();
      } else if (format === 'jpeg') {
        const url = canvas.toDataURL('image/jpeg', 0.95);
        const link = document.createElement('a');
        link.download = `vp-card-${fileSafeName}.jpeg`;
        link.href = url;
        link.click();
      } else if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [1050, 600]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, 1050, 600);
        pdf.save(`vp-card-${fileSafeName}.pdf`);
      }

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to render business card:', error);
      alert('An error occurred while compiling your high-res business card. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <PageTemplate
      title="Business Card Studio"
      subtitle="Interactive Branding Utility"
      description="Access and configure your official VP Group digital identity. Instantly compile premium, high-DPI glassmorphism business cards tailored for web, print, and absolute Zero-Trust verification."
      showStandardGrid={false}
      showContact={false}
      icon={CreditCard}
    >
      <div className="card-studio-container" style={{ padding: '0 5% 100px', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="studio-grid">
          
          {/* Customizer Controls Panel */}
          <div className="glass-panel studio-controls" style={{ padding: '40px', borderTop: `4px solid ${activeTheme.accent}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <Settings size={22} color={activeTheme.accent} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900', margin: 0, letterSpacing: '-0.5px' }}>Customizer</h3>
            </div>

            {/* Profile Selection */}
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="input-label">Identity Profile</label>
              <div className="profile-toggle-group">
                <button 
                  className={`toggle-option ${profileType === 'executive' ? 'active' : ''}`}
                  onClick={() => setProfileType('executive')}
                  style={{ borderColor: profileType === 'executive' ? activeTheme.accent : 'transparent' }}
                >
                  <Shield size={16} /> Executive (Vaibhav P. Singh)
                </button>
                <button 
                  className={`toggle-option ${profileType === 'collaborator' ? 'active' : ''}`}
                  onClick={() => setProfileType('collaborator')}
                  style={{ borderColor: profileType === 'collaborator' ? activeTheme.accent : 'transparent' }}
                >
                  <User size={16} /> Partner / Collaborator
                </button>
              </div>
            </div>

            {/* Theme Selector */}
            <div className="form-group" style={{ marginBottom: '32px' }}>
              <label className="input-label">Visual Atmosphere</label>
              <div className="theme-circles-container">
                {Object.keys(themes).map((themeKey) => (
                  <button
                    key={themeKey}
                    className={`theme-circle ${accentTheme === themeKey ? 'active' : ''}`}
                    onClick={() => setAccentTheme(themeKey)}
                    style={{ 
                      background: themes[themeKey].gradient,
                      borderColor: accentTheme === themeKey ? '#fff' : 'rgba(255,255,255,0.1)'
                    }}
                    title={`Theme: ${themeKey}`}
                  />
                ))}
              </div>
            </div>

            <hr style={{ border: '0', height: '1px', background: 'rgba(255,255,255,0.08)', margin: '24px 0' }} />

            {/* Fields Inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="form-group">
                <label className="input-label">Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  disabled={profileType === 'executive'}
                  placeholder="Enter Full Name" 
                  className="terminal-input"
                />
              </div>

              <div className="form-group">
                <label className="input-label">Title / Role</label>
                <input 
                  type="text" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  disabled={profileType === 'executive'}
                  placeholder="e.g. Lead Engineer" 
                  className="terminal-input"
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="input-label">Email Address</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={profileType === 'executive'}
                    placeholder="name@vpgroup.co" 
                    className="terminal-input"
                  />
                </div>
                <div className="form-group">
                  <label className="input-label">Phone Number</label>
                  <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={profileType === 'executive'}
                    placeholder="+91 XXXXX XXXXX" 
                    className="terminal-input"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="input-label">Organization</label>
                  <input 
                    type="text" 
                    value={company} 
                    onChange={(e) => setCompany(e.target.value)}
                    disabled={profileType === 'executive'}
                    placeholder="VP GROUP" 
                    className="terminal-input"
                  />
                </div>
                <div className="form-group">
                  <label className="input-label">HQ Location</label>
                  <input 
                    type="text" 
                    value={locationText} 
                    onChange={(e) => setLocationText(e.target.value)}
                    disabled={profileType === 'executive'}
                    placeholder="HQ Pratapgarh, IN" 
                    className="terminal-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="input-label">Corporate Slogan</label>
                <input 
                  type="text" 
                  value={slogan} 
                  onChange={(e) => setSlogan(e.target.value)}
                  disabled={profileType === 'executive'}
                  placeholder="Engineering Infinite Scale" 
                  className="terminal-input"
                />
              </div>

              <div className="form-group">
                <label className="input-label">Website Domain</label>
                <input 
                  type="text" 
                  value={website} 
                  onChange={(e) => setWebsite(e.target.value)}
                  disabled={profileType === 'executive'}
                  placeholder="vp-group-website.vercel.app" 
                  className="terminal-input"
                />
              </div>

              {profileType === 'collaborator' && (
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="input-label">GitHub Username (Optional)</label>
                    <input 
                      type="text" 
                      value={github} 
                      onChange={(e) => setGithub(e.target.value)}
                      placeholder="username" 
                      className="terminal-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="input-label">LinkedIn Slug (Optional)</label>
                    <input 
                      type="text" 
                      value={linkedin} 
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="profile-slug" 
                      className="terminal-input"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Card Canvas Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="preview-header-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Eye size={18} color="#6b7280" />
                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>High-Res Preview</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span className="badge-secure" style={{ color: activeTheme.accent, borderColor: activeTheme.accent }}>
                  SECURE CHIP V1
                </span>
                <span className="badge-active">ACTIVE PROTOCOL</span>
              </div>
            </div>

            {/* Scaling container */}
            <div 
              ref={containerRef}
              className="card-scale-viewport"
              style={{
                width: '100%',
                height: `${600 * scale}px`,
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'visible',
              }}
            >
              {/* Natural size business card (1050px x 600px) rendered under transform scale */}
              <div
                ref={cardRef}
                id="business-card-render"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  width: '1050px',
                  height: '600px',
                  transform: `scale(${scale})`,
                  transformOrigin: 'center center',
                  position: 'absolute',
                  background: '#040711',
                  borderRadius: '28px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isHovered ? `0 35px 80px rgba(0,0,0,0.8), 0 0 40px ${activeTheme.shadow}` : '0 30px 60px rgba(0,0,0,0.7)',
                  overflow: 'hidden',
                  fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
                  boxSizing: 'border-box',
                  transition: 'box-shadow 0.5s ease, border-color 0.5s ease',
                  cursor: 'crosshair',
                  userSelect: 'none',
                  '--mouse-x': `${mousePos.x}px`,
                  '--mouse-y': `${mousePos.y}px`
                }}
              >
                {/* Neon Dynamic Border Glow */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '28px',
                  padding: '2px',
                  background: activeTheme.gradient,
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  pointerEvents: 'none',
                  opacity: 0.85
                }} />

                {/* Soft Cyber Grid Background Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(rgba(255, 255, 255, 0.007) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.007) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  opacity: 0.8,
                  pointerEvents: 'none'
                }} />

                {/* Cybernetic Matrix circuit traces (SVG Overlay) */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.15 }} viewBox="0 0 1050 600">
                  <path d="M 0 120 L 300 120 L 350 170 L 600 170" fill="none" stroke="#fff" strokeWidth="1" />
                  <path d="M 1050 480 L 750 480 L 700 430 L 450 430" fill="none" stroke="#fff" strokeWidth="1" />
                  <circle cx="350" cy="170" r="3" fill="#fff" />
                  <circle cx="700" cy="430" r="3" fill="#fff" />
                </svg>

                {/* Dynamic Mouse Radar Tracker */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: isHovered ? activeTheme.radial : 'none',
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none'
                }} />

                {/* Top Glowing Ray */}
                <div style={{
                  position: 'absolute',
                  top: '-150px',
                  left: '10%',
                  width: '350px',
                  height: '300px',
                  background: `radial-gradient(ellipse at center, ${activeTheme.accent} 0%, transparent 65%)`,
                  opacity: 0.12,
                  pointerEvents: 'none',
                  filter: 'blur(30px)'
                }} />

                {/* Inside Content Grid */}
                <div style={{ padding: '60px 70px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', zIndex: 10, boxSizing: 'border-box' }}>
                  
                  {/* Top Header Section */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      {/* Organization info */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
                        <div style={{
                          width: '38px',
                          height: '38px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {/* Inner tiny SVG Diamond */}
                          <svg viewBox="0 0 100 100" style={{ width: '18px', height: '18px' }}>
                            <path d="M50 10 L90 35 L50 55 Z" fill={activeTheme.accent} opacity="0.9" />
                            <path d="M50 10 L10 35 L50 55 Z" fill={activeTheme.accent} opacity="0.75" />
                            <path d="M50 55 L10 35 L50 90 L90 35 Z" fill={activeTheme.accent} opacity="0.5" />
                          </svg>
                        </div>
                        <span style={{ fontSize: '1.5rem', fontWeight: '950', letterSpacing: '-0.5px', color: '#fff' }}>
                          {company}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.65rem', fontWeight: '900', color: activeTheme.accent, letterSpacing: '4.5px', textTransform: 'uppercase', opacity: 0.95 }}>
                        {slogan}
                      </div>
                    </div>

                    {/* Glowing Logo Diamond - Top Right */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                      <div style={{ 
                        width: '74px', 
                        height: '74px', 
                        filter: `drop-shadow(0 0 15px ${activeTheme.shadow})`,
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px'
                      }}>
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                          <defs>
                            <linearGradient id="logoCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" style={{ stopColor: activeTheme.accent }} />
                              <stop offset="100%" style={{ stopColor: '#8b5cf6' }} />
                            </linearGradient>
                          </defs>
                          <path d="M50 10 L90 35 L50 55 Z" fill="url(#logoCardGrad)" opacity="0.95" />
                          <path d="M50 10 L10 35 L50 55 Z" fill="url(#logoCardGrad)" opacity="0.8" />
                          <path d="M50 55 L10 35 L50 90 L90 35 Z" fill="url(#logoCardGrad)" opacity="0.6" />
                        </svg>
                      </div>
                      <span style={{ fontSize: '0.5rem', fontWeight: '900', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                        EST. 2024
                      </span>
                    </div>
                  </div>

                  {/* Mid Section: Corporate Slogan Accent Layout */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', margin: '30px 0' }}>
                    <div>
                      {/* Name & Title */}
                      <h2 style={{ fontSize: '2.5rem', fontWeight: '950', color: '#fff', letterSpacing: '-1.5px', marginBottom: '8px', lineHeight: 1.1 }}>
                        {name}
                      </h2>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: activeTheme.accent, boxShadow: `0 0 8px ${activeTheme.accent}` }} />
                        <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#f1f5f9', textTransform: 'uppercase', letterSpacing: '1px' }}>
                          {role}
                        </span>
                      </div>
                    </div>

                    {/* Microchip secure connector graphic */}
                    <div style={{ 
                      width: '90px', 
                      height: '60px', 
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      <div style={{ width: '40px', height: '30px', border: `1.5px solid ${activeTheme.accent}`, borderRadius: '6px', position: 'relative', opacity: 0.6 }}>
                        <div style={{ position: 'absolute', top: '50%', left: '-10px', width: '8px', height: '2px', background: activeTheme.accent }} />
                        <div style={{ position: 'absolute', top: '50%', right: '-10px', width: '8px', height: '2px', background: activeTheme.accent }} />
                        <div style={{ position: 'absolute', left: '50%', top: '-8px', width: '2px', height: '6px', background: activeTheme.accent, transform: 'translateX(-50%)' }} />
                        <div style={{ position: 'absolute', left: '50%', bottom: '-8px', width: '2px', height: '6px', background: activeTheme.accent, transform: 'translateX(-50%)' }} />
                      </div>
                      <span style={{ position: 'absolute', bottom: '4px', fontSize: '0.35rem', color: 'rgba(255,255,255,0.2)', fontWeight: '900', letterSpacing: '1px' }}>SYSTEM CHIP</span>
                    </div>
                  </div>

                  {/* Bottom Footer Section: Contacts */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '32px' }}>
                    {/* Left details grid */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px 40px', maxWidth: '700px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Mail size={16} color={activeTheme.accent} style={{ opacity: 1 }} />
                        <span style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: '700' }}>{email}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Phone size={16} color={activeTheme.accent} style={{ opacity: 1 }} />
                        <span style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: '700' }}>{phone}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <MapPin size={16} color={activeTheme.accent} style={{ opacity: 1 }} />
                        <span style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: '700' }}>{locationText}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Globe size={16} color={activeTheme.accent} style={{ opacity: 1 }} />
                        <span style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: '700' }}>{website}</span>
                      </div>
                    </div>

                    {/* QR Code Stylized Matrix */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '74px',
                        height: '74px',
                        background: '#fff',
                        padding: '6px',
                        borderRadius: '12px',
                        boxShadow: `0 0 20px rgba(255,255,255,0.1)`,
                        boxSizing: 'border-box'
                      }}>
                        {/* High fidelity SVG styled hybrid QR/chip */}
                        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', fill: '#040711' }}>
                          {/* Corner Squares */}
                          <rect x="0" y="0" width="30" height="30" />
                          <rect x="5" y="5" width="20" height="20" fill="#fff" />
                          <rect x="10" y="10" width="10" height="10" />

                          <rect x="70" y="0" width="30" height="30" />
                          <rect x="75" y="5" width="20" height="20" fill="#fff" />
                          <rect x="80" y="10" width="10" height="10" />

                          <rect x="0" y="70" width="30" height="30" />
                          <rect x="5" y="75" width="20" height="20" fill="#fff" />
                          <rect x="10" y="80" width="10" height="10" />

                          {/* Random data grids */}
                          <rect x="40" y="0" width="10" height="10" />
                          <rect x="50" y="10" width="10" height="10" />
                          <rect x="40" y="20" width="20" height="10" />
                          
                          <rect x="0" y="40" width="10" height="10" />
                          <rect x="10" y="50" width="10" height="10" />
                          <rect x="20" y="40" width="10" height="20" />

                          <rect x="70" y="40" width="20" height="10" />
                          <rect x="80" y="50" width="10" height="20" />
                          <rect x="90" y="40" width="10" height="10" />

                          <rect x="40" y="70" width="10" height="20" />
                          <rect x="50" y="80" width="25" height="10" />
                          <rect x="60" y="90" width="10" height="10" />

                          {/* Tiny center branding point */}
                          <rect x="45" y="45" width="10" height="10" fill={activeTheme.accent} />
                        </svg>
                      </div>
                      <span style={{ fontSize: '0.45rem', fontWeight: '900', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        SCAN VERIFY
                      </span>
                    </div>

                  </div>

                </div>
              </div>
            </div>

            {/* Download Button Actions Bar */}
            <div className="glass-panel actions-bar" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', borderBottom: `2px solid ${activeTheme.accent}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color={activeTheme.accent} />
                <h4 style={{ fontSize: '1rem', fontWeight: '800', margin: 0, color: '#fff' }}>Export Identity Card</h4>
              </div>

              <div className="actions-buttons-grid">
                <button
                  onClick={() => handleDownload('png')}
                  className="download-btn"
                  disabled={downloading}
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <Download size={18} color="#94a3b8" /> PNG Image (300 DPI)
                </button>
                <button
                  onClick={() => handleDownload('jpeg')}
                  className="download-btn"
                  disabled={downloading}
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <Download size={18} color="#94a3b8" /> JPEG Image (300 DPI)
                </button>
                <button
                  onClick={() => handleDownload('pdf')}
                  className="download-btn"
                  disabled={downloading}
                  style={{ background: activeTheme.gradient, border: 'none', color: '#fff', fontWeight: '800' }}
                >
                  {downloading ? 'Compiling PDF...' : <><Download size={18} /> Download PDF Document</>}
                </button>
              </div>

              {downloadSuccess && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '700', animation: 'fadeIn 0.3s' }}>
                  <Check size={16} /> Business Card Compiled and Saved Successfully!
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      <style>{`
        .studio-grid {
          display: grid;
          grid-template-columns: 1.1fr 1.9fr;
          gap: 50px;
          align-items: start;
        }

        .studio-controls {
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        .input-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 800;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 10px;
        }

        .profile-toggle-group {
          display: flex;
          gap: 12px;
        }

        .toggle-option {
          flex: 1;
          padding: 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          font-size: 0.8rem;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .toggle-option.active {
          background: rgba(255, 255, 255, 0.06);
          color: #fff;
          border-width: 1px;
        }

        .theme-circles-container {
          display: flex;
          gap: 14px;
        }

        .theme-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }

        .theme-circle:hover {
          transform: scale(1.1);
        }

        .theme-circle.active {
          transform: scale(1.15);
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .badge-secure {
          padding: 6px 12px;
          border: 1px solid;
          border-radius: 8px;
          font-size: 0.65rem;
          font-weight: 900;
          letter-spacing: 1.5px;
        }

        .badge-active {
          padding: 6px 12px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 8px;
          color: #10b981;
          font-size: 0.65rem;
          font-weight: 900;
          letter-spacing: 1.5px;
        }

        .actions-buttons-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1.2fr;
          gap: 16px;
        }

        .download-btn {
          padding: 16px;
          border-radius: 12px;
          color: #94a3b8;
          font-size: 0.85rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .download-btn:hover:not(:disabled) {
          color: #fff;
          transform: translateY(-2px);
          background: rgba(255,255,255,0.06) !important;
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }

        .download-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1100px) {
          .studio-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 600px) {
          .form-grid-2 {
            grid-template-columns: 1fr;
          }
          .profile-toggle-group {
            flex-direction: column;
          }
          .actions-buttons-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </PageTemplate>
  );
};

export default BusinessCardPage;
