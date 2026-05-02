import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';

// Multi-page imports
import VPGroup from './pages/VPGroup';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PortfolioDetailPage from './pages/PortfolioDetailPage';
import PartnershipApplyPage from './pages/PartnershipApplyPage';
import ContactPage from './pages/ContactPage';
import HQPage from './pages/HQPage';
import PortfolioPage from './pages/PortfolioPage';
import PartnersPage from './pages/PartnersPage';
import MotherBlissPage from './pages/MotherBlissPage';
import InstitutionalPage from './pages/InstitutionalPage';
import GlobalPartnersPage from './pages/GlobalPartnersPage';
import VaultCaseStudyPage from './pages/VaultCaseStudyPage';
import StrategyPage from './pages/StrategyPage';

const SplashScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState(0); // 0: logo in, 1: text in, 2: fade out

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 2200);
    const t3 = setTimeout(() => onComplete(), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: '#030712',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.8s ease',
      opacity: phase === 2 ? 0 : 1,
      pointerEvents: phase === 2 ? 'none' : 'all',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(34, 211, 238, 0.05) 40%, transparent 70%)',
        borderRadius: '50%',
        animation: 'splash-glow 2s ease-in-out infinite alternate',
      }} />

      {/* Logo Diamond */}
      <div style={{
        width: '80px',
        height: '80px',
        position: 'relative',
        marginBottom: '32px',
        transform: phase >= 1 ? 'scale(1) rotate(0deg)' : 'scale(0.3) rotate(-180deg)',
        opacity: phase >= 1 ? 1 : 0,
        transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="splashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#8b5cf6' }} />
              <stop offset="100%" style={{ stopColor: '#22d3ee' }} />
            </linearGradient>
          </defs>
          <path d="M50 10 L90 35 L50 55 Z" fill="url(#splashGrad)" opacity="0.9" />
          <path d="M50 10 L10 35 L50 55 Z" fill="url(#splashGrad)" opacity="0.7" />
          <path d="M50 55 L10 35 L50 90 L90 35 Z" fill="url(#splashGrad)" opacity="0.5" />
        </svg>
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
        fontWeight: 950,
        letterSpacing: '-1.5px',
        background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 50%, #22d3ee 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '12px',
        transform: phase >= 1 ? 'translateY(0)' : 'translateY(20px)',
        opacity: phase >= 1 ? 1 : 0,
        transition: 'all 0.6s ease 0.2s',
      }}>
        VP Group & Technologies
      </h1>

      {/* Subtitle */}
      <p style={{
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '4px',
        color: '#64748b',
        textTransform: 'uppercase',
        transform: phase >= 1 ? 'translateY(0)' : 'translateY(15px)',
        opacity: phase >= 1 ? 0.7 : 0,
        transition: 'all 0.6s ease 0.4s',
      }}>
        Engineering Infinite Scale
      </p>

      {/* Loading bar */}
      <div style={{
        width: '120px',
        height: '2px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '4px',
        marginTop: '40px',
        overflow: 'hidden',
        opacity: phase >= 1 ? 1 : 0,
        transition: 'opacity 0.3s ease 0.5s',
      }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg, #8b5cf6, #22d3ee)',
          borderRadius: '4px',
          animation: 'splash-load 1.8s ease-in-out forwards',
        }} />
      </div>

      <style>{`
        @keyframes splash-glow {
          from { transform: scale(0.8); opacity: 0.5; }
          to { transform: scale(1.2); opacity: 1; }
        }
        @keyframes splash-load {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AuthProvider>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <Router>
        <Routes>
          {/* Main Landing & Company Pages */}
          <Route path="/" element={<VPGroup />} />
          <Route path="/vexio" element={<LandingPage />} />
          <Route path="/our-strategy" element={<StrategyPage />} />
          
          {/* Auth System */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/superadmin/access" element={<Login portalType="SuperAdmin" />} />
          
          {/* Operations Hub (Dashboard) */}
          <Route path="/*" element={<Dashboard />} />
          
          {/* Dynamic Service Routes */}
          <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
          
          {/* Dynamic Portfolio Routes */}
          <Route path="/portfolio/:projectId" element={<PortfolioDetailPage />} />
          
          {/* Partnership Routes */}
          <Route path="/apply-partnership" element={<PartnershipApplyPage />} />
          
          {/* Help & Contact Routes */}
          <Route path="/help/contact" element={<ContactPage />} />
          <Route path="/help/hq-pratapgarh" element={<HQPage />} />
          <Route path="/help/portfolio" element={<PortfolioPage />} />
          <Route path="/help/partners" element={<PartnersPage />} />
          
          {/* Client & Case Study Routes */}
          <Route path="/clients/mother-bliss" element={<MotherBlissPage />} />
          <Route path="/clients/institutional" element={<InstitutionalPage />} />
          <Route path="/clients/global-partners" element={<GlobalPartnersPage />} />
          <Route path="/portfolio/vault-iam" element={<VaultCaseStudyPage />} />
          
          {/* Fallback Route */}
          <Route path="/404" element={<div style={{padding: 100, textAlign: 'center', color: '#fff'}}><h2>404 - TERMINAL NOT FOUND</h2></div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

export default App;
