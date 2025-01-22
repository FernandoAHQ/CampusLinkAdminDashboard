
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

export const ProtectRoutes = () => {
    const { cookies, renewToken } = useAuth();
   // const { authenticationStatus, setAuthenticationStatus } = useState<'checking' | ''>('checking');

    const verifyToken = async () => {
        const result = await renewToken();
        console.log(result);
    }

    
    

    return cookies.token ? <Outlet/> : <Navigate to='/login' />
};
