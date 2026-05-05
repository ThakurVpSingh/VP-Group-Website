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
  const [isAdmin, setIsAdmin] = useState(false);
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
    const email = verifyEmail.toLowerCase().trim();
    if (email === 'contact.vpsdev@gmail.com') {
      setIsAdmin(true);
      setIsAuthenticated(true);
    } else if (email === meetingInfo.visitorEmail.toLowerCase()) {
      setIsAdmin(false);
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
            This is a private, encrypted consultation. Please verify your identity to join.
          </p>

          <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input 
              type="email" 
              required
              value={verifyEmail}
              onChange={e => setVerifyEmail(e.target.value)}
              placeholder="Enter your authorized email"
              style={{ width: '100%', padding: '14px', background: 'rgba(3, 7, 18, 0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none', textAlign: 'center' }}
            />
            {verifyError && <p style={{ color: '#ef4444', fontSize: '0.85rem', margin: 0 }}>{verifyError}</p>}
            <button 
              type="submit"
              style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #8b5cf6, #22d3ee)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 700, cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Enter Room
            </button>
          </form>
          <p style={{ marginTop: '20px', fontSize: '0.75rem', color: '#475569' }}>
            Powered by VP Group Zero-Trust Architecture
          </p>
        </div>
      </div>
    );
  }

  // Jitsi configuration
  const isJitsi = meetingInfo.roomUrl.includes('meet.jit.si');
  let finalRoomUrl = meetingInfo.roomUrl;
  
  if (isJitsi) {
    // Add specific moderator configs if isAdmin
    const nameParam = isAdmin ? 'VP Admin' : meetingInfo.visitorName;
    const configString = isAdmin 
      ? `&config.prejoinPageEnabled=false&config.startWithAudioMuted=false&config.startWithVideoMuted=false&config.lobby.enabled=true&config.requireDisplayName=true`
      : `&config.prejoinPageEnabled=true&config.lobby.enabled=true`;
    
    finalRoomUrl += `#userInfo.displayName="${nameParam}"${configString}&interfaceConfig.SHOW_JITSI_WATERMARK=false&interfaceConfig.SHOW_BRAND_WATERMARK=false`;
  }

  return (
    <div style={{ height: '100vh', width: '100vw', background: '#0f172a', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      
      {/* Premium Dashboard Header */}
      <div style={{ height: '64px', background: '#030712', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: isAdmin ? 'rgba(139, 92, 246, 0.15)' : 'rgba(34, 211, 238, 0.1)', padding: '6px 12px', borderRadius: '6px', color: isAdmin ? '#a78bfa' : '#22d3ee', fontSize: '0.85rem', fontWeight: 600, border: isAdmin ? '1px solid #8b5cf6' : 'none' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isAdmin ? '#a78bfa' : '#22d3ee', animation: 'pulse 2s infinite' }} />
            {isAdmin ? 'Moderator Mode Active' : 'Live Secure Session'}
          </div>
          <h1 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>VP Group Consultation</h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.85rem' }}>
            <Shield size={14} /> Encrypted Node: {meetingId.slice(0, 8)}
          </div>
          <div style={{ color: '#fff', fontSize: '0.9rem' }}>
            {isAdmin ? (
              <span>Hosting for: <strong style={{ color: '#22d3ee' }}>{meetingInfo.visitorName}</strong></span>
            ) : (
              <span>Joined as: <strong style={{ color: '#fff' }}>{meetingInfo.visitorName}</strong></span>
            )}
          </div>
          <button 
            onClick={() => {
              if(window.confirm('Are you sure you want to end this session?')) {
                navigate(isAdmin ? '/consultation/dashboard' : '/');
              }
            }}
            style={{ padding: '8px 16px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
          >
            {isAdmin ? 'End Meeting' : 'Leave Room'}
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

        {/* Admin Sidebar - Only visible to Admin */}
        {isAdmin && (
          <div style={{ width: '320px', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(20px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', padding: '24px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: '20px', letterSpacing: '1px' }}>ADMIN CONSOLE</h2>
            
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '20px' }}>
              <p style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 800, marginBottom: '8px' }}>VISITOR DETAILS</p>
              <p style={{ color: '#fff', fontWeight: 600, margin: '0 0 4px' }}>{meetingInfo.visitorName}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{meetingInfo.visitorEmail}</p>
            </div>

            <div style={{ background: 'rgba(139, 92, 246, 0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.2)', marginBottom: '20px' }}>
              <p style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 800, marginBottom: '8px' }}>SESSION CONTEXT</p>
              <p style={{ color: '#fff', fontSize: '0.9rem', lineHeight: 1.4 }}>{meetingInfo.reason || 'Standard Architecture Consultation'}</p>
            </div>

            <div style={{ marginTop: 'auto', padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <p style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>HOST STATUS: READY</p>
              <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Once you join the video, use the "Admit" button inside the screen to let the visitor in.</p>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(139, 92, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
        }
      `}</style>
    </div>
  );
};

export default MeetingRoomPage;
