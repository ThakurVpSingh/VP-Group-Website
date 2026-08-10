import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Zap, Menu, X, ChevronDown, Shield, ArrowRight, Globe, Layers, Mail,
  Sparkles, Terminal, Users, Activity, Cpu, ShieldCheck 
} from 'lucide-react';
import Logo from './Logo';

const ProjectNavbar = ({ scrollY: propScrollY }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [localScrollY, setLocalScrollY] = useState(0);

    useEffect(() => {
        if (propScrollY !== undefined) return;
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            setLocalScrollY(window.scrollY);
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
            <nav className={`project-navbar ${isScrolled ? 'scrolled' : ''} ${propScrollY !== undefined ? 'light-theme' : ''}`}>
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
                        
                        {/* ── SERVICES MULTI-COLUMN HORIZONTAL MEGA MENU ── */}
                        <div className="nav-dropdown mega-dropdown">
                            <button className="nav-link-btn">Services <ChevronDown size={12} className="drop-icon" /></button>
                            <div className="dropdown-content mega-content">
                                {/* Column 1: AI & Core Software */}
                                <div className="mega-column">
                                    <div className="mega-col-title">AI & CORE SOFTWARE</div>
                                    <Link to="/services/ai-automation" className="mega-item">
                                        <Sparkles size={16} color="#FF3A5C" />
                                        <div>
                                            <span className="mega-item-name">AI & Automation</span>
                                            <span className="mega-item-sub">LLM Agents & RAG Pipelines</span>
                                        </div>
                                    </Link>
                                    <Link to="/services/saas-development" className="mega-item">
                                        <Layers size={16} color="#5B6BFF" />
                                        <div>
                                            <span className="mega-item-name">SaaS Development</span>
                                            <span className="mega-item-sub">Multi-tenant & Billing Engine</span>
                                        </div>
                                    </Link>
                                    <Link to="/services/software-engineering" className="mega-item">
                                        <Terminal size={16} color="#3DD7E5" />
                                        <div>
                                            <span className="mega-item-name">Custom Software & ERP</span>
                                            <span className="mega-item-sub">Enterprise System Core</span>
                                        </div>
                                    </Link>
                                    <Link to="/services/crm-development" className="mega-item">
                                        <Users size={16} color="#2BE08C" />
                                        <div>
                                            <span className="mega-item-name">CRM Development</span>
                                            <span className="mega-item-sub">AI Lead Scoring & Pipelines</span>
                                        </div>
                                    </Link>
                                </div>

                                {/* Column 2: Web & Digital Growth */}
                                <div className="mega-column">
                                    <div className="mega-col-title">WEB & DIGITAL GROWTH</div>
                                    <Link to="/services/web-development" className="mega-item">
                                        <Globe size={16} color="#2BE08C" />
                                        <div>
                                            <span className="mega-item-name">Website Development</span>
                                            <span className="mega-item-sub">React & Next.js Ecosystem</span>
                                        </div>
                                    </Link>
                                    <Link to="/services/seo-analytics-setup" className="mega-item">
                                        <Activity size={16} color="#F5D547" />
                                        <div>
                                            <span className="mega-item-name">SEO & Analytics</span>
                                            <span className="mega-item-sub">GA4 & Search Intelligence</span>
                                        </div>
                                    </Link>
                                    <Link to="/services/digital-marketing" className="mega-item">
                                        <Zap size={16} color="#FF3A5C" />
                                        <div>
                                            <span className="mega-item-name">Digital Marketing</span>
                                            <span className="mega-item-sub">Paid Performance & CRO</span>
                                        </div>
                                    </Link>
                                    <Link to="/services/custom-ui-ux" className="mega-item">
                                        <Layers size={16} color="#3DD7E5" />
                                        <div>
                                            <span className="mega-item-name">Custom UI/UX Design</span>
                                            <span className="mega-item-sub">Prototyping & Design Systems</span>
                                        </div>
                                    </Link>
                                </div>

                                {/* Column 3: Cloud & Security Ops */}
                                <div className="mega-column">
                                    <div className="mega-col-title">CLOUD & SECURITY OPS</div>
                                    <Link to="/services/cybersecurity" className="mega-item">
                                        <Shield size={16} color="#FF3A5C" />
                                        <div>
                                            <span className="mega-item-name">Cybersecurity Mesh</span>
                                            <span className="mega-item-sub">Zero-Trust & Pentesting</span>
                                        </div>
                                    </Link>
                                    <Link to="/services/cloud-devops" className="mega-item">
                                        <Cpu size={16} color="#3DD7E5" />
                                        <div>
                                            <span className="mega-item-name">Cloud & DevOps</span>
                                            <span className="mega-item-sub">Kubernetes & CI/CD Pipelines</span>
                                        </div>
                                    </Link>
                                    <Link to="/services/technical-support" className="mega-item">
                                        <ShieldCheck size={16} color="#5B6BFF" />
                                        <div>
                                            <span className="mega-item-name">24/7 Technical Support</span>
                                            <span className="mega-item-sub">Dedicated SLA Monitoring</span>
                                        </div>
                                    </Link>
                                    <Link to="/services/it-consultation" className="mega-item">
                                        <Globe size={16} color="#F5D547" />
                                        <div>
                                            <span className="mega-item-name">IT Consultation</span>
                                            <span className="mega-item-sub">Tech Strategy & Cloud Audit</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Clients Dropdown */}
                        <div className="nav-dropdown">
                            <button className="nav-link-btn">Clients <ChevronDown size={12} className="drop-icon" /></button>
                            <div className="dropdown-content">
                                <Link to="/clients/mother-bliss">Mother Bliss</Link>
                                <Link to="/clients/institutional">Institutional</Link>
                                <Link to="/clients/global-partners">Global Partners</Link>
                            </div>
                        </div>

                        {/* Help Dropdown */}
                        <div className="nav-dropdown">
                            <button className="nav-link-btn">Help <ChevronDown size={12} className="drop-icon" /></button>
                            <div className="dropdown-content">
                                <Link to="/help/contact">Contact Us</Link>
                                <Link to="/help/hq-pratapgarh">HQ Pratapgarh</Link>
                                <Link to="/help/portfolio">Portfolio</Link>
                                <Link to="/help/partners">Partners</Link>
                            </div>
                        </div>

                        <Link to="/our-strategy" className="nav-link-btn">Our Strategy</Link>
                        
                        <Link to="/consultation/book" className="nav-portal-btn" style={{ marginLeft: '16px' }}>
                            Book Consultation
                        </Link>
                    </div>

                    {/* Standard Hamburger Toggle */}
                    <button 
                        className={`hamburger-box ${isMenuOpen ? 'active' : ''}`} 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <div className="hamburger-inner"></div>
                    </button>
                </div>

                {/* Standard Side Drawer (Mobile) */}
                <div className={`drawer-backdrop ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(false)}></div>
                
                <div className={`side-drawer ${isMenuOpen ? 'open' : ''}`}>
                    <div className="drawer-header">
                        <span className="drawer-title">NAVIGATION</span>
                    </div>
                    
                    <div className="drawer-content">
                        <div className="drawer-section">
                            <Link to="/" className="drawer-main-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        </div>

                        <div className="drawer-section">
                            <label>OUR SERVICES</label>
                            <div className="drawer-links">
                                <Link to="/services/ai-automation" onClick={() => setIsMenuOpen(false)}>AI & Automation</Link>
                                <Link to="/services/saas-development" onClick={() => setIsMenuOpen(false)}>SaaS Development</Link>
                                <Link to="/services/software-engineering" onClick={() => setIsMenuOpen(false)}>Software Engineering</Link>
                                <Link to="/services/web-development" onClick={() => setIsMenuOpen(false)}>Web Development</Link>
                                <Link to="/services/seo-analytics-setup" onClick={() => setIsMenuOpen(false)}>SEO & Analytics</Link>
                                <Link to="/services/digital-marketing" onClick={() => setIsMenuOpen(false)}>Digital Marketing</Link>
                                <Link to="/services/crm-development" onClick={() => setIsMenuOpen(false)}>CRM Development</Link>
                                <Link to="/services/cybersecurity" onClick={() => setIsMenuOpen(false)}>Cybersecurity Mesh</Link>
                                <Link to="/services/cloud-devops" onClick={() => setIsMenuOpen(false)}>Cloud & DevOps</Link>
                                <Link to="/services/technical-support" onClick={() => setIsMenuOpen(false)}>Technical Support</Link>
                                <Link to="/services/it-consultation" onClick={() => setIsMenuOpen(false)}>IT Consultation</Link>
                                <Link to="/services/custom-ui-ux" onClick={() => setIsMenuOpen(false)}>Custom UI/UX Design</Link>
                            </div>
                        </div>

                        <div className="drawer-section">
                            <label>CLIENTS</label>
                            <div className="drawer-links">
                                <Link to="/clients/mother-bliss" onClick={() => setIsMenuOpen(false)}>Mother Bliss</Link>
                                <Link to="/clients/institutional" onClick={() => setIsMenuOpen(false)}>Institutional</Link>
                                <Link to="/clients/global-partners" onClick={() => setIsMenuOpen(false)}>Global Partners</Link>
                            </div>
                        </div>

                        <div className="drawer-section">
                            <label>RESOURCES</label>
                            <div className="drawer-links">
                                <Link to="/our-strategy" onClick={() => setIsMenuOpen(false)}>Our Strategy</Link>
                                <Link to="/help/portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio</Link>
                                <Link to="/help/partners" onClick={() => setIsMenuOpen(false)}>Partners</Link>
                                <Link to="/help/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                            </div>
                        </div>
                        
                        <div className="drawer-footer" style={{ border: 'none', padding: 0 }}>
                            <Link to="/consultation/book" className="drawer-portal-btn" onClick={() => setIsMenuOpen(false)}>
                                Book Consultation
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
                    z-index: 3000;
                    padding: 20px 40px;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    background: transparent;
                }

                .project-navbar.scrolled {
                    padding: 12px 40px;
                    background: rgba(10, 11, 15, 0.85);
                    backdrop-filter: blur(20px) saturate(180%);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                }

                .nav-container {
                    max-width: 1300px;
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
                    width: 42px;
                    height: 42px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: 0.3s;
                }

                .nav-logo-section:hover .nav-logo-box {
                    border-color: #5B6BFF;
                    box-shadow: 0 0 20px rgba(91, 107, 255, 0.3);
                }

                .logo-text {
                    display: flex;
                    flex-direction: column;
                }

                .brand-name {
                    font-size: 1rem;
                    font-weight: 900;
                    letter-spacing: -0.02em;
                    color: #F2F4F8;
                    line-height: 1;
                }

                .brand-sub {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.6rem;
                    font-weight: 700;
                    letterSpacing: 2px;
                    color: #5B6BFF;
                    margin-top: 3px;
                }

                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 32px;
                }

                .nav-link-btn {
                    color: #94A3B8;
                    text-decoration: none;
                    font-size: 0.88rem;
                    font-weight: 700;
                    letter-spacing: 0.3px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    transition: 0.25s;
                    padding: 8px 0;
                }

                .nav-link-btn:hover {
                    color: #F2F4F8;
                }

                .drop-icon {
                    transition: transform 0.3s;
                }

                .nav-dropdown:hover .drop-icon {
                    transform: rotate(180deg);
                    color: #5B6BFF;
                }

                .nav-portal-btn {
                    padding: 10px 22px;
                    border-radius: 25px;
                    background: linear-gradient(135deg, #5B6BFF, #3DD7E5);
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 0.82rem;
                    font-weight: 800;
                    letter-spacing: 0.5px;
                    box-shadow: 0 4px 15px rgba(91, 107, 255, 0.3);
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .nav-portal-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(61, 215, 229, 0.4);
                }

                /* ── DROPDOWN STYLES ── */
                .nav-dropdown { position: relative; padding-bottom: 15px; margin-bottom: -15px; }

                .dropdown-content {
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%) translateY(15px);
                    background: rgba(13, 15, 23, 0.96);
                    backdrop-filter: blur(24px) saturate(180%);
                    border-radius: 20px;
                    min-width: 240px;
                    padding: 12px 0;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    box-shadow: 0 30px 70px rgba(0,0,0,0.8), 0 0 30px rgba(91, 107, 255, 0.12);
                    border: 1px solid rgba(91, 107, 255, 0.25);
                    pointer-events: none;
                }

                .nav-dropdown::after {
                    content: '';
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    height: 25px;
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
                    padding: 10px 24px;
                    color: #94a3b8;
                    text-decoration: none;
                    font-size: 0.85rem;
                    font-weight: 700;
                    transition: 0.25s;
                }

                .dropdown-content a:hover { 
                    background: rgba(91, 107, 255, 0.1); 
                    color: #3DD7E5; 
                    padding-left: 28px; 
                }

                /* ── MULTI-COLUMN HORIZONTAL MEGA MENU (Services) ── */
                .mega-content {
                    min-width: 760px !important;
                    padding: 24px !important;
                    display: grid !important;
                    grid-template-columns: repeat(3, 1fr) !important;
                    gap: 16px !important;
                    left: 50% !important;
                    transform: translateX(-50%) translateY(15px) !important;
                }

                .mega-column {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .mega-col-title {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.62rem;
                    font-weight: 800;
                    letter-spacing: 1.5px;
                    color: #5B6BFF;
                    margin-bottom: 8px;
                    padding-left: 6px;
                    text-transform: uppercase;
                }

                .mega-item {
                    display: flex !important;
                    align-items: center !important;
                    gap: 12px !important;
                    padding: 8px 10px !important;
                    border-radius: 12px !important;
                    text-decoration: none !important;
                    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
                    background: transparent !important;
                    border: 1px solid transparent !important;
                }

                .mega-item:hover {
                    background: rgba(91, 107, 255, 0.1) !important;
                    border-color: rgba(91, 107, 255, 0.25) !important;
                    transform: translateX(3px) !important;
                    padding-left: 12px !important;
                }

                .mega-item-name {
                    display: block;
                    font-size: 0.8rem;
                    font-weight: 800;
                    color: #F2F4F8;
                    line-height: 1.25;
                }

                .mega-item-sub {
                    display: block;
                    font-size: 0.65rem;
                    color: #64748b;
                    line-height: 1.2;
                    margin-top: 2px;
                    font-weight: 500;
                }

                /* Mobile Side Drawer */
                .hamburger-box {
                    display: none;
                    width: 42px;
                    height: 42px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 10px;
                    cursor: pointer;
                    position: relative;
                    z-index: 3200;
                    transition: 0.3s;
                }

                @media (max-width: 992px) {
                    .desktop-only { display: none !important; }
                    .hamburger-box { display: flex; align-items: center; justify-content: center; }
                    .project-navbar { padding: 16px 20px; }
                }

                .drawer-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.7);
                    backdrop-filter: blur(8px);
                    z-index: 3050;
                    opacity: 0;
                    pointer-events: none;
                    transition: 0.3s;
                }

                .drawer-backdrop.open {
                    opacity: 1;
                    pointer-events: auto;
                }

                .side-drawer {
                    position: fixed;
                    top: 0;
                    right: -320px;
                    width: 300px;
                    height: 100vh;
                    background: rgba(13, 15, 23, 0.98);
                    border-left: 1px solid rgba(255,255,255,0.1);
                    z-index: 3100;
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    padding: 32px 24px;
                    display: flex;
                    flex-direction: column;
                    overflow-y: auto;
                }

                .side-drawer.open {
                    transform: translateX(-320px);
                }

                .drawer-header {
                    margin-bottom: 28px;
                    padding-bottom: 16px;
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                }

                .drawer-title {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.7rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    color: #5B6BFF;
                }

                .drawer-section {
                    margin-bottom: 24px;
                }

                .drawer-section label {
                    display: block;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.65rem;
                    font-weight: 700;
                    letter-spacing: 1.5px;
                    color: #64748b;
                    margin-bottom: 12px;
                    text-transform: uppercase;
                }

                .drawer-main-link {
                    font-size: 1.1rem;
                    font-weight: 800;
                    color: #F2F4F8;
                    text-decoration: none;
                }

                .drawer-links {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .drawer-links a {
                    color: #94A3B8;
                    text-decoration: none;
                    font-size: 0.85rem;
                    font-weight: 600;
                    transition: 0.2s;
                }

                .drawer-links a:hover {
                    color: #3DD7E5;
                }

                .drawer-portal-btn {
                    display: block;
                    text-align: center;
                    padding: 12px;
                    border-radius: 20px;
                    background: linear-gradient(135deg, #5B6BFF, #3DD7E5);
                    color: #fff;
                    font-weight: 800;
                    text-decoration: none;
                    font-size: 0.85rem;
                    margin-top: 16px;
                }

                /* Light theme overrides */
                .project-navbar.light-theme .nav-link-btn {
                    color: #000000;
                }
                .project-navbar.light-theme .nav-link-btn:hover {
                    color: #5B6BFF;
                }
                .project-navbar.light-theme.scrolled {
                    background: rgba(246, 245, 242, 0.85);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
                }
                .project-navbar.light-theme .logo-text .brand-name {
                    color: #000000;
                }
                .project-navbar.light-theme .logo-text .brand-sub {
                    color: #5C6170;
                }
                .project-navbar.light-theme .nav-logo-box {
                    background: rgba(0, 0, 0, 0.02);
                    border: 1px solid rgba(0, 0, 0, 0.08);
                    box-shadow: none;
                }
                .project-navbar.light-theme .nav-dropdown .dropdown-content {
                    background: #FAF9F6;
                    border: 1px solid rgba(0, 0, 0, 0.08);
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
                }
                .project-navbar.light-theme .mega-item-name {
                    color: #000000;
                }
                .project-navbar.light-theme .mega-item-sub {
                    color: #64748b;
                }
                .project-navbar.light-theme .nav-dropdown .dropdown-content a {
                    color: #5C6170;
                }
                .project-navbar.light-theme .nav-dropdown .dropdown-content a:hover {
                    color: #000000;
                    background: rgba(0, 0, 0, 0.04);
                }
            `}</style>
        </>
    );
};

export default ProjectNavbar;
