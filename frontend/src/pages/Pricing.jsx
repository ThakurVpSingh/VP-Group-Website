import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Shield, Zap, Crown, Briefcase, ChevronRight, Globe, Lock, Cpu } from 'lucide-react';
import ProjectNavbar from '../components/ProjectNavbar';
import Footer from '../components/Footer';

const PricingBackground = () => {
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

    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5
      });
    }

    const drawLine = (p1, p2) => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 150) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 * (1 - distance / 150)})`;
        ctx.lineWidth = 1;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || document.documentElement.classList.contains('dark') || document.body.classList.contains('dark-theme');
      ctx.fillStyle = isDark ? '#121820' : '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          drawLine(p, particles[j]);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0 }} />;
};

const Pricing = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annual'

  const plans = [
    {
      name: "Trial Protocol",
      id: "trial",
      monthlyPrice: "1,299",
      annualPrice: "999",
      features: ["Standard IAM Access", "Secure Logging", "1 Active Node", "Email Support", "Live Telemetry"],
      icon: <Zap color="#22d3ee" size={32} />,
      color: "#22d3ee"
    },
    {
      name: "Professional Tier",
      id: "pro",
      monthlyPrice: "2,999",
      annualPrice: "2,499",
      features: ["Advanced Telemetry", "Unlimited Storage", "5 Active Nodes", "Priority Support", "Audit Logs", "MFA Integration"],
      icon: <Shield color="#8b5cf6" size={32} />,
      color: "#8b5cf6",
      popular: true
    },
    {
      name: "Enterprise Core",
      id: "enterprise",
      monthlyPrice: "9,999",
      annualPrice: "7,999",
      features: ["Full Neural Guard", "Custom Branding", "Unlimited Nodes", "Dedicated Manager", "Compliance Vault", "API Access"],
      icon: <Crown color="#f59e0b" size={32} />,
      color: "#f59e0b"
    },
    {
      name: "Legacy Infinite",
      id: "legacy",
      monthlyPrice: "49,999",
      annualPrice: "39,999",
      features: ["All Features Included", "Lifetime Infrastructure", "Immutable Backup", "VIP Concierge", "SLA Guarantee 99.99%", "Custom Neural Training"],
      icon: <Briefcase color="#ef4444" size={32} />,
      color: "#ef4444"
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-canvas)', color: 'var(--color-ink)', display: 'flex', flexDirection: 'column' }}>
      <ProjectNavbar />
      <PricingBackground />

      <main style={{ flex: 1, position: 'relative', zIndex: 1, padding: '140px 5% 100px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          
          <div style={{ marginBottom: '60px' }}>
            <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(28, 105, 212, 0.1)', color: 'var(--color-primary)', borderRadius: '0px', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px', marginBottom: '20px' }}>ACCESS PROTOCOLS</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '900', letterSpacing: '-3px', marginBottom: '24px', color: 'var(--color-ink)' }}>
              Subscription <span className="text-gradient-cyan">Framework.</span>
            </h1>
            <p style={{ color: 'var(--color-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
              Select your operational tier. Scale your security mesh with precision-engineered infrastructure.
            </p>
          </div>

          {/* Billing Toggle */}
          <div style={{ 
            display: 'inline-flex', 
            background: 'var(--color-surface-soft)', 
            padding: '4px', 
            borderRadius: '0px', 
            border: '1px solid var(--color-hairline)',
            marginBottom: '60px'
          }}>
            <button 
              onClick={() => setBillingCycle('monthly')}
              style={{ 
                padding: '10px 24px', 
                borderRadius: '0px', 
                border: 'none', 
                background: billingCycle === 'monthly' ? 'var(--color-primary)' : 'transparent',
                color: billingCycle === 'monthly' ? '#ffffff' : 'var(--color-muted)',
                fontWeight: '800',
                cursor: 'pointer',
                transition: '0.3s'
              }}
            >
              MONTHLY
            </button>
            <button 
              onClick={() => setBillingCycle('annual')}
              style={{ 
                padding: '10px 24px', 
                borderRadius: '0px', 
                border: 'none', 
                background: billingCycle === 'annual' ? 'var(--color-primary)' : 'transparent',
                color: billingCycle === 'annual' ? '#ffffff' : 'var(--color-muted)',
                fontWeight: '800',
                cursor: 'pointer',
                transition: '0.3s'
              }}
            >
              ANNUAL <span style={{ fontSize: '0.6rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px' }}>SAVE 20%</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', alignItems: 'stretch' }}>
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className="pricing-card"
                style={{ 
                  padding: '40px', 
                  background: 'var(--color-surface-card)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '0px',
                  border: plan.popular ? `2px solid var(--color-primary)` : '1px solid var(--color-hairline)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  textAlign: 'left'
                }}
              >
                {plan.popular && (
                  <div style={{ 
                    position: 'absolute', 
                    top: '-16px', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    background: 'var(--color-primary)', 
                    color: '#fff',
                    padding: '4px 20px', 
                    borderRadius: '0px', 
                    fontSize: '0.7rem', 
                    fontWeight: '900', 
                    letterSpacing: '1px'
                  }}>
                    RECOMMENDED
                  </div>
                )}
                
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ 
                    width: 64, 
                    height: 64, 
                    borderRadius: '0px', 
                    background: `${plan.color}15`, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '24px'
                  }}>
                    {plan.icon}
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '8px', color: 'var(--color-ink)' }}>{plan.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--color-ink)' }}>
                      ₹{billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                    </span>
                    <span style={{ color: 'var(--color-muted)', fontWeight: '600' }}>/mo</span>
                  </div>
                </div>

                <div style={{ flex: 1, marginBottom: '40px' }}>
                  {plan.features.map((feature, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', fontSize: '0.9rem', color: 'var(--color-body)' }}>
                      <div style={{ marginTop: '2px', color: plan.color }}><Check size={16} /></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => navigate(`/checkout?plan=${plan.id}&cycle=${billingCycle}`)}
                  className="plan-button"
                  style={{ 
                    width: '100%', 
                    padding: '18px', 
                    borderRadius: '0px', 
                    fontWeight: '900', 
                    background: plan.popular ? 'var(--color-primary)' : 'var(--color-surface-soft)',
                    border: '1px solid var(--color-hairline)',
                    color: plan.popular ? '#ffffff' : 'var(--color-ink)',
                    cursor: 'pointer',
                    transition: '0.3s',
                    letterSpacing: '1px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                >
                  SELECT & CONTINUE <ChevronRight size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Payment Partners Section */}
          <div style={{ marginTop: '80px', padding: '40px', background: 'var(--color-surface-soft)', borderRadius: '0px', border: '1px solid var(--color-hairline)' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: '30px', fontWeight: '800', letterSpacing: '2px' }}>SUPPORTED PAYMENT INTERFACES</h4>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap', alignItems: 'center', opacity: 0.8 }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '900', fontSize: '1.2rem', color: 'var(--color-ink)' }}>
                 <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#ff5f00' }}></div> MasterStream
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '900', fontSize: '1.2rem', color: 'var(--color-ink)' }}>
                 <div style={{ width: 40, height: 25, borderRadius: '4px', background: '#1a1f71' }}></div> VisaMesh
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '900', fontSize: '1.2rem', color: 'var(--color-ink)' }}>
                 <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#0070ba' }}></div> CryptPay
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '900', fontSize: '1.2rem', color: 'var(--color-ink)' }}>
                 <div style={{ width: 30, height: 30, borderRadius: '6px', background: '#32325d' }}></div> StripeNodes
               </div>
            </div>
          </div>

          {/* Bottom Trust Section */}
          <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'center', gap: '60px', opacity: 0.75, flexWrap: 'wrap', color: 'var(--color-muted)', fontWeight: '700' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Lock size={20} /> 256-BIT ENCRYPTION</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Globe size={20} /> GLOBAL EDGE NETWORK</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Cpu size={20} /> NEURAL INFRASTRUCTURE</div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .text-gradient-cyan {
          background: linear-gradient(to right, #22d3ee, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .pricing-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.04);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .plan-button:hover {
          filter: brightness(1.1);
          transform: scale(1.02);
        }
        @media (max-width: 1024px) {
          main { padding: 120px 5% 60px !important; }
          h1 { font-size: 2.8rem !important; }
        }
        @media (max-width: 768px) {
          main { padding: 100px 20px 40px !important; }
          h1 { font-size: 2.22rem !important; }
          .pricing-card { padding: 30px 20px !important; }
        }
      `}</style>
    </div>
  );
};

export default Pricing;
