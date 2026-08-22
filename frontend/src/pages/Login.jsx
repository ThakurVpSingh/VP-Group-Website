import { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  Dumbbell, Flame, Activity, Shield, Lock, Mail, ArrowRight, 
  ShieldCheck, Layout, ChevronLeft, Zap, CheckCircle, UserCheck, 
  Award, Key, Sparkles, QrCode
} from 'lucide-react';
import Footer from '../components/Footer';

// Import Shadcn UI Components
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Field, FieldLabel, FieldDescription, FieldGroup } from '../components/ui/field';

const GymBackground = () => {
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

    const fitnessWords = [
      'PULSE_98_BPM', 'BEAST_MODE', 'WORKOUT_ACTIVE', 'STRENGTH_ZONE', 
      'CARDIO_BEAT', 'REP_COUNTER', 'LOCKER_PASS', 'CALORIES_BURNED', 
      'HYDRATE_NOW', 'TRAIN_HARD', 'RECOVERY_PASS', 'MEMBERSHIP_ACTIVE',
      'VIP_ATHLETE', 'FAT_BURN', 'MAX_HYPERTROPHY', 'FITNESS_HUB'
    ];

    class Particle {
      constructor() {
        this.init();
      }

      init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.text = fitnessWords[Math.floor(Math.random() * fitnessWords.length)];
        this.speed = 0.6 + Math.random() * 1.8;
        this.fontSize = 11 + Math.random() * 13;
        this.alpha = 0.15 + Math.random() * 0.45;
        this.colorType = Math.random() > 0.5 ? '249, 115, 22' : '239, 68, 68'; // Orange or Red accent
      }

      draw() {
        ctx.font = `900 ${this.fontSize}px "Plus Jakarta Sans", monospace, sans-serif`;
        ctx.fillStyle = `rgba(${this.colorType}, ${this.alpha * 0.25})`;
        ctx.fillText(this.text, this.x, this.y);
        this.y -= this.speed;

        if (this.y < -30) {
          this.init();
          this.y = canvas.height + 30;
        }
      }
    }

    const particles = Array.from({ length: 42 }, () => new Particle());

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
        opacity: 0.6,
        pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 20%, #170c06 0%, #080a10 70%, #030712 100%)'
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
  const [intendedRole, setIntendedRole] = useState(portalType === "SuperAdmin" ? "SuperAdmin" : "Member");

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
      background: '#030712',
      position: 'relative',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      
      {/* Navigation Header for Gym Sign In */}
      <nav style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '16px 40px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        background: 'rgba(9, 11, 18, 0.85)', 
        borderBottom: '1px solid rgba(249, 115, 22, 0.15)', 
        zIndex: 1000, 
        backdropFilter: 'blur(20px)' 
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af', fontSize: '0.85rem', fontWeight: '700', transition: 'color 0.2s' }}>
          <ChevronLeft size={18} color="#f97316" /> Back to Main Site
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '36px', 
            height: '36px', 
            background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)', 
            borderRadius: '10px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(249, 115, 22, 0.4)' 
          }}>
            <Dumbbell size={22} color="white" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: '900', fontSize: '1.2rem', color: 'white', letterSpacing: '1px' }}>PULSE<span style={{ color: '#f97316' }}>GYM</span></span>
            <span style={{ fontSize: '0.65rem', color: '#9ca3af', fontWeight: '700', letterSpacing: '2px' }}>ATHLETIC CLUB</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ padding: '6px 12px', background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.25)', borderRadius: '20px', fontSize: '0.75rem', color: '#f97316', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Flame size={14} className="animate-pulse" /> LIVE GYM PORTAL
          </span>
        </div>
      </nav>

      <GymBackground />

      <div style={{ 
        flex: 1,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '110px 20px 40px',
        position: 'relative',
        zIndex: 1
      }}>
        <style>{`
          .loading-ring {
            width: 60px;
            height: 60px;
            border: 4px solid rgba(249, 115, 22, 0.15);
            border-top: 4px solid #f97316;
            border-radius: 50%;
            animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
          @keyframes spin { 100% { transform: rotate(360deg); } }
          .gym-card {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(249, 115, 22, 0.08);
            transition: all 0.3s ease;
          }
          .role-btn {
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .role-btn:hover {
            transform: translateY(-2px);
          }
          .demo-preset-btn {
            transition: all 0.2s ease;
          }
          .demo-preset-btn:hover {
            background: rgba(249, 115, 22, 0.15) !important;
            border-color: rgba(249, 115, 22, 0.3) !important;
            color: #fff !important;
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
            backdropFilter: 'blur(10px)'
          }}>
            <div className="loading-ring"></div>
            <div style={{ marginTop: '24px', fontWeight: '900', letterSpacing: '4px', color: '#f97316', fontSize: '0.85rem' }}>
              VERIFYING GYM MEMBERSHIP
            </div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '6px' }}>Connecting to Gym Gate Access System...</p>
          </div>
        )}

        <Card className="w-full max-w-[460px] bg-zinc-950/85 border-orange-500/20 backdrop-blur-2xl p-6 md:p-8 relative rounded-3xl gym-card">
          
          <CardHeader className="text-center pb-4 flex flex-col items-center p-0 mb-4">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 mb-4 justify-center mx-auto shadow-lg shadow-orange-500/10">
              {portalType === "SuperAdmin" ? <Shield size={32} className="text-orange-400" /> : <Dumbbell size={32} className="text-orange-400" />}
            </div>
            
            <CardTitle className="text-3xl font-black tracking-tight text-white flex items-center justify-center gap-2">
              {portalType === "SuperAdmin" ? (
                <>Gym Admin <span className="text-orange-500">Vault</span></>
              ) : (
                <>Sign In to <span className="text-orange-500">Pulse Gym</span></>
              )}
            </CardTitle>
            
            <p className="text-xs text-zinc-400 font-medium mt-2 leading-relaxed">
              {portalType === "SuperAdmin" 
                ? "Full administrative access for gym operations, trainers & billing" 
                : "Access your workout routines, locker pass, trainer sessions & progress"}
            </p>
          </CardHeader>

          <CardContent className="p-0">
            
            {/* Quick Demo Autofill Selector */}
            <div style={{ 
              background: 'rgba(249, 115, 22, 0.04)', 
              border: '1px solid rgba(249, 115, 22, 0.15)', 
              padding: '14px', 
              borderRadius: '16px', 
              marginBottom: '20px' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: '900', color: '#f97316', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={13} /> Quick Demo Logins
                </span>
                <span style={{ fontSize: '0.65rem', color: '#6b7280', fontWeight: '600' }}>1-Click Auto Fill</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {[
                  { role: 'Member', email: 'member@gym.local', long: 'Member', icon: '🏋️‍♂️' },
                  { role: 'Trainer', email: 'trainer@gym.local', long: 'Trainer', icon: '💪' },
                  { role: 'Manager', email: 'manager@gym.local', long: 'Manager', icon: '📋' },
                  { role: 'Admin', email: 'admin@gym.local', long: 'Admin', icon: '👑' }
                ].map(demo => (
                  <button
                    key={demo.role}
                    type="button"
                    className="demo-preset-btn"
                    onClick={() => {
                       setEmail(demo.email);
                       setPassword('password123');
                       setIntendedRole(demo.long);
                       setTimeout(() => document.getElementById('login-form-submit')?.click(), 400);
                    }}
                    style={{
                      padding: '10px 4px',
                      background: intendedRole === demo.long ? 'rgba(249, 115, 22, 0.2)' : 'rgba(255,255,255,0.03)',
                      border: intendedRole === demo.long ? '1px solid #f97316' : '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: '0.7rem',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '3px'
                    }}
                  >
                    <span style={{ fontSize: '1rem' }}>{demo.icon}</span>
                    <span>{demo.role}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Role Selection Tabs */}
            {portalType === "User" && (
              <div style={{ 
                display: 'flex', 
                background: 'rgba(255,255,255,0.03)', 
                borderRadius: '14px', 
                padding: '4px', 
                marginBottom: '20px', 
                border: '1px solid rgba(255,255,255,0.06)' 
              }}>
                {[
                  { id: 'Member', label: 'Athlete / Member' },
                  { id: 'Trainer', label: 'Coach / Trainer' },
                  { id: 'Manager', label: 'Gym Manager' }
                ].map(tab => (
                  <button 
                    key={tab.id}
                    type="button"
                    className="role-btn"
                    onClick={() => setIntendedRole(tab.id)}
                    style={{
                      flex: 1,
                      padding: '10px 6px',
                      borderRadius: '10px',
                      fontSize: '0.7rem',
                      fontWeight: '800',
                      background: intendedRole === tab.id 
                        ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' 
                        : 'transparent',
                      color: intendedRole === tab.id ? 'white' : '#9ca3af',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: intendedRole === tab.id ? '0 4px 12px rgba(249, 115, 22, 0.3)' : 'none'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleLogin}>
              {error && (
                <div style={{ 
                  padding: '14px', 
                  background: 'rgba(239, 68, 68, 0.12)', 
                  borderRadius: '14px', 
                  color: '#fca5a5', 
                  fontSize: '0.85rem', 
                  marginBottom: '20px',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  textAlign: 'center',
                  fontWeight: '700'
                }}>
                  {error}
                </div>
              )}

              <FieldGroup className="flex flex-col gap-4">
                <Field>
                  <FieldLabel htmlFor="email" className="text-zinc-400 font-extrabold text-[10px] tracking-wider uppercase mb-1.5 block flex items-center justify-between">
                    <span>Member Email or Gym ID</span>
                    <span className="text-orange-500/80 font-semibold text-[9px]">e.g. member@gym.local</span>
                  </FieldLabel>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', zIndex: 10 }} />
                    <Input 
                      id="email"
                      type="email" 
                      placeholder="athlete@pulsefitness.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-zinc-900/60 border-white/10 text-white pl-12 h-12 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 text-sm font-medium"
                    />
                  </div>
                </Field>

                <Field>
                  <FieldLabel htmlFor="password" className="text-zinc-400 font-extrabold text-[10px] tracking-wider uppercase mb-1.5 block flex items-center justify-between">
                    <span>Password / Access PIN</span>
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Passcode reset link sent to your registered email."); }} className="text-orange-400 hover:text-orange-300 text-[10px] font-bold">Forgot PIN?</a>
                  </FieldLabel>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', zIndex: 10 }} />
                    <Input 
                      id="password"
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-zinc-900/60 border-white/10 text-white pl-12 h-12 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 text-sm font-medium"
                    />
                  </div>
                </Field>

                {showMfa && (
                  <Field className="animate-fade-in">
                    <FieldLabel htmlFor="mfaCode" className="text-orange-400 font-extrabold text-[10px] tracking-wider uppercase mb-1.5 block">Gym Gate 2FA Passcode</FieldLabel>
                    <div style={{ position: 'relative' }}>
                      <QrCode size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#f97316', zIndex: 10 }} />
                      <Input 
                        id="mfaCode"
                        type="text" 
                        placeholder="6-Digit Gate Code" 
                        value={mfaCode}
                        onChange={(e) => setMfaCode(e.target.value)}
                        required
                        className="bg-zinc-900/60 border-orange-500/40 text-white pl-12 h-12 rounded-xl focus:border-orange-500 focus:ring-1"
                      />
                    </div>
                  </Field>
                )}

                <Field className="mt-3">
                  <button 
                    id="login-form-submit"
                    type="submit" 
                    disabled={loading}
                    style={{ 
                      width: '100%', 
                      padding: '16px', 
                      fontSize: '0.95rem', 
                      fontWeight: '900',
                      letterSpacing: '0.5px',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '10px',
                      background: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      boxShadow: '0 8px 25px rgba(249, 115, 22, 0.35)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {loading ? (
                      "VERIFYING MEMBERSHIP..."
                    ) : (
                      <>
                        <span>ENTER GYM PORTAL</span>
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </Field>
              </FieldGroup>
            </form>

            {/* Gym Membership Benefits Badge Strip */}
            <div style={{ 
              marginTop: '24px', 
              paddingTop: '20px', 
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              textAlign: 'center'
            }}>
              <div style={{ padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'white' }}>🏋️ Workout</div>
                <div style={{ fontSize: '0.65rem', color: '#9ca3af' }}>Custom Plans</div>
              </div>
              <div style={{ padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'white' }}>🔑 Gate QR</div>
                <div style={{ fontSize: '0.65rem', color: '#9ca3af' }}>Fast Access</div>
              </div>
              <div style={{ padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'white' }}>🔥 Progress</div>
                <div style={{ fontSize: '0.65rem', color: '#9ca3af' }}>Live Metrics</div>
              </div>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                Not a member yet?{' '}
                <Link to="/register?plan=gym" style={{ color: '#f97316', fontWeight: '800', textDecoration: 'none' }}>
                  Join Pulse Gym Today
                </Link>
              </p>
            </div>

            <div style={{ marginTop: '14px', textAlign: 'center', fontSize: '0.7rem', color: '#6b7280', fontWeight: '600' }}>
              Pulse Gym Athletic Club • Member Portal v2.4 • Zone: Main Facility
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
