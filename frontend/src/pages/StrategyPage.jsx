import React, { useEffect, useState } from 'react';
import { Shield, Zap, BarChart3, TrendingUp, Cpu, Globe, PieChart, Activity, Layers, ArrowRight, Check, X, MousePointer2, ZapOff } from 'lucide-react';
import ProjectNavbar from '../components/ProjectNavbar';
import Footer from '../components/Footer';

const StrategyPage = () => {
    const [activeTab, setActiveTab] = useState('impact');

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Our Strategy | VP Group Performance Mesh";
    }, []);

    return (
        <div className="strategy-root">
            <ProjectNavbar />
            
            {/* Cyber Grid Background */}
            <div className="cyber-grid"></div>
            <div className="scan-line"></div>
            <div className="data-stream">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="stream-particle" style={{ '--l': `${Math.random() * 100}%`, '--d': `${Math.random() * 10}s`, '--s': `${0.5 + Math.random()}s` }}>
                        {Math.random() > 0.5 ? '1' : '0'}
                    </div>
                ))}
            </div>
            
            {/* 1. Hero Strategy Header */}
            <section className="strategy-hero">
                <div className="hero-content">
                    <div className="floating-badge">
                        <Activity size={14} /> 
                        <span>SYSTEM_STRATEGY_v4.0</span>
                    </div>
                    <h1 className="glitch-text" data-text="ARCHITECTURAL STRATEGY">
                        STRATEGIC <span className="cyan-glow">VISUALIZATION</span>
                    </h1>
                    <p className="hero-subtitle">
                        Quantifying the impact of deep-mesh digitalization through forensic data orchestration and real-time performance telemetry.
                    </p>
                    <div className="hero-stats">
                        <div className="mini-stat">
                            <span className="stat-val">99.9%</span>
                            <span className="stat-label">DATA_FIDELITY</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="mini-stat">
                            <span className="stat-val">0.02ms</span>
                            <span className="stat-label">SYNC_LATENCY</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Interactive Power BI Dashboard Preview */}
            <section className="dashboard-section">
                <div className="section-header">
                    <h2 className="title-gradient">Market <span className="white">Impact Matrix</span></h2>
                    <div className="tab-control">
                        <button className={activeTab === 'impact' ? 'active' : ''} onClick={() => setActiveTab('impact')}>BUSINESS IMPACT</button>
                        <button className={activeTab === 'market' ? 'active' : ''} onClick={() => setActiveTab('market')}>MARKET VELOCITY</button>
                    </div>
                </div>

                <div className="dashboard-grid">
                    <div className="chart-container glass-panel">
                        <div className="chart-header">
                            <BarChart3 size={18} className="cyan-text" />
                            <span>REAL-TIME TELEMETRY</span>
                            <div className="live-dot"></div>
                        </div>
                        <div className="visualizer">
                            {[80, 45, 90, 65, 85, 50, 75, 95].map((h, i) => (
                                <div key={i} className="v-bar-wrapper">
                                    <div className="v-bar" style={{ '--h': `${h}%`, '--d': `${i * 0.1}s` }}>
                                        <div className="bar-glow"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="chart-labels">
                            <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span><span>Q5</span><span>Q6</span><span>Q7</span><span>Q8</span>
                        </div>
                    </div>

                    <div className="metrics-column">
                        <div className="metric-card glass-panel">
                            <div className="metric-icon purple"><TrendingUp size={24} /></div>
                            <div className="metric-info">
                                <h3>Efficiency Surge</h3>
                                <div className="metric-value">+342% <span className="trend-up">▲</span></div>
                            </div>
                        </div>
                        <div className="metric-card glass-panel">
                            <div className="metric-icon cyan"><Cpu size={24} /></div>
                            <div className="metric-info">
                                <h3>Node Processing</h3>
                                <div className="metric-value">1.2 TB/s</div>
                            </div>
                        </div>
                        <div className="metric-card glass-panel">
                            <div className="metric-icon blue"><Globe size={24} /></div>
                            <div className="metric-info">
                                <h3>Global Reach</h3>
                                <div className="metric-value">142 Countries</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. UNIQUE COMPARISON SECTION (The Differentiator) */}
            <section className="comparison-section">
                <div className="vs-container">
                    <div className="vs-label">VS</div>
                    
                    {/* Left: Normal Connectivity */}
                    <div className="compare-card legacy">
                        <div className="card-header">
                            <ZapOff size={32} />
                            <h3>NORMAL CONNECTIVITY</h3>
                            <span className="status">LEGACY_SYSTEM</span>
                        </div>
                        <div className="compare-body">
                            <div className="compare-item negative">
                                <X size={16} />
                                <div>
                                    <h4>Static Node-Sync</h4>
                                    <p>Information is pulled manually causing 15-30min delays in sync.</p>
                                </div>
                            </div>
                            <div className="compare-item negative">
                                <X size={16} />
                                <div>
                                    <h4>Reactive Security</h4>
                                    <p>Threat detection only occurs after breach identification.</p>
                                </div>
                            </div>
                            <div className="compare-item negative">
                                <X size={16} />
                                <div>
                                    <h4>High Operational Friction</h4>
                                    <p>Human intervention required for routine data validation.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: VexioGate Digitalization */}
                    <div className="compare-card modern">
                        <div className="card-header">
                            <Zap size={32} />
                            <h3>VEXIOGATE DIGITALIZATION</h3>
                            <span className="status active">ACTIVE_MESH</span>
                        </div>
                        <div className="compare-body">
                            <div className="compare-item positive">
                                <Check size={16} />
                                <div>
                                    <h4>Neural Synchronization</h4>
                                    <p>Instantaneous data reflection across all global nodes simultaneously.</p>
                                </div>
                            </div>
                            <div className="compare-item positive">
                                <Check size={16} />
                                <div>
                                    <h4>Predictive Zero-Trust</h4>
                                    <p>AI-driven security mesh anticipates threats before they manifest.</p>
                                </div>
                            </div>
                            <div className="compare-item positive">
                                <Check size={16} />
                                <div>
                                    <h4>Frictionless Automation</h4>
                                    <p>Self-healing infrastructure minimizes human error and downtime.</p>
                                </div>
                            </div>
                        </div>
                        <div className="modern-glow"></div>
                    </div>
                </div>
            </section>

            {/* 4. Strategic Steps */}
            <section className="steps-section">
                <div className="steps-grid">
                    {[
                        { title: 'IDENTIFY', desc: 'Deep-audit of existing legacy infrastructure and nodes.', icon: <MousePointer2 /> },
                        { title: 'ORCHESTRATE', desc: 'Deploying the VexioGate mesh for unified synchronization.', icon: <Layers /> },
                        { title: 'VISUALIZE', desc: 'Converting raw telemetry into high-fidelity business BI.', icon: <PieChart /> }
                    ].map((step, i) => (
                        <div key={i} className="step-card">
                            <div className="step-count">STEP_0{i + 1}</div>
                            <div className="step-icon">{step.icon}</div>
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />

            <style>{`
                .strategy-root {
                    background: #030712;
                    color: #fff;
                    minHeight: 100vh;
                    overflow-x: hidden;
                    position: relative;
                }

                .cyber-grid {
                    position: fixed;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(255, 78, 240, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px);
                    background-size: 50px 50px;
                    pointer-events: none;
                    z-index: 1;
                }

                .scan-line {
                    position: fixed;
                    top: -100px;
                    left: 0;
                    right: 0;
                    height: 100px;
                    background: linear-gradient(to bottom, transparent, rgba(34, 211, 238, 0.05), transparent);
                    z-index: 1;
                    animation: scan 6s linear infinite;
                    pointer-events: none;
                }
                @keyframes scan { from { top: -100px; } to { top: 100vh; } }

                .data-stream {
                    position: fixed;
                    inset: 0;
                    z-index: 1;
                    pointer-events: none;
                    opacity: 0.3;
                }
                .stream-particle {
                    position: absolute;
                    top: -20px;
                    left: var(--l);
                    color: #22d3ee;
                    font-family: monospace;
                    font-size: 0.8rem;
                    animation: fall var(--d) linear infinite;
                    animation-delay: var(--s);
                }
                @keyframes fall { from { top: -20px; opacity: 1; } to { top: 100vh; opacity: 0; } }

                .strategy-hero {
                    padding: 200px 5% 100px;
                    display: flex;
                    justify-content: center;
                    text-align: center;
                    position: relative;
                    z-index: 2;
                }

                .floating-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 16px;
                    background: rgba(34, 211, 238, 0.1);
                    border: 1px solid rgba(34, 211, 238, 0.2);
                    border-radius: 20px;
                    color: #22d3ee;
                    font-size: 0.7rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    margin-bottom: 32px;
                }

                .glitch-text {
                    font-size: clamp(2.5rem, 10vw, 6rem);
                    font-weight: 950;
                    letter-spacing: -4px;
                    line-height: 0.9;
                    margin-bottom: 24px;
                    position: relative;
                }
                .cyan-glow { color: #22d3ee; text-shadow: 0 0 30px rgba(34, 211, 238, 0.4); }

                .hero-subtitle {
                    max-width: 650px;
                    margin: 0 auto 48px;
                    color: #94a3b8;
                    font-size: 1.2rem;
                    line-height: 1.7;
                }

                .hero-stats {
                    display: flex;
                    justify-content: center;
                    gap: 40px;
                    align-items: center;
                }
                .mini-stat { display: flex; flexDirection: column; align-items: center; }
                .stat-val { font-size: 2rem; font-weight: 950; color: #fff; }
                .stat-label { font-size: 0.65rem; color: #475569; letter-spacing: 2px; }
                .stat-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.1); }

                /* Dashboard Section */
                .dashboard-section { padding: 80px 5%; max-width: 1400px; margin: 0 auto; position: relative; z-index: 2; }
                .section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 48px; flex-wrap: wrap; gap: 24px; }
                .title-gradient { font-size: 2.5rem; font-weight: 950; color: #ff4ef0; }
                .tab-control { display: flex; background: rgba(255,255,255,0.03); padding: 4px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }
                .tab-control button { padding: 8px 20px; border: none; background: transparent; color: #64748b; font-size: 0.75rem; font-weight: 800; cursor: pointer; transition: 0.3s; border-radius: 8px; }
                .tab-control button.active { background: #22d3ee; color: #030712; }

                .dashboard-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 32px; }

                .chart-container { padding: 32px; min-height: 400px; display: flex; flex-direction: column; }
                .chart-header { display: flex; align-items: center; gap: 12px; font-size: 0.75rem; font-weight: 900; letter-spacing: 2px; color: #64748b; margin-bottom: 40px; }
                .cyan-text { color: #22d3ee; }
                .live-dot { width: 8px; height: 8px; background: #ef4444; border-radius: 50%; margin-left: auto; box-shadow: 0 0 10px #ef4444; animation: pulse 2s infinite; }
                @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }

                .visualizer { flex: 1; display: flex; align-items: flex-end; gap: 12px; padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .v-bar-wrapper { flex: 1; height: 100%; display: flex; align-items: flex-end; }
                .v-bar { width: 100%; height: 0; background: linear-gradient(to top, #ff4ef0, #22d3ee); border-radius: 4px 4px 0 0; position: relative; animation: grow 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: var(--d); }
                @keyframes grow { from { height: 0; } to { height: var(--h); } }
                .bar-glow { position: absolute; top: 0; left: 0; right: 0; height: 20px; background: #22d3ee; filter: blur(15px); opacity: 0.4; }
                .chart-labels { display: flex; justify-content: space-between; padding-top: 16px; color: #475569; font-size: 0.7rem; font-weight: 800; }

                .metrics-column { display: flex; flex-direction: column; gap: 20px; }
                .metric-card { display: flex; align-items: center; gap: 24px; padding: 24px; }
                .metric-icon { width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
                .metric-icon.purple { background: rgba(167, 139, 250, 0.1); color: #a78bfa; }
                .metric-icon.cyan { background: rgba(34, 211, 238, 0.1); color: #22d3ee; }
                .metric-icon.blue { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
                .metric-info h3 { font-size: 0.85rem; color: #64748b; margin-bottom: 4px; }
                .metric-value { font-size: 1.5rem; font-weight: 950; }
                .trend-up { color: #10b981; font-size: 0.9rem; }

                /* Comparison VS Section */
                .comparison-section { padding: 120px 5%; position: relative; z-index: 2; overflow: hidden; }
                .vs-container { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; max-width: 1200px; margin: 0 auto; position: relative; }
                .vs-label { 
                    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                    width: 80px; height: 80px; background: #030712; border: 1px solid rgba(255,255,255,0.1); 
                    border-radius: 50%; display: flex; align-items: center; justify-content: center; 
                    font-size: 1.5rem; font-weight: 950; color: #ff4ef0; z-index: 10;
                    box-shadow: 0 0 30px rgba(0,0,0,0.8);
                }

                .compare-card { padding: 60px 40px; border-radius: 32px; border: 1px solid rgba(255,255,255,0.05); position: relative; background: rgba(3, 7, 18, 0.5); backdrop-filter: blur(20px); }
                .compare-card.legacy { border-right: none; border-top-right-radius: 0; border-bottom-right-radius: 0; }
                .compare-card.modern { border-left: none; border-top-left-radius: 0; border-bottom-left-radius: 0; border: 1px solid rgba(34, 211, 238, 0.2); }
                .modern-glow { position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(34, 211, 238, 0.05) 0%, transparent 70%); pointer-events: none; }

                .card-header { text-align: center; margin-bottom: 48px; }
                .card-header h3 { font-size: 1.4rem; font-weight: 950; letter-spacing: 1px; margin: 16px 0 8px; }
                .status { font-size: 0.65rem; font-weight: 900; letter-spacing: 2px; color: #64748b; padding: 4px 12px; background: rgba(255,255,255,0.03); border-radius: 20px; }
                .status.active { color: #22d3ee; background: rgba(34, 211, 238, 0.1); }

                .compare-body { display: flex; flex-direction: column; gap: 32px; }
                .compare-item { display: flex; gap: 20px; }
                .compare-item.negative { color: #64748b; }
                .compare-item.positive { color: #fff; }
                .compare-item h4 { font-size: 1rem; margin-bottom: 6px; }
                .compare-item p { font-size: 0.85rem; color: #475569; line-height: 1.5; }
                .compare-item.positive p { color: #94a3b8; }

                /* Steps Section */
                .steps-section { padding: 100px 5%; max-width: 1400px; margin: 0 auto; position: relative; z-index: 2; }
                .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.05); }
                .step-card { background: #030712; padding: 60px 40px; transition: 0.4s; }
                .step-card:hover { background: rgba(255, 78, 240, 0.02); }
                .step-count { font-size: 0.7rem; font-weight: 900; color: #ff4ef0; letter-spacing: 3px; margin-bottom: 32px; }
                .step-icon { color: #22d3ee; margin-bottom: 24px; }
                .step-card h3 { font-size: 1.5rem; font-weight: 950; margin-bottom: 16px; }
                .step-card p { color: #64748b; font-size: 0.95rem; line-height: 1.6; }

                @media (max-width: 1024px) {
                    .dashboard-grid { grid-template-columns: 1fr; }
                    .vs-container { grid-template-columns: 1fr; gap: 40px; }
                    .vs-label { top: auto; left: 50%; bottom: -20px; transform: translateX(-50%); width: 60px; height: 60px; font-size: 1.2rem; }
                    .compare-card.legacy, .compare-card.modern { border-radius: 32px; border: 1px solid rgba(255,255,255,0.05); }
                    .compare-card.modern { border: 1px solid rgba(34, 211, 238, 0.2); }
                    .steps-grid { grid-template-columns: 1fr; }
                }

                @media (max-width: 768px) {
                    .strategy-hero { padding-top: 160px; }
                    .hero-stats { flex-direction: column; gap: 24px; }
                    .stat-divider { display: none; }
                }
            `}</style>
        </div>
    );
};

export default StrategyPage;
