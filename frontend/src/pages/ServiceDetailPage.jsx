import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import { servicesData } from '../data/servicesData';
import { animate, remove, stagger, svg } from 'animejs';
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
    const { serviceId } = useParams();
    const [activeLayer, setActiveLayer] = useState(1);
    const data = service.visualizerData;

    useEffect(() => {
        // Clear any running animations on layer components
        remove('.ux-layer *');

        // General entry fade-in for the active layer contents
        animate(`.ux-layer.active *`, {
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 600,
            easing: 'easeOutQuad',
            delay: stagger(40)
        });

        // Layer 1 Custom Service Animations
        if (activeLayer === 1) {
            if (serviceId === 'web-development') {
                animate('.d1, .d2, .d3', {
                    translateX: [0, 10],
                    translateY: [0, 10],
                    duration: 1500,
                    direction: 'alternate',
                    loop: true,
                    easing: 'easeInOutSine'
                });
            } else if (serviceId === 'software-engineering') {
                animate('.packet', {
                    translateY: [0, 30],
                    translateX: [0, 15],
                    opacity: [1, 0],
                    loop: true,
                    duration: 1200,
                    easing: 'easeInOutQuad'
                });
            } else if (serviceId === 'technical-support') {
                animate('.threat-particle', {
                    translateX: [50, 0],
                    translateY: [50, 0],
                    opacity: [1, 0],
                    scale: [1, 0.2],
                    loop: true,
                    duration: 1000,
                    easing: 'easeInQuad',
                    delay: stagger(300)
                });
            } else if (serviceId === 'custom-ui-ux') {
                animate('.skeleton-card, .skeleton-circle', {
                    borderColor: ['rgba(236, 72, 153, 0.2)', 'rgba(236, 72, 153, 0.6)'],
                    duration: 1000,
                    direction: 'alternate',
                    loop: true,
                    easing: 'easeInOutSine'
                });
            } else if (serviceId === 'seo-analytics-setup') {
                animate('.crawler-spider', {
                    translateX: [-20, 20],
                    translateY: [-20, 20],
                    duration: 2000,
                    direction: 'alternate',
                    loop: true,
                    easing: 'easeInOutQuad'
                });
            } else if (serviceId === 'ai-automation') {
                animate('.neural-node', {
                    background: ['#22d3ee', '#ec4899', '#a855f7'],
                    delay: stagger(150),
                    duration: 1200,
                    direction: 'alternate',
                    loop: true,
                    easing: 'easeInOutSine'
                });
            }
        }

        // Layer 2 Custom Service Animations
        if (activeLayer === 2) {
            if (serviceId === 'software-engineering') {
                animate('.db-replica', {
                    borderColor: ['rgba(255,255,255,0.05)', 'rgba(168, 85, 247, 0.4)'],
                    delay: stagger(300),
                    duration: 1000,
                    direction: 'alternate',
                    loop: true,
                    easing: 'easeInOutSine'
                });
            } else if (serviceId === 'technical-support') {
                animate('.sync-indicator', {
                    scale: [0.8, 1.4],
                    opacity: [0.4, 1],
                    duration: 1200,
                    direction: 'alternate',
                    loop: true,
                    easing: 'easeInOutQuad'
                });
            } else if (serviceId === 'custom-ui-ux') {
                animate('.color-swatch', {
                    scale: [0.8, 1.2],
                    delay: stagger(100),
                    duration: 800,
                    direction: 'alternate',
                    loop: true,
                    easing: 'easeInOutSine'
                });
            } else if (serviceId === 'seo-analytics-setup') {
                animate('.seo-progress', {
                    width: ['0%', '85%'],
                    duration: 1500,
                    easing: 'easeOutExpo'
                });
            } else if (serviceId === 'ai-automation') {
                animate('.rag-doc', {
                    translateY: [-5, 5],
                    duration: 1500,
                    direction: 'alternate',
                    loop: true,
                    easing: 'easeInOutSine'
                });
            }
        }

        // Layer 3 Custom Service Animations
        if (activeLayer === 3) {
            if (serviceId === 'web-development') {
                animate('.flow-bullet', {
                    left: ['0%', '100%'],
                    loop: true,
                    duration: 1000,
                    easing: 'linear'
                });
            } else if (serviceId === 'software-engineering') {
                animate('.msg-cell', {
                    opacity: [0.2, 1],
                    delay: stagger(150),
                    duration: 600,
                    direction: 'alternate',
                    loop: true,
                    easing: 'easeInOutSine'
                });
            } else if (serviceId === 'technical-support') {
                const path = document.querySelector('.heartbeat-path');
                if (path) {
                    const drawables = svg.createDrawable(path, 0, 0);
                    animate(drawables, {
                        draw: '0 1',
                        duration: 1500,
                        loop: true,
                        easing: 'linear'
                    });
                }
            } else if (serviceId === 'custom-ui-ux') {
                const runRipple = () => {
                    animate('.ripple-ring', {
                        scale: [1, 2.5],
                        opacity: [1, 0],
                        duration: 1000,
                        easing: 'easeOutQuart',
                        complete: () => {
                            setTimeout(runRipple, 1500);
                        }
                    });
                };
                runRipple();
            } else if (serviceId === 'ai-automation') {
                animate('.orbit-particle', {
                    translateX: [
                        { value: -20 },
                        { value: 0 },
                        { value: 20 },
                        { value: 0 }
                    ],
                    translateY: [
                        { value: 0 },
                        { value: 20 },
                        { value: 0 },
                        { value: -20 }
                    ],
                    loop: true,
                    duration: 2000,
                    easing: 'linear'
                });
            }
        }
    }, [activeLayer, serviceId]);

    const renderLayer1 = () => {
        switch (serviceId) {
            case 'web-development':
                return (
                    <div className="web-dev-layer-1 relative h-full flex items-center justify-center">
                        <div className="code-tag font-mono text-[9px] text-cyan-400 opacity-60 absolute t1">&lt;div class="dom"&gt;</div>
                        <div className="code-tag font-mono text-[9px] text-cyan-400 opacity-60 absolute t2">&lt;main class="mesh"&gt;</div>
                        <div className="code-tag font-mono text-[9px] text-cyan-400 opacity-60 absolute t3">&lt;Canvas /&gt;</div>
                        <div className="dom-node d1 size-3 bg-white rounded absolute"></div>
                        <div className="dom-node d2 size-3 bg-white rounded absolute"></div>
                        <div className="dom-node d3 size-3 bg-white rounded absolute"></div>
                    </div>
                );
            case 'software-engineering':
                return (
                    <div className="soft-eng-layer-1 relative h-full flex flex-col items-center justify-center gap-4">
                        <div className="load-balancer border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 rounded-lg text-[9px] font-bold text-purple-400 tracking-wider">LOAD BALANCER</div>
                        <div className="flex gap-4">
                            <div className="worker-node w-12 h-6 border border-white/10 bg-white/5 rounded flex items-center justify-center text-[7px] text-zinc-400">Node A</div>
                            <div className="worker-node w-12 h-6 border border-white/10 bg-white/5 rounded flex items-center justify-center text-[7px] text-zinc-400">Node B</div>
                            <div className="worker-node w-12 h-6 border border-white/10 bg-white/5 rounded flex items-center justify-center text-[7px] text-zinc-400">Node C</div>
                        </div>
                        <div className="packet size-2 bg-purple-400 rounded-full absolute"></div>
                    </div>
                );
            case 'technical-support':
                return (
                    <div className="tech-sup-layer-1 relative h-full flex items-center justify-center">
                        <div className="shield-ring size-20 rounded-full border-2 border-dashed border-emerald-500/30 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                            <div className="size-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <Shield size={16} className="text-emerald-400" />
                            </div>
                        </div>
                        <div className="threat-particle size-1.5 bg-rose-500 rounded-full absolute"></div>
                        <div className="threat-particle size-1.5 bg-rose-500 rounded-full absolute"></div>
                    </div>
                );
            case 'it-consultation':
                return (
                    <div className="it-consult-layer-1 relative h-full flex items-center justify-center gap-2">
                        <div className="strat-node n1 size-3 bg-indigo-400 rounded-full"></div>
                        <div className="strat-line h-0.5 w-12 bg-indigo-500/30"></div>
                        <div className="strat-node n2 size-3 bg-indigo-400 rounded-full"></div>
                        <div className="strat-line h-0.5 w-12 bg-indigo-500/30"></div>
                        <div className="strat-node n3 size-3 bg-indigo-400 rounded-full"></div>
                    </div>
                );
            case 'custom-ui-ux':
                return (
                    <div className="uiux-layer-1 relative h-full flex items-center justify-center gap-4">
                        <div className="skeleton-card w-24 h-16 border border-dashed border-pink-500/30 rounded-xl flex flex-col justify-between p-2">
                            <div className="h-1 w-8 bg-pink-500/20 rounded"></div>
                            <div className="h-2 w-16 bg-pink-500/20 rounded"></div>
                            <div className="h-2 w-10 bg-pink-500/20 rounded"></div>
                        </div>
                        <div className="skeleton-circle size-10 border border-dashed border-pink-500/30 rounded-full"></div>
                    </div>
                );
            case 'seo-analytics-setup':
                return (
                    <div className="seo-layer-1 relative h-full flex items-center justify-center">
                        <div className="crawler-spider size-6 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center"><Search size={10} className="text-amber-400" /></div>
                        <svg className="absolute inset-0 w-full h-full">
                            <path className="spider-web stroke-amber-500/20 fill-none" strokeWidth="1" d="M 20 20 L 100 100 M 180 20 L 100 100 M 20 180 L 100 100 M 180 180 L 100 100" />
                        </svg>
                    </div>
                );
            case 'ai-automation':
                return (
                    <div className="ai-layer-1 relative h-full flex items-center justify-center gap-6">
                        <div className="neural-nodes flex flex-col gap-3">
                            <div className="neural-node size-2 bg-cyan-400 rounded-full"></div>
                            <div className="neural-node size-2 bg-cyan-400 rounded-full"></div>
                        </div>
                        <div className="neural-nodes flex flex-col gap-3">
                            <div className="neural-node size-2 bg-purple-400 rounded-full"></div>
                            <div className="neural-node size-2 bg-purple-400 rounded-full"></div>
                            <div className="neural-node size-2 bg-purple-400 rounded-full"></div>
                        </div>
                        <div className="neural-nodes flex flex-col gap-3">
                            <div className="neural-node size-2 bg-pink-400 rounded-full"></div>
                            <div className="neural-node size-2 bg-pink-400 rounded-full"></div>
                        </div>
                    </div>
                );
            default:
                return (
                    <>
                        <div className="mesh-grid"></div>
                        <div className="interaction-point p1" style={{ borderColor: service.accentColor }}></div>
                        <div className="interaction-point p2" style={{ borderColor: service.accentColor }}></div>
                    </>
                );
        }
    };

    const renderLayer2 = () => {
        switch (serviceId) {
            case 'web-development':
                return (
                    <div className="web-dev-layer-2 relative h-full flex items-center justify-center p-4">
                        <div className="grid-container w-full h-24 border border-dashed border-cyan-500/20 rounded-xl grid grid-cols-3 gap-2 p-2">
                            <div className="grid-box bg-cyan-500/5 border border-cyan-500/10 rounded-lg"></div>
                            <div className="grid-box bg-cyan-500/5 border border-cyan-500/10 rounded-lg col-span-2"></div>
                        </div>
                    </div>
                );
            case 'software-engineering':
                return (
                    <div className="soft-eng-layer-2 relative h-full flex items-center justify-center gap-6">
                        <div className="db-master size-12 border border-purple-500/30 bg-purple-500/10 rounded-xl flex flex-col items-center justify-center text-[7px] text-purple-300">
                            <Database size={12} />
                            Master
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="db-replica w-12 h-5 border border-white/10 bg-white/5 rounded flex items-center justify-center text-[6px] text-zinc-400">Replica 1</div>
                            <div className="db-replica w-12 h-5 border border-white/10 bg-white/5 rounded flex items-center justify-center text-[6px] text-zinc-400">Replica 2</div>
                        </div>
                    </div>
                );
            case 'technical-support':
                return (
                    <div className="tech-sup-layer-2 relative h-full flex items-center justify-center gap-4">
                        <div className="host-server size-10 border border-white/10 bg-white/5 rounded flex items-center justify-center text-[7px] text-zinc-400">Active</div>
                        <div className="sync-indicator size-3 border border-emerald-500/30 rounded-full flex items-center justify-center"><Activity size={8} className="text-emerald-400" /></div>
                        <div className="backup-server size-10 border border-emerald-500/20 bg-emerald-500/5 rounded flex items-center justify-center text-[7px] text-emerald-400">Backup</div>
                    </div>
                );
            case 'it-consultation':
                return (
                    <div className="it-consult-layer-2 relative h-full flex items-center justify-center p-4">
                        <div className="stack-grid grid grid-cols-2 gap-2 w-full max-w-[140px]">
                            <div className="stack-block h-6 bg-indigo-500/10 border border-indigo-500/20 rounded flex items-center justify-center text-[7px] text-indigo-300">Spring</div>
                            <div className="stack-block h-6 bg-indigo-500/10 border border-indigo-500/20 rounded flex items-center justify-center text-[7px] text-indigo-300">Node</div>
                            <div className="stack-block h-6 bg-indigo-500/10 border border-indigo-500/20 rounded flex items-center justify-center text-[7px] text-indigo-300 col-span-2">React / Next</div>
                        </div>
                    </div>
                );
            case 'custom-ui-ux':
                return (
                    <div className="uiux-layer-2 relative h-full flex flex-col items-center justify-center gap-2">
                        <div className="palette flex gap-2">
                            <div className="color-swatch size-4 bg-pink-500 rounded-full"></div>
                            <div className="color-swatch size-4 bg-purple-500 rounded-full"></div>
                            <div className="color-swatch size-4 bg-cyan-500 rounded-full"></div>
                        </div>
                        <div className="font-outfit text-[8px] font-bold text-white tracking-widest uppercase">Visual Tokens</div>
                    </div>
                );
            case 'seo-analytics-setup':
                return (
                    <div className="seo-layer-2 relative h-full flex flex-col items-center justify-center gap-2 w-full p-4">
                        <div className="flex justify-between w-full text-[7px] text-zinc-500 font-mono">
                            <span>PAGEVIEWS</span>
                            <span>94% MOB</span>
                        </div>
                        <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                            <div className="seo-progress bg-amber-500 h-full w-[85%] rounded-full"></div>
                        </div>
                    </div>
                );
            case 'ai-automation':
                return (
                    <div className="ai-layer-2 relative h-full flex flex-col items-center justify-center gap-2 p-2">
                        <div className="rag-doc border border-cyan-500/30 bg-cyan-500/10 p-2 rounded text-[7px] text-cyan-300 font-mono w-24 text-center">
                            doc_chunk_3.txt
                        </div>
                        <div className="flex gap-1 text-[6px] text-zinc-500 font-mono">
                            <span>[0.12,</span><span>-0.89,</span><span>0.56]</span>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="ui-elements">
                        <div className="ui-box card"></div>
                        <div className="ui-box bar"></div>
                        <div className="ui-box circle"></div>
                    </div>
                );
        }
    };

    const renderLayer3 = () => {
        switch (serviceId) {
            case 'web-development':
                return (
                    <div className="web-dev-layer-3 relative h-full flex flex-col items-center justify-center gap-2">
                        <div className="data-flow w-20 h-1 bg-cyan-500/10 rounded-full overflow-hidden relative">
                            <div className="flow-bullet size-1.5 bg-cyan-400 rounded-full absolute"></div>
                        </div>
                        <div className="api-tag font-mono text-[7px] text-zinc-500 uppercase">GET /api/v1/hydrate</div>
                    </div>
                );
            case 'software-engineering':
                return (
                    <div className="soft-eng-layer-3 relative h-full flex flex-col items-center justify-center gap-2">
                        <div className="queue-line flex gap-1 bg-purple-500/5 p-1 rounded border border-purple-500/10">
                            <div className="msg-cell size-3 bg-purple-500/20 rounded-sm"></div>
                            <div className="msg-cell size-3 bg-purple-500/20 rounded-sm"></div>
                            <div className="msg-cell size-3 bg-purple-500/20 rounded-sm"></div>
                        </div>
                        <div className="api-tag font-mono text-[7px] text-zinc-500 uppercase">Kafka Message Queue</div>
                    </div>
                );
            case 'technical-support':
                return (
                    <div className="tech-sup-layer-3 relative h-full flex flex-col items-center justify-center gap-2">
                        <svg className="w-24 h-8" viewBox="0 0 100 30">
                            <path className="heartbeat-path stroke-emerald-400 fill-none" strokeWidth="1.5" d="M 0 15 L 20 15 L 25 5 L 30 25 L 35 15 L 55 15 L 60 5 L 65 25 L 70 15 L 100 15" />
                        </svg>
                        <div className="api-tag font-mono text-[7px] text-zinc-500 uppercase">Uptime Pulse Monitor</div>
                    </div>
                );
            case 'it-consultation':
                return (
                    <div className="it-consult-layer-3 relative h-full flex flex-col items-center justify-center gap-2">
                        <div className="globe-icon-box text-indigo-400 animate-[spin_20s_linear_infinite]"><Globe size={18} /></div>
                        <div className="api-tag font-mono text-[7px] text-zinc-500 uppercase">Global Scale Route</div>
                    </div>
                );
            case 'custom-ui-ux':
                return (
                    <div className="uiux-layer-3 relative h-full flex items-center justify-center">
                        <div className="click-trigger size-8 bg-pink-500/20 border border-pink-500/40 rounded-xl flex items-center justify-center cursor-pointer text-pink-400 hover:scale-105 transition">
                            <MousePointer2 size={12} />
                        </div>
                        <div className="ripple-ring size-4 border border-pink-500/50 rounded-full absolute opacity-0"></div>
                    </div>
                );
            case 'seo-analytics-setup':
                return (
                    <div className="seo-layer-3 relative h-full flex flex-col items-center justify-center gap-2">
                        <div className="flex gap-2">
                            <div className="tag-box px-1.5 py-0.5 border border-amber-500/30 bg-amber-500/10 text-[6px] text-amber-400 font-mono rounded">GTM_TAG</div>
                            <div className="tag-box px-1.5 py-0.5 border border-amber-500/30 bg-amber-500/10 text-[6px] text-amber-400 font-mono rounded">GA4_MEASURE</div>
                        </div>
                        <div className="api-tag font-mono text-[7px] text-zinc-500 uppercase">Container Execution</div>
                    </div>
                );
            case 'ai-automation':
                return (
                    <div className="ai-layer-3 relative h-full flex flex-col items-center justify-center gap-2">
                        <div className="agent-loop size-10 border border-cyan-400/30 rounded-full flex items-center justify-center relative">
                            <div className="orbit-particle size-2 bg-cyan-400 rounded-full absolute"></div>
                            <Cpu size={12} className="text-cyan-400" />
                        </div>
                        <div className="api-tag font-mono text-[6px] text-zinc-500 uppercase">Perceive-Plan-Act Loop</div>
                    </div>
                );
            default:
                return (
                    <div className="logic-nodes">
                        <div className="node n1" style={{ background: service.accentColor, boxShadow: `0 0 15px ${service.accentColor}` }}></div>
                        <div className="node n2" style={{ background: service.accentColor, boxShadow: `0 0 15px ${service.accentColor}` }}></div>
                        <div className="node n3" style={{ background: service.accentColor, boxShadow: `0 0 15px ${service.accentColor}` }}></div>
                        <div className="node n4" style={{ background: service.accentColor, boxShadow: `0 0 15px ${service.accentColor}` }}></div>
                    </div>
                );
        }
    };

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
                            {renderLayer1()}
                        </div>

                        {/* Layer 2: Evolution/Visual */}
                        <div 
                            className={`ux-layer layer-2 ${activeLayer === 2 ? 'active' : ''}`}
                            onMouseEnter={() => setActiveLayer(2)}
                            style={{ borderColor: activeLayer === 2 ? service.accentColor : 'rgba(255,255,255,0.05)' }}
                        >
                            <div className="layer-label" style={{ color: service.accentColor }}>{data[2].title}</div>
                            {renderLayer2()}
                        </div>

                        {/* Layer 3: Transformation/Logic */}
                        <div 
                            className={`ux-layer layer-3 ${activeLayer === 3 ? 'active' : ''}`}
                            onMouseEnter={() => setActiveLayer(3)}
                            style={{ borderColor: activeLayer === 3 ? service.accentColor : 'rgba(255,255,255,0.05)' }}
                        >
                            <div className="layer-label" style={{ color: service.accentColor }}>{data[3].title}</div>
                            {renderLayer3()}
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
                /* Custom Service Visualizer Styles */
                /* Web Dev Specific */
                .web-dev-layer-1 { position: relative; width: 100%; height: 100%; }
                .code-tag { position: absolute; font-family: monospace; font-size: 0.6rem; color: ${service.accentColor}; opacity: 0.6; }
                .t1 { top: 10%; left: 10%; }
                .t2 { top: 40%; right: 10%; }
                .t3 { bottom: 10%; left: 20%; }
                .dom-node { position: absolute; width: 8px; height: 8px; background: #fff; border-radius: 2px; }
                .d1 { top: 25%; left: 50%; } .d2 { top: 55%; left: 30%; } .d3 { top: 75%; left: 60%; }

                .web-dev-layer-2 { position: relative; width: 100%; height: 100%; }
                .grid-container { width: 100%; height: 100%; min-height: 80px; }
                .grid-box { transition: background 0.3s; }

                .web-dev-layer-3 { position: relative; width: 100%; height: 100%; }
                .data-flow { position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%); }
                .flow-bullet { left: 0; top: -1px; }

                /* Software Engineering Specific */
                .soft-eng-layer-1 { position: relative; width: 100%; height: 100%; }
                .load-balancer { transition: all 0.3s; }
                .worker-node { transition: all 0.3s; }
                .packet { transition: transform 0.1s; }

                .soft-eng-layer-2 { position: relative; width: 100%; height: 100%; }
                .db-master { transition: all 0.3s; }
                .db-replica { transition: all 0.3s; border: 1px solid rgba(255,255,255,0.05); }

                .soft-eng-layer-3 { position: relative; width: 100%; height: 100%; }
                .queue-line { transition: background 0.3s; }
                .msg-cell { transition: opacity 0.3s; }

                /* Technical Support Specific */
                .tech-sup-layer-1 { position: relative; width: 100%; height: 100%; }
                .shield-ring { transition: all 0.3s; }
                .threat-particle { filter: drop-shadow(0 0 4px #f43f5e); }

                .tech-sup-layer-2 { position: relative; width: 100%; height: 100%; }
                .host-server, .backup-server { transition: all 0.3s; }
                .sync-indicator { transition: transform 0.3s; }

                .tech-sup-layer-3 { position: relative; width: 100%; height: 100%; }
                .heartbeat-path { stroke-dasharray: 200; stroke-dashoffset: 0; }

                /* IT Consultation Specific */
                .it-consult-layer-1 { position: relative; width: 100%; height: 100%; }
                .strat-node { transition: all 0.3s; box-shadow: 0 0 10px rgba(99, 102, 241, 0.4); }
                .strat-line { transition: background 0.3s; }

                .it-consult-layer-2 { position: relative; width: 100%; height: 100%; }
                .stack-grid { transition: all 0.3s; }
                .stack-block { transition: all 0.3s; }

                .it-consult-layer-3 { position: relative; width: 100%; height: 100%; }
                .globe-icon-box { transition: transform 0.3s; }

                /* UIUX Specific */
                .uiux-layer-1 { position: relative; width: 100%; height: 100%; }
                .skeleton-card { border-style: dashed; }
                .skeleton-circle { border-style: dashed; }

                .uiux-layer-2 { position: relative; width: 100%; height: 100%; }
                .color-swatch { transition: transform 0.3s; }

                .uiux-layer-3 { position: relative; width: 100%; height: 100%; }
                .click-trigger { transition: all 0.3s; }
                .ripple-ring { transition: all 0.3s; transform: translate(-50%, -50%); top: 50%; left: 50%; }

                /* SEO Specific */
                .seo-layer-1 { position: relative; width: 100%; height: 100%; }
                .crawler-spider { transition: all 0.3s; box-shadow: 0 0 8px rgba(245, 158, 11, 0.4); }

                .seo-layer-2 { position: relative; width: 100%; height: 100%; }
                .seo-progress { transition: width 0.3s; }

                .seo-layer-3 { position: relative; width: 100%; height: 100%; }
                .tag-box { transition: all 0.3s; }

                /* AI Specific */
                .ai-layer-1 { position: relative; width: 100%; height: 100%; }
                .neural-node { transition: background 0.3s; }

                .ai-layer-2 { position: relative; width: 100%; height: 100%; }
                .rag-doc { transition: all 0.3s; }

                .ai-layer-3 { position: relative; width: 100%; height: 100%; }
                .agent-loop { transition: all 0.3s; }
                .orbit-particle { transition: transform 0.1s; filter: drop-shadow(0 0 4px #22d3ee); }

                .api-tag { font-family: monospace; font-size: 0.6rem; color: #94a3b8; }

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
