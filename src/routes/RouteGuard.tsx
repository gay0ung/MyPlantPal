import { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

interface RouteGuardProps {
    children: JSX.Element;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
    const user = useAuthStore(state => state.user);
    const isInitialized = useAuthStore(state => state.isInitialized);

    if (!isInitialized) {
        return <div></div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default RouteGuard;
