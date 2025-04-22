import { useAuthStore } from '@/stores/authStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RootRedirect = () => {
    const user = useAuthStore(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/home', { replace: true });
        } else {
            navigate('/login', { replace: true });
        }
    }, [user]);

    return null;
};

export default RootRedirect;
