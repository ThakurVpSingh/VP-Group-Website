import { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Shield, Lock, Mail, ArrowRight, ShieldCheck, Layout, ChevronLeft, Zap, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';

// Import Shadcn UI Components
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Field, FieldLabel, FieldDescription, FieldGroup } from '../components/ui/field';

const SecurityBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const words = [
      'AUTHENTICATING', 'SECURE_GATE', 'IDENTITY_MESH', 'ZERO_TRUST', 
      'ENCRYPT_AES_256', 'SCAN_BIOMETRIC', 'ACCESS_GRANTED', 'JWT_VALID',
      'GATEWAY_ONLINE', 'NODE_SYNC', 'AUTH_PORTAL', 'MESH_GATEWAY'
    ];

    class Particle {
      constructor() {
        this.init();
      }

      init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.text = words[Math.floor(Math.random() * words.length)];
        this.speed = 0.5 + Math.random() * 1.5;
        this.fontSize = 10 + Math.random() * 12;
        this.alpha = 0.1 + Math.random() * 0.4;
      }

      draw() {
        ctx.font = `900 ${this.fontSize}px "Plus Jakarta Sans", monospace`;
        ctx.fillStyle = `rgba(92, 124, 255, ${this.alpha * 0.2})`;
        ctx.fillText(this.text, this.x, this.y);
        this.y -= this.speed;

        if (this.y < -30) {
          this.init();
          this.y = canvas.height + 30;
        }
      }
    }

    const particles = Array.from({ length: 40 }, () => new Particle());

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => p.draw());
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.5,
        pointerEvents: 'none',
        background: '#030712'
      }}
    />
  );
};

const Login = ({ portalType = "User" }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [showMfa, setShowMfa] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [intendedRole, setIntendedRole] = useState(portalType === "SuperAdmin" ? "SuperAdmin" : "Employee");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const res = await login(email, password, mfaCode, intendedRole);
    if (res.success) {
      navigate('/overview');
    } else {
      if (res.requireMfa) {
        setShowMfa(true);
      } else {
        setError(res.message);
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'var(--bg-dark)',
      position: 'relative'
    }}>
      
      {/* Navigation for Login Page */}
      <nav style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '16px 40px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        background: 'rgba(10, 12, 16, 0.7)', 
        borderBottom: '1px solid rgba(255,255,255,0.05)', 
        zIndex: 1000, 
        backdropFilter: 'blur(16px)' 
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>
          <ChevronLeft size={16} /> Back to Global Portal
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', background: 'var(--primary)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={18} color="white" />
          </div>
          <span style={{ fontWeight: '800', fontSize: '1.1rem', color: 'white' }}>VEXIOGATE</span>
        </div>
        <div style={{ width: '100px' }}></div> {/* Spacer */}
      </nav>

      <SecurityBackground />

      <div style={{ 
        flex: 1,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '100px 20px 40px',
        position: 'relative',
        zIndex: 1
      }}>
        <style>{`
          .loading-ring {
            width: 60px;
            height: 60px;
            border: 3px solid rgba(255,255,255,0.1);
            border-top: 3px solid var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin { 100% { transform: rotate(360deg); } }
          .demo-hint {
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.2);
            padding: 12px;
            border-radius: 12px;
            margin-bottom: 24px;
            font-size: 0.8rem;
            color: #10b981;
          }
        `}</style>

        {loading && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(3, 7, 18, 0.95)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)'
          }}>
            <div className="loading-ring"></div>
            <div style={{ marginTop: '20px', fontWeight: '800', letterSpacing: '4px', color: 'var(--primary)', fontSize: '0.8rem' }}>
              SCANNING CREDENTIALS
            </div>
          </div>
        )}

        <Card className="w-full max-w-[440px] bg-zinc-950/80 border-white/10 backdrop-blur-xl shadow-2xl p-6 relative">
          <CardHeader className="text-center pb-4 flex flex-col items-center">
            <div className="inline-flex p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-4 justify-center mx-auto">
              {portalType === "SuperAdmin" ? <Shield size={28} className="text-purple-400" /> : <Layout size={28} className="text-purple-400" />}
            </div>
            <CardTitle className="text-2xl font-black tracking-tight text-white">
              {portalType === "SuperAdmin" ? "Secure Vault" : "VexioGate Access"}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <div className="demo-hint" style={{ padding: '8px 12px', marginBottom: '16px', fontSize: '0.75rem' }}>
              <strong>DEMO MODE:</strong> Use buttons below to auto-fill roles.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '24px' }}>
              {[
                { role: 'Emp', email: 'employee@vexio.local', long: 'Employee' },
                { role: 'Mgr', email: 'manager@vexio.local', long: 'Manager' },
                { role: 'Adm', email: 'admin@vexio.local', long: 'Admin' },
                { role: 'Sup', email: 'superadmin@vexio.local', long: 'SuperAdmin' }
              ].map(demo => (
                <button
                  key={demo.role}
                  type="button"
                  onClick={() => {
                     setEmail(demo.email);
                     setPassword('password123');
                     setIntendedRole(demo.long);
                     setTimeout(() => document.getElementById('login-form-submit').click(), 500);
                  }}
                  style={{
                    padding: '8px 4px',
                    background: 'rgba(139, 92, 246, 0.05)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.65rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {demo.role}
                </button>
              ))}
            </div>

            {portalType === "SuperAdmin" && (
              <div style={{ 
                background: 'rgba(34, 211, 238, 0.05)', 
                borderRadius: '12px', 
                padding: '16px', 
                marginBottom: '24px', 
                border: '1px solid rgba(34, 211, 238, 0.2)',
                textAlign: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#22d3ee', fontWeight: '800', fontSize: '0.8rem' }}>
                  <CheckCircle size={16} /> Have a unique ID and password
                </div>
                <p style={{ fontSize: '0.65rem', color: '#9ca3af', marginTop: '4px' }}>
                  Enter the credentials received via email after registration.
                </p>
              </div>
            )}

            {portalType === "User" && (
              <div style={{ 
                display: 'flex', 
                background: 'rgba(255,255,255,0.03)', 
                borderRadius: '10px', 
                padding: '3px', 
                marginBottom: '24px', 
                border: '1px solid rgba(255,255,255,0.05)' 
              }}>
                {['Employee', 'Manager', 'Admin'].map(role => (
                  <button 
                    key={role}
                    type="button"
                    onClick={() => setIntendedRole(role)}
                    style={{
                      flex: 1,
                      padding: '10px 4px',
                      borderRadius: '8px',
                      fontSize: '0.7rem',
                      fontWeight: '800',
                      background: intendedRole === role ? 'var(--primary)' : 'transparent',
                      color: intendedRole === role ? 'white' : 'var(--text-muted)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    {role.toUpperCase()}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleLogin}>
              {error && (
                <div style={{ 
                  padding: '14px', 
                  background: 'rgba(239, 68, 68, 0.1)', 
                  borderRadius: '12px', 
                  color: '#fca5a5', 
                  fontSize: '0.85rem', 
                  marginBottom: '24px',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  textAlign: 'center',
                  fontWeight: '600'
                }}>
                  {error}
                </div>
              )}

              <FieldGroup className="flex flex-col gap-4">
                <Field>
                  <FieldLabel htmlFor="email" className="text-zinc-400 font-extrabold text-[10px] tracking-wider uppercase mb-1 block">Identifier</FieldLabel>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#71717a', zIndex: 10 }} />
                    <Input 
                      id="email"
                      type="email" 
                      placeholder="Email Address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-zinc-900/40 border-white/5 text-white pl-12 h-12 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
                    />
                  </div>
                </Field>

                <Field>
                  <FieldLabel htmlFor="password" className="text-zinc-400 font-extrabold text-[10px] tracking-wider uppercase mb-1 block">Cipher</FieldLabel>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#71717a', zIndex: 10 }} />
                    <Input 
                      id="password"
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-zinc-900/40 border-white/5 text-white pl-12 h-12 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
                    />
                  </div>
                </Field>

                {showMfa && (
                  <Field className="animate-fade-in">
                    <FieldLabel htmlFor="mfaCode" className="text-purple-400 font-extrabold text-[10px] tracking-wider uppercase mb-1 block">Security Sync Token</FieldLabel>
                    <div style={{ position: 'relative' }}>
                      <ShieldCheck size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', zIndex: 10 }} />
                      <Input 
                        id="mfaCode"
                        type="text" 
                        placeholder="6-Digit Code" 
                        value={mfaCode}
                        onChange={(e) => setMfaCode(e.target.value)}
                        required
                        className="bg-zinc-900/40 border-purple-500/30 text-white pl-12 h-12 rounded-xl focus:border-purple-500 focus:ring-1"
                      />
                    </div>
                  </Field>
                )}

                <Field className="mt-2">
                  <button 
                    id="login-form-submit"
                    type="submit" 
                    className="btn btn-primary cursor-pointer" 
                    style={{ width: '100%', padding: '14px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    disabled={loading}
                  >
                    {loading ? "SCANNING..." : "AUTHORIZE ACCESS"} <ArrowRight size={18} />
                  </button>
                </Field>
              </FieldGroup>
            </form>

            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Need access? <Link to="/pricing" style={{ color: '#22d3ee', fontWeight: '800', textDecoration: 'none' }}>View subscription plans</Link>
              </p>
            </div>

            <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              System ID: VX-{(Math.random() * 1000).toFixed(0)} | Zone: Global
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
