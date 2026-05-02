import { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config';
import { Users, UserPlus, Trash2, Edit3, ShieldCheck, RefreshCw, X, Save, UserCheck } from 'lucide-react';

const UserDirectory = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({ username: '', email: '', roleName: 'Employee', status: 'Active' });
  
  const [newUser, setNewUser] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    roleName: 'Employee',
    managerId: ''
  });

  const fetchUsers = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
      if (!storedUser || !storedUser.token) {
        setLoading(false);
        return;
      }
      const { data } = await axios.get(getApiUrl('/api/users'), {
        headers: { Authorization: `Bearer ${storedUser.token}` }
      });
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load user directory');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
      await axios.post(getApiUrl('/api/users'), newUser, {
        headers: { Authorization: `Bearer ${storedUser.token}` }
      });
      setNewUser({ username: '', email: '', password: '', roleName: 'Employee', managerId: '' });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add user');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to de-provision this user?')) return;
    try {
      const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
      await axios.delete(getApiUrl(`/api/users/${id}`), {
        headers: { Authorization: `Bearer ${storedUser.token}` }
      });
      fetchUsers();
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  const startEdit = (user) => {
    setEditingUser(user._id);
    setEditData({ 
      username: user.username, 
      email: user.email, 
      roleName: user.role.name,
      status: user.status || 'Active'
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
      await axios.put(getApiUrl(`/api/users/${editingUser}`), editData, {
        headers: { Authorization: `Bearer ${storedUser.token}` }
      });
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      alert('Update failed');
    }
  };

  const managers = users.filter(u => u.role.name === 'Manager');

  if (loading) return <div style={{ padding: '2rem' }}>Synchronizing identity vault...</div>;

  return (
    <div className="animate-fade-in responsive-dir">
      <style>{`
        .user-grid {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 24px;
        }
        @media (max-width: 1100px) {
          .user-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '700' }}>Identity Directory</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage identity profiles and provisioning status</p>
        </div>
        <button onClick={fetchUsers} className="btn" style={{ background: 'var(--bg-border)' }}>
          <RefreshCw size={18} /> Refresh
        </button>
      </div>

      <div className="user-grid">
        <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Identity</th>
                <th>Role</th>
                <th>Provisioning</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--primary), var(--primary-hover))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>
                        {u.username.substring(0,2).toUpperCase()}
                      </div>
                      <div>
                        {editingUser === u._id ? (
                          <input 
                            className="glass-input" 
                            style={{ padding: '4px 8px', fontSize: '0.85rem' }}
                            value={editData.username}
                            onChange={(e) => setEditData({...editData, username: e.target.value})}
                          />
                        ) : (
                          <div style={{ fontWeight: '500' }}>{u.username}</div>
                        )}
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {editingUser === u._id ? (
                      <select 
                        className="glass-input" 
                        style={{ padding: '4px 8px', fontSize: '0.85rem', background: 'var(--bg-dark)' }}
                        value={editData.roleName}
                        onChange={(e) => setEditData({...editData, roleName: e.target.value})}
                      >
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Employee">Employee</option>
                      </select>
                    ) : (
                      <span className={`badge badge-${u.role.name}`}>{u.role.name}</span>
                    )}
                  </td>
                  <td>
                    {u.externalProvisioned ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--success)', fontSize: '0.9rem' }}>
                        <ShieldCheck size={16} /> Auto-Sync Active
                      </span>
                    ) : (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Manual Only
                      </span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {editingUser === u._id ? (
                        <>
                          <button onClick={handleUpdate} className="btn" style={{ background: 'var(--success-bg)', color: 'var(--success)', padding: '6px' }}>
                            <Save size={16} />
                          </button>
                          <button onClick={() => setEditingUser(null)} className="btn" style={{ background: 'var(--bg-border)', padding: '6px' }}>
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEdit(u)} className="btn" style={{ background: 'var(--bg-border)', padding: '6px' }}>
                            <Edit3 size={16} />
                          </button>
                          <button onClick={() => handleDelete(u._id)} className="btn btn-danger" style={{ padding: '6px' }}>
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass-panel" style={{ padding: '24px', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UserPlus size={20} color="var(--primary)" /> Provision New User
          </h3>
          <form onSubmit={handleAddUser}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Username</label>
              <input 
                className="glass-input" 
                value={newUser.username} 
                onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                required 
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Corporate Email</label>
              <input 
                type="email" 
                className="glass-input" 
                value={newUser.email} 
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                required 
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Initial Password</label>
              <input 
                type="password" 
                className="glass-input" 
                value={newUser.password} 
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                required 
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Assigned Role</label>
              <select 
                className="glass-input" 
                style={{ background: 'var(--bg-dark)' }}
                value={newUser.roleName}
                onChange={(e) => setNewUser({...newUser, roleName: e.target.value})}
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
              </select>
            </div>

            {newUser.roleName === 'Employee' && (
              <div style={{ marginBottom: '24px' }} className="animate-fade-in">
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '6px' }}>Reporting Manager</label>
                <select 
                  className="glass-input" 
                  style={{ background: 'var(--bg-dark)', borderColor: 'var(--primary)' }}
                  value={newUser.managerId}
                  onChange={(e) => setNewUser({...newUser, managerId: e.target.value})}
                  required
                >
                  <option value="">-- Select Manager --</option>
                  {managers.map(m => (
                    <option key={m._id} value={m._id}>{m.username}</option>
                  ))}
                </select>
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Provision Identity
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDirectory;
