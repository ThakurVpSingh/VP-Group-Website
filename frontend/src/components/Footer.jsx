import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Shield } from 'lucide-react';

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
          
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.03)', borderRadius: '12px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                <img src="/logo.png" alt="VP Group Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                     onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                <svg viewBox="0 0 100 100" style={{ width: 24, height: 24, display: 'none' }}>
                    <path d="M 5 20 L 95 20 L 50 45 Z" fill="#fff" />
                    <path d="M 2 28 L 46 53 L 46 95 Z" fill="#fff" />
                    <path d="M 98 28 L 54 53 L 54 95 Z" fill="#fff" />
                </svg>
              </div>
              <span style={{ fontWeight: '900', fontSize: '1.3rem', letterSpacing: '-0.5px', color: '#fff' }}>VP GROUP</span>
            </div>
            <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.6, maxWidth: '280px' }}>
              Engineering high-performance enterprise ecosystems with total security. Providing robust hierarchical gatekeeping and Zero-Trust Security Architecture.
            </p>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-list">
              <li><Link to="/services/web-development">Web Development</Link></li>
              <li><Link to="/services/software-engineering">Software Engineering</Link></li>
              <li><Link to="/services/technical-support">Technical Support</Link></li>
              <li><Link to="/services/it-consultation">IT Consultation</Link></li>
              <li><Link to="/services/custom-ui-ux">Custom UI/UX</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Help</h4>
            <ul className="footer-list">
              <li><Link to="/help/contact">Contact Us</Link></li>
              <li><Link to="/help/hq-pratapgarh">HQ Pratapgarh</Link></li>
              <li><Link to="/help/portfolio">Portfolio</Link></li>
              <li><Link to="/help/partners">Partners</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Clients</h4>
            <ul className="footer-list">
              <li><Link to="/clients/mother-bliss">Mother Bliss</Link></li>
              <li><Link to="/clients/institutional">Institutional</Link></li>
              <li><Link to="/clients/global-partners">Global Partners</Link></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} VP Group & Technologies. Operating under absolute Zero-Trust Security Architecture protocols.
          </div>
          <div className="footer-social">
            <a href="https://github.com/ThakurVpSingh" target="_blank" className="social-link"><Github size={18} /></a>
            <a href="https://www.linkedin.com/in/vaibhav-pratap-singh1/" target="_blank" className="social-link"><Linkedin size={18} /></a>
            <a href="https://x.com/Vaibhav92310781" target="_blank" className="social-link"><Twitter size={18} /></a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 60px;
        }
        .footer-heading {
          font-size: 0.75rem;
          font-weight: 800;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 24px;
        }
        .footer-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-list a {
          color: #6b7280;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          transition: 0.3s;
        }
        .footer-list a:hover {
          color: #ff4ef0;
          padding-left: 5px;
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
          fontSize: 0.75rem;
          color: #4b5563;
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

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
          .footer-brand {
            grid-column: span 2;
            margin-bottom: 20px;
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
