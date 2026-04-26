import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

// Multi-page imports
import VPGroup from './pages/VPGroup';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VPGroup />} />
        
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
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
