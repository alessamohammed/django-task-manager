import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

interface AuthContextType {
  user: Record<string, unknown> | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      setUser({});
    }
  }, []);

  const login = async (username: string, password: string) => {
    const { data } = await api.post('token/', { username, password });
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
    setUser({});
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
    navigate('/login');
  };

  const register = async (username: string, email: string, password: string) => {
    await api.post('register/', { username, email, password });
    await login(username, password);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 