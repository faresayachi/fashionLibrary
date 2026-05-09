import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loginRequest, logoutRequest, meRequest, refreshRequest } from '../services/authService';
import { setAccessToken } from '../services/axiosInstance';
import { setupAxiosInterceptors } from '../services/axiosInterceptorSetup';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessTokenState] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  const setSession = useCallback((payload) => {
    setUser(payload?.user || null);
    setAccessTokenState(payload?.accessToken || null);
    setAccessToken(payload?.accessToken || null);
    if (payload?.refreshToken) {
      localStorage.setItem('fashionlib_refresh_token', payload.refreshToken);
    }
  }, []);

  const clearSession = useCallback(() => {
    setUser(null);
    setAccessTokenState(null);
    setAccessToken(null);
    localStorage.removeItem('fashionlib_refresh_token');
  }, []);

  const login = useCallback(async (email, password) => {
    const response = await loginRequest({ email, password });
    const data = response?.data?.data;
    setSession(data);
    return response?.data;
  }, [setSession]);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      clearSession();
    }
  }, [clearSession]);

  const refreshToken = useCallback(async () => {
    const stored = localStorage.getItem('fashionlib_refresh_token');
    if (!stored) return null;

    const response = await refreshRequest(stored);
    const newToken = response?.data?.data?.accessToken || null;
    if (newToken) {
      setAccessTokenState(newToken);
      setAccessToken(newToken);
      try {
        const meResponse = await meRequest();
        const meUser = meResponse?.data?.data || null;
        if (meUser) setUser(meUser);
      } catch (error) {
        clearSession();
      }
    }
    return newToken;
  }, [clearSession]);

  useEffect(() => {
    setupAxiosInterceptors({
      getAccessToken: () => accessToken,
      getRefreshToken: () => localStorage.getItem('fashionlib_refresh_token'),
      saveAccessToken: (token) => {
        setAccessTokenState(token);
        setAccessToken(token);
      },
      logout: clearSession
    });
  }, [accessToken, clearSession]);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        await refreshToken();
      } catch (error) {
        clearSession();
      } finally {
        setIsBootstrapping(false);
      }
    };
    bootstrap();
  }, [refreshToken, clearSession]);

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(user && accessToken),
      isAdmin: user?.role === 'admin',
      isBootstrapping,
      login,
      logout,
      refreshToken,
      setSession,
      clearSession
    }),
    [user, accessToken, isBootstrapping, login, logout, refreshToken, setSession, clearSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
