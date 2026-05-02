import { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config';
import { MessageSquare, AlertCircle, CheckCircle2, Send, X, Clock, User } from 'lucide-react';

const TicketHub = () => {
  const [tickets, setTickets] = useState({ created: [], received: [] });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: '', description: '', type: 'Discrepancy', priority: 'Medium' });

  const fetchTickets = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
      const { data } = await axios.get(getApiUrl('/api/tickets'), {
        headers: { Authorization: `Bearer ${storedUser.token}` }
      });
      setTickets(data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchTickets();
    const interval = setInterval(fetchTickets, 10000); // Periodic sync
    return () => clearInterval(interval);
  }, []);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
      await axios.post(getApiUrl('/api/tickets'), newTicket, {
        headers: { Authorization: `Bearer ${storedUser.token}` }
      });
      setShowModal(false);
      setNewTicket({ title: '', description: '', type: 'Discrepancy', priority: 'Medium' });
      fetchTickets();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to raise ticket');
    }
    setLoading(false);
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
      await axios.put(getApiUrl(`/api/tickets/${id}`), { status }, {
        headers: { Authorization: `Bearer ${storedUser.token}` }
      });
      fetchTickets();
    } catch (err) {}
  };

  return (
    <div className="ticket-hub">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><MessageSquare size={20} color="var(--primary)" /> Discrepancy & Ticket Hub</h3>
        <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>Raise Ticket</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Received Tickets (As Manager) */}
        {tickets.received.length > 0 && (
          <div className="glass-panel" style={{ padding: '20px', background: 'rgba(59, 130, 246, 0.05)' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '16px', color: 'var(--primary)' }}>Awaiting Action (Subordinates)</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {tickets.received.map(t => (
                <div key={t._id} style={{ padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid var(--bg-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: '800', background: 'var(--primary)', padding: '2px 8px', borderRadius: '4px' }}>{t.priority}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.status}</span>
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '4px' }}>{t.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px' }}>From: {t.creator?.username}</div>
                  {t.status === 'Open' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleUpdateStatus(t._id, 'In Progress')} style={{ flex: 1, padding: '6px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--bg-border)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.7rem' }}>Mark In-Progress</button>
                      <button onClick={() => handleUpdateStatus(t._id, 'Resolved')} style={{ flex: 1, padding: '6px', background: 'var(--success)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.7rem' }}>Resolve</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Created Tickets (By User) */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h4 style={{ fontSize: '0.9rem', marginBottom: '16px' }}>My Active Tickets</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tickets.created.map(t => (
              <div key={t._id} style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--bg-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--primary)' }}>{t.type}</span>
                  <span style={{ fontSize: '0.75rem', color: t.status === 'Resolved' ? 'var(--success)' : 'var(--text-muted)' }}>{t.status}</span>
                </div>
                <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{t.title}</div>
              </div>
            ))}
            {tickets.created.length === 0 && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No discrepancies reported.</div>}
          </div>
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
          <div className="glass-panel" style={{ width: '400px', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.4rem' }}>Report Discrepancy</h2>
              <X style={{ cursor: 'pointer' }} onClick={() => setShowModal(false)} />
            </div>
            <form onSubmit={handleCreateTicket}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>TICKET TITLE</label>
                <input 
                  type="text" 
                  className="glass-input" 
                  value={newTicket.title} 
                  onChange={e => setNewTicket({...newTicket, title: e.target.value})} 
                  placeholder="e.g. Attendance Missing - 2026-04-10"
                  required
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>PROBLEM DESCRIPTION</label>
                <textarea 
                  className="glass-input" 
                  style={{ minHeight: '100px', resize: 'none' }}
                  value={newTicket.description} 
                  onChange={e => setNewTicket({...newTicket, description: e.target.value})} 
                  placeholder="Describe the discrepancy in detail..."
                  required
                ></textarea>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>TYPE</label>
                    <select className="glass-input" value={newTicket.type} onChange={e => setNewTicket({...newTicket, type: e.target.value})}>
                        <option value="Discrepancy">Discrepancy</option>
                        <option value="Access Request">Access Request</option>
                        <option value="Technical">Technical</option>
                    </select>
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>PRIORITY</label>
                    <select className="glass-input" value={newTicket.priority} onChange={e => setNewTicket({...newTicket, priority: e.target.value})}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>
              </div>
              <button disabled={loading} type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                {loading ? 'TRANSMITTING...' : 'INITIALIZE TICKET'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketHub;
