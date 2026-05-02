import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config';
import { User, Mail, Shield, Save, Key, Check } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user: authUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
        const { data } = await axios.get(getApiUrl('/api/users/profile'), {
          headers: { Authorization: `Bearer ${storedUser.token}` }
        });
        setProfile(data);
        setFormData({ username: data.username, email: data.email, password: '' });
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
      await axios.put(getApiUrl('/api/users/profile'), formData, {
        headers: { Authorization: `Bearer ${storedUser.token}` }
      });
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      alert('Update failed');
    }
  };

  if (loading) return <div>Decrypting user profile...</div>;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700' }}>Identity Profile</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your corporate credentials and security settings</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '32px' }}>
        <div className="glass-panel" style={{ padding: '32px', textAlign: 'center' }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            background: 'linear-gradient(45deg, var(--primary), var(--primary-hover))', 
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            fontWeight: '700',
            boxShadow: '0 0 20px var(--primary-glow)'
          }}>
            {profile?.username.substring(0,2).toUpperCase()}
          </div>
          <h3>{profile?.username}</h3>
          <p className={`badge badge-${profile?.role.name}`} style={{ marginTop: '12px' }}>{profile?.role.name}</p>
          
          <div style={{ marginTop: '32px', textAlign: 'left', fontSize: '0.85rem' }}>
            <div style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
              <Shield size={14} style={{ marginRight: '8px' }} /> Account Security: High
            </div>
            <div style={{ color: 'var(--success)' }}>
              <Check size={14} style={{ marginRight: '8px' }} /> MFA Active
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '32px' }}>
          <form onSubmit={handleUpdate}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Display Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    className="glass-input" 
                    style={{ paddingLeft: '40px' }}
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Corporate Email</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    className="glass-input" 
                    style={{ paddingLeft: '40px' }}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>New Master Password (Leave blank to keep current)</label>
              <div style={{ position: 'relative' }}>
                <Key size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="password"
                  className="glass-input" 
                  style={{ paddingLeft: '40px' }}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button type="submit" className="btn btn-primary" style={{ padding: '12px 32px' }}>
                <Save size={18} /> Update Profile
              </button>
              {message && <span style={{ color: 'var(--success)', fontWeight: '600' }}>{message}</span>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
