import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import { 
    Shield, 
    Lock, 
    Zap, 
    Activity, 
    Search, 
    ShieldAlert, 
    Layers, 
    CheckCircle2, 
    ArrowRight,
    Users,
    Key,
    Database,
    Fingerprint
} from 'lucide-react';

const VaultVisualizer = ({ accentColor }) => {
    return (
        <div className="vault-visualizer">
            <div className="vault-container">
                <div className="vault-pulse"></div>
                <div className="vault-main">
                    <Shield size={120} color="#fff" />
                </div>
                {/* Security Rings */}
                <div className="security-ring s1"></div>
                <div className="security-ring s2"></div>
                
                {/* Node Points */}
                <div className="node n1"><Fingerprint size={12} /> BIOMETRIC</div>
                <div className="node n2"><Key size={12} /> MFA-LAYER</div>
                <div className="node n3"><Lock size={12} /> ENCRYPTED</div>
            </div>

            <style>{`
                .vault-visualizer {
                    height: 500px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                .vault-container {
                    position: relative;
                    width: 300px;
                    height: 300px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .vault-main {
                    z-index: 10;
                    filter: drop-shadow(0 0 30px ${accentColor});
                    animation: floatShield 3s ease-in-out infinite;
                }
                .vault-pulse {
                    position: absolute;
                    width: 150px;
                    height: 150px;
                    background: ${accentColor};
                    border-radius: 50%;
                    filter: blur(60px);
                    opacity: 0.2;
                    animation: shieldPulse 2s ease-in-out infinite;
                }
                .security-ring {
                    position: absolute;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 50%;
                }
                .s1 { width: 350px; height: 350px; border-style: dashed; animation: rotateShield 20s linear infinite; }
                .s2 { width: 450px; height: 450px; animation: rotateShield 30s linear reverse infinite; opacity: 0.5; }
                
                .node {
                    position: absolute;
                    padding: 10px 20px;
                    background: rgba(15, 23, 42, 0.9);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    white-space: nowrap;
                    backdrop-filter: blur(10px);
                    letter-spacing: 2px;
                }
                .n1 { top: 0%; right: -20%; }
                .n2 { bottom: 10%; left: -30%; }
                .n3 { top: 40%; left: -40%; }

                @keyframes floatShield {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes shieldPulse {
                    0%, 100% { transform: scale(1); opacity: 0.2; }
                    50% { transform: scale(1.5); opacity: 0.4; }
                }
                @keyframes rotateShield {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

const VaultCaseStudyPage = () => {
    const accentColor = "#a78bfa";

    useEffect(() => {
        document.title = "VexioGate Vault | Case Study | VP Group Engineering";
    }, []);

    const meshSteps = [
        { icon: Fingerprint, title: "01. Identity Synthesis", desc: "Forging absolute digital identities through multi-layered biometric and behavioral authentication meshes." },
        { icon: ShieldAlert, title: "02. Zero-Trust Gateway", desc: "Architecting a perimeter-less security model where every request is forensicly verified before provisioning." },
        { icon: Database, title: "03. Immutable Logging", desc: "Deploying an append-only audit trail that captures every structural interaction within the infrastructure." },
        { icon: Activity, title: "04. Real-time Oversight", desc: "Providing mission-control dashboards for institutional leads to monitor workforce vitality and security health." }
    ];

    const processSteps = [
        { title: "Forensic Analysis", desc: "Mapping the complex hierarchical needs of modern enterprise workforces to identify security vulnerabilities." },
        { title: "Gateway Engineering", desc: "Developing a high-performance proxy layer that manages access without sacrificing operational velocity." },
        { title: "MFA Integration", desc: "Implementing state-of-the-art Multi-Factor Authentication including hardware keys and secure neural tokens." },
        { title: "Deployment & Stress Test", desc: "Pushing the VexioGate mesh to its limits with simulated breach scenarios to ensure 100% resilience." }
    ];

    return (
        <PageTemplate 
            title="VexioGate Vault"
            subtitle="Enterprise Security Mesh"
            description="The flagship Identity and Access Management (IAM) ecosystem engineered by VP Group. VexioGate provides institutional-grade security, forensic auditing, and automated workforce provisioning."
            techDetails={[]} 
            procedures={[]} 
            suitability={[]} 
            icon={Shield}
            showStandardGrid={false}
            fullScreenHero={true}
            showContact={false}
        >
            {/* Custom Project Visualization */}
            <section style={{ marginTop: '40px' }}>
                <div className="section-title-box" style={{ justifyContent: 'center', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: '900', color: accentColor, letterSpacing: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>Security Architecture</div>
                    <h2 className="section-heading" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>The Zero-Trust Vault</h2>
                </div>

                <VaultVisualizer accentColor={accentColor} />

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
                    <h2 className="section-heading">Security Methodology</h2>
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
                        <Lock size={28} color={accentColor} />
                        <div className="metric-text">
                            <h4 className="metric-value">AES-256</h4>
                            <p className="metric-label">Encryption Standard</p>
                        </div>
                    </div>
                    <div className="metric-box">
                        <Users size={28} color={accentColor} />
                        <div className="metric-text">
                            <h4 className="metric-value">Unlimited</h4>
                            <p className="metric-label">Node Scaling</p>
                        </div>
                    </div>
                    <div className="metric-box">
                        <Activity size={28} color={accentColor} />
                        <div className="metric-text">
                            <h4 className="metric-value">~14ms</h4>
                            <p className="metric-label">Auth Latency</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detail Footer */}
            <section className="detail-footer">
                <h2 className="footer-title">Secure. Always.</h2>
                <p className="footer-desc">
                    VexioGate is currently operational as our primary internal security portal and is available for enterprise licensing.
                </p>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <Link to="/help/contact" className="cta-action-btn" style={{ background: accentColor }}>
                        REQUEST ACCESS <ArrowRight size={20} />
                    </Link>
                    <Link to="/demo" className="cta-action-btn" style={{ background: 'transparent', border: `2px solid ${accentColor}` }}>
                        EXPERIENCE DEMO
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

export default VaultCaseStudyPage;
