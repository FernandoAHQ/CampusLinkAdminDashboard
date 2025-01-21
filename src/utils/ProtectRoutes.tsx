
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/authentication';

export const ProtectRoutes = () => {
    const { cookies } = useAuth();

    return cookies.token ? <Outlet/> : <Navigate to='/login' />
};
