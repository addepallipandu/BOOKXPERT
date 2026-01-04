import { useState, useEffect, useCallback } from 'react';
import { AuthUser } from '@/types/employee';
import { getAuthUser, setAuthUser, clearAuthUser } from '@/utils/storage';

// Mock credentials for demo
const MOCK_CREDENTIALS = {
  email: 'admin@bookxpert.com',
  password: 'admin123',
  name: 'Admin User',
};

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getAuthUser();
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
      const authUser: AuthUser = {
        email: MOCK_CREDENTIALS.email,
        name: MOCK_CREDENTIALS.name,
      };
      setAuthUser(authUser);
      setUser(authUser);
      return { success: true };
    }

    return { success: false, error: 'Invalid email or password' };
  }, []);

  const logout = useCallback(() => {
    clearAuthUser();
    setUser(null);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };
};
