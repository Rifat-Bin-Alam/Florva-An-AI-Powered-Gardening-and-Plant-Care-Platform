import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // ─── 1. Authentication State ───
  const [token, setToken] = useState(() => localStorage.getItem('florva_token') || '');
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('florva_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // ─── 2. Toast Notification State ───
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(prev => (prev && prev.message === message ? null : prev));
    }, 4000);
  }, []);

  const clearToast = useCallback(() => {
    setToast(null);
  }, []);

  // ─── 3. Theme State (Light / Dark) ───
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('florva_theme');
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('florva_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // ─── 4. Verify Active Session on Mount ───
  useEffect(() => {
    const verifySession = async () => {
      const savedToken = localStorage.getItem('florva_token');
      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${savedToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            setUser(data.user);
            setToken(savedToken);
            localStorage.setItem('florva_user', JSON.stringify(data.user));
          } else {
            // Invalid user data
            logout();
          }
        } else {
          // Token expired or invalid
          console.warn('Session expired or invalid token. Clearing credentials.');
          logout();
        }
      } catch (err) {
        console.error('Session verification network error:', err);
        // Leave existing user in state if offline, but don't hang loading
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  // ─── 5. Login Handler ───
  const login = async (email, password) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed. Please verify credentials.');
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('florva_token', data.token);
      localStorage.setItem('florva_user', JSON.stringify(data.user));

      showToast(`Welcome back, ${data.user.name}!`, 'success');
      return { success: true, user: data.user };
    } catch (error) {
      const msg = error.message.includes('Failed to fetch')
        ? 'Cannot reach Florva server. Please ensure the backend is running on port 5000.'
        : error.message;
      setAuthError(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  // ─── 6. Register Handler ───
  const register = async (userData) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Registration failed. Please review input fields.');
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('florva_token', data.token);
      localStorage.setItem('florva_user', JSON.stringify(data.user));

      showToast(`Welcome to Florva, ${data.user.name}!`, 'success');
      return { success: true, user: data.user };
    } catch (error) {
      const msg = error.message.includes('Failed to fetch')
        ? 'Cannot reach Florva server. Please ensure the backend is running on port 5000.'
        : error.message;
      setAuthError(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  // ─── 7. Logout Handler ───
  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('florva_token');
    localStorage.removeItem('florva_user');
    showToast('You have signed out successfully.', 'info');
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    isLoading,
    authError,
    login,
    register,
    logout,
    theme,
    toggleTheme,
    toast,
    showToast,
    clearToast
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
