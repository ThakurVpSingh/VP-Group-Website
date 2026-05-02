import { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config';
import { Calendar, Clock, Plane, FileText, CheckCircle, LogOut, Filter, ChevronRight } from 'lucide-react';
import AttendanceCalendar from '../components/AttendanceCalendar';
import TicketHub from '../components/TicketHub';

const EmployeePortal = () => {
  const [stats, setStats] = useState({ availableLeaves: 0, appliedLeaves: 0, attendanceRecord: [], allLeaves: [] });
  const [loading, setLoading] = useState(true);
  
  // Default to last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const [startDate, setStartDate] = useState(thirtyDaysAgo.toISOString().substring(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().substring(0, 10));

  const fetchStats = async () => {
    setLoading(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
      const { data } = await axios.get(getApiUrl(`/api/hr/stats?startDate=${startDate}&endDate=${endDate}`), {
        headers: { Authorization: `Bearer ${storedUser.token}` }
      });
      setStats(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleClockIn = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
      await axios.post(getApiUrl('/api/hr/attendance/clock-in'), {}, {
        headers: { Authorization: `Bearer ${storedUser.token}` }
      });
      alert('Clocked In successfully!');
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to clock in');
    }
  };

  const handleClockOut = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
      await axios.put(getApiUrl('/api/hr/attendance/clock-out'), {}, {
        headers: { Authorization: `Bearer ${storedUser.token}` }
      });
      alert('Clocked Out successfully!');
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to clock out');
    }
  };

  const handleApplyLeave = async () => {
    const startDate = prompt('Enter leave start date (YYYY-MM-DD):');
    const endDate = prompt('Enter leave end date (YYYY-MM-DD):');
    const reason = prompt('Enter reason for leave:');

    if (!startDate || !endDate || !reason) return;

    try {
      const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
      await axios.post(getApiUrl('/api/hr/leave'), { startDate, endDate, reason }, {
        headers: { Authorization: `Bearer ${storedUser.token}` }
      });
      alert('Leave applied successfully!');
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to apply leave');
    }
  };

  if (loading) return <div className="animate-pulse" style={{ padding: '40px', fontSize: '1.2rem', color: 'var(--primary)' }}>Synchronizing Secure Employee Terminal...</div>;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '40px', padding: '40px', background: 'radial-gradient(ellipse at top left, rgba(16, 185, 129, 0.15), transparent 60%)', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="hero-card">
        <div style={{ maxWidth: '600px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px' }} className="text-gradient-success">Employee / Student Terminal</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
            <strong style={{color: 'var(--text-main)'}}>VEXIOGATE OBJECTIVE:</strong> Empowering individual nodes. This secure terminal is designed to offer a seamless, Zero-Trust Security Mechanism for submitting attendance, provisioning local resources, and transparently tracking your operational metrics across the ecosystem.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button onClick={handleClockIn} className="btn" style={{ background: 'var(--success)', color: 'white', padding: '12px 24px', fontSize: '1rem', minWidth: '220px' }}><CheckCircle size={20} /> Operational Clock In</button>
          <button onClick={handleClockOut} className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #f87171', color: '#f87171', padding: '12px 24px', fontSize: '1rem', minWidth: '220px' }}><LogOut size={20} /> Secure Clock Out</button>
          <button onClick={handleApplyLeave} className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)', border: '1px solid var(--bg-border)', padding: '12px 24px', fontSize: '1rem', minWidth: '220px' }}><Plane size={20} /> Request Leave</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div className="glass-panel hero-card animate-fade-in-delay-1" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ color: 'var(--primary)', background: 'rgba(69, 97, 236, 0.1)', padding: '12px', borderRadius: '12px' }}><Plane size={28} /></div>
          </div>
          <div style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1 }}>{stats.availableLeaves}</div>
          <div style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Available Leaves</div>
        </div>

        <div className="glass-panel hero-card animate-fade-in-delay-2" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '12px' }}><FileText size={28} /></div>
          </div>
          <div style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1 }}>{stats.appliedLeaves}</div>
          <div style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Applied Leaves</div>
        </div>

        <div className="glass-panel hero-card animate-fade-in-delay-3" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.1)', padding: '12px', borderRadius: '12px' }}><CheckCircle size={28} /></div>
          </div>
          <div style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1 }}>{stats.attendanceRecord.length}</div>
          <div style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Days Verified (Month)</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 1024 ? '1fr' : '1.5fr 1fr', gap: '24px', marginBottom: '40px' }}>
        <div className="glass-panel slide-in-right" style={{ padding: '32px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.4rem' }}>
                <Calendar size={24} color="var(--primary)" /> Presence History
            </h3>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="glass-input" style={{ width: '130px', padding: '8px 12px', fontSize: '0.8rem' }} />
                <ChevronRight size={14} color="var(--text-muted)" />
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="glass-input" style={{ width: '130px', padding: '8px 12px', fontSize: '0.8rem' }} />
                <button onClick={fetchStats} className="btn" style={{ background: 'var(--primary)', padding: '6px 12px' }}><Filter size={16} /> Filter</button>
            </div>
          </div>
          
          <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Clock In</th>
                        <th>Clock Out</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.attendanceRecord.map((record, i) => (
                        <tr key={i}>
                            <td style={{ fontWeight: '700' }}>{record.date}</td>
                            <td>{record.checkIn || '--:--'}</td>
                            <td>{record.checkOut || '--:--'}</td>
                            <td><span className={`badge badge-Employee`}>{record.status}</span></td>
                        </tr>
                    ))}
                    {stats.attendanceRecord.length === 0 && (
                        <tr><td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No records localized for this temporal range.</td></tr>
                    )}
                </tbody>
            </table>
          </div>
        </div>

        <div className="glass-panel slide-in-right" style={{ padding: '32px' }}>
          <h3 style={{ marginBottom: '24px', fontSize: '1.4rem' }}>Leave Timeline (1 Year)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {stats.allLeaves && stats.allLeaves.map((l, i) => (
                <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--bg-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '0.8rem' }}>{l.startDate} - {l.endDate}</span>
                        <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: l.status === 'Approved' ? 'var(--success-bg)' : 'rgba(255,255,255,0.05)', color: l.status === 'Approved' ? 'var(--success)' : 'var(--text-muted)' }}>{l.status}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{l.reason}</p>
                </div>
            ))}
            {(!stats.allLeaves || stats.allLeaves.length === 0) && <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>No leaves logged.</div>}
          </div>
        </div>
      </div>

      <TicketHub />
    </div>
  );
};

export default EmployeePortal;
