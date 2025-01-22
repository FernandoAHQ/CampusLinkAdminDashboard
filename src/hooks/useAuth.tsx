import { createContext, useContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthResponseDTO, AuthTokenResponseDTO } from '../models/dtos/loginResponse.dto';

// Define the shape of the UserContext
interface UserContextType {
  cookies: Record<string, string>; // For cookie key-value pairs
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  renewToken: () => Promise<boolean>;
  authenticationStatus: 'checking' | 'authenticated' | 'failed';
}

// Create the UserContext with the appropriate type or undefined initially
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies();
  
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to attach token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = cookies['token']; // Adjust if using a different storage method
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

  // Login function
  const login = async (username: string, password: string) => {
    try {
      const {status, data}:AuthResponseDTO = await axiosInstance.post('/authentication/login/admin', {
        username,
        password,
      });
      console.log(data);

      if(status !== 201) return alert('Authentication failed');

      if (data.status !== "successful" || !data.accessToken)
        return alert(data.message);
  
  

      // Save the accessToken and optional name in cookies
      setCookies('token', data.accessToken); 
      setCookies('user', data.user?.username); 

      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw to allow handling in components
    }
  };

  const renewToken = async () => {
    try {
      const {data}: AuthTokenResponseDTO = await axiosInstance.get('/authentication/renew/admin');

      if(data.status == 'successful') {
        const {user, accessToken} = data;
        setCookies('token', accessToken); 
        setCookies('user', user?.username); 
        authenticationStatus = 'authenticated';
      }
        
      return true;
      
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    ['token', 'name'].forEach((key) => removeCookie(key)); // Remove saved cookies
    navigate('/login');
  };

  // Memoize the value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      cookies,
      login,
      logout,
      renewToken,
      
    }),
    [cookies]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook for consuming the context
export const useAuth = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useAuth must be used within a UserProvider');
  }

  return context;
};
