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
        <div style={{ background: 'var(--halo-bg)', color: 'var(--halo-on-surface)', minHeight: '100vh', fontFamily: "'Inter', sans-serif", transition: 'background-color 0.3s ease, color 0.3s ease' }}>
            <ProjectNavbar />
            
            <main style={{ paddingTop: '160px', paddingBottom: '100px', paddingLeft: '5%', paddingRight: '5%' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <Link to="/help/portfolio" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--halo-primary)', textDecoration: 'none', fontWeight: '800', fontSize: '0.8rem', marginBottom: '40px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <ArrowLeft size={16} /> Back to Portfolio
                    </Link>

                    <div style={{ marginBottom: '60px' }}>
                        <div style={{ display: 'inline-block', padding: '6px 14px', background: 'var(--halo-elevated)', border: '1px solid var(--halo-border)', color: 'var(--halo-primary)', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '900', letterSpacing: '2px', marginBottom: '20px' }}>{project.industry}</div>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontWeight: '950', marginBottom: '20px', letterSpacing: '-2px', lineHeight: 1.1, color: 'var(--halo-on-surface)' }}>{project.title}</h1>
                        <p style={{ color: 'var(--halo-muted)', fontSize: '1.2rem', fontWeight: '500' }}>Client: {project.clientName}</p>
                    </div>

                    <img 
                        src={project.thumbnail} 
                        alt={project.title} 
                        style={{ width: '100%', objectFit: 'cover', borderRadius: '24px', marginBottom: '40px', border: '1px solid var(--halo-border)' }}
                        className="detail-hero-img"
                    />

                    <div className="details-grid" style={{ display: 'grid', gap: '40px' }}>
                        <div>
                            <section style={{ marginBottom: '60px' }}>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '20px', letterSpacing: '-0.5px', color: 'var(--halo-on-surface)' }}>The Challenge</h2>
                                <p style={{ color: 'var(--halo-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>{project.challenge}</p>
                            </section>

                            <section style={{ marginBottom: '60px' }}>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '20px', letterSpacing: '-0.5px', color: 'var(--halo-on-surface)' }}>Our Solution</h2>
                                <p style={{ color: 'var(--halo-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>{project.solution}</p>
                            </section>

                            <section>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '20px', letterSpacing: '-0.5px', color: 'var(--halo-on-surface)' }}>Impact & Results</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {project.results.map((result, idx) => (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: 'var(--halo-surface)', borderRadius: '16px', border: '1px solid var(--halo-border)', boxShadow: 'var(--halo-shadow-sm)' }}>
                                            <CheckCircle color="var(--halo-primary)" size={24} />
                                            <span style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--halo-on-surface)' }}>{result}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <aside>
                            <div className="glass-panel" style={{ padding: '36px', position: 'sticky', top: '140px' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '850', marginBottom: '20px', color: 'var(--halo-on-surface)' }}>Technology Stack</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {project.techStack.map(tech => (
                                        <span key={tech} style={{ 
                                            padding: '8px 16px', 
                                            background: 'var(--halo-elevated)', 
                                            color: 'var(--halo-primary)', 
                                            borderRadius: '8px', 
                                            fontSize: '0.8rem', 
                                            fontWeight: '800',
                                            border: '1px solid var(--halo-border)'
                                        }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                
                                <div style={{ marginTop: '36px', paddingTop: '36px', borderTop: '1px solid var(--halo-border)' }}>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '850', marginBottom: '20px', color: 'var(--halo-on-surface)' }}>Need a similar solution?</h3>
                                    <Link to="/consultation/book" style={{ 
                                        display: 'block', 
                                        padding: '16px', 
                                        background: 'var(--halo-primary)', 
                                        color: '#fff', 
                                        textDecoration: 'none', 
                                        borderRadius: '12px', 
                                        textAlign: 'center', 
                                        fontWeight: '900',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 16px var(--halo-focus)'
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
                    background: var(--halo-surface);
                    border: 1px solid var(--halo-border);
                    border-radius: 24px;
                    box-shadow: var(--halo-shadow-sm);
                }
                .cta-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 30px var(--halo-focus);
                    filter: brightness(1.05);
                }
                .detail-hero-img {
                    height: 480px;
                }
                .details-grid {
                    grid-template-columns: 2fr 1fr;
                    gap: 60px !important;
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
