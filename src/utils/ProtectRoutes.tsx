
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectRoutes = () => {
    const { cookies, renewToken } = useAuth();

    const verifyToken = async () => {
        const result = await renewToken();
        console.log(result);
    }

    verifyToken();
    

    return cookies.token ? <Outlet/> : <Navigate to='/login' />
};
