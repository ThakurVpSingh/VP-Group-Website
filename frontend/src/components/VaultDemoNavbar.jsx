import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Activity, Lock, Cpu, ArrowLeft, Terminal } from 'lucide-react';

const VaultDemoNavbar = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`vault-demo-nav ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-inner">
                <div className="nav-logo" onClick={() => navigate('/portfolio/vault-iam')}>
                    <Shield size={24} color="#22d3ee" />
                    <div className="logo-text">
                        <span className="main">VEXIOGATE</span>
                        <span className="sub">EXPERIENCE MESH</span>
                    </div>
                </div>

                <div className="nav-links">
                    <a href="#telemetry" className="demo-nav-link"><Activity size={16} /> Telemetry</a>
                    <a href="#neural" className="demo-nav-link"><Cpu size={16} /> Neural Mesh</a>
                    <a href="#vault" className="demo-nav-link"><Lock size={16} /> Data Vault</a>
                </div>

                <button className="back-btn" onClick={() => navigate('/')}>
                    <ArrowLeft size={16} /> BACK TO VP GROUP
                </button>
            </div>

            <style>{`
                .vault-demo-nav {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 5000;
                    padding: 24px 5%;
                    transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    background: transparent;
                }
                .vault-demo-nav.scrolled {
                    background: var(--color-surface-soft);
                    backdrop-filter: blur(20px);
                    padding: 16px 5%;
                    border-bottom: 1px solid var(--color-hairline);
                }
                .nav-inner {
                    max-width: 1400px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .nav-logo {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                }
                .logo-text {
                    display: flex;
                    flex-direction: column;
                }
                .logo-text .main {
                    font-weight: 900;
                    letter-spacing: 2px;
                    font-size: 1.1rem;
                    color: var(--color-ink);
                }
                .logo-text .sub {
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: var(--color-primary);
                    letter-spacing: 1px;
                }
                .nav-links {
                    display: flex;
                    gap: 40px;
                }
                .demo-nav-link {
                    color: var(--color-muted);
                    text-decoration: none;
                    font-size: 0.8rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: 0.3s;
                }
                .demo-nav-link:hover {
                    color: var(--color-primary);
                }
                .back-btn {
                    padding: 10px 20px;
                    background: var(--color-surface-soft);
                    border: 1px solid var(--color-hairline);
                    border-radius: 8px;
                    color: var(--color-ink);
                    font-size: 0.75rem;
                    font-weight: 800;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: 0.3s;
                }
                .back-btn:hover {
                    background: var(--color-surface-strong);
                    border-color: var(--color-primary);
                }
                @media (max-width: 768px) {
                    .nav-links { display: none; }
                }
            `}</style>
        </nav>
    );
};

export default VaultDemoNavbar;
