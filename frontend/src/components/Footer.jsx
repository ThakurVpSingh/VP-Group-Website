import React from 'react';
import { Link } from 'react-router-dom';

const paymentLogos = [
  {
    name: 'Visa',
    svg: (
      <svg viewBox="0 0 100 32" height="22">
        <path fill="#2563EB" d="M38.8 3.5L25.4 31.5h-8.8L27.5 3.5h11.3zm29.3 18.2c.1-4.9-6.8-5.2-6.7-7.4 0-.7.7-1.4 2.2-1.6 3.6-.3 6.8.6 9 1.6l1.6-7.5c-2.3-.8-5.4-1.5-9.3-1.5-9.8 0-16.7 5.2-16.8 12.6-.1 5.5 4.9 8.6 8.7 10.4 3.9 1.9 5.2 3.1 5.2 4.8 0 2.6-3.1 3.4-6 3.4-5 0-7.7-.7-11.8-2.6l-1.6 7.8c3.6 1.7 8.2 2.6 12.8 2.7 10.4 0 17.2-5.1 17.3-12.7zM97.5 3.5h-8.8c-2.7 0-4.8.8-5.9 3.5L69.6 31.5h11.8s1.9-5.3 2.3-6.5h14.4c.3 1.5 1.5 6.5 1.5 6.5h10.4L97.5 3.5zm-8.8 14.7l4.6-12.6 2.6 12.6h-7.2zM19 3.5L10.3 22.8l-1-4.9c-1.6-5.5-6.6-11.4-12.2-14.4l7.9 28h11.9l17.7-28H19z"/>
      </svg>
    )
  },
  {
    name: 'Mastercard',
    svg: (
      <svg viewBox="0 0 100 60" height="26">
        <circle cx="35" cy="30" r="24" fill="#EB001B"/>
        <circle cx="65" cy="30" r="24" fill="#F79E1B"/>
        <path fill="#FF5F00" d="M50 11.3a23.9 23.9 0 00-15 18.7A23.9 23.9 0 0050 48.7a23.9 23.9 0 0015-18.7A23.9 23.9 0 0050 11.3z"/>
      </svg>
    )
  },
  {
    name: 'Razorpay',
    svg: (
      <svg viewBox="0 0 120 30" height="22">
        <path fill="#0284C7" d="M12.4 0L0 30h9.3l5.8-14.2 9.5 14.2H36L21.2 9.2 24.8 0h-12.4z"/>
        <text x="40" y="22" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="20">Razorpay</text>
      </svg>
    )
  },
  {
    name: 'Stripe',
    svg: (
      <svg viewBox="0 0 80 30" height="22">
        <path fill="#635BFF" d="M80 15.6c0-6-3.1-9.9-8.7-9.9-5.6 0-9.2 4-9.2 9.9 0 7.1 4.5 9.7 10 9.7 3.3 0 6.1-.7 8-1.7v-4.5c-1.9.9-4.3 1.4-6.8 1.4-2.7 0-4.9-.8-5.3-3.5H80v-1.4zm-12.3-2.4c.3-2.3 2.1-3.3 4.2-3.3 2.1 0 3.8 1 4.1 3.3h-8.3zm-17.7-7.5h-5.4v23.6h5.4V5.7zm-11 12.3c0-2.3-1.6-3.3-3.6-3.3-2.1 0-4.6.8-6.4 1.8V11c1.9-.8 4.7-1.5 7.6-1.5 5.5 0 8 2.7 8 7.6v12.3h-5.2v-2.2c-1.8 1.6-4.2 2.6-7.2 2.6-4.5 0-7.3-2.6-7.3-6.3 0-5.3 4.7-7.2 11.1-7.2h3v-1.3zm-5.4 7.6c1.6 0 3.2-.6 4.4-1.6v-3.7h-2.5c-3.1 0-5.5.8-5.5 3.3 0 1.3 1 2 2.6 2zM15 10.3c-2.3 0-4.3.7-5.9 1.6V6.1L3.8 7.5v21.8h5.4v-11c1.6-.9 3.4-1.4 5.3-1.4 2.8 0 4.1 1.2 4.1 3.9v8.5h5.4v-9.3c0-4.8-2.6-6.4-9-6.4z"/>
      </svg>
    )
  },
  {
    name: 'UPI',
    svg: (
      <svg viewBox="0 0 100 35" height="24">
        <path fill="#059669" d="M22 0l-12 18h10l-4 17 18-22h-10l8-13z"/>
        <text x="36" y="24" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="22">UPI</text>
      </svg>
    )
  },
  {
    name: 'Google Pay',
    svg: (
      <svg viewBox="0 0 120 35" height="24">
        <path fill="#4285F4" d="M15.3 12.7v4.6h11c-.5 2.9-3.3 8.6-11 8.6-6.6 0-12-5.5-12-12.3s5.4-12.3 12-12.3c3.8 0 6.3 1.6 7.7 3l3.7-3.6C24.4 8.7 20.3 7 15.3 7 6.8 7 0 13.8 0 22.3S6.8 37.6 15.3 37.6c8.9 0 14.8-6.2 14.8-15.1 0-1-.1-1.8-.3-2.5H15.3z"/>
        <text x="38" y="26" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="20">Pay</text>
      </svg>
    )
  },
  {
    name: 'Apple Pay',
    svg: (
      <svg viewBox="0 0 100 35" height="24">
        <path fill="#FFFFFF" d="M12.3 11.2c-.7.8-1.8 1.4-2.9 1.3-.2-1.2.3-2.5 1-3.2.7-.8 2-1.4 2.9-1.4.2 1.3-.3 2.5-1 3.3zm.9 1.7c-1.6-.1-3 .9-3.8.9s-2-.8-3.3-.8c-1.7 0-3.3 1-4.1 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.3 1.9 2.7 3.3 2.6 1.3-.1 1.9-.9 3.5-.9 1.6 0 2.1.9 3.5.9 1.4 0 2.3-1.3 3.2-2.6 1-1.5 1.4-2.9 1.5-3-.1 0-2.8-1.1-2.8-4.3 0-2.7 2.2-4 2.3-4.1-1.3-1.9-3.3-2.1-4-2.2z"/>
        <text x="30" y="25" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="22">Pay</text>
      </svg>
    )
  },
  {
    name: 'Paytm',
    svg: (
      <svg viewBox="0 0 100 30" height="22">
        <text x="0" y="24" fill="#00BAF2" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="24">Paytm</text>
      </svg>
    )
  },
  {
    name: 'PayPal',
    svg: (
      <svg viewBox="0 0 100 35" height="24">
        <path fill="#003087" d="M12 2h14c5 0 9 2.5 8 8-.8 5-5 8-10 8h-4l-2 12H9l3-28z"/>
        <path fill="#0079C1" d="M6 8h14c5 0 9 2.5 8 8-.8 5-5 8-10 8h-4l-2 12H3l3-28z" opacity="0.8"/>
        <text x="36" y="25" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="20">PayPal</text>
      </svg>
    )
  },
  {
    name: 'SWIFT Wire',
    svg: (
      <svg viewBox="0 0 130 30" height="22">
        <path fill="#10B981" d="M5 15l10-10v6h15v8H15v6z"/>
        <text x="38" y="22" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="18">SWIFT Wire</text>
      </svg>
    )
  }
];

const Footer = () => {
  return (
    <footer className="vp-site-footer">
      <div className="footer-inner">
        
        {/* Startup India Recognition Card - Cleaned as requested */}
        <div className="startup-india-clean-card">
          <div className="startup-logo-container">
            <img src="/images/startup-india.svg" alt="Startup India DPIIT" className="startup-india-svg" />
          </div>
          <p className="startup-description">
            Officially recognized by the Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce and Industry, Government of India.
          </p>
        </div>

        {/* Moving Marquee Payment Animation featuring Official Logos */}
        <div className="payment-marquee-wrapper">
          <div className="marquee-track-container">
            <div className="marquee-track">
              {[...paymentLogos, ...paymentLogos, ...paymentLogos].map((partner, idx) => (
                <div key={idx} className="payment-logo-badge" title={partner.name}>
                  {partner.svg}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columns Grid - Standardized with Image 2 Design & Official Links */}
        <div className="footer-columns-grid">
          
          {/* Column 1: Company Overview */}
          <div className="footer-column brand-col">
            <h4 className="column-heading">Company</h4>
            <p className="brand-desc">
              Engineering high-performance enterprise ecosystems with total security. Hierarchical gatekeeping & Zero-Trust Security Architecture.
            </p>
          </div>

          {/* Column 2: Software & Cloud */}
          <div className="footer-column">
            <h4 className="column-heading">Software & Cloud</h4>
            <ul className="column-links">
              <li><Link to="/services/web-development">Web Development</Link></li>
              <li><Link to="/services/software-engineering">Software Engineering</Link></li>
              <li><Link to="/services/saas-development">SaaS Development</Link></li>
              <li><Link to="/services/cloud-devops">Cloud & DevOps</Link></li>
              <li><Link to="/services/crm-development">CRM Development</Link></li>
              <li><Link to="/services/it-consultation">IT Consultation</Link></li>
            </ul>
          </div>

          {/* Column 3: Design & Security */}
          <div className="footer-column">
            <h4 className="column-heading">Design & Security</h4>
            <ul className="column-links">
              <li><Link to="/services/custom-ui-ux">Custom UI/UX Design</Link></li>
              <li><Link to="/services/ai-automation">AI Automation</Link></li>
              <li><Link to="/services/technical-support">Technical Support</Link></li>
              <li><Link to="/services/seo-analytics-setup">SEO & Analytics Setup</Link></li>
              <li><Link to="/services/digital-marketing">Digital Marketing</Link></li>
              <li><Link to="/services/cybersecurity">Cybersecurity Mesh</Link></li>
            </ul>
          </div>

          {/* Column 4: Company & Help */}
          <div className="footer-column">
            <h4 className="column-heading">Resources & Help</h4>
            <ul className="column-links">
              <li><Link to="/help/contact">Contact Us</Link></li>
              <li><Link to="/help/hq-pratapgarh">HQ Pratapgarh</Link></li>
              <li><Link to="/help/portfolio">Portfolio & Works</Link></li>
              <li><Link to="/help/partners">Global Partners</Link></li>
            </ul>
          </div>

          {/* Column 5: Clients & Case Studies */}
          <div className="footer-column">
            <h4 className="column-heading">Support & Clients</h4>
            <ul className="column-links">
              <li><Link to="/clients/mother-bliss">Mother Bliss Foundation</Link></li>
              <li><Link to="/clients/institutional">Institutional Portals</Link></li>
              <li><Link to="/clients/global-partners">Global Partnerships</Link></li>
            </ul>
          </div>

          {/* Column 6: Standard Official Social Brands */}
          <div className="footer-column">
            <h4 className="column-heading">Social</h4>
            <ul className="column-links social-list">
              <li>
                <a 
                  href="https://github.com/ThakurVpSingh" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="social-official-item github-brand"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/company/vp-group-technologies/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="social-official-item linkedin-brand"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://x.com/Vaibhav92310781" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="social-official-item x-brand"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>X</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="social-official-item instagram-brand"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#E4405F">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* GIANT DISPLAY TYPOGRAPHY - Image 2 Signature Style */}
        <div className="giant-brand-display">
          <span className="display-text">VP Group</span>
          <span className="registered-symbol">®</span>
        </div>

        {/* Bottom copyright & legal bar */}
        <div className="footer-bottom-bar">
          <div className="copyright-text">
            © {new Date().getFullYear()} VP Group & Technologies. All rights reserved.
          </div>

          <div className="legal-links">
            <Link to="/privacy-policy" className="legal-link">Privacy Policy</Link>
            <span className="link-divider">•</span>
            <Link to="/terms-conditions" className="legal-link">Terms of Use</Link>
            <span className="link-divider">•</span>
            <span className="legal-disclosures-tag">DPIIT Govt. Recognized Startup</span>
          </div>
        </div>

      </div>

      <style>{`
        .vp-site-footer {
          background: #000000;
          color: #e4e4e7;
          padding: 80px 5% 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          z-index: 10;
          clear: both;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow-x: hidden;
          box-sizing: border-box;
        }

        .footer-inner {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        /* Startup India Clean Card */
        .startup-india-clean-card {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 45px;
          padding: 20px 24px;
          background: rgba(18, 18, 20, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
        }

        .startup-logo-container {
          background: #09090b;
          padding: 10px 18px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 180px;
          height: 60px;
          flex-shrink: 0;
        }

        .startup-india-svg {
          height: 44px;
          max-width: 100%;
          width: auto;
          object-fit: contain;
        }

        .startup-description {
          color: #A1A1AA;
          font-size: 0.88rem;
          line-height: 1.5;
          margin: 0;
        }

        /* Moving Marquee Payment Animation */
        .payment-marquee-wrapper {
          margin-bottom: 60px;
          padding: 24px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          overflow: hidden;
        }

        .marquee-track-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
        }

        .marquee-track {
          display: flex;
          gap: 36px;
          align-items: center;
          width: max-content;
          animation: marqueeScroll 30s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .payment-logo-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          transition: all 0.3s ease;
          user-select: none;
        }

        .payment-logo-badge:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.2);
        }

        /* Footer Grid Columns */
        .footer-columns-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr 1fr 0.8fr;
          gap: 40px;
          margin-bottom: 70px;
        }

        .brand-desc {
          color: #71717A;
          font-size: 0.85rem;
          line-height: 1.65;
          margin: 0;
          max-width: 260px;
        }

        .column-heading {
          font-size: 0.88rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 22px;
          letter-spacing: -0.2px;
        }

        .column-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .column-links a {
          color: #8E8E93;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.2s ease;
          display: inline-block;
        }

        .column-links a:hover {
          color: #ffffff;
          transform: translateX(3px);
        }

        .social-official-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .social-official-item span {
          color: #8E8E93;
          transition: color 0.2s ease;
        }

        .social-official-item:hover span {
          color: #ffffff;
        }

        /* GIANT DISPLAY TYPOGRAPHY - PARALLEL ® SIGNATURE DESIGN */
        .giant-brand-display {
          margin: 50px 0 30px;
          display: flex;
          align-items: baseline;
          user-select: none;
          line-height: 0.82;
          width: 100%;
          overflow: hidden;
        }

        .display-text {
          font-size: clamp(2.8rem, 15vw, 15.5rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          color: #27272A;
          background: linear-gradient(180deg, #3F3F46 0%, #18181B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: all 0.5s ease;
          white-space: nowrap;
        }

        .display-text:hover {
          background: linear-gradient(180deg, #52525B 0%, #27272A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .registered-symbol {
          font-size: clamp(1.4rem, 5.5vw, 5.5rem);
          font-weight: 800;
          color: #3F3F46;
          margin-left: 4px;
          vertical-align: super;
          line-height: 1;
        }

        /* Bottom Footer Legal Bar */
        .footer-bottom-bar {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .copyright-text {
          font-size: 0.82rem;
          color: #71717A;
          font-weight: 500;
        }

        .legal-links {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 0.82rem;
          flex-wrap: wrap;
        }

        .legal-link {
          color: #8E8E93;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .legal-link:hover {
          color: #ffffff;
        }

        .link-divider {
          color: #3F3F46;
        }

        .legal-disclosures-tag {
          color: #6B7280;
          font-size: 0.82rem;
        }

        /* Device Responsive Rules */
        @media (max-width: 1200px) {
          .footer-columns-grid {
            grid-template-columns: 1.4fr 1fr 1fr 1fr 1fr;
            gap: 32px;
          }
        }

        @media (max-width: 1024px) {
          .footer-columns-grid {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 32px;
          }
          .brand-col {
            grid-column: span 3;
            margin-bottom: 12px;
          }
          .brand-desc {
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .vp-site-footer {
            padding: 50px 5% 30px;
          }
          .startup-india-clean-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .startup-logo-container {
            width: 100%;
            height: 55px;
            box-sizing: border-box;
          }
          .footer-columns-grid {
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
          .brand-col {
            grid-column: span 2;
          }
          .giant-brand-display {
            margin: 36px 0 20px;
          }
          .footer-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }
        }

        @media (max-width: 480px) {
          .vp-site-footer {
            padding: 40px 4% 24px;
          }
          .startup-india-clean-card {
            padding: 16px;
            border-radius: 14px;
          }
          .footer-columns-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .brand-col {
            grid-column: span 1;
          }
          .column-heading {
            margin-bottom: 14px;
          }
          .legal-links {
            gap: 8px;
          }
          .link-divider {
            display: none;
          }
          .legal-link, .legal-disclosures-tag {
            display: block;
            width: 100%;
            margin-bottom: 4px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
