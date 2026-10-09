import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import { 
    Heart, 
    ShieldCheck, 
    Zap, 
    Activity, 
    Search, 
    PenTool, 
    Layers, 
    CheckCircle2, 
    ArrowRight,
    Users,
    Sparkles,
    Globe,
    Lock
} from 'lucide-react';

const WellnessVisualizer = ({ accentColor }) => {
    return (
        <div className="wellness-visualizer">
            <div className="heart-container">
                <div className="heart-pulse"></div>
                <div className="heart-main">
                    <Heart size={80} color="#fff" fill="#fff" />
                </div>
                {/* Orbital Rings */}
                <div className="ring r1"></div>
                <div className="ring r2"></div>
                
                {/* Data Points */}
                <div className="point p1"><Activity size={12} /> Vitality</div>
                <div className="point p2"><Users size={12} /> Community</div>
                <div className="point p3"><Lock size={12} /> Security</div>
            </div>

            <style>{`
                .wellness-visualizer {
                    height: 500px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                .heart-container {
                    position: relative;
                    width: 300px;
                    height: 300px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .heart-main {
                    z-index: 10;
                    filter: drop-shadow(0 0 30px ${accentColor});
                    animation: heartBeat 1.5s ease-in-out infinite;
                }
                .heart-pulse {
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    background: ${accentColor};
                    border-radius: 50%;
                    filter: blur(40px);
                    opacity: 0.3;
                    animation: heartPulse 1.5s ease-in-out infinite;
                }
                .ring {
                    position: absolute;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 50%;
                }
                .r1 { width: 300px; height: 300px; animation: rotate 10s linear infinite; }
                .r2 { width: 400px; height: 400px; animation: rotate 15s linear reverse infinite; border-style: dashed; }
                
                .point {
                    position: absolute;
                    padding: 8px 16px;
                    background: rgba(15, 23, 42, 0.8);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    white-space: nowrap;
                    backdrop-filter: blur(10px);
                }
                .p1 { top: 10%; right: -10%; }
                .p2 { bottom: 20%; left: -20%; }
                .p3 { top: 50%; left: -30%; }

                @keyframes heartBeat {
                    0%, 100% { transform: scale(1); }
                    15% { transform: scale(1.15); }
                    30% { transform: scale(1); }
                    45% { transform: scale(1.1); }
                }
                @keyframes heartPulse {
                    0%, 100% { transform: scale(1); opacity: 0.3; }
                    50% { transform: scale(3); opacity: 0; }
                }
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

const MotherBlissPage = () => {
    const accentColor = "#ff4ef0";

    useEffect(() => {
        document.title = "Mother Bliss | Case Study | VP Group";
    }, []);

    const meshSteps = [
        { icon: Search, title: "01. Demographic Audit", desc: "Performing forensic research into the unique digital needs of mothers and healthcare providers to ensure absolute accessibility." },
        { icon: PenTool, title: "02. Wellness Flow", desc: "Architecting logical user journeys that prioritize empathy and clarity, reducing cognitive load during mission-critical tasks." },
        { icon: Sparkles, title: "03. Aesthetic Synthesis", desc: "Applying a high-fidelity 'Soft-Glow' design language that communicates trust, warmth, and institutional reliability." },
        { icon: CheckCircle2, title: "04. Vitality Verification", desc: "Rigorous performance stress tests to ensure the platform remains 100% responsive during peak global traffic loads." }
    ];

    const processSteps = [
        { title: "Strategic Empathy", desc: "We started by understanding the emotional landscape of Mother Bliss users, ensuring the tech supports the mission." },
        { title: "Secure Health Mesh", desc: "Implementing HIPAA-grade data protocols and zero-trust security layers to protect sensitive wellness records." },
        { title: "Immersive UI Engineering", desc: "Building a fluid, React-powered interface that feels as natural and supportive as the Mother Bliss services themselves." },
        { title: "Scalable Care Hub", desc: "Deploying on high-performance cloud infrastructure that grows as the Mother Bliss community expands globally." }
    ];

    return (
        <PageTemplate 
            title="Mother Bliss"
            subtitle="Flagship Wellness Ecosystem"
            description="A high-fidelity digital transformation project engineered by VP Group. We've transformed Mother Bliss from a vision into a scalable, secure, and world-class healthcare platform."
            techDetails={[]} // Not used in this layout
            procedures={[]} // Not used in this layout
            suitability={[]} // Not used in this layout
            icon={Heart}
            showStandardGrid={false}
            fullScreenHero={true}
            showContact={false}
        >
            {/* Custom Project Visualization */}
            <section style={{ marginTop: '40px' }}>
                <div className="section-title-box" style={{ justifyContent: 'center', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: '900', color: accentColor, letterSpacing: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>Project Visualization</div>
                    <h2 className="section-heading" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>The Wellness Vitality Mesh</h2>
                </div>

                <WellnessVisualizer accentColor={accentColor} />

                {/* Forensic Roadmap */}
                <div className="section-title-box" style={{ marginTop: '80px' }}>
                    <div className="accent-line" style={{ background: accentColor }}></div>
                    <h2 className="section-heading">Engineering Roadmap</h2>
                </div>
                
                <div className="working-steps-mesh">
                    {meshSteps.map((step, index) => (
                        <div key={index} className="step-mesh-card">
                            <div className="step-icon-box" style={{ color: accentColor, background: `${accentColor}15` }}>
                                <step.icon size={24} />
                            </div>
                            <h3 style={{ color: '#fff' }}>{step.title}</h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Methodology */}
            <section style={{ marginTop: 'clamp(80px, 12vw, 120px)' }}>
                <div className="section-title-box">
                    <div className="accent-line" style={{ background: accentColor }}></div>
                    <h2 className="section-heading">Project Methodology</h2>
                </div>
                <div className="process-list">
                    {processSteps.map((step, index) => (
                        <div key={index} className="process-step-item">
                            <div className="step-number" style={{ color: accentColor }}>0{index + 1}</div>
                            <div className="step-content">
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-desc">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Metrics */}
            <section className="metrics-outer">
                <div className="metrics-inner-grid">
                    <div className="metric-box">
                        <Activity size={28} color={accentColor} />
                        <div className="metric-text">
                            <h4 className="metric-value">99.99%</h4>
                            <p className="metric-label">Uptime Stability</p>
                        </div>
                    </div>
                    <div className="metric-box">
                        <Users size={28} color={accentColor} />
                        <div className="metric-text">
                            <h4 className="metric-value">Global</h4>
                            <p className="metric-label">Client Access</p>
                        </div>
                    </div>
                    <div className="metric-box">
                        <ShieldCheck size={28} color={accentColor} />
                        <div className="metric-text">
                            <h4 className="metric-value">Encrypted</h4>
                            <p className="metric-label">Data Security</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reference to Home Page Mention */}
            <section className="project-reference" style={{ marginTop: '80px', padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(255, 78, 240, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Globe size={24} color={accentColor} />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0 }}>Featured Project</h4>
                        <p style={{ color: '#94a3b8', margin: '4px 0 0' }}>This project is a cornerstone of our <Link to="/#portfolio" style={{ color: accentColor, textDecoration: 'none', fontWeight: '700' }}>Global Portfolio</Link>.</p>
                    </div>
                </div>
            </section>

            {/* Detail Footer */}
            <section className="detail-footer">
                <h2 className="footer-title">Success Defined.</h2>
                <p className="footer-desc">
                    The Mother Bliss ecosystem is a testament to what is possible when high-end engineering meets a powerful mission.
                </p>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <a href="https://wwwmotherbliss-dd920f26.vercel.app/" target="_blank" rel="noopener noreferrer" className="cta-action-btn" style={{ background: accentColor }}>
                        VIEW LIVE SITE <ArrowRight size={20} />
                    </a>
                    <Link to="/help/contact" className="cta-action-btn" style={{ background: 'transparent', border: `2px solid ${accentColor}` }}>
                        ENGINEER YOUR PROJECT
                    </Link>
                </div>
            </section>

            <style>{`
                .section-title-box { display: flex; align-items: center; gap: 20px; margin-bottom: 48px; }
                .accent-line { width: 5px; height: 32px; border-radius: 4px; }
                .section-heading { color: var(--color-ink); font-size: 2.5rem; font-weight: 900; letter-spacing: -1.5px; }

                .working-steps-mesh {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 32px;
                    margin-top: 60px;
                }
                .step-mesh-card {
                    padding: 40px;
                    background: var(--color-surface-card);
                    border: 1px solid var(--color-hairline);
                    border-radius: 32px;
                    transition: all 0.4s ease;
                }
                .step-mesh-card:hover { transform: translateY(-10px); border-color: ${accentColor}50; }
                .step-icon-box { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; }
                
                .process-list { display: flex; flex-direction: column; gap: 24px; }
                .process-step-item { display: flex; gap: 32px; padding: 32px; background: var(--color-surface-soft); border-radius: 20px; border: 1px solid var(--color-hairline); }
                .step-number { font-size: 2.5rem; font-weight: 900; }
                .step-title { font-size: 1.3rem; font-weight: 800; color: var(--color-ink); margin-bottom: 8px; }
                .step-desc { color: var(--color-muted); line-height: 1.7; margin: 0; }

                .metrics-outer { margin-top: 100px; padding: 60px; background: var(--color-surface-card); border-radius: 40px; border: 1px solid var(--color-hairline); }
                .metrics-inner-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
                .metric-box { display: flex; align-items: center; gap: 20px; }
                .metric-value { font-size: 1.5rem; font-weight: 900; color: var(--color-ink); margin: 0; }
                .metric-label { font-size: 0.8rem; color: var(--color-muted); text-transform: uppercase; letter-spacing: 1px; }

                .detail-footer { margin-top: 150px; padding: 120px 5%; text-align: center; background: radial-gradient(circle at 50% 0%, ${accentColor}15 0%, transparent 75%); border-radius: 60px; border: 1px solid var(--color-hairline); }
                .footer-title { font-size: 3.5rem; font-weight: 900; color: var(--color-ink); margin-bottom: 20px; }
                .footer-desc { color: var(--color-muted); max-width: 600px; margin: 0 auto 48px; font-size: 1.1rem; line-height: 1.8; }
                .cta-action-btn { display: inline-flex; align-items: center; gap: 12px; padding: 20px 40px; border-radius: 16px; color: #fff; font-weight: 900; text-decoration: none; transition: 0.3s; text-transform: uppercase; }
                .cta-action-btn:hover { transform: scale(1.05); box-shadow: 0 0 30px ${accentColor}40; }

                @media (max-width: 768px) {
                    .metrics-inner-grid { grid-template-columns: 1fr; }
                    .footer-title { font-size: 2.2rem; }
                    .footer-desc { font-size: 1rem; }
                }
            `}</style>
        </PageTemplate>
    );
};

export default MotherBlissPage;
