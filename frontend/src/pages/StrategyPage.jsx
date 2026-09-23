import React, { useEffect, useState } from 'react';
import { Shield, Zap, BarChart3, TrendingUp, Cpu, Globe, PieChart, Activity, Layers, ArrowRight, Check, X, MousePointer2, ZapOff, Users, Award, Linkedin, Mail } from 'lucide-react';
import ProjectNavbar from '../components/ProjectNavbar';
import Footer from '../components/Footer';

const StrategyPage = () => {
    const [activeTab, setActiveTab] = useState('market'); // Default to market velocity

    useEffect(() => {
        document.title = "Our Strategy & Leadership | VP Group";
        if (window.location.hash === '#leadership') {
            const el = document.getElementById('leadership');
            if (el) {
                setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 150);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, []);

    const leadershipTeam = [
        {
            name: "Vaibhav Pratap Singh",
            role: "Founder & Chief Technology Architect",
            bio: "Leads visionary architectural initiatives across enterprise AI systems, high-concurrency cloud topologies, and zero-trust engineering meshes.",
            tag: "Executive Board",
            initials: "VP"
        },
        {
            name: "Dr. Aris Vance",
            role: "VP of AI Research & Neural Systems",
            bio: "Specializes in deterministic LLM orchestration, enterprise RAG topologies, and autonomous multi-agent evaluation frameworks.",
            tag: "AI Labs",
            initials: "AV"
        },
        {
            name: "Priya Sharma",
            role: "VP of Cloud & Site Reliability",
            bio: "Directs global multi-region Kubernetes clusters, FinOps governance, and 99.99% uptime SLA delivery for tier-1 enterprises.",
            tag: "Operations",
            initials: "PS"
        },
        {
            name: "Marcus Sterling",
            role: "Head of Enterprise Engineering",
            bio: "Orchestrates full-cycle software delivery across microservices, legacy modernization, and custom ERP transformations.",
            tag: "Engineering",
            initials: "MS"
        }
    ];

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
                    <h2 className="title-gradient">Performance <span className="differentiator-text">Differentiator</span></h2>
                    <div className="tab-control">
                        <button className={activeTab === 'market' ? 'active' : ''} onClick={() => setActiveTab('market')}>MARKET VELOCITY</button>
                        <button className={activeTab === 'impact' ? 'active' : ''} onClick={() => setActiveTab('impact')}>BUSINESS IMPACT</button>
                    </div>
                </div>

                <div className="dashboard-grid">
                    <div className="chart-container glass-panel">
                        <div className="chart-header">
                            <BarChart3 size={18} className="cyan-text" />
                            <span>{activeTab === 'market' ? 'VELOCITY_TELEMETRY' : 'IMPACT_PROJECTION'}</span>
                            <div className="live-dot"></div>
                        </div>
                        
                        <div className="visualizer-main">
                            {activeTab === 'market' ? (
                                <svg viewBox="0 0 800 300" className="chart-svg">
                                    <defs>
                                        <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                                            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M0 250 Q 100 280 200 150 T 400 180 T 600 100 T 800 40 L 800 300 L 0 300 Z" fill="url(#velocityGrad)" />
                                    <path d="M0 250 Q 100 280 200 150 T 400 180 T 600 100 T 800 40" 
                                          fill="none" stroke="#22d3ee" strokeWidth="4" className="path-animate-v" />
                                    {/* Data points */}
                                    {[250, 150, 180, 100, 40].map((y, i) => (
                                        <circle key={i} cx={i * 200} cy={y} r="5" fill="#22d3ee">
                                            <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
                                        </circle>
                                    ))}
                                </svg>
                            ) : (
                                <svg viewBox="0 0 800 300" className="chart-svg">
                                    <defs>
                                        <linearGradient id="impactGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#ff4ef0" stopOpacity="0.3" />
                                            <stop offset="100%" stopColor="#ff4ef0" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M0 280 Q 200 250 350 180 T 600 90 T 800 20 L 800 300 L 0 300 Z" fill="url(#impactGrad)" />
                                    <path d="M0 280 Q 200 250 350 180 T 600 90 T 800 20" 
                                          fill="none" stroke="#ff4ef0" strokeWidth="4" className="path-animate-i" />
                                    {/* Data points */}
                                    {[280, 180, 90, 20].map((y, i) => (
                                        <circle key={i} cx={i * 266} cy={y} r="5" fill="#ff4ef0">
                                            <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
                                        </circle>
                                    ))}
                                </svg>
                            )}
                        </div>

                        <div className="chart-footer">
                            <div className="stat-mini">
                                <span className="l">EFFICIENCY_DELTA</span>
                                <span className="v cyan-text">+412.8%</span>
                            </div>
                            <div className="stat-mini">
                                <span className="l">INFRA_OVERHEAD</span>
                                <span className="v purple-text">-64.2%</span>
                            </div>
                            <div className="stat-mini">
                                <span className="l">MTTR_INDEX</span>
                                <span className="v blue-text">0.08m</span>
                            </div>
                        </div>
                    </div>

                    <div className="metrics-column">
                        <div className="metric-card glass-panel">
                            <div className="metric-icon cyan">
                                <Cpu size={24} />
                            </div>
                            <div className="metric-info">
                                <h3>Compute Density</h3>
                                <div className="metric-value">4.8x <span className="trend-up">+18%</span></div>
                            </div>
                        </div>

                        <div className="metric-card glass-panel">
                            <div className="metric-icon purple">
                                <Shield size={24} />
                            </div>
                            <div className="metric-info">
                                <h3>Security Perimeter</h3>
                                <div className="metric-value">Zero-Trust <span className="trend-up">100%</span></div>
                            </div>
                        </div>

                        <div className="metric-card glass-panel">
                            <div className="metric-icon blue">
                                <Globe size={24} />
                            </div>
                            <div className="metric-info">
                                <h3>Global Mesh Node</h3>
                                <div className="metric-value">24 Edge <span className="trend-up">+4</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Performance Architecture Comparison */}
            <section className="comparison-section">
                <div className="vs-container">
                    <div className="vs-label">VS</div>
                    
                    {/* Old Way */}
                    <div className="compare-card legacy">
                        <div className="card-header">
                            <span className="status">CONVENTIONAL MODEL</span>
                            <h3>Siloed Tech Stacks</h3>
                            <p>Fragmented systems bound by manual sync protocols and vulnerable surface APIs.</p>
                        </div>
                        <div className="compare-body">
                            <div className="compare-item negative">
                                <ZapOff size={16} />
                                <div>
                                    <h4>High Latency Loops</h4>
                                    <p>Multi-vendor middleware slows data traversal down to seconds.</p>
                                </div>
                            </div>
                            <div className="compare-item negative">
                                <X size={16} />
                                <div>
                                    <h4>Monolithic Bottlenecks</h4>
                                    <p>Scaling requires full infrastructure duplication, inflating operational cost.</p>
                                </div>
                            </div>
                            <div className="compare-item negative">
                                <Shield size={16} />
                                <div>
                                    <h4>Vulnerable Interconnects</h4>
                                    <p>Point-to-point connections expand the perimeter surface attack vector.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* New Way */}
                    <div className="compare-card modern">
                        <div className="modern-glow"></div>
                        <div className="card-header">
                            <span className="status active">VP GROUP STANDARD</span>
                            <h3>Deep-Mesh Digitalization</h3>
                            <p>End-to-end unified architectural substrate with deterministic telemetry.</p>
                        </div>
                        <div className="compare-body">
                            <div className="compare-item positive">
                                <Zap size={16} />
                                <div>
                                    <h4>Sub-Millisecond Sync</h4>
                                    <p>Direct memory-mapped data buses eliminate traditional I/O delays.</p>
                                </div>
                            </div>
                            <div className="compare-item positive">
                                <Layers size={16} />
                                <div>
                                    <h4>Dynamic Elastic Sharding</h4>
                                    <p>Compute dynamically provisions precisely where throughput demand surges.</p>
                                </div>
                            </div>
                            <div className="compare-item positive">
                                <Check size={16} />
                                <div>
                                    <h4>Predictive Shield</h4>
                                    <p>AI-driven threat pre-emption before the perimeter is even touched.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Strategic Steps */}
            <section className="steps-section">
                <div className="steps-grid">
                    <div className="step-card">
                        <div className="step-count">PHASE_01</div>
                        <h3>INGESTION</h3>
                        <p>Raw institutional data is forensically mapped into the Zero-Trust mesh.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-count">PHASE_02</div>
                        <h3>ORCHESTRATION</h3>
                        <p>Algorithms organize nodes for maximum operational velocity.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-count">PHASE_03</div>
                        <h3>EXPANSION</h3>
                        <p>The mesh scales infinitely without degrading security or speed.</p>
                    </div>
                </div>
            </section>

            {/* 5. Executive Leadership Section */}
            <section id="leadership" className="leadership-section">
                <div className="section-header" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="floating-badge">
                        <Users size={14} />
                        <span>EXECUTIVE GOVERNANCE</span>
                    </div>
                    <h2 className="title-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', margin: '12px 0' }}>
                        Executive <span className="differentiator-text">Leadership</span>
                    </h2>
                    <p style={{ maxWidth: '640px', color: 'var(--halo-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                        The architects, researchers, and engineers steering VP Group's global technological infrastructure and innovation.
                    </p>
                </div>

                <div className="leadership-grid">
                    {leadershipTeam.map((leader, idx) => (
                        <div key={idx} className="leader-card glass-panel">
                            <div className="leader-top">
                                <div className="leader-avatar">
                                    {leader.initials}
                                </div>
                                <span className="leader-tag">{leader.tag}</span>
                            </div>
                            <h3 className="leader-name">{leader.name}</h3>
                            <div className="leader-role">{leader.role}</div>
                            <p className="leader-bio">{leader.bio}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />

            <style>{`
                .strategy-root { 
                    background: var(--halo-bg); 
                    color: var(--halo-on-surface); 
                    min-height: 100vh; 
                    overflow-x: hidden; 
                    position: relative;
                    transition: background-color 0.3s ease, color 0.3s ease;
                }
                
                .cyber-grid {
                    position: fixed;
                    inset: 0;
                    background-image: 
                        linear-gradient(var(--halo-border) 1px, transparent 1px),
                        linear-gradient(90deg, var(--halo-border) 1px, transparent 1px);
                    background-size: 50px 50px;
                    pointer-events: none;
                    z-index: 1;
                    opacity: 0.35;
                }

                .scan-line {
                    position: fixed;
                    top: -100px;
                    left: 0;
                    right: 0;
                    height: 100px;
                    background: linear-gradient(to bottom, transparent, var(--halo-focus), transparent);
                    z-index: 1;
                    animation: scan 6s linear infinite;
                    pointer-events: none;
                    opacity: 0.3;
                }
                @keyframes scan { from { top: -100px; } to { top: 100vh; } }

                .data-stream {
                    position: fixed;
                    inset: 0;
                    z-index: 1;
                    pointer-events: none;
                    opacity: 0.2;
                }
                .stream-particle {
                    position: absolute;
                    top: -20px;
                    left: var(--l);
                    color: var(--halo-primary);
                    font-family: monospace;
                    font-size: 0.8rem;
                    animation: fall var(--d) linear infinite;
                    animation-delay: var(--s);
                }
                @keyframes fall { from { top: -20px; opacity: 1; } to { top: 100vh; opacity: 0; } }

                .strategy-hero {
                    padding: 180px 5% 90px;
                    display: flex;
                    justify-content: center;
                    text-align: center;
                    position: relative;
                    z-index: 2;
                }

                .hero-content { max-width: 900px; }

                .floating-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 16px;
                    background: var(--halo-surface);
                    border: 1px solid var(--halo-border);
                    border-radius: 20px;
                    color: var(--halo-primary);
                    font-size: 0.7rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    margin-bottom: 32px;
                    box-shadow: var(--halo-shadow-sm);
                }

                .glitch-text {
                    font-size: clamp(2.5rem, 8vw, 5rem);
                    font-weight: 950;
                    letter-spacing: -2px;
                    line-height: 1.05;
                    margin-bottom: 24px;
                    color: var(--halo-on-surface);
                }
                .cyan-glow { 
                    color: var(--halo-primary); 
                }

                .hero-subtitle {
                    max-width: 650px;
                    margin: 0 auto 48px;
                    color: var(--halo-muted);
                    font-size: 1.15rem;
                    line-height: 1.7;
                }

                .hero-stats {
                    display: flex;
                    justify-content: center;
                    gap: 40px;
                    align-items: center;
                }
                .mini-stat { display: flex; flex-direction: column; align-items: center; }
                .stat-val { font-size: 2rem; font-weight: 950; color: var(--halo-on-surface); }
                .stat-label { font-size: 0.65rem; color: var(--halo-muted); letter-spacing: 2px; font-weight: 700; margin-top: 4px; }
                .stat-divider { width: 1px; height: 40px; background: var(--halo-border); }

                /* Dashboard Section */
                .dashboard-section { padding: 60px 5% 80px; max-width: 1400px; margin: 0 auto; position: relative; z-index: 2; }
                .section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 48px; flex-wrap: wrap; gap: 24px; }
                .title-gradient { font-size: 2.5rem; font-weight: 950; color: var(--halo-on-surface); letter-spacing: -1px; }
                .differentiator-text { color: var(--halo-primary); }
                .tab-control { display: flex; background: var(--halo-surface); padding: 4px; border-radius: 12px; border: 1px solid var(--halo-border); }
                .tab-control button { padding: 8px 20px; border: none; background: transparent; color: var(--halo-muted); font-size: 0.75rem; font-weight: 800; cursor: pointer; transition: 0.3s; border-radius: 8px; }
                .tab-control button.active { background: var(--halo-primary); color: #ffffff; }

                .dashboard-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 32px; }
                .chart-container { 
                    padding: 40px; 
                    position: relative; 
                    background: var(--halo-surface);
                    border: 1px solid var(--halo-border);
                    border-radius: 24px;
                    box-shadow: var(--halo-shadow-sm);
                }
                .chart-header { display: flex; align-items: center; gap: 12px; margin-bottom: 40px; font-size: 0.75rem; font-weight: 900; color: var(--halo-muted); letter-spacing: 2px; }
                .live-dot { width: 8px; height: 8px; background: #22d3ee; border-radius: 50%; box-shadow: 0 0 10px #22d3ee; animation: pulse 2s infinite; }
                @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }

                .visualizer-main { height: 320px; display: flex; align-items: flex-end; padding-bottom: 20px; position: relative; }
                .chart-svg { width: 100%; height: 100%; }
                
                .path-animate-v { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: draw 4s forwards infinite; }
                .path-animate-i { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: draw 6s forwards infinite; }
                @keyframes draw { to { stroke-dashoffset: 0; } }

                .chart-footer { display: flex; gap: 40px; margin-top: 32px; border-top: 1px solid var(--halo-border); padding-top: 24px; flex-wrap: wrap; }
                .stat-mini { display: flex; flex-direction: column; gap: 4px; }
                .stat-mini .l { font-size: 0.65rem; font-weight: 950; color: var(--halo-muted); letter-spacing: 1.5px; }
                .stat-mini .v { font-size: 1.25rem; font-weight: 950; color: var(--halo-on-surface); }
                .cyan-text { color: #22d3ee; }
                .purple-text { color: #8b5cf6; }
                .blue-text { color: #3b82f6; }

                .metrics-column { display: flex; flex-direction: column; gap: 20px; }
                .metric-card { 
                    padding: 28px; 
                    display: flex; 
                    align-items: center; 
                    gap: 20px; 
                    background: var(--halo-surface);
                    border: 1px solid var(--halo-border);
                    border-radius: 20px;
                    box-shadow: var(--halo-shadow-sm);
                }
                .metric-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
                .metric-icon.purple { color: #8b5cf6; background: rgba(139, 92, 246, 0.12); }
                .metric-icon.cyan { color: #0284c7; background: rgba(2, 132, 199, 0.12); }
                .metric-icon.blue { color: #2563eb; background: rgba(37, 99, 235, 0.12); }
                .metric-info h3 { font-size: 0.78rem; font-weight: 800; color: var(--halo-muted); text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0; }
                .metric-value { font-size: 1.45rem; font-weight: 950; color: var(--halo-on-surface); }
                .trend-up { color: #16a34a; font-size: 0.8rem; margin-left: 8px; font-weight: 700; }

                /* Comparison Section */
                .comparison-section { padding: 60px 5% 80px; max-width: 1400px; margin: 0 auto; position: relative; z-index: 2; }
                .vs-container { 
                    display: grid; 
                    grid-template-columns: 1fr 1fr; 
                    gap: 24px; 
                    position: relative; 
                }
                .vs-label { 
                    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                    width: 64px; height: 64px; background: var(--halo-surface); border: 2px solid var(--halo-primary);
                    border-radius: 50%; display: flex; align-items: center; justify-content: center;
                    font-size: 1.25rem; font-weight: 950; color: var(--halo-primary); z-index: 10;
                    box-shadow: var(--halo-shadow-md);
                }

                .compare-card { 
                    padding: 48px 36px; 
                    border-radius: 24px; 
                    position: relative; 
                    background: var(--halo-surface); 
                    border: 1px solid var(--halo-border);
                    box-shadow: var(--halo-shadow-sm);
                }
                .compare-card.modern { border-color: var(--halo-primary); }

                .card-header { text-align: center; margin-bottom: 36px; }
                .card-header h3 { font-size: 1.4rem; font-weight: 950; letter-spacing: -0.5px; margin: 16px 0 8px; color: var(--halo-on-surface); }
                .card-header p { color: var(--halo-muted); font-size: 0.95rem; margin: 0; line-height: 1.5; }
                .status { font-size: 0.65rem; font-weight: 900; letter-spacing: 2px; color: var(--halo-muted); padding: 4px 12px; background: var(--halo-elevated); border-radius: 20px; }
                .status.active { color: #ffffff; background: var(--halo-primary); }

                .compare-body { display: flex; flex-direction: column; gap: 24px; }
                .compare-item { display: flex; gap: 16px; align-items: flex-start; }
                .compare-item h4 { font-size: 1rem; margin: 0 0 4px 0; color: var(--halo-on-surface); font-weight: 800; }
                .compare-item p { font-size: 0.88rem; color: var(--halo-muted); line-height: 1.5; margin: 0; }
                .compare-item.negative svg { color: #ef4444; flex-shrink: 0; margin-top: 2px; }
                .compare-item.positive svg { color: #16a34a; flex-shrink: 0; margin-top: 2px; }

                /* Steps Section */
                .steps-section { padding: 40px 5% 90px; max-width: 1400px; margin: 0 auto; position: relative; z-index: 2; }
                .steps-grid { 
                    display: grid; 
                    grid-template-columns: repeat(3, 1fr); 
                    gap: 20px; 
                }
                .step-card { 
                    background: var(--halo-surface); 
                    border: 1px solid var(--halo-border);
                    border-radius: 20px;
                    padding: 48px 32px; 
                    transition: all 0.3s ease; 
                    box-shadow: var(--halo-shadow-sm);
                }
                .step-card:hover { transform: translateY(-4px); border-color: var(--halo-primary); }
                .step-count { font-size: 0.72rem; font-weight: 900; color: var(--halo-primary); letter-spacing: 2.5px; margin-bottom: 20px; }
                .step-card h3 { font-size: 1.35rem; font-weight: 950; margin: 0 0 12px 0; color: var(--halo-on-surface); }
                .step-card p { color: var(--halo-muted); font-size: 0.95rem; line-height: 1.6; margin: 0; }

                /* Leadership Section */
                .leadership-section {
                    padding: 80px 5% 140px;
                    max-width: 1400px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 2;
                    border-top: 1px solid var(--halo-border);
                }
                .leadership-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 24px;
                    margin-top: 48px;
                }
                .leader-card {
                    background: var(--halo-surface);
                    border: 1px solid var(--halo-border);
                    border-radius: 24px;
                    padding: 36px 28px;
                    transition: all 0.3s ease;
                    box-shadow: var(--halo-shadow-sm);
                    display: flex;
                    flex-direction: column;
                }
                .leader-card:hover {
                    transform: translateY(-4px);
                    border-color: var(--halo-primary);
                    box-shadow: var(--halo-shadow-md);
                }
                .leader-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                }
                .leader-avatar {
                    width: 52px;
                    height: 52px;
                    border-radius: 16px;
                    background: linear-gradient(135deg, var(--halo-primary) 0%, #8b5cf6 100%);
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 900;
                    font-size: 1.1rem;
                    letter-spacing: 1px;
                }
                .leader-tag {
                    font-size: 0.7rem;
                    font-weight: 800;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    background: var(--halo-elevated);
                    color: var(--halo-primary);
                    padding: 4px 10px;
                    border-radius: 12px;
                    border: 1px solid var(--halo-border);
                }
                .leader-name {
                    font-size: 1.3rem;
                    font-weight: 850;
                    color: var(--halo-on-surface);
                    margin: 0 0 6px 0;
                    letter-spacing: -0.02em;
                }
                .leader-role {
                    font-size: 0.82rem;
                    font-weight: 700;
                    color: var(--halo-primary);
                    margin-bottom: 16px;
                }
                .leader-bio {
                    font-size: 0.92rem;
                    color: var(--halo-muted);
                    line-height: 1.6;
                    margin: 0;
                }

                @media (max-width: 1024px) {
                    .dashboard-grid { grid-template-columns: 1fr; }
                    .vs-container { grid-template-columns: 1fr; gap: 32px; }
                    .vs-label { display: none; }
                    .steps-grid { grid-template-columns: 1fr; }
                }

                @media (max-width: 768px) {
                    .strategy-hero { padding-top: 140px; }
                    .hero-stats { flex-direction: column; gap: 20px; }
                    .stat-divider { display: none; }
                    .chart-container { padding: 24px 16px; }
                    .compare-card { padding: 32px 20px; }
                    .leadership-section { padding-top: 50px; padding-bottom: 80px; }
                }
            `}</style>
        </div>
    );
};

export default StrategyPage;
