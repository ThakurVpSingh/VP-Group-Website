import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProjectNavbar from '../components/ProjectNavbar';
import Footer from '../components/Footer';
import { portfolioData } from '../data/portfolioData';
import { ExternalLink, ArrowRight } from 'lucide-react';

const PortfolioPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "News & Case Studies | VP Group & Technologies";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ background: 'var(--halo-bg)', color: 'var(--halo-on-surface)', minHeight: '100vh', fontFamily: "'Inter', sans-serif", transition: 'background-color 0.3s ease, color 0.3s ease' }}>
            <ProjectNavbar />
            
            <main style={{ paddingTop: '160px', paddingBottom: '100px', paddingLeft: '5%', paddingRight: '5%' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '60px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-block', padding: '6px 16px', background: 'var(--halo-elevated)', border: '1px solid var(--halo-border)', color: 'var(--halo-primary)', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '900', letterSpacing: '2px', marginBottom: '20px' }}>CASE STUDIES & NEWS</div>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontWeight: '950', marginBottom: '20px', letterSpacing: '-2px', color: 'var(--halo-on-surface)' }}>Engineering <span className="text-gradient">Excellence.</span></h1>
                        <p style={{ color: 'var(--halo-muted)', fontSize: '1.15rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.7 }}>
                            A collection of our mission-critical enterprise deployments, from custom ERP automation to high-concurrency cloud mesh topologies.
                        </p>
                    </div>

                    {portfolioData.length > 0 ? (
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                            gap: '32px' 
                        }}>
                            {portfolioData.map((project) => (
                                <div 
                                    key={project.id} 
                                    className="portfolio-card glass-panel"
                                    onClick={() => navigate(`/portfolio/${project.id}`)}
                                    style={{ 
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        border: '1px solid var(--halo-border)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        background: 'var(--halo-surface)',
                                        borderRadius: '24px',
                                        boxShadow: 'var(--halo-shadow-sm)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                                        <img 
                                            src={project.thumbnail} 
                                            alt={project.title} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                            className="card-img"
                                        />
                                        <div style={{ 
                                            position: 'absolute', 
                                            inset: 0, 
                                            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, transparent 60%)',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            padding: '16px'
                                        }}>
                                            <span style={{ fontSize: '0.68rem', fontWeight: '800', color: '#ffffff', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                {project.industry}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <h3 style={{ fontSize: '1.35rem', fontWeight: '850', marginBottom: '8px', color: 'var(--halo-on-surface)', letterSpacing: '-0.02em' }}>{project.title}</h3>
                                        <p style={{ color: 'var(--halo-muted)', fontSize: '0.92rem', marginBottom: '24px', lineHeight: 1.5 }}>{project.clientName}</p>
                                        
                                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--halo-border)' }}>
                                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                                {project.techStack.slice(0, 3).map(tech => (
                                                    <span key={tech} style={{ fontSize: '0.7rem', color: 'var(--halo-primary)', fontWeight: '700', background: 'var(--halo-elevated)', padding: '3px 8px', borderRadius: '6px' }}>#{tech}</span>
                                                ))}
                                            </div>
                                            <button style={{ background: 'none', border: 'none', color: 'var(--halo-primary)', fontWeight: '850', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                                VIEW CASE <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '100px 0' }}>
                            <h2 style={{ color: 'var(--halo-muted)', fontSize: '1.5rem', fontWeight: '700' }}>Coming Soon: Engineering Excellence</h2>
                            <p style={{ color: 'var(--halo-muted)', marginTop: '12px' }}>We are currently documenting our latest deployments.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            <style>{`
                .portfolio-card:hover {
                    transform: translateY(-6px);
                    border-color: var(--halo-primary) !important;
                    box-shadow: var(--halo-shadow-md);
                }
                .portfolio-card:hover .card-img {
                    transform: scale(1.05);
                }
                .text-gradient {
                    background: linear-gradient(to right, var(--halo-primary), #ff4ef0);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .glass-panel {
                    background: var(--halo-surface);
                    border-radius: 24px;
                }
            `}</style>
        </div>
    );
};

export default PortfolioPage;
