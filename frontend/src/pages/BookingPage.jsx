import React, { useState } from 'react';
import { Calendar, Clock, Video, Bot, ArrowRight, CheckCircle, ChevronRight, X, Search, Globe, MessageSquare, Briefcase, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../config';
import ProjectNavbar from '../components/ProjectNavbar';
import Footer from '../components/Footer';

const BookingPage = () => {
  const [step, setStep] = useState(1); // 1: choose type, 2: details, 3: success
  const [formData, setFormData] = useState({
    visitorName: '',
    visitorEmail: '',
    duration: 45,
    startTime: '',
    reason: '',
    overview: ''
  });
  const [loading, setLoading] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');
  const [showAiModal, setShowAiModal] = useState(false);
  
  // AI Chat State
  const [aiInput, setAiInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { 
      sender: 'ai', 
      text: "Greetings! I am the VP Group Intelligence Assistant (Cortex-1). I am here to provide you with comprehensive information regarding our services, technical architectures, and strategic solutions. How may I be of service to you today?" 
    }
  ]);
  
  const navigate = useNavigate();

  // Knowledge Base for AI
  const KNOWLEDGE_BASE = {
    services: "We offer high-performance enterprise ecosystems including Web Development, Software Engineering, Technical Support, IT Consultation, and Custom UI/UX design. All systems are built with Zero-Trust Security Architecture.",
    clients: "Our notable clients include Mother Bliss, institutional partners, and various global collaborators.",
    security: "We operate under absolute Zero-Trust Security Architecture protocols, ensuring total security and hierarchical gatekeeping.",
    location: "Our headquarters is located in Pratapgarh, with global operations.",
    philosophy: "Engineering infinite scale through robust, secure, and highly responsive technological solutions."
  };

  const handleAiSend = () => {
    if(!aiInput.trim()) return;
    const userMsg = aiInput.trim();
    setAiMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setAiInput('');
    setIsTyping(true);
    
    // Simulate complex processing
    setTimeout(() => {
      let reply = "";
      const lowerMsg = userMsg.toLowerCase();

      if (lowerMsg.includes('price') || lowerMsg.includes('cost')) {
        reply = "I understand you are inquiring about our investment tiers. VP Group provides bespoke technological solutions tailored to enterprise requirements. For precise cost estimates, I recommend scheduling a 45-minute live architecture review with our experts.";
      } else if (lowerMsg.includes('service') || lowerMsg.includes('offer')) {
        reply = `It would be my pleasure to outline our capabilities. ${KNOWLEDGE_BASE.services} Which of these areas aligns most closely with your current objectives?`;
      } else if (lowerMsg.includes('security') || lowerMsg.includes('safe')) {
        reply = `Security is the bedrock of our operations. ${KNOWLEDGE_BASE.security} We implement multiple layers of validation to protect all enterprise assets.`;
      } else if (lowerMsg.includes('who') || lowerMsg.includes('vp group')) {
        reply = "VP Group & Technologies is a premier engineering firm specializing in high-performance enterprise ecosystems. We focus on infinite scale and absolute security for our global partners.";
      } else {
        // Simulated Google Search / Web Search
        reply = `I have performed a broader scan of available data to assist you. While I am primarily trained on VP Group's internal protocols, it appears you are asking about ${userMsg}. To provide you with the most satisfactory and accurate assistance, I would suggest cross-referencing this with our live consultants. Is there anything else I can assist you with politely?`;
      }

      setAiMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Set mock time to tomorrow 10 AM if not selected (for demo simplicity)
    const timeToUse = formData.startTime || new Date(Date.now() + 86400000).toISOString();
    const payload = { ...formData, startTime: timeToUse };
    const apiUrl = getApiUrl('/api/consultations/book');
    console.log('Attempting booking at:', apiUrl);
    console.log('Payload:', payload);
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      console.log('Backend response:', data);

      if (data.success) {
        setMeetingLink(data.meetingLink);
        setStep(3);
      } else {
        alert(`Booking Error: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Booking network error:', error);
      alert(`Network Error: Could not connect to backend at ${apiUrl}. Please ensure the server is running.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#fff', fontFamily: '"Plus Jakarta Sans", sans-serif', position: 'relative' }}>
      <ProjectNavbar />
      
      {/* Processing Animation Overlay */}
      {loading && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(3, 7, 18, 0.9)', backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.3s ease-out' }}>
          <div className="loader-ring"></div>
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '10px', letterSpacing: '2px' }}>VEXIOGATE SECURE LINKING</h2>
            <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
              {[1, 2, 3].map(i => (
                <div key={i} className="dot-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
            <p style={{ color: '#94a3b8', marginTop: '20px', fontSize: '0.9rem', maxWidth: '300px' }}>Encrypting consultation protocols and establishing secure tunnel...</p>
          </div>
        </div>
      )}
      
      <div style={{ padding: '120px 20px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Animated Background Glows */}
        <div className="bg-blob blob-1" />
        <div className="bg-blob blob-2" />
        <div className="bg-blob blob-3" />
        <div className="bg-grid-overlay" />
        
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
                    <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '0.9rem' }}>Reason for Consultation</label>
                    <div style={{ position: 'relative' }}>
                      <Briefcase size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: '#64748b' }} />
                      <input 
                        type="text" 
                        required
                        value={formData.reason}
                        onChange={e => setFormData({...formData, reason: e.target.value})}
                        style={{ width: '100%', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 20px 14px 48px', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none' }}
                        placeholder="e.g. Enterprise Web Security Architecture"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '0.9rem' }}>Detailed Overview</label>
                    <div style={{ position: 'relative' }}>
                      <FileText size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: '#64748b' }} />
                      <textarea 
                        required
                        value={formData.overview}
                        onChange={e => setFormData({...formData, overview: e.target.value})}
                        style={{ width: '100%', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 20px 14px 48px', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none', minHeight: '120px', resize: 'vertical' }}
                        placeholder="Provide more context about your query..."
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
              <div style={{ animation: 'fadeIn 0.5s ease-out', padding: '20px 0' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '50%', marginBottom: '24px' }}>
                    <CheckCircle size={40} color="#22d3ee" />
                  </div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '16px' }}>Mission Brief Confirmed</h2>
                  <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '30px', maxWidth: '500px', margin: '0 auto 30px' }}>
                    Thank you, <span style={{ color: '#fff', fontWeight: 'bold' }}>{formData.visitorName}</span>. Your <span style={{ color: '#fff', fontWeight: 'bold' }}>{formData.duration}-minute</span> consultation has been successfully scheduled. We will connect with you exactly as per the scheduled slot.
                  </p>
                </div>
                
                <div style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '32px', marginBottom: '30px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ background: 'rgba(139, 92, 246, 0.2)', padding: '12px', borderRadius: '12px' }}>
                      <Clock size={24} color="#a78bfa" />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Scheduled Time</p>
                      <p style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 600 }}>
                        {new Date(formData.startTime).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  <p style={{ color: '#cbd5e1', marginBottom: '12px', fontWeight: 600 }}>Your Secure Meeting Link:</p>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#030712', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '16px', overflow: 'hidden', marginBottom: '24px' }}>
                    <code style={{ color: '#22d3ee', fontSize: '0.95rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%' }}>
                      {meetingLink}
                    </code>
                  </div>
                  
                  <div style={{ background: 'rgba(255, 78, 240, 0.05)', borderLeft: '4px solid #ff4ef0', padding: '16px', borderRadius: '4px' }}>
                    <p style={{ color: '#f8fafc', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
                      <strong style={{ color: '#ff4ef0' }}>Important:</strong> Please try to be on the meet link before 5 minutes to avoid any type of technical issue.
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <button 
                    onClick={() => window.location.href = meetingLink}
                    style={{ width: '100%', padding: '16px 32px', background: '#fff', border: 'none', borderRadius: '12px', color: '#030712', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', marginBottom: '24px' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(255,255,255,0.2)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    Enter Secure Meeting Room
                  </button>

                  <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    If you face any issues, feel free to reach out to us at <br/>
                    <strong style={{ color: '#fff' }}>+91 6388 398 552</strong> or write an email to <strong style={{ color: '#fff' }}>contact.vpsdev@gmail.com</strong>
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* AI Modal */}
        {showAiModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '700px', height: '700px', background: '#0f172a', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
              
              {/* Modal Header */}
              <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(34, 211, 238, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={20} color="#22d3ee" />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Cortex-1 Intelligence</h3>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#22d3ee' }}>● Knowledge Base Sync Active</p>
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
                    <div style={{ background: msg.sender === 'user' ? '#8b5cf6' : 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '16px', borderTopLeftRadius: msg.sender === 'ai' ? 0 : '16px', borderTopRightRadius: msg.sender === 'user' ? 0 : '16px', fontSize: '0.95rem', lineHeight: 1.5, color: '#fff', maxWidth: '80%', boxShadow: msg.sender === 'ai' ? 'none' : '0 4px 12px rgba(139, 92, 246, 0.2)' }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(34, 211, 238, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Bot size={16} color="#22d3ee" />
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '16px', borderTopLeftRadius: 0, color: '#94a3b8', fontSize: '0.85rem' }}>
                      Cortex is processing query...
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: '#64748b' }} />
                    <input 
                      type="text" 
                      placeholder="Ask Cortex about services, security, or global ops..." 
                      value={aiInput}
                      onChange={e => setAiInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAiSend()}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 20px 14px 48px', borderRadius: '12px', color: '#fff', fontSize: '0.95rem', outline: 'none' }}
                    />
                  </div>
                  <button onClick={handleAiSend} style={{ padding: '0 24px', background: '#22d3ee', border: 'none', borderRadius: '12px', color: '#0f172a', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Send <Globe size={16} />
                  </button>
                </div>
                <p style={{ fontSize: '0.7rem', color: '#4b5563', marginTop: '12px', textAlign: 'center' }}>
                  Cortex uses proprietary knowledge and simulated search indices to provide accurate information.
                </p>
              </div>
              
            </div>
          </div>
        )}
      </div>

      <Footer />

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        
        /* Loader Styles */
        .loader-ring {
          width: 80px;
          height: 80px;
          border: 4px solid rgba(139, 92, 246, 0.1);
          border-top: 4px solid #8b5cf6;
          border-right: 4px solid #22d3ee;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .dot-pulse {
          width: 8px;
          height: 8px;
          background: #22d3ee;
          border-radius: 50%;
          animation: pulse 1.5s infinite ease-in-out;
        }

        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { transform: scale(0.5); opacity: 0.3; } 50% { transform: scale(1.2); opacity: 1; } }

        /* New Animated Background */
        @keyframes blobBounce {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .bg-blob {
          position: absolute;
          filter: blur(80px);
          z-index: 0;
          opacity: 0.6;
          animation: blobBounce 15s infinite alternate ease-in-out;
          border-radius: 50%;
        }
        
        .blob-1 {
          top: -10%; left: -10%; width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%);
          animation-delay: 0s;
        }
        
        .blob-2 {
          bottom: -10%; right: -10%; width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, transparent 70%);
          animation-delay: -5s;
        }
        
        .blob-3 {
          top: 40%; left: 40%; width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255, 78, 240, 0.15) 0%, transparent 70%);
          animation-delay: -10s;
        }

        .bg-grid-overlay {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 50px 50px;
          z-index: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default BookingPage;
