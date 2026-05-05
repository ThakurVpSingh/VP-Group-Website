import React, { useState } from 'react';
import { Calendar, Clock, Video, Bot, ArrowRight, CheckCircle, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../config';

const BookingPage = () => {
  const [step, setStep] = useState(1); // 1: choose type, 2: details, 3: success
  const [formData, setFormData] = useState({
    visitorName: '',
    visitorEmail: '',
    duration: 45,
    startTime: '',
  });
  const [loading, setLoading] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');
  const [showAiModal, setShowAiModal] = useState(false);
  
  // AI Chat State
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState([
    { sender: 'ai', text: "Hello! I'm the VP Group AI Pre-Consultation assistant. I have access to our entire knowledge base. How can I help you today? You can ask me about our services, pricing, or technical integrations." }
  ]);
  
  const navigate = useNavigate();

  const handleAiSend = () => {
    if(!aiInput.trim()) return;
    setAiMessages([...aiMessages, { sender: 'user', text: aiInput }]);
    const currentInput = aiInput;
    setAiInput('');
    
    // Mock AI response
    setTimeout(() => {
      let reply = "I can definitely help with that. For highly specific requirements, I recommend booking a live expert session.";
      if(currentInput.toLowerCase().includes('price') || currentInput.toLowerCase().includes('cost')) reply = "Our pricing is highly customizable depending on system complexity. Basic portals start at competitive rates, while full Enterprise IAM systems are quoted per architecture.";
      if(currentInput.toLowerCase().includes('service')) reply = "We specialize in Web Development, Software Engineering, IAM portals, and robust Cloud Architecture.";
      setAiMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 1000);
  };

  const handleBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Set mock time to tomorrow 10 AM if not selected (for demo simplicity)
    const timeToUse = formData.startTime || new Date(Date.now() + 86400000).toISOString();
    
    try {
      const response = await fetch(getApiUrl('/api/consultations/book'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, startTime: timeToUse })
      });
      
      const data = await response.json();
      if (data.success) {
        setMeetingLink(data.meetingLink);
        setStep(3);
      } else {
        alert(data.error || 'Failed to book consultation');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#fff', fontFamily: '"Plus Jakarta Sans", sans-serif', padding: '100px 20px', position: 'relative', overflow: 'hidden' }}>
      {/* Background Glows */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '30px', color: '#a78bfa', fontSize: '0.875rem', fontWeight: 600, marginBottom: '24px' }}>
            <Video size={16} /> Secure Video Consultation
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, background: 'linear-gradient(135deg, #fff 0%, #a78bfa 50%, #22d3ee 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1px', marginBottom: '20px' }}>
            Book Your Session
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Connect with our experts via our end-to-end encrypted video platform, or get instant answers with our AI pre-consultation.
          </p>
        </div>

        {/* Form Container */}
        <div style={{ background: 'rgba(17, 24, 39, 0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '40px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
          
          {step === 1 && (
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '30px' }}>Choose Consultation Mode</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {/* Live Video Option */}
                <button 
                  onClick={() => setStep(2)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '30px', background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.3s ease', textAlign: 'left', width: '100%', color: '#fff' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = '#8b5cf6'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  <div style={{ background: '#8b5cf6', padding: '12px', borderRadius: '12px', marginBottom: '20px' }}>
                    <Video size={24} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '10px' }}>Live Expert Session</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '20px', lineHeight: 1.5 }}>Schedule a 45 or 90 minute in-browser video call with our architecture and engineering specialists.</p>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#a78bfa', fontWeight: 600, marginTop: 'auto' }}>
                    Proceed to scheduling <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                  </div>
                </button>

                {/* AI Option */}
                <button 
                  onClick={() => setShowAiModal(true)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '30px', background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.3s ease', textAlign: 'left', width: '100%', color: '#fff' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = '#22d3ee'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  <div style={{ background: '#22d3ee', padding: '12px', borderRadius: '12px', marginBottom: '20px' }}>
                    <Bot size={24} color="#0f172a" />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '10px' }}>Instant AI Consultation</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '20px', lineHeight: 1.5 }}>Get immediate answers via our trained LLM model before committing to a live session.</p>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#22d3ee', fontWeight: 600, marginTop: 'auto' }}>
                    Start AI Chat <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', cursor: 'pointer', color: '#94a3b8' }} onClick={() => setStep(1)}>
                <ChevronRight size={20} style={{ transform: 'rotate(180deg)', marginRight: '8px' }} /> Back to options
              </div>
              
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '30px' }}>Schedule Details</h2>
              
              <form onSubmit={handleBook} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '0.9rem' }}>Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.visitorName}
                      onChange={e => setFormData({...formData, visitorName: e.target.value})}
                      style={{ width: '100%', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 20px', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none' }}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '0.9rem' }}>Work Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.visitorEmail}
                      onChange={e => setFormData({...formData, visitorEmail: e.target.value})}
                      style={{ width: '100%', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 20px', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none' }}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '16px', color: '#cbd5e1', fontSize: '0.9rem' }}>Select Duration</label>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, duration: 45})}
                      style={{ flex: 1, padding: '20px', background: formData.duration === 45 ? 'rgba(139, 92, 246, 0.15)' : 'rgba(15, 23, 42, 0.5)', border: `1px solid ${formData.duration === 45 ? '#8b5cf6' : 'rgba(255,255,255,0.1)'}`, borderRadius: '12px', color: formData.duration === 45 ? '#fff' : '#94a3b8', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                    >
                      <Clock size={20} color={formData.duration === 45 ? '#a78bfa' : '#64748b'} />
                      <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>45 Minutes</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, duration: 90})}
                      style={{ flex: 1, padding: '20px', background: formData.duration === 90 ? 'rgba(139, 92, 246, 0.15)' : 'rgba(15, 23, 42, 0.5)', border: `1px solid ${formData.duration === 90 ? '#8b5cf6' : 'rgba(255,255,255,0.1)'}`, borderRadius: '12px', color: formData.duration === 90 ? '#fff' : '#94a3b8', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                    >
                      <Clock size={20} color={formData.duration === 90 ? '#a78bfa' : '#64748b'} />
                      <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>90 Minutes</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '0.9rem' }}>Date & Time</label>
                  <input 
                    type="datetime-local" 
                    required
                    value={formData.startTime}
                    onChange={e => setFormData({...formData, startTime: e.target.value})}
                    style={{ width: '100%', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 20px', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none', colorScheme: 'dark' }}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  style={{ width: '100%', padding: '16px', background: 'linear-gradient(90deg, #8b5cf6, #22d3ee)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '1.1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: '10px', transition: 'opacity 0.2s' }}
                >
                  {loading ? 'Securing Slot...' : 'Confirm Booking'}
                </button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div style={{ animation: 'fadeIn 0.5s ease-out', textAlign: 'center', padding: '20px 0' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '50%', marginBottom: '24px' }}>
                <CheckCircle size={40} color="#22d3ee" />
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '16px' }}>Booking Confirmed</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '30px', maxWidth: '400px', margin: '0 auto 30px' }}>
                Your meeting has been securely scheduled. We've sent a calendar invite and confirmation to your email.
              </p>
              
              <div style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px', marginBottom: '30px' }}>
                <p style={{ color: '#cbd5e1', marginBottom: '12px' }}>Your secure meeting link is ready:</p>
                <div style={{ display: 'flex', alignItems: 'center', background: '#030712', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 16px', overflow: 'hidden' }}>
                  <code style={{ color: '#a78bfa', fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%' }}>
                    {meetingLink}
                  </code>
                </div>
              </div>

              <button 
                onClick={() => window.location.href = meetingLink}
                style={{ padding: '16px 32px', background: '#fff', border: 'none', borderRadius: '12px', color: '#030712', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                Enter Meeting Room Now
              </button>
            </div>
          )}

        </div>
      </div>

      {/* AI Modal */}
      {showAiModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '600px', height: '600px', background: '#0f172a', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            
            {/* Modal Header */}
            <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(34, 211, 238, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={20} color="#22d3ee" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>VP Cortex LLM</h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#22d3ee' }}>● Online & Ready</p>
                </div>
              </div>
              <button onClick={() => setShowAiModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            {/* Chat Area */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {aiMessages.map((msg, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  {msg.sender === 'ai' && (
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(34, 211, 238, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Bot size={16} color="#22d3ee" />
                    </div>
                  )}
                  <div style={{ background: msg.sender === 'user' ? '#8b5cf6' : 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '16px', borderTopLeftRadius: msg.sender === 'ai' ? 0 : '16px', borderTopRightRadius: msg.sender === 'user' ? 0 : '16px', fontSize: '0.95rem', lineHeight: 1.5, color: '#fff', maxWidth: '80%' }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input 
                  type="text" 
                  placeholder="Type your question here..." 
                  value={aiInput}
                  onChange={e => setAiInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAiSend()}
                  style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 20px', borderRadius: '12px', color: '#fff', fontSize: '0.95rem', outline: 'none' }}
                />
                <button onClick={handleAiSend} style={{ padding: '0 24px', background: '#22d3ee', border: 'none', borderRadius: '12px', color: '#0f172a', fontWeight: 600, cursor: 'pointer' }}>
                  Send
                </button>
              </div>
            </div>
            
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default BookingPage;
