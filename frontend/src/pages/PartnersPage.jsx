import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectNavbar from '../components/ProjectNavbar';
import Footer from '../components/Footer';
import { Shield, Zap, Users, CheckCircle, ChevronDown, ChevronUp, ArrowRight, FileText, Share2, Award, Settings } from 'lucide-react';

const AccordionItem = ({ title, content, isOpen, onClick }) => {
    return (
        <div style={{ borderBottom: '1px solid rgba(139, 92, 246, 0.1)', overflow: 'hidden' }}>
            <button 
                onClick={onClick}
                style={{ 
                    width: '100%', 
                    padding: '24px 0', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    background: 'none', 
                    border: 'none', 
                    color: '#fff', 
                    cursor: 'pointer',
                    textAlign: 'left'
                }}
            >
                <span style={{ fontSize: '1.1rem', fontWeight: '700' }}>{title}</span>
                {isOpen ? <ChevronUp size={20} color="#8b5cf6" /> : <ChevronDown size={20} color="#8b5cf6" />}
            </button>
            <div style={{ 
                maxHeight: isOpen ? '500px' : '0', 
                overflow: 'hidden', 
                transition: 'all 0.3s ease-out',
                color: '#94a3b8',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                paddingBottom: isOpen ? '24px' : '0'
            }}>
                {content}
            </div>
        </div>
    );
};

const PartnersPage = () => {
    const navigate = useNavigate();
    const [openAccordion, setOpenAccordion] = useState(0);

    useEffect(() => {
        document.title = "Partnership Program | VP Group";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ background: '#05070a', color: '#fff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <ProjectNavbar />
            
            <main style={{ paddingTop: '140px', paddingBottom: '100px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5%' }}>
                    
                    {/* Hero */}
                    <div style={{ textAlign: 'center', marginBottom: '100px' }}>
                        <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '16px', marginBottom: '24px', color: '#8b5cf6' }}>
                            <Users size={40} />
                        </div>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: '900', marginBottom: '20px', letterSpacing: '-3px' }}>
                            Partnership <span className="text-gradient">Program.</span>
                        </h1>
                        <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                            Join the VP Group ecosystem and co-engineer mission-critical solutions using our Zero-Trust Security Architecture and high-performance engineering standards.
                        </p>
                    </div>

                    {/* Section 1: Partnership Tiers */}
                    <section style={{ marginBottom: '120px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1px' }}>Ecosystem Tiers</h2>
                        </div>
                        <div className="tier-grid">
                            {[
                                {
                                    title: "Strategic Partner",
                                    icon: Award,
                                    benefits: ["Full Engineering Access", "Joint Venture Potential", "Dedicated Support Node"],
                                    reqs: ["Established Tech Presence", "Compliance Certification", "Shared Market Vision"]
                                },
                                {
                                    title: "Technology Partner",
                                    icon: Settings,
                                    benefits: ["API Mesh Integration", "Technical Co-Marketing", "Beta Feature Access"],
                                    reqs: ["Software/SaaS Product", "API Standard Alignment", "Security Audit Approval"]
                                },
                                {
                                    title: "Referral Partner",
                                    icon: Share2,
                                    benefits: ["Commission Architecture", "Sales Resource Hub", "Event Invitations"],
                                    reqs: ["Professional Network", "Standard Vetting", "Ethics Agreement"]
                                }
                            ].map((tier, idx) => (
                                <div key={idx} className="glass-panel" style={{ padding: '40px', borderTop: '4px solid #8b5cf6' }}>
                                    <tier.icon size={32} color="#8b5cf6" style={{ marginBottom: '24px' }} />
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '24px' }}>{tier.title}</h3>
                                    
                                    <div style={{ marginBottom: '24px' }}>
                                        <h4 style={{ fontSize: '0.8rem', fontWeight: '900', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '1px' }}>Benefits</h4>
                                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {tier.benefits.map(b => <li key={b} style={{ fontSize: '0.9rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={14} color="#8b5cf6" /> {b}</li>)}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 style={{ fontSize: '0.8rem', fontWeight: '900', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '1px' }}>Requirements</h4>
                                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {tier.reqs.map(r => <li key={r} style={{ fontSize: '0.9rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px' }}><Shield size={14} color="rgba(139, 92, 246, 0.4)" /> {r}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 2: Onboarding Process */}
                    <section style={{ marginBottom: '120px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1px' }}>The Onboarding Process</h2>
                        </div>
                        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, transparent, #8b5cf6, transparent)', opacity: 0.3 }}></div>
                            
                            {[
                                { step: "Step 1", title: "Application & Vetting", desc: "Our analysts perform a deep dive into your operational standards and security compliance to ensure ecosystem fit." },
                                { step: "Step 2", title: "Technical Alignment", desc: "Engineers from both sides review API documentation, data structures, and infrastructure to map out the integration mesh." },
                                { step: "Step 3", title: "Agreement", desc: "Formalizing the partnership through high-fidelity legal terms, NDAs, and mutual data handling agreements." },
                                { step: "Step 4", title: "Integration", desc: "Collaborative engineering sprints to deploy production-ready solutions within the VP Group framework." }
                            ].map((step, idx) => (
                                <div key={idx} style={{ position: 'relative', paddingLeft: '70px', marginBottom: '60px' }}>
                                    <div style={{ 
                                        position: 'absolute', 
                                        left: 0, 
                                        top: 0, 
                                        width: '42px', 
                                        height: '42px', 
                                        borderRadius: '12px', 
                                        background: '#05070a', 
                                        border: '2px solid #8b5cf6', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        zIndex: 1
                                    }}>
                                        <span style={{ fontSize: '0.9rem', fontWeight: '900', color: '#8b5cf6' }}>{idx + 1}</span>
                                    </div>
                                    <h4 style={{ fontSize: '0.8rem', fontWeight: '900', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '8px' }}>{step.step}</h4>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '12px' }}>{step.title}</h3>
                                    <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 3: Partnership Terms */}
                    <section style={{ marginBottom: '120px', maxWidth: '800px', margin: '0 auto 120px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1px' }}>Partnership Terms</h2>
                        </div>
                        <div className="glass-panel" style={{ padding: '40px' }}>
                            <AccordionItem 
                                title="Compliance & Security" 
                                content="All partners must adhere to absolute Zero-Trust Security Architecture protocols. This includes mandatory multi-factor authentication, quarterly security audits, and strict data encryption standards for all shared endpoints."
                                isOpen={openAccordion === 0}
                                onClick={() => setOpenAccordion(0)}
                            />
                            <AccordionItem 
                                title="Revenue Share Model" 
                                content="We operate on a performance-based financial model. Referral partners earn competitive commissions on successfully deployed enterprise contracts, while Strategic partners enjoy shared equity or profit splits in joint venture ecosystems."
                                isOpen={openAccordion === 1}
                                onClick={() => setOpenAccordion(1)}
                            />
                            <AccordionItem 
                                title="IP Rights & Ownership" 
                                content="Engineering ecosystem ownership remains with the primary developer of the core logic. However, co-engineered solutions typically operate under shared licensing models defined during Step 3 of the onboarding process."
                                isOpen={openAccordion === 2}
                                onClick={() => setOpenAccordion(2)}
                            />
                        </div>
                    </section>

                    {/* Section 4: CTA */}
                    <section className="glass-panel cta-section" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)', zIndex: 0 }}></div>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '24px', letterSpacing: '-2px' }}>Join the VP Group Ecosystem.</h2>
                            <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.6 }}>
                                Start your journey toward high-performance engineering collaboration. Our team is ready to vet and integrate your vision.
                            </p>
                            <button 
                                onClick={() => navigate('/apply-partnership')}
                                style={{ 
                                padding: '20px 48px', 
                                background: 'linear-gradient(135deg, #8b5cf6 0%, #ff4ef0 100%)', 
                                color: '#fff', 
                                border: 'none', 
                                borderRadius: '12px', 
                                fontSize: '1.1rem', 
                                fontWeight: '900', 
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '12px',
                                transition: 'all 0.3s ease'
                            }} className="cta-button">
                                APPLY FOR PARTNERSHIP <ArrowRight size={20} />
                            </button>
                        </div>
                    </section>

                </div>
            </main>

            <Footer />

            <style>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 30px;
                }
                .text-gradient {
                    background: linear-gradient(to right, #8b5cf6, #ff4ef0);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .cta-button:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 20px 50px rgba(139, 92, 246, 0.4);
                    filter: brightness(1.1);
                }

                .tier-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 32px;
                }
                .cta-section {
                    padding: 80px;
                }

                @media (max-width: 768px) {
                    .tier-grid { grid-template-columns: 1fr; }
                    .cta-section { padding: 40px 20px !important; }
                    .cta-section h2 { font-size: 2rem !important; letter-spacing: -1px !important; }
                    .cta-section p { font-size: 1rem !important; }
                    .cta-section button { padding: 16px 32px !important; font-size: 0.95rem !important; }
                    .glass-panel { border-radius: 16px; }
                }
                @media (max-width: 480px) {
                    .cta-section { padding: 30px 16px !important; }
                    section h1 { font-size: 2rem !important; }
                    section h2 { font-size: 1.8rem !important; }
                }
            `}</style>
        </div>
    );
};

export default PartnersPage;
