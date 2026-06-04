import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectNavbar from '../components/ProjectNavbar';
import Footer from '../components/Footer';
import { 
  Globe, 
  Shield, 
  Terminal, 
  Zap, 
  ArrowLeft, 
  CheckCircle2, 
  Activity, 
  Clock, 
  ShoppingBag, 
  GraduationCap, 
  HeartPulse, 
  Sparkles, 
  Laptop,
  Check
} from 'lucide-react';

const GlobalPartnersPage = () => {
    useEffect(() => {
        document.title = "Global Engagements Spotlight | VP Group";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ background: '#030712', color: '#fff', minHeight: '100vh', fontFamily: "'Outfit', 'Inter', sans-serif", overflowX: 'hidden' }}>
            <ProjectNavbar />
            
            {/* Glow Background Elements */}
            <div className="bg-glow bg-glow-left"></div>
            <div className="bg-glow bg-glow-right"></div>
            
            {/* Hero Section */}
            <section style={{ 
                padding: '180px 5% 80px', 
                textAlign: 'center', 
                position: 'relative',
                background: 'radial-gradient(circle at 50% 50%, rgba(255, 78, 240, 0.03) 0%, transparent 70%)'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.15, zIndex: 0, pointerEvents: 'none' }}>
                    <svg width="100%" height="100%" style={{ position: 'absolute' }}>
                        <pattern id="grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255, 78, 240, 0.08)" strokeWidth="1"/>
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                    </svg>
                </div>

                <div className="animate-fade-in" style={{ position: 'relative', zIndex: 1, maxWidth: '950px', margin: '0 auto' }}>
                    <Link to="/" className="back-link">
                        <ArrowLeft size={14} /> BACK TO OPERATIONS CONTROL
                    </Link>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 4.8rem)', fontWeight: '950', marginBottom: '24px', letterSpacing: '-3px', lineHeight: 1 }}>
                        Global Freelance & Startup <br/>
                        <span className="text-gradient">Collaborations.</span>
                    </h1>
                    <p style={{ fontSize: 'clamp(1.05rem, 3vw, 1.25rem)', color: '#94a3b8', maxWidth: '750px', margin: '0 auto', lineHeight: 1.7 }}>
                        Partnering with high-velocity startups and clients across Canada, Australia, the USA, and India to engineer next-generation Full-Stack applications, interactive 3D visual experiences, and robust digital architecture.
                    </p>
                </div>
            </section>

            <main style={{ padding: '0 5% 120px', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                <div className="gp-main-grid">
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
                        
                        {/* Interactive Geographic Engagements */}
                        <section>
                            <div className="section-header">
                                <div className="badge-dna">PROJECT FOOTPRINT</div>
                                <h2>Geographic Showcase</h2>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                                
                                {/* Canada Card */}
                                <div className="glass-panel gp-card hover-glow-canada">
                                    <div className="gp-card-header">
                                        <div className="flag-badge canada-color">CANADA</div>
                                        <div className="gp-card-title-area">
                                            <h3>Dynamic Storefront E-Commerce Ecosystem</h3>
                                            <p className="gp-sub">Retail & Digital Storefront Optimization</p>
                                        </div>
                                        <div className="gp-icon-wrapper canada-color-bg">
                                            <ShoppingBag size={24} />
                                        </div>
                                    </div>
                                    <p className="gp-desc">
                                        Engineered a robust online store system optimized for local and digital customer journeys, empowering administrators with zero-latency product lifecycle control.
                                    </p>
                                    <div className="feature-grid">
                                        <div className="feature-item">
                                            <CheckCircle2 size={16} />
                                            <span>Store Visit Scheduler (Direct physical store appointment booking)</span>
                                        </div>
                                        <div className="feature-item">
                                            <CheckCircle2 size={16} />
                                            <span>Online Returns & Exchanges (Automated logistics booking)</span>
                                        </div>
                                        <div className="feature-item">
                                            <CheckCircle2 size={16} />
                                            <span>Integrated Payment Gateway (Secured E-Commerce checkout)</span>
                                        </div>
                                        <div className="feature-item">
                                            <CheckCircle2 size={16} />
                                            <span>Real-Time Catalog Panel (Daily batch updates by product managers)</span>
                                        </div>
                                    </div>
                                    <div className="tech-badge-container">
                                        {['MERN Stack', 'React.js', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'TailwindCSS'].map(tech => (
                                            <span key={tech} className="tech-badge">{tech}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Australia & USA Card */}
                                <div className="glass-panel gp-card hover-glow-aus-usa">
                                    <div className="gp-card-header">
                                        <div className="flag-badge aus-usa-color">AUSTRALIA & USA</div>
                                        <div className="gp-card-title-area">
                                            <h3>Academic Research & Publishing SaaS</h3>
                                            <p className="gp-sub">EdTech & SaaS Architecture Collaborations</p>
                                        </div>
                                        <div className="gp-icon-wrapper aus-usa-color-bg">
                                            <GraduationCap size={24} />
                                        </div>
                                    </div>
                                    <p className="gp-desc">
                                        Architected publishing frameworks and digital portfolio spaces for schools/colleges to host student research papers, highlight projects, and manage subscription distributions.
                                    </p>
                                    <div className="feature-grid">
                                        <div className="feature-item">
                                            <CheckCircle2 size={16} />
                                            <span>Research Paper Publishing (Granular academic formatting and indexing)</span>
                                        </div>
                                        <div className="feature-item">
                                            <CheckCircle2 size={16} />
                                            <span>Student Interactive Portfolios (Dynamic profiles highlighting project outputs)</span>
                                        </div>
                                        <div className="feature-item">
                                            <CheckCircle2 size={16} />
                                            <span>Multi-Tenant SaaS (Custom dashboards for institutional control)</span>
                                        </div>
                                    </div>
                                    <div className="tech-badge-container">
                                        {['Java', 'WordPress', 'JavaScript', 'Spring Boot', 'SaaS Model', 'REST APIs'].map(tech => (
                                            <span key={tech} className="tech-badge">{tech}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* India Card */}
                                <div className="glass-panel gp-card hover-glow-india">
                                    <div className="gp-card-header">
                                        <div className="flag-badge india-color">INDIA (BENGALURU & LUCKNOW)</div>
                                        <div className="gp-card-title-area">
                                            <h3>Comprehensive Clinic Management Mesh</h3>
                                            <p className="gp-sub">HealthTech & Resource Planning Systems</p>
                                        </div>
                                        <div className="gp-icon-wrapper india-color-bg">
                                            <HeartPulse size={24} />
                                        </div>
                                    </div>
                                    <p className="gp-desc">
                                        Developed a MERN-based management dashboard for healthcare clinics, enabling patient onboarding and administrative workforce automation.
                                    </p>
                                    <div className="feature-grid">
                                        <div className="feature-item">
                                            <CheckCircle2 size={16} />
                                            <span>Appointment Booking Console (Online doctor matchmaking and scheduling)</span>
                                        </div>
                                        <div className="feature-item">
                                            <CheckCircle2 size={16} />
                                            <span>Payment Portal Integration (Seamless billing and online transactions)</span>
                                        </div>
                                        <div className="feature-item">
                                            <CheckCircle2 size={16} />
                                            <span>Staff Attendance & Shift Logs (Secure tracking systems for employees)</span>
                                        </div>
                                        <div className="feature-item">
                                            <CheckCircle2 size={16} />
                                            <span>Payroll & Salary Calculator (Automatic allowances and tax computations)</span>
                                        </div>
                                        <div className="feature-item">
                                            <CheckCircle2 size={16} />
                                            <span>Leaves Management Hub (Dynamic requesting and manager approvals)</span>
                                        </div>
                                    </div>
                                    <div className="tech-badge-container">
                                        {['MERN Stack', 'React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'CSS Grid', 'Charts'].map(tech => (
                                            <span key={tech} className="tech-badge">{tech}</span>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </section>

                        {/* Engineering Strategy / Pillars */}
                        <section>
                            <div className="section-header">
                                <div className="badge-dna">THE TECH BENCHMARK</div>
                                <h2>How We Deliver Value</h2>
                            </div>
                            <div className="gp-services-grid">
                                <div className="glass-panel pillar-panel">
                                    <Sparkles size={32} color="#ff4ef0" style={{ marginBottom: '20px' }} />
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: '900', marginBottom: '12px' }}>Interactive UI/UX & 3D Elements</h3>
                                    <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7 }}>
                                        Every website we design incorporates modern layout mechanics, immersive CSS animations, and beautiful 3D landing elements to keep visitors engaged and drive conversions.
                                    </p>
                                </div>
                                <div className="glass-panel pillar-panel">
                                    <Laptop size={32} color="#22d3ee" style={{ marginBottom: '20px' }} />
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: '900', marginBottom: '12px' }}>Absolute Fluid Responsiveness</h3>
                                    <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7 }}>
                                        We design layouts optimized for the entire device spectrum—from ultra-wide screens to compact mobile displays. Visuals remain pixel-perfect and animations fluid everywhere.
                                    </p>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Sidebar Stats */}
                    <aside>
                        <div className="glass-panel sidebar-stats">
                            <h3 className="sidebar-title">Global Telemetry</h3>
                            
                            <div className="telemetry-stack">
                                {[
                                    { label: "Freelance Scope", value: "Startups & SMES" },
                                    { label: "Regions Served", value: "Global (4 Countries)" },
                                    { label: "Core Expertise", value: "MERN & FullStack" },
                                    { label: "UI Quality", value: "3D & Responsive" },
                                    { label: "Uptime Standard", value: "99.9% Production" }
                                ].map((stat, i) => (
                                    <div key={i} className="telemetry-row">
                                        <span className="telemetry-label">{stat.label}</span>
                                        <span className="telemetry-value">{stat.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="telemetry-cta">
                                <Link to="/help/contact" className="telemetry-btn">
                                    START A PROJECT WITH US
                                </Link>
                            </div>
                        </div>
                    </aside>

                </div>
            </main>

            <Footer />

            <style>{`
                .bg-glow {
                    position: fixed;
                    width: 700px;
                    height: 700px;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 0;
                    filter: blur(80px);
                }
                .bg-glow-left {
                    top: 10%;
                    left: -200px;
                    background: radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, transparent 70%);
                }
                .bg-glow-right {
                    bottom: 10%;
                    right: -200px;
                    background: radial-gradient(circle, rgba(255, 78, 240, 0.04) 0%, transparent 70%);
                }

                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    color: #ff4ef0;
                    text-decoration: none;
                    font-weight: 800;
                    font-size: 0.75rem;
                    margin-bottom: 32px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    transition: 0.3s;
                }
                .back-link:hover {
                    color: #fff;
                    transform: translateX(-4px);
                }

                .text-gradient {
                    background: linear-gradient(135deg, #ff4ef0 20%, #a78bfa 70%, #22d3ee 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                /* Section Headers */
                .section-header {
                    margin-bottom: 40px;
                }
                .badge-dna {
                    display: inline-block;
                    font-size: 0.7rem;
                    font-weight: 950;
                    color: #ff4ef0;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    padding: 6px 14px;
                    background: rgba(255, 78, 240, 0.05);
                    border-radius: 4px;
                    border-left: 3px solid #ff4ef0;
                    margin-bottom: 12px;
                }
                .section-header h2 {
                    font-size: clamp(2rem, 5vw, 2.8rem);
                    font-weight: 900;
                    letter-spacing: -1.5px;
                }

                /* Page Layout Grid */
                .gp-main-grid {
                    display: grid;
                    grid-template-columns: 1fr 360px;
                    gap: 60px;
                }

                .gp-services-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                }

                /* Cards Styling */
                .glass-panel {
                    background: rgba(17, 24, 39, 0.7);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .gp-card {
                    padding: 48px;
                    position: relative;
                    overflow: hidden;
                    border-top: 1.5px solid rgba(255, 255, 255, 0.05);
                }

                .gp-card-header {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    gap: 20px;
                    margin-bottom: 24px;
                    flex-wrap: wrap;
                }

                .flag-badge {
                    font-size: 0.65rem;
                    font-weight: 950;
                    letter-spacing: 2px;
                    padding: 6px 12px;
                    border-radius: 6px;
                }
                .canada-color { background: rgba(239, 68, 68, 0.1); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.2); }
                .aus-usa-color { background: rgba(59, 130, 246, 0.1); color: #93c5fd; border: 1px solid rgba(59, 130, 246, 0.2); }
                .india-color { background: rgba(16, 185, 129, 0.1); color: #6ee7b7; border: 1px solid rgba(16, 185, 129, 0.2); }

                .gp-card-title-area h3 {
                    font-size: 1.5rem;
                    font-weight: 900;
                    letter-spacing: -0.5px;
                    color: #fff;
                    margin-top: 8px;
                }
                .gp-card-title-area .gp-sub {
                    font-size: 0.85rem;
                    color: #64748b;
                    font-weight: 600;
                    margin-top: 4px;
                }

                .gp-icon-wrapper {
                    width: 50px;
                    height: 50px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .canada-color-bg { background: rgba(239, 68, 68, 0.08); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.15); }
                .aus-usa-color-bg { background: rgba(59, 130, 246, 0.08); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.15); }
                .india-color-bg { background: rgba(16, 185, 129, 0.08); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.15); }

                .gp-desc {
                    color: #94a3b8;
                    font-size: 1.05rem;
                    line-height: 1.8;
                    margin-bottom: 30px;
                }

                .feature-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                    margin-bottom: 36px;
                }
                @media (max-width: 768px) {
                    .feature-grid { grid-template-columns: 1fr; }
                }
                .feature-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    color: #cbd5e1;
                    font-size: 0.9rem;
                    line-height: 1.5;
                }
                .feature-item svg {
                    color: #ff4ef0;
                    flex-shrink: 0;
                    margin-top: 2px;
                }

                .tech-badge-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    padding-top: 24px;
                }
                .tech-badge {
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: #fff;
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    padding: 6px 14px;
                    border-radius: 30px;
                }

                /* Hover Interactions */
                .gp-card:hover {
                    transform: translateY(-8px);
                    background: rgba(17, 24, 39, 0.85);
                }
                .hover-glow-canada:hover { border-color: rgba(239, 68, 68, 0.25); box-shadow: 0 20px 40px rgba(239, 68, 68, 0.05); }
                .hover-glow-aus-usa:hover { border-color: rgba(59, 130, 246, 0.25); box-shadow: 0 20px 40px rgba(59, 130, 246, 0.05); }
                .hover-glow-india:hover { border-color: rgba(16, 185, 129, 0.25); box-shadow: 0 20px 40px rgba(16, 185, 129, 0.05); }

                .pillar-panel {
                    padding: 40px;
                }
                .pillar-panel:hover {
                    border-color: rgba(255, 78, 240, 0.2);
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
                }

                /* Sidebar Stats Panel */
                .sidebar-stats {
                    padding: 40px;
                    position: sticky;
                    top: 120px;
                    border: 1px solid rgba(255, 78, 240, 0.15);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
                }
                .sidebar-stats:hover {
                    border-color: #ff4ef0;
                }
                .sidebar-title {
                    font-size: 1.25rem;
                    font-weight: 900;
                    color: #fff;
                    margin-bottom: 28px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    padding-bottom: 16px;
                    letter-spacing: -0.5px;
                }
                .telemetry-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }
                .telemetry-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .telemetry-label {
                    font-size: 0.8rem;
                    color: #64748b;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .telemetry-value {
                    font-size: 0.95rem;
                    font-weight: 900;
                    color: #fff;
                }

                .telemetry-cta {
                    margin-top: 40px;
                    padding-top: 28px;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }
                .telemetry-btn {
                    display: block;
                    padding: 16px;
                    background: linear-gradient(135deg, #ff4ef0 0%, #8b5cf6 100%);
                    color: #fff;
                    text-decoration: none;
                    border-radius: 12px;
                    text-align: center;
                    font-weight: 900;
                    font-size: 0.85rem;
                    letter-spacing: 1px;
                    transition: 0.3s;
                }
                .telemetry-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 30px rgba(255, 78, 240, 0.3);
                    filter: brightness(1.1);
                }

                @media (max-width: 1024px) {
                    .gp-main-grid { grid-template-columns: 1fr; }
                    .sidebar-stats { position: static; }
                }
                @media (max-width: 768px) {
                    .gp-services-grid { grid-template-columns: 1fr; }
                    .gp-card { padding: 30px 20px; }
                }
            `}</style>
        </div>
    );
};

export default GlobalPartnersPage;
