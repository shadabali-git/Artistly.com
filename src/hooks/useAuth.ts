// hooks/useAuth.ts
'use client';

import { useEffect, useState } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const status = localStorage.getItem('isLoggedIn') === 'true';
      setIsAuthenticated(status);
      setIsLoading(false);
    };

    checkAuth();

    window.addEventListener('auth-change', checkAuth);
    return () => {
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);

  return { isAuthenticated, isLoading };
}
