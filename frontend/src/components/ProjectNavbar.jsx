import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Zap, Menu, X, ChevronDown, Shield, ArrowRight, Globe, Layers, Mail } from 'lucide-react';

const ProjectNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    return (
        <>
            <nav className={`project-navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-container">
                    <div className="nav-logo-section" onClick={() => navigate('/')}>
                        <div className="nav-logo-box" style={{ overflow: 'hidden', padding: 0 }}>
                            <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                 onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                            <svg viewBox="0 0 100 100" className="company-logo-svg" style={{ display: 'none' }}>
                                <path d="M 5 20 L 95 20 L 50 45 Z" fill="#fff" />
                                <path d="M 2 28 L 46 53 L 46 95 Z" fill="#fff" />
                                <path d="M 98 28 L 54 53 L 54 95 Z" fill="#fff" />
                            </svg>
                        </div>
                        <div className="logo-text">
                            <span className="brand-name">VP GROUP</span>
                            <span className="brand-sub">ENGINEERING</span>
                        </div>
                    </div>
                    
                    {/* Desktop Links */}
                    <div className="nav-links desktop-only">
                        <Link to="/" className="nav-link-btn">Home</Link>
                        
                        <div className="nav-dropdown">
                            <button className="nav-link-btn">Services <ChevronDown size={12} className="drop-icon" /></button>
                            <div className="dropdown-content">
                                <Link to="/services/web-development">Web Development</Link>
                                <Link to="/services/software-engineering">Software Engineering</Link>
                                <Link to="/services/technical-support">Technical Support</Link>
                                <Link to="/services/it-consultation">IT Consultation</Link>
                                <Link to="/services/custom-ui-ux">Custom UI/UX</Link>
                            </div>
                        </div>

                        <div className="nav-dropdown">
                            <button className="nav-link-btn">Clients <ChevronDown size={12} className="drop-icon" /></button>
                            <div className="dropdown-content">
                                <Link to="/clients/mother-bliss">Mother Bliss</Link>
                                <Link to="/clients/institutional">Institutional</Link>
                                <Link to="/clients/global-partners">Global Partners</Link>
                            </div>
                        </div>

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
                        
                        <Link to="/consultation/book" className="nav-portal-btn" style={{ marginLeft: '16px', background: 'linear-gradient(135deg, #ff4ef0, #8b5cf6)', color: '#fff' }}>
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

                {/* Standard Side Drawer (Not Full Screen) */}
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
                                <Link to="/services/web-development">Web Development</Link>
                                <Link to="/services/software-engineering">Software Engineering</Link>
                                <Link to="/services/technical-support">Technical Support</Link>
                            </div>
                        </div>

                        <div className="drawer-section">
                            <label>RESOURCES</label>
                            <div className="drawer-links">
                                <Link to="/our-strategy">Our Strategy</Link>
                                <Link to="/help/portfolio">Portfolio</Link>
                                <Link to="/help/partners">Partners</Link>
                                <Link to="/help/contact">Contact Us</Link>
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
                    right: 0;
                    z-index: 3000;
                    padding: 32px 0;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    background: transparent;
                }
                .project-navbar.scrolled {
                    background: rgba(3, 7, 18, 0.85);
                    backdrop-filter: blur(25px);
                    padding: 16px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }
                .nav-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 5%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .nav-logo-section {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    cursor: pointer;
                    transition: 0.3s;
                }
                .nav-logo-section:hover { transform: scale(1.02); }
                .nav-logo-box {
                    width: 44px;
                    height: 44px;
                    background: linear-gradient(135deg, #ff4ef0, #8b5cf6);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 8px 16px rgba(255, 78, 240, 0.2);
                }
                .company-logo-svg { width: 24px; height: 24px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)); }
                .brand-name { fontWeight: 950; fontSize: 1.3rem; color: #fff; line-height: 1; letter-spacing: -1px; }
                .brand-sub { fontSize: 0.6rem; fontWeight: 900; color: #ff4ef0; letterSpacing: 4px; marginTop: 4px; display: block; opacity: 0.9; }

                .nav-links { display: flex; gap: 40px; align-items: center; }
                .nav-link-btn {
                    background: none;
                    border: none;
                    color: #94a3b8;
                    font-size: 0.85rem;
                    fontWeight: 800;
                    cursor: pointer;
                    text-decoration: none;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    position: relative;
                    padding: 8px 0;
                    transition: 0.3s;
                }
                .nav-link-btn::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: #ff4ef0;
                    transition: 0.3s ease;
                }
                .nav-link-btn:hover { color: #fff; }
                .nav-link-btn:hover::after { width: 100%; }
                .drop-icon { transition: 0.3s; }
                .nav-dropdown:hover .drop-icon { transform: rotate(180deg); color: #ff4ef0; }

                .nav-portal-btn {
                    padding: 12px 28px;
                    background: #fff;
                    color: #030712;
                    border: none;
                    border-radius: 10px;
                    fontWeight: 950;
                    font-size: 0.8rem;
                    cursor: pointer;
                    transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 12px rgba(255,255,255,0.1);
                    letter-spacing: 1px;
                }
                .nav-portal-btn:hover {
                    transform: translateY(-3px);
                    background: #ff4ef0;
                    color: #fff;
                    box-shadow: 0 15px 30px rgba(255, 78, 240, 0.4);
                }

                .nav-dropdown { position: relative; padding-bottom: 15px; margin-bottom: -15px; }
                .dropdown-content {
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%) translateY(20px);
                    background: rgba(15, 23, 42, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 16px;
                    min-width: 240px;
                    padding: 16px 0;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 30px 60px rgba(0,0,0,0.8);
                    border: 1px solid rgba(255,255,255,0.1);
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
                    padding: 14px 28px;
                    color: #94a3b8;
                    text-decoration: none;
                    font-size: 0.9rem;
                    fontWeight: 700;
                    transition: 0.3s;
                }
                .dropdown-content a:hover { 
                    background: rgba(255, 78, 240, 0.08); 
                    color: #ff4ef0; 
                    padding-left: 36px; 
                }

                /* Standard Hamburger */
                .hamburger-box {
                    display: none;
                    width: 40px;
                    height: 40px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 10px;
                    cursor: pointer;
                    position: relative;
                    z-index: 3200;
                    transition: 0.3s;
                }
                .hamburger-box:hover { background: rgba(255,255,255,0.08); }
                .hamburger-inner {
                    position: absolute;
                    width: 24px;
                    height: 2px;
                    background: #fff;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    transition: 0.3s;
                }
                .hamburger-inner::before, .hamburger-inner::after {
                    content: '';
                    position: absolute;
                    width: 24px;
                    height: 2px;
                    background: #fff;
                    left: 0;
                    transition: 0.3s;
                }
                .hamburger-inner::before { top: -8px; }
                .hamburger-inner::after { top: 8px; }
                .hamburger-box.active .hamburger-inner { background: transparent; }
                .hamburger-box.active .hamburger-inner::before { transform: rotate(45deg); top: 0; }
                .hamburger-box.active .hamburger-inner::after { transform: rotate(-45deg); top: 0; }

                /* Standard Side Drawer */
                .drawer-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(8px);
                    opacity: 0;
                    visibility: hidden;
                    transition: 0.4s;
                    z-index: 2800;
                }
                .drawer-backdrop.open { opacity: 1; visibility: visible; }

                .side-drawer {
                    position: fixed;
                    top: 0;
                    right: -340px;
                    width: 320px;
                    height: 100vh;
                    background: #030712;
                    border-left: 1px solid rgba(255, 255, 255, 0.08);
                    z-index: 2900;
                    transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    flex-direction: column;
                    box-shadow: -20px 0 50px rgba(0,0,0,0.5);
                }
                .side-drawer.open { right: 0; }
                
                .drawer-header {
                    padding: 32px 24px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .drawer-title { font-size: 0.75rem; font-weight: 950; color: #64748b; letter-spacing: 3px; }
                .close-drawer { width: 40px; height: 40px; background: rgba(255,255,255,0.03); border: none; border-radius: 10px; color: #94a3b8; cursor: pointer; transition: 0.3s; }
                .close-drawer:hover { background: rgba(255,255,255,0.08); color: #fff; }

                .drawer-content { padding: 40px 24px; flex: 1; overflow-y: auto; }
                .drawer-section { margin-bottom: 48px; }
                .drawer-section label { display: block; font-size: 0.7rem; font-weight: 950; color: #475569; letter-spacing: 2px; margin-bottom: 24px; text-transform: uppercase; }
                .drawer-main-link { font-size: 1.8rem; font-weight: 950; color: #fff; text-decoration: none; letter-spacing: -1px; transition: 0.3s; }
                .drawer-main-link:hover { color: #ff4ef0; }
                .drawer-links { display: flex; flex-direction: column; gap: 20px; }
                .drawer-links a { font-size: 1.1rem; font-weight: 800; color: #94a3b8; text-decoration: none; transition: 0.3s; }
                .drawer-links a:hover { color: #fff; transform: translateX(10px); }

                .drawer-footer { padding: 32px 24px; border-top: 1px solid rgba(255, 255, 255, 0.08); }
                .drawer-portal-btn {
                    width: 100%;
                    padding: 20px;
                    background: linear-gradient(135deg, #ff4ef0, #8b5cf6);
                    color: #fff;
                    border: none;
                    border-radius: 16px;
                    font-weight: 950;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    transition: 0.4s;
                    box-shadow: 0 10px 20px rgba(255, 78, 240, 0.2);
                    letter-spacing: 1px;
                }
                .drawer-portal-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(255, 78, 240, 0.4); }

                @media (max-width: 1024px) {
                    .desktop-only { display: none; }
                    .hamburger-box { display: block; }
                }
            `}</style>
        </>
    );
};

export default ProjectNavbar;
