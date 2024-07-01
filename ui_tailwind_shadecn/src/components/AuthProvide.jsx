import React, { useEffect, useLayoutEffect, useState, createContext, useContext } from 'react';
import api from '@/api';

// Define the AuthContext type
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  getToken: () => string | null;
}

// Create an AuthContext
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await api.get('/api/me');
        setToken(response.data.accessTokens);
      } catch (error) {
        setToken(null);
      }
    };

    fetchMe();
  }, []);

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

  // Set up request interceptor to add Authorization header
  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && token ? `Bearer ${token}` : config.headers.Authorization;
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
            const response = await api.get('/api/refreshToken');
            setToken(response.data.accessTokens);

            originalRequest.headers.Authorization = `Bearer ${response.data.accessTokens}`;
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

  const getToken = () => token;

  return (
    <AuthContext.Provider value={{ token, setToken, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
