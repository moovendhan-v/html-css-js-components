import React, { useEffect, useLayoutEffect, useState, createContext, useContext, ReactNode } from 'react';
import api from '@/api'

// Define the AuthContext type
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  getToken: () => string | null;
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

// const baseUri = getEnvVariable('BASE_URI');

// const api = axios.create({
//   baseURL: baseUri, // Replace with your API base URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
//   // You can also add other configuration options here
// });

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await api.get('/token/auth-token');
        console.log("response", response)
        setToken(response.data.accessTokens);
      } catch (error) {
        setToken(null);
      }
    };

    fetchToken();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // alert(token)
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

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
// export { api };
