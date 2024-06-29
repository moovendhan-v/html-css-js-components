import React, { useEffect, useLayoutEffect, useState, createContext, ReactNode, useContext } from 'react';
import api from '@/api';

// Define the AuthContext type
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
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

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  // Fetch access token using the refresh token stored in HTTP-only cookies
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await api.get('/token/auth-token');
        setToken(response.data.accessToken);
      } catch (error) {
        setToken(null);
      }
    };

    fetchAccessToken();
  }, []);

  // Set up request interceptor to add Authorization header
  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  // Set up response interceptor to handle token refresh logic
  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response.status === 403 &&
          error.response.data.message === 'Unauthorized' &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const response = await api.get('/api/refreshToken'); // Ensure this route sends the new token in the response
            setToken(response.data.accessToken);

            // Update the Authorization header with the new token and retry the original request
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return api(originalRequest);
          } catch (error) {
            setToken(null);
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
