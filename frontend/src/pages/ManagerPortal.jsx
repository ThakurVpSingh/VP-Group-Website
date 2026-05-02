import { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config';
import { Users, Calendar, Clock, BarChart2, ShieldCheck, UserCheck, Settings, X, Edit2, LogOut } from 'lucide-react';
import TicketHub from '../components/TicketHub';

const ManagerPortal = () => {
  const [stats, setStats] = useState({ availableLeaves: 0, appliedLeaves: 0 });
  const [teamData, setTeamData] = useState({ teamMembers: [], todayAttendance: [] });
  const [loading, setLoading] = useState(true);
  const [editingSub, setEditingSub] = useState(null);
  const [subFormData, setSubFormData] = useState({ username: '', email: '', status: 'Active' });

  const fetchData = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
      const [statRes, teamRes] = await Promise.all([
        axios.get(getApiUrl('/api/hr/stats'), { headers: { Authorization: `Bearer ${storedUser.token}` } }),
        axios.get(getApiUrl('/api/hr/team'), { headers: { Authorization: `Bearer ${storedUser.token}` } })
      ]);
      setStats(statRes.data);
      setTeamData(teamRes.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateSubordinate = async (e) => {
    e.preventDefault();
    try {
        const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
        await axios.put(getApiUrl(`/api/hr/subordinate/${editingSub._id}`), subFormData, {
            headers: { Authorization: `Bearer ${storedUser.token}` }
        });
        setEditingSub(null);
        fetchData();
        alert('Subordinate record synchronized successfully.');
    } catch (err) {
        alert(err.response?.data?.message || 'Synchronization failed');
    }
  };

  if (loading) return <div className="animate-pulse" style={{ padding: '40px', fontSize: '1.2rem', color: '#8b5cf6' }}>Loading Management Vectors...</div>;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '40px', padding: '40px', background: 'radial-gradient(ellipse at top left, rgba(139, 92, 246, 0.15), transparent 60%)', borderRadius: '24px', border: '1px solid rgba(139, 92, 246, 0.2)' }} className="hero-card">
        <div style={{ maxWidth: '700px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px' }} className="text-gradient">Managerial Command Center</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
            <strong style={{color: '#8b5cf6'}}>VEXIOGATE OBJECTIVE:</strong> Orchestrating functional units. Your terminal is equipped to monitor workforce capacities, evaluate compliance deviations, and exercise approval authority over sub-node operational requests. Maintain the mesh integerity for your sector.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div className="glass-panel hero-card animate-fade-in-delay-1" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ color: 'var(--primary)', background: 'rgba(69, 97, 236, 0.1)', padding: '12px', borderRadius: '12px' }}><Users size={28} /></div>
          </div>
          <div style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1 }}>{teamData.teamMembers.length}</div>
          <div style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Active Under Command</div>
        </div>

        <div className="glass-panel hero-card animate-fade-in-delay-2" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '12px' }}><ShieldCheck size={28} /></div>
          </div>
          <div style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1 }}>{teamData.todayAttendance.length}</div>
          <div style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Nodes Online Today</div>
        </div>

        <div className="glass-panel hero-card animate-fade-in-delay-3" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.1)', padding: '12px', borderRadius: '12px' }}><Calendar size={28} /></div>
          </div>
          <div style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1 }}>{stats.appliedLeaves}</div>
          <div style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>My Personal Leaves</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr minmax(380px, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <div className="glass-panel slide-in-right" style={{ padding: '32px' }}>
          <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.4rem' }}>
            <UserCheck size={24} color="#8b5cf6" /> Live Sub-node Telemetry
          </h3>
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Operative Profile</th>
                  <th>Current State</th>
                  <th>Sync Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {teamData.teamMembers.map((member, i) => {
                  const attendance = teamData.todayAttendance.find(a => a.user._id === member._id);
                  return (
                    <tr key={member._id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                      <td style={{ fontWeight: '600' }}>{member.username}</td>
                      <td>
                        <span className={`badge badge-${attendance ? 'Employee' : 'Admin'}`}>
                          {attendance ? 'ONLINE' : 'LINK DOWN'}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)' }}>{attendance ? attendance.checkIn : 'No signal'}</td>
                      <td>
                          <button 
                            onClick={() => { setEditingSub(member); setSubFormData({ username: member.username, email: member.email, status: member.status }); }} 
                            style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}
                          >
                            <Edit2 size={16} />
                          </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-panel slide-in-right" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.4rem' }}>
              <BarChart2 size={24} color="var(--primary)" /> Operational Capacity
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Workforce Bandwidth</span>
              <span style={{ fontWeight: '700' }}>{Math.round((teamData.todayAttendance.length / (teamData.teamMembers.length || 1)) * 100)}%</span>
            </div>
            <div style={{ height: 8, background: 'var(--bg-dark)', borderRadius: 10, overflow: 'hidden' }}>
              <div className="animate-glow" style={{ 
                height: '100%', 
                width: `${(teamData.todayAttendance.length / (teamData.teamMembers.length || 1)) * 100}%`, 
                background: 'linear-gradient(90deg, #8b5cf6, var(--primary))',
                borderRadius: 10
              }}></div>
            </div>
          </div>
          
          <div style={{ padding: '24px', background: 'rgba(0,0,0,0.4)', borderRadius: '16px', border: '1px solid var(--bg-border)', textAlign: 'center' }}>
            <ShieldCheck size={36} color="var(--success)" style={{ margin: '0 auto 16px' }} className="animate-float" />
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Sector telemetry is securely stabilized. Automatic provisioning enabled.</p>
          </div>

          {teamData.pendingLeaves && teamData.pendingLeaves.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              <h4 style={{ marginBottom: '16px', fontSize: '1.1rem', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={18} color="#f59e0b" /> Pending Override Requests
              </h4>
              {teamData.pendingLeaves.map(leave => (
                <div key={leave._id} className="hero-card" style={{ padding: '16px', borderRadius: '12px', marginBottom: '12px', fontSize: '0.9rem' }}>
                  <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '1rem', color: 'var(--primary)' }}>{leave.user.username}</div>
                  <div style={{ color: 'var(--text-muted)', marginBottom: '16px', borderLeft: '2px solid var(--bg-border)', paddingLeft: '12px' }}>
                    <div style={{ marginBottom: '4px' }}><strong>Interval:</strong> {leave.startDate} to {leave.endDate}</div>
                    <div><strong>Justification:</strong> {leave.reason}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button 
                      onClick={async () => {
                        try {
                          const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
                          await axios.put(getApiUrl(`/api/hr/leave/${leave._id}`), { status: 'Approved' }, {
                            headers: { Authorization: `Bearer ${storedUser.token}` }
                          });
                          window.location.reload();
                        } catch (e) { alert('Action failed'); }
                      }}
                      className="btn"
                      style={{ flex: 1, padding: '8px', background: 'var(--success-bg)', color: 'var(--success)' }}
                    >Grant Access</button>
                    <button 
                      onClick={async () => {
                        try {
                          const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
                          await axios.put(getApiUrl(`/api/hr/leave/${leave._id}`), { status: 'Rejected' }, {
                            headers: { Authorization: `Bearer ${storedUser.token}` }
                          });
                          window.location.reload();
                        } catch (e) { alert('Action failed'); }
                      }}
                      className="btn"
                      style={{ flex: 1, padding: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5' }}
                    >Deny Route</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <TicketHub />
      </div>

      {editingSub && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
            <div className="glass-panel" style={{ width: '450px', padding: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Modify Segment Node</h2>
                    <X style={{ cursor: 'pointer' }} onClick={() => setEditingSub(null)} />
                </div>
                <form onSubmit={handleUpdateSubordinate}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '1px' }}>SYNC IDENTIFIER</label>
                        <input type="text" className="glass-input" value={subFormData.username} onChange={e => setSubFormData({...subFormData, username: e.target.value})} required />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '1px' }}>CORE EMAIL</label>
                        <input type="email" className="glass-input" value={subFormData.email} onChange={e => setSubFormData({...subFormData, email: e.target.value})} required />
                    </div>
                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '1px' }}>OPERATIONAL STATUS</label>
                        <select className="glass-input" value={subFormData.status} onChange={e => setSubFormData({...subFormData, status: e.target.value})}>
                            <option value="Active">Active / Online</option>
                            <option value="Suspended">Suspended / Offline</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>Synchronize Changes</button>
                    <p style={{ marginTop: '20px', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                         <strong>Security Protocol:</strong> Subordinate passwords cannot be modified from this terminal for Zero-Trust Security Integrity.
                    </p>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default ManagerPortal;
