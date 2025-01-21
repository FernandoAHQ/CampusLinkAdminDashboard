import { createContext, useContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { AuthResponseDTO } from '../models/dtos/loginResponse.dto';

// Define the shape of the UserContext
interface UserContextType {
  cookies: Record<string, string>; // For cookie key-value pairs
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the UserContext with the appropriate type or undefined initially
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies();

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
