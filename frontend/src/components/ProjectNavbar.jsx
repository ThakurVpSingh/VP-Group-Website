import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Zap, Menu, X, ChevronDown, Shield, ArrowRight, Globe, Layers, Mail,
  Sparkles, Terminal, Users, Activity, Cpu, ShieldCheck, Sun, Moon,
  RefreshCw, Plug, Code2, Briefcase, Building2, HelpCircle
} from 'lucide-react';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

const ProjectNavbar = ({ scrollY: propScrollY }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { themeMode, effectiveTheme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (propScrollY !== undefined) return;
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [propScrollY]);

    const isScrolled = propScrollY !== undefined ? propScrollY > 20 : scrolled;

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    return (
        <>
            <nav className={`project-navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="nav-container">
                    <div className="nav-logo-section" onClick={() => navigate('/')}>
                        <div className="nav-logo-box">
                            <Logo variant="icon" size="32px" className="company-logo-svg" />
                        </div>
                        <div className="logo-text">
                            <span className="brand-name">VP GROUP</span>
                            <span className="brand-sub">ENGINEERING</span>
                        </div>
                    </div>
                    
                    {/* Desktop Links */}
                    <div className="nav-links desktop-only">
                        <Link to="/" className="nav-link-btn">Home</Link>
                        
                        {/* ── SERVICES MULTI-COLUMN MEGA MENU ── */}
                        <div className="nav-dropdown mega-dropdown">
                            <button className="nav-link-btn">
                                Services <ChevronDown size={12} className="drop-icon" />
                            </button>
                            <div className="dropdown-content mega-content">
                                {/* Column 1: Enterprise AI & Modernization */}
                                <div className="mega-column">
                                    <div className="mega-col-title">CORE PLATFORMS</div>
                                    <Link to="/services/ai-custom-erp" className="mega-item">
                                        <Sparkles size={16} color="#FF3A5C" />
                                        <div>
                                            <span className="mega-item-name">AI Custom ERP</span>
                                            <span className="mega-item-sub">Intelligent enterprise resource planning</span>
                                        </div>
                                    </Link>
                                    <Link to="/services/legacy-modernization" className="mega-item">
                                        <RefreshCw size={16} color="#5B6BFF" />
                                        <div>
                                            <span className="mega-item-name">Legacy Modernization</span>
                                            <span className="mega-item-sub">Monolith to microservices & cloud</span>
                                        </div>
                                    </Link>
                                    <Link to="/services/ai-automation" className="mega-item">
                                        <Zap size={16} color="#3DD7E5" />
                                        <div>
                                            <span className="mega-item-name">AI & Automation</span>
                                            <span className="mega-item-sub">Autonomous LLM agents & RAG</span>
                                        </div>
                                    </Link>
                                </div>

                                {/* Column 2: Software Engineering & Cloud */}
                                <div className="mega-column">
                                    <div className="mega-col-title">ENGINEERING & CLOUD</div>
                                    <Link to="/services/software-engineering" className="mega-item">
                                        <Terminal size={16} color="#2BE08C" />
                                        <div>
                                            <span className="mega-item-name">Software Engineering</span>
                                            <span className="mega-item-sub">Full-stack web, mobile & APIs</span>
                                        </div>
                                    </Link>
                                    <Link to="/services/cloud-devops" className="mega-item">
                                        <Cpu size={16} color="#F5D547" />
                                        <div>
                                            <span className="mega-item-name">Cloud & DevOps</span>
                                            <span className="mega-item-sub">Kubernetes, CI/CD & 99.99% uptime</span>
                                        </div>
                                    </Link>
                                    <Link to="/services/plugin-integrations" className="mega-item">
                                        <Plug size={16} color="#FF3A5C" />
                                        <div>
                                            <span className="mega-item-name">Plug-ins & Integrations</span>
                                            <span className="mega-item-sub">Custom connectors & API middleware</span>
                                        </div>
                                    </Link>
                                </div>

                                {/* Column 3: Web & Technical Support */}
                                <div className="mega-column">
                                    <div className="mega-col-title">WEB & TECHNICAL GROWTH</div>
                                    <Link to="/services/web-development" className="mega-item">
                                        <Globe size={16} color="#3DD7E5" />
                                        <div>
                                            <span className="mega-item-name">Website Development</span>
                                            <span className="mega-item-sub">High-performance React & Next.js</span>
                                        </div>
                                    </Link>
                                    <Link to="/services/custom-ui-ux" className="mega-item">
                                        <Layers size={16} color="#5B6BFF" />
                                        <div>
                                            <span className="mega-item-name">Custom UI/UX Design</span>
                                            <span className="mega-item-sub">Design systems & interactive prototypes</span>
                                        </div>
                                    </Link>
                                    <Link to="/services/technical-support" className="mega-item">
                                        <ShieldCheck size={16} color="#2BE08C" />
                                        <div>
                                            <span className="mega-item-name">24/7 Technical Support</span>
                                            <span className="mega-item-sub">Dedicated SLA engineering support</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* ── TALENT DROPDOWN ── */}
                        <div className="nav-dropdown">
                            <button className="nav-link-btn">
                                Talent <ChevronDown size={12} className="drop-icon" />
                            </button>
                            <div className="dropdown-content">
                                <Link to="/apply-partnership?model=staff-augmentation">Staff Augmentation</Link>
                                <Link to="/apply-partnership?model=dedicated-teams">Dedicated Teams</Link>
                                <Link to="/apply-partnership?model=build-operate-transfer">Build-Operate-Transfer</Link>
                                <Link to="/apply-partnership?model=contract-to-hire">Contract-to-Hire</Link>
                                <Link to="/apply-partnership?model=hire-ai-engineers">Hire AI Engineers</Link>
                            </div>
                        </div>

                        {/* ── COMPANY DROPDOWN ── */}
                        <div className="nav-dropdown">
                            <button className="nav-link-btn">
                                Company <ChevronDown size={12} className="drop-icon" />
                            </button>
                            <div className="dropdown-content">
                                <Link to="/employee-login" className="employee-highlight-link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>⚡ Employee Portal</span>
                                    <span className="maintenance-pill-sm">Under Maintenance</span>
                                </Link>
                                <Link to="/our-strategy">About Us</Link>
                                <Link to="/our-strategy#leadership">Leadership</Link>
                                <Link to="/apply-partnership">Careers</Link>
                                <Link to="/help/partners">Co-Innovation</Link>
                                <Link to="/help/hq-pratapgarh">Locations</Link>
                                <Link to="/help/portfolio">News & Case Studies</Link>
                            </div>
                        </div>

                        <Link to="/employee-login" className="nav-portal-btn nav-employee-btn" title="Employee Portal — Under Maintenance">
                            <span>Employee Portal</span>
                            <span className="maintenance-pill">Under Maintenance</span>
                        </Link>

                        <Link to="/consultation/book" className="nav-portal-btn">
                            Book Consultation
                        </Link>
                    </div>

                    {/* Header Action Controls (Theme Toggle & Mobile Hamburger) */}
                    <div className="nav-actions">
                        <button 
                            className="theme-toggle-btn"
                            onClick={toggleTheme}
                            title={effectiveTheme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                            aria-label={`Switch to ${effectiveTheme === 'dark' ? 'Light' : 'Dark'} Mode`}
                        >
                            {effectiveTheme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                        </button>

                        <button 
                            className={`hamburger-box ${isMenuOpen ? 'active' : ''}`} 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle Navigation Menu"
                        >
                            <div className="hamburger-inner"></div>
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer */}
                <div className={`drawer-backdrop ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(false)}></div>
                
                <div className={`side-drawer ${isMenuOpen ? 'open' : ''}`}>
                    <div className="drawer-header">
                        <span className="drawer-title">VP GROUP NAVIGATION</span>
                        <button onClick={() => setIsMenuOpen(false)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                            <X size={20} />
                        </button>
                    </div>
                    
                    <div className="drawer-content">
                        <div className="drawer-section">
                            <Link to="/" className="drawer-main-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        </div>

                        <div className="drawer-section">
                            <label>PRIMARY SERVICES</label>
                            <div className="drawer-links">
                                <Link to="/services/ai-custom-erp" onClick={() => setIsMenuOpen(false)}>AI Custom ERP</Link>
                                <Link to="/services/legacy-modernization" onClick={() => setIsMenuOpen(false)}>Legacy Modernization</Link>
                                <Link to="/services/ai-automation" onClick={() => setIsMenuOpen(false)}>AI & Automation</Link>
                                <Link to="/services/software-engineering" onClick={() => setIsMenuOpen(false)}>Software Engineering</Link>
                                <Link to="/services/cloud-devops" onClick={() => setIsMenuOpen(false)}>Cloud & DevOps</Link>
                                <Link to="/services/plugin-integrations" onClick={() => setIsMenuOpen(false)}>Plug-ins & Integrations</Link>
                                <Link to="/services/web-development" onClick={() => setIsMenuOpen(false)}>Website Development</Link>
                                <Link to="/services/custom-ui-ux" onClick={() => setIsMenuOpen(false)}>Custom UI/UX Design</Link>
                                <Link to="/services/technical-support" onClick={() => setIsMenuOpen(false)}>24/7 Technical Support</Link>
                            </div>
                        </div>

                        <div className="drawer-section">
                            <label>TALENT SOLUTIONS</label>
                            <div className="drawer-links">
                                <Link to="/apply-partnership?model=staff-augmentation" onClick={() => setIsMenuOpen(false)}>Staff Augmentation</Link>
                                <Link to="/apply-partnership?model=dedicated-teams" onClick={() => setIsMenuOpen(false)}>Dedicated Teams</Link>
                                <Link to="/apply-partnership?model=build-operate-transfer" onClick={() => setIsMenuOpen(false)}>Build-Operate-Transfer</Link>
                                <Link to="/apply-partnership?model=contract-to-hire" onClick={() => setIsMenuOpen(false)}>Contract-to-Hire</Link>
                                <Link to="/apply-partnership?model=hire-ai-engineers" onClick={() => setIsMenuOpen(false)}>Hire AI Engineers</Link>
                            </div>
                        </div>

                        <div className="drawer-section">
                            <label>COMPANY & RESOURCES</label>
                            <div className="drawer-links">
                                <Link to="/employee-login" onClick={() => setIsMenuOpen(false)} className="employee-highlight-link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>⚡ Employee Portal</span>
                                    <span className="maintenance-pill-sm">Under Maintenance</span>
                                </Link>
                                <Link to="/our-strategy" onClick={() => setIsMenuOpen(false)}>About Us & Strategy</Link>
                                <Link to="/help/portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio & Works</Link>
                                <Link to="/help/partners" onClick={() => setIsMenuOpen(false)}>Partnerships</Link>
                                <Link to="/help/hq-pratapgarh" onClick={() => setIsMenuOpen(false)}>HQ Pratapgarh</Link>
                                <Link to="/help/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                            </div>
                        </div>
                        
                        <div className="drawer-footer" style={{ border: 'none', padding: '16px 0 0' }}>
                            <Link to="/consultation/book" className="drawer-portal-btn" onClick={() => setIsMenuOpen(false)}>
                                Book Free Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <style>{`
                .project-navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 64px;
                    z-index: 3000;
                    padding: 0 40px;
                    background: var(--color-canvas, #ffffff);
                    border-bottom: 1px solid var(--color-hairline, #e6e6e6);
                    display: flex;
                    align-items: center;
                    transition: all 0.2s ease;
                }

                .project-navbar.scrolled {
                    background: var(--color-canvas);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-bottom: 1px solid var(--color-hairline);
                }

                .nav-container {
                    width: 100%;
                    max-width: 1440px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .nav-logo-section {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                }

                .nav-logo-box {
                    width: 38px;
                    height: 38px;
                    background: var(--color-surface-card);
                    border: 1px solid var(--color-hairline);
                    border-radius: 0px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: 0.2s;
                }

                .nav-logo-section:hover .nav-logo-box {
                    border-color: var(--color-primary);
                }

                .logo-text {
                    display: flex;
                    flex-direction: column;
                }

                .brand-name {
                    font-family: var(--font-corporate, 'Inter', sans-serif);
                    font-size: 0.98rem;
                    font-weight: 700;
                    letter-spacing: 0;
                    color: var(--color-ink);
                    line-height: 1.1;
                }

                .brand-sub {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.62rem;
                    font-weight: 700;
                    letter-spacing: 1.5px;
                    color: var(--color-primary);
                    margin-top: 2px;
                }

                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 28px;
                }

                .nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .nav-link-btn {
                    color: var(--color-ink);
                    text-decoration: none;
                    font-family: var(--font-corporate, 'Inter', sans-serif);
                    font-size: 14px;
                    font-weight: 400;
                    letter-spacing: 0.3px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    transition: color 0.15s ease;
                    padding: 8px 0;
                }

                .nav-link-btn:hover {
                    color: var(--color-primary);
                }

                .drop-icon {
                    transition: transform 0.25s;
                }

                .nav-dropdown:hover .drop-icon {
                    transform: rotate(180deg);
                    color: var(--color-primary);
                }

                .nav-portal-btn {
                    padding: 12px 28px;
                    border-radius: 0px;
                    background: var(--color-primary);
                    color: #ffffff;
                    text-decoration: none;
                    font-family: var(--font-corporate, 'Inter', sans-serif);
                    font-size: 14px;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                    border: none;
                    height: 44px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.15s ease;
                }

                .nav-portal-btn:hover {
                    background: var(--color-primary-active);
                }

                .nav-employee-btn {
                    background: rgba(28, 105, 212, 0.08) !important;
                    border: 1px solid rgba(28, 105, 212, 0.28) !important;
                    color: var(--color-primary, #1c69d4) !important;
                    margin-right: 6px;
                }

                .nav-employee-btn:hover {
                    background: rgba(28, 105, 212, 0.16) !important;
                    color: var(--color-primary-active, #0653b6) !important;
                }

                [data-theme='dark'] .nav-employee-btn,
                .dark-mode .nav-employee-btn {
                    background: rgba(99, 102, 241, 0.15) !important;
                    border: 1px solid rgba(99, 102, 241, 0.35) !important;
                    color: #c7d2fe !important;
                }

                [data-theme='dark'] .nav-employee-btn:hover,
                .dark-mode .nav-employee-btn:hover {
                    background: rgba(99, 102, 241, 0.28) !important;
                    color: #ffffff !important;
                }

                .employee-highlight-link {
                    color: var(--color-primary, #1c69d4) !important;
                    font-weight: 700;
                }

                [data-theme='dark'] .employee-highlight-link,
                .dark-mode .employee-highlight-link {
                    color: #818cf8 !important;
                }

                .theme-toggle-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 38px;
                    height: 38px;
                    background: var(--color-surface-soft, rgba(255, 255, 255, 0.05));
                    border: 1px solid var(--color-hairline, rgba(255, 255, 255, 0.15));
                    color: var(--color-ink, inherit);
                    border-radius: 0px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    flex-shrink: 0;
                }

                .theme-toggle-btn:hover {
                    border-color: var(--color-primary);
                    color: var(--color-primary);
                    transform: scale(1.05);
                }

                .maintenance-pill {
                    font-size: 10px;
                    padding: 2px 7px;
                    background: rgba(234, 179, 8, 0.16);
                    border: 1px solid rgba(234, 179, 8, 0.5);
                    color: #b45309;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    font-weight: 800;
                    margin-left: 8px;
                    display: inline-block;
                    line-height: 1.2;
                }

                [data-theme='dark'] .maintenance-pill {
                    background: rgba(234, 179, 8, 0.22);
                    border-color: rgba(234, 179, 8, 0.6);
                    color: #fbbf24;
                }

                .maintenance-pill-sm {
                    font-size: 9px;
                    padding: 1px 6px;
                    background: rgba(234, 179, 8, 0.18);
                    border: 1px solid rgba(234, 179, 8, 0.5);
                    color: #b45309;
                    text-transform: uppercase;
                    font-weight: 800;
                    margin-left: 8px;
                    line-height: 1.2;
                }

                [data-theme='dark'] .maintenance-pill-sm {
                    background: rgba(234, 179, 8, 0.25);
                    color: #fbbf24;
                }

                /* ── DROPDOWN STYLES ── */
                .nav-dropdown { position: relative; padding-bottom: 12px; margin-bottom: -12px; }


                .dropdown-content {
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%) translateY(12px);
                    background: var(--color-canvas, #ffffff);
                    border-radius: 0px;
                    min-width: 220px;
                    padding: 10px 0;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.2s ease;
                    box-shadow: none;
                    border: 1px solid var(--color-hairline, #e6e6e6);
                    pointer-events: none;
                }

                .nav-dropdown::after {
                    content: '';
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    height: 20px;
                    background: transparent;
                }

                .nav-dropdown:hover .dropdown-content { 
                    opacity: 1; 
                    visibility: visible; 
                    transform: translateX(-50%) translateY(0);
                    pointer-events: auto;
                }

                .dropdown-content a {
                    display: block;
                    padding: 9px 20px;
                    color: var(--halo-muted);
                    text-decoration: none;
                    font-size: 0.88rem;
                    font-weight: 600;
                    transition: 0.2s;
                }

                .dropdown-content a:hover { 
                    background: var(--halo-elevated); 
                    color: var(--halo-primary); 
                    padding-left: 24px; 
                }

                /* ── MEGA MENU ── */
                .mega-content {
                    min-width: 820px !important;
                    padding: 24px !important;
                    display: grid !important;
                    grid-template-columns: repeat(3, 1fr) !important;
                    gap: 16px !important;
                    left: 50% !important;
                    transform: translateX(-50%) translateY(12px) !important;
                }

                .mega-column {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .mega-col-title {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.65rem;
                    font-weight: 800;
                    letter-spacing: 1.5px;
                    color: var(--halo-primary);
                    margin-bottom: 8px;
                    padding-left: 8px;
                    text-transform: uppercase;
                }

                .mega-item {
                    display: flex !important;
                    align-items: flex-start !important;
                    gap: 12px !important;
                    padding: 8px 10px !important;
                    border-radius: 10px !important;
                    text-decoration: none !important;
                    transition: all 0.2s !important;
                    background: transparent !important;
                    border: 1px solid transparent !important;
                }

                .mega-item:hover {
                    background: var(--halo-elevated) !important;
                    border-color: var(--halo-border) !important;
                    transform: translateX(3px) !important;
                }

                .mega-item-name {
                    display: block;
                    font-size: 0.88rem;
                    font-weight: 700;
                    color: var(--halo-on-surface);
                    line-height: 1.25;
                }

                .mega-item-sub {
                    display: block;
                    font-size: 0.72rem;
                    color: var(--halo-muted);
                    line-height: 1.3;
                    margin-top: 2px;
                    font-weight: 500;
                }

                /* Hamburger */
                .hamburger-box {
                    display: none;
                    width: 38px;
                    height: 38px;
                    padding: 0;
                    background: var(--color-surface-soft);
                    border: 1px solid var(--color-hairline);
                    border-radius: 0px;
                    cursor: pointer;
                    align-items: center;
                    justify-content: center;
                }

                .hamburger-inner, .hamburger-inner::before, .hamburger-inner::after {
                    width: 18px;
                    height: 2px;
                    background-color: var(--color-ink);
                    border-radius: 0px;
                    position: absolute;
                    transition: all 0.25s ease;
                }

                .hamburger-inner { position: relative; }
                .hamburger-inner::before { content: ''; top: -6px; left: 0; }
                .hamburger-inner::after { content: ''; top: 6px; left: 0; }

                .hamburger-box.active .hamburger-inner { background-color: transparent; }
                .hamburger-box.active .hamburger-inner::before { transform: translateY(6px) rotate(45deg); }
                .hamburger-box.active .hamburger-inner::after { transform: translateY(-6px) rotate(-45deg); }

                /* Drawer */
                .drawer-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px);
                    z-index: 3998;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }
                .drawer-backdrop.open { opacity: 1; visibility: visible; }

                .side-drawer {
                    position: fixed;
                    top: 0;
                    right: -320px;
                    width: 320px;
                    max-width: 85vw;
                    height: 100vh;
                    background: var(--color-canvas);
                    z-index: 3999;
                    box-shadow: none;
                    border-left: 1px solid var(--color-hairline);
                    transition: right 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                    display: flex;
                    flex-direction: column;
                }
                .side-drawer.open { right: 0; }

                .drawer-header {
                    padding: 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid var(--color-hairline);
                }
                .drawer-title {
                    font-size: 0.8rem;
                    font-weight: 800;
                    letter-spacing: 1.5px;
                    color: var(--color-primary);
                }

                .drawer-content {
                    padding: 24px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    flex: 1;
                }

                .drawer-section label {
                    display: block;
                    font-size: 0.7rem;
                    font-weight: 800;
                    letter-spacing: 1.5px;
                    color: var(--color-muted);
                    margin-bottom: 12px;
                }

                .drawer-main-link {
                    font-size: 1.1rem;
                    font-weight: 800;
                    color: var(--color-ink);
                    text-decoration: none;
                }

                .drawer-links {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .drawer-links a {
                    font-size: 0.95rem;
                    color: var(--color-body);
                    text-decoration: none;
                    transition: 0.2s;
                }

                .drawer-links a:hover {
                    color: var(--color-primary);
                    padding-left: 4px;
                }

                .drawer-portal-btn {
                    display: block;
                    text-align: center;
                    padding: 14px 28px;
                    border-radius: 0px;
                    background: var(--color-primary, #1c69d4);
                    color: #fff;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                    font-size: 14px;
                    text-decoration: none;
                    transition: background-color 0.15s ease;
                }
                .drawer-portal-btn:hover {
                    background: var(--color-primary-active, #0653b6);
                }

                @media (max-width: 992px) {
                    .desktop-only { display: none !important; }
                    .hamburger-box { display: flex !important; }
                    .project-navbar { padding: 0 20px !important; }
                }
            `}</style>
        </>
    );
};

export default ProjectNavbar;
