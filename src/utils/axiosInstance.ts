// axiosInstance.js
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to attach token
axiosInstance.interceptors.request.use(

    
    (config) => {
        const token = localStorage.getItem('accessToken'); // Adjust if using a different storage method
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
