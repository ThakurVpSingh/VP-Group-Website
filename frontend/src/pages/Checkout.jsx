import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Shield, Zap, CreditCard, Landmark, Smartphone, ArrowRight, HelpCircle, LifeBuoy, CheckCircle, ChevronLeft } from 'lucide-react';
import Footer from '../components/Footer';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planId = searchParams.get('plan') || 'pro';
  const cycle = searchParams.get('cycle') || 'monthly';
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const planDetails = {
    trial: { name: "Trial Protocol", price: cycle === 'monthly' ? "1,299" : "999" },
    pro: { name: "Professional Tier", price: cycle === 'monthly' ? "2,999" : "2,499" },
    enterprise: { name: "Enterprise Core", price: cycle === 'monthly' ? "9,999" : "7,999" },
    legacy: { name: "Legacy Infinite", price: cycle === 'monthly' ? "49,999" : "39,999" }
  };

  const currentPlan = planDetails[planId] || planDetails.pro;

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 3000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-canvas)', color: 'var(--color-ink)', display: 'flex', flexDirection: 'column', transition: 'background 0.3s ease, color 0.3s ease' }}>
      
      {/* Checkout Navbar */}
      <nav style={{ 
        padding: '20px 5%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        background: 'var(--color-surface-soft)', 
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--color-hairline)',
        position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Shield size={22} color="var(--color-primary)" />
          <span style={{ fontWeight: '900', letterSpacing: '2px', color: 'var(--color-ink)' }}>VEXIO<span style={{ color: 'var(--color-primary)' }}>PAY</span></span>
        </div>
        <div style={{ display: 'flex', gap: '30px' }}>
          <a href="#" style={{ color: 'var(--color-muted)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}><HelpCircle size={16} /> Help</a>
          <a href="#" style={{ color: 'var(--color-muted)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}><LifeBuoy size={16} /> Support</a>
        </div>
      </nav>

      <main style={{ flex: 1, padding: '140px 5% 80px', position: 'relative' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <Link to="/pricing" style={{ color: 'var(--color-muted)', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '40px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ChevronLeft size={18} /> Back to Pricing
          </Link>

          {!isSuccess ? (
            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 968 ? '1fr' : '1.5fr 1fr', gap: '40px', marginTop: '30px' }}>
              
              {/* Payment Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div className="glass-panel" style={{ padding: '40px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '30px', borderBottom: '1px solid var(--color-hairline)', paddingBottom: '20px', color: 'var(--color-ink)' }}>IDENTIFICATION & BILLING</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: 'var(--color-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Billing Name</label>
                      <input type="text" placeholder="John Doe" className="checkout-input" required />
                    </div>
                    <div className="form-group">
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: 'var(--color-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>VAT / TAX ID (Opt)</label>
                      <input type="text" placeholder="Optional" className="checkout-input" />
                    </div>
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '40px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '30px', borderBottom: '1px solid var(--color-hairline)', paddingBottom: '20px', color: 'var(--color-ink)' }}>PAYMENT METHOD</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginBottom: '40px' }}>
                    {[
                      { id: 'card', label: 'Credit Card', icon: <CreditCard size={20} /> },
                      { id: 'upi', label: 'UPI Sync', icon: <Smartphone size={20} /> },
                      { id: 'net', label: 'NetBanking', icon: <Landmark size={20} /> }
                    ].map(method => (
                      <div 
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        style={{ 
                          padding: '24px', 
                          borderRadius: '16px', 
                          background: paymentMethod === method.id ? 'rgba(28, 105, 212, 0.12)' : 'var(--color-surface-soft)',
                          border: paymentMethod === method.id ? '2px solid var(--color-primary)' : '1px solid var(--color-hairline)',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: '0.3s'
                        }}
                      >
                        <div style={{ marginBottom: '10px', color: paymentMethod === method.id ? 'var(--color-primary)' : 'var(--color-ink)' }}>{method.icon}</div>
                        <span style={{ fontWeight: '700', fontSize: '0.8rem', color: 'var(--color-ink)' }}>{method.label}</span>
                      </div>
                    ))}
                  </div>

                  {paymentMethod === 'card' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <input type="text" placeholder="Card Number" className="checkout-input" />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <input type="text" placeholder="MM/YY" className="checkout-input" />
                        <input type="password" placeholder="CVC" className="checkout-input" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <input type="text" placeholder="yourname@upi" className="checkout-input" />
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="glass-panel" style={{ padding: '40px', position: 'sticky', top: '140px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '24px', color: 'var(--color-ink)' }}>ORDER SUMMARY</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ color: 'var(--color-muted)' }}>{currentPlan.name}</span>
                    <span style={{ fontWeight: '700', color: 'var(--color-ink)' }}>₹{currentPlan.price}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--color-muted)' }}>Billing Cycle</span>
                    <span style={{ color: 'var(--color-primary)', fontWeight: '800' }}>{cycle.toUpperCase()}</span>
                  </div>
                  <div style={{ borderTop: '1px solid var(--color-hairline)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                    <span style={{ fontWeight: '900', fontSize: '1.2rem', color: 'var(--color-ink)' }}>Total</span>
                    <span style={{ fontWeight: '900', fontSize: '1.2rem', color: 'var(--color-primary)' }}>₹{currentPlan.price}</span>
                  </div>

                  <button 
                    onClick={handlePayment}
                    disabled={isProcessing}
                    style={{ 
                      width: '100%', padding: '20px', borderRadius: '16px', background: 'var(--color-primary)', color: '#ffffff', 
                      fontWeight: '900', border: 'none', cursor: 'pointer', transition: '0.3s', fontSize: '1rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'
                    }}
                  >
                    {isProcessing ? "INITIALIZING TRANSACTION..." : "PROCESS SECURE PAYMENT"} {!isProcessing && <ArrowRight size={20} />}
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--color-muted)', marginTop: '20px' }}>
                    SECURE 256-BIT ENCRYPTED TRANSACTION
                  </p>
                </div>
              </div>

            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>
                <CheckCircle size={60} color="#10b981" />
              </div>
              <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '20px', color: 'var(--color-ink)' }}>Payment <span style={{ color: '#10b981' }}>Authorized.</span></h1>
              <p style={{ color: 'var(--color-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.6 }}>
                Your operational tier <strong>{currentPlan.name}</strong> has been activated. A final confirmation and invoice have been transmitted to your registered email.
              </p>
              <button 
                onClick={() => navigate('/')}
                style={{ 
                  padding: '20px 60px', borderRadius: '16px', background: 'var(--color-surface-soft)', color: 'var(--color-ink)', 
                  border: '1px solid var(--color-hairline)', fontWeight: '900', cursor: 'pointer' 
                }}
              >
                RETURN TO HOME <ArrowRight size={20} style={{ marginLeft: '12px', verticalAlign: 'middle' }} />
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />

      <style>{`
        .glass-panel {
          background: var(--color-surface-card);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid var(--color-hairline);
        }
        .checkout-input {
          width: 100%;
          padding: 16px;
          background: var(--color-canvas);
          border: 1px solid var(--color-hairline);
          border-radius: 12px;
          color: var(--color-ink);
          font-family: inherit;
        }
        .checkout-input:focus {
          border-color: var(--color-primary);
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default Checkout;
