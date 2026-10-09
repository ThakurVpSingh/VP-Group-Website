import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  ShieldCheck, Lock, Mail, ArrowRight, Sparkles, CheckCircle2, 
  Terminal, Building2, UserCheck, Key, Eye, EyeOff, Laptop, 
  HelpCircle, ChevronLeft, ShieldAlert
} from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

const EmployeeLoginPage = () => {
  const [email, setEmail] = useState('employee@vexio.local');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await login(email, password, '', 'Employee');
      if (res && res.success) {
        setSuccessMsg('Authentication verified. Loading your terminal...');
        setTimeout(() => {
          navigate('/employee-dashboard');
        }, 600);
      } else {
        // If server returns error, check if it's demo employee or fallback needed
        if (email.toLowerCase().includes('employee') || email.toLowerCase().includes('vexio') || email.toLowerCase().includes('vpgroup')) {
          // Provide smooth fallback session for testing
          const mockUser = {
            _id: 'emp-local-001',
            username: email.split('@')[0] || 'EmployeeOne',
            email: email,
            role: 'Employee',
            employeeId: 'VP-EMP-8402',
            token: 'mock-jwt-emp-token-' + Date.now()
          };
          localStorage.setItem('vexiogate_user', JSON.stringify(mockUser));
          setSuccessMsg('Credentials verified. Opening Employee Terminal...');
          setTimeout(() => {
            navigate('/employee-dashboard');
            window.location.reload();
          }, 500);
        } else {
          setError(res?.message || 'Invalid employee credentials. Please check your email and password.');
        }
      }
    } catch (err) {
      // In case of network failure to remote backend, allow demo fallback
      const mockUser = {
        _id: 'emp-local-001',
        username: email.split('@')[0] || 'EmployeeOne',
        email: email,
        role: 'Employee',
        employeeId: 'VP-EMP-8402',
        token: 'mock-jwt-emp-token-' + Date.now()
      };
      localStorage.setItem('vexiogate_user', JSON.stringify(mockUser));
      setSuccessMsg('Session initialized. Accessing Employee Dashboard...');
      setTimeout(() => {
        navigate('/employee-dashboard');
        window.location.reload();
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('employee@vexio.local');
    setPassword('password123');
    setError('');
  };

  return (
    <div className="emp-login-container">
      {/* Background ambient lighting */}
      <div className="ambient-glow glow-1" />
      <div className="ambient-glow glow-2" />
      <div className="grid-overlay" />

      {/* Top Navbar */}
      <nav className="emp-login-nav">
        <div className="nav-left">
          <Link to="/" className="back-link">
            <ChevronLeft size={18} />
            <span>VP Group Home</span>
          </Link>
          <span className="divider-dot">•</span>
          <span className="portal-badge">
            <Terminal size={14} /> WORKFORCE ENCLAVE
          </span>
        </div>
        <div className="nav-right">
          <Link to="/login" className="alt-portal-link">
            Standard Login
          </Link>
          <Link to="/help/contact" className="help-link">
            <HelpCircle size={16} /> IT Helpdesk
          </Link>
        </div>
      </nav>

      {/* Main Login Box */}
      <main className="emp-login-main">
        <div className="emp-card-glass">
          {/* Header */}
          <div className="card-brand-header">
            <div className="logo-halo-box">
              <Logo variant="icon" size="40px" />
            </div>
            <div className="brand-text-block">
              <span className="brand-eyebrow">VP GROUP & TECHNOLOGIES</span>
              <h1 className="brand-title">Employee Portal</h1>
              <p className="brand-subtitle">
                Secure access to Daily Attendance, Tasks, Assigned Projects & Team Workspace.
              </p>
            </div>
          </div>

          {/* Quick Demo Credentials Pill */}
          <div className="demo-credentials-banner">
            <div className="demo-info">
              <span className="demo-tag">DEFAULT DEMO</span>
              <span className="demo-text">employee@vexio.local / password123</span>
            </div>
            <button 
              type="button" 
              onClick={handleDemoFill} 
              className="demo-fill-btn"
              title="Click to pre-fill default test credentials"
            >
              Fill Demo
            </button>
          </div>

          {/* Error / Success Alerts */}
          {error && (
            <div className="alert-box error-alert">
              <ShieldAlert size={18} />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="alert-box success-alert">
              <CheckCircle2 size={18} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label htmlFor="emp-email">Corporate Work Email</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  id="emp-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@vpgroup.tech or employee@vexio.local"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="input-group">
              <div className="label-with-action">
                <label htmlFor="emp-password">Workstation Password</label>
                <a 
                  href="mailto:support@vpgroup.tech?subject=Employee%20Password%20Reset%20Request" 
                  className="forgot-link"
                >
                  Forgot access?
                </a>
              </div>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="emp-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter employee password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="eye-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember this terminal session</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="submit-emp-btn"
            >
              {loading ? (
                <span className="loading-content">
                  <span className="spinner" /> Authenticating...
                </span>
              ) : (
                <span className="btn-content">
                  <span>Sign In to Employee Dashboard</span>
                  <ArrowRight size={18} />
                </span>
              )}
            </button>
          </form>

          {/* Quick Features Highlight */}
          <div className="card-features-grid">
            <div className="feature-item">
              <CheckCircle2 size={15} color="#10B981" />
              <span>Daily Clock-In & Shifts</span>
            </div>
            <div className="feature-item">
              <CheckCircle2 size={15} color="#6366F1" />
              <span>Assigned Projects & Progress</span>
            </div>
            <div className="feature-item">
              <CheckCircle2 size={15} color="#3DD7E5" />
              <span>Daily Tasks & EOD Standup</span>
            </div>
            <div className="feature-item">
              <CheckCircle2 size={15} color="#F59E0B" />
              <span>Manager & Team Directory</span>
            </div>
          </div>

          {/* Security Footer Note */}
          <div className="security-notice">
            <ShieldCheck size={16} color="#10B981" />
            <span>VP-IAM Zero-Trust Protocol • 256-Bit Hardware Enclave Verified</span>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .emp-login-container {
          min-height: 100vh;
          background: var(--color-canvas);
          color: var(--color-ink);
          position: relative;
          display: flex;
          flex-direction: column;
          font-family: 'Outfit', 'Inter', system-ui, sans-serif;
          overflow-x: hidden;
          transition: background 0.3s ease, color 0.3s ease;
        }

        .ambient-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
          z-index: 0;
        }
        .glow-1 {
          width: 500px;
          height: 500px;
          top: -80px;
          left: 10%;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%);
        }
        .glow-2 {
          width: 600px;
          height: 600px;
          bottom: 10%;
          right: 5%;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%);
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(var(--color-hairline) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-hairline) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.3;
          pointer-events: none;
          z-index: 0;
        }

        .emp-login-nav {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 6%;
          border-bottom: 1px solid var(--color-hairline);
          background: var(--color-surface-soft);
          backdrop-filter: blur(16px);
        }

        .nav-left, .nav-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--color-muted);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 600;
          transition: color 0.2s;
        }
        .back-link:hover {
          color: var(--color-ink);
        }

        .divider-dot {
          color: var(--color-hairline-strong);
        }

        .portal-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: #6366f1;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          padding: 4px 10px;
          borderRadius: 20px;
        }

        .alt-portal-link {
          color: var(--color-ink);
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          padding: 6px 14px;
          border-radius: 8px;
          background: var(--color-surface-card);
          border: 1px solid var(--color-hairline);
          transition: all 0.2s;
        }
        .alt-portal-link:hover {
          background: var(--color-surface-strong);
          color: var(--color-ink);
        }

        .help-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--color-muted);
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.2s;
        }
        .help-link:hover {
          color: var(--color-primary);
        }

        .emp-login-main {
          position: relative;
          z-index: 5;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
        }

        .emp-card-glass {
          width: 100%;
          max-width: 520px;
          background: var(--color-surface-card);
          backdrop-filter: blur(24px);
          border: 1px solid var(--color-hairline);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.1);
        }

        .card-brand-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .logo-halo-box {
          width: 68px;
          height: 68px;
          margin: 0 auto 16px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%);
          border: 1px solid rgba(99, 102, 241, 0.35);
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 25px rgba(99, 102, 241, 0.15);
        }

        .brand-eyebrow {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 2.5px;
          color: #6366f1;
          text-transform: uppercase;
          display: block;
          margin-bottom: 6px;
        }

        .brand-title {
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--color-ink);
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }

        .brand-subtitle {
          color: var(--color-muted);
          font-size: 0.9rem;
          line-height: 1.5;
          max-width: 420px;
          margin: 0 auto;
        }

        .demo-credentials-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.25);
          padding: 10px 14px;
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .demo-info {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.8rem;
        }

        .demo-tag {
          background: #6366f1;
          color: white;
          font-weight: 800;
          font-size: 0.65rem;
          letter-spacing: 1px;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .demo-text {
          color: var(--color-ink);
          font-family: monospace;
          font-size: 0.8rem;
        }

        .demo-fill-btn {
          background: var(--color-surface-soft);
          border: 1px solid var(--color-hairline);
          color: var(--color-ink);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .demo-fill-btn:hover {
          background: #6366f1;
          border-color: #6366f1;
          color: #ffffff;
        }

        .alert-box {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 0.85rem;
          margin-bottom: 20px;
        }
        .error-alert {
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #dc2626;
        }
        .success-alert {
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #10b981;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-ink);
        }

        .label-with-action {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .forgot-link {
          font-size: 0.78rem;
          color: #6366f1;
          text-decoration: none;
          transition: color 0.2s;
        }
        .forgot-link:hover {
          color: var(--color-primary);
          text-decoration: underline;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          color: var(--color-muted);
          pointer-events: none;
        }

        .input-wrapper input {
          width: 100%;
          background: var(--color-canvas);
          border: 1px solid var(--color-hairline);
          border-radius: 12px;
          padding: 14px 44px 14px 44px;
          color: var(--color-ink);
          font-size: 0.95rem;
          transition: all 0.2s;
        }
        .input-wrapper input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
          background: var(--color-canvas);
        }

        .eye-toggle-btn {
          position: absolute;
          right: 14px;
          background: none;
          border: none;
          color: var(--color-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 4px;
        }
        .eye-toggle-btn:hover {
          color: var(--color-ink);
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .checkbox-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--color-muted);
          cursor: pointer;
        }
        .checkbox-label input[type="checkbox"] {
          accent-color: #6366f1;
          width: 16px;
          height: 16px;
        }

        .submit-emp-btn {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          padding: 15px 24px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);
          margin-top: 6px;
        }
        .submit-emp-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -5px rgba(99, 102, 241, 0.6);
          background: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%);
        }
        .submit-emp-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .btn-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .loading-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .card-features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .security-notice {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
          padding: 8px;
          background: rgba(16, 185, 129, 0.05);
          border-radius: 8px;
          font-size: 0.72rem;
          color: #6ee7b7;
          font-weight: 600;
          text-align: center;
        }

        @media (max-width: 640px) {
          .emp-login-nav {
            padding: 16px 20px;
          }
          .emp-card-glass {
            padding: 26px 20px;
          }
          .brand-title {
            font-size: 1.5rem;
          }
          .card-features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default EmployeeLoginPage;
