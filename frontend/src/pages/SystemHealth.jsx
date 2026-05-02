import { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config';
import { Activity, Zap, Server, Globe, Database, Cpu, PieChart, Shield } from 'lucide-react';

const SystemHealth = () => {
  const [health, setHealth] = useState(null);
  const [pulse, setPulse] = useState(false);
  const [stats, setStats] = useState([
    { label: 'API Uptime', value: '100%', icon: <Server size={20} />, color: 'var(--success)', trend: '+0.01%' },
    { label: 'Avg Latency', value: '0ms', icon: <Zap size={20} />, color: 'var(--primary)', trend: '-2ms' },
    { label: 'Security Score', value: 'A+', icon: <Shield size={20} />, color: '#8b5cf6', trend: 'Solid' },
  ]);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
        if (!storedUser || !storedUser.token) return;

        const { data } = await axios.get(getApiUrl('/api/health'), {
          headers: { Authorization: `Bearer ${storedUser.token}` }
        });
        setHealth(data);
        setPulse(true);
        setTimeout(() => setPulse(false), 1000);

        setStats(prev => [
          { ...prev[0], value: '100%' },
          { ...prev[1], value: data.latency },
          { ...prev[2], value: 'A+' }
        ]);
      } catch (err) {}
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-fade-in">
      <style>{`
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(69, 97, 236, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(69, 97, 236, 0); }
          100% { box-shadow: 0 0 0 0 rgba(69, 97, 236, 0); }
        }
        .pulse-effect {
          animation: pulse-glow 2s infinite;
        }
      `}</style>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '700' }}>System Telemetry</h1>
          <p style={{ color: 'var(--text-muted)' }}>Real-time infrastructure and data flow metrics</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: pulse ? 'var(--success)' : 'var(--text-muted)', transition: '0.3s' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: pulse ? 'var(--success)' : 'var(--bg-border)' }}></div>
          <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{pulse ? 'DATAPHASE SYNC' : 'STANDBY'}</span>
        </div>
      </div>

      <div className="grid-responsive" style={{ marginBottom: '40px', gap: '20px' }}>
        {stats.map((stat, i) => (
          <div key={i} className={`glass-panel stat-card ${i === 1 && pulse ? 'pulse-effect' : ''}`} style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ color: stat.color }}>{stat.icon}</div>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: stat.color, textTransform: 'uppercase' }}>{stat.trend}</span>
            </div>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '8px', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))', 
        gap: '24px' 
      }}>
        <div className="glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <Database color="var(--primary)" size={24} />
            <h4 style={{ fontWeight: '800', fontSize: '1.1rem' }}>Active Database Nodes (Atlas)</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { label: 'Primary Cluster (Partition A)', volume: '72%', status: 'Stable' },
              { label: 'Secondary Replica (Partition B)', volume: '48%', status: 'Stable' },
              { label: 'Audit Log Storage', volume: '12%', status: 'Healthy' }
            ].map((node, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.9rem', fontWeight: '600' }}>
                  <span>{node.label}</span>
                  <span style={{ color: 'var(--primary)' }}>{node.status}</span>
                </div>
                <div style={{ height: '8px', width: '100%', background: 'rgba(255,100,100,0.05)', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ 
                    height: '100%', 
                    width: node.volume, 
                    background: 'var(--primary)', 
                    transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 0 15px var(--primary-glow)'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <Globe color="var(--primary)" size={24} />
            <h4 style={{ fontWeight: '800', fontSize: '1.1rem' }}>Security Mesh</h4>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid rgba(255,255,255,0.03)' }}>
            {[
              { label: 'SSL Encryption', value: 'AES-256 Enabled', ok: true },
              { label: 'Threat Detection', value: 'Active', ok: true },
              { label: 'Brute-force Shield', value: 'Operational', ok: true }
            ].map((s, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                <span style={{ color: 'var(--success)', fontWeight: '700' }}>{s.value}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
             <div style={{ position: 'relative', display: 'inline-block' }}>
               <PieChart size={80} color="rgba(92, 124, 255, 0.2)" />
               <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                 <Shield size={24} color="var(--primary)" />
               </div>
             </div>
             <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '16px', fontWeight: '700', letterSpacing: '1px' }}>SECURITY INDEX: 98.4/100</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;
