import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import { servicesData } from '../data/servicesData';
import { 
    ChevronRight, 
    ArrowRight, 
    ShieldCheck, 
    Zap, 
    Activity, 
    Terminal, 
    Database, 
    Cpu, 
    Globe, 
    Layers, 
    Shield, 
    Code2,
    Settings,
    Server,
    MousePointer2,
    Palette,
    Smartphone,
    Search,
    PenTool,
    CheckCircle2
} from 'lucide-react';

const getSpecIcon = (label) => {
    const l = label.toLowerCase();
    if (l.includes('language')) return <Code2 size={20} />;
    if (l.includes('database')) return <Database size={20} />;
    if (l.includes('infrastructure')) return <Server size={20} />;
    if (l.includes('security')) return <Shield size={20} />;
    return <Settings size={20} />;
};

const UX3DVisualizer = ({ service }) => {
    const [activeLayer, setActiveLayer] = useState(1);
    const data = service.visualizerData;
    const isWebDev = service.id === 'web-development';
    const isITConsult = service.id === 'it-consultation';

    return (
        <div className="ux-visualizer-container">
            <div className="visualizer-main-grid">
                
                <div className="ux-stack-wrapper">
                    <div className="ux-stack">
                        {/* Layer 1: Strategy/Structural */}
                        <div 
                            className={`ux-layer layer-1 ${activeLayer === 1 ? 'active' : ''}`}
                            onMouseEnter={() => setActiveLayer(1)}
                            style={{ borderColor: activeLayer === 1 ? service.accentColor : 'rgba(255,255,255,0.05)' }}
                        >
                            <div className="layer-label" style={{ color: service.accentColor }}>{data[1].title}</div>
                            
                            {isWebDev ? (
                                <div className="web-dev-layer-1">
                                    <div className="code-tag t1">&lt;div&gt;</div>
                                    <div className="code-tag t2">&lt;section&gt;</div>
                                    <div className="code-tag t3">&lt;canvas /&gt;</div>
                                    <div className="dom-node d1"></div>
                                    <div className="dom-node d2"></div>
                                    <div className="dom-node d3"></div>
                                </div>
                            ) : isITConsult ? (
                                <div className="it-consult-layer-1">
                                    <div className="strategy-node s1"></div>
                                    <div className="strategy-node s2"></div>
                                    <div className="strategy-line"></div>
                                    <div className="roadmap-point r1"></div>
                                    <div className="roadmap-point r2"></div>
                                </div>
                            ) : (
                                <>
                                    <div className="mesh-grid"></div>
                                    <div className="interaction-point p1" style={{ borderColor: service.accentColor }}></div>
                                    <div className="interaction-point p2" style={{ borderColor: service.accentColor }}></div>
                                </>
                            )}
                        </div>

                        {/* Layer 2: Evolution/Visual */}
                        <div 
                            className={`ux-layer layer-2 ${activeLayer === 2 ? 'active' : ''}`}
                            onMouseEnter={() => setActiveLayer(2)}
                            style={{ borderColor: activeLayer === 2 ? service.accentColor : 'rgba(255,255,255,0.05)' }}
                        >
                            <div className="layer-label" style={{ color: service.accentColor }}>{data[2].title}</div>
                            
                            {isWebDev ? (
                                <div className="web-dev-layer-2">
                                    <div className="css-grid-lines">
                                        <div className="line-v"></div>
                                        <div className="line-v"></div>
                                        <div className="line-h"></div>
                                    </div>
                                    <div className="style-property s1">display: flex;</div>
                                    <div className="style-property s2">gap: 20px;</div>
                                </div>
                            ) : isITConsult ? (
                                <div className="it-consult-layer-2">
                                    <div className="stack-block b1"></div>
                                    <div className="stack-block b2"></div>
                                    <div className="stack-block b3"></div>
                                    <div className="connection-mesh"></div>
                                </div>
                            ) : (
                                <div className="ui-elements">
                                    <div className="ui-box card"></div>
                                    <div className="ui-box bar"></div>
                                    <div className="ui-box circle"></div>
                                </div>
                            )}
                        </div>

                        {/* Layer 3: Transformation/Logic */}
                        <div 
                            className={`ux-layer layer-3 ${activeLayer === 3 ? 'active' : ''}`}
                            onMouseEnter={() => setActiveLayer(3)}
                            style={{ borderColor: activeLayer === 3 ? service.accentColor : 'rgba(255,255,255,0.05)' }}
                        >
                            <div className="layer-label" style={{ color: service.accentColor }}>{data[3].title}</div>
                            
                            {isWebDev ? (
                                <div className="web-dev-layer-3">
                                    <div className="data-stream">
                                        <div className="stream-particle"></div>
                                        <div className="stream-particle"></div>
                                        <div className="stream-particle"></div>
                                    </div>
                                    <div className="api-call">GET /api/v1/deploy</div>
                                    <div className="logic-nodes">
                                        <div className="node n1" style={{ background: service.accentColor, boxShadow: `0 0 15px ${service.accentColor}` }}></div>
                                        <div className="node n2" style={{ background: service.accentColor, boxShadow: `0 0 15px ${service.accentColor}` }}></div>
                                    </div>
                                </div>
                            ) : isITConsult ? (
                                <div className="it-consult-layer-3">
                                    <div className="global-pulse"></div>
                                    <div className="enterprise-mesh">
                                        <div className="e-node en1"></div>
                                        <div className="e-node en2"></div>
                                        <div className="e-node en3"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="logic-nodes">
                                    <div className="node n1" style={{ background: service.accentColor, boxShadow: `0 0 15px ${service.accentColor}` }}></div>
                                    <div className="node n2" style={{ background: service.accentColor, boxShadow: `0 0 15px ${service.accentColor}` }}></div>
                                    <div className="node n3" style={{ background: service.accentColor, boxShadow: `0 0 15px ${service.accentColor}` }}></div>
                                    <div className="node n4" style={{ background: service.accentColor, boxShadow: `0 0 15px ${service.accentColor}` }}></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="layer-description-box" style={{ borderLeftColor: `${service.accentColor}20` }}>
                    <div className="step-tag" style={{ color: service.accentColor }}>LAYER 0{activeLayer}</div>
                    <h3 className="layer-info-title">{data[activeLayer].title}</h3>
                    <p className="layer-info-desc">{data[activeLayer].desc}</p>
                    <div className="layer-features">
                        <div className="feature-chip"><Zap size={14} color={service.accentColor} /> Peak Performance</div>
                        <div className="feature-chip"><Shield size={14} color={service.accentColor} /> Total Security</div>
                        <div className="feature-chip"><Activity size={14} color={service.accentColor} /> Elastic Scale</div>
                    </div>
                </div>

            </div>

            <style>{`
                .ux-visualizer-container {
                    margin: 80px 0;
                    padding: 60px;
                    background: rgba(255, 255, 255, 0.01);
                    border-radius: 40px;
                    border: 1px solid rgba(255, 255, 255, 0.03);
                }
                .visualizer-main-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 60px;
                    align-items: center;
                }
                .ux-stack-wrapper {
                    height: 500px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    perspective: 2000px;
                }
                .ux-stack {
                    position: relative;
                    width: 450px;
                    height: 320px;
                    transform-style: preserve-3d;
                    transform: rotateX(55deg) rotateZ(-30deg);
                    transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .ux-stack:hover {
                    transform: rotateX(45deg) rotateZ(-20deg) scale(1.05);
                }
                .ux-layer {
                    position: absolute;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.6);
                    border: 2px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    backdrop-filter: blur(12px);
                    display: flex;
                    flex-direction: column;
                    padding: 28px;
                    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                }
                .layer-1 { transform: translateZ(120px); }
                .layer-2 { transform: translateZ(60px); opacity: 0.8; }
                /* IT Consultation Specialized Visuals */
                .it-consult-layer-1 { position: relative; width: 100%; height: 100%; }
                .strategy-node { 
                    position: absolute; width: 15px; height: 15px; border-radius: 50%; 
                    background: ${service.accentColor}; box-shadow: 0 0 15px ${service.accentColor};
                }
                .s1 { top: 20%; left: 20%; }
                .s2 { top: 70%; left: 80%; }
                .strategy-line { 
                    position: absolute; top: 25%; left: 25%; width: 60%; height: 2px; 
                    background: linear-gradient(to right, ${service.accentColor}, transparent);
                    transform: rotate(35deg); transform-origin: left;
                    animation: strategy-flow 2s infinite linear;
                }
                .roadmap-point {
                    position: absolute; width: 8px; height: 8px; background: #fff; border-radius: 50%;
                }
                .r1 { top: 40%; left: 45%; }
                .r2 { top: 55%; left: 65%; }

                .it-consult-layer-2 { position: relative; width: 100%; height: 100%; display: flex; gap: 15px; align-items: center; justify-content: center; }
                .stack-block { 
                    width: 40px; height: 60px; background: rgba(255,255,255,0.05); 
                    border: 1px solid ${service.accentColor}; border-radius: 4px;
                    transition: 0.5s;
                }
                .b1 { transform: translateY(-10px); }
                .b3 { transform: translateY(10px); }
                .it-consult-layer-2:hover .stack-block { transform: scale(1.1); background: ${service.accentColor}20; }

                .it-consult-layer-3 { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
                .global-pulse {
                    position: absolute; width: 100px; height: 100px; border: 2px solid ${service.accentColor};
                    border-radius: 50%; animation: ping 3s infinite cubic-bezier(0, 0, 0.2, 1);
                }
                .enterprise-mesh { position: relative; z-index: 2; display: flex; gap: 20px; }
                .e-node { 
                    width: 12px; height: 12px; background: #fff; border-radius: 2px;
                    animation: node-pulse 2s infinite ease-in-out;
                }
                .en2 { animation-delay: 0.5s; }
                .en3 { animation-delay: 1s; }

                @keyframes strategy-flow {
                    0% { opacity: 0.2; transform: rotate(35deg) scaleX(0); }
                    50% { opacity: 1; transform: rotate(35deg) scaleX(1); }
                    100% { opacity: 0.2; transform: rotate(35deg) scaleX(0); }
                }

                @keyframes node-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.5); opacity: 1; }
                }

                @keyframes ping {
                    75%, 100% { transform: scale(2); opacity: 0; }
                }
                .layer-3 { transform: translateZ(0); opacity: 0.6; }

                .ux-layer.active {
                    background: rgba(255, 255, 255, 0.03);
                    border-color: rgba(255, 255, 255, 0.4);
                    transform: translateZ(150px) translateY(-20px);
                    box-shadow: 0 40px 100px rgba(0,0,0,0.5);
                    opacity: 1;
                }

                .layer-label {
                    font-size: 0.7rem;
                    font-weight: 900;
                    letter-spacing: 3px;
                    margin-bottom: 24px;
                    text-transform: uppercase;
                }
                
                /* Generic Visuals */
                .mesh-grid { flex: 1; background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px); background-size: 25px 25px; }
                .interaction-point { position: absolute; width: 40px; height: 40px; border-radius: 50%; background: rgba(255, 255, 255, 0.02); border: 1px solid #fff; opacity: 0; animation: pulse 3s infinite; }
                .p1 { top: 30%; left: 30%; animation-delay: 0s; }
                .p2 { bottom: 20%; right: 40%; animation-delay: 1.5s; }
                @keyframes pulse { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }

                /* Web Dev Specific Visuals */
                .web-dev-layer-1 { position: relative; flex: 1; }
                .code-tag { position: absolute; font-family: monospace; font-size: 0.6rem; color: ${service.accentColor}; opacity: 0.6; }
                .t1 { top: 10%; left: 10%; }
                .t2 { top: 40%; right: 10%; }
                .t3 { bottom: 10%; left: 20%; }
                .dom-node { position: absolute; width: 10px; height: 10px; background: #fff; border-radius: 2px; }
                .d1 { top: 20%; left: 50%; } .d2 { top: 50%; left: 30%; } .d3 { top: 70%; left: 60%; }

                .web-dev-layer-2 { position: relative; flex: 1; }
                .css-grid-lines { position: absolute; inset: 0; border: 1px dashed rgba(255,255,255,0.1); }
                .line-v { position: absolute; top: 0; bottom: 0; width: 1px; background: rgba(255,255,255,0.05); }
                .line-v:nth-child(1) { left: 33.33%; }
                .line-v:nth-child(2) { left: 66.66%; }
                .line-h { position: absolute; left: 0; right: 0; height: 1px; top: 50%; background: rgba(255,255,255,0.05); }
                .style-property { position: absolute; font-family: monospace; font-size: 0.5rem; background: rgba(0,0,0,0.3); padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); }
                .s1 { top: 20%; left: 10%; } .s2 { bottom: 20%; right: 10%; }

                .web-dev-layer-3 { position: relative; flex: 1; }
                .data-stream { position: absolute; width: 100%; height: 100%; }
                .stream-particle { position: absolute; width: 4px; height: 4px; background: ${service.accentColor}; border-radius: 50%; animation: stream 2s linear infinite; }
                .stream-particle:nth-child(1) { left: 10%; animation-delay: 0s; }
                .stream-particle:nth-child(2) { left: 50%; animation-delay: 0.7s; }
                .stream-particle:nth-child(3) { left: 80%; animation-delay: 1.4s; }
                @keyframes stream { from { top: -10%; opacity: 0; } 50% { opacity: 1; } to { top: 110%; opacity: 0; } }
                .api-call { position: absolute; bottom: 10px; width: 100%; text-align: center; font-family: monospace; font-size: 0.6rem; color: #94a3b8; }

                .ui-elements { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
                .ui-box { background: rgba(255, 255, 255, 0.05); border-radius: 8px; height: 30px; }
                .ui-box.card { grid-column: span 3; height: 100px; }
                .ui-box.bar { grid-column: span 4; height: 10px; }
                .ui-box.circle { width: 30px; border-radius: 50%; }

                .logic-nodes { position: relative; flex: 1; }
                .node { position: absolute; width: 12px; height: 12px; border-radius: 50%; }
                .n1 { top: 20%; left: 20%; } .n2 { top: 20%; right: 20%; } .n3 { bottom: 20%; left: 20%; } .n4 { bottom: 20%; right: 20%; }

                .layer-description-box {
                    padding: 40px;
                    border-left: 1px solid rgba(255, 255, 255, 0.05);
                }
                .step-tag { font-size: 0.7rem; font-weight: 900; letter-spacing: 2px; margin-bottom: 20px; }
                .layer-info-title { font-size: 2.2rem; font-weight: 900; color: #fff; margin-bottom: 20px; letter-spacing: -1.5px; }
                .layer-info-desc { color: #94a3b8; line-height: 1.8; font-size: 1.1rem; margin-bottom: 32px; }
                .layer-features { display: flex; flex-wrap: wrap; gap: 12px; }
                .feature-chip { 
                    display: flex; alignItems: center; gap: 8px; 
                    padding: 8px 16px; background: rgba(255, 255, 255, 0.03); 
                    border-radius: 30px; font-size: 0.75rem; font-weight: 700; color: #fff;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                @media (max-width: 1024px) {
                    .visualizer-main-grid { grid-template-columns: 1fr; }
                    .layer-description-box { border-left: none; border-top: 1px solid rgba(255, 255, 255, 0.05); padding: 40px 0 0; }
                    .ux-visualizer-container { padding: 30px; }
                }
            `}</style>
        </div>
    );
};
const serviceMetrics = {
    'web-development': [
        { value: '40%', label: 'Conversion Increase', desc: 'Average conversion rate optimization on upgraded landing pages.', percent: 40 },
        { value: '60%', label: 'LCP Speedup', desc: 'Reduction in Largest Contentful Paint rendering speeds globally.', percent: 60 },
        { value: '85%', label: 'Mobile Score', desc: 'Minimum Google Lighthouse mobile performance index target.', percent: 85 }
    ],
    'software-engineering': [
        { value: '99.99%', label: 'SLA Reliability', desc: 'System availability standard for custom cloud microservices.', percent: 99 },
        { value: '4.8x', label: 'Query Scalability', desc: 'Increase in database read-write throughput under heavy stress.', percent: 80 },
        { value: '90%', label: 'Bug Mitigation', desc: 'Drop in regression errors through unit coverage and clean architectures.', percent: 90 }
    ],
    'technical-support': [
        { value: '12m', label: 'Avg Support MTTR', desc: 'Mean time to resolve server or container warnings.', percent: 95 },
        { value: '24/7', label: 'Active Surveillance', desc: 'Continuous endpoint uptime check frequency.', percent: 100 },
        { value: '0', label: 'Vulnerability Leaks', desc: 'Zero database or gateway security compromises allowed.', percent: 100 }
    ],
    'it-consultation': [
        { value: '3.5x', label: 'Execution Speed', desc: 'Acceleration in technology deployment cycles.', percent: 75 },
        { value: '40%', label: 'Server Cost Cut', desc: 'Average operational savings through cloud configuration audits.', percent: 40 },
        { value: '100%', label: 'Stack Integrity', desc: 'Alignment score with Zero-Trust compliance standards.', percent: 100 }
    ],
    'custom-ui-ux': [
        { value: '150%', label: 'User Retention', desc: 'Growth in user sessions and engagement durations.', percent: 85 },
        { value: '50%', label: 'Friction Reduction', desc: 'Drop in customer check-out or sign-up dropouts.', percent: 50 },
        { value: '100%', label: 'Aesthetic Authority', desc: 'Bespoke design kits reflecting exclusive premium branding.', percent: 100 }
    ],
    'seo-analytics-setup': [
        { value: '10x', label: 'Index Velocity', desc: 'Speed increase in Google Search Console page crawling.', percent: 90 },
        { value: '100%', label: 'Telemetry Accuracy', desc: 'Visitor clicks and page views tracking validation.', percent: 100 },
        { value: '35%', label: 'Avg CTR Growth', desc: 'Improvement in organic click-through rates within 3 months.', percent: 35 }
    ],
    'ai-automation': [
        { value: '75%', label: 'Process Savings', desc: 'Drop in manual task operation costs via cognitive agents.', percent: 75 },
        { value: '24/7', label: 'Agent Uptime', desc: 'Autonomous LLM system execution availability.', percent: 100 },
        { value: '10x', label: 'Workflow Scale', desc: 'Scaling automated document classification and processing.', percent: 95 }
    ]
};

const ServiceDetailPage = () => {
    const { serviceId } = useParams();
    const service = servicesData[serviceId];

    useEffect(() => {
        window.scrollTo(0, 0);
        if (service) {
            document.title = `${service.title} | VP Group`;
        }
    }, [serviceId, service]);

    if (!service) {
        return <Navigate to="/" />;
    }

    return (
        <div style={{ background: '#0a0c10', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Ambient Background Grid */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.4 }}>
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                            <path d="M 50 0 L 0 0 0 50" fill="none" stroke={service.accentColor} strokeWidth="1" opacity="0.1"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <PageTemplate 
                title={service.title}
                subtitle={service.subtitle}
                description={service.description}
                techDetails={service.techDetails}
                procedures={service.procedures}
                suitability={service.suitability}
                icon={service.icon}
                showContact={false}
                showStandardGrid={false}
                fullScreenHero={true}
            >
                
                <div style={{ padding: '0 5%', maxWidth: '1400px', margin: '0 auto' }}>
                    {/* 3D Functional Mesh Section */}
                    <section style={{ marginTop: '40px', position: 'relative', zIndex: 1 }}>
                        <div className="section-title-box" style={{ justifyContent: 'center', textAlign: 'center', marginBottom: '60px' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '0.7rem', fontWeight: '900', color: service.accentColor, letterSpacing: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>Engineering Excellence</div>
                                <h2 className="section-heading" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: '900', color: '#fff', letterSpacing: '-1.5px' }}>Functional Mesh Architecture</h2>
                            </div>
                        </div>
                        
                        <UX3DVisualizer service={service} />

                        {/* Forensic Working Steps Mesh */}
                        <div className="section-title-box" style={{ marginTop: '120px' }}>
                            <div className="accent-line" style={{ background: service.accentColor }}></div>
                            <h2 className="section-heading" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: '900', color: '#fff', letterSpacing: '-1px' }}>Forensic Working Roadmap</h2>
                        </div>

                        <div className="working-steps-mesh">
                            {service.meshSteps.map((step, index) => (
                                <div key={index} className="step-mesh-card">
                                    <div className="step-icon-box" style={{ color: service.accentColor, background: `${service.accentColor}15` }}>
                                        <step.icon size={24} />
                                    </div>
                                    <h3 style={{ color: '#fff' }}>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Engineering Methodology */}
                    <section style={{ marginTop: 'clamp(100px, 15vw, 150px)', position: 'relative', zIndex: 1 }}>
                        <div className="section-title-box">
                            <div className="accent-line" style={{ background: service.accentColor }}></div>
                            <h2 className="section-heading" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: '900', color: '#fff', letterSpacing: '-1px' }}>Strategic Engineering Methodology</h2>
                        </div>
                        
                        <div className="process-list">
                            {service.processSteps.map((step, idx) => (
                                <div key={idx} className="process-step-item">
                                    <div className="step-number" style={{ color: service.accentColor }}>
                                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                                    </div>
                                    <div className="step-content">
                                        <h3 className="step-title">{step.title}</h3>
                                        <p className="step-desc">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Technical Specs & Performance */}
                    <section className="metrics-outer" style={{ position: 'relative', zIndex: 1 }}>
                        <div className="metrics-inner-grid">
                            <div className="metric-box">
                                <Activity size={32} color={service.accentColor} />
                                <div className="metric-text">
                                    <h4 className="metric-value">&lt; 50ms</h4>
                                    <p className="metric-label">System Latency</p>
                                </div>
                            </div>
                            <div className="metric-box">
                                <ShieldCheck size={32} color={service.accentColor} />
                                <div className="metric-text">
                                    <h4 className="metric-value">Zero-Trust</h4>
                                    <p className="metric-label">Security Protocol</p>
                                </div>
                            </div>
                            <div className="metric-box">
                                <Zap size={32} color={service.accentColor} />
                                <div className="metric-text">
                                    <h4 className="metric-value">99.9%</h4>
                                    <p className="metric-label">Uptime SLA</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Global Impact Dashboard (Each service) */}
                    <section style={{ marginTop: '120px', position: 'relative', zIndex: 1 }}>
                        <div className="section-title-box" style={{ justifyContent: 'center', textAlign: 'center', marginBottom: '60px' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '0.7rem', fontWeight: '900', color: service.accentColor, letterSpacing: '4px', marginBottom: '16px', textTransform: 'uppercase' }}>Worldwide Impact Data</div>
                                <h2 className="section-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', color: '#fff', letterSpacing: '-1.5px' }}>Global Performance Metrics</h2>
                            </div>
                        </div>

                        <div className="metrics-dashboard-grid">
                            {(serviceMetrics[serviceId] || serviceMetrics['web-development']).map((metric, idx) => {
                                const radius = 50;
                                const circumference = 2 * Math.PI * radius; // ~314.16
                                const strokeDashoffset = circumference - (circumference * metric.percent) / 100;
                                return (
                                    <div key={idx} className="glass-panel metric-dashboard-card" style={{ borderColor: `${service.accentColor}15` }}>
                                        <div className="circle-progress-container">
                                            <svg width="120" height="120" viewBox="0 0 120 120" className="progress-circle">
                                                <circle cx="60" cy="60" r={radius} fill="transparent" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="6" />
                                                <circle 
                                                    cx="60" 
                                                    cy="60" 
                                                    r={radius} 
                                                    fill="transparent" 
                                                    stroke={service.accentColor} 
                                                    strokeWidth="6"
                                                    strokeDasharray={circumference}
                                                    strokeDashoffset={strokeDashoffset}
                                                    strokeLinecap="round"
                                                    className="circle-bar"
                                                    style={{
                                                        transform: 'rotate(-90deg)',
                                                        transformOrigin: '50% 50%',
                                                        filter: `drop-shadow(0 0 6px ${service.accentColor})`
                                                    }}
                                                />
                                            </svg>
                                            <div className="circle-value" style={{ textShadow: `0 0 10px ${service.accentColor}60` }}>
                                                {metric.value}
                                            </div>
                                        </div>
                                        <div className="metric-dashboard-content">
                                            <h3>{metric.label}</h3>
                                            <p>{metric.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Final Call to Action */}
                    <section className="detail-footer" style={{ position: 'relative', zIndex: 1 }}>
                        <h2 className="footer-title">Architect Your Future.</h2>
                        <p className="footer-desc">
                            Partner with our lead architects to engineer a high-performance digital ecosystem that scales with your ambition.
                        </p>
                        <Link to="/help/contact" style={{ background: service.accentColor }} className="cta-action-btn">
                            CONSULT AN ARCHITECT <ArrowRight size={20} />
                        </Link>
                    </section>
                </div>

            </PageTemplate>

            <style>{`
                .section-title-box { display: flex; align-items: center; gap: 20px; margin-bottom: 48px; }
                .accent-line { width: 5px; height: 32px; border-radius: 4px; }
                .section-heading { color: #fff; font-size: 2.5rem; font-weight: 900; letter-spacing: -1.5px; }

                .working-steps-mesh {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 32px;
                    margin-top: 60px;
                }
                .step-mesh-card {
                    padding: 40px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 32px;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .step-mesh-card:hover { 
                    border-color: ${service.accentColor}50; 
                    transform: translateY(-12px); 
                    background: rgba(255, 255, 255, 0.04);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                }
                .step-icon-box {
                    width: 56px; height: 56px; border-radius: 16px;
                    display: flex; align-items: center; justify-content: center;
                    margin-bottom: 28px;
                }
                .step-mesh-card h3 { font-size: 1.3rem; font-weight: 900; margin-bottom: 16px; }
                .step-mesh-card p { font-size: 1rem; color: #94a3b8; line-height: 1.8; }

                .process-list { display: flex; flex-direction: column; gap: 32px; }
                .process-step-item { display: flex; gap: 40px; padding: 40px; background: rgba(255,255,255,0.01); border-radius: 24px; border: 1px solid rgba(255,255,255,0.03); transition: 0.3s; }
                .process-step-item:hover { background: rgba(255,255,255,0.03); border-color: ${service.accentColor}30; }
                .step-number { font-size: 3rem; font-weight: 900; opacity: 0.8; }
                .step-title { font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 12px; }
                .step-desc { color: #94a3b8; line-height: 1.7; font-size: 1.1rem; margin: 0; }

                .metrics-outer {
                    margin-top: 150px;
                    padding: 80px 60px;
                    background: rgba(255, 255, 255, 0.01);
                    border-radius: 48px;
                    border: 1px solid rgba(255, 255, 255, 0.03);
                }
                .metrics-inner-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 60px; }
                .metric-box { display: flex; align-items: center; gap: 24px; }
                .metric-value { font-size: 2rem; font-weight: 900; color: #fff; margin: 0; }
                .metric-label { font-size: 0.9rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px; margin-top: 4px; }

                .detail-footer {
                    margin-top: 150px;
                    padding: 150px 5%;
                    text-align: center;
                    background: radial-gradient(circle at 50% 0%, ${service.accentColor}15 0%, transparent 75%);
                    border-radius: 80px;
                }
                .footer-title { font-size: 4rem; font-weight: 900; color: #fff; margin-bottom: 24px; letter-spacing: -2px; }
                .footer-desc { color: #94a3b8; max-width: 700px; margin: 0 auto 56px; font-size: 1.25rem; line-height: 1.8; }
                .cta-action-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 16px;
                    padding: 24px 56px;
                    border-radius: 24px;
                    color: #fff;
                    font-weight: 900;
                    text-decoration: none;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-size: 1.1rem;
                }
                .cta-action-btn:hover {
                    transform: scale(1.05) translateY(-5px);
                    box-shadow: 0 20px 60px ${service.accentColor}40;
                }

                /* Metrics Dashboard styles */
                .metrics-dashboard-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 32px;
                    margin-top: 60px;
                }
                .metric-dashboard-card {
                    display: flex;
                    align-items: center;
                    gap: 28px;
                    padding: 36px;
                    background: rgba(255, 255, 255, 0.01);
                    border: 1px solid rgba(255, 255, 255, 0.04);
                    border-radius: 32px;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .metric-dashboard-card:hover {
                    transform: translateY(-8px);
                    background: rgba(255, 255, 255, 0.03);
                    border-color: ${service.accentColor}30;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
                }
                .circle-progress-container {
                    position: relative;
                    width: 120px;
                    height: 120px;
                    flex-shrink: 0;
                }
                .progress-circle {
                    width: 100%;
                    height: 100%;
                }
                .circle-value {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.4rem;
                    font-weight: 900;
                    color: #fff;
                }
                .metric-dashboard-content h3 {
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: #fff;
                    margin-bottom: 8px;
                }
                .metric-dashboard-content p {
                    font-size: 0.95rem;
                    color: #94a3b8;
                    line-height: 1.6;
                    margin: 0;
                }
                .circle-bar {
                    stroke-dashoffset: 314.16;
                    animation: circle-draw 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                @keyframes circle-draw {
                    to {
                        stroke-dashoffset: inherit;
                    }
                }

                @media (max-width: 1024px) {
                    .metrics-inner-grid { grid-template-columns: 1fr; gap: 40px; }
                    .process-step-item { flex-direction: column; gap: 20px; }
                    .footer-title { font-size: 3rem; }
                    .ux-stack { width: 350px; height: 250px; }
                }
                @media (max-width: 768px) {
                    .ux-visualizer-container { padding: 20px; margin: 40px 0; border-radius: 24px; }
                    .ux-stack-wrapper { height: 400px; }
                    .ux-stack { width: 280px; height: 200px; }
                    .layer-info-title { font-size: 1.8rem; }
                    .metrics-outer { padding: 40px 20px; border-radius: 24px; margin-top: 80px; }
                    .detail-footer { padding: 80px 20px; border-radius: 40px; margin-top: 80px; }
                    .footer-title { font-size: 2.2rem; }
                    .cta-action-btn { padding: 18px 30px; font-size: 0.9rem; width: 100%; justify-content: center; }
                    .section-heading { font-size: 2rem !important; }
                    .step-mesh-card { padding: 24px; border-radius: 20px; }
                    .process-step-item { padding: 24px; border-radius: 16px; }
                    .metrics-dashboard-grid { grid-template-columns: 1fr; }
                    .metric-dashboard-card { flex-direction: column; text-align: center; gap: 20px; }
                }
            `}</style>
        </div>
    );
};

export default ServiceDetailPage;
