import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('vexiogate_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Auth initialization failed:", e);
        localStorage.removeItem('vexiogate_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, mfaCode, intendedRole) => {
    try {
      const { data } = await axios.post(getApiUrl('/api/auth/login'), { 
        email, 
        password, 
        mfaCode,
        intendedRole
      });
      setUser(data);
      localStorage.setItem('vexiogate_user', JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed',
        requireMfa: error.response?.data?.requireMfa 
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vexiogate_user');
  };

  const initSystem = async () => {
    try {
      await axios.post(getApiUrl('/api/auth/init'));
      return true;
    } catch {
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, initSystem }}>
      {children}
    </AuthContext.Provider>
  );
};
