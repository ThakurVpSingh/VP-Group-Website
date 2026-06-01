import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import ProjectNavbar from '../components/ProjectNavbar';
import Footer from '../components/Footer';
import { portfolioData } from '../data/portfolioData';
import { ChevronRight, ArrowLeft, CheckCircle } from 'lucide-react';

const PortfolioDetailPage = () => {
    const { projectId } = useParams();
    const project = portfolioData.find(p => p.id === projectId);

    useEffect(() => {
        if (project) {
            document.title = `${project.title} | Case Study`;
            window.scrollTo(0, 0);
        }
    }, [project]);

    if (!project) {
        return <Navigate to="/help/portfolio" />;
    }

    return (
        <div style={{ background: '#05070a', color: '#fff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <ProjectNavbar />
            
            <main style={{ paddingTop: '140px', paddingBottom: '100px', paddingLeft: '5%', paddingRight: '5%' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <Link to="/help/portfolio" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b5cf6', textDecoration: 'none', fontWeight: '800', fontSize: '0.8rem', marginBottom: '40px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <ArrowLeft size={16} /> Back to Portfolio
                    </Link>

                    <div style={{ marginBottom: '60px' }}>
                        <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px', marginBottom: '24px' }}>{project.industry}</div>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: '900', marginBottom: '20px', letterSpacing: '-3px', lineHeight: 1 }}>{project.title}</h1>
                        <p style={{ color: '#9ca3af', fontSize: '1.2rem', fontWeight: '500' }}>Client: {project.clientName}</p>
                    </div>

                    <img 
                        src={project.thumbnail} 
                        alt={project.title} 
                        style={{ width: '100%', objectFit: 'cover', borderRadius: '30px', marginBottom: '40px', border: '1px solid rgba(139, 92, 246, 0.2)' }}
                        className="detail-hero-img"
                    />

                    <div className="details-grid" style={{ display: 'grid', gap: '40px' }}>
                        <div>
                            <section style={{ marginBottom: '60px' }}>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '24px', letterSpacing: '-1px' }}>The Challenge</h2>
                                <p style={{ color: '#9ca3af', fontSize: '1.1rem', lineHeight: 1.8 }}>{project.challenge}</p>
                            </section>

                            <section style={{ marginBottom: '60px' }}>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '24px', letterSpacing: '-1px' }}>Our Solution</h2>
                                <p style={{ color: '#9ca3af', fontSize: '1.1rem', lineHeight: 1.8 }}>{project.solution}</p>
                            </section>

                            <section>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '24px', letterSpacing: '-1px' }}>Impact & Results</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {project.results.map((result, idx) => (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: 'rgba(139, 92, 246, 0.03)', borderRadius: '16px', border: '1px solid rgba(139, 92, 246, 0.1)' }}>
                                            <CheckCircle color="#8b5cf6" size={24} />
                                            <span style={{ fontSize: '1.05rem', fontWeight: '600' }}>{result}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <aside>
                            <div className="glass-panel" style={{ padding: '40px', position: 'sticky', top: '140px' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '24px', color: '#fff' }}>Technology Stack</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {project.techStack.map(tech => (
                                        <span key={tech} style={{ 
                                            padding: '8px 16px', 
                                            background: 'rgba(139, 92, 246, 0.1)', 
                                            color: '#8b5cf6', 
                                            borderRadius: '8px', 
                                            fontSize: '0.8rem', 
                                            fontWeight: '800',
                                            border: '1px solid rgba(139, 92, 246, 0.2)'
                                        }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                
                                <div style={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '24px', color: '#fff' }}>Need a similar solution?</h3>
                                    <Link to="/help/contact" target="_blank" style={{ 
                                        display: 'block', 
                                        padding: '16px', 
                                        background: '#8b5cf6', 
                                        color: '#fff', 
                                        textDecoration: 'none', 
                                        borderRadius: '12px', 
                                        textAlign: 'center', 
                                        fontWeight: '900',
                                        transition: 'all 0.3s ease'
                                    }} className="cta-btn">
                                        BOOK CONSULTATION
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />

            <style>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                }
                .cta-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
                    filter: brightness(1.1);
                }
                .detail-hero-img {
                    height: 500px;
                }
                .details-grid {
                    grid-template-columns: 2fr 1fr;
                    gap: 80px !important;
                }
                @media (max-width: 968px) {
                    .details-grid {
                        grid-template-columns: 1fr;
                        gap: 40px !important;
                    }
                    .detail-hero-img {
                        height: 280px;
                    }
                }
            `}</style>
        </div>
    );
};

export default PortfolioDetailPage;
