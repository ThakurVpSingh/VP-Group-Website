import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectNavbar from '../components/ProjectNavbar';
import Footer from '../components/Footer';
import { Globe, Shield, Terminal, Zap, ArrowLeft, CheckCircle, Activity, Clock, ShieldCheck, Map } from 'lucide-react';

const GlobalPartnersPage = () => {
    useEffect(() => {
        document.title = "Global Partners Spotlight | VP Group";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ background: '#05070a', color: '#fff', minHeight: '100vh', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
            <ProjectNavbar />
            
            {/* Hero Section with Animated Network Background */}
            <section style={{ 
                padding: '160px 5% 100px', 
                textAlign: 'center', 
                position: 'relative',
                background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 70%)'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.3, zIndex: 0 }}>
                    <svg width="100%" height="100%" style={{ position: 'absolute' }}>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="1"/>
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                    <div className="network-glow"></div>
                </div>

                <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
                    <Link to="/help/partners" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#8b5cf6', textDecoration: 'none', fontWeight: '800', fontSize: '0.8rem', marginBottom: '32px', textTransform: 'uppercase', letterSpacing: '2px' }}>
                        <ArrowLeft size={16} /> Back to Partners
                    </Link>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: '900', marginBottom: '24px', letterSpacing: '-3px', lineHeight: 1 }}>
                        Empowering Global Partners with <span className="text-gradient">Total Security.</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                        A deep dive into our long-term engineering partnership and ecosystem management, delivering resilient infrastructure across international borders.
                    </p>
                </div>
            </section>

            <main style={{ padding: '0 5% 100px', maxWidth: '1400px', margin: '0 auto' }}>
                <div className="gp-main-grid">
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
                        
                        {/* Project Footprint */}
                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                                <div style={{ width: '40px', height: '2px', background: '#8b5cf6' }}></div>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-1px' }}>Project Footprint</h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                                {[
                                    { region: "North America", hubs: "New York, Toronto", status: "Operational" },
                                    { region: "EMEA", hubs: "London, Berlin, Dubai", status: "Operational" },
                                    { region: "APAC", hubs: "Singapore, Tokyo, Sydney", status: "Scaling" }
                                ].map((item, idx) => (
                                    <div key={idx} className="glass-panel" style={{ padding: '30px', borderLeft: '4px solid #8b5cf6' }}>
                                        <Globe size={24} color="#8b5cf6" style={{ marginBottom: '16px' }} />
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '8px' }}>{item.region}</h3>
                                        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '12px' }}>Key Hubs: {item.hubs}</p>
                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', fontWeight: '900', color: item.status === 'Operational' ? '#10b981' : '#f59e0b', textTransform: 'uppercase' }}>
                                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}></div>
                                            {item.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Services Utilized */}
                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                                <div style={{ width: '40px', height: '2px', background: '#8b5cf6' }}></div>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-1px' }}>Services Utilized</h2>
                            </div>
                            <div className="gp-services-grid">
                                <div className="glass-panel" style={{ padding: '40px' }}>
                                    <Terminal size={32} color="#8b5cf6" style={{ marginBottom: '20px' }} />
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '16px' }}>Software Engineering</h3>
                                    <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7 }}>
                                        Custom-built middleware that synchronizes data across international nodes with sub-millisecond latency. Our engineering ensures that global transactions remain atomic and secure.
                                    </p>
                                </div>
                                <div className="glass-panel" style={{ padding: '40px' }}>
                                    <Zap size={32} color="#8b5cf6" style={{ marginBottom: '20px' }} />
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '16px' }}>IT Consultation</h3>
                                    <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7 }}>
                                        Strategic advisory on cloud resource allocation and regional compliance, ensuring that every deployment adheres to local data sovereignty laws while maintaining global speed.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Working Process */}
                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                                <div style={{ width: '40px', height: '2px', background: '#8b5cf6' }}></div>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-1px' }}>The Working Process</h2>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {[
                                    { title: "24/7 Security Mesh", desc: "Our engineers provide continuous monitoring of all global endpoints, utilizing AI-driven threat detection to neutralize anomalies in real-time." },
                                    { title: "Proactive Maintenance", desc: "Weekly infrastructure audits and automated patching cycles ensure that the global partner ecosystem remains production-hardened at all times." },
                                    { title: "Zero-Latency Support", desc: "A dedicated technical rapid-response team is available 24/7 to resolve complex architectural issues across any time zone." }
                                ].map((step, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '24px', padding: '30px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <ShieldCheck size={24} color="#8b5cf6" />
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '8px' }}>{step.title}</h4>
                                            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Stats */}
                    <aside>
                        <div className="glass-panel" style={{ padding: '40px', position: 'sticky', top: '140px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '32px', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>Quick Stats</h3>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                {[
                                    { label: "Partnership Since", value: "2022", icon: Clock },
                                    { label: "Uptime Guarantee", value: "99.99%", icon: Activity },
                                    { label: "Security Incidents", value: "0", icon: Shield },
                                    { label: "Project Scale", value: "Multi-Regional", icon: Map }
                                ].map((stat, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <stat.icon size={18} color="#8b5cf6" />
                                            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600' }}>{stat.label}</span>
                                        </div>
                                        <span style={{ fontSize: '0.95rem', fontWeight: '900', color: '#fff' }}>{stat.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                <Link to="/help/contact" target="_blank" style={{ 
                                    display: 'block', 
                                    padding: '18px', 
                                    background: 'linear-gradient(135deg, #8b5cf6 0%, #ff4ef0 100%)', 
                                    color: '#fff', 
                                    textDecoration: 'none', 
                                    borderRadius: '12px', 
                                    textAlign: 'center', 
                                    fontWeight: '900',
                                    fontSize: '0.9rem',
                                    letterSpacing: '1px'
                                }} className="cta-button">
                                    INQUIRE FOR PARTNERSHIP
                                </Link>
                            </div>
                        </div>
                    </aside>

                </div>
            </main>

            <Footer />

            <style>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    transition: all 0.3s ease;
                }
                .glass-panel:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(139, 92, 246, 0.2);
                }
                .text-gradient {
                    background: linear-gradient(to right, #8b5cf6, #ff4ef0);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .network-glow {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
                    filter: blur(50px);
                    animation: pulse 8s infinite ease-in-out;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); }
                }
                .cta-button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 40px rgba(139, 92, 246, 0.3);
                    filter: brightness(1.1);
                }

                .gp-main-grid {
                    display: grid;
                    grid-template-columns: 1fr 350px;
                    gap: 60px;
                }
                .gp-services-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 32px;
                }

                @media (max-width: 1024px) {
                    .gp-main-grid { grid-template-columns: 1fr; }
                }
                @media (max-width: 768px) {
                    .gp-services-grid { grid-template-columns: 1fr; }
                    .glass-panel { border-radius: 16px; }
                }
                @media (max-width: 480px) {
                    section h1 { font-size: 2rem !important; letter-spacing: -1px !important; }
                    section h2 { font-size: 1.4rem !important; }
                }
            `}</style>
        </div>
    );
};

export default GlobalPartnersPage;
