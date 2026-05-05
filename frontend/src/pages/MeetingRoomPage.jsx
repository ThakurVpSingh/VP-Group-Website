import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, Shield, ArrowLeft, VideoOff } from 'lucide-react';
import { getApiUrl } from '../config';

const MeetingRoomPage = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const [meetingInfo, setMeetingInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const response = await fetch(getApiUrl(`/api/consultations/${meetingId}`));
        const data = await response.json();
        if (data.success) {
          setMeetingInfo(data.consultation);
        } else {
          setError(data.error || 'Meeting not found');
        }
      } catch (err) {
        console.error(err);
        setError('Network error. Failed to load meeting.');
      } finally {
        setLoading(false);
      }
    };
    fetchMeeting();
  }, [meetingId]);

  // Security State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState('');
  const [verifyError, setVerifyError] = useState('');

  if (loading) {
    return (
      <div style={{ height: '100vh', background: '#030712', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <Loader2 size={48} color="#8b5cf6" style={{ animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '20px', color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.875rem' }}>Initializing Secure Room...</p>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !meetingInfo) {
    return (
      <div style={{ height: '100vh', background: '#030712', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', padding: '20px', textAlign: 'center' }}>
        <VideoOff size={64} color="#ef4444" style={{ marginBottom: '20px' }} />
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Connection Failed</h2>
        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>{error || 'Unable to access the meeting room.'}</p>
        <button 
          onClick={() => navigate('/')}
          style={{ padding: '12px 24px', background: '#334155', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={16} /> Return to Home
        </button>
      </div>
    );
  }

  const handleVerify = (e) => {
    e.preventDefault();
    if (verifyEmail.toLowerCase().trim() === meetingInfo.visitorEmail.toLowerCase() || verifyEmail.toLowerCase().trim() === 'contact.vpsdev@gmail.com') {
      setIsAuthenticated(true);
    } else {
      setVerifyError('Unauthorized email address. Please use the email you registered with.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ height: '100vh', background: '#030712', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)', padding: '40px', borderRadius: '24px', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
          <div style={{ width: '60px', height: '60px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
            <Shield size={30} color="#a78bfa" />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '10px' }}>Security Gate</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '24px', lineHeight: 1.5 }}>
            This is a private, encrypted consultation. Please verify your identity by entering the email used to book this session.
          </p>

          <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input 
              type="email" 
              required
              value={verifyEmail}
              onChange={e => setVerifyEmail(e.target.value)}
              placeholder="Enter your email address"
              style={{ width: '100%', padding: '14px', background: 'rgba(3, 7, 18, 0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none', textAlign: 'center' }}
            />
            {verifyError && <p style={{ color: '#ef4444', fontSize: '0.85rem', margin: 0 }}>{verifyError}</p>}
            <button 
              type="submit"
              style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #8b5cf6, #22d3ee)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 700, cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Verify Identity
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Pre-configured Jitsi Meet parameters for better embedded UI
  const isJitsi = meetingInfo.roomUrl.includes('meet.jit.si');
  let finalRoomUrl = meetingInfo.roomUrl;
  
  if (isJitsi) {
    // Hide extra Jitsi elements to make it look like a white-label custom solution
    finalRoomUrl += `#config.prejoinPageEnabled=false&config.disableDeepLinking=true&interfaceConfig.SHOW_JITSI_WATERMARK=false&interfaceConfig.SHOW_BRAND_WATERMARK=false&interfaceConfig.SHOW_WATERMARK_FOR_GUESTS=false`;
  }

  return (
    <div style={{ height: '100vh', width: '100vw', background: '#0f172a', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      
      {/* Premium Dashboard Header */}
      <div style={{ height: '64px', background: '#030712', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(34, 211, 238, 0.1)', padding: '6px 12px', borderRadius: '6px', color: '#22d3ee', fontSize: '0.85rem', fontWeight: 600 }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22d3ee', animation: 'pulse 2s infinite' }} />
            Live Session
          </div>
          <h1 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>VP Group Consultation</h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.85rem' }}>
            <Shield size={14} /> End-to-End Encrypted
          </div>
          <div style={{ color: '#fff', fontSize: '0.9rem' }}>
            Visitor: <span style={{ fontWeight: 600 }}>{meetingInfo.visitorName}</span>
          </div>
          <button 
            onClick={() => {
              if(window.confirm('Are you sure you want to leave the meeting?')) {
                navigate('/');
              }
            }}
            style={{ padding: '8px 16px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
          >
            Leave Room
          </button>
        </div>
      </div>

      {/* Video Environment Container */}
      <div style={{ flex: 1, position: 'relative', padding: '20px', display: 'flex', gap: '20px' }}>
        
        {/* Main Video Area */}
        <div style={{ flex: 1, background: '#000', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
          <iframe
            src={finalRoomUrl}
            allow="camera; microphone; fullscreen; display-capture; autoplay"
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="VP Group Secure Meeting"
          />
        </div>

      </div>

      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(34, 211, 238, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0); }
        }
      `}</style>
    </div>
  );
};

export default MeetingRoomPage;
