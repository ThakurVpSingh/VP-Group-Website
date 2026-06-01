import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProjectNavbar from '../components/ProjectNavbar';
import Footer from '../components/Footer';
import { portfolioData } from '../data/portfolioData';
import { ExternalLink, ArrowRight } from 'lucide-react';

const PortfolioPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Portfolio | VP Group & Technologies";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ background: '#05070a', color: '#fff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <ProjectNavbar />
            
            <main style={{ paddingTop: '140px', paddingBottom: '100px', paddingLeft: '5%', paddingRight: '5%' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '60px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px', marginBottom: '24px' }}>CASE STUDIES</div>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '900', marginBottom: '20px', letterSpacing: '-2px' }}>Engineering <span className="text-gradient">Excellence.</span></h1>
                        <p style={{ color: '#9ca3af', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                            A collection of our mission-critical deployments, from enterprise IAM platforms to high-conversion e-commerce ecosystems.
                        </p>
                    </div>

                    {portfolioData.length > 0 ? (
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(285px, 1fr))', 
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
                                        border: '1px solid rgba(139, 92, 246, 0.1)',
                                        display: 'flex',
                                        flexDirection: 'column'
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
                                            background: 'linear-gradient(to top, rgba(5, 7, 10, 0.9), transparent)',
                                            display: 'flex',
                                            alignItems: 'bottom',
                                            padding: '20px'
                                        }}>
                                            <div style={{ alignSelf: 'flex-end' }}>
                                                <span style={{ fontSize: '0.65rem', fontWeight: '800', color: '#8b5cf6', background: 'rgba(0,0,0,0.5)', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>{project.industry}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '8px' }}>{project.title}</h3>
                                        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.5 }}>{project.clientName}</p>
                                        
                                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                {project.techStack.slice(0, 3).map(tech => (
                                                    <span key={tech} style={{ fontSize: '0.6rem', color: '#8b5cf6', fontWeight: '700' }}>#{tech}</span>
                                                ))}
                                            </div>
                                            <button style={{ background: 'none', border: 'none', color: '#8b5cf6', fontWeight: '800', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                VIEW PROJECT <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '100px 0' }}>
                            <h2 style={{ color: '#4b5563', fontSize: '1.5rem', fontWeight: '700' }}>Coming Soon: Engineering Excellence</h2>
                            <p style={{ color: '#4b5563', marginTop: '12px' }}>We are currently documenting our latest deployments.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            <style>{`
                .portfolio-card {
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .portfolio-card:hover {
                    transform: translateY(-8px);
                    border-color: #8b5cf6 !important;
                    box-shadow: 0 20px 40px rgba(139, 92, 246, 0.1);
                }
                .portfolio-card:hover .card-img {
                    transform: scale(1.05);
                }
                .text-gradient {
                    background: linear-gradient(to right, #8b5cf6, #ff4ef0);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .glass-panel {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                }
            `}</style>
        </div>
    );
};

export default PortfolioPage;
