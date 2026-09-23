import React, { useEffect } from 'react';
import { 
    MapPin, 
    Cpu, 
    Coffee, 
    Gamepad2, 
    Users, 
    Monitor, 
    Zap, 
    ShieldCheck, 
    MessageSquare, 
    ArrowRight,
    Globe,
    Activity,
    Layout,
    Clock
} from 'lucide-react';
import ProjectNavbar from '../components/ProjectNavbar';
import Footer from '../components/Footer';

const HQPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Locations & HQ Pratapgarh | VP Group";
    }, []);

    return (
        <div className="hq-showcase-container">
            <ProjectNavbar />

            {/* 1. Cinematic Hero Section */}
            <section className="hq-hero">
                <div className="hero-mesh"></div>
                <div className="hero-content">
                    <div className="badge-reveal">
                        <MapPin size={16} /> CENTRAL COMMAND HUB
                    </div>
                    <h1 className="hq-title">
                        VP Group <span className="text-gradient">HQ Pratapgarh</span>
                    </h1>
                    <p className="hq-subtitle">
                        Where sophisticated engineering meets radical hospitality. Welcome to the architectural heart of our global operations.
                    </p>
                </div>
                <div className="scroll-indicator">
                    <div className="mouse">
                        <div className="wheel"></div>
                    </div>
                </div>
            </section>

            {/* 2. The Engineering Forge (Working Environment) */}
            <section className="hq-section work-env">
                <div className="section-grid">
                    <div className="text-block">
                        <div className="label">WORKSPACE PHILOSOPHY</div>
                        <h2>The <span className="text-cyan">Engineering</span> Forge</h2>
                        <p>
                            Our workspace is designed for deep work. Every station is equipped with high-performance 
                            computing clusters and sub-millisecond network latency. We've eliminated 
                            traditional cubicles in favor of "Flow Cells" – collaborative hubs where 
                            ideas evolve at the speed of light.
                        </p>
                        <div className="stat-grid">
                            <div className="stat-card">
                                <h3>99.9%</h3>
                                <p>Uptime Environment</p>
                            </div>
                            <div className="stat-card">
                                <h3>0.5ms</h3>
                                <p>Internal Latency</p>
                            </div>
                        </div>
                    </div>
                    <div className="visual-block forge-visual">
                        <div className="code-stream-mesh">
                            {[...Array(15)].map((_, i) => (
                                <div key={i} className="stream-line" style={{animationDelay: `${i * 0.2}s`}}></div>
                            ))}
                        </div>
                        <div className="forge-core">
                            <Cpu size={80} className="pulse-icon" />
                            <div className="orbit-ring"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. The Client Experience (Radical Transparency) */}
            <section className="hq-section client-exp">
                <div className="section-grid reverse">
                    <div className="text-block">
                        <div className="label">CLIENT CONCIERGE</div>
                        <h2>A Journey of <span className="text-purple">Trust.</span></h2>
                        <p>
                            When a client enters the Pratapgarh HQ, they don't just visit an office; 
                            they enter our ecosystem. Our "Strategy Lounge" is equipped with 
                            real-time transparency screens, allowing partners to view the 
                            forensic progress of their projects live.
                        </p>
                        <ul className="exp-list">
                            <li><ShieldCheck size={18} /> Zero-Friction Entry Protocol</li>
                            <li><Users size={18} /> Dedicated Strategy Architects</li>
                            <li><MessageSquare size={18} /> High-Fidelity Feedback Loops</li>
                        </ul>
                    </div>
                    <div className="visual-block glass-stack">
                        <div className="glass-layer l1"></div>
                        <div className="glass-layer l2"></div>
                        <div className="glass-layer l3">
                            <Users size={40} color="var(--halo-primary)" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. The Pulse Hub (Project Performance) */}
            <section className="hq-section performance-hub">
                <div className="section-header-center">
                    <div className="label">GLOBAL OPERATIONS</div>
                    <h2>The <span className="text-glow">Pulse Hub</span></h2>
                    <p>Monitoring over 50+ live deployments across 12 countries, our Performance Hub ensures that every VP-engineered platform hits its benchmarks 24/7.</p>
                </div>
                <div className="performance-grid">
                    <div className="perf-card">
                        <Monitor size={32} />
                        <h4>Live Monitoring</h4>
                        <p>Real-time health tracking of all project nodes.</p>
                    </div>
                    <div className="perf-card">
                        <Zap size={32} />
                        <h4>Auto-Scaling</h4>
                        <p>Automated infrastructure adjustments for peak loads.</p>
                    </div>
                    <div className="perf-card">
                        <Activity size={32} />
                        <h4>Optimization QA</h4>
                        <p>Daily audits of core web vitals and security.</p>
                    </div>
                </div>
            </section>

            {/* 5. The Vortex (Recreation & Fun) */}
            <section className="hq-section fun-vortex">
                <div className="section-grid">
                    <div className="text-block">
                        <div className="label">LIFE @ HQ</div>
                        <h2>The <span className="text-pink">Vortex</span> Lounge</h2>
                        <p>
                            Engineering excellence requires tactical recovery. The Vortex is our 
                            recreation core, featuring indoor gaming zones, relaxation pods, 
                            and the Social Core where the team resets and recharges.
                        </p>
                        <div className="fun-icons">
                            <div className="fun-item">
                                <Gamepad2 />
                                <span>Indoor Games</span>
                            </div>
                            <div className="fun-item">
                                <Coffee />
                                <span>Nitro Cafe</span>
                            </div>
                            <div className="fun-item">
                                <Layout />
                                <span>VR Zones</span>
                            </div>
                        </div>
                    </div>
                    <div className="visual-block vortex-visual">
                        <div className="vortex-circle">
                            <div className="vortex-inner">
                                <Gamepad2 size={50} color="#ff4ef0" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Contact Procedure */}
            <section className="hq-section contact-procedure">
                <div className="procedure-box">
                    <h2>How to <span className="text-gradient">Connect</span> with us?</h2>
                    <p>We follow a forensic onboarding procedure to ensure total alignment with your vision.</p>
                    <div className="steps-flow">
                        <div className="step">
                            <div className="step-num">01</div>
                            <h4>Digital Inquiry</h4>
                            <p>Submit your mission via our secure contact portal.</p>
                        </div>
                        <div className="step-arrow"><ArrowRight /></div>
                        <div className="step">
                            <div className="step-num">02</div>
                            <h4>Strategist Match</h4>
                            <p>We pair you with an architect specific to your industry.</p>
                        </div>
                        <div className="step-arrow"><ArrowRight /></div>
                        <div className="step">
                            <div className="step-num">03</div>
                            <h4>HQ Strategy Day</h4>
                            <p>Visit us for a deep-dive architecture mapping session.</p>
                        </div>
                    </div>
                    <button className="btn-get-started" onClick={() => window.location.href='/consultation/book'}>
                        INITIATE CONTACT <ArrowRight size={18} />
                    </button>
                </div>
            </section>

            <Footer />

            <style>{`
                .hq-showcase-container {
                    background: var(--halo-bg);
                    color: var(--halo-on-surface);
                    min-height: 100vh;
                    overflow-x: hidden;
                    transition: background-color 0.3s ease, color 0.3s ease;
                }

                /* Hero Section */
                .hq-hero {
                    height: 85vh;
                    min-height: 600px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    position: relative;
                    padding: 0 5%;
                }
                .hero-mesh {
                    position: absolute;
                    inset: 0;
                    background: 
                        radial-gradient(circle at 20% 30%, var(--halo-focus) 0%, transparent 60%),
                        radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.08) 0%, transparent 60%);
                    z-index: 0;
                }
                .hero-content { position: relative; z-index: 1; max-width: 900px; }
                .badge-reveal {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 20px;
                    background: var(--halo-surface);
                    border: 1px solid var(--halo-border);
                    border-radius: 30px;
                    font-size: 0.75rem;
                    font-weight: 900;
                    letter-spacing: 2px;
                    color: var(--halo-primary);
                    margin-bottom: 24px;
                    box-shadow: var(--halo-shadow-sm);
                }
                .hq-title {
                    font-size: clamp(2.5rem, 8vw, 4.8rem);
                    font-weight: 950;
                    line-height: 1.1;
                    margin-bottom: 24px;
                    letter-spacing: -2.5px;
                    color: var(--halo-on-surface);
                }
                .hq-subtitle {
                    font-size: clamp(1.05rem, 2.5vw, 1.25rem);
                    color: var(--halo-muted);
                    max-width: 700px;
                    margin: 0 auto;
                    line-height: 1.7;
                }
                .text-gradient {
                    background: linear-gradient(to right, var(--halo-primary), #ff4ef0);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                /* General Section Layout */
                .hq-section {
                    padding: 100px 8%;
                    max-width: 1400px;
                    margin: 0 auto;
                }
                .section-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 80px;
                    align-items: center;
                }
                .section-grid.reverse { direction: rtl; }
                .section-grid.reverse .text-block { direction: ltr; }
                
                .text-block h2 {
                    font-size: clamp(2rem, 5vw, 3.2rem);
                    font-weight: 900;
                    margin-bottom: 20px;
                    line-height: 1.2;
                    letter-spacing: -1.5px;
                    color: var(--halo-on-surface);
                }
                .text-block p {
                    font-size: 1.08rem;
                    color: var(--halo-muted);
                    line-height: 1.75;
                    margin-bottom: 32px;
                }
                .label {
                    font-size: 0.75rem;
                    font-weight: 900;
                    color: var(--halo-primary);
                    letter-spacing: 2.5px;
                    margin-bottom: 14px;
                    text-transform: uppercase;
                }
                .text-cyan { color: var(--halo-primary); }
                .text-purple { color: #8b5cf6; }
                .text-pink { color: #ff4ef0; }

                /* Stats & Lists */
                .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .stat-card {
                    padding: 24px;
                    background: var(--halo-surface);
                    border: 1px solid var(--halo-border);
                    border-radius: 20px;
                    box-shadow: var(--halo-shadow-sm);
                }
                .stat-card h3 { font-size: 1.8rem; font-weight: 900; color: var(--halo-primary); margin-bottom: 4px; }
                .stat-card p { font-size: 0.88rem; color: var(--halo-muted); margin-bottom: 0; }

                .exp-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 14px; }
                .exp-list li {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    font-size: 1.05rem;
                    color: var(--halo-on-surface);
                    font-weight: 600;
                }
                .exp-list li svg { color: var(--halo-primary); flex-shrink: 0; }

                /* Visual Blocks */
                .visual-block {
                    height: 440px;
                    background: var(--halo-surface);
                    border-radius: 32px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid var(--halo-border);
                    box-shadow: var(--halo-shadow-sm);
                    overflow: hidden;
                }
                
                /* Forge Visual */
                .code-stream-mesh {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    justify-content: space-around;
                    opacity: 0.25;
                }
                .stream-line {
                    width: 1px;
                    height: 100%;
                    background: linear-gradient(to bottom, transparent, var(--halo-primary), transparent);
                    animation: stream-flow 3s infinite linear;
                }
                @keyframes stream-flow {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                .forge-core {
                    position: relative;
                    z-index: 2;
                }
                .pulse-icon { color: var(--halo-primary); filter: drop-shadow(0 0 16px var(--halo-focus)); animation: core-pulse 2s infinite ease-in-out; }
                .orbit-ring {
                    position: absolute;
                    top: 50%; left: 50%;
                    width: 180px; height: 180px;
                    border: 1px dashed var(--halo-border);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: rotate 10s infinite linear;
                }
                @keyframes core-pulse {
                    0% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.08); opacity: 1; }
                    100% { transform: scale(1); opacity: 0.8; }
                }

                /* Glass Stack Visual */
                .glass-stack { perspective: 1000px; }
                .glass-layer {
                    position: absolute;
                    width: 260px;
                    height: 160px;
                    border-radius: 20px;
                    backdrop-filter: blur(10px);
                    border: 1px solid var(--halo-border);
                    transition: 0.5s;
                }
                .l1 { background: var(--halo-surface); transform: translateZ(-50px) translateY(-20px) rotateX(10deg); opacity: 0.5; }
                .l2 { background: var(--halo-surface); transform: translateZ(0) translateY(0) rotateX(10deg); opacity: 0.8; }
                .l3 { 
                    background: var(--halo-surface); 
                    transform: translateZ(50px) translateY(20px) rotateX(10deg); 
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: var(--halo-shadow-md);
                }

                /* Performance Hub */
                .section-header-center { text-align: center; max-width: 800px; margin: 0 auto 50px; }
                .section-header-center h2 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 950; margin-bottom: 16px; color: var(--halo-on-surface); letter-spacing: -1px; }
                .section-header-center p { font-size: 1.1rem; color: var(--halo-muted); line-height: 1.7; }
                .performance-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                }
                .perf-card {
                    padding: 40px 32px;
                    background: var(--halo-surface);
                    border: 1px solid var(--halo-border);
                    border-radius: 24px;
                    text-align: center;
                    transition: 0.3s ease;
                    box-shadow: var(--halo-shadow-sm);
                }
                .perf-card:hover {
                    border-color: var(--halo-primary);
                    transform: translateY(-6px);
                    box-shadow: var(--halo-shadow-md);
                }
                .perf-card svg { color: var(--halo-primary); margin-bottom: 20px; }
                .perf-card h4 { font-size: 1.3rem; font-weight: 850; margin-bottom: 10px; color: var(--halo-on-surface); }
                .perf-card p { color: var(--halo-muted); line-height: 1.6; margin-bottom: 0; font-size: 0.95rem; }

                /* Fun Vortex */
                .fun-icons { display: flex; gap: 24px; }
                .fun-item { display: flex; flex-direction: column; align-items: center; gap: 8px; color: #ff4ef0; }
                .fun-item span { font-size: 0.8rem; font-weight: 800; color: var(--halo-muted); text-transform: uppercase; }
                .vortex-circle {
                    width: 260px; height: 260px;
                    border: 1px solid var(--halo-border);
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    position: relative;
                }
                .vortex-circle::after {
                    content: '';
                    position: absolute;
                    inset: -16px;
                    border: 1px dashed rgba(255, 78, 240, 0.3);
                    border-radius: 50%;
                    animation: rotate 20s infinite linear reverse;
                }
                .vortex-inner {
                    width: 100px; height: 100px;
                    background: rgba(255, 78, 240, 0.1);
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    animation: core-pulse 3s infinite ease-in-out;
                }

                /* Procedure Box */
                .procedure-box {
                    background: var(--halo-surface);
                    padding: 70px 50px;
                    border-radius: 36px;
                    border: 1px solid var(--halo-border);
                    text-align: center;
                    box-shadow: var(--halo-shadow-md);
                }
                .procedure-box h2 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 950; margin-bottom: 14px; color: var(--halo-on-surface); letter-spacing: -1px; }
                .procedure-box p { color: var(--halo-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto; line-height: 1.6; }
                .steps-flow {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 24px;
                    margin: 50px 0;
                }
                .step { max-width: 220px; }
                .step-num {
                    font-size: 2.8rem;
                    font-weight: 950;
                    color: var(--halo-border);
                    margin-bottom: -16px;
                }
                .step h4 { font-size: 1.15rem; font-weight: 850; margin-bottom: 8px; color: var(--halo-on-surface); }
                .step p { color: var(--halo-muted); font-size: 0.92rem; line-height: 1.5; }
                .step-arrow { color: var(--halo-primary); opacity: 0.6; }

                .btn-get-started {
                    padding: 18px 44px;
                    background: var(--halo-primary);
                    color: #ffffff;
                    border: none;
                    border-radius: 14px;
                    font-weight: 900;
                    font-size: 1.05rem;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    margin: 0 auto;
                    transition: 0.3s;
                    box-shadow: 0 4px 16px var(--halo-focus);
                }
                .btn-get-started:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 28px var(--halo-focus);
                }

                @keyframes rotate {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .section-grid { grid-template-columns: 1fr; gap: 50px; text-align: center; }
                    .section-grid.reverse { direction: ltr; }
                    .performance-grid { grid-template-columns: 1fr; }
                    .steps-flow { flex-direction: column; }
                    .step-arrow { transform: rotate(90deg); }
                    .procedure-box { padding: 40px 20px; }
                }

                .scroll-indicator {
                    position: absolute;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .mouse {
                    width: 26px; height: 44px;
                    border: 2px solid var(--halo-border);
                    border-radius: 16px;
                    position: relative;
                }
                .wheel {
                    width: 4px; height: 8px;
                    background: var(--halo-primary);
                    border-radius: 2px;
                    position: absolute;
                    top: 8px; left: 50%;
                    transform: translateX(-50%);
                    animation: scroll-anim 2s infinite;
                }
                @keyframes scroll-anim {
                    0% { transform: translateX(-50%) translateY(0); opacity: 1; }
                    100% { transform: translateX(-50%) translateY(12px); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default HQPage;
