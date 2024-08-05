import React, { useEffect, useLayoutEffect, useState, createContext, useContext, ReactNode } from 'react';
import api from '@/api';

// Define the AuthContext type
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  getToken: () => string | null;
  isLoggedIn: boolean;
}

// Create an AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Define the AuthProvider props type
interface AuthProviderProps {
  children: ReactNode;
}


const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await api.get('/token/auth-token');
        console.log(response.data.response.authToken);
        const fetchedToken = response.data.response.authToken;
        setToken(fetchedToken);
        setIsLoggedIn(true);
        console.log(isLoggedIn);
      } catch (error) {
        console.error('Failed to fetch token:', error);
        setToken(null);
        setIsLoggedIn(false);
      }
    };

    fetchToken();
  }, []);

  console.log('Token fetched and set:', token);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      if (token) {
        console.log(token)
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Token set in header:', token);
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  const getToken = () => token;

  return (
    <AuthContext.Provider value={{ token, setToken, getToken, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
