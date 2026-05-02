import { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config';
import { History, Search, FileText, AlertCircle } from 'lucide-react';

const AuditTrail = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
        if (!storedUser || !storedUser.token) {
          setLoading(false);
          return;
        }
        const { data } = await axios.get(getApiUrl('/api/audit'), {
          headers: { Authorization: `Bearer ${storedUser.token}` }
        });
        setLogs(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const getActionColor = (action) => {
    if (action.includes('DELETED')) return 'var(--danger)';
    if (action.includes('CREATED')) return 'var(--success)';
    if (action.includes('LOGIN')) return 'var(--primary)';
    return 'var(--text-main)';
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700' }}>Security Audit Trail</h1>
        <p style={{ color: 'var(--text-muted)' }}>Real-time monitoring of all identity lifecycle events</p>
      </div>

      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action</th>
              <th>Performed By</th>
              <th>Target</th>
              <th>Payload Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log._id}>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {new Date(log.createdAt).toLocaleString()}
                </td>
                <td>
                  <span style={{ 
                    fontWeight: '600', 
                    fontSize: '0.8rem', 
                    color: getActionColor(log.action),
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <History size={14} /> {log.action}
                  </span>
                </td>
                <td>
                  <div style={{ fontSize: '0.9rem' }}>{log.performedBy?.username || 'SYSTEM'}</div>
                </td>
                <td>
                  <div style={{ fontSize: '0.9rem' }}>{log.targetUser?.username || '-'}</div>
                </td>
                <td>
                  <code style={{ 
                    fontSize: '0.75rem', 
                    background: 'rgba(255,255,255,0.05)', 
                    padding: '4px 8px', 
                    borderRadius: '4px' 
                  }}>
                    {JSON.stringify(log.details)}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditTrail;
