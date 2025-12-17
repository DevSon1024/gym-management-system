import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginApi, register as registerApi } from '../api/gymApi';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: false,
    isAdmin: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setAuth({
            token: token,
            user: decoded.user, // Correctly sets the full user object
            isAuthenticated: true,
            isAdmin: decoded.user.role === 'admin',
          });
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const { data } = await loginApi(credentials);
    localStorage.setItem('token', data.token);
    const decoded = jwtDecode(data.token);
    setAuth({
      token: data.token,
      user: decoded.user, // Correctly sets the full user object
      isAuthenticated: true,
      isAdmin: decoded.user.role === 'admin',
    });
    return decoded.user.role;
  };

  const register = async (userData) => {
    await registerApi(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({
      token: null,
      user: null,
      isAuthenticated: false,
      isAdmin: false,
    });
  };

  const value = { ...auth, loading, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};