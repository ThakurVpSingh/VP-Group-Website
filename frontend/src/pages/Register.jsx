import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { User, Users, Shield, ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';

// Import Shadcn UI Components
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Field, FieldLabel, FieldDescription, FieldGroup } from '../components/ui/field';

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const plan = searchParams.get('plan') || 'standard';
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    institution: ''
  });

  const roles = [
    { id: 'student', label: 'Student / Employee', icon: <User size={24} />, color: '#10b981' },
    { id: 'manager', label: 'Manager / Principal', icon: <Users size={24} />, color: '#3b82f6' },
    { id: 'admin', label: 'Organization Admin', icon: <Shield size={24} />, color: '#8b5cf6' }
  ];

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else {
      // Logic would send email here
      setStep(3);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-canvas)', color: 'var(--color-ink)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', padding: '60px 5%', transition: 'background 0.3s ease, color 0.3s ease' }}>
      <Card 
        className="w-full max-w-[560px] backdrop-blur-xl shadow-2xl p-6 md:p-8 relative"
        style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-hairline)', borderRadius: '16px' }}
      >
        
        {step < 3 && (
          <CardHeader className="text-center pb-6 flex flex-col items-center">
            <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-4 justify-center mx-auto">
              <HelpCircle size={28} className="text-cyan-500" />
            </div>
            <CardTitle className="text-3xl font-black tracking-tight" style={{ color: 'var(--color-ink)' }}>
              Account <span style={{ color: 'var(--color-primary)' }}>Registration</span>
            </CardTitle>
            <p className="text-xs uppercase tracking-wider font-extrabold mt-2" style={{ color: 'var(--color-muted)' }}>
              Provisioning access for {plan.toUpperCase()} tier
            </p>
          </CardHeader>
        )}

        <CardContent className="p-0">
          {step === 1 && (
            <form onSubmit={handleNext}>
              <FieldGroup className="flex flex-col gap-6">
                <Field>
                  <FieldLabel className="font-extrabold text-[10px] tracking-wider uppercase mb-3 block" style={{ color: 'var(--color-muted)' }}>
                    SELECT OPERATIONAL ROLE
                  </FieldLabel>
                  <div className="flex flex-col gap-4">
                    {roles.map(r => (
                      <div 
                        key={r.id}
                        onClick={() => setFormData({...formData, role: r.id})}
                        className="transition-all duration-300"
                        style={{ 
                          padding: '20px 24px', 
                          borderRadius: '16px', 
                          background: formData.role === r.id ? `${r.color}15` : 'var(--color-surface-soft)',
                          border: formData.role === r.id ? `2px solid ${r.color}` : '1px solid var(--color-hairline)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px'
                        }}
                      >
                        <div style={{ color: r.color }}>{r.icon}</div>
                        <span className="font-extrabold text-sm" style={{ color: 'var(--color-ink)' }}>{r.label}</span>
                      </div>
                    ))}
                  </div>
                </Field>

                <Field className="mt-4">
                  <button 
                    disabled={!formData.role}
                    className="btn btn-primary cursor-pointer w-full"
                    style={{ 
                      padding: '16px', 
                      borderRadius: '12px', 
                      background: formData.role ? 'var(--color-primary)' : 'var(--color-surface-strong)', 
                      color: formData.role ? '#ffffff' : 'var(--color-muted)',
                      fontWeight: '900', 
                      border: 'none',
                      transition: 'all 0.3s'
                    }}
                  >
                    CONTINUE TO DETAILS
                  </button>
                </Field>
              </FieldGroup>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNext}>
              <FieldGroup className="flex flex-col gap-4">
                <Field>
                  <FieldLabel htmlFor="name" className="font-extrabold text-[10px] tracking-wider uppercase mb-1 block" style={{ color: 'var(--color-muted)' }}>Full Name</FieldLabel>
                  <Input 
                    id="name"
                    placeholder="E.g., Vaibhav Pratap Singh" 
                    required 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    style={{ background: 'var(--color-canvas)', borderColor: 'var(--color-hairline)', color: 'var(--color-ink)' }}
                    className="h-12 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="email" className="font-extrabold text-[10px] tracking-wider uppercase mb-1 block" style={{ color: 'var(--color-muted)' }}>Operational Email</FieldLabel>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="E.g., email@yourcompany.com" 
                    required 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    style={{ background: 'var(--color-canvas)', borderColor: 'var(--color-hairline)', color: 'var(--color-ink)' }}
                    className="h-12 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="institution" className="font-extrabold text-[10px] tracking-wider uppercase mb-1 block" style={{ color: 'var(--color-muted)' }}>Institution / Company</FieldLabel>
                  <Input 
                    id="institution"
                    placeholder="E.g., VP Group" 
                    required 
                    onChange={e => setFormData({...formData, institution: e.target.value})}
                    style={{ background: 'var(--color-canvas)', borderColor: 'var(--color-hairline)', color: 'var(--color-ink)' }}
                    className="h-12 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20"
                  />
                </Field>

                <Field className="mt-4">
                  <button className="btn btn-primary cursor-pointer w-full" style={{ padding: '16px', borderRadius: '12px', background: 'var(--color-primary)', color: '#ffffff', fontWeight: '900', border: 'none' }}>
                    COMPLETE PROVISIONING
                  </button>
                </Field>
              </FieldGroup>
            </form>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <CheckCircle size={80} color="#10b981" style={{ marginBottom: '24px', display: 'inline-block' }} />
              <h2 className="text-3xl font-black mb-4" style={{ color: 'var(--color-ink)' }}>Provisioning <span style={{ color: '#10b981' }}>Complete.</span></h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--color-muted)' }}>
                Your unique User ID and Password have been generated and transmitted to <strong>{formData.email}</strong>.<br />
                Please check your inbox (and spam folder) to proceed with the secure vault access.
              </p>
              <button 
                onClick={() => navigate('/pricing')}
                className="btn btn-primary cursor-pointer"
                style={{ padding: '16px 32px', borderRadius: '12px', background: 'var(--color-primary)', color: '#ffffff', border: 'none', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                EXPLORE SUBSCRIPTION PLANS <ArrowRight size={20} />
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
