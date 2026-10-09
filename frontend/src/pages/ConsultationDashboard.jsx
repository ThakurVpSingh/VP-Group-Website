import React, { useEffect, useState } from 'react';
import { getApiUrl } from '../config';
import { useNavigate } from 'react-router-dom';
import { Video, Clock, CalendarX, CheckCircle, PhoneMissed, Play, Users, Mail, User } from 'lucide-react';
import ProjectNavbar from '../components/ProjectNavbar';

import Footer from '../components/Footer';

const ConsultationDashboard = ({ isEmbedded = false }) => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchConsultations();
    // Auto-refresh for admin every 30 seconds
    const interval = setInterval(fetchConsultations, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchConsultations = async () => {
    try {
      const response = await fetch(getApiUrl('/api/consultations'));
      const data = await response.json();
      if (data.success) {
        setConsultations(data.consultations);
      } else {
        setError('Failed to fetch consultations');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const isNew = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffMs = now - created;
    return diffMs < 900000; // 15 minutes
  };

  const getStatus = (startTime, durationMinutes) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(start.getTime() + durationMinutes * 60000);

    if (now < start) return 'Upcoming';
    if (now >= start && now <= end) return 'Ongoing';
    return 'Expired';
  };

  if (loading) {
    return <div style={{ height: isEmbedded ? 'auto' : '100vh', background: isEmbedded ? 'transparent' : 'var(--color-canvas)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', padding: isEmbedded ? '40px' : 0 }}>Loading Dashboard...</div>;
  }

  return (
    <div style={{ minHeight: isEmbedded ? 'auto' : '100vh', background: isEmbedded ? 'transparent' : 'var(--color-canvas)', color: 'var(--color-ink)', fontFamily: '"Plus Jakarta Sans", sans-serif', transition: 'background 0.3s ease, color 0.3s ease' }}>
      {!isEmbedded && <ProjectNavbar />}
      
      <div style={{ padding: isEmbedded ? '0 0 60px' : '120px 5% 60px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
              <Video size={24} color="#a78bfa" />
            </div>
            <div>
              <h1 style={{ fontSize: isEmbedded ? '1.5rem' : '2rem', fontWeight: 800, margin: 0, color: 'var(--color-ink)' }}>Consultation Center</h1>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', margin: '4px 0 0' }}>Manage video meetings and track consultation history.</p>
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', background: 'rgba(28, 105, 212, 0.1)', padding: '6px 14px', borderRadius: '30px', fontWeight: 700, border: '1px solid rgba(28, 105, 212, 0.2)', display: window.innerWidth < 600 ? 'none' : 'block' }}>
            ● LIVE MONITORING ACTIVE
          </div>
        </div>

        {error && <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', marginBottom: '24px' }}>{error}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginBottom: '80px' }}>
          {consultations.length === 0 ? (
            <div style={{ padding: '40px', background: 'var(--color-surface-soft)', borderRadius: '16px', border: '1px dashed var(--color-hairline)', gridColumn: '1 / -1', textAlign: 'center', color: 'var(--color-muted)' }}>
              No consultations booked yet.
            </div>
          ) : (
            consultations.map((c) => {
              const status = getStatus(c.startTime, c.duration);
              const startObj = new Date(c.startTime);
              const newlyBooked = isNew(c.createdAt);
              
              let statusColor = 'var(--color-muted)';
              let StatusIcon = Clock;
              
              if (status === 'Ongoing') {
                statusColor = '#10b981';
                StatusIcon = Play;
              } else if (status === 'Upcoming') {
                statusColor = 'var(--color-primary)';
                StatusIcon = Clock;
              } else if (status === 'Expired') {
                statusColor = '#ef4444';
                StatusIcon = CalendarX;
              }

              return (
                <div key={c._id} style={{ background: 'var(--color-surface-card)', border: newlyBooked ? '1px solid #ff4ef0' : '1px solid var(--color-hairline)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: '0.3s', boxShadow: newlyBooked ? '0 0 20px rgba(255, 78, 240, 0.2)' : '0 10px 30px rgba(0,0,0,0.06)', position: 'relative' }}>
                  
                  {newlyBooked && (
                    <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#ff4ef0', color: '#fff', fontSize: '0.6rem', fontWeight: 900, padding: '3px 6px', borderRadius: '4px', letterSpacing: '1px', animation: 'pulse 1.5s infinite' }}>NEW</div>
                  )}

                  {/* Card Header */}
                  <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--color-hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-surface-soft)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: statusColor, fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      <StatusIcon size={12} /> {status}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', fontWeight: 600 }}>{c.duration} MIN</span>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '18px', flex: 1 }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-ink)' }}>
                      <User size={16} color="var(--color-muted)" /> {c.visitorName}
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                        <Mail size={14} color="var(--color-muted)" /> {c.visitorEmail}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                        <Clock size={14} color="var(--color-muted)" /> {startObj.toLocaleString()}
                      </div>
                    </div>

                    <div style={{ marginTop: '16px', padding: '12px', background: 'var(--color-surface-soft)', borderRadius: '10px', border: '1px solid var(--color-hairline)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '1px' }}>Context</div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: '0 0 4px', color: '#8b5cf6' }}>{c.reason || 'General Inquiry'}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.4 }}>{c.overview || 'No additional details provided.'}</p>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div style={{ padding: '14px 18px', background: 'var(--color-surface-soft)', borderTop: '1px solid var(--color-hairline)' }}>
                    {status === 'Upcoming' || status === 'Ongoing' ? (
                      <button 
                        onClick={() => navigate(`/meeting/${c.meetingId}`)}
                        style={{ width: '100%', padding: '10px', background: status === 'Ongoing' ? '#10b981' : 'var(--color-primary)', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s', fontSize: '0.85rem' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <Video size={16} /> {status === 'Ongoing' ? 'Join Active' : 'Join Room'}
                      </button>
                    ) : (
                      <button 
                        onClick={() => window.location.href = `mailto:${c.visitorEmail}?subject=Regarding our missed consultation`}
                        style={{ width: '100%', padding: '10px', background: 'var(--color-canvas)', color: 'var(--color-ink)', border: '1px solid var(--color-hairline)', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s', fontSize: '0.85rem' }}
                      >
                        <Mail size={14} /> Follow Up
                      </button>
                    )}
                  </div>

                </div>
              );
            })
          )}
        </div>
      </div>
      {!isEmbedded && <Footer />}
    </div>
  );
};

export default ConsultationDashboard;
