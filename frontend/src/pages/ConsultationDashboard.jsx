import React, { useEffect, useState } from 'react';
import { getApiUrl } from '../config';
import { useNavigate } from 'react-router-dom';
import { Video, Clock, CalendarX, CheckCircle, PhoneMissed, Play, Users, Mail, User } from 'lucide-react';
import ProjectNavbar from '../components/ProjectNavbar';

import Footer from '../components/Footer';

const ConsultationDashboard = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchConsultations();
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

  const getStatus = (startTime, durationMinutes) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(start.getTime() + durationMinutes * 60000);

    if (now < start) return 'Upcoming';
    if (now >= start && now <= end) return 'Ongoing';
    return 'Expired';
  };

  if (loading) {
    return <div style={{ height: '100vh', background: '#030712', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22d3ee' }}>Loading Dashboard...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#fff', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      <ProjectNavbar />
      
      <div style={{ padding: '120px 5% 60px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
            <Video size={24} color="#a78bfa" />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>Consultation Center</h1>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '4px 0 0' }}>Manage video meetings and track consultation history.</p>
          </div>
        </div>

        {error && <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', marginBottom: '24px' }}>{error}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px', marginBottom: '80px' }}>
          {consultations.length === 0 ? (
            <div style={{ padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)', gridColumn: '1 / -1', textAlign: 'center', color: '#64748b' }}>
              No consultations booked yet.
            </div>
          ) : (
            consultations.map((c) => {
              const status = getStatus(c.startTime, c.duration);
              const startObj = new Date(c.startTime);
              
              let statusColor = '#64748b';
              let StatusIcon = Clock;
              
              if (status === 'Ongoing') {
                statusColor = '#10b981';
                StatusIcon = Play;
              } else if (status === 'Upcoming') {
                statusColor = '#22d3ee';
                StatusIcon = Clock;
              } else if (status === 'Expired') {
                statusColor = '#ef4444';
                StatusIcon = CalendarX;
              }

              return (
                <div key={c._id} style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: '0.3s', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                  
                  {/* Card Header */}
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: statusColor, fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      <StatusIcon size={14} /> {status}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{c.duration} MIN</span>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '20px', flex: 1 }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <User size={18} color="#94a3b8" /> {c.visitorName}
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#cbd5e1' }}>
                        <Mail size={16} color="#64748b" /> {c.visitorEmail}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#cbd5e1' }}>
                        <Clock size={16} color="#64748b" /> {startObj.toLocaleString()}
                      </div>
                    </div>

                    <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>Inquiry Context</div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 8px', color: '#a78bfa' }}>{c.reason || 'General Consultation'}</h4>
                      <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>{c.overview || 'No additional details provided.'}</p>
                    </div>

                    {status === 'Expired' && (
                      <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(239, 68, 68, 0.05)', border: '1px dashed rgba(239, 68, 68, 0.2)', borderRadius: '8px' }}>
                        <div style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 700, marginBottom: '4px' }}>SESSION EXPIRED</div>
                        <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>This session time has passed. If this was missed, please contact the visitor via email to reschedule.</p>
                      </div>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div style={{ padding: '16px 20px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    {status === 'Upcoming' || status === 'Ongoing' ? (
                      <button 
                        onClick={() => navigate(`/meeting/${c.meetingId}`)}
                        style={{ width: '100%', padding: '12px', background: status === 'Ongoing' ? '#10b981' : '#22d3ee', color: status === 'Ongoing' ? '#fff' : '#0f172a', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'transform 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <Video size={18} /> {status === 'Ongoing' ? 'Join Active Meeting' : 'Join Room Standby'}
                      </button>
                    ) : (
                      <button 
                        onClick={() => window.location.href = `mailto:${c.visitorEmail}?subject=Regarding our missed consultation`}
                        style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                      >
                        <Mail size={16} /> Follow Up via Email
                      </button>
                    )}
                  </div>

                </div>
              );
            })
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConsultationDashboard;
