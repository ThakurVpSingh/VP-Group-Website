import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Shield } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer style={{ 
      padding: '80px 5% 40px', 
      background: '#030712', 
      borderTop: '1px solid rgba(255,255,255,0.05)',
      position: 'relative',
      zIndex: 10,
      clear: 'both'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="footer-grid">
          
          {/* Brand */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.03)', borderRadius: '12px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Logo variant="icon" size="32px" />
              </div>
              <span style={{ fontWeight: '900', fontSize: '1.3rem', letterSpacing: '-0.5px', color: '#fff' }}>VP GROUP</span>
            </div>
            <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.6, maxWidth: '280px' }}>
              Engineering high-performance enterprise ecosystems with total security. Providing robust hierarchical gatekeeping and Zero-Trust Security Architecture.
            </p>
          </div>

          {/* Service Column 1: Core Engineering & Cloud */}
          <div className="footer-links-group">
            <h4 className="footer-heading">Software & Cloud</h4>
            <ul className="footer-list">
              <li><Link to="/services/web-development">Web Development</Link></li>
              <li><Link to="/services/software-engineering">Software Engineering</Link></li>
              <li><Link to="/services/saas-development">SaaS Development</Link></li>
              <li><Link to="/services/cloud-devops">Cloud & DevOps</Link></li>
              <li><Link to="/services/crm-development">CRM Development</Link></li>
              <li><Link to="/services/it-consultation">IT Consultation</Link></li>
            </ul>
          </div>

          {/* Service Column 2: Design, AI & Security */}
          <div className="footer-links-group">
            <h4 className="footer-heading">Design & Security</h4>
            <ul className="footer-list">
              <li><Link to="/services/custom-ui-ux">Custom UI/UX Design</Link></li>
              <li><Link to="/services/ai-automation">AI Automation</Link></li>
              <li><Link to="/services/technical-support">Technical Support</Link></li>
              <li><Link to="/services/seo-analytics-setup">SEO & Analytics Setup</Link></li>
              <li><Link to="/services/digital-marketing">Digital Marketing</Link></li>
              <li><Link to="/services/cybersecurity">Cybersecurity Mesh</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div className="footer-links-group">
            <h4 className="footer-heading">Company & Help</h4>
            <ul className="footer-list">
              <li><Link to="/help/contact">Contact Us</Link></li>
              <li><Link to="/help/hq-pratapgarh">HQ Pratapgarh</Link></li>
              <li><Link to="/help/portfolio">Portfolio & Works</Link></li>
              <li><Link to="/help/partners">Global Partners</Link></li>
            </ul>
          </div>

          {/* Clients */}
          <div className="footer-links-group">
            <h4 className="footer-heading">Clients & Case Studies</h4>
            <ul className="footer-list">
              <li><Link to="/clients/mother-bliss">Mother Bliss Foundation</Link></li>
              <li><Link to="/clients/institutional">Institutional Portals</Link></li>
              <li><Link to="/clients/global-partners">Global Partnerships</Link></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} VP Group & Technologies. All rights reserved. 
            <span className="desktop-only" style={{ margin: '0 8px', color: '#4b5563' }}>|</span>
            <span className="mobile-only" style={{ display: 'block', height: '6px' }}></span>
            <Link to="/privacy-policy" className="footer-policy-link">Privacy Policy</Link>
            <span style={{ margin: '0 8px', color: '#4b5563' }}>|</span>
            <Link to="/terms-conditions" className="footer-policy-link">Terms & Conditions</Link>
          </div>
          <div className="footer-social">
            <a href="https://github.com/ThakurVpSingh" target="_blank" rel="noreferrer" className="social-link"><Github size={18} /></a>
            <a href="https://www.linkedin.com/in/vaibhav-pratap-singh1/" target="_blank" rel="noreferrer" className="social-link"><Linkedin size={18} /></a>
            <a href="https://x.com/Vaibhav92310781" target="_blank" rel="noreferrer" className="social-link"><Twitter size={18} /></a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr 1fr 1fr 1fr;
          gap: 32px;
          margin-bottom: 60px;
        }
        .footer-heading {
          font-size: 0.72rem;
          font-weight: 800;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 20px;
        }
        .footer-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-list a {
          color: #6b7280;
          text-decoration: none;
          font-size: 0.82rem;
          font-weight: 600;
          transition: 0.25s ease;
        }
        .footer-list a:hover {
          color: #5B6BFF;
          padding-left: 4px;
        }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }
        .footer-copyright {
          font-size: 0.75rem;
          color: #4b5563;
        }
        .footer-policy-link {
          color: #4b5563;
          text-decoration: none;
          transition: 0.3s;
        }
        .footer-policy-link:hover {
          color: #5B6BFF;
        }
        .footer-social {
          display: flex;
          gap: 20px;
        }
        .social-link {
          color: #4b5563;
          transition: 0.3s;
        }
        .social-link:hover {
          color: #fff;
          transform: translateY(-2px);
        }

        @media (max-width: 1100px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 28px;
          }
          .footer-brand {
            grid-column: span 3;
            margin-bottom: 20px;
          }
        }
        @media (max-width: 720px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
          .footer-brand {
            grid-column: span 2;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-brand {
            grid-column: span 1;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
