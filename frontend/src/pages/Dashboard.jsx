import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config';
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  Users, 
  Shield, 
  History, 
  Activity, 
  LogOut, 
  Bell, 
  User, 
  X,
  Menu,
  LayoutDashboard
} from 'lucide-react';

import UserDirectory from './UserDirectory';
import AuditTrail from './AuditTrail';
import SystemHealth from './SystemHealth';
import Profile from './Profile';
import ManagerPortal from './ManagerPortal';
import EmployeePortal from './EmployeePortal';
import AdminPortal from './AdminPortal';
import SuperAdminPortal from './SuperAdminPortal';
import ConsultationDashboard from './ConsultationDashboard';
import Footer from '../components/Footer';
import { Video } from 'lucide-react';

const Dashboard = () => {
  const { user, logout, loading: authLoading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  const adminMenuItems = [
    { name: 'Overview', path: '/overview', icon: <LayoutDashboard size={20} /> },
    { name: 'User Directory', path: '/users', icon: <Users size={20} /> },
    { name: 'Consultations', path: '/consultations', icon: <Video size={20} /> },
    { name: 'Audit Trail', path: '/audit', icon: <History size={20} /> },
    { name: 'System Health', path: '/health', icon: <Activity size={20} /> },
    { name: 'My Profile', path: '/profile', icon: <User size={20} /> },
  ];

  const genericMenuItems = [
    { name: 'Overview', path: '/overview', icon: <LayoutDashboard size={20} /> },
    { name: 'My Profile', path: '/profile', icon: <User size={20} /> },
  ];

  const menuItems = user?.role === 'Admin' || user?.role === 'SuperAdmin' ? adminMenuItems : genericMenuItems;

  const fetchNotifications = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
      if (!storedUser?.token) return;
      
      const { data } = await axios.get(getApiUrl('/api/audit/notifications'), {
        headers: { Authorization: `Bearer ${storedUser.token}` }
      });
      setNotifications(data);
    } catch (err) {}
  };

  useEffect(() => {
    if (showNotifications) fetchNotifications();
  }, [showNotifications]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (authLoading) {
    return <div style={{ padding: 50, color: '#fff' }}>Synchronizing with VexioGate Security Mesh...</div>;
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar Overlay for Mobile */}
      {window.innerWidth <= 768 && isSidebarOpen && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 999 }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Hidden on Overview */}
      {location.pathname !== '/overview' && (
        <aside className={`sidebar glass-panel ${isSidebarOpen ? 'open' : 'closed'}`} style={{
          width: isSidebarOpen ? 'var(--sidebar-width)' : '80px',
          height: '100vh',
          position: window.innerWidth <= 768 ? 'fixed' : 'sticky',
          top: 0,
          left: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 16px',
          borderRadius: 0,
          borderLeft: 'none',
          borderTop: 'none',
          borderBottom: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1000,
          background: 'var(--bg-main)',
          boxShadow: '10px 0 30px rgba(0,0,0,0.5)'
        }}>
          <div style={{ 
            padding: '0 8px',
            marginBottom: '48px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }} onClick={() => navigate('/')}>
            <div style={{ 
              width: '42px', 
              height: '42px', 
              background: 'rgba(255, 255, 255, 0.05)', 
              border: '1px solid rgba(255, 0, 255, 0.3)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 0 15px rgba(255, 0, 255, 0.2)'
            }}>
              <svg viewBox="0 0 100 100" style={{ width: '28px', height: '28px', filter: 'drop-shadow(0 0 3px rgba(255, 0, 255, 0.6))' }}>
                <path d="M 5 20 L 95 20 L 50 45 Z" fill="#fff" />
                <path d="M 2 28 L 46 53 L 46 95 Z" fill="#fff" />
                <path d="M 98 28 L 54 53 L 54 95 Z" fill="#fff" />
              </svg>
            </div>
            {isSidebarOpen && <span style={{ fontWeight: '900', letterSpacing: '-0.5px', fontSize: '1.2rem', color: '#fff' }}>VP GROUP</span>}
          </div>

          <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/overview');
              return (
                <Link 
                  key={item.name} 
                  to={item.path}
                  className="nav-link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    color: isActive ? 'white' : 'var(--text-muted)',
                    background: isActive ? 'var(--primary)' : 'transparent',
                    marginBottom: '8px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {item.icon}
                  {isSidebarOpen && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          <button 
            onClick={handleLogout}
            className="btn-logout"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '12px',
              color: '#f87171',
              background: 'rgba(248, 113, 113, 0.1)',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: 'auto'
            }}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Terminate Session</span>}
          </button>
        </aside>
      )}

      {/* Main Content */}
      <main className="main-content" style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', padding: window.innerWidth <= 768 ? '20px' : '40px' }}>
        <div style={{ flex: 1 }}>
          <header style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '40px',
            paddingBottom: '20px',
            borderBottom: '1px solid var(--bg-border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {location.pathname !== '/overview' && (
                  <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--bg-border)', color: 'var(--text-muted)', cursor: 'pointer', padding: '8px', borderRadius: '8px' }}
                  >
                  {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                )}
                <div style={{ fontSize: '0.75rem', fontWeight: '900', color: '#ff4ef0', opacity: 0.8, letterSpacing: '3px', display: window.innerWidth <= 768 ? 'none' : 'block' }}>VP OPERATIONS HUB</div>
                {location.pathname === '/overview' && (
                    <div style={{ display: 'flex', gap: '24px', marginLeft: '40px' }}>
                        {menuItems.map(item => (
                            <Link key={item.name} to={item.path} style={{ textDecoration: 'none', color: location.pathname === item.path ? 'var(--primary)' : 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {item.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ position: 'relative' }}>
                <Bell 
                  size={20} 
                  className="nav-action" 
                  onClick={() => setShowNotifications(!showNotifications)}
                  style={{ cursor: 'pointer', color: 'var(--text-muted)' }}
                />
                {notifications.length > 0 && <div style={{ position: 'absolute', top: -4, right: -4, width: 8, height: 8, background: 'var(--danger)', borderRadius: '50%' }}></div>}
                
                {showNotifications && (
                  <div className="glass-panel animate-fade-in" style={{ 
                    position: 'absolute', top: '40px', right: '0', width: '300px', zIndex: 1100, padding: '20px'
                  }}>
                    <h4 style={{ marginBottom: '16px' }}>Terminal Notifications</h4>
                    {notifications.map((n, i) => (
                      <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid var(--bg-border)', fontSize: '0.8rem' }}>
                        <div style={{ color: 'var(--primary)', fontWeight: '700' }}>{n.action}</div>
                        <div style={{ color: 'var(--text-muted)' }}>{new Date(n.createdAt).toLocaleTimeString()}</div>
                      </div>
                    ))}
                    {notifications.length === 0 && <div style={{color:'var(--text-muted)', fontSize:'0.8rem'}}>No active alerts detected.</div>}
                  </div>
                )}
              </div>

              <div 
                onClick={() => navigate('/profile')}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '8px 16px', 
                  background: 'var(--bg-card)', 
                  borderRadius: '30px',
                  border: '1px solid var(--bg-border)',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: 'white' }}>
                  {user?.username?.substring(0,2).toUpperCase()}
                </div>
                <div style={{ display: window.innerWidth <= 600 ? 'none' : 'block' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>{user?.username}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{user?.role} Access</div>
                </div>
              </div>
            </div>
          </header>

          <Routes>
            <Route path="/overview" element={
              user?.role === 'SuperAdmin' ? <SuperAdminPortal /> :
              user?.role === 'Admin' ? <AdminPortal /> :
              user?.role === 'Manager' ? <ManagerPortal /> :
              <EmployeePortal />
            } />
            <Route path="/" element={<Navigate to="/overview" replace />} />
            { (user?.role === 'Admin' || user?.role === 'SuperAdmin') && (
              <>
                <Route path="/audit" element={<AuditTrail />} />
                <Route path="/health" element={<SystemHealth />} />
                <Route path="/users" element={<UserDirectory />} />
                <Route path="/consultations" element={<ConsultationDashboard isEmbedded={true} />} />
              </>
            )}
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<div className="animate-fade-in" style={{padding: '80px 20px', textAlign: 'center'}}>
              <h2 style={{ fontSize: '4rem', color: 'var(--text-muted)', opacity: 0.5 }}>404</h2>
              <p style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '1.2rem' }}>RESTRICTED OR NOT FOUND</p>
            </div>} />
          </Routes>
        </div>
        {location.pathname === '/overview' && <Footer />}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .sidebar.closed { transform: translateX(-100%); width: 0 !important; padding: 0 !important; visibility: hidden; }
          .sidebar.open { width: 280px !important; }
          .main-content { padding: 15px !important; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
