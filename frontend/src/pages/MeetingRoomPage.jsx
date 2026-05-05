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
  const [securityCode, setSecurityCode] = useState('');
  const [verifyError, setVerifyError] = useState('');
  
  // Lobby State
  const [lobbyRequest, setLobbyRequest] = useState(null);
  const [denied, setDenied] = useState(false);
  const [jitsiApi, setJitsiApi] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
      if (jitsiApi) jitsiApi.dispose();
    };
  }, [jitsiApi]);

  const initJitsi = () => {
    if (!window.JitsiMeetExternalAPI || !meetingInfo) return;

    const domain = 'meet.jit.si';
    const roomName = meetingInfo.roomUrl.split('/').pop().split('#')[0];
    
    const options = {
      roomName: roomName,
      width: '100%',
      height: '100%',
      parentNode: document.getElementById('jitsi-container'),
      userInfo: {
        displayName: isAdmin ? 'VP Admin' : meetingInfo.visitorName,
        email: verifyEmail
      },
      configOverwrite: {
        prejoinPageEnabled: !isAdmin,
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        lobby: { enabled: true },
        disableDeepLinking: true,
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_BRAND_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
      }
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);
    
    if (isAdmin) {
      api.addEventListener('lobbyParticipantJoined', (participant) => {
        setLobbyRequest(participant);
      });
    }

    setJitsiApi(api);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(initJitsi, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

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
      if (securityCode === '12886391') {
        setIsAdmin(true);
        setIsAuthenticated(true);
      } else {
        setVerifyError('Invalid Security Code. Access Denied.');
      }
    } else if (email === meetingInfo.visitorEmail.toLowerCase()) {
      setIsAdmin(false);
      setIsAuthenticated(true);
    } else {
      setVerifyError('Unauthorized email address.');
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
            <div style={{ textAlign: 'left' }}>
              <label style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, marginLeft: '4px' }}>REGISTERED EMAIL</label>
              <input 
                type="email" 
                required
                value={verifyEmail}
                onChange={e => setVerifyEmail(e.target.value)}
                placeholder="email@example.com"
                style={{ width: '100%', padding: '14px', background: 'rgba(3, 7, 18, 0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', marginTop: '4px', outline: 'none', textAlign: 'center' }}
              />
            </div>

            {verifyEmail.toLowerCase().trim() === 'contact.vpsdev@gmail.com' && (
              <div style={{ textAlign: 'left', animation: 'fadeIn 0.3s ease' }}>
                <label style={{ fontSize: '0.75rem', color: '#ff4ef0', fontWeight: 700, marginLeft: '4px' }}>ADMIN ACCESS CODE</label>
                <input 
                  type="password" 
                  required
                  value={securityCode}
                  onChange={e => setSecurityCode(e.target.value)}
                  placeholder="Enter Code"
                  style={{ width: '100%', padding: '14px', background: 'rgba(255, 78, 240, 0.05)', border: '1px solid rgba(255, 78, 240, 0.2)', borderRadius: '12px', color: '#fff', marginTop: '4px', outline: 'none', textAlign: 'center' }}
                />
              </div>
            )}

            {verifyError && <p style={{ color: '#ef4444', fontSize: '0.85rem', margin: 0 }}>{verifyError}</p>}
            <button 
              type="submit"
              style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #8b5cf6, #22d3ee)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 700, cursor: 'pointer', transition: 'transform 0.2s', marginTop: '10px' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Authorize Access
            </button>
          </form>
          <p style={{ marginTop: '20px', fontSize: '0.75rem', color: '#475569' }}>
            Powered by VP Group Zero-Trust Architecture
          </p>
        </div>
      </div>
    );
  }

  const handleLobby = (action) => {
    if (!jitsiApi || !lobbyRequest) return;
    
    if (action === 'accept') {
      jitsiApi.executeCommand('lobby', { participantId: lobbyRequest.id, action: 'approve' });
    } else {
      jitsiApi.executeCommand('lobby', { participantId: lobbyRequest.id, action: 'deny' });
    }
    setLobbyRequest(null);
  };

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
      
      {/* Lobby Pop-up for Admin */}
      {isAdmin && lobbyRequest && (
        <div style={{ position: 'fixed', top: '24px', right: '24px', width: '350px', background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(20px)', border: '1px solid #8b5cf6', borderRadius: '16px', padding: '24px', zIndex: 10000, boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)', animation: 'scaleUp 0.3s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={20} color="#a78bfa" />
            </div>
            <div>
              <p style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 800, margin: 0 }}>NEW JOINING REQUEST</p>
              <p style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', margin: 0 }}>{lobbyRequest.name}</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button onClick={() => handleLobby('deny')} style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Deny Access</button>
            <button onClick={() => handleLobby('accept')} style={{ padding: '12px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Accept Join</button>
          </div>
        </div>
      )}

      {/* Denied Message for Visitor */}
      {!isAdmin && denied && (
        <div style={{ position: 'fixed', inset: 0, background: '#030712', zIndex: 10000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ maxWidth: '500px', textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ width: '80px', height: '80px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <VideoOff size={40} color="#ef4444" />
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>Access Restricted</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '32px' }}>
              If you need assistance please contact <strong style={{ color: '#fff' }}>+91 6388 398 552</strong> or write an email to <strong style={{ color: '#fff' }}>contact.vpsdev@gmail.com</strong>. We'll get back to you within 4 hours or sooner.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button onClick={() => navigate('/')} style={{ padding: '14px 28px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>Leave Portal</button>
              <button onClick={() => window.location.reload()} style={{ padding: '14px 28px', background: '#22d3ee', color: '#0f172a', border: 'none', borderRadius: '12px', fontWeight: 800, cursor: 'pointer' }}>Try Joining Again</button>
            </div>
          </div>
        </div>
      )}

      {/* Premium Dashboard Header */}
      <div style={{ height: '64px', background: '#030712', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: isAdmin ? 'rgba(139, 92, 246, 0.15)' : 'rgba(34, 211, 238, 0.1)', padding: '6px 12px', borderRadius: '6px', color: isAdmin ? '#a78bfa' : '#22d3ee', fontSize: '0.85rem', fontWeight: 600, border: isAdmin ? '1px solid #8b5cf6' : 'none' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isAdmin ? '#a78bfa' : '#22d3ee', animation: 'pulse 2s infinite' }} />
            {isAdmin ? 'Moderator Control Active' : 'Live Secure Session'}
          </div>
          <h1 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>VP Group Consultation</h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.85rem' }}>
            <Shield size={14} /> Encrypted Node: {meetingId.slice(0, 8)}
          </div>
          <button 
            onClick={() => {
              if(window.confirm('Are you sure you want to end this session?')) {
                navigate(isAdmin ? '/consultation/dashboard' : '/');
              }
            }}
            style={{ padding: '8px 16px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}
          >
            {isAdmin ? 'End Meeting' : 'Leave Room'}
          </button>
        </div>
      </div>

      {/* Video Environment */}
      <div style={{ flex: 1, position: 'relative', display: 'flex' }}>
        <div id="jitsi-container" style={{ flex: 1, background: '#000' }}></div>
        
        {isAdmin && (
          <div style={{ width: '320px', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(20px)', borderLeft: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', padding: '24px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: '20px', letterSpacing: '1px' }}>ADMIN CONSOLE</h2>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '20px' }}>
              <p style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 800, marginBottom: '8px' }}>VISITOR DETAILS</p>
              <p style={{ color: '#fff', fontWeight: 600, margin: '0 0 4px' }}>{meetingInfo.visitorName}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{meetingInfo.visitorEmail}</p>
            </div>
            <div style={{ background: 'rgba(139, 92, 246, 0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
              <p style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 800, marginBottom: '8px' }}>SESSION CONTEXT</p>
              <p style={{ color: '#fff', fontSize: '0.9rem', lineHeight: 1.4 }}>{meetingInfo.reason || 'Standard Architecture Consultation'}</p>
            </div>
            <div style={{ marginTop: 'auto', padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <p style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>MODERATOR STATUS: ACTIVE</p>
              <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Use the floating prompts to manage guest entry.</p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); } 70% { box-shadow: 0 0 0 6px rgba(139, 92, 246, 0); } 100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default MeetingRoomPage;
